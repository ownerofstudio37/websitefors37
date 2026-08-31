import Link from 'next/link'
import { ArrowRight, MapPin, Search, Sparkles } from 'lucide-react'

type RelatedLink = {
  label: string
  href: string
}

export default function SubServiceSeoExpansion({
  eyebrow = 'Local Planning Detail',
  title,
  intro,
  planning,
  localNotes,
  searchTopics,
  relatedLinks = [],
}: {
  eyebrow?: string
  title: string
  intro: string[]
  planning: string[]
  localNotes: string[]
  searchTopics: string[]
  relatedLinks?: RelatedLink[]
}) {
  const cards = [
    { title: 'Session Planning', items: planning, icon: Sparkles },
    { title: 'Local Fit', items: localNotes, icon: MapPin },
    { title: 'Common Searches', items: searchTopics, icon: Search },
  ]

  return (
    <section className="section-shell bg-white">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-5xl">
          <p className="eyebrow mb-3">{eyebrow}</p>
          <h2 className="max-w-4xl text-3xl font-bold text-stone-950 md:text-4xl">{title}</h2>
          <div className="mt-5 grid gap-4 text-base leading-8 text-stone-700 md:grid-cols-2">
            {intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {cards.map(({ title: cardTitle, items, icon: Icon }) => (
              <article key={cardTitle} className="surface-panel interactive-card p-5">
                <div className="mb-4 flex items-center gap-2">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-800">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <h3 className="text-lg font-semibold text-stone-950">{cardTitle}</h3>
                </div>
                <ul className="space-y-2 text-sm leading-6 text-stone-700">
                  {items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          {relatedLinks.length > 0 && (
            <div className="mt-8 flex flex-wrap gap-3">
              {relatedLinks.map((link) => (
                <Link key={link.href} href={link.href} className="btn-secondary group">
                  {link.label}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
