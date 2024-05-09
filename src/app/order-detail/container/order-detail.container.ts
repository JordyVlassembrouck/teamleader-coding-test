import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  Item,
  Order,
  OrderHttpService,
} from '../../../services/order/order.http-service';
import { CommonModule } from '@angular/common';
import {
  Product,
  ProductHttpService,
} from '../../../services/product/product.http-service';
import { BehaviorSubject } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-order-detail-container',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './order-detail.container.html',
  styleUrl: './order-detail.container.sass',
})
export class OrderDetailContainer implements OnInit {
  order$$ = new BehaviorSubject<Order>({} as Order);
  products$$ = new BehaviorSubject<Product[]>([]);

  constructor(
    private route: ActivatedRoute,
    private orderHttpService: OrderHttpService,
    private productHttpService: ProductHttpService
  ) {}
  orderForm = new FormGroup({
    productId: new FormControl('', Validators.required),
    quantity: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    if (!orderId) {
      throw new Error('No order ID found in the URL');
    }
    this.orderHttpService.getOrder(orderId).subscribe((order: Order) => {
      this.order$$.next(order);
    });
    this.productHttpService.getProducts().subscribe((products: Product[]) => {
      this.products$$.next(products);
    });
  }

  addProductTo(order: Order, productId: string, quantity: number): void {
    const item = this.findItemInOrder(order, productId);
    if (item) {
      this.addToExistingItem(item, quantity);
    } else {
      this.addNewItemToOrder(productId, quantity, order);
    }
    this.order$$.next(order);
  }

  private findItemInOrder(order: Order, productId: string): Item | undefined {
    return order.items.find((item: Item) => item.productId === productId);
  }

  private addToExistingItem(item: Item, quantity: number) {
    item.quantity = item.quantity + quantity;
    item.total = item.unitPrice * item.quantity;
  }

  private addNewItemToOrder(productId: string, quantity: number, order: Order) {
    const newItem = this.createNewItemOrder(productId, quantity);
    order.items.push(newItem);
  }

  private createNewItemOrder(productId: string, quantity: number): Item {
    const unitPrice =
      this.products$$
        .getValue()
        .find(
          (product: Product) => product.id === this.orderForm.value.productId
        )?.price ?? 0;

    const newItem: Item = {
      productId: productId,
      quantity: quantity,
      unitPrice: unitPrice,
      total: unitPrice * quantity,
    };

    return newItem;
  }

  removeProduct(productId: string): void {
    const order = this.order$$.getValue();
    order.items = order.items.filter(
      (item: Item) => item.productId !== productId
    );
    this.order$$.next(order);
  }

  getProductName(productId: string): string {
    return (
      this.products$$
        .getValue()
        .find((product: Product) => product.id === productId)?.description ??
      'Unknown product'
    );
  }
}