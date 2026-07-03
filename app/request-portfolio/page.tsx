import PortfolioRequestForm from '@/components/PortfolioRequestForm'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Request Private Complete Galleries | Studio37',
  description: 'Request private complete galleries or tailored proof sets for your wedding, portrait, engagement, event, commercial, or brand photography project.',
  canonicalUrl: 'https://www.studio37.cc/request-portfolio',
  pageType: 'service',
})

export const revalidate = 86400

export default function RequestPortfolioPage() {
  return (
    <main className="min-h-screen bg-stone-50 pt-20">
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
    </main>
  )
}
