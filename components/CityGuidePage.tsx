import type { ReactNode } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  Briefcase,
  CalendarDays,
  Camera,
  Car,
  CheckCircle,
  ChevronDown,
  Heart,
  MapPin,
  PartyPopper,
  ShieldCheck,
  Star,
  Users,
} from 'lucide-react'
import FAQSection from '@/components/FAQSection'
import { generateBreadcrumbSchema, generateEnhancedLocalBusinessSchema } from '@/lib/enhanced-seo-schemas'
import { type CityGuide, type CityImage, type CitySpot, DESTINATION_TRAVEL_POLICY, getCityGuideReviews } from '@/lib/city-guides'

type CityGuidePageProps = {
  guide: CityGuide
  stateAbbr: string
  heroImage: string
  nearbyCities: string[]
}

// Cloudinary delivery: q_auto:best at each width, served through srcset so phones get a smaller file
// while large and high-density screens get the sharp 2400px (hero) / 2000px (secondary) versions.
const cldUrl = (id: string, width: number, crop = '') =>
  `https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:best,w_${width}${crop}/${id}.jpg`

function CldImg({
  image,
  widths,
  sizes,
  className,
  crop = '',
  priority = false,
}: {
  image: CityImage
  widths: number[]
  sizes: string
  className: string
  crop?: string
  priority?: boolean
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={cldUrl(image.id, widths[widths.length - 1], crop)}
      srcSet={widths.map((width) => `${cldUrl(image.id, width, crop)} ${width}w`).join(', ')}
      sizes={sizes}
      alt={image.alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
    />
  )
}

const HERO_WIDTHS = [800, 1200, 1600, 2400]
// Every city defines its own hero in lib/city-guides.ts; this only guards a future city added without one.
const DEFAULT_HERO: CityImage = { id: 'Untitled_tpoc5r', alt: 'Extended family portrait by a lake lined with cypress trees' }
const SECONDARY_WIDTHS = [800, 1200, 2000]


const SERVICES = [
  {
    title: 'Portraits & families',
    price: '$350',
    href: '/services/portrait-photography',
    icon: Users,
    note: 'Families, seniors, maternity, headshots',
  },
  {
    title: 'Engagements & proposals',
    price: '$450',
    href: '/services/engagement-session',
    icon: Heart,
    note: 'Golden-hour couples and surprise proposals',
  },
  {
    title: 'Weddings',
    price: '$1,200',
    href: '/services/wedding-photography',
    icon: Camera,
    note: 'Two photographers on every collection',
  },
  {
    title: 'Events',
    price: '$600',
    href: '/services/event-photography',
    icon: PartyPopper,
    note: 'Birthdays, quinceañeras, corporate events',
  },
  {
    title: 'Commercial & brand',
    price: '$500',
    href: '/services/commercial-photography',
    icon: Briefcase,
    note: 'Commercial usage included',
  },
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

const TOP_SPOT_COUNT = 3

function listWithAnd(items: string[]) {
  if (items.length < 2) return items.join('')
  return `${items.slice(0, -1).join(', ')}, and ${items[items.length - 1]}`
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
      {spot.address && <p className="mb-2 text-sm text-stone-500">{spot.address}</p>}
      <p className="mb-2 text-sm font-semibold text-stone-800">Best for: {spot.bestFor}</p>
      <p className="leading-7 text-stone-600">{spot.notes}</p>
      {(spot.timing || spot.access || spot.permit) && (
        <dl className="mt-3 space-y-1.5 border-t border-stone-100 pt-3 text-sm text-stone-600">
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

function PlanningDetail({ title, icon: Icon, children }: { title: string; icon: typeof CalendarDays; children: ReactNode }) {
  return (
    <details className="group rounded-lg border border-stone-200 bg-white">
      <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 [&::-webkit-details-marker]:hidden">
        <h3 className="flex items-center gap-2 text-base font-bold text-stone-950 md:text-lg">
          <Icon className="h-5 w-5 text-amber-700" aria-hidden="true" />
          {title}
        </h3>
        <ChevronDown className="h-5 w-5 flex-shrink-0 text-stone-500 transition-transform group-open:rotate-180" aria-hidden="true" />
      </summary>
      <div className="border-t border-stone-100 px-5 pb-5 pt-4 leading-7 text-stone-600">{children}</div>
    </details>
  )
}

export default function CityGuidePage({ guide, stateAbbr, nearbyCities }: CityGuidePageProps) {
  const cityLabel = `${guide.city}, ${stateAbbr}`
  const pageUrl = `https://www.studio37.cc/${guide.slug}`
  const bookHref = `/book-consultation?city=${encodeURIComponent(cityLabel)}`
  const reviews = getCityGuideReviews(guide)
  const [featuredReview, secondReview] = reviews

  // Lead with places we have actually shot, then the researched spots.
  const orderedSpots = [...guide.spots.filter((spot) => spot.verified), ...guide.spots.filter((spot) => !spot.verified)]
  const topSpots = orderedSpots.slice(0, TOP_SPOT_COUNT)
  const moreSpots = orderedSpots.slice(TOP_SPOT_COUNT)

  const heroImage: CityImage = guide.heroImage || DEFAULT_HERO

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.studio37.cc' },
    { name: `Photographer in ${cityLabel}`, url: pageUrl },
  ])
  const localBusinessSchema = generateEnhancedLocalBusinessSchema()

  // FAQ answers are built from this city's own data so they differ from every other city page.
  const faqs = [
    {
      question: `How much does a photographer cost in ${guide.city}?`,
      answer: `Studio37 starting prices are the same in ${guide.city} as everywhere we work: portraits from $350, engagements from $450, events from $600, weddings from $1,200, and commercial sessions from $500. Two photographers come to every session.`,
    },
    {
      question: `Where are the best places for photos in ${guide.city}?`,
      answer: `Our go-to ${guide.city} spots are ${listWithAnd(orderedSpots.slice(0, 4).map((spot) => spot.name))}. We pick between them based on the session type, the light at your session time, parking, and how much walking you want.`,
    },
    {
      question: `Do you need a permit to take photos in ${guide.city} parks?`,
      answer: guide.permits.join(' '),
    },
    guide.driveTime
      ? {
          question: `How far is ${guide.city} from Studio37, and is there a travel fee?`,
          answer: `${guide.driveTime} ${guide.travelNote}`,
        }
      : {
          question: `Do you travel to ${guide.city} for sessions?`,
          answer: `Yes. ${guide.travelNote} ${DESTINATION_TRAVEL_POLICY}`,
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
      ? [
          {
            question: `What do ${guide.city} clients book Studio37 for most?`,
            answer: guide.bookMost,
          },
        ]
      : []),
  ]

  return (
    <div className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(localBusinessSchema),
        }}
      />

      {/* 1. Hero: pitch, trust, and the booking action. Location detail waits until later in the page. */}
      <section className="relative overflow-hidden bg-stone-950 text-white">
        <div className="absolute inset-0">
          <CldImg image={heroImage} widths={HERO_WIDTHS} sizes="100vw" className="h-full w-full object-cover opacity-60" priority />
        </div>
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,9,0.35),rgba(12,10,9,0.85))] md:bg-[linear-gradient(90deg,rgba(12,10,9,0.9),rgba(12,10,9,0.55),rgba(12,10,9,0.2))]"
          aria-hidden="true"
        />
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-sm font-semibold text-amber-100 backdrop-blur">
              <MapPin className="h-4 w-4" aria-hidden="true" />
              {cityLabel} · {guide.county}
            </p>
            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-6xl">Photographer in {cityLabel}</h1>
            <p className="mb-6 max-w-2xl text-lg leading-8 text-stone-100 md:text-xl">
              Weddings, portraits, families, proposals, and brand sessions with two photographers, clear pricing, and {guide.city} locations
              we plan around.
            </p>
            <div className="mb-7 flex flex-col gap-3 sm:flex-row">
              <Link href={bookHref} className="btn-primary inline-flex items-center justify-center gap-2 text-center">
                Plan my {guide.city} session
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                href="/tools/package-recommender"
                className="btn-secondary border-white/60 bg-white/10 text-center text-white hover:bg-white hover:text-stone-950"
              >
                Find my package
              </Link>
            </div>
            <ul
              className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm font-semibold text-stone-100 sm:flex sm:flex-wrap"
              aria-label="Why clients book Studio37"
            >
              <li className="flex items-center gap-1.5">
                <Star className="h-4 w-4 fill-amber-400 text-amber-400" aria-hidden="true" />
                5.0 on Google &amp; Thumbtack
              </li>
              <li className="flex items-center gap-1.5">
                <Users className="h-4 w-4 text-amber-300" aria-hidden="true" />
                Two photographers
              </li>
              <li className="flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-amber-300" aria-hidden="true" />
                Thumbtack Top Pro
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-amber-300" aria-hidden="true" />
                Sessions from $350
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 3. Proof: a featured review plus real sessions in this city. */}
      {(featuredReview || guide.sessions.length > 0) && (
        <section className="section-shell bg-white">
          <div
            className={`container mx-auto grid gap-8 px-4 lg:items-start ${
              guide.secondaryImage ? 'lg:grid-cols-[0.9fr_1.1fr]' : 'lg:grid-cols-[1.2fr_1fr]'
            }`}
          >
            {guide.secondaryImage && (
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-[4/5]">
                <CldImg
                  image={guide.secondaryImage}
                  widths={SECONDARY_WIDTHS}
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>
            )}
            {/* With a secondary photo, review and sessions stack in one column; otherwise they sit side by side. */}
            <div className={guide.secondaryImage ? 'space-y-8' : 'contents'}>
              {featuredReview && (
                <figure className="rounded-2xl bg-stone-50 p-6 md:p-8">
                  <div className="mb-4 flex gap-1 text-amber-500" aria-label="5 out of 5 stars">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <Star key={index} className="h-5 w-5 fill-current" aria-hidden="true" />
                    ))}
                  </div>
                  <blockquote className="text-xl leading-8 text-stone-800 md:text-2xl md:leading-10">
                    &ldquo;{featuredReview.quote}&rdquo;
                  </blockquote>
                  <figcaption className="mt-5 text-sm font-semibold text-stone-900">
                    {featuredReview.name} <span className="font-normal text-stone-500">· {featuredReview.detail}</span>
                  </figcaption>
                </figure>
              )}
              <div>
                {guide.sessions.length > 0 ? (
                  <>
                    <p className="eyebrow mb-3">Recent work near you</p>
                    <h2 className="mb-5 text-2xl font-bold text-stone-950 md:text-3xl">Studio37 sessions in {guide.city}</h2>
                    <ul className="space-y-3">
                      {guide.sessions.map((session) => (
                        <li key={session.description} className="flex items-start gap-3">
                          <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-amber-700" aria-hidden="true" />
                          <span className="text-stone-700">
                            {session.href ? (
                              <Link href={session.href} className="font-semibold text-amber-800 hover:underline">
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
                  </>
                ) : (
                  secondReview && (
                    <figure className="rounded-2xl border border-stone-200 p-6">
                      <div className="mb-3 flex gap-1 text-amber-500" aria-label="5 out of 5 stars">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star key={index} className="h-4 w-4 fill-current" aria-hidden="true" />
                        ))}
                      </div>
                      <blockquote className="leading-7 text-stone-700">&ldquo;{secondReview.quote}&rdquo;</blockquote>
                      <figcaption className="mt-4 text-sm font-semibold text-stone-900">
                        {secondReview.name} <span className="font-normal text-stone-500">· {secondReview.detail}</span>
                      </figcaption>
                    </figure>
                  )
                )}
                <p className="mt-6 text-sm text-stone-500">Rated 5.0 on Google and Thumbtack, with Top Pro status on Thumbtack.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* 4. What you can book, each with a clear next step. */}
      <section className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <h2 className="mb-2 text-3xl font-bold text-stone-950">What you can book in {guide.city}</h2>
          <p className="mb-8 max-w-2xl text-stone-600">Published starting prices, the same in every city we serve.</p>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {SERVICES.map((service) => (
              <Link
                key={service.href}
                href={service.href}
                className="group flex items-center gap-4 rounded-lg border border-stone-200 bg-white p-4 transition hover:-translate-y-0.5 hover:border-amber-300 lg:flex-col lg:items-start lg:p-5"
              >
                <service.icon className="h-6 w-6 flex-shrink-0 text-amber-700" aria-hidden="true" />
                <span className="flex-1">
                  <span className="block font-bold text-stone-950 group-hover:text-amber-900">{service.title}</span>
                  <span className="block text-sm text-stone-500">{service.note}</span>
                </span>
                <span className="text-sm font-semibold text-stone-900 lg:mt-1">from {service.price}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Mid-page call to action. */}
      <section className="bg-amber-700 text-white">
        <div className="container mx-auto flex flex-col items-start gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Not sure which session fits?</h2>
            <p className="mt-1 text-amber-50">
              Tell us your date and what you want photographed, and we will recommend the right coverage and {guide.city} spot.
            </p>
          </div>
          <Link
            href={bookHref}
            className="inline-flex min-h-12 flex-shrink-0 items-center gap-2 rounded-lg bg-white px-6 font-semibold text-amber-900 transition hover:bg-amber-50"
          >
            Book a free consultation
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* 6. Locations: the top spots up front, everything else one tap away (still in the HTML for search). */}
      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <p className="eyebrow mb-3">Location planning</p>
          <h2 className="mb-4 text-3xl font-bold text-stone-950 md:text-4xl">Where we photograph in and around {guide.city}</h2>
          <p className="mb-8 max-w-3xl leading-8 text-stone-600">{guide.intro}</p>
          <div className="grid gap-5 md:grid-cols-3">
            {topSpots.map((spot) => (
              <SpotCard key={spot.name} spot={spot} />
            ))}
          </div>
          {moreSpots.length > 0 && (
            <details className="group mt-5">
              <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-full border border-stone-300 px-5 font-semibold text-stone-800 transition hover:border-amber-400 hover:bg-amber-50 [&::-webkit-details-marker]:hidden">
                See {moreSpots.length} more {guide.city} spot
                {moreSpots.length === 1 ? '' : 's'}
                <ChevronDown className="h-4 w-4 transition-transform group-open:rotate-180" aria-hidden="true" />
              </summary>
              <div className="mt-5 grid gap-5 md:grid-cols-3">
                {moreSpots.map((spot) => (
                  <SpotCard key={spot.name} spot={spot} />
                ))}
              </div>
            </details>
          )}
        </div>
      </section>

      {/* 7. Planning details, collapsed by default. */}
      <section className="section-shell bg-stone-50">
        <div className="container mx-auto max-w-4xl px-4">
          <h2 className="mb-6 text-2xl font-bold text-stone-950 md:text-3xl">Planning a session in {guide.city}</h2>
          <div className="space-y-3">
            {guide.venues.length > 0 && (
              <PlanningDetail title={`Wedding venues near ${guide.city}`} icon={Heart}>
                <ul className="space-y-3">
                  {guide.venues.map((venue) => (
                    <li key={venue.name}>
                      <span className="font-semibold text-stone-900">{venue.name}</span>
                      {venue.verified && (
                        <span className="ml-2 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-800">
                          In our venue guide
                        </span>
                      )}
                      {venue.address && <span className="block text-sm text-stone-500">{venue.address}</span>}
                      <span className="block">{venue.description}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4">
                  Every wedding collection includes two photographers.{' '}
                  <Link href="/services/wedding-photography" className="font-semibold text-amber-800 hover:underline">
                    See wedding collections
                  </Link>
                </p>
              </PlanningDetail>
            )}
            <PlanningDetail title={`Seasons and timing in ${guide.city}`} icon={CalendarDays}>
              <ul className="list-disc space-y-2 pl-5">
                {guide.seasons.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </PlanningDetail>
            <PlanningDetail title="Permits and park rules" icon={ShieldCheck}>
              <ul className="list-disc space-y-2 pl-5">
                {guide.permits.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </PlanningDetail>
            <PlanningDetail title="Travel and getting there" icon={Car}>
              <p>{guide.driveTime || `We travel to ${guide.city} from our studio in Pinehurst.`}</p>
              <p className="mt-2">{guide.travelNote}</p>
              <p className="mt-2">{DESTINATION_TRAVEL_POLICY}</p>
              {guide.bookMost && (
                <p className="mt-2">
                  <span className="font-semibold text-stone-800">Most booked here: </span>
                  {guide.bookMost}
                </p>
              )}
            </PlanningDetail>
          </div>
        </div>
      </section>

      <div id="city-faq" className="scroll-mt-28">
        <FAQSection faqs={faqs} title={`${guide.city} photography questions`} />
      </div>

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
                          <Link
                            href={href}
                            className="inline-flex min-h-11 items-center rounded-full border border-stone-200 px-4 text-sm font-semibold text-stone-700 hover:border-amber-300 hover:bg-amber-50"
                          >
                            {area}
                          </Link>
                        ) : (
                          <span className="inline-flex min-h-11 items-center rounded-full border border-stone-200 px-4 text-sm text-stone-600">
                            {area}
                          </span>
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

      {/* 8. Final call to action over real work. */}
      <section className="relative overflow-hidden bg-stone-950 text-white">
        <div className="absolute inset-0">
          <CldImg
            image={{ id: heroImage.id, alt: '' }}
            widths={SECONDARY_WIDTHS}
            sizes="100vw"
            className="h-full w-full object-cover opacity-35"
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-16 text-center md:py-20">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to plan your {guide.city} session?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-stone-200">
            Two photographers, published prices, and a {guide.city} location matched to your session.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={bookHref} className="btn-primary inline-flex items-center justify-center gap-2">
              Book a free consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link
              href="/request-portfolio"
              className="btn-secondary border-white/60 bg-white/10 text-white hover:bg-white hover:text-stone-950"
            >
              Request private examples
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
