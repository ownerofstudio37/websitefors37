'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowRight, Check, Star } from 'lucide-react'

// ─── Service Data ────────────────────────────────────────────────────────────

type ServiceDef = {
  id: string
  quizId: string | string[]
  category: string
  name: string
  tagline: string
  startingAt: string
  startingNote: string
  bestFor: string
  features: string[]
  href: string
  bookHref: string
  ring: string
  badge: string
  priceBg: string
}

const SERVICES: ServiceDef[] = [
  {
    id: 'wedding',
    quizId: 'wedding',
    category: 'Weddings',
    name: 'Wedding Photography',
    tagline: 'Your day, covered by two professionals.',
    startingAt: '$1,200',
    startingNote: 'elopement packages',
    bestFor: 'Ceremonies, elopements & full wedding days',
    features: [
      'Duo Experience: 2 photographers on every package',
      '150–700+ edited photos depending on package',
      '48-hr sneak peek + private digital gallery',
    ],
    href: '/services/wedding-photography',
    bookHref: '/book-consultation?service=wedding',
    ring: 'ring-amber-400',
    badge: 'bg-amber-100 text-amber-700',
    priceBg: 'bg-amber-50',
  },
  {
    id: 'portrait',
    quizId: 'portrait',
    category: 'Portraits',
    name: 'Portrait Photography',
    tagline: 'Timeless portraits for every season of life.',
    startingAt: '$350',
    startingNote: 'mini session',
    bestFor: 'Families, seniors, maternity & personal sessions',
    features: [
      'Mini, standard & extended session options',
      '2-week gallery delivery, 24-hr sneak peek add-on',
      'Two-photographer coverage at every session',
    ],
    href: '/services/portrait-photography',
    bookHref: '/book-consultation?service=portrait',
    ring: 'ring-rose-400',
    badge: 'bg-rose-100 text-rose-700',
    priceBg: 'bg-rose-50',
  },
  {
    id: 'event',
    quizId: 'event',
    category: 'Events',
    name: 'Event Photography',
    tagline: 'Every moment captured, start to finish.',
    startingAt: '$600',
    startingNote: '2-hour coverage',
    bestFor: 'Corporate events, parties, graduations & milestones',
    features: [
      '2–8 hour flexible coverage options',
      'Candid + posed coverage throughout',
      'Fast gallery delivery',
    ],
    href: '/services/event-photography',
    bookHref: '/book-consultation?service=event',
    ring: 'ring-blue-400',
    badge: 'bg-blue-100 text-blue-700',
    priceBg: 'bg-blue-50',
  },
  {
    id: 'commercial',
    quizId: ['commercial', 'branding'],
    category: 'Commercial',
    name: 'Commercial Photography',
    tagline: 'Marketing-ready imagery for your brand.',
    startingAt: '$500',
    startingNote: '1-hour session',
    bestFor: 'Products, headshots & brand content creation',
    features: [
      '15–75+ edited images with commercial license',
      '48-hr Fast-Track delivery available',
      'Web, print, social & ad-ready formats included',
    ],
    href: '/services/commercial-photography',
    bookHref: '/book-consultation?service=commercial',
    ring: 'ring-emerald-400',
    badge: 'bg-emerald-100 text-emerald-700',
    priceBg: 'bg-emerald-50',
  },
  {
    id: 'branding',
    quizId: ['commercial', 'branding'],
    category: 'Branding',
    name: 'Branding & Marketing',
    tagline: 'A full visual identity, built for growth.',
    startingAt: 'Custom',
    startingNote: 'tailored to your scope',
    bestFor: 'Entrepreneurs, small businesses & rebrands',
    features: [
      'Brand strategy + visual art direction',
      'Lifestyle, product & team photography',
      'Ready-to-post social, ad & web assets',
    ],
    href: '/services/branding-marketing',
    bookHref: '/book-consultation?service=branding',
    ring: 'ring-purple-400',
    badge: 'bg-purple-100 text-purple-700',
    priceBg: 'bg-purple-50',
  },
]

// ─── Quiz Options ─────────────────────────────────────────────────────────────

const QUIZ_OPTIONS = [
  { label: 'Wedding or Ceremony', emoji: '💍', match: 'wedding' },
  { label: 'Family & Portraits', emoji: '📸', match: 'portrait' },
  { label: 'Event or Party', emoji: '🎉', match: 'event' },
  { label: 'Business & Brand', emoji: '💼', match: 'branding' },
]

// ─── Helpers ─────────────────────────────────────────────────────────────────

function isMatch(service: ServiceDef, selected: string | null): boolean {
  if (!selected) return false
  return Array.isArray(service.quizId)
    ? service.quizId.includes(selected)
    : service.quizId === selected
}

// ─── Component ───────────────────────────────────────────────────────────────

export default function ServiceComparePage() {
  const [selected, setSelected] = useState<string | null>(null)
  const recommendedRef = React.useRef<HTMLDivElement>(null)

  // Smooth-scroll to the recommended card when selection changes
  useEffect(() => {
    if (selected && recommendedRef.current) {
      recommendedRef.current.scrollIntoView({ behavior: 'smooth', block: 'nearest' })
    }
  }, [selected])

  const recommended = selected ? SERVICES.find((s) => isMatch(s, selected)) ?? null : null

  return (
    <main>
      {/* Trust banner */}
      <div className="bg-stone-950 text-white py-3 px-4 text-center text-sm">
        <span className="text-amber-400 mr-2" aria-hidden>⭐⭐⭐⭐⭐</span>
        <strong>5.0 Google Stars</strong>
        <span className="text-stone-400 mx-2">·</span>
        15 verified reviews
        <span className="text-stone-400 mx-2">·</span>
        Pinehurst, TX
        <span className="text-stone-400 mx-2">·</span>
        Two photographers on every session
      </div>

      {/* Hero */}
      <section className="bg-white py-16 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="eyebrow mb-4">Find Your Package</div>
          <h1 className="text-4xl md:text-5xl font-bold text-stone-900 mb-5">
            Which Studio37 package is right for you?
          </h1>
          <p className="text-lg text-stone-600 max-w-xl mx-auto">
            Answer one question below and we&apos;ll highlight your best match — or scroll to compare all services side by side.
          </p>
        </div>
      </section>

      {/* Quiz */}
      <section className="bg-stone-50 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-xl font-semibold text-stone-800 text-center mb-8">
            What are you looking to photograph?
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {QUIZ_OPTIONS.map((opt) => {
              const active = selected === opt.match
              return (
                <button
                  key={opt.match}
                  onClick={() => setSelected(active ? null : opt.match)}
                  aria-pressed={active}
                  className={`group flex flex-col items-center gap-3 p-5 rounded-2xl border-2 transition-all text-center ${
                    active
                      ? 'border-amber-400 bg-amber-50 shadow-md'
                      : 'border-stone-200 bg-white hover:border-amber-300 hover:shadow-sm'
                  }`}
                >
                  <span className="text-3xl" aria-hidden>{opt.emoji}</span>
                  <span className={`text-sm font-semibold ${active ? 'text-amber-700' : 'text-stone-700'}`}>
                    {opt.label}
                  </span>
                  {active && (
                    <span className="text-xs text-amber-600 font-medium">✓ Selected</span>
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {/* Recommendation callout */}
      {recommended && (
        <section className="bg-amber-50 border-y border-amber-200 py-8 px-4">
          <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-amber-600 mb-1">
                Our recommendation for you
              </p>
              <h3 className="text-2xl font-bold text-stone-900 mb-1">{recommended.name}</h3>
              <p className="text-stone-600">{recommended.bestFor}</p>
              <p className="mt-2 text-xl font-bold text-stone-900">
                Starting at{' '}
                <span className="text-amber-600">{recommended.startingAt}</span>
                <span className="text-sm font-normal text-stone-500 ml-2">({recommended.startingNote})</span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Link href={recommended.href} className="btn-secondary whitespace-nowrap">
                Explore Package
              </Link>
              <Link href={recommended.bookHref} className="btn-primary whitespace-nowrap flex items-center gap-2">
                Book a Consultation <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Comparison grid */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-10">
            <div className="eyebrow mb-3">All Services</div>
            <h2 className="text-3xl font-bold text-stone-900">Compare every package</h2>
            <p className="text-stone-500 mt-3 max-w-xl mx-auto">
              Every Studio37 service includes two photographers, professional editing, and a private digital gallery.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {SERVICES.map((svc) => {
              const matched = isMatch(svc, selected)
              return (
                <div
                  key={svc.id}
                  ref={matched ? recommendedRef : undefined}
                  className={`relative flex flex-col rounded-2xl border-2 overflow-hidden transition-all duration-200 ${
                    matched
                      ? `border-amber-400 shadow-xl ring-4 ring-amber-100`
                      : selected
                      ? 'border-stone-200 opacity-60'
                      : 'border-stone-200 hover:border-stone-300 hover:shadow-md'
                  }`}
                >
                  {matched && (
                    <div className="bg-amber-400 text-stone-900 text-xs font-bold text-center py-1.5 tracking-widest uppercase">
                      ★ Recommended for you
                    </div>
                  )}

                  <div className={`p-5 ${svc.priceBg}`}>
                    <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${svc.badge}`}>
                      {svc.category}
                    </span>
                    <h3 className="text-lg font-bold text-stone-900 mt-3 leading-tight">
                      {svc.name}
                    </h3>
                    <p className="text-sm text-stone-500 mt-1">{svc.tagline}</p>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div className="mb-4">
                      <p className="text-xs text-stone-500 uppercase tracking-widest">Starting at</p>
                      <p className="text-3xl font-bold text-stone-900">{svc.startingAt}</p>
                      <p className="text-xs text-stone-400 mt-0.5">{svc.startingNote}</p>
                    </div>

                    <p className="text-xs font-medium text-stone-500 mb-2 uppercase tracking-widest">
                      Best for
                    </p>
                    <p className="text-sm text-stone-700 mb-4">{svc.bestFor}</p>

                    <ul className="space-y-2 mb-5 flex-1">
                      {svc.features.map((f) => (
                        <li key={f} className="flex items-start gap-2 text-sm text-stone-600">
                          <Check className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                          {f}
                        </li>
                      ))}
                    </ul>

                    {/* Trust badge */}
                    <div className="flex items-center gap-1.5 mb-4 text-xs text-stone-500">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                      ))}
                      <span className="font-semibold text-stone-700 ml-1">5.0</span>
                      <span>· Google</span>
                    </div>

                    <div className="flex flex-col gap-2 mt-auto">
                      <Link
                        href={svc.bookHref}
                        className="btn-primary text-center text-sm py-2.5"
                      >
                        Book a Consultation
                      </Link>
                      <Link
                        href={svc.href}
                        className="btn-secondary text-center text-sm py-2.5"
                      >
                        Explore Package
                      </Link>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* All-inclusive strip */}
      <section className="bg-stone-950 text-white py-12 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-xl font-bold text-center mb-8">Every Studio37 session includes</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { icon: '👥', title: 'Duo Experience', sub: 'Two photographers on every session' },
              { icon: '⚡', title: '48-hr Sneak Peek', sub: 'First looks delivered in 48 hours' },
              { icon: '🖼️', title: 'Private Gallery', sub: 'Online gallery with download rights' },
              { icon: '⭐', title: '5.0 Google Stars', sub: '15 verified 5-star reviews' },
            ].map((item) => (
              <div key={item.title} className="flex flex-col items-center gap-2">
                <span className="text-3xl" aria-hidden>{item.icon}</span>
                <p className="font-semibold text-white text-sm">{item.title}</p>
                <p className="text-stone-400 text-xs">{item.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-white py-16 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-10">
            <div className="eyebrow mb-3">Common Questions</div>
            <h2 className="text-3xl font-bold text-stone-900">Still deciding?</h2>
          </div>
          <div className="space-y-6">
            {[
              {
                q: 'Can I mix services for the same event?',
                a: 'Absolutely. We commonly pair wedding coverage with separate portrait sessions, or combine commercial shoots with personal branding. We&apos;ll build a custom package that fits your needs.',
              },
              {
                q: 'Do all packages really include two photographers?',
                a: 'Yes — the Duo Experience is our standard across all services. Every session is covered by two trained photographers so you never miss a moment from a different angle.',
              },
              {
                q: 'How do I choose between Commercial and Branding?',
                a: 'Commercial is ideal for a focused shoot — product images, headshots, or marketing content for a specific campaign. Branding is a deeper engagement that includes strategy, lifestyle photography, and a complete visual identity package for your business.',
              },
              {
                q: 'How fast will I receive my photos?',
                a: 'Preview timing depends on the package and add-ons. Full galleries are typically delivered in about 3 weeks for portraits and events, with wedding timelines based on coverage scope. Rush delivery options are available.',
              },
            ].map((item) => (
              <details key={item.q} className="group rounded-xl border border-stone-200 overflow-hidden">
                <summary className="flex items-center justify-between cursor-pointer px-5 py-4 font-semibold text-stone-800 text-base hover:bg-stone-50 transition-colors list-none">
                  {item.q}
                  <span className="text-stone-400 group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="px-5 pb-5 pt-1 text-stone-600 leading-relaxed text-sm">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
          <div className="mt-10 text-center">
            <p className="text-stone-500 mb-4">Not sure yet? Let&apos;s talk it through.</p>
            <Link href="/book-consultation" className="btn-primary inline-flex items-center gap-2">
              Schedule a Free Consultation <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
