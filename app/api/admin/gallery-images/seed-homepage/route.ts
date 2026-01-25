import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { createLogger } from '@/lib/logger'

const log = createLogger('api/admin/gallery-images/seed-homepage')

// POST: Seed homepage gallery images and mark as featured
export async function POST(_req: NextRequest) {
  try {
    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      log.warn('Service role key missing')
      return NextResponse.json({ success: false, error: 'Service key not configured' }, { status: 500 })
    }

    const supabase = getSupabaseAdmin()

    // Static Cloudinary images to seed
    const TARGET_IMAGES = [
      {
        image_url: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1769255715/PS374317_mqqiyv.jpg',
        title: 'Portfolio Highlight 1',
        alt_text: 'Studio37 portfolio highlight',
        description: 'Featured work — homepage',
        category: 'homepage',
        featured: true,
      },
      {
        image_url: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1769255713/D9E4E5AE-12BE-498B-B7C1-9CDE7FFC1B59_qiaj3v.jpg',
        title: 'Portfolio Highlight 2',
        alt_text: 'Studio37 portfolio highlight',
        description: 'Featured work — homepage',
        category: 'homepage',
        featured: true,
      },
      {
        image_url: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1769255711/PS372952_gkvxjl.jpg',
        title: 'Portfolio Highlight 3',
        alt_text: 'Studio37 portfolio highlight',
        description: 'Featured work — homepage',
        category: 'homepage',
        featured: true,
      },
      {
        image_url: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1769255706/PS373287_d7fl9k.jpg',
        title: 'Portfolio Highlight 4',
        alt_text: 'Studio37 portfolio highlight',
        description: 'Featured work — homepage',
        category: 'homepage',
        featured: true,
      },
      {
        image_url: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1769255672/PS379781_kttvv3.jpg',
        title: 'Portfolio Highlight 5',
        alt_text: 'Studio37 portfolio highlight',
        description: 'Featured work — homepage',
        category: 'homepage',
        featured: true,
      },
    ] as const

    // Find which already exist by image_url
    const { data: existing, error: selectErr } = await supabase
      .from('gallery_images')
      .select('id,image_url')
      .in('image_url', TARGET_IMAGES.map((i) => i.image_url))

    if (selectErr) {
      log.error('Select existing failed', { error: selectErr })
      return NextResponse.json({ success: false, error: 'Failed to query existing images' }, { status: 500 })
    }

    const existingUrls = new Set((existing || []).map((e) => e.image_url))
    const toInsert = TARGET_IMAGES.filter((i) => !existingUrls.has(i.image_url))

    let inserted: any[] = []
    if (toInsert.length > 0) {
      const { data: ins, error: insertErr } = await supabase
        .from('gallery_images')
        .insert(
          toInsert.map((i) => ({
            title: i.title,
            description: i.description,
            image_url: i.image_url,
            category: i.category,
            featured: i.featured,
            alt_text: i.alt_text,
            created_at: new Date().toISOString(),
          }))
        )
        .select()

      if (insertErr) {
        log.error('Insert missing failed', { error: insertErr })
        return NextResponse.json({ success: false, error: 'Failed to insert images' }, { status: 500 })
      }
      inserted = ins || []
    }

    // Ensure all targeted images have featured=true and alt/title/category set per image
    const updates = await Promise.all(
      TARGET_IMAGES.map(async (i) => {
        const { data, error } = await supabase
          .from('gallery_images')
          .update({
            featured: true,
            category: i.category,
            title: i.title,
            alt_text: i.alt_text,
            description: i.description,
          })
          .eq('image_url', i.image_url)
          .select()
        if (error) {
          log.error('Per-image update failed', { image_url: i.image_url, error })
          return null
        }
        return data || []
      })
    )

    const updatedCount = updates.reduce((acc, cur) => acc + (cur ? cur.length : 0), 0)

    log.info('Seed homepage images complete', {
      inserted: inserted.length,
      updated: updatedCount,
    })

    return NextResponse.json({
      success: true,
      message: 'Homepage images seeded and marked featured',
      inserted: inserted,
      updatedCount,
    })
  } catch (error: any) {
    log.error('Unexpected error seeding homepage images', { error })
    return NextResponse.json({ success: false, error: 'Unexpected server error' }, { status: 500 })
  }
}
