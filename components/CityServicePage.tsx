import type { ReactNode } from 'react'
import Link from 'next/link'
import { ArrowRight, CalendarDays, Camera, Car, CheckCircle, ChevronDown, Heart, MapPin, ShieldCheck, Star, Users } from 'lucide-react'
import CldImg, { HERO_WIDTHS, SECONDARY_WIDTHS } from '@/components/CldImg'
import FAQSection from '@/components/FAQSection'
import { generateBreadcrumbSchema } from '@/lib/enhanced-seo-schemas'
import { generateServiceSchema } from '@/lib/seo-config'
import type { CitySpot } from '@/lib/city-guides'
import { getCityServicePage, listWithAnd } from '@/lib/city-service-pages'

const TOP_SPOT_COUNT = 3

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
      {(spot.timing || spot.access) && (
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

// City x service landing page (e.g. wedding photographer in Navasota). Same conversion-first order as the
// city guides, but every local section is filtered to the service so it does not duplicate the city page.
export default function CityServicePage({ slug, description }: { slug: string; description: string }) {
  const data = getCityServicePage(slug)
  if (!data) return null
  const { config, guide, city, spots, citySessions, nearbySessions, review } = data
  const cityLabel = `${city}, TX`
  const pageUrl = `https://www.studio37.cc/${slug}`
  const bookHref = `/book-consultation?service=${encodeURIComponent(config.label)}&city=${encodeURIComponent(cityLabel)}`
  const topSpots = spots.slice(0, TOP_SPOT_COUNT)
  const moreSpots = spots.slice(TOP_SPOT_COUNT)
  const showVenues = data.service === 'wedding' && guide.venues.length > 0

  const serviceSchema = generateServiceSchema(`${config.label} in ${cityLabel}`, description)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.studio37.cc' },
    { name: config.label, url: `https://www.studio37.cc${config.mainHref}` },
    { name: `${config.role} in ${cityLabel}`, url: pageUrl },
  ])

  // Built from this city's own data, filtered to the service.
  const faqs = [
    {
      question: `How much does a ${config.role.toLowerCase()} in ${city} cost?`,
      answer: `${config.label} with Studio37 starts at ${config.price} in ${city}, the same published price as everywhere we work. Two photographers come to every session.`,
    },
    {
      question: `Where are the best places for ${config.photos} in ${city}?`,
      answer: `For ${config.photos} in ${city} we usually start with ${listWithAnd(spots.slice(0, 3).map((spot) => spot.name))}. We choose based on the look you want, the light at your session time, parking, and how much walking you want to do.`,
    },
    {
      question: `When is the best time of year for ${config.photos} in ${city}?`,
      answer: guide.seasons.join(' '),
    },
    {
      question: `Do you need a permit for ${config.photos} in ${city}?`,
      answer: guide.permits.join(' '),
    },
    {
      question: `Do you travel to ${city}?`,
      answer: guide.driveTime ? `Yes. ${guide.driveTime} ${guide.travelNote}` : `Yes. ${guide.travelNote}`,
    },
    config.extraFaq(city, guide),
  ]

  return (
    <div className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      {/* 1. Hero: pitch, trust, booking. */}
      <section className="relative overflow-hidden bg-stone-950 text-white">
        <div className="absolute inset-0">
          <CldImg image={data.heroImage} widths={HERO_WIDTHS} quality="good" sizes="100vw" className="h-full w-full object-cover opacity-60" priority />
        </div>
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,9,0.35),rgba(12,10,9,0.85))] md:bg-[linear-gradient(90deg,rgba(12,10,9,0.9),rgba(12,10,9,0.55),rgba(12,10,9,0.2))]"
          aria-hidden="true"
        />
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-2 text-sm font-semibold text-amber-100">
              <Link href={config.mainHref} className="hover:underline">
                {config.label}
              </Link>
              <span aria-hidden="true">›</span>
              <Link href={data.guideHref} className="inline-flex items-center gap-1 hover:underline">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {cityLabel}
              </Link>
            </nav>
            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-6xl">
              {config.role} in {cityLabel}
            </h1>
            <p className="mb-6 max-w-2xl text-lg leading-8 text-stone-100 md:text-xl">{config.pitch(city)}</p>
            <div className="mb-7 flex flex-col gap-3 sm:flex-row">
              <Link href={bookHref} className="btn-primary inline-flex items-center justify-center gap-2 text-center">
                Plan my {city} session
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a href="#spots" className="btn-secondary border-white/60 bg-white/10 text-center text-white hover:bg-white hover:text-stone-950">
                See {city} spots
              </a>
            </div>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-2 text-sm font-semibold text-stone-100 sm:flex sm:flex-wrap" aria-label="Why clients book Studio37">
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
                From {config.price}
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* 2. Proof: a review plus real sessions (in this city when we have them, otherwise nearby). */}
      <section className="section-shell bg-white">
        <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[1.1fr_1fr] lg:items-start">
          {review && (
            <figure className="rounded-2xl bg-stone-50 p-6 md:p-8">
              <div className="mb-4 flex gap-1 text-amber-500" role="img" aria-label="5 out of 5 stars">
                {Array.from({ length: 5 }).map((_, index) => (
                  <Star key={index} className="h-5 w-5 fill-current" aria-hidden="true" />
                ))}
              </div>
              <blockquote className="text-xl leading-8 text-stone-800 md:text-2xl md:leading-10">&ldquo;{review.quote}&rdquo;</blockquote>
              <figcaption className="mt-5 text-sm font-semibold text-stone-900">
                {review.name} <span className="font-normal text-stone-500">· {review.detail}</span>
              </figcaption>
            </figure>
          )}
          <div>
            <p className="eyebrow mb-3">Recent work</p>
            {citySessions.length > 0 ? (
              <>
                <h2 className="mb-5 text-2xl font-bold text-stone-950 md:text-3xl">
                  Recent {config.recent} in {city}
                </h2>
                <ul className="space-y-3">
                  {citySessions.map((session) => (
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
              <>
                <h2 className="mb-5 text-2xl font-bold text-stone-950 md:text-3xl">Recent {config.recent} near {city}</h2>
                <ul className="space-y-3">
                  {nearbySessions.map((session) => (
                    <li key={session.description + (session.date || '')} className="flex items-start gap-3">
                      <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-amber-700" aria-hidden="true" />
                      <span className="text-stone-700">
                        {session.description}
                        {session.cityHref && session.cityLabel && (
                          <>
                            {' · '}
                            <Link href={session.cityHref} className="font-semibold text-amber-800 hover:underline">
                              {session.cityLabel}
                            </Link>
                          </>
                        )}
                        {session.date && <span className="text-stone-500"> · {session.date}</span>}
                      </span>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </div>
        </div>
      </section>

      {/* 3. Spots that suit this service in this city. */}
      <section id="spots" className="section-shell scroll-mt-24 bg-stone-50">
        <div className="container mx-auto px-4">
          <p className="eyebrow mb-3">{city} locations</p>
          <h2 className="mb-4 text-3xl font-bold text-stone-950 md:text-4xl">
            Where we take {config.photos} in {city}
          </h2>
          <p className="mb-8 max-w-3xl leading-8 text-stone-600">
            These are the {city} spots we suggest most for {config.photos}. For every spot in the area, see our{' '}
            <Link href={data.guideHref} className="font-semibold text-amber-800 hover:underline">
              {city} photographer guide
            </Link>
            .
          </p>
          <div className="grid gap-5 md:grid-cols-3">
            {topSpots.map((spot) => (
              <SpotCard key={spot.name} spot={spot} />
            ))}
          </div>
          {moreSpots.length > 0 && (
            <details className="group mt-5">
              <summary className="inline-flex min-h-11 cursor-pointer list-none items-center gap-2 rounded-full border border-stone-300 bg-white px-5 font-semibold text-stone-800 transition hover:border-amber-400 hover:bg-amber-50 [&::-webkit-details-marker]:hidden">
                See {moreSpots.length} more spot{moreSpots.length === 1 ? '' : 's'}
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

      {showVenues && (
        <section className="section-shell bg-white">
          <div className="container mx-auto px-4">
            <h2 className="mb-6 text-2xl font-bold text-stone-950 md:text-3xl">Wedding venues near {city}</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {guide.venues.map((venue) => (
                <article key={venue.name} className="rounded-lg border border-stone-200 bg-white p-5">
                  <h3 className="mb-1 flex items-center gap-2 font-bold text-stone-950">
                    <Heart className="h-4 w-4 text-amber-700" aria-hidden="true" />
                    {venue.name}
                  </h3>
                  {venue.address && <p className="mb-2 text-sm text-stone-500">{venue.address}</p>}
                  <p className="text-sm leading-6 text-stone-600">{venue.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 4. Mid-page call to action. */}
      <section className="bg-amber-700 text-white">
        <div className="container mx-auto flex flex-col items-start gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Have a date in mind?</h2>
            <p className="mt-1 text-amber-50">Tell us your date and the look you want, and we will suggest the {city} spot and the best time of day.</p>
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

      {/* 5. How it works, then city planning detail. */}
      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <h2 className="mb-6 text-2xl font-bold text-stone-950 md:text-3xl">How {config.label.toLowerCase()} with Studio37 works</h2>
          <ol className="grid gap-4 md:grid-cols-3">
            {config.steps.map((step, index) => (
              <li key={step.title} className="rounded-lg border border-stone-200 bg-stone-50 p-5">
                <span className="mb-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-amber-700 text-sm font-bold text-white">{index + 1}</span>
                <h3 className="mb-1 font-bold text-stone-950">{step.title}</h3>
                <p className="text-sm leading-6 text-stone-600">{step.body}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 max-w-4xl space-y-3">
            <PlanningDetail title={`Seasons and timing in ${city}`} icon={CalendarDays}>
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
            <PlanningDetail title="Travel" icon={Car}>
              <p>{guide.driveTime || guide.travelNote}</p>
              {guide.bookMost && (
                <p className="mt-2">
                  <span className="font-semibold text-stone-800">Most booked in {city}: </span>
                  {guide.bookMost}
                </p>
              )}
            </PlanningDetail>
          </div>
        </div>
      </section>

      <FAQSection faqs={faqs} title={`${config.label} in ${city}: questions`} />

      {/* 6. Links: same service elsewhere, other services here, and the main service pages. */}
      <section className="section-shell bg-white">
        <div className="container mx-auto grid gap-10 px-4 md:grid-cols-3">
          <div>
            <h2 className="mb-4 text-xl font-bold text-stone-950">Nearby areas</h2>
            <ul className="flex flex-wrap gap-2">
              {data.nearby.map((area) =>
                area.href ? (
                  <li key={area.label}>
                    <Link
                      href={area.href}
                      className="inline-flex min-h-11 items-center rounded-full border border-stone-200 px-4 text-sm font-semibold text-stone-700 hover:border-amber-300 hover:bg-amber-50"
                    >
                      {area.label}
                    </Link>
                  </li>
                ) : null
              )}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-bold text-stone-950">More in {city}</h2>
            <ul className="space-y-2">
              <li>
                <Link href={data.guideHref} className="font-semibold text-amber-800 hover:underline">
                  Photographer in {cityLabel}
                </Link>
              </li>
              {data.sameCity.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-semibold text-amber-800 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
              {config.related.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-semibold text-amber-800 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-xl font-bold text-stone-950">{config.label} in other cities</h2>
            <ul className="flex flex-wrap gap-x-4 gap-y-2">
              {data.siblings.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-sm font-semibold text-amber-800 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 7. Final call to action. */}
      <section className="relative overflow-hidden bg-stone-950 text-white">
        <div className="absolute inset-0">
          <CldImg image={{ id: data.heroImage.id, alt: '' }} widths={SECONDARY_WIDTHS} sizes="100vw" className="h-full w-full object-cover opacity-35" />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-16 text-center md:py-20">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to plan your {city} session?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-stone-200">
            Two photographers, published prices from {config.price}, and a {city} spot matched to your {config.photos}.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={bookHref} className="btn-primary inline-flex items-center justify-center gap-2">
              Book a free consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href={config.mainHref} className="btn-secondary border-white/60 bg-white/10 text-white hover:bg-white hover:text-stone-950">
              See {config.label.toLowerCase()} pricing
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
