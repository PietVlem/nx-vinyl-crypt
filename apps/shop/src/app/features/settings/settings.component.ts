import { Component, inject, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { routePaths } from '@app/routes';
import { settingsRoutePaths } from './routes';

@Component({
  selector: 'app-settings',
  imports: [RouterModule],
  templateUrl: './settings.component.html',
})
export class SettingsComponent implements OnInit {
  private router = inject(Router);

  ngOnInit(): void {
    this.router.navigate([
      routePaths.SETTINGS,
      settingsRoutePaths.PROFILE,
    ]);
  }
}
