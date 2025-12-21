import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ShareLinkService } from '@features/collection/data-access';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorEye, phosphorEyeSlash, phosphorX } from '@ng-icons/phosphor-icons/regular';
import { DialogRef } from '@ngneat/dialog';
import { ButtonPrimaryDirective, ButtonSecondaryDirective, StylingInputDirective } from '@shared/directives';
import { futureDateValidator } from '@shared/utils/validators';
import dayjs from 'dayjs';
import { ShareTypeEnum, shareTypeOptions } from './share-type-options';

@Component({
  selector: 'app-dialog-create-share-link',
  imports: [
    ButtonSecondaryDirective, 
    ButtonPrimaryDirective, 
    NgIcon,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    StylingInputDirective
  ],
  providers: [provideIcons({ phosphorX, phosphorEye, phosphorEyeSlash })],
  templateUrl: './dialog-create-share-link.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DialogCreateShareLinkComponent {
  shareLinkService = inject(ShareLinkService);
  ref: DialogRef<{}, boolean> = inject(DialogRef);

  shareTypeOptions = signal(shareTypeOptions);
  todaysDate = signal<string>(dayjs().format('YYYY-MM-DD'));
  passwordFieldShown = signal<boolean>(false);
  passwordInputShown = signal<boolean>(false);
  expirationDateShown = signal<boolean>(false);

  createShareLinkForm = new FormGroup({
    name: new FormControl<string>('', [
      Validators.required
    ]),
    shareType: new FormControl<ShareTypeEnum>(ShareTypeEnum.COLLECTION),
    password: new FormControl<string>(''),
    expiresAt: new FormControl<Date | null>(null, [
      futureDateValidator
    ]),
  })

  createShareLinkMutation = this.shareLinkService.createShareLink(
    () => this.ref.close(true),
  )

  togglePasswordField = () => 
    this.passwordFieldShown.update((prev) => {
      const newValue = !prev;
      !newValue && this.createShareLinkForm.patchValue({
        password: ''
      });
      return newValue;
    });

  togglePasswordInput = () => 
    this.passwordInputShown.update((prev) => !prev)

  toggleExpirationDate = () =>
    this.expirationDateShown.update((prev) => !prev)

  createShareLink = () => {
    const { expiresAt, ...formValues } = this.createShareLinkForm.value;
    
    this.createShareLinkMutation.mutate({ 
      ...formValues, 
      ...(expiresAt && { expiresAt: dayjs(expiresAt).toDate() }) 
    });
  }

  constructor() {
    this.ref.updateConfig({
      closeButton: false,
      width: '512px',
    });
  }
}
