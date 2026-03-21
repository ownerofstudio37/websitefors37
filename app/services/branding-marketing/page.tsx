import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'
import {
  Megaphone,
  Camera,
  Video,
  MonitorSmartphone,
  Package,
  Users,
  CalendarDays,
  Globe,
  Search,
  Target,
  TrendingUp,
  CheckCircle,
  ArrowRight,
} from 'lucide-react'

export const metadata = generateSEOMetadata({
  title: 'Branding & Marketing Services Pinehurst TX - White-Glove Growth Partner | Studio37',
  description:
    'White-glove branding and marketing services in Pinehurst, TX. Brand content, corporate events, website/landing pages, SEO, PPC, and social media management for growth-focused businesses.',
  keywords: [
    'branding services Pinehurst TX',
    'marketing agency Pinehurst',
    'content creation for businesses Texas',
    'product photography video Texas',
    'corporate event content team',
    'website development Pinehurst',
    'landing page design Texas',
    'SEO services Montgomery County',
    'PPC management Pinehurst',
    'social media management Texas',
  ],
  canonicalUrl: 'https://www.studio37.cc/services/branding-marketing',
  pageType: 'service',
})

export const revalidate = 86400

export default function BrandingMarketingPage() {
  const serviceSchema = generateServiceSchema(
    'Branding & Marketing Services',
    'White-glove branding and marketing services in Pinehurst, Texas including brand content production, corporate event coverage, website and landing page development, SEO, PPC, and social media management.'
  )

  const solutions = [
    {
      icon: Camera,
      title: 'Branding Content Production',
      description:
        'Strategic photoshoots for campaigns, websites, ads, and social media built around your brand voice and buyer journey.',
    },
    {
      icon: Video,
      title: 'Video Content Creation',
      description:
        'Brand films, product videos, short-form social content, and ad creatives designed to increase engagement and conversions.',
    },
    {
      icon: MonitorSmartphone,
      title: 'Social Media Content',
      description:
        'Platform-ready visuals, captions, and publishing strategy to keep your brand consistent and visible week after week.',
    },
    {
      icon: Package,
      title: 'Product Photo + Video',
      description:
        'Ecommerce-ready product imagery and video assets that improve perceived value and drive purchase intent.',
    },
    {
      icon: Users,
      title: 'Executive + Team Headshots',
      description:
        'Professional headshots and team portraits for websites, press, proposals, and employer branding.',
    },
    {
      icon: CalendarDays,
      title: 'Corporate Event Coverage',
      description:
        'Capture launches, mixers, conferences, and retreats with dual-perspective storytelling for post-event marketing.',
    },
    {
      icon: Globe,
      title: 'Website + Landing Pages',
      description:
        'Conversion-focused page builds that connect your offer, messaging, and visuals into a clear buying path.',
    },
    {
      icon: Search,
      title: 'SEO Strategy + Execution',
      description:
        'Technical, on-page, local, and content SEO designed to improve rankings, qualified traffic, and long-term growth.',
    },
    {
      icon: Target,
      title: 'PPC Campaign Management',
      description:
        'Google and social ad campaign planning, testing, and optimization to generate efficient leads and sales.',
    },
    {
      icon: TrendingUp,
      title: 'Social Media Management',
      description:
        'Full management across planning, posting, community engagement, and performance reporting to scale brand presence.',
    },
  ]

  return (
    <div className="pt-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      <section className="relative h-[28rem] bg-gradient-to-r from-gray-900 to-primary-900">
        <div className="absolute inset-0 opacity-35">
          <Image
            src="https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1400&h=700&fit=crop"
            alt="Branding and marketing strategy session"
            fill
            className="object-cover"
            priority
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
          <div className="text-white max-w-3xl">
            <p className="inline-flex items-center gap-2 bg-white/15 border border-white/30 rounded-full px-4 py-2 text-sm font-medium mb-5">
              <Megaphone className="h-4 w-4" />
              White-Glove Growth Partner
            </p>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">Branding & Marketing Services in Pinehurst, TX</h1>
            <p className="text-xl mb-7 text-gray-100">
              We provide full-service brand growth support for a limited number of businesses, with dedicated strategy, production, and execution.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book-consultation" className="btn-primary text-lg px-8 py-4 inline-flex items-center justify-center">
                Book a Consultation <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link href="/contact" className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-gray-900 transition-colors inline-flex items-center justify-center">
                Talk With Our Team
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Business Services We Handle End-to-End</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              From content creation to lead generation and conversion infrastructure, we align every channel to build stronger brand equity and measurable growth.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {solutions.map((item) => {
              const Icon = item.icon
              return (
                <div key={item.title} className="bg-gray-50 rounded-lg p-6 border border-gray-100 hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-primary-100 flex items-center justify-center mb-4">
                    <Icon className="h-6 w-6 text-primary-700" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-primary-200 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-medium">White-Glove Service Model</span>
              </div>
              <div className="grid md:grid-cols-2 gap-8 items-start">
                <div>
                  <h3 className="text-2xl font-bold mb-4">We Take on a Small Number of Clients by Design</h3>
                  <p className="text-gray-600 mb-6">
                    Our model is intentionally high-touch. We prioritize depth over volume so every partner gets strategic attention, rapid execution, and proactive support.
                  </p>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Dedicated growth roadmap with clear quarterly priorities</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Unified execution across content, website, SEO, PPC, and social</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Direct access to decision-makers, not ticket queues</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      <span>Performance reporting tied to pipeline and brand outcomes</span>
                    </li>
                  </ul>
                </div>
                <div className="bg-primary-50 rounded-lg p-6 border border-primary-100">
                  <p className="text-sm uppercase tracking-wide text-primary-700 font-semibold mb-2">Best fit clients</p>
                  <p className="text-gray-700 mb-6">
                    Businesses ready to invest in consistent growth, premium positioning, and a partner that owns both strategy and execution.
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

      {/* SEO Text Block */}
      <section className="py-14 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Branding, Marketing &amp; Content Creation in Pinehurst, TX</h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Studio37 is the only full-service branding and marketing studio in Pinehurst, TX combining professional photography, video production, SEO, PPC advertising, and social media management under one roof. We serve small businesses, entrepreneurs, growing brands, and enterprise clients across Montgomery County and key growth markets including The Woodlands, Conroe, Magnolia, Tomball, Spring, Montgomery, Willis, New Caney, Hockley, Bryan, College Station, and Houston. Our white-glove retainer model means a dedicated creative team handles your brand content strategy, monthly photo and video shoots, social media calendar, Google Ads campaigns, and organic search optimization — all aligned to your revenue goals. Unlike traditional marketing agencies that outsource creative work, Studio37 produces everything in-house: branded lifestyle photography, short-form video reels, product demos, corporate event recap videos, and conversion-optimized landing pages. Our clients consistently see measurable lifts in website traffic, lead quality, social engagement, and local search rankings within 90 days of onboarding. Whether you're a startup building brand awareness or an established business ready to scale with data-driven digital marketing, Studio37 has the talent, tools, and track record to deliver. Schedule your strategy consultation today.
            </p>
            <p className="text-sm text-gray-500">
              Serving: Pinehurst TX · The Woodlands · Conroe · Magnolia · Tomball · Spring · Montgomery · Willis · New Caney · Hockley · Bryan · College Station · Houston
            </p>
            <p className="text-sm mt-2 text-primary-700">
              Business growth pages: <Link href="/the-woodlands" className="hover:underline">The Woodlands</Link>, <Link href="/conroe" className="hover:underline">Conroe</Link>, <Link href="/bryan" className="hover:underline">Bryan</Link>, <Link href="/college-station" className="hover:underline">College Station</Link>.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build a Stronger Brand and Growth Engine?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Let&apos;s map your next 90 days and build a custom plan for brand visibility, lead quality, and conversion performance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/book-consultation" className="btn-primary px-8 py-4 text-lg inline-flex items-center justify-center">
              Book Consultation
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/services" className="border-2 border-primary-600 text-primary-700 px-8 py-4 rounded-lg font-semibold hover:bg-primary-50 transition-colors inline-flex items-center justify-center">
              Explore All Services
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
