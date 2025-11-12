import { NextResponse, NextRequest } from "next/server";
import { Prisma } from "@prisma/client";
import DBClient from "@/lib/prisma";
import { authOptions } from "@/lib/Auth";
import { getServerSession } from "next-auth";
import { addDays, setHours, setMinutes, isAfter } from "date-fns";
const prisma = DBClient.getInstance().prisma;

export async function GET(req: NextRequest) {
  try {
    
    const session = await getServerSession(authOptions);
    if(!session || session.user?.role !=='PATIENT'){
        return new NextResponse("Unauthorized",{status:401});
    }
    const { searchParams } = new URL(req.url);
    const page = parseInt(searchParams.get("page") || "1", 10);
    const limit = parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search") || "";
    const skip = (page - 1) * limit;

    const where: Prisma.DoctorWhereInput = search
      ? {
          OR: [
            { name: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { specialization: { contains: search, mode: Prisma.QueryMode.insensitive } },
            { visits: { some: { clinic: { name: { contains: search, mode: Prisma.QueryMode.insensitive } } } } },
          ],
        }
      : {};

    const doctors = await prisma.doctor.findMany({
      where,
      skip,
      take: limit,
      include: {
        visits: {
          include: {
            clinic: true,
            appointments: {
              where: {
                date: { gte: new Date() },
                status: "BOOKED",
              },
              orderBy: { date: "asc" },
              take: 1,
            },
          },
        },
      },
      orderBy: { name: "asc" },
    }) as Prisma.DoctorGetPayload<{
      include: {
        visits: {
          include: {
            clinic: true,
            appointments: true,
          },
        },
      },
    }>[];

    const total = await prisma.doctor.count({ where });
    const now = new Date();
    const result = doctors.map((doc) => {
      let soonestSlot: {
        date: Date;
        time: string;
        clinic: string;
        clinicAddress: string;
      } | null = null;

      const slots: {
        date: Date;
        time: string;
        clinic: string;
        clinicAddress: string;
        visitId : string
      }[] = [];

      const daysToCheck = 14; // How many days ahead to look for slots

      doc.visits.forEach((visit) => {
        for (let i = 0; i < daysToCheck; i++) {
          const slotDate = addDays(new Date(), i);
          if (slotDate.getDay() === visit.dayOfWeek) {
            // Set the time for the slot
            const [startHour, startMinute] = visit.startTime.split(":").map(Number);
            let slotDateTime = setHours(setMinutes(new Date(slotDate), startMinute), startHour);

            // Only add future slots
            if (isAfter(slotDateTime, new Date())) {
              slots.push({
                date: slotDateTime,
                time: visit.startTime,
                clinic: visit.clinic.name,
                clinicAddress: visit.clinic.location,
                visitId:visit.id
              });
            }
          }
        }
      });

      // Sort slots by date
      slots.sort((a, b) => a.date.getTime() - b.date.getTime());

      return {
        id: doc.id,
        name: doc.name,
        specialization: doc.specialization,
        experience: doc.experience,
        contact: doc.contact,
        clinics: doc.visits.map((v) => ({
          name: v.clinic.name,
          address: v.clinic.location,
        })),
        slots, // <-- all available slots
        nextAvailable: slots[0] || null, // <-- soonest slot
      };
    });

    return NextResponse.json({
      items: result,
      total,
      page,
      pageSize: limit,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}