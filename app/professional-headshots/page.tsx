import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Professional Headshots in Pinehurst, TX | Studio37',
  description:
    'Professional headshots in Pinehurst, TX for individuals, executives, and teams. Book Studio37 today.',
  canonicalUrl: 'https://www.studio37.cc/professional-headshots',
  pageType: 'service',
})

// Hardcoded marketing page override. CMS entry remains in content_pages as backup.
export const revalidate = 86400

const headshotPackages = [
  {
    name: 'Individual Headshot Package',
    price: '$300',
    image: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1778033091/IMG_3787_kaecyl.jpg',
  },
  {
    name: 'Executive Headshot Package',
    price: '$500',
    image: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1778033152/Untitled-26_1_m2xd8r.jpg',
  },
  {
    name: 'Team Headshot Package',
    price: '$800',
    image: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1765642849/JoshuaMapson-029_rgc1xu.jpg',
  },
]

export default function ProfessionalHeadshotsPage() {
  return (
    <div className="pt-16">
      <section className="relative h-[440px] bg-stone-900">
        <Image
          src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1778033155/Untitled-46_2_tg6z4m.jpg"
          alt="Professional headshots hero image"
          fill
          priority
          className="object-cover opacity-75"
        />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <p className="eyebrow-hero mb-3">Studio37 Business Portraits</p>
            <h1 className="text-5xl font-bold mb-3">Professional Headshots</h1>
            <p className="text-lg text-white/90">
              Clean, modern headshots that elevate personal brands, teams, and company presence.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {headshotPackages.map((pkg) => (
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
