import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { createLogger } from '@/lib/logger'
import { authErrorResponse, requireAdminRole } from '@/lib/admin-auth'

const log = createLogger('api/leads/follow-up')

type SequenceType = 'day1' | 'day3' | 'day7'

interface FollowUpRequest {
  action: 'schedule' | 'send-pending' | 'get-status'
  leadIds?: string[]
  leadId?: string
  maxBatch?: number
}

const FOLLOW_UP_TEMPLATE_SLUG: Record<SequenceType, string> = {
  day1: 'lead-follow-up-day1',
  day3: 'lead-follow-up-day3',
  day7: 'lead-follow-up-day7',
}

const FOLLOW_UP_SUBJECT: Record<SequenceType, string> = {
  day1: 'Thank You for Reaching Out to Studio37! 📸',
  day3: 'Still Thinking It Over? Let\'s Plan Your Session ✨',
  day7: 'Last Chance to Reserve Your Studio37 Date ⏰',
}

function canRunCron(request: NextRequest) {
  const expectedSecret = process.env.CRON_SECRET
  if (!expectedSecret) return true

  const headerSecret = request.headers.get('x-cron-secret') || request.headers.get('X-Cron-Secret')
  const querySecret = new URL(request.url).searchParams.get('secret')

  return headerSecret === expectedSecret || querySecret === expectedSecret
}

async function getTemplateIdBySlug(slug: string) {
  const supabase = getSupabaseAdmin()
  const { data, error } = await supabase
    .from('email_templates')
    .select('id')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error || !data) return null
  return data.id as string
}

async function sendPendingFollowUps(maxBatch = 100) {
  const supabase = getSupabaseAdmin()
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.studio37.cc'

  const { data: pendingFollowUps, error: queryError } = await supabase
    .from('lead_follow_ups')
    .select('id, lead_id, sequence_type, scheduled_for')
    .eq('status', 'pending')
    .lte('scheduled_for', new Date().toISOString())
    .order('scheduled_for', { ascending: true })
    .limit(maxBatch)

  if (queryError) {
    throw queryError
  }

  if (!pendingFollowUps || pendingFollowUps.length === 0) {
    return { sent: 0, failed: 0, processed: 0 }
  }

  const templateCache = new Map<string, string | null>()

  const getTemplateId = async (slug: string) => {
    if (templateCache.has(slug)) return templateCache.get(slug)!
    const templateId = await getTemplateIdBySlug(slug)
    templateCache.set(slug, templateId)
    return templateId
  }

  let sent = 0
  let failed = 0

  for (const followUp of pendingFollowUps) {
    const sequence = followUp.sequence_type as SequenceType
    if (!FOLLOW_UP_TEMPLATE_SLUG[sequence]) {
      await supabase
        .from('lead_follow_ups')
        .update({ status: 'failed', failed_reason: `Unknown sequence_type: ${followUp.sequence_type}` })
        .eq('id', followUp.id)
      failed += 1
      continue
    }

    const { data: lead } = await supabase
      .from('leads')
      .select('id, name, email, service_interest, event_date')
      .eq('id', followUp.lead_id)
      .single()

    if (!lead?.email) {
      await supabase
        .from('lead_follow_ups')
        .update({ status: 'failed', failed_reason: 'Lead missing email' })
        .eq('id', followUp.id)
      failed += 1
      continue
    }

    const templateSlug = FOLLOW_UP_TEMPLATE_SLUG[sequence]
    const templateId = await getTemplateId(templateSlug)

    if (!templateId) {
      await supabase
        .from('lead_follow_ups')
        .update({ status: 'failed', failed_reason: `Template not found: ${templateSlug}` })
        .eq('id', followUp.id)
      failed += 1
      continue
    }

    const firstName = (lead.name || 'there').split(' ')[0]

    const emailResponse = await fetch(`${siteUrl}/api/marketing/email/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: lead.email,
        subject: FOLLOW_UP_SUBJECT[sequence],
        templateId,
        leadId: lead.id,
        variables: {
          firstName,
          serviceInterest: lead.service_interest || 'photography',
          followUpDay: sequence === 'day1' ? 1 : sequence === 'day3' ? 3 : 7,
          bookingUrl: `${siteUrl}/book-a-session`,
          eventDate: lead.event_date,
        },
      }),
    })

    if (!emailResponse.ok) {
      const msg = await emailResponse.text().catch(() => 'send failed')
      await supabase
        .from('lead_follow_ups')
        .update({ status: 'failed', failed_reason: msg.slice(0, 500) })
        .eq('id', followUp.id)
      failed += 1
      continue
    }

    await supabase
      .from('lead_follow_ups')
      .update({ status: 'sent', sent_at: new Date().toISOString(), failed_reason: null })
      .eq('id', followUp.id)

    sent += 1
  }

  return {
    sent,
    failed,
    processed: pendingFollowUps.length,
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json().catch(() => ({}))) as FollowUpRequest
    const action = body.action || 'send-pending'

    const supabase = getSupabaseAdmin()

    if (action === 'send-pending') {
      if (!canRunCron(req)) {
        try {
          await requireAdminRole('admin')
        } catch (error) {
          return authErrorResponse(error)
        }
      }

      const result = await sendPendingFollowUps(body.maxBatch || 100)
      return NextResponse.json({ success: true, ...result })
    }

    // Admin-only actions
    await requireAdminRole('editor')

    if (action === 'schedule') {
      if (!body.leadIds?.length) {
        return NextResponse.json({ success: false, error: 'No lead IDs provided' }, { status: 400 })
      }

      const now = new Date()
      const followUps = body.leadIds.flatMap((leadId) => ([
        {
          lead_id: leadId,
          sequence_type: 'day1' as const,
          scheduled_for: new Date(now.getTime() + 1 * 60 * 60 * 1000),
          status: 'pending',
        },
        {
          lead_id: leadId,
          sequence_type: 'day3' as const,
          scheduled_for: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
          status: 'pending',
        },
        {
          lead_id: leadId,
          sequence_type: 'day7' as const,
          scheduled_for: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
          status: 'pending',
        },
      ]))

      const { error } = await supabase.from('lead_follow_ups').insert(followUps)
      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
      }

      return NextResponse.json({ success: true, scheduled: followUps.length })
    }

    if (action === 'get-status') {
      if (!body.leadId) {
        return NextResponse.json({ success: false, error: 'Lead ID required' }, { status: 400 })
      }

      const { data, error } = await supabase
        .from('lead_follow_ups')
        .select('id, sequence_type, status, scheduled_for, sent_at, failed_reason')
        .eq('lead_id', body.leadId)
        .order('scheduled_for', { ascending: true })

      if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 })
      }

      return NextResponse.json({ success: true, followUps: data || [] })
    }

    return NextResponse.json({ success: false, error: 'Invalid action' }, { status: 400 })
  } catch (error: any) {
    if (error?.message === 'UNAUTHORIZED' || error?.message === 'FORBIDDEN') {
      return authErrorResponse(error)
    }
    log.error('Follow-up API error', undefined, error)
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 })
  }
}

// GET endpoint for scheduler/manual triggering: /api/leads/follow-up?secret=...
export async function GET(req: NextRequest) {
  if (!canRunCron(req)) {
    try {
      await requireAdminRole('admin')
    } catch (error) {
      return authErrorResponse(error)
    }
  }

  try {
    const result = await sendPendingFollowUps(100)
    return NextResponse.json({ success: true, ...result })
  } catch (error: any) {
    log.error('Follow-up cron GET error', undefined, error)
    return NextResponse.json({ success: false, error: error.message || 'Failed to send follow-ups' }, { status: 500 })
  }
}
