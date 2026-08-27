# Examples — Playwright Automation Skill

## Example A: Automate FR-04 Profile (end-to-end)

**User prompt**
> Apply playwright-automation-skill: automate FR-04 profile update from our DT table; student Đỗ Văn Hà / MSSV 23127044.

**Agent actions (condensed)**

1. **Read feature** — `Profile.jsx` + `PUT /api/users/me`; known bugs A1/A2/A3.
2. **CSV** — create `tests/data/fr04-profile.csv` with ≥12 rows (happy phone, VN `0…`, empty name API, whitespace name, role escalation, …).
3. **POM** — `tests/pages/profile.page.ts` (`goto`, `fillName`, `fillPhone`, `submit`, alerts).
4. **Spec** — `tests/specs/fr04-profile.spec.ts` loads CSV; mixes UI + `page.request` cases.
5. **Assertions**
   - Visibility: heading `Hồ sơ`, error alert text  
   - Value/nav: `toHaveValue`, `toHaveURL(/\/profile/)`  
   - HTTP: status + `body.role` / `body.error`
6. **Browsers**
   ```bash
   PLAYWRIGHT_HTML_OUTPUT_DIR=../reports/fr04/chromium \
     npx playwright test specs/fr04-profile.spec.ts --project=chromium --workers=1
   # repeat firefox, webkit
   ```
7. **Metadata** — `test.describe(\`FR-04 Profile | Run by: 23127044\`)` + `reportTitle(...)`.
8. **Evidence** — on intentional fails, save screenshots under `screenshots/`; append `bug-report.md` (Issue sẽ tạo trên repo).
9. **Gap fix** — human review: fix CSV parser so quoted `"   "` name is not trimmed; keep `--workers=1`.

**Expected outcome:** ~13 pass / 4 fail on Chromium (fails = documented SUT defects), HTML reports under `reports/fr04/{chromium,firefox,webkit}/`.

---

## Example B: Add one new negative API case to an existing suite

**User prompt**
> Add a CSV row: missing Authorization on profile GET should be 401; keep data-driven.

**Agent actions**

1. Append row to CSV (`tc_id`, `channel=api`, `expected=401`).
2. Extend spec branch for that `tc_id` only — no inline fixture array.
3. Assert with pattern 3 (HTTP).
4. Re-run one browser project; confirm report still shows `Run by: 23127044`.
5. If this reveals a new defect, screenshot + bug-report entry; else leave green.

---

## Example C: Demo narration hook (video)

When helping write `demo-video-script.md`, ensure the outline covers:

1. Terminal `whoami` + `hostname`
2. One feature × three browsers
3. Open HTML report and point to `Run by: 23127044`
4. Narrate one human-review AI fix (e.g. CSV whitespace / workers / selectors)
