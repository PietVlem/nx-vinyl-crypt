import { inject, Injectable } from '@angular/core';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { trpcUtils } from '../utils/trpc';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { AppRouter } from '@server';
 
type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

@Injectable({
    providedIn: 'root'
})
export class ArtistAliasApiService {
    trpcUtils = inject(trpcUtils);

    getArtistsAliases = async (
        input : RouterInput['artistAlias']['get']
    ) : Promise<RouterOutput['artistAlias']['get']> =>
        this.trpcUtils.client.artistAlias.get.query(input)
}
