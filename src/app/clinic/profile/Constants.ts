// src/constants/clinicDefaults.ts

interface OperatingHours {
    open: string;
    close: string;
    isOpen: boolean;
  }
  
  interface ClinicData {
    name: string;
    description: string;
    location: string;
    address: string;
    phone: string;
    email: string;
    website: string;
    establishedYear: string;
    licenseNumber: string;
    operatingHours: {
      monday: OperatingHours;
      tuesday: OperatingHours;
      wednesday: OperatingHours;
      thursday: OperatingHours;
      friday: OperatingHours;
      saturday: OperatingHours;
      sunday: OperatingHours;
    };
    services: string[];
    insurance: string[];
  }
  
  const clinicDefaults: ClinicData = {
    name: "Heart Care Medical Center",
    description: "A leading healthcare facility specializing in comprehensive medical care with state-of-the-art equipment and experienced medical professionals.",
    location: "New Town, Kolkata", // Default that will be overwritten
    address: "123 Medical Plaza, Downtown District, City, State 12345",
    phone: "+1 (555) 123-4567", // Default that will be overwritten
    email: "info@heartcaremedical.com", // Default that will be overwritten
    website: "www.heartcaremedical.com",
    establishedYear: "2010",
    licenseNumber: "HC-2010-12345",
    operatingHours: {
      monday: { open: "08:00", close: "18:00", isOpen: true },
      tuesday: { open: "08:00", close: "18:00", isOpen: true },
      wednesday: { open: "08:00", close: "18:00", isOpen: true },
      thursday: { open: "08:00", close: "18:00", isOpen: true },
      friday: { open: "08:00", close: "18:00", isOpen: true },
      saturday: { open: "09:00", close: "15:00", isOpen: true },
      sunday: { open: "10:00", close: "14:00", isOpen: false },
    },
    services: [
      "General Medicine",
      "Cardiology",
      "Dermatology",
      "Pediatrics",
      "Emergency Care",
      "Laboratory Services",
      "Radiology",
      "Pharmacy",
    ],
    insurance: [
      "Blue Cross Blue Shield",
      "Aetna",
      "Cigna",
      "UnitedHealth",
      "Medicare",
      "Medicaid"
    ],
  };
  
  export default clinicDefaults;