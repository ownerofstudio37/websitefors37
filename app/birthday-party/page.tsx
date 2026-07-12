import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'
import PortraitSubServiceSupport from '@/components/PortraitSubServiceSupport'

export const metadata = generateSEOMetadata({
  title: 'Birthday Party Photography Houston & Montgomery County | Studio37',
  description:
    'Birthday party photography for milestone celebrations, family portraits, party details, candids, and private gallery delivery in Houston and Montgomery County.',
  canonicalUrl: 'https://www.studio37.cc/birthday-party',
  pageType: 'service',
})

export const revalidate = 86400

const packages = [
  {
    name: 'Party Essentials',
    price: '$600',
    duration: '2 hours',
    features: ['2 hours coverage', '50+ edited images', 'Candid and posed moments', '72-hour highlights preview', 'Private digital gallery'],
  },
  {
    name: 'Extended Celebration',
    price: '$1,000',
    duration: '4 hours',
    features: ['4 hours coverage', '125+ edited images', 'Cake and guest moments', '24-hour sneak peek', 'Private digital gallery'],
    popular: true,
  },
  {
    name: 'Premium Party Package',
    price: '$1,800',
    duration: 'Up to 8 hours',
    features: ['Up to 8 hours coverage', '250+ edited images', 'Full celebration story', 'Custom mobile gallery', 'Private digital gallery'],
  },
]

export default function BirthdayPartyPage() {
  const serviceSchema = generateServiceSchema(
    'Birthday Party Photography',
    'Birthday party photography in the Houston and Montgomery County area for milestone celebrations, candid moments, family portraits, details, and private gallery delivery.'
  )

  return (
    <main className="w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {/* Hero Section */}
      <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-black">
        <Image
          src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1778043141/100thBirthday_-_220_convert.io_1_svsdy1.jpg"
          alt="Studio37 birthday party photography for a milestone celebration"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Birthday Party Photography</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Celebrate and preserve every joyful moment from milestone birthdays to special celebrations
          </p>
        </div>
      </section>

      {/* Package Options */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Birthday Photography Packages</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Celebrate your special day with professional photography capturing all the joy and memories
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`border rounded-lg p-8 hover:shadow-lg transition ${
                  pkg.popular ? 'border-2 border-purple-600 bg-purple-50' : 'border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <div className="inline-block bg-purple-600 text-white px-4 py-1 rounded-full text-sm mb-2 font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-4xl font-bold text-purple-600 mb-2">{pkg.price}</p>
                <p className="text-gray-600 mb-4">{pkg.duration}</p>
                <ul className="space-y-2 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="text-gray-700 flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={`/book-consultation?package=${encodeURIComponent(pkg.name)}`} className="block w-full rounded-lg bg-purple-600 py-2 text-center text-white transition hover:bg-purple-700">
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
              ['Milestone framing', 'First birthdays, sweet 16s, 21st birthdays, 50th celebrations, and 100th birthday gatherings.'],
              ['Coverage rhythm', 'Candids, guest reactions, cake moments, details, group photos, and portraits with the guest of honor.'],
              ['Gallery delivery', 'A private edited gallery built for easy sharing with family and friends after the celebration.'],
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
        service="birthday party photography"
        parentHref="/services/event-photography"
        parentLabel="event photography"
        proof={[
          'Milestone birthday galleries with candid guest moments, details, portraits, and cake coverage.',
          'Examples from indoor venues, homes, restaurants, and mixed-light celebrations.',
          'Final gallery variety for sharing with family and preserving the full celebration.',
        ]}
        planning={['Timeline and cake moments', 'Family group list', 'Venue light plan']}
        objection="If you are worried about missing key people or moments, we map the party flow before coverage starts so candids, group photos, details, and milestone moments all get attention."
      />

      {/* SEO Content Block */}
      <section className="py-12 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Celebrate Special Moments with Professional Photography</h2>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Studio37 Photography specializes in birthday party photography across the Houston area, including
              Pinehurst, The Woodlands, Conroe, Magnolia, Tomball, Spring, and surrounding communities. From children's
              birthday celebrations to milestone birthday parties and memorable adult celebrations, we capture the joy,
              laughter, and special moments that make birthdays unforgettable.
            </p>

            <p>
              Birthday parties are filled with candid moments, genuine emotions, and connections between loved ones.
              Our experienced photographers understand how to blend into the celebration, capturing authentic interactions
              without disrupting the fun. Whether it's a small intimate gathering or a large party, we document every
              important moment.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Birthday Photography Coverage:</h3>
            <ul className="space-y-2 ml-4">
              <li>• <strong>Children's Birthdays:</strong> Playful moments, games, cake cutting, and genuine child joy</li>
              <li>• <strong>Milestone Celebrations:</strong> Sweet 16, 21st birthdays, 50th & 100th birthday parties</li>
              <li>• <strong>Party Details:</strong> Decorations, themed elements, and setup photography</li>
              <li>• <strong>Guest Interactions:</strong> Candid photos of family and friends enjoying the celebration</li>
              <li>• <strong>Cake & Desserts:</strong> Beautiful shots of birthday cake and special dessert displays</li>
              <li>• <strong>Group Portraits:</strong> Posed photos with birthday celebrant and loved ones</li>
            </ul>

            <p className="mt-6">
              We provide quick turnaround on edited photos so you can share memories with family and friends right away.
              Digital galleries make it easy for guests to access and download their favorite photos. We also provide
              print-ready files perfect for creating albums, prints, and special gifts.
            </p>

            <p>
              Serving all major areas in greater Houston including Montgomery County, Harris County, and surrounding
              areas. Perfect for birthday parties throughout the region, from intimate home celebrations to large venue
              events and special milestone gatherings.
            </p>
          </div>

          <div className="mt-8 p-4 bg-purple-50 rounded-lg">
            <p className="text-gray-800">
              Ready to capture your special birthday celebration?{' '}
              <Link href="/services/event-photography" className="text-purple-600 hover:underline font-semibold">
                Explore our full event photography services →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
