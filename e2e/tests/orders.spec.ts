import { test } from '@playwright/test';
import { Navigation } from '../pom/navigation.pom';
import { OrdersPage } from '../pom/orders.pom';
import { OrderDetailPage } from '../pom/order-detail.pom';

test('navigate to order overview by default', async ({ page }) => {
  await Navigation.navigateToBase(page);
});

test('navigate to order detail', async ({ page }) => {
  await Navigation.navigateToBase(page);
  await OrdersPage.clickOrder(page, '1');

  await OrderDetailPage.assertOrder(page, '1');
  await OrderDetailPage.assertTotal(page, '€49.90');
});

test('adding a new product to an order changes the total and the amount of product entries', async ({ page }) => {
  await Navigation.navigateToOrderDetail(page, '1');
  await OrderDetailPage.assertTotal(page, '€49.90');
  await OrderDetailPage.assertAmountOfItems(page, 1);

  await OrderDetailPage.selectProduct(page, 'Screwdriver (€9.75)');
  await OrderDetailPage.fillQuantity(page, '5');
  await OrderDetailPage.addProduct(page);

  await OrderDetailPage.assertAmountOfItems(page, 2);
  await OrderDetailPage.assertTotal(page, '€98.65');
});

test('removing a product from an order changes the total and the amount of product entries', async ({ page }) => {
  await Navigation.navigateToOrderDetail(page, '3');
  await OrderDetailPage.assertTotal(page, '€69.00');
  await OrderDetailPage.assertAmountOfItems(page, 2);

  await OrderDetailPage.removeProduct(page, 1);

  await OrderDetailPage.assertAmountOfItems(page, 1);
  await OrderDetailPage.assertTotal(page, '€19.50');
});

test('when you place order, either a succes or warning notification pops up', async ({ page }) => {
  await Navigation.navigateToOrderDetail(page, '3');
  await OrderDetailPage.assertTotal(page, '€69.00');
  await OrderDetailPage.assertAmountOfItems(page, 2);
  await OrderDetailPage.assertAmountOfNotifications(page, 0);

  await OrderDetailPage.placeOrder(page);

  await OrderDetailPage.assertAmountOfNotifications(page, 1);
});