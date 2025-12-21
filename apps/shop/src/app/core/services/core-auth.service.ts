import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root'
})
export class CoreAuthService {
  private auth = inject(AuthService)
  private doc = inject(DOCUMENT)

  handleLogin(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/callback',
      },
      authorizationParams: {
        prompt: 'login',
      },
    })
  }

  handleSignUp(): void {
    this.auth.loginWithRedirect({
      appState: {
        target: '/callback',
      },
      authorizationParams: {
        prompt: 'login',
        screen_hint: 'signup',
      },
    });
  }

  handleLogout(): void {
    this.auth.logout({
      logoutParams: {
        returnTo: this.doc.location.origin,
      },
    })
  }
}
