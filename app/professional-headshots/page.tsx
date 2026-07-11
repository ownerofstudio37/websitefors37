import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import PortraitSubServiceSupport from '@/components/PortraitSubServiceSupport'

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

      <section className="section-shell bg-white pb-24 md:pb-16">
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

      <section className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Professional Headshots in Pinehurst, TX</h2>
            <p className="text-stone-700 leading-relaxed mb-4">
              Studio37 delivers professional headshots for business owners, executives, teams, and creative professionals
              across Pinehurst and Montgomery County. We create clean, modern headshots for LinkedIn profiles, websites,
              speaking engagements, PR use, and internal company directories.
            </p>
            <p className="text-stone-700 leading-relaxed mb-4">
              Our process is designed for confidence and consistency: brief planning, guided posing, expression coaching,
              and precise retouching that keeps you looking natural. For multi-person teams, we keep lighting and framing
              consistent so your brand presentation stays cohesive across every profile image.
            </p>
            <h3 className="text-2xl font-semibold mb-3">Best Uses for Studio37 Headshots</h3>
            <ul className="grid md:grid-cols-2 gap-2 text-stone-700 mb-6">
              <li>• LinkedIn and professional networking profiles</li>
              <li>• Company websites and leadership pages</li>
              <li>• Sales, marketing, and speaker one-sheets</li>
              <li>• Team onboarding and internal directories</li>
            </ul>
            <p className="text-sm text-stone-500 mb-2">
              Serving: Pinehurst TX · The Woodlands · Conroe · Magnolia · Tomball · Spring · Montgomery · Houston Area
            </p>
            <p className="text-sm">
              Need broader brand imagery?{' '}
              <Link href="/services/branding-marketing" className="text-primary-700 hover:underline">
                Explore branding and marketing services
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
      <PortraitSubServiceSupport
        service="professional headshots"
        proof={[
          'Individual headshots with clean expression coaching and natural retouching.',
          'Team examples with consistent framing, light, background, and brand presentation.',
          'Business-ready images for LinkedIn, websites, speaker pages, directories, and marketing materials.',
        ]}
        planning={[
          'Brand usage check',
          'Expression coaching',
          'Team consistency plan',
        ]}
        objection="If you need to look confident without looking over-retouched, the planning call clarifies usage, wardrobe, background, and how consistent the final image set needs to be."
      />
    </div>
  )
}
