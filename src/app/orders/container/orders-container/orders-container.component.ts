import { Component, OnInit } from '@angular/core';
import {
  OrderHttpService,
  OrderWithCustomer,
} from '../../../../services/order/order.http-service';
import { ReplaySubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-orders-container',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './orders-container.component.html',
  styleUrl: './orders-container.component.sass',
})
export class OrdersContainerComponent implements OnInit {
  orders$$ = new ReplaySubject<OrderWithCustomer[]>(1);

  constructor(private orderHttpService: OrderHttpService, private router: Router) {}

  ngOnInit(): void {
    this.orderHttpService
      .getOrdersWithCustomers()
      .subscribe((orders: OrderWithCustomer[]) => {
        this.orders$$.next(orders);
      });
  }

  protected openOrder(orderId: string): void {
    this.router.navigate(['orders', orderId]);
  }
}
