import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Portrait Photographer Katy TX | Studio37',
  description:
    'Need a portrait photographer in Katy, TX? Studio37 offers family portraits, seniors, maternity, and personal branding sessions with clear package options.',
  keywords: [
    'portrait photographer katy tx',
    'family photographer katy tx',
    'senior portraits katy texas',
    'katy tx portrait photography',
  ],
  canonicalUrl: 'https://www.studio37.cc/portrait-photographer-katy-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function PortraitPhotographerKatyPage() {
  return (
    <ServiceCityLandingPage
      serviceName="Portrait Photography"
      city="Katy"
      county="Harris / Fort Bend County"
      pageUrl="https://www.studio37.cc/portrait-photographer-katy-tx"
      serviceUrl="/services/portrait-photography"
      startingPrice="$350"
      intro="Studio37 creates polished portrait sessions in Katy for families, seniors, professionals, and couples who want a calm shoot process and high-utility final images."
      highlights={[
        'Family, senior, maternity, and personal brand portrait options',
        'Location planning around parks, urban backgrounds, and neighborhood settings',
        'Two-photographer coverage for stronger variety per session',
      ]}
      faqs={[
        {
          question: 'What do portrait sessions in Katy start at?',
          answer: 'Portrait sessions start at $350, with larger collections available for extended coverage.',
        },
        {
          question: 'Do you help with outfit and location planning?',
          answer: 'Yes. We provide prep guidance and location recommendations before shoot day.',
        },
        {
          question: 'How long does gallery delivery take?',
          answer: 'Most portrait galleries are delivered in about two weeks, with optional sneak peeks on select sessions.',
        },
      ]}
      nearbyCities={['Houston', 'Cypress', 'Tomball', 'Spring', 'The Woodlands']}
    />
  )
}
