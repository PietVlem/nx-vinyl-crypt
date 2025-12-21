import { CommonModule } from '@angular/common';
import { Component, effect, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Condition } from '@core/models';
import { DrawerService } from '@core/services';
import type { DrawerContext } from '@core/services/drawer.service';
import { DRAWER_CONTEXT_TOKEN } from '@core/services/drawer.service';
import { UserVinylRecordService } from '@features/collection/data-access';
import { SelectsHelpersService } from '@features/collection/helpers';
import { DrawerBaseComponent } from '@layouts';
import { SelectComponent } from '@shared/components';
import { ButtonPrimaryDirective, ButtonSecondaryDirective, StylingInputDirective } from '@shared/directives';
import { imgUrlValidator } from '@shared/utils/validators';
import dayjs from 'dayjs';
import { HorizontalFormGroupComponent } from '../horizontal-form-group/horizontal-form-group.component';

@Component({
  selector: 'app-details-form',
  imports: [
    DrawerBaseComponent,
    ReactiveFormsModule,
    CommonModule,
    FormsModule,
    StylingInputDirective,
    ButtonPrimaryDirective,
    ButtonSecondaryDirective,
    HorizontalFormGroupComponent,
    SelectComponent
  ],
  templateUrl: './details-form.component.html',
})
export class DetailsFormComponent {
  private userVinylRecordService = inject(UserVinylRecordService)
  private contextValue = inject(DRAWER_CONTEXT_TOKEN) as DrawerContext;
  public selectsHelpersService = inject(SelectsHelpersService)
  public drawerService = inject(DrawerService)

  getVinylRecordByIdQuery = this.userVinylRecordService.getVinylRecordById(this.contextValue.data?.id ?? '');
  createVinylRecordMutation = this.userVinylRecordService.createVinylRecord(
    () => this.drawerService.hide()
  )

  vinylCreationForm = new FormGroup({
    /* user vinyl */
    condition: new FormControl<Condition>(Condition.Mint),
    notes: new FormControl<string>(''),
    purchaseDate: new FormControl<Date | null>(null),
    /* vinyl */
    title: new FormControl<string>('', [Validators.required]),
    artistId: new FormControl<string>(''),
    genreId: new FormControl<string>('', [Validators.required]),
    styleId: new FormControl<string>(''),
    /* vinyl variant */
    releaseDate: new FormControl<Date | null>(null, [Validators.required]),
    coverImage: new FormControl<string>('', imgUrlValidator),
    recordColor: new FormControl<string>(''),
  });

  addVinyl = () => {
    if (this.vinylCreationForm.invalid) {
      this.vinylCreationForm.markAllAsTouched();
      return;
    }

    this.createVinylRecordMutation.mutate({
      ...this.vinylCreationForm.value,
      releaseDate: dayjs(this.vinylCreationForm.value.releaseDate).toDate() ?? undefined,
      purchaseDate: dayjs(this.vinylCreationForm.value.purchaseDate).toDate() ?? undefined,
    })
  }

  onGetVinylRecordByIdQueryEffect = effect(() => {
    this.getVinylRecordByIdQuery.isLoading()
      ? this.vinylCreationForm.disable()
      : this.vinylCreationForm.enable();

    console.log('Fetched vinyl record by ID:', this.getVinylRecordByIdQuery.data());
    const data = this.getVinylRecordByIdQuery.data()
    if (data) {
      const {
        notes,
        purchaseDate,
        variant: {
          releaseDate,
          coverImage,
          recordColor,
          vinyl: {
            title,
            artistId,
            genreId,
            styleId
          }
        },
      } = data;

      this.vinylCreationForm.patchValue({
        condition: Condition.Mint,
        notes: notes ?? '',
        purchaseDate: purchaseDate ? new Date(purchaseDate) : null,
        title: title ?? '',
        artistId: artistId ?? '',
        genreId: genreId ?? '',
        styleId: styleId ?? '',
        releaseDate: releaseDate ? new Date(releaseDate) : null,
        coverImage: coverImage ?? '',
        recordColor: recordColor ?? '',
      })
    }
  })
}
