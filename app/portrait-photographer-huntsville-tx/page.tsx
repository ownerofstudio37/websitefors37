import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Portrait Photographer Huntsville TX - Studio37 Photography',
  description:
    'Portrait photographer in Huntsville, TX. Studio37 serves Sam Houston State University students, seniors, faculty, and local families with polished portrait sessions.',
  keywords: [
    'portrait photographer Huntsville TX',
    'portrait photography Huntsville Texas',
    'senior portrait photographer Huntsville TX',
    'headshot photographer Huntsville TX',
    'SHSU graduation photographer',
  ],
  canonicalUrl: 'https://www.studio37.cc/portrait-photographer-huntsville-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function PortraitPhotographerHuntsvillePage() {
  return (
    <ServiceCityLandingPage
      serviceName="Portrait Photography"
      city="Huntsville"
      stateAbbr="TX"
      county="Walker County"
      pageUrl="https://www.studio37.cc/portrait-photographer-huntsville-tx"
      serviceUrl="https://www.studio37.cc/services/portrait-photography"
      startingPrice="$350"
      intro="Huntsville, TX is home to Sam Houston State University, Huntsville State Park, and a vibrant local community that values milestone photography. Studio37 delivers portrait sessions designed for seniors, faculty, families, and professionals — using the campus architecture, park pine forests, and downtown square as natural-setting backdrops."
      highlights={[
        { title: 'Campus & Academic Portraits', description: 'SHSU campus architecture provides polished academic backdrops for graduation portraits, faculty headshots, and senior sessions.' },
        { title: 'State Park Nature Portraits', description: 'Huntsville State Park pine forests offer filtered light and scenic depth for relaxed, lifestyle-oriented portrait sessions.' },
        { title: 'Senior Portrait Packages', description: 'Dedicated senior portrait sessions with outfit changes, multiple locations, and fast gallery delivery before graduation day.' },
        { title: 'Professional Headshots', description: 'Clean, modern headshots for LinkedIn, academic profiles, and business directories delivered in 3–5 business days.' },
      ]}
      faqs={[
        { question: 'Do you photograph seniors at Sam Houston State University?', answer: 'Yes. We regularly photograph SHSU seniors and graduates at campus locations and nearby parks.' },
        { question: 'What are the best portrait locations in Huntsville, TX?', answer: 'SHSU campus, Huntsville State Park, and the downtown square are our top three spots for varied aesthetics and quality light.' },
        { question: 'How early should I book for graduation season?', answer: 'For May graduation, we recommend booking by February — portrait slots and venue windows fill 3-4 months ahead.' },
        { question: 'Do you serve nearby cities?', answer: 'Yes. We cover Willis, Conroe, Montgomery, Pinehurst, and the broader Walker and Montgomery County area.' },
      ]}
      nearbyCities={['Willis', 'Conroe', 'Montgomery', 'Pinehurst', 'College Station']}
    />
  )
}
