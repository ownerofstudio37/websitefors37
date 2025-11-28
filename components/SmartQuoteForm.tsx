'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, Users, DollarSign, MapPin, Camera, CheckCircle, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react'
import toast from 'react-hot-toast'

interface QuoteFormData {
  serviceType: string
  guestCount?: number
  eventDate?: string
  duration?: number
  location?: string
  budget?: string
  name: string
  email: string
  phone?: string
  additionalDetails?: string
}

interface PackageRecommendation {
  name: string
  price: string
  features: string[]
  bestFor: string
  confidence: number
}

export default function SmartQuoteForm() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState<Partial<QuoteFormData>>({})
  const [isGenerating, setIsGenerating] = useState(false)
  const [recommendation, setRecommendation] = useState<PackageRecommendation | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const totalSteps = 4

  const updateFormData = (field: keyof QuoteFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const nextStep = () => {
    if (step < totalSteps) setStep(step + 1)
  }

  const prevStep = () => {
    if (step > 1) setStep(step - 1)
  }

  const generateRecommendation = async () => {
    setIsGenerating(true)
    try {
      const response = await fetch('/api/quote/recommend', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })

      if (!response.ok) throw new Error('Failed to generate recommendation')

      const data = await response.json()
      setRecommendation(data.recommendation)
      nextStep()
    } catch (error) {
      toast.error('Unable to generate recommendation. Please try again.')
      console.error('Recommendation error:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          service_interest: formData.serviceType,
          budget_range: formData.budget,
          event_date: formData.eventDate,
          message: `Smart Quote Request:
Service: ${formData.serviceType}
Guests: ${formData.guestCount || 'N/A'}
Duration: ${formData.duration || 'N/A'} hours
Location: ${formData.location || 'N/A'}
Budget: ${formData.budget}
Recommended Package: ${recommendation?.name}

Additional Details: ${formData.additionalDetails || 'None'}`,
          source: 'smart-quote-generator'
        })
      })

      if (!response.ok) throw new Error('Failed to submit quote')

      toast.success('Quote request submitted! We\'ll contact you within 24 hours.')
      setStep(totalSteps)
    } catch (error) {
      toast.error('Submission failed. Please try again.')
      console.error('Submit error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-gray-600">Step {step} of {totalSteps}</span>
          <span className="text-sm text-gray-500">{Math.round((step / totalSteps) * 100)}% Complete</span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-primary-500 to-primary-600"
            initial={{ width: 0 }}
            animate={{ width: `${(step / totalSteps) * 100}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg p-8">
        <AnimatePresence mode="wait">
          {/* Step 1: Service Type */}
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <Camera className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-2">What type of session are you looking for?</h2>
                <p className="text-gray-600">Select the service that best fits your needs</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                {[
                  { value: 'wedding', label: 'Wedding Photography', icon: '💍', desc: 'Full wedding day coverage' },
                  { value: 'portrait', label: 'Portrait Session', icon: '👨‍👩‍👧‍👦', desc: 'Family, senior, or individual' },
                  { value: 'event', label: 'Event Photography', icon: '🎉', desc: 'Corporate or social events' },
                  { value: 'commercial', label: 'Commercial Shoot', icon: '🏢', desc: 'Business and product photography' }
                ].map((service) => (
                  <button
                    key={service.value}
                    onClick={() => {
                      updateFormData('serviceType', service.value)
                      nextStep()
                    }}
                    className={`p-6 rounded-lg border-2 transition-all hover:border-primary-500 hover:shadow-md text-left ${
                      formData.serviceType === service.value
                        ? 'border-primary-500 bg-primary-50'
                        : 'border-gray-200'
                    }`}
                  >
                    <div className="text-4xl mb-3">{service.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">{service.label}</h3>
                    <p className="text-sm text-gray-600">{service.desc}</p>
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Event Details */}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              <div className="text-center mb-8">
                <Calendar className="h-12 w-12 text-primary-600 mx-auto mb-4" />
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Tell us about your {formData.serviceType}</h2>
                <p className="text-gray-600">This helps us recommend the perfect package</p>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <Calendar className="inline h-4 w-4 mr-2" />
                    Event/Session Date
                  </label>
                  <input
                    type="date"
                    value={formData.eventDate || ''}
                    onChange={(e) => updateFormData('eventDate', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                {formData.serviceType === 'wedding' || formData.serviceType === 'event' ? (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      <Users className="inline h-4 w-4 mr-2" />
                      Expected Guest Count
                    </label>
                    <select
                      value={formData.guestCount || ''}
                      onChange={(e) => updateFormData('guestCount', parseInt(e.target.value))}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Select guest count</option>
                      <option value="25">Under 25 guests</option>
                      <option value="50">25-50 guests</option>
                      <option value="100">50-100 guests</option>
                      <option value="150">100-150 guests</option>
                      <option value="200">150+ guests</option>
                    </select>
                  </div>
                ) : null}

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Estimated Duration (hours)
                  </label>
                  <select
                    value={formData.duration || ''}
                    onChange={(e) => updateFormData('duration', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select duration</option>
                    <option value="1">1 hour</option>
                    <option value="2">2 hours</option>
                    <option value="4">4 hours</option>
                    <option value="6">6 hours</option>
                    <option value="8">8 hours (Full day)</option>
                    <option value="10">10+ hours</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <MapPin className="inline h-4 w-4 mr-2" />
                    Location
                  </label>
                  <input
                    type="text"
                    value={formData.location || ''}
                    onChange={(e) => updateFormData('location', e.target.value)}
                    placeholder="City or venue name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    <DollarSign className="inline h-4 w-4 mr-2" />
                    Budget Range
                  </label>
                  <select
                    value={formData.budget || ''}
                    onChange={(e) => updateFormData('budget', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  >
                    <option value="">Select your budget</option>
                    <option value="under-500">Under $500</option>
                    <option value="500-1000">$500 - $1,000</option>
                    <option value="1000-2000">$1,000 - $2,000</option>
                    <option value="2000-3500">$2,000 - $3,500</option>
                    <option value="3500-plus">$3,500+</option>
                  </select>
                </div>
              </div>

              <div className="flex gap-4 justify-between pt-6">
                <button
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <button
                  onClick={generateRecommendation}
                  disabled={isGenerating || !formData.budget}
                  className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                      Generating...
                    </>
                  ) : (
                    <>
                      Get My Quote
                      <Sparkles className="h-4 w-4" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: AI Recommendation */}
          {step === 3 && recommendation && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-primary-500 to-primary-600 rounded-full mb-4">
                  <Sparkles className="h-8 w-8 text-white" />
                </div>
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Perfect Match Found!</h2>
                <p className="text-gray-600">Based on your needs, we recommend:</p>
              </div>

              <div className="bg-gradient-to-br from-primary-50 to-blue-50 rounded-xl p-8 mb-8 border-2 border-primary-200">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-1">{recommendation.name}</h3>
                    <p className="text-sm text-primary-700 font-medium">{recommendation.bestFor}</p>
                  </div>
                  <div className="text-right">
                    <div className="text-3xl font-bold text-primary-600">{recommendation.price}</div>
                    <div className="text-sm text-gray-600">Starting price</div>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  {recommendation.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="bg-white/60 rounded-lg p-4">
                  <div className="flex items-center gap-2 text-sm text-gray-700">
                    <div className="flex-1 bg-gray-200 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-green-500 to-primary-600 h-full"
                        style={{ width: `${recommendation.confidence}%` }}
                      />
                    </div>
                    <span className="font-semibold">{recommendation.confidence}% Match</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => updateFormData('name', e.target.value)}
                    placeholder="Your full name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => updateFormData('email', e.target.value)}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone (Optional)</label>
                  <input
                    type="tel"
                    value={formData.phone || ''}
                    onChange={(e) => updateFormData('phone', e.target.value)}
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Additional Details</label>
                  <textarea
                    value={formData.additionalDetails || ''}
                    onChange={(e) => updateFormData('additionalDetails', e.target.value)}
                    rows={4}
                    placeholder="Any special requests or questions?"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                  />
                </div>
              </div>

              <div className="flex gap-4 justify-between">
                <button
                  onClick={prevStep}
                  className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors flex items-center gap-2"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting || !formData.name || !formData.email}
                  className="px-8 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg hover:from-primary-700 hover:to-primary-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold"
                >
                  {isSubmitting ? 'Submitting...' : 'Book Consultation'}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Success */}
          {step === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="text-center py-12"
            >
              <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6">
                <CheckCircle className="h-12 w-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Quote Request Submitted!</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Thank you for choosing Studio37! We've received your quote request and will reach out within 24 hours to discuss your {formData.serviceType} photography needs.
              </p>
              <div className="bg-primary-50 rounded-lg p-6 max-w-md mx-auto">
                <h3 className="font-semibold text-gray-900 mb-2">What happens next?</h3>
                <ul className="text-sm text-gray-700 space-y-2 text-left">
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
                    <span>We'll review your requirements</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
                    <span>Prepare a detailed quote with options</span>
                  </li>
                  <li className="flex gap-2">
                    <CheckCircle className="h-5 w-5 text-primary-600 flex-shrink-0" />
                    <span>Schedule a call to discuss your vision</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
