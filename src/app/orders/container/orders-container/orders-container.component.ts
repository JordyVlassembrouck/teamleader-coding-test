import { Component, OnInit } from '@angular/core';
import {
  OrderApiService,
  OrderWithCustomer,
} from '../../../../services/order/order-api.service';
import { ReplaySubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-orders-container',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './orders-container.component.html',
  styleUrl: './orders-container.component.sass',
})
export class OrdersContainerComponent implements OnInit {
  orders$$ = new ReplaySubject<OrderWithCustomer[]>(1);

  constructor(private orderApiService: OrderApiService) {}

  ngOnInit(): void {
    this.orderApiService
      .getOrdersWithCustomers()
      .subscribe((orders: OrderWithCustomer[]) => {
        this.orders$$.next(orders);
      });
  }

  protected openOrder(orderId: string): void {
    console.log('open order:', orderId);
  }
}
