import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrdersContainerComponent } from './orders-container.component';
import { Order, OrderApiService } from '../../../../services/order/order-api.service';
import { of } from 'rxjs/internal/observable/of';

describe('OrdersContainerComponent', () => {
  let component: OrdersContainerComponent;
  let fixture: ComponentFixture<OrdersContainerComponent>;
  let ordersMockApiService = jasmine.createSpyObj(OrderApiService, [
    'getOrders',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrdersContainerComponent],
      providers: [{ provide: OrderApiService, useValue: ordersMockApiService }],
    }).compileComponents();

    fixture = TestBed.createComponent(OrdersContainerComponent);
    component = fixture.componentInstance;
  });

  describe('#ngOnInit', () => {
    it('should call getOrders and emit on orders$$', (done) => {
      // given
      ordersMockApiService.getOrders.and.returnValue(of([]));

      component.orders$$.subscribe((orders: Order[]) => {
        expect(orders).toEqual([]);
        done();
      });

      // when
      component.ngOnInit();

      // then
      expect(ordersMockApiService.getOrders).toHaveBeenCalled();
    });
  });
});
