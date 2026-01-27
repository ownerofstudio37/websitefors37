'use client'

import React, { useState, useRef } from 'react'
import { Upload, FileUp, X, Check, AlertCircle, Loader2 } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import toast from 'react-hot-toast'

interface ImportedContact {
  name: string
  email: string
  phone?: string
  service_interest?: string
  source?: string
  status?: string
  message?: string
  lead_cost?: number
}

interface ContactImporterProps {
  onImportComplete: () => void
  onClose: () => void
}

export default function ContactImporter({ onImportComplete, onClose }: ContactImporterProps) {
  const [file, setFile] = useState<File | null>(null)
  const [previewData, setPreviewData] = useState<ImportedContact[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [importing, setImporting] = useState(false)
  const [error, setError] = useState<string | null>(null)
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
    const droppedFile = e.dataTransfer.files[0]
    if (droppedFile) {
      validateAndProcessFile(droppedFile)
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      validateAndProcessFile(selectedFile)
    }
  }

  const validateAndProcessFile = (file: File) => {
    setError(null)
    const validTypes = ['text/csv', 'text/vcard', 'text/x-vcard', 'application/vnd.ms-excel'] // basic validation
    // We can also check extension
    const extension = file.name.split('.').pop()?.toLowerCase()
    
    if (extension !== 'csv' && extension !== 'vcf' && extension !== 'vcard') {
      setError('Please upload a CSV or VCard (.vcf) file.')
      return
    }

    setFile(file)
    processFile(file)
  }

  const processFile = async (file: File) => {
    setIsLoading(true)
    try {
      const text = await file.text()
      const extension = file.name.split('.').pop()?.toLowerCase()

      let contacts: ImportedContact[] = []

      if (extension === 'csv') {
        contacts = parseCSV(text)
      } else if (extension === 'vcf' || extension === 'vcard') {
        contacts = parseVCard(text)
      }

      if (contacts.length === 0) {
        setError('No valid contacts found in the file.')
      } else {
        setPreviewData(contacts)
      }
    } catch (err) {
      console.error('Error processing file:', err)
      setError('Failed to process file. Please check the format.')
    } finally {
      setIsLoading(false)
    }
  }

  const parseCSV = (text: string): ImportedContact[] => {
    const lines = text.split(/\r\n|\n/)
    const headers = lines[0].toLowerCase().split(',').map(h => h.trim().replace(/"/g, ''))
    
    const contacts: ImportedContact[] = []
    
    // Simple mapping logic
    const nameIdx = headers.findIndex(h => h.includes('name') || h.includes('first') || h.includes('full'))
    const emailIdx = headers.findIndex(h => h.includes('email') || h.includes('e-mail'))
    const phoneIdx = headers.findIndex(h => h.includes('phone') || h.includes('tel') || h.includes('mobile'))
    
    if (nameIdx === -1 && emailIdx === -1) {
      throw new Error('Could not detect Name or Email columns.')
    }

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim()
      if (!line) continue
      
      // Basic CSV split handling quotes
      const row: string[] = []
      let inQuote = false
      let currentCell = ''
      
      for (let j = 0; j < line.length; j++) {
        const char = line[j]
        if (char === '"') {
          inQuote = !inQuote
        } else if (char === ',' && !inQuote) {
          row.push(currentCell.trim().replace(/^"|"$/g, ''))
          currentCell = ''
        } else {
          currentCell += char
        }
      }
      row.push(currentCell.trim().replace(/^"|"$/g, ''))

      if (row.length < headers.length) continue // Skip malformed rows

      const name = nameIdx !== -1 ? row[nameIdx] : 'Unknown'
      const email = emailIdx !== -1 ? row[emailIdx] : ''
      const phone = phoneIdx !== -1 ? row[phoneIdx] : ''

      if (email || name !== 'Unknown') {
        contacts.push({
          name,
          email,
          phone,
          service_interest: 'General',
          source: 'import-csv',
          status: 'new',
          message: 'Imported via CSV',
          lead_cost: 18.48
        })
      }
    }
    return contacts
  }

  const parseVCard = (text: string): ImportedContact[] => {
    const contacts: ImportedContact[] = []
    const cards = text.split(/BEGIN:VCARD/i)

    for (const card of cards) {
      if (!card.trim()) continue

      const lines = card.split(/\r\n|\n/)
      let name = ''
      let email = ''
      let phone = ''

      for (const line of lines) {
        if (line.toUpperCase().startsWith('FN:')) {
          name = line.substring(3).trim()
        } else if (line.toUpperCase().startsWith('N:') && !name) {
          // Fallback if FN is missing, N:Last;First;Middle;Prefix;Suffix
          const parts = line.substring(2).split(';')
          name = `${parts[1] || ''} ${parts[0] || ''}`.trim()
        } else if (line.toUpperCase().startsWith('EMAIL')) {
          const parts = line.split(':')
          if (parts.length > 1) email = parts[parts.length - 1].trim()
        } else if (line.toUpperCase().startsWith('TEL')) {
          const parts = line.split(':')
          if (parts.length > 1) phone = parts[parts.length - 1].trim()
        }
      }

      if (name || email) {
        contacts.push({
          name: name || 'Unknown',
          email,
          phone,
          service_interest: 'General',
          source: 'import-vcard',
          status: 'new',
          message: 'Imported via VCard',
          lead_cost: 18.48
        })
      }
    }
    return contacts
  }

  const handleImport = async () => {
    if (previewData.length === 0) return

    setImporting(true)
    try {
      // Insert in batches
      const batchSize = 50
      for (let i = 0; i < previewData.length; i += batchSize) {
        const batch = previewData.slice(i, i + batchSize)
        const { error } = await supabase
          .from('leads')
          .insert(batch)
        
        if (error) throw error
      }

      toast.success(`Successfully imported ${previewData.length} contacts`)
      onImportComplete()
      onClose()
    } catch (err) {
      console.error('Import error:', err)
      setError('Failed to import contacts. Some duplicates might exist.')
      toast.error('Failed to import contacts')
    } finally {
      setImporting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
        <div className="p-6 border-b flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-900">Import Contacts</h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 flex-1 overflow-y-auto">
          {!file ? (
            <div
              className={`border-2 border-dashed rounded-lg p-12 text-center transition-colors ${
                isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-gray-400'
              }`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              <div className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                  <FileUp className="w-8 h-8 text-gray-500" />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    Drag and drop your file here
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    Supports CSV and VCard (.vcf) files
                  </p>
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Browse Files
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".csv,.vcf,.vcard"
                  className="hidden"
                  onChange={handleFileSelect}
                />
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg border flex items-center justify-center">
                    <FileUp className="w-5 h-5 text-gray-500" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">{file.name}</p>
                    <p className="text-sm text-gray-500">
                      {(file.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => {
                    setFile(null)
                    setPreviewData([])
                    setError(null)
                  }}
                  className="text-sm text-red-600 hover:text-red-700"
                >
                  Remove
                </button>
              </div>

              {isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-8 h-8 animate-spin text-primary-600" />
                </div>
              ) : error ? (
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-red-600 mt-0.5" />
                  <p className="text-sm text-red-600">{error}</p>
                </div>
              ) : (
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-medium text-gray-900">
                      Preview ({previewData.length} contacts)
                    </h3>
                  </div>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="max-h-64 overflow-y-auto">
                      <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                          {previewData.slice(0, 50).map((contact, i) => (
                            <tr key={i}>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{contact.name}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.email}</td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{contact.phone}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                    {previewData.length > 50 && (
                      <div className="bg-gray-50 px-6 py-3 border-t text-sm text-gray-500 text-center">
                        And {previewData.length - 50} more...
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="p-6 border-t bg-gray-50 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-white border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={handleImport}
            disabled={previewData.length === 0 || importing || !!error}
            className="px-4 py-2 bg-primary-600 text-white rounded-md text-sm font-medium hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {importing ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Importing...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                Import Contacts
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  )
}
