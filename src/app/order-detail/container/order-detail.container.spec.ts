import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderDetailContainer } from './order-detail.container';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  Item,
  Order,
  OrderHttpService,
} from '../../../services/order/order.http-service';
import { of } from 'rxjs/internal/observable/of';
import { ProductHttpService } from '../../../services/product/product.http-service';

const ITEM: Item = {
  productId: '123',
  quantity: 2,
  unitPrice: 5.00,
  total: 10.00,
};
const ORDER_ID = '123';
const ORDER: Order = {
  id: ORDER_ID,
  customerId: '456',
  items: [ITEM],
  total: 45.60,
};

describe('OrderDetailContainer', () => {
  let component: OrderDetailContainer;
  let fixture: ComponentFixture<OrderDetailContainer>;
  let orderHttpServiceMock = jasmine.createSpyObj(OrderHttpService, [
    'getOrder',
  ]);
  let productHttpServiceMock = jasmine.createSpyObj(ProductHttpService, [
    'getProducts',
  ]);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDetailContainer, RouterModule],
      providers: [
        { provide: OrderHttpService, useValue: orderHttpServiceMock },
        { provide: ProductHttpService, useValue: productHttpServiceMock },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: { paramMap: { get: () => ORDER_ID } },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(OrderDetailContainer);
    component = fixture.componentInstance;

    orderHttpServiceMock.getOrder.and.returnValue(of(ORDER));
    productHttpServiceMock.getProducts.and.returnValue(of([]));
  });

  describe('#ngOnInit', () => {
    it('should get the order for the id specified in the URL', () => {
      // given

      // when
      component.ngOnInit();

      // then
      expect(orderHttpServiceMock.getOrder).toHaveBeenCalledWith(ORDER_ID);
    });

    it('should throw an error when no order ID is found in the URL', () => {
      // given
      const route = TestBed.inject(ActivatedRoute);
      spyOn(route.snapshot.paramMap, 'get').and.returnValue(null);

      // when then
      expect(() => component.ngOnInit()).toThrowError(
        'No order ID found in the URL'
      );
    });

    it('should get all the products', () => {
      // given

      // when
      component.ngOnInit();

      // then
      expect(productHttpServiceMock.getProducts).toHaveBeenCalled();
    });
  });

  describe('#addProduct', () => {
    it('should add new product to the order', () => {
      // given
      const newItem: Item = {
        productId: '456',
        quantity: 3,
        unitPrice: 5.00,
        total: 15.00,
      };

      fixture.detectChanges();
      expect(component.order$$.getValue().items).toEqual([ITEM]);

      // when
      component.addProductTo(ORDER, newItem.productId, newItem.quantity);

      // then
      expect(component.order$$.getValue().items).toEqual([ITEM, newItem]);
    });
  });

  describe('#removeProduct', () => {
    it('should log "remove product" with the product ID', () => {
      // given
      const productId = '456';
      spyOn(console, 'log');

      // when
      fixture.detectChanges();
      component.removeProduct(productId);

      // then
      expect(console.log).toHaveBeenCalledWith('remove product', productId);
    });
  });
});
