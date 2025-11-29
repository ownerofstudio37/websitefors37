import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { createLogger } from '@/lib/logger'
import bcrypt from 'bcryptjs'

const log = createLogger('api/galleries/access')

export async function POST(
  request: NextRequest,
  { params }: { params: { accessCode: string } }
) {
  try {
    const { password } = await request.json()

    if (!password) {
      return NextResponse.json(
        { success: false, error: 'Password is required' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseAdmin()

    // Fetch gallery by access code
    const { data: gallery, error: galleryError } = await supabase
      .from('client_galleries')
      .select('*')
      .eq('access_code', params.accessCode)
      .eq('status', 'active')
      .single()

    if (galleryError || !gallery) {
      log.warn('Gallery not found', { accessCode: params.accessCode })
      return NextResponse.json(
        { success: false, error: 'Gallery not found' },
        { status: 404 }
      )
    }

    // Check if gallery has expired
    if (gallery.expires_at && new Date(gallery.expires_at) < new Date()) {
      return NextResponse.json(
        { success: false, error: 'This gallery has expired' },
        { status: 403 }
      )
    }

    // Verify password
    const passwordMatch = await bcrypt.compare(password, gallery.password_hash)

    // Log access attempt
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    const userAgent = request.headers.get('user-agent') || 'unknown'

    await supabase.from('gallery_access_log').insert({
      gallery_id: gallery.id,
      access_code: params.accessCode,
      password_attempt: true,
      success: passwordMatch,
      ip_address: ip,
      user_agent: userAgent
    })

    if (!passwordMatch) {
      log.warn('Invalid password attempt', { accessCode: params.accessCode, ip })
      return NextResponse.json(
        { success: false, error: 'Invalid password' },
        { status: 401 }
      )
    }

    // Increment views count
    await supabase
      .from('client_galleries')
      .update({ views_count: (gallery.views_count || 0) + 1 })
      .eq('id', gallery.id)

    // Fetch gallery images
    const { data: images, error: imagesError } = await supabase
      .from('client_gallery_images')
      .select('id, cloudinary_url, thumbnail_url, watermarked_url, caption, is_featured, sequence_number')
      .eq('gallery_id', gallery.id)
      .order('sequence_number', { ascending: true })
      .order('created_at', { ascending: true })

    if (imagesError) {
      log.error('Failed to fetch images', { error: imagesError })
      return NextResponse.json(
        { success: false, error: 'Failed to load images' },
        { status: 500 }
      )
    }

    log.info('Gallery accessed', { 
      galleryId: gallery.id, 
      accessCode: params.accessCode,
      imageCount: images?.length || 0 
    })

    // Return gallery and images (without sensitive data)
    return NextResponse.json({
      success: true,
      gallery: {
        id: gallery.id,
        client_name: gallery.client_name,
        title: gallery.title,
        description: gallery.description,
        allow_downloads: gallery.allow_downloads,
        require_purchase: gallery.require_purchase
      },
      images: images || []
    })
  } catch (error: any) {
    log.error('Unexpected error', { error, accessCode: params.accessCode })
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
