import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'
import { Camera, Calendar, Users, Clock, CheckCircle, ArrowRight } from 'lucide-react'

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
  canonicalUrl: 'https://studio37.cc/services/event-photography',
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
      <section className="relative h-96 bg-gradient-to-r from-green-900 to-blue-900">
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
            <h1 className="text-5xl font-bold mb-4">Event Photography in Pinehurst, TX</h1>
            <p className="text-xl mb-6">
              Make your special event unforgettable with professional event photography. 
              From corporate functions to celebrations, we capture every important moment.
            </p>
            <Link 
              href="/contact" 
              className="btn-primary text-lg px-8 py-4 inline-flex items-center"
            >
              Book Your Event <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Event Photography Services</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Professional photography coverage for all types of events and celebrations
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Link href="/corporate-events" className="group text-center p-6 bg-gray-50 rounded-lg transition-colors hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-300">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-700">Corporate Events</h3>
              <p className="text-gray-600">
                Professional documentation of conferences, meetings, product launches, and corporate celebrations.
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary-600 group-hover:underline">View Corporate Events <ArrowRight className="h-4 w-4" /></span>
            </Link>
            
            <Link href="/birthday-party" className="group text-center p-6 bg-gray-50 rounded-lg transition-colors hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-300">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                <Calendar className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-700">Birthday Parties</h3>
              <p className="text-gray-600">
                Capture the joy and excitement of birthday celebrations with candid and posed photography.
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary-600 group-hover:underline">View Birthday Party Photography <ArrowRight className="h-4 w-4" /></span>
            </Link>
            
            <Link href="/graduation" className="group text-center p-6 bg-gray-50 rounded-lg transition-colors hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-300">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                <Camera className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-700">Graduations</h3>
              <p className="text-gray-600">
                Document this important milestone with professional graduation ceremony and party photography.
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary-600 group-hover:underline">View Graduation Photography <ArrowRight className="h-4 w-4" /></span>
            </Link>
            
            <Link href="/fundraiser" className="group text-center p-6 bg-gray-50 rounded-lg transition-colors hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-300">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                <Users className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-700">Fundraisers</h3>
              <p className="text-gray-600">
                Professional coverage of charity events, galas, and fundraising activities.
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary-600 group-hover:underline">View Fundraiser Photography <ArrowRight className="h-4 w-4" /></span>
            </Link>
            
            <Link href="/anniversary-party" className="group text-center p-6 bg-gray-50 rounded-lg transition-colors hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-300">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                <Calendar className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-700">Anniversary Parties</h3>
              <p className="text-gray-600">
                Celebrate love and commitment with beautiful anniversary party photography.
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary-600 group-hover:underline">View Anniversary Photography <ArrowRight className="h-4 w-4" /></span>
            </Link>
            
            <Link href="/holiday-party" className="group text-center p-6 bg-gray-50 rounded-lg transition-colors hover:bg-primary-50 focus:outline-none focus:ring-2 focus:ring-primary-300">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                <Camera className="h-8 w-8 text-primary-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2 group-hover:text-primary-700">Holiday Parties</h3>
              <p className="text-gray-600">
                Capture the festive spirit of holiday celebrations and seasonal events.
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-sm font-medium text-primary-600 group-hover:underline">View Holiday Party Photography <ArrowRight className="h-4 w-4" /></span>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose Studio37 for Events?</h2>
              <p className="text-lg text-gray-600 mb-8">
                Based in Pinehurst, Texas, we understand the importance of capturing every significant moment 
                at your event. Our unobtrusive style ensures natural, authentic photos.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Unobtrusive Photography</h3>
                    <p className="text-gray-600">We blend into the background to capture natural moments</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Professional Equipment</h3>
                    <p className="text-gray-600">High-end cameras and lighting for any venue or condition</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Fast Delivery</h3>
                    <p className="text-gray-600">Receive your event photos within one week</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Flexible Packages</h3>
                    <p className="text-gray-600">Customizable coverage options to fit your event needs</p>
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
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Event Photography Service Areas</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
                <div key={area} className="bg-white p-6 rounded-lg shadow-sm text-center">
                  {slug ? (
                    <Link href={slug} className="font-semibold text-gray-800 hover:text-primary-600">{area}</Link>
                  ) : (
                    <h3 className="font-semibold text-gray-800">{area}</h3>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Event Photography Packages</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Choose the perfect event photography package in Pinehurst, TX
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Basic Coverage</h3>
              <p className="font-semibold mb-4"><span className="text-base text-black italic">Starting at </span><span className="text-3xl text-orange-600 not-italic">$600</span></p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>2 Hours of Event Coverage</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Signature Duo Coverage: Two lead photographers for every shot.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>50+ High-Resolution Edited Photos: Curated for quality over quantity.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>72-Hour Highlights Preview: See your best shots while the event is still trending.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Private Digital Gallery: Easy downloading and social sharing.</span>
                </li>
              </ul>
              <Link href="/contact" className="btn-secondary w-full text-center block">
                Choose Basic
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-primary-200 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <h3 className="text-xl font-bold mb-4">Standard Coverage</h3>
              <p className="font-semibold mb-4"><span className="text-base text-black italic">Starting at </span><span className="text-3xl text-orange-600 not-italic">$1,000</span></p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>4 Hours of Event Coverage</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Signature Duo Coverage: One of us focuses on the action, the other on the reactions.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>125+ High-Resolution Edited Photos: Complete storytelling from start to finish.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>24-Hour Sneak Peek: A selection of best-of shots delivered the very next day.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Timeline &amp; Logistics Consultation: We help you plan the flow to maximize your photo ops.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Private Digital Gallery</span>
                </li>
              </ul>
              <Link href="/contact" className="btn-primary w-full text-center block">
                Choose Standard
              </Link>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-xl font-bold mb-4">Premium Coverage</h3>
              <p className="font-semibold mb-4"><span className="text-base text-black italic">Starting at </span><span className="text-3xl text-orange-600 not-italic">$1,800</span></p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Up to 8 Hours of Full-Day Coverage</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Signature Duo Coverage: 360-degree coverage so no handshake or hug is missed.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>250+ High-Resolution Edited Photos: A massive, comprehensive gallery.</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <span>Custom Mobile Gallery App: Carry your event memories in your pocket.</span>
                </li>
              </ul>
              <Link href="/contact" className="btn-secondary w-full text-center block">
                Choose Premium
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Need Custom Event Coverage?</h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Book a consultation to build a custom event photography plan around your timeline, guest count, and coverage goals.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-primary-200 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">
                  Custom Coverage
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Design Event Coverage Around Your Schedule</h3>
                  <p className="text-gray-600 mb-6">
                    Great for corporate events, private parties, conferences, or celebrations that need tailored coverage.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Flexible hourly or full-event coverage</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Support for multi-room or large guest counts</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span>Custom deliverables and turnaround planning</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-primary-50 rounded-lg p-6 border border-primary-100">
                  <p className="text-sm uppercase tracking-wide text-primary-700 font-semibold mb-2">Built for your event</p>
                  <p className="text-gray-700 mb-6">
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
            Two photographers on site — for the price of one. More coverage, more moments, same rate.
          </p>
        </div>
      </div>

      {/* SEO Text Block */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Event Photography in Pinehurst, TX &amp; Greater Houston</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Studio37 delivers professional event photography for corporate conferences, galas, award ceremonies, birthday milestones, graduation celebrations, quinceañeras, holiday parties, and community events throughout Pinehurst, The Woodlands, Conroe, Willis, New Waverly, Huntsville, Spring, Tomball, Magnolia, Montgomery, New Caney, Porter, Splendora, Cleveland, Hockley, Waller, Plantersville, Navasota, Bryan, College Station, Cypress, Kingwood, Humble, Atascocita, and the Houston metro area. Our Signature Duo Coverage model deploys two photographers simultaneously — one capturing wide establishing shots of the venue and crowd, the other focused on candid expressions, key speakers, and detail moments — so your event story is complete from start to finish. We bring professional lighting rigs for indoor ballrooms, outdoor tents, and low-light venues, ensuring crisp, vibrant images regardless of conditions. Fast turnaround delivery means your brand can share highlight images on social media within 48 hours, while full galleries arrive within a week. Whether you're a corporate marketing team needing deliverables for your PR campaign or a family celebrating a milestone birthday, Studio37 elevates your event with the quality and reliability of a true professional photography partner. Request your custom event quote today.
            </p>
            <p className="text-sm text-gray-500">
              Serving: Pinehurst TX · Magnolia · Tomball · Spring · The Woodlands · Conroe · Montgomery · Willis · New Waverly · Huntsville · New Caney · Porter · Splendora · Cleveland · Hockley · Waller · Plantersville · Navasota · Bryan · College Station · Cypress · Kingwood · Humble · Atascocita · Houston · Harris County
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-green-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Event Photography?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Let's discuss your upcoming event and ensure every important moment is captured professionally. 
            Serving events throughout Pinehurst, Montgomery County, and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/contact" 
              className="bg-white text-primary-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Get Event Quote
            </Link>
            <Link 
              href="/gallery" 
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-primary-600 transition-colors"
            >
              View Event Gallery
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}