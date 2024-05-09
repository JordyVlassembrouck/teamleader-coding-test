import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-header-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-header.component.html',
})
export class OrderHeaderComponent  {
  @Input() orderId!: string;
  @Input() total!: string;

  @Output() placeOrderClicked$ = new EventEmitter<void>();
  @Output() backButtonClicked$ = new EventEmitter<void>();

  placeOrder(): void {
    this.placeOrderClicked$.emit();
  }

  backButtonClicked(): void {
    this.backButtonClicked$.emit();
  }
}
