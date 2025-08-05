import { getServerSession } from "next-auth";
import { NextResponse } from 'next/server';
import { authOptions } from "@/lib/Auth";
import DBClient from "@/lib/prisma";

const prisma = DBClient.getInstance().prisma;

export async function GET() {
  const session = await getServerSession(authOptions);
  console.log(session?.user.name,session?.user.email)
  // Authentication check
  if (!session || session.user?.role !== 'CLINIC') {
    return new NextResponse('Unauthorized', { status: 401 });
  }

  try {
    const clinic = await prisma.clinic.findUnique({
      where: { userId: session.user.id },
      include: {
        doctors: {
          include: {
            doctor: true
          }
        }
      }
    });

    if (!clinic) {
      return new NextResponse('Clinic profile not found', { status: 404 });
    }

    // return NextResponse.json(clinic);
    return NextResponse.json({
      name: clinic.name,
      location: clinic.location,
      phone: clinic.phone,
      email: session.user.email, // Access user email
    });
    
  } catch (error) {
    console.error('Error fetching clinic:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
export async function PUT(req: Request){
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== 'CLINIC') {
    return new NextResponse('Unauthorized', { status: 401 });
  }
  const {name, phone, location} = await req.json();
  try{
    const Updated_Clinic = await prisma.clinic.update({
      where: {userId: session.user.id},
      data: {name, phone, location}
    })
    if(!Updated_Clinic){
      return new NextResponse('Clinic not found', { status: 404 });
    }
    return NextResponse.json(Updated_Clinic);
  }catch(err){
    console.log(err);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}