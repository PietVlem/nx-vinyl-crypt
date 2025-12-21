import { ShareType } from '@prisma/client';
import { TRPCError } from '@trpc/server';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { z } from 'zod';
import { prisma } from '../../prisma/prismaClient';
import { protectedProcedure, publicProcedure } from '../middleware';
import { trpc } from '../trpc';

export const shareLinkRouter = trpc.router({
   get: protectedProcedure.query(async ({ ctx }) => {
        const { user } = ctx;

        const shareLinks = await prisma.collectionShare.findMany({
            where: {
                userId: user.id,
            },
            orderBy: {
                createdAt: 'desc',
            },
        });

        return shareLinks.map(({ password, ...link }) => ({
            ...link,
            hasPassword: !!password,
        }));
    }),
    create: protectedProcedure
        .input(
            z.object({
                name: z.string(),
                shareType: z.nativeEnum(ShareType),
                password: z.string().optional(),
                expiresAt: z.string().optional(),
            })
        )
        .mutation(async ({ input, ctx }) => {
            const { shareType, password, expiresAt } = input;
            const { user } = ctx;

            if(expiresAt && new Date(expiresAt) < new Date()) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Expiration date must be in the future',
                });
            }

            const shareToken = randomBytes(16).toString('hex');
            const hashedPassword = password ? await bcrypt.hash(password, 10) : null;

            const shareLink = await prisma.collectionShare.create({
                data: {
                    userId: user.id,
                    name: input.name,
                    shareType,
                    shareToken,
                    password: hashedPassword,
                    expiresAt
                },
            });

            if (!shareLink) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Failed to create share link',
                });
            }

            return { 'shareToken': shareLink.shareToken };
        }),
    delete: protectedProcedure
        .input(
            z.object({
                id: z.string()
            })
        ).mutation(async ({ input }) => {
            const { id } = input;

            const shareLink = await prisma.collectionShare.findUnique({
                where: {
                    id,
                },
            });

            if (!shareLink) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Requested share link has not been found',
                });
            }

            await prisma.collectionShare.delete({
                where: {
                    id,
                },
            });

            return { message: `share link ${id} has been deleted` };
        }),
    checkToken: publicProcedure
        .input(
            z.object({
                token: z.string(),
            })
        ).query(async ({ input }) => {
            const { token } = input;

            const shareLink = await prisma.collectionShare.findUnique({
                where: {
                    shareToken: token,
                },
            });

            const isExpired = shareLink?.expiresAt ? shareLink.expiresAt < new Date() : false;

            return { 
                isValid: !!shareLink,
                isExpired,
                hasPassword: !!shareLink?.password,
            };
        }),
    getSharedData: publicProcedure
        .input(
            z.object({
                token: z.string(),
                password: z.string().optional()
            })
        ).query(async ({ input }) => {
            const { token, password } = input;

            const shareLink = await prisma.collectionShare.findUnique({
                where: {
                    shareToken: token,
                },
            });

            if (!shareLink) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Requested share link has not been found',
                });
            }

            if (shareLink.password) {
                if(!password) {
                    throw new TRPCError({
                        code: 'UNAUTHORIZED',
                        message: 'Password is required to access this share link',
                    });
                }

                const isPasswordValid = await bcrypt.compare(password, shareLink.password);

                if (!isPasswordValid) {
                    throw new TRPCError({
                        code: 'UNAUTHORIZED',
                        message: 'Invalid password',
                    });
                }
            }

            const getCollection = () => prisma.userVinyl.findMany({
                where: {
                    userId: shareLink.userId,
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
                }
            })

            const getWishList = () => {
                // TODO: implement wishlist
            }


            let collection = null
            let wishList = null

            switch (shareLink.shareType) {
                case ShareType.collection:
                    collection = await getCollection()
                    break;
                case ShareType.wishlist:
                    wishList = await getWishList()
                    break;
                case ShareType.both:
                    collection = await getCollection()
                    wishList = await getWishList()
                    break;
            }

            const flattenedRecords = collection?.map(record => ({
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
                collection: flattenedRecords,
                wishList,
            };
        })
})