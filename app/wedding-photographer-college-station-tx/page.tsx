import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Wedding Photographer College Station TX - Studio37 Photography',
  description:
    'Wedding photographer in College Station, TX. Studio37 covers Aggie weddings, A&M venue ceremonies, Century Square events, and Brazos Valley receptions.',
  keywords: [
    'wedding photographer College Station TX',
    'Aggie wedding photographer',
    'wedding photography College Station Texas',
    'Texas A&M wedding photographer',
    'Century Square wedding photographer',
  ],
  canonicalUrl: 'https://www.studio37.cc/wedding-photographer-college-station-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function WeddingPhotographerCollegeStationPage() {
  return (
    <ServiceCityLandingPage
      serviceName="Wedding Photography"
      city="College Station"
      stateAbbr="TX"
      county="Brazos County"
      pageUrl="https://www.studio37.cc/wedding-photographer-college-station-tx"
      serviceUrl="https://www.studio37.cc/services/wedding-photography"
      startingPrice="$1,200"
      intro="College Station, TX is home to Texas A&M University, Century Square, and one of the most active wedding markets in Central Texas. Aggie couples, university alumni, and Brazos Valley locals choose Studio37 for cinematic wedding photography that captures the tradition, emotion, and energy of their wedding day — with Signature Duo Coverage putting two photographers on-site at a single package rate."
      highlights={[
        { title: 'Texas A&M Campus Coverage', description: 'We know the campus architecture, traditions, and lighting conditions for Aggie wedding photos and couple portrait sets.' },
        { title: 'Century Square Venue Experience', description: 'Urban plaza and event space photography expertise — sharp, editorial coverage regardless of indoor or outdoor setting.' },
        { title: 'Research Park & Modern Venues', description: 'Modern corporate and event venue coverage with clean, contemporary aesthetics perfect for forward-facing couples.' },
        { title: 'Signature Duo Coverage', description: 'Two photographers on your wedding day — ceremony, candid guests, reception, and private moments covered simultaneously.' },
      ]}
      faqs={[
        { question: 'Do you photograph Aggie weddings near Texas A&M?', answer: 'Yes. We regularly photograph Aggie weddings on campus, at Century Square, and throughout the Brazos Valley.' },
        { question: 'When should I book a wedding photographer in College Station?', answer: 'A&M event weekends, graduation season (May), and fall Saturdays fill 9-12 months ahead. Book early once your venue is confirmed.' },
        { question: 'Do you cover both Bryan and College Station?', answer: 'Yes. We photograph weddings across both cities and all surrounding Brazos County venues in a single service area.' },
        { question: 'What is included in your wedding photography packages?', answer: 'Full-day dual coverage, online gallery, print release, and a planning consultation. Albums and engagement sessions are available.' },
      ]}
      nearbyCities={['Bryan', 'Navasota', 'Huntsville', 'Montgomery', 'Houston']}
    />
  )
}
