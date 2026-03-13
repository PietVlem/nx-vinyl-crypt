import { Component, computed, inject } from '@angular/core';
import { NotificationComponent } from '../notification/notification.component';
import { NotificationService } from '../../services/notification.service';

@Component({
  selector: 'app-notifications-container',
  imports: [NotificationComponent],
  templateUrl: './notifications-container.component.html',
  styles: `
    :host {
      position: fixed;
      top: 0;
      right: 0;
      z-index: 1000;
      max-height: 100vh;
      padding: 1rem;
      pointer-events: none;
      max-width: 512px;
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateX(20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }

    @keyframes fadeOut {
      from {
        opacity: 1;
        transform: translateX(0);
      }
      to {
        opacity: 0;
        transform: translateX(20px);
      }
    }
    `,
})
export class NotificationsContainerComponent {
  private notificationService = inject(NotificationService);

  notifications = computed(() => this.notificationService.notifications());
}
