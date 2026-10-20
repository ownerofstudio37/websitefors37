import React from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// A dead link shouldn't be a dead end: point visitors at the pages most people are looking for.
const POPULAR = [
  { label: 'Wedding photography', href: '/services/wedding-photography', note: 'Collections from $1,200' },
  { label: 'Portraits and families', href: '/services/portrait-photography', note: 'Sessions from $350' },
  { label: 'Engagements and proposals', href: '/services/engagement-session', note: 'Sessions from $450' },
  { label: 'Events', href: '/services/event-photography', note: 'Coverage from $600' },
  { label: 'Service areas', href: '/locations', note: 'Pinehurst, The Woodlands, Houston, and more' },
  { label: 'Planning guides', href: '/blog', note: 'Locations, prep tips, and timelines' },
]

export default function NotFound() {
  return (
    <div className="min-h-screen bg-stone-50 px-4 pb-16 pt-28">
      <div className="mx-auto max-w-3xl">
        <p className="eyebrow mb-4">Page not found</p>
        <h1 className="mb-4 text-4xl font-bold text-stone-950 md:text-5xl">We couldn&apos;t find that page.</h1>
        <p className="mb-8 max-w-2xl text-lg leading-8 text-stone-600">
          It may have moved or been renamed. Here are the pages people usually look for, or reach out and we&apos;ll point you in the right direction.
        </p>
        <div className="mb-10 flex flex-col gap-3 sm:flex-row">
          <Link href="/book-consultation" className="btn-primary inline-flex items-center justify-center gap-2">
            Book a free consultation
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="https://gallery.studio37.cc" className="btn-secondary inline-flex items-center justify-center">
            See our work
          </Link>
          <Link href="/" className="btn-secondary inline-flex items-center justify-center">
            Home page
          </Link>
        </div>
        <ul className="grid gap-3 sm:grid-cols-2">
          {POPULAR.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="group flex h-full items-center justify-between gap-3 rounded-lg border border-stone-200 bg-white p-4 transition hover:border-amber-300"
              >
                <span>
                  <span className="block font-semibold text-stone-950">{item.label}</span>
                  <span className="block text-sm text-stone-600">{item.note}</span>
                </span>
                <ArrowRight className="h-4 w-4 flex-shrink-0 text-amber-700 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
