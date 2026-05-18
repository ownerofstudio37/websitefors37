import { Metadata } from 'next'
import { createClient } from '@supabase/supabase-js'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeRaw from 'rehype-raw'
import rehypeHighlight from 'rehype-highlight'
import { MDXBuilderComponents } from '@/components/BuilderRuntime'

export const revalidate = 600 // 10 minutes

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'public-anon-placeholder'

async function getPortfolioPageData() {
  const supabase = createClient(supabaseUrl, supabaseAnonKey)
  const { data, error } = await supabase
    .from('content_pages')
    .select('*')
    .eq('slug', 'portfolio')
    .maybeSingle()

  if (error) {
    console.error('Portfolio page fetch failed:', error)
    return null
  }

  return data
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPortfolioPageData()

  return {
    title: page?.seo_title || 'Portfolio | Studio37',
    description: page?.seo_description || 'View our photography portfolio showcasing weddings, portraits, events, and commercial work.',
    keywords: page?.seo_keywords || 'portfolio, photography portfolio, wedding photos, event photography',
  }
}

export default async function PortfolioPage() {
  const page = await getPortfolioPageData()

  if (!page?.content) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-4">Portfolio</h1>
        <p className="text-lg text-gray-600">
          Use the <a href="/admin/live-editor" className="text-blue-600 hover:underline">Live Editor</a> to build this page.
        </p>
      </div>
    )
  }

  return (
    <article className="min-h-screen">
      <MDXRemote
        source={page.content}
        components={MDXBuilderComponents}
        options={{
          mdxOptions: {
            rehypePlugins: [rehypeRaw, rehypeHighlight],
          },
        }}
      />
    </article>
  )
}
