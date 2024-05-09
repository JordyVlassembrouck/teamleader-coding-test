import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NotificationService,
  Notification,
  NotificationType,
} from '../../../services/notifications/notification.service';

@Component({
  selector: 'app-notifications-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notifications.container.html',
  styleUrl: './notifications.container.sass',
})
export class NotificationsContainer implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notifications$.subscribe(
      (notifications: Notification[]) => (this.notifications = notifications)
    );
  }

  getNotificationClass(type: NotificationType): string {
    switch (type) {
      case NotificationType.Success:
        return 'bg-success-subtle text-success-emphasis';
      case NotificationType.Error:
        return 'bg-danger-subtle text-danger-emphasis';
      default:
        return 'bg-primary-subtle';
    }
  }

  removeNotification(notificationId: number): void {
    this.notificationService.remove(notificationId);
  }
}
