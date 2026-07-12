'use client'

import { useSelectedLayoutSegment } from 'next/navigation'
import { PublicConversionStack } from '@/components/PublicConversionSections'
import ServiceExpectationCards from '@/components/ServiceExpectationCards'

const serviceCopy: Record<string, { serviceName: string; proofCtaLabel?: string; proofTitle?: string; proofBody?: string }> = {
  'branding-marketing': {
    serviceName: 'branding and marketing',
    proofCtaLabel: 'Request a demo',
    proofTitle: 'See how a custom website and content system could work for your business',
    proofBody:
      'Request a walkthrough of business-focused website, content, SEO, and campaign examples so you can see what a custom Studio37 build can include.',
  },
  'commercial-photography': { serviceName: 'commercial photography' },
  'event-photography': { serviceName: 'event photography' },
  'portrait-photography': { serviceName: 'portrait photography' },
  'wedding-photography': { serviceName: 'wedding photography' },
  'engagement-session': { serviceName: 'engagement photography' },
  'concierge-services': { serviceName: 'concierge services' },
}

export default function ServicesConversionTail() {
  const segment = useSelectedLayoutSegment()
  const copy = serviceCopy[segment || ''] || { serviceName: 'photography' }

  return (
    <>
      <ServiceExpectationCards serviceName={copy.serviceName} />
      <PublicConversionStack
        serviceName={copy.serviceName}
        proofCtaLabel={copy.proofCtaLabel}
        proofTitle={copy.proofTitle}
        proofBody={copy.proofBody}
      />
    </>
  )
}
