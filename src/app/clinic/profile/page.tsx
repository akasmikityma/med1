"use client"

import { useState } from "react"
import { Edit, Save, X, MapPin, Phone, Mail, Clock, Globe } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

export default function ClinicProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)

  const [clinicData, setClinicData] = useState({
    name: "Heart Care Medical Center",
    description:
      "A leading healthcare facility specializing in comprehensive medical care with state-of-the-art equipment and experienced medical professionals.",
    address: "123 Medical Plaza, Downtown District, City, State 12345",
    phone: "+1 (555) 123-4567",
    email: "info@heartcaremedical.com",
    website: "www.heartcaremedical.com",
    establishedYear: "2010",
    licenseNumber: "HC-2010-12345",
    operatingHours: {
      monday: { open: "08:00", close: "18:00", isOpen: true },
      tuesday: { open: "08:00", close: "18:00", isOpen: true },
      wednesday: { open: "08:00", close: "18:00", isOpen: true },
      thursday: { open: "08:00", close: "18:00", isOpen: true },
      friday: { open: "08:00", close: "18:00", isOpen: true },
      saturday: { open: "09:00", close: "15:00", isOpen: true },
      sunday: { open: "10:00", close: "14:00", isOpen: false },
    },
    services: [
      "General Medicine",
      "Cardiology",
      "Dermatology",
      "Pediatrics",
      "Emergency Care",
      "Laboratory Services",
      "Radiology",
      "Pharmacy",
    ],
    insurance: ["Blue Cross Blue Shield", "Aetna", "Cigna", "UnitedHealth", "Medicare", "Medicaid"],
  })

  const handleInputChange = (field: string, value: any) => {
    setClinicData({ ...clinicData, [field]: value })
  }

  const handleHoursChange = (day: string, field: string, value: any) => {
    setClinicData({
      ...clinicData,
      operatingHours: {
        ...clinicData.operatingHours,
        [day]: {
          ...clinicData.operatingHours[day as keyof typeof clinicData.operatingHours],
          [field]: value,
        },
      },
    })
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsSaving(false)
    setIsEditing(false)
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

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-gray-800">Clinic Profile</h1>
          <p className="text-sm text-gray-600">Manage your clinic information and settings</p>
        </div>
        <div className="flex space-x-2">
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Edit Profile
            </Button>
          ) : (
            <>
              <Button onClick={() => setIsEditing(false)} variant="outline">
                <X className="w-4 h-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={isSaving} className="bg-green-600 hover:bg-green-700">
                <Save className="w-4 h-4 mr-2" />
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </>
          )}
        </div>
      </header>

      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Basic Information */}
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Basic Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Clinic Name</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={clinicData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-800">{clinicData.name}</p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Established Year</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={clinicData.establishedYear}
                    onChange={(e) => handleInputChange("establishedYear", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-800">{clinicData.establishedYear}</p>
                )}
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                {isEditing ? (
                  <textarea
                    value={clinicData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-800">{clinicData.description}</p>
                )}
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Contact Information</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={clinicData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-800">{clinicData.address}</p>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                {isEditing ? (
                  <input
                    type="tel"
                    value={clinicData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-800">{clinicData.phone}</p>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                {isEditing ? (
                  <input
                    type="email"
                    value={clinicData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-800">{clinicData.email}</p>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                {isEditing ? (
                  <input
                    type="url"
                    value={clinicData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <div className="flex items-center space-x-2">
                    <Globe className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-800">{clinicData.website}</p>
                  </div>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">License Number</label>
                {isEditing ? (
                  <input
                    type="text"
                    value={clinicData.licenseNumber}
                    onChange={(e) => handleInputChange("licenseNumber", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                ) : (
                  <p className="text-gray-800">{clinicData.licenseNumber}</p>
                )}
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Operating Hours</h2>
            <div className="space-y-4">
              {daysOfWeek.map((day) => {
                const hours = clinicData.operatingHours[day.key as keyof typeof clinicData.operatingHours]
                return (
                  <div key={day.key} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-24">
                      <span className="font-medium text-gray-800">{day.label}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={hours.isOpen}
                        onChange={(e) => handleHoursChange(day.key, "isOpen", e.target.checked)}
                        disabled={!isEditing}
                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-600">Open</span>
                    </div>
                    {hours.isOpen && (
                      <>
                        <div className="flex items-center space-x-2">
                          <Clock className="w-4 h-4 text-gray-400" />
                          <input
                            type="time"
                            value={hours.open}
                            onChange={(e) => handleHoursChange(day.key, "open", e.target.value)}
                            disabled={!isEditing}
                            className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                          />
                          <span className="text-gray-600">to</span>
                          <input
                            type="time"
                            value={hours.close}
                            onChange={(e) => handleHoursChange(day.key, "close", e.target.value)}
                            disabled={!isEditing}
                            className="px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
                          />
                        </div>
                      </>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Services */}
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Services Offered</h2>
            <div className="grid md:grid-cols-3 gap-3">
              {clinicData.services.map((service, index) => (
                <div key={index} className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <span className="text-blue-800 font-medium">{service}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Insurance */}
          <div className="bg-white rounded-xl border p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">Accepted Insurance</h2>
            <div className="grid md:grid-cols-3 gap-3">
              {clinicData.insurance.map((insurance, index) => (
                <div key={index} className="flex items-center p-3 bg-green-50 rounded-lg">
                  <span className="text-green-800 font-medium">{insurance}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
