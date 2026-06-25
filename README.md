# Day 21 - Thiết kế Test Inputs cho AI Evals

## Thông tin nhóm

| Thành viên | MSSV |
|---|---|
| Đỗ Tuấn Đạt | 2A202600818 |
| Hoàng Hiếu Trung | 2A202600702 |
| Đàm Xuân Giáp | 2A202600740 |

## Use case

**AI Travel Planner:** Agent tạo lịch trình du lịch 1 ngày tại Đà Nẵng.

Agent cần tạo lịch trình khả thi theo mục tiêu, thời gian, ngân sách, thời tiết, giờ mở cửa, vị trí và ràng buộc của user. Khi thông tin thiếu, mâu thuẫn, chưa kiểm chứng hoặc yêu cầu vượt quyền, agent cần hỏi lại, cảnh báo, điều chỉnh lịch hoặc từ chối đúng mức.

## Bài nộp nhóm

- [Báo cáo nhóm và coverage review](REPORT.md)
- [Scenario Dataset v1 - 30 rows](scenario-dataset-v1.csv)
- [Kịch bản demo 5 phút](DAY21-DEMO-SCRIPT.md)
- [Đề bài Day 21](day21-lab-instruction.md)

## Phần cá nhân

### Đỗ Tuấn Đạt

- [Báo cáo](Day21-2A202600818-Do-Tuan-Dat/REPORT.md)
- [Prompt đã dùng](Day21-2A202600818-Do-Tuan-Dat/prompt-used.md)
- [AI raw output](Day21-2A202600818-Do-Tuan-Dat/ai-raw-output.md)

### Hoàng Hiếu Trung

- [Báo cáo](Day21-2A202600702-Hoang-Hieu-Trung/REPORT.md)
- [Prompt đã dùng](Day21-2A202600702-Hoang-Hieu-Trung/prompt-used.md)
- [AI raw output](Day21-2A202600702-Hoang-Hieu-Trung/ai-raw-output.md)

### Đàm Xuân Giáp

- [Báo cáo](Day21-2A202600740-Dam-Xuan-Giap/REPORT.md)
- [Prompt đã dùng](Day21-2A202600740-Dam-Xuan-Giap/prompt-used.md)
- [AI raw output](Day21-2A202600740-Dam-Xuan-Giap/ai-raw-output.md)

## Trạng thái

- Scenario Dataset v0 của từng thành viên: hoàn thành
- Group merge và dedup: hoàn thành
- Scenario Dataset v1: 30 rows
- Coverage review, known gaps và handoff: hoàn thành
- Chưa chạy agent và chưa đọc trace, đúng phạm vi Day 21
- Không chứa API key, token hoặc credential
