import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { AuthService } from '@auth0/auth0-angular';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    imports: [CommonModule],
})
export class ProfileComponent {
  private auth = inject(AuthService)
  
  user$ = this.auth.user$;
  user = toSignal(this.user$);
}