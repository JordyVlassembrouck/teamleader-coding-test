import { Product, ProductApiModel } from './product.http-service';

export function mapApiModelToProduct(product: ProductApiModel): Product {
  return {
    id: product.id,
    description: product.description,
    category: product.category,
    price: parseFloat(product.price),
  };
}
