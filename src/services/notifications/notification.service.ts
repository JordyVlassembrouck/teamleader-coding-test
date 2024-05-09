import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifications$$ = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notifications$$.asObservable();
  public notifications: Notification[] = [];

  showSuccessMessage(message: string, delay: number = 3000): void {
    this.show({
      id: new Date().getMilliseconds(),
      text: message,
      type: NotificationType.Success,
      delay,
    });
  }

  showErrorMessage(message: string): void {
    this.show({
      id: new Date().getMilliseconds(),
      text: message,
      type: NotificationType.Error,
    });
  }

  private show(notification: Notification): void {
    if (notification.delay) {
      this.autoDismiss(notification);
    }
    this.notifications$$.next([
      ...this.notifications$$.getValue(),
      notification,
    ]);
  }

  private autoDismiss(notification: Notification): void {
    if (notification.delay) {
      setTimeout(() => this.remove(notification.id), notification.delay);
    }
  }

  remove(notificationId: number): void {
    const updatedNotifications = this.notifications$$
      .getValue()
      .filter(
        (notification: Notification) => notification.id !== notificationId
      );
    this.notifications$$.next(updatedNotifications);
  }
}

export interface Notification {
  id: number;
  text: string;
  type: NotificationType;
  delay?: number;
}

export enum NotificationType {
  Success = 'success',
  Error = 'error',
}
