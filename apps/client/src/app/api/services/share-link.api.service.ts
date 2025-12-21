import { inject, Injectable } from '@angular/core';
import type { inferRouterInputs, inferRouterOutputs } from '@trpc/server';
import { trpcUtils } from '../utils/trpc';

// eslint-disable-next-line @nx/enforce-module-boundaries
import { AppRouter } from '@server';

type RouterInput = inferRouterInputs<AppRouter>;
type RouterOutput = inferRouterOutputs<AppRouter>;

@Injectable({
  providedIn: 'root',
})
export class ShareLinkApiService {
  trpcUtils = inject(trpcUtils);

  getShareLinks = async (): Promise<RouterOutput['shareLink']['get']> =>
    this.trpcUtils.client.shareLink.get.query();

  createShareLink = async (
    input: RouterInput['shareLink']['create']
  ): Promise<RouterOutput['shareLink']['create']> =>
    this.trpcUtils.client.shareLink.create.mutate(input);

  deleteShareLink = async (
    input: RouterInput['shareLink']['delete']
  ): Promise<RouterOutput['shareLink']['delete']> =>
    this.trpcUtils.client.shareLink.delete.mutate(input);

  checkToken = async (
    input: RouterInput['shareLink']['checkToken']
  ): Promise<RouterOutput['shareLink']['checkToken']> =>
    this.trpcUtils.client.shareLink.checkToken.query(input);

  getSharedData = async (
    input: RouterInput['shareLink']['getSharedData']
  ): Promise<RouterOutput['shareLink']['getSharedData']> =>
    this.trpcUtils.client.shareLink.getSharedData.query(input);
}
