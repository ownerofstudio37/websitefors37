import Link from 'next/link'
import { notFound } from 'next/navigation'
import { AlertCircle, ArrowRight, CheckCircle2, Megaphone, Star } from 'lucide-react'
import CldImg, { SECONDARY_WIDTHS } from '@/components/CldImg'
import FAQSection from '@/components/FAQSection'
import { generateBreadcrumbSchema } from '@/lib/enhanced-seo-schemas'
import { generateServiceSchema } from '@/lib/seo-config'
import { brandingDetails, brandingMarketingServices, getBrandingMarketingService } from '@/lib/branding-marketing-services'
import { studio37Reviews } from '@/lib/public-content'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import CredentialBadges from '@/components/CredentialBadges'

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

// Each sub-page leads with what the service is and who needs it, then first-hand proof when we have it
// (see brandingDetails), scope, process, fit, and an FAQ specific to the service.
export default async function BrandingMarketingSubServicePage({ params }: PageProps) {
  const { slug } = await params
  const service = getBrandingMarketingService(slug)
  const detail = brandingDetails[slug]

  if (!service || !detail) notFound()
  const relatedServices = service.relatedServices
    .map((relatedSlug) => getBrandingMarketingService(relatedSlug))
    .filter((relatedService): relatedService is NonNullable<typeof relatedService> => Boolean(relatedService))
  const proof = detail.proof
  const proofReview = proof?.reviewName ? studio37Reviews.find((review) => review.name === proof.reviewName) : undefined
  const bookHref = `/book-consultation?service=${service.slug}`

  const serviceSchema = generateServiceSchema(service.shortTitle, service.metaDescription)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.studio37.cc' },
    { name: 'Services', url: 'https://www.studio37.cc/services' },
    { name: 'Branding & Marketing', url: 'https://www.studio37.cc/services/branding-marketing' },
    { name: service.shortTitle, url: `https://www.studio37.cc/services/branding-marketing/${service.slug}` },
  ])

  return (
    <div className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* 1. Hero */}
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
              <Link href={bookHref} className="btn-primary inline-flex items-center justify-center">
                Book a Consultation <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
              {detail.demoHref ? (
                <Link href={detail.demoHref} className="btn-ghost inline-flex items-center justify-center">
                  Request a Demo
                </Link>
              ) : (
                <Link href="/services/branding-marketing/results" className="btn-ghost inline-flex items-center justify-center">
                  See Marketing Results
                </Link>
              )}
            </div>
          </div>
          <ul className="mt-10 grid gap-3 md:grid-cols-2 lg:grid-cols-4">
            {service.heroBullets.map((bullet) => (
              <li key={bullet} className="rounded-lg border border-white/10 bg-white/10 p-4 text-sm font-medium text-stone-100">
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 2. What it is and the signs you need it */}
      <section className="section-shell bg-white">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          <div>
            <p className="eyebrow mb-3">What it is</p>
            <h2 className="mb-4 text-3xl font-bold text-stone-950 md:text-4xl">{service.shortTitle}, explained</h2>
            <p className="text-lg leading-8 text-stone-700">{detail.intro}</p>
          </div>
          <div className="rounded-2xl bg-stone-50 p-6 md:p-8">
            <h2 className="mb-4 text-xl font-bold text-stone-950">Signs you need it</h2>
            <ul className="space-y-3">
              {detail.signs.map((sign) => (
                <li key={sign} className="flex gap-3 leading-7 text-stone-700">
                  <AlertCircle className="mt-1 h-5 w-5 flex-shrink-0 text-amber-700" aria-hidden="true" />
                  <span>{sign}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {detail.credentials && detail.credentials.length > 0 && (
        <section className="border-y border-stone-200 bg-stone-50 py-8">
          <div className="container mx-auto px-4">
            <CredentialBadges ids={detail.credentials} heading="Certified in this work" />
          </div>
        </section>
      )}

      {/* 3. First-hand proof, only where we have it */}
      {proof && (
        <section className="section-shell bg-stone-950 text-white">
          <div className={`container mx-auto grid gap-10 px-4 lg:items-center ${proof.image ? 'lg:grid-cols-[0.9fr_1.1fr]' : ''}`}>
            {proof.image && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <CldImg image={proof.image} widths={SECONDARY_WIDTHS} sizes="(min-width: 1024px) 45vw, 100vw" className="absolute inset-0 h-full w-full object-cover" />
              </div>
            )}
            <div className={proof.image ? '' : 'max-w-4xl'}>
              <p className="eyebrow-hero mb-3">{proof.eyebrow}</p>
              <h2 className="mb-4 text-3xl font-bold md:text-4xl">{proof.heading}</h2>
              <p className="mb-6 text-lg leading-8 text-stone-300">{proof.body}</p>
              <ul className={`grid gap-3 ${proof.image ? '' : 'md:grid-cols-2'}`}>
                {proof.points.map((point) => (
                  <li key={point} className="flex gap-3 rounded-lg border border-white/10 bg-white/5 p-4 text-stone-100">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-300" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              {proofReview && (
                <figure className="mt-6 rounded-xl bg-white/10 p-5">
                  {proof.reviewLabel && <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-400">{proof.reviewLabel}</p>}
                  <div className="mb-2 flex gap-1 text-amber-400" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="leading-7 text-stone-100">&ldquo;{proofReview.quote}&rdquo;</blockquote>
                  <figcaption className="mt-3 text-sm font-semibold text-white">
                    {proofReview.name} <span className="font-normal text-stone-400">· {proofReview.detail}</span>
                  </figcaption>
                </figure>
              )}
              {proof.href && proof.hrefLabel && (
                <Link href={proof.href} className="mt-6 inline-flex items-center font-semibold text-amber-300 hover:text-amber-200">
                  {proof.hrefLabel} <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                </Link>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 4. Scope */}
      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <p className="eyebrow mb-3">Scope</p>
          <h2 className="mb-8 text-3xl font-bold text-stone-950 md:text-4xl">What&apos;s included</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {detail.included.map((item) => (
              <article key={item.title} className="rounded-lg border border-stone-200 bg-stone-50 p-5">
                <h3 className="mb-2 text-lg font-semibold text-stone-950">{item.title}</h3>
                <p className="text-sm leading-6 text-stone-600">{item.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Process */}
      <section className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <h2 className="mb-8 text-3xl font-bold text-stone-950 md:text-4xl">How we work</h2>
          <ol className="grid gap-4 md:grid-cols-3">
            {service.process.map((step, index) => (
              <li key={step.title} className="rounded-lg border border-stone-200 bg-white p-6">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-amber-700 text-sm font-bold text-white">{index + 1}</div>
                <h3 className="text-lg font-semibold text-stone-950">{step.title}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-600">{step.copy}</p>
              </li>
            ))}
          </ol>
          {!proof && (
            <div className="mt-10">
              <h3 className="mb-4 text-xl font-bold text-stone-950">What we track</h3>
              <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {service.outcomeStats.map((stat) => (
                  <article key={`${stat.value}-${stat.label}`} className="rounded-lg border border-stone-200 bg-white p-5">
                    <p className="text-2xl font-bold text-amber-800">{stat.value}</p>
                    <h4 className="mt-1 font-semibold text-stone-950">{stat.label}</h4>
                    <p className="mt-2 text-sm leading-6 text-stone-600">{stat.note}</p>
                  </article>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 6. Fit */}
      <section className="section-shell bg-white">
        <div className="container mx-auto grid gap-8 px-4 md:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-stone-950">Best for</h2>
            <ul className="space-y-3">
              {service.bestFor.map((item) => (
                <li key={item} className="flex gap-3 leading-7 text-stone-700">
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-amber-700" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-bold text-stone-950">Industries we plan for</h2>
            <ul className="flex flex-wrap gap-2">
              {service.industryFits.map((industry) => (
                <li key={industry} className="rounded-full border border-stone-200 bg-stone-50 px-4 py-2 text-sm font-medium text-stone-800">
                  {industry}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <FAQSection title={`${service.shortTitle} FAQs`} faqs={[...service.faq, ...detail.moreFaq]} />

      {/* 7. Connected services */}
      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">Pairs well with</h2>
            <Link href="/services/branding-marketing/results" className="btn-secondary inline-flex items-center justify-center">
              View Marketing Results <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-3">
            {relatedServices.map((relatedService) => (
              <Link
                key={relatedService.slug}
                href={`/services/branding-marketing/${relatedService.slug}`}
                className="rounded-lg border border-stone-200 bg-stone-50 p-5 transition hover:-translate-y-0.5 hover:border-amber-300 hover:bg-white"
              >
                <h3 className="text-lg font-semibold text-stone-950">{relatedService.shortTitle}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">{relatedService.parentCardDescription}</p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-amber-800">
                  View service <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Final call to action */}
      <section className="section-shell bg-stone-950 text-white">
        <div className="container mx-auto grid gap-6 px-4 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <h2 className="text-3xl font-bold md:text-4xl">Ready to talk about {service.shortTitle}?</h2>
            <p className="mt-4 max-w-3xl leading-7 text-stone-300">
              We look at your current site, offers, and channels first, then recommend a scope that fits.
            </p>
          </div>
          <Link href={bookHref} className="btn-primary inline-flex items-center justify-center">
            Book Consultation <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </div>
  )
}
