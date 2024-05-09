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
