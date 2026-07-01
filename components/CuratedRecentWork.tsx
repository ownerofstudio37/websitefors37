import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { recentWorkItems } from '@/lib/public-content'

const galleryUrl = 'https://gallery.studio37.cc'

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
              A few site-managed examples visitors can scan before jumping to the full ShootProof gallery experience.
            </p>
          </div>
          <Link href={galleryUrl} className="btn-secondary inline-flex w-fit items-center">
            Open Full Gallery <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-5 md:grid-cols-3">
          {recentWork.map((item) => (
            <article key={item.title} className="overflow-hidden rounded-lg border border-stone-200 bg-stone-50">
              <div className="relative aspect-[4/3] bg-stone-200">
                <Image src={item.image} alt={item.alt} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
              </div>
              <div className="p-5">
                <div className="mb-3 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                  <span>{item.service}</span>
                  <span aria-hidden="true">/</span>
                  <span>{item.location}</span>
                </div>
                <h3 className="text-xl font-semibold text-stone-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">{item.note}</p>
                {'galleryUrl' in item && item.galleryUrl ? (
                  <Link href={item.galleryUrl} className="mt-4 inline-flex text-sm font-semibold text-primary-700 hover:underline">
                    View full gallery
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
