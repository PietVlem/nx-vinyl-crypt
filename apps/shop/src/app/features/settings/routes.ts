export const settingsRoutePaths = {
    PROFILE: 'profile',
}

export const settingsRoutes = [
    {
        path: '',
        loadComponent: () =>
            import('@layouts').then(c => c.DashboardComponent),
        children: [
            {
                path: settingsRoutePaths.PROFILE,
                loadComponent: () => import('@features/settings/profile/profile.component').then(c => c.ProfileComponent),
            }
        ]
    }
]