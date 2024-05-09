import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NotificationsContainer } from './notifications/container/notifications.container';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NotificationsContainer],
  templateUrl: './app.component.html',
})
export class AppComponent {
}
