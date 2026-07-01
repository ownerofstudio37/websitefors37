import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Engagement Photographer Conroe TX | Studio37',
  description: 'Conroe, TX engagement and proposal photography with downtown, Lake Conroe, and golden-hour planning by Studio37.',
  keywords: ['engagement photographer Conroe TX', 'proposal photographer Conroe Texas', 'Conroe engagement photos'],
  canonicalUrl: 'https://www.studio37.cc/engagement-photographer-conroe-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function EngagementPhotographerConroePage() {
  return (
    <ServiceCityLandingPage
      serviceName="Engagement Photography"
      city="Conroe"
      county="Montgomery County"
      pageUrl="https://www.studio37.cc/engagement-photographer-conroe-tx"
      serviceUrl="/services/engagement-session"
      startingPrice="$450"
      intro="Studio37 plans Conroe engagement sessions around downtown texture, lake light, and comfortable direction for couples who want natural but polished photos."
      highlights={['Downtown Conroe, Lake Conroe, and park-based location ideas', 'Golden-hour planning with backup options for weather and crowds', 'Proposal photography with optional concierge planning support']}
      faqs={[
        { question: 'What Conroe locations work for engagement photos?', answer: 'Downtown Conroe, Lake Conroe edges, and nearby parks can all work depending on the look and walking comfort you want.' },
        { question: 'Can you help with a surprise proposal in Conroe?', answer: 'Yes. We map timing, photographer placement, and post-proposal portraits in advance.' },
        { question: 'What is included in an engagement session?', answer: 'Packages include planning support, direction during the session, edited images, and private gallery delivery.' },
      ]}
      nearbyCities={['Montgomery', 'The Woodlands', 'Willis', 'Magnolia', 'Pinehurst']}
    />
  )
}
