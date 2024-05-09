import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'orders',
    loadComponent: () =>
      import(
        './orders/container/orders-container/orders.container'
      ).then((module) => module.OrdersContainer),
  },
  {
    path: 'orders/:id',
    loadComponent: () =>
      import(
        './orders/container/order-detail-container/order-detail.container'
      ).then((module) => module.OrderDetailContainer),
  },
  {
    path: '**',
    redirectTo: 'orders',
  },
];
