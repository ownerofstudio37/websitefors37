import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const galleryUrl = 'https://gallery.studio37.cc'

const recentWork = [
  {
    title: 'Editorial Portrait Session',
    service: 'Portraits',
    location: 'Pinehurst, TX',
    image: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1778033088/PS379444_2_1_pge2hl.jpg',
    note: 'Clean direction, polished editing, and gallery-ready portrait variety.',
  },
  {
    title: 'Warm Family Session',
    service: 'Family',
    location: 'Montgomery County',
    image: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1769255559/PS379799_ayoxbp.jpg',
    note: 'Relaxed posing, detail coverage, and natural connection moments.',
  },
  {
    title: 'Commercial Brand Refresh',
    service: 'Commercial',
    location: 'Greater Houston',
    image: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1769255703/PS373409_pwmxmp.jpg',
    note: 'Business-ready images for web, social, profiles, and campaigns.',
  },
]

export default function CuratedRecentWork({ className = '' }: { className?: string }) {
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
                <Image src={item.image} alt={`${item.title} by Studio37`} fill className="object-cover" sizes="(min-width: 768px) 33vw, 100vw" />
              </div>
              <div className="p-5">
                <div className="mb-3 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-stone-500">
                  <span>{item.service}</span>
                  <span aria-hidden="true">/</span>
                  <span>{item.location}</span>
                </div>
                <h3 className="text-xl font-semibold text-stone-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">{item.note}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
