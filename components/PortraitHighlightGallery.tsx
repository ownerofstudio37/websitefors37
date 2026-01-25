'use client'

import React from 'react'
import { useGalleryImages } from '@/hooks/useGalleryImages'
import type { GalleryImage } from '@/lib/supabase'
import Link from 'next/link'

export default function PortraitHighlightGallery() {
  const { data: images } = useGalleryImages({
    featured: true,
    limit: 6,
    orderBy: 'created_at',
    ascending: false,
  })

  // Static Cloudinary images to replace stock on homepage
  const staticImages: Pick<GalleryImage, 'id' | 'title' | 'description' | 'image_url'>[] = [
    {
      id: 'cloudinary-1',
      title: 'Portfolio Highlight 1',
      description: 'Studio37 featured work',
      image_url: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1769255715/PS374317_mqqiyv.jpg',
    },
    {
      id: 'cloudinary-2',
      title: 'Portfolio Highlight 2',
      description: 'Studio37 featured work',
      image_url: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1769255713/D9E4E5AE-12BE-498B-B7C1-9CDE7FFC1B59_qiaj3v.jpg',
    },
    {
      id: 'cloudinary-3',
      title: 'Portfolio Highlight 3',
      description: 'Studio37 featured work',
      image_url: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1769255711/PS372952_gkvxjl.jpg',
    },
    {
      id: 'cloudinary-4',
      title: 'Portfolio Highlight 4',
      description: 'Studio37 featured work',
      image_url: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1769255706/PS373287_d7fl9k.jpg',
    },
    {
      id: 'cloudinary-5',
      title: 'Portfolio Highlight 5',
      description: 'Studio37 featured work',
      image_url: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1769255672/PS379781_kttvv3.jpg',
    },
  ]

  const renderImages = (images && images.length > 0) ? images : staticImages

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
          {renderImages.map((image) => (
            <Link href="/gallery" key={image.id} className="relative group overflow-hidden rounded-lg shadow-lg flex items-center justify-center bg-gray-100">
              <img
                src={image.image_url}
                alt={image.alt_text || image.title}
                className="object-cover w-full h-[300px] transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                <div className="p-4 w-full text-white">
                  <h3 className="text-lg font-semibold mb-1">{image.title}</h3>
                  {image.description && (
                    <p className="text-sm opacity-90">{image.description}</p>
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
