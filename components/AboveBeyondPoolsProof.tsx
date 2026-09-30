import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

type AboveBeyondPoolsProofProps = {
  compact?: boolean
}

const stats = [
  { value: '76', label: 'peak page-one keywords' },
  { value: '3', label: '#1 keyword rankings' },
  { value: '58%', label: 'impression growth in 3 months' },
  { value: '64', label: 'indexed pages, up from about 45' },
]

const rankings = [
  '#1 hot tub cleaning services near me',
  '#1 professional hot tub cleaning',
  '#1 pool cleaning austin',
  '#3 austin pool cleaning',
]

export default function AboveBeyondPoolsProof({ compact = false }: AboveBeyondPoolsProofProps) {
  return (
    <section id="seo-results" className={`${compact ? 'border-y border-stone-200 bg-white' : 'bg-stone-950 text-white'} py-12 md:py-14`}>
      <div className="container mx-auto px-4">
        <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className={compact ? 'eyebrow mb-3' : 'eyebrow-hero mb-3'}>Real SEO Results</p>
            <h2 className={`text-3xl font-bold leading-tight md:text-4xl ${compact ? 'text-stone-950' : 'text-white'}`}>
              From under 10 page-one keywords to 76 for an Austin service business.
            </h2>
            <p className={`mt-4 text-lg leading-8 ${compact ? 'text-stone-600' : 'text-stone-300'}`}>
              For Above Beyond Pools, Studio37 expanded search coverage around the services customers were already looking for, then improved the technical and content foundation behind those rankings.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link href="/book-consultation?service=seo" className="btn-primary inline-flex items-center justify-center">
                Book a Consultation <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/services/branding-marketing/seo-services" className={compact ? 'btn-secondary inline-flex items-center justify-center' : 'btn-ghost inline-flex items-center justify-center'}>
                See Our SEO Services
              </Link>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-3 sm:grid-cols-2">
              {stats.map((stat) => (
                <div key={stat.label} className={`rounded-lg border p-5 ${compact ? 'border-stone-200 bg-stone-50' : 'border-white/10 bg-white/10'}`}>
                  <p className={`text-4xl font-bold ${compact ? 'text-primary-700' : 'text-amber-200'}`}>{stat.value}</p>
                  <p className={`mt-2 text-sm font-medium ${compact ? 'text-stone-700' : 'text-stone-200'}`}>{stat.label}</p>
                </div>
              ))}
            </div>
            <div className={`rounded-lg border p-5 ${compact ? 'border-stone-200 bg-stone-50' : 'border-white/10 bg-white/10'}`}>
              <p className={`text-sm font-semibold uppercase tracking-[0.16em] ${compact ? 'text-primary-700' : 'text-amber-200'}`}>
                Page-One Ranking Examples
              </p>
              <div className="mt-4 grid gap-2 sm:grid-cols-2">
                {rankings.map((ranking) => (
                  <div key={ranking} className={`flex gap-2 text-sm ${compact ? 'text-stone-700' : 'text-stone-200'}`}>
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" aria-hidden="true" />
                    <span>{ranking}</span>
                  </div>
                ))}
              </div>
              <p className={`mt-4 text-xs leading-5 ${compact ? 'text-stone-500' : 'text-stone-400'}`}>
                Reported from Studio37 case-study data: SEO partnership began February 2026; Google Search Console reporting covered Apr. 23 to Sep. 27, 2026.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
