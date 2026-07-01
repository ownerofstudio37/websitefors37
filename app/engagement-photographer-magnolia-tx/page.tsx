import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Engagement Photographer Magnolia TX | Studio37',
  description: 'Magnolia, TX engagement and proposal photography with rural backdrops, golden-hour planning, styling support, and concierge proposal options.',
  keywords: ['engagement photographer Magnolia TX', 'proposal photographer Magnolia Texas', 'Magnolia engagement photos'],
  canonicalUrl: 'https://www.studio37.cc/engagement-photographer-magnolia-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function EngagementPhotographerMagnoliaPage() {
  return (
    <ServiceCityLandingPage
      serviceName="Engagement Photography"
      city="Magnolia"
      county="Montgomery County"
      pageUrl="https://www.studio37.cc/engagement-photographer-magnolia-tx"
      serviceUrl="/services/engagement-session"
      startingPrice="$450"
      intro="Studio37 creates Magnolia engagement sessions with soft natural locations, easy pacing, and proposal planning support for private high-stakes moments."
      highlights={['Golden-hour rural textures, parks, and quiet portrait pockets', 'Wardrobe and timeline coaching before the session', 'Concierge proposal planning for decor, privacy, and reveal timing']}
      faqs={[
        { question: 'Is Magnolia good for engagement photos?', answer: 'Yes. Magnolia offers natural backdrops, quiet spaces, and sunset-friendly portrait locations.' },
        { question: 'Can you help plan a Magnolia proposal?', answer: 'Yes. Concierge support can include location scouting, decor notes, timing, and coverage planning.' },
        { question: 'How long is a typical engagement session?', answer: 'Most sessions run 45-90 minutes depending on package, location count, and outfit changes.' },
      ]}
      nearbyCities={['Pinehurst', 'The Woodlands', 'Tomball', 'Montgomery', 'Conroe']}
    />
  )
}
