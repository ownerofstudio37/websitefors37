import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin Setup | Studio37',
  description: 'Initial admin setup route for Studio37.',
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

export default function SetupAdminLayout({ children }: { children: React.ReactNode }) {
  return children
}
