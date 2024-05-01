import { TestBed } from '@angular/core/testing';
import { Customer, CustomerAPIService } from './customer-api.service';

describe('CustomerAPIService', () => {
  let service: CustomerAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CustomerAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
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
