import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { supabaseAdmin } from '@/lib/supabaseAdmin'
import { getClientIp, rateLimit } from '@/lib/rateLimit'
import { createLogger } from '@/lib/logger'

const log = createLogger('api/leads')

const LeadSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.preprocess((val) => {
    const email = typeof val === 'string' ? val.trim() : ''
    return email || 'lead@example.com'
  }, z.string().email()),
  phone: z.string().optional(),
  service_interest: z.string().min(1),
  budget_range: z.string().optional(),
  event_date: z.string().optional(),
  message: z.string().min(10).max(5000),
  source: z.string().optional().default('web-form')
})

/**
 * Send auto-response email based on form type
 * Determines template based on service_interest and source
 */
async function sendAutoResponseEmail(lead: any, payload: any) {
  try {
    // Check if Resend is configured
    if (!process.env.RESEND_API_KEY) {
      log.warn('RESEND_API_KEY not configured, skipping auto-response')
      return
    }

    // Determine template slug based on context
    let templateSlug = 'contact-form-confirmation'
    
    // If service interest suggests booking/quote, use booking template
    const bookingKeywords = ['wedding', 'event', 'portrait', 'session', 'photoshoot', 'commercial']
    const isBookingRequest = bookingKeywords.some(kw => 
      payload.service_interest?.toLowerCase().includes(kw) ||
      payload.message?.toLowerCase().includes(kw)
    )
    

    // If source is newsletter signup, use newsletter welcome template
    if (payload.source === "newsletter-modal" || payload.service_interest === "newsletter") {
      templateSlug = "newsletter-welcome"
    } else if (isBookingRequest || payload.event_date) {
      templateSlug = "booking-request-confirmation"
    }
    
    // Get template ID from database
    const { data: template, error: templateError } = await supabaseAdmin
      .from('email_templates')
      .select('id')
      .eq('slug', templateSlug)
      .eq('is_active', true)
      .single()

    if (templateError || !template) {
      log.warn('Auto-response template not found', { slug: templateSlug, error: templateError })
      return
    }

    // Split name into first/last
    const nameParts = payload.name.split(' ')
    const firstName = nameParts[0] || ''
    const lastName = nameParts.slice(1).join(' ') || ''

    // Prepare variables based on template type
    const variables: Record<string, any> = {
      firstName,
      lastName,
      email: payload.email,
      phone: payload.phone || '',
      message: payload.message,
      submittedAt: new Date().toLocaleString()
    }

    if (templateSlug === 'booking-request-confirmation') {
      variables.sessionType = payload.service_interest
      variables.preferredDate = payload.event_date || 'To be determined'
      variables.budget = payload.budget_range || 'Not specified'
      variables.details = payload.message
    }

    // Send email via marketing API
    const emailResponse = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.studio37.cc'}/api/marketing/email/send`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: payload.email,
        subject: templateSlug === 'booking-request-confirmation' 
          ? 'We Received Your Booking Request!' 
          : 'Thanks for Contacting Studio37!',
        templateId: template.id,
        variables,
        leadId: lead.id
      })
    })

    if (!emailResponse.ok) {
      log.warn('Auto-response email request failed', { 
        status: emailResponse.status,
        leadId: lead.id 
      })
    } else {
      log.info('Auto-response email sent', { 
        leadId: lead.id, 
        email: payload.email, 
        template: templateSlug 
      })
    }
  } catch (error) {
    log.error('Auto-response email error', { leadId: lead?.id }, error)
  }
}

// CORS headers for cross-origin requests
const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
}

export async function OPTIONS(req: NextRequest) {
  return new NextResponse(null, { status: 204, headers: corsHeaders })
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url)
    const limit = parseInt(searchParams.get('limit') || '50')
    const offset = parseInt(searchParams.get('offset') || '0')
    const status = searchParams.get('status')

    // Build query
    let query = supabaseAdmin
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1)

    if (status) {
      query = query.eq('status', status)
    }

    const { data: leads, error } = await query

    if (error) {
      log.error('Failed to fetch leads', undefined, error)
      return NextResponse.json({ error: 'Failed to fetch leads' }, { status: 500 })
    }

    return NextResponse.json({ leads: leads || [] })
  } catch (e: any) {
    log.error('GET leads error', undefined, e)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    // Rate limit: 5 form posts per 5 minutes per IP
    const ip = getClientIp(req.headers)
    const rl = rateLimit(`lead:${ip}`, { limit: 5, windowMs: 5 * 60 * 1000 })
    if (!rl.allowed) {
      const retryAfter = Math.max(1, Math.ceil((rl.resetAt - Date.now()) / 1000))
      log.warn('Rate limit exceeded', { ip })
      return new NextResponse(JSON.stringify({ error: 'Too many submissions. Please try later.' }), {
        status: 429,
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
          'Retry-After': String(retryAfter)
        }
      })
    }

    const json = await req.json()
    const parsed = LeadSchema.safeParse(json)
    if (!parsed.success) {
      log.warn('Validation failed', { issues: parsed.error.flatten() })
      return NextResponse.json({ error: 'Invalid form data', details: parsed.error.flatten() }, { 
        status: 400,
        headers: corsHeaders
      })
    }

    const payload = parsed.data

    // Normalize event_date: accept partial strings like "Feb 14" by storing null when not a full date
    let normalizedEventDate: string | null = null
    if (payload.event_date) {
      const parsedDate = new Date(payload.event_date)
      const isValid = !isNaN(parsedDate.getTime())
      normalizedEventDate = isValid ? parsedDate.toISOString().split('T')[0] : null
    }

    // Insert the lead
    const { data: insertedLead, error } = await supabaseAdmin.from('leads').insert([
      {
        name: payload.name,
        email: payload.email,
        phone: payload.phone || null,
        service_interest: payload.service_interest,
        budget_range: payload.budget_range || null,
        event_date: normalizedEventDate,
        message: payload.message,
        status: 'new',
        source: payload.source || 'web-form'
      }
    ])
      .select()
      .single()

    if (error) {
      log.error('Lead insert error', { email: payload.email, service: payload.service_interest, details: error }, error)
      return NextResponse.json({ error: 'Failed to submit lead', details: error?.message || error?.hint || error }, { 
        status: 500,
        headers: corsHeaders
      })
    }

    // Send admin notification (fire and forget with improved error handling)
    try {
      const adminHtml = `
        <h2>🔔 New Lead Received</h2>
        <p><strong>Name:</strong> ${insertedLead.name || '—'}</p>
        <p><strong>Email:</strong> ${insertedLead.email || '—'}</p>
        <p><strong>Phone:</strong> ${insertedLead.phone || '—'}</p>
        <p><strong>Service Interest:</strong> ${insertedLead.service_interest || '—'}</p>
        <p><strong>Budget:</strong> ${insertedLead.budget_range || '—'}</p>
        <p><strong>Event Date:</strong> ${insertedLead.event_date || '—'}</p>
        <p><strong>Message:</strong></p>
        <p>${insertedLead.message ? insertedLead.message.replace(/</g, '&lt;').replace(/\n/g, '<br>') : '—'}</p>
        <p><strong>Source:</strong> ${insertedLead.source || payload.source || 'web-form'}</p>
        <p><strong>Submitted:</strong> ${new Date().toLocaleString('en-US', { timeZone: 'America/New_York' })}</p>
        <p style="margin-top: 20px;"><a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.studio37.cc'}/admin/leads" style="background: #3B82F6; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; display: inline-block;">View Lead in Admin →</a></p>
      `

      const adminEmail = process.env.ADMIN_EMAIL || 'ceo@studio37.cc'
      
      // POST to marketing email send endpoint so all send logic (Resend + templates) stays centralized
      fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.studio37.cc'}/api/marketing/email/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: adminEmail,
          subject: `🔔 New Lead: ${insertedLead.name || insertedLead.email || 'New contact'}`,
          html: adminHtml,
          leadId: insertedLead.id
        })
      })
      .then(async res => {
        const responseData = await res.json().catch(() => ({}))
        if (!res.ok) {
          log.error('Admin notification send failed', { 
            status: res.status, 
            leadId: insertedLead.id,
            adminEmail,
            error: responseData.error || 'Unknown error',
            responseBody: responseData
          })
        } else {
          log.info('Admin notification sent successfully', { 
            leadId: insertedLead.id, 
            adminEmail,
            messageId: responseData.results?.[0]?.messageId
          })
        }
      })
      .catch(err => {
        log.error('Failed to POST admin notification', { 
          leadId: insertedLead.id,
          adminEmail,
          errorMessage: err.message,
          errorStack: err.stack
        })
      })
    } catch (err) {
      log.error('Admin notification error', { leadId: insertedLead.id }, err)
    }

    // Send auto-response email (fire and forget - don't block response)
    sendAutoResponseEmail(insertedLead, payload).catch(err => {
      log.error('Auto-response email failed', { leadId: insertedLead.id }, err)
    })

    // Return success and lead id so caller can link to booking flows
    return NextResponse.json({ success: true, leadId: insertedLead.id }, { headers: corsHeaders })
  } catch (e: any) {
    log.error('Lead submission failed', undefined, e)
    return NextResponse.json({ error: 'Internal server error' }, { 
      status: 500,
      headers: corsHeaders
    })
  }
}
