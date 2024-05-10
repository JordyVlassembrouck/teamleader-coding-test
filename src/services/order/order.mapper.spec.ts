import { OrderApiModel } from './order.http-service';
import { mapApiModelToOrder, mapOrderToApiModel } from './order.mapper';

describe('#mapApiModelToOrder', () => {
  it('should map an OrderApiModel object to an Order object', () => {
    // given 
    const orderApiModel: OrderApiModel = {
      'id': '1',
      'customer-id': '2',
      'items': [
        {
          'product-id': 'B102',
          'quantity': '10',
          'unit-price': '5.0',
          'total': '50.0'
        },
        {
          'product-id': 'B204',
          'quantity': '5',
          'unit-price': '10.0',
          'total': '70.0'
        }
      ],
      'total': '200.0'
    };

    //when
    const order = mapApiModelToOrder(orderApiModel);

    // then
    expect(order.id).toEqual('1');
    expect(order.customerId).toEqual('2');
    expect(order.items.length).toEqual(2);
    expect(order.items[0].productId).toEqual('B102');
    expect(order.items[0].quantity).toEqual(10);
    expect(order.items[0].unitPrice).toEqual(5.0);
    expect(order.items[0].total).toEqual(50.0);
    expect(order.items[1].productId).toEqual('B204');
    expect(order.items[1].quantity).toEqual(5);
    expect(order.items[1].unitPrice).toEqual(10.0);
    expect(order.items[1].total).toEqual(70.0);
    expect(order.total).toEqual(200.0);
  });

  it('should map an OrderApiModel object to an Order object with empty items', () => {
    // given 
    const orderApiModel: OrderApiModel = {
      'id': '1',
      'customer-id': '2',
      'items': [],
      'total': '0'
    };

    //when
    const order = mapApiModelToOrder(orderApiModel);

    // then
    expect(order.items).toEqual([]);
  });
});

describe('#mapOrderToApiModel', () => {
  it('should map an Order object to an OrderApiModel object', () => {
    // given 
    const order = {
      id: '1',
      customerId: '2',
      items: [
        {
          productId: 'B102',
          quantity: 10,
          unitPrice: 5.0,
          total: 50.0
        },
        {
          productId: 'B204',
          quantity: 5,
          unitPrice: 10.0,
          total: 70.0
        }
      ],
      total: 200.0
    };

    //when
    const orderApiModel = mapOrderToApiModel(order);

    // then
    expect(orderApiModel.id).toEqual('1');
    expect(orderApiModel['customer-id']).toEqual('2');
    expect(orderApiModel.items.length).toEqual(2);
    expect(orderApiModel.items[0]['product-id']).toEqual('B102');
    expect(orderApiModel.items[0].quantity).toEqual('10');
    expect(orderApiModel.items[0]['unit-price']).toEqual('5.00');
    expect(orderApiModel.items[0].total).toEqual('50.00');
    expect(orderApiModel.items[1]['product-id']).toEqual('B204');
    expect(orderApiModel.items[1].quantity).toEqual('5');
    expect(orderApiModel.items[1]['unit-price']).toEqual('10.00');
    expect(orderApiModel.items[1].total).toEqual('70.00');
    expect(orderApiModel.total).toEqual('200.00');
  });

  it('should map an Order object to an OrderApiModel object with empty items', () => {
    // given 
    const order = {
      id: '1',
      customerId: '2',
      items: [],
      total: 0
    };

    //when
    const orderApiModel = mapOrderToApiModel(order);

    // then
    expect(orderApiModel.items).toEqual([]);
  });
});
