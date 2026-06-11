'use client'

import React from 'react'
import type { GalleryImage } from '@/lib/supabase'
import OptimizedImage from './OptimizedImage'

export default function PortraitHighlightGallery() {
  // Static Cloudinary images to replace stock on homepage
  const staticImages: Pick<GalleryImage, 'id' | 'title' | 'description' | 'image_url' | 'alt_text'>[] = [
    {
      id: 'cloudinary-1',
      title: 'Portfolio Highlight 1',
      description: 'Studio37 featured work',
      image_url: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1780810835/Katies_Grad_Shoot_-_77_1_convert.io_ayhrsi.jpg',
    },
    {
      id: 'cloudinary-2',
      title: 'Portfolio Highlight 2',
      description: 'Studio37 featured work',
      image_url: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1778033154/Untitled-8_2_b18mim.jpg',
    },
    {
      id: 'cloudinary-3',
      title: 'Portfolio Highlight 3',
      description: 'Studio37 featured work',
      image_url: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1778033152/Untitled-15_vyz4oa.jpg',
    },
    {
      id: 'cloudinary-4',
      title: 'Portfolio Highlight 4',
      description: 'Studio37 featured work',
      image_url: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1779268255/Untitled-3_2_u4p9kx.jpg',
    },
    {
      id: 'cloudinary-5',
      title: 'Portfolio Highlight 5',
      description: 'Studio37 featured work',
      image_url: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1778033085/KELLY_-_1_8_1__2_x7leuc.jpg',
    },
    {
      id: 'cloudinary-6',
      title: 'Portfolio Highlight 6',
      description: 'Studio37 featured work',
      image_url: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1778033086/PS379444_2_1__2_ffgun8.jpg',
    },
  ]

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center mb-12">
          <div className="eyebrow mb-3">Portfolio</div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Recent Client Work</h2>
          <p className="text-lg text-stone-600 mb-6">
            A curated look at weddings, portraits, and brand sessions from Studio37.
          </p>
          <div className="flex flex-wrap justify-center gap-3 text-sm mb-2">
            <a href="https://gallery.studio37.cc" className="px-4 py-2 rounded-full bg-stone-100 hover:bg-amber-100 hover:text-amber-800 transition-colors text-stone-700 font-medium">All Work</a>
            <a href="https://gallery.studio37.cc" className="px-4 py-2 rounded-full bg-stone-100 hover:bg-amber-100 hover:text-amber-800 transition-colors text-stone-700 font-medium">Weddings</a>
            <a href="https://gallery.studio37.cc" className="px-4 py-2 rounded-full bg-stone-100 hover:bg-amber-100 hover:text-amber-800 transition-colors text-stone-700 font-medium">Portraits</a>
            <a href="https://gallery.studio37.cc" className="px-4 py-2 rounded-full bg-stone-100 hover:bg-amber-100 hover:text-amber-800 transition-colors text-stone-700 font-medium">Events</a>
            <a href="https://gallery.studio37.cc" className="px-4 py-2 rounded-full bg-stone-100 hover:bg-amber-100 hover:text-amber-800 transition-colors text-stone-700 font-medium">Commercial</a>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staticImages.map((image, index) => (
            <a
              href="https://gallery.studio37.cc"
              key={image.id} 
              className="group relative block overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
            >
              {/* Aspect ratio container with 4:3 ratio */}
              <div className="relative w-full bg-gray-200" style={{ paddingBottom: '75%' }}>
                <div className="absolute inset-0">
                  <OptimizedImage
                    src={image.image_url}
                    alt={image.alt_text || image.title}
                    width={400}
                    height={300}
                    className="w-full h-full"
                    imgClassName={`w-full h-full group-hover:scale-110 transition-transform duration-500 ${
                      index === 0 ? 'object-cover object-[50%_18%]' : 'object-cover'
                    }`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={80}
                  />
                </div>
                
                {/* Gradient overlay - more polished */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-300" />
                
                {/* Text content - positioned at bottom */}
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-2 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <h3 className="text-base font-semibold leading-tight">{image.title}</h3>
                  {image.description && (
                    <p className="text-xs mt-1 opacity-90">{image.description}</p>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
        <div className="text-center mt-10">
          <a
            href="https://gallery.studio37.cc"
            className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4"
          >
            View Full Portfolio
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </a>
          <p className="mt-3 text-sm text-stone-500">500+ sessions · gallery.studio37.cc</p>
        </div>
      </div>
    </section>
  )
}
