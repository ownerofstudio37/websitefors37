export interface NavigationItem {
  id: string
  label: string
  href: string
  order: number
  visible: boolean
  highlighted?: boolean
  children?: NavigationItem[]
}

const ENGAGEMENT_NAV_ITEM: NavigationItem = {
  id: 'services-engagement',
  label: 'Engagement Photography',
  href: '/services/engagement-session',
  order: 3,
  visible: true,
}

const CONCIERGE_NAV_ITEM: NavigationItem = {
  id: 'services-concierge',
  label: 'Concierge Services',
  href: '/services/concierge-services',
  order: 4,
  visible: true,
}

const PRICING_NAV_ITEM: NavigationItem = {
  id: 'services-pricing',
  label: 'Prices & Packages',
  href: '/pricing',
  order: 7.5,
  visible: true,
}

// The top-level gallery link opens the on-site portfolio (lib/portfolio.ts categories), plus reviews and the
// featured gallery subdomain.
const PORTFOLIO_NAV_ITEM: NavigationItem = {
  id: 'gallery',
  label: 'Portfolio',
  href: '/portfolio',
  order: 2,
  visible: true,
  children: [
    { id: 'portfolio-weddings', label: 'Weddings', href: '/portfolio/weddings', order: 1, visible: true },
    { id: 'portfolio-engagements', label: 'Engagements & Proposals', href: '/portfolio/engagements', order: 2, visible: true },
    { id: 'portfolio-portraits', label: 'Portraits & Headshots', href: '/portfolio/portraits', order: 3, visible: true },
    { id: 'portfolio-families', label: 'Families', href: '/portfolio/families', order: 4, visible: true },
    { id: 'portfolio-seniors', label: 'Seniors', href: '/portfolio/seniors', order: 5, visible: true },
    { id: 'portfolio-events', label: 'Events', href: '/portfolio/events', order: 6, visible: true },
    { id: 'portfolio-reviews', label: 'Client Reviews', href: '/reviews', order: 7, visible: true },
    { id: 'portfolio-featured', label: 'Featured Gallery Site', href: 'https://gallery.studio37.cc', order: 8, visible: true },
  ],
}

const isGalleryItem = (item: NavigationItem, href: string) =>
  item.id === 'gallery' ||
  /^https?:\/\/gallery\.studio37\.cc\/?$/i.test(href) ||
  href === '/gallery' ||
  href === '/portfolio'

const BASE_SERVICE_NAV_CHILDREN: NavigationItem[] = [
  { id: 'services-wedding', label: 'Wedding Photography', href: '/services/wedding-photography', order: 1, visible: true },
  { id: 'services-portrait', label: 'Portrait Photography', href: '/services/portrait-photography', order: 2, visible: true },
  ENGAGEMENT_NAV_ITEM,
  CONCIERGE_NAV_ITEM,
  { id: 'services-event', label: 'Event Photography', href: '/services/event-photography', order: 5, visible: true },
  { id: 'services-commercial', label: 'Commercial Photography', href: '/services/commercial-photography', order: 6, visible: true },
  { id: 'services-branding-marketing', label: 'Branding & Marketing', href: '/services/branding-marketing', order: 7, visible: true },
  { id: 'services-compare', label: 'Compare Packages', href: '/compare', order: 8, visible: true },
]

const LOCAL_SERVICE_AREA_NAV_CHILDREN: NavigationItem[] = [
  { id: 'pinehurst', label: 'Pinehurst, TX', href: '/local-photographer-pinehurst-tx', order: 1, visible: true },
  { id: 'woodlands', label: 'The Woodlands, TX', href: '/local-photographer-the-woodlands-tx', order: 2, visible: true },
  { id: 'conroe', label: 'Conroe, TX', href: '/local-photographer-conroe-tx', order: 3, visible: true },
  { id: 'magnolia', label: 'Magnolia, TX', href: '/local-photographer-magnolia-tx', order: 4, visible: true },
  { id: 'tomball', label: 'Tomball, TX', href: '/local-photographer-tomball-tx', order: 5, visible: true },
  { id: 'spring', label: 'Spring, TX', href: '/local-photographer-spring-tx', order: 6, visible: true },
  { id: 'houston', label: 'Houston, TX', href: '/local-photographer-houston-tx', order: 7, visible: true },
]

const LOCAL_SERVICE_AREA_REDIRECTS = new Map([
  ['/locations', '/local-photographer-pinehurst-tx'],
  ['/pinehurst', '/local-photographer-pinehurst-tx'],
  ['/the-woodlands', '/local-photographer-the-woodlands-tx'],
  ['/conroe', '/local-photographer-conroe-tx'],
  ['/magnolia', '/local-photographer-magnolia-tx'],
  ['/tomball', '/local-photographer-tomball-tx'],
  ['/spring', '/local-photographer-spring-tx'],
  ['/cypress', '/local-photographer-cypress-tx'],
  ['/houston', '/local-photographer-houston-tx'],
  ['/huntsville', '/local-photographer-huntsville-tx'],
])

function normalizeNavHref(href: string): string {
  const trimmed = href.trim()
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`
}

export function normalizeNavigationItems(items: NavigationItem[]): NavigationItem[] {
  return items.map((item) => {
    const itemHref = normalizeNavHref(item.href)
    const isServiceAreasItem =
      item.id === 'service-areas' ||
      itemHref === '/locations' ||
      item.label.toLowerCase().includes('service area')

    if (isGalleryItem(item, itemHref)) {
      return { ...PORTFOLIO_NAV_ITEM, order: item.order, visible: item.visible }
    }

    if (isServiceAreasItem) {
      const children = Array.isArray(item.children) && item.children.length > 0
        ? item.children.map((child) => {
            const href = normalizeNavHref(child.href)
            return { ...child, href: LOCAL_SERVICE_AREA_REDIRECTS.get(href) || href }
          })
        : LOCAL_SERVICE_AREA_NAV_CHILDREN

      return {
        ...item,
        href: '/local-photographer-pinehurst-tx',
        children,
      }
    }

    if (item.id !== 'services') {
      return item
    }

    const serviceChildren = Array.isArray(item.children) && item.children.length > 0
      ? item.children
      : BASE_SERVICE_NAV_CHILDREN

    const children = serviceChildren
      .filter((child) => {
        const href = normalizeNavHref(child.href)
        return (
          child.id !== ENGAGEMENT_NAV_ITEM.id &&
          child.id !== CONCIERGE_NAV_ITEM.id &&
          child.id !== PRICING_NAV_ITEM.id &&
          href !== ENGAGEMENT_NAV_ITEM.href &&
          href !== CONCIERGE_NAV_ITEM.href &&
          href !== PRICING_NAV_ITEM.href
        )
      })
      .map((child) => {
        const href = normalizeNavHref(child.href)

        if (child.id === 'services-event' || href === '/services/event-photography') {
          return { ...child, order: Math.max(child.order, 5) }
        }

        if (child.id === 'services-commercial' || href === '/services/commercial-photography') {
          return { ...child, order: Math.max(child.order, 6) }
        }

        if (child.id === 'services-branding-marketing' || href === '/services/branding-marketing') {
          return { ...child, order: Math.max(child.order, 7) }
        }

        if (child.id === 'services-compare' || href === '/compare') {
          return { ...child, order: Math.max(child.order, 8) }
        }

        return child
      })

    return {
      ...item,
      children: [...children, ENGAGEMENT_NAV_ITEM, CONCIERGE_NAV_ITEM, PRICING_NAV_ITEM].sort((a, b) => a.order - b.order),
    }
  })
}

export const FALLBACK_NAV_ITEMS: NavigationItem[] = [
  { id: 'home', label: 'Home', href: '/', order: 1, visible: true },
  PORTFOLIO_NAV_ITEM,
  {
    id: 'service-areas',
    label: 'Service Areas',
    href: '/local-photographer-pinehurst-tx',
    order: 3,
    visible: true,
    children: LOCAL_SERVICE_AREA_NAV_CHILDREN,
  },
  {
    id: 'services',
    label: 'Services',
    href: '/services',
    order: 4,
    visible: true,
    children: BASE_SERVICE_NAV_CHILDREN,
  },
  { id: 'session-prep', label: 'Session Prep', href: '/session-prep', order: 5, visible: true },
  { id: 'blog', label: 'Blog', href: '/blog', order: 6, visible: true },
  { id: 'about', label: 'About', href: '/about', order: 7, visible: true },
  { id: 'contact', label: 'Contact', href: '/contact', order: 8, visible: true },
  { id: 'book', label: 'Book Consultation', href: '/book-consultation', order: 9, visible: true, highlighted: true },
]
