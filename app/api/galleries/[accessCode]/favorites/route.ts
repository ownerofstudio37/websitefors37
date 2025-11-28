import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { createLogger } from '@/lib/logger'

const log = createLogger('api/galleries/favorites')

export async function POST(
  request: NextRequest,
  { params }: { params: { accessCode: string } }
) {
  try {
    const { image_id } = await request.json()

    if (!image_id) {
      return NextResponse.json(
        { success: false, error: 'Image ID is required' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseAdmin()

    // Get gallery by access code
    const { data: gallery } = await supabase
      .from('galleries')
      .select('id')
      .eq('access_code', params.accessCode)
      .single()

    if (!gallery) {
      return NextResponse.json(
        { success: false, error: 'Gallery not found' },
        { status: 404 }
      )
    }

    // Get or create session ID from cookie/header
    const sessionId = request.cookies.get('session_id')?.value || 
                     request.headers.get('x-session-id') ||
                     `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`

    // Record favorite
    const { error } = await supabase
      .from('gallery_favorites')
      .upsert({
        gallery_id: gallery.id,
        image_id,
        session_id: sessionId
      }, {
        onConflict: 'gallery_id,image_id,session_id',
        ignoreDuplicates: false
      })

    if (error) {
      log.error('Failed to record favorite', { error })
    }

    // Increment favorite count on image
    await supabase.rpc('increment_favorite_count', { image_id })

    log.info('Favorite recorded', { galleryId: gallery.id, imageId: image_id })

    const response = NextResponse.json({ success: true })
    
    // Set session cookie if not exists
    if (!request.cookies.get('session_id')) {
      response.cookies.set('session_id', sessionId, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 365 // 1 year
      })
    }

    return response
  } catch (error: any) {
    log.error('Unexpected error', { error })
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
