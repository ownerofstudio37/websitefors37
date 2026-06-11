import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Login | Studio37',
  description: 'Secure login for Studio37 admin access.',
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

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return children
}
