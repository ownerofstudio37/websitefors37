import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Wedding Photographer Bryan TX - Studio37 Photography',
  description:
    'Wedding photographer in Bryan, TX. Studio37 covers Downtown Bryan, Lake Walk, Messina Hof, and Brazos Valley venues with dual-photographer coverage.',
  keywords: [
    'wedding photographer Bryan TX',
    'wedding photography Bryan Texas',
    'Brazos Valley wedding photographer',
    'Downtown Bryan wedding photographer',
    'Messina Hof wedding photographer',
  ],
  canonicalUrl: 'https://www.studio37.cc/wedding-photographer-bryan-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function WeddingPhotographerBryanPage() {
  return (
    <ServiceCityLandingPage
      serviceName="Wedding Photography"
      city="Bryan"
      stateAbbr="TX"
      county="Brazos County"
      pageUrl="https://www.studio37.cc/wedding-photographer-bryan-tx"
      serviceUrl="https://www.studio37.cc/services/wedding-photography"
      startingPrice="$1,200"
      intro="Bryan, TX is a vibrant Brazos Valley community with a booming wedding venue scene — from the historic Downtown Bryan district and Lake Walk waterfront to Messina Hof Wine Estate and gallery event spaces. Studio37 brings cinematic wedding photography to Bryan with our Signature Duo Coverage, ensuring every ceremony processional, reception dance floor, and private moment is captured from multiple angles at a single package rate."
      highlights={[
        { title: 'Downtown Bryan Venues', description: 'Historic brick architecture and event gallery spaces in Downtown Bryan provide dramatic ceremony and portrait backdrops.' },
        { title: 'Lake Walk Waterfront', description: 'Scenic waterfront promenade with open-sky views and golden reflections — a standout location for couple portraits and romantic first-look moments.' },
        { title: 'Messina Hof Wine Estate', description: 'We are experienced with estate venue lighting, vineyard landscape, and the specific coverage needs of Messina Hof\'s indoor and outdoor event spaces.' },
        { title: 'Signature Duo Coverage', description: 'Two photographers, one price — ceremony processional covered from both sides, candid guest moments, and full reception timeline.' },
      ]}
      faqs={[
        { question: 'What are the most popular wedding venues in Bryan, TX?', answer: 'Downtown Bryan event spaces, Lake Walk, and Messina Hof Wine Estate are among the most sought-after. We are experienced at all three.' },
        { question: 'How early should I book a wedding photographer in Bryan?', answer: 'Most Brazos Valley weekends fill 9-12 months out, especially May graduation season and fall. Book as soon as your venue is confirmed.' },
        { question: 'Do you cover weddings in College Station too?', answer: 'Yes. We regularly cover weddings across both Bryan and College Station, as well as surrounding Brazos County venues.' },
        { question: 'What is included in your wedding packages?', answer: 'Full-day dual coverage, online gallery, print release, and personalized planning consultation. Albums and engagement sessions are available add-ons.' },
      ]}
      nearbyCities={['College Station', 'Navasota', 'Huntsville', 'Conroe', 'Houston']}
    />
  )
}
