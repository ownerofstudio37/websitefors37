'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, Save, Loader2 } from 'lucide-react'

interface Workflow {
  id: string
  name: string
  description: string
  project_type: string
  estimated_duration_days: number
}

interface Lead {
  id: string
  name: string
  email: string
  phone: string
  service_interest: string
}

export default function NewProjectPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [workflows, setWorkflows] = useState<Workflow[]>([])
  const [leads, setLeads] = useState<Lead[]>([])
  const [formData, setFormData] = useState({
    project_name: '',
    project_type: 'wedding',
    client_name: '',
    client_email: '',
    client_phone: '',
    start_date: '',
    target_completion_date: '',
    workflow_id: '',
    lead_id: '',
    status: 'planning',
    priority: 'normal',
    description: '',
    session_date: ''
  })
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    fetchWorkflows()
    fetchLeads()
  }, [])

  useEffect(() => {
    // Auto-calculate target completion date when start date and workflow are selected
    if (formData.start_date && formData.workflow_id) {
      const workflow = workflows.find(w => w.id === formData.workflow_id)
      if (workflow && workflow.estimated_duration_days) {
        const startDate = new Date(formData.start_date)
        const targetDate = new Date(startDate)
        targetDate.setDate(targetDate.getDate() + workflow.estimated_duration_days)
        setFormData(prev => ({
          ...prev,
          target_completion_date: targetDate.toISOString().split('T')[0]
        }))
      }
    }
  }, [formData.start_date, formData.workflow_id, workflows])

  async function fetchWorkflows() {
    try {
      // For now, we'll use the project type to filter workflows
      // In a full implementation, this would be an API call
      const mockWorkflows: Workflow[] = [
        {
          id: 'wedding-1',
          name: 'Wedding Photography Standard',
          description: 'Standard workflow for wedding photography projects',
          project_type: 'wedding',
          estimated_duration_days: 45
        },
        {
          id: 'portrait-1',
          name: 'Portrait Session Standard',
          description: 'Standard workflow for portrait photography sessions',
          project_type: 'portrait',
          estimated_duration_days: 10
        },
        {
          id: 'event-1',
          name: 'Event Coverage Standard',
          description: 'Standard workflow for event photography',
          project_type: 'event',
          estimated_duration_days: 14
        },
        {
          id: 'commercial-1',
          name: 'Commercial Project Standard',
          description: 'Standard workflow for commercial photography projects',
          project_type: 'commercial',
          estimated_duration_days: 30
        }
      ]
      setWorkflows(mockWorkflows)
      
      // Auto-select first workflow if available
      if (mockWorkflows.length > 0) {
        setFormData(prev => ({ ...prev, workflow_id: mockWorkflows[0].id }))
      }
    } catch (error) {
      console.error('Failed to fetch workflows:', error)
    }
  }

  async function fetchLeads() {
    try {
      const res = await fetch('/api/leads?limit=100')
      const data = await res.json()
      if (res.ok && data.leads) {
        setLeads(data.leads)
      }
    } catch (error) {
      console.error('Failed to fetch leads:', error)
    }
  }

  function handleLeadSelect(leadId: string) {
    const lead = leads.find(l => l.id === leadId)
    if (lead) {
      setFormData(prev => ({
        ...prev,
        lead_id: leadId,
        client_name: lead.name,
        client_email: lead.email,
        client_phone: lead.phone || '',
        project_name: `${lead.name} - ${lead.service_interest || prev.project_type}`,
        project_type: lead.service_interest?.toLowerCase() || prev.project_type
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        lead_id: '',
        client_name: '',
        client_email: '',
        client_phone: '',
        project_name: ''
      }))
    }
  }

  function validateForm() {
    const newErrors: Record<string, string> = {}

    if (!formData.project_name.trim()) {
      newErrors.project_name = 'Project name is required'
    }
    if (!formData.client_name.trim()) {
      newErrors.client_name = 'Client name is required'
    }
    if (!formData.client_email.trim()) {
      newErrors.client_email = 'Client email is required'
    }
    if (!formData.start_date) {
      newErrors.start_date = 'Start date is required'
    }
    if (!formData.target_completion_date) {
      newErrors.target_completion_date = 'Target completion date is required'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/projects', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      const data = await res.json()

      if (res.ok) {
        router.push(`/admin/projects/${data.project.id}`)
      } else {
        alert(`Error: ${data.error || 'Failed to create project'}`)
      }
    } catch (error) {
      console.error('Failed to create project:', error)
      alert('Failed to create project. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const filteredWorkflows = workflows.filter(w => w.project_type === formData.project_type)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-4xl mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/projects"
            className="p-2 hover:bg-white rounded-lg transition-colors"
          >
            <ArrowLeft className="text-slate-600" size={24} />
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Create New Project</h1>
            <p className="text-slate-600 mt-1">Set up a new photography project</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Link to Lead (Optional) */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Convert from Lead (Optional)</h2>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Select Existing Lead
              </label>
              <select
                value={formData.lead_id}
                onChange={(e) => handleLeadSelect(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b46e14] focus:border-transparent"
              >
                <option value="">-- Create from scratch --</option>
                {leads.map(lead => (
                  <option key={lead.id} value={lead.id}>
                    {lead.name} ({lead.email})
                  </option>
                ))}
              </select>
              <p className="text-sm text-slate-500 mt-1">
                Selecting a lead will pre-fill client information
              </p>
            </div>
          </div>

          {/* Project Details */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Project Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Project Name *
                </label>
                <input
                  type="text"
                  value={formData.project_name}
                  onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#b46e14] focus:border-transparent ${
                    errors.project_name ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="e.g., Smith Wedding 2025"
                />
                {errors.project_name && (
                  <p className="text-sm text-red-600 mt-1">{errors.project_name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Project Type *
                </label>
                <select
                  value={formData.project_type}
                  onChange={(e) => setFormData({ ...formData, project_type: e.target.value, workflow_id: '' })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b46e14] focus:border-transparent"
                >
                  <option value="wedding">Wedding</option>
                  <option value="portrait">Portrait</option>
                  <option value="event">Event</option>
                  <option value="commercial">Commercial</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Workflow Template *
                </label>
                <select
                  value={formData.workflow_id}
                  onChange={(e) => setFormData({ ...formData, workflow_id: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b46e14] focus:border-transparent"
                >
                  {filteredWorkflows.map(workflow => (
                    <option key={workflow.id} value={workflow.id}>
                      {workflow.name} ({workflow.estimated_duration_days} days)
                    </option>
                  ))}
                </select>
                <p className="text-sm text-slate-500 mt-1">
                  Pre-configured phases and tasks
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Status
                </label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b46e14] focus:border-transparent"
                >
                  <option value="planning">Planning</option>
                  <option value="scheduled">Scheduled</option>
                  <option value="pre-production">Pre-Production</option>
                  <option value="in-progress">In Progress</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Priority
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b46e14] focus:border-transparent"
                >
                  <option value="low">Low</option>
                  <option value="normal">Normal</option>
                  <option value="high">High</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b46e14] focus:border-transparent"
                  placeholder="Project description, special requirements, notes..."
                />
              </div>
            </div>
          </div>

          {/* Client Information */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Client Information</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Client Name *
                </label>
                <input
                  type="text"
                  value={formData.client_name}
                  onChange={(e) => setFormData({ ...formData, client_name: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#b46e14] focus:border-transparent ${
                    errors.client_name ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="John Smith"
                />
                {errors.client_name && (
                  <p className="text-sm text-red-600 mt-1">{errors.client_name}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Client Email *
                </label>
                <input
                  type="email"
                  value={formData.client_email}
                  onChange={(e) => setFormData({ ...formData, client_email: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#b46e14] focus:border-transparent ${
                    errors.client_email ? 'border-red-500' : 'border-slate-300'
                  }`}
                  placeholder="john@example.com"
                />
                {errors.client_email && (
                  <p className="text-sm text-red-600 mt-1">{errors.client_email}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Client Phone
                </label>
                <input
                  type="tel"
                  value={formData.client_phone}
                  onChange={(e) => setFormData({ ...formData, client_phone: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b46e14] focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-lg shadow-sm p-6 border border-slate-200">
            <h2 className="text-lg font-semibold text-slate-900 mb-4">Timeline</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Start Date *
                </label>
                <input
                  type="date"
                  value={formData.start_date}
                  onChange={(e) => setFormData({ ...formData, start_date: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#b46e14] focus:border-transparent ${
                    errors.start_date ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                {errors.start_date && (
                  <p className="text-sm text-red-600 mt-1">{errors.start_date}</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Target Completion Date *
                </label>
                <input
                  type="date"
                  value={formData.target_completion_date}
                  onChange={(e) => setFormData({ ...formData, target_completion_date: e.target.value })}
                  className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#b46e14] focus:border-transparent ${
                    errors.target_completion_date ? 'border-red-500' : 'border-slate-300'
                  }`}
                />
                {errors.target_completion_date && (
                  <p className="text-sm text-red-600 mt-1">{errors.target_completion_date}</p>
                )}
                <p className="text-sm text-slate-500 mt-1">
                  Auto-calculated based on workflow duration
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Session Date (Optional)
                </label>
                <input
                  type="datetime-local"
                  value={formData.session_date}
                  onChange={(e) => setFormData({ ...formData, session_date: e.target.value })}
                  className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-[#b46e14] focus:border-transparent"
                />
                <p className="text-sm text-slate-500 mt-1">
                  Scheduled photo session date and time
                </p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-4">
            <Link
              href="/admin/projects"
              className="px-6 py-2 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={loading}
              className="flex items-center gap-2 px-6 py-2 bg-[#b46e14] text-white rounded-lg hover:bg-[#a17a07] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin" size={20} />
                  Creating...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Create Project
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
