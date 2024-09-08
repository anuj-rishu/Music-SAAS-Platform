import { PrismaClient } from "@prisma/client";

declare global {
    // This is necessary to avoid TypeScript errors
    // when using the global object in a TypeScript file
    var prisma: PrismaClient | undefined;
}

const prismaClient = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
    global.prisma = prismaClient;
}

export { prismaClient };