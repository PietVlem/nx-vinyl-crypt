import type { PrismaClient } from '@prisma/client';

export const deleteTracks = (prismaClient: PrismaClient) =>
    prismaClient.track.deleteMany();