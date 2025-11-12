"use client"

import { useEffect, useState } from "react"
import { Calendar, Clock, Plus, Edit, Save, X, User, Trash2 } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { mockDoctorVisits } from "@/app/clinic/schedules/Constants"
// Mock doctor visits data - in real app, fetch from your database
// const mockDoctorVisits = [
//   {
//     id: "1",
//     doctorId: "1",
//     doctorName: "Dr. Sarah Johnson",
//     specialty: "Cardiologist",
//     dayOfWeek: 1, // Monday
//     startTime: "09:00",
//     endTime: "17:00",
//     appointmentCount: 12, // How many appointments booked for this visit
//     totalSlots: 16, // Total available slots
//   },
//   {
//     id: "2",
//     doctorId: "1",
//     doctorName: "Dr. Sarah Johnson",
//     specialty: "Cardiologist",
//     dayOfWeek: 3, // Wednesday
//     startTime: "09:00",
//     endTime: "17:00",
//     appointmentCount: 8,
//     totalSlots: 16,
//   },
//   {
//     id: "3",
//     doctorId: "2",
//     doctorName: "Dr. Michael Chen",
//     specialty: "Dermatologist",
//     dayOfWeek: 1, // Monday
//     startTime: "10:00",
//     endTime: "18:00",
//     appointmentCount: 15,
//     totalSlots: 16,
//   },
//   {
//     id: "4",
//     doctorId: "2",
//     doctorName: "Dr. Michael Chen",
//     specialty: "Dermatologist",
//     dayOfWeek: 5, // Friday
//     startTime: "10:00",
//     endTime: "18:00",
//     appointmentCount: 10,
//     totalSlots: 16,
//   },
// ]

const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

export default function SchedulesPage() {
  const [doctorVisits, setDoctorVisits] = useState(mockDoctorVisits)
  const [editingVisit, setEditingVisit] = useState<string | null>(null)


  useEffect(()=>{
    const fetchDoctorVisits = async()=>{
      try{  
        const response = await fetch("/api/clinic/doctorvisits",{
          method:"GET",
          headers:{
            "Content-Type" : 'Application/json'
          }
        })

        if(!response.ok){
          throw new Error(`http error occured status : response.status ${response.status}`);
        }

        const data = await response.json();
        console.log("fetched data ",data);

        const mappedData = data.map((visit:any)=>({
          ...visit,
          totalSlots:20,
          id: visit.id,
          doctorId: visit.doctorId,
          doctorName: visit.doctor.name,
          specialty: visit.doctor.specialization,
          dayOfWeek: visit.dayOfWeek, // Monday
          startTime: visit.startTime,
          endTime: visit.endTime,
          appointmentCount: visit._count.appointments,
        }))

        setDoctorVisits(mappedData);
      }catch(err){
        console.log(err);
      }
    }

    fetchDoctorVisits();
  },[]);

  const handleDeleteVisit = (visitId: string) => {
    if (confirm("Are you sure you want to delete this doctor visit? This will cancel all associated appointments.")) {
      setDoctorVisits(doctorVisits.filter((visit) => visit.id !== visitId))
    }
  }

  const handleEditVisit = (visitId: string, field: string, value: string) => {
    setDoctorVisits(doctorVisits.map((visit) => (visit.id === visitId ? { ...visit, [field]: value } : visit)))
  }

  const saveEdit = (visitId: string) => {
    setEditingVisit(null)
    // Here you would call your API to update the visit
    console.log("Saving visit:", visitId)
  }

  const cancelEdit = (visitId: string) => {
    setEditingVisit(null)
    // Here you would revert changes
  }

  const getUtilizationColor = (appointmentCount: number, totalSlots: number) => {
    const utilization = (appointmentCount / totalSlots) * 100
    if (utilization >= 80) return "text-red-600 bg-red-100"
    if (utilization >= 60) return "text-yellow-600 bg-yellow-100"
    return "text-green-600 bg-green-100"
  }

  // Group visits by doctor for better organization
  const visitsByDoctor = doctorVisits.reduce(
    (acc, visit) => {
      if (!acc[visit.doctorId]) {
        acc[visit.doctorId] = {
          doctorName: visit.doctorName,
          specialty: visit.specialty,
          visits: [],
        }
      }
      acc[visit.doctorId].visits.push(visit)
      return acc
    },
    {} as Record<string, { doctorName: string; specialty: string; visits: typeof mockDoctorVisits }>,
  )

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-gray-800">Doctor Visits & Schedules</h1>
          <p className="text-sm text-gray-600">Manage when doctors are available at your clinic</p>
        </div>
        <Link href="/clinic/schedules/create">
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Create Doctor Visit
          </Button>
        </Link>
      </header>

      <main className="flex-1 p-6">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Visits</p>
                <p className="text-2xl font-bold text-blue-600">{doctorVisits.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Doctors</p>
                <p className="text-2xl font-bold text-green-600">{Object.keys(visitsByDoctor).length}</p>
              </div>
              <User className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Appointments</p>
                <p className="text-2xl font-bold text-purple-600">
                  {doctorVisits.reduce((sum, visit) => sum + visit.appointmentCount, 0)}
                </p>
              </div>
              <Clock className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Utilization</p>
                <p className="text-2xl font-bold text-orange-600">
                  {Math.round(
                    (doctorVisits.reduce((sum, visit) => sum + visit.appointmentCount / visit.totalSlots, 0) /
                      doctorVisits.length) *
                      100,
                  )}
                  %
                </p>
              </div>
              <Calendar className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Doctor Visits by Doctor */}
        <div className="space-y-6">
          {Object.entries(visitsByDoctor).map(([doctorId, doctorData]) => (
            <div key={doctorId} className="bg-white rounded-xl border">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{doctorData.doctorName}</h3>
                    <p className="text-blue-600">{doctorData.specialty}</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    {doctorData.visits.length} visit{doctorData.visits.length !== 1 ? "s" : ""} scheduled
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="space-y-4">
                  {doctorData.visits.map((visit) => (
                    <div key={visit.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center space-x-4 flex-1">
                        <div className="w-20">
                          <span className="font-medium text-gray-800">{daysOfWeek[visit.dayOfWeek]}</span>
                        </div>

                        {editingVisit === visit.id ? (
                          <div className="flex items-center space-x-4 flex-1">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <input
                                type="time"
                                value={visit.startTime}
                                onChange={(e) => handleEditVisit(visit.id, "startTime", e.target.value)}
                                className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                              <span className="text-gray-600">to</span>
                              <input
                                type="time"
                                value={visit.endTime}
                                onChange={(e) => handleEditVisit(visit.id, "endTime", e.target.value)}
                                className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                              />
                            </div>
                          </div>
                        ) : (
                          <div className="flex items-center space-x-4 flex-1">
                            <div className="flex items-center space-x-2">
                              <Clock className="w-4 h-4 text-gray-400" />
                              <span className="text-gray-700">
                                {visit.startTime} - {visit.endTime}
                              </span>
                            </div>
                            <div
                              className={`px-3 py-1 rounded-full text-sm font-medium ${getUtilizationColor(visit.appointmentCount, visit.totalSlots)}`}
                            >
                              {visit.appointmentCount}/{visit.totalSlots} booked
                            </div>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center space-x-2">
                        {editingVisit === visit.id ? (
                          <>
                            <Button
                              onClick={() => saveEdit(visit.id)}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700"
                            >
                              <Save className="w-4 h-4 mr-2" />
                              Save
                            </Button>
                            <Button onClick={() => cancelEdit(visit.id)} variant="outline" size="sm">
                              <X className="w-4 h-4 mr-2" />
                              Cancel
                            </Button>
                          </>
                        ) : (
                          <>
                            <Button onClick={() => setEditingVisit(visit.id)} variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                            <Button
                              onClick={() => handleDeleteVisit(visit.id)}
                              variant="outline"
                              size="sm"
                              className="text-red-600 border-red-600 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {doctorVisits.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No doctor visits scheduled</h3>
            <p className="text-gray-600 mb-6">Create your first doctor visit to start accepting patient appointments</p>
            <Link href="/clinic/schedules/create">
              <Button className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Doctor Visit
              </Button>
            </Link>
          </div>
        )}
      </main>
    </div>
  )
}
