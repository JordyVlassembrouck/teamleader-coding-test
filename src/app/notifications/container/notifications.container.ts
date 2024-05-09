import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NotificationService,
  Notification,
} from '../../../services/notifications/notification.service';
import { NotificationComponent } from '../component/notification.component';

@Component({
  selector: 'app-notifications-container',
  standalone: true,
  imports: [CommonModule, NotificationComponent],
  templateUrl: './notifications.container.html',
})
export class NotificationsContainer implements OnInit {
  notifications: Notification[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.notifications$.subscribe(
      (notifications: Notification[]) => (this.notifications = notifications)
    );
  }

  removeNotification(notificationId: number): void {
    this.notificationService.remove(notificationId);
  }
}
