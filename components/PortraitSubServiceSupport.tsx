import Link from 'next/link'

type PortraitSubServiceSupportProps = {
  service: string
  proof: string[]
  planning: string[]
  objection: string
  packageHref?: string
  parentHref?: string
  parentLabel?: string
}

export default function PortraitSubServiceSupport({
  service,
  proof,
  planning,
  objection,
  packageHref = '/tools/package-recommender',
  parentHref = '/services/portrait-photography',
  parentLabel = 'portrait services',
}: PortraitSubServiceSupportProps) {
  return (
    <section className="section-shell bg-white">
      <div className="container mx-auto px-4">
        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="surface-panel p-6 md:p-8">
            <p className="eyebrow mb-3">Studio37 Process</p>
            <h2 className="text-3xl font-bold text-stone-950">A clearer plan before the camera comes out</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {planning.map((item) => (
                <div key={item} className="rounded-lg border border-stone-200 bg-stone-50 p-4 text-sm text-stone-700">
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-6 text-stone-700">{objection}</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
              <Link href={`/book-consultation?service=${encodeURIComponent(service)}`} className="btn-primary text-center">
                Book Consultation
              </Link>
              <Link href={packageHref} className="btn-secondary text-center">
                Compare Pricing
              </Link>
              <Link href={`/request-portfolio?service=${encodeURIComponent(service)}`} className="btn-secondary text-center">
                Request Tailored Portfolio
              </Link>
              <Link href="/contact" className="btn-ghost text-center">
                Contact Studio37
              </Link>
            </div>
          </div>

          <aside className="surface-panel p-6 md:p-8">
            <p className="eyebrow mb-3">Proof to Request</p>
            <h3 className="text-2xl font-bold text-stone-950">Ask for examples that match your session</h3>
            <ul className="mt-5 space-y-3 text-sm text-stone-700">
              {proof.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-2 h-2 w-2 flex-none rounded-full bg-primary-600" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <Link href={parentHref} className="mt-6 inline-flex text-sm font-semibold text-primary-700 hover:underline">
              Back to {parentLabel}
            </Link>
          </aside>
        </div>
      </div>
    </section>
  )
}
