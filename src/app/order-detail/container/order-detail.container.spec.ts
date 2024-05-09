import { ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderDetailContainer } from './order-detail.container';
import { ActivatedRoute, RouterModule } from '@angular/router';
import {
  Item,
  Order,
  OrderHttpService,
} from '../../../services/order/order.http-service';
import { of } from 'rxjs/internal/observable/of';
import {
  Product,
  ProductHttpService,
} from '../../../services/product/product.http-service';

const FIRST_PRODUCT: Product = {
  id: '1',
  description: 'product',
  category: 'category',
  price: 5.0,
};
const SECOND_PRODUCT: Product = {
  id: '2',
  description: 'product',
  category: 'category',
  price: 12.0,
};
const PRODUCTS = [FIRST_PRODUCT, SECOND_PRODUCT];
const ITEM: Item = {
  productId: FIRST_PRODUCT.id,
  quantity: 2,
  unitPrice: 5.0,
  total: 10.0,
};
const ORDER_ID = '2';
const ORDER: Order = {
  id: ORDER_ID,
  customerId: '3',
  items: [ITEM],
  total: 45.6,
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
    productHttpServiceMock.getProducts.and.returnValue(of(PRODUCTS));
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
    it('should add product to already existing items in the order and calculate new total', () => {
      // given
      const ITEM: Item = {
        productId: FIRST_PRODUCT.id,
        quantity: 2,
        unitPrice: 5,
        total: 10,
      };
      const ORDER: Order = {
        id: ORDER_ID,
        customerId: '3',
        items: [ITEM],
        total: 10,
      };
      orderHttpServiceMock.getOrder.and.returnValue(of(ORDER));

      fixture.detectChanges();
      expect(ORDER.items).toEqual([ITEM]);
      expect(ORDER.total).toEqual(10);

      // when
      component.addProductTo(ORDER, FIRST_PRODUCT.id, 3);

      // then
      expect(ORDER.items.length).toEqual(1);
      expect(ORDER.items[0].productId).toEqual(ITEM.productId);
      expect(ORDER.items[0].quantity).toEqual(5);
      expect(ORDER.items[0].total).toEqual(25);
      expect(ORDER.total).toEqual(25);
    });

    it('should add product as new item in the order when it does not yet exist and calculate new total', () => {
      // given
      const ITEM: Item = {
        productId: FIRST_PRODUCT.id,
        quantity: 2,
        unitPrice: 5,
        total: 10,
      };
      const ORDER: Order = {
        id: ORDER_ID,
        customerId: '3',
        items: [ITEM],
        total: 10,
      };
      orderHttpServiceMock.getOrder.and.returnValue(of(ORDER));

      fixture.detectChanges();
      expect(ORDER.items).toEqual([ITEM]);
      expect(ORDER.total).toEqual(10);

      // when
      component.addProductTo(ORDER, SECOND_PRODUCT.id, 3);

      // then
      expect(ORDER.items.length).toEqual(2);
      expect(ORDER.items[0].productId).toEqual(ITEM.productId);
      expect(ORDER.items[0].quantity).toEqual(ITEM.quantity);
      expect(ORDER.items[0].total).toEqual(ITEM.total);
      expect(ORDER.items[1].productId).toEqual(SECOND_PRODUCT.id);
      expect(ORDER.items[1].quantity).toEqual(3);
      expect(ORDER.items[1].total).toEqual(SECOND_PRODUCT.price * 3);
      expect(ORDER.total).toEqual(46);
    });
  });

  describe('#removeProduct', () => {
    it('should log "remove product" with the product ID', () => {
      // given
      const ITEM: Item = {
        productId: FIRST_PRODUCT.id,
        quantity: 2,
        unitPrice: 5,
        total: 10,
      };
      const ORDER: Order = {
        id: ORDER_ID,
        customerId: '3',
        items: [ITEM],
        total: 20,
      };

      expect(ORDER.items.length).toEqual(1);

      // when
      fixture.detectChanges();
      component.removeProductFrom(ORDER, FIRST_PRODUCT.id);

      // then
      expect(ORDER.items.length).toEqual(0);
    });

    it('should calculate the new total', () => {
      // given
      const ITEM: Item = {
        productId: FIRST_PRODUCT.id,
        quantity: 2,
        unitPrice: 5,
        total: 10,
      };
      const ITEM_2: Item = {
        productId: SECOND_PRODUCT.id,
        quantity: 2,
        unitPrice: 5,
        total: 10,
      };
      const ORDER: Order = {
        id: ORDER_ID,
        customerId: '3',
        items: [ITEM, ITEM_2],
        total: 20,
      };

      expect(ORDER.total).toEqual(20);

      // when
      fixture.detectChanges();
      component.removeProductFrom(ORDER, FIRST_PRODUCT.id);

      // then
      expect(ORDER.total).toEqual(10);
    });
  });

  describe('#placeOrder', () => {
    it('calls the order http service to place the order', () => {
      // given

      // when
      component.placeOrder(ORDER);

      // then
      expect(orderHttpServiceMock.placeOrder).toHaveBeenCalledWith(ORDER);
    });
  });
});
