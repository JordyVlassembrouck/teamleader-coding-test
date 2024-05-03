import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { mapOrderFrom } from './order.mapper';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { combineLatest } from 'rxjs';
import { Customer, CustomerApiService } from '../customer/customer-api.service';

@Injectable({
  providedIn: 'root',
})
export class OrderApiService {
  constructor(
    private http: HttpClient,
    private customerApiService: CustomerApiService
  ) {}

  getOrder(orderId: string): Observable<Order> {
    return this.http
      .get<OrderApiModel>(`/api/orders/${orderId}`)
      .pipe(map((orderApiModel: OrderApiModel) => mapOrderFrom(orderApiModel)));
  }

  private getOrders(): Observable<Order[]> {
    return this.http
      .get<OrderApiModel[]>('/api/orders')
      .pipe(
        map((orderApiModels: OrderApiModel[]) =>
          orderApiModels.map((orderApiModel: OrderApiModel) =>
            mapOrderFrom(orderApiModel)
          )
        )
      );
  }

  getOrdersWithCustomers(): Observable<OrderWithCustomer[]> {
    return combineLatest([
      this.getOrders(),
      this.customerApiService.getCustomers(),
    ]).pipe(
      map(([orders, customers]: [Order[], Customer[]]) =>
        this.addCustomerNameToOrders(orders, customers)
      )
    );
  }

  private addCustomerNameToOrders(
    orders: Order[],
    customers: Customer[]
  ): OrderWithCustomer[] {
    return orders.map((order: Order) => {
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
    });
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
  total: string;
}

export interface OrderWithCustomer extends Order {
  customerName: string;
}

export interface Item {
  productId: string;
  quantity: string;
  unitPrice: string;
  total: string;
}
