import { getServerSession } from "next-auth";
import { NextResponse } from 'next/server';
import { authOptions } from "@/lib/Auth";
import DBClient from "@/lib/prisma";

const prisma = DBClient.getInstance().prisma;

export async function GET() {
  const session = await getServerSession(authOptions);
  
  // More detailed authentication check
  if (!session) {
    return new NextResponse('Unauthorized - No session found', { status: 401 });
  }
  
  if (session.user?.role !== 'PATIENT') {
    return new NextResponse('Forbidden - User is not a patient', { status: 403 });
  }

  try {
    const patient = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {  // Explicitly select only the fields you need
        id: true,
        name: true,
        email: true,
        image: true,
        role: true,
        createdAt: true
      }
    });

    if (!patient) {
      return new NextResponse('Patient profile not found', { status: 404 });
    }

    console.log('Fetched patient data:', patient);
    return NextResponse.json(patient);
    
  } catch (error) {
    console.error('Error fetching Patient:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
// export async function PUT(req: Request){
//   const session = await getServerSession(authOptions);
//   if (!session || session.user?.role !== 'PATIENT') {
//     return new NextResponse('Unauthorized', { status: 401 });
//   }
//   const {name, phone, location} = await req.json();
//   try{
//     const Updated_Clinic = await prisma.clinic.update({
//       where: {userId: session.user.id},
//       data: {name, phone, location}
//     })
//     if(!Updated_Clinic){
//       return new NextResponse('Clinic not found', { status: 404 });
//     }
//     return NextResponse.json(Updated_Clinic);
//   }catch(err){
//     console.log(err);
//     return new NextResponse('Internal Server Error', { status: 500 });
//   }
// }