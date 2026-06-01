import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Portrait Photographer Humble TX - Studio37 Photography',
  description:
    'Portrait photographer in Humble, TX. Studio37 delivers professional headshots, family portraits, and lifestyle sessions near Lake Houston and Deerbrook.',
  keywords: [
    'portrait photographer Humble TX',
    'portrait photography Humble Texas',
    'headshot photographer Humble TX',
    'family portrait photographer Humble TX',
    'photographer near Humble TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/portrait-photographer-humble-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function PortraitPhotographerHumblePage() {
  return (
    <ServiceCityLandingPage
      serviceName="Portrait Photography"
      city="Humble"
      stateAbbr="TX"
      county="Harris County"
      pageUrl="https://www.studio37.cc/portrait-photographer-humble-tx"
      serviceUrl="https://www.studio37.cc/services/portrait-photography"
      startingPrice="$350"
      intro="Humble, TX serves a large NE Houston residential and commercial community — from the historic Downtown Humble district and Deerbrook corridor to Lake Houston-adjacent parks and neighborhoods. Studio37 brings professional portrait sessions to Humble with polished headshots, family lifestyle photography, and individual portraits that perform at every scale — personal social media to corporate directories."
      highlights={[
        { title: 'Downtown Humble Character', description: 'The historic district offers charming urban backdrops with brick textures and local character for editorial-style portrait work.' },
        { title: 'Lake Houston Area Settings', description: 'Waterfront-adjacent park settings provide open sky, water reflections, and dramatic golden-hour light for lifestyle portraits.' },
        { title: 'Deerbrook Corridor Access', description: 'Modern commercial and green-space settings along the Deerbrook corridor work well for clean, contemporary headshot work.' },
        { title: 'Fast Delivery', description: 'Portraits delivered in 3–5 business days — professional, edited, and ready for print or digital use without a long wait.' },
      ]}
      faqs={[
        { question: 'What are the best portrait locations in Humble, TX?', answer: 'Downtown Humble, Lake Houston area parks, and Deerbrook-adjacent green spaces are our top picks for variety and natural light.' },
        { question: 'Do you offer professional headshots in Humble?', answer: 'Yes. Individual and small-team headshot sessions are available for LinkedIn, business sites, and personal branding.' },
        { question: 'What is the best season for outdoor portraits near Humble?', answer: 'Fall (October–November) and spring (March–April) deliver the most comfortable conditions and flattering natural light.' },
        { question: 'Do you cover nearby cities?', answer: 'Yes. We serve Kingwood, Atascocita, Porter, New Caney, Spring, and broader NE Houston.' },
      ]}
      nearbyCities={['Kingwood', 'Atascocita', 'Spring', 'Porter', 'Houston']}
    />
  )
}
