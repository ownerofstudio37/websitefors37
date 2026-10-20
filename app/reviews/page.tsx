import Link from 'next/link'
import { ArrowRight, ExternalLink, Star } from 'lucide-react'
import ReviewCard from '@/components/ReviewCard'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateBreadcrumbSchema } from '@/lib/enhanced-seo-schemas'
import { businessInfo } from '@/lib/seo-config'
import { studio37Reviews, thumbtackRating } from '@/lib/public-content'

export const metadata = generateSEOMetadata({
  title: 'Studio37 Reviews | Pinehurst, TX Photographer',
  description: `Read what Studio37 clients say about our wedding, proposal, portrait, family, event, and business photography. Rated ${thumbtackRating.rating} on Thumbtack from ${thumbtackRating.count} reviews.`,
  canonicalUrl: `${businessInfo.contact.website}/reviews`,
  ogImage: 'https://res.cloudinary.com/dmjxho2rl/image/upload/f_jpg,q_auto:best,w_1200,h_630,c_fill,g_auto/Untitled_tpoc5r.jpg',
})

// Reviews are copied from the public Google and Thumbtack profiles. Self-serving review markup is not eligible
// for star rich results, so the page carries no Review or AggregateRating schema.
const GROUPS = [
  { title: 'Proposals and portraits', types: ['Proposal', 'Portrait'], href: '/services/portrait-photography', link: 'Portrait photography' },
  { title: 'Families', types: ['Family'], href: '/family-photography', link: 'Family photography' },
  { title: 'Events and parties', types: ['Event'], href: '/services/event-photography', link: 'Event photography' },
  { title: 'Business photography', types: ['Commercial'], href: '/services/commercial-photography', link: 'Commercial photography' },
]

export default function ReviewsPage() {
  const site = businessInfo.contact.website
  const { google, thumbtack } = businessInfo.reviewProfiles
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: site },
    { name: 'Reviews', url: `${site}/reviews` },
  ])

  return (
    <div className="min-h-screen bg-stone-50 pt-[4.5rem] lg:pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <header className="border-b border-stone-200 bg-white py-10 md:py-14">
        <div className="container mx-auto px-4">
          <p className="eyebrow mb-4">Client reviews</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-stone-950 md:text-5xl">What our clients say</h1>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <div className="flex gap-1 text-amber-500" role="img" aria-label="5 out of 5 stars">
              {Array.from({ length: 5 }).map((_, index) => (
                <Star key={index} className="h-6 w-6 fill-current" aria-hidden="true" />
              ))}
            </div>
            <p className="text-lg font-semibold text-stone-900">
              {thumbtackRating.rating} on Thumbtack from {thumbtackRating.count} reviews, with Top Pro status
            </p>
          </div>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
            A selection of reviews from our Google and Thumbtack profiles. Read every review, unedited, on either site.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <a href={google} target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex items-center justify-center gap-2">
              Read our Google reviews
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
            <a href={thumbtack} target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex items-center justify-center gap-2">
              Read our Thumbtack reviews
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10 md:py-14">
        {GROUPS.map((group) => {
          const reviews = studio37Reviews.filter((review) => group.types.includes(review.service))
          if (reviews.length === 0) return null
          return (
            <section key={group.title} aria-labelledby={`reviews-${group.types[0]}`} className="mb-12">
              <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                <h2 id={`reviews-${group.types[0]}`} className="text-2xl font-bold text-stone-950 md:text-3xl">
                  {group.title}
                </h2>
                <Link href={group.href} className="inline-flex items-center text-sm font-semibold text-amber-800 hover:underline">
                  {group.link}
                  <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {reviews.map((review) => (
                  <ReviewCard key={review.name} review={review} />
                ))}
              </div>
            </section>
          )
        })}

        <section className="grid gap-6 rounded-2xl border border-stone-200 bg-white p-6 md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <h2 className="text-2xl font-bold text-stone-950">Ready to plan yours?</h2>
            <p className="mt-2 leading-7 text-stone-600">
              Tell us what you are planning and we will recommend the right coverage, with prices up front. Already a client? A Google review helps
              other families and couples find us.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Link href="/book-consultation" className="btn-primary inline-flex items-center justify-center gap-2">
              Book a free consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <a href={google} target="_blank" rel="noopener noreferrer" className="btn-secondary inline-flex items-center justify-center">
              Leave a Google review
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}
