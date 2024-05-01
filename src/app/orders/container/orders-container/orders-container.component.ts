import { Component, OnInit } from '@angular/core';
import {
  Order,
  OrderApiService,
} from '../../../../services/order/order-api.service';
import { ReplaySubject } from 'rxjs';

@Component({
  selector: 'app-orders-container',
  standalone: true,
  imports: [],
  templateUrl: './orders-container.component.html',
  styleUrl: './orders-container.component.sass',
})
export class OrdersContainerComponent implements OnInit {
  orders$$ = new ReplaySubject<Order[]>(1);

  constructor(private orderApiService: OrderApiService) {}

  ngOnInit(): void {
    this.orderApiService.getOrders().subscribe((orders: Order[]) => {
      this.orders$$.next(orders);
    });
  }
}
