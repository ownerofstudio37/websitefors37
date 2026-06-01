import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Portrait Photographer New Waverly TX - Studio37 Photography',
  description:
    'Portrait photographer in New Waverly, TX. Studio37 creates natural family portraits, senior sessions, and lifestyle photography with quiet forest backdrops.',
  keywords: [
    'portrait photographer New Waverly TX',
    'portrait photography New Waverly Texas',
    'family portrait photographer New Waverly TX',
    'senior portrait photographer New Waverly TX',
    'lifestyle photography New Waverly TX',
  ],
  canonicalUrl: 'https://www.studio37.cc/portrait-photographer-new-waverly-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function PortraitPhotographerNewWaverlyPage() {
  return (
    <ServiceCityLandingPage
      serviceName="Portrait Photography"
      city="New Waverly"
      stateAbbr="TX"
      county="Walker County"
      pageUrl="https://www.studio37.cc/portrait-photographer-new-waverly-tx"
      serviceUrl="https://www.studio37.cc/services/portrait-photography"
      startingPrice="$350"
      intro="New Waverly, TX offers quiet, natural settings with forest texture, rural roads, and a slower pace that works beautifully for portrait sessions. Studio37 creates portrait photography here for families, seniors, couples, and professionals who want a relaxed experience with timeless results."
      highlights={[
        { title: 'Forest Portrait Settings', description: 'The Sam Houston National Forest area gives us soft filtered light, layered greenery, and a naturally elegant backdrop.' },
        { title: 'Senior & Graduation Sessions', description: 'Ideal for seniors who want a custom portrait experience away from crowded urban locations.' },
        { title: 'Family Lifestyle Coverage', description: 'Natural, candid family portraits with room to move, laugh, and interact comfortably.' },
        { title: 'Quick Turnaround', description: 'Proof galleries are delivered fast so you can share your New Waverly images without a long wait.' },
      ]}
      faqs={[
        { question: 'What portrait locations work best in New Waverly, TX?', answer: 'Forest edges, quiet roadside fields, and nearby Sam Houston National Forest areas are excellent choices depending on the look you want.' },
        { question: 'Do you offer senior portraits in New Waverly?', answer: 'Yes. We regularly photograph seniors and graduates in New Waverly and nearby Walker County communities.' },
        { question: 'Can you photograph families outdoors?', answer: 'Absolutely. New Waverly is a great fit for relaxed outdoor family portraits with natural light and space to move.' },
        { question: 'Do you serve nearby towns?', answer: 'Yes. We frequently work in Huntsville, Willis, Conroe, Pinehurst, Montgomery, and the wider North Houston area.' },
      ]}
      nearbyCities={['Huntsville', 'Willis', 'Conroe', 'Pinehurst', 'Montgomery']}
    />
  )
}
