# AI Audit Report — HW04 Playwright Automation

**Họ và tên:** Đỗ Văn Hà  
**MSSV:** 23127044  
**Course:** Software Testing  
**Assignment:** HW04 — AI-Assisted Test Automation on EShop SUT  
**Tool:** Cursor (Claude)  
**Repo:** _(cập nhật sau khi tạo repo)_  

---

## AI Declaration (Section 9)

**I use AI tools for the following tasks:**

- **Tool:** Cursor (Claude) — primary AI assistant for the entire assignment
- **Tasks:** Playwright scaffold, CSV data design from HW02 DT/BVA, Page Object models, data-driven specs, multi-browser HTML reports, Agent Skill authoring, bug evidence capture, main report / README / critique drafting
- **Human review:** All AI outputs reviewed and corrected before keeping; scripts executed locally on Chromium/Firefox/WebKit; failing cases cross-checked against SRS; screenshots saved under `screenshots/`; GitHub Issues sẽ tạo trên repo công khai

---

## Quy ước ghi chép

Mọi interaction với AI trong bài này đều được ghi lại theo format:

| Field | Nội dung |
|-------|---------|
| Session ID | Số thứ tự session |
| Tool | Tên AI tool sử dụng |
| Date/Time | Ngày giờ (UTC+7) |
| Phase | Khối công việc (setup / FR-04 / FR-10 / …) |
| Prompt tóm tắt | Nội dung câu hỏi/yêu cầu gửi cho AI |
| Output tóm tắt | Kết quả AI trả về |
| Human review | Bổ sung/chỉnh sửa sau khi review |

---

## Session 1 — Setup & kế hoạch automation

| Field | Nội dung |
|-------|---------|
| **Session ID** | S01 |
| **Tool** | Cursor (Claude) |
| **Date/Time** | 2026-08-26 09:15 UTC+7 |
| **Phase** | Setup — Lập kế hoạch |
| **Prompt tóm tắt** | Phân tích đề HW04 + HW02 artifacts; chọn 3 feature FR-04/10/18; đề xuất layout Playwright TS dưới `tests/`, CSV data-driven, 3 browsers, HTML report metadata `Run by: 23127044`, và checklist deliverables. |
| **Output tóm tắt** | AI đề xuất cây thư mục `tests/{specs,pages,helpers,data}`, map defect kỳ vọng từ HW02, kế hoạch session theo feature, nhấn mạnh không push SUT upstream. |
| **Human review** | Giữ 3 feature; xác nhận MSSV 23127044 và họ tên Đỗ Văn Hà; bỏ ý tưởng Allure (dùng Playwright HTML reporter). |

---

## Session 2 — Playwright scaffold & helpers

| Field | Nội dung |
|-------|---------|
| **Session ID** | S02 |
| **Tool** | Cursor (Claude) |
| **Date/Time** | 2026-08-26 10:40 UTC+7 |
| **Phase** | Setup — Scaffold |
| **Prompt tóm tắt** | Tạo `package.json`, `playwright.config.ts` (chromium/firefox/webkit), helper `loadCsv`, helper report title/`Run by` + ISO timestamp; base URL localhost backend/web/admin. |
| **Output tóm tắt** | Scaffold chạy được; config projects 3 browsers; helpers CSV + report-meta. |
| **Human review** | Sửa path browser cache; kiểm tra SUT `.sut/` đã chạy; không commit. |

---

## Session 3 — FR-04 CSV + POM + specs

| Field | Nội dung |
|-------|---------|
| **Session ID** | S03 |
| **Tool** | Cursor (Claude) |
| **Date/Time** | 2026-08-26 12:05 UTC+7 |
| **Phase** | FR-04 Profile |
| **Prompt tóm tắt** | Từ bảng DT/BVA HW02 FR-04, sinh CSV ≥12 TC (UI+API), `profile.page.ts`, và `fr04-profile.spec.ts` với ≥3 kiểu assertion; expect fail cho BUG-A1/A2/A3. |
| **Output tóm tắt** | `fr04-profile.csv` (17 rows), POM profile, spec data-driven cover happy path + phone VN `0` + empty name API + role escalation. |
| **Human review** | Đổi selector từ `.form-control:nth-child` sang `getByLabel`/placeholder; sửa expected SRS cho DT-02 (accept VN phone). Chạy Chromium: ~13 pass / 4 fail. |

---

## Session 4 — FR-10 order state automation

| Field | Nội dung |
|-------|---------|
| **Session ID** | S04 |
| **Tool** | Cursor (Claude) |
| **Date/Time** | 2026-08-26 14:30 UTC+7 |
| **Phase** | FR-10 Order State Machine |
| **Prompt tóm tắt** | Automate FR-10: CSV transitions hợp lệ/không hợp lệ, role user vs admin, POM orders web + admin, assert status text và nút Hủy. |
| **Output tóm tắt** | `fr10-order-state.csv` (18 TC), `orders-web.page.ts`, `orders-admin.page.ts`, spec cover B1/B2/B3. |
| **Human review** | Thêm wait sau transition; giảm parallel vì seed order bị đụng; Chromium ~15 pass / 3 fail. |

---

## Session 5 — FR-18 admin panel automation

| Field | Nội dung |
|-------|---------|
| **Session ID** | S05 |
| **Tool** | Cursor (Claude) |
| **Date/Time** | 2026-08-26 16:20 UTC+7 |
| **Phase** | FR-18 Order Admin |
| **Prompt tóm tắt** | Automate FR-18: revenue dashboard, XSS shipping_address, nút mark delivered trên canceled, authz user JWT → admin API; CSV + POM admin. |
| **Output tóm tắt** | `fr18-order-admin.csv` (15 TC), `admin.page.ts`, specs assert revenue×2, XSS, C4, C5. |
| **Human review** | Fix parse số doanh thu (locale); assertion XSS dùng frame/locator an toàn hơn; Chromium ~9 pass / 6 fail. |

---

## Session 6 — Multi-browser HTML reports

| Field | Nội dung |
|-------|---------|
| **Session ID** | S06 |
| **Tool** | Cursor (Claude) |
| **Date/Time** | 2026-08-26 18:45 UTC+7 |
| **Phase** | Multi-browser runs |
| **Prompt tóm tắt** | Chạy từng feature trên chromium/firefox/webkit; output HTML vào `reports/<feature>/<browser>/`; đảm bảo title/meta có `Run by: 23127044` + ISO timestamp. |
| **Output tóm tắt** | 9 thư mục report `index.html`; hướng dẫn copy outputDir theo project. |
| **Human review** | Xác nhận 9 reports mở được; WebKit chậm hơn — tăng timeout nhẹ; không đổi logic test. |

---

## Session 7 — Bug screenshots & bug-report

| Field | Nội dung |
|-------|---------|
| **Session ID** | S07 |
| **Tool** | Cursor (Claude) |
| **Date/Time** | 2026-08-26 20:10 UTC+7 |
| **Phase** | Evidence |
| **Prompt tóm tắt** | Từ các TC fail, chụp screenshot local và viết `bug-report.md` (steps/expected/actual) cho các defect phát hiện. |
| **Output tóm tắt** | `bug-report.md` + files dưới `screenshots/fr04-*`, `fr10-*`, `fr18-*`. |
| **Human review** | Đối chiếu severity với HW02; chuẩn bị tạo GitHub Issues kèm ảnh. |

---

## Session 8 — Agent Skill

| Field | Nội dung |
|-------|---------|
| **Session ID** | S08 |
| **Tool** | Cursor (Claude) |
| **Date/Time** | 2026-08-26 21:00 UTC+7 |
| **Phase** | Agent Skills |
| **Prompt tóm tắt** | Viết `agent-skills/playwright-automation-skill/SKILL.md` tái sử dụng: trigger phrases, workflow CSV→POM→assertions→multi-browser→gap analysis; kèm `examples.md` FR-04. |
| **Output tóm tắt** | Skill + examples walkthrough incremental CSV và demo hooks. |
| **Human review** | Rút gọn description; gắn MSSV 23127044 / Đỗ Văn Hà vào metadata mặc định. |

---

## Session 9 — Demo script outline

| Field | Nội dung |
|-------|---------|
| **Session ID** | S09 |
| **Tool** | Cursor (Claude) |
| **Date/Time** | 2026-08-26 21:35 UTC+7 |
| **Phase** | Demo video prep |
| **Prompt tóm tắt** | Viết `demo-video-script.md` ≥5 phút tiếng Việt: whoami/hostname → FR-04 × 3 browsers → mở HTML report → kể 1 lần sửa AI (CSV/`workers`). |
| **Output tóm tắt** | Kịch bản narration có timestamp ước lượng. |
| **Human review** | Giữ kịch bản; link YouTube sẽ cập nhật sau khi quay và upload. |

---

## Session 10 — Main report, README, critique

| Field | Nội dung |
|-------|---------|
| **Session ID** | S10 |
| **Tool** | Cursor (Claude) |
| **Date/Time** | 2026-08-26 22:15 UTC+7 |
| **Phase** | Documentation package |
| **Prompt tóm tắt** | Viết `main-report.md` (AI-first + per-feature + gap analysis), `README.md` self-assessment 100 + test summary, `ai-critique.md` 200–300 từ. |
| **Output tóm tắt** | Bộ Markdown Moodle-ready; metrics 3 features / 50 TC / 9 browser runs / 13 bugs. |
| **Human review** | Điền họ tên Đỗ Văn Hà + MSSV 23127044; kiểm tra word count critique; xuất PDF. |

---

*File này được cập nhật sau mỗi session AI. Mọi output AI đều qua human review trước khi nộp.*
