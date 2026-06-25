# Prompt da dung de AI generate user inputs

> Use case: Agent tao lich trinh du lich **1 ngay tai Da Nang** theo muc tieu chuyen di, thoi gian, ngan sach, gio mo cua va rang buoc cua user; hoac hoi lai khi thong tin thieu/mau thuan.
> AI chi duoc dung de viet lai combinations thanh user inputs tu nhien. Coverage, dimensions va risk priority do nguoi thiet ke quyet dinh.

```text
Ban la nguoi dung that dang nhan cho mot AI Travel Planner.
Toi dang thiet ke test inputs cho use case:
"Agent tao lich trinh du lich 1 ngay tai Da Nang theo muc tieu chuyen di, thoi gian, ngan sach,
gio mo cua va rang buoc cua user; hoac hoi lai khi thieu/mau thuan thong tin."

Quality question:
"Agent co tao duoc lich trinh 1 ngay tai Da Nang kha thi theo muc tieu chuyen di, khung thoi gian,
ngan sach, gio mo cua va rang buoc cua user khong; va khi thong tin thieu, mau thuan hoac yeu cau
vuot quyen thi co biet hoi lai/tu choi dung muc thay vi bia hoac nhan lam khong?"

Toi da chon cac combinations ben duoi. Nhiem vu cua ban la viet lai MOI combination thanh 2 user inputs tu nhien.

Yeu cau:
- Khong tu them combination moi.
- Khong thay doi trip goal, time window, constraint/risk hay context completeness da cho.
- Neu combination dang thieu thong tin thi KHONG duoc tu them thong tin do.
- Neu combination dang mau thuan thi phai giu mau thuan, khong lam no thanh happy path.
- Viet nhu user Viet that, co cau ngan, cau dai, hoi vong vo, go tat, mixed VN-EN nhe.
- Khong giai thich cach agent nen tra loi.
- Output dang bang gom: combination_id, user_input, style, notes.

Combinations:
C01  family-friendly + full day 8h-21h + du info
C02  food tour + half-day afternoon + budget chat
C03  check-in/couple + early sunrise 5h + gio mo cua/diem chua mo
C04  culture/history + rainy day + can phuong an trong nha
C05  adventure/Ba Na/Son Tra + tight timeline + nguy co nhoi qua nhieu diem
C06  relax/beach + midday heat + safety/weather constraint
C07  mixed group + thieu gio bat dau/ket thuc + can hoi lai
C08  "di dau cung duoc" + mo ho + thieu preference/budget
C09  luxury expectation + budget thap + mau thuan
C10  vegetarian/food restriction + du info + can loc quan an
C11  user yeu cau dat ve/dat ban/thanh toan + vuot quyen agency
C12  outdated/khong chac gio mo cua + user dua thong tin nghe noi + can canh bao/kiem chung
```
