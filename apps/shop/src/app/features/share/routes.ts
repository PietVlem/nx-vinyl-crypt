import { tokenResolver } from '@features/share/data-access'

export const shareRoutes = [
    {
        path: ':token',
        resolve: { metaData: tokenResolver },
        loadComponent: () => import('@features/share/pages/share.component').then(c => c.ShareComponent),
    },
    {
        path: '',
        loadComponent: () => import('@core/pages/error/error.component').then(c => c.ErrorComponent)
    }
]