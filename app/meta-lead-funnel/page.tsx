import type { Metadata } from 'next'
import MetaLeadFunnelClient from '@/components/MetaLeadFunnelClient'

export const revalidate = 3600

export const metadata: Metadata = {
  title: 'Get a Custom Photography Quote | Studio37',
  description: 'Tell us about your session and get a personalized quote from Studio37. Family, wedding, portrait, and event photography in Memphis.',
  robots: { index: false, follow: false },
}

export default function MetaLeadFunnelPage() {
  return <MetaLeadFunnelClient />
}
