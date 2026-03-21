// Use anon supabase client to enable ISR caching (no cookies dependency)
// Fetch via server API to avoid RLS-related failures; API uses service role and returns only published fields
import Link from 'next/link'
import Image from 'next/image'
import { Suspense } from 'react'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Photography Blog - Tips & Insights from Studio37 Pinehurst, TX',
  description: 'Read the latest photography tips, techniques, and insights from Studio37\'s professional photography team in Pinehurst, Texas. Learn about wedding, portrait, and event photography.',
  keywords: [
    'photography blog',
    'photography tips Texas',
    'wedding photography advice',
    'portrait photography tips',
    'photography techniques',
    'Studio37 blog',
    'photographer insights Pinehurst'
  ],
  canonicalUrl: 'https://studio37.cc/blog'
})

// Cache this page for 10 minutes; blog posts are read-mostly
export const revalidate = 600

// Helper to validate remote image domains to avoid Next/Image throwing on unknown hosts
function isAllowedImageDomain(url: string): boolean {
  try {
    const u = new URL(url)
    if (['res.cloudinary.com', 'images.unsplash.com'].includes(u.hostname)) return true
    if (u.hostname.endsWith('.supabase.co')) return true
    // Allow same-origin images
    if (u.hostname === new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://studio37.cc').hostname) return true
    return false
  } catch {
    return false
  }
}

export default async function BlogPage() {
  let posts: any[] = []
  let error: any = null
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://studio37.cc'}/api/blog/list`, {
      // This runs on the server; respect ISR revalidation
      next: { revalidate: 600 },
      headers: { 'Accept': 'application/json' },
    })
    if (!res.ok) {
      const text = await res.text()
      throw new Error(text || `HTTP ${res.status}`)
    }
    const json = await res.json()
    posts = json.posts || []
  } catch (e: any) {
    console.error('Blog fetch via API failed:', e)
    error = e
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center mb-3">Studio 37 Blog</h1>
          <p className="text-xl text-gray-600 text-center max-w-2xl mx-auto">
            Photography insights, tips, and inspiration to help you capture life's precious moments.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {error ? (
          <div className="text-center py-12">
            <p className="text-red-600">Error loading blog posts</p>
            <p className="text-sm text-gray-500 mt-2">{typeof error === 'string' ? error : (error?.message || 'Unknown error')}</p>
          </div>
        ) : (!posts || posts.length === 0) ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No blog posts yet. Check back soon!</p>
            <p className="text-sm text-gray-400 mt-2">Tip: Ensure posts have published=true and pass Row Level Security for anon reads.</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-4 gap-10">
            <div className="lg:col-span-4 grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
              {posts.map((post: any) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                >
                  {post.featured_image && isAllowedImageDomain(post.featured_image) && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={post.featured_image}
                        alt={post.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-xl font-semibold mb-2 group-hover:text-primary-600 transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-gray-600 line-clamp-3 mb-4">{post.excerpt}</p>
                    )}
                    <div className="flex justify-between items-center text-sm text-gray-500">
                      <span>{post.author || 'Admin'}</span>
                      <span>
                        {post.published_at 
                          ? new Date(post.published_at).toLocaleDateString() 
                          : new Date(post.created_at || Date.now()).toLocaleDateString()
                        }
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* SEO Text Block */}
      <section className="py-14 bg-gray-50 border-t border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Photography Tips, Inspiration &amp; Insights from Studio37 in Pinehurst, TX</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to the Studio37 Photography blog — your resource for professional photography tips, wedding planning advice, portrait session preparation guides, and behind-the-scenes insights from Pinehurst, Texas's premier photography team. Our articles cover everything from how to choose the best outfit for your family portrait session to the top wedding venues in Montgomery County, TX, SEO strategies for local businesses using visual content, and how-to guides for getting the most out of your photography investment. Written by Christian and Caitie — the photographers and marketers behind Studio37 — each post draws on real-world experience serving clients across The Woodlands, Conroe, Willis, New Waverly, Huntsville, Spring, Tomball, Magnolia, Montgomery, New Caney, Porter, Splendora, Cleveland, Hockley, Waller, Plantersville, Navasota, Bryan, College Station, Cypress, Kingwood, Humble, Atascocita, and Greater Houston. Whether you're a soon-to-be bride researching wedding photographers in Pinehurst TX, a parent booking your teenager's senior portrait session, or a local business owner looking to improve your brand photography, you'll find actionable, honest guidance here. Explore our latest posts above, and when you're ready to book, contact Studio37 at (832) 713-9944 or visit studio37.cc.
            </p>
            <p className="text-sm text-gray-500">
              Studio37 Photography Blog · Pinehurst, TX · Montgomery County · The Woodlands · Conroe · Willis · New Waverly · Huntsville · New Caney · Porter · Splendora · Cleveland · Hockley · Waller · Plantersville · Navasota · Bryan · College Station · Houston Area
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
