import Link from 'next/link'
import { ArrowLeft, CheckCircle2, ExternalLink, Image as ImageIcon, Link2, MessageSquare, Search, Tags } from 'lucide-react'
import {
  curatedImageSlots,
  recentWorkItems,
  studio37Reviews,
  testimonialsByService,
  turnaroundByService,
  type ServiceKey,
} from '@/lib/public-content'
import PublicContentPersistenceEditor from '@/components/admin/PublicContentPersistenceEditor'

const proofSets = [
  {
    service: 'Wedding',
    serviceKey: 'wedding' as ServiceKey,
    tags: ['full-day', 'church', 'reception', 'low-light', 'family-formals'],
    use: 'Send when couples need consistency proof from prep through reception.',
  },
  {
    service: 'Portrait',
    serviceKey: 'portrait' as ServiceKey,
    tags: ['family', 'senior', 'outdoor', 'golden-hour', 'posing-direction'],
    use: 'Send when clients ask about variety, posing, or final gallery depth.',
  },
  {
    service: 'Engagement / Concierge',
    serviceKey: 'engagement' as ServiceKey,
    tags: ['proposal', 'privacy', 'location-planning', 'save-the-date', 'surprise'],
    use: 'Send when timing, location control, or discreet planning matters.',
  },
  {
    service: 'Event',
    serviceKey: 'event' as ServiceKey,
    tags: ['corporate', 'community', 'speakers', 'candids', 'delivery-speed'],
    use: 'Send when organizers need proof of coverage variety and fast handoff.',
  },
  {
    service: 'Commercial / Branding',
    serviceKey: 'commercial' as ServiceKey,
    tags: ['team', 'workspace', 'campaign', 'usage', 'website-content'],
    use: 'Send when businesses need sample coverage by usage goal.',
  },
]

const ctaRules = [
  { intent: 'Featured public work', label: 'Featured Work / Galleries', href: 'https://gallery.studio37.cc', note: 'Use only when opening the curated ShootProof gallery.' },
  { intent: 'Private complete-gallery proof', label: 'Request Complete Galleries', href: '/request-portfolio', note: 'Use when a visitor wants full galleries, tailored examples, or proof before booking.' },
  { intent: 'Package fit', label: 'Find Fit', href: '/tools/package-recommender', note: 'Use when the visitor is comparing services or unsure what to book.' },
  { intent: 'Pricing math', label: 'Price It', href: '/tools/pricing', note: 'Use when the visitor knows the service and needs a starting estimate.' },
  { intent: 'Human next step', label: 'Book Consultation', href: '/book-consultation', note: 'Use as the primary close after proof, pricing, or package context.' },
]

const imageSlotUsage: Record<keyof typeof curatedImageSlots, string> = {
  engagementHero: 'Golden-Hour Engagement Session card and engagement proof moments',
  proposalProof: 'Private Proposal Coverage card and concierge/proposal proof',
  portraitProof: 'Editorial Portrait Session card and portrait/local proof',
  familyProof: 'Warm Family Session card and family/local proof',
  commercialProof: 'Commercial Brand Refresh card and business-content proof',
}

export default function ProofLibraryPage() {
  const imageSlots = Object.entries(curatedImageSlots) as Array<[keyof typeof curatedImageSlots, string]>
  const reviewCoverage = Object.entries(testimonialsByService) as Array<[ServiceKey, typeof testimonialsByService[ServiceKey]]>
  const overrideDrafts = [
    {
      key: 'curatedImageSlots',
      content_type: 'image_slots' as const,
      label: 'Curated image slots',
      value: curatedImageSlots,
      notes: 'Hero/proof image slot URLs used across public proof sections.',
      status: 'published' as const,
    },
    {
      key: 'recentWorkItems',
      content_type: 'recent_work' as const,
      label: 'Curated recent-work cards',
      value: recentWorkItems,
      notes: 'Public recent-work cards. Published overrides are used by the public component.',
      status: 'published' as const,
    },
    {
      key: 'studio37Reviews',
      content_type: 'reviews' as const,
      label: 'Master review excerpts',
      value: studio37Reviews,
      notes: 'Real review excerpts used for proof rotation and local trust language.',
      status: 'published' as const,
    },
    {
      key: 'testimonialsByService',
      content_type: 'testimonials' as const,
      label: 'Service testimonial rotation',
      value: testimonialsByService,
      notes: 'Service-specific review rotation data.',
      status: 'published' as const,
    },
    {
      key: 'turnaroundByService',
      content_type: 'turnaround' as const,
      label: 'Delivery expectation copy',
      value: turnaroundByService,
      notes: 'Preview, highlight, final-gallery, and rush-delivery copy.',
      status: 'published' as const,
    },
    {
      key: 'ctaRules',
      content_type: 'cta_rules' as const,
      label: 'CTA variant rules',
      value: ctaRules,
      notes: 'Shared CTA label and routing guidance.',
      status: 'published' as const,
    },
  ]

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="mx-auto max-w-7xl space-y-6">
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

        <section className="rounded-xl border bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-700">Admin Content Controls</p>
              <h2 className="mt-2 text-2xl font-bold text-gray-950">Public proof assets currently powering the site</h2>
              <p className="mt-2 max-w-3xl text-sm leading-6 text-gray-600">
                These values are sourced from <code className="rounded bg-gray-100 px-1.5 py-0.5">lib/public-content.ts</code>. This board makes the editable ownership obvious until the next database-backed CMS step.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link href="/admin/operations" className="rounded-lg border border-gray-200 px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">Operations</Link>
              <Link href="/admin/leads" className="rounded-lg bg-gray-950 px-3 py-2 text-sm font-semibold text-white hover:bg-gray-800">Match a Lead</Link>
            </div>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="text-2xl font-bold text-gray-950">{recentWorkItems.filter((item) => item.featured).length}</p>
              <p className="mt-1 text-sm text-gray-600">featured recent-work cards</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="text-2xl font-bold text-gray-950">{studio37Reviews.length}</p>
              <p className="mt-1 text-sm text-gray-600">real review excerpts available</p>
            </div>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <p className="text-2xl font-bold text-gray-950">{imageSlots.length}</p>
              <p className="mt-1 text-sm text-gray-600">curated image slots tracked</p>
            </div>
          </div>
        </section>

        <PublicContentPersistenceEditor initialDrafts={overrideDrafts} />

        <section className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-gray-950">Image Selection Board</h2>
          <p className="mt-1 text-sm text-gray-600">Use the service/category labels here to avoid mismatched proof images and copy.</p>
          <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {imageSlots.map(([slot, url]) => (
              <article key={slot} className="overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
                <img src={url} alt={`${slot} preview`} className="h-32 w-full object-cover" />
                <div className="p-4">
                  <h3 className="font-semibold text-gray-950">{slot}</h3>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{imageSlotUsage[slot]}</p>
                  <a href={url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center gap-1 text-xs font-semibold text-blue-700 hover:underline">
                    Open image <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="rounded-xl border bg-white p-5 shadow-sm">
          <h2 className="text-xl font-bold text-gray-950">Public Proof Cards</h2>
          <p className="mt-1 text-sm text-gray-600">These cards appear in the curated recent-work proof section and should stay service-matched.</p>
          <div className="mt-4 overflow-x-auto">
            <table className="min-w-full text-left text-sm">
              <thead className="border-b bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-3 py-2">Order</th>
                  <th className="px-3 py-2">Title</th>
                  <th className="px-3 py-2">Service</th>
                  <th className="px-3 py-2">Location</th>
                  <th className="px-3 py-2">CTA</th>
                  <th className="px-3 py-2">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentWorkItems.map((item) => (
                  <tr key={item.title}>
                    <td className="px-3 py-3 font-semibold">{item.order}</td>
                    <td className="px-3 py-3">{item.title}</td>
                    <td className="px-3 py-3">{item.service}</td>
                    <td className="px-3 py-3">{item.location}</td>
                    <td className="px-3 py-3">Request similar galleries</td>
                    <td className="px-3 py-3">
                      <span className={`rounded-full px-2 py-1 text-xs font-semibold ${item.featured ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>
                        {item.featured ? 'Featured' : 'Draft'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className="grid gap-4 md:grid-cols-2">
          {proofSets.map((set) => (
            <article key={set.service} className="rounded-xl border bg-white p-5 shadow-sm">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-amber-50 p-2 text-amber-800">
                  <ImageIcon className="h-5 w-5" aria-hidden="true" />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-gray-950">{set.service}</h2>
                  <p className="mt-2 text-sm leading-6 text-gray-600">{set.use}</p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
                    {testimonialsByService[set.serviceKey]?.length || 0} review excerpts · {turnaroundByService[set.serviceKey]?.finalGallery}
                  </p>
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

        <section className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-gray-950">Review Rotation</h2>
            <p className="mt-1 text-sm text-gray-600">Service pages pull from these real excerpts.</p>
            <div className="mt-4 space-y-3">
              {reviewCoverage.map(([service, reviews]) => (
                <div key={service} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-semibold capitalize text-gray-950">{service}</h3>
                    <span className="rounded-full bg-white px-2 py-1 text-xs font-semibold text-gray-600">{reviews.length} excerpts</span>
                  </div>
                  <div className="mt-3 space-y-2">
                    {reviews.map((review) => (
                      <p key={`${service}-${review.name}`} className="text-sm leading-6 text-gray-600">
                        <MessageSquare className="mr-1 inline h-3.5 w-3.5 text-amber-700" aria-hidden="true" />
                        <strong className="text-gray-950">{review.name}</strong> · {review.context}
                      </p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border bg-white p-5 shadow-sm">
            <h2 className="text-xl font-bold text-gray-950">CTA Variant Rules</h2>
            <p className="mt-1 text-sm text-gray-600">Use these labels consistently so public pages, chatbot answers, and admin handoffs do not blur together.</p>
            <div className="mt-4 space-y-3">
              {ctaRules.map((rule) => (
                <div key={rule.intent} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <h3 className="font-semibold text-gray-950">{rule.intent}</h3>
                    <code className="rounded bg-white px-2 py-1 text-xs text-gray-700">{rule.href}</code>
                  </div>
                  <p className="mt-2 text-sm text-gray-600"><Link2 className="mr-1 inline h-3.5 w-3.5 text-amber-700" aria-hidden="true" />{rule.label}: {rule.note}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="rounded-xl border border-amber-200 bg-amber-50 p-5">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="font-bold text-gray-950">Next database step</h2>
              <p className="mt-1 text-sm text-gray-700">Use saved overrides for public content that changes often. Keep gallery URL, service tags, location tags, send history, and lead-fit notes in the proof workflow.</p>
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
