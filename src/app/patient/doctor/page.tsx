
"use client"

import { useState, useEffect, useMemo } from "react"
import Link from "next/link"
import { useRecoilState, useRecoilValue } from "recoil"
import { Search, Filter, MapPin, Star, Clock, Calendar } from "lucide-react"
import { PatientHeader } from "../PatientComps/patientHeader"
import { doctorsForPatient } from "@/store/doctors"
const specialties = ["All", "Cardiologist", "Dermatologist", "Pediatrician", "Neurologist", "Orthopedic"]

export default function DoctorsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedSpecialty, setSelectedSpecialty] = useState("All")
  const [showFilters, setShowFilters] = useState(false)
  const [doctors, setDoctors] = useRecoilState<any[]>(doctorsForPatient)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchDoctors = async () => {
      setLoading(true)
      const res = await fetch("/api/patient/doctors")
      const data = await res.json()
      setDoctors(data.items);
      localStorage.setItem("doctorsForPatient",JSON.stringify(data.items));
      setLoading(false)
    }
    fetchDoctors()
  }, [])

  // Filtering logic
  const filteredDoctors = useMemo(() => {
    console.log("doctors at doctors page ",doctors);
    return doctors.filter((doctor) => {
      const matchesSearch =
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesSpecialty = selectedSpecialty === "All" || doctor.specialization === selectedSpecialty
      return matchesSearch && matchesSpecialty
    })
  }, [doctors, searchTerm, selectedSpecialty])

  return (
    <div className="flex flex-1 flex-col">
      <PatientHeader title="Find a Doctor" subtitle="Browse available doctors and book your appointment" />

      <main className="flex-1 p-6">
        {/* Search and Filters */}
        <div className="bg-white rounded-xl shadow-sm border p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                placeholder="Search doctors by name or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              <Filter className="w-5 h-5" />
              <span>Filters</span>
            </button>
          </div>

          {/* Specialty Filter */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t">
              <h3 className="font-medium text-gray-800 mb-3">Specialty</h3>
              <div className="flex flex-wrap gap-2">
                {specialties.map((specialty) => (
                  <button
                    key={specialty}
                    onClick={() => setSelectedSpecialty(specialty)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedSpecialty === specialty
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {specialty}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Results */}
        <div className="mb-4">
          <p className="text-gray-600">
            {loading
              ? "Loading doctors..."
              : `Showing ${filteredDoctors.length} doctor${filteredDoctors.length !== 1 ? "s" : ""}${
                  selectedSpecialty !== "All" ? ` in ${selectedSpecialty}` : ""
                }`}
          </p>
        </div>

        {/* Doctor Cards */}
        <div className="grid gap-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-xl shadow-sm border hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Doctor Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={"/placeholder.svg"}
                      alt={doctor.name}
                      className="w-24 h-24 rounded-full object-cover"
                    />
                  </div>

                  {/* Doctor Info */}
                  <div className="flex-1">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                      <div className="mb-4 md:mb-0">
                        <h3 className="text-xl font-semibold text-gray-800 mb-1">{doctor.name}</h3>
                        <p className="text-blue-600 font-medium mb-2">{doctor.specialization}</p>

                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          {/* You can add rating/reviews if available */}
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span>4.8</span>
                            <span>(124 reviews)</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-4 h-4" />
                            <span>{doctor.experience} years experience</span>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1 text-sm text-gray-600 mb-2">
                          <MapPin className="w-4 h-4" />
                          <span>
                            {doctor.nextAvailable.clinic
                              ? `${doctor.nextAvailable.clinic}, ${doctor.nextAvailable.clinicAddress}`
                              : "No clinic info"}
                          </span>
                        </div>

                        <div className="flex items-center space-x-1 text-sm text-green-600">
                          <Calendar className="w-4 h-4" />
                          <span>
                            Next available:{" "}
                            {doctor.nextAvailable
                              ? `${new Date(doctor.nextAvailable.date).toLocaleDateString()} ${doctor.nextAvailable.time}`
                              : "No slots"}
                          </span>
                        </div>
                      </div>

                      {/* Booking Section */}
                      <div className="text-right">
                        <div className="mb-3">
                          <p className="text-sm text-gray-600">Consultation Fee</p>
                          <p className="text-2xl font-bold text-gray-800">
                            {/* If you have fee info, use it; else show placeholder */}
                            $120
                          </p>
                        </div>
                        <Link
                          href={`/patient/doctor/${doctor.id}`}
                          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors"
                        >
                          View Profile & Book
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {!loading && filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No doctors found</h3>
            <p className="text-gray-600">Try adjusting your search or filters</p>
          </div>
        )}
      </main>
    </div>
  )
}