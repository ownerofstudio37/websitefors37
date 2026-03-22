import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { ChevronLeft } from 'lucide-react'

export const metadata = generateSEOMetadata({
  title: 'Wedding Day Photography Prep | Studio37',
  description:
    'Prepare for your wedding day photography. Timeline coordination, vendor communication, getting-ready shots, ceremony, and coverage details.',
  path: '/session-prep/wedding',
})

export const revalidate = 86400

export default function WeddingSessionPrep() {
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
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Wedding Day Photography Prep</h1>
          <p className="mt-4 text-lg text-gray-600">
            Your wedding day is special, and detailed planning ensures we capture every moment beautifully.
            This guide covers coordination, logistics, and what to expect throughout the day.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Pre-Wedding Planning</h2>
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">Timeline Coordination</h3>
                <ul className="mt-2 space-y-2 text-gray-700">
                  <li>• Finalize your detailed wedding timeline 2-3 weeks before</li>
                  <li>• Include getting-ready start time, first look, ceremony time, photos, reception start</li>
                  <li>• Schedule 15-30 minutes for family portraits after ceremony</li>
                  <li>• Plan 30 minutes for couple portraits (ideally during golden hour)</li>
                  <li>• Confirm arrival time for your photographer(s)</li>
                  <li>• Send timeline to all vendors (florist, hair, makeup, venue)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Communication & Contact Info</h3>
                <ul className="mt-2 space-y-2 text-gray-700">
                  <li>• Provide photographer with all vendor contact information</li>
                  <li>• Designate a point person (usually bride or coordinator) for day-of communication</li>
                  <li>• Share photographer's contact number with your wedding coordinator</li>
                  <li>• Discuss contingency plans for timing delays</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Getting Ready Coverage</h2>
            <div className="mt-6 space-y-4">
              <ul className="space-y-2 text-gray-700">
                <li>• Ensure getting-ready rooms have good natural light (near windows)</li>
                <li>• Confirm there's space for photographer to move around comfortably</li>
                <li>• Have steamer available for last-minute dress/suit touch-ups</li>
                <li>• Key moments: hair/makeup, putting on jewelry, getting dressed, final looks</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Ceremony Coverage</h2>
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">Logistics</h3>
                <ul className="mt-2 space-y-2 text-gray-700">
                  <li>• Inform officiant that photographer will be discreet</li>
                  <li>• Confirm any restrictions on movement or positioning</li>
                  <li>• Identify key processional moments (bridesmaids, groomsmen, bride arrival)</li>
                  <li>• Arrive 15 minutes early for pre-ceremony setup</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Key Moments</h3>
                <ul className="mt-2 space-y-2 text-gray-700">
                  <li>✓ Bride's arrival/entrance</li>
                  <li>✓ Exchange of vows and rings</li>
                  <li>✓ First kiss as married couple</li>
                  <li>✓ Recessional and celebratory exit</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Reception Coverage</h2>
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">Key Moments</h3>
                <ul className="mt-2 space-y-2 text-gray-700">
                  <li>✓ Grand entrance and first dance</li>
                  <li>✓ Parent dances</li>
                  <li>✓ Toasts and speeches</li>
                  <li>✓ Cutting the cake</li>
                  <li>✓ Bouquet and garter toss</li>
                  <li>✓ Dancing and guest interactions</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 p-6">
            <h2 className="text-xl font-bold text-gray-900">Typical Coverage Hours</h2>
            <p className="mt-3 text-gray-700">
              Wedding packages typically range from 4 to 12+ hours depending on your needs.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-gray-900">Questions or Special Requests?</h2>
            <p className="mt-3 text-gray-700">
              Your wedding day is unique, and I'm here to ensure we capture it exactly as you envision.
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

      <section className="border-t border-gray-200 bg-amber-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-gray-900">Ready to Plan Your Wedding Coverage?</h2>
          <p className="mt-3 text-gray-700">Let's discuss your vision and create a comprehensive photography plan.</p>
          <Link
            href="/contact"
            className="mt-6 inline-block rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
          >
            Get in Touch
          </Link>
        </div>
      </section>
    </main>
  )
}
