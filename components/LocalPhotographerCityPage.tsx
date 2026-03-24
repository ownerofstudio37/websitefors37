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
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">Top Photographer in {cityLabel}</h1>
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
              <h3 className="text-2xl font-bold text-blue-600 mb-2">5.0★</h3>
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

      <section className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className="eyebrow mb-4">Pricing</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Popular Services & Starting Prices in {city}</h2>
            <p className="text-lg text-stone-600">
              Designed to match our main service pages with clearer package details. Final pricing may increase based on hours, travel, add-ons, and deliverables.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            <Link href="/services/portrait-photography" className="group surface-panel p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <span className="text-3xl">👨‍👩‍👧‍👦</span>
                </div>
                <h3 className="text-xl font-semibold mb-1 text-gray-800">Portrait Photography</h3>
                <p className="text-sm uppercase tracking-wide text-blue-700 font-semibold mb-3">Starting at {STARTING_PRICES.portrait}</p>
                <p className="text-gray-600 mb-4">Family portraits, seniors, maternity, and professional headshots around {cityLabel}.</p>
                <ul className="text-sm text-stone-600 space-y-1 mb-4">
                  <li>• Guided posing + location planning</li>
                  <li>• Professionally edited gallery</li>
                  <li>• Print and sharing rights</li>
                </ul>
                <span className="font-medium text-blue-700">Learn More</span>
              </div>
            </Link>

            <Link href="/services/engagement-session" className="group surface-panel p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <div className="bg-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-200 transition-colors">
                  <span className="text-3xl">💖</span>
                </div>
                <h3 className="text-xl font-semibold mb-1 text-gray-800">Engagement Sessions</h3>
                <p className="text-sm uppercase tracking-wide text-pink-700 font-semibold mb-3">Starting at {STARTING_PRICES.engagement}</p>
                <p className="text-gray-600 mb-4">Romantic save-the-date sessions and proposal-friendly planning support.</p>
                <ul className="text-sm text-stone-600 space-y-1 mb-4">
                  <li>• Style and concept guidance</li>
                  <li>• Golden-hour timeline support</li>
                  <li>• Multi-location options available</li>
                </ul>
                <span className="font-medium text-pink-700">Learn More</span>
              </div>
            </Link>

            <Link href="/services/event-photography" className="group surface-panel p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <span className="text-3xl">🎉</span>
                </div>
                <h3 className="text-xl font-semibold mb-1 text-gray-800">Event Photography</h3>
                <p className="text-sm uppercase tracking-wide text-green-700 font-semibold mb-3">Starting at {STARTING_PRICES.event}</p>
                <p className="text-gray-600 mb-4">Corporate events, birthday parties, private celebrations, and community events.</p>
                <ul className="text-sm text-stone-600 space-y-1 mb-4">
                  <li>• Candid + key moment coverage</li>
                  <li>• Team portraits on request</li>
                  <li>• Fast post-event gallery delivery</li>
                </ul>
                <span className="font-medium text-green-700">Learn More</span>
              </div>
            </Link>

            <Link href="/services/wedding-photography" className="group surface-panel p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <div className="bg-rose-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-rose-200 transition-colors">
                  <span className="text-3xl">💍</span>
                </div>
                <h3 className="text-xl font-semibold mb-1 text-gray-800">Wedding Photography</h3>
                <p className="text-sm uppercase tracking-wide text-rose-700 font-semibold mb-3">Starting at {STARTING_PRICES.wedding}</p>
                <p className="text-gray-600 mb-4">Full-day storytelling for weddings in {cityLabel} and across {county}.</p>
                <ul className="text-sm text-stone-600 space-y-1 mb-4">
                  <li>• Timeline planning assistance</li>
                  <li>• Two-photographer team model</li>
                  <li>• Sneak peeks + full gallery delivery</li>
                </ul>
                <span className="font-medium text-rose-700">Learn More</span>
              </div>
            </Link>

            <Link href="/services/commercial-photography" className="group surface-panel p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1">
              <div className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-200 transition-colors">
                  <span className="text-3xl">🏢</span>
                </div>
                <h3 className="text-xl font-semibold mb-1 text-gray-800">Commercial Photography</h3>
                <p className="text-sm uppercase tracking-wide text-gray-700 font-semibold mb-3">Starting at {STARTING_PRICES.commercial}</p>
                <p className="text-gray-600 mb-4">Branding sessions, products, headshots, and business content for local teams.</p>
                <ul className="text-sm text-stone-600 space-y-1 mb-4">
                  <li>• Brand-consistent image direction</li>
                  <li>• Website + social-ready exports</li>
                  <li>• Licensing support available</li>
                </ul>
                <span className="font-medium text-gray-700">Learn More</span>
              </div>
            </Link>
          </div>

          <div className="mt-8 bg-amber-50 border-y border-amber-200/80 rounded-xl p-4">
            <p className="text-center text-amber-900 font-medium">
              Two photographers on site — for the price of one. More coverage, more moments, same rate.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            <div className="section-soft p-8 md:p-10">
              <h2 className="text-3xl font-bold mb-6">How It Works</h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary-600">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Consultation</h3>
                    <p className="text-stone-600 leading-7">
                      We align on your goals, budget, style preferences, and timeline for your {cityLabel} session.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary-600">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Planning & Prep</h3>
                    <p className="text-gray-600">
                      We map locations, timing, shot priorities, and any special requests so shoot day runs smoothly.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary-600">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Photography Day</h3>
                    <p className="text-gray-600">
                      Our team captures the must-have images plus candid moments that tell your story naturally.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary-600">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Editing & Delivery</h3>
                    <p className="text-gray-600">
                      You receive an edited gallery ready for sharing, prints, and marketing use (if commercial).
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="section-soft p-8 md:p-10">
              <h2 className="text-3xl font-bold mb-6">Why Choose Studio37</h2>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium">Experienced Local Team</h3>
                    <p className="text-stone-600">We know popular venues, parks, and lighting conditions across {county}.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium">Clear Starting Prices</h3>
                    <p className="text-gray-600">Published rates stay aligned with our core service pages for consistency.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium">Two-Photographer Coverage</h3>
                    <p className="text-gray-600">More angles and more key moments without a complicated upgrade structure.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium">Fast Turnaround</h3>
                    <p className="text-gray-600">Sneak peeks and polished edits are delivered quickly so you can use your images right away.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium">Guided Experience</h3>
                    <p className="text-gray-600">From planning through delivery, we keep communication simple and supportive.</p>
                  </div>
                </div>
              </div>
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

      <section className="py-12 bg-stone-50 border-y border-stone-200">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Explore Services & City Pages</h2>
            <p className="text-gray-700 mb-6">
              Compare services, browse nearby city landing pages, and find the best fit for your timeline and budget.
            </p>

            <div className="flex flex-wrap gap-3 text-sm mb-4">
              <Link href="/services" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">All Services</Link>
              <Link href="/locations" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">All Service Areas</Link>
              <Link href="/services/wedding-photography" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Wedding</Link>
              <Link href="/services/portrait-photography" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Portrait</Link>
              <Link href="/services/event-photography" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Event</Link>
              <Link href="/services/commercial-photography" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Commercial</Link>
            </div>

            <div className="flex flex-wrap gap-3 text-sm">
              <Link href="/local-photographer-pinehurst-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Pinehurst</Link>
              <Link href="/local-photographer-magnolia-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Magnolia</Link>
              <Link href="/local-photographer-the-woodlands-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">The Woodlands</Link>
              <Link href="/local-photographer-spring-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Spring</Link>
              <Link href="/local-photographer-tomball-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Tomball</Link>
              <Link href="/local-photographer-conroe-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Conroe</Link>
              <Link href="/local-photographer-montgomery-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Montgomery</Link>
              <Link href="/local-photographer-willis-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Willis</Link>
              <Link href="/local-photographer-huntsville-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Huntsville</Link>
              <Link href="/local-photographer-new-caney-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">New Caney</Link>
              <Link href="/local-photographer-hockley-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Hockley</Link>
              <Link href="/local-photographer-bryan-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Bryan</Link>
              <Link href="/local-photographer-college-station-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">College Station</Link>
              <Link href="/local-photographer-houston-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Houston</Link>
            </div>
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
