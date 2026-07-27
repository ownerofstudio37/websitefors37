import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
// Use admin client for blog posts to bypass RLS (blog list also uses admin)
import { getSupabaseAdmin } from '@/lib/supabaseAdmin'
import { notFound } from 'next/navigation'
import { Calendar, User, Tag, ArrowLeft } from 'lucide-react'
import { MDXRemote } from 'next-mdx-remote/rsc'
import rehypeHighlight from 'rehype-highlight'
import rehypeRaw from 'rehype-raw'
import { generateSEOMetadata, generateArticleSchema } from '@/lib/seo-helpers'
import { businessInfo } from '@/lib/seo-config'
import { generateBreadcrumbSchema } from '@/lib/enhanced-seo-schemas'
import ComparePackagesCTA from '@/components/ComparePackagesCTA'
import { getStaticBlogPost, staticBlogPosts } from '@/lib/static-blog-posts'

const isValidSlug = (s: string) => /^[a-z0-9-]{1,200}$/.test(s) // Increased from 64 to 200 chars for longer blog titles

// Force fresh server render to avoid stale edge variants for crawlers/structured data
export const dynamic = 'force-dynamic'

// Generate metadata dynamically based on blog post
export async function generateMetadata({ params }: { params: { slug: string } }) {
  if (!isValidSlug(params.slug)) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found'
    }
  }
  
  const supabase = getSupabaseAdmin()
  const now = new Date().toISOString()
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, meta_description, excerpt, meta_keywords')
    .eq('slug', params.slug)
    .eq('published', true)
    .or(`published_at.is.null,published_at.lte.${now}`)
    .maybeSingle()
  
  const staticPost = getStaticBlogPost(params.slug)

  if (!post && !staticPost) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found'
    }
  }

  if (staticPost) {
    return generateSEOMetadata({
      title: staticPost.title,
      description: staticPost.meta_description,
      keywords: staticPost.meta_keywords,
      canonicalUrl: `${businessInfo.contact.website}/blog/${staticPost.slug}`,
      pageType: 'article'
    })
  }

  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found'
    }
  }

  return generateSEOMetadata({
    title: post.title,
    description: post.meta_description || post.excerpt || 'Studio 37 Photography Blog',
    keywords: post.meta_keywords || [],
    canonicalUrl: `${businessInfo.contact.website}/blog/${params.slug}`,
    pageType: 'article'
  })
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  if (!isValidSlug(params.slug)) {
    notFound()
  }
  
  const supabase = getSupabaseAdmin()
  const now = new Date().toISOString()
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .or(`published_at.is.null,published_at.lte.${now}`)
    .maybeSingle()
  
  const staticPost = getStaticBlogPost(params.slug)

  if ((!post || (error && (error as any).status === 406)) && !staticPost) {
    notFound()
  }

  const articlePost = post || staticPost!
  const featuredImagePosition =
    typeof (articlePost as any).featured_image_position === 'string'
      ? (articlePost as any).featured_image_position
      : '50% 40%'
  
  // Get related posts using same admin client
  const { data: relatedPosts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, published_at')
    .eq('published', true)
    .or(`published_at.is.null,published_at.lte.${now}`)
    .neq('id', articlePost.id || '')
    .order('published_at', { ascending: false })
    .limit(3)
  const fallbackRelatedPosts = staticBlogPosts
    .filter((item) => item.slug !== articlePost.slug)
    .slice(0, 3)

  // Generate Article schema for SEO
  const articleSchema = generateArticleSchema({
    headline: articlePost.title,
    description: articlePost.meta_description || articlePost.excerpt || '',
    image: articlePost.featured_image || `${businessInfo.contact.website}/api/og?title=${encodeURIComponent(articlePost.title)}`,
    datePublished: articlePost.published_at || articlePost.created_at,
    dateModified: articlePost.updated_at,
    author: articlePost.author || 'Studio 37',
    url: `${businessInfo.contact.website}/blog/${articlePost.slug}`
  })

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: businessInfo.contact.website },
    { name: 'Blog', url: `${businessInfo.contact.website}/blog` },
    { name: articlePost.title, url: `${businessInfo.contact.website}/blog/${articlePost.slug}` },
  ])
  
  return (
    <div className="min-h-screen pt-16">
      {/* Article Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <div className="border-b border-stone-200 bg-stone-50 py-10 md:py-12">
        <div className="container mx-auto px-4">
          <Link href="/blog" className="mb-6 inline-flex items-center text-sm font-semibold text-primary-700 hover:text-primary-900">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to guides
          </Link>
          <div className="max-w-5xl">
            <p className="eyebrow mb-4">Studio37 Journal</p>
            <h1 className="text-4xl font-bold leading-tight text-stone-950 md:text-6xl">{articlePost.title}</h1>
          </div>
          
          <div className="mt-6 flex flex-wrap items-center text-sm text-stone-600">
            <div className="flex items-center mr-6 mb-2">
              <Calendar className="h-4 w-4 mr-1" />
              <span>
                {articlePost.published_at
                  ? new Date(articlePost.published_at).toLocaleDateString()
                  : new Date(articlePost.created_at || Date.now()).toLocaleDateString()
                }
              </span>
            </div>
            <div className="flex items-center mr-6 mb-2">
              <User className="h-4 w-4 mr-1" />
              <span>{articlePost.author}</span>
            </div>
            {articlePost.tags && articlePost.tags.length > 0 && (
              <div className="flex items-center flex-wrap">
                <Tag className="h-4 w-4 mr-2" />
                {articlePost.tags.map((tag: string, index: number) => (
                  <span 
                    key={index} 
                    className="mb-2 mr-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-stone-700 ring-1 ring-stone-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {articlePost.featured_image && (
        <div className="container mx-auto px-4 py-8">
          <div className="relative h-80 w-full overflow-hidden rounded-lg border border-stone-200 bg-stone-100 shadow-sm sm:h-96 lg:h-[30rem] xl:h-[34rem]">
            <Image
              src={articlePost.featured_image}
              alt={articlePost.title}
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              priority
              quality={88}
              className="object-cover"
              style={{ objectPosition: featuredImagePosition }}
            />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="w-full">
          {articlePost.excerpt && (
            <div className="mb-8 border-l-4 border-primary-500 bg-stone-50 py-4 pl-5 pr-4 text-xl italic leading-8 text-stone-600">
              {articlePost.excerpt}
            </div>
          )}
          
          <article className="prose max-w-none prose-stone lg:prose-lg prose-headings:text-stone-950 prose-a:text-primary-700">
            <MDXRemote 
              source={articlePost.content}
              options={{
                mdxOptions: {
                  rehypePlugins: [[rehypeRaw as any, {
                    passThrough: ['mdxJsxFlowElement', 'mdxJsxTextElement'],
                  }] as any, [rehypeHighlight, {}] as any]
                }
              }}
            />
          </article>

            <ComparePackagesCTA context="this session" />
          
            {((relatedPosts && relatedPosts.length > 0) || fallbackRelatedPosts.length > 0) && (
              <div className="mt-16 border-t border-stone-200 pt-12">
                <h3 className="mb-6 text-2xl font-bold text-stone-950">Related Guides</h3>
                <div className="grid gap-4 md:grid-cols-3">
                  {(relatedPosts && relatedPosts.length > 0 ? relatedPosts : fallbackRelatedPosts).map((relatedPost) => (
                    <Link 
                      key={relatedPost.slug}
                      href={`/blog/${relatedPost.slug}`}
                      className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                    >
                      <p className="mb-2 text-sm text-stone-500">
                        {new Date(relatedPost.published_at).toLocaleDateString()}
                      </p>
                      <h4 className="font-bold text-stone-950 transition-colors hover:text-primary-700">
                        {relatedPost.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <section className="mt-16 rounded-lg border border-stone-200 bg-stone-50 p-6 md:p-8">
              <h3 className="mb-4 text-2xl font-bold text-stone-950">Plan Your Session with Studio37</h3>
              <p className="mb-6 text-stone-600">
                Compare services, check package fit, or request complete galleries when you&apos;re ready to see proof that matches your project.
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                <Link href="/services/wedding-photography" className="rounded-lg border border-stone-300 bg-white px-4 py-3 transition-colors hover:border-primary-400 hover:bg-primary-50">Wedding Photography</Link>
                <Link href="/services/portrait-photography" className="rounded-lg border border-stone-300 bg-white px-4 py-3 transition-colors hover:border-primary-400 hover:bg-primary-50">Portrait Sessions</Link>
                <Link href="/services/event-photography" className="rounded-lg border border-stone-300 bg-white px-4 py-3 transition-colors hover:border-primary-400 hover:bg-primary-50">Event Photography</Link>
                <Link href="/tools/package-recommender" className="rounded-lg border border-stone-300 bg-white px-4 py-3 transition-colors hover:border-primary-400 hover:bg-primary-50">Compare Packages</Link>
                <Link href="/request-portfolio" className="rounded-lg border border-stone-300 bg-white px-4 py-3 transition-colors hover:border-primary-400 hover:bg-primary-50">Request Complete Galleries</Link>
                <Link href="/book-consultation" className="rounded-lg border border-primary-700 bg-primary-700 px-4 py-3 text-white transition-colors hover:bg-primary-800">Book Consultation</Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
