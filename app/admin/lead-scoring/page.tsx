'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Mail, MessageSquare, Check, AlertCircle, Loader2, ChevronRight } from 'lucide-react'
import toast from 'react-hot-toast'

interface Lead {
  id: string
  name: string
  email: string
  phone?: string
  status: string
  source?: string
  lead_score: number
  score_details?: Record<string, number>
  budget_range?: string
  service_interest?: string
  event_date?: string
  created_at: string
  last_activity_at?: string
  next_action?: string
  priority?: 'hot' | 'warm' | 'cold'
}

interface ScoreRanges {
  hot: number
  warm: number
  cold: number
}

export default function LeadScoringPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [scoreRanges, setScoreRanges] = useState<ScoreRanges>({ hot: 0, warm: 0, cold: 0 })
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [recalculating, setRecalculating] = useState(false)
  const [selectedLeads, setSelectedLeads] = useState<Set<string>>(new Set())
  const [bulkActionLoading, setBulkActionLoading] = useState(false)
  const [showNextActionDetails, setShowNextActionDetails] = useState<string | null>(null)
  
  // Filters
  const [statusFilter, setStatusFilter] = useState('all')
  const [minScoreFilter, setMinScoreFilter] = useState(0)
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [sortBy, setSortBy] = useState('lead_score')
  const [sortOrder, setSortOrder] = useState('desc')

  const fetchLeads = async () => {
    setLoading(true)
    try {
      const params = new URLSearchParams({
        status: statusFilter,
        minScore: minScoreFilter.toString(),
        priority: priorityFilter,
        sortBy,
        sortOrder
      })
      
      const res = await fetch(`/api/admin/leads-scored?${params}`)
      if (!res.ok) throw new Error(`API ${res.status}`)
      const data = await res.json()
      
      if (data.success) {
        setLeads(data.leads || [])
        setScoreRanges(data.scoreRanges || { hot: 0, warm: 0, cold: 0 })
        setError(null)
      } else {
        throw new Error(data.error || 'Failed to load')
      }
    } catch (e: any) {
      setError(e?.message || 'Failed to load leads')
    } finally {
      setLoading(false)
    }
  }

  const handleBulkEmail = async () => {
    if (selectedLeads.size === 0) {
      toast.error('Please select at least one lead')
      return
    }

    setBulkActionLoading(true)
    try {
      const leadIds = Array.from(selectedLeads)
      const res = await fetch('/api/marketing/email/compose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadIds,
          template: 'lead-follow-up'
        })
      })

      const data = await res.json()
      if (res.ok) {
        toast.success(`Email compose opened for ${selectedLeads.size} leads`)
        setSelectedLeads(new Set())
        // Navigate to leads page with compose modal
        window.location.href = `/admin/leads?bulkEmail=${leadIds.join(',')}`
      } else {
        toast.error(data.error || 'Failed to prepare emails')
      }
    } catch (e: any) {
      toast.error('Error preparing bulk email')
    } finally {
      setBulkActionLoading(false)
    }
  }

  const handleBulkSMS = async () => {
    if (selectedLeads.size === 0) {
      toast.error('Please select at least one lead')
      return
    }

    setBulkActionLoading(true)
    try {
      const leadIds = Array.from(selectedLeads)
      const res = await fetch('/api/marketing/sms/compose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadIds,
          template: 'lead-follow-up'
        })
      })

      const data = await res.json()
      if (res.ok) {
        toast.success(`SMS compose opened for ${selectedLeads.size} leads`)
        setSelectedLeads(new Set())
        window.location.href = `/admin/leads?bulkSMS=${leadIds.join(',')}`
      } else {
        toast.error(data.error || 'Failed to prepare SMS')
      }
    } catch (e: any) {
      toast.error('Error preparing bulk SMS')
    } finally {
      setBulkActionLoading(false)
    }
  }

  const handleRecalculate = async () => {
    setRecalculating(true)
    try {
      const res = await fetch('/api/admin/leads-scored', { method: 'POST' })
      const data = await res.json()
      if (data.success) {
        alert(`Successfully recalculated ${data.count} lead scores!`)
        fetchLeads()
      }
    } catch (e: any) {
      alert('Failed to recalculate scores: ' + e.message)
    } finally {
      setRecalculating(false)
    }
  }

  useEffect(() => {
    fetchLeads()
  }, [statusFilter, minScoreFilter, priorityFilter, sortBy, sortOrder])

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-red-600 bg-red-50'
    if (score >= 40) return 'text-orange-600 bg-orange-50'
    return 'text-blue-600 bg-blue-50'
  }

  const getScoreLabel = (score: number) => {
    if (score >= 70) return '🔥 Hot'
    if (score >= 40) return '☀️ Warm'
    return '❄️ Cold'
  }

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return 'N/A'
    return new Date(dateStr).toLocaleDateString()
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div>
            <Link href="/admin" className="text-blue-600 hover:underline text-sm">← Back to Admin</Link>
            <h1 className="text-2xl font-bold text-gray-900 mt-1">Lead Scoring Dashboard</h1>
          </div>
          <button
            onClick={handleRecalculate}
            disabled={recalculating}
            className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition text-sm font-medium"
          >
            {recalculating ? 'Recalculating...' : '🔄 Recalculate All Scores'}
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Score Distribution Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gradient-to-br from-red-500 to-red-600 text-white rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition" onClick={() => setPriorityFilter(priorityFilter === 'hot' ? 'all' : 'hot')}>
            <div className="text-3xl mb-2">🔥</div>
            <div className="text-4xl font-bold">{scoreRanges.hot}</div>
            <div className="text-red-100 text-sm mt-1">Hot Leads (70+)</div>
            <div className="text-xs text-red-50 mt-2">Click to filter</div>
          </div>
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition" onClick={() => setPriorityFilter(priorityFilter === 'warm' ? 'all' : 'warm')}>
            <div className="text-3xl mb-2">☀️</div>
            <div className="text-4xl font-bold">{scoreRanges.warm}</div>
            <div className="text-orange-100 text-sm mt-1">Warm Leads (40-69)</div>
            <div className="text-xs text-orange-50 mt-2">Click to filter</div>
          </div>
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-xl p-6 shadow-lg cursor-pointer hover:shadow-xl transition" onClick={() => setPriorityFilter(priorityFilter === 'cold' ? 'all' : 'cold')}>
            <div className="text-3xl mb-2">❄️</div>
            <div className="text-4xl font-bold">{scoreRanges.cold}</div>
            <div className="text-blue-100 text-sm mt-1">Cold Leads (0-39)</div>
            <div className="text-xs text-blue-50 mt-2">Click to filter</div>
          </div>
        </div>

        {/* Bulk Actions Bar */}
        {selectedLeads.size > 0 && (
          <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Check className="w-5 h-5 text-indigo-600" />
              <span className="font-medium text-indigo-900">{selectedLeads.size} lead{selectedLeads.size > 1 ? 's' : ''} selected</span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleBulkEmail}
                disabled={bulkActionLoading}
                className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 text-sm font-medium transition"
              >
                {bulkActionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Mail className="w-4 h-4" />}
                Email
              </button>
              <button
                onClick={handleBulkSMS}
                disabled={bulkActionLoading}
                className="inline-flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 text-sm font-medium transition"
              >
                {bulkActionLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <MessageSquare className="w-4 h-4" />}
                SMS
              </button>
              <button
                onClick={() => setSelectedLeads(new Set())}
                className="px-3 py-2 text-indigo-700 hover:bg-indigo-100 rounded-lg text-sm font-medium transition"
              >
                Clear
              </button>
            </div>
          </div>
        )}

        {/* Filters */}
        <div className="bg-white rounded-lg border p-4 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              >
                <option value="all">All Statuses</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="qualified">Qualified</option>
                <option value="converted">Converted</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              >
                <option value="all">All Priorities</option>
                <option value="hot">🔥 Hot</option>
                <option value="warm">☀️ Warm</option>
                <option value="cold">❄️ Cold</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Min Score</label>
              <input
                type="number"
                value={minScoreFilter}
                onChange={(e) => setMinScoreFilter(parseInt(e.target.value) || 0)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
                min="0"
                max="100"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              >
                <option value="lead_score">Lead Score</option>
                <option value="created_at">Created Date</option>
                <option value="last_activity_at">Last Activity</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="w-full border rounded-lg px-3 py-2 text-sm"
              >
                <option value="desc">Descending</option>
                <option value="asc">Ascending</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading leads...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-4 rounded-lg">
            Error loading leads: {error}
          </div>
        )}

        {/* Leads Table */}
        {!loading && !error && (
          <div className="bg-white rounded-lg border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase w-8">
                      <input
                        type="checkbox"
                        checked={selectedLeads.size === leads.length && leads.length > 0}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedLeads(new Set(leads.map(l => l.id)))
                          } else {
                            setSelectedLeads(new Set())
                          }
                        }}
                        className="w-4 h-4 cursor-pointer"
                      />
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Score</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Name</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Email</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Source</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Service</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Next Action</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-3">
                        <input
                          type="checkbox"
                          checked={selectedLeads.has(lead.id)}
                          onChange={(e) => {
                            const newSet = new Set(selectedLeads)
                            if (e.target.checked) {
                              newSet.add(lead.id)
                            } else {
                              newSet.delete(lead.id)
                            }
                            setSelectedLeads(newSet)
                          }}
                          className="w-4 h-4 cursor-pointer"
                        />
                      </td>
                      <td className="px-4 py-3">
                        <div className={`inline-flex flex-col items-start gap-1`}>
                          <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full font-bold text-sm ${getScoreColor(lead.lead_score)}`}>
                            <span>{lead.lead_score}</span>
                            <span className="text-xs">{getScoreLabel(lead.lead_score).split(' ')[0]}</span>
                          </div>
                          <div className="w-24 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className={`h-full transition-all ${lead.lead_score >= 70 ? 'bg-red-500' : lead.lead_score >= 40 ? 'bg-orange-500' : 'bg-blue-500'}`}
                              style={{ width: `${Math.min(lead.lead_score, 100)}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <Link href={`/admin/leads?id=${lead.id}`} className="font-medium text-gray-900 hover:text-indigo-600">
                          {lead.name}
                        </Link>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{lead.email}</td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{lead.source || 'N/A'}</td>
                      <td className="px-4 py-3 text-sm text-gray-600">{lead.service_interest || 'N/A'}</td>
                      <td className="px-4 py-3 text-sm">
                        {lead.next_action ? (
                          <button
                            onClick={() => setShowNextActionDetails(showNextActionDetails === lead.id ? null : lead.id)}
                            className="text-indigo-600 hover:text-indigo-800 font-medium inline-flex items-center gap-1 group"
                          >
                            {lead.next_action}
                            <ChevronRight className={`w-4 h-4 transition-transform ${showNextActionDetails === lead.id ? 'rotate-90' : ''}`} />
                          </button>
                        ) : (
                          <span className="text-gray-400">—</span>
                        )}
                        {showNextActionDetails === lead.id && (
                          <div className="mt-2 p-2 bg-indigo-50 rounded text-xs text-indigo-700 border border-indigo-200">
                            AI-recommended next step. Use bulk email/SMS to take action.
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">{formatDate(lead.created_at)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {leads.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No leads found matching your filters.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
