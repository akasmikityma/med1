// "use client"

// import type React from "react"

// import { useState } from "react"
// import Link from "next/link"
// import { ArrowLeft, Plus, Save, X, Clock, Calendar, User } from "lucide-react"
// import { SidebarTrigger } from "@/components/ui/sidebar"
// import { Button } from "@/components/ui/button"
// import { doctorsState,doctorsLoadingState, useDoctorVisits } from "@/store/doctors"
// import { useDoctors } from "@/store/doctors"
// import { useRecoilValue } from "recoil"
// import { createVisitLoadingState } from "@/store/doctors/DoctorVisits"
// // Mock doctors data - in real app, fetch from your database
// const mockDoctors = [
//   {
//     id: "1",
//     name: "Dr. Sarah Johnson",
//     specialization: "Cardiologist",
//     experience: 15,
//   },
//   {
//     id: "2",
//     name: "Dr. Michael Chen",
//     specialization: "Dermatologist",
//     experience: 12,
//   },
//   {
//     id: "3",
//     name: "Dr. Emily Rodriguez",
//     specialization: "Pediatrician",
//     experience: 10,
//   },
// ]

// const daysOfWeek = [
//   { value: 0, label: "Sunday" },
//   { value: 1, label: "Monday" },
//   { value: 2, label: "Tuesday" },
//   { value: 3, label: "Wednesday" },
//   { value: 4, label: "Thursday" },
//   { value: 5, label: "Friday" },
//   { value: 6, label: "Saturday" },
// ]

// interface DoctorVisitForm {
//   doctorId: string
//   dayOfWeek: number
//   startTime: string
//   endTime: string
// }

// export default function CreateDoctorVisitPage() {
//   const [formData,setFormData] = useState({
//        doctorId: '',
//       dayOfWeek: 1,
//       startTime: '',
//       endTime: '',
//   })
//   const doctors = useRecoilValue(doctorsState)
//   const isLoading = useRecoilValue(createVisitLoadingState);
//   const { fetchDoctors } = useDoctors();
//   const { createVisit, error } = useDoctorVisits();
//   const [isSubmitting, setIsSubmitting] = useState(false)
//   // const [doctorVisits, setDoctorVisits] = useState<DoctorVisitForm[]>([
//   //   {
//   //     doctorId: "",
//   //     dayOfWeek: 1, // Monday
//   //     startTime: "09:00",
//   //     endTime: "17:00",
//   //   },
//   // ])

//   const addDoctorVisit = () => {
//     setDoctorVisits([
//       ...doctorVisits,
//       {
//         doctorId: "",
//         dayOfWeek: 1,
//         startTime: "09:00",
//         endTime: "17:00",
//       },
//     ])
//   }

//   const removeDoctorVisit = (index: number) => {
//     if (doctorVisits.length > 1) {
//       setDoctorVisits(doctorVisits.filter((_, i) => i !== index))
//     }
//   }

//   const updateDoctorVisit = (index: number, field: keyof DoctorVisitForm, value: string | number) => {
//     const updated = doctorVisits.map((visit, i) => (i === index ? { ...visit, [field]: value } : visit))
//     setDoctorVisits(updated)
//   }

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault()
//     setIsSubmitting(true)

//     try {
//       const response = await fetch('/api/doctor-visits', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ doctorVisits })
//       })

//       // Simulate API call
//       await new Promise((resolve) => setTimeout(resolve, 2000))

//       console.log("Creating doctor visits:", doctorVisits)
//       // Redirect to schedules page after success
//       // router.push('/clinic/schedules')
//     } catch (error) {
//       console.error("Error creating doctor visits:", error)
//     } finally {
//       setIsSubmitting(false)
//     }
//   }

//   const getSelectedDoctor = (doctorId: string) => {
//     return mockDoctors.find((d) => d.id === doctorId)
//   }

//   const isFormValid = doctorVisits.every(
//     (visit) => visit.doctorId && visit.startTime && visit.endTime && visit.startTime < visit.endTime,
//   )

//   return (
//     <div className="flex flex-1 flex-col">
//       <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
//         <Link href="/clinic/schedules" className="p-2 hover:bg-gray-100 rounded-full transition-colors">
//           <ArrowLeft className="w-6 h-6 text-gray-600" />
//         </Link>
//         <SidebarTrigger className="-ml-1" />
//         <div className="flex-1">
//           <h1 className="text-xl font-semibold text-gray-800">Create Doctor Visits</h1>
//           <p className="text-sm text-gray-600">Set up when doctors will be available at your clinic</p>
//         </div>
//       </header>

//       <main className="flex-1 p-6">
//         <div className="max-w-4xl mx-auto">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {/* Info Card */}
//             <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
//               <div className="flex items-start space-x-3">
//                 <Calendar className="w-6 h-6 text-blue-600 mt-1" />
//                 <div>
//                   <h3 className="font-semibold text-blue-900 mb-2">What are Doctor Visits?</h3>
//                   <p className="text-blue-800 text-sm leading-relaxed">
//                     Doctor Visits define when specific doctors are available at your clinic. Each visit creates
//                     appointment slots that patients can book. You can set different schedules for different doctors and
//                     days of the week.
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Doctor Visits */}
//             <div className="space-y-4">
//               <div className="flex items-center justify-between">
//                 <h2 className="text-lg font-semibold text-gray-800">Doctor Availability</h2>
//                 <Button type="button" onClick={addDoctorVisit} variant="outline">
//                   <Plus className="w-4 h-4 mr-2" />
//                   Add Another Visit
//                 </Button>
//               </div>

//               {doctorVisits.map((visit, index) => (
//                 <div key={index} className="bg-white border rounded-xl p-6">
//                   <div className="flex items-center justify-between mb-4">
//                     <h3 className="font-medium text-gray-800">Visit #{index + 1}</h3>
//                     {doctorVisits.length > 1 && (
//                       <Button
//                         type="button"
//                         onClick={() => removeDoctorVisit(index)}
//                         variant="outline"
//                         size="sm"
//                         className="text-red-600 border-red-600 hover:bg-red-50"
//                       >
//                         <X className="w-4 h-4 mr-2" />
//                         Remove
//                       </Button>
//                     )}
//                   </div>

//                   <div className="grid md:grid-cols-4 gap-4">
//                     {/* Doctor Selection */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Select Doctor *</label>
//                       <select
//                         value={visit.doctorId}
//                         onChange={(e) => updateDoctorVisit(index, "doctorId", e.target.value)}
//                         required
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       >
//                         <option value="">Choose a doctor...</option>
//                         {mockDoctors.map((doctor) => (
//                           <option key={doctor.id} value={doctor.id}>
//                             {doctor.name}
//                           </option>
//                         ))}
//                       </select>
//                       {visit.doctorId && (
//                         <p className="text-xs text-gray-500 mt-1">
//                           {getSelectedDoctor(visit.doctorId)?.specialization}
//                         </p>
//                       )}
//                     </div>

//                     {/* Day of Week */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Day of Week *</label>
//                       <select
//                         value={visit.dayOfWeek}
//                         onChange={(e) => updateDoctorVisit(index, "dayOfWeek", Number.parseInt(e.target.value))}
//                         required
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       >
//                         {daysOfWeek.map((day) => (
//                           <option key={day.value} value={day.value}>
//                             {day.label}
//                           </option>
//                         ))}
//                       </select>
//                     </div>

//                     {/* Start Time */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">Start Time *</label>
//                       <input
//                         type="time"
//                         value={visit.startTime}
//                         onChange={(e) => updateDoctorVisit(index, "startTime", e.target.value)}
//                         required
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     </div>

//                     {/* End Time */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">End Time *</label>
//                       <input
//                         type="time"
//                         value={visit.endTime}
//                         onChange={(e) => updateDoctorVisit(index, "endTime", e.target.value)}
//                         required
//                         min={visit.startTime}
//                         className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
//                       />
//                     </div>
//                   </div>

//                   {/* Visit Preview */}
//                   {visit.doctorId && (
//                     <div className="mt-4 p-4 bg-gray-50 rounded-lg">
//                       <div className="flex items-center space-x-2 text-sm text-gray-700">
//                         <User className="w-4 h-4" />
//                         <span className="font-medium">{getSelectedDoctor(visit.doctorId)?.name}</span>
//                         <span>will be available on</span>
//                         <span className="font-medium">
//                           {daysOfWeek.find((d) => d.value === visit.dayOfWeek)?.label}
//                         </span>
//                         <span>from</span>
//                         <Clock className="w-4 h-4 ml-2" />
//                         <span className="font-medium">
//                           {visit.startTime} - {visit.endTime}
//                         </span>
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               ))}
//             </div>

//             {/* Submit Actions */}
//             <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
//               <Link
//                 href="/clinic/schedules"
//                 className="flex-1 text-center px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors"
//               >
//                 Cancel
//               </Link>
//               <Button
//                 type="submit"
//                 disabled={!isFormValid || isSubmitting}
//                 className="flex-1 bg-green-600 hover:bg-green-700 disabled:bg-gray-400"
//               >
//                 {isSubmitting ? (
//                   <>
//                     <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
//                     Creating Visits...
//                   </>
//                 ) : (
//                   <>
//                     <Save className="w-4 h-4 mr-2" />
//                     Create Doctor Visits
//                   </>
//                 )}
//               </Button>
//             </div>

//             {/* Form Validation Messages */}
//             {!isFormValid && (
//               <div className="bg-red-50 border border-red-200 rounded-lg p-4">
//                 <p className="text-red-800 text-sm">
//                   Please fill in all required fields and ensure end time is after start time for all visits.
//                 </p>
//               </div>
//             )}
//           </form>
//         </div>
//       </main>
//     </div>
//   )
// }

"use client";

import { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { doctorsState,useDoctorVisits,useDoctors,createVisitLoadingState,visitsByDaySelector } from "@/store/doctors/index";
// import { doctorsState } from "@/store/doctors/DoctorsStore";
// import { createVisitLoadingState, visitsByDaySelector } from "@/store/doctors/DoctorVisits";
// import { useDoctors } from "@/store/doctors/hooks";
// import { useDoctorVisits } from "@/store/doctors/hooks";
import { justNames_Doctor } from "@/store/doctors/index";
import {
  Check,
  Clock,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";

const daysOfWeek = [
  { value: 0, label: "Sunday" },
  { value: 1, label: "Monday" },
  { value: 2, label: "Tuesday" },
  { value: 3, label: "Wednesday" },
  { value: 4, label: "Thursday" },
  { value: 5, label: "Friday" },
  { value: 6, label: "Saturday" },
];

export default function CreateDoctorVisitPage() {
  const [date, setDate] = useState<Date>();
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isTimePopoverOpen, setIsTimePopoverOpen] = useState(false);
  const [formData, setFormData] = useState({
    doctorId: "",
    clinicId: "", // Add clinicId here, set default or fetch as needed
    dayOfWeek: date?.getDay() || 1,
    startTime: "",
    endTime: "",
  });

  // Recoil state
  const doctors = useRecoilValue(doctorsState);
  const isLoading = useRecoilValue(createVisitLoadingState);
  const visitsByDay = useRecoilValue(visitsByDaySelector);
  const { fetchDoctors } = useDoctors();
  const { createVisit, error, fetchVisits } = useDoctorVisits();

  // Load initial data
  useEffect(() => {
    console.log("visitsByday",visitsByDay)
    fetchDoctors();
    fetchVisits();
  }, []);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createVisit({
        ...formData,
        clinicId: formData.clinicId || "your-clinic-id", // Replace with actual clinicId logic
      });
      // Reset form
      setFormData({
        doctorId: "",
        clinicId: formData.clinicId || "your-clinic-id", // Keep clinicId after reset
        dayOfWeek: date?.getDay() || 1,
        startTime: "",
        endTime: "",
      });
      // Refresh visits
      fetchVisits();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Create Doctor Visit</h1>
        <p className="text-gray-600">Schedule a new doctor visit for your clinic</p>
      </div>

      {error && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Doctor Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Select Doctor</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  role="combobox"
                  className="w-full justify-between"
                >
                  {formData.doctorId
                    ? doctors.find((doctor) => doctor.id === formData.doctorId)?.name
                    : "Select doctor..."}
                  <ChevronRight className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-[300px] p-0">
                <Command>
                  <CommandInput placeholder="Search doctors..." />
                  <CommandEmpty>No doctor found.</CommandEmpty>
                  <CommandGroup>
                    {doctors.map((doctor) => (
                      <CommandItem
                        key={doctor.id}
                        onSelect={() =>
                          setFormData((prev) => ({ ...prev, doctorId: doctor.id }))
                        }
                      >
                        <Check
                          className={cn(
                            "mr-2 h-4 w-4",
                            formData.doctorId === doctor.id
                              ? "opacity-100"
                              : "opacity-0"
                          )}
                        />
                        {doctor.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </Command>
              </PopoverContent>
            </Popover>
          </div>

          {/* Day Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Select Day</label>
            <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !date && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? format(date, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  required={true}
                  selected={date}
                  onSelect={(newDate:Date) => {
                    setDate(newDate);
                    if (newDate) {
                      setFormData((prev) => ({
                        ...prev,
                        dayOfWeek: newDate.getDay(),
                      }));
                    }
                    setIsCalendarOpen(false);
                  }}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Time Selection */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">Start Time</label>
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, startTime: e.target.value }))
              }
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-700">End Time</label>
            <input
              type="time"
              value={formData.endTime}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, endTime: e.target.value }))
              }
              className="w-full p-2 border rounded-md"
            />
          </div>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full bg-blue-500 hover:bg-blue-600 text-white"
        >
          {isLoading ? "Creating Schedule..." : "Create Schedule"}
        </Button>
      </form>

      {/* Existing Schedules */}
      <div className="mt-12">
        <h2 className="text-xl font-semibold mb-4">Existing Schedules</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(visitsByDay).map(([day, dayVisits]) => (
            <div
              key={day}
              className="border rounded-lg p-4 bg-white shadow-sm space-y-3"
            >
              <h3 className="font-medium text-gray-900">
                {daysOfWeek[Number(day)].label}
              </h3>
              {dayVisits.map((visit) => (
                <div
                  key={visit.id}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <div>
                    <p className="font-medium">{visit.doctor?.name || 'Unknown Doctor'}</p>
                    <p className="text-sm text-gray-500">
                      {visit.startTime} - {visit.endTime}
                    </p>
                  </div>
                  <div className="text-sm text-gray-500">
                    {visit._count?.appointments || 0} appointments
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}