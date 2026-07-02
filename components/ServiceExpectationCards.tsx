'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ArrowRight, Clock, Image, MessageSquare, ShieldCheck } from 'lucide-react'

const expectations = [
  {
    title: 'Plan',
    icon: MessageSquare,
    copy: 'We confirm service fit, location, timing, shot priorities, and package path before the date.',
  },
  {
    title: 'Shoot',
    icon: ShieldCheck,
    copy: 'Two photographers cover wide story moments, close details, direction, candids, and backup angles.',
  },
  {
    title: 'Preview',
    icon: Clock,
    copy: 'Select services include quick highlights or sneak peeks so you can share sooner.',
  },
  {
    title: 'Gallery',
    icon: Image,
    copy: 'Final delivery opens through a polished online gallery with download and sharing options.',
  },
]

const serviceCopy: Record<string, { label: string; headline: string; note: string }> = {
  '/services/portrait-photography': {
    label: 'Portrait Flow',
    headline: 'A guided portrait session from planning to polished gallery',
    note: 'Built for families, seniors, maternity, headshots, and personal branding sessions.',
  },
  '/services/wedding-photography': {
    label: 'Wedding Flow',
    headline: 'A calm wedding process from timeline planning to final gallery',
    note: 'Designed around coverage priorities, family lists, venue rules, and real wedding-day pacing.',
  },
  '/services/event-photography': {
    label: 'Event Flow',
    headline: 'Event coverage with clear priorities, fast previews, and complete delivery',
    note: 'Useful for corporate events, private celebrations, fundraisers, and community moments.',
  },
  '/services/commercial-photography': {
    label: 'Commercial Flow',
    headline: 'A production-minded process for brand, product, and team imagery',
    note: 'Built around usage needs, shot lists, locations, and marketing-ready deliverables.',
  },
  '/services/engagement-session': {
    label: 'Engagement Flow',
    headline: 'A relaxed couple session with location, light, and posing support',
    note: 'Ideal for save-the-dates, proposals, announcement images, and editorial couple portraits.',
  },
  '/services/concierge-services': {
    label: 'Concierge Flow',
    headline: 'A managed proposal and engagement plan from concept to reveal',
    note: 'For moments where privacy, timing, decor, and coordination all need to work together.',
  },
}

export default function ServiceExpectationCards({ serviceName = 'photography' }: { serviceName?: string }) {
  const pathname = usePathname()
  const copy = serviceCopy[pathname || ''] || {
    label: 'Studio37 Process',
    headline: `A calm ${serviceName.toLowerCase()} process from inquiry to gallery`,
    note: 'A simple path from first question to a finished gallery clients know how to use.',
  }

  return (
    <section className="border-y border-stone-200 bg-white pb-24 md:pb-12">
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.4fr] lg:items-start">
          <div className="max-w-xl">
            <p className="eyebrow mb-4">{copy.label}</p>
            <h2 className="text-3xl font-bold leading-tight text-stone-950 md:text-4xl">{copy.headline}</h2>
            <p className="mt-4 text-base leading-7 text-stone-600">{copy.note}</p>
            <Link href="/tools/package-recommender" className="mt-6 inline-flex w-fit items-center text-sm font-semibold text-amber-800 hover:text-amber-900">
              Find your package <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
          <ol className="relative grid gap-4 md:grid-cols-4 md:gap-3">
            <span className="absolute left-6 top-6 hidden h-px w-[calc(100%-3rem)] bg-stone-200 md:block" aria-hidden="true" />
            {expectations.map(({ title, icon: Icon, copy: stepCopy }, index) => (
              <li key={title} className="relative rounded-lg border border-stone-200 bg-stone-50 p-4 shadow-sm">
                <div className="mb-4 flex items-center justify-between">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white text-sm font-bold text-amber-800 ring-1 ring-stone-200">
                    {index + 1}
                  </span>
                  <Icon className="h-5 w-5 text-amber-800" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-stone-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">{stepCopy}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  )
}
