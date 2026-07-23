import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { generateFAQSchema, generateSEOMetadata } from '@/lib/seo-helpers'
import { generateServiceSchema } from '@/lib/seo-config'
import FAQSection from '@/components/FAQSection'
import PortraitSubServiceSupport from '@/components/PortraitSubServiceSupport'
import { ServiceTestimonialsSection, TurnaroundExpectationsSection } from '@/components/PublicFeatureContent'

export const metadata = generateSEOMetadata({
  title: 'Product Photography Pinehurst TX for Web, Catalogs & Ads | Studio37',
  description:
    'Product photography in Pinehurst, TX for ecommerce, websites, catalogs, ads, social content, detail shots, and launch campaigns with commercial usage included.',
  canonicalUrl: 'https://www.studio37.cc/product-photography',
  pageType: 'service',
})

export const revalidate = 86400

const packages = [
  ['Product Express', '$500', '1-hour session', ['15+ edited images', 'Simple product or detail set', 'Full commercial usage', '48-hour turnaround']],
  ['Catalog Starter', '$850', '2-hour session', ['30+ edited images', 'Shot list planning', 'Web and social crops', 'Private gallery']],
  ['Product Content Library', '$1,500', '4-hour session', ['75+ edited images', 'Product and lifestyle mix', 'Ad-ready files', '5-7 business day delivery']],
]

const faqs = [
  {
    question: 'What kinds of product photography do you handle?',
    answer: 'We photograph products for websites, catalogs, social content, ads, launch campaigns, menus, and small business marketing assets.',
  },
  {
    question: 'Is commercial usage included?',
    answer: 'Yes. Product photography packages include commercial usage for web, social, print, and advertising channels unless a larger custom license is needed.',
  },
]

export default function ProductPhotographyPage() {
  const serviceSchema = generateServiceSchema(
    'Product Photography',
    'Product photography in Pinehurst, Texas for ecommerce, websites, catalogs, ads, social content, and launch campaigns.'
  )
  const faqSchema = generateFAQSchema(faqs)

  return (
    <main className="pt-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <section className="relative min-h-[520px] overflow-hidden bg-stone-950 text-white">
        <Image
          src="https://res.cloudinary.com/dmjxho2rl/image/upload/v1784791658/VB_School_Chris_Faves_-_158_wlcspc.jpg"
          alt="Studio37 product photography for business marketing assets"
          fill
          priority
          className="object-cover opacity-55"
        />
        <div className="relative z-10 container mx-auto flex min-h-[520px] items-center px-4">
          <div className="max-w-2xl">
            <p className="eyebrow-hero mb-3">Commercial Product Content</p>
            <h1 className="text-5xl font-bold">Product Photography</h1>
            <p className="mt-4 text-lg leading-8 text-stone-100">
              Clean, useful product imagery for websites, catalogs, ads, social posts, and launch campaigns.
            </p>
            <p className="mt-4 text-sm font-semibold text-amber-100">Starting at $500 · commercial usage included</p>
            <Link href="/book-consultation?service=product-photography" className="btn-primary mt-8 inline-flex items-center">
              Plan Product Photos <ArrowRight className="ml-2 h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section-shell bg-white">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <p className="eyebrow mb-3">Pricing</p>
            <h2 className="text-3xl font-bold text-stone-950 md:text-4xl">Commercial product photography packages</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {packages.map(([name, price, duration, features]) => (
              <div key={name as string} className="surface-panel p-6">
                <p className="text-sm font-semibold uppercase tracking-wide text-primary-700">{name as string}</p>
                <p className="mt-2 text-4xl font-bold text-stone-950">{price as string}</p>
                <p className="mt-1 text-sm text-stone-500">{duration as string}</p>
                <ul className="mt-5 space-y-2">
                  {(features as string[]).map((feature) => (
                    <li key={feature} className="flex gap-2 text-sm text-stone-700">
                      <CheckCircle2 className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-700" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TurnaroundExpectationsSection service="commercial" />
      <PortraitSubServiceSupport
        service="product photography"
        parentHref="/services/commercial-photography"
        parentLabel="commercial photography"
        proof={['Simple product, detail, and lifestyle examples.', 'Web, social, catalog, and ad-ready crop examples.', 'Commercial galleries matched to your product type and sales channel.']}
        planning={['Product list', 'Usage channels', 'Crop requirements']}
        objection="Product photos should match how buyers actually evaluate the offer. The planning call clarifies surfaces, props, product quantity, crops, and where the images need to convert."
      />
      <FAQSection title="Product Photography FAQ" faqs={faqs} />
      <ServiceTestimonialsSection service="commercial" />
    </main>
  )
}
