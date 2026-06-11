import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import crypto from 'crypto'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { getClientIp, rateLimit } from '@/lib/rateLimit'
import { createLogger } from '@/lib/logger'

const log = createLogger('api/meta-leads')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, X-Hub-Signature, X-Hub-Signature-256',
}

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

// Meta webhook verification challenge (GET)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const mode = searchParams.get('hub.mode')
  const token = searchParams.get('hub.verify_token')
  const challenge = searchParams.get('hub.challenge')

  const verifyToken = process.env.META_WEBHOOK_VERIFY_TOKEN || 'studio37webhook'

  if (mode === 'subscribe' && token === verifyToken) {
    log.info('Meta webhook verified successfully')
    return new NextResponse(challenge, { status: 200 })
  }

  log.warn('Meta webhook verification failed', { mode, token })
  return new NextResponse('Forbidden', { status: 403 })
}

const SimpleLeadSchema = z.object({
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  message: z.string().optional(),
  source: z.string().optional().default('meta-lead')
})

function verifySignature(rawBody: string, headerSig?: string | null): boolean {
  const secret = process.env.META_APP_SECRET
  if (!secret || !headerSig) return true // no secret configured: skip verification

  try {
    const parts = headerSig.split('=')
    if (parts.length !== 2) return false
    const algo = parts[0].toLowerCase()
    const signature = parts[1]
    const hmac = crypto.createHmac(algo === 'sha256' ? 'sha256' : 'sha1', secret)
    hmac.update(rawBody)
    const digest = hmac.digest('hex')
    return crypto.timingSafeEqual(Buffer.from(digest, 'hex'), Buffer.from(signature, 'hex'))
  } catch (err) {
    log.error('Signature verification error', undefined, err)
    return false
  }
}

async function fetchLeadFromMeta(leadgen_id: string) {
  const pageToken = process.env.META_PAGE_ACCESS_TOKEN
  if (!pageToken) {
    log.warn('META_PAGE_ACCESS_TOKEN not configured; cannot fetch lead details')
    return null
  }

  try {
    const res = await fetch(
      `https://graph.facebook.com/v17.0/${leadgen_id}?fields=field_data,created_time`,
      { headers: { Authorization: `Bearer ${pageToken}` } }
    )
    if (!res.ok) {
      const body = await res.text()
      log.error('Meta lead fetch failed', { leadgen_id, status: res.status, body })
      return null
    }
    const data = await res.json()
    const fieldData = data.field_data || []
    const mapped: Record<string, any> = {}
    for (const fd of fieldData) {
      const value = Array.isArray(fd.values) ? fd.values[0] : fd.values
      mapped[fd.name] = value
    }
    return mapped
  } catch (err) {
    log.error('Error fetching lead from Meta', { leadgen_id }, err)
    return null
  }
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req.headers)
    const rl = rateLimit(`meta-lead:${ip}`, { limit: 60, windowMs: 60 * 60 * 1000 })
    if (!rl.allowed) {
      const retryAfter = Math.max(1, Math.ceil((rl.resetAt - Date.now()) / 1000))
      return new NextResponse(JSON.stringify({ error: 'Rate limit' }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json', 'Retry-After': String(retryAfter) }
      })
    }

    const raw = await req.text()
    const headerSig = req.headers.get('x-hub-signature-256') || req.headers.get('x-hub-signature')
    if (!verifySignature(raw, headerSig)) {
      log.warn('Invalid signature on Meta lead webhook')
      return new NextResponse(JSON.stringify({ error: 'Invalid signature' }), { status: 401, headers: corsHeaders })
    }

    let body: any
    try { body = JSON.parse(raw) } catch { body = {} }

    // Case A: Real Meta webhook payload (entry -> changes -> value.leadgen_id)
    let leadData: Record<string, any> | null = null
    if (Array.isArray(body.entry)) {
      for (const entry of body.entry) {
        for (const change of entry.changes || []) {
          const value = change.value || {}
          const leadgen_id = value.leadgen_id || value.lead_id || value.id
          if (leadgen_id) {
            leadData = await fetchLeadFromMeta(leadgen_id)
            if (leadData) break
          }
        }
        if (leadData) break
      }
    }

    // Case B: Direct lead object in body.lead
    if (!leadData && body.lead) leadData = body.lead

    // Case C: Simple flat JSON body
    if (!leadData) {
      const parsed = SimpleLeadSchema.safeParse(body)
      if (parsed.success) leadData = parsed.data
    }

    if (!leadData) {
      log.warn('No lead data parsed from Meta webhook', { body })
      return new NextResponse(JSON.stringify({ error: 'No lead data' }), { status: 400, headers: corsHeaders })
    }

    // Map Meta field names → CRM columns
    const name = leadData.full_name
      || leadData.name
      || `${leadData.first_name || ''} ${leadData.last_name || ''}`.trim()
      || 'Meta Lead'
    const email = leadData.email || leadData.email_address || null
    const phone = leadData.phone_number || leadData.phone || null
    const message = leadData.ad_message || leadData.message || null
    const source = `meta-lead:${body?.object || 'page'}`

    const supabase = getSupabaseAdmin()
    const { data: inserted, error } = await supabase
      .from('leads')
      .insert([{ name, email, phone, message, status: 'new', source }])
      .select()
      .maybeSingle()

    if (error) {
      log.error('Failed to insert meta lead', { error })
      return new NextResponse(
        JSON.stringify({ error: 'Insert failed', details: error.message }),
        { status: 500, headers: corsHeaders }
      )
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.studio37.cc'
    const adminEmail = process.env.ADMIN_EMAIL || 'ceo@studio37.cc'

    // Fire-and-forget admin notification
    fetch(`${siteUrl}/api/marketing/email/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: adminEmail,
        subject: `🔔 New Meta Lead: ${inserted?.name || inserted?.email || 'Meta Lead'}`,
        html: `
          <h2>🔔 New Meta Ad Lead</h2>
          <p><strong>Name:</strong> ${inserted?.name || '—'}</p>
          <p><strong>Email:</strong> ${inserted?.email || '—'}</p>
          <p><strong>Phone:</strong> ${inserted?.phone || '—'}</p>
          <p><strong>Source:</strong> ${source}</p>
          <p style="margin-top:16px">
            <a href="${siteUrl}/admin/leads" style="background:#3B82F6;color:white;padding:10px 20px;text-decoration:none;border-radius:5px">
              View in CRM →
            </a>
          </p>
        `,
        leadId: inserted?.id
      })
    }).catch(err => log.error('Admin notification failed', undefined, err))

    // Schedule day-1 follow-up
    void supabase.from('lead_follow_ups').insert([{
      lead_id: inserted?.id,
      sequence_type: 'day1',
      scheduled_for: new Date(Date.now() + 60 * 60 * 1000),
      status: 'pending'
    }]).then(() => undefined) // non-blocking

    log.info('Meta lead inserted', { leadId: inserted?.id, source })
    return new NextResponse(
      JSON.stringify({ success: true, leadId: inserted?.id }),
      { status: 200, headers: corsHeaders }
    )
  } catch (err: any) {
    log.error('Meta leads POST error', undefined, err)
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: corsHeaders }
    )
  }
}
