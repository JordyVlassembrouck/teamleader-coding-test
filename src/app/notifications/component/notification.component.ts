import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationType } from '../../../services/notifications/notification.service';

@Component({
  selector: 'app-notification-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './notification.component.html',
})
export class NotificationComponent {
  @Input() message!: string;
  @Input() type!: NotificationType;
  @Input() id!: number;

  @Output() removeNotificationClicked$ = new EventEmitter<number>();

  constructor() {}

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

  removeNotification(id: number): void {
    this.removeNotificationClicked$.emit(id);
  }
}
