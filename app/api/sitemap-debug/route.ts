import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key'
const baseUrl = 'https://www.studio37.cc'

/**
 * Debug endpoint to troubleshoot sitemap generation
 * Access at: https://www.studio37.cc/api/sitemap-debug
 */
export async function GET() {
  const supabase = createClient(supabaseUrl, supabaseKey)
  const debugInfo: any = {
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
    baseUrl,
    supabaseConfigured: !!supabaseUrl && !!supabaseKey,
  }

  // Test database connection
  try {
    const { data: pages, error } = await supabase
      .from('content_pages')
      .select('slug, published')
      .eq('published', true)
      .limit(10)

    if (error) {
      debugInfo.databaseError = error.message
      debugInfo.databaseConnection = 'failed'
    } else {
      debugInfo.databaseConnection = 'success'
      debugInfo.contentPagesCount = pages?.length || 0
      debugInfo.contentPagesSample = pages?.map(p => p.slug) || []
    }
  } catch (error: any) {
    debugInfo.databaseException = error.message
    debugInfo.databaseConnection = 'exception'
  }

  // Test blog posts
  try {
    const { data: posts, error } = await supabase
      .from('blog_posts')
      .select('slug, published')
      .eq('published', true)
      .limit(10)

    if (error) {
      debugInfo.blogError = error.message
    } else {
      debugInfo.blogPostsCount = posts?.length || 0
      debugInfo.blogPostsSample = posts?.map(p => p.slug) || []
    }
  } catch (error: any) {
    debugInfo.blogException = error.message
  }

  // Show what static routes SHOULD be in sitemap
  debugInfo.staticRoutesExpected = [
    '/',
    '/services',
    '/services/wedding-photography',
    '/services/portrait-photography',
    '/services/event-photography',
    '/services/commercial-photography',
    '/services/family-photography',
    '/services/senior-portraits',
    '/services/professional-headshots',
    '/services/maternity-sessions',
    '/book-a-session',
    '/contact',
    '/local-photographer-pinehurst-tx',
    '/local-photographer-magnolia-tx',
    '/gallery',
    '/about',
    '/blog',
  ]

  debugInfo.sitemapRoute = '/sitemap.xml'
  debugInfo.buildInfo = {
    gitCommit: process.env.COMMIT_REF || 'unknown',
    netlifyBuildId: process.env.BUILD_ID || 'unknown',
    deployContext: process.env.CONTEXT || 'unknown',
  }

  return NextResponse.json(debugInfo, {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'no-store, no-cache, must-revalidate',
    },
  })
}
