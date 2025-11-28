import { NextRequest, NextResponse } from 'next/server'
import { getAuthUrl } from '@/lib/googleCalendar'
import { createLogger } from '@/lib/logger'

const log = createLogger('api/calendar/auth')

/**
 * Initiate Google Calendar OAuth flow
 * GET /api/calendar/auth
 */
export async function GET(request: NextRequest) {
  try {
    // Check if user is admin (from session cookie)
    const sessionCookie = request.cookies.get('admin_session')
    
    if (!sessionCookie) {
      return NextResponse.json(
        { error: 'Unauthorized - admin login required' },
        { status: 401 }
      )
    }
    
    // Generate OAuth URL
    const authUrl = getAuthUrl()
    
    log.info('Generated OAuth URL for calendar access')
    
    return NextResponse.json({
      authUrl,
      message: 'Visit this URL to authorize calendar access'
    })
    
  } catch (error: any) {
    log.error('Failed to generate auth URL', { error: error.message })
    return NextResponse.json(
      { error: 'Failed to generate authorization URL' },
      { status: 500 }
    )
  }
}
