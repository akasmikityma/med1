"use client"

import { useState,useEffect } from "react"
import { Plus, Search, Edit, Trash2, Star, Users } from "lucide-react"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { DoctorDefaults,DoctorsListDefaults } from "./Constants"
import Link from "next/link"
import { doctorsState } from "@/store/doctors" 
import { useRecoilState } from "recoil"

export default function DoctorsPage() {
  // const [doctors, setDoctors] = useState(DoctorsListDefaults);
  const [doctors,setDoctors]  = useRecoilState(doctorsState);
  const [searchTerm, setSearchTerm] = useState("")
  const [isLoading, setIsLoading]  = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(()=>{
    const fetchDoctors = async ()=>{
      try{
        const response = await fetch("/api/clinic/doctors");
        if(!response.ok){
          throw new Error(`Failed to fetch the doctors : ${response.statusText}`);
        }
        const data = await response.json();
        console.log("fetched doctors",data);

        const mappedDoctors = data.map((doctor: any) => ({
          ...doctors,
          id: doctor.id,
          name: doctor.name || DoctorDefaults.name,
          specialty: doctor.specialization || DoctorDefaults.specialty,
          experience: doctor.experience || DoctorDefaults.experience,
          education: doctor.qualifications || DoctorDefaults.education,
          contact: doctor.contact || DoctorDefaults.contact,
          // Map other fields as needed
          // You can add default values for missing fields
          email: doctor.email || DoctorDefaults.email,
          phone: doctor.phone || DoctorDefaults.phone,
          rating: doctor.rating || DoctorDefaults.rating,
          totalAppointments: doctor.totalAppointments || DoctorDefaults.totalAppointments,
          status: doctor.status || DoctorDefaults.status,
          consultationFee: doctor.consultationFee || DoctorDefaults.consultationFee,
        }))

        setDoctors(mappedDoctors);
      }catch(err){
        console.error("Error fetching doctors : ",err);
      }finally{
        setIsLoading(false)
      }
    }  

    fetchDoctors();
  },[])

  const filteredDoctors = doctors.filter(
    (doctor) =>
      doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const handleDeleteDoctor = (id: string) => {
    if (confirm("Are you sure you want to remove this doctor?")) {
      setDoctors(doctors.filter((doctor) => doctor.id !== id))
    }
  }

  const toggleDoctorStatus = (id: string) => {
    setDoctors(
      doctors.map((doctor) =>
        doctor.id === id ? { ...doctor, status: doctor.status === "active" ? "inactive" : "active" } : doctor,
      ),
    )
  }

  return (
    <div className="flex flex-1 flex-col">
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <div className="flex-1">
          <h1 className="text-xl font-semibold text-gray-800">Doctor Management</h1>
          <p className="text-sm text-gray-600">Manage your clinic's doctors and their profiles</p>
        </div>
      </header>

      <main className="flex-1 p-6">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Doctors</p>
                <p className="text-2xl font-bold text-gray-800">{doctors.length}</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Active Doctors</p>
                <p className="text-2xl font-bold text-green-600">
                  {doctors.filter((d) => d.status === "active").length}
                </p>
              </div>
              <Users className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Specialties</p>
                <p className="text-2xl font-bold text-purple-600">{new Set(doctors.map((d) => d.specialty)).size}</p>
              </div>
              <Star className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white p-4 rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Avg Rating</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {(doctors.reduce((acc, d) => acc + d.rating, 0) / doctors.length).toFixed(1)}
                </p>
              </div>
              <Star className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Actions Bar */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search doctors by name or specialty..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <Button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Add Doctor
          </Button>
        </div>

        {/* Doctors Grid */}
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="bg-white rounded-xl border hover:shadow-md transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <img
                      src={doctor.image || "/placeholder.svg"}
                      alt={doctor.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold text-gray-800">{doctor.name}</h3>
                      <p className="text-blue-600 font-medium">{doctor.specialty}</p>
                      <div className="flex items-center space-x-1 mt-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">{doctor.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteDoctor(doctor.id)}
                      className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-2 text-sm text-gray-600 mb-4">
                  <p>
                    <span className="font-medium">Experience:</span> {doctor.experience}
                  </p>
                  <p>
                    <span className="font-medium">Education:</span> {doctor.education}
                  </p>
                  <p>
                    <span className="font-medium">Fee:</span> ${doctor.consultationFee}
                  </p>
                  <p>
                    <span className="font-medium">Appointments:</span> {doctor.totalAppointments}
                  </p>
                </div>

                <div className="flex items-center justify-between">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      doctor.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}
                  >
                    {doctor.status === "active" ? "Active" : "Inactive"}
                  </span>
                  <div className="flex space-x-2">
                    <Link
                      href={`/clinic/doctors/${doctor.id}`}
                      className="px-3 py-1 bg-blue-100 text-blue-700 hover:bg-blue-200 rounded-lg text-sm font-medium transition-colors"
                    >
                      View Profile
                    </Link>
                    <button
                      onClick={() => toggleDoctorStatus(doctor.id)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                        doctor.status === "active"
                          ? "bg-red-100 text-red-700 hover:bg-red-200"
                          : "bg-green-100 text-green-700 hover:bg-green-200"
                      }`}
                    >
                      {doctor.status === "active" ? "Deactivate" : "Activate"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">No doctors found</h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? "Try adjusting your search terms" : "Start by adding your first doctor"}
            </p>
            <Button onClick={() => setShowAddModal(true)} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="w-4 h-4 mr-2" />
              Add Doctor
            </Button>
          </div>
        )}
      </main>

      {/* Add Doctor Modal - Placeholder */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-xl font-semibold mb-4">Add New Doctor</h2>
            <p className="text-gray-600 mb-6">Doctor registration form would go here</p>
            <div className="flex space-x-4">
              <Button variant="outline" onClick={() => setShowAddModal(false)} className="flex-1">
                Cancel
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Add Doctor</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
