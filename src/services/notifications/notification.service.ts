import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private notifications$$ = new BehaviorSubject<Notification[]>([]);
  public notifications$ = this.notifications$$.asObservable();
  public notifications: Notification[] = [];

  show(notification: Notification) {
    if (notification.delay) {
      this.autoDismiss(notification);
    }
    this.notifications$$.next([...this.notifications$$.getValue(), notification]);
  }

  remove(notificationId: number) {
    const updatedNotifications = this.notifications$$.getValue().filter((notification: Notification) => notification.id !== notificationId);
    this.notifications$$.next(updatedNotifications);
  }

  autoDismiss(notification: Notification) {
    if (notification.delay) {
      setTimeout(() => this.remove(notification.id), notification.delay);
    }
  }

  success(message: string, delay: number = 3000) {
    this.show({ id: new Date().getMilliseconds(), text: message, type: NotificationType.Success, delay });
  }

  error(message: string) {
    this.show({ id: new Date().getMilliseconds(), text: message, type: NotificationType.Error });
  }
}
