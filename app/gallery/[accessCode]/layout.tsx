import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Client Gallery | Studio37',
  description: 'Private client gallery access.',
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      'max-snippet': 0,
      'max-image-preview': 'none',
      'max-video-preview': 0,
    },
  },
}

export default function ClientGalleryLayout({ children }: { children: React.ReactNode }) {
  return children
}
