import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../../prisma/prismaClient';
import { publicProcedure } from '../middleware';
import { trpc } from '../trpc';

export const userRouter = trpc.router({
    getOrCreate: publicProcedure.input(
        z.object({
            auth0Id: z.string(),
            email: z.string().email(),
            name: z.string().optional(),
        })
    ).query(async ({ input }) => {
        const { auth0Id, email, name } = input;

        const user = await prisma.user.findUnique({
            where: { auth0Id }
        })

        console.log('Fetching user with auth0Id:', user);

        if (user) { return user }

        const newUser = await prisma.user.create({
            data: {
                auth0Id,
                email,
                name,
            },
        })

        console.log('New user created:', newUser);

        if(!newUser) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to fetch the user from the database.',
            });
        }

        return newUser;
    }),
})