import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'orders',
    loadComponent: () =>
      import(
        './orders/container/orders-container/orders-container.component'
      ).then((module) => module.OrdersContainerComponent),
  },
  {
    path: 'orders/:id',
    loadComponent: () =>
      import(
        './orders/container/order-detail-container/order-detail-container.component'
      ).then((module) => module.OrderDetailContainerComponent),
  },
  {
    path: '**',
    redirectTo: 'orders',
  },
];
