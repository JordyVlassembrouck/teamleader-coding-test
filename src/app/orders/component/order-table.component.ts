import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Order, OrderWithCustomer } from '../../../services/order/order.http-service';

@Component({
  selector: 'app-order-table-component',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order-table.component.html',
  styleUrl: './order-table.component.sass',
})
export class OrderTableComponent  {
  @Input() orders!: OrderWithCustomer[];

  @Output() orderClicked$ = new EventEmitter<string>();

  orderClicked(orderId: string): void {
    this.orderClicked$.emit(orderId);
  }

  protected printWith2Decimals(value: number): string {
    return value.toFixed(2);
  }
}
