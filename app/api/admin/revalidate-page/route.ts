import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'
import { createLogger } from '@/lib/logger'
import { cookies } from 'next/headers'
import { supabaseAdmin } from '@/lib/supabaseAdmin'

const log = createLogger('api/admin/revalidate-page')

// Mark as dynamic since we use cookies
export const dynamic = 'force-dynamic'

/**
 * Admin-only endpoint to trigger on-demand revalidation of pages.
 * Requires valid admin session cookie.
 */
export async function POST(req: NextRequest) {
  try {
    // Verify admin session
    const cookieStore = cookies()
    const sessionCookie = cookieStore.get('admin_session')
    
    if (!sessionCookie?.value) {
      log.warn('Revalidation denied: No admin session cookie')
      return NextResponse.json({ error: 'Unauthorized - No session cookie' }, { status: 401 })
    }

    // Validate session exists and is not expired
    const { data: session, error: sessionError } = await supabaseAdmin
      .from('admin_sessions')
      .select('*')
      .eq('id', sessionCookie.value)
      .gt('expires_at', new Date().toISOString())
      .single()

    if (sessionError || !session) {
      log.warn('Revalidation denied: Invalid/expired session', { error: sessionError?.message })
      return NextResponse.json({ error: 'Unauthorized - Invalid or expired session' }, { status: 401 })
    }

    const body = await req.json()
    const { path } = body

    if (!path || typeof path !== 'string') {
      log.warn('Revalidation denied: Invalid path', { path })
      return NextResponse.json({ error: 'Invalid path parameter' }, { status: 400 })
    }

    // Revalidate the requested path
    revalidatePath(path)
    log.info('Admin revalidated path', { path, adminId: session.admin_id })
    
    return NextResponse.json({ revalidated: true, path, timestamp: new Date().toISOString() })
  } catch (err) {
    log.error('Admin revalidation failed', undefined, err)
    return NextResponse.json({ error: 'Internal server error', details: err instanceof Error ? err.message : String(err) }, { status: 500 })
  }
}
