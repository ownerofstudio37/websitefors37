import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Family Photographer Magnolia TX | Studio37',
  description:
    'Need a family photographer in Magnolia, TX? Studio37 creates relaxed, guided family sessions with warm edits and clear package pricing.',
  keywords: [
    'family photographer magnolia tx',
    'magnolia tx family photos',
    'family photography magnolia texas',
    'portrait photographer magnolia tx',
  ],
  canonicalUrl: 'https://www.studio37.cc/family-photographer-magnolia-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function FamilyPhotographerMagnoliaPage() {
  return (
    <ServiceCityLandingPage
      serviceName="Family Photography"
      city="Magnolia"
      county="Montgomery County"
      pageUrl="https://www.studio37.cc/family-photographer-magnolia-tx"
      serviceUrl="/family-photography"
      startingPrice="$350"
      intro="Studio37 photographs Magnolia families with a guided process that keeps sessions calm, kid-friendly, and focused on real expressions you will actually print and use."
      highlights={[
        'Family-first pacing with prompts for natural interaction',
        'Location planning around Magnolia parks and pine-lined spots',
        'Balanced mix of posed hero portraits and candid moments',
      ]}
      faqs={[
        {
          question: 'What should we wear for family photos in Magnolia?',
          answer: 'Neutral palettes and coordinated (not matching) outfits tend to photograph best in Magnolia outdoor locations.',
        },
        {
          question: 'How long are family sessions?',
          answer: 'Most family sessions range from 30 to 90 minutes based on your package and group size.',
        },
        {
          question: 'Can grandparents or extended family join?',
          answer: 'Yes. We can structure sessions for immediate and extended family combinations.',
        },
      ]}
      nearbyCities={['Pinehurst', 'The Woodlands', 'Conroe', 'Tomball', 'Montgomery']}
    />
  )
}
