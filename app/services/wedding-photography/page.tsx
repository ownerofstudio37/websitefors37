import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { generateSEOMetadata, generateFAQSchema } from '@/lib/seo-helpers'
import { generateOfferSchema } from '@/lib/enhanced-seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'
import { Heart, Camera, Clock, Star, CheckCircle, ArrowRight } from 'lucide-react'
import FAQSection from '@/components/FAQSection'

export const metadata = generateSEOMetadata({
  title: 'Wedding Photography Pinehurst TX - Studio37 Professional Wedding Photographer',
  description: 'Studio37 offers professional wedding photography services in Pinehurst, Texas and surrounding areas. Capturing your special day with romantic, timeless images. Serving Montgomery County, The Woodlands, and Houston.',
  keywords: [
    'wedding photography Pinehurst TX',
    'wedding photographer Texas',
    'Montgomery County wedding photography',
    'The Woodlands wedding photographer',
    'Houston wedding photography',
    'bridal photography Texas',
    'engagement photography Pinehurst',
    'wedding photos Montgomery County'
  ],
  canonicalUrl: 'https://www.studio37.cc/services/wedding-photography',
  pageType: 'service'
})

// Static marketing page; revalidate daily
export const revalidate = 86400

const weddingFAQs = [
  {
    question: "How far in advance should I book my wedding photographer in Pinehurst, TX?",
    answer: "We recommend booking your wedding photographer 6-12 months in advance, especially for popular wedding dates in Montgomery County. Spring and fall wedding seasons book up quickly in the Pinehurst and The Woodlands area."
  },
  {
    question: "Do you travel to wedding venues outside of Pinehurst?",
    answer: "Yes! We regularly photograph weddings throughout Montgomery County, including The Woodlands, Spring, Magnolia, and Conroe. We also travel to Houston area venues. Travel fees may apply for venues more than 50 miles from Pinehurst."
  },
  {
    question: "What's included in your wedding photography packages?",
    answer: "All packages include professional editing, high-resolution digital gallery, and personal usage rights. Our Complete and Premium packages also include engagement sessions, and the Premium package includes two photographers. We can customize packages to fit your specific needs."
  },
  {
    question: "How many photos will we receive from our wedding?",
    answer: "Photo counts vary by package and wedding length, but typically range from 50+ photos for our Essential package to 300+ for Premium coverage. We deliver all the best moments from your day, professionally edited and gallery-ready."
  },
  {
    question: "Do you offer engagement sessions in Montgomery County?",
    answer: "Absolutely! Engagement sessions are included in our Complete and Premium packages, or can be booked separately. We know all the best locations in Pinehurst, The Woodlands, and surrounding areas for beautiful engagement photos."
  },
  {
    question: "What happens if there's bad weather on our wedding day?",
    answer: "As experienced Texas wedding photographers, we're prepared for all weather conditions. We bring lighting equipment for indoor ceremonies and have backup plans for outdoor events. Rain often creates unique and romantic photo opportunities!"
  },
  {
    question: "Can we see full wedding galleries from your previous work?",
    answer: "Yes! We'd be happy to share complete wedding galleries during your consultation so you can see our full documentation style and editing approach. This helps ensure we're the right fit for your vision."
  },
  {
    question: "Do you photograph both the ceremony and reception?",
    answer: "Our Standard and Premium packages include full day coverage from getting ready through reception. We capture all the important moments including ceremony, family photos, couple portraits, and reception festivities including your first dance and cake cutting."
  }
]

export default function WeddingPhotographyPage() {
  const serviceSchema = generateServiceSchema(
    'Wedding Photography',
    'Professional wedding photography services in Pinehurst, Texas. Capturing your special day with romantic and timeless images that tell your love story.'
  )

  const faqSchema = generateFAQSchema(weddingFAQs)
  
  // Add Offer schemas for pricing packages
  const essentialOfferSchema = generateOfferSchema({
    name: 'Essential Coverage',
    price: '2200',
    description: '6 hours coverage, Duo Experience with two photographers, 300+ edited photos, 48-hour sneak peek, private digital gallery',
    availability: 'https://schema.org/InStock'
  })
  
  const completeOfferSchema = generateOfferSchema({
    name: 'Complete Collection',
    price: '3200',
    description: '8 hours continuous coverage, Duo Experience, 500+ edited photos, engagement session, 24-hour highlights gallery, timeline consultation',
    availability: 'https://schema.org/InStock'
  })

  const premiumOfferSchema = generateOfferSchema({
    name: 'Premium Collection',
    price: '4500',
    description: '10+ hours full-day coverage, Duo Experience, 700+ edited photos, engagement + bridal/rehearsal coverage, 3-week delivery, $200 heirloom album credit',
    availability: 'https://schema.org/InStock'
  })

  const microOfferSchema = generateOfferSchema({
    name: 'Micro / Elopement',
    price: '1200',
    description: '3 hours intimate coverage for elopements and guest counts under 30, Duo Experience, 150+ edited photos, 48-hour sneak peek, private gallery with print release',
    availability: 'https://schema.org/InStock'
  })

  return (
    <div className="pt-16">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(essentialOfferSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(completeOfferSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(premiumOfferSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(microOfferSchema) }}
      />

      {/* Hero Section */}
      <section className="relative h-[480px] bg-gradient-to-r from-rose-900 to-amber-900">
        <div className="absolute inset-0 opacity-40">
          <Image
            src="https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=1200&h=600&fit=crop"
            alt="Wedding photography by Studio37 in Pinehurst TX"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-2xl">
            <p className="eyebrow-hero mb-3">The Duo Experience · Pinehurst, TX</p>
            <h1 className="text-5xl font-bold mb-4">Wedding Photography in Pinehurst, TX</h1>
            <p className="text-xl mb-3 text-white/90">
              Your love story deserves to be captured beautifully. Studio37 specializes in romantic, 
              timeless wedding photography throughout Montgomery County and surrounding areas.
            </p>
            <p className="text-base mb-8 text-white/70">
              Wedding coverage starts at $1,200 with two photographers on every collection.
            </p>
            <Link 
              href="/book-consultation" 
              className="btn-primary text-lg px-8 py-4 inline-flex items-center"
            >
              Book a Consultation <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Two Photographers Announcement */}
      <div className="bg-primary-50 border-y border-primary-200">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-primary-800 font-medium">
            The Duo Experience on every wedding day — more angles, more moments, one seamless team.
          </p>
        </div>
      </div>

      {/* Service Details */}
      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">Why Choose Studio37 for Your Wedding?</h2>
              <p className="text-lg text-stone-600 mb-8">
                Based in Pinehurst, Texas, we understand the unique beauty of Montgomery County venues 
                and the importance of capturing every precious moment of your special day.
              </p>
              
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Full Day Coverage</h3>
                    <p className="text-stone-600">From getting ready to the last dance, we capture every moment</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Engagement Session Included</h3>
                    <p className="text-stone-600">Get comfortable with us before your big day</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">High-Resolution Digital Gallery</h3>
                    <p className="text-stone-600">All your photos delivered in a beautiful online gallery</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-green-600 flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold mb-1">Professional Print Options</h3>
                    <p className="text-stone-600">Albums, prints, and canvas options available</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Image
                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600&h=400&fit=crop"
                alt="Wedding ceremony photography in Montgomery County TX"
                width={600}
                height={400}
                className="rounded-[var(--radius-card)] shadow-[var(--shadow-strong)]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Service Areas */}
      <section className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Wedding Photography Service Areas</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              We provide wedding photography services throughout Montgomery County and surrounding Texas areas
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
                <div key={area} className="surface-panel p-6 text-center">
                  {slug ? (
                    <Link href={slug} className="font-semibold text-stone-800 hover:text-primary-600">
                      {area}
                    </Link>
                  ) : (
                    <h3 className="font-semibold text-stone-800">{area}</h3>
                  )}
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <p className="eyebrow mb-2">Transparent Pricing</p>
            <h2 className="text-3xl font-bold mb-4">Wedding Photography Packages</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Choose the perfect package for your special day in Pinehurst, TX.
            </p>
          </div>

          <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-8 items-start">
            <div className="surface-panel p-8 flex flex-col h-full">
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-1">Essential Coverage</p>
                <p className="text-4xl font-bold text-stone-900">$2,200</p>
                <p className="text-sm text-stone-500 mt-1">6 hours of coverage</p>
              </div>
              <ul className="space-y-2 mb-8 flex-1">
                {[
                  '6 Hours of Wedding Coverage (perfect for intimate ceremonies)',
                  'The Duo Experience: Signature two-photographer coverage included',
                  '300+ High-Resolution Edited Photos',
                  '48-Hour “First Look” Sneak Peek',
                  'Private Digital Gallery for easy downloading and sharing',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-stone-700">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/book-consultation" className="btn-secondary w-full text-center block">
                Choose Essential
              </Link>
            </div>

            <div className="surface-panel p-8 flex flex-col h-full border-2 border-primary-400 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                  <Star className="h-3 w-3" /> Most Popular
                </span>
              </div>
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-primary-600 mb-1">Complete Collection</p>
                <p className="text-4xl font-bold text-stone-900">$3,200</p>
                <p className="text-sm text-stone-500 mt-1">8 hours of continuous coverage</p>
              </div>
              <ul className="space-y-2 mb-8 flex-1">
                {[
                  '8 Hours of Continuous Coverage',
                  'The Duo Experience: Two perspectives, zero missed moments',
                  '500+ High-Resolution Edited Photos',
                  'Complimentary Engagement Session',
                  '24-Hour “Highlights” Gallery',
                  'Custom Wedding Timeline Consultation',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-stone-700">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/book-consultation" className="btn-primary w-full text-center block">
                Choose Complete
              </Link>
            </div>

            <div className="surface-panel p-8 flex flex-col h-full">
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-1">Premium Collection</p>
                <p className="text-4xl font-bold text-stone-900">$4,500</p>
                <p className="text-sm text-stone-500 mt-1">10+ hours / full day coverage</p>
              </div>
              <ul className="space-y-2 mb-8 flex-1">
                {[
                  '10+ Hours / Full Day Coverage',
                  'The Duo Experience: Ultimate coverage security',
                  '700+ High-Resolution Edited Photos',
                  'Engagement Session + Bridal or Rehearsal Coverage',
                  'Priority 3-Week Gallery Delivery',
                  'Heirloom Album Credit ($200 value)',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-stone-700">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/book-consultation" className="btn-secondary w-full text-center block">
                Choose Premium
              </Link>
            </div>

            <div className="surface-panel p-8 flex flex-col h-full">
              <div className="mb-4">
                <p className="text-xs font-semibold uppercase tracking-widest text-stone-500 mb-1">Micro / Elopement</p>
                <p className="text-4xl font-bold text-stone-900">$1,200</p>
                <p className="text-sm text-stone-500 mt-1">3 hours of intimate coverage</p>
              </div>
              <p className="text-sm text-stone-600 mb-4">Perfect for backyard, courthouse, or small chapel ceremonies.</p>
              <ul className="space-y-2 mb-8 flex-1">
                {[
                  '3 Hours of Intimate Coverage (guest count under 30)',
                  'The Duo Experience: both photographers on-site',
                  '150+ High-Resolution Edited Photos',
                  '48-Hour Sneak Peek',
                  'Private Digital Gallery + Print Release',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm text-stone-700">
                    <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <Link href="/book-consultation" className="btn-secondary w-full text-center block">
                Choose Micro / Elopement
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Want a Custom Wedding Collection?</h2>
            <p className="text-lg text-stone-600 max-w-2xl mx-auto">
              Book a consultation and we&apos;ll build coverage around your timeline, venue plans, and must-have moments.
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <div className="surface-panel p-8 border-2 border-primary-300 relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-xs font-semibold">
                  Custom Collection
                </span>
              </div>
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl font-bold mb-4">Create a Wedding Package That Fits Your Day</h3>
                  <p className="text-stone-600 mb-6">
                    Ideal for multi-day celebrations, custom timelines, engagement add-ons, or unique venue logistics.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2 text-stone-700">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Coverage tailored to your timeline</span>
                    </li>
                    <li className="flex items-start gap-2 text-stone-700">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Flexible add-ons and deliverables</span>
                    </li>
                    <li className="flex items-start gap-2 text-stone-700">
                      <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
                      <span>Guidance on planning and priorities</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-primary-50 rounded-lg p-6 border border-primary-100">
                  <p className="text-sm uppercase tracking-wide text-primary-700 font-semibold mb-2">Built around your day</p>
                  <p className="text-stone-700 mb-6">
                    We&apos;ll help you map out the right amount of coverage and create a collection that matches your wedding plans.
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

      {/* FAQ Section */}
      <FAQSection
        title="Wedding Photography FAQ"
        serviceName="wedding photography"
        faqs={weddingFAQs}
      />

      {/* SEO Text Block */}
      <section className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-stone-900 mb-4">Wedding Photography in Pinehurst, TX &amp; The Woodlands</h2>
            <p className="text-stone-700 leading-relaxed mb-4">
              Studio37 is Montgomery County's most trusted wedding photography team, capturing love stories across Pinehurst, The Woodlands, Conroe, Magnolia, Tomball, Spring, Montgomery, Willis, New Caney, Hockley, Huntsville, and Greater Houston. With our Signature Duo Coverage, both Christian and Caitie are present on your wedding day — giving you the coverage of two photographers at no extra cost. From the quiet anticipation of getting-ready details to the grandeur of your ceremony and the joy of the reception dance floor, every chapter of your day is preserved with artistry and care. We specialize in candid documentary-style wedding photography paired with refined editorial portraits, producing galleries that blend emotion, beauty, and storytelling. Our packages include full-day coverage, engagement sessions, bridal portrait sessions, and rehearsal dinner add-ons. We are proud PPA members, fully insured, and experienced with venues across Montgomery County, Harris County, and destination weddings beyond Texas. Start planning your dream wedding gallery by booking a complimentary consultation today.
            </p>
            <p className="text-sm text-stone-500">
              Serving: Pinehurst TX · The Woodlands · Conroe · Magnolia · Tomball · Spring · Montgomery · Willis · New Caney · Hockley · Huntsville · Houston
            </p>
            <p className="text-sm mt-2 text-primary-700">
              Popular wedding areas: <Link href="/the-woodlands" className="hover:underline">The Woodlands</Link>, <Link href="/montgomery" className="hover:underline">Montgomery</Link>, <Link href="/magnolia" className="hover:underline">Magnolia</Link>, <Link href="/college-station" className="hover:underline">College Station</Link>.
            </p>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary-600 to-amber-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Book Your Wedding Photography?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto text-white/90">
            Let's discuss your special day and create beautiful memories that will last a lifetime. 
            Serving couples throughout Pinehurst, Montgomery County, and beyond.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              href="/book-consultation" 
              className="btn-primary"
            >
              Book a Consultation
            </Link>
            <Link 
              href="/gallery" 
              className="btn-ghost border-white/40 text-white hover:text-white"
            >
              View Our Portfolio
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}