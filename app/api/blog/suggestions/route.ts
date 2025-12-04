import { NextRequest, NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export const dynamic = 'force-dynamic'

export async function GET() {
  // Fetch recent blog post titles, slugs, and keywords
  const { data: posts, error: postsError } = await supabase
    .from('blog_posts')
    .select('title, slug, meta_keywords, tags, category')
    .order('created_at', { ascending: false })
    .limit(20)

  // Fetch site context (about page, services)
  const { data: about, error: aboutError } = await supabase
    .from('content_pages')
    .select('title, content')
    .eq('slug', 'about')
    .maybeSingle()

  const { data: services, error: servicesError } = await supabase
    .from('content_pages')
    .select('title, content')
    .eq('slug', 'services')
    .maybeSingle()

  // Aggregate unique keywords/tags
  const allKeywords = new Set<string>()
  const allTopics = new Set<string>()
  if (posts) {
    posts.forEach((p) => {
      if (p.title) allTopics.add(p.title)
      if (Array.isArray(p.meta_keywords)) p.meta_keywords.forEach((k: string) => allKeywords.add(k))
      if (typeof p.meta_keywords === 'string') p.meta_keywords.split(',').forEach((k: string) => allKeywords.add(k.trim()))
      if (Array.isArray(p.tags)) p.tags.forEach((k: string) => allKeywords.add(k))
      if (p.category) allKeywords.add(p.category)
    })
  }

  return NextResponse.json({
    suggestions: {
      topics: Array.from(allTopics).slice(0, 10),
      keywords: Array.from(allKeywords).slice(0, 15),
      about: about?.content || '',
      services: services?.content || '',
    },
  })
}
