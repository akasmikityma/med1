import { Contact } from "lucide-react"

export const DoctorDefaults = {
    id: "1",
    name: "Dr. [Name]",
    email: "doctor@clinic.com",
    phone: "+1 (555) 000-0000",
    specialty: "General Medicine",
    experience: "0 years",
    education: "MD - Medical School",
    rating: 0.0,
    totalAppointments: 0,
    status: "active",
    image: "/placeholder.svg?height=80&width=80",
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    consultationFee: 100,
    qualifications: "",
    contact: "",
    specialization: ""
  }
  export const DoctorProfileDefaults = {
    id: "1",
    name: "Dr. [Name]",
    email: "doctor@clinic.com",
    phone: "+1 (555) 000-0000",
    specialty: "General Medicine",
    experience: "0 years",
    education: "MD - Medical School",
    rating: 0.0,
    totalAppointments: 0,
    monthlyAppointments: 0,
    Contact:"",
    status: "active",
    image: "/placeholder.svg?height=120&width=120",
    joinDate: "2024-01-01",
    consultationFee: 100,
    workingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    workingHours: "9:00 AM - 5:00 PM",
    bio: "Professional doctor with expertise in general medicine.",
    qualifications: [
      "MD - Medical School",
      "Board Certified",
    ],
    specializations: [
      "General Medicine",
    ],
    languages: ["English"],
    achievements: ["Professional Excellence"],
    monthlyStats: {
      appointments: 0,
      revenue: 0,
      patientSatisfaction: 0,
      cancellationRate: 0,
    },
    recentAppointments: [ {
      "id": 1,
      "patientName": "John Smith",
      "date": "2024-01-20",
      "time": "2:00 PM",
      "status": "completed",
      "type": "follow-up"
    },
    {
      "id": 2,
      "patientName": "Emily Davis", 
      "date": "2024-01-20",
      "time": "3:30 PM",
      "status": "confirmed",
      "type": "consultation"
    },
    {
      "id": 3,
      "patientName": "Robert Wilson",
      "date": "2024-01-21", 
      "time": "10:00 AM",
      "status": "pending",
      "type": "checkup"
    }],
    patientReviews: [
      {
        "id": 1,
        "patientName": "Jennifer M.",
        "rating": 5,
        "comment": "Dr. Johnson is exceptional! Very thorough and caring.",
        "date": "2024-01-15"
      },
      {
        "id": 2,
        "patientName": "Robert K.",
        "rating": 5,
        "comment": "Excellent doctor with great bedside manner.",
        "date": "2024-01-12"
      },
      {
        "id": 3,
        "patientName": "Maria S.",
        "rating": 4,
        "comment": "Very professional and knowledgeable.",
        "date": "2024-01-10"
      }
    ],
    schedule: {
      monday: { start: "09:00", end: "17:00", slots: 16 },
      tuesday: { start: "09:00", end: "17:00", slots: 16 },
      wednesday: { start: "09:00", end: "17:00", slots: 16 },
      thursday: { start: "09:00", end: "17:00", slots: 16 },
      friday: { start: "09:00", end: "17:00", slots: 16 },
      saturday: { start: "", end: "", slots: 0 },
      sunday: { start: "", end: "", slots: 0 },
    },
  }
  export const DoctorsListDefaults = [
    DoctorDefaults,
    // You can add more default doctors if needed
  ]