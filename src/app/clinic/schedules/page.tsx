"use client"

import { useState } from "react"
import { Calendar, Clock, Plus, Edit, Save, X } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

// Mock schedule data
const mockSchedules = [
  {
    id: 1,
    doctorId: 1,
    doctorName: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    schedules: {
      Monday: { isWorking: true, startTime: "09:00", endTime: "17:00", slotDuration: 30 },
      Tuesday: { isWorking: true, startTime: "09:00", endTime: "17:00", slotDuration: 30 },
      Wednesday: { isWorking: true, startTime: "09:00", endTime: "17:00", slotDuration: 30 },
      Thursday: { isWorking: true, startTime: "09:00", endTime: "17:00", slotDuration: 30 },
      Friday: { isWorking: true, startTime: "09:00", endTime: "17:00", slotDuration: 30 },
      Saturday: { isWorking: false, startTime: "", endTime: "", slotDuration: 30 },
      Sunday: { isWorking: false, startTime: "", endTime: "", slotDuration: 30 },
    },
  },
  {
    id: 2,
    doctorId: 2,
    doctorName: "Dr. Michael Chen",
    specialty: "Dermatologist",
    schedules: {
      Monday: { isWorking: true, startTime: "10:00", endTime: "18:00", slotDuration: 20 },
      Tuesday: { isWorking: false, startTime: "", endTime: "", slotDuration: 20 },
      Wednesday: { isWorking: true, startTime: "10:00", endTime: "18:00", slotDuration: 20 },
      Thursday: { isWorking: false, startTime: "", endTime: "", slotDuration: 20 },
      Friday: { isWorking: true, startTime: "10:00", endTime: "18:00", slotDuration: 20 },
      Saturday: { isWorking: true, startTime: "09:00", endTime: "15:00", slotDuration: 20 },
      Sunday: { isWorking: false, startTime: "", endTime: "", slotDuration: 20 },
    },
  },
]

const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"]

export default function SchedulesPage() {
  const [schedules, setSchedules] = useState(mockSchedules)
  const [editingDoctor, setEditingDoctor] = useState<number | null>(null)

  const handleScheduleChange = (doctorId: number, day: string, field: string, value: any) => {
    setSchedules(
      schedules.map((schedule) =>
        schedule.id === doctorId
          ? {
              ...schedule,
              schedules: {
                ...schedule.schedules,
                [day]: {
                  ...schedule.schedules[day as keyof typeof schedule.schedules],
                  [field]: value,
                },
              },
            }
          : schedule,
      ),
    )
  }

  const saveSchedule = (doctorId: number) => {
    setEditingDoctor(null)
    // Here you would typically save to your backend
    console.log("Saving schedule for doctor:", doctorId)
  }

  const cancelEdit = (doctorId: number) => {
    setEditingDoctor(null)
    // Here you would typically revert changes
  }

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-gray-800">Schedule Management</h1>
          <p className="text-sm text-gray-600">Manage doctor availability and working hours</p>
        </div>
      </header>

      <main className="flex-1 p-6">
        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Schedules</p>
                <p className="text-2xl font-bold text-green-600">{schedules.length}</p>
              </div>
              <Calendar className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Hours/Day</p>
                <p className="text-2xl font-bold text-blue-600">8.5</p>
              </div>
              <Clock className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Working Days</p>
                <p className="text-2xl font-bold text-purple-600">5.2</p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Slots/Day</p>
                <p className="text-2xl font-bold text-orange-600">16</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Schedules */}
        <div className="space-y-6">
          {schedules.map((doctorSchedule) => (
            <div key={doctorSchedule.id} className="bg-white rounded-xl border">
              <div className="p-6 border-b">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-800">{doctorSchedule.doctorName}</h3>
                    <p className="text-blue-600">{doctorSchedule.specialty}</p>
                  </div>
                  <div className="flex space-x-2">
                    {editingDoctor === doctorSchedule.id ? (
                      <>
                        <Button
                          onClick={() => saveSchedule(doctorSchedule.id)}
                          size="sm"
                          className="bg-green-600 hover:bg-green-700"
                        >
                          <Save className="w-4 h-4 mr-2" />
                          Save
                        </Button>
                        <Button onClick={() => cancelEdit(doctorSchedule.id)} variant="outline" size="sm">
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </>
                    ) : (
                      <Button onClick={() => setEditingDoctor(doctorSchedule.id)} variant="outline" size="sm">
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Schedule
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              <div className="p-6">
                <div className="grid gap-4">
                  {daysOfWeek.map((day) => {
                    const daySchedule = doctorSchedule.schedules[day as keyof typeof doctorSchedule.schedules]
                    const isEditing = editingDoctor === doctorSchedule.id

                    return (
                      <div key={day} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-24">
                          <span className="font-medium text-gray-800">{day}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={daySchedule.isWorking}
                            onChange={(e) =>
                              isEditing && handleScheduleChange(doctorSchedule.id, day, "isWorking", e.target.checked)
                            }
                            disabled={!isEditing}
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                          />
                          <span className="text-sm text-gray-600">Working</span>
                        </div>

                        {daySchedule.isWorking && (
                          <>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">From:</span>
                              <input
                                type="time"
                                value={daySchedule.startTime}
                                onChange={(e) =>
                                  isEditing && handleScheduleChange(doctorSchedule.id, day, "startTime", e.target.value)
                                }
                                disabled={!isEditing}
                                className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                              />
                            </div>

                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">To:</span>
                              <input
                                type="time"
                                value={daySchedule.endTime}
                                onChange={(e) =>
                                  isEditing && handleScheduleChange(doctorSchedule.id, day, "endTime", e.target.value)
                                }
                                disabled={!isEditing}
                                className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                              />
                            </div>

                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">Slot Duration:</span>
                              <select
                                value={daySchedule.slotDuration}
                                onChange={(e) =>
                                  isEditing &&
                                  handleScheduleChange(
                                    doctorSchedule.id,
                                    day,
                                    "slotDuration",
                                    Number.parseInt(e.target.value),
                                  )
                                }
                                disabled={!isEditing}
                                className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                              >
                                <option value={15}>15 min</option>
                                <option value={20}>20 min</option>
                                <option value={30}>30 min</option>
                                <option value={45}>45 min</option>
                                <option value={60}>60 min</option>
                              </select>
                            </div>
                          </>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            </div>
          ))}
        </div>

        {schedules.length === 0 && (
          <div className="text-center py-12">
            <Calendar className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No schedules found</h3>
            <p className="text-gray-600 mb-6">Add doctors first to manage their schedules</p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Doctor
            </Button>
          </div>
        )}
      </main>
    </div>
  )
}
