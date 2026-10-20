import Link from 'next/link'
import { ArrowRight, BookOpen } from 'lucide-react'
import { cityMentions } from '@/lib/city-mentions'
import { staticBlogPosts } from '@/lib/static-blog-posts'

// Blog posts that match a service, by title. Gives each service page links into the blog (and gives the
// posts links from the pages that rank for the service).
const TOPICS = {
  wedding: /wedding|bride|venue|luminaire|elopement|first look|aisle|peach orchard|big sky|iron manor|lead photographers/i,
  engagement: /engagement|proposal/i,
  proposal: /proposal|engagement/i,
  portrait: /portrait|senior|family|headshot|maternity|what to wear|golden hour|photoshoot/i,
  family: /family|kids|toddler|christmas|holiday|bluebonnet/i,
  senior: /senior|grad/i,
  maternity: /maternity|family/i,
  headshot: /headshot|linkedin/i,
  event: /event|party|corporate|quince|mixer/i,
  business: /brand|business|seo|ppc|website|marketing|stock|product photo|google maps|reels|template|media library|e-commerce/i,
} as const

export type GuideTopic = keyof typeof TOPICS

type Post = { title?: string; slug: string }

// The blog API returns database posts only; the code-based posts (lib/static-blog-posts) count too.
const withStaticPosts = (posts: Post[]) => {
  const slugs = new Set(posts.map((post) => post.slug))
  return [...posts, ...staticBlogPosts.filter((post) => !slugs.has(post.slug)).map(({ title, slug }) => ({ title, slug }))]
}

async function getPosts(): Promise<Post[]> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || 'https://www.studio37.cc'}/api/blog/list`, { next: { revalidate: 3600 } })
    if (!res.ok) return withStaticPosts([])
    const { posts = [] } = (await res.json()) as { posts?: Post[] }
    return withStaticPosts(posts)
  } catch {
    return withStaticPosts([])
  }
}

const cleanTitle = (title: string) => title.replace(/\s*\|\s*Studio\s?37.*$/i, '')

export default async function RelatedGuides({
  topic,
  city,
  heading = 'Planning guides',
  limit = 4,
}: {
  topic: GuideTopic
  city?: string
  heading?: string
  limit?: number
}) {
  const matches = (await getPosts()).filter((post) => TOPICS[topic].test(post.title || ''))
  // On city pages, posts about that city come first.
  const ordered = city
    ? [...matches.filter((post) => cityMentions(post.title || '', city) > 0), ...matches.filter((post) => cityMentions(post.title || '', city) === 0)]
    : matches
  const posts = ordered.slice(0, limit)
  if (posts.length === 0) return null

  return (
    <section className="section-shell bg-white" aria-labelledby={`guides-${topic}`}>
      <div className="container mx-auto px-4">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3">From the blog</p>
            <h2 id={`guides-${topic}`} className="text-2xl font-bold text-stone-950 md:text-3xl">
              {heading}
            </h2>
          </div>
          <Link href="/blog#blog-archive" className="inline-flex items-center text-sm font-semibold text-amber-800 hover:underline">
            Browse all guides
            <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {posts.map((post) => (
            <li key={post.slug}>
              <Link
                href={`/blog/${post.slug}`}
                className="group flex h-full items-start gap-3 rounded-lg border border-stone-200 bg-stone-50 p-4 transition hover:border-amber-300 hover:bg-white"
              >
                <BookOpen className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-700" aria-hidden="true" />
                <span className="font-semibold leading-snug text-stone-900 group-hover:text-amber-900">{cleanTitle(post.title || '')}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
