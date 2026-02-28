import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { createAIClient, AI_CONFIGS } from '@/lib/ai-client'
import { Resend } from 'resend'
import { logger } from '@/lib/logger'

// Email templates for follow-up sequences
const FOLLOW_UP_TEMPLATES = {
  day1: {
    subject: 'Thank You for Reaching Out to Studio37! 📸',
    type: 'thank-you'
  },
  day3: {
    subject: 'Don\'t Miss Out - Your Session Awaits! ⏰',
    type: 'reminder'
  },
  day7: {
    subject: 'Last Chance - Limited Availability This Month 🔥',
    type: 'final-offer'
  }
}

interface FollowUpRequest {
  action: 'schedule' | 'send-pending' | 'get-status'
  leadIds?: string[]
  leadId?: string
}

async function generateFollowUpHTML(template: 'day1' | 'day3' | 'day7', leadName: string, bookingUrl: string): Promise<string> {
  try {
    const ai = createAIClient()
    
    const prompts = {
      day1: `Generate a warm, personalized welcome email body for a photography lead named ${leadName} thanking them for their inquiry. Keep it friendly and brief (3-4 sentences). Include a call-to-action to book a consultation. Use HTML format.`,
      day3: `Generate a friendly reminder email body for a photography lead named ${leadName} who inquired about our services 3 days ago. Highlight what makes our sessions special and encourage them to book. Keep it concise (3-4 sentences). Use HTML format.`,
      day7: `Generate an urgent final-offer email body for a photography lead named ${leadName} with limited-time availability. Mention special pricing or bonuses for booking this month. Keep it persuasive but not pushy (3-4 sentences). Use HTML format.`
    }

    const result = await ai.generateText(prompts[template], { ...AI_CONFIGS.concise, max_tokens: 300 })
    
    // Wrap generated content in basic HTML template
    return `
      <table cellpadding="0" cellspacing="0" border="0" width="100%" style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
        <tr>
          <td style="padding: 40px 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Studio37</h1>
            <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0 0;">Professional Photography</p>
          </td>
        </tr>
        <tr>
          <td style="padding: 40px 20px; background: white;">
            <div style="max-width: 600px; margin: 0 auto; color: #333;">
              <p>Hi ${leadName},</p>
              ${result}
              <div style="margin: 30px 0; text-align: center;">
                <a href="${bookingUrl}" style="display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; transition: background 0.2s;">Book Your Session Now</a>
              </div>
              <p style="color: #666; font-size: 14px; margin-top: 30px;">Questions? Reply to this email or call us at (936) 555-7337.</p>
              <p style="color: #999; font-size: 12px;">Studio37 • Pinehurst, TX</p>
            </div>
          </td>
        </tr>
      </table>
    `
  } catch (error) {
    logger.error('Error generating follow-up HTML', { error })
    // Fallback template
    return `
      <table cellpadding="0" cellspacing="0" border="0" width="100%">
        <tr>
          <td style="padding: 40px 20px; background: #667eea; text-align: center; color: white;">
            <h1 style="margin: 0;">Studio37</h1>
          </td>
        </tr>
        <tr>
          <td style="padding: 40px 20px;">
            <p>Hi ${leadName},</p>
            <p>We'd love to help you capture your special moments. Book your session today and let's create something amazing together!</p>
            <div style="margin: 30px 0; text-align: center;">
              <a href="${bookingUrl}" style="display: inline-block; padding: 12px 30px; background: #667eea; color: white; text-decoration: none; border-radius: 6px;">Book Now</a>
            </div>
          </td>
        </tr>
      </table>
    `
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as FollowUpRequest
    const { action, leadIds, leadId } = body

    // Authenticate admin
    const token = req.headers.get('authorization')?.replace('Bearer ', '')
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const supabase = getSupabaseAdmin()

    switch (action) {
      case 'schedule': {
        // Schedule follow-up sequences for new leads
        if (!leadIds || leadIds.length === 0) {
          return NextResponse.json({ error: 'No lead IDs provided' }, { status: 400 })
        }

        const now = new Date()
        const followUps = []

        for (const lId of leadIds) {
          // Day 1 (immediate)
          followUps.push({
            lead_id: lId,
            sequence_type: 'day1',
            scheduled_for: new Date(now.getTime() + 1000 * 60 * 60), // 1 hour
            status: 'pending'
          })
          // Day 3
          followUps.push({
            lead_id: lId,
            sequence_type: 'day3',
            scheduled_for: new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000),
            status: 'pending'
          })
          // Day 7
          followUps.push({
            lead_id: lId,
            sequence_type: 'day7',
            scheduled_for: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
            status: 'pending'
          })
        }

        const { error } = await supabase.from('lead_follow_ups').insert(followUps)

        if (error) {
          logger.error('Error scheduling follow-ups', { error })
          return NextResponse.json({ error: 'Failed to schedule follow-ups' }, { status: 500 })
        }

        logger.info('Follow-up sequences scheduled', { count: followUps.length })
        return NextResponse.json({ success: true, scheduled: followUps.length })
      }

      case 'send-pending': {
        // Send all pending follow-ups due now
        const resend = new Resend(process.env.RESEND_API_KEY)

        const { data: pendingFollowUps, error: queryError } = await supabase
          .from('lead_follow_ups')
          .select('id, lead_id, sequence_type')
          .eq('status', 'pending')
          .lte('scheduled_for', new Date().toISOString())

        if (queryError) {
          logger.error('Error fetching pending follow-ups', { error: queryError })
          return NextResponse.json({ error: 'Failed to fetch pending follow-ups' }, { status: 500 })
        }

        if (!pendingFollowUps || pendingFollowUps.length === 0) {
          return NextResponse.json({ success: true, sent: 0, message: 'No pending follow-ups' })
        }

        let sentCount = 0
        const errors = []

        for (const followUp of pendingFollowUps) {
          try {
            // Get lead details
            const { data: lead, error: leadError } = await supabase
              .from('leads')
              .select('name, email, phone')
              .eq('id', followUp.lead_id)
              .single()

            if (leadError || !lead) {
              logger.warn('Lead not found for follow-up', { leadId: followUp.lead_id })
              errors.push(`Lead ${followUp.lead_id} not found`)
              continue
            }

            const template = FOLLOW_UP_TEMPLATES[followUp.sequence_type as keyof typeof FOLLOW_UP_TEMPLATES]
            const bookingUrl = `${process.env.NEXT_PUBLIC_SITE_URL || 'https://studio37.cc'}/book-a-session`
            const html = await generateFollowUpHTML(followUp.sequence_type, lead.name || 'friend', bookingUrl)

            // Send email via Resend
            await resend.emails.send({
              from: 'Studio37 <noreply@studio37.cc>',
              to: lead.email,
              subject: template.subject,
              html,
              reply_to: 'hello@studio37.cc'
            })

            // Update status to sent
            await supabase
              .from('lead_follow_ups')
              .update({ status: 'sent', sent_at: new Date().toISOString() })
              .eq('id', followUp.id)

            sentCount++
            logger.info('Follow-up email sent', { leadId: followUp.lead_id, type: followUp.sequence_type })
          } catch (error) {
            logger.error('Error sending follow-up email', { followUpId: followUp.id, error })
            errors.push(`Failed to send follow-up ${followUp.id}`)
          }
        }

        return NextResponse.json({ success: true, sent: sentCount, errors: errors.length > 0 ? errors : undefined })
      }

      case 'get-status': {
        // Get follow-up status for a specific lead
        if (!leadId) {
          return NextResponse.json({ error: 'Lead ID required' }, { status: 400 })
        }

        const { data: followUps, error } = await supabase
          .from('lead_follow_ups')
          .select('id, sequence_type, status, scheduled_for, sent_at')
          .eq('lead_id', leadId)
          .order('scheduled_for', { ascending: true })

        if (error) {
          logger.error('Error fetching follow-up status', { error })
          return NextResponse.json({ error: 'Failed to fetch status' }, { status: 500 })
        }

        return NextResponse.json({ success: true, followUps })
      }

      default:
        return NextResponse.json({ error: 'Invalid action' }, { status: 400 })
    }
  } catch (error) {
    logger.error('Follow-up API error', { error })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
