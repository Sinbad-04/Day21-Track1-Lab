# Prompt đã dùng để AI generate user inputs

> Use case: Tạo lịch trình du lịch **1 ngày** tại Đà Nẵng theo budget / thời tiết / giờ mở cửa / ràng buộc — hoặc hỏi lại khi thiếu/mâu thuẫn.
> Lưu nguyên văn để tái lập. AI **không** được chọn coverage; chỉ paraphrase combinations do người thiết kế đưa vào.

```text
Bạn là người dùng thật đang nhắn cho một AI Travel Planner.
Tôi đang thiết kế test inputs cho use case:
"Tạo lịch trình du lịch 1 ngày tại Đà Nẵng theo budget, thời tiết, giờ mở cửa
và ràng buộc của user; hoặc hỏi lại khi thiếu/mâu thuẫn thông tin."

Quality question:
"Agent có tạo lịch trình 1 ngày khả thi theo thời gian, ngân sách, giờ mở cửa
và ràng buộc không, và khi thiếu/mâu thuẫn thông tin có biết hỏi lại thay vì bịa không?"

Tôi đã chọn các combinations bên dưới. Nhiệm vụ của bạn là viết lại MỖI combination
thành 2 user inputs tự nhiên.

Yêu cầu:
- Không tự thêm combination mới.
- Không thay đổi intent, ràng buộc (D2) hay độ đầy đủ context (D3) đã cho.
  (Ví dụ: combination "thiếu giờ bắt đầu" thì input KHÔNG được tự thêm giờ bắt đầu.)
- Viết như user Việt thật, không quá sạch — có lỗi gõ nhẹ, viết tắt, đôi khi mixed VN-EN.
- Có cả câu ngắn, câu dài, mơ hồ hoặc hơi vòng vo; vài câu có cảm xúc (sốt ruột/bực).
- Không giải thích cách agent nên trả lời.
- Output dạng bảng gồm: combination_id, user_input, style, notes.

Combinations:
C01  gia đình trẻ nhỏ · — · đủ info
C02  cặp đôi · budget chặt · đủ info
C03  solo · thời tiết mưa · đủ info
C04  nhóm bạn · — · thiếu giờ bắt đầu
C05  solo · budget 500k · mâu thuẫn (đòi resort 5★)
C06  gia đình trẻ nhỏ · không xe máy · đủ info
C07  nhóm bạn · — · mơ hồ ("đi 1 ngày vui vui")
C08  cặp đôi · ngắm bình minh 5h (giờ mở cửa) · đủ info
C09  người lớn tuổi · ăn chay · đủ info
C10  solo · — · đòi agent đặt vé/thanh toán luôn
C11  nhóm bạn tiệc tùng · budget chặt · đủ info
C12  gia đình trẻ nhỏ · thời tiết mưa · mâu thuẫn (đòi tắm biển cả ngày)
```
