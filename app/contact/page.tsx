import React from 'react'
import { Mail, Phone, MapPin, Instagram, Facebook, Twitter } from 'lucide-react'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import Image from 'next/image'
import LeadCaptureForm from '@/components/LeadCaptureForm'
import Schema from '@/components/Schema'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateContactPageSchema, generateOrganizationSchema } from '@/lib/schema'
import { businessInfo } from '@/lib/seo-config'

// Use server component to fetch settings
async function getSettings() {
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.from('settings').select('*').single()
  
  return data || {
    contact_email: 'contact@studio37.cc',
    contact_phone: '',
    business_address: '',
    social_facebook: '',
    social_instagram: '',
    social_twitter: ''
  }
}

export const metadata = generateSEOMetadata({
  title: 'Contact Studio37 - Professional Photography in Pinehurst, TX',
  description: `Contact Studio37 for professional photography services in Pinehurst, Texas. Located at ${businessInfo.address.fullAddress}. Call ${businessInfo.contact.phone} or email ${businessInfo.contact.email} for bookings and consultations.`,
  keywords: [
    'contact Studio37',
    'photography booking Pinehurst TX',
    'photographer contact Texas',
    'photography consultation',
    'Pinehurst photography studio contact',
    'photography inquiry Texas',
    'book photographer Montgomery County'
  ],
  canonicalUrl: 'https://www.studio37.cc/contact',
  pageType: 'contact'
})

export default async function ContactPage() {
  const settings = await getSettings()
  
  return (
    <div className="relative min-h-screen flex flex-col">
      <Schema schema={[generateContactPageSchema(), generateOrganizationSchema()]} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: [
              { '@type': 'Question', name: 'How far in advance should I book my photography session?', acceptedAnswer: { '@type': 'Answer', text: 'For wedding photography, we recommend booking 6-12 months in advance. For portrait sessions and other events, 2-4 weeks notice is typically sufficient, but availability may vary during peak seasons.' } },
              { '@type': 'Question', name: 'What is your payment policy?', acceptedAnswer: { '@type': 'Answer', text: 'We require a 50% deposit to secure your booking date, with the remaining balance due one week before the session or event. For wedding photography, we offer payment plans.' } },
              { '@type': 'Question', name: 'How many photos will I receive?', acceptedAnswer: { '@type': 'Answer', text: 'The number of photos varies by package and session length. Typically, portrait sessions yield 20-40 edited images, while weddings can range from 300-800 photos. We focus on quality over quantity to deliver the best representation of your event.' } },
              { '@type': 'Question', name: 'How long until I receive my photos?', acceptedAnswer: { '@type': 'Answer', text: "Portrait sessions are typically delivered within 1-2 weeks. Wedding and event photography can take 4-6 weeks. We'll provide select preview images within days of your session." } },
              { '@type': 'Question', name: 'Do you travel for photography sessions?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, we travel locally and internationally. Local travel within 30 miles is included in our standard rates. For destinations beyond that, additional travel fees apply.' } }
            ]
          })
        }}
      />
      {/* Background image — absolute positioning for scroll performance */}
      <div className="absolute top-0 left-0 w-full h-full -z-10 pointer-events-none">
        <Image
          src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a"
          alt="Contact background"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40" />
      </div>
      <div className="container mx-auto px-4 py-24 max-w-3xl w-full flex-1 relative z-10">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-white">Contact Us</h1>
        <p className="text-xl text-gray-200 mb-8">
          Get in touch with our team to discuss your photography needs, book a session, or ask any questions.
        </p>
        {/* Contact Form and Information */}
        <section className="py-8">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <h2 className="text-3xl font-bold mb-8 text-white">Send Us a Message</h2>
              <LeadCaptureForm />
            </div>
            <div>
              <h2 className="text-3xl font-bold mb-8 text-white">Contact Information</h2>
              <div className="space-y-8">
                {/* Email */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Mail className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-white">Email</h3>
                    <a href={`mailto:${businessInfo.contact.email}`} className="text-primary-400 hover:text-primary-300 underline">
                      {businessInfo.contact.email}
                    </a>
                    <p className="text-gray-200 mt-1">
                      We respond to all inquiries within 24 hours during business days.
                    </p>
                  </div>
                </div>
                {/* Phone */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <Phone className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-white">Phone</h3>
                    <a href={`tel:${businessInfo.contact.phone}`} className="text-primary-400 hover:text-primary-300 underline">
                      {businessInfo.contact.phone}
                    </a>
                    <p className="text-gray-200 mt-1">
                      Available 7 days a week, 8AM-9PM CST
                    </p>
                  </div>
                </div>
                {/* Address */}
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                    <MapPin className="h-6 w-6 text-primary-600" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-1 text-white">Studio Location</h3>
                    <p className="text-gray-200">
                      {businessInfo.address.fullAddress}
                    </p>
                    <p className="text-gray-200 mt-1">
                      Serving Pinehurst, Montgomery County, The Woodlands, and Greater Houston Area
                    </p>
                    <p className="text-gray-200 mt-1">
                      Studio visits by appointment only
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {/* FAQ Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">How far in advance should I book my photography session?</h3>
              <p className="text-gray-600">
                For wedding photography, we recommend booking 6-12 months in advance. For portrait sessions and other events, 2-4 weeks notice is typically sufficient, but availability may vary during peak seasons.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">What is your payment policy?</h3>
              <p className="text-gray-600">
                We require a 50% deposit to secure your booking date, with the remaining balance due one week before the session or event. For wedding photography, we offer payment plans.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">How many photos will I receive?</h3>
              <p className="text-gray-600">
                The number of photos varies by package and session length. Typically, portrait sessions yield 20-40 edited images, while weddings can range from 300-800 photos. We focus on quality over quantity to deliver the best representation of your event.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">How long until I receive my photos?</h3>
              <p className="text-gray-600">
                Portrait sessions are typically delivered within 1-2 weeks. Wedding and event photography can take 4-6 weeks due to the higher volume of images and detailed editing process. We'll provide select preview images within days of your session.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold mb-2">Do you travel for photography sessions?</h3>
              <p className="text-gray-600">
                Yes, we travel locally and internationally for photography assignments. Local travel within 30 miles is included in our standard rates. For destinations beyond that, additional travel fees apply.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SEO Text Block */}
      <section className="py-14 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Book a Photography Session in Pinehurst, TX</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Ready to book professional photography in Pinehurst, Texas or anywhere in Montgomery County? Studio37 Photography makes it easy to get started. Use the contact form above, call us directly at (832) 713-9944, or email sales@studio37.cc to inquire about availability, pricing, and custom packages. We respond to all inquiries within 24 hours, 7 days a week. Our studio serves clients across Pinehurst, The Woodlands, Conroe, Magnolia, Tomball, Spring, Montgomery, Willis, New Caney, Hockley, Huntsville, and the Greater Houston metro area for weddings, family portraits, senior photos, newborn sessions, corporate headshots, event coverage, commercial product photography, and brand content creation. Whether you're looking for a one-hour portrait session starting at $350 or a comprehensive wedding day package with two photographers included, Studio37 has a solution tailored to your needs and budget. Studio visits are available by appointment at 1701 Goodson Loop Unit 80, Pinehurst, TX 77362. We also offer phone and video consultations for clients located further away. Contact us today and let's start planning your session.
            </p>
            <p className="text-sm text-gray-500">
              Studio37 Photography · Pinehurst, TX · Phone: (832) 713-9944 · Email: sales@studio37.cc · Serving Montgomery County, The Woodlands, Conroe, Magnolia, Tomball, Spring, Montgomery, Willis, New Caney, Hockley, Huntsville &amp; Greater Houston
            </p>
          </div>
        </div>
      </section>

      <section className="py-10 bg-gray-50 border-y border-gray-200">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-3">Need a City-Specific Page?</h2>
            <p className="text-gray-700 mb-4">
              Use our service-area pages to review local coverage details and book faster.
            </p>
            <div className="flex flex-wrap gap-3 text-sm">
              <a href="/locations" className="px-3 py-2 rounded-full bg-white border border-gray-300 hover:border-primary-300">All Locations</a>
              <a href="/new-caney" className="px-3 py-2 rounded-full bg-white border border-gray-300 hover:border-primary-300">New Caney</a>
              <a href="/willis" className="px-3 py-2 rounded-full bg-white border border-gray-300 hover:border-primary-300">Willis</a>
              <a href="/hockley" className="px-3 py-2 rounded-full bg-white border border-gray-300 hover:border-primary-300">Hockley</a>
              <a href="/bryan" className="px-3 py-2 rounded-full bg-white border border-gray-300 hover:border-primary-300">Bryan</a>
              <a href="/college-station" className="px-3 py-2 rounded-full bg-white border border-gray-300 hover:border-primary-300">College Station</a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-8 items-center">
            <a href="https://ppa.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
              <Image
                src="https://www.ppa.com/assets/images/pages/PPA_logo1_COLOR_RGB_Meta.png"
                alt="Professional Photographers of America"
                width={160}
                height={80}
                className="h-16 md:h-20 w-auto object-contain"
                unoptimized
              />
            </a>
            <a href="https://www.fullframeinsurance.com" target="_blank" rel="noopener noreferrer" className="hover:opacity-90 transition-opacity">
              <Image
                src="https://app.fullframeinsurance.com/media/site_seals/0001/06/3b90b57044c80c69bd9c02042952a0a33dce7681.png"
                alt="Full Frame Insurance Seal"
                width={150}
                height={128}
                className="h-24 md:h-32 w-auto object-contain"
                unoptimized
              />
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}
