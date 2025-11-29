'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { Upload, Image as ImageIcon, Trash2, Star, Eye, Download, ArrowLeft, Save } from 'lucide-react'
import AdminProtected from '@/components/AdminProtected'

interface Gallery {
  id: string
  client_name: string
  title: string
  description: string | null
  access_code: string
  total_photos: number
  allow_downloads: boolean
  require_purchase: boolean
  status: string
}

interface GalleryImage {
  id: string
  cloudinary_url: string
  thumbnail_url: string
  watermarked_url: string
  filename: string
  caption: string | null
  display_order: number
  view_count: number
  favorite_count: number
  download_count: number
  is_featured: boolean
}

export default function GalleryManagePage() {
  const params = useParams()
  const router = useRouter()
  const [gallery, setGallery] = useState<Gallery | null>(null)
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [showUrlUpload, setShowUrlUpload] = useState(false)
  const [urlInput, setUrlInput] = useState('')
  const [urlUploading, setUrlUploading] = useState(false)

  useEffect(() => {
    fetchGallery()
  }, [params.id])

  const fetchGallery = async () => {
    try {
      const res = await fetch(`/api/admin/galleries/${params.id}`)
      const data = await res.json()
      if (data.success) {
        setGallery(data.gallery)
        setImages(data.gallery.gallery_images || [])
      }
    } catch (error) {
      console.error('Failed to fetch gallery:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setUploading(true)
    try {
      const formData = new FormData()
      Array.from(files).forEach((file) => {
        formData.append('images', file)
      })

      const res = await fetch(`/api/admin/galleries/${params.id}/images`, {
        method: 'POST',
        body: formData
      })
      const data = await res.json()
      if (data.success) {
        // Optimistically append new images; fall back to refetch for consistency
        if (Array.isArray(data.images) && data.images.length > 0) {
          setImages(prev => [
            ...prev,
            ...data.images.map((img: any) => ({
              id: img.id,
              cloudinary_url: img.cloudinary_url,
              thumbnail_url: img.thumbnail_url,
              watermarked_url: img.watermarked_url,
              filename: img.filename,
              caption: img.caption || null,
              display_order: img.display_order || prev.length,
              view_count: img.view_count || 0,
              favorite_count: img.favorite_count || 0,
              download_count: img.download_count || 0,
              is_featured: img.is_featured || false
            }))
          ])
        }
        // Schedule a silent refresh to sync counts/order
        setTimeout(() => {
          fetchGallery()
        }, 500)
      } else {
        console.error('Upload failed', data.error)
      }
    } catch (error) {
      console.error('Failed to upload images:', error)
    } finally {
      setUploading(false)
    }
  }

  const deleteImage = async (imageId: string) => {
    if (!confirm('Delete this image?')) return

    try {
      const res = await fetch(`/api/admin/galleries/${params.id}/images/${imageId}`, {
        method: 'DELETE'
      })
      const data = await res.json()
      if (data.success) {
        setImages(images.filter(img => img.id !== imageId))
      }
    } catch (error) {
      console.error('Failed to delete image:', error)
    }
  }

  const toggleFeatured = async (imageId: string, isFeatured: boolean) => {
    try {
      const res = await fetch(`/api/admin/galleries/${params.id}/images/${imageId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_featured: !isFeatured })
      })
      const data = await res.json()
      if (data.success) {
        setImages(images.map(img => 
          img.id === imageId ? { ...img, is_featured: !isFeatured } : img
        ))
      }
    } catch (error) {
      console.error('Failed to update image:', error)
    }
  }

  if (loading) {
    return (
      <AdminProtected>
        <div className="flex items-center justify-center min-h-screen">
          <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </AdminProtected>
    )
  }

  if (!gallery) {
    return (
      <AdminProtected>
        <div className="flex items-center justify-center min-h-screen">
          <p className="text-gray-600">Gallery not found</p>
        </div>
      </AdminProtected>
    )
  }

  return (
    <AdminProtected>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="mb-8">
            <button
              onClick={() => router.push('/admin/galleries')}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
            >
              <ArrowLeft className="w-5 h-5" />
              Back to Galleries
            </button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-gray-900">{gallery.title}</h1>
                <p className="text-gray-600 mt-2">{gallery.client_name} • {images.length} photos</p>
              </div>
              <a
                href={`/gallery/${gallery.access_code}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
              >
                View Gallery
              </a>
            </div>
          </div>

          {/* Upload Section */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Upload Photos</h2>
            <div className="flex items-center gap-4 mb-4">
              <button
                onClick={() => setShowUrlUpload(false)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${!showUrlUpload ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >Files</button>
              <button
                onClick={() => setShowUrlUpload(true)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${showUrlUpload ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
              >Remote URLs</button>
            </div>
            {showUrlUpload ? (
              <div className="space-y-4">
                <textarea
                  value={urlInput}
                  onChange={(e) => setUrlInput(e.target.value)}
                  placeholder="Paste one image URL per line (https://...)"
                  className="w-full h-40 resize-none px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-sm font-mono"
                />
                <div className="flex items-center justify-between">
                  <p className="text-xs text-gray-500">Max 25 URLs per upload. Non-image URLs will be skipped.</p>
                  <button
                    disabled={urlUploading || !urlInput.trim()}
                    onClick={async () => {
                      const urls = urlInput.split(/\n|\r/).map(u => u.trim()).filter(Boolean)
                      if (urls.length === 0) return
                      setUrlUploading(true)
                      try {
                        const res = await fetch(`/api/admin/galleries/${params.id}/images/remote`, {
                          method: 'POST',
                          headers: { 'Content-Type': 'application/json' },
                          body: JSON.stringify({ urls })
                        })
                        const text = await res.text()
                        let data: any = null
                        try { data = JSON.parse(text) } catch { console.error('Non-JSON response', text) }
                        if (!res.ok) {
                          console.error('Remote upload failed', data?.error || text)
                          return
                        }
                        if (data?.success && Array.isArray(data.images)) {
                          setImages(prev => [...prev, ...data.images.map((img: any) => ({
                            id: img.id,
                            cloudinary_url: img.cloudinary_url,
                            thumbnail_url: img.thumbnail_url,
                            watermarked_url: img.watermarked_url,
                            filename: img.filename,
                            caption: null,
                            display_order: img.display_order || prev.length,
                            view_count: img.view_count || 0,
                            favorite_count: img.favorite_count || 0,
                            download_count: img.download_count || 0,
                            is_featured: img.is_featured || false
                          }))])
                          setUrlInput('')
                          setTimeout(() => { fetchGallery() }, 600)
                        } else {
                          console.error('Remote upload failed', data?.error)
                        }
                      } catch (err) {
                        console.error('Remote URL upload error', err)
                      } finally {
                        setUrlUploading(false)
                      }
                    }}
                    className={`px-5 py-2 rounded-lg text-sm font-medium flex items-center gap-2 ${urlUploading ? 'bg-indigo-400 text-white cursor-not-allowed' : 'bg-indigo-600 text-white hover:bg-indigo-700'}`}
                  >{urlUploading ? 'Uploading...' : 'Import URLs'}</button>
                </div>
              </div>
            ) : (
            <label className="flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-indigo-500 hover:bg-indigo-50 transition-all">
              <div className="flex flex-col items-center justify-center">
                {uploading ? (
                  <>
                    <div className="w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="text-gray-600">Uploading images...</p>
                  </>
                ) : (
                  <>
                    <Upload className="w-12 h-12 text-gray-400 mb-4" />
                    <p className="text-gray-600 font-medium">Click to upload or drag and drop</p>
                    <p className="text-gray-400 text-sm mt-1">JPG, PNG, WEBP up to 10MB each</p>
                  </>
                )}
              </div>
              <input
                type="file"
                className="hidden"
                multiple
                accept="image/*"
                onChange={handleImageUpload}
                disabled={uploading}
              />
            </label>
            )}
          </div>

          {/* Images Grid */}
          {images.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-xl shadow-lg">
              <ImageIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No photos yet</h3>
              <p className="text-gray-600">Upload photos to get started</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {images.map((image) => (
                <div
                  key={image.id}
                  className="group relative bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-all"
                >
                  <img
                    src={image.thumbnail_url || image.cloudinary_url}
                    alt={image.filename}
                    className="w-full h-64 object-cover"
                  />
                  
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-4">
                    <div className="flex justify-between">
                      <button
                        onClick={() => toggleFeatured(image.id, image.is_featured)}
                        className={`p-2 rounded-lg transition-colors ${
                          image.is_featured
                            ? 'bg-yellow-500 text-white'
                            : 'bg-white/20 text-white hover:bg-white/30'
                        }`}
                      >
                        <Star className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => deleteImage(image.id)}
                        className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    
                    <div className="flex items-center gap-4 text-white text-sm">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{image.view_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4" />
                        <span>{image.favorite_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        <span>{image.download_count}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminProtected>
  )
}
