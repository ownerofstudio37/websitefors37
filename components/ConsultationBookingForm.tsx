'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar as CalendarIcon, Clock, ArrowRight, ArrowLeft, CheckCircle2, Phone, Mail, User, MessageSquare } from 'lucide-react'
import toast from 'react-hot-toast'

interface TimeSlot {
  time: string
  available: boolean
}

interface AvailableDate {
  date: string
  slots: number
  urgency: 'low' | 'medium' | 'high'
  booked: number
}

const ConsultationBookingForm = () => {
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  // Form data
  const [selectedDate, setSelectedDate] = useState<string>('')
  const [selectedTime, setSelectedTime] = useState<string>('')
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  })
  
  // Calendar state
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [availability, setAvailability] = useState<AvailableDate[]>([])
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([])
  const [isLoadingSlots, setIsLoadingSlots] = useState(false)

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  // Fetch availability for selected month
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        // API expects month 1-12, but selectedMonth is 0-11
        const apiMonth = selectedMonth + 1
        const response = await fetch(`/api/availability?month=${apiMonth}&year=${selectedYear}`)
        if (response.ok) {
          const data = await response.json()
          setAvailability(data.dates || [])
        }
      } catch (error) {
        console.error('Failed to fetch availability:', error)
      }
    }
    fetchAvailability()
  }, [selectedMonth, selectedYear])

  // Generate time slots when date is selected
  useEffect(() => {
    if (selectedDate) {
      generateTimeSlots(selectedDate)
    }
  }, [selectedDate])

  const generateTimeSlots = async (dateStr: string) => {
    setIsLoadingSlots(true)
    
    try {
      // Fetch available slots from API
      const response = await fetch(`/api/consultation/book?date=${dateStr}`)
      
      if (response.ok) {
        const data = await response.json()
        const slots: TimeSlot[] = data.availableSlots.map((time: string) => ({
          time,
          available: true
        }))
        setTimeSlots(slots)
      } else {
        // Fallback: generate slots client-side (10am to 10pm, 30-min intervals)
        const slots: TimeSlot[] = []
        for (let hour = 10; hour < 22; hour += 0.5) {
          const h = Math.floor(hour)
          const m = (hour % 1) * 60
          const displayHour = h > 12 ? h - 12 : h === 0 ? 12 : h
          const ampm = h >= 12 ? 'PM' : 'AM'
          const displayTime = `${displayHour}:${m.toString().padStart(2, '0')} ${ampm}`
          
          slots.push({
            time: displayTime,
            available: true
          })
        }
        setTimeSlots(slots)
      }
    } catch (error) {
      console.error('Failed to fetch time slots:', error)
      toast.error('Failed to load available times')
    } finally {
      setIsLoadingSlots(false)
    }
  }

  const changeMonth = (delta: number) => {
    let newMonth = selectedMonth + delta
    let newYear = selectedYear
    
    if (newMonth > 11) {
      newMonth = 0
      newYear++
    } else if (newMonth < 0) {
      newMonth = 11
      newYear--
    }
    
    setSelectedMonth(newMonth)
    setSelectedYear(newYear)
  }

  const renderCalendar = () => {
    const firstDay = new Date(selectedYear, selectedMonth, 1).getDay()
    const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate()
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    
    const days = []
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />)
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${selectedYear}-${(selectedMonth + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`
      const currentDate = new Date(selectedYear, selectedMonth, day)
      const isPast = currentDate < today
      const isToday = currentDate.getTime() === today.getTime()
      const isSelected = selectedDate === dateStr
      
      const availableDate = availability.find(d => d.date === dateStr)
      const isWeekend = currentDate.getDay() === 0 || currentDate.getDay() === 6
      
      let bgColor = 'bg-white hover:bg-gray-50'
      let textColor = 'text-gray-400'
      let borderColor = 'border-gray-200'
      let cursor = 'cursor-not-allowed'
      
      // Allow selection of all future dates (not just those in availability data)
      if (!isPast) {
        cursor = 'cursor-pointer'
        bgColor = 'bg-green-50 hover:bg-green-100'
        borderColor = 'border-green-300'
        textColor = 'text-green-700'
      }
      
      if (isSelected) {
        bgColor = 'bg-primary-600'
        textColor = 'text-white'
        borderColor = 'border-primary-600'
      }
      
      if (isPast) {
        bgColor = 'bg-gray-50'
        textColor = 'text-gray-300'
      }
      
      days.push(
        <button
          key={day}
          disabled={isPast}
          onClick={() => {
            if (!isPast) {
              setSelectedDate(dateStr)
            }
          }}
          className={`p-2 border ${borderColor} ${bgColor} ${cursor} rounded-lg transition-all relative min-h-[50px] ${
            isSelected ? 'ring-2 ring-primary-600 ring-offset-2' : ''
          }`}
        >
          <div className={`text-sm font-semibold ${textColor}`}>{day}</div>
          {isWeekend && !isPast && (
            <div className="absolute top-1 right-1">
              <div className="w-1.5 h-1.5 bg-primary-500 rounded-full" />
            </div>
          )}
          {isToday && (
            <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2">
              <div className="w-1 h-1 bg-primary-600 rounded-full" />
            </div>
          )}
        </button>
      )
    }
    
    return days
  }

  const handleSubmit = async () => {
    if (!selectedDate || !selectedTime || !formData.name || !formData.email || !formData.phone) {
      toast.error('Please fill in all required fields')
      return
    }
    
    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/consultation/book', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          date: selectedDate,
          time: selectedTime,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          notes: formData.notes
        })
      })
      
      if (response.ok) {
        toast.success('Consultation booked! Check your email for confirmation.')
        setStep(4) // Success step
      } else {
        const error = await response.json()
        toast.error(error.message || 'Failed to book consultation')
      }
    } catch (error) {
      console.error('Booking error:', error)
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Progress Steps */}
      <div className="mb-8">
        <div className="flex items-center justify-between relative">
          <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
            <div
              className="h-full bg-primary-600 transition-all duration-500"
              style={{ width: `${((step - 1) / 3) * 100}%` }}
            />
          </div>
          
          {[1, 2, 3].map((s) => (
            <div key={s} className="relative z-10 flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all ${
                  step >= s
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-200 text-gray-400'
                }`}
              >
                {step > s ? <CheckCircle2 className="h-5 w-5" /> : s}
              </div>
              <div className="mt-2 text-xs font-medium text-gray-600 text-center">
                {s === 1 && 'Select Date'}
                {s === 2 && 'Pick Time'}
                {s === 3 && 'Your Info'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <CalendarIcon className="h-6 w-6 text-primary-600" />
              Choose Your Date
            </h2>
            <p className="text-gray-600 mb-6">
              Select a convenient date for your 15-minute consultation call
            </p>

            {/* Month Navigation */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => changeMonth(-1)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                ← Prev
              </button>
              <h3 className="text-lg font-semibold text-gray-900">
                {monthNames[selectedMonth]} {selectedYear}
              </h3>
              <button
                onClick={() => changeMonth(1)}
                className="px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
              >
                Next →
              </button>
            </div>

            {/* Calendar Grid */}
            <div className="mb-4">
              <div className="grid grid-cols-7 gap-2 mb-2">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="text-center text-xs font-semibold text-gray-600 py-2">
                    {day}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-2">
                {renderCalendar()}
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={() => setStep(2)}
                disabled={!selectedDate}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold"
              >
                Next: Choose Time <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2 flex items-center gap-2">
              <Clock className="h-6 w-6 text-primary-600" />
              Pick Your Time
            </h2>
            <p className="text-gray-600 mb-6">
              Available times on {new Date(selectedDate + 'T12:00:00').toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>

            {isLoadingSlots ? (
              <div className="flex items-center justify-center py-12">
                <div className="animate-spin h-8 w-8 border-4 border-primary-600 border-t-transparent rounded-full" />
              </div>
            ) : (
              <>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3 mb-6 max-h-96 overflow-y-auto">
                  {timeSlots.map((slot) => (
                    <button
                      key={slot.time}
                      onClick={() => setSelectedTime(slot.time)}
                      disabled={!slot.available}
                      className={`p-3 rounded-lg border-2 transition-all font-medium text-sm ${
                        selectedTime === slot.time
                          ? 'bg-primary-600 text-white border-primary-600'
                          : slot.available
                          ? 'bg-white text-gray-700 border-gray-200 hover:border-primary-600'
                          : 'bg-gray-50 text-gray-400 border-gray-200 cursor-not-allowed'
                      }`}
                    >
                      {slot.time}
                    </button>
                  ))}
                </div>

                <div className="flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 font-semibold"
                  >
                    <ArrowLeft className="h-4 w-4" /> Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    disabled={!selectedTime}
                    className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold"
                  >
                    Next: Your Info <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Your Contact Information
            </h2>
            <p className="text-gray-600 mb-6">
              We'll use this to send you a confirmation and calendar invite
            </p>

            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <User className="inline h-4 w-4 mr-1" />
                  Full Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  placeholder="John Smith"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Mail className="inline h-4 w-4 mr-1" />
                  Email Address *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  placeholder="john@example.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <Phone className="inline h-4 w-4 mr-1" />
                  Phone Number *
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  placeholder="(555) 123-4567"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  <MessageSquare className="inline h-4 w-4 mr-1" />
                  What would you like to discuss? (optional)
                </label>
                <textarea
                  value={formData.notes}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-600 focus:border-transparent"
                  rows={3}
                  placeholder="Tell us about your photography needs..."
                />
              </div>
            </div>

            {/* Summary */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-gray-900 mb-2">Consultation Summary</h3>
              <div className="space-y-1 text-sm text-gray-600">
                <div>📅 {new Date(selectedDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</div>
                <div>🕐 {selectedTime} CST</div>
                <div>⏱️ Duration: 15 minutes</div>
                <div>💰 Cost: FREE</div>
              </div>
            </div>

            <div className="flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2 font-semibold"
              >
                <ArrowLeft className="h-4 w-4" /> Back
              </button>
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || !formData.name || !formData.email || !formData.phone}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 font-semibold"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full" />
                    Booking...
                  </>
                ) : (
                  <>
                    Confirm Booking <CheckCircle2 className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-xl shadow-lg p-8 text-center"
          >
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="h-8 w-8 text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Consultation Booked! 🎉
            </h2>
            <p className="text-gray-600 mb-6">
              We've sent a confirmation email to <strong>{formData.email}</strong> with calendar invite and call details.
            </p>
            
            <div className="bg-primary-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-2">What's Next?</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li>✅ Check your email for the calendar invite</li>
                <li>✅ Add it to your calendar so you don't forget</li>
                <li>✅ We'll call you at {selectedTime} CST on {new Date(selectedDate).toLocaleDateString()}</li>
                <li>✅ Have any questions ready - we're here to help!</li>
              </ul>
            </div>

            <div className="flex gap-4 justify-center">
              <button
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
              >
                Back to Home
              </button>
              <button
                onClick={() => window.location.href = '/get-quote'}
                className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-semibold"
              >
                Get a Quote
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default ConsultationBookingForm
