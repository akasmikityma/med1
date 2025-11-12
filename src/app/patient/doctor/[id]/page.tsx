"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRecoilState,useRecoilValue } from "recoil"
import { useParams } from "next/navigation"
import { ArrowLeft, Star, MapPin, Award, CheckCircle } from "lucide-react"
import { slotsForDoctorSelector } from "@/store/doctors"
import { slot,doctorsForPatient } from "@/store/doctors"
// import {  } from "@/store/doctors"
import { is } from "date-fns/locale"
// import { useParams } from "next/navigation"
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
    {
      date: "2024-01-20",
      day: "Today",
      slots: [
        { time: "2:00 PM", visitId: "mock1", clinic: "Heart Care Center", clinicAddress: "Downtown Medical Plaza" },
        { time: "3:30 PM", visitId: "mock2", clinic: "Heart Care Center", clinicAddress: "Downtown Medical Plaza" },
        { time: "4:45 PM", visitId: "mock3", clinic: "Heart Care Center", clinicAddress: "Downtown Medical Plaza" },
      ],
    },
    // ...more dates...
  ],
}
export default function DoctorProfilePage() {
  const params = useParams()
  const [selectedDate, setSelectedDate] = useState(mockDoctor.availableSlots[0].date)
  const [selectedTime, setSelectedTime] = useState("")
  const [active,setActive] = useState(false);
  const doctorId = params.id as string;
  const doctors = useRecoilValue<any[]>(doctorsForPatient);
  const doctor = doctors.find((d) => d.id === doctorId);
  const mappedDoctor = doctor ? mapDoctorToMockDoctor(doctor) : mockDoctor;
  const alltheslots = useRecoilValue(slotsForDoctorSelector(doctorId));
  const[visitId,setVisitId] = useState("");
  const selectedDateSlots = mappedDoctor.availableSlots.find((slot) => slot.date === selectedDate);
  // const selectedVisit = selectedDateSlots?.slots.find((slot:slot)=>{
  //     return slot.date.
  // })
  
    // const selectedSLotObj = selectedDateSlots?.slots.find((slot)=> slot.time === selectedTime);
    // const visit_Id = selectedSLotObj?.visitId ||"";
    // setVisitId(visit_Id);
  
  const isActiveToday = () => {
    const today = new Date();
    const todayStr = today.toISOString().split("T")[0]; // "YYYY-MM-DD"

    return alltheslots.some(
      (slot: slot) => slot.date.split("T")[0] === todayStr
    );
  };

  // useEffect(() => {
  //   console.log("Doctor",doctor);
  //   console.log("mappedDoctor",mappedDoctor);
  //   setActive(isActiveToday());
  //   const selectedSLotObj = selectedDateSlots?.slots.find((slot)=> slot.time === selectedTime);
  //   const visit_Id = selectedSLotObj?.visitId ||"";
  //   setVisitId(visit_Id);
  //   // getVisitId()
  // }, [alltheslots]); 
  useEffect(() => {
  const selectedDateSlots = mappedDoctor.availableSlots.find((slot) => slot.date === selectedDate);
  const selectedSlotObj = selectedDateSlots?.slots.find((slot) => slot.time === selectedTime);
  const visit_Id = selectedSlotObj?.visitId || "";
  setVisitId(visit_Id);
}, [selectedDate, selectedTime, mappedDoctor]);
  const handleBookAppointment = () => {
    if (selectedTime) {
      // Navigate to booking confirmation
      window.location.href = `/patient/book-appointments?doctor=${params.id}&date=${selectedDate}&time=${selectedTime}&visitId=${visitId}`;
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
                  src={mappedDoctor.image || "/placeholder.svg"}
                  alt={mappedDoctor.name}
                  className="w-32 h-32 rounded-full object-cover mx-auto md:mx-0"
                />
                <div className="flex-1 text-center md:text-left">
                  <h2 className="text-3xl font-bold text-gray-800 mb-2">{mappedDoctor.name}</h2>
                  <p className="text-xl text-blue-600 font-medium mb-4">{mappedDoctor.specialty}</p>

                  <div className="flex flex-wrap justify-center md:justify-start gap-4 text-sm text-gray-600 mb-4">
                    <div className="flex items-center space-x-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span>
                        {mappedDoctor.rating} ({mappedDoctor.reviews} reviews)
                      </span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Award className="w-4 h-4" />
                      <span>{mappedDoctor.experience} experience</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-4 h-4" />
                      <span>{mappedDoctor.clinic}</span>
                    </div>
                  </div>

                  <div className="text-center md:text-left">
                    {active ? (
                      <span className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Available Today
                      </span>
                    ) : (
                      <span className="inline-block bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-medium">
                        Not Available Today
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* About */}
            <div className="bg-white rounded-xl shadow-sm border p-6 mb-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">About</h3>
              <p className="text-gray-600 leading-relaxed">{mappedDoctor.about}</p>
            </div>

            {/* Education & Specializations */}
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-xl shadow-sm border p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Education</h3>
                <ul className="space-y-2">
                  {mappedDoctor.education.map((edu, index) => (
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
                  {mappedDoctor.specializations.map((spec, index) => (
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
                <p className="text-3xl font-bold text-gray-800">${mappedDoctor.consultationFee}</p>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Select Date</h3>
                <div className="space-y-2">
                  {mappedDoctor.availableSlots.map((slot) => (
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
                    {selectedDateSlots.slots.map((slot) => (
                      <button
                        key={slot.time}
                        onClick={() => setSelectedTime(slot.time)}
                        className={`p-3 rounded-lg border-2 text-sm font-medium transition-colors ${
                          selectedTime === slot.time
                            ? "border-blue-500 bg-blue-50 text-blue-700"
                            : "border-gray-200 hover:border-blue-300 text-gray-700"
                        }`}
                      >
                        {slot.time}
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

// function mapDoctorToMockDoctor(doctor: any): typeof mockDoctor {
//   return {
//     id: doctor.id,
//     name: doctor.name,
//     specialty: doctor.specialization,
//     clinic: doctor.clinics?.[0]?.name || "Unknown Clinic",
//     location: doctor.clinics?.[0]?.address || "Unknown Location",
//     rating: 4.8, // fallback/mock
//     reviews: 124, // fallback/mock
//     experience: `${doctor.experience} years`,
//     image: "/placeholder.svg?height=200&width=200", // fallback/mock
//     consultationFee: 150, // fallback/mock
//     about:
//       doctor.about ||
//       "This doctor is a board-certified specialist. More information will be available soon.",
//     education: [
//       "MD - Harvard Medical School",
//       "Residency - Johns Hopkins Hospital",
//       "Fellowship - Mayo Clinic",
//     ], // fallback/mock
//     specializations: [
//       doctor.specialization,
//       "Preventive Cardiology",
//       "Heart Disease Management",
//       "Cardiac Rehabilitation",
//       "Hypertension Treatment",
//     ], // fallback/mock + real
//     languages: ["English", "Spanish"], // fallback/mock
//     availableSlots: doctor.slots
//       ? groupSlotsByDate(doctor.slots)
//       : [], // see helper below
//   };
// }

function mapDoctorToMockDoctor(doctor: any): typeof mockDoctor {
  return {
    id: doctor.id,
    name: doctor.name,
    specialty: doctor.specialization,
    clinic: doctor.clinics?.[0]?.name || "Unknown Clinic",
    location: doctor.clinics?.[0]?.address || "Unknown Location",
    rating: 4.8, // fallback/mock
    reviews: 124, // fallback/mock
    experience: `${doctor.experience} years`,
    image: "/placeholder.svg?height=200&width=200", // fallback/mock
    consultationFee: 150, // fallback/mock
    about:
      doctor.about ||
      "This doctor is a board-certified specialist. More information will be available soon.",
    education: [
      "MD - Harvard Medical School",
      "Residency - Johns Hopkins Hospital",
      "Fellowship - Mayo Clinic",
    ], // fallback/mock
    specializations: [
      doctor.specialization,
      "Preventive Cardiology",
      "Heart Disease Management",
      "Cardiac Rehabilitation",
      "Hypertension Treatment",
    ], // fallback/mock + real
    languages: ["English", "Spanish"], // fallback/mock
    availableSlots: doctor.slots
      ? groupSlotsByDate(doctor.slots)
      : [],
  };
}


// Helper to group slots by date for the UI
// function groupSlotsByDate(slots: any[]) {
//   // { "2025-09-29": { date: "2025-09-29", day: "Monday", slots: ["10:00", "12:00"] }, ... }
//   const grouped: Record<string, { date: string; day: string; slots: string[] }> = {};
//   slots.forEach((slot) => {
//     const dateStr = slot.date.split("T")[0];
//     const dateObj = new Date(slot.date);
//     const day = dateObj.toLocaleDateString(undefined, { weekday: "long" });
//     if (!grouped[dateStr]) {
//       grouped[dateStr] = { date: dateStr, day, slots: [] };
//     }
//     grouped[dateStr].slots.push(slot.time);
//   });
//   return Object.values(grouped);
// }
function groupSlotsByDate(slots: any[]) {
  // { "2025-09-29": { date: "2025-09-29", day: "Monday", slots: [ { time, visitId, ... }, ... ] }, ... }
  const grouped: Record<
    string,
    { date: string; day: string; slots: { time: string; visitId: string; clinic: string; clinicAddress: string }[] }
  > = {};
  slots.forEach((slot) => {
    const dateStr = slot.date.split("T")[0];
    const dateObj = new Date(slot.date);
    const day = dateObj.toLocaleDateString(undefined, { weekday: "long" });
    if (!grouped[dateStr]) {
      grouped[dateStr] = { date: dateStr, day, slots: [] };
    }
    grouped[dateStr].slots.push({
      time: slot.time,
      visitId: slot.visitId,
      clinic: slot.clinic,
      clinicAddress: slot.clinicAddress,
    });
  });
  return Object.values(grouped);
}