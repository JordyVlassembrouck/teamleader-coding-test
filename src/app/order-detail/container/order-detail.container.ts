import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
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
import { NotificationService } from '../../../services/notifications/notification.service';
import { OrderEntryComponent } from '../component/order-entry/order-entry.component';
import { AddOrderComponent } from '../component/add-order/add-order.component';
import { OrderHeaderComponent } from '../component/order-header/order-header.component';

@Component({
  selector: 'app-order-detail-container',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    OrderEntryComponent,
    AddOrderComponent,
    OrderHeaderComponent
  ],
  templateUrl: './order-detail.container.html',
})
export class OrderDetailContainer implements OnInit {
  order$$ = new BehaviorSubject<Order>({} as Order);
  products$$ = new BehaviorSubject<Product[]>([]);

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private orderHttpService: OrderHttpService,
    private productHttpService: ProductHttpService,
    private notificationService: NotificationService
  ) {}
  orderForm = new FormGroup({
    productId: new FormControl('', [Validators.required]),
    quantity: new FormControl(0, [Validators.required]),
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
    if (this.orderForm.valid) {
      const item = this.findItemInOrder(order, productId);
      if (item) {
        this.addToExistingItem(item, quantity);
      } else {
        this.addNewItemToOrder(productId, quantity, order);
      }
      order.total = this.calculateNewTotal(order.items);
    }
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
        .find((product: Product) => product.id === productId)?.price ?? 0;

    const newItem: Item = {
      productId: productId,
      quantity: quantity,
      unitPrice: unitPrice,
      total: unitPrice * quantity,
    };

    return newItem;
  }

  removeProductFrom(order: Order, productId: string): void {
    order.items = order.items.filter(
      (item: Item) => item.productId !== productId
    );
    order.total = this.calculateNewTotal(order.items);
  }

  private calculateNewTotal(items: Item[]): number {
    return items.reduce((total, item) => total + item.total, 0);
  }

  getProductName(productId: string): string {
    return (
      this.products$$
        .getValue()
        .find((product: Product) => product.id === productId)?.description ??
      'Unknown product'
    );
  }

  protected printWith2Decimals(value: number): string {
    return value.toFixed(2);
  }

  protected parseIntFromFormControl(value: number | string | null): number {
    if (typeof value === 'number') {
      return value;
    } else if (typeof value === 'string') {
      return parseInt(value, 10);
    } else {
      return 0;
    }
  }

  placeOrder(order: Order): void {
    this.orderHttpService.placeOrder(order).subscribe({
      next: () =>
        this.notificationService.showSuccessMessage(
          'Order placed successfully'
        ),
      error: (error) => {
        this.notificationService.showErrorMessage(
          `We could not place order ${order.id}, please try again later`
        );
        console.error(
          `[ORDER DETAIL CONTAINER] An error occured while placing order ${order.id}`,
          error
        );
      },
    });
  }

  backButtonClicked(): void {
    this.router.navigateByUrl('/orders');
  }
}
