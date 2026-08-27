import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Storefront Profile — order history + cancel button.
 * Cancel visibility: shown unless status is delivered or canceled (SUT bug for shipping).
 */
export class OrdersWebPage {
  readonly page: Page;
  readonly ordersHeading: Locator;
  readonly orderRows: Locator;

  constructor(page: Page) {
    this.page = page;
    this.ordersHeading = page.getByRole('heading', {
      name: /Lịch sử đơn hàng/i,
    });
    this.orderRows = page.locator('table tbody tr');
  }

  async goto(): Promise<void> {
    await this.page.goto('/profile');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.ordersHeading).toBeVisible();
    await expect(this.page).toHaveURL(/\/profile/);
  }

  orderRowById(orderId: number | string): Locator {
    return this.page
      .locator('table tbody tr')
      .filter({ hasText: `#${orderId}` });
  }

  statusBadge(orderId: number | string): Locator {
    return this.orderRowById(orderId).locator('td').nth(3).locator('span');
  }

  cancelButton(orderId: number | string): Locator {
    return this.orderRowById(orderId).getByRole('button', {
      name: /Hủy đơn/i,
    });
  }

  async expectCancelVisible(orderId: number | string): Promise<void> {
    await expect(this.cancelButton(orderId)).toBeVisible();
  }

  async expectCancelHidden(orderId: number | string): Promise<void> {
    await expect(this.cancelButton(orderId)).toHaveCount(0);
  }

  async cancelOrder(orderId: number | string): Promise<string | null> {
    const dialogPromise = new Promise<string | null>((resolve) => {
      const timer = setTimeout(() => {
        this.page.off('dialog', handler);
        resolve(null);
      }, 4000);

      const handler = async (dialog: {
        message: () => string;
        accept: () => Promise<void>;
      }) => {
        clearTimeout(timer);
        const msg = dialog.message();
        await dialog.accept();
        resolve(msg);
      };

      this.page.once('dialog', handler);
    });

    await this.cancelButton(orderId).click();
    return dialogPromise;
  }
}
