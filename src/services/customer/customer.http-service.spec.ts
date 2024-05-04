import { TestBed } from '@angular/core/testing';
import { Customer, CustomerHttpService } from './customer.http-service';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import customers from '../../assets/data/customers.json';

describe('CustomerHttpService', () => {
  let service: CustomerHttpService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    service = TestBed.inject(CustomerHttpService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('#getCustomers', () => {
    it('should return an observable of all customers', (done) => {
      // given
      service.getCustomers().subscribe((customer: Customer[]) => {
        // then
        expect(customer.length).toEqual(3);
        expect(customer[0].id).toEqual(customers[0].id);
        expect(customer[0].name).toEqual(customers[0].name);
        expect(customer[0].since).toEqual(customers[0].since);
        expect(customer[0].revenue).toEqual(customers[0].revenue);
        expect(customer[1].id).toEqual(customers[1].id);
        expect(customer[1].name).toEqual(customers[1].name);
        expect(customer[1].since).toEqual(customers[1].since);
        expect(customer[1].revenue).toEqual(customers[1].revenue);
        done();
      });
      const req = httpTestingController.expectOne('/api/customers');

      // when
      req.flush(customers);
      httpTestingController.verify();
    });
  });
});
