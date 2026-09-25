import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowRight, CheckCircle2, Megaphone } from 'lucide-react'
import FAQSection from '@/components/FAQSection'
import { generateBreadcrumbSchema } from '@/lib/enhanced-seo-schemas'
import { generateFAQSchema } from '@/lib/seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'
import { brandingMarketingServices, getBrandingMarketingService } from '@/lib/branding-marketing-services'
import { generateSEOMetadata } from '@/lib/seo-helpers'

type PageProps = {
  params: Promise<{ slug: string }>
}

export function generateStaticParams() {
  return brandingMarketingServices.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params
  const service = getBrandingMarketingService(slug)

  if (!service) return {}

  return generateSEOMetadata({
    title: service.metaTitle,
    description: service.metaDescription,
    keywords: service.keywords,
    canonicalUrl: `https://www.studio37.cc/services/branding-marketing/${service.slug}`,
    pageType: 'service',
  })
}

export default async function BrandingMarketingSubServicePage({ params }: PageProps) {
  const { slug } = await params
  const service = getBrandingMarketingService(slug)

  if (!service) notFound()

  const serviceSchema = generateServiceSchema(service.shortTitle, service.metaDescription)
  const faqSchema = generateFAQSchema(service.faq)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.studio37.cc' },
    { name: 'Services', url: 'https://www.studio37.cc/services' },
    { name: 'Branding & Marketing', url: 'https://www.studio37.cc/services/branding-marketing' },
    { name: service.shortTitle, url: `https://www.studio37.cc/services/branding-marketing/${service.slug}` },
  ])

  return (
    <div className="pt-16">
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

      <section className="border-b border-stone-200 bg-stone-950 text-white">
        <div className="container mx-auto px-4 py-16 md:py-20">
          <div className="max-w-4xl">
            <Link href="/services/branding-marketing" className="mb-6 inline-flex items-center text-sm font-semibold text-amber-200 hover:text-amber-100">
              Back to Branding & Marketing
            </Link>
            <p className="eyebrow-hero mb-4 inline-flex items-center gap-2">
              <Megaphone className="h-4 w-4" aria-hidden="true" />
              {service.eyebrow}
            </p>
            <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-5xl">{service.title}</h1>
            <p className="mt-5 max-w-3xl text-xl leading-8 text-stone-200">{service.description}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href={`/book-consultation?service=${service.slug}`} className="btn-primary inline-flex items-center justify-center">
                Book a Consultation <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/request-portfolio?service=website-demo" className="btn-ghost inline-flex items-center justify-center">
                Request a Demo
              </Link>
            </div>
          </div>
          <div className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {service.heroBullets.map((bullet) => (
              <div key={bullet} className="rounded-lg border border-white/10 bg-white/10 p-4 text-sm font-medium text-stone-100">
                {bullet}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <div>
              <p className="eyebrow mb-3">Best Fit</p>
              <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">Built for practical business outcomes</h2>
              <p className="mt-4 text-lg leading-8 text-stone-600">
                This service is strongest when it connects to a clear offer, audience, conversion path, and follow-up process.
              </p>
            </div>
            <div className="grid gap-3 md:grid-cols-3">
              {service.bestFor.map((item) => (
                <div key={item} className="rounded-lg border border-stone-200 bg-stone-50 p-5">
                  <CheckCircle2 className="h-5 w-5 text-green-600" aria-hidden="true" />
                  <p className="mt-3 text-sm font-medium leading-6 text-stone-800">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="mb-8 max-w-3xl">
            <p className="eyebrow mb-3">Scope</p>
            <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">What the work can include</h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {service.deliverables.map((item) => (
              <div key={item} className="surface-panel p-5">
                <h3 className="text-base font-semibold text-stone-950">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-3xl text-center">
            <p className="eyebrow mb-3">Process</p>
            <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">A clearer path from idea to execution</h2>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {service.process.map((step, index) => (
              <div key={step.title} className="rounded-lg border border-stone-200 bg-stone-50 p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-primary-100 text-sm font-bold text-primary-800">
                  {index + 1}
                </div>
                <h3 className="text-lg font-semibold text-stone-950">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-600">{step.copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <FAQSection title={`${service.shortTitle} FAQs`} faqs={service.faq} />

      <section className="section-shell bg-stone-950 text-white">
        <div className="container mx-auto grid gap-6 px-4 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="eyebrow-hero mb-3">Ready To Map The Work?</p>
            <h2 className="text-3xl font-bold md:text-4xl">Let&apos;s decide whether this is the right growth move.</h2>
            <p className="mt-4 max-w-3xl leading-7 text-stone-300">
              We will look at your current site, offer, content, channels, and sales path before recommending scope.
            </p>
          </div>
          <Link href={`/book-consultation?service=${service.slug}`} className="btn-primary inline-flex items-center justify-center">
            Book Consultation <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  )
}
