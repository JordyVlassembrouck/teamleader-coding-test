import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import * as firstOrder from '../../assets/data/example-orders/order1.json';
import * as secondOrder from '../../assets/data/example-orders/order2.json';
import * as thirdOrder from '../../assets/data/example-orders/order3.json';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MockHttpInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    if (req.url === '/api/orders') {
      const orders = [firstOrder, secondOrder, thirdOrder];
      return of(new HttpResponse({ status: 200, body: orders }));
    }

    return next.handle(req);
  }
}
