import type { CityImage } from '@/lib/city-guides'

// Cloudinary delivery: q_auto:best at each width, served through srcset so phones get a smaller file
// while large and high-density screens get the full-resolution version.
export const cldUrl = (id: string, width: number, crop = '') =>
  `https://res.cloudinary.com/dmjxho2rl/image/upload/f_auto,q_auto:best,w_${width}${crop}/${id}.jpg`

export const HERO_WIDTHS = [800, 1200, 1600, 2400]
export const SECONDARY_WIDTHS = [800, 1200, 2000]

export default function CldImg({
  image,
  widths,
  sizes,
  className,
  crop = '',
  priority = false,
}: {
  image: CityImage
  widths: number[]
  sizes: string
  className: string
  crop?: string
  priority?: boolean
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={cldUrl(image.id, widths[widths.length - 1], crop)}
      srcSet={widths.map((width) => `${cldUrl(image.id, width, crop)} ${width}w`).join(', ')}
      sizes={sizes}
      alt={image.alt}
      className={className}
      loading={priority ? 'eager' : 'lazy'}
      fetchPriority={priority ? 'high' : undefined}
      decoding="async"
    />
  )
}
