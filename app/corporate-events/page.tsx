import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'
import PortraitSubServiceSupport from '@/components/PortraitSubServiceSupport'

export const metadata = generateSEOMetadata({
  title: 'Corporate Event Photography Houston & Montgomery County | Studio37',
  description:
    'Corporate event photography for conferences, galas, award ceremonies, business gatherings, PR recaps, and internal communications in Houston and Montgomery County.',
  canonicalUrl: 'https://www.studio37.cc/corporate-events',
  pageType: 'service',
})

export const revalidate = 86400

const packages = [
  {
    name: 'Business Event Essentials',
    price: '$660',
    duration: '2 hours',
    features: ['2 hours coverage', 'Commercial usage license', '50+ edited images', '72-hour highlights preview', 'Private digital gallery'],
  },
  {
    name: 'Business Event Standard',
    price: '$1,100',
    duration: '4 hours',
    features: ['4 hours coverage', 'Commercial usage license', '125+ edited images', '24-hour sneak peek', 'Sponsor and speaker coverage'],
    popular: true,
  },
  {
    name: 'Business Event Premium',
    price: '$1,980',
    duration: 'Up to 8 hours',
    features: ['Up to 8 hours coverage', 'Commercial usage license', '250+ edited images', 'PR and recap delivery', 'Custom deliverables'],
  },
]

export default function CorporateEventsPage() {
  const serviceSchema = generateServiceSchema(
    'Corporate Event Photography',
    'Corporate event photography in the Houston and Montgomery County area for conferences, galas, award ceremonies, business gatherings, PR recaps, and internal communications.'
  )

  return (
    <main className="w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {/* Hero Section */}
      <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-black">
        <Image
          src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1784791657/VB_School_Chris_Faves_-_28_vdjsiw.jpg"
          alt="Studio37 corporate event photography coverage for a business gathering"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Corporate Event Photography</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Professional photography for conferences, galas, award ceremonies, and business gatherings
          </p>
        </div>
      </section>

      {/* Package Options */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Event Photography Packages</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Comprehensive coverage options for corporate events of all sizes
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`border rounded-lg p-8 hover:shadow-lg transition ${
                  pkg.popular ? 'border-2 border-blue-600 bg-blue-50' : 'border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <div className="inline-block bg-blue-600 text-white px-4 py-1 rounded-full text-sm mb-2 font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-4xl font-bold text-blue-600 mb-2">{pkg.price}</p>
                <p className="text-gray-600 mb-4">{pkg.duration}</p>
                <ul className="space-y-2 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="text-gray-700 flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={`/book-consultation?package=${encodeURIComponent(pkg.name)}`} className="block w-full rounded-lg bg-blue-600 py-2 text-center text-white transition hover:bg-blue-700">
                  Book Consultation
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
              ['PR and recap', 'Fast highlight sets for press, social, sponsor recaps, and internal communications.'],
              ['Business use cases', 'Speaker coverage, networking, awards, branded details, team moments, and sponsor value.'],
              ['Private samples', 'Request corporate examples matched to your venue, lighting, guest count, and delivery needs.'],
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
        service="corporate event photography"
        parentHref="/services/event-photography"
        parentLabel="event photography"
        proof={[
          'Conference, gala, sponsor, speaker, award, and networking examples.',
          'Fast-turnaround highlight sets for PR, social, recaps, and internal communications.',
          'Low-light ballroom and mixed-light venue examples with clean delivery consistency.',
        ]}
        planning={['Run-of-show review', 'VIP and sponsor list', 'Delivery usage plan']}
        objection="If your event needs images for marketing, donor relations, or internal communications, the planning call clarifies must-have moments, access, usage, and delivery timing before event day."
      />

      {/* SEO Content Block */}
      <section className="py-12 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Why Choose Studio37 for Corporate Events?</h2>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Studio37 Photography specializes in capturing the energy and professionalism of corporate events
              across the Houston area, including Pinehurst, The Woodlands, Conroe, Magnolia, Tomball, Spring, and
              surrounding communities. Whether you're hosting an intimate board meeting, a large conference, an
              awards gala, or a corporate retreat, our team brings years of experience in fast-paced business
              environments.
            </p>

            <p>
              Our corporate event photography service includes detailed coverage of keynote speakers, networking
              sessions, award presentations, and candid moments that showcase your company culture. We understand
              the importance of capturing not just the agenda items, but the authentic interactions and achievements
              that define successful business events.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Our Corporate Photography Expertise:</h3>
            <ul className="space-y-2 ml-4">
              <li>• <strong>Conference & Seminar Coverage:</strong> Professional documentation from registration through closing remarks</li>
              <li>• <strong>Award Ceremonies:</strong> Capturing recipients, presenters, and celebration moments with elegant photography</li>
              <li>• <strong>Corporate Galas:</strong> Elegant event coverage emphasizing your company's prestige and culture</li>
              <li>• <strong>Team Events:</strong> Retreat photography, team building, and off-site event documentation</li>
              <li>• <strong>Product Launches:</strong> Professional imagery of your new offerings and presentations</li>
              <li>• <strong>Executive Portraits:</strong> Professional headshots and group photos during events</li>
            </ul>

            <p className="mt-6">
              We provide fast turnaround on edited photos, custom galleries for easy sharing with attendees, and
              professional-grade files suitable for print, web, and internal communications. Our photographers are
              skilled at being unobtrusive while capturing authentic moments, and we coordinate with your event team
              to ensure seamless coverage.
            </p>

            <p>
              Serving all major business districts in greater Houston including downtown, the Energy Corridor,
              Uptown, and the Woodlands area. Perfect for Houston corporate events, Montgomery County business
              functions, Harris County gatherings, and events throughout the region.
            </p>
          </div>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-gray-800">
              Ready to capture your corporate event professionally?{' '}
              <Link href="/services/event-photography" className="text-blue-600 hover:underline font-semibold">
                Explore our full event photography services →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
