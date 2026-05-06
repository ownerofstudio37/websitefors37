import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Charity Fundraiser Event Photography - Studio37',
  description:
    'Professional fundraiser photography capturing event moments, donor interactions, and auction highlights. Perfect for charity galas and fundraising events in Houston.',
  canonicalUrl: 'https://www.studio37.cc/fundraiser',
  pageType: 'service',
})

export const revalidate = 86400

const packages = [
  {
    name: 'Basic Coverage',
    price: '$1,000',
    duration: '4 hours',
    features: ['4 hours coverage', '1 photographer', 'Event documentation', 'Digital gallery', 'Professional edits'],
  },
  {
    name: 'Standard Fundraiser',
    price: '$2,000',
    duration: '6 hours',
    features: ['6 hours coverage', '2 photographers', 'Detailed documentation', 'Donor recognition photos', 'Custom album'],
    popular: true,
  },
  {
    name: 'Premium Event Coverage',
    price: '$3,500+',
    duration: 'Full coverage',
    features: ['Full event coverage', 'Multiple photographers', 'Professional video', 'Drone photography', 'Same-day proofs'],
  },
]

export default function FundraiserPage() {
  return (
    <main className="w-full">
      {/* Hero Section */}
      <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-black">
        <Image
          src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1769255492/IMG_7159_occmi3.jpg"
          alt="Professional fundraiser event photography"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Fundraiser Photography</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Professional event photography that captures the mission, energy, and impact of your fundraising efforts
          </p>
        </div>
      </section>

      {/* Package Options */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Fundraiser Photography Packages</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Professional coverage that documents your event and supports your organization's mission
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`border rounded-lg p-8 hover:shadow-lg transition ${
                  pkg.popular ? 'border-2 border-red-600 bg-red-50' : 'border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <div className="inline-block bg-red-600 text-white px-4 py-1 rounded-full text-sm mb-2 font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-4xl font-bold text-red-600 mb-2">{pkg.price}</p>
                <p className="text-gray-600 mb-4">{pkg.duration}</p>
                <ul className="space-y-2 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="text-gray-700 flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SEO Content Block */}
      <section className="py-12 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Capture Your Fundraising Impact with Professional Photography</h2>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Studio37 Photography specializes in fundraiser event photography across the Houston area, including
              Pinehurst, The Woodlands, Conroe, Magnolia, Tomball, Spring, and surrounding communities. We understand
              that fundraising events need more than just documentation—they need compelling visual content that tells
              your organization's story and demonstrates the power of donor support.
            </p>

            <p>
              Whether you're hosting a charity gala, silent auction, benefit dinner, or grassroots fundraising event,
              our experienced photographers capture the energy, generosity, and community spirit that define successful
              fundraising. We document not just the event logistics, but the genuine connections between donors,
              volunteers, and your mission.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Fundraiser Photography Coverage:</h3>
            <ul className="space-y-2 ml-4">
              <li>• <strong>Donor Recognition:</strong> Photos of major donors, sponsors, and campaign supporters</li>
              <li>• <strong>Auction & Bidding:</strong> Silent auction displays, active bidding moments, and auction winners</li>
              <li>• <strong>Presentation Moments:</strong> Speakers, testimonials, and mission-focused presentations</li>
              <li>• <strong>Volunteer Recognition:</strong> Team photos and candids celebrating volunteers and staff</li>
              <li>• <strong>Event Details:</strong> Venue setup, silent auction items, signage, and themed elements</li>
              <li>• <strong>Candid Moments:</strong> Genuine interactions, networking, and celebration photographs</li>
            </ul>

            <p className="mt-6">
              Professional fundraiser photography serves multiple purposes: immediate event documentation for social
              media and newsletters, proof of impact for sponsors and donors, and archive materials for future
              marketing. We provide fast turnaround on edited photos so you can share your event success immediately
              with your community.
            </p>

            <p>
              Our photographers are experienced with non-profit events and understand how to capture content that
              reinforces your mission and encourages future donor engagement. We work with your development team to
              ensure we document the key moments and achievements your organization wants to highlight.
            </p>

            <p>
              Serving all major areas in greater Houston including Montgomery County, Harris County, and surrounding
              regions. Perfect for fundraising galas, benefit events, charity auctions, and non-profit fundraising
              efforts throughout the Houston area.
            </p>
          </div>

          <div className="mt-8 p-4 bg-red-50 rounded-lg">
            <p className="text-gray-800">
              Ready to capture your fundraising event?{' '}
              <Link href="/services/event-photography" className="text-red-600 hover:underline font-semibold">
                Explore our full event photography services →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
