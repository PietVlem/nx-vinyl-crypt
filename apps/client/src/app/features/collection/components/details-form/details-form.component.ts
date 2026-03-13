import { Component, effect, inject, signal, untracked } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import dayjs from 'dayjs';
import { Condition } from '../../../../core/models/condition.enum';
import { IdValue } from '../../../../core/models/id-value.model';
import { DRAWER_CONTEXT_TOKEN, DrawerContext, DrawerService } from '../../../../core/services/drawer.service';
import { SelectComponent } from '../../../../shared/components/select/select.component';
import { ButtonPrimaryDirective } from '../../../../shared/directives/button-primary.directive';
import { ButtonSecondaryDirective } from '../../../../shared/directives/button-secondary.directive';
import { StylingInputDirective } from '../../../../shared/directives/styling-input.directive';
import { DrawerBaseComponent } from '../../../../shared/layouts/drawer-base/drawer-base.component';
import { imgUrlValidator } from '../../../../shared/utils/validators';
import { UserVinylRecordService } from '../../data-access/services/user-vinyl-record.service';
import { SelectsHelpersService } from '../../helpers/selects.helpers.service';
import { HorizontalFormGroupComponent } from '../horizontal-form-group/horizontal-form-group.component';

@Component({
  selector: 'app-details-form',
  imports: [
    DrawerBaseComponent,
    ReactiveFormsModule,
    FormsModule,
    StylingInputDirective,
    ButtonPrimaryDirective,
    ButtonSecondaryDirective,
    HorizontalFormGroupComponent,
    SelectComponent,
  ],
  templateUrl: './details-form.component.html',
})
export class DetailsFormComponent {
  private userVinylRecordService = inject(UserVinylRecordService);
  private contextValue = inject(DRAWER_CONTEXT_TOKEN) as DrawerContext;
  public selectsHelpersService = inject(SelectsHelpersService);
  public drawerService = inject(DrawerService);

  action = signal<'add' | 'edit'>('add');

  getVinylRecordByIdQuery = this.userVinylRecordService.getVinylRecordById(
    this.contextValue.data?.id ?? ''
  );
  createVinylRecordMutation = this.userVinylRecordService.createVinylRecord(
    () => this.drawerService.hide()
  );
  editVinylRecordMutation = this.userVinylRecordService.editVinylRecord(
    () => this.drawerService.hide()
  );

  vinylCreationForm = new FormGroup({
    /* user vinyl */
    condition: new FormControl<IdValue>({ id: 'mint', value: Condition.Mint }),
    notes: new FormControl<string>(''),
    purchaseDate: new FormControl<string | null>(null),
    /* vinyl */
    title: new FormControl<string>('', [Validators.required]),
    artist: new FormControl<IdValue | null>(null),
    genre: new FormControl<IdValue | null>(null, [Validators.required]),
    style: new FormControl<IdValue | null>(null),
    /* vinyl variant */
    releaseDate: new FormControl<string | null>(null, [Validators.required]),
    coverImage: new FormControl<string>('', imgUrlValidator),
    recordColor: new FormControl<string>(''),
  });

  updateVinyl = () => {
    if (this.vinylCreationForm.invalid) {
      this.vinylCreationForm.markAllAsTouched();
      return;
    }

    if (!this.contextValue.data?.id) return;

    this.editVinylRecordMutation.mutate({
      id: this.contextValue.data.id,
      ...this.vinylCreationForm.value,
      artistId: this.vinylCreationForm.value.artist?.id,
      genreId: this.vinylCreationForm.value.genre?.id,
      styleId: this.vinylCreationForm.value.style?.id,
      condition: this.vinylCreationForm.value.condition?.id,
      releaseDate: dayjs(this.vinylCreationForm.value.releaseDate).toDate(),
      purchaseDate: this.vinylCreationForm.value.purchaseDate ? dayjs(this.vinylCreationForm.value.purchaseDate).toDate() : undefined,
    });
  }

  addVinyl = () => {
    if (this.vinylCreationForm.invalid) {
      this.vinylCreationForm.markAllAsTouched();
      return;
    }

    this.createVinylRecordMutation.mutate({
      ...this.vinylCreationForm.value,
      artistId: this.vinylCreationForm.value.artist?.id,
      genreId: this.vinylCreationForm.value.genre?.id,
      styleId: this.vinylCreationForm.value.style?.id,
      condition: this.vinylCreationForm.value.condition?.id,
      releaseDate: dayjs(this.vinylCreationForm.value.releaseDate).toDate(),
      purchaseDate: this.vinylCreationForm.value.purchaseDate ? dayjs(this.vinylCreationForm.value.purchaseDate).toDate() : undefined,
    });
  };

  onGetVinylRecordByIdQueryEffect = effect(() => {
    if (!this.contextValue.data?.id) return;

    untracked(() => this.action.set('edit'))

    if (this.getVinylRecordByIdQuery.isLoading()) {
      this.vinylCreationForm.disable();
    } else {
      this.vinylCreationForm.enable();
    }

    const data = this.getVinylRecordByIdQuery.data();
    if (data) {
      const {
        notes,
        purchaseDate,
        variant: {
          releaseDate,
          coverImage,
          recordColor,
          vinyl: { title, artistId, artist, genre, style },
        },
      } = data;

      this.vinylCreationForm.patchValue({
        condition: this.selectsHelpersService.conditionSelectOptions().find(option => option.id === data.condition),
        notes: notes ?? '',
        purchaseDate: purchaseDate ? dayjs(purchaseDate).format('YYYY-MM-DD') : null,
        title: title ?? '',
        artist: artistId ? { id: artistId, value: artist?.aliases?.[0]?.name ?? '' } : null,
        genre: genre ? { id: genre.id, value: genre.name } : null,
        style: style ? { id: style.id, value: style.name } : null,
        releaseDate: releaseDate ? dayjs(releaseDate).format('YYYY-MM-DD') : null,
        coverImage: coverImage ?? '',
        recordColor: recordColor ?? '',
      });
    }
  });
}
