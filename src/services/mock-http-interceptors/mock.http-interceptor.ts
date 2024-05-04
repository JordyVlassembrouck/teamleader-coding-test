import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import * as firstOrder from '../../assets/data/example-orders/order1.json';
import * as secondOrder from '../../assets/data/example-orders/order2.json';
import * as thirdOrder from '../../assets/data/example-orders/order3.json';
import customers from '../../assets/data/customers.json';
import products from '../../assets/data/products.json';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { Injectable } from '@angular/core';
import { OrderApiModel } from '../order/order.http-service';

const ORDERS = [firstOrder, secondOrder, thirdOrder];
const CUSTOMERS = customers;
const PRODUCTS = products;

@Injectable({
  providedIn: 'root',
})
export class MockHttpInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (request.url === '/api/orders') {
      return this.mockGetOrders();
    } else if (request.url.includes('/api/orders/')) {
      return this.mockGetOrder(request.url);
    } else if (request.url === '/api/customers') {
      return this.mockGetCustomers();
    } else if (request.url === '/api/products') {
      return this.mockGetProducts();
    }
    return next.handle(request);
  }

  private mockGetOrders(): Observable<HttpResponse<any>> {
    return of(new HttpResponse({ status: 200, body: ORDERS }));
  }

  private mockGetOrder(url: string): Observable<HttpResponse<any>> {
    const orderId = url.split('/api/orders/').pop();
    const order = ORDERS.find((order: OrderApiModel) => order.id === orderId);
    if (!order) {
      return of(new HttpResponse({ status: 404 }));
    } else {
      return of(new HttpResponse({ status: 200, body: order }));
    }
  }

  private mockGetCustomers(): Observable<HttpResponse<any>> {
    return of(new HttpResponse({ status: 200, body: CUSTOMERS }));
  }

  private mockGetProducts(): Observable<HttpResponse<any>> {
    return of(new HttpResponse({ status: 200, body: PRODUCTS }));
  }
}
