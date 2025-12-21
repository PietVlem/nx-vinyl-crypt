import { inject, Injectable } from '@angular/core';
import type { inferRouterOutputs } from '@trpc/server';
import { trpcUtils } from '../utils/trpc';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { AppRouter } from '@server';

type RouterOutput = inferRouterOutputs<AppRouter>;

@Injectable({
  providedIn: 'root',
})
export class GenreApiService {
  trpcUtils = inject(trpcUtils);

  getGenres = async (): Promise<RouterOutput['genre']['get']> =>
    this.trpcUtils.client.genre.get.query();
}
