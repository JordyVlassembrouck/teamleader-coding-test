import { ProductApiModel } from './product.http-service';
import { mapApiModelToProduct } from './product.mapper';

describe('#mapApiModelToProduct', () => {
  it('should map a ProductApiModel object to a Product object', () => {
    // given
    const productApiModel: ProductApiModel = {
      id: '1',
      description: 'product',
      category: 'category',
      price: '10.0',
    };

    //when
    const product = mapApiModelToProduct(productApiModel);

    // then
    expect(product.id).toEqual(productApiModel.id);
    expect(product.description).toEqual(productApiModel.description);
    expect(product.category).toEqual(productApiModel.category);
    expect(product.price).toEqual(parseFloat(productApiModel.price));
  });
});
