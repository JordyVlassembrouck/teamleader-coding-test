import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import { CustomerApiService } from '../../../../services/customer/customer-api.service';
import {
  Order,
  OrderApiService,
} from '../../../../services/order/order-api.service';
import { OrdersContainerComponent } from './orders-container.component';

describe('OrdersContainerComponent', () => {
  let component: OrdersContainerComponent;
  let fixture: ComponentFixture<OrdersContainerComponent>;
  let orderMockApiService = jasmine.createSpyObj(OrderApiService, [
    'getOrders',
  ]);
  let customerMockApiService = jasmine.createSpyObj(CustomerApiService, [
    'getCustomers',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersContainerComponent],
      providers: [
        { provide: OrderApiService, useValue: orderMockApiService },
        { provide: CustomerApiService, useValue: customerMockApiService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersContainerComponent);
    component = fixture.componentInstance;
  });

  describe('#ngOnInit', () => {
    it('should get all orders and emit on orders$$', (done) => {
      // given
      orderMockApiService.getOrders.and.returnValue(of([]));
      customerMockApiService.getCustomers.and.returnValue(of([]));

      component.orders$$.subscribe((orders: Order[]) => {
        expect(orders).toEqual([]);
        done();
      });

      // when
      component.ngOnInit();

      // then
      expect(orderMockApiService.getOrders).toHaveBeenCalled();
    });

    it('should get all customers', () => {
      // given
      orderMockApiService.getOrders.and.returnValue(of([]));
      customerMockApiService.getCustomers.and.returnValue(of([]));

      // when
      component.ngOnInit();

      // then
      expect(customerMockApiService.getCustomers).toHaveBeenCalled();
    });
  });
});
