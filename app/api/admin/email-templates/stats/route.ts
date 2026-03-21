import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { authErrorResponse, requireAdminRole } from '@/lib/admin-auth'

export async function GET(req: NextRequest) {
  try {
    await requireAdminRole('viewer')

    const { data: templates, error } = await supabaseAdmin
      .from('email_templates')
      .select('id, slug')

    if (error) {
      return NextResponse.json({ success: false, error: error.message }, { status: 500 })
    }

    // Primary metrics source: dedicated email send logs
    const { data: sendLogs, error: sendLogError } = await supabaseAdmin
      .from('email_send_logs')
      .select('template_slug, status, sent_at')
      .in('status', ['sent', 'delivered', 'opened', 'clicked'])

    const slugCounts: Record<string, { count: number; lastDate: string | null }> = {}

    if (!sendLogError && sendLogs && sendLogs.length > 0) {
      for (const row of sendLogs) {
        const slug = row.template_slug
        if (!slug) continue
        if (!slugCounts[slug]) slugCounts[slug] = { count: 0, lastDate: null }
        slugCounts[slug].count += 1
        if (row.sent_at && (!slugCounts[slug].lastDate || row.sent_at > slugCounts[slug].lastDate!)) {
          slugCounts[slug].lastDate = row.sent_at
        }
      }
    } else {
      // Fallback for environments that have not migrated logs table yet
      const { data: leadCounts } = await supabaseAdmin
        .from('leads')
        .select('source, created_at')
        .not('source', 'is', null)
        .order('created_at', { ascending: false })

      const sourceToSlug: Record<string, string> = {
        'contact-form': 'contact-form-confirmation',
        'booking-form': 'booking-request-confirmation',
        'chatbot': 'welcome-email',
        'chatbot-quote-form': 'booking-request-confirmation',
        'chatbot-legacy': 'welcome-email',
        'newsletter_popup': 'newsletter-welcome',
        'newsletter_inline': 'newsletter-welcome',
      }

      for (const lead of leadCounts || []) {
        const slug = sourceToSlug[lead.source]
        if (!slug) continue
        if (!slugCounts[slug]) slugCounts[slug] = { count: 0, lastDate: null }
        slugCounts[slug].count += 1
        if (!slugCounts[slug].lastDate || lead.created_at > slugCounts[slug].lastDate!) {
          slugCounts[slug].lastDate = lead.created_at
        }
      }
    }

    const stats = (templates || []).map((t) => ({
      slug: t.slug,
      totalSent: slugCounts[t.slug]?.count ?? 0,
      lastSent: slugCounts[t.slug]?.lastDate ?? null,
    }))

    return NextResponse.json({ success: true, stats })
  } catch (error: any) {
    if (error?.message === 'UNAUTHORIZED' || error?.message === 'FORBIDDEN') {
      return authErrorResponse(error)
    }
    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}

    return NextResponse.json({ success: false, error: error.message }, { status: 500 })
  }
}
