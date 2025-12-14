'use client'

import React, { useState } from 'react'
import { Upload, Loader2, Link as LinkIcon, Image as ImageIcon } from 'lucide-react'

interface ImageUploaderProps {
  onImageUrl: (url: string) => void
  buttonLabel?: string
}

export default function ImageUploader({ onImageUrl, buttonLabel }: ImageUploaderProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mode, setMode] = useState<'upload' | 'url'>('upload')
  const [urlInput, setUrlInput] = useState('')
  
  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!urlInput.trim()) return
    
    onImageUrl(urlInput.trim())
    setUrlInput('')
  }

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image size exceeds 5MB limit')
      return
    }
    
    setUploading(true)
    setError(null)
    
    try {
      // Try Cloudinary upload first if env vars exist
      if (process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME && process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET) {
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET)
        
        const res = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          { method: 'POST', body: formData }
        )
        
        if (!res.ok) throw new Error('Cloudinary upload failed')
        
        const data = await res.json()
        onImageUrl(data.secure_url)
        return
      }

      // Fallback to Supabase Storage
      const { supabase } = await import('@/lib/supabase')
      
      const fileExt = file.name.split('.').pop()
      const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`
      const filePath = `gallery/${fileName}`
      
      // Upload the file
      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file)
      
      if (uploadError) throw uploadError
      
      // Get the public URL
      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath)
      
      // Pass the URL back to the parent component
      onImageUrl(data.publicUrl)
      
    } catch (error: any) {
      console.error('Error uploading image:', error)
      setError(error.message || 'Error uploading image')
    } finally {
      setUploading(false)
    }
  }
  
  return (
    <div className="space-y-3">
      <div className="flex space-x-2 text-sm">
        <button
          type="button"
          onClick={() => setMode('upload')}
          className={`px-3 py-1 rounded-md transition-colors ${
            mode === 'upload' 
              ? 'bg-indigo-100 text-indigo-700 font-medium' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Upload
        </button>
        <button
          type="button"
          onClick={() => setMode('url')}
          className={`px-3 py-1 rounded-md transition-colors ${
            mode === 'url' 
              ? 'bg-indigo-100 text-indigo-700 font-medium' 
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          Image URL
        </button>
      </div>

      {mode === 'url' ? (
        <form onSubmit={handleUrlSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="url"
              value={urlInput}
              onChange={(e) => setUrlInput(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-sm"
            />
          </div>
          <button
            type="submit"
            disabled={!urlInput.trim()}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm font-medium hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Use URL
          </button>
        </form>
      ) : (
        <label className="block">
          <span className="sr-only">Choose image</span>
          <div className="flex items-center justify-center w-full">
            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                {uploading ? (
                  <Loader2 className="h-8 w-8 text-indigo-600 animate-spin" />
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <p className="text-sm text-gray-500">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
                  </>
                )}
              </div>
              <input 
                type="file" 
                className="hidden" 
                accept="image/*"
                disabled={uploading}
                onChange={uploadImage}
              />
            </label>
          </div>
        </label>
      )}
      
      {error && (
        <p className="text-sm text-red-600 flex items-center gap-1">
          <span className="w-1 h-1 rounded-full bg-red-600" />
          {error}
        </p>
      )}
    </div>
  )
}
