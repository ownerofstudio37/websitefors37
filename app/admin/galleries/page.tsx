'use client'

import { useState, useEffect } from 'react'
import { Camera, Plus, Eye, Lock, Calendar, Download, Heart, Trash2, Edit, Copy, ExternalLink } from 'lucide-react'
import AdminProtected from '@/components/AdminProtected'

interface Gallery {
  id: string
  client_name: string
  client_email: string
  session_date: string | null
  session_type: string | null
  title: string
  description: string | null
  access_code: string
  status: string
  expires_at: string | null
  allow_downloads: boolean
  require_purchase: boolean
  total_photos: number
  views_count: number
  downloads_count: number
  created_at: string
}

export default function GalleriesPage() {
  const [galleries, setGalleries] = useState<Gallery[]>([])
  const [loading, setLoading] = useState(true)
  const [showCreate, setShowCreate] = useState(false)
  const [formData, setFormData] = useState({
    client_name: '',
    client_email: '',
    session_date: '',
    session_type: 'portrait',
    title: '',
    description: '',
    password: '',
    allow_downloads: false,
    require_purchase: true,
    expires_days: 90
  })

  useEffect(() => {
    fetchGalleries()
  }, [])

  const fetchGalleries = async () => {
    try {
      const res = await fetch('/api/admin/galleries')
      const data = await res.json()
      if (data.success) {
        setGalleries(data.galleries)
      }
    } catch (error) {
      console.error('Failed to fetch galleries:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const res = await fetch('/api/admin/galleries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.success) {
        setGalleries([data.gallery, ...galleries])
        setShowCreate(false)
        setFormData({
          client_name: '',
          client_email: '',
          session_date: '',
          session_type: 'portrait',
          title: '',
          description: '',
          password: '',
          allow_downloads: false,
          require_purchase: true,
          expires_days: 90
        })
      }
    } catch (error) {
      console.error('Failed to create gallery:', error)
    }
  }

  const copyLink = (accessCode: string) => {
    const link = `${window.location.origin}/gallery/${accessCode}`
    navigator.clipboard.writeText(link)
    alert('Gallery link copied to clipboard!')
  }

  const deleteGallery = async (id: string) => {
    if (!confirm('Delete this gallery? This will remove all photos and cannot be undone.')) return
    
    try {
      const res = await fetch(`/api/admin/galleries/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        setGalleries(galleries.filter(g => g.id !== id))
      }
    } catch (error) {
      console.error('Failed to delete gallery:', error)
    }
  }

  return (
    <AdminProtected>
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 flex items-center gap-3">
                <Camera className="w-10 h-10 text-indigo-600" />
                Client Galleries
              </h1>
              <p className="text-gray-600 mt-2">Create and manage private photo galleries for your clients</p>
            </div>
            <button
              onClick={() => setShowCreate(true)}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all shadow-lg hover:shadow-xl"
            >
              <Plus className="w-5 h-5" />
              New Gallery
            </button>
          </div>

          {/* Create Modal */}
          {showCreate && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                <div className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Create New Gallery</h2>
                  <form onSubmit={handleCreate} className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Client Name</label>
                        <input
                          type="text"
                          required
                          value={formData.client_name}
                          onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="John & Jane Doe"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Client Email</label>
                        <input
                          type="email"
                          required
                          value={formData.client_email}
                          onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          placeholder="client@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Title</label>
                      <input
                        type="text"
                        required
                        value={formData.title}
                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Smith Wedding - October 2024"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Session Type</label>
                        <select
                          value={formData.session_type}
                          onChange={(e) => setFormData({ ...formData, session_type: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                          <option value="wedding">Wedding</option>
                          <option value="portrait">Portrait</option>
                          <option value="family">Family</option>
                          <option value="commercial">Commercial</option>
                          <option value="event">Event</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Session Date</label>
                        <input
                          type="date"
                          value={formData.session_date}
                          onChange={(e) => setFormData({ ...formData, session_date: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Description (Optional)</label>
                      <textarea
                        value={formData.description}
                        onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                        rows={3}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="A beautiful autumn wedding at..."
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gallery Password</label>
                      <input
                        type="text"
                        required
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Create a secure password"
                      />
                      <p className="text-xs text-gray-500 mt-1">Clients will need this to access the gallery</p>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="allow_downloads"
                          checked={formData.allow_downloads}
                          onChange={(e) => setFormData({ ...formData, allow_downloads: e.target.checked })}
                          className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor="allow_downloads" className="text-sm font-medium text-gray-700">
                          Allow Downloads
                        </label>
                      </div>
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="require_purchase"
                          checked={formData.require_purchase}
                          onChange={(e) => setFormData({ ...formData, require_purchase: e.target.checked })}
                          className="w-5 h-5 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                        />
                        <label htmlFor="require_purchase" className="text-sm font-medium text-gray-700">
                          Require Purchase
                        </label>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Expires After (days)</label>
                      <input
                        type="number"
                        value={formData.expires_days}
                        onChange={(e) => setFormData({ ...formData, expires_days: parseInt(e.target.value) })}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="90"
                      />
                    </div>

                    <div className="flex gap-4 pt-4">
                      <button
                        type="submit"
                        className="flex-1 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium"
                      >
                        Create Gallery
                      </button>
                      <button
                        type="button"
                        onClick={() => setShowCreate(false)}
                        className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}

          {/* Galleries Grid */}
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block w-12 h-12 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : galleries.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">No galleries yet</h3>
              <p className="text-gray-600 mb-6">Create your first client gallery to get started</p>
              <button
                onClick={() => setShowCreate(true)}
                className="inline-flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all"
              >
                <Plus className="w-5 h-5" />
                Create Gallery
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleries.map((gallery) => (
                <div
                  key={gallery.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden border border-gray-100"
                >
                  {/* Card Header */}
                  <div className="bg-gradient-to-r from-indigo-500 to-purple-600 p-6 text-white">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold">{gallery.title}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        gallery.status === 'active' ? 'bg-green-400 text-green-900' : 'bg-gray-400 text-gray-900'
                      }`}>
                        {gallery.status}
                      </span>
                    </div>
                    <p className="text-indigo-100 text-sm">{gallery.client_name}</p>
                    <p className="text-indigo-200 text-xs mt-1">{gallery.client_email}</p>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Session Type</span>
                      <span className="font-semibold text-gray-900 capitalize">{gallery.session_type || 'N/A'}</span>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Photos</span>
                      <span className="font-semibold text-gray-900">{gallery.total_photos}</span>
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Eye className="w-4 h-4" />
                        <span>{gallery.views_count}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Download className="w-4 h-4" />
                        <span>{gallery.downloads_count}</span>
                      </div>
                    </div>

                    {gallery.expires_at && (
                      <div className="flex items-center gap-2 text-sm text-amber-600">
                        <Calendar className="w-4 h-4" />
                        <span>Expires {new Date(gallery.expires_at).toLocaleDateString()}</span>
                      </div>
                    )}

                    {/* Access Code */}
                    <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm">
                          <Lock className="w-4 h-4 text-gray-500" />
                          <code className="font-mono text-gray-900">{gallery.access_code}</code>
                        </div>
                        <button
                          onClick={() => copyLink(gallery.access_code)}
                          className="p-1.5 hover:bg-gray-200 rounded transition-colors"
                          title="Copy gallery link"
                        >
                          <Copy className="w-4 h-4 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-2 pt-2">
                      <a
                        href={`/admin/galleries/${gallery.id}`}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-600 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
                      >
                        <Edit className="w-4 h-4" />
                        Manage
                      </a>
                      <a
                        href={`/gallery/${gallery.access_code}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        title="View gallery"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <button
                        onClick={() => deleteGallery(gallery.id)}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        title="Delete gallery"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
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
