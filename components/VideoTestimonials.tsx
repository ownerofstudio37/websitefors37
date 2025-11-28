'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Play, Pause, Volume2, VolumeX, Quote } from 'lucide-react'
import Image from 'next/image'

interface VideoTestimonial {
  id: string
  name: string
  service: string
  videoUrl: string
  thumbnailUrl: string
  quote: string
  duration: string
}

const testimonials: VideoTestimonial[] = [
  {
    id: '1',
    name: 'Coming Soon!',
    service: 'Video Testimonials',
    videoUrl: 'https://res.cloudinary.com/dmjxho2rl/video/upload/v1764358053/Untitled_Project_video-converter.com_j8vgtz.mp4',
    thumbnailUrl: 'https://res.cloudinary.com/dmjxho2rl/video/upload/v1764358053/Untitled_Project_video-converter.com_j8vgtz.jpg',
    quote: 'In Production - Coming soon! Here\'s a video I made over a beat I produced to hold you over! 🎵🎬',
    duration: '2:30'
  }
]

export default function VideoTestimonials() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [isPlaying, setIsPlaying] = useState<Record<string, boolean>>({})
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({})

  useEffect(() => {
    // Set up Intersection Observer for auto-play on scroll
    const observers: IntersectionObserver[] = []

    testimonials.forEach(testimonial => {
      const videoEl = videoRefs.current[testimonial.id]
      if (!videoEl) return

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting && entry.intersectionRatio > 0.5) {
              // Auto-play when 50% visible
              if (activeVideo === testimonial.id) {
                videoEl.play()
                setIsPlaying(prev => ({ ...prev, [testimonial.id]: true }))
              }
            } else {
              // Pause when out of view
              videoEl.pause()
              setIsPlaying(prev => ({ ...prev, [testimonial.id]: false }))
            }
          })
        },
        { threshold: [0.5] }
      )

      observer.observe(videoEl)
      observers.push(observer)
    })

    return () => {
      observers.forEach(observer => observer.disconnect())
    }
  }, [activeVideo])

  const togglePlay = (id: string) => {
    const videoEl = videoRefs.current[id]
    if (!videoEl) return

    if (isPlaying[id]) {
      videoEl.pause()
      setIsPlaying(prev => ({ ...prev, [id]: false }))
    } else {
      // Pause all other videos
      Object.keys(videoRefs.current).forEach(key => {
        if (key !== id && videoRefs.current[key]) {
          videoRefs.current[key]!.pause()
          setIsPlaying(prev => ({ ...prev, [key]: false }))
        }
      })
      
      videoEl.play()
      setIsPlaying(prev => ({ ...prev, [id]: true }))
      setActiveVideo(id)
    }
  }

  const toggleMute = (id: string) => {
    const videoEl = videoRefs.current[id]
    if (!videoEl) return

    videoEl.muted = !videoEl.muted
    setIsMuted(videoEl.muted)
  }

  const handleVideoClick = (id: string) => {
    setActiveVideo(id)
    togglePlay(id)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-yellow-100 border border-yellow-300 rounded-full text-yellow-800 font-semibold text-sm mb-4">
            🎬 In Production - Coming Soon!
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Video Testimonials
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            We're currently filming client testimonials. In the meantime, enjoy this creative video!
          </p>
        </div>

        <div className="grid md:grid-cols-1 gap-8 max-w-3xl mx-auto">{/* Changed to single column centered */}
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              {/* Video Container */}
              <div className="relative aspect-video bg-gray-900 overflow-hidden">
                {activeVideo !== testimonial.id ? (
                  // Thumbnail View
                  <>
                    <Image
                      src={testimonial.thumbnailUrl}
                      alt={`${testimonial.name} testimonial`}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />
                    <button
                      onClick={() => handleVideoClick(testimonial.id)}
                      className="absolute inset-0 flex items-center justify-center z-10"
                      aria-label={`Play testimonial from ${testimonial.name}`}
                    >
                      <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                        <Play className="h-8 w-8 text-primary-600 ml-1" />
                      </div>
                    </button>
                    <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded">
                      {testimonial.duration}
                    </div>
                  </>
                ) : (
                  // Video Player
                  <>
                    <video
                      ref={(el) => { videoRefs.current[testimonial.id] = el }}
                      src={testimonial.videoUrl}
                      className="w-full h-full object-cover"
                      loop
                      muted={isMuted}
                      playsInline
                      onEnded={() => setIsPlaying(prev => ({ ...prev, [testimonial.id]: false }))}
                    />
                    
                    {/* Video Controls */}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                      <div className="flex items-center justify-between">
                        <button
                          onClick={() => togglePlay(testimonial.id)}
                          className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                          aria-label={isPlaying[testimonial.id] ? 'Pause' : 'Play'}
                        >
                          {isPlaying[testimonial.id] ? (
                            <Pause className="h-5 w-5 text-gray-900" />
                          ) : (
                            <Play className="h-5 w-5 text-gray-900 ml-0.5" />
                          )}
                        </button>
                        
                        <button
                          onClick={() => toggleMute(testimonial.id)}
                          className="w-10 h-10 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors"
                          aria-label={isMuted ? 'Unmute' : 'Mute'}
                        >
                          {isMuted ? (
                            <VolumeX className="h-5 w-5 text-gray-900" />
                          ) : (
                            <Volume2 className="h-5 w-5 text-gray-900" />
                          )}
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-start gap-3 mb-3">
                  <Quote className="h-8 w-8 text-primary-600 flex-shrink-0 opacity-50" />
                  <p className="text-gray-700 leading-relaxed italic">
                    "{testimonial.quote}"
                  </p>
                </div>
                
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-600">{testimonial.service}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Excited to work with us?</p>
          <a
            href="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
          >
            Let's Create Together
            <Play className="h-5 w-5" />
          </a>
        </div>
      </div>
    </section>
  )
}
