import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { ChevronLeft } from 'lucide-react'

export const metadata = generateSEOMetadata({
  title: 'Event Photography Prep | Studio37',
  description:
    'Prepare for event coverage. Timing, access details, key moments to capture, and coordination tips for conferences, celebrations, and corporate events.',
  path: '/session-prep/event',
})

export const revalidate = 86400

export default function EventSessionPrep() {
  return (
    <main className="min-h-screen bg-white">
      <div className="border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
        <Link href="/session-prep" className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900">
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to All Guides
        </Link>
      </div>

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Event Photography Prep</h1>
          <p className="mt-4 text-lg text-gray-600">
            Event coverage captures the energy, moments, and memories of your celebration. This guide covers
            coordination, access, and what to expect during coverage.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Pre-Event Planning</h2>
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">Timeline & Coverage Details</h3>
                <ul className="mt-2 space-y-2 text-gray-700">
                  <li>• Provide a detailed event timeline (start time, key moments, end time)</li>
                  <li>• Identify key moments to prioritize (speakers, awards, performances, etc.)</li>
                  <li>• Confirm arrival time and parking information</li>
                  <li>• Provide venue address, building access, and room details</li>
                  <li>• Discuss backup plans for timing changes or delays</li>
                  <li>• Confirm any restricted photography areas</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Access & Logistics</h3>
                <ul className="mt-2 space-y-2 text-gray-700">
                  <li>• Arrange for photographer's venue access (parking pass, entry badge, etc.)</li>
                  <li>• Brief security or staff about photographer's presence</li>
                  <li>• Provide contact info for day-of point person</li>
                  <li>• Confirm WiFi availability if instant photo sharing is needed</li>
                  <li>• Identify storage areas for equipment or belongings</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Event Type Coverage</h2>
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">Corporate Events & Conferences</h3>
                <ul className="mt-2 space-y-2 text-gray-700">
                  <li>✓ Keynote speakers and presentations</li>
                  <li>✓ Attendee networking and interaction</li>
                  <li>✓ Awards or recognition moments</li>
                  <li>✓ Sponsor booths and exhibits</li>
                  <li>✓ Group photos and candid moments</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Celebrations & Parties</h3>
                <ul className="mt-2 space-y-2 text-gray-700">
                  <li>✓ Guest arrivals and greetings</li>
                  <li>✓ Toasts and speeches</li>
                  <li>✓ Cake cutting or special moments</li>
                  <li>✓ Dancing and celebration energy</li>
                  <li>✓ Group photos and candid interactions</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Venue & Technical Setup</h2>
            <div className="mt-6 space-y-4">
              <ul className="space-y-2 text-gray-700">
                <li>• Describe venue lighting (bright, dim, colored, stage lighting)</li>
                <li>• Outdoor events: time of day and expected lighting conditions</li>
                <li>• Will photographer have full venue access?</li>
                <li>• Any restricted areas or elevated platforms needed?</li>
                <li>• Space for photographer to position for key moments</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Day-of Preparation</h2>
            <div className="mt-6 rounded-lg bg-purple-50 p-6">
              <ul className="space-y-2 text-gray-700">
                <li>✓ Detailed event timeline with key moments highlighted</li>
                <li>✓ List of VIPs or important people to photograph</li>
                <li>✓ Venue map or photos showing layout</li>
                <li>✓ Contact information for day-of point person</li>
                <li>✓ Parking pass and building access instructions</li>
                <li>✓ List of specific shots you don't want to miss</li>
                <li>✓ Photographer's contact number for all staff/organizers</li>
              </ul>
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 p-6">
            <h2 className="text-xl font-bold text-gray-900">Typical Coverage Duration</h2>
            <p className="mt-3 text-gray-700">
              Event coverage ranges from 2 to 10+ hours depending on your needs.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-gray-900">Questions or Special Requests?</h2>
            <p className="mt-3 text-gray-700">
              Every event is unique! Share your event's specific needs, and I'll tailor coverage to capture
              exactly what matters to you.
            </p>
            <Link
              href="/contact"
              className="mt-4 inline-block rounded-lg bg-gray-900 px-6 py-2 font-medium text-white transition-colors hover:bg-gray-800"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-gray-200 bg-purple-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-gray-900">Ready to Capture Your Event?</h2>
          <p className="mt-3 text-gray-700">Let's discuss your event and create a coverage plan.</p>
          <Link
            href="/get-quote"
            className="mt-6 inline-block rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
          >
            Get a Quote
          </Link>
        </div>
      </section>
    </main>
  )
}
