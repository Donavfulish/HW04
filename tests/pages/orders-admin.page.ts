import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Admin SPA — Orders tab status action buttons.
 */
export class OrdersAdminPage {
  readonly page: Page;
  readonly ordersNav: Locator;
  readonly ordersHeading: Locator;
  readonly orderRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ordersNav = page.getByText('Đơn hàng', { exact: true });
    this.ordersHeading = page.getByRole('heading', {
      name: /Quản lý Đơn hàng/i,
    });
    this.orderRows = page.locator('table tbody tr');
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

  statusBadge(orderId: number | string): Locator {
    return this.orderRowById(orderId).locator('td').nth(4).locator('span');
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

  deliverButton(orderId: number | string): Locator {
    return this.orderRowById(orderId).getByRole('button', {
      name: /Hoàn thành/i,
    });
  }

  markDeliveredFromCanceledButton(orderId: number | string): Locator {
    return this.orderRowById(orderId).getByRole('button', {
      name: /Đánh dấu Đã giao/i,
    });
  }

  async expectStatusLabel(
    orderId: number | string,
    label: RegExp | string,
  ): Promise<void> {
    await expect(this.statusBadge(orderId)).toContainText(label);
  }
}
