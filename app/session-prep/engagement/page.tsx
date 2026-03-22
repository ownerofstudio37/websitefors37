import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/seo'
import { ChevronLeft } from 'lucide-react'

export const metadata = generateSEOMetadata({
  title: 'Engagement Session Prep | Studio37',
  description:
    'Prepare for your engagement photo session. Tips on outfits, locations, timing, and how to capture authentic couple moments.',
  path: '/session-prep/engagement',
})

export const revalidate = 86400

export default function EngagementSessionPrep() {
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
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Engagement Session Prep</h1>
          <p className="mt-4 text-lg text-gray-600">
            Your engagement session celebrates your unique relationship. This guide will help you prepare for
            an authentic, romantic, and fun experience.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Outfits & Styling</h2>
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">Coordinating Your Looks</h3>
                <ul className="mt-2 space-y-2 text-gray-700">
                  <li>• Coordinate colors and vibes without matching exactly</li>
                  <li>• Complementary color palettes (neutrals, jewel tones, pastels)</li>
                  <li>• Both partners should feel comfortable and confident in their outfits</li>
                  <li>• Bring 1-2 outfit changes for variety</li>
                  <li>• Avoid large logos, busy patterns, or busy colors that distract from your faces</li>
                  <li>• Consider the location and season when planning outfits</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Hair & Makeup</h3>
                <ul className="mt-2 space-y-2 text-gray-700">
                  <li>• Schedule professional hair/makeup or do what makes you feel confident</li>
                  <li>• Hair should frame your face nicely for close-up couple shots</li>
                  <li>• Makeup should be slightly enhanced for camera</li>
                  <li>• Bring touch-up supplies for both partners</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Location & Vibe</h2>
            <div className="mt-6 space-y-4">
              <ul className="space-y-2 text-gray-700">
                <li>• Discuss meaningful locations with your photographer</li>
                <li>• Where did you first meet? First date? Propose?</li>
                <li>• Beautiful natural settings: parks, gardens, waterfronts, hiking spots</li>
                <li>• Urban locations: streets, alleyways, architectural backdrops</li>
                <li>• Golden hour (1 hour before sunset) offers the best natural light</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Before Your Session</h2>
            <div className="mt-6 space-y-4">
              <ul className="space-y-2 text-gray-700">
                <li>• Get a good night's sleep the night before</li>
                <li>• Eat a light meal to maintain energy</li>
                <li>• Arrive 15 minutes early for touch-ups and to relax</li>
                <li>• Discuss your vision and any special moments with your photographer</li>
                <li>• Communicate any concerns or ideas</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">What to Bring</h2>
            <div className="mt-6 rounded-lg bg-rose-50 p-6">
              <ul className="space-y-2 text-gray-700">
                <li>✓ 1-2 additional outfit changes</li>
                <li>✓ Hair and makeup touch-up supplies</li>
                <li>✓ Comfortable backup shoes</li>
                <li>✓ Water bottles for both of you</li>
                <li>✓ Engagement ring (if it's new or important to the photos)</li>
                <li>✓ Light wrap or jacket (weather dependent)</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">During the Session</h2>
            <div className="mt-6 space-y-4">
              <ul className="space-y-2 text-gray-700">
                <li>• I'll guide poses, but the best photos come from genuine interaction</li>
                <li>• Talk to each other, joke, laugh, and be yourselves</li>
                <li>• The camera captures real smiles and connection</li>
                <li>• Don't worry about feeling awkward—it's normal at first</li>
                <li>• By the end, you'll both be relaxed and having fun</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-gray-900">Questions Before Your Session?</h2>
            <p className="mt-3 text-gray-700">
              I'm here to help you prepare and ensure your session is comfortable and amazing. Reach out anytime!
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

      <section className="border-t border-gray-200 bg-rose-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-gray-900">Let's Capture Your Love Story</h2>
          <p className="mt-3 text-gray-700">Book your engagement session today.</p>
          <Link
            href="/services/engagement-session"
            className="mt-6 inline-block rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
          >
            View Engagement Packages
          </Link>
        </div>
      </section>
    </main>
  )
}
