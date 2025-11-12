// import { getServerSession } from "next-auth";
// import { NextRequest, NextResponse } from "next/server";
// import DBClient from "@/lib/prisma";
// import { authOptions } from "@/lib/Auth";
// const prisma = DBClient.getInstance().prisma;

// export async function GET(req: Request, { params }: any) {
  
//   try{
//     const session = await getServerSession(authOptions);
//     if(!session || session.user?.role !== 'CLINIC'){
//           return new NextResponse('Unauthenticated',{status : 401});
//     } 
//     const clinic = await prisma.clinic.findUnique({
//       where:{
//           userId:session.user?.id
//       }
//     })
//     if(!clinic){
//       return new  NextResponse('Clinic not Found ',{status:401});
//     }
//     const clinicId =clinic.id;
//     const url = new URL(req.url);
//     const patientId = params.id;
//     const page = parseInt(url.searchParams.get("page") || "1", 10);
//     const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

//     console.log("patientID and clinicID",patientId,clinicId);
//     const appointments = await prisma.appointment.findMany({
//       where: {
//         patientId,
//         // doctorVisit: { clinicId },
//         doctorVisit:{
//           clinicId:clinicId
//         }
//       },
//       include: {
//         doctorVisit: { include: { doctor: true, clinic: true } },
//       },
//       orderBy: { date: "desc" },
//       skip: (page - 1) * pageSize,
//       take: pageSize,
//     });
//     console.log(appointments)
//     return NextResponse.json({ appointments });
//   }catch(err){
//       console.log(err);
//       return new NextResponse("some internal error occured",{status : 500});
//   }
// }
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/Auth";
import DBClient from "@/lib/prisma";

const prisma = DBClient.getInstance().prisma;

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "CLINIC") {
    return new NextResponse("Unauthenticated", { status: 401 });
  }
  const clinic = await prisma.clinic.findUnique({
      where:{
          userId:session.user?.id
      }
    })
    if(!clinic){
      return new  NextResponse('Clinic not Found ',{status:401});
    }
  const url = new URL(req.url);
  const clinicId = clinic?.id;
  const patientId = params.id; // ✅ should now be defined

  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const pageSize = parseInt(url.searchParams.get("pageSize") || "10", 10);

  console.log("patientID and clinicID in history", patientId, clinicId);

  const appointments = await prisma.appointment.findMany({
    where: {
      patientId,
      doctorVisit: { clinicId },
    },
    include: {
      doctorVisit: { include: { doctor: true, clinic: true } },
    },
    orderBy: { date: "desc" },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  return NextResponse.json({ appointments });
}
