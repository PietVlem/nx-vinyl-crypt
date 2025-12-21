import type { PrismaClient } from '@prisma/client';
import genres from '../data/genres.json';

export const deleteGenres = (prismaClient: PrismaClient) =>
    prismaClient.genre.deleteMany()

export const createGenres = async (prismaClient: PrismaClient) => {
    for (const genre of genres) {
        await prismaClient.genre.create({
            data: { name: genre },
        });
    };
}