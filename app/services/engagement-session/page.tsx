import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { CheckCircle, ArrowRight, HeartHandshake, Sparkles, MapPinned, Video, Camera } from 'lucide-react'
import { generateSEOMetadata, generateFAQSchema } from '@/lib/seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'
import FAQSection from '@/components/FAQSection'
import { generateBreadcrumbSchema } from '@/lib/enhanced-seo-schemas'
import { ServiceTestimonialsSection } from '@/components/PublicFeatureContent'
import ServiceIntentPanel from '@/components/ServiceIntentPanel'

export const metadata = generateSEOMetadata({
  title: 'Full Service Engagement Photography - Pinehurst, TX',
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
      '72-hour sneak peek',
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
      '48 hr sneak peek',
      'Premium gallery delivery',
    ],
    cta: 'Book Editorial Session',
  },
]

const CONCIERGE_PACKAGES = [
  {
    name: 'Concierge Essentials',
    price: 'Custom',
    subtitle: 'Consultation-based pricing',
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
    price: 'Custom',
    subtitle: 'Consultation-based pricing',
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
    price: 'Custom',
    subtitle: 'Consultation-based pricing',
    features: [
      'White-glove engagement experience design',
      'Premium decor + staging management',
      'Multi-location capture plan',
      'Extended photo and cinematic video team',
      'Same-week preview + premium deliverables',
    ],
  },
]

const ENGAGEMENT_PATHS = [
  {
    title: 'Session Only',
    copy: 'A polished engagement session with location guidance, posing, and gallery delivery.',
    href: '/book-a-session?package=Signature%20Engagement',
    cta: 'Book Session',
    Icon: Camera,
  },
  {
    title: 'Proposal Coverage',
    copy: 'Discreet reveal coverage plus portraits immediately after the yes.',
    href: '/book-consultation?package=Proposal%20Coverage',
    cta: 'Plan Proposal',
    Icon: HeartHandshake,
  },
  {
    title: 'Full Concierge',
    copy: 'Location, privacy, decor, timing, and coverage planned together.',
    href: '/services/concierge-services',
    cta: 'View Concierge',
    Icon: Sparkles,
  },
  {
    title: 'Photo + Video',
    copy: 'Engagement or proposal coverage with a short cinematic highlight.',
    href: '/book-consultation?package=Photo%20and%20Video%20Engagement',
    cta: 'Ask About Video',
    Icon: Video,
  },
]

export default function EngagementSessionPage() {
  const serviceSchema = generateServiceSchema(
    'Full Service Engagement Photography',
    'Engagement session and concierge proposal photography services in Pinehurst, Texas including planning, decor support, and photo/video coverage.'
  )

  const engagementFaqs = [
    {
      question: 'How much does an engagement session cost in Pinehurst, TX?',
      answer: 'Our engagement sessions start at $450, with premium and editorial options available based on timing, locations, and deliverables.',
    },
    {
      question: 'Do you help plan surprise proposals?',
      answer: 'Yes. We offer concierge proposal planning support including location scouting, timing logistics, decor guidance, and coordinated coverage.',
    },
    {
      question: 'Can we add video coverage to our engagement session?',
      answer: 'Yes. Highlight video add-ons are available on concierge engagement packages for couples who want both photo and cinematic coverage.',
    },
  ]

  const faqSchema = generateFAQSchema(engagementFaqs)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.studio37.cc' },
    { name: 'Services', url: 'https://www.studio37.cc/services' },
    { name: 'Engagement Photography', url: 'https://www.studio37.cc/services/engagement-session' },
  ])

  return (
    <div className="pt-16 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="relative min-h-[460px] bg-stone-950 text-white overflow-hidden">
        <Image
          src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1784790229/Untitled-100_gxzfgy.jpg"
          alt="Full service engagement session by Studio37"
          fill
          className="object-cover object-[52%_34%] opacity-40"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/65 to-black/35" />
        <div className="relative z-10 container mx-auto px-4 py-24">
          <div className="max-w-3xl">
            <p className="eyebrow-hero mb-3">Engagement Concierge · Pinehurst, TX</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Full Service Engagement Photography</h1>
            <p className="text-lg md:text-xl text-stone-100 mb-4 leading-relaxed">
              Elevated engagement photography with planning support from concept to final gallery.
              Signature sessions are priced 10%–30% above standard portraits for premium direction and experience.
            </p>
            <p className="text-stone-200 mb-8">
              Need a surprise proposal? Our engagement concierge team can plan location, decor, reveal timing, and photo/video coverage. Concierge scopes are custom-quoted after a planning call.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/get-quote" className="btn-primary inline-flex items-center">Get Instant Quote <ArrowRight className="ml-2 h-4 w-4" /></Link>
              <Link href="/services/concierge-services" className="btn-secondary inline-flex items-center">Explore Concierge Services</Link>
              <Link href="/book-consultation" className="btn-secondary inline-flex items-center">Book a Planning Call</Link>
            </div>
          </div>
        </div>
      </section>

      <ServiceIntentPanel service="engagement" />

      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8 max-w-3xl">
            <p className="eyebrow mb-2">Choose Your Path</p>
            <h2 className="text-3xl font-bold text-stone-950">Pick the engagement experience that fits the moment</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-4">
            {ENGAGEMENT_PATHS.map(({ title, copy, href, cta, Icon }) => (
              <Link key={title} href={href} className="surface-panel group block p-5 transition hover:-translate-y-0.5 hover:border-primary-300">
                <Icon className="mb-4 h-6 w-6 text-primary-700" aria-hidden="true" />
                <h3 className="text-lg font-bold text-stone-950">{title}</h3>
                <p className="mt-2 min-h-20 text-sm leading-6 text-stone-600">{copy}</p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary-700">
                  {cta} <ArrowRight className="ml-2 h-4 w-4 transition group-hover:translate-x-1" aria-hidden="true" />
                </span>
              </Link>
            ))}
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
                <Link href={`/book-a-session?package=${encodeURIComponent(pkg.name)}`} className="btn-secondary text-center block">{pkg.cta}</Link>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ['Signature', 'Best for classic save-the-date portraits, one main location, and a polished gallery without proposal logistics.'],
              ['Premium', 'Best for more variety, outfit changes, stronger location storytelling, and priority delivery options.'],
              ['Editorial', 'Best for styled concepts, dramatic light, multiple scenes, and a more magazine-inspired couple session.'],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-2xl border border-stone-200 bg-white p-5">
                <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-700">{title}</p>
                <p className="mt-2 text-sm leading-6 text-stone-600">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="concierge" className="section-shell scroll-mt-28 bg-white">
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
                <p className="text-sm text-stone-500 -mt-3 mb-5">{pkg.subtitle}</p>
                <ul className="space-y-2">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-2 text-sm text-stone-700">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Link href={`/book-consultation?package=${encodeURIComponent(pkg.name)}`} className="btn-secondary text-center block mt-6">Book Consultation</Link>
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
              <Link href="/book-consultation?package=Engagement+Concierge" className="btn-primary inline-flex items-center">Book Consultation <ArrowRight className="ml-2 h-4 w-4" /></Link>
              <Link href="/services/concierge-services" className="btn-secondary inline-flex items-center">View Concierge Services</Link>
              <Link href="/contact" className="btn-secondary inline-flex items-center">Talk to Our Concierge Team</Link>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
              <h3 className="font-semibold text-stone-950">We handle</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">Timing, privacy notes, photo/video coverage plan, location scouting, backup options, and optional decor coordination.</p>
            </div>
            <div className="rounded-2xl border border-stone-200 bg-stone-50 p-5">
              <h3 className="font-semibold text-stone-950">You handle</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">The ring, final guest list, personal details, and the story only you can bring to the moment.</p>
            </div>
          </div>
        </div>
      </section>

      <FAQSection
        title="Engagement Session FAQ"
        serviceName="engagement photography"
        faqs={engagementFaqs}
      />
      <ServiceTestimonialsSection service="engagement" />
    </div>
  )
}
