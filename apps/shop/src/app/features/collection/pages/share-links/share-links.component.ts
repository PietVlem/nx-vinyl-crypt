import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { NotificationService } from '@core/services';
import { ShareLinkService } from '@features/collection/data-access';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCopy, phosphorTrash } from '@ng-icons/phosphor-icons/regular';
import { DialogService } from '@ngneat/dialog';
import { BadgeComponent, DialogConfirmComponent, EmptyStateComponent } from '@shared/components';
import { TitleTextActionComponent } from '@shared/components/title-text-action/title-text-action.component';
import { ButtonPrimaryDirective, StylingInputDirective } from '@shared/directives';
import { formatDate } from '@shared/utils/dayjs';
import { ShareLinksHelperService } from './share-links.service';

@Component({
  selector: 'app-share-links',
  imports: [
    ButtonPrimaryDirective,
    CommonModule,
    EmptyStateComponent,
    NgIcon,
    TitleTextActionComponent,
    BadgeComponent,
    StylingInputDirective,
],
  providers: [
    provideIcons({ phosphorTrash, phosphorCopy })
  ],
  templateUrl: './share-links.component.html',
})
export class ShareLinksComponent {
  private shareLinksHelperService = inject(ShareLinksHelperService);
  private dialog = inject(DialogService);
  private shareLinkService = inject(ShareLinkService);
  private notificationService = inject(NotificationService);

  shareLinksQuery = this.shareLinkService.getShareLinks();
  deleteShareLinkMutation = this.shareLinkService.deleteShareLink();

  formatLinkDate = (date: string) => formatDate(date);

  openShareLinkCreationDialog = () => 
    this.shareLinksHelperService.openShareLinkCreationDialog();

  copyShareLink = (token: string) => {
    const host = window.location.host;
    const url = `http://${host}/share/${token}`;

    navigator.clipboard.writeText(url);

    this.notificationService.success(
      'Link Copied',
      'The shareable link has been copied to your clipboard.',
    )
  }

  checkActive = (linkObj: any) => {
    if (linkObj.expiresAt === null) {
      return true;
    }

    const currentDate = new Date();
    const expirationDate = new Date(linkObj.expiresAt);

    return linkObj?.expiresAt && (linkObj.expiresAt === null || expirationDate > currentDate);
  }

  deleteShareLink = (id: string) => this.dialog.open(DialogConfirmComponent, {
    data: {
      title: 'Delete Shareable Link',
      description: 'Are you sure you want to delete this shareable link? This action cannot be undone.',
      confirmText: 'Delete Link',
      confirmFn: () => this.deleteShareLinkMutation.mutate({id})
    },
  });
}
