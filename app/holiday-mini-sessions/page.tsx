import Link from 'next/link'
import { ArrowRight, CalendarCheck, Camera, Image as ImageIcon, Mail } from 'lucide-react'
import CldImg, { HERO_ASPECT, HERO_WIDTHS, SECONDARY_WIDTHS } from '@/components/CldImg'
import FAQSection from '@/components/FAQSection'
import LeadCaptureForm from '@/components/LeadCaptureForm'
import RelatedGuides from '@/components/RelatedGuides'
import ReviewCard from '@/components/ReviewCard'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateBreadcrumbSchema } from '@/lib/enhanced-seo-schemas'
import { businessInfo, generateServiceSchema } from '@/lib/seo-config'
import { studio37Reviews } from '@/lib/public-content'
import { studio37ServiceFacts } from '@/lib/studio37-package-facts'

export const metadata = generateSEOMetadata({
  title: 'Holiday Mini Sessions in Pinehurst, TX',
  description:
    'Holiday mini sessions near Pinehurst, The Woodlands, and Magnolia: 30 minutes, 15+ edited photos, and a private gallery from $350, timed so your photos arrive before holiday cards go out.',
  canonicalUrl: `${businessInfo.contact.website}/holiday-mini-sessions`,
  ogImage: 'https://res.cloudinary.com/dmjxho2rl/image/upload/f_jpg,q_auto:best,w_1200,h_630,c_fill,g_auto/Untitled-3_2_u4p9kx.jpg',
  pageType: 'service',
})

export const revalidate = 86400

const mini = studio37ServiceFacts.find((service) => service.slug === 'portrait-photography')!.packages.mini

const STEPS = [
  { icon: CalendarCheck, title: 'Book your time', copy: 'Pick a 30-minute session in November or early December. Booking early gives you the widest choice of times.' },
  { icon: Camera, title: 'Shoot in one spot', copy: 'One location and one outfit plan keep the session moving, even with little ones.' },
  { icon: ImageIcon, title: 'Get your gallery', copy: 'Galleries usually arrive within about three weeks. Add a 24-hour sneak peek if you need one sooner.' },
  { icon: Mail, title: 'Send your cards', copy: 'Pick your favorites for cards, frames, and gifts for grandparents.' },
]

const FAQS = [
  {
    question: 'How much is a holiday mini session?',
    answer: `${mini.price} for ${mini.duration} with ${mini.photos}, professional editing, and a private online gallery. Two photographers come to every session.`,
  },
  {
    question: 'When should we book to have photos for holiday cards?',
    answer:
      'Galleries usually arrive within about three weeks, so a session by late November leaves time to order and mail cards. If you are shooting in December, add the 24-hour sneak peek so you have card images right away.',
  },
  {
    question: 'Who are holiday mini sessions best for?',
    answer:
      'Small families, couples, and quick updates with grandparents or siblings. For a large extended family, several outfit changes, or more than one location, a full portrait session gives you the time you need.',
  },
  {
    question: 'Where do holiday mini sessions take place?',
    answer:
      'Around Pinehurst, Magnolia, Tomball, and The Woodlands, at spots with easy parking and short walks so the 30 minutes go to photos. We help you choose when you book.',
  },
  {
    question: 'What should we wear for holiday photos?',
    answer:
      'Coordinate two or three colors rather than matching outfits, avoid big logos, and bring a layer in case the evening turns cool. Our portrait session prep guide has more outfit ideas.',
  },
]

export default function HolidayMiniSessionsPage() {
  const site = businessInfo.contact.website
  const reviews = studio37Reviews.filter((review) => review.service === 'Family').slice(0, 3)
  const serviceSchema = generateServiceSchema(
    'Holiday Mini Sessions',
    `Holiday mini sessions near Pinehurst, Texas: ${mini.duration}, ${mini.photos}, from ${mini.price}.`
  )
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: site },
    { name: 'Mini Sessions', url: `${site}/mini-sessions` },
    { name: 'Holiday Mini Sessions', url: `${site}/holiday-mini-sessions` },
  ])

  return (
    <main className="bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <section className="relative overflow-hidden bg-stone-950 text-white">
        <CldImg
          image={{ id: 'Untitled-3_2_u4p9kx', alt: 'Parents walking with their two young daughters on a sunny tree-lined path' }}
          widths={HERO_WIDTHS}
          sizes="100vw"
          aspect={HERO_ASPECT}
          quality="good"
          priority
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(12,10,9,0.4),rgba(12,10,9,0.85))] md:bg-[linear-gradient(90deg,rgba(12,10,9,0.88),rgba(12,10,9,0.5),rgba(12,10,9,0.1))]" aria-hidden="true" />
        <div className="relative z-10 container mx-auto px-4 pb-14 pt-32 md:pb-24 md:pt-40">
          <div className="max-w-2xl">
            <p className="eyebrow-hero mb-4">Holiday 2026</p>
            <h1 className="text-4xl font-bold leading-tight md:text-6xl">Holiday mini sessions in Pinehurst, TX</h1>
            <p className="mt-5 text-lg leading-8 text-stone-100">
              Thirty relaxed minutes for this year&apos;s holiday card, a gift for the grandparents, or a quick family update, with photos back in
              time to send.
            </p>
            <p className="mt-4 text-sm font-semibold text-amber-100">
              {mini.price} · {mini.duration} · {mini.photos} · private gallery
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/book-a-session?package=portrait_mini" className="btn-primary inline-flex items-center justify-center gap-2">
                Book a holiday mini
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <a href="#holiday-questions" className="btn-secondary inline-flex items-center justify-center border-white/60 bg-white/10 text-white hover:bg-white hover:text-stone-950">
                Ask a question
              </a>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="holiday-timeline" className="section-shell bg-stone-50">
        <div className="container mx-auto px-4">
          <p className="eyebrow mb-3">Holiday card timeline</p>
          <h2 id="holiday-timeline" className="max-w-2xl text-3xl font-bold text-stone-950 md:text-4xl">
            Shoot by late November, send cards in December
          </h2>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(({ icon: Icon, title, copy }, index) => (
              <li key={title} className="rounded-2xl border border-stone-200 bg-white p-5">
                <div className="mb-4 flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-amber-100 text-sm font-bold text-amber-900">{index + 1}</span>
                  <Icon className="h-5 w-5 text-amber-700" aria-hidden="true" />
                </div>
                <h3 className="font-semibold text-stone-950">{title}</h3>
                <p className="mt-2 text-sm leading-6 text-stone-600">{copy}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container mx-auto grid gap-10 px-4 lg:grid-cols-2 lg:items-center">
          <CldImg
            image={{ id: 'Untitled_tpoc5r', alt: 'Grandparents holding hands with their extended family gathered behind them by a lake lined with cypress trees' }}
            widths={SECONDARY_WIDTHS}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/3] w-full rounded-2xl object-cover"
            crop=",c_fill,g_auto,ar_4:3"
          />
          <div>
            <h2 className="text-3xl font-bold text-stone-950">What a holiday mini includes</h2>
            <ul className="mt-5 space-y-3 text-stone-700">
              <li><strong className="text-stone-950">{mini.duration}</strong> of guided shooting, with two photographers so nobody misses a laugh</li>
              <li><strong className="text-stone-950">{mini.photos}</strong>, professionally edited</li>
              <li><strong className="text-stone-950">A private online gallery</strong> to download your favorites for cards and prints</li>
              <li><strong className="text-stone-950">Help choosing a spot</strong> near Pinehurst, Magnolia, Tomball, or The Woodlands</li>
            </ul>
            <p className="mt-5 text-sm text-stone-600">
              Need more time, extended family, or outfit changes? See{' '}
              <Link href="/family-photography" className="font-semibold text-amber-800 hover:underline">family sessions</Link> or{' '}
              <Link href="/pricing#specialty" className="font-semibold text-amber-800 hover:underline">all prices</Link>.
            </p>
          </div>
        </div>
      </section>

      {reviews.length > 0 && (
        <section aria-labelledby="holiday-reviews" className="section-shell bg-stone-50">
          <div className="container mx-auto px-4">
            <h2 id="holiday-reviews" className="mb-6 text-3xl font-bold text-stone-950">Families on their sessions</h2>
            <div className="grid gap-4 md:grid-cols-3">
              {reviews.map((review) => (
                <ReviewCard key={review.name} review={review} />
              ))}
            </div>
          </div>
        </section>
      )}

      <FAQSection title="Holiday mini session questions" faqs={FAQS} />

      <section id="holiday-questions" aria-labelledby="holiday-form" className="section-shell scroll-mt-24 bg-white">
        <div className="container mx-auto px-4">
          <h2 id="holiday-form" className="mb-2 text-center text-3xl font-bold text-stone-950">Questions before you book?</h2>
          <p className="mb-8 text-center text-stone-600">Tell us your family size and the dates you have in mind, and we will reply with options.</p>
          <LeadCaptureForm compact />
        </div>
      </section>

      <RelatedGuides topic="family" heading="Family and holiday photo guides" />
    </main>
  )
}
