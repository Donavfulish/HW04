import { type Page, type Locator, expect } from '@playwright/test';
import { ADMIN_BASE_URL } from '../helpers/auth';

/**
 * Admin SPA — login, dashboard revenue, and orders tab.
 */
export class AdminPage {
  readonly page: Page;
  readonly loginHeading: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;
  readonly brand: Locator;
  readonly dashboardNav: Locator;
  readonly ordersNav: Locator;
  readonly dashboardHeading: Locator;
  readonly ordersHeading: Locator;
  readonly revenueValue: Locator;
  readonly orderCountValue: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginHeading = page.getByRole('heading', { name: /Admin Login/i });
    this.emailInput = page.getByPlaceholder('Email');
    this.passwordInput = page.getByPlaceholder('Password');
    this.loginButton = page.getByRole('button', { name: /^login$/i });
    this.brand = page.getByText('EShop Admin');
    this.dashboardNav = page.locator('ul').getByText('Dashboard', { exact: true });
    this.ordersNav = page.locator('ul').getByText('Đơn hàng', { exact: true });
    this.dashboardHeading = page.getByRole('heading', { name: /^Dashboard$/i });
    this.ordersHeading = page.getByRole('heading', {
      name: /Quản lý Đơn hàng/i,
    });
    this.revenueValue = page
      .locator('h3', { hasText: /Tổng doanh thu/i })
      .locator('..')
      .locator('p');
    this.orderCountValue = page
      .locator('h3', { hasText: /Tổng số đơn hàng/i })
      .locator('..')
      .locator('p');
  }

  async goto(): Promise<void> {
    await this.page.goto(ADMIN_BASE_URL);
  }

  async openDashboard(): Promise<void> {
    await this.dashboardNav.click();
    await expect(this.dashboardHeading).toBeVisible();
  }

  async openOrdersTab(): Promise<void> {
    await this.ordersNav.click();
    await expect(this.ordersHeading).toBeVisible();
  }

  orderRowById(orderId: number | string): Locator {
    return this.page
      .locator('table tbody tr')
      .filter({ hasText: `#${orderId}` });
  }

  addressCell(orderId: number | string): Locator {
    return this.orderRowById(orderId).locator('td').nth(3);
  }

  statusBadge(orderId: number | string): Locator {
    return this.orderRowById(orderId).locator('td').nth(4).locator('span');
  }

  actionCell(orderId: number | string): Locator {
    return this.orderRowById(orderId).locator('td').nth(5);
  }

  confirmButton(orderId: number | string): Locator {
    return this.orderRowById(orderId).getByRole('button', {
      name: /^Xác nhận$/i,
    });
  }

  cancelButton(orderId: number | string): Locator {
    return this.orderRowById(orderId).getByRole('button', { name: /^Hủy$/i });
  }

  shipButton(orderId: number | string): Locator {
    return this.orderRowById(orderId).getByRole('button', {
      name: /Giao hàng/i,
    });
  }

  completeButton(orderId: number | string): Locator {
    return this.orderRowById(orderId).getByRole('button', {
      name: /Hoàn thành/i,
    });
  }

  markDeliveredFromCanceledButton(orderId: number | string): Locator {
    return this.orderRowById(orderId).getByRole('button', {
      name: /Đánh dấu Đã giao/i,
    });
  }

  async parseRevenue(): Promise<number> {
    const text = (await this.revenueValue.textContent()) ?? '0';
    const digits = text.replace(/[^\d]/g, '');
    return digits ? Number(digits) : 0;
  }

  async parseOrderCount(): Promise<number> {
    const text = (await this.orderCountValue.textContent()) ?? '0';
    return Number(text.trim());
  }
}
