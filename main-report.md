# HW04 — Main Report: AI-Assisted Playwright Automation on EShop

**Họ và tên:** Đỗ Văn Hà  
**MSSV:** 23127044  
**Course:** Software Testing  
**Date:** 2026-08-26  
**SUT:** EShop (local) — FR-04 / FR-10 / FR-18  

---

## Executive Summary

Bài tập tự động hóa kiểm thử UI/API bằng **Playwright TypeScript**, data-driven CSV, Page Object Model, và chạy **3 trình duyệt** (Chromium / Firefox / WebKit). Áp dụng quy trình AI-First có kiểm soát (Cursor) trên 3 feature: **FR-04 Personal Profile**, **FR-10 Order State Machine**, **FR-18 Order Management Admin**.

| Metric | Giá trị |
|--------|---------|
| Features automated | 3 |
| TC automated / executed | 50 |
| Pass (chromium baseline) | 37 |
| Fail (bugs / expected defects) | 13 |
| Browser HTML report runs | 9 (3 × 3) |
| Bugs documented | 13 |
| Agent Skill | `playwright-automation-skill` |

Demo video: _(cập nhật sau khi upload YouTube)_  
GitHub: _(cập nhật sau khi tạo repo)_  

---

## 1. Phương pháp làm việc

### 1.1 Chiến lược AI-First có kiểm soát

1. **Không** dùng một mega-prompt tạo toàn bộ suite — mỗi bước (scaffold → CSV → POM → specs → multi-browser → skill → báo cáo) là một session riêng.
2. AI đọc HW02 DT/BVA tables + source SUT trước khi chọn case vào CSV (≥12 TC/feature).
3. Human review sau mỗi output: sửa selector mỏng manh, `workers`/isolation, assertion Expected theo SRS (không theo bug trong code), metadata `Run by: 23127044`.
4. Mọi session ghi vào `ai-audit.md`.

### 1.2 Quy trình automation (mọi feature)

| Bước | Hành động |
|------|-----------|
| 1 | Đọc feature scope (UI + API + role) |
| 2 | Chọn ≥12 case từ DT/BVA → CSV (`tests/data/`) |
| 3 | Viết Page Object (`tests/pages/`) |
| 4 | Spec data-driven + ≥3 kiểu assertion |
| 5 | Chạy Chromium → Firefox → WebKit; HTML report có Run by + ISO timestamp |
| 6 | AI Gap Analysis + screenshot defect → `bug-report.md` |

---

## 2. FR-04 — Personal Profile Management

**Scope:** `/profile` UI + `PUT /api/users/me`  
**Spec:** [`tests/specs/fr04-profile.spec.ts`](tests/specs/fr04-profile.spec.ts)  
**Data:** [`tests/data/fr04-profile.csv`](tests/data/fr04-profile.csv) (17 TC)  
**POM:** [`tests/pages/profile.page.ts`](tests/pages/profile.page.ts)  
**Reports:** [`reports/fr04/chromium/`](reports/fr04/chromium/) · [`firefox/`](reports/fr04/firefox/) · [`webkit/`](reports/fr04/webkit/)

### Kết quả nổi bật (chromium)

| TC ID | Phát hiện |
|-------|-----------|
| FR04-DT-02 | Phone `0912345678` bị reject — regex `^[1-9]` (**BUG-A1**) |
| FR04-DT-10 | `name=""` qua API → HTTP 200 (**BUG-A3**) |
| FR04-DT-11 | Name chỉ whitespace qua UI (**BUG-A4***) |
| FR04-DT-14 | `role=admin` trong body → privilege escalation (**BUG-A2 Critical**) |

**TC:** 17 | **Pass ~13** | **Fail ~4** | **Bugs:** 4

---

## 3. FR-10 — Order State Machine

**Scope:** Transitions `pending → confirmed → shipping → delivered` + `canceled` (web + admin)  
**Spec:** [`tests/specs/fr10-order-state.spec.ts`](tests/specs/fr10-order-state.spec.ts)  
**Data:** [`tests/data/fr10-order-state.csv`](tests/data/fr10-order-state.csv) (18 TC)  
**POM:** [`tests/pages/orders-web.page.ts`](tests/pages/orders-web.page.ts), [`orders-admin.page.ts`](tests/pages/orders-admin.page.ts)  
**Reports:** [`reports/fr10/chromium/`](reports/fr10/chromium/) · [`firefox/`](reports/fr10/firefox/) · [`webkit/`](reports/fr10/webkit/)

### Kết quả nổi bật

| TC ID | Phát hiện |
|-------|-----------|
| FR10-DT-12 | Admin `canceled → delivered` được phép (**BUG-B1**) |
| FR10-DT-17 | User hủy đơn `shipping` (**BUG-B3**) |
| FR10-DT-21 | UI hiện nút Hủy khi `shipping` (**BUG-B2**) |

**TC:** 18 | **Pass ~15** | **Fail ~3** | **Bugs:** 3

---

## 4. FR-18 — Order Management (Admin)

**Scope:** Admin dashboard revenue, status buttons, XSS shipping address, authz API  
**Spec:** [`tests/specs/fr18-order-admin.spec.ts`](tests/specs/fr18-order-admin.spec.ts)  
**Data:** [`tests/data/fr18-order-admin.csv`](tests/data/fr18-order-admin.csv) (15 TC)  
**POM:** [`tests/pages/admin.page.ts`](tests/pages/admin.page.ts)  
**Reports:** [`reports/fr18/chromium/`](reports/fr18/chromium/) · [`firefox/`](reports/fr18/firefox/) · [`webkit/`](reports/fr18/webkit/)

### Kết quả nổi bật

| TC ID | Phát hiện |
|-------|-----------|
| FR18-DT-01 / BVA-06 | Dashboard revenue ×2 (**BUG-C1 Critical**) |
| FR18-DT-11 | XSS qua `shipping_address` (**BUG-C2 Critical**) |
| FR18-DT-09 / DT-10 | Nút “Đánh dấu Đã giao” trên `canceled` → delivered (**BUG-C4**) |
| FR18-DT-17 | User JWT gọi được admin orders API (**BUG-C5\***) |

**TC:** 15 | **Pass ~9** | **Fail ~6** | **Bugs:** 5 entries (C1×2, C2, C4×2, C5)

---

## 5. Agent Skill

| Skill | Path | Trigger |
|-------|------|---------|
| playwright-automation-skill | [`agent-skills/playwright-automation-skill/SKILL.md`](agent-skills/playwright-automation-skill/SKILL.md) | “Automate feature X with Playwright”, CSV/POM/multi-browser |

Skill đóng gói workflow: đọc feature → CSV → POM → ≥3 assertion patterns → 3 browsers + Run by metadata → gap analysis + screenshot.

---

## 6. Tổng hợp kết quả

### Test coverage

| Metric | Giá trị |
|--------|---------|
| Features | 3 (FR-04, FR-10, FR-18) |
| TC automated & executed | 50 |
| Pass (chromium) | 37 |
| Fail | 13 |
| Browser runs | 9 |
| Bugs in `bug-report.md` | 13 |
| GitHub Issues | _(sẽ tạo trên repo công khai)_ |

### Per-feature (chromium baseline)

| Feature | TC | Pass | Fail |
|---------|----|------|------|
| FR-04 Profile | 17 | 13 | 4 |
| FR-10 Order State | 18 | 15 | 3 |
| FR-18 Order Admin | 15 | 9 | 6 |
| **Total** | **50** | **37** | **13** |

---

## 7. AI Gap Analysis — Automation Patterns

Các gap AI thường bỏ sót / cần human sửa:

1. **Fragile selectors** — AI thích CSS class/nth; đổi sang role/text/`getByLabel` ổn định hơn.
2. **Waits** — thiếu `waitForURL` / network idle sau login → flaky trên Firefox/WebKit.
3. **Assertions** — AI viết Expected theo behavior code (accept bug) thay vì SRS; phải assert fail khi SUT sai.
4. **Parallelism** — default `workers` gây race trên shared seed orders; human giảm workers / serialize FR-10/18.
5. **CSV vs spec drift** — cột `channel`/`expected_result` AI map sai nhánh UI vs API.
6. **Report metadata** — quên `Run by: 23127044` + ISO timestamp trong HTML title/meta.

Chi tiết defects: [`bug-report.md`](bug-report.md) · screenshots: [`screenshots/`](screenshots/).

---

## 8. Kết luận

Quy trình Playwright data-driven từng bước + human review cho suite ổn định hơn prompt “generate all tests”. Fail intentional (bug-finding) được tách khỏi flaky automation bằng review selector/wait/`workers`. Agent Skill chứng minh workflow tái sử dụng cho feature mới mà không viết lại scaffold từ đầu.

---

## Phụ lục — Link tài liệu

| Feature | Spec | CSV | Reports |
|---------|------|-----|---------|
| FR-04 | [fr04-profile.spec.ts](tests/specs/fr04-profile.spec.ts) | [fr04-profile.csv](tests/data/fr04-profile.csv) | [reports/fr04/](reports/fr04/) |
| FR-10 | [fr10-order-state.spec.ts](tests/specs/fr10-order-state.spec.ts) | [fr10-order-state.csv](tests/data/fr10-order-state.csv) | [reports/fr10/](reports/fr10/) |
| FR-18 | [fr18-order-admin.spec.ts](tests/specs/fr18-order-admin.spec.ts) | [fr18-order-admin.csv](tests/data/fr18-order-admin.csv) | [reports/fr18/](reports/fr18/) |

| Tài liệu khác | Markdown | PDF |
|---------------|----------|-----|
| Bug report | [bug-report.md](bug-report.md) | — |
| AI Audit | [ai-audit.md](ai-audit.md) | [ai-audit.pdf](ai-audit.pdf) |
| AI Critique | [ai-critique.md](ai-critique.md) | [ai-critique.pdf](ai-critique.pdf) |
| README | [README.md](README.md) | — |
| Demo script | [demo-video-script.md](demo-video-script.md) | — |
| Git commit log | [git-commit-log.txt](git-commit-log.txt) | — |

> Bản PDF: [main-report.pdf](main-report.pdf)
