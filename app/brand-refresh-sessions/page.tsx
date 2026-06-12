import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { ServiceTestimonialsSection, TurnaroundExpectationsSection } from '@/components/PublicFeatureContent'

export const metadata = generateSEOMetadata({
  title: 'Brand Refresh Photography Sessions | Studio37',
  description: 'Brand refresh sessions for businesses that need fresh website, social, profile, product, and campaign photography in Pinehurst and Greater Houston.',
  canonicalUrl: 'https://www.studio37.cc/brand-refresh-sessions',
  pageType: 'service',
})

export const revalidate = 86400

const deliverables = ['Website hero images', 'Team and founder portraits', 'Social content library', 'Product or workspace details', 'Campaign-ready brand visuals']

export default function BrandRefreshSessionsPage() {
  return (
    <main className="pt-16">
      <section className="relative min-h-[520px] overflow-hidden bg-stone-950 text-white">
        <Image
          src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1769255703/PS373409_pwmxmp.jpg"
          alt="Studio37 brand refresh photography session for a business"
          fill
          priority
          className="object-cover opacity-55"
        />
        <div className="relative z-10 container mx-auto flex min-h-[520px] items-center px-4">
          <div className="max-w-2xl">
            <p className="eyebrow-hero mb-3">Seasonal Business Content</p>
            <h1 className="text-5xl font-bold">Brand Refresh Sessions</h1>
            <p className="mt-4 text-lg leading-8 text-stone-100">
              A practical content refresh for businesses that need updated imagery for websites, ads, listings, social media, and sales materials.
            </p>
            <p className="mt-4 text-sm font-semibold text-amber-100">Starting at $500 · commercial usage included · fast-track options available</p>
            <Link href="/book-a-session?package=commercial_express" className="btn-primary mt-8 inline-flex items-center">
              Plan a Brand Refresh <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container mx-auto grid gap-8 px-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <p className="eyebrow mb-3">Content Library</p>
            <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">Refresh the places customers decide to trust you</h2>
            <p className="mt-4 leading-7 text-stone-600">
              We plan the session around your highest-value channels so the gallery is useful immediately, not just pretty.
            </p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {deliverables.map((item) => (
              <div key={item} className="flex items-center gap-2 rounded-lg border border-stone-200 bg-stone-50 p-4">
                <CheckCircle2 className="h-5 w-5 text-green-700" aria-hidden="true" />
                <span className="font-medium text-stone-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TurnaroundExpectationsSection service="commercial" />
      <ServiceTestimonialsSection service="commercial" />
    </main>
  )
}
