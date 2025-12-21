export const collectionRoutePaths = {
    SHARE_LINKS: 'share-links',
}

export const collectionRoutes = [
    {
        path: '',
        loadComponent: () =>
            import('@layouts').then(c => c.DashboardComponent),
        children: [
            {
                path: '',
                loadComponent: () => 
                    import('@features/collection/pages/collection/collection.component').then(c => c.CollectionComponent),
            },
            {
                path: collectionRoutePaths.SHARE_LINKS,
                loadComponent: () =>
                    import('@features/collection/pages/share-links/share-links.component').then(c => c.ShareLinksComponent),
            }
        ]
    }
]