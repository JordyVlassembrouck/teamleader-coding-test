import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import productData from '../../assets/data/products.json';
import { Product, ProductHttpService } from './product.http-service';

describe('ProductHttpService', () => {
  let productHttpService: ProductHttpService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    productHttpService = TestBed.inject(ProductHttpService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('#getProducts', () => {
    it('should return an observable of all products', (done) => {
      // given
      productHttpService.getProducts().subscribe((products: Product[]) => {
        // then
        expect(products.length).toEqual(productData.length);
        expect(products[0].id).toEqual(productData[0].id);
        expect(products[0].description).toEqual(productData[0].description);
        expect(products[0].category).toEqual(productData[0].category);
        expect(products[0].price).toEqual(productData[0].price);
        expect(products[1].id).toEqual(productData[1].id);
        expect(products[1].description).toEqual(productData[1].description);
        expect(products[1].category).toEqual(productData[1].category);
        expect(products[1].price).toEqual(productData[1].price);
        done();
      });

      const request = httpTestingController.expectOne('/api/products');

      // when
      request.flush(productData);
      httpTestingController.verify();
    });
  });
});
