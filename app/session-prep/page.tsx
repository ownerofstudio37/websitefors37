import Link from 'next/link'
import Image from 'next/image'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateBreadcrumbSchema } from '@/lib/enhanced-seo-schemas'
import { generateFAQSchema } from '@/lib/schema'
import { HeartHandshake, Users, Cake, Briefcase, Camera } from 'lucide-react'
import PrepGuideLeadMagnet from '@/components/PrepGuideLeadMagnet'
import { prepGuideDownloads } from '@/lib/public-content'

export const metadata = generateSEOMetadata({
  title: 'Session Prep Guides | Studio37',
  description:
    'Get ready for your photo session. Tailored prep guides for portrait, engagement, wedding, event, and commercial photography.',
  canonicalUrl: 'https://www.studio37.cc/session-prep',
})

export const revalidate = 86400 // 24 hours

const prepGuides = [
  {
    serviceType: 'portrait',
    title: 'Portrait Sessions',
    description:
      'Personal portrait sessions capturing your personality and style in a relaxed, comfortable environment.',
    href: '/session-prep/portrait',
    icon: Camera,
    accentColor: 'from-blue-50 to-blue-100',
    iconColor: 'text-blue-600',
    image: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1769255559/PS379799_ayoxbp.jpg',
  },
  {
    serviceType: 'engagement',
    title: 'Engagement Sessions',
    description:
      'Celebrate your love story with curated locations, styling, and personalized direction for authentic couple moments.',
    href: '/session-prep/engagement',
    icon: HeartHandshake,
    accentColor: 'from-rose-50 to-rose-100',
    iconColor: 'text-rose-600',
    image: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1769255571/PS370262_buzjak.jpg',
  },
  {
    serviceType: 'wedding',
    title: 'Wedding Days',
    description:
      'Full-day coverage of your wedding with detailed timeline coordination, vendor communication, and editorial storytelling.',
    href: '/session-prep/wedding',
    icon: Cake,
    accentColor: 'from-amber-50 to-amber-100',
    iconColor: 'text-amber-600',
    image: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1769255614/IMG_8313_asvu5g.jpg',
  },
  {
    serviceType: 'event',
    title: 'Event Coverage',
    description:
      'Capture the energy and key moments of your event with flexible scheduling and candid documentary-style photography.',
    href: '/session-prep/event',
    icon: Users,
    accentColor: 'from-purple-50 to-purple-100',
    iconColor: 'text-purple-600',
    image: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1772505745/E275DB4A-2A41-4DE0-93BA-F161078CFE9C_1_105_c_jt4tiz.jpg',
  },
  {
    serviceType: 'commercial',
    title: 'Commercial Shoots',
    description:
      'Professional brand photography, product shoots, and content creation with technical precision and creative direction.',
    href: '/session-prep/commercial',
    icon: Briefcase,
    accentColor: 'from-slate-50 to-slate-100',
    iconColor: 'text-slate-600',
    image: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1769255703/PS373409_pwmxmp.jpg',
  },
]

const breadcrumbSchema = generateBreadcrumbSchema([
  { name: 'Home', url: 'https://www.studio37.cc' },
  { name: 'Session Prep', url: 'https://www.studio37.cc/session-prep' },
])

const prepFaqs = [
  {
    question: 'Which prep guide should I choose?',
    answer: 'Choose the guide that matches your main session type. If your session blends services, such as branding portraits with commercial content, start with the closest match and Studio37 can customize the plan after you inquire.',
  },
  {
    question: 'When should I review my prep guide?',
    answer: 'Review your guide at least one week before your session so wardrobe, locations, timing, and must-have shots can be confirmed without last-minute pressure.',
  },
  {
    question: 'Can Studio37 help with location and outfit planning?',
    answer: 'Yes. Studio37 helps with wardrobe direction, location flow, timing, and shot priorities so your final gallery feels intentional and complete.',
  },
]

const faqSchema = generateFAQSchema(prepFaqs)

export default function SessionPrepHub() {
  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-gray-50 to-white px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-4xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-rose-500">Studio37 Resources</p>
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Session Prep Guides
          </h1>
          <p className="mt-5 text-lg text-gray-600 max-w-2xl mx-auto">
            Everything you need to know before your session. Choose your service type below for a
            tailored guide to help you look and feel your best.
          </p>
        </div>
      </section>

      <section className="px-4 pb-10 sm:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
          <Link href="/services/engagement-session" className="rounded-2xl border border-rose-200 bg-rose-50 p-5 transition hover:border-rose-300">
            <p className="text-sm font-semibold uppercase tracking-wide text-rose-700">Engagement Photography</p>
            <p className="mt-2 text-sm text-gray-700">Plan wardrobe, locations, timing, and portraits before the session.</p>
          </Link>
          <Link href="/services/concierge-services" className="rounded-2xl border border-amber-200 bg-amber-50 p-5 transition hover:border-amber-300">
            <p className="text-sm font-semibold uppercase tracking-wide text-amber-800">Concierge Services</p>
            <p className="mt-2 text-sm text-gray-700">Get help with proposal timing, privacy, decor, and photo or video coverage.</p>
          </Link>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="px-4 pb-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {prepGuides.map((guide) => {
              const Icon = guide.icon
              return (
                <Link
                  key={guide.serviceType}
                  href={guide.href}
                  className="group relative flex flex-col overflow-hidden rounded-2xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  {/* Image with overlay */}
                  <div className="relative h-64 overflow-hidden bg-gray-200">
                    <Image
                      src={guide.image}
                      alt={guide.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    {/* Dark gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                    {/* Icon badge */}
                    <div className={`absolute top-4 left-4 inline-flex rounded-full bg-white/90 p-2 backdrop-blur-sm ${guide.iconColor}`}>
                      <Icon className="h-4 w-4" />
                    </div>

                    {/* Title over image */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-xl font-semibold text-white">{guide.title}</h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col bg-white p-5">
                    <p className="flex-1 text-sm text-gray-600">{guide.description}</p>
                    <div className={`mt-4 inline-flex items-center text-sm font-semibold ${guide.iconColor}`}>
                      View Prep Guide
                      <span className="ml-2 transition-transform group-hover:translate-x-1">→</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
          <div className="mt-10 rounded-lg border border-stone-200 bg-stone-50 p-5">
            <h2 className="text-xl font-semibold text-stone-950">Download a service-specific checklist</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(prepGuideDownloads).map(([key, guide]) => (
                <Link
                  key={key}
                  href={`/session-prep/${key}/download`}
                  className="rounded-lg border border-stone-200 bg-white p-4 text-sm font-semibold text-stone-800 hover:border-amber-300 hover:text-amber-800"
                >
                  {guide.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <PrepGuideLeadMagnet />

      <section className="border-t border-gray-200 bg-white px-4 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900">Session prep FAQ</h2>
          <div className="mt-6 space-y-3">
            {prepFaqs.map((faq) => (
              <details key={faq.question} className="rounded-lg border border-gray-200 bg-gray-50 p-4">
                <summary className="cursor-pointer font-semibold text-gray-900">{faq.question}</summary>
                <p className="mt-3 text-sm leading-6 text-gray-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* General Tips */}
      <section className="border-t border-gray-200 bg-gray-50 px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-2xl font-bold text-gray-900">General Tips for All Sessions</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <div>
              <h3 className="font-semibold text-gray-900">Timing & Schedule</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li>• Plan to arrive 10-15 minutes early</li>
                <li>• Allow extra time for hair/makeup touch-ups</li>
                <li>• Eat a light meal beforehand for energy</li>
                <li>• Stay hydrated throughout the day</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Comfort & Confidence</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li>• Wear clothing that makes you feel confident</li>
                <li>• Break in new shoes before the session</li>
                <li>• Practice your poses if it helps you relax</li>
                <li>• Bring a trusted friend or family member for support</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Weather & Location</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li>• Check the weather forecast</li>
                <li>• Have a backup plan for outdoor sessions</li>
                <li>• Dress appropriately for the season</li>
                <li>• Consider sun protection and comfort items</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">Preparation</h3>
              <ul className="mt-3 space-y-2 text-sm text-gray-700">
                <li>• Get a good night&apos;s sleep beforehand</li>
                <li>• Plan your outfit the day before</li>
                <li>• Review your session guide</li>
                <li>• Bring any needed personal items</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl rounded-lg bg-gradient-to-r from-pink-50 to-rose-50 p-8 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Ready to Schedule?</h2>
          <p className="mt-3 text-gray-700">
            Let&apos;s book your session and create beautiful memories together.
          </p>
          <div className="mt-6 flex gap-4 justify-center">
            <Link
              href="/book-a-session"
              className="inline-block rounded-lg bg-gray-900 px-6 py-3 font-medium text-white transition-colors hover:bg-gray-800"
            >
              Book a Session
            </Link>
            <Link
              href="/get-quote"
              className="inline-block rounded-lg border border-gray-900 px-6 py-3 font-medium text-gray-900 transition-colors hover:bg-gray-50"
            >
              Get a Quote
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
