'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Palette, Save, RotateCcw, Eye, Download } from 'lucide-react'
import AdminToast from '@/components/admin/AdminToast'
import AdminConfirmDialog from '@/components/admin/AdminConfirmDialog'

interface ThemeSettings {
  primaryColor: string
  secondaryColor: string
  accentColor: string
  backgroundColor: string
  textColor: string
  borderRadius: string
  fontFamily: string
}

const defaultTheme: ThemeSettings = {
  primaryColor: '#3B82F6',
  secondaryColor: '#8B5CF6',
  accentColor: '#10B981',
  backgroundColor: '#F9FAFB',
  textColor: '#111827',
  borderRadius: '0.5rem',
  fontFamily: 'Inter, sans-serif'
}

export default function ThemeCustomizerPage() {
  const [theme, setTheme] = useState<ThemeSettings>(defaultTheme)
  const [saving, setSaving] = useState(false)
  const [showPreview, setShowPreview] = useState(true)
  const [toast, setToast] = useState<{ type: 'success' | 'error' | 'info'; message: string } | null>(null)
  const [confirmReset, setConfirmReset] = useState(false)

  useEffect(() => {
    fetchTheme()
  }, [])

  const fetchTheme = async () => {
    try {
      const response = await fetch('/api/admin/theme')
      const data = await response.json()
      
      if (data.success && data.theme) {
        setTheme(data.theme)
      }
    } catch (error) {
      console.error('Failed to fetch theme:', error)
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const response = await fetch('/api/admin/theme', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(theme)
      })

      const data = await response.json()
      
      if (data.success) {
        setToast({ type: 'success', message: 'Theme saved successfully.' })
      } else {
        setToast({ type: 'error', message: 'Failed to save theme.' })
      }
    } catch (error) {
      console.error('Save theme error:', error)
      setToast({ type: 'error', message: 'Error saving theme.' })
    } finally {
      setSaving(false)
    }
  }

  const handleReset = () => {
    setConfirmReset(true)
  }

  const exportTheme = () => {
    const dataStr = JSON.stringify(theme, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'theme.json'
    link.click()
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-20 lg:pb-8">
      {toast && (
        <div className="fixed right-4 top-20 z-50 w-full max-w-sm">
          <AdminToast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
        </div>
      )}
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <Link href="/admin" className="text-sm text-blue-600 hover:text-blue-800 mb-2 inline-block">
                ← Back to Dashboard
              </Link>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Theme Customizer</h1>
              <p className="mt-1 text-sm text-gray-600">
                Customize colors, fonts, and branding for your admin panel
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setShowPreview(!showPreview)}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                <Eye className="w-5 h-5" />
                {showPreview ? 'Hide' : 'Show'} Preview
              </button>
              <button
                onClick={handleReset}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                <RotateCcw className="w-5 h-5" />
                Reset
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50"
              >
                <Save className="w-5 h-5" />
                {saving ? 'Saving...' : 'Save Theme'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Settings Panel */}
          <div className="space-y-6">
            {/* Colors */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Palette className="w-5 h-5" />
                Color Palette
              </h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Primary Color
                  </label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="color"
                      value={theme.primaryColor}
                      onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                      className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={theme.primaryColor}
                      onChange={(e) => setTheme({ ...theme, primaryColor: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Secondary Color
                  </label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="color"
                      value={theme.secondaryColor}
                      onChange={(e) => setTheme({ ...theme, secondaryColor: e.target.value })}
                      className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={theme.secondaryColor}
                      onChange={(e) => setTheme({ ...theme, secondaryColor: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Accent Color
                  </label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="color"
                      value={theme.accentColor}
                      onChange={(e) => setTheme({ ...theme, accentColor: e.target.value })}
                      className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={theme.accentColor}
                      onChange={(e) => setTheme({ ...theme, accentColor: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Background Color
                  </label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="color"
                      value={theme.backgroundColor}
                      onChange={(e) => setTheme({ ...theme, backgroundColor: e.target.value })}
                      className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={theme.backgroundColor}
                      onChange={(e) => setTheme({ ...theme, backgroundColor: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Text Color
                  </label>
                  <div className="flex gap-3 items-center">
                    <input
                      type="color"
                      value={theme.textColor}
                      onChange={(e) => setTheme({ ...theme, textColor: e.target.value })}
                      className="w-16 h-10 rounded border border-gray-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={theme.textColor}
                      onChange={(e) => setTheme({ ...theme, textColor: e.target.value })}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Typography & Spacing */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Typography & Spacing</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Font Family
                  </label>
                  <select
                    value={theme.fontFamily}
                    onChange={(e) => setTheme({ ...theme, fontFamily: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="Inter, sans-serif">Inter</option>
                    <option value="system-ui, sans-serif">System UI</option>
                    <option value="'Roboto', sans-serif">Roboto</option>
                    <option value="'Open Sans', sans-serif">Open Sans</option>
                    <option value="'Poppins', sans-serif">Poppins</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Border Radius
                  </label>
                  <select
                    value={theme.borderRadius}
                    onChange={(e) => setTheme({ ...theme, borderRadius: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                  >
                    <option value="0">None (0px)</option>
                    <option value="0.25rem">Small (4px)</option>
                    <option value="0.5rem">Medium (8px)</option>
                    <option value="0.75rem">Large (12px)</option>
                    <option value="1rem">Extra Large (16px)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Export */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Export Theme</h3>
              <p className="text-sm text-gray-600 mb-4">
                Download your theme settings as a JSON file for backup or sharing.
              </p>
              <button
                onClick={exportTheme}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                <Download className="w-5 h-5" />
                Export Theme JSON
              </button>
            </div>
          </div>

          {/* Live Preview */}
          {showPreview && (
            <div className="lg:sticky lg:top-6 h-fit">
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Preview</h3>
                
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-6 space-y-4"
                  style={{ 
                    backgroundColor: theme.backgroundColor,
                    color: theme.textColor,
                    fontFamily: theme.fontFamily
                  }}
                >
                  {/* Preview Buttons */}
                  <div className="space-y-3">
                    <button
                      style={{ 
                        backgroundColor: theme.primaryColor,
                        borderRadius: theme.borderRadius
                      }}
                      className="w-full px-4 py-2 text-white font-medium"
                    >
                      Primary Button
                    </button>
                    <button
                      style={{ 
                        backgroundColor: theme.secondaryColor,
                        borderRadius: theme.borderRadius
                      }}
                      className="w-full px-4 py-2 text-white font-medium"
                    >
                      Secondary Button
                    </button>
                    <button
                      style={{ 
                        backgroundColor: theme.accentColor,
                        borderRadius: theme.borderRadius
                      }}
                      className="w-full px-4 py-2 text-white font-medium"
                    >
                      Accent Button
                    </button>
                  </div>

                  {/* Preview Card */}
                  <div 
                    style={{ borderRadius: theme.borderRadius }}
                    className="bg-white p-4 shadow-sm"
                  >
                    <h4 
                      style={{ color: theme.primaryColor }}
                      className="font-bold text-lg mb-2"
                    >
                      Card Title
                    </h4>
                    <p style={{ color: theme.textColor }} className="text-sm mb-3">
                      This is a preview of how your content will look with the selected theme colors and typography.
                    </p>
                    <div className="flex gap-2">
                      <span 
                        style={{ 
                          backgroundColor: theme.primaryColor + '20',
                          color: theme.primaryColor,
                          borderRadius: theme.borderRadius
                        }}
                        className="px-2 py-1 text-xs font-semibold"
                      >
                        Tag 1
                      </span>
                      <span 
                        style={{ 
                          backgroundColor: theme.accentColor + '20',
                          color: theme.accentColor,
                          borderRadius: theme.borderRadius
                        }}
                        className="px-2 py-1 text-xs font-semibold"
                      >
                        Tag 2
                      </span>
                    </div>
                  </div>

                  {/* Preview Form */}
                  <div className="space-y-2">
                    <label style={{ color: theme.textColor }} className="text-sm font-medium block">
                      Sample Input
                    </label>
                    <input
                      type="text"
                      placeholder="Enter text..."
                      style={{ borderRadius: theme.borderRadius }}
                      className="w-full px-3 py-2 border border-gray-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <AdminConfirmDialog
        open={confirmReset}
        title="Reset theme?"
        message="This will reset the editor theme controls to the default values. You can still review before saving."
        confirmLabel="Reset"
        danger
        onCancel={() => setConfirmReset(false)}
        onConfirm={() => {
          setTheme(defaultTheme)
          setConfirmReset(false)
          setToast({ type: 'info', message: 'Theme reset locally. Save to publish the default theme.' })
        }}
      />
    </div>
  )
}
