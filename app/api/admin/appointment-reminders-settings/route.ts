import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { createLogger } from '@/lib/logger'

const log = createLogger('api/admin/appointment-reminders-settings')

export const dynamic = 'force-dynamic'

export interface AppointmentReminderSettings {
  enabled: boolean
  hours_before: number // How many hours before appointment to send reminder (default: 24)
  send_email: boolean
  send_sms: boolean
  auto_resend_on_reschedule: boolean
  max_retries: number
  last_run?: string
}

const DEFAULT_SETTINGS: AppointmentReminderSettings = {
  enabled: true,
  hours_before: 24,
  send_email: true,
  send_sms: true,
  auto_resend_on_reschedule: true,
  max_retries: 3,
}

function normalizeSettings(input: any): AppointmentReminderSettings {
  if (!input || typeof input !== 'object') return DEFAULT_SETTINGS
  return {
    enabled: typeof input.enabled === 'boolean' ? input.enabled : DEFAULT_SETTINGS.enabled,
    hours_before: Number.isFinite(Number(input.hours_before)) ? Number(input.hours_before) : DEFAULT_SETTINGS.hours_before,
    send_email: typeof input.send_email === 'boolean' ? input.send_email : DEFAULT_SETTINGS.send_email,
    send_sms: typeof input.send_sms === 'boolean' ? input.send_sms : DEFAULT_SETTINGS.send_sms,
    auto_resend_on_reschedule:
      typeof input.auto_resend_on_reschedule === 'boolean'
        ? input.auto_resend_on_reschedule
        : DEFAULT_SETTINGS.auto_resend_on_reschedule,
    max_retries: Number.isFinite(Number(input.max_retries)) ? Number(input.max_retries) : DEFAULT_SETTINGS.max_retries,
    last_run: typeof input.last_run === 'string' ? input.last_run : undefined,
  }
}

/**
 * GET /api/admin/appointment-reminders-settings
 * Fetch current appointment reminder settings
 */
export async function GET(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin()

    // Fetch from settings table. Use select('*') so this endpoint still works
    // even if appointment_reminders_settings column is missing in older DBs.
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .limit(1)
      .maybeSingle()

    if (error) {
      log.warn('Failed to fetch reminder settings row, using defaults', { error })
      return NextResponse.json({
        success: true,
        settings: DEFAULT_SETTINGS,
        warning: 'Using default settings (database read failed)',
      })
    }

    const settings = normalizeSettings((data as any)?.appointment_reminders_settings)

    return NextResponse.json({
      success: true,
      settings,
    })
  } catch (error: any) {
    log.error('Error fetching appointment reminder settings', { error })
    return NextResponse.json(
      {
        success: true,
        settings: DEFAULT_SETTINGS,
        warning: 'Using default settings (runtime fallback)',
      },
      { status: 200 }
    )
  }
}

/**
 * POST /api/admin/appointment-reminders-settings
 * Update appointment reminder settings
 */
export async function POST(request: NextRequest) {
  try {
    const supabase = getSupabaseAdmin()
    const body = await request.json()

    const settings: AppointmentReminderSettings = normalizeSettings(body)

    // Validate settings
    if (settings.hours_before < 1 || settings.hours_before > 168) {
      return NextResponse.json(
        { error: 'hours_before must be between 1 and 168 (1 week)' },
        { status: 400 }
      )
    }

    if (settings.max_retries < 1 || settings.max_retries > 10) {
      return NextResponse.json(
        { error: 'max_retries must be between 1 and 10' },
        { status: 400 }
      )
    }

    // Update settings in database (singleton settings row)
    const { data, error } = await supabase
      .from('settings')
      .update({ appointment_reminders_settings: settings })
      .select()
      .maybeSingle()

    if (error) {
      const msg = String(error.message || '')
      const isMissingColumn = error.code === '42703' || /appointment_reminders_settings.*does not exist/i.test(msg)

      if (isMissingColumn) {
        log.warn('Reminder settings column missing; returning compatibility success', { error })
        return NextResponse.json({
          success: true,
          message: 'Settings accepted (compatibility mode: database column missing)',
          settings,
          warning: 'appointment_reminders_settings column not found in database',
        })
      }

      log.error('Failed to update reminder settings', { error })
      throw error
    }

    log.info('Appointment reminder settings updated', { settings })

    return NextResponse.json({
      success: true,
      message: 'Settings updated successfully',
      settings,
    })
  } catch (error: any) {
    log.error('Error updating appointment reminder settings', { error })
    return NextResponse.json(
      { error: 'Failed to update settings', details: String(error) },
      { status: 500 }
    )
  }
}

/**
 * PATCH /api/admin/appointment-reminders-settings/test
 * Send a test reminder to verify configuration
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json()

    if (!body.testEmail) {
      return NextResponse.json(
        { error: 'testEmail is required' },
        { status: 400 }
      )
    }

    // Call the send-reminder endpoint with test data
    const testResponse = await fetch(`${process.env.NEXTAUTH_URL || 'http://localhost:3000'}/api/booking/send-reminder`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Internal-Call': 'true',
      },
      body: JSON.stringify({
        leadId: 'test-lead-id',
        type: 'reminder',
        sessionDate: new Date().toISOString().split('T')[0],
        sessionTime: '14:00',
        sessionType: 'Test Session',
        location: 'Studio37',
        notes: 'This is a test appointment reminder',
        email: body.testEmail,
        phone: body.testPhone || null,
        name: 'Test Client',
      }),
    })

    if (!testResponse.ok) {
      const error = await testResponse.text()
      return NextResponse.json(
        { error: `Failed to send test reminder: ${error}` },
        { status: 500 }
      )
    }

    const result = await testResponse.json()

    log.info('Test reminder sent', { email: body.testEmail })

    return NextResponse.json({
      success: true,
      message: 'Test reminder sent successfully',
      result,
    })
  } catch (error: any) {
    log.error('Error sending test reminder', { error })
    return NextResponse.json(
      { error: 'Failed to send test reminder', details: String(error) },
      { status: 500 }
    )
  }
}
