import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Portrait Photographer Conroe TX | Studio37',
  description:
    'Studio37 offers portrait photography in Conroe, TX for families, seniors, couples, and professionals with clear pricing and session planning support.',
  keywords: [
    'portrait photographer conroe tx',
    'family photographer conroe texas',
    'conroe portrait photography',
    'senior portraits conroe tx',
  ],
  canonicalUrl: 'https://www.studio37.cc/portrait-photographer-conroe-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function PortraitPhotographerConroePage() {
  return (
    <ServiceCityLandingPage
      serviceName="Portrait Photography"
      city="Conroe"
      county="Montgomery County"
      pageUrl="https://www.studio37.cc/portrait-photographer-conroe-tx"
      serviceUrl="/services/portrait-photography"
      startingPrice="$350"
      intro="Studio37 helps Conroe clients plan portrait sessions that feel natural, look polished, and work across print, framing, and social usage."
      highlights={[
        'Portrait sessions for families, seniors, maternity, and branding',
        'Location and timeline planning around Conroe-area light conditions',
        'Two-photographer approach for broader image variety',
      ]}
      faqs={[
        {
          question: 'What portrait options are available in Conroe?',
          answer: 'We offer mini, standard, and extended portrait collections based on time, locations, and output goals.',
        },
        {
          question: 'Can you photograph large families?',
          answer: 'Yes. We can plan larger group portrait flow and shot lists for multi-generation sessions.',
        },
        {
          question: 'Do you travel outside Conroe?',
          answer: 'Yes. We also serve The Woodlands, Magnolia, Montgomery, and surrounding markets.',
        },
      ]}
      nearbyCities={['The Woodlands', 'Magnolia', 'Montgomery', 'Willis', 'Spring']}
    />
  )
}
