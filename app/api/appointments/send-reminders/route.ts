import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { createLogger } from '@/lib/logger'

const log = createLogger('api/appointments/send-reminders')

/**
 * Background job to send appointment reminders 24 hours before scheduled time
 * Triggered by: Netlify cron jobs, external schedulers (n8n), or manual calls
 * 
 * Expected environment variable: CRON_SECRET for security
 * Call: POST /api/appointments/send-reminders with header X-Cron-Secret: {CRON_SECRET}
 */
export async function POST(request: NextRequest) {
  try {
    // Verify cron secret for security
    const cronSecret = request.headers.get('X-Cron-Secret')
    const expectedSecret = process.env.CRON_SECRET
    
    if (expectedSecret && cronSecret !== expectedSecret) {
      log.warn('Unauthorized cron call attempted')
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const supabase = getSupabaseAdmin()

    // Find appointments due for reminder (24h from now)
    // We look for appointments in a 1-hour window to avoid duplicates
    const now = new Date()
    const reminderTime = new Date(now.getTime() + 24 * 60 * 60 * 1000) // 24 hours from now
    
    // Start of the hour before reminder time and end of the hour after
    const windowStart = new Date(reminderTime.getTime() - 30 * 60 * 1000)
    const windowEnd = new Date(reminderTime.getTime() + 30 * 60 * 1000)

    log.info('Checking for appointments to remind', {
      now: now.toISOString(),
      windowStart: windowStart.toISOString(),
      windowEnd: windowEnd.toISOString(),
    })

    // Query appointments within the reminder window
    const { data: appointments, error: queryError } = await supabase
      .from('appointments')
      .select('id, lead_id, client_name, client_email, client_phone, appointment_date, appointment_time, session_type, location, notes, status, reminder_sent_at')
      .eq('status', 'confirmed')
      .is('reminder_sent_at', null) // Only send if not already sent
      .gte('appointment_date', windowStart.toISOString())
      .lte('appointment_date', windowEnd.toISOString())

    if (queryError) {
      log.error('Failed to query appointments', { error: queryError })
      throw queryError
    }

    log.info(`Found ${appointments?.length || 0} appointments due for reminders`)

    if (!appointments || appointments.length === 0) {
      return NextResponse.json({
        success: true,
        message: 'No appointments found for reminders',
        remindersSent: 0,
      })
    }

    let remindersSent = 0
    const failures: any[] = []

    // Send reminder for each appointment
    for (const apt of appointments) {
      try {
        // Call the send-reminder endpoint
        const reminderResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/booking/send-reminder`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-Internal-Call': 'true', // Flag for internal API calls
          },
          body: JSON.stringify({
            leadId: apt.lead_id,
            type: 'reminder',
            sessionDate: apt.appointment_date ? apt.appointment_date.split('T')[0] : null,
            sessionTime: apt.appointment_time || '00:00',
            sessionType: apt.session_type,
            location: apt.location,
            notes: apt.notes,
            email: apt.client_email,
            phone: apt.client_phone,
            name: apt.client_name,
          }),
        })

        if (!reminderResponse.ok) {
          const error = await reminderResponse.text()
          throw new Error(`Send reminder failed: ${error}`)
        }

        // Mark as reminder sent
        const { error: updateError } = await supabase
          .from('appointments')
          .update({ reminder_sent_at: new Date().toISOString() })
          .eq('id', apt.id)

        if (updateError) {
          log.warn('Failed to mark reminder as sent', { appointmentId: apt.id, error: updateError })
        }

        remindersSent++
        log.info(`Reminder sent for appointment ${apt.id}`, {
          clientName: apt.client_name,
          appointmentDate: apt.appointment_date,
        })
      } catch (error) {
        log.error(`Failed to send reminder for appointment ${apt.id}`, { error })
        failures.push({
          appointmentId: apt.id,
          error: String(error),
        })
      }
    }

    return NextResponse.json({
      success: true,
      message: `Reminders job completed: ${remindersSent} sent, ${failures.length} failed`,
      remindersSent,
      failures: failures.length > 0 ? failures : undefined,
    })
  } catch (error) {
    log.error('Appointment reminder job failed', { error })
    return NextResponse.json(
      { error: 'Failed to process reminders', details: String(error) },
      { status: 500 }
    )
  }
}

/**
 * GET endpoint to manually trigger reminders (for testing)
 * Call: GET /api/appointments/send-reminders?secret={CRON_SECRET}
 */
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const cronSecret = searchParams.get('secret')
  const expectedSecret = process.env.CRON_SECRET

  if (expectedSecret && cronSecret !== expectedSecret) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  // Convert GET to POST by calling POST handler with stubbed request
  const postRequest = new NextRequest(request, { method: 'POST' })
  postRequest.headers.set('X-Cron-Secret', cronSecret || '')

  return POST(postRequest)
}
