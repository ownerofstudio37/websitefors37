import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Family Photographer Porter TX - Studio37 Photography',
  description:
    'Family photographer in Porter, TX. Studio37 captures natural family moments at Valley Ranch Town Center, Bens Branch greenways, and East Montgomery County parks.',
  keywords: [
    'family photographer Porter TX',
    'family photos Porter Texas',
    'family portrait photographer Porter TX',
    'portrait photographer near Porter TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/family-photographer-porter-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function FamilyPhotographerPorterPage() {
  return (
    <ServiceCityLandingPage
      serviceName="Family Photography"
      city="Porter"
      stateAbbr="TX"
      county="Montgomery County"
      pageUrl="https://www.studio37.cc/family-photographer-porter-tx"
      serviceUrl="https://www.studio37.cc/services/portrait-photography"
      startingPrice="$350"
      intro="Porter, TX is a fast-growing community in East Montgomery County where young families are putting down roots — and Studio37 is here to document every milestone. From the walkable corridors of Valley Ranch Town Center to the natural greenways along Bens Branch, we find the right setting to capture your family authentically."
      highlights={[
        { title: 'Valley Ranch Town Center', description: 'A modern, accessible location with clean architecture and open-sky lighting suitable for any family style.' },
        { title: 'Bens Branch Greenways', description: 'Natural creek-side corridors with dappled light and organic textures for a relaxed, outdoor family session.' },
        { title: 'Extended Family Groups', description: 'We specialize in coordinating and photographing large multi-generational families with efficient session flow.' },
        { title: 'Quick Turnaround', description: '3–5 business day gallery delivery — your images are ready before the memory fades.' },
      ]}
      faqs={[
        { question: 'Where do you recommend for family portraits in Porter, TX?', answer: 'Valley Ranch Town Center and Bens Branch greenway are our top picks for variety and natural-light quality.' },
        { question: 'Can you photograph large extended family groups?', answer: 'Yes. We accommodate families of all sizes and can add a second photographer for groups over 20 people.' },
        { question: 'What time of year is best for outdoor family sessions near Porter?', answer: 'October–November is our highest-demand window; spring (March–April) is also excellent for temperature and color.' },
        { question: 'Do you serve nearby areas?', answer: 'Yes. We cover New Caney, Humble, Kingwood, Spring, Conroe, and surrounding East Montgomery County.' },
      ]}
      nearbyCities={['New Caney', 'Humble', 'Kingwood', 'Spring', 'Conroe']}
    />
  )
}
