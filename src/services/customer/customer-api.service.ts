import { Injectable } from '@angular/core';
import * as customers from '../../assets/data/customers.json';
import { Observable } from 'rxjs/internal/Observable';
import { of } from 'rxjs/internal/observable/of';

@Injectable({
  providedIn: 'root'
})
export class CustomerApiService {
  private customers: Customer[] = customers;

  getCustomers(): Observable<Customer[]> {
    return of(this.customers);
  }
}

export interface Customer {
  id: string;
  name: string;
  since: string;
  revenue: string;
}
