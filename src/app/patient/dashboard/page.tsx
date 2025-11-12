"use client"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Calendar, Clock, User, Bell } from "lucide-react"
import TinyAppointmentCard from "@/app/comps/TinyAppointmentCard"
import { useRecoilState } from "recoil"
import { allAppointmetns, Appointment } from "@/store/Patient/Appointments"
import { time } from "console"
import Link from "next/link"
export default function PatientDashboard() {
  const { data: session } = useSession();
  const [MyAppointments,setMyAppointments] = useRecoilState(allAppointmetns);
  const [contentThere,setContentThere] = useState(true);
  // useEffect(()=>{
  //   setContentThere(true)
  // })
  useEffect(()=>{
      const getAppointmentsData = async()=>{
        try{
          const response = await fetch('/api/patient/appointments');
          const data = await response.json();
  
          console.log("appointments",JSON.stringify(data));
          setMyAppointments(data);
        }catch(err){
          console.log(err);
        }
      }
      getAppointmentsData();
    },[]);
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="text-2xl">🏥</div>
              <h1 className="text-2xl font-bold text-gray-800">QuickDoc</h1>
            </div>
            <div className="flex items-center space-x-4">
              <Bell className="w-6 h-6 text-gray-600" />
              <img src={session?.user?.image || ""} alt="Profile" className="w-8 h-8 rounded-full" />
              <span className="text-sm text-gray-600">{session?.user?.name}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-5xl mx-auto">
      <main className="px-4 py-8">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {session?.user?.name?.split(" ")[0]}! 👋
          </h2>
          <p className="text-gray-600">Manage your appointments and healthcare journey from here.</p>
        </div>

        {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <Link href="/patient/doctor">
              <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <Calendar className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Book Appointment</h3>
                    <p className="text-sm text-gray-600">Find and book with doctors</p>
                  </div>
                </div>
              </div>
            </Link>

          <Link href="/patient/appointments">
            <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Clock className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">My Appointments : {MyAppointments.length}</h3>
                <p className="text-sm text-gray-600">View upcoming visits</p>
              </div>
            </div>
          </div>
          </Link>

           <Link href="/patient/profile">
              <div className="bg-white p-6 rounded-xl shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <User className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800">My Profile</h3>
                <p className="text-sm text-gray-600">Update your information</p>
              </div>
            </div>
          </div>
           </Link>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Recent Activity</h3>
          {!contentThere?(
            <div className="text-center py-8 text-gray-500">
            <Calendar className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p>No recent appointments</p>
            <p className="text-sm">Book your first appointment to get started!</p>
          </div>
          ):(
             <div>
                <h3> Coming Appointments</h3>
                {MyAppointments.map((appoint)=>(
                  <TinyAppointmentCard doctorName={appoint.doctorVisit.doctor.name} time={appoint.time} date={appoint.date}/>
                ))}
             </div>
          )}
        </div>
      </main>
      </div>
    </div>
  )
}
