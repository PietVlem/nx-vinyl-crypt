import { Injectable, inject } from '@angular/core';
import { DialogCreateShareLinkComponent } from '@features/collection/components/dialog-create-share-link/dialog-create-share-link.component';
import { DialogService } from '@ngneat/dialog';

@Injectable({
  providedIn: 'root'
})
export class ShareLinksHelperService {
  private dialog = inject(DialogService);

  openShareLinkCreationDialog = () => {
    this.dialog.open(DialogCreateShareLinkComponent, {
      data: {}
    })
  }
}
