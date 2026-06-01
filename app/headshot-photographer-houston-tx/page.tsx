import ServiceCityLandingPage from '@/components/ServiceCityLandingPage'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Headshot Photographer Houston TX | Studio37',
  description:
    'Studio37 provides professional headshot photography in Houston, TX for executives, teams, and personal branding with fast turnaround and polished delivery.',
  keywords: [
    'headshot photographer houston tx',
    'professional headshots houston',
    'corporate headshot photography houston',
    'business headshots houston texas',
  ],
  canonicalUrl: 'https://www.studio37.cc/headshot-photographer-houston-tx',
  pageType: 'service',
})

export const revalidate = 86400

export default function HeadshotPhotographerHoustonPage() {
  return (
    <ServiceCityLandingPage
      serviceName="Professional Headshots"
      city="Houston"
      county="Harris County"
      pageUrl="https://www.studio37.cc/headshot-photographer-houston-tx"
      serviceUrl="/professional-headshots"
      startingPrice="$350"
      intro="Studio37 delivers modern professional headshots in Houston for executives, teams, and founders who need strong first-impression visuals for LinkedIn, websites, and media kits."
      highlights={[
        'Executive, team, and personal brand headshot formats',
        'Consistent direction for natural expressions and strong posture',
        'Quick turnaround options for urgent profile updates',
      ]}
      faqs={[
        {
          question: 'Do you offer team headshot sessions in Houston offices?',
          answer: 'Yes. We can photograph teams on-site and keep framing/lighting consistent across all staff portraits.',
        },
        {
          question: 'How quickly can headshots be delivered?',
          answer: 'Standard delivery is fast, and rush options are available when timelines are tight.',
        },
        {
          question: 'Can these be used for LinkedIn and websites?',
          answer: 'Yes. Final files are prepared for professional web use and marketing channels.',
        },
      ]}
      nearbyCities={['The Woodlands', 'Spring', 'Humble', 'Katy', 'Tomball']}
    />
  )
}
