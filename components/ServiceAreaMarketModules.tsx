import Link from 'next/link'
import { ArrowRight, MapPin } from 'lucide-react'

const topMarkets = [
  {
    market: 'Montgomery County Core',
    cities: ['Pinehurst', 'The Woodlands', 'Conroe', 'Magnolia', 'Montgomery'],
    angle: 'Highest-intent mix for weddings, portraits, business branding, and local events.',
    href: '/locations',
  },
  {
    market: 'Northwest Houston',
    cities: ['Tomball', 'Cypress', 'Hockley', 'Waller'],
    angle: 'Strong family, senior, wedding, and small-business content demand.',
    href: '/local-photographer-tomball-tx',
  },
  {
    market: 'Brazos Valley',
    cities: ['Bryan', 'College Station', 'Navasota'],
    angle: 'High-value graduation, event, commercial, and wedding search opportunities.',
    href: '/local-photographer-college-station-tx',
  },
]

const serviceModules = [
  { label: 'Wedding photography', href: '/services/wedding-photography', copy: 'Timeline-first coverage for venues, churches, estates, and intimate celebrations.' },
  { label: 'Portrait sessions', href: '/services/portrait-photography', copy: 'Family, senior, headshot, maternity, and personal branding sessions by city.' },
  { label: 'Event coverage', href: '/services/event-photography', copy: 'Corporate events, parties, graduations, galas, and community milestones.' },
  { label: 'Commercial content', href: '/services/commercial-photography', copy: 'Brand, product, workplace, team, and campaign photography for local businesses.' },
]

export default function ServiceAreaMarketModules({ compact = false }: { compact?: boolean }) {
  return (
    <section className={`${compact ? 'py-12' : 'section-shell'} bg-white`}>
      <div className="container mx-auto px-4">
        <div className="mb-8 max-w-3xl">
          <p className="eyebrow mb-3">Where We Work</p>
          <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">Photography for the places and moments our clients book most</h2>
          <p className="mt-3 text-stone-600">
            Start with your area, then choose the kind of coverage that fits what you are planning.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {topMarkets.map((market) => (
            <Link key={market.market} href={market.href} className="rounded-lg border border-stone-200 bg-stone-50 p-5 hover:border-amber-300 hover:bg-amber-50">
              <div className="mb-4 flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.14em] text-amber-800">
                <MapPin className="h-4 w-4" aria-hidden="true" />
                {market.market}
              </div>
              <p className="font-semibold text-stone-950">{market.cities.join(' / ')}</p>
              <p className="mt-3 text-sm leading-6 text-stone-600">{market.angle}</p>
              <span className="mt-4 inline-flex items-center text-sm font-semibold text-amber-800">
                Explore Market <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </span>
            </Link>
          ))}
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {serviceModules.map((service) => (
            <Link key={service.label} href={service.href} className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm hover:border-amber-300">
              <h3 className="font-semibold text-stone-950">{service.label}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">{service.copy}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
