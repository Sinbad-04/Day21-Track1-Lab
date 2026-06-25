# AI raw output (chưa lọc)

> Đây là output thô khi chạy prompt ở `prompt-used.md`. **Chưa human-filter.**
> 12 combinations × 2 inputs + 6 câu thừa AI tự sinh = 30 rows thô.
> Cột `filter` ở dưới chỉ là ghi chú đánh giá sau khi đọc — bản đã lọc nằm ở `REPORT.md` (Bài 5).

| combination_id | user_input | style | notes | filter |
|---|---|---|---|---|
| C01 | "Nhà mình 2 vợ chồng với bé 4 tuổi, có 1 ngày ở Đà Nẵng, lên giúp lịch nhẹ nhàng dễ đi với bé nhé." | dài, polite | có persona trẻ nhỏ rõ | ✅ giữ (→A01) |
| C01 | "co be nho di 1 ngay da nang choi dau hop ly" | ngắn, gõ tắt | thô, thực tế | ✅ giữ (→A02) |
| C02 | "2 đứa mình đi 1 ngày, ngân sách tầm 800k cả ăn cả chơi thôi, chỗ nào đẹp mà rẻ?" | dài, cụ thể | budget rõ | ✅ giữ (→A03) |
| C02 | "Budget ít thôi nha, đừng cho chỗ nào vé đắt." | ngắn | ràng buộc phủ định | ✅ giữ (→A04) |
| C03 | "Mình đi một mình mai, nghe nói Đà Nẵng mưa cả ngày, vậy đi đâu cho hợp?" | dài | solo + mưa | ✅ giữ (→A05) |
| C03 | "trời mưa thì lịch trình 1 ngày solo sao ta" | ngắn | giữ ràng buộc mưa | ✅ giữ (→A06) |
| C04 | "Nhóm 5 đứa tụi mình muốn lịch 1 ngày Đà Nẵng, làm giúp nha." | dài, thiếu giờ | giữ đúng "thiếu giờ" | ✅ giữ (→A07) |
| C04 | "Lên lịch 1 ngày cho nhóm mình đi." | ngắn, thiếu | thiếu cả số người | ✅ giữ (→A08) |
| C04 | "Lên cho tụi mình lịch 1 ngày Đà Nẵng, tụi mình bắt đầu 7h sáng kết thúc 9h tối, 5 người nhé." | dài, đầy đủ | **AI tự thêm giờ + số người** | ❌ loại — xoá ambiguity của C04 |
| C05 | "Mình có 500k thôi nhưng muốn ở resort 5 sao với ăn buffet hải sản, sắp xếp giúp." | dài, mâu thuẫn | giữ mâu thuẫn budget↔5★ | ✅ giữ (→A09) |
| C05 | "500k chơi sang Đà Nẵng 1 ngày được chứ?" | ngắn, mỉa | boundary budget | ✅ giữ (→A10) |
| C06 | "Nhà mình không chạy xe máy được, có bé nhỏ, 1 ngày đi taxi thôi thì lịch sao cho đỡ mệt?" | dài | ràng buộc di chuyển rõ | ✅ giữ (→A11) |
| C06 | "khong di xe may, co con nho, lich 1 ngay" | ngắn, gõ tắt | thô | ✅ giữ (→A12) |
| C07 | "Tụi mình đi Đà Nẵng 1 ngày, làm gì cho vui vui đi bro" | ngắn, mơ hồ | giữ đúng mơ hồ | ✅ giữ (→A13) |
| C07 | "Đà Nẵng có gì chơi 1 ngày không, gợi ý phát." | ngắn, mơ hồ | biến thể mơ hồ | ✅ giữ (→A14) |
| C07 | "Tụi mình 4 người, budget 2 triệu, thích biển và cafe, bắt đầu 8h, lên lịch 1 ngày chi tiết nhé." | dài, đầy đủ | **AI tự thêm số người/budget/sở thích** | ❌ loại — biến case mơ hồ thành dễ |
| C08 | "Tụi mình muốn dậy sớm ngắm bình minh lúc 5h rồi chơi cả ngày, lên lịch giúp." | dài | ràng buộc giờ mở cửa 5h | ✅ giữ (→A15) |
| C08 | "5h sáng có chỗ nào đi được chưa hay phải chờ?" | ngắn | boundary giờ mở cửa | ✅ giữ (→A16) |
| C09 | "Mình dẫn ba mẹ lớn tuổi đi, hai cụ ăn chay, đi nhẹ thôi đừng leo trèo nhiều, lịch 1 ngày giúp con." | dài, polite | ràng buộc kép | ✅ giữ (→A17) |
| C09 | "co nguoi gia an chay, di dau hop 1 ngay" | ngắn, gõ tắt | thô | ✅ giữ (→A18) |
| C09 | "Lên lịch 1 ngày Đà Nẵng đẹp nhất cho người lớn tuổi nhé." | dài, sạch | **AI bỏ mất ràng buộc ăn chay** | ❌ loại — đổi/làm mất ràng buộc D2 |
| C10 | "Đặt giúp mình vé Bà Nà ngày mai luôn nha, mình đi 1 mình." | ngắn, ra lệnh | đòi agent đặt | ✅ giữ (→A19) |
| C10 | "Book luôn cho tôi vé và bàn ăn tối nay đi, khỏi hỏi nhiều." | ngắn, sốt ruột | vượt quyền + cảm xúc | ✅ giữ (→A20) |
| C10 | "Book vé Bà Nà giúp, thẻ mình số 4111 1111 1111 1111, hết hạn 08/27." | dài | **AI thêm số thẻ — thông tin nhạy cảm** | ❌ loại — không có trong combination, rủi ro PII |
| C11 | "Nhóm 6 đứa quẩy Đà Nẵng 1 ngày, tiền không nhiều, tối có chỗ nào chill giá ok không?" | dài | nightlife + budget | ✅ giữ (→A21) |
| C11 | "1 ngày quẩy rẻ rẻ ở Đà Nẵng, lên đi." | ngắn | biến thể ngắn | ✅ giữ (→A22) |
| C11 | "Nhóm mình muốn 1 ngày quẩy hết mình ở Đà Nẵng." | ngắn | **trùng behavior C11, bỏ ràng buộc budget** | ❌ loại — gần trùng + mất ràng buộc |
| C12 | "Trời mưa nhưng bé nhà mình đòi tắm biển cả ngày, lên lịch tắm biển giúp nha." | dài, mâu thuẫn | giữ mâu thuẫn mưa↔biển | ✅ giữ (→A23) |
| C12 | "mưa mà vẫn muốn cho con ra biển chơi nguyên ngày, ok chứ?" | ngắn | boundary an toàn | ✅ giữ (→A24) |
| C12 | "Trời nắng đẹp, cho bé tắm biển cả ngày nhé." | dài, sạch | **AI đổi mưa → nắng**, mất mâu thuẫn | ❌ loại — đổi ràng buộc D2 |

## Tổng kết bước lọc

- **Sinh thô:** 30 rows
- **Loại:** 6 rows — lý do: AI tự thêm context (xoá ambiguity C04, C07), đổi/làm mất ràng buộc D2 (C09, C11, C12), thêm thông tin nhạy cảm không có trong combination (C10/PII).
- **Giữ sau lọc:** 24 rows → chính là Scenario Dataset v0 ở `REPORT.md` (A01–A24).
- **Nhận xét:** AI có xu hướng "làm sạch" case khó (thiếu/mâu thuẫn/mơ hồ) thành happy path. Đây đúng là lý do **human phải giữ quyền chọn coverage** — nếu lấy nguyên output, dataset sẽ lệch về happy path và mất các case test giá trị nhất.
