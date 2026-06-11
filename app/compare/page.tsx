import { generateSEOMetadata } from "@/lib/seo-helpers"
import { generateBreadcrumbSchema } from "@/lib/enhanced-seo-schemas"
import ServiceComparePage from "@/components/ServiceComparePage"

export const revalidate = 86400

export function generateMetadata() {
  return generateSEOMetadata({
    title: "Compare Photography Packages | Studio37",
    description:
      "Compare Studio37 photography packages for weddings, portraits, events, and commercial work. Two photographers on every session. Packages from $350.",
    canonicalUrl: "https://www.studio37.cc/compare",
    pageType: "service",
    keywords: [
      "photography packages comparison",
      "wedding photography packages Pinehurst TX",
      "portrait photography pricing",
      "event photography packages Houston",
      "commercial photography pricing",
      "Studio37 packages",
    ],
  })
}

export default function ComparePage() {
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://www.studio37.cc" },
    { name: "Compare Packages", url: "https://www.studio37.cc/compare" },
  ])

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ServiceComparePage />
    </>
  )
}
