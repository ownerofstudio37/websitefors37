'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { Bell, Clock, Mail, MessageSquare, RotateCw, TestTube, Check, AlertCircle, Loader2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface AppointmentReminderSettings {
  enabled: boolean
  hours_before: number
  send_email: boolean
  send_sms: boolean
  auto_resend_on_reschedule: boolean
  max_retries: number
  last_run?: string
}

export default function AppointmentRemindersSettingsPage() {
  const [settings, setSettings] = useState<AppointmentReminderSettings | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [testEmail, setTestEmail] = useState('')
  const [testPhone, setTestPhone] = useState('')
  const [sendingTest, setSendingTest] = useState(false)

  // Load settings on mount
  useEffect(() => {
    const fetchSettings = async () => {
      try {
        setLoading(true)
        const res = await fetch('/api/admin/appointment-reminders-settings')
        const data = await res.json()
        if (data.success) {
          setSettings(data.settings)
        }
      } catch (error) {
        console.error('Failed to load settings:', error)
        toast.error('Failed to load reminder settings')
      } finally {
        setLoading(false)
      }
    }

    fetchSettings()
  }, [])

  const handleSaveSettings = async () => {
    if (!settings) return

    try {
      setSaving(true)
      const res = await fetch('/api/admin/appointment-reminders-settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(settings),
      })

      const data = await res.json()
      if (data.success) {
        toast.success('Settings saved successfully')
      } else {
        toast.error(data.error || 'Failed to save settings')
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      toast.error('Failed to save reminder settings')
    } finally {
      setSaving(false)
    }
  }

  const handleSendTestReminder = async () => {
    if (!testEmail) {
      toast.error('Please enter a test email address')
      return
    }

    try {
      setSendingTest(true)
      const res = await fetch('/api/admin/appointment-reminders-settings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          testEmail,
          testPhone: testPhone || undefined,
        }),
      })

      const data = await res.json()
      if (data.success) {
        toast.success(`Test reminder sent to ${testEmail}`)
      } else {
        toast.error(data.error || 'Failed to send test reminder')
      }
    } catch (error) {
      console.error('Error sending test reminder:', error)
      toast.error('Failed to send test reminder')
    } finally {
      setSendingTest(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-8 h-8 animate-spin text-amber-600 mx-auto mb-2" />
          <p className="text-gray-600">Loading settings...</p>
        </div>
      </div>
    )
  }

  if (!settings) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 py-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <AlertCircle className="w-5 h-5 text-red-600 inline mr-2" />
            <span className="text-red-800">Failed to load settings</span>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b px-6 py-4 sticky top-0 z-10 shadow-sm">
        <div className="max-w-3xl mx-auto">
          <Link href="/admin" className="text-blue-600 hover:underline text-sm">← Back to Admin</Link>
          <div className="flex items-center gap-3 mt-2">
            <Bell className="w-6 h-6 text-amber-600" />
            <h1 className="text-2xl font-bold text-gray-900">Appointment Reminders</h1>
          </div>
          <p className="text-gray-600 text-sm mt-1">Configure automatic appointment reminders for clients</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Enable/Disable Section */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Enable Reminders</h2>
              <p className="text-sm text-gray-600 mt-1">Turn automatic appointment reminders on or off</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={settings.enabled}
                onChange={(e) => setSettings({ ...settings, enabled: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-amber-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-amber-600"></div>
            </label>
          </div>
          {settings.enabled && (
            <div className="bg-green-50 border border-green-200 rounded p-3 text-sm text-green-700">
              <Check className="w-4 h-4 inline mr-2" />
              Reminders are <strong>enabled</strong>. Clients will receive notifications 24 hours before their appointments.
            </div>
          )}
          {!settings.enabled && (
            <div className="bg-gray-100 border border-gray-300 rounded p-3 text-sm text-gray-700">
              Reminders are <strong>disabled</strong>. No automatic notifications will be sent.
            </div>
          )}
        </div>

        {/* Timing Configuration */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-amber-600" />
            Reminder Timing
          </h2>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hours Before Appointment
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  max="168"
                  value={settings.hours_before}
                  onChange={(e) => setSettings({ ...settings, hours_before: Math.max(1, Math.min(168, parseInt(e.target.value) || 24)) })}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <span className="text-sm text-gray-600">hours</span>
              </div>
              <p className="text-xs text-gray-500 mt-1">Default: 24 hours before appointment time</p>
            </div>
          </div>
        </div>

        {/* Channel Configuration */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Notification Channels</h2>

          <div className="space-y-3">
            {/* Email Toggle */}
            <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.send_email}
                onChange={(e) => setSettings({ ...settings, send_email: e.target.checked })}
                className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
              />
              <Mail className="w-5 h-5 text-gray-500 ml-3 mr-3" />
              <div className="flex-1">
                <div className="font-medium text-gray-900">Email Reminders</div>
                <div className="text-sm text-gray-600">Send reminder emails to client email address</div>
              </div>
              {settings.send_email && <Check className="w-5 h-5 text-green-600" />}
            </label>

            {/* SMS Toggle */}
            <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.send_sms}
                onChange={(e) => setSettings({ ...settings, send_sms: e.target.checked })}
                className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
              />
              <MessageSquare className="w-5 h-5 text-gray-500 ml-3 mr-3" />
              <div className="flex-1">
                <div className="font-medium text-gray-900">SMS Reminders</div>
                <div className="text-sm text-gray-600">Send reminder SMS to client phone number</div>
              </div>
              {settings.send_sms && <Check className="w-5 h-5 text-green-600" />}
            </label>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Advanced Settings</h2>

          <div className="space-y-4">
            {/* Auto-resend on reschedule */}
            <label className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.auto_resend_on_reschedule}
                onChange={(e) => setSettings({ ...settings, auto_resend_on_reschedule: e.target.checked })}
                className="w-4 h-4 text-amber-600 rounded focus:ring-amber-500"
              />
              <RotateCw className="w-5 h-5 text-gray-500 ml-3 mr-3" />
              <div className="flex-1">
                <div className="font-medium text-gray-900">Auto-Resend on Reschedule</div>
                <div className="text-sm text-gray-600">Automatically send new reminders when appointment is rescheduled</div>
              </div>
            </label>

            {/* Max retries */}
            <div className="p-3 border border-gray-200 rounded-lg">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Maximum Retry Attempts
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={settings.max_retries}
                  onChange={(e) => setSettings({ ...settings, max_retries: Math.max(1, Math.min(10, parseInt(e.target.value) || 3)) })}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <span className="text-sm text-gray-600">attempts</span>
              </div>
              <p className="text-xs text-gray-500 mt-2">Number of times to retry failed reminders (1-10)</p>
            </div>
          </div>
        </div>

        {/* Test Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <TestTube className="w-5 h-5 text-blue-600" />
            Test Reminder
          </h2>

          <p className="text-sm text-gray-700 mb-4">Send a test reminder to verify your configuration is working correctly.</p>

          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Test Email Address</label>
              <input
                type="email"
                placeholder="you@example.com"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Test Phone (Optional)</label>
              <input
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={testPhone}
                onChange={(e) => setTestPhone(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <button
              onClick={handleSendTestReminder}
              disabled={sendingTest || !testEmail}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white rounded-lg font-medium transition flex items-center justify-center gap-2"
            >
              {sendingTest ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Sending...
                </>
              ) : (
                <>
                  <TestTube className="w-4 h-4" />
                  Send Test Reminder
                </>
              )}
            </button>
          </div>
        </div>

        {/* Save Button */}
        <div className="flex gap-3">
          <button
            onClick={handleSaveSettings}
            disabled={saving}
            className="px-6 py-2 bg-amber-600 hover:bg-amber-700 disabled:bg-gray-400 text-white rounded-lg font-medium transition flex items-center gap-2"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Check className="w-4 h-4" />
                Save Settings
              </>
            )}
          </button>

          <button
            onClick={() => window.history.back()}
            className="px-6 py-2 bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg font-medium transition"
          >
            Cancel
          </button>
        </div>

        {/* Information Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">ℹ️ How it Works</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>✓ Reminders are sent automatically via scheduled jobs every day</li>
            <li>✓ Only confirmed appointments receive reminders</li>
            <li>✓ Reminders are sent at the specified time before the appointment</li>
            <li>✓ The system tracks which reminders have been sent to avoid duplicates</li>
            <li>✓ Failed reminders are retried up to the specified number of times</li>
            <li>✓ On reschedule, reminders are cleared and new ones will be sent</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
