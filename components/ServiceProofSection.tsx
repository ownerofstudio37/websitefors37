import Link from 'next/link'
import { ArrowRight, Camera, CheckCircle, MapPin, Star } from 'lucide-react'
import CldImg, { SECONDARY_WIDTHS } from '@/components/CldImg'
import { getServiceReview, serviceProof } from '@/lib/service-guides'

type Specialty = { label: string; href: string }

// First-hand proof for a main service page: a real photo, a review, recent sessions with links to
// the city pages, and the spots or venues we have worked. Optional specialties turn the section
// into a hub for child pages (e.g. portrait -> family, seniors, maternity, headshots).
export default function ServiceProofSection({ serviceKey, specialties }: { serviceKey: keyof typeof serviceProof; specialties?: Specialty[] }) {
  const proof = serviceProof[serviceKey]
  const review = getServiceReview(proof.reviewName)

  return (
    <>
      {specialties && specialties.length > 0 && (
        <section className="section-shell bg-white" aria-labelledby={`${serviceKey}-specialties`}>
          <div className="container mx-auto px-4">
            <h2 id={`${serviceKey}-specialties`} className="mb-2 text-3xl font-bold text-stone-950">
              Choose your session
            </h2>
            <p className="mb-6 max-w-2xl text-stone-600">Each specialty has its own planning guide, spots, and packages.</p>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {specialties.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex min-h-14 items-center justify-between gap-3 rounded-lg border border-stone-200 bg-stone-50 px-5 py-4 font-semibold text-stone-900 transition hover:border-amber-300 hover:bg-amber-50"
                >
                  {item.label}
                  <ArrowRight className="h-4 w-4 text-amber-700 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section-shell bg-white" aria-labelledby={`${serviceKey}-proof`}>
        <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="relative aspect-[4/3] overflow-hidden rounded-2xl lg:aspect-[4/5]">
            <CldImg
              image={proof.secondaryImage}
              widths={SECONDARY_WIDTHS}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="space-y-8">
            {review && (
              <figure className="rounded-2xl bg-stone-50 p-6 md:p-8">
                <div className="mb-4 flex gap-1 text-amber-500" aria-label="5 out of 5 stars">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <Star key={index} className="h-5 w-5 fill-current" aria-hidden="true" />
                  ))}
                </div>
                <blockquote className="text-xl leading-8 text-stone-800">&ldquo;{review.quote}&rdquo;</blockquote>
                <figcaption className="mt-4 text-sm font-semibold text-stone-900">
                  {review.name} <span className="font-normal text-stone-500">· {review.detail}</span>
                </figcaption>
              </figure>
            )}
            {proof.sessions.length > 0 && (
              <div>
                <p className="eyebrow mb-3">{proof.eyebrow}</p>
                <h2 id={`${serviceKey}-proof`} className="mb-4 text-2xl font-bold text-stone-950 md:text-3xl">
                  {proof.heading}
                </h2>
                <ul className="space-y-3">
                  {proof.sessions.map((session) => (
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
              </div>
            )}
            {proof.sessions.length === 0 && (
              <h2 id={`${serviceKey}-proof`} className="text-2xl font-bold text-stone-950 md:text-3xl">
                {proof.heading}
              </h2>
            )}
            <p className="text-sm text-stone-500">Rated 5.0 on Google and Thumbtack, with Top Pro status on Thumbtack.</p>
          </div>
        </div>
      </section>

      <section className="section-shell bg-stone-50" aria-labelledby={`${serviceKey}-spots`}>
        <div className="container mx-auto px-4">
          <h2 id={`${serviceKey}-spots`} className="mb-6 text-2xl font-bold text-stone-950 md:text-3xl">
            {proof.spotsHeading}
          </h2>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {proof.spots.map((spot) => (
              <article key={spot.name} className="rounded-lg border border-stone-200 bg-white p-5">
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
    </>
  )
}
