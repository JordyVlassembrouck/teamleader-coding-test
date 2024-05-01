import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { mapOrderFrom } from './order.mapper';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';

@Injectable({
  providedIn: 'root',
})
export class OrderApiService {
  constructor(private http: HttpClient) {}

  getOrders(): Observable<Order[]> {
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

export interface Item {
  productId: string;
  quantity: string;
  unitPrice: string;
  total: string;
}
