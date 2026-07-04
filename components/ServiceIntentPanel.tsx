import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'

type ServiceKey =
  | 'wedding'
  | 'portrait'
  | 'engagement'
  | 'concierge'
  | 'event'
  | 'commercial'
  | 'branding'

const serviceIntent: Record<ServiceKey, {
  intent: string
  proof: string
  process: string
  pricing: string
  objection: string
  primaryHref: string
  primaryLabel: string
  secondaryHref: string
  secondaryLabel: string
}> = {
  wedding: {
    intent: 'For couples who want the full day covered without missed transitions.',
    proof: 'Ask for complete wedding galleries to review prep, ceremony, family formals, reception, and low-light consistency.',
    process: 'Timeline consultation, family-list planning, venue light review, two-photographer coverage, preview highlights, then full gallery delivery.',
    pricing: 'Best for weddings starting at $1,200, with larger collections built around hours, venues, and add-ons.',
    objection: 'Worried about chaos or missed moments? The two-photographer workflow covers parallel moments and backup angles.',
    primaryHref: '/book-consultation?service=wedding',
    primaryLabel: 'Plan Wedding Coverage',
    secondaryHref: '/request-portfolio?service=wedding',
    secondaryLabel: 'Request Wedding Galleries',
  },
  portrait: {
    intent: 'For families, seniors, maternity, headshots, and personal branding that need direction without stiffness.',
    proof: 'Review portrait examples for posing, skin tone consistency, location variety, and finished gallery depth.',
    process: 'Choose the session type, confirm location/light, plan wardrobe, shoot with guided prompts, then receive a polished private gallery.',
    pricing: 'Portrait sessions start at $350, with timing and variety increasing by package.',
    objection: 'Not comfortable in front of the camera? The session is directed so you are not left guessing what to do.',
    primaryHref: '/book-consultation?service=portrait',
    primaryLabel: 'Plan Portrait Session',
    secondaryHref: '/tools/pricing',
    secondaryLabel: 'Estimate Portrait Pricing',
  },
  engagement: {
    intent: 'For couples who want save-the-date portraits, proposal coverage, or a more editorial engagement story.',
    proof: 'Ask for engagement examples by location style, posing direction, privacy needs, and golden-hour planning.',
    process: 'Pick session-only, proposal coverage, concierge planning, or photo/video, then map timing, location, and reveal flow.',
    pricing: 'Engagement sessions start at $450; proposal and concierge scopes are planned by call.',
    objection: 'Unsure if this is a simple session or a planned proposal? Start with the path cards and we will route you correctly.',
    primaryHref: '/book-consultation?service=engagement',
    primaryLabel: 'Plan Engagement Session',
    secondaryHref: '/services/concierge-services',
    secondaryLabel: 'Compare Concierge',
  },
  concierge: {
    intent: 'For high-stakes proposals or engagement moments where timing, privacy, and setup matter.',
    proof: 'Request examples that show reveal coverage, location planning, decor support, and post-proposal portraits.',
    process: 'Planning call, location/privacy map, decor or vendor coordination, run-of-show, coverage, and gallery handoff.',
    pricing: 'Concierge services are custom quoted because location access, decor, video, and timing change the scope.',
    objection: 'Worried the surprise will feel stressful? The point is to make the logistics quiet and the moment calm.',
    primaryHref: '/book-consultation?service=concierge',
    primaryLabel: 'Book Concierge Call',
    secondaryHref: '/request-portfolio?service=concierge',
    secondaryLabel: 'Request Proposal Examples',
  },
  event: {
    intent: 'For event hosts who need guest, detail, speaker, sponsor, and candid coverage without interrupting the flow.',
    proof: 'Ask for event examples that show crowd coverage, fast highlights, low-light work, and useful marketing images.',
    process: 'Review run-of-show, priority moments, VIPs, branding needs, coverage windows, highlight delivery, and full gallery delivery.',
    pricing: 'Event coverage starts at $600 and scales by hours, complexity, delivery speed, and usage needs.',
    objection: 'Concerned the event will move too fast? Two photographers create broader coverage without slowing guests down.',
    primaryHref: '/book-consultation?service=event',
    primaryLabel: 'Plan Event Coverage',
    secondaryHref: '/request-portfolio?service=event',
    secondaryLabel: 'Request Event Proof',
  },
  commercial: {
    intent: 'For businesses that need practical image libraries for websites, ads, teams, products, and social content.',
    proof: 'Request commercial samples by use case: team, product, workplace, campaign, web refresh, or launch.',
    process: 'Define usage, shot list, locations, licensing, delivery needs, and content priorities before shoot day.',
    pricing: 'Commercial sessions start at $500; usage, turnaround, and production complexity determine final scope.',
    objection: 'Not sure what to shoot? We plan around business outcomes, not just attractive images.',
    primaryHref: '/book-consultation?service=commercial',
    primaryLabel: 'Plan Commercial Shoot',
    secondaryHref: '/request-portfolio?service=commercial',
    secondaryLabel: 'Request Sample Set',
  },
  branding: {
    intent: 'For businesses that need strategy, content, pages, SEO, ads, and social execution working together.',
    proof: 'Review brand content examples and campaign assets by channel, offer, and buyer journey.',
    process: 'Map goals, audit the offer, plan content, build pages or campaigns, launch, measure, and iterate.',
    pricing: 'Branding and marketing scopes are custom because production, SEO, PPC, and management needs vary widely.',
    objection: 'If you need more than photos, this path connects visuals to measurable marketing execution.',
    primaryHref: '/book-consultation?service=branding',
    primaryLabel: 'Discuss Growth Plan',
    secondaryHref: '/services/commercial-photography',
    secondaryLabel: 'Compare Commercial Photo',
  },
}

export default function ServiceIntentPanel({ service }: { service: ServiceKey }) {
  const item = serviceIntent[service]

  return (
    <section className="border-b border-stone-200 bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-4 rounded-lg border border-stone-200 bg-stone-50 p-5 md:grid-cols-5">
          {[
            ['Best Fit', item.intent],
            ['Proof', item.proof],
            ['Process', item.process],
            ['Pricing', item.pricing],
            ['Common Concern', item.objection],
          ].map(([label, copy]) => (
            <div key={label} className="rounded-lg bg-white p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-amber-800">
                <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
                {label}
              </div>
              <p className="mt-2 text-sm leading-6 text-stone-700">{copy}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href={item.primaryHref} className="btn-primary inline-flex items-center">
            {item.primaryLabel} <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href={item.secondaryHref} className="btn-secondary inline-flex items-center">
            {item.secondaryLabel}
          </Link>
        </div>
      </div>
    </section>
  )
}
