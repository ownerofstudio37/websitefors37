import Link from 'next/link'
import { ArrowLeft, CheckCircle2, Image, Search, Tags } from 'lucide-react'

const proofSets = [
  {
    service: 'Wedding',
    tags: ['full-day', 'church', 'reception', 'low-light', 'family-formals'],
    use: 'Send when couples need consistency proof from prep through reception.',
  },
  {
    service: 'Portrait',
    tags: ['family', 'senior', 'outdoor', 'golden-hour', 'posing-direction'],
    use: 'Send when clients ask about variety, posing, or final gallery depth.',
  },
  {
    service: 'Engagement / Concierge',
    tags: ['proposal', 'privacy', 'location-planning', 'save-the-date', 'surprise'],
    use: 'Send when timing, location control, or discreet planning matters.',
  },
  {
    service: 'Event',
    tags: ['corporate', 'community', 'speakers', 'candids', 'delivery-speed'],
    use: 'Send when organizers need proof of coverage variety and fast handoff.',
  },
  {
    service: 'Commercial / Branding',
    tags: ['team', 'workspace', 'campaign', 'usage', 'website-content'],
    use: 'Send when businesses need sample coverage by usage goal.',
  },
]

export default function ProofLibraryPage() {
  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-6xl space-y-6">
        <Link href="/admin" className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Back to Admin
        </Link>

        <section className="rounded-xl border bg-white p-6 shadow-sm">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">Private Proof Library</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-950">Tag complete galleries by why a lead needs proof.</h1>
          <p className="mt-3 max-w-3xl text-gray-600">
            Use this workspace to decide which private galleries or sample sets to send for portfolio requests. Keep public featured work separate from full client delivery links.
          </p>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {[
              ['Tag by service', 'Wedding, portrait, event, commercial, branding, engagement, concierge.'],
              ['Tag by context', 'Venue style, light, location, privacy, timeline, usage, and delivery expectations.'],
              ['Send with purpose', 'Match proof sets to the objection or confidence gap in the lead request.'],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <CheckCircle2 className="h-5 w-5 text-green-700" aria-hidden="true" />
                <h2 className="mt-3 font-semibold text-gray-950">{title}</h2>
                <p className="mt-1 text-sm leading-6 text-gray-600">{copy}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {proofSets.map((set) => (
            <article key={set.service} className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-amber-50 p-2 text-amber-800">
                  <Image className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-950">{set.service}</h2>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{set.use}</p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {set.tags.map((tag) => (
                  <span key={tag} className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700">
                    <Tags className="h-3 w-3" aria-hidden="true" />
                    {tag}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </section>

        <section className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-bold text-gray-950">Next database step</h2>
              <p className="mt-1 text-sm text-gray-700">When ready, connect this to stored proof assets with gallery URL, service tags, location tags, send history, and lead-fit notes.</p>
            </div>
            <Link href="/admin/leads" className="inline-flex items-center justify-center gap-2 rounded-lg bg-gray-950 px-4 py-2 text-sm font-semibold text-white hover:bg-gray-800">
              <Search className="h-4 w-4" aria-hidden="true" />
              Match a Lead
            </Link>
          </div>
        </section>
      </div>
    </main>
  )
}
