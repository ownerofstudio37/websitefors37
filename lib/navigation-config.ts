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

function normalizeNavHref(href: string): string {
  const trimmed = href.trim()
  if (/^https?:\/\//i.test(trimmed)) return trimmed
  return trimmed.startsWith('/') ? trimmed : `/${trimmed}`
}

export function normalizeNavigationItems(items: NavigationItem[]): NavigationItem[] {
  return items.map((item) => {
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
          href !== ENGAGEMENT_NAV_ITEM.href &&
          href !== CONCIERGE_NAV_ITEM.href
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
      children: [...children, ENGAGEMENT_NAV_ITEM, CONCIERGE_NAV_ITEM].sort((a, b) => a.order - b.order),
    }
  })
}

export const FALLBACK_NAV_ITEMS: NavigationItem[] = [
  { id: 'home', label: 'Home', href: '/', order: 1, visible: true },
  { id: 'gallery', label: 'Gallery', href: 'https://gallery.studio37.cc', order: 2, visible: true },
  {
    id: 'service-areas',
    label: 'Service Areas',
    href: '/locations',
    order: 3,
    visible: true,
    children: [
      { id: 'pinehurst', label: 'Pinehurst, TX', href: '/pinehurst', order: 1, visible: true },
      { id: 'woodlands', label: 'The Woodlands, TX', href: '/the-woodlands', order: 2, visible: true },
      { id: 'conroe', label: 'Conroe, TX', href: '/conroe', order: 3, visible: true },
      { id: 'magnolia', label: 'Magnolia, TX', href: '/magnolia', order: 4, visible: true },
      { id: 'huntsville', label: 'Huntsville, TX', href: '/huntsville', order: 5, visible: true },
    ],
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
