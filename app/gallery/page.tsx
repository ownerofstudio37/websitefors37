import GalleryExperiencePage from '../gallery-experience/page'
import { generateSEOMetadata } from '@/lib/seo-helpers'

export const metadata = generateSEOMetadata({
  title: 'Featured Work and Private Galleries | Studio37',
  description: 'Preview featured Studio37 work, then request private complete galleries tailored to your project type, location, and planning needs.',
  canonicalUrl: 'https://www.studio37.cc/gallery',
})

export default GalleryExperiencePage
