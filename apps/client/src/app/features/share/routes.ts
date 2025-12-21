import { tokenResolver } from '@client/features/share/data-access';

export const shareRoutes = [
  {
    path: ':token',
    resolve: { metaData: tokenResolver },
    loadComponent: () =>
      import('@client/features/share/pages/share.component').then(
        (c) => c.ShareComponent
      ),
  },
  {
    path: '',
    loadComponent: () =>
      import('@client/core/pages/error/error.component').then((c) => c.ErrorComponent),
  },
];
