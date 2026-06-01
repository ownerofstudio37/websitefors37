import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Portrait Photographer Cypress TX - Studio37 Photography',
  description:
    'Portrait photographer in Cypress, TX. Studio37 delivers polished portraits at Towne Lake, Bridgeland, and Cypress Creek greenbelt locations.',
  keywords: [
    'portrait photographer Cypress TX',
    'portrait photography Cypress Texas',
    'family portrait photographer Cypress TX',
    'headshot photographer Cypress TX',
    'Towne Lake portrait photographer',
  ],
  canonicalUrl: 'https://www.studio37.cc/portrait-photographer-cypress-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function PortraitPhotographerCypressPage() {
  return (
    <ServiceCityLandingPage
      serviceName="Portrait Photography"
      city="Cypress"
      stateAbbr="TX"
      county="Harris County"
      pageUrl="https://www.studio37.cc/portrait-photographer-cypress-tx"
      serviceUrl="https://www.studio37.cc/services/portrait-photography"
      startingPrice="$350"
      intro="Cypress, TX is one of Northwest Houston's largest and most vibrant suburban communities — and Studio37 brings professional portrait sessions directly to Towne Lake, Bridgeland, and Cypress Creek's greenbelt corridors. Whether you need polished family portraits, modern headshots, or engagement session photography, we tailor every session to your aesthetic and the best light Cypress has to offer."
      highlights={[
        { title: 'Towne Lake Waterfront', description: 'Cypress\'s premier waterfront destination — sunset sessions here deliver stunning water reflections and warm horizon light that elevate any portrait.' },
        { title: 'Bridgeland Community Parks', description: 'Well-maintained park settings with open lawns and tree canopy provide clean, versatile backdrops for family and lifestyle sessions.' },
        { title: 'Cypress Creek Greenbelt', description: 'Natural creek-side corridors with filtered light and organic textures for intimate, nature-forward portrait work.' },
        { title: 'Professional Headshots', description: 'Clean, modern headshots for LinkedIn, company websites, and personal branding — delivered in 3–5 business days.' },
      ]}
      faqs={[
        { question: 'What are the best portrait locations in Cypress, TX?', answer: 'Towne Lake waterfront, Bridgeland park system, and Cypress Creek greenbelt are our top three for variety and light quality.' },
        { question: 'Do you offer headshot sessions in Cypress?', answer: 'Yes. Individual and team headshots are available as standalone sessions or as part of a broader portrait package.' },
        { question: 'When should I book for fall family portraits in Cypress?', answer: 'Cypress fall portrait slots fill 6-8 weeks ahead. We recommend booking by early September for October sessions.' },
        { question: 'Do you cover nearby areas?', answer: 'Yes. We serve Tomball, Spring, Katy, Hockley, Waller, and broader Northwest Houston.' },
      ]}
      nearbyCities={['Tomball', 'Spring', 'Katy', 'Hockley', 'Houston']}
    />
  )
}
