import { getServerSession } from "next-auth";
import { NextResponse } from 'next/server';
import { authOptions } from "@/lib/Auth";
import DBClient from "@/lib/prisma";
import { setServers } from "dns";
const prisma  = DBClient.getInstance().prisma;

export async function GET(req: Request){
    const session = await getServerSession(authOptions);
    console.log(session?.user.email ,session?.user.name)
    if(!session || session.user?.role != 'CLINIC'){
        return new NextResponse('Unauthorized',{status: 401});
    }

    const clinic = await prisma.clinic.findUnique({
        where: {
            userId: session.user.id,
        },
    })
    if(!clinic){
        return new NextResponse('Clinic not found',{status: 404});
    }

    const visits = await prisma.doctorVisit.findMany({
        where:{
            clinicId : clinic.id
        },
        include:{
            doctor:true
        }
    })

    return NextResponse.json(visits);
}
export async function POST(req:Request){
     const session = await getServerSession(authOptions);
  
  // Authentication check
  if (!session || session.user?.role !== 'CLINIC') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    // 1. Get the clinic of the current user
    const clinic = await prisma.clinic.findUnique({
      where: { userId: session.user.id },
    });

    if (!clinic) {
      return new NextResponse('Clinic not found', { status: 404 });
    }

    // 2. Parse and validate request body
    const body = await req.json();
    const { doctorId, dayOfWeek, startTime, endTime } = body;

    // Basic validation
    if (!doctorId || dayOfWeek === undefined || !startTime || !endTime) {
      return new NextResponse('Missing required fields', { status: 400 });
    }

    // Validate dayOfWeek range (0-6)
    if (dayOfWeek < 0 || dayOfWeek > 6) {
      return new NextResponse('Invalid day of week', { status: 400 });
    }

    // Validate time format (simple regex check)
    const timeRegex = /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/;
    if (!timeRegex.test(startTime) || !timeRegex.test(endTime)) {
      return new NextResponse('Invalid time format (use HH:MM)', { status: 400 });
    }

    // 3. Check if doctor exists
    const doctorExists = await prisma.doctor.findUnique({
      where: { id: doctorId },
    });

    if (!doctorExists) {
      return new NextResponse('Doctor not found', { status: 404 });
    }

    // 4. Check for overlapping visits (optional but recommended)
    const overlappingVisit = await prisma.doctorVisit.findFirst({
      where: {
        doctorId,
        dayOfWeek,
        OR: [
          {
            startTime: { lt: endTime },
            endTime: { gt: startTime },
          },
        ],
      },
    });

    if (overlappingVisit) {
      return new NextResponse(
        'Doctor already has a visit during this time slot', 
        { status: 409 }
      );
    }

    // 5. Create the new doctor visit
    const newVisit = await prisma.doctorVisit.create({
      data: {
        doctorId,
        clinicId: clinic.id,
        dayOfWeek,
        startTime,
        endTime,
      },
      include: {
        doctor: true,
      },
    });

    return NextResponse.json(newVisit, { status: 201 });

  } catch (error) {
    console.error('Error creating doctor visit:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}