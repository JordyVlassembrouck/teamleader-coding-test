import { TestBed } from '@angular/core/testing';
import {
  Order,
  OrderHttpService,
  OrderWithCustomer,
} from './order.http-service';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import firstMockOrder from '../../assets/data/example-orders/order1.json';
import thirdMockOrder from '../../assets/data/example-orders/order3.json';
import mockCustomers from '../../assets/data/customers.json';
import { CustomerHttpService } from '../customer/customer.http-service';
import { of } from 'rxjs/internal/observable/of';

describe('OrderHttpService', () => {
  let orderHttpService: OrderHttpService;
  let customerHttpServiceMock = jasmine.createSpyObj(CustomerHttpService, [
    'getCustomers',
  ]);
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: CustomerHttpService, useValue: customerHttpServiceMock },
      ],
    });

    orderHttpService = TestBed.inject(OrderHttpService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('#getOrders', () => {
    it('should return an observable of all orders aggregated with their customer name', (done) => {
      // given
      customerHttpServiceMock.getCustomers.and.returnValue(of(mockCustomers));

      orderHttpService.getOrders().subscribe((orders: OrderWithCustomer[]) => {
        // then
        expect(orders.length).toEqual(2);
        expect(orders[0].id).toEqual(firstMockOrder.id);
        expect(orders[0].customerId).toEqual(firstMockOrder['customer-id']);
        expect(orders[0].customerName).toEqual(mockCustomers[0].name);
        expect(orders[0].items.length).toEqual(firstMockOrder.items.length);
        expect(orders[0].items[0].productId).toEqual(
          firstMockOrder.items[0]['product-id']
        );
        expect(orders[0].items[0].quantity).toEqual(
          parseInt(firstMockOrder.items[0].quantity)
        );
        expect(orders[0].items[0].unitPrice).toEqual(
          parseFloat(firstMockOrder.items[0]['unit-price'])
        );
        expect(orders[0].items[0].total).toEqual(
          parseFloat(firstMockOrder.items[0].total)
        );
        expect(orders[0].total).toEqual(parseFloat(firstMockOrder.total));
        expect(orders[1].id).toEqual(thirdMockOrder.id);
        expect(orders[1].customerId).toEqual(thirdMockOrder['customer-id']);
        expect(orders[1].customerName).toEqual(mockCustomers[2].name);
        expect(orders[1].items.length).toEqual(thirdMockOrder.items.length);
        expect(orders[1].items[0].productId).toEqual(
          thirdMockOrder.items[0]['product-id']
        );
        expect(orders[1].items[0].quantity).toEqual(
          parseInt(thirdMockOrder.items[0].quantity)
        );
        expect(orders[1].items[0].unitPrice).toEqual(
          parseFloat(thirdMockOrder.items[0]['unit-price'])
        );
        expect(orders[1].items[0].total).toEqual(
          parseFloat(thirdMockOrder.items[0].total)
        );
        expect(orders[1].total).toEqual(parseFloat(thirdMockOrder.total));
        done();
      });
      const req = httpTestingController.expectOne('/api/orders');

      // when
      req.flush([firstMockOrder, thirdMockOrder]);
      httpTestingController.verify();
    });
  });

  describe('#getOrder', () => {
    it('should return an observable with 1 order aggregated with their customer name', (done) => {
      // given
      orderHttpService
        .getOrder(thirdMockOrder.id)
        .subscribe((order: OrderWithCustomer) => {
          // then
          expect(order.id).toEqual(thirdMockOrder.id);
          expect(order.customerId).toEqual(thirdMockOrder['customer-id']);
          expect(order.customerName).toEqual(mockCustomers[2].name);
          expect(order.items.length).toEqual(thirdMockOrder.items.length);
          expect(order.items[0].productId).toEqual(
            thirdMockOrder.items[0]['product-id']
          );
          expect(order.items[0].quantity).toEqual(
            parseInt(thirdMockOrder.items[0].quantity)
          );
          expect(order.items[0].unitPrice).toEqual(
            parseFloat(thirdMockOrder.items[0]['unit-price'])
          );
          expect(order.items[0].total).toEqual(
            parseFloat(thirdMockOrder.items[0].total)
          );
          expect(order.items[1].productId).toEqual(
            thirdMockOrder.items[1]['product-id']
          );
          expect(order.items[1].quantity).toEqual(
            parseInt(thirdMockOrder.items[1].quantity)
          );
          expect(order.items[1].unitPrice).toEqual(
            parseFloat(thirdMockOrder.items[1]['unit-price'])
          );
          expect(order.items[1].total).toEqual(
            parseFloat(thirdMockOrder.items[1].total)
          );
          expect(order.total).toEqual(parseFloat(thirdMockOrder.total));
          done();
        });
      const req = httpTestingController.expectOne(
        `/api/orders/${thirdMockOrder.id}`
      );

      // when
      req.flush(thirdMockOrder);
      httpTestingController.verify();
    });
  });
});
