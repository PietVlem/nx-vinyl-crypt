import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { CoreAuthService } from '@client/core/services';
import { routePaths } from '@client/routes';
import { ButtonPrimaryDirective } from '@client/shared/directives';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  imports: [ButtonPrimaryDirective],
  styles: `
        :host {
            display: block;
            height: 100dvh;
        }
    `,
})
export class HomeComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  public coreAuth = inject(CoreAuthService);

  constructor() {
    this.auth.isAuthenticated$.subscribe((isAuthenticated) => {
      isAuthenticated && this.router.navigate([routePaths.COLLECTION]);
    });
  }
}
