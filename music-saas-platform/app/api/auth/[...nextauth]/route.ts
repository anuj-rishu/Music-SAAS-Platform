import { PrismaClient } from "@prisma/client";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

const prisma = new PrismaClient();

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  callbacks: {
    async signIn(params) {
      if(!params.user.email)
   return false;
      try {
        await prisma.user.create({
          data: {
            email: "params.user.email",
            provider: "Google",
          },
        });
      } catch (e) {
        console.error(e);
      }
      return true;
    },
  },
});

export { handler as GET, handler as POST };