import { test, expect, type APIRequestContext, type Page } from '@playwright/test';
import * as path from 'path';
import { loadCsv } from '../helpers/csv';
import { reportTitle, STUDENT_ID } from '../helpers/report-meta';
import { loginAsUser, USER_CREDENTIALS } from '../helpers/auth';
import { ProfilePage } from '../pages/profile.page';

const API_BASE = process.env.API_BASE_URL ?? 'http://localhost:3000';
const CSV_PATH = path.join(__dirname, '../data/fr04-profile.csv');
const SCREENSHOT_DIR = path.join(__dirname, '../../screenshots');

const rows = loadCsv(CSV_PATH);

function expandAddress(raw: string): string {
  if (raw === '__LONG_600__') return 'A'.repeat(600);
  return raw;
}

async function loginApi(
  request: APIRequestContext,
): Promise<{ token: string; user: Record<string, unknown> }> {
  const res = await request.post(`${API_BASE}/api/login`, {
    data: {
      email: USER_CREDENTIALS.email,
      password: USER_CREDENTIALS.password,
    },
  });
  expect(res.ok()).toBeTruthy();
  return res.json();
}

async function restoreProfile(
  request: APIRequestContext,
  token: string,
): Promise<void> {
  await request.put(`${API_BASE}/api/users/me`, {
    headers: { Authorization: `Bearer ${token}` },
    data: {
      name: 'Test User',
      phone: '912345678',
      shipping_address: 'Default Address',
      role: 'user',
    },
  });
}

test.describe(`FR-04 Profile | Run by: ${STUDENT_ID}`, () => {
  // One worker + afterEach restore avoids races on the shared seeded user.
  test.describe.configure({ mode: 'default' });

  test.beforeAll(() => {
    expect(rows.length).toBeGreaterThanOrEqual(12);
  });

  test.beforeEach(async ({}, testInfo) => {
    testInfo.annotations.push({
      type: 'metadata',
      description: reportTitle('FR-04 Profile'),
    });
  });

  test.afterEach(async ({ page, request }, testInfo) => {
    if (testInfo.status !== testInfo.expectedStatus) {
      const match = testInfo.title.match(/^(FR04-[A-Z]+-\d+)/);
      const id = match?.[1] ?? 'unknown';
      try {
        await page.screenshot({
          path: path.join(SCREENSHOT_DIR, `fr04-${id}.png`),
          fullPage: true,
        });
      } catch {
        /* page may be closed */
      }
    }
    try {
      const { token } = await loginApi(request);
      await restoreProfile(request, token);
    } catch {
      /* best-effort restore between cases */
    }
  });

  for (const row of rows) {
    test(`${row.tc_id} ${row.scenario}`, async ({ page, request }) => {
      const name = row.name;
      const phone = row.phone;
      const address = expandAddress(row.shipping_address);
      const channel = row.channel;
      const expected = row.expected_result;

      if (channel === 'ui') {
        await runUiCase(page, request, {
          tcId: row.tc_id,
          name,
          phone,
          address,
          expected,
        });
      } else {
        await runApiCase(page, request, {
          tcId: row.tc_id,
          name,
          phone,
          address,
          role: row.role,
          expected,
        });
      }
    });
  }
});

async function runUiCase(
  page: Page,
  request: APIRequestContext,
  opts: {
    tcId: string;
    name: string;
    phone: string;
    address: string;
    expected: string;
  },
): Promise<void> {
  await loginAsUser(page);
  const profile = new ProfilePage(page);
  await profile.goto();
  await profile.expectLoaded();

  // Pattern 1: visibility / text
  await expect(profile.heading).toBeVisible();
  await expect(profile.heading).toContainText('Hồ sơ');

  await profile.fillProfile({
    name: opts.name,
    phone: opts.phone,
    shipping_address: opts.address,
  });

  // Pattern 2: value / navigation
  if (opts.name !== '') {
    await expect(profile.nameInput).toHaveValue(opts.name);
  }
  await expect(profile.phoneInput).toHaveValue(opts.phone);
  await expect(profile.addressInput).toHaveValue(opts.address);
  await expect(page).toHaveURL(/\/profile/);
  await expect(profile.updateButton).toBeEnabled();

  switch (opts.expected) {
    case 'ui_success': {
      const msg = await profile.submitAndGetAlert();
      expect(msg).toBeTruthy();
      expect(msg!).toMatch(/Cập nhật thành công/i);
      break;
    }
    case 'ui_phone_reject': {
      const msg = await profile.submitAndGetAlert();
      expect(msg).toBeTruthy();
      expect(msg!).toMatch(/Số điện thoại không hợp lệ/i);
      break;
    }
    case 'ui_vn_phone_accept': {
      // Business expectation: VN numbers starting with 0 must be accepted (BUG-A1).
      const msg = await profile.submitAndGetAlert(4000);
      expect(
        msg,
        'BUG-A1: VN phone 0… should be accepted by profile update',
      ).toMatch(/Cập nhật thành công/i);
      break;
    }
    case 'ui_html_required': {
      const blocked = await profile.isNameRequiredBlocking();
      expect(blocked).toBe(true);
      await profile.submit();
      await expect(profile.heading).toBeVisible();
      break;
    }
    case 'ui_name_reject': {
      // Business expectation: whitespace-only name should be rejected (not saved).
      const dialogPromise = page.waitForEvent('dialog', { timeout: 5000 }).catch(() => null);
      await profile.submit();
      const dialog = await dialogPromise;
      const msg = dialog ? dialog.message() : '';
      if (dialog) await dialog.accept();
      expect(msg, 'Whitespace-only name must not update successfully').not.toMatch(
        /Cập nhật thành công/i,
      );
      break;
    }
    default:
      throw new Error(`Unknown UI expected_result: ${opts.expected}`);
  }

  // Restore baseline so later cases stay stable
  const { token } = await loginApi(request);
  await restoreProfile(request, token);
}

async function runApiCase(
  page: Page,
  request: APIRequestContext,
  opts: {
    tcId: string;
    name: string;
    phone: string;
    address: string;
    role: string;
    expected: string;
  },
): Promise<void> {
  const payload: Record<string, string> = {
    name: opts.name,
    phone: opts.phone,
    shipping_address: opts.address,
  };
  if (opts.role) payload.role = opts.role;

  // Pattern 3: HTTP / API
  if (opts.expected === 'api_401') {
    const res = await request.put(`${API_BASE}/api/users/me`, { data: payload });
    expect(res.status()).toBe(401);
    const body = await res.json();
    expect(body.error).toMatch(/Unauthorized/i);
    await page.goto('/profile');
    await expect(page.getByText(/Vui lòng đăng nhập/i)).toBeVisible();
    return;
  }

  if (opts.expected === 'api_403' && opts.tcId === 'FR04-DT-16') {
    const res = await request.put(`${API_BASE}/api/users/me`, {
      headers: {
        Authorization:
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.INVALID.sig',
      },
      data: payload,
    });
    expect(res.status()).toBe(403);
    const body = await res.json();
    expect(body.error).toMatch(/Forbidden/i);
    return;
  }

  const { token } = await loginApi(request);

  if (opts.expected === 'api_400') {
    const res = await request.put(`${API_BASE}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
      data: payload,
    });
    await loginAsUser(page);
    await page.goto('/profile');
    // Business expectation: empty name via API should return 400/422 (BUG-A3).
    expect(
      res.status(),
      'BUG-A3: empty name via API should return 400/422',
    ).toBeGreaterThanOrEqual(400);
    return;
  }

  if (opts.expected === 'api_403' && opts.tcId === 'FR04-DT-14') {
    const res = await request.put(`${API_BASE}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
      data: payload,
    });
    const meRes = await request.get(`${API_BASE}/api/users/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    const me = await meRes.json();
    await loginAsUser(page);
    await page.goto('/profile');
    // Business expectation: privilege escalation blocked or role ignored (BUG-A2).
    expect(
      me.role,
      `BUG-A2: PUT with role=admin must not elevate user (HTTP ${res.status()})`,
    ).not.toBe('admin');
    return;
  }

  throw new Error(`Unhandled API case ${opts.tcId} / ${opts.expected}`);
}

// Human review: prefer getByLabel over fragile CSS nth-child selectors.

// Cover visibility, value/URL, and HTTP assertion patterns per HW04.
