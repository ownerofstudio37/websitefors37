import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { generateBreadcrumbSchema } from '@/lib/enhanced-seo-schemas'
import { generateFAQSchema } from '@/lib/seo-helpers'
import { PortfolioProofSection, WhatHappensNextSection } from '@/components/PublicConversionSections'

type ServiceCityLandingPageProps = {
  serviceName: string
  city: string
  stateAbbr?: string
  county: string
  pageUrl: string
  serviceUrl: string
  startingPrice: string
  intro: string
  highlights: Array<string | { title: string; description: string }>
  faqs: Array<{ question: string; answer: string }>
  nearbyCities: string[]
}

export default function ServiceCityLandingPage({
  serviceName,
  city,
  stateAbbr = 'TX',
  county,
  pageUrl,
  serviceUrl,
  startingPrice,
  intro,
  highlights,
  faqs,
  nearbyCities,
}: ServiceCityLandingPageProps) {
  const cityLabel = `${city}, ${stateAbbr}`

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.studio37.cc' },
    { name: 'Services', url: 'https://www.studio37.cc/services' },
    { name: `${serviceName} ${cityLabel}`, url: pageUrl },
  ])

  const faqSchema = generateFAQSchema(faqs)
  const serviceLinks = [
    { label: 'Wedding photography', href: '/services/wedding-photography' },
    { label: 'Portrait photography', href: '/services/portrait-photography' },
    { label: 'Event photography', href: '/services/event-photography' },
    { label: 'Commercial photography', href: '/services/commercial-photography' },
  ]

  const normalizedHighlights = highlights.map((item) => {
    if (typeof item === 'string') {
      return { title: '', description: item, key: item }
    }

    return {
      title: item.title,
      description: item.description,
      key: `${item.title}-${item.description}`,
    }
  })
  const serviceLower = serviceName.toLowerCase()
  const planningFocus = serviceLower.includes('wedding')
    ? [
        ['Timeline fit', `Ceremony, family-formal, reception, and exit timing planned around ${cityLabel} venue flow.`],
        ['Coverage priority', 'Two-photographer coverage protects reactions, details, and candid guest moments.'],
        ['Delivery expectation', 'Sneak peeks and a polished final gallery built for albums, sharing, and print.'],
      ]
    : serviceLower.includes('family')
      ? [
          ['Session pacing', `Kid-friendly timing, shade, and short movement sets around ${cityLabel}.`],
          ['Location fit', 'Parking, walking distance, and backup spots checked before the session.'],
          ['Delivery expectation', 'A polished gallery with family, sibling, parent, and candid combinations.'],
        ]
      : serviceLower.includes('portrait') || serviceLower.includes('headshot')
        ? [
            ['Direction style', `Guided posing and clean backgrounds matched to ${cityLabel} parks, streets, or indoor options.`],
            ['Image usage', 'Personal branding, senior, maternity, profile, and print-friendly crops considered upfront.'],
            ['Delivery expectation', 'Retouched favorites plus a gallery that gives you variety without overwhelm.'],
          ]
        : serviceLower.includes('engagement')
          ? [
              ['Light and privacy', `Golden-hour timing, arrival flow, and quiet angles planned around ${cityLabel}.`],
              ['Couple direction', 'Relaxed prompts for save-the-date portraits, proposal coverage, and editorial moments.'],
              ['Delivery expectation', 'Romantic wide, close, candid, and detail images ready for announcements.'],
            ]
          : [
              ['Shoot plan', `Shot list, access, and content usage mapped before the ${cityLabel} session.`],
              ['Coverage priority', `Images planned for websites, profiles, listings, social, and campaigns across ${county}.`],
              ['Delivery expectation', 'Clean export sets with brand-ready crops and licensing support when needed.'],
            ]

  return (
    <main className="min-h-screen pt-16 bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <section className="py-14 bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <p className="text-sm text-primary-700 font-semibold mb-3">Local Service Guide · {cityLabel}</p>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">{serviceName} in {cityLabel}</h1>
          <p className="text-lg text-gray-700 max-w-4xl mb-4">{intro}</p>
          <p className="text-sm text-gray-600">
            Coverage starts at {startingPrice} · Serving {county} and nearby markets.
          </p>
        </div>
      </section>

      <section className="border-b border-stone-200 bg-white py-8">
        <div className="container mx-auto grid gap-4 px-4 md:grid-cols-3">
          {planningFocus.map(([title, copy]) => (
            <div key={title} className="rounded-xl border border-stone-200 bg-stone-50 p-5">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-amber-800">{title}</p>
              <p className="mt-2 text-sm leading-6 text-stone-700">{copy}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why clients book this in {city}</h2>
            <div className="space-y-3">
              {normalizedHighlights.map((item) => (
                <div key={item.key} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">
                    {item.title ? <span className="font-semibold text-gray-900">{item.title}: </span> : null}
                    {item.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-10 rounded-lg border border-amber-200 bg-amber-50 p-5">
              <h3 className="text-lg font-semibold text-amber-950 mb-3">{serviceName} planning examples in {city}</h3>
              <div className="grid gap-3 sm:grid-cols-3">
                {nearbyCities.slice(0, 3).map((nearby) => (
                  <div key={nearby} className="rounded-lg bg-white p-3 text-sm text-stone-700">
                    <span className="font-semibold text-stone-950">{nearby}</span>
                    <p className="mt-1">Useful reference point for light, arrival timing, parking, or multi-stop coverage.</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-bold text-gray-900 mb-4">FAQ</h3>
              <div className="space-y-3">
                {faqs.map((faq) => (
                  <details key={faq.question} className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <summary className="font-semibold text-gray-900 cursor-pointer">{faq.question}</summary>
                    <p className="text-gray-700 mt-3">{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          <aside className="bg-white border border-gray-200 rounded-lg p-6 h-fit">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Plan Your Session</h3>
            <p className="text-sm text-gray-700 mb-5">
              We can recommend the right package and timing for your {serviceName.toLowerCase()} goals in {cityLabel}.
            </p>
            <div className="space-y-3">
              <Link href="/book-a-session" className="btn-primary w-full text-center block">
                Book a Session
              </Link>
              <Link href="/book-consultation" className="btn-secondary w-full text-center block">
                Book Consultation
              </Link>
              <Link href={serviceUrl} className="w-full text-center block border border-gray-300 rounded-md py-2 hover:bg-gray-50">
                View Main {serviceName} Page
              </Link>
              <Link href="/tools/package-recommender" className="w-full text-center block border border-gray-300 rounded-md py-2 hover:bg-gray-50">
                Find Best Package
              </Link>
              <Link href="/tools/pricing" className="w-full text-center block border border-gray-300 rounded-md py-2 hover:bg-gray-50">
                Compare Pricing
              </Link>
              <Link href="https://gallery.studio37.cc" className="w-full text-center block border border-gray-300 rounded-md py-2 hover:bg-gray-50">
                View Portfolio
              </Link>
            </div>
            <div className="mt-5 pt-5 border-t border-gray-200">
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Nearby Cities</p>
              <p className="text-sm text-gray-700">{nearbyCities.join(' · ')}</p>
            </div>
            <div className="mt-5 pt-5 border-t border-gray-200">
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-3">Related Services</p>
              <div className="space-y-2">
                {serviceLinks.map((service) => (
                  <Link key={service.label} href={service.href} className="block text-sm text-primary-700 hover:underline">
                    {service.label}
                  </Link>
                ))}
                <Link href="/session-prep" className="block text-sm text-primary-700 hover:underline">
                  Session prep guides
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="py-12 bg-stone-50 border-t border-stone-200">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Related local guides</h2>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href="/services" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">All Services</Link>
              <Link href="/locations" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">All Service Areas</Link>
              <Link href="/wedding-photographer-katy-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Wedding Photographer Katy</Link>
              <Link href="/portrait-photographer-conroe-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Portrait Photographer Conroe</Link>
              <Link href="/family-photographer-magnolia-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Family Photographer Magnolia</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gradient-to-r from-primary-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to book {serviceName.toLowerCase()} in {cityLabel}?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Tell us your timeline and goals and we&apos;ll map the right package.</p>
          <Link href="/get-quote" className="btn-primary inline-flex items-center">
            Get Instant Quote <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>

      <PortfolioProofSection serviceName={`${serviceName} in ${cityLabel}`} />
      <WhatHappensNextSection serviceName={`${serviceName} in ${cityLabel}`} />
    </main>
  )
}
