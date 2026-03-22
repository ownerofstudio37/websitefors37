import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/seo'
import { ChevronLeft } from 'lucide-react'

export const metadata = generateSEOMetadata({
  title: 'Portrait Session Prep | Studio37',
  description:
    'Get ready for your portrait session. Learn what to wear, what to bring, and how to prepare for stunning personal photos.',
  path: '/session-prep/portrait',
})

export const revalidate = 86400

export default function PortraitSessionPrep() {
  return (
    <main className="min-h-screen bg-white">
      <div className="border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
        <Link
          href="/session-prep"
          className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          Back to All Guides
        </Link>
      </div>

      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Portrait Session Prep
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Personal portraits are about capturing who you are in your best light. This guide will help you
            prepare for a relaxed, enjoyable session that results in photos you'll love.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Clothing & Styling</h2>
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">What to Wear</h3>
                <ul className="mt-2 space-y-2 text-gray-700">
                  <li>• Choose fitted clothing that flatters your figure</li>
                  <li>• Solid colors or subtle patterns work best (avoid busy prints)</li>
                  <li>• Neutral tones (black, white, gray, navy, blush) photograph beautifully</li>
                  <li>• Layer your outfit for versatility during the shoot</li>
                  <li>• Wear comfortable shoes if the session includes standing or walking</li>
                  <li>• Bring a change of outfit if you'd like variety in your photos</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Hair & Makeup</h3>
                <ul className="mt-2 space-y-2 text-gray-700">
                  <li>• Schedule hair and makeup for the morning of your session if possible</li>
                  <li>• Have your hair styled the way you want it photographed</li>
                  <li>• Enhance makeup slightly more than usual for the camera</li>
                  <li>• Bring touch-up supplies for makeup and hair</li>
                  <li>• Consider your usual style rather than trying something completely new</li>
                  <li>• Bring bobby pins, hair ties, or clips for styling adjustments</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Before the Session</h2>
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">The Day Before</h3>
                <ul className="mt-2 space-y-2 text-gray-700">
                  <li>• Plan and lay out your outfit</li>
                  <li>• Get a good night's sleep (8+ hours)</li>
                  <li>• Avoid excessive sun exposure</li>
                  <li>• Stay hydrated and drink plenty of water</li>
                  <li>• Avoid alcohol the night before</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Day of Session</h3>
                <ul className="mt-2 space-y-2 text-gray-700">
                  <li>• Eat a light, healthy breakfast</li>
                  <li>• Arrive 10-15 minutes early to relax</li>
                  <li>• Take a few minutes to decompress and get comfortable</li>
                  <li>• Use the restroom before we start shooting</li>
                  <li>• Bring water and stay hydrated throughout</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">What to Bring</h2>
            <div className="mt-6 rounded-lg bg-blue-50 p-6">
              <ul className="space-y-2 text-gray-700">
                <li>✓ A second outfit (optional but recommended)</li>
                <li>✓ Makeup and hair touch-up supplies</li>
                <li>✓ Comfortable shoes or flats for between shots</li>
                <li>✓ Water bottle and snacks</li>
                <li>✓ A phone charger if you'd like to share photos in real-time</li>
                <li>✓ Jewelry or accessories that make you feel confident</li>
                <li>✓ A friend for support and encouragement (optional)</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Posing & Comfort Tips</h2>
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">Feeling Confident in Front of the Camera</h3>
                <ul className="mt-2 space-y-2 text-gray-700">
                  <li>• Don't worry about poses—I'll guide you through everything</li>
                  <li>• Think of something that makes you smile (a favorite memory, inside joke, etc.)</li>
                  <li>• Relax your shoulders and take deep breaths</li>
                  <li>• Movement is flattering—we'll walk, adjust, and shift positions naturally</li>
                  <li>• The camera captures genuine moments better than forced smiles</li>
                  <li>• We take many shots, so you'll have plenty of amazing options</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-gray-900">Questions Before Your Session?</h2>
            <p className="mt-3 text-gray-700">
              Feel free to reach out! I'm happy to discuss outfit ideas, locations, or anything else to help
              you feel prepared and confident.
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

      <section className="border-t border-gray-200 bg-blue-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-gray-900">Ready for Your Session?</h2>
          <p className="mt-3 text-gray-700">Let's create beautiful portraits together.</p>
          <Link
            href="/book-a-session"
            className="mt-6 inline-block rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
          >
            Book Your Session
          </Link>
        </div>
      </section>
    </main>
  )
}
