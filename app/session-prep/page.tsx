import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import OptimizedImage from '@/components/OptimizedImage'
import { HeartHandshake, Users, Cake, Briefcase, Camera } from 'lucide-react'

export const metadata = generateSEOMetadata({
  title: 'Session Prep Guides | Studio37',
  description:
    'Get ready for your photo session. Tailored prep guides for portrait, engagement, wedding, event, and commercial photography.',
  path: '/session-prep',
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

export default function SessionPrepHub() {
  return (
    <main className="min-h-screen bg-white">
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
                    <OptimizedImage
                      src={guide.image}
                      alt={guide.title}
                      fill
                      className="absolute inset-0"
                      imgClassName="object-cover transition-transform duration-500 group-hover:scale-105"
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
                <li>• Get a good night's sleep beforehand</li>
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
            Let's book your session and create beautiful memories together.
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
