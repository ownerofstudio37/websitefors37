import Link from 'next/link'
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

export default function ServiceExpectationCards({ serviceName = 'photography' }: { serviceName?: string }) {
  return (
    <section className="border-b border-stone-200 bg-white">
      <div className="container mx-auto px-4 py-6">
        <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">What To Expect</p>
            <h2 className="text-2xl font-bold text-stone-950">A calm {serviceName.toLowerCase()} process from inquiry to gallery</h2>
          </div>
          <Link href="/tools/package-recommender" className="inline-flex w-fit items-center text-sm font-semibold text-amber-800">
            Find your package <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          {expectations.map(({ title, icon: Icon, copy }) => (
            <div key={title} className="rounded-lg border border-stone-200 bg-stone-50 p-4">
              <Icon className="mb-3 h-5 w-5 text-amber-800" aria-hidden="true" />
              <h3 className="font-semibold text-stone-950">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">{copy}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
