import { inject, Injectable, Signal } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ShareLinkApiService } from '@api';
import { NotificationService } from '@core/services';
import { injectQuery } from '@tanstack/angular-query-experimental';

@Injectable({
  providedIn: 'root'
})
export class ShareLinksService {
  private shareLinkApiService = inject(ShareLinkApiService);
  private notificationService = inject(NotificationService);

  checkToken = (token: string) => this.shareLinkApiService.checkToken({ token })

  getSharedData = (
    token: Signal<string>,
    enabled: Signal<boolean>,
    password: FormControl<string | null>,
  ) => injectQuery(() => ({
    enabled: enabled(),
    queryKey: ['get-shared-data', token()],
    queryFn: () => 
      this.shareLinkApiService.getSharedData({
        token: token(),
        ...(password && { password: password.value || undefined }),
      })
      .then((res) => res)
      .catch(() => {
        this.notificationService.error(
          'Error',
          'Invalid password',
        );
      })
  }));
}
