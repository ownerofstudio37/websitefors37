 'use client'

import React, { useState, useEffect, useRef } from 'react'
import OptimizedImage from './OptimizedImage'
import NewsletterModal from './NewsletterModal'

const galleryImages = [
  {
    id: 1,
    category: 'portrait',
    title: 'Family Portrait',
    src: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1784790718/Hotard_Family_Day_2_-_49_1_eernop.jpg',
  },
  {
    id: 2,
    category: 'portrait',
    title: 'Graduation Portrait',
    src: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1784791656/Hotard_Family_Day_2_-_764_1_b9enxd.jpg',
  },
  {
    id: 3,
    category: 'commercial',
    title: 'Product Photography',
    src: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1784791658/VB_School_Chris_Faves_-_158_wlcspc.jpg',
  },
  {
    id: 4,
    category: 'event',
    title: 'Corporate Event',
    src: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1784791657/VB_School_Chris_Faves_-_28_vdjsiw.jpg',
  },
  {
    id: 5,
    category: 'wedding',
    title: 'Wedding Ceremony',
    src: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1756077326/54694193043_f9ae5338ca_k_p7pjaz.jpg',
  },
  {
    id: 6,
    category: 'portrait',
    title: 'Maternity Session',
    src: 'https://res.cloudinary.com/dmjxho2rl/image/upload/v1778033084/Untitled_1_zwsrnm.jpg',
  }
]

const categories = [
  { id: 'all', label: 'All Work' },
  { id: 'wedding', label: 'Weddings' },
  { id: 'portrait', label: 'Portraits' },
  { id: 'event', label: 'Events' },
  { id: 'commercial', label: 'Commercial' }
]

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [isNewsletterModalOpen, setIsNewsletterModalOpen] = useState(false)
  const [visibleItems, setVisibleItems] = useState<Set<number>>(new Set())
  const observerRef = useRef<IntersectionObserver | null>(null)

  const filteredImages = activeCategory === 'all' 
    ? galleryImages 
    : galleryImages.filter(img => img.category === activeCategory)

  useEffect(() => {
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = parseInt(entry.target.getAttribute('data-index') || '0')
            setVisibleItems((prev) => new Set(prev).add(index))
          }
        })
      },
      { threshold: 0.1, rootMargin: '50px' }
    )

    return () => observerRef.current?.disconnect()
  }, [])

  useEffect(() => {
    const items = document.querySelectorAll('.gallery-item')
    items.forEach((item) => observerRef.current?.observe(item))
    return () => {
      items.forEach((item) => observerRef.current?.unobserve(item))
    }
  }, [filteredImages])

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">Our Portfolio</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            Explore our diverse collection of photography work across different styles and occasions.
          </p>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-6 py-3 min-h-[44px] min-w-[44px] rounded-full font-medium transition-colors ${
                  activeCategory === category.id
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-gray-600 hover:bg-gray-100'
                }`}
                aria-pressed={activeCategory === category.id}
                aria-label={`Filter gallery by ${category.label}`}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        <div
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
          style={{ contain: 'layout style paint' }}
        >
          {filteredImages.map((image, index) => (
            <div
              key={image.id}
              data-index={index}
              className={`gallery-item group relative overflow-hidden rounded-lg bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 transition-all duration-300 ${
                visibleItems.has(index) ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
              }`}
              style={{ 
                aspectRatio: '4 / 3',
                transitionDelay: `${index * 100}ms` 
              }}
            >
              <OptimizedImage
                src={image.src}
                alt={image.title}
                width={800}
                height={600}
                imgClassName="object-cover transition-transform duration-500 group-hover:scale-110 w-full h-full"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                // Only prioritize the first image to avoid eager-loading many images
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <h3 className="text-white text-lg font-semibold">{image.title}</h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button 
            onClick={() => setIsNewsletterModalOpen(true)}
            className="btn-primary"
          >
            View Full Portfolio
          </button>
        </div>

        <NewsletterModal 
          isOpen={isNewsletterModalOpen}
          onClose={() => setIsNewsletterModalOpen(false)}
        />
      </div>
    </section>
  )
}
