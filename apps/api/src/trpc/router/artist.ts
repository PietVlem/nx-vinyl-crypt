import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../../prisma/prismaClient';
import { protectedProcedure } from '../middleware';
import { trpc } from '../trpc';

export const artistRouter = trpc.router({
    create: protectedProcedure.input(
        z.object({
            name: z.string(),
        })
    ).mutation(async ({ input }) => {
        const newArtist = await prisma.artist.create({ data: {} })

        if (!newArtist) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to create artist in the database.',
            });
        }

        const newArtistAlias = await prisma.artistAlias.create({
            data: {
                name: input.name,
                artist: { connect: { id: newArtist.id } },
            },
        });

        if(!newArtistAlias) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to create artist alias in the database.',
            });
        }

        return {
            message: `Artist - ${input.name} created successfully.`,
        }
    })
})