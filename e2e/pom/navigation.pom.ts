import { Page } from '@playwright/test';
import { OrdersPage } from './orders.pom';
import { OrderDetailPage } from './order-detail.pom';

export class Navigation {
  static async navigateToBase(page: Page) {
    await page.goto('http://localhost:4200');
    await OrdersPage.waitUntilLoaded(page);
  }

  static async navigateToOrderDetail(page: Page, orderId: string) {
    await page.goto(`http://localhost:4200/orders/${orderId}`);
    await OrderDetailPage.waitUntilLoaded(page, orderId);

  }
}
