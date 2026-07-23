import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, CheckCircle, HeartHandshake, MapPinned, Sparkles, Video } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { generateFAQSchema, generateSEOMetadata } from '@/lib/seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'
import { generateBreadcrumbSchema } from '@/lib/enhanced-seo-schemas'
import ConciergeInquiryForm from '@/components/ConciergeInquiryForm'
import { ServiceTestimonialsSection } from '@/components/PublicFeatureContent'
import ServiceIntentPanel from '@/components/ServiceIntentPanel'

export const metadata = generateSEOMetadata({
  title: 'Concierge Proposal and Engagement Services - Pinehurst, TX',
  description:
    'Studio37 concierge services for surprise proposals and engagement photography, including location planning, decor coordination, timelines, and photo or video coverage.',
  keywords: [
    'concierge proposal planning Texas',
    'engagement concierge Pinehurst TX',
    'proposal photographer The Woodlands',
    'proposal planning photographer',
    'engagement photo video coverage',
  ],
  canonicalUrl: 'https://www.studio37.cc/services/concierge-services',
  pageType: 'service',
})

export const revalidate = 86400

const conciergeOptions = [
  'Location scouting and privacy planning',
  'Proposal run-of-show and backup timing',
  'Decor concept, setup guidance, and vendor coordination',
  'Engagement photography with optional highlight video',
  'Client-ready gallery delivery and planning support',
]

const conciergeHighlights: Array<{ title: string; copy: string; Icon: LucideIcon }> = [
  { title: 'Location', copy: 'Scouting, light direction, parking, privacy, and contingency options.', Icon: MapPinned },
  { title: 'Styling', copy: 'Decor concepts, reveal setup guidance, and vendor coordination.', Icon: Sparkles },
  { title: 'Coverage', copy: 'Photo coverage with optional video for the proposal and portraits.', Icon: Video },
  { title: 'Flow', copy: 'A clear timeline so everyone knows where to be and when.', Icon: HeartHandshake },
]

export default function ConciergeServicesPage() {
  const serviceSchema = generateServiceSchema(
    'Concierge Proposal and Engagement Services',
    'White-glove proposal and engagement planning services in Pinehurst, Texas with location scouting, decor coordination, and photo/video coverage.'
  )
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.studio37.cc' },
    { name: 'Services', url: 'https://www.studio37.cc/services' },
    { name: 'Concierge Services', url: 'https://www.studio37.cc/services/concierge-services' },
  ])
  const conciergeFaqs = [
    {
      question: 'What does concierge proposal planning include?',
      answer: 'Concierge planning can include location scouting, privacy planning, decor guidance, run-of-show timing, vendor coordination, and proposal photo or video coverage.',
    },
    {
      question: 'How is concierge proposal pricing handled?',
      answer: 'Concierge scopes are custom-quoted after a planning call because pricing depends on location access, decor, timing, coverage length, and whether video is included.',
    },
    {
      question: 'Can Studio37 include both photo and video coverage?',
      answer: 'Yes. Proposal and engagement concierge packages can include photography plus a short highlight video when that is part of the planned scope.',
    },
  ]
  const faqSchema = generateFAQSchema(conciergeFaqs)

  return (
    <div className="bg-white pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="relative overflow-hidden bg-stone-950 text-white">
        <Image
          src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1775537570/Jay_Proposal_-_1_12_e7wqsb.jpg"
          alt="Concierge proposal planning and engagement photography"
          fill
          className="object-cover object-[48%_38%] opacity-40"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        <div className="container relative z-10 mx-auto px-4 py-24 md:py-28">
          <div className="max-w-3xl">
            <p className="eyebrow-hero mb-3">Concierge Services</p>
            <h1 className="mb-5 text-4xl font-bold md:text-6xl">Proposal Planning, Engagement Coverage, and Calm Logistics</h1>
            <p className="mb-8 text-lg leading-relaxed text-stone-100 md:text-xl">
              A white-glove planning path for couples who want the moment handled with care, from the reveal plan to the final gallery.
              Custom planning starts with a consultation so we can quote the right level of privacy, decor, and coverage.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link href="/book-consultation?package=Concierge%20Services" className="btn-primary inline-flex items-center">
                Book Concierge Call <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/services/engagement-session" className="btn-secondary inline-flex items-center">
                View Engagement Photography
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ServiceIntentPanel service="concierge" />

      <section className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
            <div>
              <p className="eyebrow mb-3">What We Handle</p>
              <h2 className="mb-4 text-3xl font-bold text-stone-950">A managed plan for high-stakes moments</h2>
              <p className="text-stone-600">
                Concierge services are built for proposals, engagement reveals, and multi-part couple experiences where timing, privacy, lighting, and communication all matter.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {conciergeHighlights.map(({ title, copy, Icon }) => (
                <div key={title} className="surface-panel p-5">
                  <Icon className="mb-3 h-6 w-6 text-primary-700" />
                  <h3 className="font-semibold text-stone-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-5xl">
            <div className="mb-8 max-w-3xl">
              <p className="eyebrow mb-3">Real Concierge Scenarios</p>
              <h2 className="text-3xl font-bold text-stone-950">Support for the details that make or break the moment</h2>
            </div>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              {[
                ['Proposal planning', 'Timing, reveal flow, backup plans, and where we hide before the moment.'],
                ['Decor coordination', 'Simple setup guidance, visual priorities, and what needs to be ready before arrival.'],
                ['Privacy + logistics', 'Parking, foot traffic, family/friend staging, restroom access, and weather options.'],
                ['Photo/video coverage', 'Clear plan for the proposal, portraits afterward, family reactions, and optional highlight video.'],
              ].map(([title, copy]) => (
                <div key={title} className="surface-panel p-5">
                  <h3 className="font-semibold text-stone-950">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-stone-600">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-4xl surface-panel p-7 md:p-9">
            <h2 className="mb-5 text-3xl font-bold text-stone-950">Concierge Services Include</h2>
            <ul className="grid gap-3 md:grid-cols-2">
              {conciergeOptions.map((option) => (
                <li key={option} className="flex gap-3 text-sm text-stone-700">
                  <CheckCircle className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-600" />
                  <span>{option}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/book-consultation?package=Concierge%20Services" className="btn-primary inline-flex items-center">
                Start Planning <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link href="/session-prep/engagement" className="btn-secondary inline-flex items-center">
                Engagement Prep Guide
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <ConciergeInquiryForm />
        </div>
      </section>

      <ServiceTestimonialsSection service="concierge" />
      <section className="section-shell bg-white">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-5 text-3xl font-bold text-stone-950">Concierge Proposal FAQ</h2>
          <div className="space-y-3">
            {conciergeFaqs.map((faq) => (
              <details key={faq.question} className="rounded-lg border border-stone-200 bg-stone-50 p-4">
                <summary className="cursor-pointer font-semibold text-stone-950">{faq.question}</summary>
                <p className="mt-3 text-stone-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
