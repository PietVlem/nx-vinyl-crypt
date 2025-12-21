import { Component, inject, input } from '@angular/core';
import { NotificationObj } from '@core/models';
import { NotificationService } from '@core/services';
import { NgIcon, provideIcons } from '@ng-icons/core';
import { phosphorCheckCircle, phosphorX, phosphorXCircle } from '@ng-icons/phosphor-icons/regular';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  imports: [NgIcon],
  providers: [provideIcons({ phosphorCheckCircle, phosphorXCircle, phosphorX })],
})
export class NotificationComponent {
  private notificationService = inject(NotificationService);

  notification = input.required<NotificationObj>();

  remove = () => 
    this.notificationService.remove(this.notification().id);
}