import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'
import { generateOfferSchema } from '@/lib/enhanced-seo-helpers'
import CommercialHighlightGallery from '@/components/CommercialHighlightGallery'
import { Building2, Camera, Users, Briefcase, CheckCircle, ArrowRight, Star } from 'lucide-react'

export const metadata = generateSEOMetadata({
  title: 'Commercial Photography Pinehurst TX – Duo Production Team | Studio37',
  description: 'Two-Pro Production Team commercial photography in Pinehurst, TX. Brand imagery, product photography, corporate headshots & marketing content starting at $500. Serving Montgomery County & Houston.',
  keywords: [
    'commercial photography Pinehurst TX',
    'business photographer Texas',
    'product photography Montgomery County',
    'corporate headshots The Woodlands',
    'marketing photography Pinehurst',
    'brand photography Houston area',
    'two photographer commercial session Texas',
    'duo production team photography'
  ],
  canonicalUrl: 'https://www.studio37.cc/services/commercial-photography',
  pageType: 'service'
})

// Static marketing page; revalidate daily
export const revalidate = 86400

export default function CommercialPhotographyPage() {
  const serviceSchema = generateServiceSchema(
    'Commercial Photography',
    'Professional commercial photography services in Pinehurst, Texas. Two-Pro Production Team specializing in brand imagery, product photography, corporate headshots, and business marketing content.'
  )

  const offerSchemas = [
    generateOfferSchema({
      name: 'Business Express',
      description: 'One-hour commercial shoot with our Duo Production Team. 15+ edited images delivered in 48 hours with full commercial usage rights.',
      price: 500,
      priceCurrency: 'USD',
      url: 'https://www.studio37.cc/services/commercial-photography',
      seller: 'Studio37',
    }),
    generateOfferSchema({
      name: 'Brand Starter',
      description: 'Two-hour commercial session with our Duo Production Team. 30+ edited images, brand consultation, 48-hr Fast-Track delivery, and full commercial license.',
      price: 850,
      priceCurrency: 'USD',
      url: 'https://www.studio37.cc/services/commercial-photography',
      seller: 'Studio37',
    }),
    generateOfferSchema({
      name: 'Content Library',
      description: 'Four-hour commercial production with our Duo Production Team. 75+ edited images, pre-shoot brand strategy session, 24-hr sneak-peek preview, and full commercial license.',
      price: 1500,
      priceCurrency: 'USD',
      url: 'https://www.studio37.cc/services/commercial-photography',
      seller: 'Studio37',
    }),
    generateOfferSchema({
      name: 'Full Brand Story',
      description: 'Full-day brand production with our Duo Production Team. 150+ edited images, branding audit, behind-the-scenes reel, and 5-day delivery with full commercial license.',
      price: 2800,
      priceCurrency: 'USD',
      url: 'https://www.studio37.cc/services/commercial-photography',
      seller: 'Studio37',
    }),
  ]

  return (
    <div className="pt-16">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      {offerSchemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Hero Section */}
      <section className="relative h-[480px] bg-gradient-to-r from-gray-900 to-blue-900">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1560472355-536de3962603?w=1200&h=600&fit=crop"
            alt="Commercial photography by Studio37 in Pinehurst TX"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <p className="eyebrow-hero mb-3">Two-Pro Production Team · Pinehurst, TX</p>
            <h1 className="text-5xl font-bold mb-4">Commercial Photography in Pinehurst, TX</h1>
            <p className="text-xl mb-3 text-white/90">
              We don&apos;t just take photos; we build your brand&apos;s visual identity. With our Two-Pro Production Team, we capture more content in less time, so you can get back to business.
            </p>
            <p className="text-base mb-8 text-white/70">
              Starting at $500 — full commercial usage license included on every session.
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

      {/* Commercial Services */}
      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="eyebrow mb-2">Service Types</p>
            <h2 className="text-3xl font-bold mb-4">Commercial Photography Services</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Professional photography solutions to showcase your business, products, and team
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/product-photography" className="group surface-panel text-center p-6 transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-300">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                <Camera className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-700">Product Photography</h3>
              <p className="text-stone-600">
                High-quality product images for catalogs, websites, and marketing materials.
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary-600 group-hover:underline">View Product Photography <ArrowRight className="h-4 w-4" /></span>
            </Link>
            
            <Link href="/corporate-headshots" className="group surface-panel text-center p-6 transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-300">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-700">Corporate Headshots</h3>
              <p className="text-stone-600">
                Professional headshots for executives, teams, and company directories.
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary-600 group-hover:underline">View Corporate Headshots <ArrowRight className="h-4 w-4" /></span>
            </Link>
            
            <Link href="/architectural-photography" className="group surface-panel text-center p-6 transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-300">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                <Building2 className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-700">Architectural Photography</h3>
              <p className="text-stone-600">
                Showcase buildings, interiors, and commercial spaces professionally.
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary-600 group-hover:underline">View Architectural Photography <ArrowRight className="h-4 w-4" /></span>
            </Link>
            
            <Link href="/brand-photography" className="group surface-panel text-center p-6 transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-300">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                <Briefcase className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-700">Brand Photography</h3>
              <p className="text-stone-600">
                Custom brand imagery for marketing campaigns and brand identity.
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary-600 group-hover:underline">View Brand Photography <ArrowRight className="h-4 w-4" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* Industries We Serve */}
      <section className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Industries We Serve</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Our commercial photography expertise spans across various industries in Montgomery County
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              'Technology Companies',
              'Healthcare & Medical',
              'Real Estate',
              'Restaurants & Food',
              'Manufacturing',
              'Professional Services',
              'Retail & E-commerce',
              'Construction',
              'Financial Services'
            ].map((industry) => (
              <div key={industry} className="surface-panel p-6 text-center">
                <h3 className="font-semibold text-stone-800">{industry}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1556761175-4b46a572b786?w=600&h=400&fit=crop"
                alt="Professional business photography in Montgomery County TX"
                width={600}
                height={400}
                className="rounded-[var(--radius-card)] shadow-[var(--shadow-strong)]"
              />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose Studio37 for Commercial Photography?</h2>
              <p className="text-lg text-stone-600 mb-8">
                Located in Pinehurst, Texas, our Two-Pro Production Team brings double the coverage, perspective, and efficiency to every commercial shoot — all for the same rate as a single-photographer session.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Two-Pro Production Team</h3>
                    <p className="text-stone-600">Two photographers on every session — one leads creative direction while the second captures candid moments and detail shots simultaneously</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Brand-First Approach</h3>
                    <p className="text-stone-600">We study your brand guidelines and target audience before lifting a camera, so every image communicates your unique value proposition</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Fast, Reliable Delivery</h3>
                    <p className="text-stone-600">48-hour rush available on select tiers; all packages include web, print, social, and ad-ready file formats</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Full Commercial License on Every Session</h3>
                    <p className="text-stone-600">No hidden licensing fees — every package includes unlimited commercial usage rights across all your marketing channels</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Highlight Gallery */}
      <CommercialHighlightGallery />

      {/* Service Areas */}
      <section className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Commercial Photography Service Areas</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              We provide commercial photography services throughout Montgomery County and surrounding Texas areas
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
            <h2 className="text-3xl font-bold mb-4">Commercial Photography Packages</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Every tier includes our Two-Pro Production Team — two photographers, one rate, twice the coverage.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 items-start">

            {/* Business Express */}
            <div className="surface-panel p-8 flex flex-col h-full">
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-1">Business Express</p>
                <p className="text-sm text-stone-500">starting at</p>
                <p className="text-4xl font-bold text-stone-900">$500</p>
                <p className="text-sm text-stone-500 mt-1">1-hour session</p>
              </div>
              <ul className="space-y-2 mb-8 flex-1">
                {[
                  'The Duo Advantage: Two photographers working simultaneously to capture hero shots and behind-the-scenes action in a single hour.',
                  '15+ professionally edited images',
                  'High-resolution delivery files',
                  'Full Commercial Usage License',
                  '48-hour turnaround delivery',
                  'Online private gallery + download portal',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-stone-700">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/book-consultation" className="btn-secondary w-full text-center block">
                Book Business Express
              </Link>
            </div>

            {/* Brand Starter */}
            <div className="surface-panel p-8 flex flex-col h-full">
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-1">Brand Starter</p>
                <p className="text-sm text-stone-500">starting at</p>
                <p className="text-4xl font-bold text-stone-900">$850</p>
                <p className="text-sm text-stone-500 mt-1">2-hour session</p>
              </div>
              <ul className="space-y-2 mb-8 flex-1">
                {[
                  'The Duo Advantage: One photographer handles product and detail work while the second captures lifestyle and team moments — no need to pause and reset.',
                  '30+ professionally edited images',
                  'Brand style brief & shot list planning',
                  'Full Commercial Usage License',
                  '48-hr Fast-Track delivery',
                  'Web, print & social media files',
                  'Online private gallery + download portal',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-stone-700">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/book-consultation" className="btn-secondary w-full text-center block">
                Book Brand Starter
              </Link>
            </div>

            {/* Content Library — Most Popular */}
            <div className="surface-panel p-8 flex flex-col h-full border-2 border-primary-400 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Star className="h-3 w-3" /> Most Popular
                </span>
              </div>
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary-600 mb-1">Content Library</p>
                <p className="text-sm text-stone-500">starting at</p>
                <p className="text-4xl font-bold text-stone-900">$1,500</p>
                <p className="text-sm text-stone-500 mt-1">4-hour session</p>
              </div>
              <ul className="space-y-2 mb-8 flex-1">
                {[
                  'The Duo Advantage: Dedicated coverage of your space, team, product, and brand lifestyle — all in one production block, with zero overlap in shot coverage.',
                  '75+ professionally edited images',
                  'Pre-shoot brand consultation & strategy',
                  'Full Commercial Usage License',
                  '24-hour sneak-peek preview gallery',
                  'Final delivery in 5–7 business days',
                  'Web, print, social & ad-ready files',
                  'Online private gallery + download portal',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-stone-700">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/book-consultation" className="btn-primary w-full text-center block">
                Book Content Library
              </Link>
            </div>

            {/* Full Brand Story */}
            <div className="surface-panel p-8 flex flex-col h-full">
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-1">Full Brand Story</p>
                <p className="text-sm text-stone-500">starting at</p>
                <p className="text-4xl font-bold text-stone-900">$2,800</p>
                <p className="text-sm text-stone-500 mt-1">Full-day session (8 hrs)</p>
              </div>
              <ul className="space-y-2 mb-8 flex-1">
                {[
                  'The Duo Advantage: A full day with two photographers means every angle, every team member, every product SKU, and every brand moment is captured — guaranteed.',
                  '150+ professionally edited images',
                  'Pre-shoot branding audit & shot strategy',
                  'Full Commercial Usage License',
                  'Behind-the-scenes video reel included',
                  '5-business-day delivery guarantee',
                  'Web, print, social, OOH & ad-ready files',
                  'Online private gallery + download portal',
                  'Priority scheduling & dedicated account contact',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-stone-700">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/book-consultation" className="btn-secondary w-full text-center block">
                Book Full Brand Story
              </Link>
            </div>

          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Need a Custom Commercial Shoot?</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Book a consultation to build a custom commercial session around your brand, shot list, usage needs, and schedule.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="surface-panel p-8 border-2 border-primary-300 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
                  Custom Production
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Plan a Shoot That Fits Your Business Goals</h3>
                  <p className="text-stone-600 mb-6">
                    Best for product launches, branded content days, team headshots, location shoots, and campaigns with specific licensing needs.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-stone-700">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Shot list and brand planning support</span>
                    </li>
                    <li className="flex items-start gap-2 text-stone-700">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Custom usage and deliverable options</span>
                    </li>
                    <li className="flex items-start gap-2 text-stone-700">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Scalable coverage for teams and campaigns</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-primary-50 rounded-lg p-6 border border-primary-100">
                  <p className="text-sm uppercase tracking-wide text-primary-700 font-semibold mb-2">Strategy-first planning</p>
                  <p className="text-stone-700 mb-6">
                    We&apos;ll map out your goals, usage needs, and production details before building the right commercial package.
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

      {/* SEO Text Block */}
      <section className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-stone-900 mb-4">Commercial Photography for Businesses in Pinehurst, TX &amp; Montgomery County</h2>
            <p className="text-stone-700 leading-relaxed mb-4">
              Studio37 provides full-service commercial photography for businesses of every size across Pinehurst, The Woodlands, Conroe, Magnolia, Tomball, Spring, Montgomery, Willis, New Caney, Hockley, Bryan, College Station, and the Houston business corridor. Our commercial services include product photography, e-commerce catalog shoots, real estate and architectural photography, corporate headshots, executive portrait sessions, brand lifestyle content, food and beverage photography, industrial facility documentation, and trade show coverage. Every commercial project is approached with a creative brief process — we study your brand guidelines, target audience, and competitive landscape before lifting a camera, ensuring every image communicates your unique value proposition. With Signature Duo Coverage, complex shoots requiring simultaneous product and lifestyle content are handled in a single session, saving your team valuable time and production budget. We deliver print-ready, web-optimized, and social-media-formatted image assets to keep your marketing team moving fast. Our commercial clients include retailers, restaurants, health and wellness brands, tech startups, real estate agencies, and professional service firms throughout Greater Houston. Get your commercial photography quote today.
            </p>
            <p className="text-sm text-stone-500">
              Serving: Pinehurst TX · The Woodlands · Conroe · Magnolia · Tomball · Spring · Montgomery · Willis · New Caney · Hockley · Bryan · College Station · Houston
            </p>
            <p className="text-sm mt-2 text-primary-700">
              Commercial area pages: <Link href="/the-woodlands" className="hover:underline">The Woodlands</Link>, <Link href="/bryan" className="hover:underline">Bryan</Link>, <Link href="/college-station" className="hover:underline">College Station</Link>, <Link href="/locations" className="hover:underline">all locations</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-gray-700 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Your Brand's Visual Identity?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let&apos;s plan your commercial shoot. Two photographers. One rate. Twice the content.
            Serving businesses throughout Pinehurst, Montgomery County, and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-consultation" className="btn-primary">
              Book a Consultation
            </Link>
            <Link 
              href="/gallery" 
              className="btn-ghost border-white/40 text-white hover:text-white"
            >
              View Commercial Portfolio
            </Link>
            {/* Digital Marketing CTA */}
            <Link
              href="/digital-marketing"
              className="btn-ghost border-white/40 text-white hover:text-white"
            >
              Grow with Digital Marketing
            </Link>
          </div>
        </div>
      </section>

      {/* Two Photographers Announcement */}
      <div className="bg-primary-50 border-y border-primary-200">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-primary-800 font-medium">
            Two-Pro Production Team on every commercial shoot — double the coverage, same competitive rate.
          </p>
        </div>
      </div>
    </div>
  )
}