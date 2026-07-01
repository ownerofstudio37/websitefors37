import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Engagement Photographer The Woodlands TX | Studio37',
  description: 'Engagement and proposal photography in The Woodlands, TX with location planning, golden-hour timing, privacy notes, and optional concierge support.',
  keywords: ['engagement photographer The Woodlands TX', 'proposal photographer The Woodlands', 'The Woodlands engagement photos'],
  canonicalUrl: 'https://www.studio37.cc/engagement-photographer-the-woodlands-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function EngagementPhotographerTheWoodlandsPage() {
  return (
    <ServiceCityLandingPage
      serviceName="Engagement Photography"
      city="The Woodlands"
      county="Montgomery County"
      pageUrl="https://www.studio37.cc/engagement-photographer-the-woodlands-tx"
      serviceUrl="/services/engagement-session"
      startingPrice="$450"
      intro="Studio37 plans engagement sessions and surprise proposals in The Woodlands with polished locations, comfortable direction, and timing built around soft light."
      highlights={['Waterway, Town Green Park, and Market Street location planning', 'Proposal privacy notes, parking, walking distance, and backup timing', 'Photo coverage with optional concierge planning and highlight video']}
      faqs={[
        { question: 'Where should we take engagement photos in The Woodlands?', answer: 'The Waterway, Town Green Park, and Market Street areas are strong options depending on wardrobe, crowds, and lighting.' },
        { question: 'Can you photograph surprise proposals in The Woodlands?', answer: 'Yes. We help plan photographer placement, timing, backup spots, and post-proposal portraits.' },
        { question: 'What do engagement sessions start at?', answer: 'Signature engagement sessions start at $450, with premium and concierge options available.' },
      ]}
      nearbyCities={['Pinehurst', 'Magnolia', 'Spring', 'Conroe', 'Houston']}
    />
  )
}
