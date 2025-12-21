import type { PrismaClient } from "@prisma/client";

export const deleteShareLinks = async (prismaClient: PrismaClient) => 
    await prismaClient.collectionShare.deleteMany();