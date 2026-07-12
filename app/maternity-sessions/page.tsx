import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'
import PortraitSubServiceSupport from '@/components/PortraitSubServiceSupport'

export const metadata = generateSEOMetadata({
  title: 'Maternity Sessions in Pinehurst, TX | Studio37',
  description:
    'Maternity photography in Pinehurst, TX with Studio37. Explore Expectant Glow, Mother & Child, and Deluxe maternity options.',
  canonicalUrl: 'https://www.studio37.cc/maternity-sessions',
  pageType: 'service',
})

// Hardcoded marketing page override. CMS entry remains in content_pages as backup.
export const revalidate = 86400

const maternityPackages = [
  {
    name: 'Expectant Glow Package',
    price: '$350',
    image:
      'https://res.cloudinary.com/dmjxho2rl/image/upload/v1778033091/IMG_1503_Original_mtopcp.jpg',
  },
  {
    name: 'Mother & Child Package',
    price: '$500',
    image:
      'https://res.cloudinary.com/dmjxho2rl/image/upload/v1778037078/Untitled-13_convert.io_y6zaft.jpg',
  },
  {
    name: 'Deluxe Maternity Experience',
    price: '$750',
    image:
      'https://res.cloudinary.com/dmjxho2rl/image/upload/v1778037082/Untitled-50_2_convert.io_bht8ge.jpg',
  },
]

export default function MaternitySessionsPage() {
  const serviceSchema = generateServiceSchema(
    'Maternity Sessions',
    'Maternity photography sessions in Pinehurst, Texas with wardrobe guidance, location planning, partner and family options, and private gallery delivery.'
  )

  return (
    <div className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <section className="relative h-[440px] bg-stone-900">
        <Image
          src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1778033084/Untitled_1_zwsrnm.jpg"
          alt="Maternity sessions hero image"
          fill
          priority
          className="object-cover opacity-75"
        />
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="max-w-2xl text-white">
            <p className="eyebrow-hero mb-3">Studio37 Maternity</p>
            <h1 className="text-5xl font-bold mb-3">Maternity Sessions</h1>
            <p className="text-lg text-white/90">
              Elegant maternity portraits designed to celebrate this chapter with warmth and timeless style.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell bg-white pb-24 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {maternityPackages.map((pkg) => (
              <article key={pkg.name} className="surface-panel p-5 flex flex-col h-full">
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-5 bg-stone-200">
                  <Image src={pkg.image} alt={pkg.name} fill className="object-cover" />
                </div>
                <h2 className="text-2xl font-semibold mb-1">{pkg.name}</h2>
                <p className="text-primary-700 font-semibold mb-6">Starting at {pkg.price}</p>
                <Link href={`/book-consultation?package=${encodeURIComponent(pkg.name)}`} className="btn-primary text-center mt-auto">
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
            <h2 className="text-3xl font-bold mb-4">Maternity Photography in Pinehurst, TX</h2>
            <p className="text-stone-700 leading-relaxed mb-4">
              Studio37 offers maternity sessions in Pinehurst, Texas for expecting mothers and growing families who want
              timeless, elegant portraits. We focus on flattering posing, comfortable pacing, and a calm experience so you
              can fully enjoy this once-in-a-lifetime season.
            </p>
            <p className="text-stone-700 leading-relaxed mb-4">
              Sessions can be styled as outdoor golden-hour portraits, intimate lifestyle looks, or clean editorial imagery.
              We help with wardrobe direction, location planning, and schedule timing so your final gallery feels cohesive
              and meaningful. Families from The Woodlands, Conroe, Magnolia, Tomball, Spring, and surrounding areas book
              Studio37 for maternity photos that are both emotional and polished.
            </p>
            <h3 className="text-2xl font-semibold mb-3">Maternity Session Planning Tips</h3>
            <ul className="grid md:grid-cols-2 gap-2 text-stone-700 mb-6">
              <li>• Ideal timing is typically 28–34 weeks</li>
              <li>• Choose 2–3 coordinated outfits with texture and movement</li>
              <li>• Bring partner and children for family-inclusive portraits</li>
              <li>• Schedule near sunset for warm, flattering light</li>
            </ul>
            <p className="text-sm text-stone-500 mb-2">
              Serving: Pinehurst TX · The Woodlands · Conroe · Magnolia · Tomball · Spring · Montgomery · Houston Area
            </p>
            <p className="text-sm">
              Looking for additional portrait options?{' '}
              <Link href="/services/portrait-photography" className="text-primary-700 hover:underline">
                View all portrait services
              </Link>
              .
            </p>
          </div>
        </div>
      </section>
      <PortraitSubServiceSupport
        service="maternity sessions"
        proof={[
          'Maternity galleries with solo portraits, partner images, and family-inclusive moments.',
          'Outdoor and lifestyle examples that show flattering light, wardrobe movement, and calm pacing.',
          'Final galleries that balance emotional close images, full-length portraits, and keepsake variety.',
        ]}
        planning={[
          '28-34 week timing',
          'Wardrobe and comfort plan',
          'Partner or sibling flow',
        ]}
        objection="If you are unsure about timing, posing, or feeling comfortable on camera, we plan the session around flattering light, easy movement, and enough pacing for breaks."
      />
    </div>
  )
}
