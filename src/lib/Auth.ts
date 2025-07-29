import { PrismaAdapter } from "@auth/prisma-adapter"
import GoogleProvider from "next-auth/providers/google"
import { NextAuthOptions } from "next-auth"
import DBClient from "@/lib/prisma"
const prisma = DBClient.getInstance().prisma
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
   async session({ session, user }) {
    if (session.user) {
        if (user) {
        // Type assertion to satisfy TypeScript
        session.user.id = (user as { id: string }).id;
        session.user.role = (user as unknown as { role: string }).role;
        } else {
        // Fetch from DB if user is not present (subsequent requests)
        const dbUser = await prisma.user.findUnique({
            where: { email: session.user.email! },
            select: { id: true, role: true },
        });
        if (dbUser) {
            session.user.id = dbUser.id;
            session.user.role = dbUser.role;
        }
        }
    }
    return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
}

import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
    };
  }
}
