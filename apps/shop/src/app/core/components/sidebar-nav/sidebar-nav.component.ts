import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { CoreAuthService } from '@core/services';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorVinylRecord } from '@ng-icons/phosphor-icons/regular';
import { ButtonPrimaryDirective } from '@shared/directives';
import { navItems } from './navigation-items';

@Component({
  selector: 'app-sidebar-nav',
  imports: [
    NgIcon, 
    ButtonPrimaryDirective, 
    RouterLink, 
    RouterLinkActive, 
  ],
  templateUrl: './sidebar-nav.component.html',
  providers: [provideIcons({ phosphorVinylRecord })]
})
export class SidebarNavComponent {
  private auth = inject(AuthService)
  public coreAuth = inject(CoreAuthService)

  navigationItems = computed(() => navItems)

  isAuthenticated$ = this.auth.isAuthenticated$;
  isAuthenticated = toSignal(this.isAuthenticated$, { initialValue: false });

  user$ = this.auth.user$;
  user = toSignal(this.user$, { initialValue: null });
}
