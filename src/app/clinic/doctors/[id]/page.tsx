"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { DoctorProfileDefaults } from "../Constants"
import {
  ArrowLeft,
  Star,
  Calendar,
  Users,
  TrendingUp,
  Clock,
  Phone,
  Mail,
  Edit,
  MoreVertical,
  Award,
  CheckCircle,
  DollarSign,
  Activity,
  MessageSquare,
} from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

export default function ClinicDoctorProfilePage() {
  const params = useParams()
  const [activeTab, setActiveTab] = useState("overview")
  const [doctor, setDoctor] = useState(DoctorProfileDefaults)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`/api/clinic/doctors/${params.id}`)
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.statusText}`)
        }
        
        const data = await response.json()
        console.log("Fetched doctor:", data)
        
        // Map API data to your UI structure
        const mappedDoctor = {
          ...DoctorProfileDefaults,
          id: data.id,
          name: data.name || DoctorProfileDefaults.name,
          specialty: data.specialization || DoctorProfileDefaults.specialty,
          experience: data.experience || DoctorProfileDefaults.experience,
          education: data.qualifications || DoctorProfileDefaults.education,
          contact: data.contact || DoctorProfileDefaults.Contact,
          // Map other fields as needed
          email: data.email || DoctorProfileDefaults.email,
          phone: data.phone || DoctorProfileDefaults.phone,
          rating: data.rating || DoctorProfileDefaults.rating,
          totalAppointments: data.totalAppointments || DoctorProfileDefaults.totalAppointments,
          status: data.status || DoctorProfileDefaults.status,
          consultationFee: data.consultationFee || DoctorProfileDefaults.consultationFee,
          // Keep default values for complex objects
          bio: data.bio || DoctorProfileDefaults.bio,
          qualifications: data.qualifications 
          ? (Array.isArray(data.qualifications) 
              ? data.qualifications 
              : [data.qualifications]) // Convert string to array
          : DoctorProfileDefaults.qualifications,
          specializations: data.specializations || DoctorProfileDefaults.specializations,
          languages: data.languages || DoctorProfileDefaults.languages,
          achievements: data.achievements || DoctorProfileDefaults.achievements,
          monthlyStats: data.monthlyStats || DoctorProfileDefaults.monthlyStats,
          recentAppointments: data.recentAppointments || DoctorProfileDefaults.recentAppointments,
          patientReviews: data.patientReviews || DoctorProfileDefaults.patientReviews,
          schedule: data.schedule || DoctorProfileDefaults.schedule,
        }
        
        setDoctor(mappedDoctor)
      } catch (error) {
        console.error("Error fetching doctor:", error)
        // Keep default data on error
      } finally {
        setIsLoading(false)
      }
    }
    
    if (params.id) {
      fetchDoctor()
    }
  }, [params.id])



  const tabs = [
    { id: "overview", label: "Overview" },
    { id: "schedule", label: "Schedule" },
    { id: "appointments", label: "Appointments" },
    { id: "reviews", label: "Reviews" },
  ]

  const statusColors = {
    completed: "bg-green-100 text-green-800",
    confirmed: "bg-blue-100 text-blue-800",
    pending: "bg-yellow-100 text-yellow-800",
    cancelled: "bg-red-100 text-red-800",
  }

  const daysOfWeek = [
    { key: "monday", label: "Monday" },
    { key: "tuesday", label: "Tuesday" },
    { key: "wednesday", label: "Wednesday" },
    { key: "thursday", label: "Thursday" },
    { key: "friday", label: "Friday" },
    { key: "saturday", label: "Saturday" },
    { key: "sunday", label: "Sunday" },
  ]
  if (isLoading) {
    return (
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <Link href="/clinic/doctors" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <SidebarTrigger className="-ml-1" />
          <div className="flex-1">
            <h1 className="text-xl font-semibold text-gray-800">Loading...</h1>
          </div>
        </header>
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="animate-pulse">
              <div className="h-32 w-32 bg-gray-200 rounded-full mb-4"></div>
              <div className="h-4 bg-gray-200 rounded w-1/4 mb-2"></div>
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </div>
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <Link href="/clinic/doctors" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </Link>
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-gray-800">Doctor Profile</h1>
          <p className="text-sm text-gray-600">Manage doctor information and performance</p>
        </div>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit Profile
          </Button>
          <Button variant="outline" size="sm">
            <MoreVertical className="w-4 h-4" />
          </Button>
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Doctor Header Card */}
          <div className="bg-white rounded-xl border p-8">
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-shrink-0">
                <img
                  src={doctor.image || "/placeholder.svg"}
                  alt={doctor.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-blue-100"
                />
              </div>
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-2">{doctor.name}</h2>
                    <p className="text-xl text-blue-600 font-medium mb-2">{doctor.specialty}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600 mb-4">
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span>{doctor.rating} rating</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Award className="w-4 h-4 text-green-500" />
                        <span>{doctor.experience} experience</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-4 h-4 text-purple-500" />
                        <span>{doctor.totalAppointments} total appointments</span>
                      </div>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      doctor.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {doctor.status === "active" ? "Active" : "Inactive"}
                  </span>
                </div>

                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span>{doctor.email}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    <span>{doctor.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Joined {doctor.joinDate}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <DollarSign className="w-4 h-4" />
                    <span>${doctor.consultationFee} consultation fee</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Performance Stats */}
          <div className="grid md:grid-cols-4 gap-4">
            <div className="bg-white p-6 rounded-xl border">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">This Month</h3>
              <p className="text-2xl font-bold text-gray-800">{doctor.monthlyStats.appointments}</p>
              <p className="text-xs text-green-600 mt-1">Appointments</p>
            </div>

            <div className="bg-white p-6 rounded-xl border">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-green-100 rounded-lg">
                  <DollarSign className="w-6 h-6 text-green-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Revenue</h3>
              <p className="text-2xl font-bold text-gray-800">${doctor.monthlyStats.revenue.toLocaleString()}</p>
              <p className="text-xs text-green-600 mt-1">This month</p>
            </div>

            <div className="bg-white p-6 rounded-xl border">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <Activity className="w-6 h-6 text-purple-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-green-500" />
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Satisfaction</h3>
              <p className="text-2xl font-bold text-gray-800">{doctor.monthlyStats.patientSatisfaction}%</p>
              <p className="text-xs text-green-600 mt-1">Patient satisfaction</p>
            </div>

            <div className="bg-white p-6 rounded-xl border">
              <div className="flex items-center justify-between mb-4">
                <div className="p-2 bg-orange-100 rounded-lg">
                  <Clock className="w-6 h-6 text-orange-600" />
                </div>
                <TrendingUp className="w-5 h-5 text-red-500" />
              </div>
              <h3 className="text-sm font-medium text-gray-600 mb-1">Cancellation</h3>
              <p className="text-2xl font-bold text-gray-800">{doctor.monthlyStats.cancellationRate}%</p>
              <p className="text-xs text-red-600 mt-1">Cancellation rate</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl border">
            <div className="border-b">
              <nav className="flex space-x-8 px-6">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeTab === tab.id
                        ? "border-blue-500 text-blue-600"
                        : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="space-y-8">
                  <div className="grid lg:grid-cols-2 gap-8">
                    {/* Bio & Qualifications */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">About</h3>
                        <p className="text-gray-600 leading-relaxed">{doctor.bio}</p>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Education & Training</h3>
                        <ul className="space-y-3">
                          {doctor.qualifications.map((qualification, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600">{qualification}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Languages</h3>
                        <div className="flex flex-wrap gap-2">
                          {doctor.languages.map((language, index) => (
                            <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                              {language}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Specializations & Achievements */}
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Specializations</h3>
                        <div className="space-y-2">
                          {doctor.specializations.map((spec, index) => (
                            <div key={index} className="flex items-center space-x-2">
                              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                              <span className="text-gray-600">{spec}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Achievements</h3>
                        <ul className="space-y-3">
                          {doctor.achievements.map((achievement, index) => (
                            <li key={index} className="flex items-start space-x-3">
                              <Award className="w-5 h-5 text-yellow-500 mt-0.5 flex-shrink-0" />
                              <span className="text-gray-600">{achievement}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Working Schedule</h3>
                        <div className="space-y-2">
                          <p className="text-gray-600">
                            <span className="font-medium">Days:</span> {doctor.workingDays.join(", ")}
                          </p>
                          <p className="text-gray-600">
                            <span className="font-medium">Hours:</span> {doctor.workingHours}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Schedule Tab */}
              {activeTab === "schedule" && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-800">Weekly Schedule</h3>
                  <div className="space-y-4">
                    {daysOfWeek.map((day) => {
                      const schedule = doctor.schedule[day.key as keyof typeof doctor.schedule]
                      return (
                        <div key={day.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-4">
                            <div className="w-24">
                              <span className="font-medium text-gray-800">{day.label}</span>
                            </div>
                            {schedule.slots > 0 ? (
                              <div className="flex items-center space-x-4 text-sm text-gray-600">
                                <span>
                                  {schedule.start} - {schedule.end}
                                </span>
                                <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">
                                  {schedule.slots} slots
                                </span>
                              </div>
                            ) : (
                              <span className="text-red-600 text-sm">Not working</span>
                            )}
                          </div>
                          <Button variant="outline" size="sm">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                        </div>
                      )
                    })}
                  </div>
                </div>
              )}

              {/* Appointments Tab */}
              {activeTab === "appointments" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">Recent Appointments</h3>
                    <Button variant="outline" size="sm">
                      View All
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {doctor.recentAppointments.map((appointment) => (
                      <div
                        key={appointment.id}
                        className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
                      >
                        <div className="flex items-center space-x-4">
                          <div>
                            <h4 className="font-medium text-gray-800">{appointment.patientName}</h4>
                            <p className="text-sm text-gray-600">
                              {appointment.date} at {appointment.time}
                            </p>
                          </div>
                          <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs capitalize">
                            {appointment.type}
                          </span>
                        </div>
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${
                            statusColors[appointment.status as keyof typeof statusColors]
                          }`}
                        >
                          {appointment.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Reviews Tab */}
              {activeTab === "reviews" && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-800">Patient Reviews</h3>
                    <div className="flex items-center space-x-2">
                      <Star className="w-5 h-5 text-yellow-400 fill-current" />
                      <span className="text-lg font-semibold text-gray-800">{doctor.rating}</span>
                      <span className="text-gray-600">({doctor.patientReviews.length} reviews)</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    {doctor.patientReviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <span className="font-medium text-gray-800">{review.patientName}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-4 h-4 ${
                                  i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600 mb-2">{review.comment}</p>
                        <p className="text-sm text-gray-500">{review.date}</p>
                      </div>
                    ))}
                  </div>

                  <Button variant="outline" className="w-full bg-transparent">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    View All Reviews
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
