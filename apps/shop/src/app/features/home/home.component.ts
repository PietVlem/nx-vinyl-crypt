import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { routePaths } from '@app/routes';
import { AuthService } from '@auth0/auth0-angular';
import { CoreAuthService } from '@core/services';
import { ButtonPrimaryDirective } from '@shared/directives';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    imports: [ButtonPrimaryDirective],
    styles: `
        :host {
            display: block;
            height: 100dvh;
        }
    `
})
export class HomeComponent {
    private auth = inject(AuthService)
    private router = inject(Router)
    public coreAuth = inject(CoreAuthService)

    constructor() {
        this.auth.isAuthenticated$
            .subscribe((isAuthenticated) => {
                isAuthenticated && this.router.navigate([routePaths.COLLECTION]);
            });
    }
}
