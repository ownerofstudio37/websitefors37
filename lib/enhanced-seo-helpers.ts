import { businessInfo } from './seo-config'

/**
 * Additional SEO Schema Helpers
 * These complement the existing schemas in seo-helpers.ts
 */

// Generate BreadcrumbList schema for navigation
export function generateBreadcrumbSchema(breadcrumbs: Array<{ name: string; url: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: crumb.url
    }))
  }
}

// Generate Offer schema for pricing packages
export function generateOfferSchema(offer: {
  name: string
  price: string
  priceCurrency?: string
  description: string
  availability?: string
  validFrom?: string
  validThrough?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Offer',
    name: offer.name,
    price: offer.price,
    priceCurrency: offer.priceCurrency || 'USD',
    description: offer.description,
    availability: offer.availability || 'https://schema.org/InStock',
    validFrom: offer.validFrom,
    validThrough: offer.validThrough,
    seller: {
      '@type': 'LocalBusiness',
      name: businessInfo.name,
      telephone: businessInfo.contact.phone,
      url: businessInfo.contact.website
    }
  }
}

// Generate AggregateRating schema for testimonials/reviews
export function generateReviewSchema(reviews: {
  ratingValue: number
  reviewCount: number
  bestRating?: number
  worstRating?: number
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateRating',
    ratingValue: reviews.ratingValue,
    reviewCount: reviews.reviewCount,
    bestRating: reviews.bestRating || 5,
    worstRating: reviews.worstRating || 1
  }
}

// Generate ImageObject schema for gallery images
export function generateImageSchema(image: {
  url: string
  caption?: string
  width?: number
  height?: number
  author?: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    contentUrl: image.url,
    url: image.url,
    caption: image.caption,
    width: image.width,
    height: image.height,
    author: {
      '@type': 'Person',
      name: image.author || businessInfo.name
    },
    copyrightHolder: {
      '@type': 'Organization',
      name: businessInfo.name
    }
  }
}
