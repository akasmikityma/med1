// this is for getting all the appointments for the patient >> 
// also there is a post request handler to book new appoinment >>> 


import { NextResponse } from "next/server";
import { AuthOptions } from "next-auth";
import { getServerSession } from "next-auth";
import DBClient from "@/lib/prisma";
import { authOptions } from "@/lib/Auth";
import { nextTest } from "next/dist/cli/next-test";
// import { Cactus_Classical_Serif } from "next/font/google";

const prisma = DBClient.getInstance().prisma;

export async function GET(req:Request){
    const session = await getServerSession(authOptions);
    if(!session || session.user?.role !=='PATIENT'){
        return new NextResponse("Unauthorized",{status:401});
    }

    
    try{
        const patient = await prisma.user.findUnique({
            where: {
                id: session.user.id,
                role: "PATIENT"
            }
        });

        if (!patient) {
            return new NextResponse("No patient found", { status: 404 });
        }

        const appointments = await prisma.appointment.findMany({
            where: {
                patientId: patient.id
            },
            include: {
                doctorVisit: {
                    include: {
                        doctor: true,
                        clinic: true
                    }
                }
            },
            orderBy: {
                date: 'asc'
            }
        });

        return NextResponse.json(appointments);
    }catch(err){
        console.log(err);
        new NextResponse("Internal Error",{status:500});
    }
}

export async function POST(req: Request){
    const session = await getServerSession(authOptions);
    if(!session || session.user?.role !=='PATIENT'){
        return new NextResponse("Unauthorized",{status:401});
    }

    try{
        const body = await req.json();
        const { visitId, date, time } = body;

        // Validate required fields
        if (!visitId || !date || !time) {
            return new NextResponse("Missing required fields: visitId, date, or time", { status: 400 });
        }

        // Verify patient exists
        const patient = await prisma.user.findUnique({
            where: {
                id: session.user.id,
                role: "PATIENT"
            }
        });

        if (!patient) {
            return new NextResponse("Patient not found", { status: 404 });
        }

        // Verify the visit exists
        const visit = await prisma.doctorVisit.findUnique({
            where: {
                id: visitId
            }
        });

        if (!visit) {
            return new NextResponse("Doctor visit not found", { status: 404 });
        }

        // Create the appointment
        const newAppointment = await prisma.appointment.create({
            data: {
                doctorVisitId: visitId,
                patientId: patient.id,
                date: new Date(date), // Convert string to Date object
                time: time,
                // status is not required as it has a default value
            },
            include: {
                doctorVisit: {
                    include: {
                        doctor: true,
                        clinic: true
                    }
                }
            }
        });

        return NextResponse.json(newAppointment, { status: 201 });
    }catch(err){
        console.log(err);
        return new NextResponse("Internal server error",{status:500});
    }
}