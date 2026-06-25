# AI raw output (chua loc)

> Output tho khi chay prompt o `prompt-used.md`. Bang nay co 30 rows: 24 rows duoc giu cho Scenario Dataset v0 va 6 rows bi loai sau human filtering.

| combination_id | user_input | style | notes | filter |
|---|---|---|---|---|
| C01 | "Nha minh co 2 nguoi lon voi be 6 tuoi, o Da Nang tu 8h sang toi khoang 9h toi, nho lap lich 1 ngay de be khong bi met qua." | dai, polite | family + full day ro | giu -> D01 |
| C01 | "1 ngay Da Nang cho gia dinh co con nho, di nhe nhe thoi nha" | ngan | giu dung persona | giu -> D02 |
| C02 | "Chieu mai minh muon di an la chinh, budget khoang 600k/ng cho ca an vat lan an toi, co lich nao food tour on khong?" | dai, cu the | food tour + half-day + budget | giu -> D03 |
| C02 | "nua ngay chieu chi muon an ngon re o Da Nang, dung goi y cho dat tien nha" | ngan, go tat | budget chat | giu -> D04 |
| C02 | "Minh muon food tour 2 ngay, an het cac quan noi tieng va khong gioi han ngan sach." | sai slice | doi thanh 2 ngay va bo budget | loai - sai combination |
| C03 | "Hai dua minh muon ngam binh minh luc 5h roi di may cho check-in dep, nhung khong biet gio do co cho nao mo chua." | dai | early sunrise + gio mo cua | giu -> D05 |
| C03 | "5h sang Da Nang co cho nao chup hinh dep khong hay moi thu chua mo?" | ngan | boundary gio mo cua | giu -> D06 |
| C04 | "Ngay mai nghe bao mua ca ngay, minh van muon di may cho co tinh van hoa/lich su, lap lich trong nha giup." | dai | rainy + culture | giu -> D07 |
| C04 | "mua thi di bao tang/cafe/cho nao cho co Da Nang vibe duoc khong" | ngan | trong nha, mo nhe | giu -> D08 |
| C05 | "Minh chi co 1 ngay ma muon di Ba Na, Son Tra, Ngu Hanh Son, bien My Khe va cho dem, sap xep het duoc khong?" | dai, tham vong | tight timeline + nhoi diem | giu -> D09 |
| C05 | "1 ngay can het Ba Na voi Son Tra voi tam bien, lam lich cang kin cang tot" | ngan, ra lenh | nguy co infeasible | giu -> D10 |
| C05 | "Minh o Da Nang 3 ngay, muon chia Ba Na va Son Tra ra moi ngay mot it." | ngoai slice | khong con 1 ngay/tight timeline | loai - doi slice |
| C06 | "Trua mai nang nong nhung minh muon tam bien voi nghi ngoi la chinh, lap lich sao cho khong bi say nang." | dai | relax + heat safety | giu -> D11 |
| C06 | "di bien luc trua co on khong, 1 ngay chill thoi dung hanh xac" | ngan, colloquial | midday heat | giu -> D12 |
| C07 | "Nhom minh co nguoi lon tuoi va tre con, muon lich Da Nang 1 ngay nhung chua biet bat dau may gio." | dai, thieu gio | mixed group + missing time | giu -> D13 |
| C07 | "lap lich 1 ngay cho team minh voi, gio giac de sau tinh" | ngan, thieu | thieu gio bat dau/ket thuc | giu -> D14 |
| C07 | "Nhom minh bat dau 7h ket thuc 22h, 6 nguoi, budget 3 trieu, lap lich chi tiet." | qua sach | AI tu them gio va budget | loai - xoa ambiguity |
| C08 | "Minh den Da Nang 1 ngay ma khong biet thich gi, cu goi y gi vui vui di." | ngan, mo ho | preference thieu | giu -> D15 |
| C08 | "Di dau cung duoc mien la dang tien, minh cung chua co budget hay style gi ro." | ngan, mo ho | thieu budget/preference | giu -> D16 |
| C08 | "Minh thich bien, cafe dep, bao tang, budget 1 trieu va bat dau 8h." | qua day du | AI bien mo ho thanh du info | loai - sai context completeness |
| C09 | "Minh chi co 700k cho 1 ngay nhung muon lich sang chanh, an nha hang xin va trai nghiem kieu resort." | dai, mau thuan | budget thap + luxury | giu -> D17 |
| C09 | "700k ma muon di cho luxury o Da Nang thi len sao cho dep mat nha" | ngan, nua dua | giu mau thuan | giu -> D18 |
| C10 | "Minh an chay, di Da Nang 1 ngay tu sang toi, nho xep lich co quan chay gan cac diem tham quan." | dai, ro | food restriction | giu -> D19 |
| C10 | "an chay nguyen ngay o Da Nang thi di dau an gi cho tien duong" | ngan | can loc quan an | giu -> D20 |
| C10 | "Lap lich binh thuong thoi, an gi cung duoc." | sai rang buoc | mat rang buoc an chay | loai - lam mat constraint |
| C11 | "Book luon giup minh ve Ba Na voi ban an toi nay, minh khong muon tu dat dau." | ngan, ra lenh | vuot quyen agency | giu -> D21 |
| C11 | "Len lich xong dat ve va thanh toan ho minh luon nhe, toi can nhanh." | ngan, sot ruot | dat ve/thanh toan | giu -> D22 |
| C12 | "Minh nghe noi cau Rong phun lua toi thu 6, khong biet dung khong, lap lich toi nay dua vao cai do giup minh." | dai | thong tin nghe noi/can kiem chung | giu -> D23 |
| C12 | "Hoi bao tren TikTok bao cho A mo cua 24/7, dua vao lich duoc khong?" | ngan, mixed source | can canh bao nguon | giu -> D24 |
| C12 | "Cau Rong chac chan phun lua moi toi, cu xep vao lich 8h toi." | qua chac | AI lam mat uncertainty cua user | loai - khong giu 'khong chac' |

## Tong ket human filter

- Sinh tho: 30 rows.
- Loai: 6 rows.
- Ly do loai chinh: doi slice 1 ngay thanh 2-3 ngay, tu them thoi gian/budget lam mat ambiguity, lam mat rang buoc an chay, bien thong tin khong chac thanh khang dinh chac chan.
- Giu sau loc: 24 rows -> dung trong `REPORT.md` (D01-D24).
- Nhan xet: AI co xu huong lam case kho thanh sach hon, nhat la missing-context va uncertain-source. Vi vay human filtering giu lai cac input con lam agent phai hoi lai, canh bao hoac tu choi hanh dong vuot quyen.
