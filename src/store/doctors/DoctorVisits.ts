"use client"
import { atom, selector } from 'recoil';
import { Doctor } from './DoctorsStore';

export interface DoctorVisit {
  id: string;
  doctorId: string;
  clinicId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
  doctor: Doctor;
  _count: {
    appointments: number;
  };
}

export const doctorVisitsState = atom<DoctorVisit[]>({
  key: 'doctors/visitsState',
  default: [],
});

export const createVisitLoadingState = atom<boolean>({
  key: 'doctors/createVisitLoadingState',
  default: false,
});

export const visitsByDaySelector = selector({
  key: 'doctors/visitsByDaySelector',
  get: ({get}) => {
    const visits = get(doctorVisitsState);
    return visits.reduce((acc, visit) => {
      if (!acc[visit.dayOfWeek]) acc[visit.dayOfWeek] = [];
      acc[visit.dayOfWeek].push(visit);
      return acc;
    }, {} as Record<number, DoctorVisit[]>);
  },
});

// i should be using this >> [more clear since its just the names ]

export const justNames_Doctor = selector({
  key :'just_the_names',
  get :({get})=>{
    const Visits = get(doctorVisitsState);
    const names = Visits.map((v)=>{
      return v.doctor.name;
    })
    return names;
  }
})

// type DoctorVisit = {
//   id: string
//   doctor: {
//     name: string
//     specialization: string
//   }
//   dayOfWeek: number
//   startTime: string
//   endTime: string
// }