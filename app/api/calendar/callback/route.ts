import { NextRequest, NextResponse } from 'next/server'
import { getTokensFromCode } from '@/lib/googleCalendar'
import { createClient } from '@/lib/supabaseAdmin'
import { createLogger } from '@/lib/logger'

const log = createLogger('api/calendar/callback')

/**
 * Handle Google Calendar OAuth callback
 * GET /api/calendar/callback?code=xxx
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const code = searchParams.get('code')
    const error = searchParams.get('error')
    
    if (error) {
      log.warn('OAuth error', { error })
      return NextResponse.redirect(
        new URL('/admin/settings?calendar=error', request.url)
      )
    }
    
    if (!code) {
      return NextResponse.json(
        { error: 'Authorization code missing' },
        { status: 400 }
      )
    }
    
    // Exchange code for tokens
    const tokens = await getTokensFromCode(code)
    
    // Store tokens in database (settings table)
    const supabase = createClient()
    const { error: dbError } = await supabase
      .from('settings')
      .upsert({
        key: 'google_calendar_tokens',
        value: JSON.stringify(tokens),
        updated_at: new Date().toISOString()
      }, {
        onConflict: 'key'
      })
    
    if (dbError) {
      log.error('Failed to save tokens', { error: dbError })
      throw dbError
    }
    
    log.info('Google Calendar connected successfully')
    
    // Redirect to admin settings with success message
    return NextResponse.redirect(
      new URL('/admin/settings?calendar=success', request.url)
    )
    
  } catch (error: any) {
    log.error('OAuth callback failed', { error: error.message })
    return NextResponse.redirect(
      new URL('/admin/settings?calendar=error', request.url)
    )
  }
}
