import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, Camera, Car, CheckCircle, MapPin, ShieldCheck, Star } from 'lucide-react'
import FAQSection from '@/components/FAQSection'
import { generateBreadcrumbSchema, generateEnhancedLocalBusinessSchema } from '@/lib/enhanced-seo-schemas'
import { type CityGuide, type CitySpot, getCityGuideReviews } from '@/lib/city-guides'

type CityGuidePageProps = {
  guide: CityGuide
  stateAbbr: string
  heroImage: string
  nearbyCities: string[]
}

const STARTING_PRICES = [
  { title: 'Portraits & families', price: '$350', href: '/services/portrait-photography' },
  { title: 'Engagements', price: '$450', href: '/services/engagement-session' },
  { title: 'Events', price: '$600', href: '/services/event-photography' },
  { title: 'Weddings', price: '$1,200', href: '/services/wedding-photography' },
  { title: 'Commercial', price: '$500', href: '/services/commercial-photography' },
]

// City pages that exist on the site, so "nearby areas" can link instead of being plain text.
const CITY_ROUTES: Record<string, string> = {
  pinehurst: '/local-photographer-pinehurst-tx',
  magnolia: '/local-photographer-magnolia-tx',
  tomball: '/local-photographer-tomball-tx',
  'the woodlands': '/local-photographer-the-woodlands-tx',
  conroe: '/local-photographer-conroe-tx',
  spring: '/local-photographer-spring-tx',
  montgomery: '/local-photographer-montgomery-tx',
  cypress: '/local-photographer-cypress-tx',
  houston: '/local-photographer-houston-tx',
  katy: '/local-photographer-katy-tx',
  willis: '/local-photographer-willis-tx',
  huntsville: '/local-photographer-huntsville-tx',
  hockley: '/local-photographer-hockley-tx',
  'new caney': '/local-photographer-new-caney-tx',
  'new waverly': '/local-photographer-new-waverly-tx',
  bryan: '/local-photographer-bryan-tx',
  'college station': '/local-photographer-college-station-tx',
  humble: '/humble',
  kingwood: '/kingwood',
  atascocita: '/atascocita',
  porter: '/porter',
  splendora: '/splendora',
  cleveland: '/cleveland',
  waller: '/waller',
  navasota: '/navasota',
  plantersville: '/plantersville',
}

function SpotCard({ spot }: { spot: CitySpot }) {
  return (
    <article className="flex h-full flex-col rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
      <div className="mb-2 flex flex-wrap items-center gap-2">
        <h3 className="text-lg font-bold text-stone-950">{spot.name}</h3>
        {spot.verified && (
          <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
            <Camera className="h-3.5 w-3.5" aria-hidden="true" />
            We&apos;ve shot here
          </span>
        )}
      </div>
      {spot.address && <p className="mb-3 text-sm text-stone-500">{spot.address}</p>}
      <p className="mb-3 text-sm font-semibold text-stone-800">Best for: {spot.bestFor}</p>
      <p className="leading-7 text-stone-600">{spot.notes}</p>
      {(spot.timing || spot.access || spot.permit) && (
        <dl className="mt-4 space-y-2 border-t border-stone-100 pt-4 text-sm text-stone-600">
          {spot.timing && (
            <div>
              <dt className="inline font-semibold text-stone-800">Timing: </dt>
              <dd className="inline">{spot.timing}</dd>
            </div>
          )}
          {spot.access && (
            <div>
              <dt className="inline font-semibold text-stone-800">Access: </dt>
              <dd className="inline">{spot.access}</dd>
            </div>
          )}
          {spot.permit && (
            <div>
              <dt className="inline font-semibold text-stone-800">Permits: </dt>
              <dd className="inline">{spot.permit}</dd>
            </div>
          )}
        </dl>
      )}
    </article>
  )
}

function listWithAnd(items: string[]) {
  if (items.length < 2) return items.join('')
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`
}

export default function CityGuidePage({ guide, stateAbbr, heroImage, nearbyCities }: CityGuidePageProps) {
  const cityLabel = `${guide.city}, ${stateAbbr}`
  const pageUrl = `https://www.studio37.cc/${guide.slug}`
  const shotSpots = guide.spots.filter((spot) => spot.verified)
  const plannedSpots = guide.spots.filter((spot) => !spot.verified)
  const reviews = getCityGuideReviews(guide)
  const hasShotSection = guide.sessions.length > 0 || shotSpots.length > 0

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.studio37.cc' },
    { name: `Photographer in ${cityLabel}`, url: pageUrl },
  ])
  const localBusinessSchema = generateEnhancedLocalBusinessSchema()

  // FAQ answers are built from this city's own data so they differ from every other city page.
  const faqs = [
    {
      question: `Where are the best places for photos in ${guide.city}?`,
      answer: `Our go-to ${guide.city} spots are ${listWithAnd(guide.spots.slice(0, 4).map((spot) => spot.name))}. We pick between them based on the session type, the light at your session time, parking, and how much walking you want.`,
    },
    {
      question: `Do you need a permit to take photos in ${guide.city} parks?`,
      answer: guide.permits.join(' '),
    },
    {
      question: `How far is ${guide.city} from Studio37, and is there a travel fee?`,
      answer: `${guide.driveTime} ${guide.travelNote}`,
    },
    {
      question: `When is the best time of year for outdoor photos in ${guide.city}?`,
      answer: guide.seasons.join(' '),
    },
    ...(guide.venues.length
      ? [
          {
            question: `Which wedding venues near ${guide.city} do you photograph?`,
            answer: `Venues we plan coverage around near ${guide.city} include ${listWithAnd(guide.venues.map((venue) => venue.name))}. Every wedding collection includes two photographers, starting at $1,200.`,
          },
        ]
      : []),
    ...(guide.bookMost
      ? [{ question: `What do ${guide.city} clients book Studio37 for most?`, answer: guide.bookMost }]
      : []),
    {
      question: `How much does a photographer cost in ${guide.city}?`,
      answer: `Studio37 starting prices are the same in ${guide.city} as everywhere we work: portraits from $350, engagements from $450, events from $600, weddings from $1,200, and commercial sessions from $500.`,
    },
  ]

  const sectionLinks = [
    hasShotSection && ['Where we have shot', '#city-shot'],
    plannedSpots.length > 0 && ['Photo spots', '#city-spots'],
    guide.venues.length > 0 && ['Venues', '#city-venues'],
    ['Seasons & permits', '#city-planning'],
    ['Pricing', '#city-pricing'],
    ['FAQ', '#city-faq'],
  ].filter(Boolean) as Array<[string, string]>

  return (
    <div className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />

      <section className="relative overflow-hidden bg-stone-950 py-20 text-white md:py-24">
        <div className="absolute inset-0 opacity-45">
          <Image src={heroImage} alt={`Studio37 photography session near ${cityLabel}`} fill className="object-cover" priority />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(28,25,23,0.92),rgba(28,25,23,0.68),rgba(28,25,23,0.36))]" aria-hidden="true" />
        <div className="relative z-10 container mx-auto px-4">
          <div className="max-w-4xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-semibold text-amber-100 backdrop-blur">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              <span>{cityLabel} · {guide.county}</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">Photographer in {cityLabel}</h1>
            <p className="mb-5 max-w-3xl text-lg leading-8 text-stone-100 md:text-xl">{guide.intro}</p>
            <p className="mb-7 inline-flex items-center gap-2 text-sm font-semibold text-amber-100">
              <Car className="h-4 w-4" aria-hidden="true" />
              {guide.driveTime}
            </p>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Link href={`/book-consultation?city=${encodeURIComponent(cityLabel)}`} className="btn-primary text-center">
                Plan a {guide.city} Session
              </Link>
              <Link
                href="/tools/pricing"
                className="btn-secondary border-white/60 bg-white/10 text-center text-white hover:bg-white hover:text-stone-950"
              >
                Compare Pricing
              </Link>
            </div>
          </div>
        </div>
      </section>

      <nav className="border-b border-stone-200 bg-white" aria-label={`${cityLabel} page sections`}>
        <div className="container mx-auto flex gap-3 overflow-x-auto px-4 py-4 text-sm font-semibold text-stone-700 md:justify-center">
          {sectionLinks.map(([label, href]) => (
            <a
              key={href}
              href={href}
              className="inline-flex min-h-11 shrink-0 items-center rounded-full border border-stone-200 bg-white px-5 shadow-sm transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-900"
            >
              {label}
            </a>
          ))}
        </div>
      </nav>

      {hasShotSection && (
        <section id="city-shot" className="section-shell scroll-mt-28 bg-white">
          <div className="container mx-auto px-4">
            <p className="eyebrow mb-3">From our own sessions</p>
            <h2 className="mb-4 text-3xl font-bold text-stone-950 md:text-4xl">Where we have photographed in {guide.city}</h2>
            {guide.sessions.length > 0 && (
              <ul className="mb-10 grid gap-3 md:grid-cols-2">
                {guide.sessions.map((session) => (
                  <li key={session.description} className="flex items-start gap-3 rounded-lg border border-stone-200 bg-stone-50 p-4">
                    <CheckCircle className="mt-0.5 h-5 w-5 flex-shrink-0 text-amber-700" aria-hidden="true" />
                    <span className="text-stone-700">
                      {session.href ? (
                        <Link href={session.href} className="font-semibold text-amber-800 underline-offset-2 hover:underline">
                          {session.description}
                        </Link>
                      ) : (
                        session.description
                      )}
                      {session.date && <span className="text-stone-500"> · {session.date}</span>}
                    </span>
                  </li>
                ))}
              </ul>
            )}
            {shotSpots.length > 0 && (
              <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                {shotSpots.map((spot) => (
                  <SpotCard key={spot.name} spot={spot} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {plannedSpots.length > 0 && (
        <section id="city-spots" className="section-shell scroll-mt-28 bg-stone-50">
          <div className="container mx-auto px-4">
            <p className="eyebrow mb-3">Location planning</p>
            <h2 className="mb-4 text-3xl font-bold text-stone-950 md:text-4xl">
              {hasShotSection ? `More ${guide.city} spots we plan sessions around` : `${guide.city} photo spots we plan sessions around`}
            </h2>
            <p className="mb-8 max-w-3xl leading-7 text-stone-600">
              What each spot is best for, when the light works, and what to know about parking and permits before you go.
            </p>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {plannedSpots.map((spot) => (
                <SpotCard key={spot.name} spot={spot} />
              ))}
            </div>
          </div>
        </section>
      )}

      {guide.venues.length > 0 && (
        <section id="city-venues" className="section-shell scroll-mt-28 bg-white">
          <div className="container mx-auto px-4">
            <p className="eyebrow mb-3">Weddings and events</p>
            <h2 className="mb-8 text-3xl font-bold text-stone-950 md:text-4xl">Wedding venues near {guide.city}</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {guide.venues.map((venue) => (
                <article key={venue.name} className="rounded-lg border border-stone-200 p-5">
                  <div className="mb-1 flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-stone-950">{venue.name}</h3>
                    {venue.verified && (
                      <span className="rounded-full bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-800">In our venue guide</span>
                    )}
                  </div>
                  {venue.address && <p className="mb-2 text-sm text-stone-500">{venue.address}</p>}
                  <p className="leading-7 text-stone-600">{venue.description}</p>
                </article>
              ))}
            </div>
            <p className="mt-6 text-stone-600">
              Every Studio37 wedding collection includes two photographers.{' '}
              <Link href="/services/wedding-photography" className="font-semibold text-amber-800 hover:underline">
                See wedding collections
              </Link>
            </p>
          </div>
        </section>
      )}

      <section id="city-planning" className="section-shell scroll-mt-28 bg-stone-50">
        <div className="container mx-auto grid gap-6 px-4 lg:grid-cols-3">
          <div className="rounded-lg border border-stone-200 bg-white p-6">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-stone-950">
              <CalendarDays className="h-5 w-5 text-amber-700" aria-hidden="true" />
              Seasons and timing in {guide.city}
            </h2>
            <ul className="space-y-3 text-stone-600">
              {guide.seasons.map((item) => (
                <li key={item} className="leading-7">{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-stone-200 bg-white p-6">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-stone-950">
              <ShieldCheck className="h-5 w-5 text-amber-700" aria-hidden="true" />
              Permits and park rules
            </h2>
            <ul className="space-y-3 text-stone-600">
              {guide.permits.map((item) => (
                <li key={item} className="leading-7">{item}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-stone-200 bg-white p-6">
            <h2 className="mb-4 flex items-center gap-2 text-xl font-bold text-stone-950">
              <Car className="h-5 w-5 text-amber-700" aria-hidden="true" />
              Getting there
            </h2>
            <p className="leading-7 text-stone-600">{guide.driveTime}</p>
            <p className="mt-3 leading-7 text-stone-600">{guide.travelNote}</p>
            {guide.bookMost && (
              <p className="mt-3 leading-7 text-stone-600">
                <span className="font-semibold text-stone-800">Most booked here: </span>
                {guide.bookMost}
              </p>
            )}
          </div>
        </div>
      </section>

      {reviews.length > 0 && (
        <section className="section-shell bg-white">
          <div className="container mx-auto px-4">
            <h2 className="mb-2 text-3xl font-bold text-stone-950">What clients say</h2>
            <p className="mb-8 text-stone-600">Rated 5.0 on Google and Thumbtack.</p>
            <div className="grid gap-5 md:grid-cols-2">
              {reviews.map((review) => (
                <figure key={review.name} className="rounded-lg border border-stone-200 bg-stone-50 p-6">
                  <div className="mb-3 flex gap-1 text-amber-500" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="leading-7 text-stone-700">&ldquo;{review.quote}&rdquo;</blockquote>
                  <figcaption className="mt-4 text-sm font-semibold text-stone-900">
                    {review.name} <span className="font-normal text-stone-500">· {review.detail}</span>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="city-pricing" className="section-shell scroll-mt-28 bg-stone-50">
        <div className="container mx-auto px-4">
          <h2 className="mb-2 text-3xl font-bold text-stone-950">Starting prices in {guide.city}</h2>
          <p className="mb-8 max-w-3xl text-stone-600">Same published prices across every city we serve, with two photographers on every session.</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {STARTING_PRICES.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group rounded-lg border border-stone-200 bg-white p-5 transition hover:-translate-y-0.5 hover:border-amber-300"
              >
                <span className="block font-bold text-stone-950 group-hover:text-amber-900">{service.title}</span>
                <span className="mt-1 block text-sm text-stone-600">from {service.price}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {(guide.guides?.length || nearbyCities.length > 0) && (
        <section className="section-shell bg-white">
          <div className="container mx-auto grid gap-10 px-4 md:grid-cols-2">
            {guide.guides && guide.guides.length > 0 && (
              <div>
                <h2 className="mb-4 text-2xl font-bold text-stone-950">{guide.city} planning guides</h2>
                <ul className="space-y-2">
                  {guide.guides.map((link) => (
                    <li key={link.href}>
                      <Link href={link.href} className="font-semibold text-amber-800 hover:underline">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {nearbyCities.length > 0 && (
              <div>
                <h2 className="mb-4 text-2xl font-bold text-stone-950">Nearby areas we serve</h2>
                <ul className="flex flex-wrap gap-2">
                  {nearbyCities.map((area) => {
                    const href = CITY_ROUTES[area.replace(/,\s*TX$/i, '').toLowerCase()]
                    return (
                      <li key={area}>
                        {href ? (
                          <Link href={href} className="inline-flex min-h-11 items-center rounded-full border border-stone-200 px-4 text-sm font-semibold text-stone-700 hover:border-amber-300 hover:bg-amber-50">
                            {area}
                          </Link>
                        ) : (
                          <span className="inline-flex min-h-11 items-center rounded-full border border-stone-200 px-4 text-sm text-stone-600">{area}</span>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      <div id="city-faq" className="scroll-mt-28">
        <FAQSection faqs={faqs} title={`${guide.city} photography questions`} />
      </div>

      <section className="bg-stone-950 py-16 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold">Plan your {guide.city} session</h2>
          <p className="mx-auto mb-8 max-w-2xl text-stone-300">
            Tell us the date, the people, and the look you want, and we will recommend the right {guide.city} spot and coverage.
          </p>
          <Link href={`/book-consultation?city=${encodeURIComponent(cityLabel)}`} className="btn-primary">
            Book a free consultation
          </Link>
        </div>
      </section>
    </div>
  )
}
