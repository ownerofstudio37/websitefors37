import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { CheckCircle, ArrowRight } from 'lucide-react'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'
import { PackageRecommenderCTA } from '@/components/PublicConversionSections'

export const metadata = generateSEOMetadata({
  title: 'Professional Photography Services in Pinehurst, TX',
  description: 'Studio37 offers comprehensive photography services in Pinehurst, Texas including wedding photography, portrait sessions, event coverage, and commercial photography. Serving Montgomery County and surrounding areas.',
  keywords: [
    'wedding photography Pinehurst TX',
    'portrait photography Texas',
    'event photography Montgomery County',
    'commercial photography services',
    'family photography Pinehurst',
    'corporate headshots Texas',
    'engagement photography',
    'engagement concierge',
    'bridal photography Pinehurst'
  ],
  canonicalUrl: 'https://www.studio37.cc/services',
  pageType: 'service'
})

// Static marketing page; revalidate daily
export const revalidate = 86400

const Services = dynamic(() => import('@/components/Services'), {
  loading: () => (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">Our Photography Services</h2>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            From intimate portraits to grand celebrations, we offer comprehensive photography services tailored to your unique needs.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-gray-50 p-8 rounded-lg border-2 border-gray-100">
              <div className="h-36 bg-gray-200 rounded-lg mb-6" />
              <div className="h-5 bg-gray-200 rounded w-3/4 mx-auto mb-3" />
              <div className="h-4 bg-gray-200 rounded w-full mb-2" />
              <div className="h-4 bg-gray-200 rounded w-5/6" />
            </div>
          ))}
        </div>
      </div>
    </section>
  ),
})

export default function ServicesPage() {
  const serviceSchema = generateServiceSchema(
    'Photography Services',
    'Professional photography services in Pinehurst, Texas including wedding photography, portrait sessions, event coverage, and commercial photography.'
  )

  const intentCards = [
    {
      label: 'I need coverage for a milestone',
      copy: 'Weddings, engagements, proposals, anniversaries, graduations, birthdays, and holiday parties.',
      href: '/tools/package-recommender',
      cta: 'Find the right package',
    },
    {
      label: 'I need portraits',
      copy: 'Family, senior, maternity, headshot, and mini-session options with location and wardrobe guidance.',
      href: '/services/portrait-photography',
      cta: 'Explore portrait paths',
    },
    {
      label: 'I need business visuals',
      copy: 'Commercial photography, team headshots, brand refresh sessions, website content, and marketing support.',
      href: '/services/commercial-photography',
      cta: 'Plan business content',
    },
    {
      label: 'I want custom help',
      copy: 'Concierge proposal planning, custom website builds, marketing systems, and private portfolio examples.',
      href: '/book-consultation',
      cta: 'Book a consultation',
    },
  ]

  const subServiceGroups = [
    {
      title: 'Portrait Sessions',
      links: [
        { label: 'Family Photography', href: '/family-photography' },
        { label: 'Senior Portraits', href: '/senior-portraits' },
        { label: 'Professional Headshots', href: '/professional-headshots' },
        { label: 'Maternity Sessions', href: '/maternity-sessions' },
        { label: 'Mini Sessions', href: '/mini-sessions' },
      ],
    },
    {
      title: 'Events + Milestones',
      links: [
        { label: 'Corporate Events', href: '/corporate-events' },
        { label: 'Birthday Parties', href: '/birthday-party' },
        { label: 'Graduation', href: '/graduation' },
        { label: 'Anniversary Parties', href: '/anniversary-party' },
        { label: 'Holiday Parties', href: '/holiday-party' },
      ],
    },
    {
      title: 'Business + Growth',
      links: [
        { label: 'Commercial Photography', href: '/services/commercial-photography' },
        { label: 'Brand Refresh Sessions', href: '/brand-refresh-sessions' },
        { label: 'Branding + Marketing', href: '/services/branding-marketing' },
        { label: 'Request Business Examples', href: '/request-portfolio?service=commercial' },
      ],
    },
  ]

  return (
    <div>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

  {/* Hero Section */}
  <div className="relative overflow-hidden bg-stone-950 text-white">
        <div className="absolute inset-0 opacity-30">
          <Image 
            src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1758315587/_MG_9234_aerdni_e_gen_restore_e_improve_l_image_upload_My_Brand_IMG_2115_mtuowt_c_scale_fl_relative_w_0.36_o_80_fl_layer_apply_g_west_x_0.03_y_0.04_vunmkp.jpg" 
            alt="Photography equipment"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="container mx-auto px-4 py-24 md:py-28 relative z-10">
          <div className="max-w-3xl">
            <div className="eyebrow mb-4 bg-white/10 text-amber-200 border-white/10">Services</div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Photography Services in Pinehurst, TX</h1>
            <p className="text-xl text-stone-200 mb-8 leading-relaxed">
              Capturing life's most precious moments with artistic excellence and professional craftsmanship throughout Montgomery County.
            </p>
            <Link 
              href="#services" 
              className="btn-primary inline-flex items-center text-lg px-6 py-3"
            >
              Explore Our Services
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>

      <PackageRecommenderCTA />

      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="eyebrow mb-3">Choose By Intent</p>
            <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">Start with what you need to accomplish</h2>
            <p className="mt-3 text-lg leading-8 text-stone-600">
              Pick the closest path and we will guide you toward the right service, package, gallery examples, or consultation.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {intentCards.map((card) => (
              <Link key={card.label} href={card.href} className="group surface-panel p-5 transition-transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-primary-300">
                <h3 className="text-lg font-semibold text-stone-950 group-hover:text-primary-700">{card.label}</h3>
                <p className="mt-3 text-sm leading-6 text-stone-600">{card.copy}</p>
                <span className="mt-4 inline-flex items-center text-sm font-semibold text-primary-700">
                  {card.cta}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Main Services Component */}
      <div id="services" className="section-shell bg-stone-50">
        <Services />
      </div>

      <section className="py-12 bg-stone-50 border-y border-stone-200">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Find Services by City</h2>
            <p className="text-gray-700 mb-6">
              Browse local service pages for The Woodlands, Conroe, Magnolia, Tomball, Spring, Montgomery, Willis,
              Huntsville, New Caney, Hockley, Bryan, and College Station.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href="/locations" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">All Service Areas</Link>
              <Link href="/the-woodlands" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">The Woodlands</Link>
              <Link href="/katy" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Katy</Link>
              <Link href="/conroe" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Conroe</Link>
              <Link href="/magnolia" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Magnolia</Link>
              <Link href="/huntsville" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">Huntsville</Link>
              <Link href="/college-station" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-amber-300">College Station</Link>
            </div>
            <div className="flex flex-wrap gap-3 text-sm mt-4">
              <Link href="/wedding-photographer-katy-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-primary-300">Wedding Photographer Katy</Link>
              <Link href="/portrait-photographer-katy-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-primary-300">Portrait Photographer Katy</Link>
              <Link href="/wedding-photographer-the-woodlands-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-primary-300">Wedding Photographer The Woodlands</Link>
              <Link href="/portrait-photographer-conroe-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-primary-300">Portrait Photographer Conroe</Link>
              <Link href="/family-photographer-magnolia-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-primary-300">Family Photographer Magnolia</Link>
              <Link href="/headshot-photographer-houston-tx" className="px-4 py-2.5 rounded-full bg-white border border-stone-300 hover:border-primary-300">Headshot Photographer Houston</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 bg-white border-y border-stone-200">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Seasonal Campaigns</h2>
            <p className="text-gray-700 mb-6">
              Fast-start pages for the sessions people book around school years, holidays, and business refresh cycles.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <Link href="/mini-sessions" className="px-4 py-2.5 rounded-full bg-stone-50 border border-stone-300 hover:border-amber-300">Mini Sessions</Link>
              <Link href="/senior-portraits" className="px-4 py-2.5 rounded-full bg-stone-50 border border-stone-300 hover:border-amber-300">Senior Portraits</Link>
              <Link href="/holiday-party" className="px-4 py-2.5 rounded-full bg-stone-50 border border-stone-300 hover:border-amber-300">Holiday Parties</Link>
              <Link href="/graduation" className="px-4 py-2.5 rounded-full bg-stone-50 border border-stone-300 hover:border-amber-300">Graduations</Link>
              <Link href="/brand-refresh-sessions" className="px-4 py-2.5 rounded-full bg-stone-50 border border-stone-300 hover:border-amber-300">Brand Refreshes</Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="eyebrow mb-3">Service Directory</p>
            <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">Smaller services, clearer next steps</h2>
            <p className="mt-3 text-lg leading-8 text-stone-600">
              Browse specific session types when you already know the kind of shoot or business support you need.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-3">
            {subServiceGroups.map((group) => (
              <div key={group.title} className="surface-panel p-5">
                <h3 className="text-xl font-semibold text-stone-950">{group.title}</h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {group.links.map((item) => (
                    <Link key={item.href} href={item.href} className="rounded-full border border-stone-300 px-3 py-2 text-sm font-medium text-stone-700 hover:border-primary-300 hover:text-primary-700">
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Two Photographers Announcement */}
      <div className="bg-amber-50 border-y border-amber-200/80">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-amber-900 font-medium">
            Two photographers on site — for the price of one. More coverage, more moments, same rate.
          </p>
        </div>
      </div>

      {/* Individual Service Pages Links */}
      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 max-w-3xl mx-auto">
            <div className="eyebrow mb-4">Explore</div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Explore Our Specialized Services</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Learn more about each of our photography specialties with detailed information, packages, and pricing
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-6">
            <Link 
              href="/services/wedding-photography" 
              className="group surface-panel p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="bg-rose-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-rose-200 transition-colors">
                  <span className="text-3xl">💍</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Wedding Photography</h3>
                <p className="text-gray-600 mb-4">Romantic, timeless wedding photography in Pinehurst, TX</p>
                <div className="flex items-center justify-center text-rose-600 group-hover:text-rose-700">
                  <span className="font-medium">Learn More</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>

            <Link 
              href="/services/portrait-photography" 
              className="group surface-panel p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="bg-blue-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-200 transition-colors">
                  <span className="text-3xl">👨‍👩‍👧‍👦</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Portrait Photography</h3>
                <p className="text-gray-600 mb-4">Family portraits, senior photos, and professional headshots</p>
                <div className="flex items-center justify-center text-blue-600 group-hover:text-blue-700">
                  <span className="font-medium">Learn More</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>

            <Link 
              href="/services/event-photography" 
              className="group surface-panel p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="bg-green-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-green-200 transition-colors">
                  <span className="text-3xl">🎉</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Event Photography</h3>
                <p className="text-gray-600 mb-4">Corporate events, parties, and special celebrations</p>
                <div className="flex items-center justify-center text-green-600 group-hover:text-green-700">
                  <span className="font-medium">Learn More</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>

            <Link 
              href="/services/commercial-photography" 
              className="group surface-panel p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="bg-gray-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-200 transition-colors">
                  <span className="text-3xl">🏢</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Commercial Photography</h3>
                <p className="text-gray-600 mb-4">Business branding, product shots, and corporate imagery</p>
                <div className="flex items-center justify-center text-gray-600 group-hover:text-gray-700">
                  <span className="font-medium">Learn More</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>

            <Link 
              href="/services/engagement-session" 
              className="group surface-panel p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="bg-pink-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-pink-200 transition-colors">
                  <span className="text-3xl">💖</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Engagement Photography</h3>
                <p className="text-gray-600 mb-4">Signature engagement sessions plus full concierge proposal planning</p>
                <div className="flex items-center justify-center text-pink-700 group-hover:text-pink-800">
                  <span className="font-medium">Learn More</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>

            <Link 
              href="/services/branding-marketing" 
              className="group surface-panel p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="text-center">
                <div className="bg-violet-100 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-violet-200 transition-colors">
                  <span className="text-3xl">📈</span>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-gray-800">Branding &amp; Marketing</h3>
                <p className="text-gray-600 mb-4">White-glove growth support for content, web, SEO, PPC, and social</p>
                <div className="flex items-center justify-center text-violet-700 group-hover:text-violet-800">
                  <span className="font-medium">Learn More</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Additional Services Information */}
      <section className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-10 max-w-6xl mx-auto">
            <div className="section-soft p-8 md:p-10">
              <h2 className="text-3xl font-bold mb-6">Our Process</h2>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary-600">1</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Initial Consultation</h3>
                    <p className="text-stone-600 leading-7">
                      We start by understanding your vision, preferences, and requirements. This helps us tailor our services to your specific needs.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary-600">2</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Planning & Preparation</h3>
                    <p className="text-gray-600">
                      We plan every detail, from location scouting to lighting setups, ensuring everything is perfect for your shoot.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary-600">3</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Photography Session</h3>
                    <p className="text-gray-600">
                      Our professional photographers work their magic, capturing stunning images that tell your unique story.
                    </p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                    <span className="font-bold text-primary-600">4</span>
                  </div>
                  <div>
                    <h3 className="text-xl font-medium mb-2">Post-Production & Delivery</h3>
                    <p className="text-gray-600">
                      Your images are carefully edited and delivered in your preferred format, ready to be cherished for years to come.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="section-soft p-8 md:p-10">
              <h2 className="text-3xl font-bold mb-6">Why Choose Studio 37</h2>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium">Professional Expertise</h3>
                    <p className="text-stone-600">Our photographers bring years of experience and technical knowledge to every project.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium">Customized Approach</h3>
                    <p className="text-gray-600">We tailor our services to match your unique vision and requirements.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium">State-of-the-Art Equipment</h3>
                    <p className="text-gray-600">We use the latest photography technology to deliver exceptional image quality.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium">Attention to Detail</h3>
                    <p className="text-gray-600">We focus on capturing those small, special moments that others might miss.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium">Quick Turnaround</h3>
                    <p className="text-gray-600">We understand the excitement of seeing your photos, so we work efficiently without sacrificing quality.</p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-primary-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="text-lg font-medium">Customer Satisfaction</h3>
                    <p className="text-gray-600">Your happiness is our priority, and we work with you until you're completely satisfied.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Book Your Session?</h2>
          <p className="text-xl max-w-2xl mx-auto mb-8">
            Schedule a free 30-minute consultation to discuss your photography needs, or contact us directly to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/book-consultation" 
              className="bg-white text-primary-700 hover:bg-gray-100 px-8 py-3 rounded-lg font-medium inline-flex items-center justify-center text-lg transition-colors"
            >
              Schedule Free Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link 
              href="/contact" 
              className="bg-primary-700 text-white hover:bg-primary-800 border-2 border-white px-8 py-3 rounded-lg font-medium inline-flex items-center justify-center text-lg transition-colors"
            >
              Contact Us
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <a href="https://ppa.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
              <img 
                src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1774328861/PPA-Logo_wblk6k.png" 
                alt="Professional Photographers of America" 
                className="h-16 md:h-20 w-auto object-contain"
                loading="lazy"
                width="120"
                height="80"
              />
            </a>
            <a href="https://www.fullframeinsurance.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
              <img 
                src="https://app.fullframeinsurance.com/media/site_seals/0001/06/3b90b57044c80c69bd9c02042952a0a33dce7681.png" 
                alt="Full Frame Insurance Seal" 
                className="h-24 md:h-32 w-auto object-contain"
                loading="lazy"
                width="120"
                height="128"
              />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
