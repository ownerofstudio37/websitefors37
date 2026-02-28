'use client'

import React, { useState, useRef, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react'
import { trackVideoPlay, trackVideoMilestone } from '@/lib/analytics'

interface Testimonial {
  id: string
  name: string
  title: string
  youtubeUrl: string // YouTube video URL (full or embed URL)
  quote: string
  image?: string // Optional profile image
}

interface VideoTestimonialCarouselProps {
  testimonials: Testimonial[]
  autoplay?: boolean
  autoplayInterval?: number
  showQuote?: boolean
}

export default function VideoTestimonialCarousel({
  testimonials,
  autoplay = true,
  autoplayInterval = 6000,
  showQuote = true
}: VideoTestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoplay)
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null)

  // Extract YouTube video ID from various URL formats
  const getYoutubeEmbedUrl = (url: string): string => {
    let videoId = ''

    // Handle youtube.com/watch?v=ID format
    if (url.includes('youtube.com/watch')) {
      videoId = url.split('v=')[1]?.split('&')[0] || ''
    }
    // Handle youtu.be/ID format
    else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1]?.split('?')[0] || ''
    }
    // Handle youtube.com/embed/ID format
    else if (url.includes('youtube.com/embed/')) {
      videoId = url.split('embed/')[1]?.split('?')[0] || ''
    }
    // Assume it's just an ID
    else if (url.length === 11) {
      videoId = url
    }

    return `https://www.youtube.com/embed/${videoId}?autoplay=1&modestbranding=1&rel=0`
  }

  // Handle autoplay
  useEffect(() => {
    if (!isPlaying || testimonials.length === 0) {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current)
      }
      return
    }

    autoplayTimerRef.current = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % testimonials.length)
    }, autoplayInterval)

    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current)
      }
    }
  }, [isPlaying, testimonials.length, autoplayInterval])

  const goToPrevious = () => {
    setCurrentIndex(prev => (prev - 1 + testimonials.length) % testimonials.length)
    setIsPlaying(false)
  }

  const goToNext = () => {
    setCurrentIndex(prev => (prev + 1) % testimonials.length)
    setIsPlaying(false)
  }

  const goToIndex = (index: number) => {
    setCurrentIndex(index)
    setIsPlaying(false)
  }

  const togglePlayPause = () => {
    const newIsPlaying = !isPlaying
    setIsPlaying(newIsPlaying)
    
    // Track video play event when user clicks play
    if (newIsPlaying && currentTestimonial) {
      trackVideoPlay(currentTestimonial.name, 'youtube')
    }
  }

  if (testimonials.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        No testimonials available
      </div>
    )
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Video Container */}
      <div className="relative w-full bg-black rounded-xl overflow-hidden shadow-2xl group">
        {/* Aspect Ratio 16:9 */}
        <div className="relative w-full pt-[56.25%]">
          <iframe
            className="absolute inset-0 w-full h-full"
            src={getYoutubeEmbedUrl(currentTestimonial.youtubeUrl)}
            title={`${currentTestimonial.name} testimonial`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            loading="lazy"
          />
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={goToPrevious}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 z-20"
          aria-label="Previous testimonial"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={goToNext}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-all opacity-0 group-hover:opacity-100 z-20"
          aria-label="Next testimonial"
        >
          <ChevronRight className="w-6 h-6" />
        </button>

        {/* Autoplay Toggle */}
        <button
          onClick={togglePlayPause}
          className="absolute bottom-4 right-4 bg-black/50 hover:bg-black/75 text-white p-2 rounded-full transition-all z-20"
          aria-label={isPlaying ? 'Pause autoplay' : 'Play autoplay'}
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
      </div>

      {/* Testimonial Info */}
      <div className="mt-6 bg-white rounded-lg p-6 shadow-md">
        {/* Name and Title */}
        <div className="flex items-center gap-4 mb-4">
          {currentTestimonial.image && (
            <img
              src={currentTestimonial.image}
              alt={currentTestimonial.name}
              className="w-12 h-12 rounded-full object-cover"
            />
          )}
          <div>
            <h3 className="font-bold text-lg text-gray-900">{currentTestimonial.name}</h3>
            <p className="text-sm text-gray-600">{currentTestimonial.title}</p>
          </div>
        </div>

        {/* Quote */}
        {showQuote && (
          <blockquote className="italic text-gray-700 border-l-4 border-primary-500 pl-4 py-2 mb-4">
            "{currentTestimonial.quote}"
          </blockquote>
        )}

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 pt-4 border-t">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-primary-600 w-8'
                  : 'bg-gray-300 w-2 hover:bg-gray-400'
              }`}
              aria-label={`Go to testimonial ${index + 1}`}
              aria-current={index === currentIndex ? 'true' : 'false'}
            />
          ))}
        </div>
      </div>

      {/* Counter */}
      <div className="text-center mt-4 text-sm text-gray-500">
        {currentIndex + 1} / {testimonials.length}
      </div>
    </div>
  )
}
