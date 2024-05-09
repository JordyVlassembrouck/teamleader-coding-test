import { Product, ProductApiModel } from './product.http-service';

export function mapToInternalModel(product: ProductApiModel): Product {
  return {
    id: product.id,
    description: product.description,
    category: product.category,
    price: parseFloat(product.price),
  };
}
