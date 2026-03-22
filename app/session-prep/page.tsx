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
    image: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1701900000/portrait-prep_sample.jpg',
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
    image: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1701900000/engagement-prep_sample.jpg',
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
    image: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1701900000/wedding-prep_sample.jpg',
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
    image: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1701900000/event-prep_sample.jpg',
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
    image: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1701900000/commercial-prep_sample.jpg',
  },
]

export default function SessionPrepHub() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Session Prep Guides
          </h1>
          <p className="mt-4 text-lg text-gray-600">
            Everything you need to know before your session to ensure we capture your best self.
            Choose your session type to get started.
          </p>
        </div>
      </section>

      {/* Guides Grid */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {prepGuides.map((guide) => {
              const Icon = guide.icon
              return (
                <Link
                  key={guide.serviceType}
                  href={guide.href}
                  className="group flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white transition-all duration-300 hover:border-gray-300 hover:shadow-lg"
                >
                  {/* Image */}
                  <div className="relative h-48 overflow-hidden bg-gray-100">
                    <OptimizedImage
                      src={guide.image}
                      alt={guide.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className={`flex flex-1 flex-col bg-gradient-to-br ${guide.accentColor} p-6`}>
                    <div className={`mb-3 inline-flex w-fit rounded-full bg-white p-2 ${guide.iconColor}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{guide.title}</h3>
                    <p className="mt-2 flex-1 text-sm text-gray-700">{guide.description}</p>
                    <div className="mt-4 inline-flex items-center font-medium text-gray-900">
                      View Guide
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
