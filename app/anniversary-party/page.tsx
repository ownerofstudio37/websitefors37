import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'
import PortraitSubServiceSupport from '@/components/PortraitSubServiceSupport'

export const metadata = generateSEOMetadata({
  title: 'Anniversary Party Photography - Studio37',
  description:
    'Celebrate your anniversary with professional photography. Marriage milestones, renewal ceremonies, and anniversary celebration photography in Houston.',
  canonicalUrl: 'https://www.studio37.cc/anniversary-party',
  pageType: 'service',
})

export const revalidate = 86400

const packages = [
  {
    name: 'Celebration Coverage',
    price: '$600',
    duration: '3 hours',
    features: ['3 hours coverage', '1 photographer', 'Candid & posed shots', 'Digital gallery', 'Professional edits'],
  },
  {
    name: 'Anniversary Showcase',
    price: '$1,100',
    duration: '5 hours',
    features: ['5 hours coverage', '2 photographers', 'Couple session included', 'Custom album', 'Video highlights'],
    popular: true,
  },
  {
    name: 'Premium Celebration',
    price: '$1,800+',
    duration: 'Full coverage',
    features: ['Full day coverage', 'Multiple photographers', 'Renewal ceremony', 'Professional video', 'Drone footage'],
  },
]

export default function AnniversaryPartyPage() {
  const serviceSchema = generateServiceSchema(
    'Anniversary Party Photography',
    'Anniversary party photography in the Houston and Montgomery County area for milestone anniversaries, vow renewals, couple portraits, event coverage, and private gallery delivery.'
  )

  return (
    <main className="w-full">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      {/* Hero Section */}
      <section className="relative w-full h-[500px] md:h-[600px] overflow-hidden bg-black">
        <Image
          src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1769255431/PS371181_gwnsc4.jpg"
          alt="Professional anniversary party photography"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Anniversary Party Photography</h1>
          <p className="text-xl text-gray-200 max-w-2xl">
            Celebrate your years of love with beautiful photography capturing the joy of this milestone moment
          </p>
        </div>
      </section>

      {/* Package Options */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Anniversary Photography Packages</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Beautiful coverage celebrating your love story and years together
          </p>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={`border rounded-lg p-8 hover:shadow-lg transition ${
                  pkg.popular ? 'border-2 border-rose-600 bg-rose-50' : 'border-gray-200'
                }`}
              >
                {pkg.popular && (
                  <div className="inline-block bg-rose-600 text-white px-4 py-1 rounded-full text-sm mb-2 font-semibold">
                    Most Popular
                  </div>
                )}
                <h3 className="text-2xl font-bold mb-2">{pkg.name}</h3>
                <p className="text-4xl font-bold text-rose-600 mb-2">{pkg.price}</p>
                <p className="text-gray-600 mb-4">{pkg.duration}</p>
                <ul className="space-y-2 mb-8">
                  {pkg.features.map((feature) => (
                    <li key={feature} className="text-gray-700 flex items-center">
                      <span className="text-green-600 mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
                <Link href={`/book-consultation?package=${encodeURIComponent(pkg.name)}`} className="block w-full rounded-lg bg-rose-600 py-2 text-center text-white transition hover:bg-rose-700">
                  Book Consultation
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <PortraitSubServiceSupport
        service="anniversary party photography"
        parentHref="/services/event-photography"
        parentLabel="event photography"
        proof={[
          'Couple portraits, family combinations, decor, toasts, dancing, and guest candids.',
          'Milestone anniversary examples with multi-generational coverage and relaxed direction.',
          'Private galleries that show the full celebration, not only a few highlight images.',
        ]}
        planning={['Couple portrait time', 'Family group list', 'Toast and dance moments']}
        objection="Anniversary parties are emotional and family-heavy. We plan the people, timing, and must-have moments so the gallery honors the couple and the guests who came to celebrate them."
      />

      {/* SEO Content Block */}
      <section className="py-12 px-4 md:px-8 lg:px-16 bg-gray-50">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-2xl font-bold mb-6">Celebrate Your Years of Love with Professional Photography</h2>

          <div className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Studio37 Photography specializes in anniversary party photography across the Houston area, including
              Pinehurst, The Woodlands, Conroe, Magnolia, Tomball, Spring, and surrounding communities. Anniversary
              celebrations are beautiful milestones that deserve professional photography—documenting not just the
              party, but the love and commitment that defines your years together.
            </p>

            <p>
              Whether you're celebrating 25 years, 50 years, or any anniversary milestone, we capture the joy, elegance,
              and emotion of the occasion. From intimate anniversary dinners to lavish parties with family and friends,
              our photographers document every special moment with artistry and care.
            </p>

            <h3 className="text-xl font-semibold mt-6 mb-3">Anniversary Photography Coverage:</h3>
            <ul className="space-y-2 ml-4">
              <li>• <strong>Couple Portraits:</strong> Romantic and elegant photos of the anniversary couple</li>
              <li>• <strong>Renewal Ceremonies:</strong> Vow renewal moments and ceremonial photography</li>
              <li>• <strong>Party Details:</strong> Elegant decorations, anniversary cake, and themed elements</li>
              <li>• <strong>Family Moments:</strong> Multi-generational photos and grandchildren with grandparents</li>
              <li>• <strong>Candid Celebrations:</strong> Toasts, dancing, laughter, and joy-filled moments</li>
              <li>• <strong>Guest Recognition:</strong> Friends and family who helped make the celebration special</li>
            </ul>

            <p className="mt-6">
              Anniversary photography serves as a beautiful keepsake of your milestone celebration. Many couples use
              these photos to create anniversary albums, frame portraits for their home, or share with family who
              couldn't attend. We provide professional edits, digital galleries, and print-ready files suitable for
              framing or album creation.
            </p>

            <p>
              We understand that anniversary celebrations are deeply personal—whether it's a quiet intimate dinner or
              a grand party with hundreds of guests. Our photographers customize their approach to capture the specific
              vision and feeling of your celebration.
            </p>

            <p>
              Serving all major areas in greater Houston including Montgomery County, Harris County, and surrounding
              regions. Perfect for anniversary parties, milestone celebrations, and vow renewal photography throughout
              the Houston area.
            </p>
          </div>

          <div className="mt-8 p-4 bg-rose-50 rounded-lg">
            <p className="text-gray-800">
              Ready to capture your anniversary celebration?{' '}
              <Link href="/services/event-photography" className="text-rose-600 hover:underline font-semibold">
                Explore our full event photography services →
              </Link>
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
