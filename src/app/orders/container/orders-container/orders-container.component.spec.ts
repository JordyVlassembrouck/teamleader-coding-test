import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import {
  Order,
  OrderApiService,
} from '../../../../services/order/order-api.service';
import { OrdersContainerComponent } from './orders-container.component';

describe('OrdersContainerComponent', () => {
  let component: OrdersContainerComponent;
  let fixture: ComponentFixture<OrdersContainerComponent>;
  let orderApiServiceMock = jasmine.createSpyObj(OrderApiService, [
    'getOrdersWithCustomers',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersContainerComponent],
      providers: [{ provide: OrderApiService, useValue: orderApiServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersContainerComponent);
    component = fixture.componentInstance;
  });

  describe('#ngOnInit', () => {
    it('should get all orders and emit on orders$$', (done) => {
      // given
      orderApiServiceMock.getOrdersWithCustomers.and.returnValue(of([]));

      component.orders$$.subscribe((orders: Order[]) => {
        expect(orders).toEqual([]);
        done();
      });

      // when
      component.ngOnInit();

      // then
      expect(orderApiServiceMock.getOrdersWithCustomers).toHaveBeenCalled();
    });
  });
});
