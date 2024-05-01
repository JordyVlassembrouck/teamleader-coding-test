import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrdersContainerComponent } from './orders/container/orders-container/orders-container.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, OrdersContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'teamleader-coding-test';
}
