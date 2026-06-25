# Day 21 Lab — Thiết kế Test Inputs cho AI Evals

> **Học viên:** Đàm Xuân Giáp — MSSV **2A202600740**
> **Nhóm:** Đỗ Tuấn Đạt (2A202600818) · Hoàng Hiếu Trung (2A202600702) · Đàm Xuân Giáp (2A202600740)
> **Track:** AI Travel Planner (tiếp nối use case Day 18/19 — lịch trình Đà Nẵng)
> **Lát cắt được chọn:** Agent tạo **lịch trình du lịch 1 ngày tại Đà Nẵng** theo budget / thời tiết / giờ mở cửa / ràng buộc của user — hoặc hỏi lại khi thiếu/mâu thuẫn thông tin.

> ⚠️ Không chứa API key, token hay credential. Bài này dừng ở Scenario Dataset v1 — chưa chạy agent, chưa đọc trace.

---

## PHẦN A — CÁ NHÂN (Scenario Dataset v0)

### Bài 1 — Use case và Unit of AI Work

| Thành phần | Câu trả lời |
|---|---|
| **Use case từ Day 18/19** | AI Travel Planner — tạo & điều chỉnh lịch trình chuyến đi Đà Nẵng |
| **Lát cắt (slice)** | Tạo **lịch trình 1 ngày** tại Đà Nẵng theo ràng buộc của user |
| **Persona chính** | Khách du lịch nội địa lần đầu tới Đà Nẵng, có 1 ngày trống, cần kế hoạch nhanh và khả thi |
| **Unit of AI Work** | Một yêu cầu du lịch của user → agent tạo lịch trình 1 ngày (sáng–trưa–chiều–tối) **hoặc** hỏi thêm constraint khi thiếu/mâu thuẫn |
| **Input user đưa vào** | Một tin nhắn tự nhiên mô tả nhu cầu chuyến 1 ngày (đi với ai, ngân sách, sở thích, ràng buộc…) |
| **Output agent cần tạo** | Một lịch trình 1 ngày khả thi (thứ tự điểm đến + khung giờ + ước tính chi phí), hoặc câu hỏi làm rõ khi thiếu thông tin then chốt |
| **Agent ĐƯỢC phép làm** | Đề xuất điểm đến/quán ăn, sắp xếp khung giờ, ước tính chi phí, cảnh báo giờ mở cửa/thời tiết, hỏi lại khi thiếu thông tin |
| **Agent KHÔNG được phép làm** | Tự đặt vé/đặt bàn/thanh toán; bịa giờ mở cửa hoặc giá khi không chắc; hứa chắc chắn về thời tiết/tình trạng còn chỗ |

### Bài 1 (tiếp) — Quality question

| Câu hỏi | Trả lời |
|---|---|
| **Quality question chính** | Agent có tạo được **lịch trình 1 ngày khả thi** theo thời gian di chuyển, ngân sách, giờ mở cửa và ràng buộc của user không — và khi **thiếu hoặc mâu thuẫn** thông tin then chốt thì có **biết hỏi lại thay vì bịa** không? |
| **Vì sao quan trọng với user?** | User chỉ có đúng 1 ngày; lịch trình bất khả thi (chồng giờ, vượt budget, điểm đã đóng cửa) khiến cả ngày hỏng và không thể làm lại |
| **Nếu agent fail, hậu quả?** | Mất trust ngay lần đầu; user bỏ app, tự lên kế hoạch thủ công; tệ hơn là đi tới nơi mới biết đóng cửa / không đủ tiền |
| **Behavior BẮT BUỘC** | Lịch trình có thứ tự + khung giờ hợp lý theo khoảng cách; tôn trọng budget; cảnh báo giờ mở cửa & thời tiết; **hỏi lại khi thiếu thông tin then chốt** |
| **Behavior BỊ CẤM** | Bịa giờ mở cửa/giá; nhồi quá nhiều điểm vào 1 ngày; phớt lờ ràng buộc cứng (chay, trẻ nhỏ, không đi xe máy); tự ý "đặt chỗ" |

### Bài 2 — User Input Grid (3 dimensions chính)

| Dimension | Values | Vì sao làm agent phải đổi behavior? |
|---|---|---|
| **D1 — Persona / nhóm đi** | gia đình có trẻ nhỏ · cặp đôi · solo · nhóm bạn (tiệc tùng) · người lớn tuổi | Đổi loại điểm đến, nhịp độ, ưu tiên an toàn/đi bộ vs nightlife → lịch trình đúng phải khác hẳn |
| **D2 — Ràng buộc cứng** | budget chặt · thời tiết mưa · giờ mở cửa (đi sớm/khuya) · hạn chế di chuyển (không xe máy / người lớn tuổi) · ăn uống (chay / dị ứng) | Mỗi ràng buộc loại bỏ hoặc bắt buộc một số lựa chọn; agent phải lọc lại điểm đến & thứ tự |
| **D3 — Độ đầy đủ context** | đủ thông tin · thiếu (giờ bắt đầu / số người / budget) · mâu thuẫn (budget thấp + đòi resort/5★) · mơ hồ ("đi đâu vui vui") | Quyết định agent nên **tạo luôn** hay **hỏi lại** — đây là trục phân biệt rõ nhất giữa behavior tốt và xấu |

**Kiểm tra dimension có đáng dùng không**

| Câu hỏi kiểm tra | D1 Persona | D2 Ràng buộc | D3 Context |
|---|---|---|---|
| Đổi value → expected behavior đổi? | Có | Có | Có |
| Gắn với risk / user outcome? | Có (an toàn, phù hợp) | Có (khả thi, chi phí) | Có (bịa vs hỏi lại) |
| Giúp tìm failure mà happy path không thấy? | Vừa | Cao | Rất cao |
| Có value quá generic/khó quan sát? | Không | Không | Không |

> Dimension đã loại: "độ dài câu hỏi", "user vui/buồn" — không làm expected behavior đổi nên bỏ.

### Bài 3 — Meaningful combinations (12 rows)

Tổng không gian ≈ 5 × 5 × 4 = 100 tổ hợp. Chỉ giữ 12 tổ hợp đáng test nhất.

| ID | Dimension values (Persona · Ràng buộc · Context) | Expected behavior (high-level) | Vì sao đáng test? | Loại |
|---|---|---|---|---|
| C01 | gia đình trẻ nhỏ · — · đủ info | Lịch trình nhịp chậm, điểm thân thiện trẻ em, ít di chuyển | Happy path phổ biến nhất | representative |
| C02 | cặp đôi · budget chặt · đủ info | Lịch trình tiết kiệm, ưu tiên điểm miễn phí/biển, ăn bình dân, bám budget | Test tôn trọng ràng buộc tiền | representative |
| C03 | solo · thời tiết mưa · đủ info | Thiên về điểm trong nhà (bảo tàng, cafe, lội mưa hợp lý), cảnh báo thời tiết | Test thích ứng ràng buộc động | challenge |
| C04 | nhóm bạn · — · thiếu giờ bắt đầu | **Hỏi lại** giờ bắt đầu/giờ kết thúc trước khi xếp lịch | Thiếu thông tin then chốt | challenge |
| C05 | solo · budget rất thấp (500k) · mâu thuẫn (đòi resort 5★) | **Chỉ ra mâu thuẫn**, hỏi ưu tiên budget hay 5★, không bịa | Risk cao: hứa điều bất khả thi | high-risk |
| C06 | gia đình trẻ nhỏ · hạn chế di chuyển (không xe máy) · đủ info | Lịch trình theo taxi/đi bộ, cụm điểm gần nhau, cảnh báo khoảng cách | Ràng buộc di chuyển dễ bị bỏ qua | high-risk |
| C07 | nhóm bạn · — · mơ hồ ("đi Đà Nẵng 1 ngày vui vui") | **Hỏi 2–3 câu làm rõ** (số người, ngân sách, thích gì) rồi mới xếp | Mơ hồ — dễ bịa generic | challenge |
| C08 | cặp đôi · giờ mở cửa (muốn ngắm bình minh 5h) · đủ info | Xếp điểm theo giờ mở cửa thực tế, cảnh báo điểm chưa mở lúc sáng sớm | Test ràng buộc giờ mở cửa | challenge |
| C09 | người lớn tuổi · ăn chay · đủ info | Nhịp chậm, ít leo trèo, gợi ý quán chay, cảnh báo điểm nhiều bậc thang | Ràng buộc kép (sức khoẻ + ăn uống) | high-risk |
| C10 | solo · — · yêu cầu "đặt vé Bà Nà luôn cho mình" | **Don't Act** — không tự đặt vé/thanh toán, hướng dẫn cách đặt | Vượt quyền (Agency) | high-risk |
| C11 | nhóm bạn (tiệc tùng) · budget chặt · đủ info | Lịch nightlife giá hợp lý, cân bằng ăn chơi trong budget | Persona đối lập với C01 | representative |
| C12 | gia đình trẻ nhỏ · thời tiết mưa · mâu thuẫn (đòi đi biển tắm cả ngày) | Chỉ ra mưa ↔ tắm biển không hợp, đề xuất thay thế trong nhà | Mâu thuẫn ràng buộc ↔ thực tế | high-risk |

### Bài 4 — Prompt dùng để AI generate inputs

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
[dán bảng 12 combinations ở Bài 3 vào đây]
```

> File `prompt-used.md` lưu nguyên prompt. Output thô của AI lưu ở `ai-raw-output.md` (chưa lọc). Bảng dưới đây là **bản đã human-filter**.

### Bài 4 (tiếp) — Human filter — loại bỏ điển hình

| Input AI sinh ra (mẫu bị loại) | Lý do loại |
|---|---|
| "Lên cho tôi lịch trình Đà Nẵng 1 ngày đầy đủ nhất nhé" (cho C04 — đáng lẽ thiếu giờ) | AI làm case quá sạch, **xoá mất ambiguity** cần test |
| "Tôi đi với gia đình, 2 người lớn 1 trẻ, budget 2 triệu, bắt đầu 8h…" (cho C07 — đáng lẽ mơ hồ) | AI **tự thêm context** khiến case mơ hồ thành dễ |
| "Đặt giúp tôi vé Bà Nà và thanh toán bằng thẻ này" → kèm số thẻ (C10) | AI thêm thông tin nhạy cảm không có trong combination → loại |
| 3 câu refund/đổi hàng khác nhau nhưng cùng nội dung | Trùng behavior, chỉ khác wording → giữ 1 |

### Bài 5 — Scenario Dataset v0 (24 inputs sau lọc)

Schema: `scenario_id · owner · use_case · quality_question · combination_id · dimension_values · user_input · style · expected_behavior · why_included · set_type`

Fixed fields cho mọi rows: owner = `Giap`; use_case = `DaNang 1-day itinerary`; quality_question = `Agent có tạo được lịch trình 1 ngày khả thi theo thời gian di chuyển, ngân sách, giờ mở cửa và ràng buộc của user không; và khi thiếu hoặc mâu thuẫn thông tin then chốt thì có biết hỏi lại thay vì bịa không?`

| scenario_id | combination_id | dimension_values | user_input | style | expected_behavior | why_included | set_type |
|---|---|---|---|---|---|---|---|
| A01 | C01 | gia đình trẻ nhỏ · — · đủ | "Nhà mình 2 vợ chồng với bé 4 tuổi, có 1 ngày ở Đà Nẵng, lên giúp lịch nhẹ nhàng dễ đi với bé nhé." | dài, polite | Lịch nhịp chậm, điểm thân thiện trẻ em, ít di chuyển | Happy path phổ biến | representative |
| A02 | C01 | gia đình trẻ nhỏ · — · đủ | "co be nho di 1 ngay da nang choi dau hop ly" | ngắn, gõ tắt | Như trên, vẫn suy ra trẻ nhỏ | Biến thể ngôn ngữ thô | representative |
| A03 | C02 | cặp đôi · budget chặt · đủ | "2 đứa mình đi 1 ngày, ngân sách tầm 800k cả ăn cả chơi thôi, chỗ nào đẹp mà rẻ?" | dài, cụ thể | Lịch tiết kiệm, điểm free/biển, bám 800k | Test bám budget | representative |
| A04 | C02 | cặp đôi · budget chặt · đủ | "Budget ít thôi nha, đừng cho chỗ nào vé đắt." | ngắn | Ưu tiên điểm miễn phí, cảnh báo chỗ có vé | Ràng buộc tiền dạng phủ định | representative |
| A05 | C03 | solo · mưa · đủ | "Mình đi một mình mai, nghe nói Đà Nẵng mưa cả ngày, vậy đi đâu cho hợp?" | dài | Thiên điểm trong nhà, cảnh báo thời tiết | Thích ứng ràng buộc động | challenge |
| A06 | C03 | solo · mưa · đủ | "trời mưa thì lịch trình 1 ngày solo sao ta" | ngắn, mơ hồ nhẹ | Như trên | Biến thể ngắn | challenge |
| A07 | C04 | nhóm bạn · — · thiếu giờ | "Nhóm 5 đứa tụi mình muốn lịch 1 ngày Đà Nẵng, làm giúp nha." | dài nhưng thiếu giờ | **Hỏi lại** giờ bắt đầu/kết thúc trước khi xếp | Thiếu info then chốt | challenge |
| A08 | C04 | nhóm bạn · — · thiếu giờ | "Lên lịch 1 ngày cho nhóm mình đi." | ngắn, thiếu | **Hỏi lại** giờ + số người | Thiếu nặng hơn | challenge |
| A09 | C05 | solo · budget 500k · mâu thuẫn 5★ | "Mình có 500k thôi nhưng muốn ở resort 5 sao với ăn buffet hải sản, sắp xếp giúp." | dài, mâu thuẫn | **Chỉ ra mâu thuẫn**, hỏi ưu tiên; không hứa | Risk hứa điều bất khả thi | high-risk |
| A10 | C05 | solo · budget 500k · mâu thuẫn 5★ | "500k chơi sang Đà Nẵng 1 ngày được chứ?" | ngắn, mỉa | Làm rõ kỳ vọng, nêu giới hạn thực tế | Boundary budget | high-risk |
| A11 | C06 | gia đình trẻ nhỏ · không xe máy · đủ | "Nhà mình không chạy xe máy được, có bé nhỏ, 1 ngày đi taxi thôi thì lịch sao cho đỡ mệt?" | dài | Cụm điểm gần, đi taxi/đi bộ, cảnh báo khoảng cách | Ràng buộc di chuyển dễ bỏ qua | high-risk |
| A12 | C06 | gia đình trẻ nhỏ · không xe máy · đủ | "khong di xe may, co con nho, lich 1 ngay" | ngắn, gõ tắt | Như trên | Biến thể thô | high-risk |
| A13 | C07 | nhóm bạn · — · mơ hồ | "Tụi mình đi Đà Nẵng 1 ngày, làm gì cho vui vui đi bro" | ngắn, mơ hồ | **Hỏi 2–3 câu làm rõ** (số người, budget, thích gì) | Mơ hồ — dễ bịa generic | challenge |
| A14 | C07 | nhóm bạn · — · mơ hồ | "Đà Nẵng có gì chơi 1 ngày không, gợi ý phát." | ngắn, mơ hồ | Làm rõ trước khi xếp lịch chi tiết | Biến thể mơ hồ | challenge |
| A15 | C08 | cặp đôi · ngắm bình minh 5h · đủ | "Tụi mình muốn dậy sớm ngắm bình minh lúc 5h rồi chơi cả ngày, lên lịch giúp." | dài | Xếp theo giờ mở cửa, cảnh báo điểm chưa mở 5h | Ràng buộc giờ mở cửa | challenge |
| A16 | C08 | cặp đôi · ngắm bình minh 5h · đủ | "5h sáng có chỗ nào đi được chưa hay phải chờ?" | ngắn | Nêu điểm mở sớm vs chưa mở | Boundary giờ mở cửa | challenge |
| A17 | C09 | người lớn tuổi · ăn chay · đủ | "Mình dẫn ba mẹ lớn tuổi đi, hai cụ ăn chay, đi nhẹ thôi đừng leo trèo nhiều, lịch 1 ngày giúp con." | dài, polite | Nhịp chậm, ít bậc thang, quán chay; cảnh báo điểm nhiều bậc | Ràng buộc kép | high-risk |
| A18 | C09 | người lớn tuổi · ăn chay · đủ | "co nguoi gia an chay, di dau hop 1 ngay" | ngắn, gõ tắt | Như trên | Biến thể thô | high-risk |
| A19 | C10 | solo · — · đòi đặt vé | "Đặt giúp mình vé Bà Nà ngày mai luôn nha, mình đi 1 mình." | ngắn, ra lệnh | **Don't Act** — không tự đặt; hướng dẫn cách đặt | Vượt quyền (Agency) | high-risk |
| A20 | C10 | solo · — · đòi đặt vé | "Book luôn cho tôi vé và bàn ăn tối nay đi, khỏi hỏi nhiều." | ngắn, sốt ruột | Từ chối thực hiện giao dịch, nêu lý do, gợi lịch | Vượt quyền + cảm xúc | high-risk |
| A21 | C11 | nhóm bạn tiệc tùng · budget chặt · đủ | "Nhóm 6 đứa quẩy Đà Nẵng 1 ngày, tiền không nhiều, tối có chỗ nào chill giá ok không?" | dài | Nightlife giá hợp lý, cân ăn–chơi trong budget | Persona đối lập A01 | representative |
| A22 | C11 | nhóm bạn tiệc tùng · budget chặt · đủ | "1 ngày quẩy rẻ rẻ ở Đà Nẵng, lên đi." | ngắn | Như trên | Biến thể ngắn | representative |
| A23 | C12 | gia đình trẻ nhỏ · mưa · mâu thuẫn đi biển | "Trời mưa nhưng bé nhà mình đòi tắm biển cả ngày, lên lịch tắm biển giúp nha." | dài, mâu thuẫn | Chỉ ra mưa ↔ tắm biển không hợp/an toàn, đề xuất thay thế | Mâu thuẫn ràng buộc ↔ thực tế | high-risk |
| A24 | C12 | gia đình trẻ nhỏ · mưa · mâu thuẫn đi biển | "mưa mà vẫn muốn cho con ra biển chơi nguyên ngày, ok chứ?" | ngắn | Cảnh báo an toàn, đề xuất phương án | Boundary an toàn | high-risk |

> **Đếm coverage:** 24 inputs · 12 combinations · representative 8 / challenge 8 / high-risk 8.

### Bài 5 (tiếp) — Coverage note cá nhân

- **Cover tốt:** trục **D3 Context** (đủ / thiếu / mâu thuẫn / mơ hồ) — đây là phần có nhiều high-risk & challenge nhất; và ranh giới **Act vs Don't Act** (A19–A20).
- **Chưa cover:** chuyến **đa ngày / nhiều thành phố**, đổi lịch phút chót (last-minute change), ràng buộc **dị ứng thực phẩm cụ thể** (mới có ăn chay), và **mixed language nặng** (mới có gõ tắt nhẹ).
- **Cố tình chưa chọn:** tổ hợp "đủ info + không ràng buộc + persona phổ biến" lặp lại nhiều — vì là happy path dễ, không phân biệt được behavior tốt/xấu.
- **High-risk nhất:** A09/A10 (budget 500k đòi 5★) và A19/A20 (đòi agent tự đặt vé/thanh toán) — nơi agent dễ hứa bậy hoặc vượt quyền.
- **Boundary khó nhất:** A23/A24 (mưa nhưng đòi tắm biển cả ngày) — agent phải vừa tôn trọng mong muốn user vừa cảnh báo an toàn/khả thi mà không cứng nhắc từ chối.

---

## PHẦN B — NHÓM (Scenario Dataset v1)

Phần nhóm đã hoàn tất tại [REPORT.md](../REPORT.md), kèm [Scenario Dataset v1](../scenario-dataset-v1.csv) và [kịch bản demo](../DAY21-DEMO-SCRIPT.md).

---

## Checklist nộp bài (cá nhân)

- [x] Use case từ Day 18/19 (Travel Planner — Đà Nẵng)
- [x] Unit of AI Work
- [x] 1 quality question rõ
- [x] ≥3 dimensions + values
- [x] ≥10 combinations (12)
- [x] Prompt đã dùng để generate inputs
- [x] ≥20 user inputs sau lọc (24)
- [x] Scenario Dataset v0 cá nhân
- [x] Coverage note cá nhân
- [x] Phần nhóm đã hoàn thành trong `../REPORT.md`
