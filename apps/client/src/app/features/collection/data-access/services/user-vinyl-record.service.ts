import { inject, Injectable, Signal } from '@angular/core';
import { UserVinylRecordApiService } from '@client/api';
import { NotificationService } from '@client/core/services';
import {
    injectMutation,
    injectQuery,
    QueryClient,
} from '@tanstack/angular-query-experimental';

@Injectable({
  providedIn: 'root',
})
export class UserVinylRecordService {
  private userVinylRecordApiService = inject(UserVinylRecordApiService);
  private queryClient = inject(QueryClient);
  private notificationService = inject(NotificationService);

  getVinylRecords = (page: Signal<number>) =>
    injectQuery(() => ({
      queryKey: ['userVinylRecords', page()],
      queryFn: () =>
        this.userVinylRecordApiService.getVinylRecords({ page: page() }),
    }));

  getVinylRecordById = (id: string) =>
    injectQuery(() => ({
      queryKey: ['userVinylRecord', id],
      queryFn: () => this.userVinylRecordApiService.getVinylRecordById({ id }),
    }));

  deleteVinylRecords = () =>
    injectMutation(() => ({
      mutationFn: (vinylRecord: any) =>
        this.userVinylRecordApiService.deleteVinylRecords(vinylRecord),
      onSuccess: () => {
        this.queryClient.invalidateQueries({ queryKey: ['userVinylRecords'] });
        this.notificationService.success(
          'Successfully deleted!',
          'The record has been removed from your collection.'
        );
      },
    }));

  createVinylRecord = (successCallback: () => void) =>
    injectMutation(() => ({
      mutationFn: (vinylRecord: any) =>
        this.userVinylRecordApiService.createVinylRecord(vinylRecord),
      onSuccess: () => {
        this.queryClient.invalidateQueries({ queryKey: ['userVinylRecords'] });
        this.notificationService.success(
          'Successfully created!',
          'Your vinyl record has been successfully added.'
        );
        successCallback();
      },
    }));
}
