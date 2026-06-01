import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Family Photographer Kingwood TX - Studio37 Photography',
  description:
    'Family photographer in Kingwood, TX. Studio37 captures natural family moments at Town Center Park, East End Park, and Kingwood\'s greenbelt trail system.',
  keywords: [
    'family photographer Kingwood TX',
    'family photos Kingwood Texas',
    'family portrait photographer Kingwood TX',
    'photographer near Kingwood TX',
    'Kingwood TX family photographer',
  ],
  canonicalUrl: 'https://www.studio37.cc/family-photographer-kingwood-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function FamilyPhotographerKingwoodPage() {
  return (
    <ServiceCityLandingPage
      serviceName="Family Photography"
      city="Kingwood"
      stateAbbr="TX"
      county="Harris County"
      pageUrl="https://www.studio37.cc/family-photographer-kingwood-tx"
      serviceUrl="https://www.studio37.cc/services/portrait-photography"
      startingPrice="$350"
      intro="Kingwood, TX is one of Northeast Houston's most established residential communities — a true 'livable forest' with mature tree canopy, greenbelt trails, and park systems that create naturally stunning portrait backdrops. Studio37 delivers professional family portrait sessions in Kingwood with relaxed, candid direction that captures your family's personality at this exact chapter of life."
      highlights={[
        { title: 'Town Center Park Trails', description: 'Mature tree canopy and dappled natural light create a signature Kingwood portrait aesthetic that no studio backdrop can replicate.' },
        { title: 'East End Park Open Fields', description: 'Spacious open grounds with clean sightlines for large group family portraits and active lifestyle images.' },
        { title: 'Kingwood Drive Greenway', description: 'The signature greenway corridor provides long, unobstructed lines for movement-based and wide environmental family compositions.' },
        { title: 'Milestone Session Packages', description: 'Annual family updates, newborn sessions, senior portraits, and school milestone photography — all under one studio.' },
      ]}
      faqs={[
        { question: 'What are the best portrait locations in Kingwood, TX?', answer: 'Town Center Park\'s tree canopy and East End Park\'s open fields are our top two picks — each delivers a distinctly different aesthetic.' },
        { question: 'How do you handle large family groups?', answer: 'We use natural grouping techniques and can add a second photographer for groups over 20 to ensure complete coverage without rushed posing.' },
        { question: 'When do fall family portrait slots fill in Kingwood?', answer: 'October weekends typically fill 6-8 weeks ahead. We recommend booking by early September.' },
        { question: 'Do you cover nearby areas?', answer: 'Yes. We serve Humble, Atascocita, Porter, New Caney, Spring, and greater NE Houston.' },
      ]}
      nearbyCities={['Humble', 'Atascocita', 'Porter', 'New Caney', 'Spring']}
    />
  )
}
