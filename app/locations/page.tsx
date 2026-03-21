import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { locationPages } from '@/lib/location-pages'

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

export default function LocationsIndexPage() {
  return (
    <div className="min-h-screen pt-16 bg-gray-50">
      <section className="py-14 bg-white border-b border-gray-200">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Photography Service Areas</h1>
          <p className="text-lg text-gray-700 max-w-3xl">
            Studio37 serves clients across Montgomery County, North/Northwest Houston, East Montgomery County,
            and Brazos Valley. Browse your city below to view local photography service details.
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {locationPages.map((location) => (
              <Link
                key={location.slug}
                href={`/${location.slug.replace(/-tx$/, '')}`}
                className="bg-white border border-gray-200 rounded-lg p-5 hover:border-primary-300 hover:shadow-md transition-all"
              >
                <h2 className="text-xl font-semibold text-gray-900">{location.city}, TX</h2>
                <p className="text-sm text-gray-600 mt-1">{location.county} · {location.region}</p>
                <p className="text-sm text-gray-700 mt-3">{location.intro}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
