import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'
import { TurnaroundExpectationsSection, ServiceTestimonialsSection } from '@/components/PublicFeatureContent'

export const metadata = generateSEOMetadata({
  title: 'Mini Sessions in Pinehurst TX | Studio37',
  description: 'Seasonal mini sessions in Pinehurst, TX for families, couples, seniors, and quick portrait updates. Studio37 mini sessions start at $350.',
  canonicalUrl: 'https://www.studio37.cc/mini-sessions',
  pageType: 'service',
})

export const revalidate = 86400

const miniFits = ['Family updates', 'Holiday cards', 'Couples portraits', 'Senior add-ons', 'Professional profile refreshes']

export default function MiniSessionsPage() {
  const serviceSchema = generateServiceSchema(
    'Mini Sessions',
    'Seasonal mini sessions in Pinehurst, Texas for families, couples, seniors, and quick portrait updates.'
  )

  return (
    <main className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <section className="relative min-h-[520px] overflow-hidden bg-stone-950 text-white">
        <Image
          src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1769255559/PS379799_ayoxbp.jpg"
          alt="Studio37 mini session portrait in Montgomery County"
          fill
          priority
          className="object-cover opacity-55"
        />
        <div className="relative z-10 container mx-auto flex min-h-[520px] items-center px-4">
          <div className="max-w-2xl">
            <p className="eyebrow-hero mb-3">Seasonal Portrait Offer</p>
            <h1 className="text-5xl font-bold">Mini Sessions</h1>
            <p className="mt-4 text-lg leading-8 text-stone-100">
              A short, polished portrait session for families, couples, seniors, and anyone who needs fresh images without a full-session timeline.
            </p>
            <p className="mt-4 text-sm font-semibold text-amber-100">Starting at $350 · 30 minutes · private gallery delivery</p>
            <Link href="/book-a-session?package=portrait_mini" className="btn-primary mt-8 inline-flex items-center">
              Book a Mini Session <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow mb-3">Best Fit</p>
            <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">Small session, finished-gallery quality</h2>
            <p className="mt-4 leading-7 text-stone-600">
              Mini sessions are built for focused goals: a handful of strong portraits, quick guidance, and a simple delivery experience.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {miniFits.map((fit) => (
              <div key={fit} className="flex items-center gap-2 rounded-lg border border-stone-200 bg-stone-50 p-4">
                <CheckCircle2 className="h-5 w-5 text-green-700" aria-hidden="true" />
                <span className="font-medium text-stone-800">{fit}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TurnaroundExpectationsSection service="portrait" />
      <ServiceTestimonialsSection service="portrait" />
    </main>
  )
}
