import { inject, Injectable, Signal } from '@angular/core';
import { ArtistAliasApiService, ArtistApiService } from '@client/api';
import { NotificationService } from '@client/core/services';
import {
    injectMutation,
    injectQuery,
    QueryClient,
} from '@tanstack/angular-query-experimental';

@Injectable({
  providedIn: 'root',
})
export class ArtistService {
  private artistApiService = inject(ArtistApiService);
  private artistAliasApiService = inject(ArtistAliasApiService);
  private notificationService = inject(NotificationService);
  private queryClient = inject(QueryClient);

  getArtists = (searchQuery: Signal<string>) =>
    injectQuery(() => ({
      enabled: searchQuery().length > 2,
      queryKey: ['artists', searchQuery()],
      queryFn: () =>
        this.artistAliasApiService.getArtistsAliases({
          searchQuery: searchQuery(),
        }),
    }));

  createArtist = () =>
    injectMutation(() => ({
      mutationFn: (data: { value: string }) =>
        this.artistApiService.createArtist({ name: data.value.trim() }),
      onSuccess: () => {
        this.queryClient.invalidateQueries({ queryKey: ['artists'] });

        this.notificationService.success(
          'Successfully created!',
          'Your Artist has been added to the database.'
        );
      },
      onError: (error: any) => {
        console.error('Error creating artist:', error);
      },
    }));
}
