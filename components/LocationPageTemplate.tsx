import Link from 'next/link'
import { LocationPage } from '@/lib/location-pages'
import { businessInfo } from '@/lib/seo-config'

interface LocationPageTemplateProps {
  location: LocationPage
  related: LocationPage[]
}

export default function LocationPageTemplate({ location, related }: LocationPageTemplateProps) {
  const locationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: `Photography Services in ${location.city}, TX`,
    areaServed: {
      '@type': 'City',
      name: `${location.city}, Texas`,
    },
    provider: {
      '@type': 'LocalBusiness',
      name: businessInfo.legalName,
      telephone: businessInfo.contact.phone,
      email: businessInfo.contact.email,
      url: businessInfo.contact.website,
      address: {
        '@type': 'PostalAddress',
        streetAddress: businessInfo.address.streetAddress,
        addressLocality: businessInfo.address.addressLocality,
        addressRegion: businessInfo.address.addressRegion,
        postalCode: businessInfo.address.postalCode,
        addressCountry: businessInfo.address.addressCountry,
      },
    },
    serviceType: [
      'Wedding Photography',
      'Portrait Photography',
      'Event Photography',
      'Commercial Photography',
    ],
  }

  return (
    <div className="min-h-screen pt-16 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(locationSchema) }}
      />

      <section className="py-14 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-600 mb-5">
            <Link href="/" className="hover:text-primary-700">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/locations" className="hover:text-primary-700">Locations</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{location.city}, TX</span>
          </nav>

          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Photography Services in {location.city}, Texas
          </h1>
          <p className="text-lg text-gray-700 max-w-4xl">
            Studio37 serves {location.city} and surrounding communities with wedding, portrait,
            event, and commercial photography. {location.intro} We provide two-photographer
            coverage, professional editing, and dependable communication from planning through
            delivery.
          </p>
          <p className="text-sm text-gray-500 mt-4">
            {location.county} · {location.region} · Call{' '}
            <a href={`tel:${businessInfo.contact.phone}`} className="hover:text-primary-700">
              {businessInfo.contact.phone}
            </a>
          </p>
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-5">
            <h2 className="text-2xl font-bold text-gray-900">
              Why clients in {location.city} choose Studio37
            </h2>
            <p className="text-gray-700">
              We build each session around your goals, timeline, and location logistics. For
              weddings and events, our Signature Duo Coverage captures both key moments and candid
              reactions. For portraits and branding, we guide wardrobe, shot planning, and location
              flow to maximize image variety.
            </p>
            <p className="text-gray-700">
              Popular nearby spots for sessions include {location.nearbySpots.join(', ')}. If you
              already have a venue in mind, we can scout it and build a custom shot list before your
              session date.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">
                Popular services in {location.city}
              </h3>
              <ul className="grid sm:grid-cols-2 gap-2 text-gray-700">
                <li>• Wedding photography</li>
                <li>• Engagement sessions</li>
                <li>• Family portraits</li>
                <li>• Senior portraits</li>
                <li>• Corporate events</li>
                <li>• Commercial brand content</li>
              </ul>
            </div>
          </div>

          <aside className="bg-white border border-gray-200 rounded-lg p-6 h-fit">
            <h3 className="text-xl font-semibold text-gray-900 mb-3">
              Book in {location.city}
            </h3>
            <p className="text-sm text-gray-700 mb-4">
              Ready to plan your session? We&apos;ll recommend the best package and timeline for
              your goals.
            </p>
            <div className="space-y-3">
              <Link href="/book-a-session" className="btn-primary w-full text-center block">
                Book a Session
              </Link>
              <Link
                href="/book-consultation"
                className="btn-secondary w-full text-center block"
              >
                Book Consultation
              </Link>
              <Link
                href="/contact"
                className="w-full text-center block border border-gray-300 rounded-md py-2 hover:bg-gray-50"
              >
                Contact Studio37
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {related.length > 0 && (
        <section className="py-12 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl font-bold text-gray-900 mb-5">
              Nearby service area pages
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {related.map((city) => (
                <Link
                  key={city.slug}
                  href={`/${city.slug.replace(/-tx$/, '')}`}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:border-primary-300 transition-colors"
                >
                  <p className="font-semibold text-gray-900">{city.city}, TX</p>
                  <p className="text-sm text-gray-600">{city.county}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
