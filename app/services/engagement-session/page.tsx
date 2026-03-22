import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, ArrowRight, HeartHandshake, Sparkles, MapPinned, Video } from 'lucide-react'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'

export const metadata = generateSEOMetadata({
  title: 'Full Service Engagement Session Photography - Pinehurst, TX',
  description: 'Studio37 Full Service Engagement Sessions in Pinehurst, TX. Signature engagement photography packages plus concierge proposal planning with decor, location scouting, and photo/video coverage.',
  keywords: [
    'engagement photographer Pinehurst TX',
    'proposal photographer Texas',
    'engagement session packages',
    'proposal planning photographer',
    'engagement concierge service',
    'engagement photo and video',
  ],
  canonicalUrl: 'https://www.studio37.cc/services/engagement-session',
  pageType: 'service',
})

export const revalidate = 86400

const STANDARD_PACKAGES = [
  {
    name: 'Signature Engagement',
    price: '$450',
    subtitle: '45-minute session',
    features: [
      '15+ fully edited images',
      'Location planning support',
      'Styling and prep guide',
      'Private digital gallery',
      'Save-the-date crop set',
    ],
    cta: 'Book Signature Session',
  },
  {
    name: 'Premium Engagement',
    price: '$650',
    subtitle: '75-minute session',
    features: [
      '25+ fully edited images',
      'Two location concepts',
      'Outfit + timeline coaching',
      '24-hour sneak peek',
      'Priority delivery option',
    ],
    cta: 'Book Premium Session',
    highlight: true,
  },
  {
    name: 'Editorial Engagement',
    price: '$900',
    subtitle: '90+ minute session',
    features: [
      '35+ fully edited images',
      'Creative direction + shot list',
      'Multi-look story sequence',
      'Sunset/golden-hour planning',
      'Premium gallery delivery',
    ],
    cta: 'Book Editorial Session',
  },
]

const CONCIERGE_PACKAGES = [
  {
    name: 'Concierge Essentials',
    price: '$1,800+',
    features: [
      'Proposal/session concept planning',
      'Location scouting + coordination',
      'Decor styling guidance',
      'Photo coverage with reveal moments',
      'Personalized run-of-show timeline',
    ],
  },
  {
    name: 'Concierge Signature',
    price: '$2,800+',
    features: [
      'End-to-end planning + vendor coordination',
      'Decor sourcing and setup support',
      'Proposal surprise logistics management',
      'Photo + short highlight video coverage',
      'Luxury reveal and celebration sequence',
    ],
  },
  {
    name: 'Concierge Luxe',
    price: '$4,200+',
    features: [
      'White-glove engagement experience design',
      'Premium decor + staging management',
      'Multi-location capture plan',
      'Extended photo and cinematic video team',
      'Same-week preview + premium deliverables',
    ],
  },
]

export default function EngagementSessionPage() {
  const serviceSchema = generateServiceSchema(
    'Full Service Engagement Session Photography',
    'Engagement session and concierge proposal photography services in Pinehurst, Texas including planning, decor support, and photo/video coverage.'
  )

  return (
    <div className="pt-16 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <section className="relative min-h-[460px] bg-stone-950 text-white overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1770033072/PS370397-1_ooxygn.jpg"
          alt="Full service engagement session by Studio37"
          fill
          className="object-cover opacity-40"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-black/35" />
        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="max-w-3xl">
            <p className="eyebrow-hero mb-3">Engagement Concierge · Pinehurst, TX</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Full Service Engagement Sessions</h1>
            <p className="text-lg md:text-xl text-stone-100 mb-4 leading-relaxed">
              Elevated engagement photography with planning support from concept to final gallery.
              Signature sessions are priced 10%–30% above standard portraits for premium direction and experience.
            </p>
            <p className="text-stone-200 mb-8">
              Need a surprise proposal? Our engagement concierge team can plan location, decor, reveal timing, and photo/video coverage.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/get-quote" className="btn-primary inline-flex items-center">Get Instant Quote <ArrowRight className="ml-2 h-4 w-4" /></Link>
              <Link href="/book-consultation" className="btn-secondary inline-flex items-center">Book a Planning Call</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <p className="eyebrow mb-2">Standard Engagement Packages</p>
            <h2 className="text-3xl font-bold">Signature Session Pricing</h2>
            <p className="text-stone-600 mt-2">Built for couples who want polished, intentional storytelling.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {STANDARD_PACKAGES.map((pkg) => (
              <div key={pkg.name} className={`surface-panel p-7 flex flex-col ${pkg.highlight ? 'border-2 border-primary-400 relative' : ''}`}>
                {pkg.highlight ? <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary-600 text-white text-xs font-semibold px-3 py-1 rounded-full">Most Popular</span> : null}
                <p className="text-sm font-semibold text-stone-500 uppercase tracking-wide">{pkg.name}</p>
                <p className="text-4xl font-bold mt-2 text-stone-900">{pkg.price}</p>
                <p className="text-stone-500 mb-5">{pkg.subtitle}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-stone-700">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href="/book-a-session" className="btn-secondary text-center block">{pkg.cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <p className="eyebrow mb-2">Custom Concierge Packages</p>
            <h2 className="text-3xl font-bold">Proposal + Engagement Concierge</h2>
            <p className="text-stone-600 mt-3">A fully managed, luxury engagement experience where we handle strategy, logistics, and coverage.</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-6 mb-10">
            {CONCIERGE_PACKAGES.map((pkg) => (
              <div key={pkg.name} className="surface-panel p-7">
                <p className="text-sm font-semibold text-primary-700 uppercase tracking-wide">{pkg.name}</p>
                <p className="text-3xl font-bold text-stone-900 mt-2 mb-5">{pkg.price}</p>
                <ul className="space-y-2">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-stone-700">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="surface-panel p-7 md:p-9">
            <h3 className="text-2xl font-bold mb-4">What Engagement Concierge Includes</h3>
            <div className="grid md:grid-cols-2 gap-5 text-sm text-stone-700">
              <div className="flex gap-3"><MapPinned className="h-5 w-5 text-primary-600 mt-0.5" /><p><strong>Location planning:</strong> We scout and shortlist locations based on lighting, privacy, and vibe.</p></div>
              <div className="flex gap-3"><HeartHandshake className="h-5 w-5 text-primary-600 mt-0.5" /><p><strong>Surprise proposal flow:</strong> We coordinate timing and contingency plans so the moment lands perfectly.</p></div>
              <div className="flex gap-3"><Sparkles className="h-5 w-5 text-primary-600 mt-0.5" /><p><strong>Decor & styling:</strong> We can coordinate decor concepts and setup for the reveal space.</p></div>
              <div className="flex gap-3"><Video className="h-5 w-5 text-primary-600 mt-0.5" /><p><strong>Photo + video:</strong> Add cinematic highlight coverage alongside your engagement gallery.</p></div>
            </div>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href="/get-quote" className="btn-primary inline-flex items-center">Build My Custom Package <ArrowRight className="ml-2 h-4 w-4" /></Link>
              <Link href="/contact" className="btn-secondary inline-flex items-center">Talk to Our Concierge Team</Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
