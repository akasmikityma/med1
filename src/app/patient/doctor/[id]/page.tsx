"use client"

import { useState } from "react"
import Link from "next/link"
import { useParams } from "next/navigation"
import { ArrowLeft, Star, MapPin, Award, CheckCircle } from "lucide-react"

// Mock doctor data - replace with real API call
const mockDoctor = {
  id: 1,
  name: "Dr. Sarah Johnson",
  specialty: "Cardiologist",
  clinic: "Heart Care Center",
  location: "Downtown Medical Plaza",
  rating: 4.8,
  reviews: 124,
  experience: "15 years",
  image: "/placeholder.svg?height=200&width=200",
  consultationFee: 150,
  about:
    "Dr. Sarah Johnson is a board-certified cardiologist with over 15 years of experience in treating heart conditions. She specializes in preventive cardiology, heart disease management, and cardiac rehabilitation.",
  education: ["MD - Harvard Medical School", "Residency - Johns Hopkins Hospital", "Fellowship - Mayo Clinic"],
  specializations: [
    "Preventive Cardiology",
    "Heart Disease Management",
    "Cardiac Rehabilitation",
    "Hypertension Treatment",
  ],
  languages: ["English", "Spanish"],
  availableSlots: [
    { date: "2024-01-20", day: "Today", slots: ["2:00 PM", "3:30 PM", "4:45 PM"] },
    { date: "2024-01-21", day: "Tomorrow", slots: ["9:00 AM", "10:30 AM", "2:00 PM", "3:30 PM"] },
    { date: "2024-01-22", day: "Monday", slots: ["9:00 AM", "11:00 AM", "2:00 PM"] },
  ],
}

export default function DoctorProfilePage() {
  const params = useParams()
  const [selectedDate, setSelectedDate] = useState(mockDoctor.availableSlots[0].date)
  const [selectedTime, setSelectedTime] = useState("")

  const selectedDateSlots = mockDoctor.availableSlots.find((slot) => slot.date === selectedDate)

  const handleBookAppointment = () => {
    if (selectedTime) {
      // Navigate to booking confirmation
      window.location.href = `/patient/book-appointment?doctor=${params.id}&date=${selectedDate}&time=${selectedTime}`
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href="/patient/doctor" className="p-2 hover:bg-gray-100 rounded-full">
              <ArrowLeft className="w-6 h-6 text-gray-600" />
            </Link>
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🏥</div>
              <h1 className="text-2xl font-bold text-gray-800">QuickDoc</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Doctor Profile */}
          <div className="lg:col-span-2">
            {/* Basic Info */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <div className="flex flex-col md:flex-row gap-6">
                <img
                  src={mockDoctor.image || "/placeholder.svg"}
                  alt={mockDoctor.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
                />
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">{mockDoctor.name}</h2>
                  <p className="text-xl text-blue-600 font-medium mb-4">{mockDoctor.specialty}</p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>
                        {mockDoctor.rating} ({mockDoctor.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="w-4 h-4" />
                      <span>{mockDoctor.experience} experience</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{mockDoctor.clinic}</span>
                    </div>
                  </div>

                  <div className="text-center md:text-left">
                    <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                      Available Today
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">About</h3>
              <p className="text-gray-600 leading-relaxed">{mockDoctor.about}</p>
            </div>

            {/* Education & Specializations */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Education</h3>
                <ul className="space-y-2">
                  {mockDoctor.education.map((edu, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{edu}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Specializations</h3>
                <ul className="space-y-2">
                  {mockDoctor.specializations.map((spec, index) => (
                    <li key={index} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Booking Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border p-6 sticky top-8">
              <div className="text-center mb-6">
                <p className="text-sm text-gray-600">Consultation Fee</p>
                <p className="text-3xl font-bold text-gray-800">${mockDoctor.consultationFee}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Date</h3>
                <div className="space-y-2">
                  {mockDoctor.availableSlots.map((slot) => (
                    <button
                      key={slot.date}
                      onClick={() => {
                        setSelectedDate(slot.date)
                        setSelectedTime("")
                      }}
                      className={`w-full p-3 rounded-lg border-2 text-left transition-colors ${
                        selectedDate === slot.date
                          ? "border-blue-500 bg-blue-50"
                          : "border-gray-200 hover:border-blue-300"
                      }`}
                    >
                      <div className="font-medium text-gray-800">{slot.day}</div>
                      <div className="text-sm text-gray-600">{slot.slots.length} slots available</div>
                    </button>
                  ))}
                </div>
              </div>

              {selectedDateSlots && (
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Time</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {selectedDateSlots.slots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                          selectedTime === time
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-blue-300 text-gray-700"
                        }`}
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={handleBookAppointment}
                disabled={!selectedTime}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                Book Appointment
              </button>

              <div className="mt-4 text-center">
                <p className="text-xs text-gray-500">By booking, you agree to our terms and conditions</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
