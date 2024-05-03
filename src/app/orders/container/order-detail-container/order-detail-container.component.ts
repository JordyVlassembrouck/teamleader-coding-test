import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Order, OrderApiService } from '../../../../services/order/order-api.service';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-detail-container',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-detail-container.component.html',
  styleUrl: './order-detail-container.component.sass'
})
export class OrderDetailContainerComponent implements OnInit {
  order$$ = new ReplaySubject<Order>(1);

  constructor(private route: ActivatedRoute, private orderApiService: OrderApiService) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (!orderId) {
      throw new Error('No order ID found in the URL');
    }
    this.orderApiService.getOrder(orderId).subscribe((order: Order) => {
      this.order$$.next(order);
    });
  }
}
