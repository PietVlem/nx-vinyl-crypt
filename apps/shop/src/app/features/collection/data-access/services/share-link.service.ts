import { inject, Injectable } from '@angular/core';
import { ShareLinkApiService } from '@api';
import { NotificationService } from '@core/services';
import { injectMutation, injectQuery, QueryClient } from '@tanstack/angular-query-experimental';

@Injectable({
    providedIn: 'root'
})
export class ShareLinkService {
    private shareLinkApiService = inject(ShareLinkApiService)
    private queryClient = inject(QueryClient)
    private notificationService = inject(NotificationService);

    getShareLinks = () => injectQuery(() => ({
        queryKey: ['shareLinks'],
        queryFn: () => this.shareLinkApiService.getShareLinks(),
    }))

    createShareLink = (successCallback: () => void) => injectMutation(() => ({
        mutationFn: (data: any) =>
            this.shareLinkApiService.createShareLink(data),
        onSuccess: () => {
            this.queryClient.invalidateQueries({ queryKey: ['shareLinks'] })
            this.notificationService.success(
                'Successfully created!',
                'Your shareable link has been successfully created.',
            )
            successCallback()
        }
    }))

    deleteShareLink = () => injectMutation(() => ({
        mutationFn: (data: any) =>
            this.shareLinkApiService.deleteShareLink(data),
        onSuccess: () => {
            this.queryClient.invalidateQueries({ queryKey: ['shareLinks'] })
            this.notificationService.success(
                'Successfully deleted!',
                'The shareable link has been removed.',
            )
        }
    }))
}
