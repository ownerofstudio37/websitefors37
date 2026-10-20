import Link from 'next/link'
import { ArrowRight, ListChecks } from 'lucide-react'

export default function ComparePackagesCTA({ context = 'your session' }: { context?: string }) {
  return (
    <section className="mt-12 rounded-lg border border-stone-200 bg-stone-50 p-6">
      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-amber-100 text-amber-800">
            <ListChecks className="h-5 w-5" aria-hidden="true" />
          </span>
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.16em] text-amber-800">Compare Packages</p>
            <h2 className="mt-1 text-2xl font-bold text-stone-950">Choose the right starting point for {context}</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">
              Answer a few questions in the package recommender, or see every published price and what each package includes on one page.
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row md:flex-shrink-0">
          <Link href="/tools/package-recommender" className="btn-primary inline-flex items-center justify-center">
            Find My Package <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/pricing" className="btn-secondary inline-flex items-center justify-center">
            See All Prices
          </Link>
        </div>
      </div>
    </section>
  )
}
