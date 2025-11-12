import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import DBClient from "@/lib/prisma";
import { authOptions } from "@/lib/Auth";
const prisma = DBClient.getInstance().prisma;

export const GET = async(req:NextRequest)=>{
    try{
        const session = await getServerSession(authOptions);
        if(!session || session.user?.role!== 'CLINIC'){
            return new NextResponse('Unauthorized',{status : 401})
        }
        const clinicUserId = session.user.id; // this is User.id
        const clinic = await prisma.clinic.findUnique({
            where: { userId: clinicUserId },
        });

        if (!clinic) {
            return new NextResponse("Clinic not found", { status: 404 });
        }
        // const clinicId = session.user.id;
        const url = new URL(req.url);
        const search = url.searchParams.get("search")||"";
        const page = parseInt(url.searchParams.get("page") || "1", 10)
        const pageSize = parseInt(url.searchParams.get("pageSize") || "20", 10)
        
        let matchedUserIds: string[] | undefined = undefined;
        if(search.trim()){
            const matched = await prisma.user.findMany({
                where:{
                    OR: [
                        { name: { contains: search, mode: "insensitive" } },
                        { email: { contains: search, mode: "insensitive" } },
                    ],
                },
                select:{id:true}
            })
            matchedUserIds = matched.map((m)=>m.id);
            if(matchedUserIds.length ===0){
                return NextResponse.json({items:[],total:0});
            }
        }
        const whereClause: any = {
            doctorVisit: {
                clinicId: clinic.id,   // 👈 Correct: use Clinic.id, not User.id
            },
            ...(matchedUserIds ? { patientId: { in: matchedUserIds } } : {}),
        };

        // debug >> 
        const test = await prisma.appointment.findMany({
             where: { doctorVisit: { clinicId: clinic.id } },
        });
        console.log("test appointments", test);

        const grouped = await prisma.appointment.groupBy({
            by: ["patientId"],
            where: {
                doctorVisit: { clinicId: clinic.id },
                ...(matchedUserIds ? { patientId: { in: matchedUserIds } } : {}),
            },
            _count: { patientId: true },
            _max: { date: true },
            orderBy: { _max: { date: "desc" } },
            skip: (page - 1) * pageSize,
            take: pageSize,
        });

        const patientIds = grouped.map((g)=>g.patientId);

        const users = await prisma.user.findMany({
            where: { id: { in: patientIds } },
    select: { id: true, name: true, email: true, image: true },  
        })

        const items = grouped.map((g) => {
            const u = users.find((x) => x.id === g.patientId);
            return {
                patient: u,
                totalAppointments: g._count.patientId,
                lastVisit: g._max.date,
            };
        });
        const groupedAll = await prisma.appointment.groupBy({
            by: ["patientId"],
            where: whereClause,
        });
        const total = groupedAll.length;

        return NextResponse.json({ items, total });
    }catch(err){
        console.error(err);
        return NextResponse.json({ error: "internal" }, { status: 500 });
    }
}