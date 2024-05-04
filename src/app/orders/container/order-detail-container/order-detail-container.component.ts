import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Order, OrderHttpService } from '../../../../services/order/order.http-service';
import { ReplaySubject } from 'rxjs/internal/ReplaySubject';
import { CommonModule } from '@angular/common';
import { Product, ProductHttpService } from '../../../../services/product/product.http-service';

@Component({
  selector: 'app-order-detail-container',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './order-detail-container.component.html',
  styleUrl: './order-detail-container.component.sass'
})
export class OrderDetailContainerComponent implements OnInit {
  order$$ = new ReplaySubject<Order>(1);
  products$$ = new ReplaySubject<Product[]>(1);

  constructor(private route: ActivatedRoute, private orderHttpService: OrderHttpService, private productHttpService: ProductHttpService) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (!orderId) {
      throw new Error('No order ID found in the URL');
    }
    this.orderHttpService.getOrder(orderId).subscribe((order: Order) => {
      this.order$$.next(order);
    });
    this.productHttpService.getProducts().subscribe((products: Product[]) => {
      console.log(products);
      this.products$$.next(products);
    });
  }

  addProduct(): void {
    console.log('add product');
  }

  removeProduct(productId: string): void {
    console.log('remove product', productId);
  }
}
