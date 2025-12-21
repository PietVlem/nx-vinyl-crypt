import { Condition } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import { z } from 'zod';
import { prisma } from '../../prisma/prismaClient';
import { protectedProcedure } from '../middleware';
import { trpc } from '../trpc';

export const userVinylRouter = trpc.router({
    get: protectedProcedure.input(
        z.object({
            page: z.number().optional(),
        })
    )
        .query(async ({ ctx, input }) => {
            const { user } = ctx
            const { page: pageInput } = input

            const pageSize = 12

            const baseQueryParam = {
                where: {
                    userId: user.id,
                }
            }

            const extendedQueryParam = {
                where: {
                    userId: user.id,
                },
                orderBy: {
                    createdAt: 'desc' as const,
                },
                include: {
                    variant: {
                        include: {
                            vinyl: {
                                include: {
                                    artist: {
                                        select: {
                                            aliases: {
                                                select: {
                                                    name: true
                                                },
                                                where: {
                                                    isPrimary: true,
                                                }
                                            },
                                        }
                                    },
                                    genre: true,
                                    style: true,
                                }
                            }
                        }
                    }
                },
                take: pageSize,
                skip: pageInput ? (pageInput - 1) * pageSize : 0,
            }

            const records = await prisma.userVinyl.findMany(extendedQueryParam)
            const totalRecords = await prisma.userVinyl.count(baseQueryParam)

            const flattenedRecords = records.map(record => ({
                id: record.id,
                releaseDate: record.variant.releaseDate,
                coverImage: record.variant.coverImage,
                recordColor: record.variant.recordColor,
                vinylTitle: record.variant.vinyl.title,
                artistName: record.variant.vinyl.artist?.aliases[0]?.name || null,
                genre: record.variant.vinyl.genre?.name || null,
                style: record.variant.vinyl.style?.name || null,
            }));

            return {
                data: flattenedRecords,
                meta: {
                    totalRecords,
                    totalPages: Math.ceil(totalRecords / pageSize),
                    currentPage: pageInput || 1,
                    pageSize,
                }
            }
        }),
    getById: protectedProcedure.input(
        z.object({
            id: z.string(),
        })
    ).query(async ({ input }) => {
        const { id } = input;

        const record = await prisma.userVinyl.findUnique({
            where: { id },
            include: {
                variant: {
                    include: {
                        vinyl: true
                    }
                }
            }
        })

        if (!record) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: `User vinyl record with id ${id} not found`,
            });
        }

        return record;
    }),

    delete: protectedProcedure.input(
        z.object({
            ids: z.array(z.string()),
        })
    ).mutation(async ({ input }) => {
        const records = await prisma.userVinyl.deleteMany({
            where: {
                id: {
                    in: input.ids,
                }
            }
        })

        return {
            message: `${records.count} records have been deleted successfully`,
        }
    }),
    create: protectedProcedure.input(
        z.object({
            condition: z.nativeEnum(Condition),
            purchaseDate: z.string().optional(),
            notes: z.string().optional(),
            title: z.string(),
            artistId: z.string().optional(),
            styleId: z.string().optional(),
            genreId: z.string().optional(),
            releaseDate: z.string(),
            coverImage: z.string().optional(),
            recordColor: z.string().optional(),
        })
    ).mutation(async ({ ctx, input }) => {
        const { user } = ctx;

        const vinyl = await prisma.vinylRecord.create({
            data: {
                title: input.title,
                artist: input.artistId ? { connect: { id: input.artistId } } : undefined,
                style: input.styleId ? { connect: { id: input.styleId } } : undefined,
                genre: input.genreId ? { connect: { id: input.genreId } } : undefined,
            }
        })

        if (!vinyl) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to create vinyl record in the database.',
            });
        }

        const variant = await prisma.vinylVariant.create({
            data: {
                vinyl: { connect: { id: vinyl.id } },
                releaseDate: input.releaseDate,
                coverImage: input.coverImage || null,
                recordColor: input.recordColor || null,
            }
        })

        if (!variant) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to create vinyl variant in the database.',
            });
        }

        const userVinyl = await prisma.userVinyl.create({
            data: {
                user: { connect: { id: user.id } },
                variant: { connect: { id: variant.id } },
                condition: input.condition,
                purchaseDate: input.purchaseDate || null,
                notes: input.notes || null,
            }
        })

        if (!userVinyl) {
            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to create user vinyl in the database.',
            });
        }

        return {
            message: 'Vinyl record has been created successfully',
        }
    })
})