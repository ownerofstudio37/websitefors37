import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

type MarketingAuditCTAProps = {
  compact?: boolean
  source?: string
}

const auditPoints = [
  'Website and conversion path',
  'SEO visibility and page structure',
  'Content, ads, and follow-up gaps',
]

export default function MarketingAuditCTA({ compact = false, source = 'marketing-audit' }: MarketingAuditCTAProps) {
  return (
    <section className={`${compact ? 'py-8' : 'section-shell'} bg-stone-950 text-white`}>
      <div className="container mx-auto px-4">
        <div className={`rounded-xl border border-white/10 bg-white/5 ${compact ? 'p-6' : 'p-6 md:p-8'}`}>
          <div className="grid gap-6 lg:grid-cols-[1fr_auto] lg:items-center">
            <div>
              <p className="eyebrow-hero mb-3">Free Growth Audit</p>
              <h2 className="text-3xl font-bold leading-tight md:text-4xl">Want to know what is holding your marketing back?</h2>
              <p className="mt-4 max-w-3xl leading-7 text-stone-300">
                Request a Studio37 website and SEO growth audit. We will look at your offer, pages, search visibility, content gaps, and lead path before recommending the next move.
              </p>
              <div className="mt-5 grid gap-2 text-sm font-medium text-stone-200 sm:grid-cols-3">
                {auditPoints.map((point) => (
                  <span key={point} className="flex gap-2 rounded-lg border border-white/10 bg-white/10 px-3 py-2">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-300" aria-hidden="true" />
                    {point}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <Link
                href={`/book-consultation?service=marketing-audit&source=${encodeURIComponent(source)}`}
                className="btn-primary inline-flex items-center justify-center"
              >
                Request Growth Audit <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
              </Link>
              <Link href="/services/branding-marketing/results" className="btn-ghost inline-flex items-center justify-center">
                See Results
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
