import React from 'react'
import SmartQuoteForm from '@/components/SmartQuoteForm'
import AvailabilityCalendar from '@/components/AvailabilityCalendar'
import VideoTestimonials from '@/components/VideoTestimonials'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Get Your Photography Quote - Studio37 Pinehurst TX',
  description: 'Get an instant AI-powered quote for your photography needs. Check our availability calendar and book your session with Studio37 in Pinehurst, Texas.',
  keywords: [
    'photography quote Pinehurst TX',
    'instant photography pricing',
    'book photographer Texas',
    'photography availability',
    'Studio37 booking'
  ],
  canonicalUrl: 'https://studio37.cc/get-quote',
  pageType: 'service'
})

export const revalidate = 3600 // Revalidate every hour

export default function GetQuotePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-primary-50">
      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-gradient-to-r from-primary-600 to-primary-700 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get Your Instant Photography Quote
            </h1>
            <p className="text-xl text-primary-100 mb-6">
              AI-powered recommendations tailored to your needs. Get pricing in minutes, not days.
            </p>
            <div className="flex flex-wrap gap-4 justify-center text-sm">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <span>✓</span> Instant AI Recommendations
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <span>✓</span> Real-Time Availability
              </div>
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full">
                <span>✓</span> No Obligation
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Smart Quote Form */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <SmartQuoteForm />
        </div>
      </section>

      {/* Availability Calendar */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Check Our Live Availability
              </h2>
              <p className="text-lg text-gray-600">
                See available dates and book your perfect session time
              </p>
            </div>
            <AvailabilityCalendar />
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <VideoTestimonials />

      {/* Final CTA */}
      <section className="py-16 bg-gradient-to-r from-gray-900 to-gray-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Still Have Questions?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            We're here to help! Reach out directly and we'll answer any questions you have.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
            >
              Contact Us Directly
            </a>
            <a
              href="/services"
              className="px-8 py-4 border-2 border-white text-white rounded-lg hover:bg-white hover:text-gray-900 transition-all font-semibold"
            >
              View All Services
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
