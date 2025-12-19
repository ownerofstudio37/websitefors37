'use client'

import React, { useState, useEffect, useCallback } from 'react'
import { Loader2, Mail, Phone, MessageCircle, Edit, Settings, Calendar, DollarSign, MessageSquare, X, Plus, PhoneCall, Trash2, ChevronLeft, ChevronRight, Upload } from 'lucide-react'
import { CheckCircle } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Lead, CommunicationLog } from '@/lib/supabase'
import MarkdownEditor from '@/components/MarkdownEditor'
import EmailBuilder, { EmailBlock, renderEmailHtml } from '@/components/EmailBuilder'
import ContactImporter from '@/components/admin/ContactImporter'

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [filter, setFilter] = useState('all')
  const [q, setQ] = useState('')
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [showLeadModal, setShowLeadModal] = useState(false)
  const [showNotesModal, setShowNotesModal] = useState(false)
  const [notes, setNotes] = useState('')
  const [isDeleting, setIsDeleting] = useState<string | null>(null)
  const [showLogModal, setShowLogModal] = useState(false)
  const [logs, setLogs] = useState<CommunicationLog[]>([])
  const [newLog, setNewLog] = useState({
    type: 'note' as CommunicationLog['type'],
    subject: '',
    content: '',
    direction: 'outbound' as CommunicationLog['direction']
  })
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [showImportModal, setShowImportModal] = useState(false)
  const [creating, setCreating] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const [createError, setCreateError] = useState<string | null>(null)
  const [showReminderModal, setShowReminderModal] = useState(false)
  const [reminderType, setReminderType] = useState<'reminder' | 'confirmation'>('reminder')
  const [reminderData, setReminderData] = useState({
    sessionDate: '',
    sessionTime: '',
    sessionType: '',
    location: '',
    notes: ''
  })
  const [sendingReminder, setSendingReminder] = useState(false)
  // Compose email modal state
  const [showComposeModal, setShowComposeModal] = useState(false)
  const [composeRecipient, setComposeRecipient] = useState('')
  const [composeSubject, setComposeSubject] = useState('')
  const [composeHtml, setComposeHtml] = useState('')
  const [composeBlocks, setComposeBlocks] = useState<EmailBlock[]>([])
  const [editorMode, setEditorMode] = useState<'simple' | 'visual'>('simple')
  const [composeSending, setComposeSending] = useState(false)
  const [composeResult, setComposeResult] = useState<string | null>(null)

  type NewLeadForm = {
    name: string
    email: string
    phone?: string
    service_interest: string
    budget_range?: string
    event_date?: string
    message: string
    source?: string
  }
  const [newLead, setNewLead] = useState<NewLeadForm>({
    name: '',
    email: '',
    phone: '',
    service_interest: '',
    budget_range: '',
    event_date: '',
    message: '',
    source: 'admin-manual',
  })
  
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1)
  const [totalCount, setTotalCount] = useState(0)
  const [pageCount, setPageCount] = useState(0)
  const itemsPerPage = 20

  const fetchLeads = useCallback(async () => {
    try {
      setError(null)
      setLoading(true)
      
      // Build query
      let query = supabase
        .from('leads')
        .select('*', { count: 'exact' })
        .order('created_at', { ascending: false })
      
      // Apply status filter
      if (filter !== 'all') {
        query = query.eq('status', filter)
      }
      // Apply search filter
      const trimmed = q.trim()
      if (trimmed) {
        // Search name, email, phone, message, notes
        // Using ilike with or() across columns
        const pattern = `%${trimmed}%`
        query = query.or(
          `name.ilike.${pattern},email.ilike.${pattern},phone.ilike.${pattern},message.ilike.${pattern},notes.ilike.${pattern}`
        )
      }
      
      // Apply pagination
      const from = (currentPage - 1) * itemsPerPage
      const to = from + itemsPerPage - 1
      query = query.range(from, to)
      
      const { data, error: fetchError, count } = await query
      
      if (fetchError) {
        console.error('Supabase error:', fetchError)
        throw fetchError
      }
      
      setLeads(data || [])
      setTotalCount(count || 0)
      setPageCount(Math.ceil((count || 0) / itemsPerPage))
      
      console.log('Fetched leads:', { data, count, filter, q })
    } catch (error: any) {
      console.error('Error fetching leads:', error)
      setError(error.message || 'Failed to load leads')
    } finally {
      setLoading(false)
    }
  }, [currentPage, filter, q])

  useEffect(() => {
    fetchLeads()
  }, [fetchLeads])

  // Reset to first page when filter changes
  useEffect(() => {
    setCurrentPage(1)
  }, [filter, q])

  const handleCreateLead = async () => {
    setCreateError(null)
    // Basic client-side validation to match API schema
    if (!newLead.name.trim() || newLead.name.trim().length < 2) {
      setCreateError('Please provide a valid name (min 2 characters).')
      return
    }
    if (!newLead.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newLead.email)) {
      setCreateError('Please provide a valid email address.')
      return
    }
    if (!newLead.service_interest.trim()) {
      setCreateError('Please provide the service interest.')
      return
    }
    if (!newLead.message.trim() || newLead.message.trim().length < 10) {
      setCreateError('Please provide a short message (min 10 characters).')
      return
    }

    setCreating(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newLead.name.trim(),
          email: newLead.email.trim(),
          phone: newLead.phone?.trim() || undefined,
          service_interest: newLead.service_interest.trim(),
          budget_range: newLead.budget_range?.trim() || undefined,
          event_date: newLead.event_date || undefined,
          message: newLead.message.trim(),
          source: newLead.source || 'admin-manual',
        })
      })

      if (!res.ok) {
        const j = await res.json().catch(() => ({}))
        throw new Error(j.error || 'Failed to create lead')
      }

      // Refresh list, close modal, show toast
      await fetchLeads()
      setShowCreateModal(false)
      setNewLead({
        name: '', email: '', phone: '', service_interest: '', budget_range: '', event_date: '', message: '', source: 'admin-manual'
      })
      setToast('Lead created successfully')
      setTimeout(() => setToast(null), 3000)
    } catch (e: any) {
      console.error('Create lead failed:', e)
      setCreateError(e.message || 'Failed to create lead')
    } finally {
      setCreating(false)
    }
  }

  const sendBookingReminder = async () => {
    if (!selectedLead || !reminderData.sessionDate || !reminderData.sessionTime) {
      alert('Please fill in session date and time')
      return
    }

    setSendingReminder(true)
    try {
      const response = await fetch('/api/booking/send-reminder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          leadId: selectedLead.id,
          type: reminderType,
          sessionDate: reminderData.sessionDate,
          sessionTime: reminderData.sessionTime,
          sessionType: reminderData.sessionType,
          location: reminderData.location,
          notes: reminderData.notes,
          email: selectedLead.email,
          phone: selectedLead.phone,
          name: selectedLead.name
        })
      })

      const result = await response.json()
      
      if (result.success) {
        setToast(`${reminderType === 'reminder' ? 'Reminder' : 'Confirmation'} sent successfully!`)
        setShowReminderModal(false)
        setReminderData({ sessionDate: '', sessionTime: '', sessionType: '', location: '', notes: '' })
        
        // Log the communication
        await logCommunication(
          selectedLead,
          'email',
          `Sent booking ${reminderType} for ${reminderData.sessionDate} at ${reminderData.sessionTime}`
        )
      } else {
        throw new Error(result.error || 'Failed to send reminder')
      }
    } catch (error: any) {
      console.error('Send reminder error:', error)
      alert(error.message || 'Failed to send reminder')
    } finally {
      setSendingReminder(false)
    }
  }

  const updateLeadStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase
        .from('leads')
        .update({ status })
        .eq('id', id)

      if (error) throw error
      
      // Update local state
      setLeads(prev => prev.map(lead => 
        lead.id === id ? { ...lead, status: status as Lead['status'] } : lead
      ))
    } catch (error) {
      console.error('Error updating lead:', error)
      alert('Failed to update lead status')
    }
  }

  const deleteLead = async (id: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) return
    
    setIsDeleting(id)
    try {
      const { error } = await supabase
        .from('leads')
        .delete()
        .eq('id', id)

      if (error) throw error
      
      setLeads(prev => prev.filter(lead => lead.id !== id))
      setShowLeadModal(false)
      // Refresh to update counts
      fetchLeads()
    } catch (error) {
      console.error('Error deleting lead:', error)
      alert('Failed to delete lead')
    } finally {
      setIsDeleting(null)
    }
  }

  const updateLeadNotes = async () => {
    if (!selectedLead) return
    
    try {
      const { error } = await supabase
        .from('leads')
        .update({ notes })
        .eq('id', selectedLead.id)

      if (error) throw error
      
      setLeads(prev => prev.map(lead => 
        lead.id === selectedLead.id ? { ...lead, notes } : lead
      ))
      setSelectedLead({ ...selectedLead, notes })
      setShowNotesModal(false)
      setNotes('')
    } catch (error) {
      console.error('Error updating notes:', error)
      alert('Failed to update notes')
    }
  }

  const fetchCommunicationLogs = async (leadId: string) => {
    try {
      const { data, error } = await supabase
        .from('communication_logs')
        .select('*')
        .eq('lead_id', leadId)
        .order('created_at', { ascending: false })

      if (error) throw error
      setLogs(data || [])
    } catch (error) {
      console.error('Error fetching logs:', error)
    }
  }

  const addCommunicationLog = async () => {
    if (!selectedLead || !newLog.content.trim()) return

    try {
      const { error } = await supabase
        .from('communication_logs')
        .insert([{
          lead_id: selectedLead.id,
          type: newLog.type,
          subject: newLog.subject,
          content: newLog.content,
          direction: newLog.direction,
          created_by: 'admin'
        }])

      if (error) throw error

      // Refresh logs
      await fetchCommunicationLogs(selectedLead.id)
      
      // Reset form
      setNewLog({
        type: 'note',
        subject: '',
        content: '',
        direction: 'outbound'
      })
      setShowLogModal(false)

      // Update lead status if it's new
      if (selectedLead.status === 'new') {
        await updateLeadStatus(selectedLead.id, 'contacted')
      }
    } catch (error) {
      console.error('Error adding log:', error)
      alert('Failed to add communication log')
    }
  }

  const logCommunication = async (lead: Lead, type: CommunicationLog['type'], content: string) => {
    try {
      await supabase
        .from('communication_logs')
        .insert([{
          lead_id: lead.id,
          type,
          content,
          direction: 'outbound',
          created_by: 'admin'
        }])

      if (lead.status === 'new') {
        await updateLeadStatus(lead.id, 'contacted')
      }
    } catch (error) {
      console.error('Error logging communication:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-800'
      case 'contacted': return 'bg-yellow-100 text-yellow-800'
      case 'qualified': return 'bg-green-100 text-green-800'
      case 'converted': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const viewLeadDetails = async (lead: Lead) => {
    setSelectedLead(lead)
    setShowLeadModal(true)
    await fetchCommunicationLogs(lead.id)
  }

  const openComposeModal = (lead: Lead) => {
    setComposeRecipient(lead.email || '')
    setComposeSubject(`Hello ${lead.name || ''} — Quick note from Studio37`)
    // Initialize with Markdown instead of HTML
    setComposeHtml(`Hi ${lead.name || ''},

Thanks for reaching out — I wanted to follow up about your ${lead.service_interest || 'inquiry'}.

Best,
Studio37`)
    setComposeBlocks([
      { id: '1', type: 'hero', content: { title: 'Hello!', subtitle: `Hi ${lead.name || 'there'}, thanks for reaching out.`, buttonText: 'View Proposal', backgroundColor: '#f3f4f6' } },
      { id: '2', type: 'text', content: { text: `We received your inquiry about ${lead.service_interest || 'our services'}. We'd love to chat more.` } },
      { id: '3', type: 'button', content: { text: 'Book a Call', url: 'https://studio37.cc/book', backgroundColor: '#000000', textColor: '#ffffff' } }
    ])
    setEditorMode('simple')
    setComposeResult(null)
    setShowComposeModal(true)
  }

  const sendComposeEmail = async (lead?: Lead) => {
    if (!composeRecipient.trim()) {
      setComposeResult('Recipient email is required')
      return
    }
    setComposeSending(true)
    setComposeResult(null)
    try {
      let htmlContent = ''

      if (editorMode === 'visual') {
        htmlContent = renderEmailHtml(composeBlocks)
      } else {
        // Simple Markdown to HTML conversion
        htmlContent = composeHtml
          // Escape HTML characters first to prevent XSS if we were rendering user content, 
          // but here we are the admin authoring it. Still good practice.
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;')
          // Bold
          .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
          // Italic
          .replace(/\*(.*?)\*/g, '<em>$1</em>')
          // Links
          .replace(/\[(.*?)\]\((.*?)\)/g, '<a href="$2">$1</a>')
          // Convert newlines to paragraphs
          .split('\n')
          .map(line => line.trim() ? `<p>${line}</p>` : '<br/>')
          .join('')
      }

      const res = await fetch('/api/marketing/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          to: composeRecipient.split(',').map(s => s.trim()).filter(Boolean),
          subject: composeSubject || 'Message from Studio37',
          html: htmlContent,
          from: 'Studio37 <sales@studio37.cc>'
        })
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || JSON.stringify(data))

      setComposeResult('Sent successfully')
      // Log communication
      if (lead) {
        await logCommunication(lead, 'email', `Sent one-off email: ${composeSubject}`)
      }
      // Close modal after short delay
      setTimeout(() => {
        setShowComposeModal(false)
      }, 800)
    } catch (err: any) {
      console.error('Compose send failed', err)
      setComposeResult('Send failed: ' + (err?.message || String(err)))
    } finally {
      setComposeSending(false)
    }
  }

  const openNotesModal = (lead: Lead) => {
    setSelectedLead(lead)
    setNotes(lead.notes || '')
    setShowNotesModal(true)
  }

  const getLogIcon = (type: CommunicationLog['type']) => {
    switch (type) {
      case 'email': return <Mail className="h-4 w-4" />
      case 'phone': return <Phone className="h-4 w-4" />
      case 'sms': return <MessageCircle className="h-4 w-4" />
      case 'meeting': return <Calendar className="h-4 w-4" />
      case 'note': return <MessageSquare className="h-4 w-4" />
      default: return <Settings className="h-4 w-4" />
    }
  }

  const getLogColor = (type: CommunicationLog['type']) => {
    switch (type) {
      case 'email': return 'text-blue-600'
      case 'phone': return 'text-green-600'
      case 'sms': return 'text-purple-600'
      case 'meeting': return 'text-orange-600'
      case 'note': return 'text-gray-600'
      default: return 'text-gray-600'
    }
  }

  const filteredLeads = filter === 'all' 
    ? leads 
    : leads.filter(lead => lead.status === filter)

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl font-semibold">Lead Management</h1>
        <div className="flex flex-col md:flex-row md:items-center gap-2 w-full md:w-auto md:gap-2">
          <div className="relative w-full md:w-64">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name, email, phone..."
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label="Search leads"
            />
          </div>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            title="Filter leads by status"
          >
            <option value="all">All Leads</option>
            <option value="new">New</option>
            <option value="contacted">Contacted</option>
            <option value="qualified">Qualified</option>
            <option value="converted">Converted</option>
          </select>
          <button
            onClick={fetchLeads}
            className="px-3 py-2 border rounded-lg hover:bg-gray-50"
            title="Refresh leads"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <button
            onClick={() => setShowImportModal(true)}
            className="px-3 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 flex items-center gap-1"
            title="Import contacts"
          >
            <Upload className="h-4 w-4" />
            Import
          </button>
          <button
            onClick={() => { setShowCreateModal(true); setCreateError(null) }}
            className="px-3 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center gap-1"
            title="Add new lead"
          >
            <Plus className="h-4 w-4" />
            Add Lead
          </button>
        </div>
      </div>

      {toast && (
        <div className="mb-4 rounded-lg border border-green-200 bg-green-50 px-4 py-2 text-green-800">
          {toast}
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-xs font-medium text-gray-500">Total Leads</h3>
          <p className="text-xl font-bold mt-1">{totalCount}</p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-xs font-medium text-gray-500">New</h3>
          <p className="text-xl font-bold mt-1 text-blue-600">
            {leads.filter(l => l.status === 'new').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-xs font-medium text-gray-500">Qualified</h3>
          <p className="text-xl font-bold mt-1 text-green-600">
            {leads.filter(l => l.status === 'qualified').length}
          </p>
        </div>
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-xs font-medium text-gray-500">Converted</h3>
          <p className="text-xl font-bold mt-1 text-purple-600">
            {leads.filter(l => l.status === 'converted').length}
          </p>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
          <p className="font-semibold">Error loading leads:</p>
          <p>{error}</p>
          <button onClick={fetchLeads} className="text-red-600 underline mt-2">
            Try again
          </button>
        </div>
      )}

      {/* Leads Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
            <span className="ml-2">Loading leads...</span>
          </div>
        ) : leads.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No leads found{filter !== 'all' ? ` with status: ${filter}` : ''}.</p>
            {filter !== 'all' && (
              <button 
                onClick={() => setFilter('all')} 
                className="text-primary-600 underline mt-2"
              >
                Show all leads
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Contact
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Budget
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">
                          {lead.name}
                        </div>
                        <div className="text-sm text-gray-500">{lead.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {lead.service_interest}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {lead.budget_range || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <select
                        value={lead.status}
                        onChange={(e) => updateLeadStatus(lead.id, e.target.value)}
                        className={`text-xs px-2 py-1 rounded-full border-0 ${getStatusColor(lead.status)}`}
                        title={`Change status for ${lead.name}`}
                        aria-label={`Lead status for ${lead.name}`}
                      >
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="converted">Converted</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {new Date(lead.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => viewLeadDetails(lead)}
                          className="text-primary-600 hover:text-primary-900"
                          title="View details"
                        >
                          <Settings className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => openComposeModal(lead)}
                          className="text-white bg-primary-600 hover:bg-primary-700 px-2 py-1 rounded-md flex items-center"
                          title="Compose email"
                        >
                          <Mail className="h-4 w-4 mr-1" />
                          <span className="text-sm">Compose</span>
                        </button>
                        {lead.phone && (
                          <>
                            <a
                              href={`tel:${lead.phone}`}
                              className="text-green-600 hover:text-green-900"
                              title="Call"
                              onClick={() => logCommunication(lead, 'phone', 'Outbound phone call')}
                            >
                              <PhoneCall className="h-4 w-4" />
                            </a>
                            <a
                              href={`sms:${lead.phone}`}
                              className="text-purple-600 hover:text-purple-900"
                              title="Send text"
                              onClick={() => logCommunication(lead, 'sms', 'Sent text message')}
                            >
                              <MessageCircle className="h-4 w-4" />
                            </a>
                          </>
                        )}
                        <button
                          onClick={() => openNotesModal(lead)}
                          className="text-gray-600 hover:text-gray-900"
                          title="Add/edit notes"
                        >
                          <Edit className="h-4 w-4" />
                        </button>
                        <button
                          onClick={() => deleteLead(lead.id)}
                          className="text-red-600 hover:text-red-900"
                          title="Delete lead"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      
      {/* Lead Details Modal */}
      {showLeadModal && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Lead Details</h3>
              <button
                onClick={() => setShowLeadModal(false)}
                className="text-gray-400 hover:text-gray-500"
                aria-label="Close lead details modal"
                title="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Lead Information */}
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Name</label>
                    <p className="text-lg">{selectedLead.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-gray-500">Status</label>
                    <p><span className={`px-2 py-1 text-sm rounded-full ${getStatusColor(selectedLead.status)}`}>
                      {selectedLead.status}
                    </span></p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-start space-x-2">
                    <Mail className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <label className="text-sm font-medium text-gray-500">Email</label>
                      <p className="break-words">{selectedLead.email}</p>
                    </div>
                  </div>
                  {selectedLead.phone && (
                    <div className="flex items-start space-x-2">
                      <Phone className="h-4 w-4 text-gray-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <label className="text-sm font-medium text-gray-500">Phone</label>
                        <p className="break-words">{selectedLead.phone}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Service Interest</label>
                    <p className="capitalize">{selectedLead.service_interest}</p>
                  </div>
                  {selectedLead.budget_range && (
                    <div className="flex items-center space-x-2">
                      <DollarSign className="h-4 w-4 text-gray-400" />
                      <div>
                        <label className="text-sm font-medium text-gray-500">Budget</label>
                        <p>{selectedLead.budget_range}</p>
                      </div>
                    </div>
                  )}
                  {selectedLead.event_date && (
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <div>
                        <label className="text-sm font-medium text-gray-500">Event Date</label>
                        <p>{new Date(selectedLead.event_date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <MessageSquare className="h-4 w-4 text-gray-400" />
                    <label className="text-sm font-medium text-gray-500">Message</label>
                  </div>
                  <p className="bg-gray-50 p-3 rounded-lg">{selectedLead.message}</p>
                </div>

                <div>
                  <div className="flex items-center space-x-2 mb-2">
                    <Upload className="h-4 w-4 text-gray-400" />
                    <label className="text-sm font-medium text-gray-500">Files</label>
                  </div>
                  {/* File list */}
                  <div className="space-y-2">
                    {selectedLead.files && selectedLead.files.length > 0 ? (
                      selectedLead.files.map((file) => (
                        <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-2">
                            <PaperClip className="h-5 w-5 text-gray-400" />
                            <a 
                              href={file.url} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-sm font-medium text-gray-900 hover:underline"
                            >
                              {file.name}
                            </a>
                          </div>
                          <button
                            onClick={() => handleFileDelete(file.id)}
                            className="text-red-600 hover:text-red-900"
                            title="Delete file"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      ))
                    ) : (
                      <p className="text-gray-500 text-sm">No files uploaded</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Created</label>
                  <p>{new Date(selectedLead.created_at).toLocaleString()}</p>
                </div>

                {selectedLead.notes && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Notes</label>
                    <p className="bg-gray-50 p-3 rounded-lg">{selectedLead.notes}</p>
                  </div>
                )}
              </div>

              {/* Communication History */}
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <h4 className="text-lg font-semibold">Communication History</h4>
                  <button
                    onClick={() => setShowLogModal(true)}
                    className="px-3 py-1 bg-primary-600 text-white rounded-lg hover:bg-primary-700 text-sm flex items-center gap-1"
                  >
                    <Plus className="h-3 w-3" />
                    Add Log
                  </button>
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {logs.length === 0 ? (
                    <p className="text-gray-500 text-sm">No communication history yet</p>
                  ) : (
                    logs.map((log) => (
                      <div key={log.id} className="bg-gray-50 p-3 rounded-lg">
                        <div className="flex items-start gap-3">
                          <div className={`${getLogColor(log.type)} mt-1`}>
                            {getLogIcon(log.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-sm font-medium capitalize">
                                {log.type}
                              </span>
                              {log.direction && (
                                <span className="text-xs text-gray-500 capitalize">
                                  ({log.direction})
                                </span>
                              )}
                              <span className="text-xs text-gray-500">
                                {new Date(log.created_at).toLocaleString()}
                              </span>
                            </div>
                            {log.subject && (
                              <p className="text-sm font-medium mb-1">{log.subject}</p>
                            )}
                            <p className="text-sm text-gray-600 whitespace-pre-wrap">{log.content}</p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                onClick={() => deleteLead(selectedLead.id)}
                disabled={isDeleting === selectedLead.id}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50"
              >
                {isDeleting === selectedLead.id ? 'Deleting...' : 'Delete Lead'}
              </button>
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => setShowLeadModal(false)}
                  className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                >
                  Close
                </button>
                {selectedLead.phone && (
                  <a
                    href={`tel:${selectedLead.phone}`}
                    onClick={() => logCommunication(selectedLead, 'phone', 'Outbound phone call')}
                    className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                  >
                    Call
                  </a>
                )}
                <a
                  href={`mailto:${selectedLead.email}`}
                  onClick={() => logCommunication(selectedLead, 'email', 'Sent email')}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                >
                  Send Email
                </a>
                <button
                  onClick={() => {
                    setReminderType('reminder')
                    setShowReminderModal(true)
                  }}
                  className="px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4" />
                  Send Reminder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Notes Modal */}
      {showNotesModal && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Edit Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-48 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Add notes about this lead..."
            />
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowNotesModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={updateLeadNotes}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Save Notes
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Communication Log Modal */}
      {showLogModal && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-lg w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">Add Communication Log</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  value={newLog.type}
                  onChange={(e) => setNewLog({ ...newLog, type: e.target.value as CommunicationLog['type'] })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  aria-label="Select communication type"
                  title="Choose the type of communication log"
                >
                  <option value="note">Note</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone Call</option>
                  <option value="sms">Text Message</option>
                  <option value="meeting">Meeting</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Direction</label>
                <select
                  value={newLog.direction}
                  onChange={(e) => setNewLog({ ...newLog, direction: e.target.value as CommunicationLog['direction'] })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  aria-label="Select communication direction"
                  title="Choose the direction of communication"
                >
                  <option value="outbound">Outbound</option>
                  <option value="inbound">Inbound</option>
                  <option value="internal">Internal</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject (Optional)</label>
                <input
                  type="text"
                  value={newLog.subject}
                  onChange={(e) => setNewLog({ ...newLog, subject: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Brief subject or title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Details</label>
                <textarea
                  value={newLog.content}
                  onChange={(e) => setNewLog({ ...newLog, content: e.target.value })}
                  className="w-full h-32 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Describe the communication..."
                  required
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowLogModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={addCommunicationLog}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                disabled={!newLog.content.trim()}
              >
                Add Log
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Compose Email Modal */}
      {showComposeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className={`bg-white rounded-lg p-6 w-full mx-4 max-h-[90vh] overflow-y-auto ${editorMode === 'visual' ? 'max-w-6xl' : 'max-w-2xl'}`}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Compose Email</h3>
              <button
                onClick={() => setShowComposeModal(false)}
                className="text-gray-400 hover:text-gray-500"
                aria-label="Close compose modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
                <p className="text-sm text-gray-600">Studio37 &lt;sales@studio37.cc&gt;</p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
                <input
                  value={composeRecipient}
                  onChange={(e) => setComposeRecipient(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                <input
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <div className="flex justify-between items-center mb-2">
                  <label className="block text-sm font-medium text-gray-700">Message Body</label>
                  <div className="flex bg-gray-100 rounded-lg p-1">
                    <button
                      onClick={() => setEditorMode('simple')}
                      className={`px-3 py-1 text-xs rounded-md transition-colors ${editorMode === 'simple' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Simple
                    </button>
                    <button
                      onClick={() => setEditorMode('visual')}
                      className={`px-3 py-1 text-xs rounded-md transition-colors ${editorMode === 'visual' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Visual Builder
                    </button>
                  </div>
                </div>
                
                {editorMode === 'simple' ? (
                  <>
                    <MarkdownEditor
                      value={composeHtml}
                      onChange={setComposeHtml}
                      minHeight="300px"
                      placeholder="Write your email content here..."
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Supports Markdown formatting. Will be converted to HTML when sent.
                    </p>
                  </>
                ) : (
                  <EmailBuilder
                    initialBlocks={composeBlocks}
                    onChange={(html, blocks) => setComposeBlocks(blocks)}
                  />
                )}
              </div>

              {composeResult && (
                <div className="text-sm text-gray-700">{composeResult}</div>
              )}

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setShowComposeModal(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  onClick={() => sendComposeEmail(selectedLead || undefined)}
                  disabled={composeSending}
                  className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
                >
                  {composeSending ? 'Sending…' : 'Send Email'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Pagination controls */}
      {pageCount > 1 && (
        <div className="mt-6 flex items-center justify-between">
          <div className="text-sm text-gray-700">
            Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
            {Math.min(currentPage * itemsPerPage, totalCount)} of {totalCount} leads
          </div>
          <div className="flex space-x-2">
            <button
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              aria-label="Previous page"
              title="Go to previous page"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <div className="flex space-x-1">
              {Array.from({ length: pageCount }, (_, i) => i + 1)
                .filter(page => {
                  const distance = Math.abs(page - currentPage)
                  return distance === 0 || distance === 1 || page === 1 || page === pageCount
                })
                .map((page, index, array) => {
                  if (index > 0 && array[index] - array[index - 1] > 1) {
                    return (
                      <React.Fragment key={`ellipsis-${page}`}>
                        <span className="px-2 py-1">...</span>
                        <button
                          onClick={() => setCurrentPage(page)}
                          className={`px-3 py-1 border rounded-md ${
                            currentPage === page
                              ? 'bg-primary-600 text-white'
                              : 'hover:bg-gray-50'
                          }`}
                        >
                          {page}
                        </button>
                      </React.Fragment>
                    )
                  }
                  return (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 border rounded-md ${
                        currentPage === page
                          ? 'bg-primary-600 text-white'
                          : 'hover:bg-gray-50'
                      }`}
                    >
                      {page}
                    </button>
                  )
                })}
            </div>
            <button
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === pageCount}
              className="px-3 py-1 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
              aria-label="Next page"
              title="Go to next page"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* Create Lead Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Add New Lead</h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-gray-500"
                aria-label="Close create lead modal"
                title="Close modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {createError && (
              <div className="mb-3 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">
                {createError}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={newLead.name}
                  onChange={(e) => setNewLead({ ...newLead, name: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={newLead.email}
                  onChange={(e) => setNewLead({ ...newLead, email: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone (optional)</label>
                <input
                  type="tel"
                  value={newLead.phone}
                  onChange={(e) => setNewLead({ ...newLead, phone: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Service Interest</label>
                <input
                  type="text"
                  value={newLead.service_interest}
                  onChange={(e) => setNewLead({ ...newLead, service_interest: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  required
                  placeholder="e.g., wedding, portrait, commercial"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget (optional)</label>
                <input
                  type="text"
                  value={newLead.budget_range}
                  onChange={(e) => setNewLead({ ...newLead, budget_range: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="$2,000 - $4,000"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Event Date (optional)</label>
                <input
                  type="date"
                  value={newLead.event_date}
                  onChange={(e) => setNewLead({ ...newLead, event_date: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                <textarea
                  value={newLead.message}
                  onChange={(e) => setNewLead({ ...newLead, message: e.target.value })}
                  className="w-full h-32 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Context or notes for this lead (min 10 characters)"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Source</label>
                <input
                  type="text"
                  value={newLead.source}
                  onChange={(e) => setNewLead({ ...newLead, source: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="admin-manual"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowCreateModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateLead}
                disabled={creating}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50"
              >
                {creating ? 'Creating...' : 'Create Lead'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Booking Reminder/Confirmation Modal */}
      {showReminderModal && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold">Send Booking {reminderType === 'reminder' ? 'Reminder' : 'Confirmation'}</h3>
              <button
                onClick={() => setShowReminderModal(false)}
                className="text-gray-400 hover:text-gray-500"
                aria-label="Close reminder modal"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Sending to:</strong> {selectedLead.name} ({selectedLead.email})
              </p>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
              <div className="flex gap-4">
                <button
                  onClick={() => setReminderType('reminder')}
                  className={`flex-1 px-4 py-2 rounded-lg border-2 transition-colors ${
                    reminderType === 'reminder'
                      ? 'border-amber-500 bg-amber-50 text-amber-900'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <Calendar className="h-5 w-5 mx-auto mb-1" />
                  Reminder
                </button>
                <button
                  onClick={() => setReminderType('confirmation')}
                  className={`flex-1 px-4 py-2 rounded-lg border-2 transition-colors ${
                    reminderType === 'confirmation'
                      ? 'border-green-500 bg-green-50 text-green-900'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <CheckCircle className="h-5 w-5 mx-auto mb-1" />
                  Confirmation
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Session Date *</label>
                  <input
                    type="date"
                    value={reminderData.sessionDate}
                    onChange={(e) => setReminderData({ ...reminderData, sessionDate: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Session Time *</label>
                  <input
                    type="time"
                    value={reminderData.sessionTime}
                    onChange={(e) => setReminderData({ ...reminderData, sessionTime: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Session Type</label>
                <input
                  type="text"
                  value={reminderData.sessionType}
                  onChange={(e) => setReminderData({ ...reminderData, sessionType: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., Portrait Session, Wedding, Family Photos"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={reminderData.location}
                  onChange={(e) => setReminderData({ ...reminderData, location: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Studio address or meeting location"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional Notes</label>
                <textarea
                  value={reminderData.notes}
                  onChange={(e) => setReminderData({ ...reminderData, notes: e.target.value })}
                  className="w-full h-24 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="What to bring, parking info, etc."
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={() => setShowReminderModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={sendBookingReminder}
                disabled={sendingReminder}
                className={`px-4 py-2 text-white rounded-lg hover:opacity-90 disabled:opacity-50 ${
                  reminderType === 'reminder' ? 'bg-amber-600' : 'bg-green-600'
                }`}
              >
                {sendingReminder ? 'Sending...' : `Send ${reminderType === 'reminder' ? 'Reminder' : 'Confirmation'}`}
              </button>
            </div>
          </div>
        </div>
      )}

      {showImportModal && (
        <ContactImporter
          onImportComplete={fetchLeads}
          onClose={() => setShowImportModal(false)}
        />
      )}
    </div>
  )
}

