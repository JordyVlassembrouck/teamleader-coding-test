import { TestBed } from '@angular/core/testing';
import { Customer, CustomerHttpService } from './customer.http-service';
import { HttpClient } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import mockCustomers from '../../assets/data/customers.json';

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
        expect(customer[0].id).toEqual(mockCustomers[0].id);
        expect(customer[0].name).toEqual(mockCustomers[0].name);
        expect(customer[0].since).toEqual(mockCustomers[0].since);
        expect(customer[0].revenue).toEqual(mockCustomers[0].revenue);
        expect(customer[1].id).toEqual(mockCustomers[1].id);
        expect(customer[1].name).toEqual(mockCustomers[1].name);
        expect(customer[1].since).toEqual(mockCustomers[1].since);
        expect(customer[1].revenue).toEqual(mockCustomers[1].revenue);
        done();
      });
      const req = httpTestingController.expectOne('/api/customers');

      // when
      req.flush(mockCustomers);
      httpTestingController.verify();
    });
  });
});
