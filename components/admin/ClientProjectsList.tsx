'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Project {
  id: string
  name: string
  type: string
  description: string | null
  status: string
  session_date: string | null
  due_date: string | null
  completed_at: string | null
  package_name: string | null
  total_amount_cents: number | null
  paid_amount_cents: number
  payment_status: string
  cover_image_url: string | null
  tags: string[] | null
  created_at: string
  updated_at: string
}

function getStatusBadgeColor(status: string): string {
  const colors: Record<string, string> = {
    pending: 'bg-yellow-100 text-yellow-800',
    scheduled: 'bg-blue-100 text-blue-800',
    'in-progress': 'bg-purple-100 text-purple-800',
    review: 'bg-orange-100 text-orange-800',
    completed: 'bg-green-100 text-green-800',
    delivered: 'bg-teal-100 text-teal-800',
    archived: 'bg-gray-100 text-gray-800'
  }
  return colors[status || 'pending'] || 'bg-gray-100 text-gray-800'
}

function getPaymentStatusBadgeColor(status: string): string {
  const colors: Record<string, string> = {
    pending: 'bg-red-100 text-red-800',
    partial: 'bg-yellow-100 text-yellow-800',
    paid: 'bg-green-100 text-green-800',
    refunded: 'bg-gray-100 text-gray-800'
  }
  return colors[status || 'pending'] || 'bg-gray-100 text-gray-800'
}

function formatCurrency(cents: number | null): string {
  if (cents === null) return 'N/A'
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(cents / 100)
}

function formatDate(dateString: string | null): string {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

function normalizeTags(tags: unknown): string[] {
  if (Array.isArray(tags)) return tags.filter((t): t is string => typeof t === 'string')
  if (typeof tags === 'string') return tags.split(',').map((s) => s.trim()).filter(Boolean)
  return []
}

export default function ClientProjectsList({ projects: initialProjects }: { projects: Project[] }) {
  const router = useRouter()
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  const [isSaving, setIsSaving] = useState(false)

  const handleEdit = (project: Project) => {
    setEditingProject(project)
  }

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editingProject) return

    setIsSaving(true)
    const formData = new FormData(e.currentTarget)
    
    const updates = {
      name: formData.get('name'),
      type: formData.get('type'),
      status: formData.get('status'),
      payment_status: formData.get('payment_status'),
      description: formData.get('description'),
      package_name: formData.get('package_name'),
      session_date: formData.get('session_date') || null,
      due_date: formData.get('due_date') || null,
      total_amount_cents: formData.get('total_amount_cents') ? Math.round(parseFloat(formData.get('total_amount_cents') as string) * 100) : null,
      paid_amount_cents: formData.get('paid_amount_cents') ? Math.round(parseFloat(formData.get('paid_amount_cents') as string) * 100) : 0,
    }

    try {
      const res = await fetch(`/api/admin/client-projects/${editingProject.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })
      
      if (res.ok) {
        setEditingProject(null)
        router.refresh()
      } else {
        alert('Failed to update project')
      }
    } catch (error) {
      console.error('Error updating project:', error)
      alert('Error updating project')
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async () => {
    if (!editingProject || !confirm('Are you sure you want to delete this project? This cannot be undone.')) return

    setIsSaving(true)
    try {
      const res = await fetch(`/api/admin/client-projects/${editingProject.id}`, {
        method: 'DELETE'
      })
      
      if (res.ok) {
        setEditingProject(null)
        router.refresh()
      } else {
        alert('Failed to delete project')
      }
    } catch (error) {
      console.error('Error deleting project:', error)
      alert('Error deleting project')
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <>
      <div className="space-y-4">
        {initialProjects.map((project) => (
          <div 
            key={project.id}
            className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  {project.cover_image_url && (
                    <img 
                      src={project.cover_image_url}
                      alt={project.name}
                      className="w-16 h-16 rounded object-cover"
                    />
                  )}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {project.name}
                    </h3>
                    <p className="text-sm text-gray-500 capitalize">
                      {(project.type || 'unspecified').replace('-', ' ')}
                    </p>
                  </div>
                </div>
                
                {project.description && (
                  <p className="text-gray-600 mb-3">{project.description}</p>
                )}

                <div className="flex flex-wrap gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Status:</span>{' '}
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusBadgeColor(project.status || 'pending')}`}>
                      {(project.status || 'pending').replace('-', ' ')}
                    </span>
                  </div>
                  
                  <div>
                    <span className="text-gray-500">Payment:</span>{' '}
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getPaymentStatusBadgeColor(project.payment_status || 'pending')}`}>
                      {project.payment_status || 'pending'}
                    </span>
                  </div>
                  
                  {project.session_date && (
                    <div>
                      <span className="text-gray-500">Session:</span>{' '}
                      <span className="text-gray-900 font-medium">
                        {formatDate(project.session_date)}
                      </span>
                    </div>
                  )}
                  
                  {project.due_date && (
                    <div>
                      <span className="text-gray-500">Due:</span>{' '}
                      <span className="text-gray-900 font-medium">
                        {formatDate(project.due_date)}
                      </span>
                    </div>
                  )}
                </div>

                {project.package_name && (
                  <div className="mt-2 text-sm">
                    <span className="text-gray-500">Package:</span>{' '}
                    <span className="text-gray-900 font-medium">
                      {project.package_name}
                    </span>
                  </div>
                )}

                {project.total_amount_cents != null && (
                  <div className="mt-2 text-sm">
                    <span className="text-gray-500">Amount:</span>{' '}
                    <span className="text-gray-900 font-medium">
                      {formatCurrency(project.paid_amount_cents ?? 0)} / {formatCurrency(project.total_amount_cents)}
                    </span>
                  </div>
                )}

                {normalizeTags(project.tags).length > 0 && (
                  <div className="mt-3 flex flex-wrap gap-2">
                    {normalizeTags(project.tags).map((tag, idx) => (
                      <span 
                        key={idx}
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex gap-2">
                <button 
                  onClick={() => handleEdit(project)}
                  className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-50 rounded border border-gray-200"
                >
                  Edit
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Edit Modal */}
      {editingProject && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Edit Project</h3>
              <button 
                onClick={() => setEditingProject(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            
            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                  <input
                    type="text"
                    name="name"
                    defaultValue={editingProject.name}
                    required
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                  <select
                    name="type"
                    defaultValue={editingProject.type}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="portrait">Portrait</option>
                    <option value="wedding">Wedding</option>
                    <option value="event">Event</option>
                    <option value="commercial">Commercial</option>
                    <option value="real-estate">Real Estate</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  defaultValue={editingProject.description || ''}
                  rows={3}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    defaultValue={editingProject.status}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="scheduled">Scheduled</option>
                    <option value="in-progress">In Progress</option>
                    <option value="review">Review</option>
                    <option value="completed">Completed</option>
                    <option value="delivered">Delivered</option>
                    <option value="archived">Archived</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Payment Status</label>
                  <select
                    name="payment_status"
                    defaultValue={editingProject.payment_status}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="pending">Pending</option>
                    <option value="partial">Partial</option>
                    <option value="paid">Paid</option>
                    <option value="refunded">Refunded</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Session Date</label>
                  <input
                    type="date"
                    name="session_date"
                    defaultValue={editingProject.session_date ? new Date(editingProject.session_date).toISOString().split('T')[0] : ''}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                  <input
                    type="date"
                    name="due_date"
                    defaultValue={editingProject.due_date ? new Date(editingProject.due_date).toISOString().split('T')[0] : ''}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Package Name</label>
                <input
                  type="text"
                  name="package_name"
                  defaultValue={editingProject.package_name || ''}
                  className="w-full border rounded-lg px-3 py-2 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Total Amount ($)</label>
                  <input
                    type="number"
                    name="total_amount_cents"
                    step="0.01"
                    defaultValue={editingProject.total_amount_cents ? (editingProject.total_amount_cents / 100).toFixed(2) : ''}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Paid Amount ($)</label>
                  <input
                    type="number"
                    name="paid_amount_cents"
                    step="0.01"
                    defaultValue={editingProject.paid_amount_cents ? (editingProject.paid_amount_cents / 100).toFixed(2) : ''}
                    className="w-full border rounded-lg px-3 py-2 text-sm"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4 border-t mt-4">
                <button
                  type="button"
                  onClick={handleDelete}
                  className="px-4 py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition text-sm font-medium mr-auto"
                >
                  Delete Project
                </button>
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 border rounded-lg hover:bg-gray-50 transition text-sm font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition text-sm font-medium disabled:opacity-50"
                >
                  {isSaving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  )
}
