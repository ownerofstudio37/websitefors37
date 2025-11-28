import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { createLogger } from '@/lib/logger'
import { v2 as cloudinary } from 'cloudinary'

const log = createLogger('api/admin/galleries/images')

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export const config = {
  api: {
    bodyParser: false,
  },
}

async function parseMultipartForm(request: NextRequest): Promise<FormData> {
  const contentType = request.headers.get('content-type') || ''
  if (!contentType.includes('multipart/form-data')) {
    throw new Error('Invalid content type')
  }
  return await request.formData()
}

// POST - Upload images to gallery
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const formData = await parseMultipartForm(request)
    const files = formData.getAll('images') as File[]

    if (!files || files.length === 0) {
      return NextResponse.json(
        { success: false, error: 'No images provided' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseAdmin()

    // Verify gallery exists
    const { data: gallery, error: galleryError } = await supabase
      .from('galleries')
      .select('id, total_photos')
      .eq('id', params.id)
      .single()

    if (galleryError || !gallery) {
      return NextResponse.json(
        { success: false, error: 'Gallery not found' },
        { status: 404 }
      )
    }

    const uploadedImages = []
    let uploadCount = 0

    for (const file of files) {
      try {
        // Convert File to Buffer
        const bytes = await file.arrayBuffer()
        const buffer = Buffer.from(bytes)

        // Upload to Cloudinary
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

        // Generate thumbnail and watermarked versions
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

        // Insert into database
        const { data: image, error: insertError } = await supabase
          .from('gallery_images')
          .insert({
            gallery_id: params.id,
            cloudinary_public_id: uploadResult.public_id,
            cloudinary_url: uploadResult.secure_url,
            thumbnail_url: thumbnailUrl,
            watermarked_url: watermarkedUrl,
            full_res_url: uploadResult.secure_url,
            filename: file.name,
            file_size: uploadResult.bytes,
            width: uploadResult.width,
            height: uploadResult.height,
            format: uploadResult.format,
            display_order: gallery.total_photos + uploadCount,
            is_available_for_purchase: true
          })
          .select()
          .single()

        if (!insertError && image) {
          uploadedImages.push(image)
          uploadCount++
        }
      } catch (uploadError: any) {
        log.error('Failed to upload image', { error: uploadError, filename: file.name })
      }
    }

    // Update gallery total_photos count
    await supabase
      .from('galleries')
      .update({ 
        total_photos: gallery.total_photos + uploadCount,
        updated_at: new Date().toISOString()
      })
      .eq('id', params.id)

    log.info('Images uploaded', { 
      galleryId: params.id, 
      count: uploadCount 
    })

    return NextResponse.json({
      success: true,
      images: uploadedImages,
      count: uploadCount
    }, { status: 201 })
  } catch (error: any) {
    log.error('Unexpected error', { error })
    return NextResponse.json(
      { success: false, error: 'Failed to upload images' },
      { status: 500 }
    )
  }
}

// DELETE - Delete image
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const url = new URL(request.url)
    const imageId = url.pathname.split('/').pop()

    if (!imageId) {
      return NextResponse.json(
        { success: false, error: 'Image ID required' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseAdmin()

    // Get image details
    const { data: image } = await supabase
      .from('gallery_images')
      .select('cloudinary_public_id, gallery_id')
      .eq('id', imageId)
      .single()

    if (!image) {
      return NextResponse.json(
        { success: false, error: 'Image not found' },
        { status: 404 }
      )
    }

    // Delete from Cloudinary
    try {
      await cloudinary.uploader.destroy(image.cloudinary_public_id)
    } catch (cloudinaryError) {
      log.warn('Failed to delete from Cloudinary', { error: cloudinaryError })
    }

    // Delete from database (cascade will handle related records)
    await supabase
      .from('gallery_images')
      .delete()
      .eq('id', imageId)

    // Decrement gallery photo count
    await supabase.rpc('decrement_gallery_photos', { gallery_id: image.gallery_id })

    log.info('Image deleted', { imageId, galleryId: image.gallery_id })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    log.error('Unexpected error', { error })
    return NextResponse.json(
      { success: false, error: 'Failed to delete image' },
      { status: 500 }
    )
  }
}
