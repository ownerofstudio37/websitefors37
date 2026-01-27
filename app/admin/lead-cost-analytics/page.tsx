'use client'

import React, { useState, useEffect } from 'react'
import { Loader2, DollarSign, TrendingUp, TrendingDown } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Lead } from '@/lib/supabase'

interface CostAnalytics {
  totalLeads: number
  totalLeadCost: number
  avgCostPerLead: number
  totalRevenueGenerated: number
  totalProfit: number
  roi: number
  monthlyData: {
    month: string
    leadsCount: number
    leadCost: number
    revenue: number
    profit: number
  }[]
}

export default function LeadCostAnalyticsPage() {
  const [loading, setLoading] = useState(true)
  const [analytics, setAnalytics] = useState<CostAnalytics | null>(null)
  const [leads, setLeads] = useState<Lead[]>([])
  const [topLeads, setTopLeads] = useState<Lead[]>([])

  useEffect(() => {
    fetchAnalytics()
  }, [])

  const fetchAnalytics = async () => {
    try {
      setLoading(true)

      // Fetch all leads
      const { data, error } = await supabase
        .from('leads')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error

      const allLeads = data || []
      setLeads(allLeads)

      // Calculate analytics
      const totalLeads = allLeads.length
      const totalLeadCost = allLeads.reduce((sum, lead) => sum + (lead.lead_cost || 0), 0)
      const avgCostPerLead = totalLeads > 0 ? totalLeadCost / totalLeads : 0
      const totalRevenueGenerated = allLeads.reduce((sum, lead) => sum + (lead.revenue_generated || 0), 0)
      const totalProfit = totalRevenueGenerated - totalLeadCost
      const roi = totalLeadCost > 0 ? ((totalProfit / totalLeadCost) * 100) : 0

      // Group by month
      const monthlyMap = new Map<string, { leadsCount: number; leadCost: number; revenue: number }>()
      allLeads.forEach(lead => {
        const date = new Date(lead.created_at)
        const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
        
        if (!monthlyMap.has(monthKey)) {
          monthlyMap.set(monthKey, { leadsCount: 0, leadCost: 0, revenue: 0 })
        }
        
        const monthData = monthlyMap.get(monthKey)!
        monthData.leadsCount += 1
        monthData.leadCost += lead.lead_cost || 0
        monthData.revenue += lead.revenue_generated || 0
      })

      // Convert to sorted array
      const monthlyData = Array.from(monthlyMap.entries())
        .map(([month, data]) => ({
          month,
          ...data,
          profit: data.revenue - data.leadCost
        }))
        .sort((a, b) => a.month.localeCompare(b.month))

      setAnalytics({
        totalLeads,
        totalLeadCost,
        avgCostPerLead,
        totalRevenueGenerated,
        totalProfit,
        roi,
        monthlyData
      })

      // Get top revenue-generating leads
      const sortedByRevenue = [...allLeads]
        .filter(l => (l.revenue_generated || 0) > 0)
        .sort((a, b) => (b.revenue_generated || 0) - (a.revenue_generated || 0))
        .slice(0, 10)
      setTopLeads(sortedByRevenue)
    } catch (error) {
      console.error('Failed to fetch analytics:', error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary-600" />
        <span className="ml-2">Loading analytics...</span>
      </div>
    )
  }

  if (!analytics) {
    return <div className="text-center py-8 text-gray-500">No data available</div>
  }

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-semibold">Lead Cost & Revenue Analytics</h1>
        <p className="text-gray-500">Track your lead costs, revenue, and ROI</p>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Leads</p>
              <p className="text-2xl font-bold mt-2">{analytics.totalLeads}</p>
            </div>
            <DollarSign className="h-8 w-8 text-gray-300" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Lead Cost</p>
              <p className="text-2xl font-bold mt-2">${analytics.totalLeadCost.toFixed(2)}</p>
            </div>
            <TrendingDown className="h-8 w-8 text-red-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Avg Cost / Lead</p>
              <p className="text-2xl font-bold mt-2">${analytics.avgCostPerLead.toFixed(2)}</p>
            </div>
            <DollarSign className="h-8 w-8 text-blue-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Total Revenue</p>
              <p className="text-2xl font-bold text-green-600 mt-2">${analytics.totalRevenueGenerated.toFixed(2)}</p>
            </div>
            <TrendingUp className="h-8 w-8 text-green-400" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">ROI</p>
              <p className={`text-2xl font-bold mt-2 ${analytics.roi >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {analytics.roi.toFixed(1)}%
              </p>
              <p className="text-sm text-gray-500 mt-1">Profit: ${analytics.totalProfit.toFixed(2)}</p>
            </div>
            <TrendingUp className={`h-8 w-8 ${analytics.roi >= 0 ? 'text-green-400' : 'text-red-400'}`} />
          </div>
        </div>
      </div>

      {/* Monthly Breakdown */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Monthly Breakdown</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-left font-medium text-gray-700">Month</th>
                <th className="px-6 py-3 text-right font-medium text-gray-700">Leads</th>
                <th className="px-6 py-3 text-right font-medium text-gray-700">Lead Cost</th>
                <th className="px-6 py-3 text-right font-medium text-gray-700">Revenue</th>
                <th className="px-6 py-3 text-right font-medium text-gray-700">Profit</th>
                <th className="px-6 py-3 text-right font-medium text-gray-700">ROI %</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {analytics.monthlyData.map(month => (
                <tr key={month.month} className="hover:bg-gray-50">
                  <td className="px-6 py-3">{month.month}</td>
                  <td className="px-6 py-3 text-right font-medium">{month.leadsCount}</td>
                  <td className="px-6 py-3 text-right">${month.leadCost.toFixed(2)}</td>
                  <td className="px-6 py-3 text-right text-green-600 font-medium">${month.revenue.toFixed(2)}</td>
                  <td className={`px-6 py-3 text-right font-medium ${month.profit >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ${month.profit.toFixed(2)}
                  </td>
                  <td className="px-6 py-3 text-right">
                    <span className={month.leadCost > 0 ? '' : 'text-gray-500'}>
                      {month.leadCost > 0 ? ((month.profit / month.leadCost) * 100).toFixed(1) : '—'}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Top Revenue Leads */}
      {topLeads.length > 0 && (
        <div className="bg-white rounded-lg shadow overflow-hidden">
          <div className="p-6 border-b">
            <h2 className="text-lg font-semibold">Top Revenue-Generating Leads</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">Name</th>
                  <th className="px-6 py-3 text-left font-medium text-gray-700">Email</th>
                  <th className="px-6 py-3 text-right font-medium text-gray-700">Lead Cost</th>
                  <th className="px-6 py-3 text-right font-medium text-gray-700">Revenue</th>
                  <th className="px-6 py-3 text-right font-medium text-gray-700">Profit</th>
                  <th className="px-6 py-3 text-right font-medium text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {topLeads.map(lead => (
                  <tr key={lead.id} className="hover:bg-gray-50">
                    <td className="px-6 py-3 font-medium">{lead.name}</td>
                    <td className="px-6 py-3 text-gray-600">{lead.email}</td>
                    <td className="px-6 py-3 text-right">${(lead.lead_cost || 0).toFixed(2)}</td>
                    <td className="px-6 py-3 text-right text-green-600 font-medium">${(lead.revenue_generated || 0).toFixed(2)}</td>
                    <td className="px-6 py-3 text-right font-medium">
                      ${((lead.revenue_generated || 0) - (lead.lead_cost || 0)).toFixed(2)}
                    </td>
                    <td className="px-6 py-3 text-right">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        lead.status === 'converted' ? 'bg-green-100 text-green-800' :
                        lead.status === 'qualified' ? 'bg-blue-100 text-blue-800' :
                        lead.status === 'contacted' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {lead.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
