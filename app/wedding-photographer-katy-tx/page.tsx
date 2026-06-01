import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Wedding Photographer Katy TX | Studio37',
  description:
    'Searching for a wedding photographer in Katy, TX? Studio37 provides romantic, documentary-style wedding coverage with two-photographer support and transparent pricing.',
  keywords: [
    'wedding photographer katy tx',
    'katy tx wedding photography',
    'wedding photography katy texas',
    'katy wedding photos',
  ],
  canonicalUrl: 'https://www.studio37.cc/wedding-photographer-katy-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function WeddingPhotographerKatyPage() {
  return (
    <ServiceCityLandingPage
      serviceName="Wedding Photography"
      city="Katy"
      county="Harris / Fort Bend County"
      pageUrl="https://www.studio37.cc/wedding-photographer-katy-tx"
      serviceUrl="/services/wedding-photography"
      startingPrice="$1,200"
      intro="Studio37 helps Katy couples capture full wedding stories with timeline support, two-photographer coverage, and clean, timeless edits built for albums and social sharing."
      highlights={[
        'Coverage designed around your ceremony and reception flow',
        'Two-photographer storytelling for more candid and reaction moments',
        'Fast sneak peeks plus full gallery delivery',
      ]}
      faqs={[
        {
          question: 'How far ahead should we book wedding photography in Katy?',
          answer: 'Most Katy weddings should book 6-12 months early, especially spring and fall weekends.',
        },
        {
          question: 'Do you photograph venues outside Katy?',
          answer: 'Yes. We cover weddings across nearby Houston, Cypress, Tomball, and Montgomery County venues.',
        },
        {
          question: 'What is your wedding starting price?',
          answer: 'Wedding coverage starts at $1,200 depending on coverage hours and final deliverables.',
        },
      ]}
      nearbyCities={['Houston', 'Cypress', 'Tomball', 'Spring', 'The Woodlands']}
    />
  )
}
