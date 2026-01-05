import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { createLogger } from '@/lib/logger'

const log = createLogger('api/admin/gallery-images/bulk')

export async function PATCH(request: NextRequest) {
  try {
    // Guard: ensure service role key is configured
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      log.warn('Bulk update: SUPABASE_SERVICE_ROLE_KEY is not configured')
      return NextResponse.json({ success: false, error: 'Service key not configured' }, { status: 500 })
    }

    const body = await request.json().catch(() => null)
    if (!body || !Array.isArray(body.updates)) {
      return NextResponse.json({ success: false, error: 'Invalid payload' }, { status: 400 })
    }

    const updates = body.updates.map((u: any) => {
      // Only keep allowed fields and ensure id is present
      const { id } = u
      if (!id) return null
      return {
        id,
        title: u.title,
        description: u.description,
        alt_text: u.alt_text,
        category: u.category,
        tags: u.tags,
        featured: typeof u.featured === 'boolean' ? u.featured : undefined,
        order_index: u.order_index,
        display_order: u.display_order,
        image_url: u.image_url,
        thumbnail_url: u.thumbnail_url
      }
    }).filter(Boolean)

    if (updates.length === 0) {
      return NextResponse.json({ success: true, updated: [], count: 0 })
    }

    const supabase = getSupabaseAdmin()

    // Upsert in a single request; let Supabase match on primary key id
    const { data, error } = await supabase
      .from('gallery_images')
      .upsert(updates, { onConflict: 'id' })
      .select()

    if (error) {
      log.error('Bulk upsert failed', { error })
      return NextResponse.json({ success: false, error: error.message || 'Bulk update failed' }, { status: 500 })
    }

    log.info('Bulk update succeeded', { count: (data || []).length })

    return NextResponse.json({ success: true, updated: data || [], count: (data || []).length })
  } catch (error: any) {
    log.error('Unexpected error in bulk update', { error })
    return NextResponse.json({ success: false, error: 'Unexpected server error' }, { status: 500 })
  }
}
