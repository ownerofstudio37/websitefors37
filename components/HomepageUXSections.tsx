import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import CuratedRecentWork from '@/components/CuratedRecentWork'
import ServiceAreaMarketModules from '@/components/ServiceAreaMarketModules'
import { PackageRecommenderCTA } from '@/components/PublicConversionSections'

const pathOptions = [
  {
    label: 'Portrait',
    href: '/services/portrait-photography',
    price: 'from $350',
    copy: 'Families, seniors, headshots, maternity, and personal branding.',
  },
  {
    label: 'Wedding',
    href: '/services/wedding-photography',
    price: 'from $1,200',
    copy: 'Elopements, intimate weddings, and full-day celebrations.',
  },
  {
    label: 'Engagement',
    href: '/services/engagement-session',
    price: 'from $450',
    copy: 'Couple sessions, proposal coverage, and save-the-date portraits.',
  },
  {
    label: 'Event',
    href: '/services/event-photography',
    price: 'from $600',
    copy: 'Corporate events, milestones, parties, and community coverage.',
  },
  {
    label: 'Commercial',
    href: '/services/commercial-photography',
    price: 'from $500',
    copy: 'Brand, product, workplace, and campaign image libraries.',
  },
  {
    label: 'Branding & Marketing',
    href: '/services/branding-marketing',
    price: 'custom plans',
    copy: 'Web, SEO, PPC, content, and visual systems for growth-focused brands.',
  },
]

export function ChooseYourPathSection() {
  return (
    <section className="border-b border-stone-200 bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-5 max-w-3xl">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">Choose Your Path</p>
            <h2 className="text-3xl font-bold text-stone-950">Start with what you&apos;re planning</h2>
          </div>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {pathOptions.map(({ label, href, price, copy }) => (
            <Link key={label} href={href} className="group rounded-lg border border-stone-200 bg-white p-5 transition hover:border-amber-300 hover:bg-amber-50">
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold text-stone-950 group-hover:text-amber-900">{label}</h3>
                <span className="text-xs font-semibold uppercase tracking-wide text-stone-500">{price}</span>
              </div>
              <p className="mt-2 text-sm leading-5 text-stone-600">{copy}</p>
            </Link>
          ))}
        </div>
        <Link href="/services/concierge-services" className="mt-4 flex flex-col gap-2 rounded-lg border border-amber-200 bg-amber-50 px-5 py-4 transition hover:border-amber-300 sm:flex-row sm:items-center sm:justify-between">
          <span>
            <span className="block text-sm font-semibold uppercase tracking-[0.14em] text-amber-800">Planning a proposal?</span>
            <span className="mt-1 block text-sm text-stone-700">Add concierge support for location, decor, timing, photo, and video.</span>
          </span>
          <span className="inline-flex items-center text-sm font-semibold text-amber-900">
            Explore Concierge <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </span>
        </Link>
      </div>
    </section>
  )
}

export function HomeSEOAccordion() {
  return (
    <section className="section-shell bg-stone-50">
      <div className="container mx-auto px-4">
        <div className="section-soft mx-auto max-w-5xl p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div>
              <p className="eyebrow mb-3">Why clients choose us</p>
              <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">Professional photography in Pinehurst, TX</h2>
              <div className="mt-5 grid gap-3 text-sm text-stone-700 sm:grid-cols-3 lg:grid-cols-1">
                <div className="rounded-lg bg-white p-4"><strong>500+</strong><br />client sessions</div>
                <div className="rounded-lg bg-white p-4"><strong>2 photographers</strong><br />included on site</div>
                <div className="rounded-lg bg-white p-4"><strong>24-48h</strong><br />sneak peek options</div>
              </div>
            </div>
            <div className="space-y-3">
              <details className="rounded-lg border border-stone-200 bg-white p-4" open>
                <summary className="cursor-pointer font-semibold text-stone-950">What Studio37 is known for</summary>
                <p className="mt-3 leading-7 text-stone-700">
                  Studio37 blends warm, film-inspired aesthetics with modern editing, calm direction, and dependable communication from inquiry to final gallery.
                </p>
              </details>
              <details className="rounded-lg border border-stone-200 bg-white p-4">
                <summary className="cursor-pointer font-semibold text-stone-950">Services and starting points</summary>
                <p className="mt-3 leading-7 text-stone-700">
                  Wedding coverage starts at $1,200, portrait sessions start at $350, commercial photography starts at $500, and custom event coverage is planned around timeline and deliverables.
                </p>
              </details>
              <details className="rounded-lg border border-stone-200 bg-white p-4">
                <summary className="cursor-pointer font-semibold text-stone-950">Where we work</summary>
                <p className="mt-3 leading-7 text-stone-700">
                  Studio37 serves Pinehurst, The Woodlands, Conroe, Magnolia, Tomball, Spring, Montgomery, Willis, New Caney, Hockley, Huntsville, Houston, Bryan, College Station, and surrounding Texas markets.
                </p>
              </details>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export function HomepageConversionGuardrail() {
  return (
    <>
      <ChooseYourPathSection />
      <PackageRecommenderCTA />
      <CuratedRecentWork />
      <ServiceAreaMarketModules compact />
    </>
  )
}
