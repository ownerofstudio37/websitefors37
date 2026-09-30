import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import AboveBeyondPoolsProof from '@/components/AboveBeyondPoolsProof'
import { generateBreadcrumbSchema } from '@/lib/enhanced-seo-schemas'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'

export const metadata = generateSEOMetadata({
  title: 'Marketing Results & SEO Case Study | Studio37 Pinehurst TX',
  description:
    'See Studio37 marketing results, including the Above Beyond Pools SEO case study with 76 peak page-one keywords, three #1 rankings, and 58% impression growth.',
  keywords: [
    'Studio37 marketing results',
    'SEO case study Pinehurst TX',
    'local SEO results',
    'branding and marketing case study',
    'Above Beyond Pools SEO',
  ],
  canonicalUrl: 'https://www.studio37.cc/services/branding-marketing/results',
  pageType: 'service',
})

export const revalidate = 86400

export default function BrandingMarketingResultsPage() {
  const serviceSchema = generateServiceSchema(
    'Marketing Results and SEO Case Study',
    'Studio37 marketing results and SEO case study proof for branding, web design, content, and local search services.'
  )
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.studio37.cc' },
    { name: 'Services', url: 'https://www.studio37.cc/services' },
    { name: 'Branding & Marketing', url: 'https://www.studio37.cc/services/branding-marketing' },
    { name: 'Marketing Results', url: 'https://www.studio37.cc/services/branding-marketing/results' },
  ])

  const work = [
    {
      title: 'Technical foundation',
      copy: 'Strengthen crawlability, page structure, metadata, schema, performance, and indexable content before scaling campaigns.',
    },
    {
      title: 'Service-intent content',
      copy: 'Build pages around the searches real customers use when they are comparing services, locations, and providers.',
    },
    {
      title: 'Conversion paths',
      copy: 'Make the next step obvious with consultation CTAs, forms, proof, landing pages, and follow-up context.',
    },
    {
      title: 'Ongoing improvement',
      copy: 'Use search, ad, traffic, and inquiry signals to decide which pages, offers, and campaigns need attention next.',
    },
  ]

  const trackedSignals = [
    'Page-one keyword growth',
    'Indexed page coverage',
    'Impressions and clicks',
    'Click-through rate',
    'Cost per lead',
    'Landing-page conversion rate',
    'Profile visits and engagement quality',
    'Consultation and form submissions',
  ]

  return (
    <div className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="border-b border-stone-200 bg-stone-950 text-white">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-4xl">
            <Link href="/services/branding-marketing" className="mb-6 inline-flex items-center text-sm font-semibold text-amber-200 hover:text-amber-100">
              Back to Branding & Marketing
            </Link>
            <p className="eyebrow-hero mb-4">Marketing Results</p>
            <h1 className="text-4xl font-bold leading-tight md:text-5xl">Proof that strategy, search, content, and websites work better together.</h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-stone-200">
              Studio37 is built as a one-stop growth partner, so the same team can connect the page structure, creative assets, SEO work, campaigns, and reporting behind a business goal.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/book-consultation?service=branding" className="btn-primary inline-flex items-center justify-center">
                Book a Consultation <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/case-studies/above-beyond-pools-seo" className="btn-ghost inline-flex items-center justify-center">
                Read Case Study
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AboveBeyondPoolsProof compact secondaryHref="/services/branding-marketing/seo-services" secondaryLabel="Explore SEO Services" />

      <section className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="mb-8 max-w-3xl">
            <p className="eyebrow mb-3">How Results Are Built</p>
            <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">The case study was not one isolated SEO trick</h2>
            <p className="mt-4 text-lg leading-8 text-stone-600">
              The repeatable part is the system: clean technical structure, useful service pages, local intent, conversion paths, and a cadence for improving what the data reveals.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {work.map((item) => (
              <article key={item.title} className="surface-panel p-5">
                <h3 className="text-lg font-semibold text-stone-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-600">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="eyebrow mb-3">What We Track</p>
              <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">Marketing gets better when the signals are visible</h2>
              <p className="mt-4 text-lg leading-8 text-stone-600">
                Not every engagement uses every metric, but these are the kinds of signals that help separate activity from actual progress.
              </p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {trackedSignals.map((signal) => (
                <div key={signal} className="flex gap-3 rounded-lg border border-stone-200 bg-stone-50 p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" aria-hidden="true" />
                  <span className="text-sm font-medium leading-6 text-stone-800">{signal}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-stone-950 text-white">
        <div className="container mx-auto grid gap-6 px-4 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="eyebrow-hero mb-3">Apply This To Your Business</p>
            <h2 className="text-3xl font-bold md:text-4xl">Let&apos;s find the first growth bottleneck.</h2>
            <p className="mt-4 max-w-3xl leading-7 text-stone-300">
              We will look at your current website, search visibility, content, paid traffic opportunities, and lead path before recommending scope.
            </p>
          </div>
          <Link href="/book-consultation?service=branding" className="btn-primary inline-flex items-center justify-center">
            Book Consultation <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  )
}
