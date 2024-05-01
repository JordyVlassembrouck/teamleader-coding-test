import { TestBed } from '@angular/core/testing';
import { Order, OrderApiService } from './order-api.service';

describe('OrderApiService', () => {
  let service: OrderApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrderApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('#getOrders', () => {
    it('should return an observable of all orders', (done) => {
      // given when
      service.getOrders().subscribe((orders: Order[]) => {
        // then
        expect(orders.length).toEqual(3);
        done();
      });
    });
  });
});
