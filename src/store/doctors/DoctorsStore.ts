"use client"
import { atom, selector,selectorFamily } from 'recoil';

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  qualifications?: string;
  contact?: string;
  /////////////////
  email: string;
  phone: string;
  specialty: string;
  education: string;
  rating: number;
  totalAppointments: number;
  status: "active" | "inactive"; // restrict to known values
  image: string;
  workingDays: string[];
  consultationFee: number;
}
export const doctorsState = atom<Doctor[]>({
  key: 'doctors/doctorsState',
  default: [],
});

export const doctorsLoadingState = atom<boolean>({
  key: 'doctors/loadingState',
  default: false,
});

export const doctorsErrorState = atom<string | null>({
  key: 'doctorsErrorState',
  default: null,
});

// Selectors
export const doctorsByIdSelector = selector({
  key: 'doctorsByIdSelector',
  get: ({get}) => {
    const doctors = get(doctorsState);
    return doctors.reduce((acc, doctor) => {
      acc[doctor.id] = doctor;
      return acc;
    }, {} as Record<string, Doctor>);
  },
});

export const doctorsBySpecializationSelector = selector({
  key: 'doctorsBySpecializationSelector',
  get: ({get}) => {
    const doctors = get(doctorsState);
    return doctors.reduce((acc, doctor) => {
      const spec = doctor.specialization;
      if (!acc[spec]) acc[spec] = [];
      acc[spec].push(doctor);
      return acc;
    }, {} as Record<string, Doctor[]>);
  },
});


//------------------------------------------------------------------------

type Clinic = {
  name: string;
  address: string;
};

export type slot = {
  date: string;   // ISO datetime string
  time: string;   // e.g. "4:00"
  clinic: string;
  clinicAddress: string;
  visitId : string
};

export type DoctorFP = {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  contact: string;
  clinics: Clinic[];
  slots : slot[]
  nextAvailable: slot;
};
export const doctorsForPatient = atom<DoctorFP[]>({
  key:"doctorsforpatients",
  default:[]
})
export const slotsForDoctorSelector = selectorFamily({
  key: "slotsForDoctorSelector",
  get: (doctorId: string) => ({ get }) => {
    const doctors = get(doctorsForPatient);
    const doctor = doctors.find((d) => d.id === doctorId);
    // Return all slots or an empty array if not found
    return doctor && Array.isArray((doctor as any).slots) ? (doctor as any).slots : [];
  },
});