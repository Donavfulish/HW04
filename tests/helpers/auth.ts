import { type Page, expect } from '@playwright/test';

export const WEB_BASE_URL =
  process.env.WEB_BASE_URL ?? 'http://localhost:5173';
export const ADMIN_BASE_URL =
  process.env.ADMIN_BASE_URL ?? 'http://localhost:5174';

/** Seeded shop user (from SUT README / database.js). */
export const USER_CREDENTIALS = {
  email: 'test@eshop.com',
  password: 'Test1234!',
} as const;

/** Seeded admin (from SUT README / database.js; prefer over setup_guide admin123). */
export const ADMIN_CREDENTIALS = {
  email: 'admin@eshop.com',
  password: 'Admin123!',
} as const;

/**
 * Log in as the seeded shop user on the web storefront (`/login`).
 * Leaves the browser on `/` after a successful sign-in.
 */
export async function loginAsUser(
  page: Page,
  credentials: { email: string; password: string } = USER_CREDENTIALS,
): Promise<void> {
  await page.goto(`${WEB_BASE_URL}/login`);
  await page.locator('form input').nth(0).fill(credentials.email);
  await page.locator('form input').nth(1).fill(credentials.password);
  await page.getByRole('button', { name: /sign in/i }).click();
  await expect(page).toHaveURL(/\/(?:$|\?)/);
}

/**
 * Log in as the seeded admin on the admin SPA (root shows login when unauthenticated).
 * Leaves the browser on the admin dashboard after a successful sign-in.
 */
export async function loginAsAdmin(
  page: Page,
  credentials: { email: string; password: string } = ADMIN_CREDENTIALS,
): Promise<void> {
  await page.goto(ADMIN_BASE_URL);
  await page.getByPlaceholder('Email').fill(credentials.email);
  await page.getByPlaceholder('Password').fill(credentials.password);
  await page.getByRole('button', { name: /^login$/i }).click();
  await expect(page.getByText('EShop Admin')).toBeVisible();
}
