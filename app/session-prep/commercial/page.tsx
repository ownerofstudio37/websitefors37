import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/seo'
import { ChevronLeft } from 'lucide-react'

export const metadata = generateSEOMetadata({
  title: 'Commercial Photography Prep | Studio37',
  description:
    'Prepare for your commercial shoot. Brand photography, product shoots, content creation, and professional guidance for corporate visuals.',
  path: '/session-prep/commercial',
})

export const revalidate = 86400

export default function CommercialSessionPrep() {
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
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Commercial Photography Prep</h1>
          <p className="mt-4 text-lg text-gray-600">
            Professional brand and commercial photography requires strategic planning and clear vision. This
            guide ensures your shoot delivers high-quality assets for your business.
          </p>
        </div>
      </section>

      <section className="px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl space-y-12">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Pre-Shoot Planning & Strategy</h2>
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">Defining Your Vision</h3>
                <ul className="mt-2 space-y-2 text-gray-700">
                  <li>• Clarify your shoot goals (brand awareness, product showcase, content creation, etc.)</li>
                  <li>• Define your target audience and brand personality</li>
                  <li>• Gather style inspiration (websites, Instagram, mood boards)</li>
                  <li>• Identify 3-5 key messages or brand values to convey</li>
                  <li>• Create a shot list of must-have images</li>
                  <li>• Decide on aesthetics (bright/dark, minimalist/busy, colorful/neutral)</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Logistics & Schedule</h3>
                <ul className="mt-2 space-y-2 text-gray-700">
                  <li>• Confirm shoot date, time, and duration</li>
                  <li>• Identify all locations (studio, office, storefront, outdoor)</li>
                  <li>• Ensure locations are accessible and camera-ready</li>
                  <li>• Arrange parking and access for photographer and equipment</li>
                  <li>• Prepare any props, products, or materials in advance</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Shoot Types</h2>
            <div className="mt-6 space-y-6">
              <div>
                <h3 className="font-semibold text-gray-900">Brand & Headshot Photography</h3>
                <ul className="mt-2 space-y-2 text-gray-700">
                  <li>• Professional headshots for executives, team members, websites</li>
                  <li>• Clothing: business professional (suit, blazer) or business casual</li>
                  <li>• Hair and makeup: polished but natural-looking</li>
                  <li>• Backgrounds: clean, professional, on-brand</li>
                  <li>• Multiple outfit changes recommended for variety</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Product Photography</h3>
                <ul className="mt-2 space-y-2 text-gray-700">
                  <li>• Clean, well-lit product images for e-commerce or marketing</li>
                  <li>• Gather all products in excellent condition (clean, undamaged)</li>
                  <li>• Provide packaging, boxes, and accessories as needed</li>
                  <li>• Multiple angles and close-ups for detail shots</li>
                  <li>• Props or lifestyle context to show product in use</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Lifestyle & Content Creation</h3>
                <ul className="mt-2 space-y-2 text-gray-700">
                  <li>• In-action photography: people using products, working, collaborating</li>
                  <li>• Behind-the-scenes content: team culture, process, environment</li>
                  <li>• Authenticity is key: real moments, genuine interactions</li>
                  <li>• Multiple outfit changes and scenarios for variety</li>
                  <li>• Vertical and horizontal orientations for social media</li>
                </ul>
              </div>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Pre-Shoot Preparation</h2>
            <div className="mt-6 rounded-lg bg-slate-50 p-6">
              <h3 className="font-semibold text-gray-900 mb-4">Essential Preparation</h3>
              <ul className="space-y-2 text-gray-700">
                <li>✓ All products cleaned and in pristine condition</li>
                <li>✓ Props and styling materials gathered and tested</li>
                <li>✓ Locations cleaned, decluttered, and camera-ready</li>
                <li>✓ Lighting equipment set up (if studio shoot)</li>
                <li>✓ Backdrops and backgrounds prepared and positioned</li>
                <li>✓ Team members briefed on shoot schedule and their roles</li>
                <li>✓ Wardrobe selected and ready (try on beforehand if possible)</li>
                <li>✓ Hair and makeup coordinated (professional makeup artist if needed)</li>
              </ul>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-bold text-gray-900">Styling & Wardrobe</h2>
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="font-semibold text-gray-900">Professional Dress Code</h3>
                <ul className="mt-2 space-y-2 text-gray-700">
                  <li>• Reflect your brand and industry standards</li>
                  <li>• Business: Suit, blazer, dress pants, professional dresses</li>
                  <li>• Business Casual: Dress shirt, polo, chinos, skirts, dresses</li>
                  <li>• Creative/Startup: Neat jeans, trendy tops, stylish casual wear</li>
                  <li>• Fit is critical: clothing should fit well without being too tight</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Color & Pattern Guidance</h3>
                <ul className="mt-2 space-y-2 text-gray-700">
                  <li>• Solid colors photograph better than busy patterns</li>
                  <li>• Brand colors: wear colors that align with your brand identity</li>
                  <li>• Jewel tones (navy, burgundy, emerald) photograph beautifully</li>
                  <li>• Avoid neon or overly bright colors (unless specifically on-brand)</li>
                  <li>• Bring 1-2 outfit changes for variety</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="rounded-lg bg-gray-50 p-6">
            <h2 className="text-xl font-bold text-gray-900">Typical Coverage Duration</h2>
            <p className="mt-3 text-gray-700">
              Commercial shoots range from 2 to 10+ hours depending on scope.
            </p>
          </div>

          <div className="border-t border-gray-200 pt-8">
            <h2 className="text-xl font-bold text-gray-900">Questions or Strategic Consultation?</h2>
            <p className="mt-3 text-gray-700">
              I'm happy to discuss your brand vision, shot list, and strategy.
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

      <section className="border-t border-gray-200 bg-slate-50 px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-2xl font-bold text-gray-900">Ready for Your Commercial Shoot?</h2>
          <p className="mt-3 text-gray-700">Let's discuss your brand vision and create powerful professional imagery.</p>
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
