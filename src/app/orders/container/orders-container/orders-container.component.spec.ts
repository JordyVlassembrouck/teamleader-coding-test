import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs/internal/observable/of';
import {
  Order,
  OrderHttpService,
} from '../../../../services/order/order.http-service';
import { OrdersContainerComponent } from './orders-container.component';

describe('OrdersContainerComponent', () => {
  let component: OrdersContainerComponent;
  let fixture: ComponentFixture<OrdersContainerComponent>;
  let orderHttpServiceMock = jasmine.createSpyObj(OrderHttpService, [
    'getOrdersWithCustomers',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersContainerComponent],
      providers: [{ provide: OrderHttpService, useValue: orderHttpServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersContainerComponent);
    component = fixture.componentInstance;
  });

  describe('#ngOnInit', () => {
    it('should get all orders and emit on orders$$', (done) => {
      // given
      orderHttpServiceMock.getOrdersWithCustomers.and.returnValue(of([]));

      component.orders$$.subscribe((orders: Order[]) => {
        expect(orders).toEqual([]);
        done();
      });

      // when
      component.ngOnInit();

      // then
      expect(orderHttpServiceMock.getOrdersWithCustomers).toHaveBeenCalled();
    });
  });
});
