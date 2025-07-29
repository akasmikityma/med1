"use client"

import { useState } from "react"
import { Calendar, Clock, User, Phone, Filter, CheckCircle, X, Eye } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

// Mock appointments data
const mockAppointments = [
  {
    id: 1,
    patientName: "John Smith",
    patientEmail: "john.smith@email.com",
    patientPhone: "+1 (555) 123-4567",
    doctorName: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: "2024-01-20",
    time: "2:00 PM",
    reason: "Regular checkup",
    status: "pending",
    type: "in-person",
    notes: "Patient has history of heart disease",
  },
  {
    id: 2,
    patientName: "Emily Davis",
    patientEmail: "emily.davis@email.com",
    patientPhone: "+1 (555) 234-5678",
    doctorName: "Dr. Michael Chen",
    specialty: "Dermatologist",
    date: "2024-01-20",
    time: "10:30 AM",
    reason: "Skin consultation",
    status: "confirmed",
    type: "video",
    notes: "Follow-up for previous treatment",
  },
  {
    id: 3,
    patientName: "Robert Wilson",
    patientEmail: "robert.wilson@email.com",
    patientPhone: "+1 (555) 345-6789",
    doctorName: "Dr. Emily Rodriguez",
    specialty: "Pediatrician",
    date: "2024-01-19",
    time: "4:15 PM",
    reason: "Child vaccination",
    status: "completed",
    type: "in-person",
    notes: "Routine vaccination for 5-year-old",
  },
  {
    id: 4,
    patientName: "Lisa Anderson",
    patientEmail: "lisa.anderson@email.com",
    patientPhone: "+1 (555) 456-7890",
    doctorName: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    date: "2024-01-21",
    time: "11:00 AM",
    reason: "Chest pain",
    status: "cancelled",
    type: "in-person",
    notes: "Patient cancelled due to emergency",
  },
]

const statusColors = {
  pending: "bg-yellow-100 text-yellow-800",
  confirmed: "bg-green-100 text-green-800",
  completed: "bg-blue-100 text-blue-800",
  cancelled: "bg-red-100 text-red-800",
}

export default function AppointmentsPage() {
  const [appointments, setAppointments] = useState(mockAppointments)
  const [filter, setFilter] = useState("all")
  const [selectedDate, setSelectedDate] = useState("")

  const filteredAppointments = appointments.filter((appointment) => {
    const matchesStatus = filter === "all" || appointment.status === filter
    const matchesDate = !selectedDate || appointment.date === selectedDate
    return matchesStatus && matchesDate
  })

  const handleStatusChange = (id: number, newStatus: string) => {
    setAppointments(
      appointments.map((appointment) => (appointment.id === id ? { ...appointment, status: newStatus } : appointment)),
    )
  }

  const getStatusText = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1)
  }

  const todayAppointments = appointments.filter((apt) => apt.date === "2024-01-20")
  const pendingAppointments = appointments.filter((apt) => apt.status === "pending")

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-gray-800">Appointments</h1>
          <p className="text-sm text-gray-600">Manage all clinic appointments and bookings</p>
        </div>
      </header>

      <main className="flex-1 p-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Today's Appointments</p>
                <p className="text-2xl font-bold text-blue-600">{todayAppointments.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Pending Approval</p>
                <p className="text-2xl font-bold text-yellow-600">{pendingAppointments.length}</p>
              </div>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Appointments</p>
                <p className="text-2xl font-bold text-green-600">{appointments.length}</p>
              </div>
              <User className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completion Rate</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(
                    (appointments.filter((a) => a.status === "completed").length / appointments.length) * 100,
                  )}
                  %
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-600" />
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl border p-4 mb-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center space-x-4">
              <Filter className="w-5 h-5 text-gray-400" />
              <div className="flex space-x-2">
                {["all", "pending", "confirmed", "completed", "cancelled"].map((status) => (
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
            <div className="flex items-center space-x-2">
              <Calendar className="w-5 h-5 text-gray-400" />
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
        </div>

        {/* Appointments List */}
        <div className="space-y-4">
          {filteredAppointments.map((appointment) => (
            <div key={appointment.id} className="bg-white rounded-xl border hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1 mb-4 lg:mb-0">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{appointment.patientName}</h3>
                        <p className="text-blue-600 font-medium">{appointment.doctorName}</p>
                        <p className="text-sm text-gray-600">{appointment.specialty}</p>
                      </div>
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          statusColors[appointment.status as keyof typeof statusColors]
                        }`}
                      >
                        {getStatusText(appointment.status)}
                      </span>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4" />
                          <span>
                            {appointment.date} at {appointment.time}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4" />
                          <span>{appointment.type === "video" ? "Video Call" : "In-Person"}</span>
                        </div>
                      </div>
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4" />
                          <span>{appointment.patientPhone}</span>
                        </div>
                        <div>
                          <span className="font-medium">Reason:</span> {appointment.reason}
                        </div>
                      </div>
                    </div>

                    {appointment.notes && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <span className="font-medium">Notes:</span> {appointment.notes}
                        </p>
                      </div>
                    )}
                  </div>

                  <div className="flex flex-col space-y-2 lg:ml-6">
                    {appointment.status === "pending" && (
                      <>
                        <Button
                          onClick={() => handleStatusChange(appointment.id, "confirmed")}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Approve
                        </Button>
                        <Button
                          onClick={() => handleStatusChange(appointment.id, "cancelled")}
                          variant="outline"
                          size="sm"
                          className="text-red-600 border-red-600 hover:bg-red-50"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Reject
                        </Button>
                      </>
                    )}
                    {appointment.status === "confirmed" && (
                      <Button
                        onClick={() => handleStatusChange(appointment.id, "completed")}
                        size="sm"
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        Mark Complete
                      </Button>
                    )}
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAppointments.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No appointments found</h3>
            <p className="text-gray-600">
              {filter === "all" ? "No appointments scheduled yet" : `No ${filter} appointments found`}
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
