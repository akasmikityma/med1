// here i want to have the controller to get all the doctors , add a new doctor 
// for now lets not create the doctor for specific clinic >> 
// any clinic can add a visit and serach for docot >>
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import DBClient from "@/lib/prisma";
import { authOptions } from "@/lib/Auth";
const prisma = DBClient.getInstance().prisma;

export const GET = async(req : NextRequest)=>{
    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'CLINIC') {
        return new NextResponse('Unauthorized', { status: 401 });
    }
    
    try {
        const doctors = await prisma.doctor.findMany({
            select:{
                id: true,
                name: true,
                specialization: true,
                qualifications: true,
                experience: true,
                contact: true,
                // Add more fields as needed
            }
        });
        
        console.log(doctors);
        
        if(!doctors || doctors.length === 0){
            return NextResponse.json({message: 'No doctors found'}, {status: 404});
        }
        
        return NextResponse.json(doctors);
    } catch (error) {
        console.error('Error fetching doctors:', error);
        return new NextResponse('Internal Server Error', { status: 500 });
    }
}
// lets not add a new doctor for now >> 
// export const POST = async(req : NextRequest)=>{
// } 