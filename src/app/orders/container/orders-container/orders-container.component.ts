import { Component, OnInit } from '@angular/core';
import {
  Order,
  OrderApiService,
} from '../../../../services/order/order-api.service';
import { ReplaySubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Customer, CustomerApiService } from '../../../../services/customer/customer-api.service';

@Component({
  selector: 'app-orders-container',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './orders-container.component.html',
  styleUrl: './orders-container.component.sass',
})
export class OrdersContainerComponent implements OnInit {
  orders$$ = new ReplaySubject<Order[]>(1);

  constructor(private orderApiService: OrderApiService, private customerApiService: CustomerApiService) {}

  ngOnInit(): void {
    this.orderApiService.getOrders().subscribe((orders: Order[]) => {
      this.orders$$.next(orders);
    });
    this.customerApiService.getCustomers().subscribe((customers: Customer[]) => {
      console.log(customers);
    });
  }
}
