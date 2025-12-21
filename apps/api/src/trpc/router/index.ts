import { trpc } from "../trpc";
import { artistRouter } from "./artist";
import { artistAliasRouter } from "./artist-alias";
import { genreRouter } from "./genre";
import { shareLinkRouter } from "./share-link";
import { styleRouter } from "./style";
import { userRouter } from "./user";
import { userVinylRouter } from "./user-vinyl";

export const appRouter = trpc.router({
    user: userRouter,
    genre: genreRouter,
    style: styleRouter,
    artist: artistRouter,
    shareLink: shareLinkRouter,
    userVinyl: userVinylRouter,
    artistAlias: artistAliasRouter,
})

export type AppRouter = typeof appRouter