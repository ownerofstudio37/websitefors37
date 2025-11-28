import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { createLogger } from '@/lib/logger'

const log = createLogger('api/availability')

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const month = parseInt(searchParams.get('month') || String(new Date().getMonth() + 1))
    const year = parseInt(searchParams.get('year') || String(new Date().getFullYear()))
    const serviceType = searchParams.get('service') || 'all'

    // Use anon client for public read access (no cookies needed)
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
    
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new Error('Supabase configuration missing')
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Get start and end dates for the month
    const startDate = new Date(year, month - 1, 1)
    const endDate = new Date(year, month, 0)
    
    // Fetch appointments for this month
    let query = supabase
      .from('appointments')
      .select('appointment_date, service_type')
      .gte('appointment_date', startDate.toISOString().split('T')[0])
      .lte('appointment_date', endDate.toISOString().split('T')[0])

    if (serviceType !== 'all') {
      query = query.eq('service_type', serviceType)
    }

    const { data: appointments, error } = await query

    if (error) {
      log.error('Failed to fetch appointments', { error: error.message })
      throw error
    }

    // Count bookings per day
    const bookingsPerDay: Record<string, number> = {}
    appointments?.forEach(apt => {
      const dateKey = apt.appointment_date
      bookingsPerDay[dateKey] = (bookingsPerDay[dateKey] || 0) + 1
    })

    // Generate available dates for the month
    const availableDates = []
    const daysInMonth = endDate.getDate()
    const today = new Date()
    today.setHours(0, 0, 0, 0)

    let weekendCount = 0
    let bookedCount = Object.keys(bookingsPerDay).length

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month - 1, day)
      const dateStr = date.toISOString().split('T')[0]
      
      // Skip past dates
      if (date < today) continue

      const isWeekend = date.getDay() === 0 || date.getDay() === 6
      if (isWeekend) weekendCount++

      const bookings = bookingsPerDay[dateStr] || 0
      
      // Max sessions per day:
      // Weekends: 4 full photo sessions + consultation slots (12pm-11pm = 22 slots of 30min)
      // Weekdays: 1 full photo session + consultation slots (4:30pm-11pm = 13 slots of 30min)
      let maxSlots = isWeekend ? 4 : 1
      
      // Add consultation time slots
      // Weekends: 12pm to 11pm = 11 hours = 22 thirty-minute slots
      // Weekdays: 4:30pm to 11pm = 6.5 hours = 13 thirty-minute slots
      const consultationSlots = isWeekend ? 22 : 13
      maxSlots += consultationSlots
      
      const availableSlots = Math.max(0, maxSlots - bookings)
      
      // Determine urgency based on photo session availability (not consultation slots)
      // Focus on the primary booking slots for urgency calculation
      const photoSessionSlots = isWeekend ? 4 : 1
      const photoSessionsBooked = Math.min(bookings, photoSessionSlots)
      const photoSessionsAvailable = photoSessionSlots - photoSessionsBooked
      
      let urgency: 'low' | 'medium' | 'high' = 'low'
      if (photoSessionsAvailable === 0) {
        urgency = 'high' // All photo sessions booked (consultations may still be available)
      } else if (photoSessionsAvailable === 1 && photoSessionSlots > 1) {
        urgency = 'medium' // Last photo session slot
      } else if (availableSlots <= 5) {
        urgency = 'medium' // Running low on total availability
      }

      availableDates.push({
        date: dateStr,
        slots: availableSlots,
        urgency
      })
    }

    // Calculate remaining weekends with availability
    const weekendsLeft = availableDates.filter(d => {
      const date = new Date(d.date)
      const isWeekend = date.getDay() === 0 || date.getDay() === 6
      return isWeekend && d.slots > 0
    }).length

    // Find most booked month (for stats)
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ]

    return NextResponse.json({
      availableDates,
      bookedCount,
      urgentMonths: weekendsLeft <= 3 ? [monthNames[month - 1]] : [],
      stats: {
        weekendsLeft,
        mostBookedMonth: monthNames[month - 1] // Simplified; could analyze historical data
      }
    })

  } catch (error: any) {
    log.error('Availability check failed', {
      error: error?.message,
      stack: error?.stack
    })

    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    )
  }
}
