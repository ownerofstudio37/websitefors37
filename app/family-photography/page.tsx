import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'
import PortraitSubServiceSupport from '@/components/PortraitSubServiceSupport'

export const metadata = generateSEOMetadata({
  title: 'Family Photography Pinehurst TX with Location Planning | Studio37',
  description:
    'Family photography in Pinehurst, TX with location planning, gentle posing, kid-friendly timing, private gallery delivery, and package options for Montgomery County families.',
  canonicalUrl: 'https://www.studio37.cc/family-photography',
  pageType: 'service',
})

// Hardcoded marketing page override. CMS entry remains in content_pages as backup.
export const revalidate = 86400

const familyPackages = [
  {
    name: 'Legacy Package',
    price: '$750',
    description: 'Extended family coverage with multiple combinations and premium retouching.',
    image:
      'https://res.cloudinary.com/dmjxho2rl/image/upload/v1784790717/Hotard_Family_Day_1_-_252-2_fjeggf.jpg',
  },
  {
    name: 'Milestone Package',
    price: '$500',
    description: 'Perfect for yearly updates, birthdays, and key family milestones.',
    image:
      'https://res.cloudinary.com/dmjxho2rl/image/upload/v1784790718/Hotard_Family_Day_2_-_49_1_eernop.jpg',
  },
  {
    name: 'Petite Package',
    price: '$350',
    description: 'Quick and beautiful family session with edited highlights delivered fast.',
    image:
      'https://res.cloudinary.com/dmjxho2rl/image/upload/v1784790718/Hotard_Family_Day_2_-_152_1_mcyhw2.jpg',
  },
]

export default function FamilyPhotographyPage() {
  const serviceSchema = generateServiceSchema(
    'Family Photography',
    'Family photography sessions in Pinehurst, Texas with location planning, gentle posing, private gallery delivery, and package options for families across Montgomery County.'
  )

  return (
    <div className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <section className="section-shell bg-stone-50 pb-24 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <p className="eyebrow mb-2">Studio37 Family Sessions</p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Family Photography</h1>
            <p className="text-lg text-stone-600">
              Timeless, personality-filled family portraits designed around your story.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {familyPackages.map((pkg) => (
              <article key={pkg.name} className="surface-panel p-5 flex flex-col h-full">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-5 bg-stone-200">
                  <Image src={pkg.image} alt={pkg.name} fill className="object-cover" />
                </div>
                <h2 className="text-2xl font-semibold mb-1">{pkg.name}</h2>
                <p className="text-primary-700 font-semibold mb-3">Starting at {pkg.price}</p>
                <p className="text-stone-600 mb-6 flex-1">{pkg.description}</p>
                <Link href={`/book-consultation?package=${encodeURIComponent(pkg.name)}`} className="btn-primary text-center">
                  Book Consultation
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Family Photography in Pinehurst, TX &amp; Montgomery County</h2>
            <p className="text-stone-700 leading-relaxed mb-4">
              Studio37 provides family photography in Pinehurst, TX for parents who want natural images that still
              feel polished and intentional. We photograph immediate families, extended families, milestone birthdays,
              and annual portrait updates with a relaxed approach that keeps everyone comfortable in front of the camera.
            </p>
            <p className="text-stone-700 leading-relaxed mb-4">
              Sessions are planned around your preferred style, location, and schedule. From golden-hour outdoor portraits
              to cleaner lifestyle looks, we guide posing and movement so your gallery includes both frame-worthy classics
              and candid moments. Families throughout The Woodlands, Conroe, Magnolia, Tomball, Spring, and greater
              Montgomery County choose Studio37 for consistency, fast communication, and gallery delivery they can trust.
            </p>
            <h3 className="text-2xl font-semibold mb-3">What to Expect From Your Session</h3>
            <ul className="grid md:grid-cols-2 gap-2 text-stone-700 mb-6">
              <li>• Pre-session planning and outfit guidance</li>
              <li>• Kid-friendly posing and prompts for natural expressions</li>
              <li>• Balanced mix of candid and directed portraits</li>
              <li>• Professionally edited online gallery with download access</li>
            </ul>
            <p className="text-sm text-stone-500 mb-2">
              Serving: Pinehurst TX · The Woodlands · Conroe · Magnolia · Tomball · Spring · Montgomery · Houston Area
            </p>
            <p className="text-sm">
              Planning a different portrait style?{' '}
              <Link href="/services/portrait-photography" className="text-primary-700 hover:underline">
                See portrait session options
              </Link>
              .
            </p>
          </div>
        </div>
      </section>

      <PortraitSubServiceSupport
        service="family photography"
        proof={[
          'Full family galleries with kids, parents, grandparents, and sibling combinations.',
          'Outdoor Pinehurst or Montgomery County examples with similar light and walking needs.',
          'Before-booking examples that show candid moments, directed portraits, and final delivery consistency.',
        ]}
        planning={[
          'Location and light plan',
          'Kid-friendly pacing',
          'Wardrobe and grouping guidance',
        ]}
        objection="If you are worried about kids melting down, awkward posing, or choosing the wrong location, the consultation is where we build a calmer plan around timing, shade, parking, and your must-have groupings."
      />
    </div>
  )
}
