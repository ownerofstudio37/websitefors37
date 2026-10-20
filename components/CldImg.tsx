import type { CityImage } from '@/lib/city-guides'

// Cloudinary delivery at each width, served through srcset so phones get a smaller file while large and
// high-density screens get the full-resolution version. q_auto:best by default; heroes sit behind a dark
// overlay, so they use q_auto:good (about 38% smaller with no visible difference there).
export const cldUrl = (id: string, width: number, crop = '', quality: 'best' | 'good' = 'best') =>
  `https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:${quality},w_${width}${crop}/${id}.jpg`

export const HERO_WIDTHS = [640, 800, 1200, 1600, 2400]
export const SECONDARY_WIDTHS = [800, 1200, 2000]

export default function CldImg({
  image,
  widths,
  sizes,
  className,
  crop = '',
  priority = false,
  quality = 'best',
}: {
  image: CityImage
  widths: number[]
  sizes: string
  className: string
  crop?: string
  priority?: boolean
  quality?: 'best' | 'good'
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={cldUrl(image.id, widths[widths.length - 1], crop, quality)}
      srcSet={widths.map((width) => `${cldUrl(image.id, width, crop, quality)} ${width}w`).join(', ')}
      sizes={sizes}
      alt={image.alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
    />
  )
}
