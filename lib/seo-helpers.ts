import { Metadata } from 'next'
import { businessInfo, formatServiceAreasForSchema, schemaAssetUrls } from '@/lib/seo-config'

interface SEOProps {
  title: string
  description: string
  keywords?: string[]
  canonicalUrl?: string
  ogImage?: string
  structuredData?: object
  pageType?: 'website' | 'service' | 'article' | 'contact'
  noIndex?: boolean
}

const DEFAULT_OG_IMAGE =
  'https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:good,w_1200,h_630,c_fill,g_auto/v1784795585/Untitled-160_convert.io_c7oit0.jpg'

// Must match the title template in app/layout.tsx.
const LAYOUT_TITLE_SUFFIX = ` | ${businessInfo.name} - Pinehurst, TX Photography`
const LOCAL_TITLE_SUFFIX = ` | ${businessInfo.name} Pinehurst, TX`
const SHORT_TITLE_SUFFIX = ` | ${businessInfo.name}`
// Roughly what Google shows before truncating a title or snippet.
const MAX_TITLE_LENGTH = 65
const MAX_DESCRIPTION_LENGTH = 160

// Long titles step down to a shorter suffix (keeping the location while it fits) instead of being cut off mid-word in results.
function resolveTitle(title: string): Metadata['title'] {
  if (/studio\s?37/i.test(title)) return { absolute: title }
  if (title.length + LAYOUT_TITLE_SUFFIX.length <= MAX_TITLE_LENGTH) return title
  for (const suffix of [LOCAL_TITLE_SUFFIX, SHORT_TITLE_SUFFIX]) {
    if (title.length + suffix.length <= MAX_TITLE_LENGTH) return { absolute: `${title}${suffix}` }
  }
  return { absolute: title }
}

function clampDescription(description: string) {
  const text = description.replace(/\s+/g, ' ').trim()
  if (text.length <= MAX_DESCRIPTION_LENGTH) return text
  const cut = text.slice(0, MAX_DESCRIPTION_LENGTH - 1)
  return `${cut.slice(0, cut.lastIndexOf(' ')).replace(/[\s,;:.-]+$/, '')}…`
}

export function generateSEOMetadata({
  title,
  description: rawDescription,
  keywords = [],
  canonicalUrl,
  ogImage = DEFAULT_OG_IMAGE,
  structuredData,
  pageType = 'website',
  noIndex = false
}: SEOProps): Metadata {
  const fullTitle = title
  const resolvedTitle = resolveTitle(title)
  const description = clampDescription(rawDescription)

  const defaultKeywords = [
    'photography',
    'photographer',
    'Pinehurst TX',
    'Texas photography',
    'professional photography',
    businessInfo.name,
    'Studio37',
    'Montgomery County',
    'The Woodlands photography',
    'Houston photography'
  ]

  const allKeywords = [...keywords, ...defaultKeywords]

  const ogImageUrl = ogImage === '/api/og'
    ? DEFAULT_OG_IMAGE
    : ogImage

  const metadata: Metadata = {
    metadataBase: new URL(businessInfo.contact.website),
    title: resolvedTitle,
    description,
    keywords: allKeywords.join(', '),
    authors: [{ name: businessInfo.name }],
    creator: businessInfo.name,
    publisher: businessInfo.name,
    formatDetection: {
      telephone: true,
      address: true,
      email: true
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl || businessInfo.contact.website,
      siteName: businessInfo.name,
      locale: 'en_US',
      type: pageType === 'article' ? 'article' : 'website',
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: `${businessInfo.name} - Professional Photography in Pinehurst, TX`
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [ogImageUrl],
      creator: '@studio37photo'
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
    },
    alternates: {
      canonical: canonicalUrl || businessInfo.contact.website,
    },
    other: {
      'geo.region': 'US-TX',
      'geo.placename': 'Pinehurst, Montgomery County, Harris County, Greater Houston, Texas',
      'geo.position': `${businessInfo.geo.latitude};${businessInfo.geo.longitude}`,
      'ICBM': `${businessInfo.geo.latitude}, ${businessInfo.geo.longitude}`,
      'coverage': 'Pinehurst, Tomball, Magnolia, Cypress, Spring, The Woodlands, Montgomery County, Harris County',
      'areaServed': 'Tomball TX, Magnolia TX, Cypress TX, Spring TX, The Woodlands TX',
      'DC.title': fullTitle,
      'DC.creator': businessInfo.name,
      'DC.subject': allKeywords.slice(0, 5).join(', '),
      'DC.description': description,
      'contact.phone_number': businessInfo.contact.phone,
      'contact.email': businessInfo.contact.email,
      'contact.address': businessInfo.address.fullAddress
    }
  }

  return metadata
}

// Generate JSON-LD structured data as string (for use in head)
export function generateStructuredDataScript(data: object): string {
  return `<script type="application/ld+json">${JSON.stringify(data, null, 0)}</script>`
}

// Generate structured data object for Next.js metadata
export function generateStructuredData(data: object) {
  return {
    type: 'application/ld+json',
    children: JSON.stringify(data, null, 0)
  }
}

// Generate Article schema for blog posts
export function isPlaceholderAuthor(author?: string | null) {
  return !author || /^(admin|studio\s?37.*)$/i.test(author.trim())
}

export function generateArticleSchema(article: {
  headline: string
  description: string
  image: string
  datePublished: string
  dateModified?: string
  author: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.headline,
    description: article.description,
    image: article.image,
    datePublished: article.datePublished,
    dateModified: article.dateModified || article.datePublished,
    // Placeholder CMS authors ("Admin", the studio name) are credited to the business, not a fake person.
    author: isPlaceholderAuthor(article.author)
      ? { '@type': 'Organization', name: businessInfo.legalName, url: businessInfo.contact.website }
      : { '@type': 'Person', name: article.author },
    publisher: {
      '@type': 'Organization',
      name: businessInfo.name,
      logo: {
        '@type': 'ImageObject',
        url: schemaAssetUrls.logo
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': article.url
    },
    about: businessInfo.services.map((service) => ({
      '@type': 'Thing',
      name: service,
    })),
    mentions: [
      {
        '@type': 'Organization',
        name: businessInfo.legalName,
        url: businessInfo.contact.website,
      },
      ...formatServiceAreasForSchema(),
    ],
  }
}

// Generate FAQ schema for service pages
export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  }
}
