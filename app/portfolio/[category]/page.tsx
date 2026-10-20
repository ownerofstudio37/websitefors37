import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, ChevronRight } from 'lucide-react'
import PortfolioGallery from '@/components/PortfolioGallery'
import RelatedGuides from '@/components/RelatedGuides'
import ReviewCard from '@/components/ReviewCard'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateBreadcrumbSchema } from '@/lib/enhanced-seo-schemas'
import { businessInfo } from '@/lib/seo-config'
import { getPortfolioCategory, portfolioCategories } from '@/lib/portfolio'
import { studio37Reviews } from '@/lib/public-content'
import { cldUrl } from '@/components/CldImg'

export const dynamicParams = false

export function generateStaticParams() {
  return portfolioCategories.map(({ slug }) => ({ category: slug }))
}

export function generateMetadata({ params }: { params: { category: string } }) {
  const category = getPortfolioCategory(params.category)
  if (!category) return {}
  return generateSEOMetadata({
    title: category.title,
    description: category.description,
    canonicalUrl: `${businessInfo.contact.website}/portfolio/${category.slug}`,
    ogImage: cldUrl(category.photos[0].id, 1200, ',c_fill,g_auto,ar_1.91'),
  })
}

export default function PortfolioCategoryPage({ params }: { params: { category: string } }) {
  const category = getPortfolioCategory(params.category)
  if (!category) notFound()

  const site = businessInfo.contact.website
  const reviews = studio37Reviews
    .filter((review) => (category.reviewNames ? category.reviewNames.includes(review.name) : category.reviewTypes.includes(review.service)))
    .slice(0, 3)
  const others = portfolioCategories.filter((other) => other.slug !== category.slug)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: site },
    { name: 'Portfolio', url: `${site}/portfolio` },
    { name: category.label, url: `${site}/portfolio/${category.slug}` },
  ])

  return (
    <div className="min-h-screen bg-stone-50 pt-[4.5rem] lg:pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <header className="border-b border-stone-200 bg-white py-10 md:py-14">
        <div className="container mx-auto px-4">
          <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-sm font-semibold text-stone-500">
            <Link href="/portfolio" className="hover:text-amber-800 hover:underline">
              Portfolio
            </Link>
            <ChevronRight className="h-4 w-4" aria-hidden="true" />
            <span className="text-stone-700">{category.label}</span>
          </nav>
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-end">
            <div className="max-w-3xl">
              <h1 className="text-4xl font-bold leading-tight text-stone-950 md:text-5xl">{category.h1}</h1>
              <p className="mt-4 text-lg leading-8 text-stone-600">{category.intro}</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link href="/book-consultation" className="btn-primary inline-flex items-center justify-center gap-2">
                Book a free consultation
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href={category.serviceHref} className="btn-secondary inline-flex items-center justify-center">
                {category.serviceLabel} · {category.priceNote.replace(/^\w+ from /, 'from ')}
              </Link>
            </div>
          </div>
        </div>
      </header>

      <section aria-label={`${category.label} photos`} className="container mx-auto px-4 py-10 md:py-14">
        <PortfolioGallery photos={category.photos} />
        <div className="mt-8 flex flex-col gap-4 rounded-2xl border border-stone-200 bg-white p-6 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold text-stone-950">Want to see a complete gallery?</h2>
            <p className="mt-1 leading-7 text-stone-600">
              These are highlights. We can send full private galleries from sessions like yours, so you see every image a client receives.
            </p>
          </div>
          <Link href="/request-portfolio" className="btn-secondary inline-flex flex-shrink-0 items-center justify-center">
            Request a full gallery
          </Link>
        </div>
      </section>

      {reviews.length > 0 && (
        <section aria-labelledby="portfolio-reviews" className="border-t border-stone-200 bg-white py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
              <h2 id="portfolio-reviews" className="text-2xl font-bold text-stone-950 md:text-3xl">
                What these clients said
              </h2>
              <Link href="/reviews" className="inline-flex items-center text-sm font-semibold text-amber-800 hover:underline">
                Read all reviews
                <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
            <div className={`grid gap-4 ${reviews.length > 2 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
              {reviews.map((review) => (
                <ReviewCard key={review.name} review={review} />
              ))}
            </div>
          </div>
        </section>
      )}

      <RelatedGuides topic={category.guideTopic} heading={`${category.serviceLabel} guides`} />

      <nav aria-labelledby="more-portfolios" className="border-t border-stone-200 bg-stone-50 py-12">
        <div className="container mx-auto px-4">
          <h2 id="more-portfolios" className="mb-5 text-2xl font-bold text-stone-950">
            More of our work
          </h2>
          <ul className="grid grid-cols-2 gap-3 md:grid-cols-5">
            {others.map((other) => (
              <li key={other.slug}>
                <Link
                  href={`/portfolio/${other.slug}`}
                  className="group block overflow-hidden rounded-lg border border-stone-200 bg-white transition hover:border-amber-300"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={cldUrl(other.photos[0].id, 480, ',c_fill,g_auto,ar_4:3', 'good')}
                    alt=""
                    width={480}
                    height={360}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <span className="block p-3 text-sm font-semibold text-stone-900 group-hover:text-amber-900">{other.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  )
}
