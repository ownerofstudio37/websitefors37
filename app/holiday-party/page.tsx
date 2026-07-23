import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'
import PrepGuideLeadMagnet from '@/components/PrepGuideLeadMagnet'
import PortraitSubServiceSupport from '@/components/PortraitSubServiceSupport'

export const metadata = generateSEOMetadata({
  title: 'Holiday Party Photography Houston & Montgomery County | Studio37',
  description:
    'Holiday party photography for corporate holiday parties, private celebrations, decor, group photos, candids, and fast recap delivery in Houston and Montgomery County.',
  canonicalUrl: 'https://www.studio37.cc/holiday-party',
  pageType: 'service',
})

export const revalidate = 86400

const packages = [
  {
    name: 'Classic Coverage',
    price: '$600',
    duration: '2 hours',
    features: ['2 hours coverage', '50+ edited images', 'Festive candids', '72-hour highlights preview', 'Private digital gallery'],
  },
  {
    name: 'Complete Holiday Coverage',
    price: '$1,000',
    duration: '4 hours',
    features: ['4 hours coverage', '125+ edited images', 'Group photos and details', '24-hour sneak peek', 'Private digital gallery'],
    popular: true,
  },
  {
    name: 'Premium Party Package',
    price: '$1,800',
    duration: 'Up to 8 hours',
    features: ['Up to 8 hours coverage', '250+ edited images', 'Full party story', 'Custom mobile gallery', 'Private digital gallery'],
  },
]

export default function HolidayPartyPage() {
  const serviceSchema = generateServiceSchema(
    'Holiday Party Photography',
    'Professional holiday party photography for corporate holiday parties, family celebrations, and festive events in the Houston area.'
  )

  return (
    <main className="w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {/* Hero Section */}
      <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-black">
        <Image
          src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1769255305/PS375684_f4qlih.jpg"
          alt="Studio37 holiday party photography with festive event coverage"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Holiday Party Photography</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Capture festive moments and holiday joy with professional photography for your celebration
          </p>
        </div>
      </section>

      {/* Package Options */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Holiday Party Photography Packages</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Professional coverage for corporate holiday parties, family celebrations, and festive events
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`border rounded-lg p-8 hover:shadow-lg transition ${
                  pkg.popular ? 'border-2 border-green-600 bg-green-50' : 'border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <div className="inline-block bg-green-600 text-white px-4 py-1 rounded-full text-sm mb-2 font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-4xl font-bold text-green-600 mb-2">{pkg.price}</p>
                <p className="text-gray-600 mb-4">{pkg.duration}</p>
                <ul className="space-y-2 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="text-gray-700 flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={`/book-consultation?package=${encodeURIComponent(pkg.name)}`} className="block w-full text-center bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition font-semibold">
                  Book Consultation
                </Link>
                <Link href={`/book-a-session?package=${encodeURIComponent(pkg.name)}`} className="mt-3 block text-center text-sm font-semibold text-green-700 hover:underline">
                  Start Event Booking
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="grid gap-4 md:grid-cols-3">
            {[
              ['Business parties', 'Team photos, branded decor, leadership moments, sponsor details, and recap-ready images.'],
              ['Private celebrations', 'Family groups, festive details, candid joy, gift exchanges, traditions, and guest coverage.'],
              ['Book early', 'Holiday dates compress quickly, so we plan lighting, group-photo timing, and delivery expectations upfront.'],
            ].map(([title, copy]) => (
              <div key={title} className="surface-panel p-5">
                <h2 className="font-semibold text-stone-950">{title}</h2>
                <p className="mt-2 text-sm leading-6 text-stone-600">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PortraitSubServiceSupport
        service="holiday party photography"
        parentHref="/services/event-photography"
        parentLabel="event photography"
        proof={[
          'Corporate and private holiday party examples with decor, team photos, candids, and group coverage.',
          'Low-light reception and festive venue examples with clean color and flash work.',
          'Fast sharing sets for newsletters, social posts, internal recaps, and family keepsakes.',
        ]}
        planning={['Lighting and decor review', 'Group photo timing', 'Recap delivery plan']}
        objection="Holiday parties often have tough lighting and tight schedules. We plan group photos, decor coverage, and candid windows so the gallery feels festive without interrupting the event."
      />

      {/* SEO Content Block */}
      <section className="py-12 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Capture Holiday Memories with Professional Photography</h2>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Studio37 Photography specializes in holiday party photography across the Houston area, including
              Pinehurst, The Woodlands, Conroe, Magnolia, Tomball, Spring, and surrounding communities. Holiday
              celebrations are filled with festive moments, cherished traditions, and special time with people you
              love. Professional photography captures these memories in a way that lets you relive the joy for years
              to come.
            </p>

            <p>
              Whether you're hosting a corporate holiday party, a family celebration, an ugly sweater party, a holiday
              dinner, or any festive gathering, our photographers understand how to capture the warmth, laughter, and
              spirit that define holiday moments. We work around decorations, lighting, and the energy of celebration
              to create beautiful images.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Holiday Party Photography Coverage:</h3>
            <ul className="space-y-2 ml-4">
              <li>• <strong>Festive Moments:</strong> Candid photos of guests enjoying food, drinks, and celebration</li>
              <li>• <strong>Holiday Décor:</strong> Beautiful shots of Christmas trees, garland, lights, and decorations</li>
              <li>• <strong>Group Photos:</strong> Family photos, company team photos, and guest group pictures</li>
              <li>• <strong>Traditions:</strong> Special moments like gift exchanges, holiday toasts, or tree decorating</li>
              <li>• <strong>Candid Joy:</strong> Laughter, dancing, and genuine moments of celebration and connection</li>
              <li>• <strong>Professional Quality:</strong> Professional editing that captures the holiday magic</li>
            </ul>

            <p className="mt-6">
              Holiday photos serve multiple purposes: immediate sharing on social media and company newsletters,
              personal keepsakes you treasure for years, and content for next year's holiday invitations. We provide
              quick turnaround on edited photos and custom galleries that make sharing easy for all your guests.
            </p>

            <p>
              We're experienced with both intimate family holiday gatherings and large corporate holiday events. Our
              photographers know how to balance posed group photos with candid moments, and we adjust lighting and
              positioning to work with your venue's holiday décor.
            </p>

            <p>
              Serving all major areas in greater Houston including Montgomery County, Harris County, and surrounding
              regions. Perfect for corporate holiday parties, family celebrations, holiday dinners, and festive
              events throughout the Houston area. Book early—holiday photography fills quickly during the season!
            </p>
          </div>

          <div className="mt-8 p-4 bg-green-50 rounded-lg">
            <p className="text-gray-800">
              Ready to capture your holiday celebration?{' '}
              <Link href="/services/event-photography" className="text-green-600 hover:underline font-semibold">
                Explore our full event photography services →
              </Link>
            </p>
          </div>
        </div>
      </section>
      <PrepGuideLeadMagnet />
    </main>
  )
}
