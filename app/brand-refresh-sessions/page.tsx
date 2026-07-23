import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { generateFAQSchema, generateSEOMetadata } from '@/lib/seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'
import FAQSection from '@/components/FAQSection'
import { ServiceTestimonialsSection, TurnaroundExpectationsSection } from '@/components/PublicFeatureContent'
import PrepGuideLeadMagnet from '@/components/PrepGuideLeadMagnet'
import PortraitSubServiceSupport from '@/components/PortraitSubServiceSupport'

export const metadata = generateSEOMetadata({
  title: 'Brand Refresh Photography Sessions | Studio37',
  description: 'Brand refresh sessions for businesses that need fresh website, social, profile, product, and campaign photography in Pinehurst and Greater Houston.',
  canonicalUrl: 'https://www.studio37.cc/brand-refresh-sessions',
  pageType: 'service',
})

export const revalidate = 86400

const deliverables = ['Website hero images', 'Team and founder portraits', 'Social content library', 'Product or workspace details', 'Campaign-ready brand visuals']

const commercialPackages = [
  ['Business Express', '$500', '1-hour session', ['15+ edited images', 'Full commercial usage', '48-hour turnaround', 'Private gallery']],
  ['Brand Starter', '$850', '2-hour session', ['30+ edited images', 'Shot list planning', 'Commercial usage', 'Web and social files']],
  ['Content Library', '$1,500', '4-hour session', ['75+ edited images', 'Brand consultation', 'Ad-ready files', '5-7 business day delivery']],
]

const brandRefreshFaqs = [
  {
    question: 'Who is a brand refresh session best for?',
    answer: 'Brand refresh sessions are best for businesses that already have an offer or website but need updated photos for pages, profiles, ads, social content, and sales materials.',
  },
  {
    question: 'Is this different from a full commercial shoot?',
    answer: 'Yes. A brand refresh is a focused content update. A larger commercial shoot is better when you need a deeper shot list, multiple locations, product volume, campaign planning, or broader licensing needs.',
  },
  {
    question: 'Can Studio37 help plan the shot list?',
    answer: 'Yes. We map the session around your website, social channels, campaign needs, profile photos, workspace details, and any product or service visuals you need first.',
  },
]

export default function BrandRefreshSessionsPage() {
  const serviceSchema = generateServiceSchema(
    'Brand Refresh Photography Sessions',
    'Brand refresh photography sessions for businesses that need fresh website, social, profile, product, and campaign imagery.'
  )
  const faqSchema = generateFAQSchema(brandRefreshFaqs)

  return (
    <main className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="relative min-h-[520px] overflow-hidden bg-stone-950 text-white">
        <Image
          src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1784791656/VB_School_Caitie_Faves_-_6_gsn8fe.jpg"
          alt="Studio37 brand refresh photography session for a business"
          fill
          priority
          className="object-cover opacity-55"
        />
        <div className="relative z-10 container mx-auto flex min-h-[520px] items-center px-4">
          <div className="max-w-2xl">
            <p className="eyebrow-hero mb-3">Seasonal Business Content</p>
            <h1 className="text-5xl font-bold">Brand Refresh Sessions</h1>
            <p className="mt-4 text-lg leading-8 text-stone-100">
              A practical content refresh for businesses that need updated imagery for websites, ads, listings, social media, and sales materials.
            </p>
            <p className="mt-4 text-sm font-semibold text-amber-100">Starting at $500 · commercial usage included · fast-track options available</p>
            <Link href="/book-a-session?package=commercial_express" className="btn-primary mt-8 inline-flex items-center">
              Plan a Brand Refresh <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow mb-3">Content Library</p>
            <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">Refresh the places customers decide to trust you</h2>
            <p className="mt-4 leading-7 text-stone-600">
              We plan the session around your highest-value channels so the gallery is useful immediately, not just pretty.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {deliverables.map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-lg border border-stone-200 bg-stone-50 p-4">
                <CheckCircle2 className="h-5 w-5 text-green-700" aria-hidden="true" />
                <span className="font-medium text-stone-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TurnaroundExpectationsSection service="commercial" />
      <section className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="eyebrow mb-3">Commercial Pricing</p>
            <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">Brand refresh sessions use commercial photography pricing</h2>
            <p className="mt-3 text-lg leading-8 text-stone-600">
              Pick the production depth that matches how many website, profile, campaign, and social assets you need.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {commercialPackages.map(([name, price, duration, features]) => (
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
                <Link href={`/book-consultation?package=${encodeURIComponent(name as string)}`} className="btn-secondary mt-6 block text-center">
                  Book Consultation
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <PortraitSubServiceSupport
        service="brand refresh sessions"
        parentHref="/services/commercial-photography"
        parentLabel="commercial photography"
        proof={[
          'Website hero, team, workspace, product detail, and social-content examples.',
          'Campaign-ready galleries with usage context and practical crop variety.',
          'Commercial examples matched to your industry, location, and customer-facing channels.',
        ]}
        planning={['Channel usage map', 'Shot priority list', 'Usage rights review']}
        objection="A brand refresh should create images you can actually use. The consultation clarifies where the photos need to work, what crops are needed, and what proof examples are worth reviewing before you book."
      />
      <FAQSection title="Brand Refresh Session FAQ" faqs={brandRefreshFaqs} />
      <PrepGuideLeadMagnet />
      <ServiceTestimonialsSection service="commercial" />
    </main>
  )
}
