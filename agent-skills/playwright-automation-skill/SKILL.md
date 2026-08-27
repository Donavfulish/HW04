---
name: playwright-automation-skill
description: >-
  Reusable Playwright TypeScript workflow for data-driven UI/API automation:
  read a feature, build CSV cases, POM pages, ≥3 assertion patterns, multi-browser
  HTML reports with Run by metadata, then gap analysis and bug evidence. Use when
  the user asks to automate a feature with Playwright, generate CSV-driven specs,
  add Page Object models, run chromium/firefox/webkit reports, capture defect
  screenshots, or mirror the HW04 .cursor/rules automation pipeline.
---

# Playwright Automation Skill (HW04-style)

Student metadata default: **Đỗ Văn Hà** / MSSV `23127044`.

## When to apply (trigger phrases)

Apply this skill when the user says things like:

- “Automate feature X with Playwright”
- “Data-driven CSV tests / Page Object / multi-browser HTML report”
- “Generate specs from DT/BVA tables”
- “Add Run by metadata / assertion patterns / bug screenshots”
- “Reuse the HW04 automation workflow on another feature”

## Preconditions

- Work only under the agreed project root (for this course: `HW04/` only; never touch sibling homework folders or push SUT upstream).
- SUT URLs (defaults): backend `http://localhost:3000`, web `http://localhost:5173`, admin `http://localhost:5174`.
- Playwright TS layout: `tests/` with `package.json`, `playwright.config.ts`, `specs/`, `pages/`, `helpers/`, `data/`.

## Stepwise workflow

Follow these steps **in order**. Do not skip CSV or report metadata.

### 1. Read the feature

- Identify scope: screens, APIs, roles (user vs admin), known defects from prior analysis.
- List channels: `ui`, `api`, `ui_admin`, etc.
- Pull candidate cases from domain/BVA/decision tables (≥12 rows per feature).

### 2. Author CSV test data

- Put variable inputs in `tests/data/<feature>.csv`.
- Columns typically: `tc_id`, inputs, `expected`, `type` / `channel`.
- Load via a shared helper (e.g. `tests/helpers/csv.ts`) — **no** hardcoded primary arrays in specs.
- Preserve quoted fields (spaces, commas) correctly in the CSV parser.
- Mix positive, negative, and edge cases; all count toward ≥12.

### 3. Build Page Object Model (POM)

- One page class per major surface under `tests/pages/` (e.g. `profile.page.ts`, `orders-web.page.ts`, `admin.page.ts`).
- Prefer role/label/testid locators over brittle CSS chains.
- Specs orchestrate; pages encapsulate navigation and actions.

### 4. Write the spec + ≥3 assertion patterns

In `tests/specs/<feature>.spec.ts`, use at least:

1. **Visibility / text** — headings, alerts, badges, button presence.
2. **Value / attribute / navigation** — `toHaveValue`, `toHaveURL`, `toBeEnabled`.
3. **HTTP / API** — `page.request` status + body fields.

Failing assertions that prove **real SUT defects** are expected when documenting bugs — do not weaken assertions just to go green.

### 5. Multi-browser runs

- Projects in `playwright.config.ts`: `chromium`, `firefox`, `webkit`.
- Run each feature once per project (≥9 runs for 3 features × 3 browsers).
- Prefer `--workers=1` when tests share seeded users/orders to avoid races.

Example:

```bash
cd tests
PLAYWRIGHT_HTML_OUTPUT_DIR=../reports/<feature>/<browser> \
  npx playwright test specs/<feature>.spec.ts --project=<browser> --workers=1
```

### 6. Report metadata (authorship)

- Every HTML report under `reports/<feature>/<browser>/` must visibly show:
  - `Run by: <studentId>` (default `23127044`)
  - An ISO timestamp (title, header, footer, or annotation / `reportTitle` helper).
- Inject via suite title and/or `test.info().annotations` — not only a comment in source.

### 7. Evidence & bug report

When automation reveals a real defect:

1. Save screenshot under `screenshots/` (descriptive name, e.g. `fr04-FR04-DT-02.png`).
2. Append `bug-report.md`: bug id, feature, steps, expected vs actual, screenshot path.
3. Ghi chú GitHub Issue _(sẽ tạo trên repo)_ và đường dẫn screenshot trong `bug-report.md`.

### 8. Gap analysis (human review)

After AI-generated drafts, critically review and fix:

| Common AI miss | Why | Human fix |
|----------------|-----|-----------|
| Fragile CSS selectors | Model copies class names that change | Prefer getByRole / label / testid |
| Weak assertions | Only checks “page loaded” | Assert status, message, API body |
| Truncated CSV fields | Naive `split(',')` | Quote-aware parser; keep spaces |
| Parallel flaky shared state | Default workers > 1 | Serial / `--workers=1` + cleanup |
| Missing report authorship | Forgot homework constraint | `report-meta` + describe title |
| Missing negative/edge rows | Prompt listed happy path only | Expand CSV from BVA/DT |

Document gaps in the main report / demo narration when required.

## Mirror of project rules

This skill mirrors the course rule set (keep behavior aligned):

| Rule theme | Skill step |
|------------|------------|
| Scope boundary | Preconditions |
| Playwright layout + 3 browsers + HTML paths | Steps 5–6 |
| CSV-only primary data ≥12 | Step 2 |
| ≥3 assertion patterns | Step 4 |
| Screenshots + bug-report | Step 7 |
| Deliverables checklist | Verify reports/, bug-report, skill, demo script before “done” |

## Done checklist

- [ ] CSV ≥12 rows; loaded by helper
- [ ] POM + spec; ≥3 assertion patterns
- [ ] Chromium + Firefox + WebKit HTML reports with `Run by` + ISO time
- [ ] Real defects → `screenshots/` + `bug-report.md`
- [ ] Gap analysis notes for fragile selectors / waits / assertions / data
- [ ] No unauthorized git push / upstream SUT push

See `examples.md` for a concrete FR-04 walkthrough.
