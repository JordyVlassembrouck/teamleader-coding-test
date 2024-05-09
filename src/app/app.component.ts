import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrdersContainer } from './orders/container/orders-container/orders.container';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, OrdersContainer],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'teamleader-coding-test';
}
