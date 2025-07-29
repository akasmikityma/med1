"use client"

import { useState } from "react"
import { Search, User, Phone, Calendar, Eye, Filter } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"

// Mock patients data
const mockPatients = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1985-03-15",
    gender: "Male",
    bloodType: "O+",
    lastVisit: "2024-01-15",
    totalVisits: 12,
    status: "active",
    emergencyContact: "+1 (555) 987-6543",
    address: "123 Main St, City, State 12345",
    allergies: "Penicillin",
    conditions: ["Hypertension", "Diabetes Type 2"],
  },
  {
    id: 2,
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "+1 (555) 234-5678",
    dateOfBirth: "1990-07-22",
    gender: "Female",
    bloodType: "A+",
    lastVisit: "2024-01-18",
    totalVisits: 8,
    status: "active",
    emergencyContact: "+1 (555) 876-5432",
    address: "456 Oak Ave, City, State 12345",
    allergies: "None",
    conditions: ["Asthma"],
  },
  {
    id: 3,
    name: "Robert Wilson",
    email: "robert.wilson@email.com",
    phone: "+1 (555) 345-6789",
    dateOfBirth: "2018-12-10",
    gender: "Male",
    bloodType: "B+",
    lastVisit: "2024-01-10",
    totalVisits: 15,
    status: "active",
    emergencyContact: "+1 (555) 765-4321",
    address: "789 Pine St, City, State 12345",
    allergies: "Nuts",
    conditions: [],
  },
]

export default function PatientsPage() {
  const [patients, setPatients] = useState(mockPatients)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedPatient, setSelectedPatient] = useState<any>(null)

  const filteredPatients = patients.filter(
    (patient) =>
      patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.phone.includes(searchTerm),
  )

  const calculateAge = (dateOfBirth: string) => {
    const today = new Date()
    const birthDate = new Date(dateOfBirth)
    let age = today.getFullYear() - birthDate.getFullYear()
    const monthDiff = today.getMonth() - birthDate.getMonth()
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
      age--
    }
    return age
  }

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-gray-800">Patient Records</h1>
          <p className="text-sm text-gray-600">View and manage patient information</p>
        </div>
      </header>

      <main className="flex-1 p-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Patients</p>
                <p className="text-2xl font-bold text-blue-600">{patients.length}</p>
              </div>
              <User className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Patients</p>
                <p className="text-2xl font-bold text-green-600">
                  {patients.filter((p) => p.status === "active").length}
                </p>
              </div>
              <User className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Visits</p>
                <p className="text-2xl font-bold text-purple-600">
                  {Math.round(patients.reduce((acc, p) => acc + p.totalVisits, 0) / patients.length)}
                </p>
              </div>
              <Calendar className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">New This Month</p>
                <p className="text-2xl font-bold text-orange-600">5</p>
              </div>
              <User className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="bg-white rounded-xl border p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search patients by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        {/* Patients Table */}
        <div className="bg-white rounded-xl border overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-gray-800">Patient</th>
                  <th className="text-left p-4 font-medium text-gray-800">Contact</th>
                  <th className="text-left p-4 font-medium text-gray-800">Age/Gender</th>
                  <th className="text-left p-4 font-medium text-gray-800">Last Visit</th>
                  <th className="text-left p-4 font-medium text-gray-800">Total Visits</th>
                  <th className="text-left p-4 font-medium text-gray-800">Status</th>
                  <th className="text-left p-4 font-medium text-gray-800">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredPatients.map((patient) => (
                  <tr key={patient.id} className="hover:bg-gray-50">
                    <td className="p-4">
                      <div>
                        <h3 className="font-medium text-gray-800">{patient.name}</h3>
                        <p className="text-sm text-gray-600">{patient.email}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-1 text-sm text-gray-600">
                        <Phone className="w-4 h-4" />
                        <span>{patient.phone}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <p className="text-gray-800">{calculateAge(patient.dateOfBirth)} years</p>
                        <p className="text-gray-600">{patient.gender}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm">
                        <p className="text-gray-800">{patient.lastVisit}</p>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-sm font-medium text-gray-800">{patient.totalVisits}</span>
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          patient.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {patient.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <Button onClick={() => setSelectedPatient(patient)} variant="outline" size="sm">
                        <Eye className="w-4 h-4 mr-2" />
                        View
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {filteredPatients.length === 0 && (
          <div className="text-center py-12">
            <User className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No patients found</h3>
            <p className="text-gray-600">
              {searchTerm ? "Try adjusting your search terms" : "No patients registered yet"}
            </p>
          </div>
        )}
      </main>

      {/* Patient Details Modal */}
      {selectedPatient && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-800">Patient Details</h2>
                <Button variant="outline" onClick={() => setSelectedPatient(null)}>
                  Close
                </Button>
              </div>
            </div>

            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Basic Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                    <p className="text-gray-800">{selectedPatient.name}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Age</label>
                    <p className="text-gray-800">{calculateAge(selectedPatient.dateOfBirth)} years</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Gender</label>
                    <p className="text-gray-800">{selectedPatient.gender}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Blood Type</label>
                    <p className="text-gray-800">{selectedPatient.bloodType}</p>
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Contact Information</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-800">{selectedPatient.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                    <p className="text-gray-800">{selectedPatient.phone}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Emergency Contact</label>
                    <p className="text-gray-800">{selectedPatient.emergencyContact}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                    <p className="text-gray-800">{selectedPatient.address}</p>
                  </div>
                </div>
              </div>

              {/* Medical Info */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Medical Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Allergies</label>
                    <p className="text-gray-800">{selectedPatient.allergies}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Medical Conditions</label>
                    <div className="flex flex-wrap gap-2">
                      {selectedPatient.conditions.length > 0 ? (
                        selectedPatient.conditions.map((condition: string, index: number) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                            {condition}
                          </span>
                        ))
                      ) : (
                        <p className="text-gray-800">None</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              {/* Visit History */}
              <div>
                <h3 className="text-lg font-medium text-gray-800 mb-4">Visit History</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Last Visit</label>
                    <p className="text-gray-800">{selectedPatient.lastVisit}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Total Visits</label>
                    <p className="text-gray-800">{selectedPatient.totalVisits}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
