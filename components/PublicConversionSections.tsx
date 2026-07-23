import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle, Clock, Image as ImageIcon, MapPin, ShieldCheck, Star } from 'lucide-react'
import AvailabilityConfidence from '@/components/AvailabilityConfidence'
import CuratedRecentWork from '@/components/CuratedRecentWork'
import ServiceAreaMarketModules from '@/components/ServiceAreaMarketModules'

const galleryUrl = '/request-portfolio'

export function PublicTrustStrip() {
  const items = [
    { icon: Star, label: '500+ sessions and local reviews' },
    { icon: Clock, label: 'Clear previews and delivery timelines' },
    { icon: ShieldCheck, label: 'PPA member, insured, and prepared' },
    { icon: MapPin, label: 'Two photographers across Greater Houston' },
  ]

  return (
    <section className="border-y border-stone-200 bg-white">
      <div className="container mx-auto grid gap-3 px-4 py-5 sm:grid-cols-2 lg:grid-cols-4">
        {items.map(({ icon: Icon, label }) => (
          <div key={label} className="flex items-center gap-3 rounded-lg bg-stone-50 px-4 py-3">
            <Icon className="h-5 w-5 flex-shrink-0 text-amber-700" aria-hidden="true" />
            <span className="text-sm font-medium text-stone-800">{label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}

export function WhatHappensNextSection({ serviceName = 'session' }: { serviceName?: string }) {
  const steps = [
    { title: 'Tell us the goal', description: 'Share the service, city, date, and must-have images so we can recommend the right path.' },
    { title: 'Get a guided plan', description: 'We confirm package fit, timing, locations, and any prep details before you commit.' },
    { title: 'Shoot with confidence', description: 'Our duo coverage keeps the day calm while capturing wide story moments and close details.' },
    { title: 'Receive the gallery', description: 'Your polished gallery arrives with download, sharing, and print options built in.' },
  ]

  return (
    <section className="bg-stone-50 py-14 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          <p className="eyebrow mb-3">What Happens Next</p>
          <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">A simple path from inquiry to final gallery</h2>
          <p className="mt-4 text-lg text-stone-600">
            After you reach out, we turn your {serviceName.toLowerCase()} idea into a clear plan, then guide every step.
          </p>
        </div>
        <div className="mt-10 grid gap-4 md:grid-cols-4">
          {steps.map((step, index) => (
            <div key={step.title} className="rounded-lg border border-stone-200 bg-white p-5">
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-800">
                {index + 1}
              </div>
              <h3 className="font-semibold text-stone-950">{step.title}</h3>
              <p className="mt-2 text-sm leading-6 text-stone-600">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/book-a-session" className="btn-primary inline-flex items-center">
            Start Booking <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
          <Link href="/tools/pricing" className="btn-secondary inline-flex items-center">
            Compare Pricing
          </Link>
        </div>
        <AvailabilityConfidence />
      </div>
    </section>
  )
}

export function PackageComparisonSection() {
  const packages = [
    { name: 'Portraits', price: 'from $350', fit: 'Families, seniors, headshots, maternity', delivery: 'Fast gallery delivery' },
    { name: 'Events', price: 'from $600', fit: 'Parties, corporate events, graduations', delivery: '48 hour highlights' },
    { name: 'Weddings', price: 'from $1,200', fit: 'Elopements through full-day coverage', delivery: 'Sneak peeks + full gallery' },
    { name: 'Commercial', price: 'from $500', fit: 'Brand, product, workplace, campaign content', delivery: 'Fast-track options' },
  ]

  return (
    <section className="bg-white py-14 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="eyebrow mb-3">Package Fit</p>
            <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">Quick package comparison</h2>
            <p className="mt-3 max-w-2xl text-stone-600">
              Compare the common starting points, then use the pricing tool or consultation to fine-tune coverage.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/tools/package-recommender" className="btn-primary inline-flex w-fit items-center">
              Find My Package <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
            <Link href="/tools/pricing" className="btn-secondary inline-flex w-fit items-center">
              Open Pricing Tool
            </Link>
          </div>
        </div>
        <div className="grid gap-4 lg:grid-cols-4">
          {packages.map((pkg) => (
            <div key={pkg.name} className="rounded-lg border border-stone-200 bg-stone-50 p-5">
              <h3 className="text-lg font-semibold text-stone-950">{pkg.name}</h3>
              <p className="mt-2 text-2xl font-bold text-amber-800">{pkg.price}</p>
              <p className="mt-3 text-sm leading-6 text-stone-600">{pkg.fit}</p>
              <p className="mt-4 flex items-center gap-2 text-sm font-medium text-stone-800">
                <CheckCircle className="h-4 w-4 text-green-600" aria-hidden="true" />
                {pkg.delivery}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-sm leading-6 text-stone-500">
          Starting prices are planning anchors. Use the{' '}
          <Link href="/tools/pricing" className="font-semibold text-amber-800 hover:text-amber-900">
            pricing tool
          </Link>{' '}
          for minute-based estimates or the{' '}
          <Link href="/tools/package-recommender" className="font-semibold text-amber-800 hover:text-amber-900">
            package recommender
          </Link>{' '}
          when you want the best-fit path.
        </p>
      </div>
    </section>
  )
}

export function PackageRecommenderCTA() {
  return (
    <section className="border-b border-stone-200 bg-amber-50">
      <div className="container mx-auto flex flex-col gap-4 px-4 py-6 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-amber-800">Not sure where to start?</p>
          <h2 className="mt-1 text-2xl font-bold text-stone-950">Get a package recommendation in under a minute</h2>
        </div>
        <Link href="/tools/package-recommender" className="btn-primary inline-flex w-fit items-center">
          Find My Package <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
        </Link>
      </div>
    </section>
  )
}

export function PortfolioProofSection({
  serviceName = 'portfolio',
  ctaLabel = 'Request Tailored Portfolio',
  title = 'See the finished-gallery standard before you book',
  body,
}: {
  serviceName?: string
  ctaLabel?: string
  title?: string
  body?: string
}) {
  const images = [
    {
      src: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1778033155/KELLY_-_1_11_wgadni.jpg',
      alt: `Studio37 finished ${serviceName} gallery highlight with warm editorial editing`,
    },
    {
      src: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1778033088/PS379444_2_1_pge2hl.jpg',
      alt: `Studio37 ${serviceName} portrait proof showing polished final delivery`,
    },
    {
      src: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1778033152/IMG_4582_1_lmosd6.jpg',
      alt: `Studio37 ${serviceName} gallery image with candid storytelling detail`,
    },
  ]

  return (
    <section className="bg-stone-950 py-14 text-white md:py-16">
      <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
        <div>
          <p className="eyebrow-hero mb-3">Portfolio Proof</p>
          <h2 className="text-3xl font-bold md:text-4xl">{title}</h2>
          <p className="mt-4 text-lg leading-8 text-stone-300">
            {body || `Browse recent ${serviceName.toLowerCase()} work, full-session variety, and the polished delivery style clients receive after every session.`}
          </p>
          <div className="mt-6 flex flex-wrap gap-3 text-sm text-stone-200">
            <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2">Weddings</span>
            <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2">Portraits</span>
            <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2">Events</span>
            <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2">Commercial</span>
          </div>
          <Link href={galleryUrl} className="btn-primary mt-8 inline-flex items-center">
            {ctaLabel} <ImageIcon className="ml-2 h-4 w-4" aria-hidden="true" />
          </Link>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {images.map((image, index) => (
            <div key={image.src} className={`relative overflow-hidden rounded-lg bg-gradient-to-br from-stone-800 to-stone-700 ${index === 0 ? 'col-span-2 row-span-2 aspect-square' : 'aspect-square'}`}>
              <Image src={image.src} alt={image.alt} fill className="object-cover" sizes="(min-width: 1024px) 25vw, 50vw" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function PublicConversionStack({
  serviceName,
  proofCtaLabel,
  proofTitle,
  proofBody,
}: {
  serviceName?: string
  proofCtaLabel?: string
  proofTitle?: string
  proofBody?: string
}) {
  return (
    <>
      <PackageComparisonSection />
      <CuratedRecentWork className="py-14 md:py-16" />
      <PortfolioProofSection
        serviceName={serviceName || 'Studio37'}
        ctaLabel={proofCtaLabel}
        title={proofTitle}
        body={proofBody}
      />
      <ServiceAreaMarketModules compact />
      <WhatHappensNextSection serviceName={serviceName || 'session'} />
    </>
  )
}
