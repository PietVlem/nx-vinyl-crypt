import { routePaths } from '@app/routes'
import { collectionRoutePaths } from '@features/collection/routes'

export type NavItem = {
    icon?: string
    label: string
    uri: string
    guarded?: boolean
    children?: NavItem[]
}

export const navItems: NavItem[] = [
    {
        icon: 'phosphorVinylRecord',
        label: 'Collection',
        uri: `/${routePaths.COLLECTION}`,
        guarded: true,
        children: [
            {
                label: 'Records',
                uri: `/${routePaths.COLLECTION}`,
            },
            {
                label: 'Share Links',
                uri: `/${routePaths.COLLECTION}/${collectionRoutePaths.SHARE_LINKS}`,
            }
        ]
    }
]