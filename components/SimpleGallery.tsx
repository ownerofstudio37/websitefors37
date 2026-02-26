"use client"

import React, { useMemo, useState } from 'react'
import { useGalleryImages } from '@/hooks/useGalleryImages'
import OptimizedImage from '@/components/OptimizedImage'
import type { GalleryImage } from '@/lib/supabase'

export default function SimpleGallery() {
  // Fetch all images using the same hook as Featured Portfolio
  const { data: images = [], isLoading, error } = useGalleryImages({
    orderBy: 'display_order',
    ascending: true,
  })

  const categories = useMemo(() => {
    const set = new Set<string>(['all'])
    images.forEach((img) => img.category && set.add(img.category))
    return Array.from(set)
  }, [images])

  const [activeCategory, setActiveCategory] = useState('all')
  const filtered = activeCategory === 'all' ? images : images.filter(i => i.category === activeCategory)

  // No lightbox variant

  if (error) {
    return (
      <div className="text-center text-red-600">Failed to load gallery. Please try again.</div>
    )
  }

  return (
    <div>
      {/* Counts */}
      <div className="mb-8 flex items-center justify-center gap-2 text-sm text-gray-500">
        <span className="px-3 py-1 bg-gray-100 rounded-full">{images.length} Photos</span>
        <span className="px-3 py-1 bg-gray-100 rounded-full">{Math.max(categories.length - 1, 0)} Categories</span>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setActiveCategory(c)}
            className={`px-6 py-2.5 rounded-full font-medium transition-all shadow-sm ${
              activeCategory === c
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200 hover:border-primary-300'
            }`}
          >
            {c.charAt(0).toUpperCase() + c.slice(1)}
          </button>
        ))}
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="aspect-[4/3] bg-gray-200 animate-pulse rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((image: GalleryImage) => (
            <div
              key={image.id}
              className="group relative block overflow-hidden rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer"
            >
              {/* Aspect ratio container - 4:3 */}
              <div className="relative w-full bg-gray-200" style={{ paddingBottom: '75%' }}>
                <div className="absolute inset-0">
                  <OptimizedImage
                    src={image.image_url}
                    alt={image.alt_text || image.title}
                    width={400}
                    height={300}
                    className="w-full h-full"
                    imgClassName="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                    quality={80}
                  />
                </div>
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Text content */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-base font-semibold leading-tight line-clamp-1">{image.title}</h3>
                  {image.description && (
                    <p className="text-xs mt-1 opacity-90 line-clamp-2">{image.description}</p>
                  )}
                  {image.category && (
                    <span className="inline-block mt-2 px-2 py-0.5 bg-white/20 backdrop-blur-sm rounded text-xs">
                      {image.category}
                    </span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {(!isLoading && filtered.length === 0) && (
        <div className="text-center text-gray-500 py-16">No images found.</div>
      )}

    </div>
  )
}
