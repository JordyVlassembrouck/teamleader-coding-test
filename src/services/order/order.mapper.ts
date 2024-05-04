import { Item, ItemApiModel, Order, OrderApiModel } from "./order.http-service";

export function mapOrderFrom(order: OrderApiModel): Order {
  return {
    id: order.id,
    customerId: order['customer-id'],
    items: order.items.map((itemApiModel: ItemApiModel) => mapItemFrom(itemApiModel)),
    total: order.total,
  };
}

function mapItemFrom(item: ItemApiModel): Item {
  return {
    productId: item['product-id'],
    quantity: item.quantity,
    unitPrice: item['unit-price'],
    total: item.total,
  };
}
