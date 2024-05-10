import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import {
  Order,
  OrderHttpService,
} from '../../../services/order/order.http-service';
import { OrdersContainer } from './orders.container';
import { Router, RouterModule } from '@angular/router';

describe('OrdersContainer', () => {
  let component: OrdersContainer;
  let fixture: ComponentFixture<OrdersContainer>;
  const orderHttpServiceMock = jasmine.createSpyObj(OrderHttpService, [
    'getOrders',
  ]);
  const routerStub = jasmine.createSpyObj(Router, ['navigate']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersContainer],
      providers: [
        { provide: OrderHttpService, useValue: orderHttpServiceMock },
        { provide: Router, useValue: routerStub },
      ],
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

  describe('#openOrder', () => {
    it('should navigate to orders/{id}', () => {
      // given

      // when
      component.openOrder('1');

      // then
      expect(routerStub.navigate).toHaveBeenCalledWith(['orders', '1']);
    });
  });
});
