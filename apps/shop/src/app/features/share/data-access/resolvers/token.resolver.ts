import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { ShareLinksService } from '../services/share-links.service';

export const tokenResolver: ResolveFn<any> = (route, state) => {
  const shareLinkService = inject(ShareLinksService);

  const token = route.params['token'];
  
  return shareLinkService.checkToken(token);
};
