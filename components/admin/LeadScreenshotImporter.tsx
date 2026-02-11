'use client'

import React, { useEffect, useRef, useState } from 'react'
import { AlertCircle, CheckCircle, Image as ImageIcon, Loader2, Sparkles, Upload, X } from 'lucide-react'

interface LeadForm {
  name: string
  email: string
  phone?: string
  service_interest?: string
  event_date?: string
  budget_range?: string
  message: string
  source: string
  location?: string
}

interface LeadScreenshotImporterProps {
  onImported: () => void
  onClose: () => void
  mode?: 'screenshot' | 'business-card'
}

export default function LeadScreenshotImporter({ onImported, onClose, mode = 'screenshot' }: LeadScreenshotImporterProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isBusinessCard = mode === 'business-card'
  const defaultSourceHint = isBusinessCard ? 'business-card' : 'thumbtack'
  const [file, setFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [extracting, setExtracting] = useState(false)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [sourceHint, setSourceHint] = useState(defaultSourceHint)
  const [notes, setNotes] = useState('')
  const [form, setForm] = useState<LeadForm>({
    name: '',
    email: '',
    phone: '',
    service_interest: 'General inquiry',
    event_date: '',
    budget_range: '',
    message: '',
    source: isBusinessCard ? 'business-card' : 'screenshot-import'
  })

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl)
    }
  }, [previewUrl])

  const handleFileChange = (selected?: File | null) => {
    const next = selected || null
    setFile(next)
    setError(null)
    setSuccess(null)
    setForm({ ...form, message: '' })
    setPreviewUrl(prev => {
      if (prev) URL.revokeObjectURL(prev)
      return next ? URL.createObjectURL(next) : null
    })
  }

  const triggerFilePicker = () => fileInputRef.current?.click()

  const extractFromScreenshot = async () => {
    if (!file) {
      setError('Please select a screenshot first.')
      return
    }

    setExtracting(true)
    setError(null)
    setSuccess(null)

    try {
      const formData = new FormData()
      formData.append('file', file)
      formData.append('source', sourceHint || 'screenshot-import')
      formData.append('mode', mode)
      if (notes.trim()) formData.append('notes', notes.trim())

      const res = await fetch('/api/leads/from-screenshot', {
        method: 'POST',
        body: formData
      })

      const json = await res.json()
      if (!res.ok) {
        const detail = json?.details ? ` (${json.details})` : ''
        throw new Error((json.error || 'Failed to extract lead details') + detail)
      }

      const extracted = json.extracted as LeadForm
      setForm({
        name: extracted.name || '',
        email: extracted.email || 'lead@example.com',
        phone: extracted.phone || '',
        service_interest: extracted.service_interest || 'General inquiry',
        event_date: extracted.event_date || '',
        budget_range: extracted.budget_range || '',
        location: extracted.location || '',
        message: extracted.message || (isBusinessCard ? 'Imported from business card.' : `Imported from ${sourceHint || 'screenshot'}`),
        source: extracted.source || sourceHint || 'screenshot-import'
      })
      setSuccess('Details extracted. Review and save to CRM.')
    } catch (err: any) {
      console.error('Screenshot extract error', err)
      setError(err?.message || 'Could not extract details from the screenshot.')
    } finally {
      setExtracting(false)
    }
  }

  const saveLead = async () => {
    setError(null)
    setSuccess(null)

    const trimmedMessage = form.message?.trim() || ''
    const preparedMessage = trimmedMessage.length >= 10
      ? trimmedMessage
      : `${trimmedMessage} Imported from ${form.source || sourceHint || 'screenshot'}.`

    if (!form.name || form.name.trim().length < 2) {
      setError('Name looks too short. Please confirm the lead name.')
      return
    }
    const preparedEmail = form.email && form.email.trim()
      ? form.email.trim()
      : 'lead@example.com'

    if (!preparedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(preparedEmail)) {
      setError('A valid email is required before saving to the CRM.')
      return
    }
    if (!preparedMessage || preparedMessage.length < 10) {
      setError('Message needs at least 10 characters to pass validation.')
      return
    }

    const defaultLeadCost = 18.48

    setSaving(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name.trim(),
          email: preparedEmail,
          phone: form.phone?.trim() || undefined,
          service_interest: form.service_interest?.trim() || 'General inquiry',
          event_date: form.event_date?.trim() || undefined,
          budget_range: form.budget_range?.trim() || undefined,
          location: form.location?.trim() || undefined,
          message: preparedMessage,
          lead_cost: defaultLeadCost,
          source: form.source?.trim() || sourceHint || 'screenshot-import'
        })
      })

      const json = await res.json()
      if (!res.ok) {
        throw new Error(json.error || 'Failed to save lead')
      }

      setSuccess('Lead saved to CRM')
      onImported()
    } catch (err: any) {
      console.error('Save lead error', err)
      setError(err?.message || 'Failed to save lead to CRM.')
    } finally {
      setSaving(false)
    }
  }

  const updateField = (key: keyof LeadForm, value: string) => {
    setForm(prev => ({ ...prev, [key]: value }))
  }

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="px-6 py-4 border-b flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              {isBusinessCard ? 'Import lead from business card' : 'Import lead from screenshot'}
            </h2>
            <p className="text-sm text-gray-500">
              {isBusinessCard
                ? 'Upload a clear photo of a business card. AI will extract the contact details.'
                : 'Upload a Thumbtack, Bark, WeddingWire, or chat screenshot. AI will extract the contact details.'}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700" aria-label="Close importer">
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto grid grid-cols-1 lg:grid-cols-2 divide-y lg:divide-y-0 lg:divide-x">
          <div className="p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary-50 text-primary-600 flex items-center justify-center">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-700">Step 1</p>
                <p className="text-base font-semibold text-gray-900">Upload the screenshot</p>
              </div>
            </div>

            <div
              className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${
                file ? 'border-primary-300 bg-primary-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragOver={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onDragEnter={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onDragLeave={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              onDrop={(e) => {
                e.preventDefault()
                e.stopPropagation()
                const droppedFile = e.dataTransfer.files?.[0]
                if (droppedFile) {
                  handleFileChange(droppedFile)
                }
              }}
            >
              {previewUrl ? (
                <div className="space-y-3">
                  <img
                    src={previewUrl}
                    alt={isBusinessCard ? 'Business card preview' : 'Screenshot preview'}
                    className="mx-auto max-h-80 rounded-lg border"
                  />
                  <div className="flex justify-center gap-3">
                    <button
                      onClick={() => handleFileChange(null)}
                      className="px-3 py-2 border rounded-lg hover:bg-gray-50 text-gray-700"
                    >
                      Remove
                    </button>
                    <button
                      onClick={triggerFilePicker}
                      className="px-3 py-2 border rounded-lg bg-white hover:bg-gray-50 flex items-center gap-2"
                    >
                      <Upload className="h-4 w-4" />
                      Replace
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center gap-3" onClick={triggerFilePicker} role="button" tabIndex={0}>
                  <div className="w-14 h-14 bg-gray-100 rounded-full flex items-center justify-center">
                    <ImageIcon className="h-6 w-6 text-gray-500" />
                  </div>
                  <p className="text-base font-medium text-gray-800">Drop an image or click to upload</p>
                  <p className="text-sm text-gray-500">
                    {isBusinessCard ? 'PNG, JPG, or HEIC photos up to 8MB' : 'PNG, JPG, or web screenshots up to 8MB'}
                  </p>
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="hidden"
                onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Source hint</label>
                <input
                  value={sourceHint}
                  onChange={(e) => setSourceHint(e.target.value)}
                  placeholder={isBusinessCard ? 'business-card, referral' : 'thumbtack, bark, weddingwire'}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Extra context (optional)</label>
                <input
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g., booked via Sarah's account"
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>

            <button
              onClick={extractFromScreenshot}
              disabled={extracting}
              className="w-full px-4 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {extracting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
              {extracting ? 'Extracting details...' : 'Extract details with AI'}
            </button>

            {error && (
              <div className="flex items-start gap-2 text-sm text-red-700 bg-red-50 border border-red-200 p-3 rounded-lg">
                <AlertCircle className="h-4 w-4 mt-0.5" />
                <div>
                  <p className="font-semibold">Something went wrong</p>
                  <p>{error}</p>
                </div>
              </div>
            )}

            {success && (
              <div className="flex items-start gap-2 text-sm text-green-700 bg-green-50 border border-green-200 p-3 rounded-lg">
                <CheckCircle className="h-4 w-4 mt-0.5" />
                <div>
                  <p className="font-semibold">Great!</p>
                  <p>{success}</p>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 space-y-4 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white text-primary-600 flex items-center justify-center border border-primary-100">
                <Sparkles className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-gray-700">Step 2</p>
                <p className="text-base font-semibold text-gray-900">Review and save to CRM</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  value={form.name}
                  onChange={(e) => updateField('name', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Lead name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  value={form.email}
                  onChange={(e) => updateField('email', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="lead@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  value={form.phone || ''}
                  onChange={(e) => updateField('phone', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="+1 555 123 4567"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Service interest</label>
                <input
                  value={form.service_interest || ''}
                  onChange={(e) => updateField('service_interest', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Wedding, headshot, event"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Event date / timeline</label>
                <input
                  value={form.event_date || ''}
                  onChange={(e) => updateField('event_date', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="e.g., March 15 or ASAP"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Budget</label>
                <input
                  value={form.budget_range || ''}
                  onChange={(e) => updateField('budget_range', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="$500 - $1,200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  value={form.location || ''}
                  onChange={(e) => updateField('location', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="Houston, TX or venue name"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">Message / notes</label>
              <textarea
                value={form.message}
                onChange={(e) => updateField('message', e.target.value)}
                className="w-full h-28 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                placeholder="Summary of the request"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-medium text-gray-700">Source label</label>
                <input
                  value={form.source}
                  onChange={(e) => updateField('source', e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                  placeholder="thumbtack, bark, screenshot"
                />
              </div>
              <div className="flex items-end">
                <button
                  onClick={saveLead}
                  disabled={saving}
                  className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <CheckCircle className="h-4 w-4" />}
                  {saving ? 'Saving...' : 'Save to CRM'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
