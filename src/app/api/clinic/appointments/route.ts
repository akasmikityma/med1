import {NextResponse} from "next/server";
import { getServerSession } from "next-auth";
import DBClient from "@/lib/prisma";
import { authOptions } from "@/lib/Auth";
const prisma  = DBClient.getInstance().prisma;

export async function GET(req:Request){
    const session  = await getServerSession(authOptions);
    if(!session || session.user?.role !== 'CLINIC'){
        return new NextResponse("Unauthorized",{status: 401});
    }

    try{
        //first find the clinic > 
        // if the clinic is found >> find all the appointements that has the same clinic id

        const clinic = await prisma.clinic.findUnique({
            where:{
                userId: session.user.id
            }
        })
        
        if(!clinic){
            console.log("clinic not found");
            return new NextResponse("Clnic Not Found",{status: 404});
        }
        const appointments = await prisma.appointment.findMany({
            where: {
              doctorVisit: {
                clinicId: clinic.id
              }
            },
            include: {
              patient: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                //   phone: true // Assuming you have phone in User model
                }
              },
              doctorVisit: {
                include: {
                  doctor: {
                    select: {
                      id: true,
                      name: true,
                      specialization: true
                    }
                  }
                }
              }
            },
            orderBy: {
              date: 'asc' // Or 'desc' for newest first
            }
          });

          const formattedAppointments = appointments.map(appointment => ({
            id: appointment.id,
            patientName: appointment.patient.name,
            patientEmail: appointment.patient.email,
            patientPhone: "+1 (555) 000-0000", // Default if no phone
            doctorName: appointment.doctorVisit.doctor.name,
            specialty: appointment.doctorVisit.doctor.specialization,
            date: appointment.date.toISOString().split('T')[0],
            time: appointment.time,
            status: appointment.status,
            // These would need to be handled differently without schema fields
            reason: "Regular checkup", // Could be hardcoded or omitted
            notes: "Patient has history of heart disease" // Could be hardcoded or omitted
          }));
          console.log(formattedAppointments);
          return NextResponse.json(formattedAppointments);
    }catch(err){
        console.log(err);
        return new NextResponse("Internal Server Error",{status: 500});
    }
}