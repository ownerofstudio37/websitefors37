'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { Check, AlertCircle, Loader2 } from 'lucide-react'
import ThankYouWithSMS from './ThankYouWithSMS'

const leadSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Please enter a valid email'),
  phone: z.string().optional(),
  service_interest: z.string().min(1, 'Please select a service'),
  budget_range: z.string().optional(),
  event_date: z.string().optional(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type LeadFormData = z.infer<typeof leadSchema>

export default function LeadCaptureForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showThankYou, setShowThankYou] = useState(false)
  const [validFieldsSet, setValidFieldsSet] = useState<Set<string>>(new Set())

  const {
    register,
    handleSubmit,
    reset,
    watch,
    trigger,
    formState: { errors, isValidating },
  } = useForm<LeadFormData>({
    resolver: zodResolver(leadSchema),
    mode: 'onBlur',
  })

  const watchedFields = watch()

  // Track valid fields for inline success indicators
  const handleFieldBlur = async (fieldName: keyof LeadFormData) => {
    const isValid = await trigger(fieldName)
    if (isValid) {
      setValidFieldsSet(prev => new Set([...prev, fieldName]))
    } else {
      setValidFieldsSet(prev => {
        const updated = new Set(prev)
        updated.delete(fieldName)
        return updated
      })
    }
  }

  const onSubmit = async (data: LeadFormData) => {
    setIsSubmitting(true)
    
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, source: 'web-form' })
      })

      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        throw new Error(body?.error || 'Submission failed')
      }

      toast.success('✨ Thank you! We\'ll be in touch soon.', {
        duration: 4,
        icon: '✨',
      })
      setShowThankYou(true)
      setValidFieldsSet(new Set())
      reset()
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Something went wrong. Please try again.')
      console.error('Error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  // Show thank you page with SMS signup after successful submission
  if (showThankYou) {
    return <ThankYouWithSMS />
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-lg">
      <form
        name="contact"
        method="POST"
          // ...no Netlify attributes...
        onSubmit={handleSubmit(async (data, event) => {
          await onSubmit(data)
          // Let browser submit to Netlify after Supabase
          if (event?.target) {
            setTimeout(() => {
              (event.target as HTMLFormElement).submit()
            }, 100)
          }
        })}
        className="space-y-6"
      >
        {/* Netlify hidden fields */}
          {/* ...no Netlify hidden fields... */}
        <input type="hidden" name="bot-field" />
  <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="name-input" className="block text-sm font-medium text-gray-700 mb-2">
              Full Name *
            </label>
            <div className="relative">
              <input
                {...register('name')}
                id="name-input"
                aria-invalid={!!errors.name || undefined}
                aria-required="true"
                onBlur={() => handleFieldBlur('name')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition ${
                  errors.name ? 'border-red-300 focus:ring-red-500' : 
                  validFieldsSet.has('name') ? 'border-green-300 focus:ring-green-500 bg-green-50' :
                  'border-gray-300 focus:ring-primary-500'
                }`}
                placeholder="Your full name"
              />
              {validFieldsSet.has('name') && !errors.name && (
                <Check className="absolute right-3 top-3.5 w-5 h-5 text-green-600" />
              )}
              {errors.name && (
                <AlertCircle className="absolute right-3 top-3.5 w-5 h-5 text-red-600" />
              )}
            </div>
            {errors.name && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1" id="name-error" role="alert">
                <AlertCircle className="w-4 h-4" /> {errors.name.message}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="email-input" className="block text-sm font-medium text-gray-700 mb-2">
              Email Address *
            </label>
            <div className="relative">
              <input
                {...register('email')}
                id="email-input"
                type="email"
                aria-invalid={!!errors.email || undefined}
                aria-required="true"
                onBlur={() => handleFieldBlur('email')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition ${
                  errors.email ? 'border-red-300 focus:ring-red-500' : 
                  validFieldsSet.has('email') ? 'border-green-300 focus:ring-green-500 bg-green-50' :
                  'border-gray-300 focus:ring-primary-500'
                }`}
                placeholder="your@email.com"
              />
              {validFieldsSet.has('email') && !errors.email && (
                <Check className="absolute right-3 top-3.5 w-5 h-5 text-green-600" />
              )}
              {errors.email && (
                <AlertCircle className="absolute right-3 top-3.5 w-5 h-5 text-red-600" />
              )}
            </div>
            {errors.email && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1" id="email-error" role="alert">
                <AlertCircle className="w-4 h-4" /> {errors.email.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="phone-input" className="block text-sm font-medium text-gray-700 mb-2">
              Phone Number
            </label>
            <input
              {...register('phone')}
              id="phone-input"
              type="tel"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              placeholder="(555) 123-4567"
            />
          </div>

          <div>
            <label htmlFor="service-select" className="block text-sm font-medium text-gray-700 mb-2">
              Service Interest *
            </label>
            <div className="relative">
              <select
                {...register('service_interest')}
                id="service-select"
                aria-invalid={!!errors.service_interest || undefined}
                aria-required="true"
                onBlur={() => handleFieldBlur('service_interest')}
                className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition ${
                  errors.service_interest ? 'border-red-300 focus:ring-red-500' : 
                  validFieldsSet.has('service_interest') ? 'border-green-300 focus:ring-green-500 bg-green-50' :
                  'border-gray-300 focus:ring-primary-500'
                }`}
              >
                <option value="">Select a service</option>
                <option value="wedding">Wedding Photography</option>
                <option value="portrait">Portrait Session</option>
                <option value="event">Event Photography</option>
                <option value="commercial">Commercial Photography</option>
                <option value="other">Other</option>
              </select>
              {validFieldsSet.has('service_interest') && !errors.service_interest && (
                <Check className="absolute right-3 top-3.5 w-5 h-5 text-green-600" />
              )}
              {errors.service_interest && (
                <AlertCircle className="absolute right-3 top-3.5 w-5 h-5 text-red-600" />
              )}
            </div>
            {errors.service_interest && (
              <p className="text-red-500 text-sm mt-1 flex items-center gap-1" id="service-error" role="alert">
                <AlertCircle className="w-4 h-4" /> {errors.service_interest.message}
              </p>
            )}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="budget-select" className="block text-sm font-medium text-gray-700 mb-2">
              Package Interest <span className="text-gray-400 text-xs">(Optional)</span>
            </label>
            <select
              {...register('budget_range')}
              id="budget-select"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            >
              <option value="">Select a package</option>
              <option value="custom">Custom Package</option>
            </select>
          </div>

          <div>
            <label htmlFor="date-input" className="block text-sm font-medium text-gray-700 mb-2">
              Event Date
            </label>
            <input
              {...register('event_date')}
              id="date-input"
              type="date"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            />
          </div>
        </div>

        <div>
          <label htmlFor="message-textarea" className="block text-sm font-medium text-gray-700 mb-2">
            Message *
          </label>
          <div className="relative">
            <textarea
              {...register('message')}
              id="message-textarea"
              rows={4}
              aria-invalid={!!errors.message || undefined}
              aria-required="true"
              onBlur={() => handleFieldBlur('message')}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition resize-none ${
                errors.message ? 'border-red-300 focus:ring-red-500' : 
                validFieldsSet.has('message') ? 'border-green-300 focus:ring-green-500 bg-green-50' :
                'border-gray-300 focus:ring-primary-500'
              }`}
              placeholder="Tell us about your photography needs..."
            />
            <div className="absolute bottom-2 right-2 text-xs text-gray-500">
              {watchedFields.message?.length || 0}/100
            </div>
          </div>
          {errors.message && (
            <p className="text-red-500 text-sm mt-1 flex items-center gap-1" id="message-error" role="alert">
              <AlertCircle className="w-4 h-4" /> {errors.message.message}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isValidating}
          aria-busy={isSubmitting || undefined}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Sending...
            </>
          ) : (
            <>
              <Check className="w-4 h-4" />
              Get Your Quote
            </>
          )}
        </button>
      </form>
    </div>
  )
}
