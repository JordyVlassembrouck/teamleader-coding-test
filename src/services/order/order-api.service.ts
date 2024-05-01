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
      .get<OrderAPIModel[]>('/api/orders')
      .pipe(
        map((orderAPIModels: OrderAPIModel[]) =>
          orderAPIModels.map((orderAPIModel: OrderAPIModel) =>
            mapOrderFrom(orderAPIModel)
          )
        )
      );
  }
}

export interface OrderAPIModel {
  id: string;
  'customer-id': string;
  items: ItemAPIModel[];
  total: string;
}

export interface ItemAPIModel {
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
