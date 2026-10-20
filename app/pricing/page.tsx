import Link from 'next/link'
import { ArrowRight, Check } from 'lucide-react'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateBreadcrumbSchema } from '@/lib/enhanced-seo-schemas'
import { businessInfo } from '@/lib/seo-config'
import { studio37ServiceFacts } from '@/lib/studio37-package-facts'
import { serviceGuides } from '@/lib/service-guides'

export const metadata = generateSEOMetadata({
  title: 'Photography Prices and Packages | Pinehurst, TX',
  description:
    'Every Studio37 package price in one place: weddings from $1,200, engagements from $450, portraits, families, and seniors from $350, events from $600, and business photography from $500.',
  canonicalUrl: `${businessInfo.contact.website}/pricing`,
  pageType: 'service',
})

export const revalidate = 86400

// Specialty portrait sessions, read from the same package lists their guide pages show.
const SPECIALTIES = [
  { slug: 'family-photography', label: 'Family sessions' },
  { slug: 'senior-portraits', label: 'Senior portraits' },
  { slug: 'maternity-sessions', label: 'Maternity sessions' },
  { slug: 'professional-headshots', label: 'Headshots' },
]

const INCLUDED = [
  'Two photographers on site for every session',
  'Professional editing on every delivered image',
  'A private online gallery for viewing and downloads',
]

const anchorFor = (slug: string) => slug.replace(/-(photography|session)$/, '')
const amount = (price: string) => price.replace(/[^0-9]/g, '')

export default function PricingPage() {
  const site = businessInfo.contact.website
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: site },
    { name: 'Pricing', url: `${site}/pricing` },
  ])
  const offerCatalog = {
    '@context': 'https://schema.org',
    '@type': 'OfferCatalog',
    name: 'Studio37 photography packages',
    url: `${site}/pricing`,
    itemListElement: studio37ServiceFacts.flatMap((service) =>
      Object.values(service.packages).map((pkg) => ({
        '@type': 'Offer',
        name: pkg.name,
        price: amount(pkg.price),
        priceCurrency: 'USD',
        description: `${pkg.duration}, ${pkg.photos}`,
        itemOffered: { '@type': 'Service', name: service.name, provider: { '@type': 'LocalBusiness', name: businessInfo.legalName, url: site } },
      }))
    ),
  }

  return (
    <div className="min-h-screen bg-stone-50 pt-[4.5rem] lg:pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(offerCatalog) }} />

      <header className="border-b border-stone-200 bg-white py-10 md:py-14">
        <div className="container mx-auto px-4">
          <p className="eyebrow mb-4">Pricing</p>
          <h1 className="max-w-3xl text-4xl font-bold leading-tight text-stone-950 md:text-5xl">Photography prices and packages</h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-stone-600">
            Every published Studio37 package in one place, so you can budget before we talk. Not sure which one fits? A free consultation gets you a
            recommendation, with no pressure to book.
          </p>
          <nav aria-label="Jump to a service" className="mt-6 flex flex-wrap gap-2">
            {[...studio37ServiceFacts.map((service) => ({ id: anchorFor(service.slug), label: service.name })), { id: 'specialty', label: 'Family, senior, maternity, and headshots' }].map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className="inline-flex min-h-11 items-center rounded-full border border-stone-200 bg-stone-50 px-4 text-sm font-semibold text-stone-700 transition hover:border-primary-400 hover:bg-primary-50"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="container mx-auto px-4 py-10 md:py-14">
        <section aria-labelledby="included" className="mb-12 rounded-2xl border border-amber-200 bg-amber-50 p-6 md:p-8">
          <h2 id="included" className="text-xl font-bold text-stone-950 md:text-2xl">
            Included with every package
          </h2>
          <ul className="mt-4 grid gap-3 md:grid-cols-3">
            {INCLUDED.map((item) => (
              <li key={item} className="flex items-start gap-2 text-stone-800">
                <Check className="mt-1 h-4 w-4 flex-shrink-0 text-amber-700" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        {studio37ServiceFacts.map((service) => (
          <section key={service.slug} id={anchorFor(service.slug)} aria-labelledby={`${service.slug}-heading`} className="mb-14 scroll-mt-28">
            <div className="mb-5 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
              <div className="max-w-3xl">
                <h2 id={`${service.slug}-heading`} className="text-2xl font-bold text-stone-950 md:text-3xl">
                  {service.name}
                </h2>
                <p className="mt-2 leading-7 text-stone-600">{service.description}</p>
              </div>
              <div className="flex flex-shrink-0 flex-wrap gap-x-5 gap-y-2 text-sm font-semibold">
                <Link href="https://gallery.studio37.cc" className="text-amber-800 hover:underline">
                  See recent work
                </Link>
                <Link href={`/services/${service.slug}`} className="inline-flex items-center text-amber-800 hover:underline">
                  Package details
                  <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
            <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Object.values(service.packages).map((pkg) => (
                <li key={pkg.name} className="flex flex-col rounded-2xl border border-stone-200 bg-white p-5">
                  <h3 className="font-semibold text-stone-900">{pkg.name}</h3>
                  <p className="mt-2 text-3xl font-bold text-stone-950">{pkg.price}</p>
                  <p className="mt-1 text-sm text-stone-600">
                    {pkg.duration} · {pkg.photos}
                  </p>
                  <ul className="mt-4 space-y-2 border-t border-stone-100 pt-4 text-sm text-stone-700">
                    {pkg.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-amber-700" aria-hidden="true" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
            {service.slug === 'engagement-session' && (
              <p className="mt-4 text-sm text-stone-600">
                Planning a surprise proposal? Concierge planning (location, privacy, decor, and coverage) is quoted after a{' '}
                <Link href="/book-consultation?package=Proposal%20Coverage" className="font-semibold text-amber-800 hover:underline">
                  free consultation
                </Link>
                .
              </p>
            )}
            {service.slug === 'event-photography' && (
              <p className="mt-4 text-sm text-stone-600">
                Business events include commercial usage licensing; see{' '}
                <Link href="/corporate-events" className="font-semibold text-amber-800 hover:underline">
                  corporate event packages
                </Link>
                .
              </p>
            )}
          </section>
        ))}

        <section id="specialty" aria-labelledby="specialty-heading" className="mb-14 scroll-mt-28">
          <h2 id="specialty-heading" className="text-2xl font-bold text-stone-950 md:text-3xl">
            Family, senior, maternity, and headshot sessions
          </h2>
          <p className="mt-2 max-w-3xl leading-7 text-stone-600">
            Specialty portrait sessions follow the same three price points, with packages shaped around each kind of session. Seasonal{' '}
            <Link href="/mini-sessions" className="font-semibold text-amber-800 hover:underline">
              mini sessions
            </Link>{' '}
            start at $350 for 30 minutes.
          </p>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {SPECIALTIES.map(({ slug, label }) => (
              <div key={slug} className="rounded-2xl border border-stone-200 bg-white p-5">
                <div className="mb-3 flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-bold text-stone-950">{label}</h3>
                  <Link href={`/${slug}`} className="text-sm font-semibold text-amber-800 hover:underline">
                    Details
                  </Link>
                </div>
                <dl className="divide-y divide-stone-100">
                  {serviceGuides[slug].packages.map((pkg) => (
                    <div key={pkg.name} className="flex justify-between gap-4 py-2">
                      <dt className="text-stone-700">{pkg.name}</dt>
                      <dd className="font-semibold text-stone-950">{pkg.price}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </section>

        <section aria-labelledby="guides-heading" className="mb-12 rounded-2xl border border-stone-200 bg-white p-6">
          <h2 id="guides-heading" className="text-xl font-bold text-stone-950">
            Comparing photographers?
          </h2>
          <p className="mt-2 leading-7 text-stone-600">Our price guides explain what drives the cost and how to compare quotes side by side.</p>
          <ul className="mt-3 flex flex-col gap-2 text-sm font-semibold sm:flex-row sm:gap-6">
            <li>
              <Link href="/blog/wedding-photographer-cost-montgomery-county-tx" className="text-amber-800 hover:underline">
                How much does a wedding photographer cost?
              </Link>
            </li>
            <li>
              <Link href="/blog/family-photo-session-cost-houston" className="text-amber-800 hover:underline">
                How much do family photos cost?
              </Link>
            </li>
          </ul>
        </section>

        <section aria-labelledby="more-heading" className="mb-12 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl border border-stone-200 bg-white p-6">
            <h2 id="more-heading" className="text-xl font-bold text-stone-950">
              Travel
            </h2>
            <p className="mt-2 leading-7 text-stone-600">
              We photograph across Montgomery County and Greater Houston. Beyond the Houston area, we travel to Galveston for any package, the Austin area for
              sessions of $750 or more, and Dallas for projects of $2,000 or more.
            </p>
          </div>
          <div className="rounded-2xl border border-stone-200 bg-white p-6">
            <h2 className="text-xl font-bold text-stone-950">Branding and marketing</h2>
            <p className="mt-2 leading-7 text-stone-600">
              Websites, SEO, PPC, and social media are scoped per project after a conversation about your goals.{' '}
              <Link href="/services/branding-marketing" className="font-semibold text-amber-800 hover:underline">
                See branding and marketing services
              </Link>
              .
            </p>
          </div>
        </section>

        <section className="grid gap-6 rounded-2xl bg-stone-950 p-6 text-white md:grid-cols-[1fr_auto] md:items-center md:p-8">
          <div>
            <h2 className="text-2xl font-bold">Not sure which package fits?</h2>
            <p className="mt-2 leading-7 text-stone-300">
              Answer a few questions for a recommendation, compare services side by side, or tell us about your plans and we will suggest the right
              coverage.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row md:flex-col">
            <Link href="/book-consultation" className="btn-primary inline-flex items-center justify-center gap-2">
              Book a free consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/tools/package-recommender" className="btn-secondary inline-flex items-center justify-center border-white/60 bg-white/10 text-white hover:bg-white hover:text-stone-950">
              Find my package
            </Link>
            <Link href="/compare" className="text-center text-sm font-semibold text-amber-100 hover:underline">
              Compare services side by side
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
