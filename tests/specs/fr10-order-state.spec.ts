import { test, expect, type APIRequestContext, type Page } from '@playwright/test';
import * as path from 'path';
import { loadCsv } from '../helpers/csv';
import { reportTitle, STUDENT_ID } from '../helpers/report-meta';
import {
  loginAsUser,
  loginAsAdmin,
  USER_CREDENTIALS,
  ADMIN_CREDENTIALS,
} from '../helpers/auth';
import { OrdersWebPage } from '../pages/orders-web.page';
import { OrdersAdminPage } from '../pages/orders-admin.page';

const API_BASE = process.env.API_BASE_URL ?? 'http://localhost:3000';
const CSV_PATH = path.join(__dirname, '../data/fr10-order-state.csv');
const SCREENSHOT_DIR = path.join(__dirname, '../../screenshots');

const rows = loadCsv(CSV_PATH);

const STATUS_PATH: Record<string, string[]> = {
  pending: [],
  confirmed: ['confirmed'],
  shipping: ['confirmed', 'shipping'],
  delivered: ['confirmed', 'shipping', 'delivered'],
  canceled: ['canceled'],
};

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
): Promise<number> {
  const res = await request.post(`${API_BASE}/api/checkout`, {
    headers: { Authorization: `Bearer ${userToken}` },
    data: {
      total_amount: 100000 + Math.floor(Math.random() * 1000),
      shipping_address: `FR10 test addr ${Date.now()}`,
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
): Promise<{ id: number; status: string }> {
  const res = await request.get(`${API_BASE}/api/orders/${orderId}`);
  expect(res.ok()).toBeTruthy();
  return res.json();
}

test.describe(`FR-10 Order State | Run by: ${STUDENT_ID}`, () => {
  test.describe.configure({ mode: 'default' });

  test.beforeAll(() => {
    expect(rows.length).toBeGreaterThanOrEqual(12);
  });

  test.beforeEach(async ({}, testInfo) => {
    testInfo.annotations.push({
      type: 'metadata',
      description: reportTitle('FR-10 Order State'),
    });
  });

  test.afterEach(async ({ page }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      const match = testInfo.title.match(/^(FR10-[A-Z]+-\d+)/);
      const id = match?.[1] ?? 'unknown';
      try {
        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, `fr10-${id}.png`),
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
      const startStatus = row.start_status;
      const targetStatus = row.target_status;
      const expected = row.expected_result;

      if (channel === 'api_admin') {
        await runAdminApiCase(page, request, {
          startStatus,
          targetStatus,
          expected,
        });
      } else if (channel === 'api_user') {
        await runUserCancelApiCase(page, request, {
          startStatus,
          expected,
        });
      } else if (channel === 'ui_web') {
        await runWebUiCase(page, request, {
          startStatus,
          expected,
        });
      } else if (channel === 'ui_admin') {
        await runAdminUiCase(page, request, {
          startStatus,
          expected,
        });
      } else {
        throw new Error(`Unknown channel: ${channel}`);
      }
    });
  }
});

async function runAdminApiCase(
  page: Page,
  request: APIRequestContext,
  opts: {
    startStatus: string;
    targetStatus: string;
    expected: string;
  },
): Promise<void> {
  const userToken = await loginApi(request, USER_CREDENTIALS);
  const adminToken = await loginApi(request, ADMIN_CREDENTIALS);

  if (opts.expected === 'admin_404') {
    // Pattern 3: HTTP / API
    const res = await request.put(
      `${API_BASE}/api/admin/orders/99999/status`,
      {
        headers: { Authorization: `Bearer ${adminToken}` },
        data: { status: opts.targetStatus || 'confirmed' },
      },
    );
    expect(res.status()).toBe(404);
    const body = await res.json();
    expect(body.error).toMatch(/Order not found/i);
    await page.goto('/');
    return;
  }

  const orderId = await createPendingOrder(request, userToken);
  await setOrderStatus(request, adminToken, orderId, opts.startStatus);
  const before = await getOrder(request, orderId);
  expect(before.status).toBe(opts.startStatus);

  const res = await request.put(
    `${API_BASE}/api/admin/orders/${orderId}/status`,
    {
      headers: { Authorization: `Bearer ${adminToken}` },
      data: { status: opts.targetStatus },
    },
  );
  const body = await res.json();

  switch (opts.expected) {
    case 'admin_200': {
      expect(res.status()).toBe(200);
      expect(body.message).toMatch(/Order status updated/i);
      const after = await getOrder(request, orderId);
      expect(after.status).toBe(opts.targetStatus);
      break;
    }
    case 'admin_400': {
      expect(res.status()).toBe(400);
      expect(body.error).toMatch(/Invalid state transition/i);
      const after = await getOrder(request, orderId);
      expect(after.status).toBe(opts.startStatus);
      break;
    }
    case 'admin_bug_b1': {
      // Business: canceled is terminal → must reject (BUG-B1 if 200)
      expect(
        res.status(),
        'BUG-B1: canceled→delivered must be rejected (HTTP 400)',
      ).toBe(400);
      expect(body.error).toMatch(/Invalid state transition/i);
      break;
    }
    default:
      throw new Error(`Unknown admin expected_result: ${opts.expected}`);
  }
}

async function runUserCancelApiCase(
  page: Page,
  request: APIRequestContext,
  opts: { startStatus: string; expected: string },
): Promise<void> {
  const userToken = await loginApi(request, USER_CREDENTIALS);
  const adminToken = await loginApi(request, ADMIN_CREDENTIALS);
  const orderId = await createPendingOrder(request, userToken);
  await setOrderStatus(request, adminToken, orderId, opts.startStatus);

  // Pattern 3: HTTP / API
  const res = await request.put(
    `${API_BASE}/api/orders/${orderId}/cancel`,
    {
      headers: { Authorization: `Bearer ${userToken}` },
    },
  );
  const body = await res.json();

  switch (opts.expected) {
    case 'user_cancel_200': {
      expect(res.status()).toBe(200);
      expect(body.message).toMatch(/Order canceled successfully/i);
      const after = await getOrder(request, orderId);
      expect(after.status).toBe('canceled');
      break;
    }
    case 'user_cancel_400': {
      expect(res.status()).toBe(400);
      expect(body.error).toMatch(/Cannot cancel/i);
      const after = await getOrder(request, orderId);
      expect(after.status).toBe(opts.startStatus);
      break;
    }
    case 'user_bug_b3': {
      // Business: shipping cannot be canceled by user (BUG-B3 if 200)
      expect(
        res.status(),
        'BUG-B3: user cancel while shipping must be rejected (HTTP 400)',
      ).toBe(400);
      expect(body.error).toMatch(/Cannot cancel/i);
      break;
    }
    default:
      throw new Error(`Unknown user expected_result: ${opts.expected}`);
  }

  await page.goto('/');
}

async function runWebUiCase(
  page: Page,
  request: APIRequestContext,
  opts: { startStatus: string; expected: string },
): Promise<void> {
  const userToken = await loginApi(request, USER_CREDENTIALS);
  const adminToken = await loginApi(request, ADMIN_CREDENTIALS);
  const orderId = await createPendingOrder(request, userToken);
  await setOrderStatus(request, adminToken, orderId, opts.startStatus);

  await loginAsUser(page);
  const web = new OrdersWebPage(page);
  await web.goto();
  await web.expectLoaded();

  // Pattern 1: visibility / text
  await expect(web.ordersHeading).toBeVisible();
  await expect(web.ordersHeading).toContainText('Lịch sử đơn hàng');
  await expect(web.orderRowById(orderId)).toBeVisible();

  // Pattern 2: value / attribute / navigation
  await expect(page).toHaveURL(/\/profile/);

  const statusLabels: Record<string, RegExp> = {
    pending: /Chờ xác nhận|pending/i,
    confirmed: /Đã xác nhận|confirmed/i,
    shipping: /Đang giao|shipping/i,
    delivered: /Đã giao|delivered/i,
    canceled: /Đã hủy|canceled/i,
  };
  await expect(web.statusBadge(orderId)).toContainText(
    statusLabels[opts.startStatus] ?? new RegExp(opts.startStatus, 'i'),
  );

  switch (opts.expected) {
    case 'ui_cancel_hidden': {
      await web.expectCancelHidden(orderId);
      break;
    }
    case 'ui_cancel_visible': {
      await web.expectCancelVisible(orderId);
      await expect(web.cancelButton(orderId)).toBeEnabled();
      break;
    }
    case 'ui_bug_b2': {
      // Business: shipping cancel button must be hidden (BUG-B2 if visible)
      await expect(
        web.cancelButton(orderId),
        'BUG-B2: Hủy đơn must be hidden for shipping orders',
      ).toHaveCount(0);
      break;
    }
    default:
      throw new Error(`Unknown UI web expected_result: ${opts.expected}`);
  }
}

async function runAdminUiCase(
  page: Page,
  request: APIRequestContext,
  opts: { startStatus: string; expected: string },
): Promise<void> {
  const userToken = await loginApi(request, USER_CREDENTIALS);
  const adminToken = await loginApi(request, ADMIN_CREDENTIALS);
  const orderId = await createPendingOrder(request, userToken);
  await setOrderStatus(request, adminToken, orderId, opts.startStatus);

  await loginAsAdmin(page);
  const admin = new OrdersAdminPage(page);
  await admin.openOrdersTab();

  // Pattern 1: visibility
  await expect(admin.ordersHeading).toBeVisible();
  await expect(admin.orderRowById(orderId)).toBeVisible();

  // Pattern 2: navigation / enabled
  await expect(admin.confirmButton(orderId)).toBeVisible();
  await expect(admin.confirmButton(orderId)).toBeEnabled();
  await expect(admin.cancelButton(orderId)).toBeVisible();

  if (opts.expected === 'ui_admin_confirm') {
    await admin.confirmButton(orderId).click();
    await admin.expectStatusLabel(orderId, /Đã xác nhận/i);
    // Pattern 3: verify via API
    const after = await getOrder(request, orderId);
    expect(after.status).toBe('confirmed');
  } else {
    throw new Error(`Unknown UI admin expected_result: ${opts.expected}`);
  }
}
