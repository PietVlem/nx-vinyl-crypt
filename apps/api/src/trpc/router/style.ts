import { z } from 'zod';
import { prisma } from '../../prisma/prismaClient';
import { publicProcedure } from '../middleware';
import { trpc } from '../trpc';

export const styleRouter = trpc.router({
   get: publicProcedure.input(
           z.object({
               searchQuery: z.string(),
           })
       ).query(async ({ input }) => {
        const { searchQuery } = input;

        const styles = await prisma.style.findMany({
            where: {
                name: {
                    contains: searchQuery,
                    mode: 'insensitive',
                },
            },
            orderBy: {
                name: 'asc',
            },
            take: 10,
        })

        return styles
    }),
})