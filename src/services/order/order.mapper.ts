import { Item, ItemAPIModel, Order, OrderAPIModel } from "./order-api.service";

export function mapOrderFrom(order: OrderAPIModel): Order {
  return {
    id: order.id,
    customerId: order['customer-id'],
    items: order.items.map((itemAPIModel: ItemAPIModel) => mapItemFrom(itemAPIModel)),
    total: order.total,
  };
}

function mapItemFrom(item: ItemAPIModel): Item {
  return {
    productId: item['product-id'],
    quantity: item.quantity,
    unitPrice: item['unit-price'],
    total: item.total,
  };
}
