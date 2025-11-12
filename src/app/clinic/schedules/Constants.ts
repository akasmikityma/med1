// "id": "cmd9wjt3g0008vqpszoiagw79",
//         "doctorId": "cmd9w07pi0004vqjovi6eeg4x",
//         "clinicId": "cmd9wbhnp0006vqpsf6mntv0d",
//         "dayOfWeek": 1,
//         "startTime": "12:00",
//         "endTime": "1:00",
//         "doctor": {
//             "id": "cmd9w07pi0004vqjovi6eeg4x",
//             "name": "Dr. Ayan Ghosh",
//             "specialization": "Cardiologist",
//             "qualifications": "MBBS, MD",
//             "experience": 10,
//             "contact": "dr.ayan@example.com"
//         }

export const mockDoctorVisits = [
  {
    id: "1",
    doctorId: "1",
    doctorName: "Dr. Sarah Johnson",
    specialty: "Cardiologist",
    dayOfWeek: 1, // Monday
    startTime: "09:00",
    endTime: "17:00",
    appointmentCount: 12, // How many appointments booked for this visit
    totalSlots: 16, // Total available slots
  }
]