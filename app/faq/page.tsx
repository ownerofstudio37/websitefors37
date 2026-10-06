import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { generateSEOMetadata } from '@/lib/seo-helpers'
import { generateBreadcrumbSchema } from '@/lib/enhanced-seo-schemas'
import { generateFAQSchema } from '@/lib/schema'
import { businessInfo } from '@/lib/seo-config'
import { studio37ServiceFacts } from '@/lib/studio37-package-facts'

export const metadata = generateSEOMetadata({
  title: 'Photography FAQ: Pricing, Booking & Delivery',
  description:
    'Answers about Studio37 pricing, booking, two-photographer coverage, gallery delivery, travel, and service areas in Pinehurst, Montgomery County, and Greater Houston.',
  canonicalUrl: `${businessInfo.contact.website}/faq`,
})

export const revalidate = 86400

type Faq = { question: string; answer: string }

// Pricing answers are generated from the same package facts the chatbot uses, so they cannot drift.
function packageSummary(slug: string) {
  const service = studio37ServiceFacts.find((item) => item.slug === slug)
  if (!service) return ''
  const packages = Object.values(service.packages)
    .map((pkg) => `${pkg.name} is ${pkg.price} for ${pkg.duration} with ${pkg.photos}`)
    .join('; ')
  return `${service.description} ${packages}.`
}

const faqGroups: Array<{ id: string; title: string; faqs: Faq[] }> = [
  {
    id: 'pricing',
    title: 'Pricing and packages',
    faqs: [
      { question: 'How much does wedding photography cost with Studio37?', answer: packageSummary('wedding-photography') },
      { question: 'How much does a portrait session cost?', answer: packageSummary('portrait-photography') },
      { question: 'How much does event photography cost?', answer: packageSummary('event-photography') },
      { question: 'How much does commercial photography cost for a business?', answer: packageSummary('commercial-photography') },
      {
        question: 'Do commercial packages include usage rights?',
        answer:
          'Yes. Every core commercial package includes usage rights for web, social, and marketing channels, with expanded licensing available when needed.',
      },
    ],
  },
  {
    id: 'coverage',
    title: 'Two-photographer coverage',
    faqs: [
      {
        question: 'Do all Studio37 wedding collections include two photographers?',
        answer:
          'Yes. Two photographers are part of our wedding coverage model. One photographer can lead portraits and timeline direction while the other protects reactions, details, alternate angles, and candid moments.',
      },
      {
        question: 'Do portrait sessions include two photographers?',
        answer:
          'Yes. Studio37 sessions are built around two photographers on site so one person can guide posing and direction while the other catches expressions, details, and candid in-between moments.',
      },
      {
        question: 'Can you help us decide how much wedding coverage we need?',
        answer:
          'Yes. We review your ceremony time, getting-ready plans, locations, reception flow, family photo needs, and exit plans before recommending a collection. The goal is enough coverage without paying for hours you do not need.',
      },
      {
        question: 'Do you photograph both the ceremony and reception?',
        answer:
          'Coverage depends on the collection you choose. Six hours fits tighter timelines, eight hours fits most full wedding days, and 10+ hours protects complex multi-location days. We capture ceremony, family photos, couple portraits, reception coverage, and planned milestone moments.',
      },
    ],
  },
  {
    id: 'delivery',
    title: 'Galleries and delivery',
    faqs: [
      {
        question: 'How long does it take to receive our photos?',
        answer:
          'Most portrait and event galleries are delivered within about three weeks. Portrait sessions can add 24-hour sneak peeks, event highlight images can be delivered sooner for marketing, and wedding collections include sneak peeks or a highlights gallery before the full gallery.',
      },
      {
        question: 'How many photos will we receive from our wedding?',
        answer:
          'Photo counts vary by package and wedding length, but typically range from 150+ photos for intimate elopements to 700+ for full-day coverage. We deliver the best moments from your day, professionally edited and gallery-ready.',
      },
      {
        question: 'How are photos delivered?',
        answer:
          'All wedding collections include a private digital gallery with download access and integrated print-store ordering. Portrait, event, and commercial sessions are also delivered through a private digital gallery.',
      },
      {
        question: 'Can we see full galleries from your previous work?',
        answer:
          'Yes. We share complete galleries during your consultation so you can see our full documentation style and editing approach, or you can request private examples for the type of session you are planning.',
      },
    ],
  },
  {
    id: 'booking',
    title: 'Booking and planning',
    faqs: [
      {
        question: 'How far in advance should I book my wedding photographer?',
        answer:
          'We recommend booking your wedding photographer 6-12 months in advance, especially for popular wedding dates in Montgomery County. Spring and fall wedding seasons book up quickly in the Pinehurst and The Woodlands area.',
      },
      {
        question: 'How do I book a session with Studio37?',
        answer: `Book a free consultation online, start a request on the Book a Session page, or contact us at ${businessInfo.contact.phone} or ${businessInfo.contact.email}.`,
      },
      {
        question: 'Do you offer engagement sessions?',
        answer:
          'Yes. Engagement sessions are included in the Complete and Premium wedding collections, or can be booked separately.',
      },
      {
        question: 'What happens if there is bad weather on our wedding day?',
        answer:
          'We bring lighting equipment for indoor ceremonies and plan backup options for outdoor events, so weather changes the plan rather than the coverage.',
      },
    ],
  },
  {
    id: 'locations',
    title: 'Locations and travel',
    faqs: [
      {
        question: 'Where is Studio37 located?',
        answer: `Studio37 is based at ${businessInfo.address.fullAddress} and photographs sessions across Montgomery County and Greater Houston.`,
      },
      {
        question: 'Which areas do you serve?',
        answer: `We regularly photograph in ${businessInfo.serviceAreas.join(', ')}.`,
      },
      {
        question: 'Do you travel to wedding venues outside of Pinehurst?',
        answer:
          'Yes. We regularly photograph weddings throughout Montgomery County, including The Woodlands, Spring, Magnolia, and Conroe, and we travel to Houston area venues. Travel fees may apply for venues more than 50 miles from Pinehurst.',
      },
    ],
  },
  {
    id: 'services',
    title: 'Services',
    faqs: [
      {
        question: 'What types of photography does Studio37 offer?',
        answer:
          'Studio37 photographs weddings and elopements, portraits (family, senior, headshots, and maternity), events (corporate events, parties, graduations, and fundraisers), and commercial work (products, teams, and brand content).',
      },
      {
        question: 'Can you photograph products, teams, and branding content in one shoot?',
        answer:
          'Yes. We can build mixed shot lists for products, team headshots, lifestyle branding, and location content in one coordinated production day.',
      },
      {
        question: 'Can Studio37 help after a commercial photo shoot?',
        answer:
          'Yes. If you need a one-stop shop, Studio37 can also scope custom website work, SEO, PPC, and social media support through our branding and marketing services.',
      },
    ],
  },
]

const allFaqs = faqGroups.flatMap((group) => group.faqs)

export default function FAQPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: 'Home', url: businessInfo.contact.website },
    { name: 'FAQ', url: `${businessInfo.contact.website}/faq` },
  ])

  return (
    <div className="min-h-screen bg-stone-50 pt-[4.5rem] lg:pt-20">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(generateFAQSchema(allFaqs)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <header className="border-b border-stone-200 bg-white py-12 md:py-16">
        <div className="container mx-auto max-w-4xl px-4">
          <p className="eyebrow mb-4">Studio37 FAQ</p>
          <h1 className="text-4xl font-bold leading-tight text-stone-950 md:text-5xl">
            Questions about pricing, coverage, and delivery
          </h1>
          <p className="mt-5 max-w-2xl text-lg leading-8 text-stone-600">
            Straight answers about how Studio37 works: what each package costs, why two photographers come to every
            wedding, when galleries arrive, and where we travel around Pinehurst and Greater Houston.
          </p>
          <nav aria-label="FAQ topics" className="mt-8 flex flex-wrap gap-2">
            {faqGroups.map((group) => (
              <a
                key={group.id}
                href={`#${group.id}`}
                className="inline-flex min-h-11 items-center rounded-full border border-stone-200 bg-stone-50 px-4 text-sm font-semibold text-stone-700 transition hover:border-primary-400 hover:bg-primary-50"
              >
                {group.title}
              </a>
            ))}
          </nav>
        </div>
      </header>

      <div className="container mx-auto max-w-4xl px-4 py-12 md:py-16">
        {faqGroups.map((group) => (
          <section key={group.id} id={group.id} aria-labelledby={`${group.id}-heading`} className="mb-12 scroll-mt-28">
            <h2 id={`${group.id}-heading`} className="mb-5 text-2xl font-bold text-stone-950 md:text-3xl">
              {group.title}
            </h2>
            <div className="space-y-3">
              {group.faqs.map((faq) => (
                <details key={faq.question} className="group rounded-lg border border-stone-200 bg-white shadow-sm">
                  <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 text-left [&::-webkit-details-marker]:hidden">
                    <h3 className="text-base font-semibold text-stone-900 md:text-lg">{faq.question}</h3>
                    <ChevronDown className="h-5 w-5 flex-shrink-0 text-stone-500 transition-transform group-open:rotate-180" aria-hidden="true" />
                  </summary>
                  <p className="border-t border-stone-100 px-5 pb-5 pt-4 leading-7 text-stone-700">{faq.answer}</p>
                </details>
              ))}
            </div>
          </section>
        ))}

        <section className="rounded-lg border border-stone-200 bg-white p-6 md:p-8">
          <h2 className="text-2xl font-bold text-stone-950">Still deciding?</h2>
          <p className="mt-3 leading-7 text-stone-600">
            Tell us about your date, location, and what you want photographed, and we will recommend the right coverage.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/book-consultation" className="btn-primary">
              Book a free consultation
            </Link>
            <Link href="/tools/package-recommender" className="btn-secondary">
              Compare packages
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
