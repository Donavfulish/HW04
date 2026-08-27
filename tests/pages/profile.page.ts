import { type Page, type Locator, expect } from '@playwright/test';

/**
 * Page Object for storefront Profile (`/profile`).
 * Labels in SUT are not wired with htmlFor, so fields are located by form order.
 */
export class ProfilePage {
  readonly page: Page;
  readonly form: Locator;
  readonly heading: Locator;
  readonly emailInput: Locator;
  readonly nameInput: Locator;
  readonly phoneInput: Locator;
  readonly addressInput: Locator;
  readonly updateButton: Locator;
  readonly loginPrompt: Locator;

  constructor(page: Page) {
    this.page = page;
    this.form = page.locator('form');
    this.heading = page.getByRole('heading', { name: /Hồ sơ của bạn/i });
    this.emailInput = this.form.locator('input').nth(0);
    this.nameInput = this.form.locator('input').nth(1);
    this.phoneInput = this.form.locator('input').nth(2);
    this.addressInput = this.form.locator('textarea');
    this.updateButton = this.form.getByRole('button', { name: /Cập nhật/i });
    this.loginPrompt = page.getByText(/Vui lòng đăng nhập/i);
  }

  async goto(): Promise<void> {
    await this.page.goto('/profile');
  }

  async expectLoaded(): Promise<void> {
    await expect(this.heading).toBeVisible();
    await expect(this.page).toHaveURL(/\/profile/);
  }

  async fillProfile(fields: {
    name?: string;
    phone?: string;
    shipping_address?: string;
  }): Promise<void> {
    if (fields.name !== undefined) {
      await this.nameInput.fill(fields.name);
    }
    if (fields.phone !== undefined) {
      await this.phoneInput.fill(fields.phone);
    }
    if (fields.shipping_address !== undefined) {
      await this.addressInput.fill(fields.shipping_address);
    }
  }

  async submit(): Promise<void> {
    await this.updateButton.click();
  }

  /**
   * Submit and capture the next native dialog message (alert).
   * Returns null if no dialog appears within timeout.
   */
  async submitAndGetAlert(timeoutMs = 3000): Promise<string | null> {
    const dialogPromise = new Promise<string | null>((resolve) => {
      const timer = setTimeout(() => {
        this.page.off('dialog', handler);
        resolve(null);
      }, timeoutMs);

      const handler = async (dialog: { message: () => string; accept: () => Promise<void> }) => {
        clearTimeout(timer);
        const msg = dialog.message();
        await dialog.accept();
        resolve(msg);
      };

      this.page.once('dialog', handler);
    });

    await this.submit();
    return dialogPromise;
  }

  async isNameRequiredBlocking(): Promise<boolean> {
    return this.nameInput.evaluate((el: HTMLInputElement) => {
      el.reportValidity();
      return el.validity.valueMissing;
    });
  }
}
