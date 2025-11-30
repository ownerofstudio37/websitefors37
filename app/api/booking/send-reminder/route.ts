import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { rateLimit, getClientIp } from '@/lib/rateLimit'
import { createLogger } from '@/lib/logger'

const log = createLogger('api/booking/send-reminder')

// Email service integration (using Resend or existing email service)
async function sendBookingEmail(to: string, subject: string, content: string) {
  // If you have Resend configured
  const RESEND_API_KEY = process.env.RESEND_API_KEY
  if (RESEND_API_KEY) {
    try {
      const response = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: process.env.EMAIL_FROM || 'studio@studio37.com',
          to: [to],
          subject,
          html: content,
        }),
      })
      
      if (!response.ok) {
        const error = await response.text()
        throw new Error(`Resend error: ${error}`)
      }
      
      return await response.json()
    } catch (error) {
      log.error('Failed to send email via Resend', { error, to })
      throw error
    }
  }
  
  // Fallback: log that email would be sent
  log.info('Email service not configured, would send email:', { to, subject })
  return { id: 'mock-email-id' }
}

// SMS service integration (using Twilio)
async function sendBookingSMS(to: string, message: string) {
  const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID
  const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN
  const TWILIO_PHONE_NUMBER = process.env.TWILIO_PHONE_NUMBER
  
  if (TWILIO_ACCOUNT_SID && TWILIO_AUTH_TOKEN && TWILIO_PHONE_NUMBER) {
    try {
      const auth = Buffer.from(`${TWILIO_ACCOUNT_SID}:${TWILIO_AUTH_TOKEN}`).toString('base64')
      const response = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_ACCOUNT_SID}/Messages.json`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Basic ${auth}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
          body: new URLSearchParams({
            To: to,
            From: TWILIO_PHONE_NUMBER,
            Body: message,
          }),
        }
      )
      
      if (!response.ok) {
        const error = await response.text()
        throw new Error(`Twilio error: ${error}`)
      }
      
      return await response.json()
    } catch (error) {
      log.error('Failed to send SMS via Twilio', { error, to })
      throw error
    }
  }
  
  // Fallback: log that SMS would be sent
  log.info('SMS service not configured, would send SMS:', { to, message })
  return { sid: 'mock-sms-id' }
}

function formatEmailContent(data: {
  type: 'reminder' | 'confirmation'
  name: string
  sessionDate: string
  sessionTime: string
  sessionType?: string
  location?: string
  notes?: string
}) {
  const { type, name, sessionDate, sessionTime, sessionType, location, notes } = data
  
  const isReminder = type === 'reminder'
  const title = isReminder ? 'Session Reminder' : 'Session Confirmation'
  const greeting = isReminder
    ? `This is a friendly reminder about your upcoming session.`
    : `We're excited to confirm your upcoming session!`
  
  // Format date nicely
  const date = new Date(`${sessionDate}T${sessionTime}`)
  const dateStr = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
  const timeStr = date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
  
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; text-align: center; }
        .content { background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }
        .detail { margin: 15px 0; padding: 15px; background: white; border-radius: 8px; }
        .detail-label { font-weight: bold; color: #6b7280; font-size: 12px; text-transform: uppercase; margin-bottom: 5px; }
        .detail-value { font-size: 16px; color: #111827; }
        .footer { text-align: center; margin-top: 30px; color: #6b7280; font-size: 14px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1 style="margin: 0;">${title}</h1>
        </div>
        <div class="content">
          <p>Hi ${name},</p>
          <p>${greeting}</p>
          
          <div class="detail">
            <div class="detail-label">Date & Time</div>
            <div class="detail-value">${dateStr} at ${timeStr}</div>
          </div>
          
          ${sessionType ? `
          <div class="detail">
            <div class="detail-label">Session Type</div>
            <div class="detail-value">${sessionType}</div>
          </div>
          ` : ''}
          
          ${location ? `
          <div class="detail">
            <div class="detail-label">Location</div>
            <div class="detail-value">${location}</div>
          </div>
          ` : ''}
          
          ${notes ? `
          <div class="detail">
            <div class="detail-label">Additional Information</div>
            <div class="detail-value">${notes}</div>
          </div>
          ` : ''}
          
          <p style="margin-top: 30px;">
            ${isReminder 
              ? "We're looking forward to seeing you! If you need to reschedule, please let us know as soon as possible."
              : "If you have any questions or need to make changes, please don't hesitate to reach out."
            }
          </p>
          
          <p>Best regards,<br><strong>Studio37 Team</strong></p>
        </div>
        <div class="footer">
          <p>Studio37 Photography | Your Professional Photography Studio</p>
        </div>
      </div>
    </body>
    </html>
  `
}

function formatSMSContent(data: {
  type: 'reminder' | 'confirmation'
  name: string
  sessionDate: string
  sessionTime: string
  location?: string
}) {
  const { type, name, sessionDate, sessionTime, location } = data
  
  const date = new Date(`${sessionDate}T${sessionTime}`)
  const dateStr = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  const timeStr = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  
  const prefix = type === 'reminder' ? 'Reminder' : 'Confirmed'
  const locationText = location ? ` at ${location}` : ''
  
  return `${prefix}: Hi ${name}, your session is on ${dateStr} at ${timeStr}${locationText}. See you then! - Studio37`
}

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIp(request.headers)
    const rl = rateLimit(`send-reminder:${ip}`, { limit: 10, windowMs: 60 * 1000 })
    if (!rl.allowed) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again later.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const {
      leadId,
      type,
      sessionDate,
      sessionTime,
      sessionType,
      location,
      notes,
      email,
      phone,
      name,
    } = body

    // Validate required fields
    if (!leadId || !type || !sessionDate || !sessionTime || !email || !name) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    if (type !== 'reminder' && type !== 'confirmation') {
      return NextResponse.json(
        { error: 'Invalid type. Must be "reminder" or "confirmation"' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseAdmin()

    // Send email
    const emailSubject = type === 'reminder' 
      ? `Reminder: Your Upcoming Session with Studio37`
      : `Confirmed: Your Session with Studio37`
    
    const emailContent = formatEmailContent({
      type,
      name,
      sessionDate,
      sessionTime,
      sessionType,
      location,
      notes,
    })
    
    let emailResult
    try {
      emailResult = await sendBookingEmail(email, emailSubject, emailContent)
      log.info('Email sent successfully', { leadId, email, type })
    } catch (emailError) {
      log.error('Email send failed', { error: emailError, leadId, email })
      // Continue even if email fails - we'll still try SMS and log the communication
    }

    // Send SMS if phone number provided
    let smsResult
    if (phone) {
      const smsContent = formatSMSContent({
        type,
        name,
        sessionDate,
        sessionTime,
        location,
      })
      
      try {
        smsResult = await sendBookingSMS(phone, smsContent)
        log.info('SMS sent successfully', { leadId, phone, type })
      } catch (smsError) {
        log.error('SMS send failed', { error: smsError, leadId, phone })
        // Continue even if SMS fails
      }
    }

    // Log communication to database
    const { error: logError } = await supabase.from('communication_logs').insert({
      lead_id: leadId,
      type: 'email',
      direction: 'outbound',
      subject: emailSubject,
      content: emailContent,
      status: emailResult ? 'sent' : 'failed',
      metadata: {
        reminderType: type,
        sessionDate,
        sessionTime,
        sessionType,
        location,
        emailId: emailResult?.id,
        smsId: smsResult?.sid,
      },
    })

    if (logError) {
      log.error('Failed to log communication', { error: logError, leadId })
    }

    return NextResponse.json({
      success: true,
      message: `${type === 'reminder' ? 'Reminder' : 'Confirmation'} sent successfully`,
      emailSent: !!emailResult,
      smsSent: !!smsResult,
    })
  } catch (error) {
    log.error('Error sending booking reminder', { error })
    return NextResponse.json(
      { error: 'Failed to send reminder' },
      { status: 500 }
    )
  }
}
