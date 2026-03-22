export interface NavigationItem {
  id: string
  label: string
  href: string
  order: number
  visible: boolean
  highlighted?: boolean
  children?: NavigationItem[]
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
    children: [
      { id: 'services-wedding', label: 'Wedding Photography', href: '/services/wedding-photography', order: 1, visible: true },
      { id: 'services-portrait', label: 'Portrait Photography', href: '/services/portrait-photography', order: 2, visible: true },
      { id: 'services-engagement', label: 'Engagement Sessions', href: '/services/engagement-session', order: 3, visible: true },
      { id: 'services-event', label: 'Event Photography', href: '/services/event-photography', order: 4, visible: true },
      { id: 'services-commercial', label: 'Commercial Photography', href: '/services/commercial-photography', order: 5, visible: true },
      { id: 'services-branding-marketing', label: 'Branding & Marketing', href: '/services/branding-marketing', order: 6, visible: true },
    ],
  },
  { id: 'session-prep', label: 'Session Prep', href: '/session-prep', order: 5, visible: true },
  { id: 'blog', label: 'Blog', href: '/blog', order: 6, visible: true },
  { id: 'about', label: 'About', href: '/about', order: 7, visible: true },
  { id: 'contact', label: 'Contact', href: '/contact', order: 8, visible: true },
  { id: 'book', label: 'Book Consultation', href: '/book-consultation', order: 9, visible: true, highlighted: true },
]
