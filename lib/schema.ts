/**
 * Schema.org structured data generators for SEO
 * Generates JSON-LD markup for Google rich snippets
 */

export interface SchemaType {
  '@context': string
  '@type': string
  [key: string]: any
}

export function generateOrganizationSchema(): SchemaType {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': 'https://studio37.cc',
    name: 'Studio37',
    description: 'Professional photography studio in Pinehurst, TX specializing in weddings, portraits, events, and commercial photography.',
    url: 'https://studio37.cc',
    telephone: '+1-936-555-7337',
    email: 'hello@studio37.cc',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Pinehurst',
      addressLocality: 'Pinehurst',
      addressRegion: 'TX',
      postalCode: '77362',
      addressCountry: 'US'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 30.1417,
      longitude: -95.4692
    },
    sameAs: [
      'https://www.instagram.com/studio37',
      'https://www.facebook.com/studio37',
      'https://www.tiktok.com/@studio37'
    ],
    priceRange: '$$',
    image: 'https://studio37.cc/og-image.jpg',
    areaServed: {
      '@type': 'City',
      name: 'Pinehurst, TX'
    },
    knowsAbout: [
      'Wedding Photography',
      'Portrait Photography',
      'Event Photography',
      'Commercial Photography',
      'Product Photography'
    ]
  }
}

export function generateServiceSchema(serviceType: string, description: string): SchemaType {
  const serviceMap: Record<string, { name: string; description: string }> = {
    wedding: {
      name: 'Wedding Photography',
      description: 'Professional wedding photography capturing your special day with artistic elegance and technical precision.'
    },
    portrait: {
      name: 'Portrait Photography',
      description: 'Stunning portrait sessions for individuals, families, and groups with professional lighting and posing.'
    },
    event: {
      name: 'Event Photography',
      description: 'Dynamic event coverage for corporate events, parties, conferences, and celebrations.'
    },
    commercial: {
      name: 'Commercial Photography',
      description: 'High-quality commercial and product photography for businesses and brands.'
    }
  }

  const service = serviceMap[serviceType] || { name: serviceType, description }

  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.name,
    description: service.description,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Studio37',
      url: 'https://studio37.cc',
      telephone: '+1-936-555-7337'
    },
    areaServed: {
      '@type': 'City',
      name: 'Pinehurst, TX'
    },
    serviceType: service.name,
    offers: {
      '@type': 'Offer',
      url: 'https://studio37.cc/book-a-session',
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock'
    }
  }
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url: string }>): SchemaType {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url
    }))
  }
}

export function generateBlogPostSchema(post: {
  title: string
  description: string
  image?: string
  datePublished: string
  dateModified?: string
  author?: string
  slug: string
}): SchemaType {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    image: post.image || 'https://studio37.cc/og-image.jpg',
    datePublished: post.datePublished,
    dateModified: post.dateModified || post.datePublished,
    author: {
      '@type': 'Organization',
      name: post.author || 'Studio37'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Studio37',
      logo: {
        '@type': 'ImageObject',
        url: 'https://studio37.cc/logo.png'
      }
    },
    url: `https://studio37.cc/blog/${post.slug}`,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://studio37.cc/blog/${post.slug}`
    }
  }
}

export function generateGallerySchema(gallery: {
  name: string
  description: string
  images: Array<{ url: string; name: string; description?: string }>
  datePublished: string
}): SchemaType {
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageGallery',
    name: gallery.name,
    description: gallery.description,
    datePublished: gallery.datePublished,
    associatedMedia: gallery.images.map(img => ({
      '@type': 'ImageObject',
      url: img.url,
      name: img.name,
      description: img.description || img.name,
      uploadDate: gallery.datePublished
    }))
  }
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): SchemaType {
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

export function generateReviewSchema(reviews: Array<{
  author: string
  rating: number
  text: string
  datePublished: string
}>): SchemaType {
  return {
    '@context': 'https://schema.org',
    '@type': 'AggregateOffer',
    name: 'Studio37 Customer Reviews',
    offers: reviews.map(review => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1
      },
      reviewBody: review.text,
      datePublished: review.datePublished
    }))
  }
}

export function generateContactPageSchema(): SchemaType {
  return {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact Studio37',
    description: 'Get in touch with Studio37 for photography inquiries and bookings.',
    url: 'https://studio37.cc/contact',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      telephone: '+1-936-555-7337',
      email: 'hello@studio37.cc',
      areaServed: 'US',
      availableLanguage: ['en']
    }
  }
}

export function generateBookingPageSchema(): SchemaType {
  return {
    '@context': 'https://schema.org',
    '@type': 'EventVenue',
    name: 'Studio37 Photography Studio',
    url: 'https://studio37.cc/book-a-session',
    telephone: '+1-936-555-7337',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Pinehurst',
      addressLocality: 'Pinehurst',
      addressRegion: 'TX',
      postalCode: '77362',
      addressCountry: 'US'
    },
    hasMap: 'https://maps.google.com/?q=Pinehurst+TX',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
        opens: '08:00',
        closes: '21:00'
      },
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Saturday', 'Sunday'],
        opens: '08:00',
        closes: '21:00'
      }
    ]
  }
}
