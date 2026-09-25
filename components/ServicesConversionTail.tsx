'use client'

import { useState } from 'react'
import { useSelectedLayoutSegment } from 'next/navigation'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Globe, Megaphone, Search, Target, TrendingUp, Video } from 'lucide-react'
import { ConversionStackTail, PackageComparisonSection } from '@/components/PublicConversionSections'
import ServiceExpectationCards from '@/components/ServiceExpectationCards'
import { brandingMarketingServices } from '@/lib/branding-marketing-services'

const serviceCopy: Record<string, { serviceName: string; proofCtaLabel?: string; proofTitle?: string; proofBody?: string }> = {
  'branding-marketing': {
    serviceName: 'branding and marketing',
    proofCtaLabel: 'Request a demo',
    proofTitle: 'See how a custom website and content system could work for your business',
    proofBody:
      'Request a walkthrough of business-focused website, content, SEO, and campaign examples so you can see what a custom Studio37 build can include.',
  },
  'commercial-photography': { serviceName: 'commercial photography' },
  'event-photography': { serviceName: 'event photography' },
  'portrait-photography': { serviceName: 'portrait photography' },
  'wedding-photography': { serviceName: 'wedding photography' },
  'engagement-session': { serviceName: 'engagement photography' },
  'concierge-services': { serviceName: 'concierge services' },
}

export default function ServicesConversionTail() {
  const segment = useSelectedLayoutSegment()
  const [mobileExpanded, setMobileExpanded] = useState(false)
  const copy = serviceCopy[segment || ''] || { serviceName: 'photography' }

  if (segment === 'branding-marketing') {
    return <BrandingMarketingConversionTail mobileExpanded={mobileExpanded} setMobileExpanded={setMobileExpanded} />
  }

  return (
    <>
      <div className="md:hidden border-t border-stone-200 bg-stone-50 px-4 py-6">
        <button
          type="button"
          onClick={() => setMobileExpanded((value) => !value)}
          className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-left text-sm font-semibold text-stone-900 shadow-sm"
        >
          {mobileExpanded ? 'Hide planning proof and next steps' : 'Show planning proof and next steps'}
        </button>
        {mobileExpanded && (
          <div className="mt-6 space-y-8">
            <PackageComparisonSection />
            <ServiceExpectationCards serviceName={copy.serviceName} />
            <ConversionStackTail
              serviceName={copy.serviceName}
              proofCtaLabel={copy.proofCtaLabel}
              proofTitle={copy.proofTitle}
              proofBody={copy.proofBody}
            />
          </div>
        )}
      </div>
      <div className="hidden md:block">
        <PackageComparisonSection />
        <ServiceExpectationCards serviceName={copy.serviceName} />
        <ConversionStackTail
          serviceName={copy.serviceName}
          proofCtaLabel={copy.proofCtaLabel}
          proofTitle={copy.proofTitle}
          proofBody={copy.proofBody}
        />
      </div>
    </>
  )
}

function BrandingMarketingConversionTail({
  mobileExpanded,
  setMobileExpanded,
}: {
  mobileExpanded: boolean
  setMobileExpanded: (value: boolean | ((value: boolean) => boolean)) => void
}) {
  return (
    <>
      <div className="md:hidden border-t border-stone-200 bg-stone-50 px-4 py-6">
        <button
          type="button"
          onClick={() => setMobileExpanded((value) => !value)}
          className="w-full rounded-lg border border-stone-300 bg-white px-4 py-3 text-left text-sm font-semibold text-stone-900 shadow-sm"
        >
          {mobileExpanded ? 'Hide growth paths and next steps' : 'Show growth paths and next steps'}
        </button>
        {mobileExpanded && (
          <div className="mt-6 space-y-8">
            <BrandingSubServiceSection compact />
            <BrandingNextStepsSection />
          </div>
        )}
      </div>
      <div className="hidden md:block">
        <BrandingSubServiceSection />
        <BrandingNextStepsSection />
      </div>
    </>
  )
}

function BrandingSubServiceSection({ compact = false }: { compact?: boolean }) {
  const icons = [Globe, Search, Target, TrendingUp, Megaphone, Video]

  return (
    <section className={`${compact ? '' : 'border-y border-stone-200'} bg-white py-12 md:py-14`}>
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3">Growth Paths</p>
            <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">Focused services under the branding and marketing umbrella</h2>
            <p className="mt-3 max-w-2xl text-stone-600">
              Start with the specific growth problem, then connect content, website, search, ads, and social when the strategy calls for it.
            </p>
          </div>
          <Link href="/book-consultation?service=branding" className="btn-primary inline-flex w-fit items-center">
            Discuss Growth Plan <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {brandingMarketingServices.map((service, index) => {
            const Icon = icons[index] || Megaphone
            return (
              <Link
                key={service.slug}
                href={`/services/branding-marketing/${service.slug}`}
                className="rounded-lg border border-stone-200 bg-stone-50 p-5 transition hover:-translate-y-0.5 hover:border-primary-200 hover:bg-white"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-700">
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-stone-950">{service.shortTitle}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">{service.description}</p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary-700">
                  View details <ArrowRight className="ml-1.5 h-4 w-4" aria-hidden="true" />
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}

function BrandingNextStepsSection() {
  const steps = [
    ['Audit the current state', 'Review your website, offer, channels, content gaps, and lead path.'],
    ['Choose the first priority', 'Decide whether the next move is site structure, SEO, paid traffic, content, or social consistency.'],
    ['Build the system', 'Create the pages, assets, campaigns, tracking, and workflows needed for the plan.'],
    ['Measure and improve', 'Use performance signals to refine weak points and expand what is working.'],
  ]

  return (
    <section className="bg-stone-950 py-12 text-white md:py-14">
      <div className="container mx-auto px-4">
        <div className="mb-8 grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="eyebrow-hero mb-3">What Happens Next</p>
            <h2 className="text-3xl font-bold md:text-4xl">A business-first path from consultation to execution</h2>
          </div>
          <p className="text-stone-300">
            The goal is not to sell a random tactic. It is to identify the first growth bottleneck, fix it cleanly, and build from there.
          </p>
        </div>
        <div className="grid gap-3 md:grid-cols-4">
          {steps.map(([title, copy], index) => (
            <div key={title} className="rounded-lg border border-white/10 bg-white/10 p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-white text-sm font-bold text-stone-950">
                {index + 1}
              </div>
              <h3 className="font-semibold text-white">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-300">{copy}</p>
            </div>
          ))}
        </div>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link href="/book-consultation?service=branding" className="btn-primary inline-flex items-center justify-center">
            Book a Consultation <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/request-portfolio?service=website-demo" className="btn-ghost inline-flex items-center justify-center">
            Request a Demo
          </Link>
        </div>
        <div className="mt-8 grid gap-3 md:grid-cols-3">
          {['Custom scope', 'Clear ownership', 'Performance-minded follow-through'].map((item) => (
            <div key={item} className="flex items-center gap-3 rounded-lg border border-white/10 bg-white/10 px-4 py-3">
              <CheckCircle className="h-5 w-5 text-green-300" aria-hidden="true" />
              <span className="text-sm font-medium text-stone-100">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
