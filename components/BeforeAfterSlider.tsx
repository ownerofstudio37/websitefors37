'use client'

import React, { useState, useRef, useEffect } from 'react'
import Image from 'next/image'

interface BeforeAfterSliderProps {
  beforeImage: string
  afterImage: string
  beforeLabel?: string
  afterLabel?: string
  width?: number
  height?: number
  className?: string
}

export default function BeforeAfterSlider({
  beforeImage,
  afterImage,
  beforeLabel = 'Before',
  afterLabel = 'After',
  width = 800,
  height = 600,
  className = ''
}: BeforeAfterSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)

  // Handle mouse/touch movement
  const handleMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if (!isDragging && e.type !== 'mousemove' && e.type !== 'touchmove') return
    if (e.type === 'mousemove' && !(e as React.MouseEvent).buttons) return

    const container = containerRef.current
    if (!container) return

    const rect = container.getBoundingClientRect()
    const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX
    const x = clientX - rect.left

    const percentage = (x / rect.width) * 100
    setSliderPosition(Math.max(0, Math.min(100, percentage)))
  }

  const handleMouseDown = () => setIsDragging(true)
  const handleMouseUp = () => setIsDragging(false)
  const handleTouchStart = () => setIsDragging(true)
  const handleTouchEnd = () => setIsDragging(false)

  useEffect(() => {
    document.addEventListener('mouseup', handleMouseUp)
    document.addEventListener('touchend', handleTouchEnd)

    return () => {
      document.removeEventListener('mouseup', handleMouseUp)
      document.removeEventListener('touchend', handleTouchEnd)
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden bg-gray-200 rounded-lg cursor-col-resize select-none ${className}`}
      style={{ width: '100%', maxWidth: `${width}px`, aspectRatio: `${width}/${height}` }}
      onMouseMove={handleMove}
      onTouchMove={handleMove}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
    >
      {/* After Image (Background) */}
      <div className="absolute inset-0">
        <img
          src={afterImage}
          alt={afterLabel}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>

      {/* Before Image (Clipped) */}
      <div
        className="absolute inset-0 overflow-hidden"
        style={{ width: `${sliderPosition}%`, transition: isDragging ? 'none' : 'width 0.1s ease-out' }}
      >
        <img
          src={beforeImage}
          alt={beforeLabel}
          className="w-full h-full object-cover"
          loading="lazy"
          style={{ width: `${width}px` }}
        />
      </div>

      {/* Slider Handle */}
      <div
        className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-col-resize"
        style={{
          left: `${sliderPosition}%`,
          transform: 'translateX(-50%)',
          transition: isDragging ? 'none' : 'left 0.1s ease-out'
        }}
      >
        {/* Handle Circle */}
        <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 bg-white rounded-full shadow-xl flex items-center justify-center pointer-events-none">
          <div className="flex gap-1">
            <div className="w-0.5 h-4 bg-gray-400" />
            <div className="w-0.5 h-4 bg-gray-400" />
            <div className="w-0.5 h-4 bg-gray-400" />
          </div>
        </div>
      </div>

      {/* Labels */}
      <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-2 rounded text-sm font-semibold backdrop-blur">
        {beforeLabel}
      </div>
      <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-2 rounded text-sm font-semibold backdrop-blur">
        {afterLabel}
      </div>

      {/* Mobile Hint */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded text-xs opacity-0 hover:opacity-100 transition-opacity backdrop-blur pointer-events-none">
        Drag to compare
      </div>
    </div>
  )
}
