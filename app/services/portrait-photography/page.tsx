import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'
import PortraitHighlightGallery from '@/components/PortraitHighlightGallery'
import { Users, Camera, Clock, Star, CheckCircle, ArrowRight } from 'lucide-react'
import PricingCalculator from '@/components/PricingCalculator'

export const metadata = generateSEOMetadata({
  title: 'Portrait Photography Pinehurst TX - Professional Portrait Sessions Studio37',
  description: 'Capture life\'s precious moments with award-winning portrait photography in Pinehurst, TX. Family sessions, senior photos, headshots & maternity. Serving Montgomery County & Houston. Book now!',
  keywords: [
    'portrait photography Pinehurst TX',
    'family photographer Texas',
    'senior portraits Montgomery County',
    'headshots The Woodlands',
    'maternity photography Pinehurst',
    'family photos Texas',
    'professional portraits Montgomery County',
    'portrait photographer Houston area'
  ],
  canonicalUrl: 'https://www.studio37.cc/services/portrait-photography',
  pageType: 'service'
})

// Static marketing page; revalidate daily
export const revalidate = 86400

export default function PortraitPhotographyPage() {
  const serviceSchema = generateServiceSchema(
    'Portrait Photography',
    'Professional portrait photography services in Pinehurst, Texas. Specializing in family portraits, senior photos, headshots, and maternity sessions.'
  )

  return (
    <div className="pt-16">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero Section */}
      <section className="relative h-[480px] bg-gradient-to-r from-blue-900 to-purple-900">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=1200&h=600&fit=crop"
            alt="Portrait photography by Studio37 in Pinehurst TX"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <p className="eyebrow-hero mb-3">Signature Duo Coverage · Pinehurst, TX</p>
            <h1 className="text-5xl font-bold mb-4">Portrait Photography in Pinehurst, TX</h1>
            <p className="text-xl mb-3 text-white/90">
              Capture life's precious moments with professional portrait photography. 
              From family sessions to senior portraits, we create timeless images you'll treasure forever.
            </p>
            <p className="text-base mb-8 text-white/70">
              Portrait sessions start at $350 with two photographers on site.
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

      {/* Portrait Types */}
      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="eyebrow mb-2">Session Types</p>
            <h2 className="text-3xl font-bold mb-4">Portrait Photography Services</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Professional portrait sessions tailored to capture your unique personality and special moments
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Link href="/family-photography" className="group surface-panel text-center p-6 transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-300">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-700">Family Portraits</h3>
              <p className="text-stone-600">
                Beautiful family photos that capture your bonds and create lasting memories for generations.
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary-600 group-hover:underline">View Family Photography <ArrowRight className="h-4 w-4" /></span>
            </Link>
            
            <Link href="/senior-portraits" className="group surface-panel text-center p-6 transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-300">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                <Star className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-700">Senior Portraits</h3>
              <p className="text-stone-600">
                Celebrate this milestone with stunning senior portraits that showcase personality and style.
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary-600 group-hover:underline">View Senior Portraits <ArrowRight className="h-4 w-4" /></span>
            </Link>
            
            <Link href="/professional-headshots" className="group surface-panel text-center p-6 transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-300">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                <Camera className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-700">Professional Headshots</h3>
              <p className="text-stone-600">
                Make a great first impression with professional headshots for business and personal use.
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary-600 group-hover:underline">View Headshot Info <ArrowRight className="h-4 w-4" /></span>
            </Link>
            
            <Link href="/maternity-sessions" className="group surface-panel text-center p-6 transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-300">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                <Clock className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-700">Maternity Sessions</h3>
              <p className="text-stone-600">
                Capture the beauty and excitement of expecting with elegant maternity photography.
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary-600 group-hover:underline">View Maternity Sessions <ArrowRight className="h-4 w-4" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1609220136736-443140cffec6?w=600&h=400&fit=crop"
                alt="Family portrait session in Montgomery County TX"
                width={600}
                height={400}
                className="rounded-[var(--radius-card)] shadow-[var(--shadow-strong)]"
              />
            </div>
            
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose Studio37 for Portraits?</h2>
              <p className="text-lg text-stone-600 mb-8">
                Located in Pinehurst, Texas, we understand what makes Montgomery County families special. 
                Our portrait sessions are relaxed, fun, and focused on capturing authentic moments.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Relaxed, Natural Sessions</h3>
                    <p className="text-stone-600">We create a comfortable environment for authentic expressions</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Multiple Location Options</h3>
                    <p className="text-stone-600">Studio, outdoor, or in-home sessions available</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Quick Turnaround</h3>
                    <p className="text-stone-600">Receive your gallery within 2 weeks of your session</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Professional Editing</h3>
                    <p className="text-stone-600">Every image is professionally edited for the best results</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portrait Highlight Gallery */}
      <PortraitHighlightGallery />

      {/* Service Areas */}
      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Portrait Photography Service Areas</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              We provide portrait photography services throughout Montgomery County and surrounding Texas areas
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
                    <h3 className="font-semibold text-stone-800 mb-2">{area}</h3>
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
            <h2 className="text-3xl font-bold mb-4">Portrait Photography Packages</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Choose the perfect portrait session package in Pinehurst, TX.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8 items-start">
            <div className="surface-panel p-8 flex flex-col h-full">
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-1">Mini Session</p>
                  <p className="text-sm text-stone-500">starting at</p>
                  <p className="text-4xl font-bold text-stone-900">$350</p>
                  <p className="text-sm text-stone-500 mt-1">30-minute session</p>
                </div>
                <ul className="space-y-2 mb-8 flex-1">
                  {[
                    '10+ edited photos',
                    'Digital gallery',
                    'Style & Prep Guide (PDF)',
                    '24-hour sneak peek available as add-on',
                    'Two-photographer coverage',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-stone-700">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              <Link href="/book-consultation" className="btn-secondary w-full text-center block">
                Book Mini Session
              </Link>
            </div>

              <div className="surface-panel p-8 flex flex-col h-full border-2 border-primary-400 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                    <Star className="h-3 w-3" /> Most Popular
                </span>
              </div>
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-primary-600 mb-1">Standard Session</p>
                  <p className="text-sm text-stone-500">starting at</p>
                  <p className="text-4xl font-bold text-stone-900">$500</p>
                  <p className="text-sm text-stone-500 mt-1">60-minute session</p>
                </div>
                <ul className="space-y-2 mb-8 flex-1">
                  {[
                    '20+ edited photos',
                    'Multiple outfits/looks',
                    'Digital gallery',
                    'Style & Prep Guide (PDF)',
                    'Sneak peek within 24 hours',
                    'Two-photographer coverage',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-stone-700">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              <Link href="/book-consultation" className="btn-primary w-full text-center block">
                Book Standard Session
              </Link>
            </div>

              <div className="surface-panel p-8 flex flex-col h-full">
                <div className="mb-4">
                  <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-1">Extended Session</p>
                  <p className="text-sm text-stone-500">starting at</p>
                  <p className="text-4xl font-bold text-stone-900">$750</p>
                  <p className="text-sm text-stone-500 mt-1">90-minute session</p>
                </div>
                <ul className="space-y-2 mb-8 flex-1">
                  {[
                    '35+ edited photos',
                    'Multiple locations',
                    'Digital gallery',
                    'Style & Prep Guide (PDF)',
                    'Sneak peek within 24 hours',
                    'Two-photographer coverage',
                  ].map((item) => (
                    <li key={item} className="flex items-start gap-2 text-sm text-stone-700">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              <Link href="/book-consultation" className="btn-secondary w-full text-center block">
                Book Extended Session
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Calculator */}
      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-3">Not sure which option is best?</h2>
            <p className="text-stone-600 max-w-2xl mx-auto">
              Use our instant calculator to compare custom hourly pricing against our portrait packages. For example, the Standard Session starts at $500 and includes a 24-hour sneak peek plus a style &amp; prep guide.
            </p>
          </div>
          <PricingCalculator className="max-w-5xl mx-auto" />
        </div>
      </section>

      <section className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Need a Custom Portrait Session?</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Book a consultation to build a portrait session around your vision, location, timing, and coverage needs.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="surface-panel p-8 border-2 border-primary-300 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
                  Custom Session
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Build Your Ideal Portrait Experience</h3>
                  <p className="text-stone-600 mb-6">
                    Perfect for larger families, multiple locations, personal branding, or a session that does not fit a standard package.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-stone-700">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Customized timing and coverage</span>
                    </li>
                    <li className="flex items-start gap-2 text-stone-700">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Location and styling guidance</span>
                    </li>
                    <li className="flex items-start gap-2 text-stone-700">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Built around your goals and priorities</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-primary-50 rounded-lg p-6 border border-primary-100">
                  <p className="text-sm uppercase tracking-wide text-primary-700 font-semibold mb-2">Plan before you book</p>
                  <p className="text-stone-700 mb-6">
                    We&apos;ll help you choose the right format, duration, and deliverables before locking in your session.
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
            Signature Duo Coverage on every portrait session — more variety, more candids, one seamless experience.
          </p>
        </div>
      </div>

      {/* SEO Text Block */}
      <section className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-stone-900 mb-4">Portrait Photography in Pinehurst, TX &amp; Montgomery County</h2>
            <p className="text-stone-700 leading-relaxed mb-4">
              Studio37 is Pinehurst's premier portrait photography studio, serving families, seniors, newborns, and professionals throughout Montgomery County and core nearby markets including The Woodlands, Conroe, Magnolia, Tomball, Spring, Montgomery, Willis, New Caney, Hockley, and Huntsville. Our Signature Duo Coverage — two photographers on every session — means zero missed moments, more creative angles, and a richer gallery of memories delivered in every package. Whether you're looking for timeless family portraits in an outdoor setting, vibrant senior portraits at a location that reflects your personality, intimate newborn lifestyle sessions at home, or polished professional headshots for LinkedIn and corporate use, Studio37 brings artistic vision and technical precision to every frame. We blend warm, film-inspired tones with modern editing techniques to produce portraits that feel authentic, editorial, and built to last. Every session is custom-tailored to your vision — from wardrobe styling guidance and location scouting to final delivery of fully retouched, gallery-quality images. Book your portrait session with Studio37 today and experience the difference that two photographers and genuine passion make.
            </p>
            <p className="text-sm text-stone-500">
              Serving: Pinehurst TX · The Woodlands · Conroe · Magnolia · Tomball · Spring · Montgomery · Willis · New Caney · Hockley · Huntsville · Houston
            </p>
            <p className="text-sm mt-2 text-primary-700">
              Explore nearby city pages: <Link href="/the-woodlands" className="hover:underline">The Woodlands</Link>, <Link href="/conroe" className="hover:underline">Conroe</Link>, <Link href="/magnolia" className="hover:underline">Magnolia</Link>, <Link href="/locations" className="hover:underline">all locations</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Portrait Session?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Let's create beautiful portraits that capture your unique personality and special moments. 
            Serving families throughout Pinehurst, Montgomery County, and beyond.
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
              View Portrait Gallery
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}