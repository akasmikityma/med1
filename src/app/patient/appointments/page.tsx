"use client"

import { useState } from "react"
import Link from "next/link"
import { Calendar, Clock, MapPin, Video, MoreVertical, Filter } from "lucide-react"
import { PatientHeader } from "../PatientComps/patientHeader"

// Mock appointments data
const mockAppointments = [
  {
    id: 1,
    doctor: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    clinic: "Heart Care Center",
    date: "2024-01-20",
    time: "2:00 PM",
    status: "confirmed",
    type: "in-person",
    reason: "Regular checkup",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 2,
    doctor: "Dr. Michael Chen",
    specialty: "Dermatologist",
    clinic: "Skin Health Clinic",
    date: "2024-01-25",
    time: "10:30 AM",
    status: "pending",
    type: "video",
    reason: "Skin consultation",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    id: 3,
    doctor: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    clinic: "Children's Health Center",
    date: "2024-01-15",
    time: "4:15 PM",
    status: "completed",
    type: "in-person",
    reason: "Follow-up visit",
    image: "/placeholder.svg?height=60&width=60",
  },
]

const statusColors = {
  confirmed: "bg-green-100 text-green-800",
  pending: "bg-yellow-100 text-yellow-800",
  completed: "bg-gray-100 text-gray-800",
  cancelled: "bg-red-100 text-red-800",
}

export default function AppointmentsPage() {
  const [filter, setFilter] = useState("all")

  const filteredAppointments = mockAppointments.filter((appointment) => {
    if (filter === "all") return true
    return appointment.status === filter
  })

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  return (
    <div className="flex flex-1 flex-col">
      <PatientHeader title="My Appointments" subtitle="Manage your upcoming and past appointments" />

      <main className="flex-1 p-6">
        {/* Page Actions */}
        <div className="flex justify-end mb-6">
          <Link
            href="/patient/doctor"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
          >
            Book New Appointment
          </Link>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm border p-4 mb-6">
          <div className="flex items-center space-x-4">
            <Filter className="w-5 h-5 text-gray-400" />
            <div className="flex space-x-2">
              {["all", "confirmed", "pending", "completed"].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    filter === status ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                  }`}
                >
                  {status === "all" ? "All" : getStatusText(status)}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Rest of the appointments content remains the same */}
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow"
            >
              <div className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div className="flex items-start space-x-4 mb-4 md:mb-0">
                    <img
                      src={appointment.image || "/placeholder.svg"}
                      alt={appointment.doctor}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-800 mb-1">{appointment.doctor}</h3>
                      <p className="text-blue-600 font-medium mb-2">{appointment.specialty}</p>

                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{appointment.time}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          {appointment.type === "video" ? (
                            <Video className="w-4 h-4" />
                          ) : (
                            <MapPin className="w-4 h-4" />
                          )}
                          <span>{appointment.type === "video" ? "Video Call" : appointment.clinic}</span>
                        </div>
                      </div>

                      <p className="text-sm text-gray-600 mt-2">
                        <span className="font-medium">Reason:</span> {appointment.reason}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${statusColors[appointment.status as keyof typeof statusColors]}`}
                    >
                      {getStatusText(appointment.status)}
                    </span>

                    {appointment.status === "confirmed" && (
                      <div className="flex space-x-2">
                        {appointment.type === "video" && (
                          <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-700 transition-colors">
                            Join Call
                          </button>
                        )}
                        <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">Reschedule</button>
                      </div>
                    )}

                    <button className="p-2 hover:bg-gray-100 rounded-full">
                      <MoreVertical className="w-5 h-5 text-gray-400" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No appointments found</h3>
            <p className="text-gray-600 mb-6">
              {filter === "all" ? "You haven't booked any appointments yet" : `No ${filter} appointments found`}
            </p>
            <Link
              href="/patient/doctor"
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              Book Your First Appointment
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
