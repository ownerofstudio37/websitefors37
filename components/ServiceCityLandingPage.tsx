import Link from 'next/link'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { generateBreadcrumbSchema } from '@/lib/enhanced-seo-schemas'
import { generateFAQSchema } from '@/lib/seo-helpers'

type ServiceCityLandingPageProps = {
  serviceName: string
  city: string
  stateAbbr?: string
  county: string
  pageUrl: string
  serviceUrl: string
  startingPrice: string
  intro: string
  highlights: string[]
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

      <section className="py-12">
        <div className="container mx-auto px-4 grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Why clients book this in {city}</h2>
            <div className="space-y-3">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
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
            </div>
            <div className="mt-5 pt-5 border-t border-gray-200">
              <p className="text-xs uppercase tracking-wide text-gray-500 mb-2">Nearby Cities</p>
              <p className="text-sm text-gray-700">{nearbyCities.join(' · ')}</p>
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
    </main>
  )
}
