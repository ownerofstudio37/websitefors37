import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'
import { Camera, Calendar, Users, Clock, Star, CheckCircle, ArrowRight } from 'lucide-react'

export const metadata = generateSEOMetadata({
  title: 'Event Photography Pinehurst TX - Professional Event Photographer Studio37',
  description: 'Make your special event unforgettable! Corporate events, parties, celebrations captured with professional photography in Pinehurst, TX. Serving Montgomery County & Houston. Book today!',
  keywords: [
    'event photography Pinehurst TX',
    'corporate photographer Texas',
    'party photography Montgomery County',
    'event photographer The Woodlands',
    'celebration photography Pinehurst',
    'corporate events Texas',
    'professional event photography Montgomery County',
    'event photographer Houston area'
  ],
  canonicalUrl: 'https://www.studio37.cc/services/event-photography',
  pageType: 'service'
})

// Static marketing page; revalidate daily
export const revalidate = 86400

export default function EventPhotographyPage() {
  const serviceSchema = generateServiceSchema(
    'Event Photography',
    'Professional event photography services in Pinehurst, Texas. Capturing corporate events, celebrations, parties, and special occasions with style and professionalism.'
  )

  return (
    <div className="pt-16">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero Section */}
      <section className="relative h-[480px] bg-gradient-to-r from-green-900 to-blue-900">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=1200&h=600&fit=crop"
            alt="Event photography by Studio37 in Pinehurst TX"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <p className="eyebrow-hero mb-3">Signature Duo Coverage · Pinehurst, TX</p>
            <h1 className="text-5xl font-bold mb-4">Event Photography in Pinehurst, TX</h1>
            <p className="text-xl mb-3 text-white/90">
              Make your special event unforgettable with professional event photography. 
              From corporate functions to celebrations, we capture every important moment.
            </p>
            <p className="text-base mb-8 text-white/70">
              Event coverage starts at $600 with two photographers on every package.
            </p>
            <Link 
              href="/book-consultation" 
              className="btn-primary text-lg px-8 py-4 inline-flex items-center"
            >
              Book a Consultation <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="eyebrow mb-2">Coverage Types</p>
            <h2 className="text-3xl font-bold mb-4">Event Photography Services</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Professional photography coverage for all types of events and celebrations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/corporate-events" className="group surface-panel text-center p-6 transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-300">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-700">Corporate Events</h3>
              <p className="text-stone-600">
                Professional documentation of conferences, meetings, product launches, and corporate celebrations.
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary-600 group-hover:underline">View Corporate Events <ArrowRight className="h-4 w-4" /></span>
            </Link>
            
            <Link href="/birthday-party" className="group surface-panel text-center p-6 transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-300">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                <Calendar className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-700">Birthday Parties</h3>
              <p className="text-stone-600">
                Capture the joy and excitement of birthday celebrations with candid and posed photography.
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary-600 group-hover:underline">View Birthday Party Photography <ArrowRight className="h-4 w-4" /></span>
            </Link>
            
            <Link href="/graduation" className="group surface-panel text-center p-6 transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-300">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                <Camera className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-700">Graduations</h3>
              <p className="text-stone-600">
                Document this important milestone with professional graduation ceremony and party photography.
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary-600 group-hover:underline">View Graduation Photography <ArrowRight className="h-4 w-4" /></span>
            </Link>
            
            <Link href="/fundraiser" className="group surface-panel text-center p-6 transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-300">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-700">Fundraisers</h3>
              <p className="text-stone-600">
                Professional coverage of charity events, galas, and fundraising activities.
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary-600 group-hover:underline">View Fundraiser Photography <ArrowRight className="h-4 w-4" /></span>
            </Link>
            
            <Link href="/anniversary-party" className="group surface-panel text-center p-6 transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-300">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                <Calendar className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-700">Anniversary Parties</h3>
              <p className="text-stone-600">
                Celebrate love and commitment with beautiful anniversary party photography.
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary-600 group-hover:underline">View Anniversary Photography <ArrowRight className="h-4 w-4" /></span>
            </Link>
            
            <Link href="/holiday-party" className="group surface-panel text-center p-6 transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-300">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                <Camera className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-700">Holiday Parties</h3>
              <p className="text-stone-600">
                Capture the festive spirit of holiday celebrations and seasonal events.
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary-600 group-hover:underline">View Holiday Party Photography <ArrowRight className="h-4 w-4" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose Studio37 for Events?</h2>
              <p className="text-lg text-stone-600 mb-8">
                Based in Pinehurst, Texas, we understand the importance of capturing every significant moment 
                at your event. Our unobtrusive style ensures natural, authentic photos.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Unobtrusive Photography</h3>
                    <p className="text-stone-600">We blend into the background to capture natural moments</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Professional Equipment</h3>
                    <p className="text-stone-600">High-end cameras and lighting for any venue or condition</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Fast Delivery</h3>
                    <p className="text-stone-600">Receive your event photos within one week</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Flexible Packages</h3>
                    <p className="text-stone-600">Customizable coverage options to fit your event needs</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop"
                alt="Corporate event photography in Montgomery County TX"
                width={600}
                height={400}
                className="rounded-[var(--radius-card)] shadow-[var(--shadow-strong)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Event Photography Service Areas</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              We provide event photography services throughout Montgomery County and surrounding Texas areas
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              'Pinehurst, TX',
              'The Woodlands, TX', 
              'Montgomery, TX',
              'Spring, TX',
              'Tomball, TX',
              'Magnolia, TX',
              'Conroe, TX',
              'Houston, TX'
            ].map((area) => {
              const slug = area.startsWith('Pinehurst')
                ? '/local-photographer-pinehurst-tx'
                : area.startsWith('Magnolia')
                ? '/magnolia'
                : null

              return (
                <div key={area} className="surface-panel p-6 text-center">
                  {slug ? (
                    <Link href={slug} className="font-semibold text-stone-800 hover:text-primary-600">{area}</Link>
                  ) : (
                    <h3 className="font-semibold text-stone-800">{area}</h3>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="eyebrow mb-2">Transparent Pricing</p>
            <h2 className="text-3xl font-bold mb-4">Event Photography Packages</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Choose the perfect event photography package in Pinehurst, TX.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 items-start">
            <div className="surface-panel p-8 flex flex-col h-full">
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-1">Basic Coverage</p>
                <p className="text-sm text-stone-500">starting at</p>
                <p className="text-4xl font-bold text-stone-900">$600</p>
                <p className="text-sm text-stone-500 mt-1">2 hours of event coverage</p>
              </div>
              <ul className="space-y-2 mb-8 flex-1">
                {[
                  'Signature Duo Coverage: Two lead photographers for every shot.',
                  '50+ High-Resolution Edited Photos: Curated for quality over quantity.',
                  '72-Hour Highlights Preview: See your best shots while the event is still trending.',
                  'Private Digital Gallery: Easy downloading and social sharing.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-stone-700">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/book-consultation" className="btn-secondary w-full text-center block">
                Choose Basic
              </Link>
            </div>

            <div className="surface-panel p-8 flex flex-col h-full border-2 border-primary-400 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Star className="h-3 w-3" /> Most Popular
                </span>
              </div>
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary-600 mb-1">Standard Coverage</p>
                <p className="text-sm text-stone-500">starting at</p>
                <p className="text-4xl font-bold text-stone-900">$1,000</p>
                <p className="text-sm text-stone-500 mt-1">4 hours of event coverage</p>
              </div>
              <ul className="space-y-2 mb-8 flex-1">
                {[
                  'Signature Duo Coverage: One of us focuses on the action, the other on the reactions.',
                  '125+ High-Resolution Edited Photos: Complete storytelling from start to finish.',
                  '24-Hour Sneak Peek: A selection of best-of shots delivered the very next day.',
                  'Timeline & Logistics Consultation: We help you plan the flow to maximize your photo ops.',
                  'Private Digital Gallery',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-stone-700">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/book-consultation" className="btn-primary w-full text-center block">
                Choose Standard
              </Link>
            </div>

            <div className="surface-panel p-8 flex flex-col h-full">
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-1">Premium Coverage</p>
                <p className="text-sm text-stone-500">starting at</p>
                <p className="text-4xl font-bold text-stone-900">$1,800</p>
                <p className="text-sm text-stone-500 mt-1">Up to 8 hours of full-day coverage</p>
              </div>
              <ul className="space-y-2 mb-8 flex-1">
                {[
                  'Signature Duo Coverage: 360-degree coverage so no handshake or hug is missed.',
                  '250+ High-Resolution Edited Photos: A massive, comprehensive gallery.',
                  'Custom Mobile Gallery App: Carry your event memories in your pocket.',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-stone-700">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/book-consultation" className="btn-secondary w-full text-center block">
                Choose Premium
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Need Custom Event Coverage?</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Book a consultation to build a custom event photography plan around your timeline, guest count, and coverage goals.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="surface-panel p-8 border-2 border-primary-300 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
                  Custom Coverage
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Design Event Coverage Around Your Schedule</h3>
                  <p className="text-stone-600 mb-6">
                    Great for corporate events, private parties, conferences, or celebrations that need tailored coverage.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-stone-700">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Flexible hourly or full-event coverage</span>
                    </li>
                    <li className="flex items-start gap-2 text-stone-700">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Support for multi-room or large guest counts</span>
                    </li>
                    <li className="flex items-start gap-2 text-stone-700">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Custom deliverables and turnaround planning</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-primary-50 rounded-lg p-6 border border-primary-100">
                  <p className="text-sm uppercase tracking-wide text-primary-700 font-semibold mb-2">Built for your event</p>
                  <p className="text-stone-700 mb-6">
                    We&apos;ll recommend the right coverage plan before you commit, so you get exactly what your event needs.
                  </p>
                  <Link href="/book-consultation" className="btn-primary w-full text-center block">
                    Book a Consultation
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Two Photographers Announcement */}
      <div className="bg-primary-50 border-y border-primary-200">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-primary-800 font-medium">
            Signature Duo Coverage on every event — wider storytelling, cleaner logistics, no missed moments.
          </p>
        </div>
      </div>

      {/* SEO Text Block */}
      <section className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-stone-900 mb-4">Event Photography in Pinehurst, TX &amp; Greater Houston</h2>
            <p className="text-stone-700 leading-relaxed mb-4">
              Studio37 delivers professional event photography for corporate conferences, galas, award ceremonies, birthday milestones, graduation celebrations, quinceañeras, holiday parties, and community events throughout Pinehurst, The Woodlands, Conroe, Magnolia, Tomball, Spring, Montgomery, Willis, New Caney, Hockley, Huntsville, and the Houston metro area. Our Signature Duo Coverage model deploys two photographers simultaneously — one capturing wide establishing shots of the venue and crowd, the other focused on candid expressions, key speakers, and detail moments — so your event story is complete from start to finish. We bring professional lighting rigs for indoor ballrooms, outdoor tents, and low-light venues, ensuring crisp, vibrant images regardless of conditions. Fast turnaround delivery means your brand can share highlight images on social media within 48 hours, while full galleries arrive within a week. Whether you're a corporate marketing team needing deliverables for your PR campaign or a family celebrating a milestone birthday, Studio37 elevates your event with the quality and reliability of a true professional photography partner. Request your custom event quote today.
            </p>
            <p className="text-sm text-stone-500">
              Serving: Pinehurst TX · The Woodlands · Conroe · Magnolia · Tomball · Spring · Montgomery · Willis · New Caney · Hockley · Huntsville · Houston · Harris County
            </p>
            <p className="text-sm mt-2 text-primary-700">
              Event coverage hubs: <Link href="/the-woodlands" className="hover:underline">The Woodlands</Link>, <Link href="/conroe" className="hover:underline">Conroe</Link>, <Link href="/huntsville" className="hover:underline">Huntsville</Link>, <Link href="/locations" className="hover:underline">all locations</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Event Photography?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Let's discuss your upcoming event and ensure every important moment is captured professionally. 
            Serving events throughout Pinehurst, Montgomery County, and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/book-consultation" 
              className="btn-primary"
            >
              Book a Consultation
            </Link>
            <Link 
              href="/gallery" 
              className="btn-ghost border-white/40 text-white hover:text-white"
            >
              View Event Gallery
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}