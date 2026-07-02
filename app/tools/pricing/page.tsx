import PricingCalculator from "@/components/PricingCalculator"
import PackageRecommender from "@/components/PackageRecommender"
import Link from "next/link"
import { generateSEOMetadata } from "@/lib/seo-helpers"
import Schema from "@/components/Schema"
import { generateBreadcrumbSchema, generateFAQSchema, generateWebApplicationSchema } from "@/lib/schema"

export const metadata = generateSEOMetadata({
  title: "Portrait Pricing Calculator | Studio37",
  description: "Instantly estimate Studio37 portrait session pricing based on duration, group size, and package needs.",
  keywords: ["portrait pricing", "photography pricing calculator", "Pinehurst photographer pricing"],
  canonicalUrl: "https://www.studio37.cc/tools/pricing",
})

const pricingFaqs = [
  {
    question: "Is the portrait pricing calculator a final quote?",
    answer: "The calculator gives a planning estimate based on current Studio37 portrait pricing. Final quotes can change if you need travel, rush delivery, special usage, or a custom production scope.",
  },
  {
    question: "Why do shorter portrait sessions cost more per minute?",
    answer: "Mini sessions require the same planning, setup, editing workflow, and gallery delivery as longer sessions, so sessions under one hour use package minimums instead of simple hourly math.",
  },
  {
    question: "Can I use this tool for weddings or commercial shoots?",
    answer: "Use it for portrait planning. Weddings, events, and commercial work are better matched through the package recommender or a consultation because timeline, usage, and deliverables matter more.",
  },
]

export default function PricingToolPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.studio37.cc" },
    { name: "Tools", url: "https://www.studio37.cc/tools/pricing" },
    { name: "Pricing Calculator", url: "https://www.studio37.cc/tools/pricing" },
  ])
  const faqSchema = generateFAQSchema(pricingFaqs)
  const appSchema = generateWebApplicationSchema({
    name: "Studio37 Portrait Pricing Calculator",
    description: "Interactive portrait photography pricing calculator for Studio37 sessions.",
    url: "https://www.studio37.cc/tools/pricing",
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white pb-16 pt-28">
      <Schema schema={[breadcrumbSchema, faqSchema, appSchema]} />
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900">Portrait Pricing Calculator</h1>
          <p className="text-gray-600 mt-2">Use this tool to plan your session and compare package deals.</p>
          <Link href="/tools/package-recommender" className="mt-4 inline-flex text-sm font-semibold text-amber-800 hover:text-amber-900">
            Not sure what to book? Start with the package recommender.
          </Link>
        </div>
        <PricingCalculator />
        <PackageRecommender className="mt-10" />
        <section className="mt-10 grid gap-4 rounded-lg border border-amber-200 bg-amber-50 p-5 md:grid-cols-3">
          {[
            ['Estimate first', 'Use the calculator to compare timing and coverage before you inquire.'],
            ['Confirm scope', 'Final quotes account for location, usage, rush needs, and custom production details.'],
            ['Continue booking', 'Send the selected package into booking so the next step is already prepared.'],
          ].map(([title, copy]) => (
            <div key={title} className="rounded-lg bg-white/70 p-4">
              <h2 className="font-semibold text-stone-950">{title}</h2>
              <p className="mt-2 text-sm leading-6 text-stone-700">{copy}</p>
            </div>
          ))}
        </section>
        <section className="mt-12 rounded-lg border border-stone-200 bg-white p-6">
          <h2 className="text-2xl font-bold text-stone-950">Pricing calculator FAQ</h2>
          <div className="mt-5 space-y-3">
            {pricingFaqs.map((faq) => (
              <details key={faq.question} className="rounded-lg bg-stone-50 p-4">
                <summary className="cursor-pointer font-semibold text-stone-900">{faq.question}</summary>
                <p className="mt-3 text-sm leading-6 text-stone-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
