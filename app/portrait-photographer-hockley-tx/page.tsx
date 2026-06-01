import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Portrait Photographer Hockley TX - Studio37 Photography',
  description:
    'Portrait photographer in Hockley, TX. Studio37 delivers outdoor portrait sessions at Zube Park, Houston Oaks, and rural pasture settings in Northwest Harris County.',
  keywords: [
    'portrait photographer Hockley TX',
    'portrait photography Hockley Texas',
    'family portrait photographer Hockley TX',
    'headshot photographer Hockley TX',
    'portrait photographer near Hockley TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/portrait-photographer-hockley-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function PortraitPhotographerHockleyPage() {
  return (
    <ServiceCityLandingPage
      serviceName="Portrait Photography"
      city="Hockley"
      stateAbbr="TX"
      county="Harris County"
      pageUrl="https://www.studio37.cc/portrait-photographer-hockley-tx"
      serviceUrl="https://www.studio37.cc/services/portrait-photography"
      startingPrice="$350"
      intro="Hockley, TX sits at the northwest edge of Harris County where rural landscapes meet suburban growth — giving portrait photographers access to wide open pasture settings, park greenery, and natural light rarely found closer to the city. Studio37 brings professional portrait sessions to Hockley with relaxed direction and same-quality results as urban studio work."
      highlights={[
        { title: 'Zube Park Open Spaces', description: 'Large open grounds with consistent natural light and minimal obstructions — ideal for family and lifestyle portrait work.' },
        { title: 'Houston Oaks Grounds', description: 'Lush, manicured venue grounds provide polished backdrops for individual, couple, and small group portrait sessions.' },
        { title: 'Rural Pasture Settings', description: 'Wide pasture corridors and open sky backdrops are perfect for golden-hour portraits with warm, expansive horizon tones.' },
        { title: 'Individual & Family Sessions', description: 'We offer everything from professional headshots and senior portraits to full extended family sessions in a single visit.' },
      ]}
      faqs={[
        { question: 'What are the best portrait locations in Hockley, TX?', answer: 'Zube Park, Houston Oaks, and open pasture corridors on the rural fringe offer the widest variety of natural-light settings.' },
        { question: 'Do you offer headshot sessions in Hockley?', answer: 'Yes. Professional headshots for LinkedIn, business websites, and personal branding are available as standalone sessions.' },
        { question: 'What is the best time of year for outdoor portraits near Hockley?', answer: 'Fall and spring deliver the best conditions — mild temperatures, lower humidity, and softer foliage colors.' },
        { question: 'Do you cover nearby cities?', answer: 'Yes. We serve Tomball, Magnolia, Waller, Pinehurst, and the broader Northwest Houston corridor.' },
      ]}
      nearbyCities={['Tomball', 'Magnolia', 'Waller', 'Pinehurst', 'Cypress']}
    />
  )
}
