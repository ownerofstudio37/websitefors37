import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { createLogger } from '@/lib/logger'

const log = createLogger('api/galleries/downloads')

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
      .select('id, allow_downloads, require_purchase')
      .eq('access_code', params.accessCode)
      .single()

    if (!gallery) {
      return NextResponse.json(
        { success: false, error: 'Gallery not found' },
        { status: 404 }
      )
    }

    if (!gallery.allow_downloads) {
      return NextResponse.json(
        { success: false, error: 'Downloads not allowed for this gallery' },
        { status: 403 }
      )
    }

    const sessionId = request.cookies.get('session_id')?.value || 
                     `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'

    // Record download
    await supabase
      .from('gallery_downloads')
      .insert({
        gallery_id: gallery.id,
        image_id,
        session_id: sessionId,
        ip_address: ip,
        download_type: gallery.require_purchase ? 'watermarked' : 'full_res'
      })

    // Increment download counts
    await supabase.rpc('increment_download_count', { image_id, gallery_id: gallery.id })

    log.info('Download recorded', { galleryId: gallery.id, imageId: image_id })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    log.error('Unexpected error', { error })
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
