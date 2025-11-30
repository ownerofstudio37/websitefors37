import { NextRequest, NextResponse } from 'next/server'
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { rateLimit, getClientIp } from '@/lib/rateLimit'
import { createLogger } from '@/lib/logger'

const log = createLogger('api/blog/list')

export const revalidate = 600 // cache for 10 minutes

export async function GET(request: NextRequest) {
  const ip = getClientIp(request.headers)
  const rl = rateLimit(`blog:list:${ip}`, { limit: 60, windowMs: 60 * 1000 })
  if (!rl.allowed) {
    return NextResponse.json({ error: 'Too many requests' }, { status: 429 })
  }

  try {
    const supabase = getSupabaseAdmin()
    const { data, error } = await supabase
      .from('blog_posts')
      .select('id,title,slug,excerpt,featured_image,published,published_at,created_at,author')
      .eq('published', true)
      .order('published_at', { ascending: false, nullsLast: true })
      .order('created_at', { ascending: false })

    if (error) {
      log.error('Blog list fetch error', { error })
      return NextResponse.json({ error: 'Failed to fetch blog posts' }, { status: 500 })
    }

    return NextResponse.json({ posts: data || [] }, { status: 200 })
  } catch (err: any) {
    log.error('Blog list unexpected error', { err: String(err) })
    return NextResponse.json({ error: 'Unexpected error' }, { status: 500 })
  }
}
