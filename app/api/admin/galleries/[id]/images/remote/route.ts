import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { createLogger } from '@/lib/logger'
import { v2 as cloudinary } from 'cloudinary'

const log = createLogger('api/admin/galleries/images/remote')
export const dynamic = 'force-dynamic'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

interface RemoteUploadResult {
  id: string
  filename: string
  cloudinary_url: string
  thumbnail_url: string
  watermarked_url: string
  display_order: number
  is_featured: boolean
  view_count: number
  favorite_count: number
  download_count: number
}

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const contentType = request.headers.get('content-type') || ''
    if (!contentType.includes('application/json')) {
      return NextResponse.json({ success: false, error: 'Use JSON body {"urls": []}' }, { status: 400 })
    }
    const body = await request.json()
    const urls: string[] = Array.isArray(body.urls) ? body.urls : []

    if (urls.length === 0) {
      return NextResponse.json({ success: false, error: 'No URLs provided' }, { status: 400 })
    }
    if (urls.length > 25) {
      return NextResponse.json({ success: false, error: 'Too many URLs (max 25 per request)' }, { status: 400 })
    }

    const supabase = getSupabaseAdmin()
    // Verify gallery
    const { data: gallery, error: galleryError } = await supabase
      .from('galleries')
      .select('id, total_photos')
      .eq('id', params.id)
      .single()
    if (galleryError || !gallery) {
      return NextResponse.json({ success: false, error: 'Gallery not found' }, { status: 404 })
    }

    let uploadIndexOffset = gallery.total_photos
    const results: RemoteUploadResult[] = []

    for (const rawUrl of urls) {
      const url = String(rawUrl).trim()
      if (!url) continue
      try {
        const resp = await fetch(url)
        if (!resp.ok) {
          log.warn('Skip URL fetch failed', { url, status: resp.status })
          continue
        }
        const contentTypeHeader = resp.headers.get('content-type') || ''
        if (!contentTypeHeader.startsWith('image/')) {
          log.warn('Skip non-image URL', { url, contentTypeHeader })
          continue
        }
        const arrayBuffer = await resp.arrayBuffer()
        const buffer = Buffer.from(arrayBuffer)

        const uploadResult = await new Promise<any>((resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: `galleries/${params.id}`,
              resource_type: 'image',
              transformation: [
                { width: 2000, height: 2000, crop: 'limit', quality: 'auto' }
              ]
            },
            (error, result) => {
              if (error) reject(error)
              else resolve(result)
            }
          )
          uploadStream.end(buffer)
        })

        const thumbnailUrl = cloudinary.url(uploadResult.public_id, {
          width: 400,
          height: 400,
          crop: 'fill',
          quality: 'auto',
          format: 'jpg'
        })

        const watermarkedUrl = cloudinary.url(uploadResult.public_id, {
          transformation: [
            { width: 1200, height: 1200, crop: 'limit', quality: 'auto' },
            {
              overlay: 'text:Arial_40_bold:© Studio37',
              gravity: 'south_east',
              x: 20,
              y: 20,
              opacity: 50
            }
          ],
          format: 'jpg'
        })

        const { data: image, error: insertError } = await supabase
          .from('gallery_images')
          .insert({
            gallery_id: params.id,
            cloudinary_public_id: uploadResult.public_id,
            cloudinary_url: uploadResult.secure_url,
            thumbnail_url: thumbnailUrl,
            watermarked_url: watermarkedUrl,
            full_res_url: uploadResult.secure_url,
            filename: uploadResult.original_filename || uploadResult.public_id,
            file_size: uploadResult.bytes,
            width: uploadResult.width,
            height: uploadResult.height,
            format: uploadResult.format,
            display_order: uploadIndexOffset,
            is_available_for_purchase: true
          })
          .select()
          .single()

        if (insertError) {
          log.error('DB insert failed for remote image', { url, error: insertError })
          continue
        }

        results.push({
          id: image.id,
          filename: image.filename,
            cloudinary_url: image.cloudinary_url,
            thumbnail_url: image.thumbnail_url,
            watermarked_url: image.watermarked_url,
            display_order: image.display_order,
            is_featured: image.is_featured || false,
            view_count: image.view_count || 0,
            favorite_count: image.favorite_count || 0,
            download_count: image.download_count || 0
        })
        uploadIndexOffset++
      } catch (err) {
        log.error('Remote URL ingestion failed', { url, error: err })
      }
    }

    // Update gallery photo count
    if (results.length > 0) {
      await supabase
        .from('galleries')
        .update({ total_photos: gallery.total_photos + results.length, updated_at: new Date().toISOString() })
        .eq('id', params.id)
    }

    log.info('Remote images ingested', { galleryId: params.id, count: results.length })

    return NextResponse.json({ success: true, images: results, count: results.length })
  } catch (error: any) {
    log.error('Unexpected remote ingestion error', { error })
    return NextResponse.json({ success: false, error: 'Failed remote URL upload' }, { status: 500 })
  }
}
