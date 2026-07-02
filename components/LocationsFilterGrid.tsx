'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import type { LocationPage } from '@/lib/location-pages'

export default function LocationsFilterGrid({ locations }: { locations: LocationPage[] }) {
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()
  const filtered = useMemo(() => {
    if (!normalizedQuery) return locations
    return locations.filter((location) =>
      [location.city, location.county, location.region, location.intro].some((value) =>
        value.toLowerCase().includes(normalizedQuery)
      )
    )
  }, [locations, normalizedQuery])

  return (
    <section className="py-12">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-stone-950">Find your city</h2>
            <p className="mt-2 text-sm text-stone-600">Search by city, county, or region.</p>
          </div>
          <label className="w-full md:max-w-sm">
            <span className="sr-only">Search service areas</span>
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search Pinehurst, Houston, Montgomery..."
              className="w-full rounded-xl border border-stone-300 bg-white px-4 py-3 text-sm shadow-sm outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
            />
          </label>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((location) => (
            <Link
              key={location.slug}
              href={`/${location.slug.replace(/-tx$/, '')}`}
              className="bg-white border border-gray-200 rounded-lg p-5 hover:border-primary-300 hover:shadow-md transition-all"
            >
              <h3 className="text-xl font-semibold text-gray-900">{location.city}, TX</h3>
              <p className="text-sm text-gray-600 mt-1">{location.county} · {location.region}</p>
              <p className="text-sm text-gray-700 mt-3">{location.intro}</p>
            </Link>
          ))}
        </div>
        {filtered.length === 0 && (
          <div className="rounded-lg border border-stone-200 bg-white p-8 text-center text-stone-600">
            No matching service areas yet. Try a nearby city or contact Studio37 for travel options.
          </div>
        )}
      </div>
    </section>
  )
}
