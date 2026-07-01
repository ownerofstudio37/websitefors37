import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Engagement Photographer Tomball TX | Studio37',
  description: 'Tomball, TX engagement and proposal photography with downtown texture, natural light planning, and concierge proposal options.',
  keywords: ['engagement photographer Tomball TX', 'proposal photographer Tomball', 'Tomball engagement photos'],
  canonicalUrl: 'https://www.studio37.cc/engagement-photographer-tomball-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function EngagementPhotographerTomballPage() {
  return (
    <ServiceCityLandingPage
      serviceName="Engagement Photography"
      city="Tomball"
      county="Harris County"
      pageUrl="https://www.studio37.cc/engagement-photographer-tomball-tx"
      serviceUrl="/services/engagement-session"
      startingPrice="$450"
      intro="Studio37 photographs Tomball engagement sessions with walkable downtown texture, natural locations, and proposal planning support when timing matters."
      highlights={['Downtown Tomball and nearby nature-based portrait planning', 'Save-the-date friendly direction and outfit pacing', 'Concierge proposal support for decor, privacy, and reveal flow']}
      faqs={[
        { question: 'Is Downtown Tomball good for engagement photos?', answer: 'Yes. Downtown Tomball gives couples historic texture, storefronts, and easy walking variety.' },
        { question: 'Can you plan proposal coverage in Tomball?', answer: 'Yes. We can help with timing, discreet photographer placement, and post-proposal portraits.' },
        { question: 'Do you serve nearby Spring and Magnolia?', answer: 'Yes. Studio37 serves Tomball, Spring, Magnolia, Pinehurst, The Woodlands, and surrounding areas.' },
      ]}
      nearbyCities={['Magnolia', 'Spring', 'The Woodlands', 'Pinehurst', 'Houston']}
    />
  )
}
