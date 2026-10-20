import Link from 'next/link'
import { ArrowRight, Star } from 'lucide-react'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateBreadcrumbSchema } from '@/lib/enhanced-seo-schemas'
import { businessInfo } from '@/lib/seo-config'
import { portfolioCategories } from '@/lib/portfolio'
import { thumbtackRating } from '@/lib/public-content'
import { cldUrl } from '@/components/CldImg'

export const metadata = generateSEOMetadata({
  title: 'Photography Portfolio | Pinehurst, TX | Studio37',
  description:
    'Browse Studio37 photography by type: weddings, engagements and proposals, portraits and headshots, families, seniors, and events across Pinehurst and Greater Houston.',
  canonicalUrl: `${businessInfo.contact.website}/portfolio`,
})

export default function PortfolioPage() {
  const site = businessInfo.contact.website
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: site },
    { name: 'Portfolio', url: `${site}/portfolio` },
  ])

  return (
    <div className="min-h-screen bg-stone-50 pt-[4.5rem] lg:pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <header className="border-b border-stone-200 bg-white py-10 md:py-14">
        <div className="container mx-auto px-4">
          <p className="eyebrow mb-4">Portfolio</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-stone-950 md:text-5xl">Our work, by the kind of session you are planning</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
            Real clients from weddings, proposals, portraits, family sessions, and events around Pinehurst, Montgomery County, and Greater Houston.
          </p>
          <Link href="/reviews" className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-stone-700 hover:text-amber-800">
            <Star className="h-4 w-4 fill-amber-500 text-amber-500" aria-hidden="true" />
            {thumbtackRating.rating} on Thumbtack from {thumbtackRating.count} reviews
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </header>

      <section aria-label="Portfolio categories" className="container mx-auto px-4 py-10 md:py-14">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {portfolioCategories.map((category, index) => (
            <li key={category.slug}>
              <Link
                href={`/portfolio/${category.slug}`}
                className="group block h-full overflow-hidden rounded-2xl border border-stone-200 bg-white transition hover:border-amber-300 hover:shadow-lg"
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cldUrl(category.photos[0].id, 800, ',c_fill,g_auto,ar_4:3')}
                  srcSet={[480, 800, 1200].map((width) => `${cldUrl(category.photos[0].id, width, ',c_fill,g_auto,ar_4:3')} ${width}w`).join(', ')}
                  sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  alt={category.photos[0].alt}
                  width={800}
                  height={600}
                  loading={index < 3 ? 'eager' : 'lazy'}
                  decoding="async"
                  className="aspect-[4/3] w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="p-5">
                  <h2 className="text-xl font-bold text-stone-950 group-hover:text-amber-900">{category.label}</h2>
                  <p className="mt-1 text-sm text-stone-600">
                    {category.photos.length} photos · {category.priceNote}
                  </p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="border-t border-stone-200 bg-white py-12 md:py-16">
        <div className="container mx-auto grid gap-8 px-4 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="text-2xl font-bold text-stone-950 md:text-3xl">Complete galleries, by request</h2>
            <p className="mt-3 leading-7 text-stone-600">
              The pages above are highlights. Ask for a full private gallery from a session like yours and we will send one, so you can see
              every image a client receives. Our featured best-of collection lives on our gallery site.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:justify-end">
            <Link href="/request-portfolio" className="btn-primary inline-flex items-center justify-center gap-2">
              Request a full gallery
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="https://gallery.studio37.cc" className="btn-secondary inline-flex items-center justify-center">
              Featured gallery site
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
