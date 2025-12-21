import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { DrawerService } from '@core/services';
import { DetailsFormComponent } from '@features/collection/components/details-form/details-form.component';
import { UserVinylRecordService } from '@features/collection/data-access';
import { NgIcon, provideIcons } from '@ng-icons/core';
import {
  phosphorMusicNotesPlus,
  phosphorPencil,
  phosphorShare,
  phosphorTrash,
  phosphorVinylRecord
} from '@ng-icons/phosphor-icons/regular';
import { DialogService } from '@ngneat/dialog';
import {
  BaseContentTableComponent,
  DialogConfirmComponent,
  EmptyStateComponent,
  PaginationComponent,
  RecordRowComponent,
  TitleTextActionComponent
} from '@shared/components';
import { ButtonPrimaryDirective } from '@shared/directives';

@Component({
  selector: 'app-protected',
  templateUrl: './collection.component.html',
  imports: [
    CommonModule,
    NgIcon,
    EmptyStateComponent,
    ButtonPrimaryDirective,
    PaginationComponent,
    TitleTextActionComponent,
    BaseContentTableComponent,
    RecordRowComponent
  ],
  viewProviders: [
    provideIcons({
      phosphorVinylRecord,
      phosphorTrash,
      phosphorMusicNotesPlus,
      phosphorShare,
      phosphorPencil
    })
  ],
})
export class CollectionComponent {
  private drawerService = inject(DrawerService)
  private userVinylRecordService = inject(UserVinylRecordService)
  private dialog = inject(DialogService);

  currentPage = signal<number>(1)

  userVinylRecordsQuery = this.userVinylRecordService.getVinylRecords(this.currentPage)
  userVinylRecordDeleteMutation = this.userVinylRecordService.deleteVinylRecords()

  goToPage = (page: number) => {
    const totalPages = this.userVinylRecordsQuery.data()?.meta?.totalPages ?? 1;
    if (page < 1 || page > totalPages) return
    this.currentPage.set(page)
  }

  OpenAddRecordDrawer = () => this.drawerService.show(DetailsFormComponent, {})

  OpenEditRecordDrawer = (id: string) =>
    this.drawerService.show(DetailsFormComponent, {
      data: { id }
    });

  deleteUserVinylRecord = (id: string) =>
    this.dialog.open(DialogConfirmComponent, {
      data: {
        title: 'Delete Record',
        description: 'Are you sure you want to delete this record? This action cannot be undone.',
        confirmText: 'Delete Record',
        confirmFn: () => this.userVinylRecordDeleteMutation.mutate({ ids: [id] })
      },
    });
}