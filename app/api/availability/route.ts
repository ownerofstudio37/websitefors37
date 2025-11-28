import { NextRequest, NextResponse } from 'next/server'
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { createLogger } from '@/lib/logger'

const log = createLogger('api/availability')

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const month = parseInt(searchParams.get('month') || String(new Date().getMonth() + 1))
    const year = parseInt(searchParams.get('year') || String(new Date().getFullYear()))
    const serviceType = searchParams.get('service') || 'all'

    const supabase = createServerComponentClient({ cookies })

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
      
      // Assume max 2 sessions per day (can be adjusted)
      const maxSlots = isWeekend ? 2 : 1
      const availableSlots = Math.max(0, maxSlots - bookings)
      
      // Determine urgency
      let urgency: 'low' | 'medium' | 'high' = 'low'
      if (availableSlots === 1 && maxSlots === 2) {
        urgency = 'medium'
      } else if (availableSlots === 1 && maxSlots === 1) {
        urgency = 'high'
      } else if (availableSlots === 0) {
        urgency = 'high'
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
