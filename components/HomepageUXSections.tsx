import Link from 'next/link'
import { ArrowRight, Briefcase, Camera, CalendarHeart, Heart, Megaphone } from 'lucide-react'
import CuratedRecentWork from '@/components/CuratedRecentWork'
import ServiceAreaMarketModules from '@/components/ServiceAreaMarketModules'
import { PackageRecommenderCTA } from '@/components/PublicConversionSections'

const pathOptions = [
  {
    label: 'Portrait',
    href: '/services/portrait-photography',
    price: 'from $350',
    icon: Camera,
    copy: 'Families, seniors, headshots, maternity, and personal branding.',
  },
  {
    label: 'Wedding',
    href: '/services/wedding-photography',
    price: 'from $1,200',
    icon: Heart,
    copy: 'Elopements, intimate weddings, and full-day celebrations.',
  },
  {
    label: 'Event',
    href: '/services/event-photography',
    price: 'from $600',
    icon: CalendarHeart,
    copy: 'Corporate events, milestones, parties, and community coverage.',
  },
  {
    label: 'Commercial',
    href: '/services/commercial-photography',
    price: 'from $500',
    icon: Briefcase,
    copy: 'Brand, product, workplace, and campaign image libraries.',
  },
  {
    label: 'Branding',
    href: '/services/branding-marketing',
    price: 'custom plans',
    icon: Megaphone,
    copy: 'Marketing support and visual systems for growth-focused brands.',
  },
]

export function ChooseYourPathSection() {
  return (
    <section className="border-y border-stone-200 bg-white">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">Choose Your Path</p>
            <h2 className="text-2xl font-bold text-stone-950">Start with the service that fits your story</h2>
          </div>
          <Link href="/tools/package-recommender" className="inline-flex w-fit items-center text-sm font-semibold text-amber-800 hover:text-amber-900">
            Not sure? Use the recommender <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {pathOptions.map(({ label, href, price, icon: Icon, copy }) => (
            <Link key={label} href={href} className="group rounded-lg border border-stone-200 bg-stone-50 p-4 transition hover:border-amber-300 hover:bg-amber-50">
              <div className="mb-3 flex items-center justify-between gap-3">
                <Icon className="h-5 w-5 text-amber-800" aria-hidden="true" />
                <span className="rounded-full bg-white px-2.5 py-1 text-xs font-semibold text-stone-700">{price}</span>
              </div>
              <h3 className="font-semibold text-stone-950 group-hover:text-amber-900">{label}</h3>
              <p className="mt-2 text-sm leading-5 text-stone-600">{copy}</p>
            </Link>
          ))}
        </div>
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
