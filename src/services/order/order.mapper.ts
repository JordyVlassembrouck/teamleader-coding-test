import { Item, ItemApiModel, Order, OrderApiModel } from "./order.http-service";

export function mapApiModelToOrder(order: OrderApiModel): Order {
  return {
    id: order.id,
    customerId: order['customer-id'],
    items: order.items.map((itemApiModel: ItemApiModel) => mapApiModelToItem(itemApiModel)),
    total: parseFloat(order.total),
  };
}

function mapApiModelToItem(item: ItemApiModel): Item {
  return {
    productId: item['product-id'],
    quantity: parseInt(item.quantity),
    unitPrice: parseFloat(item['unit-price']),
    total: parseFloat(item.total),
  };
}

export function mapOrderToApiModel(order: Order): OrderApiModel {
  return {
    id: order.id,
    'customer-id': order.customerId,
    items: order.items.map((item: Item) => mapItemToApiModel(item)),
    total: order.total.toFixed(2),
  };
}


function mapItemToApiModel(item: Item): ItemApiModel {
  return {
    'product-id': item.productId,
    quantity: item.quantity.toString(),
    'unit-price': item.unitPrice.toFixed(2),
    total: item.total.toFixed(2),
  };
}

