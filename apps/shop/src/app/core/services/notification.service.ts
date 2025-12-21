import { Injectable, signal } from '@angular/core';
import type { NotificationObj } from '@core/models';
import { NotificationTypeEnum } from '@core/models';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  notifications = signal<NotificationObj[]>([]);

  remove = (id: number) => 
    this.notifications.update(
      (notifications) => notifications.filter((notification) => notification.id !== id)
    );

  add = (data: { title: string, text: string, type: NotificationTypeEnum, timeout?: number }) => {
    const newNotification = {
      id: Date.now(),
      ...data,
      timeout: data.timeout ?? 3000,
    }

    this.notifications.update((notifications) => [...notifications, newNotification]);

    setTimeout(() => {
      this.remove(newNotification.id);
    }, newNotification.timeout);
  }

  success = (title: string, text: string, config?: { timeout: number }) => {
    this.add({
      title,
      text,
      type: NotificationTypeEnum.SUCCESS,
      timeout: config?.timeout
    });
  }

  error = (title: string, text: string, config?: { timeout: number }) => {
    this.add({
      title,
      text,
      type: NotificationTypeEnum.ERROR,
      timeout: config?.timeout
    });
  }
}
