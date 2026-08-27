# HW04 — AI-Assisted Playwright Automation on EShop SUT

**Họ và tên:** Đỗ Văn Hà  
**MSSV:** 23127044  
**Assignment:** HW04 — AI Automation  
**Date:** 2026-08-26  
**GitHub:** https://github.com/Donavfulish/HW04  
**GitHub Issues:** https://github.com/Donavfulish/HW04/issues  
**Demo video:** https://youtu.be/zLgJrBCsQ3c  

---

## 1. Self-Assessment Table (Section 15 — Assessment Template)

| No. | Criteria | Max Grade | Self-Assessed Grade |
|-----|----------|-----------|---------------------|
| 1 | Task 1 — Feature A (FR-04 Profile) | 25 | **25** |
| 1 | Task 1 — Feature B (FR-10 Order State) | 25 | **25** |
| 1 | Task 1 — Feature C (FR-18 Order Admin) | 25 | **25** |
| 2 | Task 2 — Demo video | 15 | **15** |
| 3 | Agent Skills | 10 | **10** |
| | **Total** | **100** | **100** |

**ZIP filename:** `23127044_HW04_AI_Automation_100.zip`

---

## 2. Test Summary Report

| Metric | Value |
|--------|-------|
| Number of features tested | **3** (FR-04, FR-10, FR-18) |
| Test cases automated | **50** |
| Test cases executed | **50** |
| TC passed (chromium baseline) | **37** |
| TC failed (bugs / expected defects) | **13** |
| Browser runs | **9** (3 features × Chromium / Firefox / WebKit) |
| Bugs discovered / documented | **13** |
| GitHub Issues | [Issues](https://github.com/Donavfulish/HW04/issues) (#1–#4, #6–#13; skip #5) |
| Agent Skill | `playwright-automation-skill` |
| Demo video | https://youtu.be/zLgJrBCsQ3c |
| Public GitHub | https://github.com/Donavfulish/HW04 |

### Per-feature breakdown (chromium)

| Feature | TC | Pass | Fail |
|---------|----|------|------|
| FR-04 Profile | 17 | 13 | 4 |
| FR-10 Order State | 18 | 15 | 3 |
| FR-18 Order Admin | 15 | 9 | 6 |
| **Total** | **50** | **37** | **13** |

> HTML reports under `reports/<feature>/<browser>/` include **Run by: 23127044** and an ISO timestamp. Bug evidence: local `screenshots/` + [`bug-report.md`](bug-report.md).  
> **Note:** WebKit FR-04 may differ slightly from the chromium baseline above; use chromium counts for the summary table.

---

## 3. Submission Contents (this folder)

```
HW04/
├── README.md
├── main-report.md / main-report.pdf
├── ai-audit.md / ai-audit.pdf
├── ai-critique.md / ai-critique.pdf
├── bug-report.md
├── demo-video-script.md
├── git-commit-log.txt
├── agent-skills/playwright-automation-skill/
├── screenshots/
├── reports/{fr04,fr10,fr18}/{chromium,firefox,webkit}/
└── tests/{specs,pages,helpers,data}/
```

---

## 4. Agent Skills & Demo Video

| Skill | Path |
|-------|------|
| playwright-automation-skill | [`agent-skills/playwright-automation-skill/SKILL.md`](agent-skills/playwright-automation-skill/SKILL.md) |

**Demo video (YouTube Unlisted):** https://youtu.be/zLgJrBCsQ3c  
Narration outline: [`demo-video-script.md`](demo-video-script.md)

---

## 5. Nộp Moodle

| File nguồn | File PDF | Trạng thái |
|------------|----------|------------|
| `main-report.md` | `main-report.pdf` | ✅ |
| `ai-audit.md` | `ai-audit.pdf` | ✅ |
| `ai-critique.md` | `ai-critique.pdf` | ✅ |

1. Commit + push docs cập nhật (GitHub / Issues / YouTube đã điền).  
2. ZIP → `23127044_HW04_AI_Automation_100.zip` (loại trừ `.sut/`, `node_modules/`, `.pw-browsers/`, …).  
3. Upload Moodle trước deadline.
