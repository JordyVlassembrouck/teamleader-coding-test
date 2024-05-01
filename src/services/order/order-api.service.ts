import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class OrderApiService {
  constructor() { }

  getOrders(): Observable<Order[]> {
    return of([
      {
        id: '1',
        customerId: '1',
        items: [
          {
            productId: '1',
            quantity: '1',
            unitPrice: '100',
            total: '100'
          }
        ]
      },
      {
        id: '2',
        customerId: '2',
        items: [
          {
            productId: '2',
            quantity: '2',
            unitPrice: '200',
            total: '400'
          }
        ]
      },
      {
        id: '3',
        customerId: '3',
        items: [
          {
            productId: '3',
            quantity: '3',
            unitPrice: '300',
            total: '900'
          }
        ]
      }
    ]);
  }
}

export interface Order {
  id: string;
  customerId: string;
  items: Item[]
}

export interface Item {
  productId: string;
  quantity: string;
  unitPrice: string;
  total: string;
}
