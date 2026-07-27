import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

export type SubServicePackage = {
  name: string
  price: string
  duration: string
  features: string[]
  popular?: boolean
}

type ProofCard = {
  title: string
  copy: string
}

export function SubServiceHero({
  eyebrow,
  title,
  copy,
  priceNote,
  image,
  imageAlt,
  primaryLabel = 'Book Consultation',
  primaryHref,
  secondaryHref = '/request-portfolio',
  secondaryLabel = 'Request Private Examples',
  imagePosition = 'center',
}: {
  eyebrow: string
  title: string
  copy: string
  priceNote: string
  image: string
  imageAlt: string
  primaryLabel?: string
  primaryHref: string
  secondaryHref?: string
  secondaryLabel?: string
  imagePosition?: string
}) {
  return (
    <section className="relative min-h-[560px] overflow-hidden bg-stone-950 text-white">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        className="kenburns-subtle object-cover opacity-60"
        style={{ objectPosition: imagePosition }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-stone-950/85 via-stone-950/55 to-stone-950/25" />
      <div className="relative z-10 container mx-auto flex min-h-[560px] items-center px-4 py-24">
        <div className="max-w-3xl">
          <p className="eyebrow-hero mb-5">{eyebrow}</p>
          <h1 className="max-w-4xl text-4xl font-bold leading-tight md:text-6xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-100 md:text-xl">{copy}</p>
          <p className="mt-5 text-sm font-semibold uppercase tracking-[0.16em] text-amber-100">{priceNote}</p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link href={primaryHref} className="btn-primary group">
              {primaryLabel}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
            <Link href={secondaryHref} className="btn-ghost group">
              {secondaryLabel}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SubServicePackageGrid({
  eyebrow = 'Pricing',
  title,
  copy,
  packages,
}: {
  eyebrow?: string
  title: string
  copy: string
  packages: SubServicePackage[]
}) {
  return (
    <section className="section-shell bg-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">{title}</h2>
          <p className="mt-3 text-lg leading-8 text-stone-600">{copy}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {packages.map((pkg) => (
            <article
              key={pkg.name}
              className={`surface-panel interactive-card flex h-full flex-col p-6 ${
                pkg.popular ? 'border-amber-400 bg-amber-50/60 ring-1 ring-amber-200' : ''
              }`}
            >
              {pkg.popular && (
                <span className="mb-4 w-fit rounded-full bg-amber-700 px-3 py-1 text-xs font-bold uppercase tracking-[0.14em] text-white">
                  Most Popular
                </span>
              )}
              <h3 className="text-2xl font-bold text-stone-950">{pkg.name}</h3>
              <p className="mt-2 text-4xl font-bold text-amber-800">{pkg.price}</p>
              <p className="mt-1 text-sm font-medium text-stone-500">{pkg.duration}</p>
              <ul className="mt-6 flex-1 space-y-3">
                {pkg.features.map((feature) => (
                  <li key={feature} className="flex gap-2 text-sm leading-6 text-stone-700">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-none text-green-700" aria-hidden="true" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-7 grid gap-2">
                <Link href={`/book-consultation?package=${encodeURIComponent(pkg.name)}`} className="btn-primary w-full">
                  Book Consultation
                </Link>
                <Link href={`/request-portfolio?service=${encodeURIComponent(pkg.name)}`} className="btn-secondary w-full">
                  Request Examples
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SubServiceProofGrid({ cards }: { cards: ProofCard[] }) {
  return (
    <section className="section-shell bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <article key={card.title} className="surface-panel interactive-card p-5">
              <h2 className="text-lg font-semibold text-stone-950">{card.title}</h2>
              <p className="mt-2 text-sm leading-6 text-stone-600">{card.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export function SubServiceStoryBlock({
  title,
  paragraphs,
  bullets,
  parentHref = '/services/event-photography',
  parentLabel = 'Explore full event photography services',
}: {
  title: string
  paragraphs: string[]
  bullets: string[]
  parentHref?: string
  parentLabel?: string
}) {
  return (
    <section className="section-shell bg-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-4xl">
          <p className="eyebrow mb-3">Studio37 Approach</p>
          <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">{title}</h2>
          <div className="mt-6 space-y-4 text-base leading-8 text-stone-700">
            {paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {bullets.map((bullet) => (
              <div key={bullet} className="rounded-lg border border-stone-200 bg-stone-50 p-4 text-sm font-medium text-stone-800">
                {bullet}
              </div>
            ))}
          </div>
          <Link href={parentHref} className="btn-secondary group mt-8">
            {parentLabel}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  )
}
