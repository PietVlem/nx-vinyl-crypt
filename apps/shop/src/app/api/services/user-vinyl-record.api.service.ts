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
export class UserVinylRecordApiService {
    trpcUtils = inject(trpcUtils);

    getVinylRecords = async (
        input: RouterInput['userVinyl']['get']
    ): Promise<RouterOutput['userVinyl']['get']> =>
        this.trpcUtils.client.userVinyl.get.query(input)

    getVinylRecordById = async (
        input: RouterInput['userVinyl']['getById']
    ): Promise<RouterOutput['userVinyl']['getById']> =>
        this.trpcUtils.client.userVinyl.getById.query(input)

    createVinylRecord = async (
        input: RouterInput['userVinyl']['create']
    ): Promise<RouterOutput['userVinyl']['create']> =>
        this.trpcUtils.client.userVinyl.create.mutate(input)

    deleteVinylRecords = async (
        input: RouterInput['userVinyl']['delete']
    ): Promise<RouterOutput['userVinyl']['delete']> =>
        this.trpcUtils.client.userVinyl.delete.mutate(input)
}
