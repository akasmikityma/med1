"use client"
import { useEffect , useState} from 'react';
import {atom} from 'recoil'
import { useRecoilState, useSetRecoilState } from 'recoil';
import { doctorsState, doctorsLoadingState, doctorsErrorState } from '@/store/doctors/DoctorsStore';
import { doctorVisitsState,createVisitLoadingState,DoctorVisit } from '@/store/doctors/DoctorVisits';



// doctors hook
export function useDoctors() {
  const [doctors, setDoctors] = useRecoilState(doctorsState);
  const setLoading = useSetRecoilState(doctorsLoadingState);
  const setError = useSetRecoilState(doctorsErrorState);

  const fetchDoctors = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/clinic/doctors');
      if (!response.ok) throw new Error('Failed to fetch doctors');
      const data = await response.json();
      setDoctors(data);
    } catch (error) {
      setError(error instanceof Error ? error.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  // useEffect(() => {
  //   if (doctors.length === 0) {
  //     fetchDoctors();
  //   }
  // }, []);

  return { doctors, fetchDoctors };
}



//   doctor visit's hook
interface CreateVisitData {
  doctorId: string;
  dayOfWeek: number;
  startTime: string;
  endTime: string;
}
export function useDoctorVisits() {
  const [visits, setVisits] = useRecoilState(doctorVisitsState);
  const setLoading = useSetRecoilState(createVisitLoadingState);
  const [error, setError] = useRecoilState(atom<string | null>({
    key: 'doctors/errorStatee',
    default: null,
  }));

  const fetchVisits = async () => {
    try {
      const response = await fetch('/api/clinic/doctorvisits');
      if (!response.ok) throw new Error('Failed to fetch visits');
      const data = await response.json();
      setVisits(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch visits');
    }
  };

  const createVisit = async (visitData: Omit<DoctorVisit, 'id' | 'doctor' | '_count'>) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/clinic/doctorvisits', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(visitData),
      });

      if (!response.ok) throw new Error('Failed to create visit');
      const newVisit = await response.json();
      setVisits(prev => [...prev, newVisit]);
      return newVisit;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create visit');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { visits, error, fetchVisits, createVisit };

  return {
    visits,
    error,
    fetchVisits,
    createVisit,
  };
}