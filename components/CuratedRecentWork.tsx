import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { recentWorkItems } from '@/lib/public-content'

export default function CuratedRecentWork({ className = '' }: { className?: string }) {
  const recentWork = recentWorkItems
    .filter((item) => item.featured)
    .sort((a, b) => a.order - b.order)

  return (
    <section className={`section-shell bg-white ${className}`}>
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3">Recent Work</p>
            <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">Curated highlights from Studio37 sessions</h2>
            <p className="mt-3 max-w-2xl text-stone-600">
              A few recent examples to preview the style, pacing, and polish of Studio37 work. Complete galleries are shared privately by request.
            </p>
          </div>
          <Link href="/request-portfolio" aria-label="Request complete Studio37 galleries" className="btn-secondary inline-flex w-fit items-center">
            Request Complete Galleries <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-6">
          {recentWork.map((item, index) => {
            const balancedSpan = recentWork.length === 5 && index < 2 ? 'lg:col-span-3' : 'lg:col-span-2'

            return (
              <article key={item.title} className={`flex h-full flex-col overflow-hidden rounded-lg border border-stone-200 bg-stone-50 ${balancedSpan}`}>
                <div className="relative aspect-[4/3] bg-gradient-to-br from-stone-100 via-amber-50 to-stone-200">
                  <Image src={item.image} alt={item.alt} fill className="object-cover" sizes="(min-width: 1280px) 420px, (min-width: 768px) 33vw, 100vw" quality={88} />
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <div className="mb-3 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                    <span>{item.service}</span>
                    <span aria-hidden="true">/</span>
                    <span>{item.location}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-stone-950">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-6 text-stone-600">{item.note}</p>
                  <Link href="/request-portfolio" aria-label={`Request complete Studio37 gallery examples for ${item.title}`} className="mt-4 inline-flex text-sm font-semibold text-primary-700 hover:underline focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2">
                    Request similar galleries
                  </Link>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
