import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../../../services/product/product.http-service';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-order-component',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-order.component.html',
})
export class AddOrderComponent  {
  @Input() products!: Product[];
  @Input() orderForm!: FormGroup;

  @Output() addProductClicked$ = new EventEmitter<void>();

  protected printWith2Decimals(value: number): string {
    return value.toFixed(2);
  }

  protected addProduct(): void {
    this.addProductClicked$.emit();
  }
}
