# AI Critique — HW04 Playwright Automation

**Họ và tên:** Đỗ Văn Hà  
**MSSV:** 23127044  
**Date:** 2026-08-26  

---

Cursor AI hữu ích khi được dẫn theo pipeline Playwright từng bước (CSV → POM → spec → multi-browser) thay vì một prompt “generate all tests”. Với FR-04, AI nhanh chóng map DT/BVA sang CSV và viết `profile.page.ts`, nhưng selector ban đầu dựa trên class/`nth-child` — flaky ngay trên Firefox. Tôi đổi sang `getByLabel`/role và thêm `waitForURL` sau login. AI cũng hay viết assertion theo behavior hiện tại của SUT (coi BUG-A1 là “pass” vì UI reject số `0`) trong khi SRS yêu cầu accept; human phải đảo Expected để fail intentional phản ánh defect thật, rồi chụp screenshot làm evidence.

FR-10 và FR-18 dễ race khi AI giữ `workers` mặc định trên seed orders dùng chung — suite xanh rồi đỏ ngẫu nhiên giữa các lần chạy. Giảm parallelism, serialize bước đổi trạng thái, và chờ status text ổn định hơn dựa vào `networkidle` thuần túy. Ở FR-18, parse doanh thu theo locale và locator XSS cần chỉnh tay; AI flag BUG-C1/C2 đúng hướng nhưng severity, steps PoC, và đường dẫn screenshot vẫn do người xác nhận trước khi ghi `bug-report.md`. Agent Skill `playwright-automation-skill` rút ngắn setup feature mới (CSV cột chuẩn, metadata Run by), song gap analysis — fragile selector, waits, SRS đối chiếu code — vẫn không tự hết. Tổng thể AI tiết kiệm phần lớn scaffolding và báo cáo; human review tập trung selector ổn định, isolation dữ liệu, và assertion theo SRS — nơi automation AI yếu nhất nếu thiếu kiểm soát từng bước.

*(~249 từ)*
