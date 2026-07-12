import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'
import PrepGuideLeadMagnet from '@/components/PrepGuideLeadMagnet'
import PortraitSubServiceSupport from '@/components/PortraitSubServiceSupport'

export const metadata = generateSEOMetadata({
  title: 'Graduation Photography Houston & Montgomery County | Studio37',
  description:
    'Graduation photography for cap and gown portraits, campus sessions, ceremony coverage, family photos, and graduation celebrations in Houston and Montgomery County.',
  canonicalUrl: 'https://www.studio37.cc/graduation',
  pageType: 'service',
})

export const revalidate = 86400

const packages = [
  {
    name: 'Cap & Gown Session',
    price: '$350',
    duration: 'Location session',
    features: ['Professional cap & gown shots', '1 location', 'Digital files', 'Professional edits', 'Proofs gallery'],
  },
  {
    name: 'Extended Celebration',
    price: '$750',
    duration: '3-4 hours',
    features: ['Ceremony & party coverage', 'Multiple locations', 'Custom edits', 'Album included', 'Video highlights'],
    popular: true,
  },
  {
    name: 'Premium Graduation',
    price: '$1,200+',
    duration: 'Full day',
    features: ['Pre-ceremony session', 'Ceremony coverage', 'Party documentation', 'Portrait session', 'Professional video'],
  },
]

export default function GraduationPage() {
  const serviceSchema = generateServiceSchema(
    'Graduation Photography',
    'Professional graduation photography for senior portraits, cap and gown sessions, ceremonies, and celebrations in the Houston area.'
  )

  return (
    <main className="w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {/* Hero Section */}
      <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-black">
        <Image
          src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1778043142/Untitled-122_convert.io_1_hxkt5z.jpg"
          alt="Studio37 graduation photography with cap and gown portraits"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Graduation Photography</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Celebrate this major milestone with professional photography capturing pride, joy, and achievement
          </p>
        </div>
      </section>

      {/* Package Options */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Graduation Photography Packages</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Professional coverage for high school and college graduation celebrations
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`border rounded-lg p-8 hover:shadow-lg transition ${
                  pkg.popular ? 'border-2 border-amber-600 bg-amber-50' : 'border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <div className="inline-block bg-amber-600 text-white px-4 py-1 rounded-full text-sm mb-2 font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-4xl font-bold text-amber-600 mb-2">{pkg.price}</p>
                <p className="text-gray-600 mb-4">{pkg.duration}</p>
                <ul className="space-y-2 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="text-gray-700 flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={`/book-consultation?package=${encodeURIComponent(pkg.name)}`} className="block w-full text-center bg-amber-600 text-white py-2 rounded-lg hover:bg-amber-700 transition font-semibold">
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
              ['Portrait session', 'Cap-and-gown, family combinations, campus or local backdrops, and announcement-ready images.'],
              ['Ceremony coverage', 'Where permitted, we plan around arrival, family timing, diploma moments, and post-ceremony portraits.'],
              ['Celebration story', 'Party candids, decor, friend groups, family reactions, and the details that complete the milestone.'],
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
        service="graduation photography"
        parentHref="/services/event-photography"
        parentLabel="event photography"
        proof={[
          'Cap-and-gown, family, campus, ceremony, and celebration examples.',
          'Senior and graduation galleries with both parent favorites and student personality.',
          'Location examples for high school, college, and milestone graduation sessions.',
        ]}
        planning={['Campus or venue plan', 'Family photo list', 'Announcement usage']}
        objection="Graduation days move quickly. We plan the location, family combinations, ceremony limits, and celebration timing so the final gallery covers more than one rushed portrait."
      />

      {/* SEO Content Block */}
      <section className="py-12 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Professional Graduation Photography Services</h2>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Studio37 Photography specializes in graduation photography across the Houston area, including Pinehurst,
              The Woodlands, Conroe, Magnolia, Tomball, Spring, and surrounding communities. Graduation is one of life's
              most significant achievements, and we understand the importance of capturing this milestone with
              professionalism and artistry.
            </p>

            <p>
              Whether you're graduating from high school or college, we provide comprehensive photography coverage that
              documents your achievement and celebration. From formal cap and gown portraits to candid celebration
              moments, we capture the pride, excitement, and joy that define your graduation day.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Graduation Photography Coverage Includes:</h3>
            <ul className="space-y-2 ml-4">
              <li>• <strong>Cap & Gown Portraits:</strong> Formal professional portraits in graduation attire at scenic locations</li>
              <li>• <strong>Ceremony Coverage:</strong> Processional, graduation walk, and diploma moments (where permitted)</li>
              <li>• <strong>Celebration Photos:</strong> Family gatherings, friendship moments, and celebration candids</li>
              <li>• <strong>Group Portraits:</strong> Class photos, family photos with the graduate, and friend group pictures</li>
              <li>• <strong>Reception Coverage:</strong> Party moments, cake cutting, speech moments, and celebrations</li>
              <li>• <strong>Professional Edits:</strong> Color correction, retouching, and professional enhancement</li>
            </ul>

            <p className="mt-6">
              We recommend booking graduation sessions well in advance, as popular graduation season dates fill quickly.
              We work with you to coordinate multiple locations, family scheduling, and timing to ensure comprehensive
              coverage of your special day.
            </p>

            <p>
              Quick turnaround on proofs and final edited photos means you can share your graduation memories with
              family and friends right away. We provide digital galleries, print-ready files, and options for creating
              albums and prints from your favorite photos.
            </p>

            <p>
              Serving all major areas in greater Houston and surrounding regions. Perfect for high school graduations,
              college graduations, and special achievement celebrations throughout Montgomery County, Harris County, and
              beyond.
            </p>
          </div>

          <div className="mt-8 p-4 bg-amber-50 rounded-lg">
            <p className="text-gray-800">
              Ready to capture your graduation milestone?{' '}
              <Link href="/services/event-photography" className="text-amber-600 hover:underline font-semibold">
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
