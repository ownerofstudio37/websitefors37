'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { Lock, Heart, Download, X, ChevronLeft, ChevronRight, Eye, Star, Loader } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

interface Gallery {
  id: string
  client_name: string
  title: string
  description: string | null
  allow_downloads: boolean
  require_purchase: boolean
}

interface GalleryImage {
  id: string
  cloudinary_url: string
  thumbnail_url: string
  watermarked_url: string
  caption: string | null
  is_featured: boolean
}

export default function ClientGalleryPage() {
  const params = useParams()
  const [password, setPassword] = useState('')
  const [authenticated, setAuthenticated] = useState(false)
  const [error, setError] = useState('')
  const [gallery, setGallery] = useState<Gallery | null>(null)
  const [images, setImages] = useState<GalleryImage[]>([])
  const [favorites, setFavorites] = useState<Set<string>>(new Set())
  const [selectedImage, setSelectedImage] = useState<number | null>(null)
  const [loading, setLoading] = useState(false)
  const [viewFilter, setViewFilter] = useState<'all' | 'favorites'>('all')

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch(`/api/galleries/${params.accessCode}/access`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      })
      
      const data = await res.json()
      
      if (data.success) {
        setAuthenticated(true)
        setGallery(data.gallery)
        setImages(data.images)
        // Load favorites from localStorage
        const stored = localStorage.getItem(`gallery_favorites_${params.accessCode}`)
        if (stored) {
          setFavorites(new Set(JSON.parse(stored)))
        }
      } else {
        setError(data.error || 'Invalid password')
      }
    } catch (error) {
      setError('Failed to access gallery')
    } finally {
      setLoading(false)
    }
  }

  const toggleFavorite = async (imageId: string) => {
    const newFavorites = new Set(favorites)
    if (newFavorites.has(imageId)) {
      newFavorites.delete(imageId)
    } else {
      newFavorites.add(imageId)
      // Track favorite
      fetch(`/api/galleries/${params.accessCode}/favorites`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ image_id: imageId })
      })
    }
    setFavorites(newFavorites)
    localStorage.setItem(`gallery_favorites_${params.accessCode}`, JSON.stringify([...newFavorites]))
  }

  const downloadImage = async (imageId: string, url: string) => {
    // Track download
    await fetch(`/api/galleries/${params.accessCode}/downloads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image_id: imageId })
    })
    
    // Trigger download
    const link = document.createElement('a')
    link.href = url
    link.download = `photo-${imageId}.jpg`
    link.click()
  }

  const filteredImages = viewFilter === 'favorites' 
    ? images.filter(img => favorites.has(img.id))
    : images

  const openLightbox = (index: number) => {
    setSelectedImage(index)
  }

  const closeLightbox = () => {
    setSelectedImage(null)
  }

  const nextImage = () => {
    if (selectedImage !== null && selectedImage < filteredImages.length - 1) {
      setSelectedImage(selectedImage + 1)
    }
  }

  const prevImage = () => {
    if (selectedImage !== null && selectedImage > 0) {
      setSelectedImage(selectedImage - 1)
    }
  }

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImage === null) return
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'Escape') closeLightbox()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [selectedImage])

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8"
        >
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Private Gallery</h1>
            <p className="text-gray-600">Enter your password to view your photos</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Gallery Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                placeholder="Enter password"
                required
              />
              {error && (
                <p className="text-red-600 text-sm mt-2">{error}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:from-indigo-700 hover:to-purple-700 transition-all font-medium disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader className="w-5 h-5 animate-spin" />
                  Accessing Gallery...
                </>
              ) : (
                'Access Gallery'
              )}
            </button>
          </form>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Header */}
      <div className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{gallery?.title}</h1>
              <p className="text-gray-600 mt-1">{images.length} photos</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setViewFilter('all')}
                className={`px-4 py-2 rounded-lg font-medium transition-all ${
                  viewFilter === 'all'
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Photos
              </button>
              <button
                onClick={() => setViewFilter('favorites')}
                className={`px-4 py-2 rounded-lg font-medium transition-all flex items-center gap-2 ${
                  viewFilter === 'favorites'
                    ? 'bg-rose-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Heart className="w-4 h-4" />
                Favorites ({favorites.size})
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Description */}
      {gallery?.description && (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <p className="text-gray-700 leading-relaxed">{gallery.description}</p>
          </div>
        </div>
      )}

      {/* Images Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredImages.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl shadow-sm">
            <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No favorites yet</h3>
            <p className="text-gray-600">Click the heart icon on photos to save your favorites</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredImages.map((image, index) => (
              <motion.div
                key={image.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all cursor-pointer"
                onClick={() => openLightbox(index)}
              >
                <div className="aspect-square relative overflow-hidden">
                  <img
                    src={image.thumbnail_url || image.watermarked_url}
                    alt={image.caption || 'Gallery photo'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {image.is_featured && (
                    <div className="absolute top-3 left-3 bg-yellow-500 text-white p-2 rounded-full shadow-lg">
                      <Star className="w-4 h-4" />
                    </div>
                  )}
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        toggleFavorite(image.id)
                      }}
                      className={`p-2 rounded-full transition-all ${
                        favorites.has(image.id)
                          ? 'bg-rose-500 text-white'
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      <Heart className="w-5 h-5" fill={favorites.has(image.id) ? 'currentColor' : 'none'} />
                    </button>
                    {gallery?.allow_downloads && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation()
                          downloadImage(image.id, image.watermarked_url)
                        }}
                        className="p-2 bg-white/20 text-white rounded-full hover:bg-white/30 transition-all"
                      >
                        <Download className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-50 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close Button */}
            <button
              className="absolute top-4 right-4 p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all z-50"
              onClick={closeLightbox}
            >
              <X className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            {selectedImage > 0 && (
              <button
                className="absolute left-4 p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all z-50"
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}
            {selectedImage < filteredImages.length - 1 && (
              <button
                className="absolute right-4 p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all z-50"
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}

            {/* Image */}
            <motion.div
              key={selectedImage}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="max-w-7xl max-h-[90vh] w-full h-full p-8 flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={filteredImages[selectedImage].watermarked_url || filteredImages[selectedImage].cloudinary_url}
                alt={filteredImages[selectedImage].caption || 'Gallery photo'}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              />
            </motion.div>

            {/* Actions Bar */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="text-white">
                  <p className="text-sm text-white/60">
                    {selectedImage + 1} / {filteredImages.length}
                  </p>
                  {filteredImages[selectedImage].caption && (
                    <p className="text-lg font-medium mt-1">{filteredImages[selectedImage].caption}</p>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(filteredImages[selectedImage].id)
                    }}
                    className={`p-3 rounded-full transition-all ${
                      favorites.has(filteredImages[selectedImage].id)
                        ? 'bg-rose-500 text-white'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    <Heart className="w-5 h-5" fill={favorites.has(filteredImages[selectedImage].id) ? 'currentColor' : 'none'} />
                  </button>
                  {gallery?.allow_downloads && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation()
                        downloadImage(
                          filteredImages[selectedImage].id,
                          filteredImages[selectedImage].watermarked_url
                        )
                      }}
                      className="p-3 bg-white/10 text-white rounded-full hover:bg-white/20 transition-all"
                    >
                      <Download className="w-5 h-5" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
