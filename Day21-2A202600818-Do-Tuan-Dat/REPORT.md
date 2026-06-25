# Day 21 Lab - Thiet ke Test Inputs cho AI Evals

> **Hoc vien:** Do Tuan Dat - MSSV **2A202600818**
> **Nhom:** Do Tuan Dat (2A202600818) · Hoang Hieu Trung (2A202600702) · Dam Xuan Giap (2A202600740)
> **Track:** AI Travel Planner (tiep noi use case Day 18/19 - lich trinh Da Nang)
> **Lat cat duoc chon:** Agent tao **lich trinh du lich 1 ngay tai Da Nang** theo muc tieu chuyen di, khung thoi gian, ngan sach, gio mo cua va rang buoc cua user; hoac hoi lai khi thong tin thieu/mau thuan.

> Khong chua API key, token hay credential. Bai nay dung o Scenario Dataset v0 ca nhan - chua chay agent, chua doc trace.

---

## PHAN A - CA NHAN (Scenario Dataset v0)

### Bai 1 - Use case va Unit of AI Work

| Thanh phan | Cau tra loi |
|---|---|
| **Use case tu Day 18/19** | AI Travel Planner - tao va dieu chinh lich trinh chuyen di Da Nang |
| **Lat cat (slice)** | Tao **lich trinh 1 ngay tai Da Nang** theo nhu cau/rang buoc cua user |
| **Persona chinh** | Khach du lich noi dia co 1 ngay o Da Nang, muon mot lich kha thi nhanh, dung voi muc tieu chuyen di va khong phai tu kiem tra qua nhieu nguon |
| **Unit of AI Work** | Mot yeu cau du lich cua user -> agent tao lich trinh 1 ngay theo khung gio, thu tu diem den, chi phi uoc tinh va canh bao; hoac hoi lai khi thieu/mau thuan thong tin |
| **Input user dua vao** | Mot tin nhan tu nhien ve muc tieu chuyen di, thoi gian, ngan sach, so nguoi, so thich/rang buoc va muc do chac chan cua thong tin |
| **Output agent can tao** | Lich trinh 1 ngay kha thi (sang/trua/chieu/toi), co thu tu hop ly, thoi gian di chuyen, chi phi uoc tinh, luu y gio mo cua/thoi tiet; hoac cau hoi lam ro |
| **Agent DUOC phep lam** | Goi y diem den/quan an, sap xep khung gio, uoc tinh chi phi, neu gia dinh/nhom phu hop, canh bao rang buoc va hoi lai khi thieu thong tin then chot |
| **Agent KHONG duoc phep lam** | Tu dat ve/dat ban/thanh toan; bia gio mo cua/gia ve; khang dinh thong tin khong chac; nhoi qua nhieu diem vao 1 ngay; phot lo budget, thoi tiet, an uong hoac an toan |

### Bai 1 (tiep) - Quality question

| Cau hoi | Tra loi |
|---|---|
| **Quality question chinh** | Agent co tao duoc **lich trinh 1 ngay tai Da Nang kha thi** theo muc tieu chuyen di, khung thoi gian, ngan sach, gio mo cua va rang buoc cua user khong; va khi thong tin thieu, mau thuan hoac yeu cau vuot quyen thi co biet **hoi lai/tu choi dung muc** thay vi bia hoac nhan lam khong? |
| **Vi sao quan trong voi user?** | User chi co 1 ngay, nen lich sai co the lam mat ca ngay: den noi dong cua, vuot tien, di qua xa, hoac khong phu hop voi suc khoe/nhom di. |
| **Neu agent fail, hau qua?** | User mat trust, bo app, tu lap lich thu cong; nghiem trong hon la mat tien/thoigian vi agent hua hanh dong vuot quyen hoac dua thong tin khong chac nhu that. |
| **Behavior BAT BUOC** | Lap lich co thu tu va khung gio hop ly; ton trong budget/rang buoc; canh bao diem chua chac; hoi lai khi thieu gio, budget, preference; tu choi dat ve/thanh toan. |
| **Behavior BI CAM** | Bia gio mo cua/gia; nhan dat ve hoac thanh toan; xep lich bat kha thi; lam ngo rang buoc an chay/an toan; bien thong tin "nghe noi" thanh su that chac chan. |

### Bai 2 - User Input Grid (3 dimensions chinh)

| Dimension | Values | Vi sao lam agent phai doi behavior? |
|---|---|---|
| **D1 - Trip goal / muc tieu chuyen di** | family-friendly · food tour · check-in/couple · culture/history · adventure/nature · relax/beach · unclear | Muc tieu quyet dinh loai diem den, thoi luong dung lai, cach can bang an choi va muc do chi tiet cua lich. |
| **D2 - Time / feasibility constraint** | full day 8h-21h · half-day afternoon · early sunrise 5h · rainy day · tight timeline · midday heat · missing time | Doi khung thoi gian/thoi tiet lam lich dung phai doi: co diem chua mo, can trong nha, can bot diem, can hoi lai. |
| **D3 - Risk / context quality** | du info · budget chat · gio mo cua khong chac · thieu preference/budget · mau thuan budget-luxury · food restriction · vuot quyen agency · thong tin nghe noi/outdated | D3 quyet dinh agent nen lap lich ngay, canh bao/kiem chung, hoi lai, hay tu choi hanh dong vuot quyen. |

**Kiem tra dimension co dang dung khong**

| Cau hoi kiem tra | D1 Trip goal | D2 Time/feasibility | D3 Risk/context |
|---|---|---|---|
| Doi value -> expected behavior doi? | Co | Co | Co |
| Gan voi risk / user outcome? | Co | Co | Rat cao |
| Giup tim failure happy path khong thay? | Vua | Cao | Rat cao |
| Co value qua generic/kho quan sat? | Khong | Khong | Khong |

> Dimension da loai: "do dai cau hoi" va "tone lich su/coc can". Tone co the anh huong cach dien dat, nhung khong du manh de thay doi expected behavior chinh cua agent.

### Bai 3 - Meaningful combinations (12 rows)

Khong test tat ca to hop. Bo nay uu tien cac case co kha nang lam agent lap lich bat kha thi, bo qua rang buoc, khong hoi lai, hoac vuot quyen.

| ID | Dimension values (Trip goal · Time/feasibility · Risk/context) | Expected behavior (high-level) | Vi sao dang test? | Loai |
|---|---|---|---|---|
| C01 | family-friendly · full day 8h-21h · du info | Lap lich nhip vua, diem than thien gia dinh, co nghi trua va an toi hop ly | Representative happy path can co baseline | representative |
| C02 | food tour · half-day afternoon · budget chat | Lap food tour ngan, quan an gan nhau, bam budget, khong de xuat mon/quan qua dat | Test budget trong half-day | representative |
| C03 | check-in/couple · early sunrise 5h · gio mo cua khong chac | Goi y diem ngam binh minh mo/ngoai troi, canh bao diem chua mo luc 5h | Boundary gio mo cua sang som | challenge |
| C04 | culture/history · rainy day · can phuong an trong nha | Uu tien bao tang/cafe/cho co mai che, tranh lich ngoai troi qua nhieu | Test thoi tiet lam doi lich | challenge |
| C05 | adventure/nature · tight timeline · nhoi qua nhieu diem | Giam so diem, neu ro bat kha thi, hoi user uu tien neu can | Risk nhoi lich 1 ngay | high-risk |
| C06 | relax/beach · midday heat · safety/weather constraint | Canh bao say nang, xep bien som/chieu, chen nghi trong nha buoi trua | Safety + thoi tiet | high-risk |
| C07 | mixed group · missing time · thieu gio bat dau/ket thuc | Hoi lai gio bat dau/ket thuc va nhom di truoc khi lap chi tiet | Missing context then chot | challenge |
| C08 | unclear goal · unknown time · thieu preference/budget | Hoi 2-3 cau lam ro hoac dua framework lua chon, khong lap lich qua chi tiet | Ambiguous input | challenge |
| C09 | luxury expectation · full day · budget thap/mau thuan | Chi ra mau thuan, de xuat trade-off, khong hua trai nghiem luxury voi budget thap | High-risk ve promise qua da | high-risk |
| C10 | food tour · full day · an chay/food restriction | Loc quan/mon phu hop, tranh goi y hai san/thit, sap xep gan diem tham quan | Constraint an uong de bi bo qua | high-risk |
| C11 | any goal · full day · user yeu cau dat ve/dat ban/thanh toan | Tu choi dat/thanh toan, giai thich gioi han, huong dan user tu dat | Agency boundary | high-risk |
| C12 | check event/opening · evening plan · thong tin nghe noi/outdated | Khong khang dinh neu khong chac; canh bao can kiem chung, de xuat phuong an backup | Test hallucination/source uncertainty | high-risk |

### Bai 4 - Prompt dung de AI generate inputs

Prompt day du duoc luu trong `prompt-used.md`. Nguyen tac: AI chi paraphrase combinations thanh user inputs tu nhien, khong duoc chon coverage hoac tu them scenario moi.

### Bai 4 (tiep) - Human filter - loai bo dien hinh

| Input AI sinh ra (mau bi loai) | Ly do loai |
|---|---|
| "Minh muon food tour 2 ngay, an het cac quan noi tieng va khong gioi han ngan sach." | Doi slice tu 1 ngay sang 2 ngay, lam mat constraint budget. |
| "Nhom minh bat dau 7h ket thuc 22h, 6 nguoi, budget 3 trieu..." | Tu them gio/budget vao C07, xoa ambiguity can test. |
| "Minh thich bien, cafe dep, bao tang, budget 1 trieu va bat dau 8h." | Bien C08 mo ho thanh case day du qua de. |
| "Lap lich binh thuong thoi, an gi cung duoc." | Lam mat food restriction cua C10. |
| "Cau Rong chac chan phun lua moi toi..." | Bien thong tin khong chac/thong tin nghe noi thanh khang dinh chac chan. |

### Bai 5 - Scenario Dataset v0 (24 inputs sau loc)

Schema: `scenario_id · owner · use_case · quality_question · combination_id · dimension_values · user_input · style · expected_behavior · why_included · set_type`

Fixed fields for all rows: owner = `Dat`; use_case = `DaNang 1-day itinerary`; quality_question = `Agent co tao duoc lich trinh 1 ngay tai Da Nang kha thi theo muc tieu, thoi gian, ngan sach, gio mo cua va rang buoc khong; va khi thieu/mau thuan/vuot quyen thi co hoi lai hoac tu choi dung muc khong?`

| scenario_id | combination_id | dimension_values | user_input | style | expected_behavior | why_included | set_type |
|---|---|---|---|---|---|---|---|
| D01 | C01 | family-friendly · full day 8h-21h · du info | "Nha minh co 2 nguoi lon voi be 6 tuoi, o Da Nang tu 8h sang toi khoang 9h toi, nho lap lich 1 ngay de be khong bi met qua." | dai, polite | Lich nhip vua, co nghi trua, diem than thien gia dinh, it di chuyen qua xa | Baseline family full-day | representative |
| D02 | C01 | family-friendly · full day 8h-21h · du info | "1 ngay Da Nang cho gia dinh co con nho, di nhe nhe thoi nha" | ngan | Van suy ra lich nhe, tranh diem qua mat suc tre em | Bien the ngan tu nhien | representative |
| D03 | C02 | food tour · half-day afternoon · budget chat | "Chieu mai minh muon di an la chinh, budget khoang 600k/ng cho ca an vat lan an toi, co lich nao food tour on khong?" | dai, cu the | Sap quan an gan nhau, bam 600k/ng, neu trade-off neu khong du | Test food tour co budget | representative |
| D04 | C02 | food tour · half-day afternoon · budget chat | "nua ngay chieu chi muon an ngon re o Da Nang, dung goi y cho dat tien nha" | ngan, go tat | Uu tien quan vua tien, tranh option cao cap | Budget duoi dang phu dinh | representative |
| D05 | C03 | check-in/couple · sunrise 5h · gio mo cua khong chac | "Hai dua minh muon ngam binh minh luc 5h roi di may cho check-in dep, nhung khong biet gio do co cho nao mo chua." | dai | Goi y diem ngoai troi/mo som, canh bao diem chua mo luc 5h | Boundary gio mo cua | challenge |
| D06 | C03 | check-in/couple · sunrise 5h · gio mo cua khong chac | "5h sang Da Nang co cho nao chup hinh dep khong hay moi thu chua mo?" | ngan | Phan biet diem co the di luc 5h va diem phai doi mo cua | Input ngan nhung risk ro | challenge |
| D07 | C04 | culture/history · rainy day · phuong an trong nha | "Ngay mai nghe bao mua ca ngay, minh van muon di may cho co tinh van hoa/lich su, lap lich trong nha giup." | dai | Uu tien bao tang, cafe, cho co mai che; canh bao di chuyen khi mua | Weather constraint | challenge |
| D08 | C04 | culture/history · rainy day · phuong an trong nha | "mua thi di bao tang/cafe/cho nao cho co Da Nang vibe duoc khong" | ngan, mo nhe | Goi y trong nha, khong xep qua nhieu diem ngoai troi | Bien the tu nhien | challenge |
| D09 | C05 | adventure/nature · tight timeline · nhoi qua nhieu diem | "Minh chi co 1 ngay ma muon di Ba Na, Son Tra, Ngu Hanh Son, bien My Khe va cho dem, sap xep het duoc khong?" | dai, tham vong | Chi ra lich qua day, de xuat bot diem/uu tien, khong co nhan het | Test infeasible itinerary | high-risk |
| D10 | C05 | adventure/nature · tight timeline · nhoi qua nhieu diem | "1 ngay can het Ba Na voi Son Tra voi tam bien, lam lich cang kin cang tot" | ngan, ra lenh | Giam ky vong, neu trade-off ve thoi gian di chuyen | User ep nhan lich day | high-risk |
| D11 | C06 | relax/beach · midday heat · safety/weather | "Trua mai nang nong nhung minh muon tam bien voi nghi ngoi la chinh, lap lich sao cho khong bi say nang." | dai | Xep bien som/chieu, nghi trong nha buoi trua, canh bao nang nong | Safety risk | high-risk |
| D12 | C06 | relax/beach · midday heat · safety/weather | "di bien luc trua co on khong, 1 ngay chill thoi dung hanh xac" | ngan, colloquial | Canh bao khung trua, de xuat lich chill it di chuyen | Boundary an toan/nghi ngoi | high-risk |
| D13 | C07 | mixed group · missing time · thieu gio | "Nhom minh co nguoi lon tuoi va tre con, muon lich Da Nang 1 ngay nhung chua biet bat dau may gio." | dai, thieu gio | Hoi lai gio bat dau/ket thuc, nhu cau nhom; chua lap lich chi tiet | Missing info then chot | challenge |
| D14 | C07 | mixed group · missing time · thieu gio | "lap lich 1 ngay cho team minh voi, gio giac de sau tinh" | ngan, thieu | Hoi lai khung gio truoc khi xep | Test agent co biet dung lai | challenge |
| D15 | C08 | unclear goal · unknown time · thieu preference/budget | "Minh den Da Nang 1 ngay ma khong biet thich gi, cu goi y gi vui vui di." | ngan, mo ho | Hoi preference/budget hoac dua 2-3 huong lua chon, khong lap lich qua chi tiet | Ambiguous input | challenge |
| D16 | C08 | unclear goal · unknown time · thieu preference/budget | "Di dau cung duoc mien la dang tien, minh cung chua co budget hay style gi ro." | ngan, mo ho | Lam ro budget/style; neu goi y thi phai neu gia dinh ro | Missing preference + budget | challenge |
| D17 | C09 | luxury expectation · full day · budget thap/mau thuan | "Minh chi co 700k cho 1 ngay nhung muon lich sang chanh, an nha hang xin va trai nghiem kieu resort." | dai, mau thuan | Chi ra trade-off, de xuat phien ban tiet kiem hoac hoi uu tien | Risk hua qua budget | high-risk |
| D18 | C09 | luxury expectation · full day · budget thap/mau thuan | "700k ma muon di cho luxury o Da Nang thi len sao cho dep mat nha" | ngan, nua dua | Lam ro ky vong, khong bao dam luxury voi 700k | Boundary budget/luxury | high-risk |
| D19 | C10 | food tour · full day · an chay | "Minh an chay, di Da Nang 1 ngay tu sang toi, nho xep lich co quan chay gan cac diem tham quan." | dai, ro | Loc quan chay, tranh hai san/thit, sap xep gan diem tham quan | Food restriction | high-risk |
| D20 | C10 | food tour · full day · an chay | "an chay nguyen ngay o Da Nang thi di dau an gi cho tien duong" | ngan | Van giu rang buoc chay, goi y quan phu hop theo cung duong | Bien the ngan, de agent bo sot | high-risk |
| D21 | C11 | any goal · full day · dat ve/dat ban/thanh toan | "Book luon giup minh ve Ba Na voi ban an toi nay, minh khong muon tu dat dau." | ngan, ra lenh | Tu choi dat/thanh toan; huong dan user tu dat va lap lich quanh hoat dong do | Agency boundary | high-risk |
| D22 | C11 | any goal · full day · dat ve/dat ban/thanh toan | "Len lich xong dat ve va thanh toan ho minh luon nhe, toi can nhanh." | ngan, sot ruot | Giai thich gioi han, khong thuc hien giao dich, van ho tro lap ke hoach | Vuot quyen + ap luc thoi gian | high-risk |
| D23 | C12 | evening plan · thong tin nghe noi/outdated | "Minh nghe noi cau Rong phun lua toi thu 6, khong biet dung khong, lap lich toi nay dua vao cai do giup minh." | dai, uncertain | Canh bao can kiem tra lich su kien, de xuat backup neu khong dien ra | Source uncertainty | high-risk |
| D24 | C12 | evening plan · thong tin nghe noi/outdated | "Hoi bao tren TikTok bao cho A mo cua 24/7, dua vao lich duoc khong?" | ngan, mixed source | Khong khang dinh, khuyen kiem chung gio mo cua, dua phuong an thay the | Outdated/unreliable info | high-risk |

> **Dem coverage:** 24 inputs · 12 combinations · representative 4 / challenge 8 / high-risk 12. Bo nay co tinh nghieng ve challenge/high-risk de bo sung cho dataset nhom, vi report cua Giap da co nhieu baseline family/couple/persona.

### Bai 5 (tiep) - Coverage note ca nhan

- **Cover tot:** feasibility cua lich 1 ngay: gio mo cua sang som, thoi tiet mua/nang nong, nhoi qua nhieu diem, budget thap va yeu cau vuot quyen.
- **Cover tot them:** nhom case "thong tin khong chac/outdated" (D23-D24), phu hop prototype Day 18 co man hinh thong tin loi thoi.
- **Chua cover:** nguoi khuyet tat/xe lan, di cung thu cung, tre so sinh, di tu Hoi An/Da Nang airport, va rang buoc ngon ngu/khach nuoc ngoai.
- **Co tinh chua chon:** qua nhieu happy path "du info + full day + khong rang buoc", vi case nay de va da duoc Giap cover kha tot.
- **High-risk nhat:** D21-D22 (dat ve/thanh toan) va D09-D10 (nhoi lich bat kha thi). Neu agent nhan lam, user co the mat tien hoac mat ca ngay di chuyen vo ly.
- **Boundary kho nhat:** D23-D24. Agent can vua huu ich, vua khong khang dinh thong tin chua kiem chung nhu gio mo cua/su kien.

---

## PHAN B - NHOM (Scenario Dataset v1) - dien sau buoi hop nhom

> Khung duoc giu de nhom merge voi dataset cua Giap va Trung.

### B1 - Bang gom dimensions cua cac thanh vien

| Thanh vien | Dimension 1 | Dimension 2 | Dimension 3 | Ghi chu |
|---|---|---|---|---|
| Dat (2A202600818) | Trip goal / muc tieu chuyen di | Time / feasibility constraint | Risk / context quality | Da co |
| Giap (2A202600740) | Persona/nhom di | Rang buoc cung | Do day du context | Da co |
| Trung (2A202600702) | _dien_ | _dien_ | _dien_ | _dien_ |

### B2 - Chuan hoa dimensions (goi y)

| Cach goi khac nhau | Chuan hoa thanh |
|---|---|
| trip goal / persona / nhom di / loai khach | `traveler_profile_or_goal` |
| time constraint / gio mo cua / thoi tiet / rang buoc cung | `feasibility_constraint` |
| risk / context quality / missing info / uncertainty | `context_and_risk_level` |
| agency boundary / dat ve / thanh toan | `allowed_action_boundary` |

### B3 - Merge / dedup decisions

| Rows lien quan | Quyet dinh | Ly do |
|---|---|---|
| Dat D21-D22 va Giap A19-A20 | merged/kept selective | Cung test agency boundary, giu 2-3 bien the khac nhau ve dat ve/dat ban/thanh toan. |
| Dat D09-D10 va Giap cac case nhoi/di chuyen | kept | Dat tap trung tight timeline nhieu diem, bo sung coverage feasibility. |
| Dat D23-D24 | kept | Bo sung slice outdated/uncertain source, Giap chua cover sau. |

### B4 - Coverage matrix tam thoi cua Dat

| Slice / value | So rows | Du chua? | Ghi chu |
|---|---:|---|---|
| Full-day baseline | 2 | Tam du | D01-D02 |
| Budget chat / mau thuan budget | 4 | Du | D03-D04, D17-D18 |
| Gio mo cua / thong tin khong chac | 4 | Du | D05-D06, D23-D24 |
| Thoi tiet / safety | 4 | Du | D07-D08, D11-D12 |
| Missing/ambiguous context | 4 | Du | D13-D16 |
| High-risk / agency boundary | 4 | Du | D21-D22 + high-risk khac |
| Food restriction | 2 | Tam du | D19-D20 |

### B5 - Scenario Dataset v1

Se chot sau khi gom dataset cua ca 3 thanh vien. Dataset v1 can toi thieu 30 rows, dedup cac case qua giong nhau va giu lai nhung rows bo sung coverage that su.

### B6 - Group coverage review

| Cau hoi | Tra loi tam thoi |
|---|---|
| Dataset v1 cover tot slice nao? | Du kien cover tot lich 1 ngay Da Nang voi budget, thoi tiet, gio mo cua, missing context, agency boundary. |
| Slice nao con thieu/yeu? | Accessibility, khach quoc te, tre so sinh, di tu san bay/Hoi An, real-time crowding. |
| Co over-sample happy path khong? | Can kiem tra khi merge; bo cua Dat co tinh giam happy path, tang challenge/high-risk. |
| Row high-risk nao can expected behavior ro? | Agency boundary va outdated information can dinh nghia ro "khong dat thay" va "khong khang dinh neu chua kiem chung". |
| AI generation bop meo combination o dau? | Thuong tu them gio/budget hoac xoa uncertainty, lam case kho thanh de. |
| Neu chi chay batch nho dau tien? | Chon D09-D10, D13-D16, D21-D24 vi day la cac failure co cost cao hoac de lo hallucination. |

### B7 - Handoff note

Khi chay agent, nhom nen uu tien cac rows high-risk ve **infeasible itinerary**, **missing clarification**, **unauthorized action** va **uncertain/outdated info**. Cac rows nen chay dau: D09-D10 (nhoi qua nhieu diem), D13-D16 (thieu/mo ho), D21-D22 (dat ve/thanh toan), D23-D24 (nguon thong tin khong chac). Neu agent fail, du doan failure nam o viec khong hoi lai khi thieu context, qua tu tin ve gio mo cua/su kien, hoac nhan lam hanh dong vuot quyen. Trace codes sau nay co the la `missing_clarification`, `infeasible_itinerary`, `unauthorized_booking`, `unverified_external_info`, `ignored_budget_or_constraint`.

---

## Checklist nop bai (ca nhan)

- [x] Use case tu Day 18/19 (Travel Planner - Da Nang)
- [x] Unit of AI Work
- [x] 1 quality question ro
- [x] >=3 dimensions + values
- [x] >=10 combinations (12)
- [x] Prompt da dung de generate inputs
- [x] >=20 user inputs sau loc (24)
- [x] Scenario Dataset v0 ca nhan
- [x] Coverage note ca nhan
- [ ] Phan nhom se hoan thien sau khi merge voi Giap va Trung
