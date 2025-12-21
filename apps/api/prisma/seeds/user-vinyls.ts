import type { PrismaClient } from '@prisma/client';

export const deleteUserVinylRecords = (prismaClient: PrismaClient) =>
    prismaClient.userVinyl.deleteMany();