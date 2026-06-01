import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Portrait Photographer Splendora TX - Studio37 Photography',
  description:
    'Portrait photographer in Splendora, TX. Studio37 delivers professional portrait sessions in the US-59 corridor with open-field and natural-light locations.',
  keywords: [
    'portrait photographer Splendora TX',
    'portrait photography Splendora Texas',
    'family portrait photographer Splendora TX',
    'photographer near Splendora TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/portrait-photographer-splendora-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function PortraitPhotographerSplendoraPage() {
  return (
    <ServiceCityLandingPage
      serviceName="Portrait Photography"
      city="Splendora"
      stateAbbr="TX"
      county="Montgomery County"
      pageUrl="https://www.studio37.cc/portrait-photographer-splendora-tx"
      serviceUrl="https://www.studio37.cc/services/portrait-photography"
      startingPrice="$350"
      intro="Splendora, TX offers the kind of open landscapes and quiet natural settings that make for genuinely beautiful portrait photography — without the urban crowds. Studio37 serves the Splendora corridor with professional portrait sessions at open-field locations, FM 2090 scenery, and Caney Creek access points that deliver wide, warm golden-hour compositions."
      highlights={[
        { title: 'Open-Field Settings', description: 'Wide open terrain along FM 2090 provides unobstructed horizon light for dramatic golden-hour and lifestyle portraits.' },
        { title: 'Caney Creek Access', description: 'Creekside natural areas offer organic textures and soft forest light for a more intimate, nature-forward portrait experience.' },
        { title: 'Low Competition Booking', description: 'Splendora\'s lower demand volume means more flexible scheduling windows, including mid-week and off-peak dates.' },
        { title: 'Relaxed Session Direction', description: 'We guide every client through natural movements and prompts so portraits feel genuine rather than posed.' },
      ]}
      faqs={[
        { question: 'What locations do you recommend for portraits in Splendora, TX?', answer: 'Open fields along FM 2090 and Caney Creek access areas are our top picks for variety and natural-light quality.' },
        { question: 'Can I schedule a mid-week portrait session?', answer: 'Yes. Splendora\'s flexible demand window means we often have mid-week slots available throughout the year.' },
        { question: 'Do you offer family portrait sessions?', answer: 'Absolutely. We photograph individuals, couples, families of all sizes, and extended family groups.' },
        { question: 'Do you travel to nearby cities?', answer: 'Yes. We cover New Caney, Porter, Cleveland, Humble, Conroe, and the broader East Montgomery County area.' },
      ]}
      nearbyCities={['New Caney', 'Porter', 'Cleveland', 'Humble', 'Conroe']}
    />
  )
}
