export enum ShareTypeEnum {
    WISHLIST = 'wishlist',
    COLLECTION = 'collection',
    BOTH = 'both'
}

export const shareTypeOptions = [
    {
        value: ShareTypeEnum.COLLECTION,
        label: 'Collection',
        description: 'Will only share the collection',
    },
    {
        value: ShareTypeEnum.WISHLIST,
        label: 'Wishlist',
        description: 'Will only share the wishlist',
    },
    {
        value: ShareTypeEnum.BOTH,
        label: 'Both',
        description: 'Will share both the wishlist and collection',
    }
]