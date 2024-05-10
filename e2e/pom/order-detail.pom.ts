import { Page, expect } from '@playwright/test';

export class OrderDetailPage {
  static async waitUntilLoaded(page: Page, orderId: string): Promise<void> {
    await page.waitForURL(`http://localhost:4200/orders/${orderId}`);
    await page.getByText(`Order ${orderId}`).waitFor();
  }

  static async assertOrder(page: Page, orderId: string): Promise<void> {
    await page.getByText(`Order ${orderId}`).waitFor();
  }

  static async assertTotal(page: Page, total: string): Promise<void> {
    await page.getByText(`Total amount: ${total}`).waitFor();
  }

  static async assertAmountOfItems(page: Page, amount: number): Promise<void> {
    await page.locator('.card').count().then(count => expect(count).toBe(amount));
  }

  static async selectProduct(page: Page, productName: string): Promise<void> {
    await page.locator('#selectProduct').selectOption({ label: productName });
  }

  static async fillQuantity(page: Page, quantity: string): Promise<void> {
    await page.getByLabel('Quantity').fill(quantity);
  }

  static async addProduct(page: Page): Promise<void> {
    await page.getByText('Add product').click();
  }

  static async removeProduct(page: Page, entry: number): Promise<void> {
    await page.locator('.btn.rounded-circle').nth(entry).click();
  }

  static async placeOrder(page: Page): Promise<void> {
    await page.getByText('Place order').click();
  }

  static async assertAmountOfNotifications(page: Page, amount: number): Promise<void> {
    await page.locator('.toast').count().then(count => expect(count).toBe(amount));
  }
}
