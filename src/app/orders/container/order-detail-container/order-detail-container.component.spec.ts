import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderDetailContainerComponent } from './order-detail-container.component';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { OrderApiService } from '../../../../services/order/order-api.service';
import { of } from 'rxjs/internal/observable/of';

describe('OrderDetailContainerComponent', () => {
  let component: OrderDetailContainerComponent;
  let fixture: ComponentFixture<OrderDetailContainerComponent>;
  let orderMockApiService = jasmine.createSpyObj(OrderApiService, ['getOrder']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDetailContainerComponent, RouterModule],
      providers: [
        { provide: OrderApiService, useValue: orderMockApiService },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => '123' } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderDetailContainerComponent);
    component = fixture.componentInstance;
  });

  describe('#ngOnInit', () => {
    it('should get the order for the id specified in the URL', () => {
      // given
      orderMockApiService.getOrder.and.returnValue(of({}));

      // when
      component.ngOnInit();

      // then
      expect(orderMockApiService.getOrder).toHaveBeenCalled();
    });
  });
});
