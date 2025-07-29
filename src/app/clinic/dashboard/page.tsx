"use client"

import { useSession } from "next-auth/react"
import { Calendar, Users, Clock, Bell } from "lucide-react"
import { useEffect, useState } from "react"
import DoctorVisitCard from "@/app/comps/AppointMentCard"
import axios from "@/lib/axios"
type DoctorVisit = {
  id: string
  doctor: {
    name: string
    specialization: string
  }
  dayOfWeek: number
  startTime: string
  endTime: string
}


export default function ClinicDashboard() {
  const { data: session } = useSession()
  const [visits, setVisits] = useState<DoctorVisit[]>([]);
  

 useEffect(() => {
    const getVisits = async () => {
      try {
        const { data } = await axios.get("/api/clinic/doctorvisits")
        setVisits(data)
      } catch (error) {
        console.error("Error fetching visits:", error)
      }
    }

    getVisits()
  }, [])
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🏥</div>
              <h1 className="text-2xl font-bold text-gray-800">QuickDoc</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="w-6 h-6 text-gray-600" />
              <img src={session?.user?.image || ""} alt="Profile" className="w-8 h-8 rounded-full" />
              <span className="text-sm text-gray-600">{session?.user?.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto">
      <main className="px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">Clinic Dashboard 🏥</h2>
          <p className="text-gray-600">Manage your doctors, schedules, and patient appointments.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Doctors</p>
                <p className="text-2xl font-bold text-gray-800">0</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Appointments</p>
                <p className="text-2xl font-bold text-gray-800">0</p>
              </div>
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Requests</p>
                <p className="text-2xl font-bold text-gray-800">0</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-2xl font-bold text-gray-800">0</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Manage Doctors</h3>
                <p className="text-sm text-gray-600">Add and manage doctor profiles</p>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Calendar className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">Schedule Management</h3>
                <p className="text-sm text-gray-600">Set doctor availability</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Appointments</h3>
            {visits.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>No recent doctor schedules</p>
                <p className="text-sm">Start by adding doctors to your clinic!</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {visits.map((visit) => (
                  <DoctorVisitCard
                    key={visit.id}
                    doctorName={visit.doctor.name}
                    specialization={visit.doctor.specialization}
                    dayOfWeek={visit.dayOfWeek}
                    startTime={visit.startTime}
                    endTime={visit.endTime}
                  />
                ))}
              </div>
            )}
        </div>
      </main>
      </div>
    </div>
  )
}
