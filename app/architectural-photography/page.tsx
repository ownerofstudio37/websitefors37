import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { generateFAQSchema, generateSEOMetadata } from '@/lib/seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'
import FAQSection from '@/components/FAQSection'
import PortraitSubServiceSupport from '@/components/PortraitSubServiceSupport'
import { ServiceTestimonialsSection, TurnaroundExpectationsSection } from '@/components/PublicFeatureContent'

export const metadata = generateSEOMetadata({
  title: 'Architectural & Real Estate Photography Pinehurst TX | Studio37',
  description:
    'Architectural and real estate photography in Pinehurst, TX for listings, interiors, commercial spaces, rentals, venues, and business marketing.',
  canonicalUrl: 'https://www.studio37.cc/architectural-photography',
  pageType: 'service',
})

export const revalidate = 86400

const packages = [
  ['Listing Essentials', '$500', '1-hour session', ['15+ edited images', 'Interior and exterior basics', 'Commercial usage', '48-hour turnaround']],
  ['Property Story', '$850', '2-hour session', ['30+ edited images', 'Rooms, details, and exterior flow', 'Web and listing crops', 'Private gallery']],
  ['Venue Content Library', '$1,500', '4-hour session', ['75+ edited images', 'Space, details, lifestyle, and brand use', 'Ad-ready files', '5-7 business day delivery']],
]

const faqs = [
  {
    question: 'Do you photograph real estate listings and commercial spaces?',
    answer: 'Yes. We photograph homes, venues, offices, rentals, restaurants, retail spaces, and commercial interiors for listings, websites, and marketing.',
  },
  {
    question: 'How should I prepare the space?',
    answer: 'Clean surfaces, reduce clutter, turn on working lights, stage key rooms, and identify the most important rooms or features before the session.',
  },
]

export default function ArchitecturalPhotographyPage() {
  const serviceSchema = generateServiceSchema(
    'Architectural and Real Estate Photography',
    'Architectural and real estate photography in Pinehurst, Texas for listings, interiors, commercial spaces, rentals, venues, and business marketing.'
  )
  const faqSchema = generateFAQSchema(faqs)

  return (
    <main className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="relative min-h-[520px] overflow-hidden bg-stone-950 text-white">
        <Image
          src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1769255650/PS372976_wnsuhb.jpg"
          alt="Studio37 architectural and real estate photography for business spaces"
          fill
          priority
          className="object-cover opacity-55"
        />
        <div className="relative z-10 container mx-auto flex min-h-[520px] items-center px-4">
          <div className="max-w-2xl">
            <p className="eyebrow-hero mb-3">Real Estate + Spaces</p>
            <h1 className="text-5xl font-bold">Architectural Photography</h1>
            <p className="mt-4 text-lg leading-8 text-stone-100">
              Polished real estate, interior, venue, and commercial space photography for listings, websites, and marketing.
            </p>
            <p className="mt-4 text-sm font-semibold text-amber-100">Starting at $500 · commercial usage included</p>
            <Link href="/book-consultation?service=architectural-photography" className="btn-primary mt-8 inline-flex items-center">
              Plan Space Photos <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="eyebrow mb-3">Pricing</p>
            <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">Real estate and architectural packages</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {packages.map(([name, price, duration, features]) => (
              <div key={name as string} className="surface-panel p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">{name as string}</p>
                <p className="mt-2 text-4xl font-bold text-stone-950">{price as string}</p>
                <p className="mt-1 text-sm text-stone-500">{duration as string}</p>
                <ul className="mt-5 space-y-2">
                  {(features as string[]).map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm text-stone-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-700" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TurnaroundExpectationsSection service="commercial" />
      <PortraitSubServiceSupport
        service="architectural photography"
        parentHref="/services/commercial-photography"
        parentLabel="commercial photography"
        proof={['Interior, exterior, listing, venue, and commercial space examples.', 'Wide, detail, and web-ready crop examples.', 'Space galleries matched to listings, venue marketing, or business websites.']}
        planning={['Room priority list', 'Staging notes', 'Listing or web usage']}
        objection="Space photography needs clarity before arrival. The planning call sets room priorities, staging notes, lighting expectations, usage needs, and delivery timing."
      />
      <FAQSection title="Architectural Photography FAQ" faqs={faqs} />
      <ServiceTestimonialsSection service="commercial" />
    </main>
  )
}
