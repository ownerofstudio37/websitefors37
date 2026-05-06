import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Senior Portraits in Pinehurst, TX | Studio37',
  description:
    'Senior portraits in Pinehurst, TX with Studio37. Explore Classic, Style, and Ultimate sessions.',
  canonicalUrl: 'https://www.studio37.cc/senior-portraits',
  pageType: 'service',
})

// Hardcoded marketing page override. CMS entry remains in content_pages as backup.
export const revalidate = 86400

const seniorPackages = [
  {
    name: 'Classic Session',
    price: '$350',
    image:
      'https://res.cloudinary.com/dmjxho2rl/image/upload/v1778036134/Untitled-2_1_convert.io_1_ykmwfr.jpg',
  },
  {
    name: 'Style Session',
    price: '$500',
    image:
      'https://res.cloudinary.com/dmjxho2rl/image/upload/v1778033086/PS379444_2_1__2_ffgun8.jpg',
  },
  {
    name: 'Ultimate Session',
    price: '$750',
    image:
      'https://res.cloudinary.com/dmjxho2rl/image/upload/v1778033087/Untitled-4_1_osac8b.jpg',
  },
]

export default function SeniorPortraitsPage() {
  return (
    <div className="pt-16">
      <section className="relative h-[440px] bg-stone-900">
        <Image
          src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1778033092/Untitled-12_hih9qs.jpg"
          alt="Senior portrait hero image"
          fill
          priority
          className="object-cover opacity-75"
        />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <p className="eyebrow-hero mb-3">Studio37 Seniors</p>
            <h1 className="text-5xl font-bold mb-3">Senior Portraits</h1>
            <p className="text-lg text-white/90">
              Bold, modern senior portraits that celebrate your personality and this milestone season.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {seniorPackages.map((pkg) => (
              <article key={pkg.name} className="surface-panel p-5 flex flex-col h-full">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-5 bg-stone-200">
                  <Image src={pkg.image} alt={pkg.name} fill className="object-cover" />
                </div>
                <h2 className="text-2xl font-semibold mb-1">{pkg.name}</h2>
                <p className="text-primary-700 font-semibold mb-6">Starting at {pkg.price}</p>
                <Link href="/book-consultation" className="btn-primary text-center mt-auto">
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
