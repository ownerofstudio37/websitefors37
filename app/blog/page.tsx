// Use anon supabase client to enable ISR caching (no cookies dependency)
// Fetch via server API to avoid RLS-related failures; API uses service role and returns only published fields
import Link from 'next/link'
import Image from 'next/image'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { staticBlogPosts } from '@/lib/static-blog-posts'

export const metadata = generateSEOMetadata({
  title: 'Photography Planning Guides | Studio37 Pinehurst, TX',
  description: 'Clear Studio37 guides for choosing a photography service, planning locations, preparing for portraits, weddings, events, and brand shoots around Pinehurst and Greater Houston.',
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

  const featuredPost = posts[0]
  const articlePosts = posts.slice(featuredPost ? 1 : 0, 18)

  return (
    <div className="min-h-screen pt-16">
      <div className="bg-stone-950 py-14 text-white md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl text-center">
            <p className="eyebrow-hero mb-4">Studio37 Guides</p>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">Plan better photos before you book.</h1>
            <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-stone-200">
              Straightforward advice for choosing a service, preparing for your session, picking locations, and knowing what to expect from Studio37.
            </p>
          </div>
        </div>
      </div>

      <div className="border-b border-stone-200 bg-white">
        <div className="container mx-auto grid gap-3 px-4 py-5 text-sm font-semibold text-stone-700 md:grid-cols-5">
          <Link href="/services/portrait-photography" className="rounded-lg bg-stone-50 px-4 py-3 transition hover:bg-amber-50 hover:text-amber-900">Portrait planning</Link>
          <Link href="/services/wedding-photography" className="rounded-lg bg-stone-50 px-4 py-3 transition hover:bg-amber-50 hover:text-amber-900">Wedding planning</Link>
          <Link href="/services/engagement-photography" className="rounded-lg bg-stone-50 px-4 py-3 transition hover:bg-amber-50 hover:text-amber-900">Engagement prep</Link>
          <Link href="/tools/package-recommender" className="rounded-lg bg-stone-50 px-4 py-3 transition hover:bg-amber-50 hover:text-amber-900">Choose a package</Link>
          <Link href="/book-a-session" className="rounded-lg bg-stone-950 px-4 py-3 text-white transition hover:bg-amber-700">Book or consult</Link>
        </div>
      </div>

      <div className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="mb-10 max-w-3xl">
            <p className="eyebrow mb-3">Latest Articles</p>
            <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">Guides for real shoots, not generic photo tips</h2>
            <p className="mt-3 text-stone-600">
              Start here if you want to know what to book, how we plan locations and light, what clients usually ask, and what happens after your inquiry.
            </p>
            <div className="mt-5 flex flex-wrap gap-2 text-sm font-semibold">
              <Link href="/book-a-session" className="rounded-full bg-primary-700 px-4 py-2 text-white hover:bg-primary-800">Ready to talk</Link>
              <Link href="/services" className="rounded-full border border-stone-300 px-4 py-2 text-stone-800 hover:bg-stone-100">Compare services</Link>
              <Link href="/locations" className="rounded-full border border-stone-300 px-4 py-2 text-stone-800 hover:bg-stone-100">Browse local areas</Link>
            </div>
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
            {featuredPost && (
              <Link href={`/blog/${featuredPost.slug}`} className="group mb-10 grid overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl lg:grid-cols-[1.15fr_0.85fr]">
                <div className="relative min-h-[260px] bg-gradient-to-br from-stone-100 via-amber-50 to-stone-200">
                  {featuredPost.featured_image && isAllowedImageDomain(featuredPost.featured_image) ? (
                    <Image
                      src={featuredPost.featured_image}
                      alt={featuredPost.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-end p-6">
                      <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-stone-700">Featured Guide</span>
                    </div>
                  )}
                </div>
                <div className="flex flex-col justify-center p-6 md:p-8">
                  <p className="eyebrow mb-3">Featured Guide</p>
                  <h2 className="text-3xl font-bold leading-tight text-stone-950 group-hover:text-primary-700">{featuredPost.title}</h2>
                  {featuredPost.excerpt && <p className="mt-4 text-stone-600 leading-7">{featuredPost.excerpt}</p>}
                  <span className="mt-6 text-sm font-semibold text-primary-700">Read the guide →</span>
                </div>
              </Link>
            )}
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-8">
                {articlePosts.map((post: any) => {
                  const hasImage = post.featured_image && isAllowedImageDomain(post.featured_image)
                  return (
                    <Link
                      key={post.id}
                      href={`/blog/${post.slug}`}
                      className="group flex h-full flex-col overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                    >
                      <div className="relative aspect-[16/10] w-full overflow-hidden bg-gradient-to-br from-stone-100 via-amber-50 to-stone-200">
                        {hasImage ? (
                          <Image
                            src={post.featured_image}
                            alt={post.title}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="absolute inset-0 flex items-end p-5">
                            <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-stone-700">
                              Studio37 Journal
                            </span>
                          </div>
                        )}
                      </div>
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
                  )
                })}
              </div>
            {posts.length > 18 && (
              <p className="mt-8 text-center text-sm text-stone-600">
                Showing the newest guides first. More archive filtering is coming as the guide library grows.
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
            <h2 className="text-2xl font-bold text-stone-950 mb-4">Practical photography planning from Studio37</h2>
            <p className="text-stone-700 leading-relaxed mb-4">
              The Studio37 guide library helps clients make confident photography decisions before they book. You will find planning notes for portraits, weddings, events, engagement sessions, local photo locations, wardrobe prep, gallery expectations, and commercial content shoots. Each article is written from real Studio37 experience serving Pinehurst, Montgomery County, The Woodlands, Conroe, Magnolia, Tomball, Spring, and Greater Houston.
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
