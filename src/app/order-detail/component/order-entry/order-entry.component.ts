import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-order-entry-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-entry.component.html',
})
export class OrderEntryComponent  {
  @Input() productName!: string;
  @Input() productId!: string;
  @Input() quantity!: number;
  @Input() unitPrice!: string;
  @Input() totalPrice!: string;

  @Output() removeProductClicked$ = new EventEmitter<void>();

  removeProduct(): void {
    this.removeProductClicked$.emit();
  }
}
