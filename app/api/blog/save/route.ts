import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { createLogger } from '@/lib/logger'

const log = createLogger('api/blog/save')

export const dynamic = 'force-dynamic'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { id, ...postData } = body

    // Validate required fields
    if (!postData.title || !postData.slug || !postData.content) {
      return NextResponse.json(
        { error: 'Missing required fields: title, slug, and content are required' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseAdmin()

    // Process meta_keywords if it's a comma-separated string
    if (typeof postData.meta_keywords === 'string') {
      postData.meta_keywords = postData.meta_keywords
        .split(',')
        .map((k: string) => k.trim())
        .filter(Boolean)
    }

    // Set published_at timestamp if publishing
    if (postData.published && !postData.published_at) {
      postData.published_at = new Date().toISOString()
    }
    if (!postData.published) {
      postData.published_at = null
    }

    if (id) {
      // Update existing post
      const { data, error } = await supabase
        .from('blog_posts')
        .update({
          ...postData,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single()

      if (error) {
        log.error('Error updating blog post', { error, id })
        throw error
      }

      let savedPost = data
      if (postData.published && postData.published_at && data.published_at !== postData.published_at) {
        const { data: scheduledData, error: scheduledError } = await supabase
          .from('blog_posts')
          .update({ published_at: postData.published_at })
          .eq('id', id)
          .select()
          .single()

        if (scheduledError) {
          log.error('Error preserving scheduled publish time', { error: scheduledError, id })
          throw scheduledError
        }
        savedPost = scheduledData
      }

      log.info('Blog post updated', { id, title: postData.title })

      return NextResponse.json({
        success: true,
        post: savedPost,
      })
    } else {
      // Create new post
      const { data, error } = await supabase
        .from('blog_posts')
        .insert([postData])
        .select()
        .single()

      if (error) {
        log.error('Error creating blog post', { error })
        throw error
      }

      log.info('Blog post created', { id: data.id, title: postData.title })

      return NextResponse.json({
        success: true,
        post: data,
      })
    }
  } catch (error: any) {
    log.error('Unexpected error saving blog post', { error })
    return NextResponse.json(
      { error: error.message || 'Failed to save blog post' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')

    if (!id) {
      return NextResponse.json(
        { error: 'Blog post ID is required' },
        { status: 400 }
      )
    }

    const supabase = getSupabaseAdmin()

    const { error } = await supabase
      .from('blog_posts')
      .delete()
      .eq('id', id)

    if (error) {
      log.error('Error deleting blog post', { error, id })
      throw error
    }

    log.info('Blog post deleted', { id })

    return NextResponse.json({
      success: true,
      message: 'Blog post deleted successfully',
    })
  } catch (error: any) {
    log.error('Unexpected error deleting blog post', { error })
    return NextResponse.json(
      { error: error.message || 'Failed to delete blog post' },
      { status: 500 }
    )
  }
}
