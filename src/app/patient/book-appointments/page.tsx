"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { ArrowLeft, Calendar, User, CheckCircle } from "lucide-react"

export default function BookAppointmentPage() {
  const searchParams = useSearchParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isBooked, setIsBooked] = useState(false)

  const [formData, setFormData] = useState({
    reason: "",
    symptoms: "",
    phone: "",
    emergencyContact: "",
    notes: "",
  })

  // Get booking details from URL params
  const doctorId = searchParams.get("doctor")
  const selectedDate = searchParams.get("date")
  const selectedTime = searchParams.get("time")

  // Mock doctor data - in real app, fetch based on doctorId
  const doctor = {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    clinic: "Heart Care Center",
    fee: 150,
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000))

    setIsSubmitting(false)
    setIsBooked(true)
  }

  if (isBooked) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-md w-full mx-4 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Appointment Booked!</h2>
          <p className="text-gray-600 mb-6">
            Your appointment with {doctor.name} has been confirmed for {selectedDate} at {selectedTime}.
          </p>
          <div className="space-y-3">
            <Link
              href="/patient/appointments"
              className="block w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
            >
              View My Appointments
            </Link>
            <Link
              href="/patient/dashboard"
              className="block w-full text-gray-600 hover:text-gray-800 transition-colors"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link href={`/patient/doctor/${doctorId}`} className="p-2 hover:bg-gray-100 rounded-full">
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
        <div className="max-w-2xl mx-auto">
          <div className="mb-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Book Appointment</h2>
            <p className="text-gray-600">Please provide additional details for your appointment</p>
          </div>

          {/* Appointment Summary */}
          <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Appointment Summary</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <User className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Doctor</p>
                  <p className="font-medium text-gray-800">{doctor.name}</p>
                  <p className="text-sm text-blue-600">{doctor.specialty}</p>
                </div>
              </div>
              <div className="flex items-center space-x-3">
                <Calendar className="w-5 h-5 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Date & Time</p>
                  <p className="font-medium text-gray-800">{selectedDate}</p>
                  <p className="text-sm text-gray-600">{selectedTime}</p>
                </div>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Consultation Fee</span>
                <span className="text-xl font-bold text-gray-800">${doctor.fee}</span>
              </div>
            </div>
          </div>

          {/* Booking Form */}
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">Patient Information</h3>

            <div className="space-y-6">
              <div>
                <label htmlFor="reason" className="block text-sm font-medium text-gray-700 mb-2">
                  Reason for Visit *
                </label>
                <input
                  type="text"
                  id="reason"
                  name="reason"
                  required
                  value={formData.reason}
                  onChange={handleInputChange}
                  placeholder="e.g., Regular checkup, chest pain, follow-up"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label htmlFor="symptoms" className="block text-sm font-medium text-gray-700 mb-2">
                  Current Symptoms
                </label>
                <textarea
                  id="symptoms"
                  name="symptoms"
                  rows={3}
                  value={formData.symptoms}
                  onChange={handleInputChange}
                  placeholder="Describe any symptoms you're experiencing..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 123-4567"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>

                <div>
                  <label htmlFor="emergencyContact" className="block text-sm font-medium text-gray-700 mb-2">
                    Emergency Contact
                  </label>
                  <input
                    type="tel"
                    id="emergencyContact"
                    name="emergencyContact"
                    value={formData.emergencyContact}
                    onChange={handleInputChange}
                    placeholder="+1 (555) 987-6543"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  id="notes"
                  name="notes"
                  rows={3}
                  value={formData.notes}
                  onChange={handleInputChange}
                  placeholder="Any additional information you'd like the doctor to know..."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="mt-8 pt-6 border-t">
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href={`/patient/doctor/${doctorId}`}
                  className="flex-1 text-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  Back
                </Link>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 disabled:bg-blue-400 transition-colors flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Booking...
                    </>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
