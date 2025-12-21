import type { PrismaClient } from '@prisma/client';
import artists from '../data/artists.json';

export const deleteArtists = async (prismaClient: PrismaClient) => {
    await prismaClient.artistAlias.deleteMany();
    prismaClient.artist.deleteMany();
} 

export const createArtistWithAliases = async (prismaClient: PrismaClient, user) => {
    for (const artist of artists) {
        const createdArtist = await prismaClient.artist.create({
            data: {
                bio: artist.bio,
                country: artist.country,
            }
        });

        for (const alias of artist.aliases) {
            await prismaClient.artistAlias.create({
                data: {
                    artist: { connect: { id: createdArtist.id } },
                    name: alias.name,
                    isPrimary: alias.isPrimary,
                },
            });
        }

        for (const record of artist.records) {
            const genre = await prismaClient.genre.upsert({
                where: { name: record.genre },
                update: {},
                create: { name: record.genre },
            });

            const style = await prismaClient.style.upsert({
                where: { name: record.style },
                update: {},
                create: { name: record.style },
            });

            const recordEntry = await prismaClient.vinylRecord.create({
                data: {
                    title: record.title,
                    artist: { connect: { id: createdArtist.id } },
                    genre: { connect: { id: genre.id } },
                    style: { connect: { id: style.id } },
                },
            });

            for (const variant of record.variants) {
                const variantEntry = await prismaClient.vinylVariant.create({
                    data: {
                        vinyl: { connect: { id: recordEntry.id } },
                        recordColor: variant.recordColor,
                        releaseDate: variant.releaseDate,
                        coverImage: variant.coverImage,
                    },
                });

                for (const track of variant.tracks) {
                    await prismaClient.track.create({
                        data: {
                            variant: { connect: { id: variantEntry.id } },
                            title: track.title,
                            side: track.side,
                        },
                    });
                }

                await prismaClient.userVinyl.create({
                    data: {
                        variant: { connect: { id: variantEntry.id } },
                        user: { connect: { id: user.id } },
                    }
                })
            }
        }
    }
}