import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Engagement Photographer Houston TX | Studio37',
  description: 'Houston engagement and proposal photography with city, park, and golden-hour planning plus concierge proposal support from Studio37.',
  keywords: ['engagement photographer Houston TX', 'proposal photographer Houston', 'Houston engagement photos'],
  canonicalUrl: 'https://www.studio37.cc/engagement-photographer-houston-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function EngagementPhotographerHoustonPage() {
  return (
    <ServiceCityLandingPage
      serviceName="Engagement Photography"
      city="Houston"
      county="Harris County"
      pageUrl="https://www.studio37.cc/engagement-photographer-houston-tx"
      serviceUrl="/services/engagement-session"
      startingPrice="$450"
      intro="Studio37 supports Houston engagement sessions and proposals with location strategy, city timing, and polished photo direction for couples who want a refined gallery."
      highlights={['Urban, park, and skyline-friendly engagement planning', 'Traffic, parking, and timing notes for smoother city sessions', 'Concierge proposal planning with optional photo and video coverage']}
      faqs={[
        { question: 'Do you photograph engagement sessions in Houston?', answer: 'Yes. We serve Houston and nearby Montgomery County markets with planned engagement and proposal coverage.' },
        { question: 'Can you help choose a Houston proposal location?', answer: 'Yes. Concierge planning can include location scouting, privacy notes, timing, and backup options.' },
        { question: 'Can we book photo and video together?', answer: 'Yes. Photo plus highlight video can be scoped for concierge proposal and engagement coverage.' },
      ]}
      nearbyCities={['The Woodlands', 'Tomball', 'Spring', 'Katy', 'Cypress']}
    />
  )
}
