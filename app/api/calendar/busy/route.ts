import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { setCredentials, getBusyTimes } from '@/lib/googleCalendar'
import { createLogger } from '@/lib/logger'

const log = createLogger('api/calendar/busy')

/**
 * Get busy times from Google Calendar
 * GET /api/calendar/busy?startDate=YYYY-MM-DD&endDate=YYYY-MM-DD
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const startDate = searchParams.get('startDate')
    const endDate = searchParams.get('endDate')
    
    if (!startDate || !endDate) {
      return NextResponse.json(
        { error: 'startDate and endDate are required' },
        { status: 400 }
      )
    }
    
    // Get stored Google Calendar tokens
  const supabase = getSupabaseAdmin()
    const { data: settings, error: settingsError } = await supabase
      .from('settings')
      .select('value')
      .eq('key', 'google_calendar_tokens')
      .single()
    
    if (settingsError || !settings?.value) {
      log.warn('Google Calendar not connected')
      return NextResponse.json({
        connected: false,
        busyTimes: []
      })
    }
    
    // Set credentials and fetch busy times
    const tokens = JSON.parse(settings.value)
    setCredentials(tokens)
    
    const busyTimes = await getBusyTimes({
      startDate,
      endDate
    })
    
    log.info('Fetched busy times from Google Calendar', {
      startDate,
      endDate,
      count: busyTimes.length
    })
    
    return NextResponse.json({
      connected: true,
      busyTimes,
      startDate,
      endDate
    })
    
  } catch (error: any) {
    log.error('Failed to fetch busy times', { error: error.message })
    return NextResponse.json(
      { error: 'Failed to fetch busy times from calendar', connected: false, busyTimes: [] },
      { status: 500 }
    )
  }
}
