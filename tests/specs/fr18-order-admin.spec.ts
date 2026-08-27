import { test, expect, type APIRequestContext, type Page } from '@playwright/test';
import * as path from 'path';
import { loadCsv } from '../helpers/csv';
import { reportTitle, STUDENT_ID } from '../helpers/report-meta';
import {
  loginAsAdmin,
  USER_CREDENTIALS,
  ADMIN_CREDENTIALS,
  ADMIN_BASE_URL,
} from '../helpers/auth';
import { AdminPage } from '../pages/admin.page';

const API_BASE = process.env.API_BASE_URL ?? 'http://localhost:3000';
const CSV_PATH = path.join(__dirname, '../data/fr18-order-admin.csv');
const SCREENSHOT_DIR = path.join(__dirname, '../../screenshots');

const rows = loadCsv(CSV_PATH);

const XSS_IMG_PAYLOAD = '<img src=x onerror="window.__fr18xss=1">';

const STATUS_PATH: Record<string, string[]> = {
  pending: [],
  confirmed: ['confirmed'],
  shipping: ['confirmed', 'shipping'],
  delivered: ['confirmed', 'shipping', 'delivered'],
  canceled: ['canceled'],
};

function expandAddress(raw: string): string | null {
  if (raw === '__XSS_IMG__') return XSS_IMG_PAYLOAD;
  if (raw === '__NULL__') return null;
  return raw;
}

async function loginApi(
  request: APIRequestContext,
  credentials: { email: string; password: string },
): Promise<string> {
  const res = await request.post(`${API_BASE}/api/login`, {
    data: {
      email: credentials.email,
      password: credentials.password,
    },
  });
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  return body.token as string;
}

async function createPendingOrder(
  request: APIRequestContext,
  userToken: string,
  opts: { total_amount?: number; shipping_address?: string | null } = {},
): Promise<number> {
  const res = await request.post(`${API_BASE}/api/checkout`, {
    headers: { Authorization: `Bearer ${userToken}` },
    data: {
      total_amount: opts.total_amount ?? 100000 + Math.floor(Math.random() * 1000),
      shipping_address:
        opts.shipping_address === undefined
          ? `FR18 test addr ${Date.now()}`
          : opts.shipping_address,
    },
  });
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  expect(body.orderId).toBeTruthy();
  return body.orderId as number;
}

async function setOrderStatus(
  request: APIRequestContext,
  adminToken: string,
  orderId: number,
  target: string,
): Promise<void> {
  const pathSteps = STATUS_PATH[target];
  if (!pathSteps) {
    throw new Error(`Unknown start_status: ${target}`);
  }
  for (const status of pathSteps) {
    const res = await request.put(
      `${API_BASE}/api/admin/orders/${orderId}/status`,
      {
        headers: { Authorization: `Bearer ${adminToken}` },
        data: { status },
      },
    );
    expect(
      res.ok(),
      `Failed advancing order ${orderId} → ${status}: ${res.status()}`,
    ).toBeTruthy();
  }
}

async function getOrder(
  request: APIRequestContext,
  orderId: number,
): Promise<{ id: number; status: string; shipping_address?: string | null }> {
  const res = await request.get(`${API_BASE}/api/orders/${orderId}`);
  expect(res.ok()).toBeTruthy();
  return res.json();
}

async function getAdminOrdersCount(
  request: APIRequestContext,
  adminToken: string,
): Promise<number> {
  const res = await request.get(`${API_BASE}/api/admin/orders`, {
    headers: { Authorization: `Bearer ${adminToken}` },
  });
  expect(res.ok()).toBeTruthy();
  const body = await res.json();
  return Array.isArray(body) ? body.length : 0;
}

test.describe(`FR-18 Order Admin | Run by: ${STUDENT_ID}`, () => {
  test.describe.configure({ mode: 'default' });

  test.beforeAll(() => {
    expect(rows.length).toBeGreaterThanOrEqual(12);
  });

  test.beforeEach(async ({}, testInfo) => {
    testInfo.annotations.push({
      type: 'metadata',
      description: reportTitle('FR-18 Order Admin'),
    });
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      const match = testInfo.title.match(/^(FR18-[A-Z]+-\d+)/);
      const id = match?.[1] ?? 'unknown';
      try {
        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, `fr18-${id}.png`),
          fullPage: true,
        });
      } catch {
        /* page may be closed */
      }
    }
  });

  for (const row of rows) {
    test(`${row.tc_id} ${row.scenario}`, async ({ page, request }) => {
      const channel = row.channel;
      const expected = row.expected_result;

      if (channel === 'ui_access') {
        await runAccessCase(page, expected);
      } else if (channel === 'ui_orders') {
        await runOrdersUiCase(page, request, {
          startStatus: row.start_status,
          expected,
        });
      } else if (channel === 'ui_dashboard') {
        await runDashboardCase(page, request, {
          startStatus: row.start_status,
          totalAmount: row.total_amount ? Number(row.total_amount) : 0,
          expected,
        });
      } else if (channel === 'ui_xss') {
        await runXssCase(page, request, {
          addressRaw: row.shipping_address,
          expected,
        });
      } else if (channel === 'api_admin') {
        await runApiCase(page, request, expected);
      } else {
        throw new Error(`Unknown channel: ${channel}`);
      }
    });
  }
});

async function runAccessCase(page: Page, expected: string): Promise<void> {
  const admin = new AdminPage(page);

  if (expected === 'access_login_form') {
    await admin.goto();
    // Pattern 1: visibility / text
    await expect(admin.loginHeading).toBeVisible();
    await expect(admin.loginHeading).toContainText('Admin Login');
    // Pattern 2: value / attribute
    await expect(admin.emailInput).toBeVisible();
    await expect(admin.loginButton).toBeEnabled();
    await expect(admin.brand).toHaveCount(0);
    return;
  }

  if (expected === 'access_non_admin') {
    await admin.goto();
    await admin.emailInput.fill(USER_CREDENTIALS.email);
    await admin.passwordInput.fill(USER_CREDENTIALS.password);
    const dialogPromise = page.waitForEvent('dialog', { timeout: 5000 });
    await admin.loginButton.click();
    const dialog = await dialogPromise;
    // Pattern 1: visibility / text (alert message)
    expect(dialog.message()).toMatch(/không phải là admin/i);
    await dialog.accept();
    // Pattern 2: still on login (no admin brand)
    await expect(admin.loginHeading).toBeVisible();
    await expect(admin.brand).toHaveCount(0);
    return;
  }

  throw new Error(`Unknown access expected_result: ${expected}`);
}

async function runOrdersUiCase(
  page: Page,
  request: APIRequestContext,
  opts: { startStatus: string; expected: string },
): Promise<void> {
  const userToken = await loginApi(request, USER_CREDENTIALS);
  const adminToken = await loginApi(request, ADMIN_CREDENTIALS);
  const orderId = await createPendingOrder(request, userToken);
  await setOrderStatus(request, adminToken, orderId, opts.startStatus);

  await loginAsAdmin(page);
  const admin = new AdminPage(page);
  await admin.openOrdersTab();

  // Pattern 1: visibility / text
  await expect(admin.ordersHeading).toBeVisible();
  await expect(admin.orderRowById(orderId)).toBeVisible();

  // Pattern 2: navigation / enabled (admin SPA stays on root)
  await expect(admin.brand).toBeVisible();
  await expect(admin.ordersNav).toBeVisible();

  switch (opts.expected) {
    case 'btn_pending': {
      await expect(admin.confirmButton(orderId)).toBeVisible();
      await expect(admin.confirmButton(orderId)).toBeEnabled();
      await expect(admin.cancelButton(orderId)).toBeVisible();
      break;
    }
    case 'btn_confirmed': {
      await expect(admin.shipButton(orderId)).toBeVisible();
      await expect(admin.shipButton(orderId)).toBeEnabled();
      await expect(admin.cancelButton(orderId)).toBeVisible();
      break;
    }
    case 'btn_shipping': {
      await expect(admin.completeButton(orderId)).toBeVisible();
      await expect(admin.completeButton(orderId)).toBeEnabled();
      await expect(admin.confirmButton(orderId)).toHaveCount(0);
      break;
    }
    case 'btn_delivered_none': {
      await expect(admin.actionCell(orderId).getByRole('button')).toHaveCount(0);
      break;
    }
    case 'bug_c4_btn_hidden': {
      // Business: canceled is terminal → no action buttons (BUG-C4 if present)
      await expect(
        admin.markDeliveredFromCanceledButton(orderId),
        'BUG-C4: canceled order must not show Đánh dấu Đã giao',
      ).toHaveCount(0);
      break;
    }
    case 'bug_c4_click_reject': {
      const btn = admin.markDeliveredFromCanceledButton(orderId);
      // Document defect path: button exists due to BUG-C4; clicking must not succeed
      await expect(btn).toBeVisible();
      await btn.click();
      await page.waitForTimeout(800);
      // Pattern 3: HTTP / API — status must remain canceled
      const after = await getOrder(request, orderId);
      expect(
        after.status,
        'BUG-C4/B1: canceled→delivered must be rejected; status stay canceled',
      ).toBe('canceled');
      break;
    }
    default:
      throw new Error(`Unknown orders expected_result: ${opts.expected}`);
  }
}

async function runDashboardCase(
  page: Page,
  request: APIRequestContext,
  opts: { startStatus: string; totalAmount: number; expected: string },
): Promise<void> {
  await loginAsAdmin(page);
  const admin = new AdminPage(page);
  await admin.openDashboard();

  // Pattern 1: visibility / text
  await expect(admin.dashboardHeading).toBeVisible();
  await expect(admin.dashboardHeading).toContainText('Dashboard');

  if (opts.expected === 'dash_order_count') {
    const adminToken = await loginApi(request, ADMIN_CREDENTIALS);
    const apiCount = await getAdminOrdersCount(request, adminToken);
    // Pattern 2: value
    const uiCount = await admin.parseOrderCount();
    expect(uiCount).toBe(apiCount);
    return;
  }

  if (opts.expected === 'bug_c1_revenue') {
    const before = await admin.parseRevenue();
    const userToken = await loginApi(request, USER_CREDENTIALS);
    const adminToken = await loginApi(request, ADMIN_CREDENTIALS);
    const orderId = await createPendingOrder(request, userToken, {
      total_amount: opts.totalAmount,
    });
    await setOrderStatus(request, adminToken, orderId, 'delivered');

    // Re-login to refresh dashboard data from API
    await page.evaluate(() => localStorage.removeItem('adminToken'));
    await loginAsAdmin(page);
    await admin.openDashboard();

    const after = await admin.parseRevenue();
    const delta = after - before;
    // Pattern 2: value — business expects +totalAmount (BUG-C1 if ×2)
    expect(
      delta,
      `BUG-C1: revenue delta should be ${opts.totalAmount}, got ${delta} (order #${orderId})`,
    ).toBe(opts.totalAmount);
    return;
  }

  throw new Error(`Unknown dashboard expected_result: ${opts.expected}`);
}

async function runXssCase(
  page: Page,
  request: APIRequestContext,
  opts: { addressRaw: string; expected: string },
): Promise<void> {
  const address = expandAddress(opts.addressRaw);
  const userToken = await loginApi(request, USER_CREDENTIALS);
  const adminToken = await loginApi(request, ADMIN_CREDENTIALS);
  const orderId = await createPendingOrder(request, userToken, {
    shipping_address: address,
    total_amount: 50000,
  });

  await loginAsAdmin(page);
  const admin = new AdminPage(page);
  await admin.openOrdersTab();

  // Pattern 1: visibility
  await expect(admin.orderRowById(orderId)).toBeVisible();
  const cell = admin.addressCell(orderId);

  switch (opts.expected) {
    case 'addr_plain_ok': {
      await expect(cell).toContainText('123 Duong ABC Q1');
      await expect(cell.locator('img')).toHaveCount(0);
      break;
    }
    case 'addr_null_fallback': {
      await expect(cell).toContainText('Chưa cập nhật');
      break;
    }
    case 'bug_c2_escaped': {
      // Business: HTML must be escaped as text (BUG-C2 if img executes)
      await expect(
        cell.locator('img'),
        'BUG-C2: shipping_address must not render executable HTML',
      ).toHaveCount(0);
      await expect(cell).toContainText('<img');
      const flagged = await page.evaluate(() => (window as { __fr18xss?: number }).__fr18xss);
      expect(flagged, 'BUG-C2: onerror must not execute').toBeUndefined();
      break;
    }
    default:
      throw new Error(`Unknown XSS expected_result: ${opts.expected}`);
  }

  // Pattern 3: confirm order exists via API
  const order = await getOrder(request, orderId);
  expect(order.id).toBe(orderId);
}

async function runApiCase(
  page: Page,
  request: APIRequestContext,
  expected: string,
): Promise<void> {
  if (expected === 'api_user_forbidden') {
    const userToken = await loginApi(request, USER_CREDENTIALS);
    // Pattern 3: HTTP / API — user must not access admin orders
    const res = await request.get(`${API_BASE}/api/admin/orders`, {
      headers: { Authorization: `Bearer ${userToken}` },
    });
    expect(
      res.status(),
      'Admin orders API must reject non-admin tokens (403)',
    ).toBe(403);
    await page.goto(ADMIN_BASE_URL);
    return;
  }
  throw new Error(`Unknown API expected_result: ${expected}`);
}
