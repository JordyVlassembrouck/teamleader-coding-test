import { Page } from '@playwright/test';
import { OrderDetailPage } from './order-detail.pom';

export class OrdersPage {
  static async waitUntilLoaded(page: Page): Promise<void> {
    await page.waitForURL('http://localhost:4200/orders');
    await page.locator('table').waitFor();
  }

  static async clickOrder(page: Page, orderId: string): Promise<void> {
    await page.locator('table').getByText(orderId).click();
    await OrderDetailPage.waitUntilLoaded(page, '1');
  }
}
