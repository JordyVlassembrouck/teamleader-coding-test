import { TestBed } from '@angular/core/testing';
import { Order, OrderApiService, OrderWithCustomer } from './order-api.service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import firstOrder from '../../assets/data/example-orders/order1.json';
import thirdOrder from '../../assets/data/example-orders/order3.json';
import customers from '../../assets/data/customers.json';
import { CustomerApiService } from '../customer/customer-api.service';
import { of } from 'rxjs/internal/observable/of';

describe('OrderApiService', () => {
  let orderApiService: OrderApiService;
  let customerMockApiService = jasmine.createSpyObj(CustomerApiService, [
    'getCustomers',
  ]);
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [{ provide: CustomerApiService, useValue: customerMockApiService }],
    });
    
    orderApiService = TestBed.inject(OrderApiService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('#getOrdersWithCustomers', () => {
    it('should return an observable of all orders aggregated with their customer name', (done) => {
      // given
      customerMockApiService.getCustomers.and.returnValue(of(customers));

      orderApiService.getOrdersWithCustomers().subscribe((orders: OrderWithCustomer[]) => {
        // then
        expect(orders.length).toEqual(2);
        expect(orders[0].id).toEqual(firstOrder.id);
        expect(orders[0].customerId).toEqual(firstOrder['customer-id']);
        expect(orders[0].customerName).toEqual(customers[0].name);
        expect(orders[0].items.length).toEqual(firstOrder.items.length);
        expect(orders[0].items[0].productId).toEqual(firstOrder.items[0]['product-id']);
        expect(orders[0].items[0].quantity).toEqual(firstOrder.items[0].quantity);
        expect(orders[0].items[0].unitPrice).toEqual(firstOrder.items[0]['unit-price']);
        expect(orders[0].items[0].total).toEqual(firstOrder.items[0].total);
        expect(orders[0].total).toEqual(firstOrder.total);
        expect(orders[1].id).toEqual(thirdOrder.id);
        expect(orders[1].customerId).toEqual(thirdOrder['customer-id']);
        expect(orders[1].customerName).toEqual(customers[2].name);
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

  describe('#getOrder', () => {
    it('should return an observable with 1 order', (done) => {
      // given
      orderApiService.getOrder(thirdOrder.id).subscribe((order: Order) => {
        // then
        expect(order.id).toEqual(thirdOrder.id);
        expect(order.customerId).toEqual(thirdOrder['customer-id']);
        expect(order.items.length).toEqual(thirdOrder.items.length);
        expect(order.items[0].productId).toEqual(thirdOrder.items[0]['product-id']);
        expect(order.items[0].quantity).toEqual(thirdOrder.items[0].quantity);
        expect(order.items[0].unitPrice).toEqual(thirdOrder.items[0]['unit-price']);
        expect(order.items[0].total).toEqual(thirdOrder.items[0].total);
        expect(order.items[1].productId).toEqual(thirdOrder.items[1]['product-id']);
        expect(order.items[1].productId).toEqual(thirdOrder.items[1]['product-id']);
        expect(order.items[1].quantity).toEqual(thirdOrder.items[1].quantity);
        expect(order.items[1].unitPrice).toEqual(thirdOrder.items[1]['unit-price']);
        expect(order.items[1].total).toEqual(thirdOrder.items[1].total);
        expect(order.total).toEqual(thirdOrder.total);
        done();
      });
      const req = httpTestingController.expectOne(`/api/orders/${thirdOrder.id}`);

      // when
      req.flush(thirdOrder);
      httpTestingController.verify();
    });
  });
});
