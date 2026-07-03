import { useQuery } from '@tanstack/react-query'
import { supabase } from '@/lib/supabase'

function startOfToday() {
  const date = new Date()
  date.setHours(0, 0, 0, 0)
  return date
}

function daysAgo(days: number) {
  const date = new Date()
  date.setDate(date.getDate() - days)
  return date
}

function daysFromNow(days: number) {
  const date = new Date()
  date.setDate(date.getDate() + days)
  return date
}

export interface DashboardStats {
  totalLeads: number
  totalRevenue: number
  totalBookings: number
  todayOps: {
    newLeadsToday: number
    staleLeads: number
    followUpsDue: number
    upcomingAppointments: number
    portfolioDrafts: number
    quotesStarted: number
    leadProjects: number
    galleryDeliveryTasks: number
  }
  leadsByStatus: {
    new: number
    contacted: number
    qualified: number
    converted: number
    'closed-won': number
    'closed-lost': number
  }
  recentLeads: Array<{
    id: string
    name: string
    email: string
    service_interest: string
    status: string
    created_at: string
  }>
  recentBookings: Array<{
    id: string
    client_name: string
    session_type: string
    session_date: string
    total_amount: number
    status: string
  }>
}

export function useDashboardData() {
  const fetchDashboardData = async (): Promise<DashboardStats> => {
    try {

      // Fetch all data in parallel for better performance
      const [
        { count: totalLeadsCount, error: leadsError },
        { data: allLeadStatuses, error: leadStatusesError },
        { data: appointmentRevenueRows, count: totalBookingsCount, error: appointmentsError },
        { data: recentLeadsData, error: recentLeadsError },
        { data: recentAppointmentsData, error: recentAppointmentsError },
        { count: newLeadsTodayCount, error: newLeadsTodayError },
        { count: staleLeadsCount, error: staleLeadsError },
        { count: followUpsDueCount, error: followUpsDueError },
        { count: upcomingAppointmentsCount, error: upcomingAppointmentsError },
        { count: portfolioDraftsCount, error: portfolioDraftsError },
        { count: quotesStartedCount, error: quotesStartedError },
        { count: leadProjectsCount, error: leadProjectsError },
        { count: galleryDeliveryTasksCount, error: galleryDeliveryTasksError }
      ] = await Promise.all([
        // Total leads count
        supabase
          .from('leads')
          .select('id', { count: 'exact', head: true }),

        // Lead statuses for pipeline counts
        supabase
          .from('leads')
          .select('status'),
        
        // Total appointments and revenue
        supabase
          .from('appointments')
          .select('price_cents, status', { count: 'exact' }),
        
        // Recent leads (last 5)
        supabase
          .from('leads')
          .select('id, name, email, service_interest, status, created_at')
          .order('created_at', { ascending: false })
          .limit(5),
        
        // Recent appointments (last 5)
        supabase
          .from('appointments')
          .select('id, name, type, package_name, start_time, price_cents, status')
          .order('start_time', { ascending: false })
          .limit(5),

        supabase
          .from('leads')
          .select('id', { count: 'exact', head: true })
          .gte('created_at', startOfToday().toISOString()),

        supabase
          .from('leads')
          .select('id', { count: 'exact', head: true })
          .in('status', ['new', 'contacted'])
          .lte('created_at', daysAgo(2).toISOString()),

        supabase
          .from('lead_follow_ups')
          .select('id', { count: 'exact', head: true })
          .eq('status', 'pending')
          .lte('scheduled_for', new Date().toISOString()),

        supabase
          .from('appointments')
          .select('id', { count: 'exact', head: true })
          .in('status', ['pending', 'confirmed', 'scheduled'])
          .gte('start_time', new Date().toISOString())
          .lte('start_time', daysFromNow(7).toISOString()),

        supabase
          .from('communication_logs')
          .select('id', { count: 'exact', head: true })
          .ilike('content', '%Portfolio workflow prepared%'),

        supabase
          .from('communication_logs')
          .select('id', { count: 'exact', head: true })
          .ilike('content', '%quote email%'),

        supabase
          .from('communication_logs')
          .select('id', { count: 'exact', head: true })
          .ilike('content', '%project creation%'),

        supabase
          .from('client_galleries')
          .select('id', { count: 'exact', head: true })
          .eq('total_photos', 0)
      ])

      // Handle errors
      if (leadsError) throw new Error(`Leads fetch failed: ${leadsError.message}`)
      if (leadStatusesError) throw new Error(`Lead statuses fetch failed: ${leadStatusesError.message}`)
      if (appointmentsError) throw new Error(`Appointments fetch failed: ${appointmentsError.message}`)
      if (recentLeadsError) throw new Error(`Recent leads fetch failed: ${recentLeadsError.message}`)
      if (recentAppointmentsError) throw new Error(`Recent appointments fetch failed: ${recentAppointmentsError.message}`)
      if (newLeadsTodayError) throw new Error(`Today's leads fetch failed: ${newLeadsTodayError.message}`)
      if (staleLeadsError) throw new Error(`Stale leads fetch failed: ${staleLeadsError.message}`)
      if (followUpsDueError) throw new Error(`Follow-ups fetch failed: ${followUpsDueError.message}`)
      if (upcomingAppointmentsError) throw new Error(`Upcoming appointments fetch failed: ${upcomingAppointmentsError.message}`)
      if (portfolioDraftsError) throw new Error(`Portfolio draft fetch failed: ${portfolioDraftsError.message}`)
      if (quotesStartedError) throw new Error(`Quote action fetch failed: ${quotesStartedError.message}`)
      if (leadProjectsError) throw new Error(`Project action fetch failed: ${leadProjectsError.message}`)
      if (galleryDeliveryTasksError) throw new Error(`Gallery delivery fetch failed: ${galleryDeliveryTasksError.message}`)

      // Calculate stats from real data
      const totalLeads = totalLeadsCount || 0
      const totalBookings = totalBookingsCount || 0
      
      // Calculate total revenue from completed/scheduled appointments (convert cents to dollars)
      const totalRevenue = appointmentRevenueRows?.reduce((sum, appointment) => {
        if (appointment.status === 'completed' || appointment.status === 'scheduled') {
          return sum + ((appointment.price_cents || 0) / 100)
        }
        return sum
      }, 0) || 0

      // Count leads by status
      const leadsByStatus = {
        new: 0,
        contacted: 0,
        qualified: 0,
        converted: 0,
        'closed-won': 0,
        'closed-lost': 0
      }
      
      allLeadStatuses?.forEach(lead => {
        if (lead.status && lead.status in leadsByStatus) {
          leadsByStatus[lead.status as keyof typeof leadsByStatus]++
        }
      })

      const dashboardStats: DashboardStats = {
        totalLeads,
        totalRevenue,
        totalBookings,
        todayOps: {
          newLeadsToday: newLeadsTodayCount || 0,
          staleLeads: staleLeadsCount || 0,
          followUpsDue: followUpsDueCount || 0,
          upcomingAppointments: upcomingAppointmentsCount || 0,
          portfolioDrafts: portfolioDraftsCount || 0,
          quotesStarted: quotesStartedCount || 0,
          leadProjects: leadProjectsCount || 0,
          galleryDeliveryTasks: galleryDeliveryTasksCount || 0,
        },
        leadsByStatus,
        recentLeads: recentLeadsData || [],
        recentBookings: recentAppointmentsData?.map(apt => ({
          id: apt.id,
          client_name: apt.name,
          session_type: apt.package_name || apt.type,
          session_date: apt.start_time,
          total_amount: (apt.price_cents || 0) / 100,
          status: apt.status
        })) || []
      }

      return dashboardStats
    } catch (err) {
      console.error('Dashboard data fetch error:', err)
      throw err
    }
  }

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: fetchDashboardData,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchInterval: 5 * 60 * 1000,
  })

  return {
    stats: data ?? null,
    loading: isLoading,
    error: error instanceof Error ? error.message : null,
    refetch,
  }
}
