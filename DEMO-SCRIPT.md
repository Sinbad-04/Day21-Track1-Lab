# 🎤 Kịch bản Demo 8 phút — Day 20 (Retention, Engagement & Habit Loop)

> Lời nói từng bước cho buổi trình bày. Bám sát màn **`screen-d20-demo`** trong prototype.
> Mở prototype bằng `start.bat` (Windows) / `./start.sh` (Mac/Linux), vào **Flow Map → 🪝 Day 20 → 12 · Demo Path**.

## 👥 Phân vai (gợi ý)
| Người nói | Phần | MSSV |
|-----------|------|------|
| **Đỗ Tuấn Đạt** | Mở đầu + Problem/Persona (0:00–1:50) | 2A202600818 |
| **Hoàng Hiếu Trung** | Onboarding mới + Hook loop (2:40–6:20) | 2A202600702 |
| **Đàm Xuân Giáp** | Metric + Tracking + Tổng kết (1:50–2:40, 6:20–8:00) | 2A202600740 |

> Điều chỉnh phân vai tuỳ nhóm. Mỗi mốc thời gian dưới đây nêu **màn cần mở** + **lời nói mẫu**.

---

## ⏱️ 0:00 – 1:00 · Problem · Persona · Why · Alternative
**Màn:** `screen-d20-canvas` (Customer Retention Canvas)

> "Chào thầy/cô và cả lớp. Nhóm em làm **AI Travel Planner** — trợ lý lập kế hoạch chuyến đi.
> Vấn đề: lập lịch trình tốn thời gian, thông tin rời rạc, và dễ sai khi đi thực tế.
> Persona chính là **người đi du lịch theo dịp** — 2 đến 4 chuyến một năm. Anti-persona là dân đi công tác hằng ngày.
> Vì sao họ cần: muốn một lịch trình hợp lý, không phải mở 10 tab. Giải pháp thay thế hiện tại là Google + nhóm chat bạn bè.
> Điểm mấu chốt: **đây là use case tần suất thấp / episodic** — và điều đó định hình toàn bộ chiến lược retention của nhóm."

---

## ⏱️ 1:00 – 1:50 · Frequency · Core Action · Active User
**Màn:** `screen-d20-core` → `screen-d20-metric`

> "Vì tần suất tự nhiên thấp, nhóm KHÔNG ép habit hằng ngày.
> **Core Action** = *lưu một lịch trình* (commit kế hoạch). Đó là khoảnh khắc người dùng nhận được giá trị thật.
> **Active User** = người có ít nhất một chuyến đang được lập hoặc đang diễn ra — chứ không phải 'mở app mỗi ngày'."

---

## ⏱️ 1:50 – 2:40 · Retention metric & lý do chọn cadence (KHÔNG dùng daily)
**Màn:** `screen-d20-metric`

> "Metric retention của nhóm là **returning-traveler retention** — tỉ lệ người quay lại lập chuyến tiếp theo trong mùa sau, *không* phải D1/D7.
> Lý do: D1/D7 sẽ luôn xấu với use case episodic và sẽ đánh lừa nhóm thiết kế sai.
> Nhịp đo đúng phải khớp **nhịp tự nhiên của hành vi** — theo mùa/theo dịp."

---

## ⏱️ 2:40 – 4:20 · Current flow → Redesigned onboarding → First Core Action & TTV  *(chạy thử flow mới)*
**Màn:** `screen-d20-audit` → `screen-d20-redesign` → bấm **"▶ Chạy thử flow mới"** → `screen-nf-setup` → `screen-nf-draft`

> "Onboarding cũ bắt cấp quyền + chọn khách sạn trước khi thấy giá trị — TTV ~4–5 phút. (mở `screen-d20-audit`: Keep/Remove/Delay/Simplify).
> Bản redesign: bỏ permission & chọn khách sạn khỏi đường tới value, **7 trường → 3 chip**.
> Em chạy thử thật nhé —" *(bấm Chạy thử flow mới)*
> "`screen-nf-setup`: chỉ 3 chip. Bấm **Tạo lịch trình ngay**.
> `screen-nf-draft`: AI tự bắt lỗi và đề xuất — và đây là **First Core Action: Lưu lịch**. TTFCA giờ **dưới 90 giây**, và evidence-of-value hiện ngay sau khi lưu."

---

## ⏱️ 4:20 – 5:15 · North Star · Input Metrics · leading vs lagging
**Màn:** `screen-d20-northstar`

> "**North Star** (lagging): số chuyến được lập & hoàn thành mỗi mùa.
> **Input metrics** (leading): tỉ lệ hoàn tất core action lần đầu, số lịch được lưu, tỉ lệ dùng in-trip companion.
> Trade-off: tối ưu input ngắn hạn không được bóp méo trải nghiệm dài hạn (vd spam thông báo)."

---

## ⏱️ 5:15 – 6:20 · Nature vs Nurture & Hook Model  *(chạy Up Next)*
**Màn:** `screen-d20-nature` → `screen-d20-hook` → bấm vào `screen-intrip`

> "**Nature**: nhu cầu đi chơi theo mùa — nhóm không tạo ra được, chỉ đón đúng lúc.
> **Nurture**: nhắc theo mùa kiểu **Zillow/Zestimate** — gửi gợi ý đúng dịp lễ/hè.
> Hook Model — nhưng nhóm có bước kiểm tra **'có thật sự cần habit không'**. Habit hằng ngày chỉ áp dụng cho **giai đoạn in-trip 3 ngày**.
> Đây là loop thật —" *(mở `screen-intrip`)* "**Up Next**: trigger theo thời gian/vị trí → hành động đi điểm tiếp theo → phần thưởng là trải nghiệm mượt → đầu tư = lịch ngày càng hợp gu."

---

## ⏱️ 6:20 – 7:15 · Tracking requirement
**Màn:** `screen-d20-tracking`

> "Để đo được những metric trên, nhóm định nghĩa rõ:
> **Event** (vd `itinerary_saved`), **properties** (trip_id, destination, num_days, source), và **acceptance criteria** — event phải bắn đúng 1 lần khi lưu, có đủ property, kiểm chứng được trên dashboard."

---

## ⏱️ 7:15 – 8:00 · Before/After & Thay đổi quan trọng nhất
**Màn:** `screen-d20-beforeafter` → kết thúc

> "Before/After: permission + chọn khách sạn trước → **giờ là value-first**; 7 trường → 3 chip; TTV ~4–5 phút → **<90s**; thêm 1 recovery path (`screen-nf-recover`).
> **Thay đổi quan trọng nhất**: nhóm nhận ra đây là use case **episodic**, nên **từ chối ép daily retention/habit**, và thiết kế đúng 2 nhịp — **onboarding value-first** + **in-trip companion loop** — khuếch đại bằng **nurture theo mùa** kiểu Zillow.
> Cảm ơn thầy/cô và cả lớp ạ."

---

## ✅ Checklist trước khi demo
- [ ] Chạy `start.bat` / `./start.sh`, kiểm tra mở được `http://localhost:8080`
- [ ] Tập trước nhánh **"Chạy thử flow mới"** (`screen-nf-setup → nf-draft → intrip`)
- [ ] Mỗi người canh đồng hồ phần của mình, tổng ≤ 8:00
- [ ] Chuẩn bị câu trả lời: "Vì sao không dùng D1/D7?" (→ episodic, nhịp tự nhiên)
