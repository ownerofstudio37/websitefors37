import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { createLogger } from '@/lib/logger'

const log = createLogger('api/admin/galleries/images/[imageId]')

// PATCH - Update image settings
export async function PATCH(
  request: NextRequest,
  context: { params: { id: string; imageId: string } }
) {
  try {
    const body = await request.json()
    const supabase = getSupabaseAdmin()
    
    const { data: image, error } = await supabase
      .from('gallery_images')
      .update({
        ...body,
        updated_at: new Date().toISOString()
      })
      .eq('id', context.params.imageId)
      .select()
      .single()

    if (error) {
      log.error('Failed to update image', { error })
      return NextResponse.json(
        { success: false, error: 'Failed to update image' },
        { status: 500 }
      )
    }

    log.info('Image updated', { imageId: context.params.imageId })

    return NextResponse.json({ success: true, image })
  } catch (error: any) {
    log.error('Unexpected error', { error })
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}

// DELETE - Delete single image
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string; imageId: string } }
) {
  try {
    const supabase = getSupabaseAdmin()
    
    const { error } = await supabase
      .from('gallery_images')
      .delete()
      .eq('id', context.params.imageId)

    if (error) {
      log.error('Failed to delete image', { error })
      return NextResponse.json(
        { success: false, error: 'Failed to delete image' },
        { status: 500 }
      )
    }

    log.info('Image deleted', { imageId: context.params.imageId })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    log.error('Unexpected error', { error })
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred' },
      { status: 500 }
    )
  }
}
