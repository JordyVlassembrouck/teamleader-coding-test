import { TestBed } from '@angular/core/testing';
import { Customer, CustomerApiService } from './customer-api.service';

describe('CustomerApiService', () => {
  let service: CustomerApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerApiService);
  });

  describe('#getCustomers', () => {
    it('should return an observable of all customers', (done) => {
      // given when
      service.getCustomers().subscribe((customers: Customer[]) => {
        // then
        expect(customers.length).toEqual(3);
        done();
      });
    });
  });
});
