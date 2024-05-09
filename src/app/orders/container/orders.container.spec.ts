import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import {
  Order,
  OrderHttpService,
} from '../../../services/order/order.http-service';
import { OrdersContainer } from './orders.container';

describe('OrdersContainer', () => {
  let component: OrdersContainer;
  let fixture: ComponentFixture<OrdersContainer>;
  let orderHttpServiceMock = jasmine.createSpyObj(OrderHttpService, [
    'getOrders',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersContainer],
      providers: [{ provide: OrderHttpService, useValue: orderHttpServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersContainer);
    component = fixture.componentInstance;
  });

  describe('#ngOnInit', () => {
    it('should get all orders and emit on orders$$', (done) => {
      // given
      orderHttpServiceMock.getOrders.and.returnValue(of([]));

      component.orders$$.subscribe((orders: Order[]) => {
        expect(orders).toEqual([]);
        done();
      });

      // when
      component.ngOnInit();

      // then
      expect(orderHttpServiceMock.getOrders).toHaveBeenCalled();
    });
  });
});
