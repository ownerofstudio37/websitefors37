'use client'

import { useState, useEffect } from 'react'
import { Camera, Plus, Eye, Lock, Calendar, Download, Trash2, Edit, Copy, ExternalLink } from 'lucide-react'
import AdminProtected from '@/components/AdminProtected'
import AdminState from '@/components/admin/AdminState'
import AdminToast from '@/components/admin/AdminToast'
import AdminConfirmDialog from '@/components/admin/AdminConfirmDialog'

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
  const [error, setError] = useState<string | null>(null)
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'error' | 'info' } | null>(null)
  const [deleteGalleryId, setDeleteGalleryId] = useState<string | null>(null)
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
      setLoading(true)
      setError(null)
      const res = await fetch('/api/admin/galleries')
      const data = await res.json()
      if (data.success) {
        setGalleries(data.galleries)
      } else {
        throw new Error(data.error || 'Failed to load galleries')
      }
    } catch (error) {
      console.error('Failed to fetch galleries:', error)
      setError(error instanceof Error ? error.message : 'Failed to load galleries')
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

  const showToast = (message: string, type: 'success' | 'error' | 'info' = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const copyLink = async (accessCode: string) => {
    const link = `https://gallery.studio37.cc/${accessCode}`
    await navigator.clipboard.writeText(link)
    showToast('Gallery link copied to clipboard')
  }

  const deleteGallery = async (id: string) => {
    try {
      const res = await fetch(`/api/admin/galleries/${id}`, { method: 'DELETE' })
      const data = await res.json()
      if (data.success) {
        setGalleries(galleries.filter(g => g.id !== id))
        showToast('Gallery deleted')
      } else {
        showToast(data.error || 'Failed to delete gallery', 'error')
      }
    } catch (error) {
      console.error('Failed to delete gallery:', error)
      showToast('Failed to delete gallery', 'error')
    } finally {
      setDeleteGalleryId(null)
    }
  }

  const getDeliveryChecklist = (gallery: Gallery) => [
    { label: 'Access code', done: Boolean(gallery.access_code) },
    { label: 'Client email', done: Boolean(gallery.client_email) },
    { label: 'Images uploaded', done: gallery.total_photos > 0 },
    { label: 'Preview link', done: Boolean(gallery.access_code) },
    { label: 'Delivery settings', done: Boolean(gallery.expires_at || gallery.allow_downloads || gallery.require_purchase) },
    { label: 'Email ready', done: Boolean(gallery.client_email && gallery.access_code && gallery.total_photos > 0) },
  ]

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
          {error ? (
            <AdminState
              tone="error"
              icon={Camera}
              title="Galleries could not load"
              description={error}
              actionLabel="Try again"
              onAction={fetchGalleries}
            />
          ) : loading ? (
            <AdminState
              loading
              title="Loading client galleries"
              description="Fetching gallery records, access codes, and delivery stats."
            />
          ) : galleries.length === 0 ? (
            <AdminState
              icon={Camera}
              title="No client galleries yet"
              description="Create a client gallery, then share it from gallery.studio37.cc with the generated access code."
              actionLabel="Create gallery"
              onAction={() => setShowCreate(true)}
              secondaryActionLabel="Open gallery site"
              onSecondaryAction={() => window.open('https://gallery.studio37.cc', '_blank', 'noopener,noreferrer')}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {galleries.map((gallery) => (
                (() => {
                  const checklist = getDeliveryChecklist(gallery)
                  const completed = checklist.filter((item) => item.done).length
                  const ready = completed === checklist.length
                  return (
                <div
                  key={gallery.id}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all overflow-hidden border border-gray-100"
                >
                  {/* Card Header */}
                  <div className={`p-6 text-white ${ready ? 'bg-gradient-to-r from-emerald-600 to-teal-600' : 'bg-gradient-to-r from-indigo-500 to-purple-600'}`}>
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
                    <p className="mt-3 w-fit rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold">
                      Delivery readiness: {completed}/{checklist.length}
                    </p>
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

                    <div className="rounded-lg border border-gray-200 bg-white p-3">
                      <div className="mb-2 flex items-center justify-between gap-2">
                        <p className="text-xs font-semibold uppercase tracking-[0.12em] text-gray-500">Delivery checklist</p>
                        <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${ready ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-800'}`}>
                          {ready ? 'Ready' : 'Review'}
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-1.5">
                        {checklist.map((item) => (
                          <div key={item.label} className="flex items-center gap-1.5 text-xs text-gray-600">
                            <span className={`h-2 w-2 rounded-full ${item.done ? 'bg-green-500' : 'bg-gray-300'}`} />
                            <span>{item.label}</span>
                          </div>
                        ))}
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
                        href={`https://gallery.studio37.cc/${gallery.access_code}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        title="View gallery"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                      <a
                        href={`mailto:${gallery.client_email}?subject=${encodeURIComponent(`Your Studio37 gallery: ${gallery.title}`)}&body=${encodeURIComponent(`Hi ${gallery.client_name},\n\nYour Studio37 gallery is ready here:\nhttps://gallery.studio37.cc/${gallery.access_code}\n\nAccess code: ${gallery.access_code}\n\nBest,\nStudio37`)}`}
                        className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg hover:bg-emerald-100 transition-colors"
                        title="Email client"
                      >
                        Email
                      </a>
                      <button
                        onClick={() => setDeleteGalleryId(gallery.id)}
                        className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors"
                        title="Delete gallery"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
                  )
                })()
              ))}
            </div>
          )}
        </div>
        {toast && (
          <div className="fixed bottom-6 right-6 z-[110] w-[min(92vw,420px)]">
            <AdminToast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
          </div>
        )}
        <AdminConfirmDialog
          open={Boolean(deleteGalleryId)}
          title="Delete gallery?"
          message="This will remove the client gallery record and its photos. This cannot be undone."
          confirmLabel="Delete gallery"
          danger
          onCancel={() => setDeleteGalleryId(null)}
          onConfirm={() => deleteGalleryId && deleteGallery(deleteGalleryId)}
        />
      </div>
    </AdminProtected>
  )
}
