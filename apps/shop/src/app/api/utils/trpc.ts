import { Injectable, inject, signal } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { createTRPCClient, httpBatchLink } from '@trpc/client';
// eslint-disable-next-line @nx/enforce-module-boundaries
import { AppRouter } from '@server';

@Injectable({
  providedIn: 'root'
})
export class trpcUtils {
  private auth = inject(AuthService)

  private authToken = signal<string|undefined>(undefined)

  constructor() {
    this.auth.getAccessTokenSilently().subscribe(
      (token) => this.authToken.set(token)
    )
  }

  public client = createTRPCClient<AppRouter>({
    links: [
      httpBatchLink({
        url: 'http://localhost:6060/trpc',
        headers: () => {
          return {
            Authorization: `Bearer ${this.authToken()}`
          }
        }
      }),
    ],
  });
}
