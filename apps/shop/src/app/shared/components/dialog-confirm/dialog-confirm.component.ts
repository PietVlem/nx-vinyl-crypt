import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorWarning, phosphorX } from '@ng-icons/phosphor-icons/regular';
import { DialogRef } from '@ngneat/dialog';
import { ButtonPrimaryDirective, ButtonSecondaryDirective } from '@shared/directives';

interface Data {
  title: string;
  description: string;
  confirmText: string;
  confirmFn: () => void;
}

@Component({
  selector: 'app-dialog-confirm',
  imports: [ButtonSecondaryDirective, ButtonPrimaryDirective, NgIcon],
  templateUrl: './dialog-confirm.component.html',
  providers: [provideIcons({ phosphorWarning, phosphorX })],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogConfirmComponent {
  

  ref: DialogRef<Data, boolean> = inject(DialogRef);

  title = computed(() => this.ref.data?.title);
  description = computed(() => this.ref.data?.description);
  confirmText = computed(() => this.ref.data?.confirmText);

  confirmFn = async () => {
    await this.ref.data?.confirmFn();
    this.ref.close();
  }

  constructor() {
    this.ref.updateConfig({
      closeButton: false,
      width: '512px',
    });
  }
}


