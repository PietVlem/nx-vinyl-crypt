import { Component, inject, OnInit } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { UserApiService } from '@client/api';
import { settingsRoutePaths } from '@client/features/settings/routes';
import { routePaths } from '@client/routes';

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
})
export class CallbackComponent implements OnInit {
  private auth = inject(AuthService);
  private userApi = inject(UserApiService);
  private router = inject(Router);

  error$ = this.auth.error$;
  error = toSignal(this.error$, { initialValue: null });

  ngOnInit() {
    this.auth.user$.subscribe({
      next: async (auth0Profile) => {
        if (auth0Profile?.sub && auth0Profile?.email) {
          const user = await this.userApi.getOrCreateUser({
            auth0Id: auth0Profile.sub,
            email: auth0Profile.email,
            name: auth0Profile.name,
          });

          if (user) {
            this.router.navigate([
              routePaths.SETTINGS,
              settingsRoutePaths.PROFILE,
            ]);
            return;
          }
        }
        this.router.navigate([routePaths.ERROR], {
          queryParams: { code: 500 },
        });
      },
      error: (err) => {
        this.router.navigate([routePaths.ERROR], {
          queryParams: { code: 500 },
        });
      },
    });
  }
}
