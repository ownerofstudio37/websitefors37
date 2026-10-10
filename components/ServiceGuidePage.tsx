import Link from 'next/link'
import { ArrowRight, Camera, CheckCircle, ChevronRight, MapPin, ShieldCheck, Star, Users } from 'lucide-react'
import CldImg, { HERO_WIDTHS, SECONDARY_WIDTHS } from '@/components/CldImg'
import FAQSection from '@/components/FAQSection'
import PrepGuideLeadMagnet from '@/components/PrepGuideLeadMagnet'
import { generateBreadcrumbSchema } from '@/lib/enhanced-seo-schemas'
import { generateServiceSchema } from '@/lib/seo-config'
import { PORTRAIT_FAMILY, type ServiceGuide, getServiceGuideReviews } from '@/lib/service-guides'

// Conversion-first layout for portrait specialty pages, mirroring the city guides: pitch and booking
// first, then real proof, packages, spots, planning detail, and FAQs unique to the specialty.
export default function ServiceGuidePage({ guide, serviceName, description }: { guide: ServiceGuide; serviceName: string; description: string }) {
  const pageUrl = `https://www.studio37.cc/${guide.slug}`
  const bookHref = `/book-consultation?service=${encodeURIComponent(serviceName)}`
  const [featuredReview, secondReview] = getServiceGuideReviews(guide)
  const siblings = PORTRAIT_FAMILY.filter((item) => item.href !== `/${guide.slug}`)

  const serviceSchema = generateServiceSchema(serviceName, description)
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: 'https://www.studio37.cc' },
    { name: 'Portrait Photography', url: 'https://www.studio37.cc/services/portrait-photography' },
    { name: serviceName, url: pageUrl },
  ])

  return (
    <div className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative overflow-hidden bg-stone-950 text-white">
        <div className="absolute inset-0">
          <CldImg image={guide.heroImage} widths={HERO_WIDTHS} sizes="100vw" className="h-full w-full object-cover opacity-60" priority />
        </div>
        <div
          className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,9,0.35),rgba(12,10,9,0.85))] md:bg-[linear-gradient(90deg,rgba(12,10,9,0.9),rgba(12,10,9,0.55),rgba(12,10,9,0.2))]"
          aria-hidden="true"
        />
        <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-3xl">
            <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap items-center gap-1 text-sm font-semibold text-amber-100">
              <Link href="/services/portrait-photography" className="hover:underline">
                Portrait photography
              </Link>
              <ChevronRight className="h-4 w-4" aria-hidden="true" />
              <span>{serviceName}</span>
            </nav>
            <h1 className="mb-4 text-4xl font-bold leading-tight md:text-6xl">{guide.h1}</h1>
            <p className="mb-6 max-w-2xl text-lg leading-8 text-stone-100 md:text-xl">{guide.pitch}</p>
            <div className="mb-7 flex flex-col gap-3 sm:flex-row">
              <Link href={bookHref} className="btn-primary inline-flex items-center justify-center gap-2 text-center">
                Plan my session
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a href="#packages" className="btn-secondary border-white/60 bg-white/10 text-center text-white hover:bg-white hover:text-stone-950">
                See packages
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
                From {guide.packages[0]?.price}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div
          className={`container mx-auto grid gap-8 px-4 lg:items-start ${guide.secondaryImage ? 'lg:grid-cols-[0.9fr_1.1fr]' : 'lg:grid-cols-[1.2fr_1fr]'}`}
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
          <div className={guide.secondaryImage ? 'space-y-8' : 'contents'}>
            {featuredReview && (
              <figure className="rounded-2xl bg-stone-50 p-6 md:p-8">
                <div className="mb-4 flex gap-1 text-amber-500" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-5 w-5 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="text-xl leading-8 text-stone-800">&ldquo;{featuredReview.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-stone-900">
                  {featuredReview.name} <span className="font-normal text-stone-500">· {featuredReview.detail}</span>
                </figcaption>
              </figure>
            )}
            <div>
              <p className="eyebrow mb-3">Recent work</p>
              <h2 className="mb-4 text-2xl font-bold text-stone-950 md:text-3xl">{guide.sessionsHeading}</h2>
              <ul className="space-y-3">
                {guide.sessions.map((session) => (
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
              {secondReview && !guide.secondaryImage && (
                <figure className="mt-6 rounded-2xl border border-stone-200 p-5">
                  <blockquote className="leading-7 text-stone-700">&ldquo;{secondReview.quote}&rdquo;</blockquote>
                  <figcaption className="mt-3 text-sm font-semibold text-stone-900">
                    {secondReview.name} <span className="font-normal text-stone-500">· {secondReview.detail}</span>
                  </figcaption>
                </figure>
              )}
              <p className="mt-6 text-sm text-stone-500">Rated 5.0 on Google and Thumbtack, with Top Pro status on Thumbtack.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="packages" className="section-shell scroll-mt-28 bg-stone-50">
        <div className="container mx-auto px-4">
          <h2 className="mb-2 text-3xl font-bold text-stone-950">{guide.packagesHeading}</h2>
          <p className="mb-8 max-w-2xl text-stone-600">Published starting prices, with two photographers on every session.</p>
          <div className="grid gap-6 md:grid-cols-3">
            {guide.packages.map((pkg) => (
              <article key={pkg.name} className="flex h-full flex-col rounded-2xl border border-stone-200 bg-white p-5 shadow-sm">
                {pkg.image && (
                  <div className="relative mb-5 aspect-[4/3] overflow-hidden rounded-xl bg-stone-200">
                    <CldImg
                      image={{ id: pkg.image, alt: `${pkg.name} example photo` }}
                      widths={[450, 900]}
                      crop=",c_limit"
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>
                )}
                <h3 className="mb-1 text-2xl font-semibold text-stone-950">{pkg.name}</h3>
                <p className="mb-3 font-semibold text-amber-800">Starting at {pkg.price}</p>
                {pkg.note && <p className="mb-5 text-stone-600">{pkg.note}</p>}
                <Link href={`/book-consultation?package=${encodeURIComponent(pkg.name)}`} className="btn-primary mt-auto text-center">
                  Book this session
                </Link>
                <Link
                  href={`/book-a-session?package=${encodeURIComponent(pkg.name)}`}
                  className="mt-3 text-center text-sm font-semibold text-amber-800 hover:underline"
                >
                  Or pick a date now
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-amber-700 text-white">
        <div className="container mx-auto flex flex-col items-start gap-4 px-4 py-8 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl font-bold">Not sure which package fits?</h2>
            <p className="mt-1 text-amber-50">Tell us who is in the photos and how you will use them, and we will recommend the right session and spot.</p>
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

      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <p className="eyebrow mb-3">Location planning</p>
          <h2 className="mb-4 text-3xl font-bold text-stone-950 md:text-4xl">{guide.spotsHeading}</h2>
          <p className="mb-8 max-w-3xl leading-8 text-stone-600">{guide.intro}</p>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {guide.spots.map((spot) => (
              <article key={spot.name} className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm">
                <div className="mb-1 flex flex-wrap items-center gap-2">
                  <h3 className="font-bold text-stone-950">{spot.name}</h3>
                  {spot.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5 text-xs font-semibold text-amber-800">
                      <Camera className="h-3 w-3" aria-hidden="true" />
                      We&apos;ve shot here
                    </span>
                  )}
                </div>
                <Link href={spot.cityHref} className="mb-2 inline-flex items-center gap-1 text-sm font-semibold text-amber-800 hover:underline">
                  <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                  {spot.cityLabel}
                </Link>
                <p className="text-sm leading-6 text-stone-600">{spot.why}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell bg-stone-50">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-2">
          <div>
            <h2 className="mb-4 text-2xl font-bold text-stone-950 md:text-3xl">How we plan your {serviceName.toLowerCase()}</h2>
            <ul className="space-y-3">
              {guide.planning.map((item) => (
                <li key={item} className="flex items-start gap-3 text-stone-700">
                  <CheckCircle className="mt-1 h-5 w-5 flex-shrink-0 text-amber-700" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="mb-4 text-2xl font-bold text-stone-950 md:text-3xl">More portrait sessions</h2>
            <ul className="mb-6 flex flex-wrap gap-2">
              {siblings.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="inline-flex min-h-11 items-center rounded-full border border-stone-200 bg-white px-4 text-sm font-semibold text-stone-700 hover:border-amber-300 hover:bg-amber-50"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/services/portrait-photography"
                  className="inline-flex min-h-11 items-center rounded-full border border-amber-300 bg-amber-50 px-4 text-sm font-semibold text-amber-900"
                >
                  All portrait photography
                </Link>
              </li>
            </ul>
            <h3 className="mb-3 text-lg font-bold text-stone-900">Helpful guides</h3>
            <ul className="space-y-2">
              {guide.related.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="font-semibold text-amber-800 hover:underline">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {guide.leadMagnet && <PrepGuideLeadMagnet />}

      <FAQSection faqs={guide.faqs} title={`${serviceName} questions`} />

      <section className="relative overflow-hidden bg-stone-950 text-white">
        <div className="absolute inset-0">
          <CldImg image={{ id: guide.heroImage.id, alt: '' }} widths={SECONDARY_WIDTHS} sizes="100vw" className="h-full w-full object-cover opacity-35" />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-16 text-center md:py-20">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Ready to plan your {serviceName.toLowerCase()}?</h2>
          <p className="mx-auto mb-8 max-w-2xl text-stone-200">Two photographers, published prices, and a location matched to your session.</p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href={bookHref} className="btn-primary inline-flex items-center justify-center gap-2">
              Book a free consultation
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/request-portfolio" className="btn-secondary border-white/60 bg-white/10 text-white hover:bg-white hover:text-stone-950">
              Request private examples
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
