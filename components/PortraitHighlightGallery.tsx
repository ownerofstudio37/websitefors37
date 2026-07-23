'use client'

import React from 'react'
import Link from 'next/link'
import type { GalleryImage } from '@/lib/supabase'
import OptimizedImage from './OptimizedImage'

export default function PortraitHighlightGallery() {
  // Static Cloudinary images to replace stock on homepage
  const staticImages: Pick<GalleryImage, 'id' | 'title' | 'description' | 'image_url' | 'alt_text'>[] = [
    {
      id: 'cloudinary-1',
      title: 'Graduation Portrait',
      description: 'Cap and gown milestone session',
      image_url: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1784791656/Hotard_Family_Day_2_-_764_1_b9enxd.jpg',
    },
    {
      id: 'cloudinary-2',
      title: 'Family Connection',
      description: 'Relaxed family portrait coverage',
      image_url: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1784790718/Hotard_Family_Day_2_-_152_1_mcyhw2.jpg',
    },
    {
      id: 'cloudinary-3',
      title: 'Engagement Story',
      description: 'Directed couple portrait session',
      image_url: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1784790228/Emma_Nick_-1_1-2_emsgxw.jpg',
    },
    {
      id: 'cloudinary-4',
      title: 'Family Milestone',
      description: 'Warm outdoor family session',
      image_url: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1784790717/Hotard_Family_Day_2_-_99-2_1_j7xvyx.jpg',
    },
    {
      id: 'cloudinary-5',
      title: 'Proposal Moment',
      description: 'Private proposal coverage',
      image_url: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1775537572/JayKnee3_1_dm2pwk.jpg',
    },
    {
      id: 'cloudinary-6',
      title: 'Senior Portrait',
      description: 'Polished portrait session',
      image_url: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1778033092/Untitled-12_hih9qs.jpg',
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
            {['All Work', 'Weddings', 'Portraits', 'Events', 'Commercial'].map((label) => (
              <a
                key={label}
                href="https://gallery.studio37.cc"
                aria-label={`Open Studio37 featured ${label.toLowerCase()} work`}
                className="px-4 py-2 rounded-full bg-stone-100 hover:bg-amber-100 hover:text-amber-800 transition-colors text-stone-700 font-medium focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
              >
                {label}
              </a>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staticImages.map((image, index) => (
            <a
              href="https://gallery.studio37.cc"
              aria-label={`Open Studio37 featured work for ${image.title}`}
              key={image.id} 
              className="group relative block overflow-hidden rounded-xl shadow-md hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-600 focus:ring-offset-2"
            >
              {/* Aspect ratio container with 4:3 ratio */}
              <div className="relative w-full bg-gray-200" style={{ paddingBottom: '75%' }}>
                <div className="absolute inset-0">
                  <OptimizedImage
                    src={image.image_url}
                    alt={image.alt_text || image.title}
                    width={1200}
                    height={900}
                    className="w-full h-full"
                    imgClassName={`w-full h-full group-hover:scale-110 transition-transform duration-500 ${
                      index === 0 ? 'object-cover object-[50%_18%]' : 'object-cover'
                    }`}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={95}
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
          <Link
            href="/request-portfolio"
            aria-label="Request complete Studio37 galleries"
            className="btn-primary inline-flex items-center gap-2 text-base px-8 py-4"
          >
            Request Complete Galleries
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
          </Link>
          <p className="mt-3 text-sm text-stone-500">Featured public work · complete galleries sent privately by request</p>
        </div>
      </div>
    </section>
  )
}
