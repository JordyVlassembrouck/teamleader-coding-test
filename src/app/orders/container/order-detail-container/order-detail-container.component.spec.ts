import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderDetailContainerComponent } from './order-detail-container.component';

describe('OrderDetailContainerComponent', () => {
  let component: OrderDetailContainerComponent;
  let fixture: ComponentFixture<OrderDetailContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrderDetailContainerComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrderDetailContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
