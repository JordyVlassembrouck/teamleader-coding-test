import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import * as firstOrder from '../../assets/data/example-orders/order1.json';
import * as secondOrder from '../../assets/data/example-orders/order2.json';
import * as thirdOrder from '../../assets/data/example-orders/order3.json';
import customers from '../../assets/data/customers.json';
import products from '../../assets/data/products.json';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { Injectable } from '@angular/core';
import { OrderApiModel } from '../order/order.http-service';
import { catchError, map } from 'rxjs';

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
    if (this.isGetOrdersRequest(request)) {
      return this.mockGetOrders();
    } else if (this.isGetOrderRequest(request)) {
      return this.mockGetOrder(request.url);
    } else if (this.isPostOrderRequest(request)) {
      return this.mockPostOrder(request);
    } else if (this.isGetCustomersRequest(request)) {
      return this.mockGetCustomers();
    } else if (this.isGetProductsRequest(request)) {
      return this.mockGetProducts();
    }
    return next.handle(request);
  }

  private isGetOrdersRequest(request: HttpRequest<any>): boolean {
    return this.isGetRequest(request) && request.url === '/api/orders';
  }

  private isGetRequest(request: HttpRequest<any>): boolean {
    return request.method === 'GET';
  }

  private isGetOrderRequest(request: HttpRequest<any>): boolean {
    return this.isGetRequest(request) && request.url.includes('/api/orders/');
  }

  private isPostOrderRequest(request: HttpRequest<any>): boolean {
    return request.method === 'POST' && request.url === '/api/orders';
  }

  private isGetCustomersRequest(request: HttpRequest<any>): boolean {
    return this.isGetRequest(request) && request.url === '/api/customers';
  }

  private isGetProductsRequest(request: HttpRequest<any>): boolean {
    return this.isGetRequest(request) && request.url === '/api/products';
  }

  private mockGetOrders(): Observable<HttpResponse<any>> {
    return of(new HttpResponse({ status: 200, body: ORDERS }));
  }

  private mockGetOrder(url: string): Observable<HttpResponse<any>> {
    const orderId = url.split('/api/orders/').pop();
    const order = ORDERS.find((order: OrderApiModel) => order.id === orderId);
    if (!order) {
      throw new HttpErrorResponse({ status: 404, error: 'Order not found' });
    } else {
      return of(new HttpResponse({ status: 200, body: order }));
    }
  }

  private mockPostOrder(
    request: HttpRequest<any>
  ): Observable<HttpResponse<any>> {
    if (Math.random() > 0.5) {
      console.log(`[HTTP INTERCEPTOR] Order ${request.body['id']} has been placed:`, request.body);
      return of(new HttpResponse({ status: 204, body: request.body }));
    } else {
      throw new HttpErrorResponse({ status: 400, error: 'Bad request' });
    }
  }

  private mockGetCustomers(): Observable<HttpResponse<any>> {
    return of(new HttpResponse({ status: 200, body: CUSTOMERS }));
  }

  private mockGetProducts(): Observable<HttpResponse<any>> {
    return of(new HttpResponse({ status: 200, body: PRODUCTS }));
  }
}
