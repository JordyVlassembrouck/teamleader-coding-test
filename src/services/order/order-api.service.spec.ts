import { TestBed } from '@angular/core/testing';
import { Order, OrderApiService } from './order-api.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import firstOrder from '../../assets/data/example-orders/order1.json';
import thirdOrder from '../../assets/data/example-orders/order3.json';

describe('OrderApiService', () => {
  let service: OrderApiService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(OrderApiService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('#getOrders', () => {
    it('should return an observable of all orders', (done) => {
      // given
      service.getOrders().subscribe((orders: Order[]) => {
        // then
        expect(orders.length).toEqual(2);
        expect(orders[0].id).toEqual(firstOrder.id);
        expect(orders[0].customerId).toEqual(firstOrder['customer-id']);
        expect(orders[0].items.length).toEqual(firstOrder.items.length);
        expect(orders[0].items[0].productId).toEqual(firstOrder.items[0]['product-id']);
        expect(orders[0].items[0].quantity).toEqual(firstOrder.items[0].quantity);
        expect(orders[0].items[0].unitPrice).toEqual(firstOrder.items[0]['unit-price']);
        expect(orders[0].items[0].total).toEqual(firstOrder.items[0].total);
        expect(orders[0].total).toEqual(firstOrder.total);
        expect(orders[1].id).toEqual(thirdOrder.id);
        expect(orders[1].customerId).toEqual(thirdOrder['customer-id']);
        expect(orders[1].items.length).toEqual(thirdOrder.items.length);
        expect(orders[1].items[0].productId).toEqual(thirdOrder.items[0]['product-id']);
        expect(orders[1].items[0].quantity).toEqual(thirdOrder.items[0].quantity);
        expect(orders[1].items[0].unitPrice).toEqual(thirdOrder.items[0]['unit-price']);
        expect(orders[1].items[0].total).toEqual(thirdOrder.items[0].total);
        expect(orders[1].total).toEqual(thirdOrder.total);
        done();
      });
      const req = httpTestingController.expectOne('/api/orders');

      // when
      req.flush([firstOrder, thirdOrder]);
      httpTestingController.verify();
    });
  });
});
