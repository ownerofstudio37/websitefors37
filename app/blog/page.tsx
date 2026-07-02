// Use anon supabase client to enable ISR caching (no cookies dependency)
// Fetch via server API to avoid RLS-related failures; API uses service role and returns only published fields
import Link from 'next/link'
import Image from 'next/image'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { staticBlogPosts } from '@/lib/static-blog-posts'

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
  canonicalUrl: 'https://www.studio37.cc/blog'
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
    if (u.hostname === new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://www.studio37.cc').hostname) return true
    return false
  } catch {
    return false
  }
}

export default async function BlogPage() {
  let posts: any[] = []
  let error: any = null
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.studio37.cc'}/api/blog/list`, {
      // This runs on the server; respect ISR revalidation
      next: { revalidate: 600 },
      headers: { 'Accept': 'application/json' },
    })
    if (!res.ok) {
      const text = await res.text()
      throw new Error(text || `HTTP ${res.status}`)
    }
    const json = await res.json()
    const remotePosts = json.posts || []
    const remoteSlugs = new Set(remotePosts.map((post: any) => post.slug))
    posts = [
      ...remotePosts,
      ...staticBlogPosts.filter((post) => !remoteSlugs.has(post.slug)),
    ]
  } catch (e: any) {
    console.error('Blog fetch via API failed:', e)
    error = e
    posts = staticBlogPosts
  }

  return (
    <div className="min-h-screen pt-16">
      <div className="bg-stone-950 py-16 text-white md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow-hero mb-4">Studio37 Journal</p>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">Photography planning, prep, and local insight</h1>
            <p className="mt-5 text-lg leading-8 text-stone-200">
              Practical guidance for portraits, weddings, events, brand work, and polished sessions across Pinehurst and Greater Houston.
            </p>
          </div>
        </div>
      </div>

      <div className="border-b border-stone-200 bg-white">
        <div className="container mx-auto grid gap-3 px-4 py-5 text-sm font-semibold text-stone-700 md:grid-cols-3">
          <span className="rounded-lg bg-stone-50 px-4 py-3">Local planning and timing</span>
          <span className="rounded-lg bg-stone-50 px-4 py-3">Wardrobe and session prep</span>
          <span className="rounded-lg bg-stone-50 px-4 py-3">Business content strategy</span>
        </div>
      </div>

      <div className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow mb-3">Latest Articles</p>
            <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">Fresh notes from the Studio37 team</h2>
            <p className="mt-3 text-stone-600">
              Use these as quick references before a session, while comparing services, or when planning a visual refresh.
            </p>
          </div>
          {error && posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-red-600">Error loading blog posts</p>
              <p className="text-sm text-gray-500 mt-2">{typeof error === 'string' ? error : (error?.message || 'Unknown error')}</p>
            </div>
          ) : (!posts || posts.length === 0) ? (
            <div className="text-center py-12">
              <p className="text-stone-500">No blog posts yet. Check back soon!</p>
            </div>
          ) : (
            <>
            <div className="grid lg:grid-cols-4 gap-10">
              <div className="lg:col-span-4 grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {posts.slice(0, 18).map((post: any) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-lg border border-stone-200 bg-white transition hover:-translate-y-1 hover:shadow-xl"
                  >
                    {post.featured_image && isAllowedImageDomain(post.featured_image) && (
                      <div className="relative aspect-[16/10] w-full bg-stone-200">
                        <Image
                          src={post.featured_image}
                          alt={post.title}
                          fill
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="flex flex-1 flex-col p-6">
                      <h2 className="text-xl font-semibold text-stone-950 mb-2 group-hover:text-primary-700 transition-colors">
                        {post.title}
                      </h2>
                      {post.excerpt && (
                        <p className="mb-5 line-clamp-3 flex-1 text-stone-600">{post.excerpt}</p>
                      )}
                      <div className="mt-auto flex justify-between gap-4 border-t border-stone-100 pt-4 text-sm text-stone-500">
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
            {posts.length > 18 && (
              <p className="mt-8 text-center text-sm text-stone-600">
                Showing the latest 18 articles. Use search or admin categories for deeper archive browsing.
              </p>
            )}
            </>
          )}
        </div>
      </div>

      {/* SEO Text Block */}
      <section className="section-shell bg-white border-t border-stone-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-stone-950 mb-4">Photography Tips, Inspiration &amp; Insights from Studio37 in Pinehurst, TX</h2>
            <p className="text-stone-700 leading-relaxed mb-4">
              Welcome to the Studio37 Photography blog — your resource for professional photography tips, wedding planning advice, portrait session preparation guides, and behind-the-scenes insights from Pinehurst, Texas's premier photography team. Our articles cover everything from how to choose the best outfit for your family portrait session to the top wedding venues in Montgomery County, TX, SEO strategies for local businesses using visual content, and how-to guides for getting the most out of your photography investment. Written by Christian and Caitie — the photographers and marketers behind Studio37 — each post draws on real-world experience serving clients across The Woodlands, Conroe, Magnolia, Tomball, Spring, Montgomery, Willis, New Caney, Hockley, Huntsville, and Greater Houston. Whether you're a soon-to-be bride researching wedding photographers in Pinehurst TX, a parent booking your teenager's senior portrait session, or a local business owner looking to improve your brand photography, you'll find actionable, honest guidance here. Explore our latest posts above, and when you're ready to book, contact Studio37 at (832) 713-9944 or visit www.studio37.cc.
            </p>
            <p className="text-sm text-stone-500">
              Studio37 Photography Blog · Pinehurst, TX · Montgomery County · The Woodlands · Conroe · Magnolia · Tomball · Spring · Montgomery · Willis · New Caney · Hockley · Huntsville · Houston Area
            </p>
            <p className="text-sm mt-2">
              Looking for city-specific details? <a href="/locations" className="text-primary-700 hover:underline">Browse service area pages</a>.
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}
