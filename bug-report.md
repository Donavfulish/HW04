# HW04 — Bug Report (Playwright automation)

**Họ và tên:** Đỗ Văn Hà  
**MSSV:** 23127044  
**Date:** 2026-08-26  
**SUT:** EShop (local) — FR-04 / FR-10 / FR-18  
**Evidence:** `screenshots/` + [GitHub Issues](https://github.com/Donavfulish/HW04/issues)  
**Repo:** https://github.com/Donavfulish/HW04

> Theo đề bài: mỗi defect ghi steps / expected / actual + screenshot; Issue trên GitHub kèm ảnh.

---

## 1. Bug Summary

| Bug ID | Feature | Severity | TC | Mô tả ngắn | Screenshot | GitHub Issue |
|--------|---------|----------|-----|------------|------------|--------------|
| BUG-A1 | FR-04 | High | FR04-DT-02 | Phone regex từ chối số VN bắt đầu `0` | `screenshots/fr04-BUG-A1-phone.png` | [#1](https://github.com/Donavfulish/HW04/issues/1) |
| BUG-A3 | FR-04 | Medium | FR04-DT-10 | API chấp nhận `name` rỗng | `screenshots/fr04-BUG-A3-empty-name.png` | [#2](https://github.com/Donavfulish/HW04/issues/2) |
| BUG-A4* | FR-04 | Medium | FR04-DT-11 | UI chấp nhận tên chỉ khoảng trắng | `screenshots/fr04-BUG-A4-whitespace-name.png` | [#3](https://github.com/Donavfulish/HW04/issues/3) |
| BUG-A2 | FR-04 | Critical | FR04-DT-14 | User tự gán `role=admin` qua PUT | `screenshots/fr04-BUG-A2-role-escalation.png` | [#4](https://github.com/Donavfulish/HW04/issues/4) |
| BUG-B1 | FR-10 | High | FR10-DT-12 | Admin cho phép `canceled → delivered` | `screenshots/fr10-BUG-B1-canceled-to-delivered.png` | — (local only; skip #5 duplicate) |
| BUG-B3 | FR-10 | High | FR10-DT-17 | User hủy được đơn `shipping` | `screenshots/fr10-BUG-B3-cancel-shipping.png` | [#6](https://github.com/Donavfulish/HW04/issues/6) |
| BUG-B2 | FR-10 | Medium | FR10-DT-21 | UI hiện nút Hủy khi `shipping` | `screenshots/fr10-BUG-B2-cancel-btn-shipping.png` | [#7](https://github.com/Donavfulish/HW04/issues/7) |
| BUG-C1 | FR-18 | Critical | FR18-DT-01 | Dashboard doanh thu ×2 | `screenshots/fr18-BUG-C1-revenue-double.png` | [#8](https://github.com/Donavfulish/HW04/issues/8) |
| BUG-C1 | FR-18 | Critical | FR18-BVA-06 | Doanh thu ×2 (BVA 100k) | `screenshots/fr18-BUG-C1-revenue-bva.png` | [#9](https://github.com/Donavfulish/HW04/issues/9) |
| BUG-C2 | FR-18 | Critical | FR18-DT-11 | XSS qua `shipping_address` | `screenshots/fr18-BUG-C2-xss.png` | [#10](https://github.com/Donavfulish/HW04/issues/10) |
| BUG-C4 | FR-18 | Medium | FR18-DT-09 | Nút “Đánh dấu Đã giao” trên `canceled` | `screenshots/fr18-BUG-C4-mark-delivered-btn.png` | [#11](https://github.com/Donavfulish/HW04/issues/11) |
| BUG-C4 | FR-18 | Medium | FR18-DT-10 | Click → `canceled` thành `delivered` | `screenshots/fr18-BUG-C4-click-delivered.png` | [#12](https://github.com/Donavfulish/HW04/issues/12) |
| BUG-C5* | FR-18 | High | FR18-DT-17 | User JWT gọi được admin orders API | `screenshots/fr18-BUG-C5-user-admin-api.png` | [#13](https://github.com/Donavfulish/HW04/issues/13) |

\* ID nội bộ HW04 (không trùng bảng HW02); vẫn log đầy đủ cho Issues.

**Tổng defect entries:** 13 | Critical 4 | High 4 | Medium 5

---

## 2. FR-04 — Profile

### BUG-A1 — Phone regex từ chối số VN (`0…`)

**Severity:** High · **TC:** FR04-DT-02 · **Channel:** UI  
**GitHub Issue:** https://github.com/Donavfulish/HW04/issues/1

**Steps**
1. Đăng nhập user thường → mở `/profile`.
2. Nhập SĐT hợp lệ VN: `0912345678`, giữ tên/địa chỉ hợp lệ.
3. Bấm **Cập nhật**.

**Expected:** Cập nhật thành công; SĐT được lưu.  
**Actual:** Alert *"Số điện thoại không hợp lệ…"* (regex `^[1-9]…` loại trừ số `0`).  
**Screenshot:** `screenshots/fr04-BUG-A1-phone.png`

---

### BUG-A3 — API chấp nhận `name` rỗng

**Severity:** Medium · **TC:** FR04-DT-10 · **Channel:** API  
**GitHub Issue:** https://github.com/Donavfulish/HW04/issues/2

**Steps**
1. Lấy JWT user hợp lệ.
2. `PUT /api/users/me` với body `{"name":"","phone":"0912345678",…}`.

**Expected:** HTTP 400/422 (name bắt buộc).  
**Actual:** HTTP 200 — *"Profile updated"*.  
**Screenshot:** `screenshots/fr04-BUG-A3-empty-name.png`

---

### BUG-A4* — Tên chỉ khoảng trắng được chấp nhận (UI)

**Severity:** Medium · **TC:** FR04-DT-11 · **Channel:** UI  
**GitHub Issue:** https://github.com/Donavfulish/HW04/issues/3

**Steps**
1. `/profile` → nhập `name` = `"   "` (chỉ space), phone hợp lệ.
2. Bấm **Cập nhật**.

**Expected:** Từ chối tên vô nghĩa / trim + validate.  
**Actual:** Alert *"Cập nhật thành công!"*.  
**Screenshot:** `screenshots/fr04-BUG-A4-whitespace-name.png`

---

### BUG-A2 — Privilege escalation `role=admin`

**Severity:** Critical · **TC:** FR04-DT-14 · **Channel:** API  
**GitHub Issue:** https://github.com/Donavfulish/HW04/issues/4

**Steps**
1. JWT user thường.
2. `PUT /api/users/me` kèm `"role":"admin"`.
3. `GET /api/users/me` kiểm tra `role`.

**Expected:** 403 hoặc bỏ qua field `role`.  
**Actual:** HTTP 200; `role` trở thành `admin`.  
**Screenshot:** `screenshots/fr04-BUG-A2-role-escalation.png`

---

## 3. FR-10 — Order State

### BUG-B1 — Admin: `canceled → delivered`

**Severity:** High · **TC:** FR10-DT-12 · **Channel:** API (+ UI)  
**GitHub Issue:** — (không dùng #5; evidence local `screenshots/fr10-BUG-B1-canceled-to-delivered.png`)

**Steps**
1. Tạo order → admin set `canceled`.
2. `PUT /api/admin/orders/:id/status` `{ "status": "delivered" }`  
   (UI cũng hiện “Đánh dấu Đã giao”).

**Expected:** HTTP 400 — transition không hợp lệ (terminal).  
**Actual:** HTTP 200; status = `delivered`.  
**Screenshot:** `screenshots/fr10-BUG-B1-canceled-to-delivered.png`

---

### BUG-B3 — User hủy đơn đang `shipping`

**Severity:** High · **TC:** FR10-DT-17 · **Channel:** API  
**GitHub Issue:** https://github.com/Donavfulish/HW04/issues/6

**Steps**
1. Order của user ở trạng thái `shipping`.
2. `PUT /api/orders/:id/cancel` với JWT owner.

**Expected:** HTTP 400 — không được hủy khi đang giao.  
**Actual:** HTTP 200; order → `canceled`.  
**Screenshot:** `screenshots/fr10-BUG-B3-cancel-shipping.png`

---

### BUG-B2 — Nút “Hủy đơn” hiện khi `shipping`

**Severity:** Medium · **TC:** FR10-DT-21 · **Channel:** UI  
**GitHub Issue:** https://github.com/Donavfulish/HW04/issues/7

**Steps**
1. Đăng nhập user → Profile → lịch sử đơn.
2. Quan sát order status **Đang giao** (`shipping`).

**Expected:** Nút **Hủy đơn** ẩn.  
**Actual:** Nút **Hủy đơn** visible và clickable.  
**Screenshot:** `screenshots/fr10-BUG-B2-cancel-btn-shipping.png`

---

## 4. FR-18 — Order Admin

### BUG-C1 — Doanh thu dashboard ×2 (typical)

**Severity:** Critical · **TC:** FR18-DT-01 · **Channel:** UI  
**GitHub Issue:** https://github.com/Donavfulish/HW04/issues/8

**Steps**
1. Admin dashboard → ghi nhận doanh thu hiện tại.
2. Seed 1 order `delivered` amount = 500 000 ₫ → refresh dashboard.

**Expected:** Delta = 500 000 ₫.  
**Actual:** Delta = 1 000 000 ₫ (`total_amount * 2`).  
**Screenshot:** `screenshots/fr18-BUG-C1-revenue-double.png`

---

### BUG-C1 — Doanh thu ×2 (BVA)

**Severity:** Critical · **TC:** FR18-BVA-06 · **Channel:** UI  
**GitHub Issue:** https://github.com/Donavfulish/HW04/issues/9

**Steps:** Giống trên với amount = 100 000 ₫.  
**Expected:** Delta = 100 000 ₫.  
**Actual:** Delta = 200 000 ₫.  
**Screenshot:** `screenshots/fr18-BUG-C1-revenue-bva.png`

---

### BUG-C2 — XSS qua địa chỉ giao hàng

**Severity:** Critical · **TC:** FR18-DT-11 · **Channel:** UI  
**GitHub Issue:** https://github.com/Donavfulish/HW04/issues/10

**Steps**
1. Tạo order với `shipping_address` chứa payload HTML/`onerror`.
2. Admin → tab Đơn hàng → xem địa chỉ.

**Expected:** Chỉ text đã escape.  
**Actual:** `<img>` render; script/handler chạy.  
**Screenshot:** `screenshots/fr18-BUG-C2-xss.png`

---

### BUG-C4 — Nút mark-delivered trên order `canceled`

**Severity:** Medium · **TC:** FR18-DT-09 · **Channel:** UI  
**GitHub Issue:** https://github.com/Donavfulish/HW04/issues/11

**Steps**
1. Admin Orders → order status `canceled`.
2. Kiểm tra action buttons.

**Expected:** Không có nút chuyển trạng thái.  
**Actual:** Nút **Đánh dấu Đã giao** vẫn hiện.  
**Screenshot:** `screenshots/fr18-BUG-C4-mark-delivered-btn.png`

---

### BUG-C4 — Click chuyển `canceled → delivered`

**Severity:** Medium · **TC:** FR18-DT-10 · **Channel:** UI  
**GitHub Issue:** https://github.com/Donavfulish/HW04/issues/12

**Steps**
1. Trên order `canceled`, bấm **Đánh dấu Đã giao**.

**Expected:** Status giữ `canceled` / lỗi transition.  
**Actual:** Status thành `delivered`.  
**Screenshot:** `screenshots/fr18-BUG-C4-click-delivered.png`

---

### BUG-C5* — User JWT gọi `GET /api/admin/orders`

**Severity:** High · **TC:** FR18-DT-17 · **Channel:** API  
**GitHub Issue:** https://github.com/Donavfulish/HW04/issues/13

**Steps**
1. JWT user thường (không phải admin).
2. `GET /api/admin/orders`.

**Expected:** HTTP 403.  
**Actual:** HTTP 200 — thiếu kiểm tra role phía server.  
**Screenshot:** `screenshots/fr18-BUG-C5-user-admin-api.png`

---

## 5. Ghi chú nộp bài

- Screenshot evidence lưu tại `screenshots/` (mỗi file tương ứng một bug trong bảng summary).
- GitHub Issues: https://github.com/Donavfulish/HW04/issues (#1–#4, #6–#13; bỏ #5 trùng A2). BUG-B1 chỉ evidence local.
