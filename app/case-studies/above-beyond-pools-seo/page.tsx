import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import AboveBeyondPoolsProof from '@/components/AboveBeyondPoolsProof'
import MarketingAuditCTA from '@/components/MarketingAuditCTA'
import { generateBreadcrumbSchema } from '@/lib/enhanced-seo-schemas'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'

export const metadata = generateSEOMetadata({
  title: 'Above Beyond Pools SEO Case Study | Studio37',
  description:
    'See how Studio37 helped Above Beyond Pools grow from under 10 page-one keywords to 76 peak page-one keywords with local SEO, content, and technical search work.',
  keywords: [
    'Above Beyond Pools SEO case study',
    'local SEO case study',
    'pool company SEO results',
    'Studio37 SEO results',
    'service business SEO case study',
  ],
  canonicalUrl: 'https://www.studio37.cc/case-studies/above-beyond-pools-seo',
  pageType: 'article',
})

export const revalidate = 86400

export default function AboveBeyondPoolsCaseStudyPage() {
  const serviceSchema = generateServiceSchema(
    'Above Beyond Pools SEO Case Study',
    'Studio37 local SEO case study showing page-one keyword growth, #1 rankings, impression growth, and expanded indexed coverage for an Austin-area pool service business.'
  )
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.studio37.cc' },
    { name: 'Branding & Marketing', url: 'https://www.studio37.cc/services/branding-marketing' },
    { name: 'Marketing Results', url: 'https://www.studio37.cc/services/branding-marketing/results' },
    { name: 'Above Beyond Pools SEO Case Study', url: 'https://www.studio37.cc/case-studies/above-beyond-pools-seo' },
  ])

  const work = [
    {
      title: 'Technical health cleanup',
      copy: 'Strengthened the crawl and index foundation so search engines could better understand the site.',
    },
    {
      title: 'Service-intent content',
      copy: 'Built around pool cleaning and hot tub cleaning searches with clear local buying intent.',
    },
    {
      title: 'More useful coverage',
      copy: 'Expanded the indexed footprint from about 45 pages to 64 pages tied to services and local demand.',
    },
  ]

  const nextMoves = [
    'Sharpen page-one titles and descriptions to improve click-through rate.',
    'Defend the strongest #1 rankings with useful, updated service content.',
    'Turn organic visibility into more qualified calls, forms, and booked work.',
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
            <Link href="/services/branding-marketing/results" className="mb-6 inline-flex items-center text-sm font-semibold text-amber-200 hover:text-amber-100">
              Back to Marketing Results
            </Link>
            <p className="eyebrow-hero mb-4">SEO Case Study</p>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">From invisible to page one in Austin pool searches.</h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-stone-200">
              Above Beyond Pools had a service business worth finding. Studio37 helped the search footprint catch up to the work customers were already looking for.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/book-consultation?service=marketing-audit&source=case-study" className="btn-primary inline-flex items-center justify-center">
                Request Growth Audit <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/services/branding-marketing/seo-services" className="btn-ghost inline-flex items-center justify-center">
                Explore SEO Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <AboveBeyondPoolsProof compact secondaryHref="/services/branding-marketing/seo-services" secondaryLabel="Explore SEO Services" />

      <section className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="eyebrow mb-3">Starting Point</p>
              <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">Great service. Barely visible in Google.</h2>
              <p className="mt-4 text-lg leading-8 text-stone-600">
                The business had the real-world service fit, but the organic footprint did not yet match the local demand. The work focused on making the site easier to understand, expanding service-intent coverage, and improving visibility for searches that implied a ready customer.
              </p>
            </div>
            <div className="rounded-xl border border-stone-200 bg-white p-6 shadow-sm">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-700">Reporting Window</p>
              <p className="mt-3 text-3xl font-bold text-stone-950">Apr. 23 to Sep. 27, 2026</p>
              <p className="mt-3 text-sm leading-6 text-stone-600">
                Case-study data combines Google Search Console and ranking snapshots from the 2026 SEO engagement.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8 max-w-3xl">
            <p className="eyebrow mb-3">The Work</p>
            <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">Built for the searches Austin customers actually type</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {work.map((item) => (
              <article key={item.title} className="surface-panel p-6">
                <h3 className="text-xl font-semibold text-stone-950">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-600">{item.copy}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div>
              <p className="eyebrow mb-3">What Comes Next</p>
              <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">Visibility is the start. Better qualified action is the next layer.</h2>
            </div>
            <div className="grid gap-3">
              {nextMoves.map((move) => (
                <div key={move} className="flex gap-3 rounded-lg border border-stone-200 bg-white p-4">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" aria-hidden="true" />
                  <span className="text-sm font-medium leading-6 text-stone-800">{move}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MarketingAuditCTA source="above-beyond-case-study" />
    </div>
  )
}
