import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { createLogger } from '@/lib/logger'

const log = createLogger('api/admin/galleries/[id]')

// GET - Get single gallery with images
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = getSupabaseAdmin()
    // Fetch gallery base record first
    const { data: gallery, error: galleryError } = await supabase
      .from('galleries')
      .select('*')
      .eq('id', params.id)
      .single()

    if (galleryError || !gallery) {
      log.error('Failed to fetch gallery', { error: galleryError, id: params.id })
      return NextResponse.json(
        { success: false, error: 'Gallery not found' },
        { status: 404 }
      )
    }

    // Fetch images explicitly (FK relationship might not be registered yet)
    const { data: images, error: imagesError } = await supabase
      .from('gallery_images')
      .select(`
        id,
        cloudinary_public_id,
        cloudinary_url,
        thumbnail_url,
        watermarked_url,
        filename,
        caption,
        display_order,
        view_count,
        favorite_count,
        download_count,
        is_featured,
        created_at
      `)
      .eq('gallery_id', params.id)
      .order('display_order', { ascending: true })

    if (imagesError) {
      log.warn('Failed to fetch gallery images', { error: imagesError, id: params.id })
    }

    return NextResponse.json({ success: true, gallery: { ...gallery, gallery_images: images || [] } })
  } catch (error) {
    log.error('Unexpected error', { error })
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// DELETE - Delete gallery and all images
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = getSupabaseAdmin()
    
    // Delete gallery (cascade will handle images)
    const { error } = await supabase
      .from('galleries')
      .delete()
      .eq('id', params.id)

    if (error) {
      log.error('Failed to delete gallery', { error, id: params.id })
      return NextResponse.json(
        { success: false, error: 'Failed to delete gallery' },
        { status: 500 }
      )
    }

    log.info('Gallery deleted', { id: params.id })

    return NextResponse.json({ success: true })
  } catch (error) {
    log.error('Unexpected error', { error })
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// PATCH - Update gallery settings
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const supabase = getSupabaseAdmin()
    
    const { data: gallery, error } = await supabase
      .from('galleries')
      .update({
        ...body,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)
      .select()
      .single()

    if (error) {
      log.error('Failed to update gallery', { error, id: params.id })
      return NextResponse.json(
        { success: false, error: 'Failed to update gallery' },
        { status: 500 }
      )
    }

    log.info('Gallery updated', { id: params.id })

    return NextResponse.json({ success: true, gallery })
  } catch (error) {
    log.error('Unexpected error', { error })
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
