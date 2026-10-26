import type { CityImage } from '@/lib/city-guides'

// Cloudinary delivery at each width, served through srcset so phones get a smaller file while large and
// high-density screens get the full-resolution version. q_auto:best by default; heroes sit behind a dark
// overlay, so they use q_auto:good (about 38% smaller with no visible difference there).
export const cldUrl = (id: string, width: number, crop = '', quality: 'best' | 'good' = 'best') =>
  `https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:${quality},w_${width}${crop}/${id}.jpg`

export const HERO_WIDTHS = [640, 800, 1200, 1600, 2400]
export const SECONDARY_WIDTHS = [800, 1200, 2000]

// Smart crops for wide banners: Cloudinary finds the subject (g_auto) and crops to each shape, so a face
// near the top of a photo stays in frame instead of being cut by a centered CSS crop.
export const HERO_ASPECT = { desktop: '5:2', mobile: '2:3' }
export const BANNER_ASPECT = { desktop: '4:1', mobile: '1:1' }
const smartCrop = (ratio: string) => `,c_fill,g_auto,ar_${ratio}`
const MOBILE_MAX_WIDTH = 800
const srcSetFor = (id: string, widths: number[], crop: string, quality: 'best' | 'good') =>
  widths.map((width) => `${cldUrl(id, width, crop, quality)} ${width}w`).join(', ')

export default function CldImg({
  image,
  widths,
  sizes,
  className,
  crop = '',
  priority = false,
  quality = 'best',
  aspect,
}: {
  image: CityImage
  widths: number[]
  sizes: string
  className: string
  crop?: string
  priority?: boolean
  quality?: 'best' | 'good'
  // Art direction: a wide smart crop from 768px up, a tall one on phones.
  aspect?: { desktop: string; mobile: string }
}) {
  const imgCrop = aspect ? smartCrop(aspect.mobile) : crop
  // Phone heroes sit behind a dark overlay, so 800px wide (2x on a phone screen) is plenty; without the cap a
  // 3x iPhone downloads the 1200px file, about twice the bytes, for the image that decides LCP.
  const imgWidths = aspect ? widths.filter((width) => width <= MOBILE_MAX_WIDTH) : widths
  const img = (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={cldUrl(image.id, imgWidths[imgWidths.length - 1], imgCrop, quality)}
      srcSet={srcSetFor(image.id, imgWidths, imgCrop, quality)}
      sizes={sizes}
      alt={image.alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
    />
  )
  if (!aspect) return img
  return (
    // display: contents so the <img> sizes against the hero box exactly as it did without <picture>.
    <picture className="contents">
      <source media="(min-width: 768px)" srcSet={srcSetFor(image.id, widths, smartCrop(aspect.desktop), quality)} sizes={sizes} />
      {img}
    </picture>
  )
}
