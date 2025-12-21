import { computed, inject, Injectable, signal } from '@angular/core';
import { Condition } from '@core/models';
import {
  ArtistService,
  GenreService,
  StyleService
} from '@features/collection/data-access';
import { debouncedSignal } from '@shared/utils/signal-utils';

@Injectable({
  providedIn: 'root'
})
export class SelectsHelpersService {
  /* Genres */
  private genreService = inject(GenreService)

  genresQuery = this.genreService.getGenres()

  genreSelectOptions = computed(() =>
    this.genresQuery.data()?.map((genre: any) => ({
      id: genre.id,
      value: genre.name,
    })) ?? []
  )

  /* Styles */
  private styleService = inject(StyleService)

  styleSearchValue = signal<string>('')
  searchForStyle = debouncedSignal(this.styleSearchValue, 500);

  stylesQuery = this.styleService.getStyles(this.searchForStyle)

  styleSelectOptions = computed(() =>
    this.stylesQuery.data()?.map((style: any) => ({
      id: style.id,
      value: style.name,
    })) ?? []
  )

  /* Artists */
  private artistService = inject(ArtistService)

  artistSearchValue = signal<string>('')
  searchForArtist = debouncedSignal(this.artistSearchValue, 500);

  artistQuery = this.artistService.getArtists(this.searchForArtist)
  createArtistMutation = this.artistService.createArtist()

  artistSelectOptions = computed(() =>
    this.artistQuery.data()?.map((alias: any) => ({
      id: alias.artist.id,
      value: alias.name,
    })) ?? []
  )

  createArtist = (data : { value: string }) => 
    this.createArtistMutation.mutateAsync(data);

  /* Conditions */
  conditionSelectOptions = computed(() =>
      Object.entries(Condition).map(([key, value]) => ({
        id: value,
        value: key.replace('_', ' '),
      }))
    )
}
