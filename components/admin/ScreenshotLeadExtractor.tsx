'use client'

import React, { useRef, useState } from 'react'
import { Upload, Image as ImageIcon, X, AlertCircle, Loader2, Check, Save, AlertTriangle } from 'lucide-react'

interface ParsedLead {
  name: string
  email: string
  phone?: string
  service_interest?: string
  budget_range?: string
  event_date?: string
  message?: string
  source?: string
  extracted_text?: string
  source_metadata?: Record<string, any>
}

interface ExtractionRow {
  id: string
  fileName: string
  lead?: ParsedLead
  error?: string
  saving?: boolean
  saved?: boolean
}

interface ScreenshotLeadExtractorProps {
  onClose: () => void
  onLeadSaved: () => void
}

function uuid() {
  return Math.random().toString(36).substring(2, 9)
}

export default function ScreenshotLeadExtractor({ onClose, onLeadSaved }: ScreenshotLeadExtractorProps) {
  const [isDragging, setIsDragging] = useState(false)
  const [files, setFiles] = useState<File[]>([])
  const [rows, setRows] = useState<ExtractionRow[]>([])
  const [error, setError] = useState<string | null>(null)
  const [extracting, setExtracting] = useState(false)
  const [sourceHint, setSourceHint] = useState('thumbtack')
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    const dropped = Array.from(e.dataTransfer.files || []).filter(f => f.type.startsWith('image/'))
    if (dropped.length) {
      setFiles(dropped)
      setRows([])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = Array.from(e.target.files || []).filter(f => f.type.startsWith('image/'))
    if (selected.length) {
      setFiles(selected)
      setRows([])
    }
  }

  const extract = async () => {
    if (!files.length) return
    setError(null)
    setExtracting(true)
    try {
      const formData = new FormData()
      files.forEach(f => formData.append('files', f))
      formData.append('source', sourceHint)

      const res = await fetch('/api/leads/extract', {
        method: 'POST',
        body: formData,
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data.error || 'Extraction failed')
      }

      const mapped: ExtractionRow[] = (data.results || []).map((r: any) => ({
        id: uuid(),
        fileName: r.file,
        lead: r.lead ? {
          name: r.lead.name || '',
          email: r.lead.email || '',
          phone: r.lead.phone || '',
          service_interest: r.lead.service_interest || 'General',
          budget_range: r.lead.budget_range || '',
          event_date: r.lead.event_date || '',
          message: r.lead.message || 'Captured from screenshot',
          source: r.lead.source || sourceHint || 'thumbtack-screenshot',
          extracted_text: r.lead.extracted_text || '',
          source_metadata: r.lead.source_metadata || { fileName: r.file },
        } : undefined,
        error: r.error,
      }))

      setRows(mapped)
    } catch (err: any) {
      setError(err?.message || 'Failed to extract leads')
    } finally {
      setExtracting(false)
    }
  }

  const saveLead = async (rowId: string) => {
    const row = rows.find(r => r.id === rowId)
    if (!row || !row.lead) return

    setRows(prev => prev.map(r => r.id === rowId ? { ...r, saving: true, error: undefined } : r))
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: row.lead.name,
          email: row.lead.email,
          phone: row.lead.phone || undefined,
          service_interest: row.lead.service_interest || 'General',
          budget_range: row.lead.budget_range || undefined,
          event_date: row.lead.event_date || undefined,
          message: row.lead.message || 'Captured from screenshot',
          source: row.lead.source || 'thumbtack-screenshot',
          extracted_text: row.lead.extracted_text || undefined,
          source_metadata: row.lead.source_metadata || { fileName: row.fileName },
        }),
      })

      const data = await res.json().catch(() => ({}))
      if (!res.ok) {
        throw new Error(data.error || 'Save failed')
      }

      setRows(prev => prev.map(r => r.id === rowId ? { ...r, saving: false, saved: true } : r))
      onLeadSaved()
    } catch (err: any) {
      setRows(prev => prev.map(r => r.id === rowId ? { ...r, saving: false, error: err?.message || 'Save failed' } : r))
    }
  }

  const updateLeadField = (rowId: string, field: keyof ParsedLead, value: string) => {
    setRows(prev => prev.map(r => {
      if (r.id !== rowId || !r.lead) return r
      return { ...r, lead: { ...r.lead, [field]: value }, saved: false }
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-5xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Import Leads from Screenshot</h2>
            <p className="text-sm text-gray-500">Upload Thumbtack or other lead screenshots; AI will extract fields for review.</p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="Close">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1 space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className={`md:col-span-2 border-2 border-dashed rounded-lg p-6 ${isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-200'}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
                  <ImageIcon className="w-6 h-6 text-gray-500" />
                </div>
                <div>
                  <p className="font-medium text-gray-900">Drag images here</p>
                  <p className="text-sm text-gray-500">Supports JPG/PNG. Up to 5 files.</p>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Browse Files
                </button>
                <input ref={fileInputRef} type="file" accept="image/*" multiple className="hidden" onChange={handleFileSelect} />
                {files.length > 0 && (
                  <span className="text-sm text-gray-600">{files.length} selected</span>
                )}
              </div>
            </div>

            <div className="border rounded-lg p-4 bg-gray-50">
              <label className="block text-sm font-medium text-gray-700">Source hint</label>
              <input
                value={sourceHint}
                onChange={(e) => setSourceHint(e.target.value)}
                className="mt-1 w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="thumbtack"
              />
              <p className="text-xs text-gray-500 mt-2">Used to tag leads (e.g., thumbtack, bark, facebook).</p>
              <button
                onClick={extract}
                disabled={!files.length || extracting}
                className="mt-4 w-full px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {extracting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                {extracting ? 'Extracting...' : 'Extract Leads'}
              </button>
              {error && (
                <div className="mt-3 flex items-start gap-2 text-red-600 text-sm">
                  <AlertCircle className="w-4 h-4 mt-0.5" />
                  <span>{error}</span>
                </div>
              )}
            </div>
          </div>

          {rows.length > 0 && (
            <div className="space-y-3">
              {rows.map((row) => (
                <div key={row.id} className="border rounded-lg p-4 bg-white shadow-sm">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <ImageIcon className="w-4 h-4 text-gray-500" />
                      <span className="text-sm font-medium text-gray-900">{row.fileName}</span>
                      {row.saved && <Check className="w-4 h-4 text-green-600" />}
                    </div>
                    {row.error && (
                      <div className="flex items-center gap-1 text-red-600 text-sm">
                        <AlertTriangle className="w-4 h-4" />
                        <span>{row.error}</span>
                      </div>
                    )}
                  </div>

                  {row.lead ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      <input
                        value={row.lead.name}
                        onChange={(e) => updateLeadField(row.id, 'name', e.target.value)}
                        placeholder="Name"
                        className="px-3 py-2 border rounded-md"
                      />
                      <input
                        value={row.lead.email}
                        onChange={(e) => updateLeadField(row.id, 'email', e.target.value)}
                        placeholder="Email"
                        className="px-3 py-2 border rounded-md"
                      />
                      <input
                        value={row.lead.phone || ''}
                        onChange={(e) => updateLeadField(row.id, 'phone', e.target.value)}
                        placeholder="Phone"
                        className="px-3 py-2 border rounded-md"
                      />
                      <input
                        value={row.lead.service_interest || ''}
                        onChange={(e) => updateLeadField(row.id, 'service_interest', e.target.value)}
                        placeholder="Service interest"
                        className="px-3 py-2 border rounded-md"
                      />
                      <input
                        value={row.lead.budget_range || ''}
                        onChange={(e) => updateLeadField(row.id, 'budget_range', e.target.value)}
                        placeholder="Budget range"
                        className="px-3 py-2 border rounded-md"
                      />
                      <input
                        value={row.lead.event_date || ''}
                        onChange={(e) => updateLeadField(row.id, 'event_date', e.target.value)}
                        placeholder="Event date"
                        className="px-3 py-2 border rounded-md"
                      />
                      <input
                        value={row.lead.source || ''}
                        onChange={(e) => updateLeadField(row.id, 'source', e.target.value)}
                        placeholder="Source"
                        className="px-3 py-2 border rounded-md"
                      />
                      <textarea
                        value={row.lead.message || ''}
                        onChange={(e) => updateLeadField(row.id, 'message', e.target.value)}
                        placeholder="Message / notes"
                        className="px-3 py-2 border rounded-md md:col-span-3"
                        rows={3}
                      />
                      <textarea
                        value={row.lead.extracted_text || ''}
                        onChange={(e) => updateLeadField(row.id, 'extracted_text', e.target.value)}
                        placeholder="Raw text (optional)"
                        className="px-3 py-2 border rounded-md text-xs text-gray-600 bg-gray-50 md:col-span-3"
                        rows={4}
                      />
                      <div className="md:col-span-3 flex justify-end">
                        <button
                          onClick={() => saveLead(row.id)}
                          disabled={row.saving}
                          className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 disabled:opacity-50 flex items-center gap-2"
                        >
                          {row.saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                          {row.saving ? 'Saving...' : 'Save lead'}
                        </button>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-600">No data extracted.</p>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
