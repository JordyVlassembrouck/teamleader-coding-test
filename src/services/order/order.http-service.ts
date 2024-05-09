import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { mapApiModelToOrder, mapOrderToApiModel } from './order.mapper';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { combineLatest } from 'rxjs';
import {
  Customer,
  CustomerHttpService,
} from '../customer/customer.http-service';

@Injectable({
  providedIn: 'root',
})
export class OrderHttpService {
  constructor(
    private http: HttpClient,
    private customerHttpService: CustomerHttpService
  ) {}

  private getOrderWithoutCustomerName(orderId: string): Observable<Order> {
    return this.http
      .get<OrderApiModel>(`/api/orders/${orderId}`)
      .pipe(
        map((orderApiModel: OrderApiModel) => mapApiModelToOrder(orderApiModel))
      );
  }

  getOrder(orderId: string): Observable<OrderWithCustomer> {
    return combineLatest([
      this.getOrderWithoutCustomerName(orderId),
      this.customerHttpService.getCustomers(),
    ]).pipe(
      map(([order, customers]: [Order, Customer[]]) =>
        this.addCustomerNameToOrder(order, customers)
      )
    );
  }

  private getOrdersWithoutCustomerName(): Observable<Order[]> {
    return this.http
      .get<OrderApiModel[]>('/api/orders')
      .pipe(
        map((orderApiModels: OrderApiModel[]) =>
          orderApiModels.map((orderApiModel: OrderApiModel) =>
            mapApiModelToOrder(orderApiModel)
          )
        )
      );
  }

  getOrders(): Observable<OrderWithCustomer[]> {
    return combineLatest([
      this.getOrdersWithoutCustomerName(),
      this.customerHttpService.getCustomers(),
    ]).pipe(
      map(([orders, customers]: [Order[], Customer[]]) =>
        orders.map((order: Order) =>
          this.addCustomerNameToOrder(order, customers)
        )
      )
    );
  }

  private addCustomerNameToOrder(
    order: Order,
    customers: Customer[]
  ): OrderWithCustomer {
    const customer = customers.find(
      (customer: Customer) => customer.id === order.customerId
    );
    if (!customer) {
      console.error(`Customer not found for order ${order.id}`);
    }
    return {
      ...order,
      customerName: customer?.name ?? '',
    };
  }

  placeOrder(order: Order): Observable<string> {
    const orderApiModel = mapOrderToApiModel(order);
    return this.http.post<OrderApiModel>('/api/orders', orderApiModel).pipe(
      map((apiModel: OrderApiModel) => apiModel.id)
    );
  }
}

export interface OrderApiModel {
  id: string;
  'customer-id': string;
  items: ItemApiModel[];
  total: string;
}

export interface ItemApiModel {
  'product-id': string;
  quantity: string;
  'unit-price': string;
  total: string;
}

export interface Order {
  id: string;
  customerId: string;
  items: Item[];
  total: number;
}

export interface OrderWithCustomer extends Order {
  customerName: string;
}

export interface Item {
  productId: string;
  quantity: number;
  unitPrice: number;
  total: number;
}
