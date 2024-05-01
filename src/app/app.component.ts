import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { OrdersContainerComponent } from './orders/container/orders-container/orders-container.component';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HttpClientModule, OrdersContainerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.sass'
})
export class AppComponent {
  title = 'teamleader-coding-test';
}
