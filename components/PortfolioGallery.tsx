import { cldUrl } from '@/components/CldImg'
import type { PortfolioPhoto } from '@/lib/portfolio'

const WIDTHS = [480, 800, 1200]

// Masonry by CSS columns: photos keep their natural shape, and aspect-ratio reserves each tile's height
// before the image arrives, so the grid does not jump while it loads.
export default function PortfolioGallery({ photos }: { photos: PortfolioPhoto[] }) {
  return (
    <ul className="columns-1 gap-4 sm:columns-2 lg:columns-3">
      {photos.map((photo, index) => (
        <li key={photo.id} className="mb-4 break-inside-avoid">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={cldUrl(photo.id, 1200, ',c_limit')}
            srcSet={WIDTHS.map((width) => `${cldUrl(photo.id, width, ',c_limit')} ${width}w`).join(', ')}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            alt={photo.alt}
            width={photo.w}
            height={photo.h}
            style={{ aspectRatio: `${photo.w} / ${photo.h}` }}
            className="h-auto w-full rounded-lg bg-stone-200 object-cover"
            loading={index < 3 ? 'eager' : 'lazy'}
            fetchPriority={index === 0 ? 'high' : undefined}
            decoding="async"
          />
        </li>
      ))}
    </ul>
  )
}
