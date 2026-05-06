import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Family Photography in Pinehurst, TX | Studio37',
  description:
    'Family photography sessions in Pinehurst, TX with Studio37. Explore package options and book your family session today.',
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
      'https://res.cloudinary.com/dmjxho2rl/image/upload/v1778033085/PS379134_eofcb9.jpg',
  },
  {
    name: 'Milestone Package',
    price: '$500',
    description: 'Perfect for yearly updates, birthdays, and key family milestones.',
    image:
      'https://res.cloudinary.com/dmjxho2rl/image/upload/v1778033089/Untitled-7_2_ta0t2d.jpg',
  },
  {
    name: 'Petite Package',
    price: '$350',
    description: 'Quick and beautiful family session with edited highlights delivered fast.',
    image:
      'https://res.cloudinary.com/dmjxho2rl/image/upload/v1778033086/PS374628_gqxvd5.jpg',
  },
]

export default function FamilyPhotographyPage() {
  return (
    <div className="pt-16">
      <section className="section-shell bg-stone-50">
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
                <Link href="/book-consultation" className="btn-primary text-center">
                  Book Consultation
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
