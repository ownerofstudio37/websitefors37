'use client'

import React, { useState, useEffect } from 'react'
import { Calendar as CalendarIcon, Clock, AlertCircle, CheckCircle2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface AvailableDate {
  date: string
  slots: number
  urgency: 'low' | 'medium' | 'high'
}

interface AvailabilityData {
  availableDates: AvailableDate[]
  bookedCount: number
  urgentMonths: string[]
  stats: {
    weekendsLeft: number
    mostBookedMonth: string
  }
}

export default function AvailabilityCalendar({ serviceType = 'all' }: { serviceType?: string }) {
  const [availability, setAvailability] = useState<AvailabilityData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  useEffect(() => {
    fetchAvailability()
  }, [selectedMonth, selectedYear, serviceType])

  const fetchAvailability = async () => {
    setIsLoading(true)
    try {
      const response = await fetch(
        `/api/availability?month=${selectedMonth + 1}&year=${selectedYear}&service=${serviceType}`
      )
      
      if (!response.ok) throw new Error('Failed to fetch availability')
      
      const data = await response.json()
      setAvailability(data)
    } catch (error) {
      toast.error('Unable to load availability')
      console.error('Availability error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const getDaysInMonth = (month: number, year: number) => {
    return new Date(year, month + 1, 0).getDate()
  }

  const getFirstDayOfMonth = (month: number, year: number) => {
    return new Date(year, month, 1).getDay()
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(selectedMonth, selectedYear)
    const firstDay = getFirstDayOfMonth(selectedMonth, selectedYear)
    const days = []
    
    // Empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="p-2" />)
    }
    
    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
      const dateStr = `${selectedYear}-${String(selectedMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`
      const availableDate = availability?.availableDates.find(d => d.date === dateStr)
      const isPast = new Date(dateStr) < new Date()
      const isWeekend = new Date(dateStr).getDay() === 0 || new Date(dateStr).getDay() === 6
      
      let bgColor = 'bg-white'
      let textColor = 'text-gray-400'
      let borderColor = 'border-gray-200'
      
      if (!isPast && availableDate) {
        if (availableDate.urgency === 'high') {
          bgColor = 'bg-red-50 hover:bg-red-100'
          borderColor = 'border-red-300'
          textColor = 'text-red-700 font-semibold'
        } else if (availableDate.urgency === 'medium') {
          bgColor = 'bg-yellow-50 hover:bg-yellow-100'
          borderColor = 'border-yellow-300'
          textColor = 'text-yellow-700 font-medium'
        } else {
          bgColor = 'bg-green-50 hover:bg-green-100'
          borderColor = 'border-green-300'
          textColor = 'text-green-700'
        }
      } else if (isPast) {
        bgColor = 'bg-gray-50'
        textColor = 'text-gray-300'
      }
      
      days.push(
        <div
          key={day}
          className={`p-2 border ${borderColor} ${bgColor} ${
            !isPast && availableDate ? 'cursor-pointer' : 'cursor-default'
          } rounded-lg transition-all relative min-h-[60px]`}
          onClick={() => {
            if (!isPast && availableDate) {
              toast.success(`Selected ${dateStr}. Contact us to book!`)
            }
          }}
        >
          <div className={`text-sm ${textColor}`}>{day}</div>
          {isWeekend && !isPast && (
            <div className="absolute top-1 right-1">
              <div className="w-2 h-2 bg-primary-500 rounded-full" title="Weekend" />
            </div>
          )}
          {availableDate && !isPast && (
            <div className="mt-1">
              <div className="text-xs text-gray-600">
                {availableDate.slots > 0 ? (
                  <span className="flex items-center gap-1">
                    <CheckCircle2 className="h-3 w-3" />
                    {availableDate.slots === 1 ? 'Last slot' : `${availableDate.slots} slots`}
                  </span>
                ) : (
                  <span className="text-red-600 text-[10px]">Fully booked</span>
                )}
              </div>
            </div>
          )}
        </div>
      )
    }
    
    return days
  }

  const changeMonth = (delta: number) => {
    let newMonth = selectedMonth + delta
    let newYear = selectedYear
    
    if (newMonth < 0) {
      newMonth = 11
      newYear--
    } else if (newMonth > 11) {
      newMonth = 0
      newYear++
    }
    
    setSelectedMonth(newMonth)
    setSelectedYear(newYear)
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <CalendarIcon className="h-6 w-6 text-primary-600" />
            Check Availability
          </h2>
          <p className="text-sm text-gray-600 mt-1">Find your perfect date</p>
        </div>
        
        {availability && (
          <div className="text-right">
            <div className="text-2xl font-bold text-primary-600">{availability.bookedCount}</div>
            <div className="text-xs text-gray-600">sessions this month</div>
          </div>
        )}
      </div>

      {/* Urgency Banner */}
      {availability && availability.stats.weekendsLeft <= 3 && (
        <div className="mb-4 bg-gradient-to-r from-orange-50 to-red-50 border border-orange-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <AlertCircle className="h-5 w-5 text-orange-600 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-orange-900 mb-1">
                Only {availability.stats.weekendsLeft} weekends left in {monthNames[selectedMonth]}!
              </h3>
              <p className="text-sm text-orange-800">
                Popular dates are filling fast. Book now to secure your preferred date.
              </p>
            </div>
          </div>
        </div>
      )}

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

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mb-4 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-50 border border-green-300 rounded" />
          <span className="text-gray-600">Available</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-yellow-50 border border-yellow-300 rounded" />
          <span className="text-gray-600">Limited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-50 border border-red-300 rounded" />
          <span className="text-gray-600">Almost full</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-primary-500 rounded-full" />
          <span className="text-gray-600">Weekend</span>
        </div>
      </div>

      {/* Calendar Grid */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin h-8 w-8 border-4 border-primary-600 border-t-transparent rounded-full" />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-7 gap-2 mb-2">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
              <div key={day} className="text-center text-sm font-semibold text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-2">
            {renderCalendar()}
          </div>
        </>
      )}

      {/* CTA */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="bg-primary-50 rounded-lg p-4 flex items-center justify-between">
          <div>
            <h4 className="font-semibold text-gray-900 mb-1">Ready to book?</h4>
            <p className="text-sm text-gray-600">Contact us to secure your date</p>
          </div>
          <a
            href="/contact"
            className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            Book Now
          </a>
        </div>
      </div>
    </div>
  )
}
