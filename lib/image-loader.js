// next/image loader. Image optimization is off on Netlify, so without this every <Image> shipped the
// original file (some Cloudinary originals are 7+ MB). Cloudinary URLs get a width per srcset entry plus
// automatic format and quality; Unsplash gets its own resize params; anything else is served as-is.
const KEY = '(?:a|ar|b|bo|c|co|dpr|e|f|fl|g|h|l|o|q|r|t|w|x|y|z)'
// A transformation segment is comma-separated key_value pairs and never a filename.
const TRANSFORM_SEGMENT = new RegExp(`^${KEY}_[^,/]+(?:,${KEY}_[^,/]+)*$`)
const isTransform = (segment) => TRANSFORM_SEGMENT.test(segment) && !/\.(jpe?g|png|webp|gif|avif|svg)$/i.test(segment)

export default function imageLoader({ src, width, quality }) {
  if (src.includes('res.cloudinary.com') && src.includes('/image/upload/')) {
    const [prefix, rest] = src.split('/image/upload/')
    const [first, ...tail] = rest.split('/')
    const q = quality && quality >= 85 ? 'q_auto:best' : 'q_auto:good'

    if (isTransform(first)) {
      // Fixed crops (share cards, c_fill with a height) stay exactly as authored.
      if (/(^|,)(c_fill|c_thumb|c_crop|h_\d+)/.test(first)) return src
      const parts = first.split(',').filter((part) => !/^(w|q|f)_/.test(part))
      return `${prefix}/image/upload/${['f_auto', q, `w_${width}`, ...parts.filter((part) => part !== 'c_limit'), 'c_limit'].join(',')}/${tail.join('/')}`
    }
    return `${prefix}/image/upload/f_auto,${q},w_${width},c_limit/${rest}`
  }

  if (src.includes('images.unsplash.com')) {
    const url = new URL(src)
    url.searchParams.set('w', String(width))
    url.searchParams.set('q', String(quality || 75))
    url.searchParams.set('auto', 'format')
    return url.toString()
  }

  return src
}
