import { getServerSession } from "next-auth/next";
import { NextResponse } from "next/server";
import { authOptions } from "@/lib/Auth";
import DBClient from "@/lib/prisma";

const prisma = DBClient.getInstance().prisma;

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Not authenticated" },
        { status: 401 }
      );
    }

    const { role } = await req.json();
    console.log(role);
    // First get current user to check existing role
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { clinic: true }
    });

    if (!currentUser) {
      return NextResponse.json(
        { error: "User not found" },
        { status: 404 }
      );
    }

    // Prevent role changes if already set (optional but recommended)
    // if (currentUser.role && currentUser.role !== 'ADMIN') {
    //   return NextResponse.json(
    //     { error: "Role already assigned and cannot be changed" },
    //     { status: 400 }
    //   );
    // }

    // Handle clinic creation if switching to CLINIC role
    if (role === 'CLINIC' && !currentUser.clinic) {
      await prisma.clinic.create({
        data: {
          name: `${currentUser.name || 'New Clinic'}'s Clinic`,
          location: 'Address not specified',
          phone: '',
          userId: currentUser.id
        }
      });
    }

    // Update the role
    const updatedUser = await prisma.user.update({
      where: { email: session.user.email },
      data: { role },
      include: { clinic: role === 'CLINIC' } // Include clinic if relevant
    });

    return NextResponse.json(updatedUser);

  } catch (error) {
    console.error("Error updating user role:", error);
    return NextResponse.json(
      { error: "Error updating role" },
      { status: 500 }
    );
  }
}