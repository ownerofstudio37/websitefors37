import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'
import PrepGuideLeadMagnet from '@/components/PrepGuideLeadMagnet'
import PortraitSubServiceSupport from '@/components/PortraitSubServiceSupport'

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
      'https://res.cloudinary.com/dmjxho2rl/image/upload/v1778033087/Untitled-4_1_osac8b.jpg',
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
      'https://res.cloudinary.com/dmjxho2rl/image/upload/v1779268257/PS374813_vuos93.jpg',
  },
]

export default function SeniorPortraitsPage() {
  const serviceSchema = generateServiceSchema(
    'Senior Portraits',
    'Senior portrait photography in Pinehurst, Texas with classic, style, and ultimate session options.'
  )

  return (
    <div className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
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

      <section className="section-shell bg-white pb-24 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {seniorPackages.map((pkg) => (
              <article key={pkg.name} className="surface-panel p-5 flex flex-col h-full">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-5 bg-stone-200">
                  <Image src={pkg.image} alt={pkg.name} fill className="object-cover" />
                </div>
                <h2 className="text-2xl font-semibold mb-1">{pkg.name}</h2>
                <p className="text-primary-700 font-semibold mb-6">Starting at {pkg.price}</p>
                <Link href={`/book-consultation?package=${encodeURIComponent(pkg.name)}`} className="btn-primary text-center mt-auto">
                  Book Consultation
                </Link>
                <Link href={`/book-a-session?package=${encodeURIComponent(pkg.name)}`} className="mt-3 text-center text-sm font-semibold text-primary-700 hover:underline">
                  Start Session Booking
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">Senior Portrait Photography in Pinehurst, TX</h2>
            <p className="text-stone-700 leading-relaxed mb-4">
              Studio37 creates senior portraits in Pinehurst, Texas that feel authentic, modern, and personal.
              We work with students and families across Montgomery County, including The Woodlands, Magnolia,
              Tomball, Conroe, Spring, and nearby communities. Every senior session is designed to highlight
              personality, style, and milestone achievements with a mix of classic portraits and editorial-style images.
            </p>
            <p className="text-stone-700 leading-relaxed mb-4">
              Whether you want downtown looks, natural outdoor portraits, cap-and-gown images, or sports and hobby
              concepts, we help plan locations, outfit changes, and timing for the best light. Our workflow is simple:
              planning call, guided session, professional retouching, and a final digital gallery ready for prints,
              announcements, and social sharing.
            </p>
            <h3 className="text-2xl font-semibold mb-3">Popular Senior Session Add-Ons</h3>
            <ul className="grid md:grid-cols-2 gap-2 text-stone-700 mb-6">
              <li>• Extra outfit and location changes</li>
              <li>• Sports, instrument, or hobby-themed sets</li>
              <li>• Best-friend mini session upgrade</li>
              <li>• Family add-on portraits at the same session</li>
            </ul>
            <p className="text-sm text-stone-500 mb-2">
              Serving: Pinehurst TX · The Woodlands · Conroe · Magnolia · Tomball · Spring · Montgomery · Houston Area
            </p>
            <p className="text-sm">
              Looking for other portrait options?{' '}
              <Link href="/services/portrait-photography" className="text-primary-700 hover:underline">
                Explore all portrait services
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
      <PortraitSubServiceSupport
        service="senior portraits"
        proof={[
          'Senior sessions with outfit changes, cap-and-gown images, and personality-driven portraits.',
          'Examples that match your preferred look: natural, editorial, downtown, campus, or hobby-focused.',
          'Final galleries that show variety across close portraits, full-body images, and parent favorites.',
        ]}
        planning={[
          'Outfit and location map',
          'Parent-priority shot list',
          'Graduation usage plan',
        ]}
        objection="If your senior wants images that feel polished without feeling stiff, we plan around personality first: outfits, locations, movement, and the images parents need for announcements and keepsakes."
      />
      <PrepGuideLeadMagnet />
    </div>
  )
}
