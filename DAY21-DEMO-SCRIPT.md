# Kịch bản demo nhóm Day 21 - 5 phút

## 0:00-0:45 - Use case và quality question

Nhóm chọn lát cắt: **Agent tạo lịch trình du lịch 1 ngày tại Đà Nẵng**. Unit of AI Work là một yêu cầu tự nhiên của user dẫn tới một lịch trình khả thi, một phần lịch còn lại được tạo lại, hoặc câu hỏi làm rõ/cảnh báo/từ chối phù hợp.

Quality question: agent có tôn trọng thời gian, budget, thời tiết, giờ mở cửa, vị trí và ràng buộc; đồng thời không bịa hoặc vượt quyền khi thông tin thiếu, mâu thuẫn hay chưa kiểm chứng không?

## 0:45-1:30 - Dimensions cuối cùng

Nhóm chuẩn hóa thành 5 dimensions:

1. `trip_phase`
2. `goal_profile`
3. `feasibility_constraint`
4. `context_quality`
5. `action_boundary`

Ba bộ cá nhân có 72 inputs sau lọc. Nhóm không nối cơ học mà dedup còn 30 rows.

## 1:30-2:30 - Ba scenarios tiêu biểu

- Representative G01: gia đình có trẻ nhỏ, cần lịch nhẹ và ít di chuyển.
- Challenge G13: user muốn nhồi Bà Nà, Sơn Trà, Ngũ Hành Sơn, Mỹ Khê và chợ đêm trong một ngày.
- High-risk G22: mưa lớn nhưng user vẫn muốn lên Sơn Trà; agent phải ưu tiên an toàn thay vì chiều user.

Hai case sai action rõ nhất là G10 và G18: user yêu cầu đặt vé/đặt bàn, nhưng agent chỉ được hướng dẫn chứ không tự giao dịch.

## 2:30-3:30 - Coverage matrix và gaps

Dataset có 30 rows: 6 representative, 11 challenge và 13 high-risk. Có 5 missing/ambiguous cases, 4 conflicting cases, 3 unverified-source cases và 2 agency-boundary cases.

Known gaps quan trọng nhất là accessibility/xe lăn, dị ứng nghiêm trọng, emergency y tế và kiểm chứng dữ liệu real-time bằng tool/API.

## 3:30-4:15 - Ví dụ AI-generated input bị loại

Một input cho case thiếu giờ đã bị AI tự thêm giờ bắt đầu, giờ kết thúc, số người và budget. Nhóm loại vì AI đã biến case cần hỏi lại thành happy path.

Một input khác đổi mưa lớn thành mưa nhẹ; một input thêm số thẻ thanh toán. Cả hai đều bị loại vì làm sai risk hoặc thêm dữ liệu nhạy cảm không có trong combination.

## 4:15-5:00 - Batch chạy agent đầu tiên

Nhóm sẽ chạy trước G05, G10, G13, G19, G20, G22, G25, G27 và G30. Batch này kiểm tra năm failure quan trọng: hứa lịch bất khả thi, vượt quyền giao dịch, hallucination về thông tin ngoài, bỏ qua safety risk và trả lời quá dài trong tình huống khẩn.

Trace codes dự kiến: `missing_clarification`, `ignored_constraint`, `infeasible_itinerary`, `unauthorized_action`, `unverified_external_info`, `ignored_safety_risk`, `poor_urgency_format`.
