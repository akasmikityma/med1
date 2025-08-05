import { NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/Auth"
import DBClient from "@/lib/prisma"
const prisma = DBClient.getInstance().prisma;
export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  const session = await getServerSession(authOptions)
  if (!session || session.user?.role !== 'CLINIC') {
    return new NextResponse('Unauthorized', { status: 401 })
  }

  try {
    const {id} = await params;
    const doctorId = id;
    // Fetch the doctor with their clinic visits
    const doctor = await prisma.doctor.findUnique({
        where: { id: doctorId },
        select: {
          id: true,
          name: true,
          specialization: true,
          qualifications: true,
          experience: true,
          contact: true,
          // Add more fields as needed
        }
      })
  
      if (!doctor) {
        return NextResponse.json({ message: 'Doctor not found' }, { status: 404 })
      }
  
      console.log("Fetched doctor:", doctor)
      return NextResponse.json(doctor)
  } catch (error) {
    console.error('Error fetching doctor:', error)
    return new NextResponse('Internal Server Error', { status: 500 })
  }
}