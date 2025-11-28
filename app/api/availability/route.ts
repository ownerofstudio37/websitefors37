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
      .select('appointment_date, service_type, booking_type')
      .gte('appointment_date', startDate.toISOString().split('T')[0])
      .lte('appointment_date', endDate.toISOString().split('T')[0])
      .eq('status', 'confirmed')

    if (serviceType !== 'all') {
      query = query.eq('service_type', serviceType)
    }

    const { data: appointments, error } = await query

    if (error) {
      log.error('Failed to fetch appointments', { error: error.message })
      throw error
    }

    // Count bookings per day, separated by type
    const bookingsPerDay: Record<string, { photo: number; consultation: number; total: number }> = {}
    appointments?.forEach(apt => {
      const dateKey = apt.appointment_date
      if (!bookingsPerDay[dateKey]) {
        bookingsPerDay[dateKey] = { photo: 0, consultation: 0, total: 0 }
      }
      
      if (apt.booking_type === 'consultation') {
        bookingsPerDay[dateKey].consultation++
      } else {
        bookingsPerDay[dateKey].photo++
      }
      bookingsPerDay[dateKey].total++
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

      const dayBookings = bookingsPerDay[dateStr] || { photo: 0, consultation: 0, total: 0 }
      
      // Max photo sessions per day
      const maxPhotoSessions = isWeekend ? 4 : 1
      
      // Max consultation slots per day
      // Weekends: 12pm to 11pm = 11 hours = 22 thirty-minute slots
      // Weekdays: 4:30pm to 11pm = 6.5 hours = 13 thirty-minute slots
      const maxConsultationSlots = isWeekend ? 22 : 13
      
      // Calculate available slots for each type
      const availablePhotoSessions = Math.max(0, maxPhotoSessions - dayBookings.photo)
      const availableConsultationSlots = Math.max(0, maxConsultationSlots - dayBookings.consultation)
      
      // Total available slots
      const availableSlots = availablePhotoSessions + availableConsultationSlots
      
      // Determine urgency based on photo session availability (not consultation slots)
      let urgency: 'low' | 'medium' | 'high' = 'low'
      if (availablePhotoSessions === 0) {
        urgency = 'high' // All photo sessions booked (consultations may still be available)
      } else if (availablePhotoSessions === 1 && maxPhotoSessions > 1) {
        urgency = 'medium' // Last photo session slot
      } else if (availableSlots <= 5) {
        urgency = 'medium' // Running low on total availability
      }

      availableDates.push({
        date: dateStr,
        slots: availableSlots,
        photoSessions: availablePhotoSessions,
        consultationSlots: availableConsultationSlots,
        booked: dayBookings.total,
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
      dates: availableDates,
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
