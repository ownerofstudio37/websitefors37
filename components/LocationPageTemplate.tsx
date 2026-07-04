import Link from 'next/link'
import Image from 'next/image'
import { LocationPage } from '@/lib/location-pages'
import { businessInfo } from '@/lib/seo-config'
import { PortfolioProofSection, WhatHappensNextSection } from '@/components/PublicConversionSections'
import ServiceAreaMarketModules from '@/components/ServiceAreaMarketModules'
import { BestPhotoLocationsSection } from '@/components/PublicFeatureContent'

interface LocationPageTemplateProps {
  location: LocationPage
  related: LocationPage[]
}

export default function LocationPageTemplate({ location, related }: LocationPageTemplateProps) {
  const heroImage = 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1759639187/A4B03835-ED8B-4FBB-A27E-1F2EE6CA1A18_1_105_c_gstgil_e_gen_restore_e_improve_e_sharpen_l_image_upload_My_Brand_IMG_2115_mtuowt_c_scale_fl_relative_w_0.40_o_80_fl_layer_apply_g_south_x_0.03_y_0.04_yqgycj.jpg'
  const venueExamples = location.nearbySpots.slice(0, 3)
  const primarySpot = location.nearbySpots[0] || `${location.city} area`
  const backupSpot = location.nearbySpots[1] || `${location.region} backup location`
  const localConfidence = [
    ['Best local fit', `${primarySpot} usually works well as a planning anchor for portraits, engagements, or venue-adjacent coverage in ${location.city}.`],
    ['Parking + walking', `We confirm parking, walking distance, shade, restroom access, and meeting-point clarity before recommending a final ${location.city} location.`],
    ['Backup plan', `${backupSpot} gives us a nearby fallback if weather, crowds, access, or light direction changes on session day.`],
    ['Best light window', `For outdoor sessions in ${location.region}, we usually plan softer morning or late-day light before locking the final timeline.`],
  ]
  const serviceLinks = [
    { label: `Wedding photography in ${location.city}`, href: '/services/wedding-photography' },
    { label: `Portrait sessions in ${location.city}`, href: '/services/portrait-photography' },
    { label: `Event coverage in ${location.city}`, href: '/services/event-photography' },
    { label: `Commercial content in ${location.city}`, href: '/services/commercial-photography' },
  ]

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

      <section className="relative overflow-hidden border-b border-stone-200 bg-stone-950 text-white">
        <div className="absolute inset-0 opacity-35">
          <Image
            src={heroImage}
            alt={`Studio37 photography near ${location.city}, TX`}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="relative z-10 container mx-auto grid gap-10 px-4 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
          <nav className="text-sm text-stone-300 mb-5">
            <Link href="/" className="hover:text-primary-700">Home</Link>
            <span className="mx-2">/</span>
            <Link href="/locations" className="hover:text-primary-700">Locations</Link>
            <span className="mx-2">/</span>
            <span className="text-white font-medium">{location.city}, TX</span>
          </nav>

          <p className="eyebrow-hero mb-3">{location.region} · {location.county}</p>
          <h1 className="text-4xl font-bold mb-4 md:text-5xl">
            Photography Services in {location.city}, Texas
          </h1>
          <p className="text-lg text-stone-100 max-w-4xl leading-8">
            Studio37 serves {location.city} and surrounding communities with wedding, portrait,
            event, and commercial photography. {location.intro} We provide two-photographer
            coverage, professional editing, and dependable communication from planning through
            delivery.
          </p>
          <p className="text-sm text-stone-300 mt-4">
            {location.county} · {location.region} · Call{' '}
            <a href={`tel:${businessInfo.contact.phone}`} className="hover:text-amber-200">
              {businessInfo.contact.phone}
            </a>
          </p>
          </div>
          <div className="rounded-lg border border-white/15 bg-white/10 p-5 backdrop-blur-md">
            <p className="text-sm uppercase tracking-[0.18em] text-amber-200">Local Planning Notes</p>
            <div className="mt-4 grid gap-3">
              {venueExamples.map((spot) => (
                <div key={spot} className="rounded-lg bg-white/10 p-3">
                  <p className="font-medium">{spot}</p>
                  <p className="mt-1 text-sm text-stone-300">Useful for portraits, engagement looks, event coverage, or nearby venue timing.</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="mb-5 max-w-3xl">
            <p className="eyebrow mb-2">Local Confidence</p>
            <h2 className="text-2xl font-bold text-stone-950">How we plan around {location.city}, TX</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {localConfidence.map(([title, copy]) => (
              <div key={title} className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                <h3 className="font-semibold text-stone-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-700">{copy}</p>
              </div>
            ))}
          </div>
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
            <p className="text-gray-700">
              For {location.city} sessions, the planning priority is matching the service to the location:
              weddings need timeline buffers, portraits need clean light and easy walking, events need access
              notes, and commercial shoots need usage-ready shot lists.
            </p>

            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">
                Popular services in {location.city}
              </h3>
              <div className="grid gap-3 sm:grid-cols-2">
                {serviceLinks.map((service) => (
                  <Link
                    key={service.label}
                    href={service.href}
                    className="rounded-lg border border-stone-200 bg-white px-4 py-3 text-sm font-medium text-stone-800 hover:border-amber-300 hover:text-amber-800"
                  >
                    {service.label}
                  </Link>
                ))}
              </div>
              <div className="mt-5 rounded-lg bg-white p-4 text-sm leading-6 text-stone-700">
                Session ideas near {location.city}: {location.nearbySpots.join(', ')}. We can build a shot list around natural light, parking, timeline pressure, and your final gallery goals.
              </div>
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
            <div className="mt-5 pt-5 border-t border-gray-200">
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-3">Plan Before You Book</p>
              <div className="space-y-2 text-sm">
                <Link href="/tools/package-recommender" className="block text-primary-700 hover:underline">
                  Find the best package
                </Link>
                <Link href="/tools/pricing" className="block text-primary-700 hover:underline">
                  Compare portrait pricing
                </Link>
                <Link href="/session-prep" className="block text-primary-700 hover:underline">
                  Review session prep guides
                </Link>
              </div>
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

      <ServiceAreaMarketModules compact />
      <BestPhotoLocationsSection slug={location.slug} city={location.city} />
      <PortfolioProofSection serviceName={`${location.city} photography`} />
      <WhatHappensNextSection serviceName={`${location.city} photography session`} />
    </div>
  )
}
