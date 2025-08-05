// this is default json for appointments >> 

export interface Appointment{
    id: number,
    patientName: string,
    patientEmail: string,
    patientPhone: string,
    doctorName: string,
    specialty: string,
    date: string,
    time: string,
    reason: string,
    status: string,
    type: string,
    notes: string,
}
export const mockAppointments: Appointment[] = [
    {
      id: 1,
      patientName: "John Smith",
      patientEmail: "john.smith@email.com",
      patientPhone: "+1 (555) 123-4567",
      doctorName: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      date: "2024-01-20",
      time: "2:00 PM",
      reason: "Regular checkup",
      status: "pending",
      type: "in-person",
      notes: "Patient has history of heart disease",
    }
  ]