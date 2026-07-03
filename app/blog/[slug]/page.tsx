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
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, meta_description, excerpt, meta_keywords')
    .eq('slug', params.slug)
    .eq('published', true)
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
  const { data: post, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', params.slug)
    .eq('published', true)
    .maybeSingle()
  
  const staticPost = getStaticBlogPost(params.slug)

  if ((!post || (error && (error as any).status === 406)) && !staticPost) {
    notFound()
  }

  const articlePost = post || staticPost!
  
  // Get related posts using same admin client
  const { data: relatedPosts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, published_at')
    .eq('published', true)
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

      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <Link href="/blog" className="inline-flex items-center text-primary-600 hover:text-primary-800 mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Blog
          </Link>
          <h1 className="text-4xl font-bold mb-4">{articlePost.title}</h1>
          
          <div className="flex flex-wrap items-center text-sm text-gray-600 mb-6">
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
                    className="text-xs bg-gray-200 px-2 py-1 rounded mr-2 mb-2"
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
        <div className="container mx-auto px-4 py-6">
          <div className="relative h-96 w-full">
            <Image
              src={articlePost.featured_image}
              alt={articlePost.title}
              fill
              className="object-cover rounded-lg"
            />
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="w-full">
          {articlePost.excerpt && (
            <div className="text-xl text-gray-600 mb-8 italic border-l-4 border-primary-500 pl-4 py-2">
              {articlePost.excerpt}
            </div>
          )}
          
          <article className="prose lg:prose-lg max-w-none">
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
              <div className="mt-16 pt-12 border-t">
                <h3 className="text-2xl font-bold mb-6">Related Articles</h3>
                <div className="grid md:grid-cols-3 gap-6">
                  {(relatedPosts && relatedPosts.length > 0 ? relatedPosts : fallbackRelatedPosts).map((relatedPost) => (
                    <Link 
                      key={relatedPost.slug}
                      href={`/blog/${relatedPost.slug}`}
                      className="p-4 border rounded-lg hover:shadow-md transition-shadow"
                    >
                      <p className="text-sm text-gray-500 mb-2">
                        {new Date(relatedPost.published_at).toLocaleDateString()}
                      </p>
                      <h4 className="font-bold hover:text-primary-600 transition-colors">
                        {relatedPost.title}
                      </h4>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <section className="mt-16 pt-12 border-t border-gray-200">
              <h3 className="text-2xl font-bold mb-4">Plan Your Session with Studio37</h3>
              <p className="text-gray-600 mb-6">
                Compare services, check package fit, or request complete galleries when you&apos;re ready to see proof that matches your project.
              </p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
                <Link href="/services/wedding-photography" className="px-4 py-3 rounded-lg border border-stone-300 hover:border-primary-400 hover:bg-primary-50 transition-colors">Wedding Photography</Link>
                <Link href="/services/portrait-photography" className="px-4 py-3 rounded-lg border border-stone-300 hover:border-primary-400 hover:bg-primary-50 transition-colors">Portrait Sessions</Link>
                <Link href="/services/event-photography" className="px-4 py-3 rounded-lg border border-stone-300 hover:border-primary-400 hover:bg-primary-50 transition-colors">Event Photography</Link>
                <Link href="/tools/package-recommender" className="px-4 py-3 rounded-lg border border-stone-300 hover:border-primary-400 hover:bg-primary-50 transition-colors">Compare Packages</Link>
                <Link href="/request-portfolio" className="px-4 py-3 rounded-lg border border-stone-300 hover:border-primary-400 hover:bg-primary-50 transition-colors">Request Complete Galleries</Link>
                <Link href="/book-consultation" className="px-4 py-3 rounded-lg border border-primary-600 bg-primary-600 text-white hover:bg-primary-700 transition-colors">Book Consultation</Link>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
