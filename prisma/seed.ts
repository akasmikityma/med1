import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Create two users with role = CLINIC
  const clinicUser1 = await prisma.user.create({
    data: {
      name: "CarePlus Clinic",
      email: "clinic1@test.com",
      role: "CLINIC",
      image: "https://via.placeholder.com/150",
      clinic: {
        create: {
          name: "CarePlus Clinic",
          location: "New Town, Kolkata",
          phone: "9876543210",
        },
      },
    },
    include: {
      clinic: true,
    },
  })

  const clinicUser2 = await prisma.user.create({
    data: {
      name: "WellLife Clinic",
      email: "clinic2@quickdoc.com",
      role: "CLINIC",
      image: "https://via.placeholder.com/150",
      clinic: {
        create: {
          name: "WellLife Clinic",
          location: "Salt Lake, Kolkata",
          phone: "9123456780",
        },
      },
    },
    include: {
      clinic: true,
    },
  })

  // Create doctors
  const doctor1 = await prisma.doctor.create({
    data: {
      name: "Dr. Ayan Ghosh",
      specialization: "Cardiologist",
      qualifications: "MBBS, MD",
      experience: 10,
      contact: "dr.ayan@example.com",
    },
  })

  const doctor2 = await prisma.doctor.create({
    data: {
      name: "Dr. Priya Banerjee",
      specialization: "Dermatologist",
      qualifications: "MBBS, DDVL",
      experience: 6,
      contact: "dr.priya@example.com",
    },
  })

  const doctor3 = await prisma.doctor.create({
    data: {
      name: "Dr. Ravi Roy",
      specialization: "Orthopedic",
      qualifications: "MBBS, MS",
      experience: 8,
      contact: "dr.ravi@example.com",
    },
  })

  // Link doctors to clinics via visits
  await prisma.doctorVisit.createMany({
    data: [
      {
        doctorId: doctor1.id,
        clinicId: clinicUser1.clinic!.id,
        dayOfWeek: 1, // Monday
        startTime: "10:00",
        endTime: "13:00",
      },
      {
        doctorId: doctor2.id,
        clinicId: clinicUser1.clinic!.id,
        dayOfWeek: 3, // Wednesday
        startTime: "11:00",
        endTime: "14:00",
      },
      {
        doctorId: doctor3.id,
        clinicId: clinicUser2.clinic!.id,
        dayOfWeek: 5, // Friday
        startTime: "09:00",
        endTime: "12:00",
      },
    ],
  })

  // Optional: Create a test patient user
  await prisma.user.create({
    data: {
      name: "Test Patient",
      email: "patient1@quickdoc.com",
      role: "PATIENT",
      image: "https://via.placeholder.com/150",
    },
  })

  console.log("🌱 Seed completed successfully.")
}

main()
  .catch((e) => {
    console.error("❌ Seed error:", e)
    process.exit(1)
  })
  .finally(() => {
    prisma.$disconnect()
  })
