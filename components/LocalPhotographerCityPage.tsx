import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Star, Users, Camera, Award, CheckCircle } from 'lucide-react'
import FAQSection from '@/components/FAQSection'
import GoogleBusinessWidget from '@/components/GoogleBusinessWidget'
import { generateEnhancedLocalBusinessSchema, generateBreadcrumbSchema } from '@/lib/enhanced-seo-schemas'

type LocalPhotographerCityPageProps = {
  city: string
  stateAbbr: string
  county: string
  slug: string
  nearbyCities: string[]
  heroImage: string
}

const STARTING_PRICES = {
  portrait: '$350',
  engagement: '$450',
  event: '$600',
  wedding: '$1,200',
  commercial: '$500',
}

export default function LocalPhotographerCityPage({
  city,
  stateAbbr,
  county,
  slug,
  nearbyCities,
  heroImage,
}: LocalPhotographerCityPageProps) {
  const cityLabel = `${city}, ${stateAbbr}`

  const localBusinessSchema = generateEnhancedLocalBusinessSchema()
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.studio37.cc' },
    { name: `Local Photographer ${cityLabel}`, url: `https://www.studio37.cc/${slug}` },
  ])

  const faqTitle = `Frequently Asked Questions - ${city} Photographer`

  return (
    <div className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="relative bg-gradient-to-r from-blue-900 to-purple-900 text-white py-20">
        <div className="absolute inset-0 opacity-30">
          <Image
            src={heroImage}
            alt={`Professional photographer in ${cityLabel}`}
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-blue-300" />
              <span className="text-blue-200">Proudly serving {cityLabel} & {county}</span>
            </div>
            <h1 className="text-5xl font-bold mb-6">Top Photographer in {cityLabel}</h1>
            <p className="text-xl mb-6 text-gray-200">
              Studio37 delivers wedding, portrait, engagement, event, and commercial photography for families and businesses across {county}.
              We bring a two-photographer team and clear pricing on every session.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/book-a-session"
                className="bg-primary-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-primary-700 transition-colors text-center"
              >
                Book Your Session
              </Link>
              <Link
                href="/gallery"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors text-center"
              >
                View Portfolio
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Clients in {city} Choose Studio37</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              We combine local knowledge, professional direction, and fast delivery to create photos you will actually use and love.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8 mb-14">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-blue-600" />
              </div>
              <h3 className="text-2xl font-bold text-blue-600 mb-2">4.9★</h3>
              <p className="text-gray-600">Average Rating</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-green-600 mb-2">500+</h3>
              <p className="text-gray-600">Happy Clients</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Camera className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-2xl font-bold text-purple-600 mb-2">1000+</h3>
              <p className="text-gray-600">Sessions Completed</p>
            </div>
            <div className="text-center">
              <div className="bg-amber-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-amber-600" />
              </div>
              <h3 className="text-2xl font-bold text-amber-600 mb-2">Local</h3>
              <p className="text-gray-600">Area Expertise</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
              {[
                'Two-photographer coverage included in our core service model',
                'Clear, published package pricing aligned with our main services pages',
                'Fast turnaround with sneak peeks for most session types',
                'Local venue and location knowledge across Montgomery County',
              ].map((item) => (
                <div key={item} className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
            <div>
              <GoogleBusinessWidget />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold mb-4">Current Starting Prices</h2>
            <p className="text-lg text-gray-600">These prices match our main service pages.</p>
          </div>
          <div className="grid md:grid-cols-2 xl:grid-cols-5 gap-6">
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <p className="text-sm text-gray-500">Portraits</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{STARTING_PRICES.portrait}</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <p className="text-sm text-gray-500">Engagement</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{STARTING_PRICES.engagement}</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <p className="text-sm text-gray-500">Event</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{STARTING_PRICES.event}</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <p className="text-sm text-gray-500">Wedding</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{STARTING_PRICES.wedding}</p>
            </div>
            <div className="bg-white rounded-lg p-6 text-center shadow-sm">
              <p className="text-sm text-gray-500">Commercial</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">{STARTING_PRICES.commercial}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Areas We Serve Nearby</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {[cityLabel, ...nearbyCities].map((area) => (
              <div key={area} className="bg-gray-50 p-5 rounded-lg text-center">
                <h3 className="font-semibold text-gray-800">{area}</h3>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/contact" className="inline-flex items-center text-primary-600 hover:text-primary-700 font-semibold">
              Ask about your location →
            </Link>
          </div>
        </div>
      </section>

      <FAQSection
        title={faqTitle}
        faqs={[
          {
            question: `What are your photography rates in ${city}, ${stateAbbr}?`,
            answer: `Current starting prices are: portraits ${STARTING_PRICES.portrait}, engagement sessions ${STARTING_PRICES.engagement}, event coverage ${STARTING_PRICES.event}, wedding coverage ${STARTING_PRICES.wedding}, and commercial sessions ${STARTING_PRICES.commercial}.`,
          },
          {
            question: `Do you travel outside of ${city}?`,
            answer: `Yes. We regularly serve clients across ${county}, including ${nearbyCities.slice(0, 4).join(', ')} and surrounding areas.`,
          },
          {
            question: 'How far in advance should I book?',
            answer:
              'Weddings are best booked 6-12 months in advance. Most portrait and event sessions can typically be booked 2-4 weeks out based on availability.',
          },
        ]}
      />

      <section className="py-16 bg-gradient-to-r from-primary-600 to-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Book a Photographer in {cityLabel}</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Tell us what you need and we will recommend the right package and timeline.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-a-session" className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Book a Session
            </Link>
            <Link href="/get-quote" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors">
              Get Instant Quote
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
