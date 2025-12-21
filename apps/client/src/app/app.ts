import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NotificationsContainerComponent } from './core/components/notifications-container/notifications-container.component';
import { DrawerComponent } from './shared/components/drawer/drawer.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterModule, NotificationsContainerComponent, DrawerComponent],
})
export class App {}
