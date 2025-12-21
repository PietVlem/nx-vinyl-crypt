import { TRPCError } from '@trpc/server';
import { prisma } from '../../prisma/prismaClient';
import { publicProcedure } from '../middleware';
import { trpc } from '../trpc';

export const genreRouter = trpc.router({
   get: publicProcedure.query(async () => {
        const genres = await prisma.genre.findMany()

        if (!genres) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to fetch genres from the database.',
            });
        }

        return genres
    }),
})