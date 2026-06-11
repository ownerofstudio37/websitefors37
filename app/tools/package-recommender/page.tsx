import PackageRecommender from "@/components/PackageRecommender"
import { generateSEOMetadata } from "@/lib/seo-helpers"

export const metadata = generateSEOMetadata({
  title: "Package Recommender | Studio37",
  description: "Find the right Studio37 photography package for portraits, weddings, events, or commercial content, then continue into booking.",
  keywords: ["photography package recommender", "Studio37 packages", "Pinehurst photographer pricing"],
  canonicalUrl: "https://www.studio37.cc/tools/package-recommender",
})

export default function PackageRecommenderPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-stone-50 to-white py-16">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="mx-auto mb-8 max-w-3xl text-center">
          <h1 className="text-4xl font-extrabold text-stone-950">Package Recommender</h1>
          <p className="mt-3 text-stone-600">
            Choose your shoot type and coverage needs to get a practical package recommendation.
          </p>
        </div>
        <PackageRecommender />
      </div>
    </main>
  )
}
