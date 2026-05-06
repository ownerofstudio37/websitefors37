'use client'

import React from 'react'
import type { GalleryImage } from '@/lib/supabase'
import Link from 'next/link'
import OptimizedImage from './OptimizedImage'

export default function PortraitHighlightGallery() {
  // Static Cloudinary images to replace stock on homepage
  const staticImages: Pick<GalleryImage, 'id' | 'title' | 'description' | 'image_url' | 'alt_text'>[] = [
    {
      id: 'cloudinary-1',
      title: 'Portfolio Highlight 1',
      description: 'Studio37 featured work',
      image_url: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1778033156/Untitled-6_2_teayff.jpg',
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
      image_url: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1778033084/Untitled_1_zwsrnm.jpg',
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
          <h2 className="text-3xl font-bold mb-4">Featured Portfolio</h2>
          <p className="text-lg text-gray-700">
            A curated selection of our favorite work
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {staticImages.map((image) => (
            <Link 
              href="/gallery" 
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
                    imgClassName="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
