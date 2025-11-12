import {atom} from 'recoil';
// import { AppointMents } from '@/app/patient/appointments/Constants';

export type Appointment = {
  id: string;
  patientId: string;
  doctorVisitId: string;
  date: string; // ISO string (from backend)
  time: string;
  status: "BOOKED" | "CANCELLED" | "COMPLETED" | string;
  createdAt: string;
  doctorVisit: DoctorVisit;
};

export type DoctorVisit = {
  id: string;
  doctorId: string;
  clinicId: string;
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  startTime: string;
  endTime: string;
  doctor: Doctor;
  clinic: Clinic;
};

export type Doctor = {
  id: string;
  name: string;
  specialization: string;
  qualifications: string;
  experience: number;
  contact: string;
};

export type Clinic = {
  id: string;
  name: string;
  location: string;
  phone: string;
  userId: string;
};

export const allAppointmetns = atom<Appointment[]>({
    key:"alltheAppointments",
    default:[]
})