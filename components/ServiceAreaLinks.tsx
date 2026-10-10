import Link from 'next/link'
import { MapPin } from 'lucide-react'
import { cityGuideLinks } from '@/lib/city-guides'

// Links every city guide from the service pages so city pages are not orphaned in the site's link graph.
const AREA_GROUPS: Array<{ title: string; cities: string[] }> = [
  {
    title: 'Montgomery County',
    cities: ['Pinehurst', 'Magnolia', 'Conroe', 'Montgomery', 'The Woodlands', 'Willis', 'New Caney', 'Porter', 'Splendora'],
  },
  {
    title: 'Greater Houston',
    cities: ['Tomball', 'Spring', 'Cypress', 'Houston', 'Katy', 'Kingwood', 'Humble', 'Atascocita', 'Hockley'],
  },
  {
    title: 'Farther out',
    cities: ['Waller', 'Cleveland', 'New Waverly', 'Huntsville', 'Plantersville', 'Navasota', 'Bryan', 'College Station'],
  },
]

export default function ServiceAreaLinks({ serviceLabel }: { serviceLabel: string }) {
  const hrefFor = (city: string) => cityGuideLinks.find((link) => link.city === city)?.href
  return (
    <section className="section-shell bg-white" aria-labelledby="service-areas-heading">
      <div className="container mx-auto px-4">
        <p className="eyebrow mb-3">Areas we serve</p>
        <h2 id="service-areas-heading" className="mb-3 text-3xl font-bold text-stone-950">
          {serviceLabel} near you
        </h2>
        <p className="mb-8 max-w-2xl text-stone-600">
          Based in Pinehurst, we photograph across Montgomery County and Greater Houston. Each city guide covers the spots, venues, seasons, and
          permits we plan around.
        </p>
        <div className="grid gap-8 md:grid-cols-3">
          {AREA_GROUPS.map((group) => (
            <div key={group.title}>
              <h3 className="mb-3 text-lg font-bold text-stone-900">{group.title}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.cities.map((city) => {
                  const href = hrefFor(city)
                  return href ? (
                    <li key={city}>
                      <Link
                        href={href}
                        className="inline-flex min-h-11 items-center gap-1.5 rounded-full border border-stone-200 px-4 text-sm font-semibold text-stone-700 transition hover:border-amber-300 hover:bg-amber-50 hover:text-amber-900"
                      >
                        <MapPin className="h-3.5 w-3.5 text-amber-700" aria-hidden="true" />
                        {city}, TX
                      </Link>
                    </li>
                  ) : null
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
