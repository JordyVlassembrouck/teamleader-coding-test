import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-order-detail-container',
  standalone: true,
  imports: [],
  templateUrl: './order-detail-container.component.html',
  styleUrl: './order-detail-container.component.sass'
})
export class OrderDetailContainerComponent implements OnInit {
  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    const orderId = this.route.snapshot.paramMap.get('id');
    console.log(orderId);
  }
}
