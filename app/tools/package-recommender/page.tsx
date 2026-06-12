import PackageRecommender from "@/components/PackageRecommender"
import { generateSEOMetadata } from "@/lib/seo-helpers"
import Schema from "@/components/Schema"
import { generateBreadcrumbSchema, generateFAQSchema, generateWebApplicationSchema } from "@/lib/schema"

export const metadata = generateSEOMetadata({
  title: "Package Recommender | Studio37",
  description: "Find the right Studio37 photography package for portraits, weddings, events, or commercial content, then continue into booking.",
  keywords: ["photography package recommender", "Studio37 packages", "Pinehurst photographer pricing"],
  canonicalUrl: "https://www.studio37.cc/tools/package-recommender",
})

const recommenderFaqs = [
  {
    question: "How does the package recommender choose a package?",
    answer: "It uses your service type, coverage needs, timeline, and deliverable priorities to route you toward a practical Studio37 package path before booking.",
  },
  {
    question: "Can I still request a custom package?",
    answer: "Yes. The recommendation is a starting point. If your session needs travel, multiple locations, commercial usage, or unusual timing, Studio37 can customize the quote.",
  },
  {
    question: "Does the recommender replace a consultation?",
    answer: "No. It helps you narrow the decision quickly, then booking or consultation confirms the final timeline, scope, and next steps.",
  },
]

export default function PackageRecommenderPage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.studio37.cc" },
    { name: "Tools", url: "https://www.studio37.cc/tools/package-recommender" },
    { name: "Package Recommender", url: "https://www.studio37.cc/tools/package-recommender" },
  ])
  const faqSchema = generateFAQSchema(recommenderFaqs)
  const appSchema = generateWebApplicationSchema({
    name: "Studio37 Package Recommender",
    description: "Interactive tool that recommends Studio37 photography packages by service type, coverage, and deliverable needs.",
    url: "https://www.studio37.cc/tools/package-recommender",
  })

  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-white py-16">
      <Schema schema={[breadcrumbSchema, faqSchema, appSchema]} />
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold text-stone-950">Package Recommender</h1>
          <p className="mt-3 text-stone-600">
            Choose your shoot type and coverage needs to get a practical package recommendation.
          </p>
        </div>
        <PackageRecommender />
        <section className="mx-auto mt-12 max-w-4xl rounded-lg border border-stone-200 bg-white p-6">
          <h2 className="text-2xl font-bold text-stone-950">Package recommender FAQ</h2>
          <div className="mt-5 space-y-3">
            {recommenderFaqs.map((faq) => (
              <details key={faq.question} className="rounded-lg bg-stone-50 p-4">
                <summary className="cursor-pointer font-semibold text-stone-900">{faq.question}</summary>
                <p className="mt-3 text-sm leading-6 text-stone-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
