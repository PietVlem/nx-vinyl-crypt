import { PrismaClient } from '@prisma/client'
import {
    createArtistWithAliases,
    createGenres,
    createMainUser,
    createStyles,
    deleteArtists,
    deleteGenres,
    deleteShareLinks,
    deleteStyles,
    deleteTracks,
    deleteUsers,
    deleteUserVinylRecords
} from './seeds'

const prisma = new PrismaClient()

async function main() {
    await deleteShareLinks(prisma)
    await deleteUserVinylRecords(prisma)
    await deleteArtists(prisma)
    await deleteTracks(prisma)
    await deleteGenres(prisma)
    await deleteStyles(prisma)
    await deleteUsers(prisma)

    const user = await createMainUser(prisma)
    // await createGenres(prisma)
    // await createStyles(prisma)
    await createArtistWithAliases(prisma, user)
}
main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })