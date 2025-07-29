"use client"

import { useState } from "react"
import { TrendingUp, DollarSign, Users, Calendar, Download, Filter } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedReport, setSelectedReport] = useState("overview")

  // Mock data
  const stats = {
    revenue: {
      current: 45250,
      previous: 38900,
      change: 16.3,
    },
    appointments: {
      current: 342,
      previous: 298,
      change: 14.8,
    },
    patients: {
      current: 156,
      previous: 142,
      change: 9.9,
    },
    avgRating: {
      current: 4.7,
      previous: 4.5,
      change: 4.4,
    },
  }

  const monthlyData = [
    { month: "Jan", revenue: 32000, appointments: 245, patients: 120 },
    { month: "Feb", revenue: 38000, appointments: 289, patients: 135 },
    { month: "Mar", revenue: 42000, appointments: 312, patients: 148 },
    { month: "Apr", revenue: 45250, appointments: 342, patients: 156 },
  ]

  const topDoctors = [
    { name: "Dr. Sarah Johnson", specialty: "Cardiologist", appointments: 89, revenue: 13350, rating: 4.9 },
    { name: "Dr. Michael Chen", specialty: "Dermatologist", appointments: 76, revenue: 9120, rating: 4.8 },
    { name: "Dr. Emily Rodriguez", specialty: "Pediatrician", appointments: 94, revenue: 9400, rating: 4.7 },
  ]

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-gray-800">Reports & Analytics</h1>
          <p className="text-sm text-gray-600">Track clinic performance and generate insights</p>
        </div>
      </header>

      <main className="flex-1 p-6">
        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="quarter">This Quarter</option>
              <option value="year">This Year</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <select
              value={selectedReport}
              onChange={(e) => setSelectedReport(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="overview">Overview</option>
              <option value="revenue">Revenue</option>
              <option value="appointments">Appointments</option>
              <option value="doctors">Doctor Performance</option>
            </select>
          </div>
          <Button variant="outline" className="ml-auto bg-transparent">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>

        {/* Key Metrics */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-6 rounded-xl border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-green-100 rounded-lg">
                <DollarSign className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-sm text-green-600 font-medium">+{stats.revenue.change}%</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Total Revenue</h3>
            <p className="text-2xl font-bold text-gray-800">${stats.revenue.current.toLocaleString()}</p>
            <p className="text-xs text-gray-500 mt-1">vs ${stats.revenue.previous.toLocaleString()} last period</p>
          </div>

          <div className="bg-white p-6 rounded-xl border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-sm text-blue-600 font-medium">+{stats.appointments.change}%</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Appointments</h3>
            <p className="text-2xl font-bold text-gray-800">{stats.appointments.current}</p>
            <p className="text-xs text-gray-500 mt-1">vs {stats.appointments.previous} last period</p>
          </div>

          <div className="bg-white p-6 rounded-xl border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Users className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-sm text-purple-600 font-medium">+{stats.patients.change}%</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Active Patients</h3>
            <p className="text-2xl font-bold text-gray-800">{stats.patients.current}</p>
            <p className="text-xs text-gray-500 mt-1">vs {stats.patients.previous} last period</p>
          </div>

          <div className="bg-white p-6 rounded-xl border">
            <div className="flex items-center justify-between mb-4">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-sm text-yellow-600 font-medium">+{stats.avgRating.change}%</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600 mb-1">Avg Rating</h3>
            <p className="text-2xl font-bold text-gray-800">{stats.avgRating.current}</p>
            <p className="text-xs text-gray-500 mt-1">vs {stats.avgRating.previous} last period</p>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue Chart */}
          <div className="bg-white p-6 rounded-xl border">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Revenue Trend</h3>
            <div className="h-64 flex items-end justify-between space-x-2">
              {monthlyData.map((data, index) => (
                <div key={data.month} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-blue-500 rounded-t"
                    style={{
                      height: `${(data.revenue / Math.max(...monthlyData.map((d) => d.revenue))) * 200}px`,
                    }}
                  />
                  <span className="text-sm text-gray-600 mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Appointments Chart */}
          <div className="bg-white p-6 rounded-xl border">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Appointments Trend</h3>
            <div className="h-64 flex items-end justify-between space-x-2">
              {monthlyData.map((data, index) => (
                <div key={data.month} className="flex flex-col items-center flex-1">
                  <div
                    className="w-full bg-green-500 rounded-t"
                    style={{
                      height: `${(data.appointments / Math.max(...monthlyData.map((d) => d.appointments))) * 200}px`,
                    }}
                  />
                  <span className="text-sm text-gray-600 mt-2">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Performing Doctors */}
        <div className="bg-white rounded-xl border">
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold text-gray-800">Top Performing Doctors</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-800">Doctor</th>
                  <th className="text-left p-4 font-medium text-gray-800">Specialty</th>
                  <th className="text-left p-4 font-medium text-gray-800">Appointments</th>
                  <th className="text-left p-4 font-medium text-gray-800">Revenue</th>
                  <th className="text-left p-4 font-medium text-gray-800">Rating</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {topDoctors.map((doctor, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="p-4">
                      <div className="font-medium text-gray-800">{doctor.name}</div>
                    </td>
                    <td className="p-4">
                      <span className="text-blue-600">{doctor.specialty}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-gray-800">{doctor.appointments}</span>
                    </td>
                    <td className="p-4">
                      <span className="font-medium text-green-600">${doctor.revenue.toLocaleString()}</span>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-4 h-4 text-yellow-400" />
                        <span className="font-medium text-gray-800">{doctor.rating}</span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
