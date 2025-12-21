import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { RouterOutlet } from '@angular/router';
import { AuthService } from '@auth0/auth0-angular';
import { SidebarNavComponent } from '@core/components/index';

@Component({
  selector: 'app-layout-dashboard',
  imports: [SidebarNavComponent, RouterOutlet],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  private auth = inject(AuthService);
  
  isAuth0Loading = toSignal(this.auth.isLoading$);
}