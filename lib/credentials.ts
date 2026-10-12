// Christian Combest's marketing certifications, each with its public verification link.
export type Credential = {
  id: 'hubspot-seo' | 'google-ads-ai-performance' | 'ahrefs-academy'
  name: string
  issuer: string
  issued?: string
  verifyUrl: string
  badge?: { src: string; alt: string }
}

export const credentials: Credential[] = [
  {
    id: 'google-ads-ai-performance',
    name: 'Google Ads AI-Powered Performance Certification',
    issuer: 'Google',
    issued: 'October 2026',
    verifyUrl: 'https://www.credential.net/196893128',
    badge: { src: '/badges/google-ads-ai-powered-performance.png', alt: 'Google Ads AI-Powered Performance Certified badge' },
  },
  {
    id: 'ahrefs-academy',
    name: 'How to Use Ahrefs',
    issuer: 'Ahrefs Academy',
    issued: 'October 2026',
    verifyUrl: 'https://ahrefs.com/academy/certificate/b4ddae33b9b54863a627a9c371811cf2',
  },
  {
    id: 'hubspot-seo',
    name: 'SEO Certification',
    issuer: 'HubSpot Academy',
    verifyUrl: 'https://app-na2.hubspot.com/academy/achievements/l22vmwbz/en/1/christian-combest/seo-certified',
    badge: {
      src: 'https://hubspot-credentials-na1.s3.amazonaws.com/prod/badges/user/ec3fc569f28e4b85b99d8afbd76c274d.png',
      alt: 'HubSpot SEO Certified badge',
    },
  },
]

export const getCredentials = (ids: Credential['id'][]) => credentials.filter((credential) => ids.includes(credential.id))

// Person schema for the certified owner, for pages that show the badges.
export function credentialPersonSchema(ids: Credential['id'][] = credentials.map((credential) => credential.id)) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Christian Combest',
    jobTitle: 'Owner, SEO and Growth Strategy',
    worksFor: { '@type': 'Organization', name: 'Studio37', url: 'https://www.studio37.cc' },
    hasCredential: getCredentials(ids).map((credential) => ({
      '@type': 'EducationalOccupationalCredential',
      name: credential.name,
      credentialCategory: 'certificate',
      recognizedBy: { '@type': 'Organization', name: credential.issuer },
      url: credential.verifyUrl,
    })),
  }
}
