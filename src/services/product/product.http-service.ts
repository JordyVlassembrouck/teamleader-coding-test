import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/internal/operators/map';
import { mapToInternalModel } from './product.mapper';

@Injectable({
  providedIn: 'root',
})
export class ProductHttpService {
  constructor(private http: HttpClient) {}

  getProducts(): Observable<Product[]> {
    return this.http
      .get<ProductApiModel[]>('/api/products')
      .pipe(
        map((productApiModels: ProductApiModel[]) =>
          productApiModels.map((productApiModel: ProductApiModel) =>
            mapToInternalModel(productApiModel)
          )
        )
      );
  }
}

export interface ProductApiModel {
  id: string;
  description: string;
  category: string;
  price: string;
}

export interface Product {
  id: string;
  description: string;
  category: string;
  price: number;
}
