import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateBreadcrumbSchema } from '@/lib/enhanced-seo-schemas'
import { locationPages } from '@/lib/location-pages'
import ServiceAreaMarketModules from '@/components/ServiceAreaMarketModules'
import LocationsFilterGrid from '@/components/LocationsFilterGrid'

export const metadata = generateSEOMetadata({
  title: 'Photography Service Areas in Texas',
  description:
    'Explore Studio37 photography service areas across Montgomery County, North Houston, and Brazos Valley. View dedicated location pages for local wedding, portrait, event, and commercial photography.',
  keywords: [
    'photography service areas Texas',
    'local photographer near me',
    'Montgomery County photographer',
    'North Houston photographer',
    'Brazos Valley photographer',
  ],
  canonicalUrl: 'https://www.studio37.cc/locations',
  pageType: 'service',
})

export const revalidate = 86400

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://www.studio37.cc' },
  { name: 'Locations', url: 'https://www.studio37.cc/locations' },
])

export default function LocationsIndexPage() {
  return (
    <div className="min-h-screen pt-24 bg-gray-50">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <section className="py-14 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Photography Service Areas</h1>
          <p className="text-lg text-gray-700 max-w-3xl">
            Studio37 serves clients across Montgomery County, North/Northwest Houston, East Montgomery County,
            and Brazos Valley. Browse your city below to view local photography service details.
          </p>
        </div>
      </section>

      <section className="bg-white border-y border-gray-200 py-8">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Link href="/tools/package-recommender" className="rounded-lg border border-stone-200 bg-stone-50 p-4 hover:border-amber-300">
              <h2 className="font-semibold text-stone-950">Find your best package</h2>
              <p className="mt-2 text-sm text-stone-600">Match your city, service, and coverage needs before booking.</p>
            </Link>
            <Link href="/tools/pricing" className="rounded-lg border border-stone-200 bg-stone-50 p-4 hover:border-amber-300">
              <h2 className="font-semibold text-stone-950">Compare portrait pricing</h2>
              <p className="mt-2 text-sm text-stone-600">Estimate portrait timing and package fit with current pricing.</p>
            </Link>
            <Link href="/session-prep" className="rounded-lg border border-stone-200 bg-stone-50 p-4 hover:border-amber-300">
              <h2 className="font-semibold text-stone-950">Review prep guides</h2>
              <p className="mt-2 text-sm text-stone-600">Get ready for portraits, weddings, events, or commercial shoots.</p>
            </Link>
          </div>
        </div>
      </section>

      <LocationsFilterGrid locations={locationPages} />

      <ServiceAreaMarketModules />
    </div>
  )
}
