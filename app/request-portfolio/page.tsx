import PortfolioRequestForm from '@/components/PortfolioRequestForm'
import { generateFAQSchema, generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Request Private Complete Galleries | Studio37',
  description: 'Request private complete galleries or tailored proof sets for your wedding, portrait, engagement, event, commercial, or brand photography project.',
  canonicalUrl: 'https://www.studio37.cc/request-portfolio',
  pageType: 'service',
})

export const revalidate = 86400

const faqSchema = generateFAQSchema([
  {
    question: 'Why are complete galleries shared privately?',
    answer: 'Studio37 keeps the public gallery curated and sends complete galleries privately so clients can review examples that match their service, location, lighting, and decision criteria.',
  },
  {
    question: 'How quickly will Studio37 respond to a portfolio request?',
    answer: 'Most portfolio requests receive a tailored response within one business day, with the most relevant proof set or a quick follow-up question if more context is needed.',
  },
  {
    question: 'What kind of examples can I request?',
    answer: 'You can request wedding, engagement, portrait, event, commercial, branding, venue-specific, lighting-specific, or location-specific galleries and proof sets.',
  },
])

export default function RequestPortfolioPage() {
  return (
    <main className="min-h-screen bg-stone-50 pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="bg-stone-950 py-16 text-white md:py-20">
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <p className="eyebrow-hero mb-4">Portfolio Request</p>
          <h1 className="text-4xl font-bold leading-tight md:text-6xl">Request private galleries that match your project.</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-stone-200">
            The public gallery is a curated best-of preview. Tell us what you are planning and we will privately send complete galleries or a tailored portfolio that fits your service, location, timing, and decision criteria.
          </p>
        </div>
      </section>
      <section className="section-shell">
        <div className="container mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
          <div>
            <p className="eyebrow mb-3">What we will send</p>
            <h2 className="text-3xl font-bold text-stone-950">A useful proof set, not a random gallery dump.</h2>
            <ul className="mt-5 space-y-3 text-stone-700">
              <li>Complete galleries when you need to inspect consistency from start to finish.</li>
              <li>Tailored examples by service, venue style, lighting, location, or project goal.</li>
              <li>Context on delivery expectations, editing style, and which package usually fits.</li>
            </ul>
          </div>
          <PortfolioRequestForm />
        </div>
      </section>
      <section className="section-shell bg-white">
        <div className="container mx-auto max-w-5xl px-4">
          <p className="eyebrow mb-3">How It Works</p>
          <h2 className="text-3xl font-bold text-stone-950">Private proof without the guesswork.</h2>
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {[
              ['Tell us what you are comparing', 'Share the service, location, style, timing, and what would make you feel confident.'],
              ['We choose the right examples', 'We send featured work, complete galleries, or a tailored proof set that matches your project.'],
              ['You get clear next steps', 'We include context on delivery expectations, package fit, and whether a consult would help.'],
            ].map(([title, copy]) => (
              <div key={title} className="rounded-lg border border-stone-200 bg-stone-50 p-5">
                <h3 className="font-semibold text-stone-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">{copy}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  )
}
