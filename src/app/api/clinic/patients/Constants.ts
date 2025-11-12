export interface Patient {
  id: string;
  name: string;
  email: string;
  dateOfBirth: string;
  gender: string;
  bloodType: string;
  phone: string;
  emergencyContact: string;
  address: string;
  allergies: string;
  conditions: string[];  // Make this required, not optional
  lastVisit: string | null;
  totalVisits: number;
  status: string;
}

export const emptyPatient: Patient = {
  id: '',
  name: '',
  email: '',
  dateOfBirth: '1990-01-01',
  gender: 'Unknown',
  bloodType: 'N/A',
  phone: 'Not provided',
  emergencyContact: 'Not provided',
  address: 'Not provided',
  allergies: 'None',
  conditions: [],
  lastVisit: null,
  totalVisits: 0,
  status: 'active',
};
export const mockPatients = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@email.com",
    phone: "+1 (555) 123-4567",
    dateOfBirth: "1985-03-15",
    gender: "Male",
    bloodType: "O+",
    lastVisit: "2024-01-15",
    totalVisits: 12,
    status: "active",
    emergencyContact: "+1 (555) 987-6543",
    address: "123 Main St, City, State 12345",
    allergies: "Penicillin",
    conditions: ["Hypertension", "Diabetes Type 2"],
  },
  {
    id: 2,
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "+1 (555) 234-5678",
    dateOfBirth: "1990-07-22",
    gender: "Female",
    bloodType: "A+",
    lastVisit: "2024-01-18",
    totalVisits: 8,
    status: "active",
    emergencyContact: "+1 (555) 876-5432",
    address: "456 Oak Ave, City, State 12345",
    allergies: "None",
    conditions: ["Asthma"],
  },
  {
    id: 3,
    name: "Robert Wilson",
    email: "robert.wilson@email.com",
    phone: "+1 (555) 345-6789",
    dateOfBirth: "2018-12-10",
    gender: "Male",
    bloodType: "B+",
    lastVisit: "2024-01-10",
    totalVisits: 15,
    status: "active",
    emergencyContact: "+1 (555) 765-4321",
    address: "789 Pine St, City, State 12345",
    allergies: "Nuts",
    conditions: [],
  },
]