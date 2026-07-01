import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Engagement Photographer Montgomery TX | Studio37',
  description: 'Montgomery, TX engagement and proposal photography with historic downtown, Lake Conroe, golden-hour planning, and concierge options.',
  keywords: ['engagement photographer Montgomery TX', 'proposal photographer Montgomery Texas', 'Lake Conroe engagement photos'],
  canonicalUrl: 'https://www.studio37.cc/engagement-photographer-montgomery-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function EngagementPhotographerMontgomeryPage() {
  return (
    <ServiceCityLandingPage
      serviceName="Engagement Photography"
      city="Montgomery"
      county="Montgomery County"
      pageUrl="https://www.studio37.cc/engagement-photographer-montgomery-tx"
      serviceUrl="/services/engagement-session"
      startingPrice="$450"
      intro="Studio37 photographs Montgomery engagement sessions and proposals with classic Texas texture, Lake Conroe sunset planning, and calm timeline guidance."
      highlights={['Historic downtown and Lake Conroe location planning', 'Sunset timing, parking notes, and simple walking routes', 'Proposal coverage with optional decor and video coordination']}
      faqs={[
        { question: 'Where can we take engagement photos in Montgomery?', answer: 'Historic Downtown Montgomery, Fernland Historical Park, and Lake Conroe areas can all work well with the right light.' },
        { question: 'Do you photograph Lake Conroe proposals?', answer: 'Yes. We can plan timing, privacy, and a portrait route around the proposal.' },
        { question: 'Can we add video?', answer: 'Yes. Highlight video can be added to concierge engagement scopes.' },
      ]}
      nearbyCities={['Conroe', 'Pinehurst', 'Magnolia', 'The Woodlands', 'Willis']}
    />
  )
}
