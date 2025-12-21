import { inject, Injectable, Signal } from '@angular/core';
import { StylesApiService } from '@api';
import { injectQuery } from '@tanstack/angular-query-experimental';

@Injectable({
  providedIn: 'root'
})
export class StyleService {
  private styleApiService = inject(StylesApiService)

  getStyles = (
    searchQuery: Signal<string>,
) => injectQuery(() => ({
    enabled: searchQuery().length > 2,
    queryKey: ['styles', searchQuery()],
    queryFn: () => this.styleApiService.getStyles({ searchQuery: searchQuery() }),
  }))
}
