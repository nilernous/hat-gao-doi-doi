# HẠT GẠO ĐỔI ĐỜI

## Đặc tả sản phẩm website tương tác (MVP -- 8 giờ)

> **Thông điệp:** Một hạt gạo. Một hành trình. Nhiều số phận.\
> **Câu hỏi trung tâm:** Ai tạo ra giá trị và giá trị được phân phối như
> thế nào trong chuỗi ngành lúa gạo?

------------------------------------------------------------------------

## 1. Tổng quan sản phẩm

**HẠT GẠO ĐỔI ĐỜI** là website tương tác phục vụ bài thuyết trình về tái
cơ cấu ngành lúa gạo ở Đồng bằng sông Cửu Long dưới góc nhìn học thuyết
giá trị thặng dư của C. Mác.

Website không chỉ trình bày lý thuyết mà cho phép người xem:

1.  Khám phá hành trình của hạt gạo từ sản xuất đến tiêu thụ.
2.  Tìm hiểu vai trò, chi phí và lợi ích của các chủ thể trong chuỗi giá
    trị.
3.  Thử thay đổi phương thức tổ chức sản xuất và tiêu thụ để quan sát
    kết quả mô phỏng.
4.  Tìm hiểu các nhóm giải pháp tái cơ cấu ngành lúa gạo.

**Định dạng:** Interactive storytelling + economic simulator.\
**Đối tượng:** Giảng viên, sinh viên và người quan tâm đến ngành lúa gạo
ĐBSCL.\
**Thời lượng trải nghiệm mục tiêu:** 3--5 phút.

## 2. Mục tiêu và nguyên tắc

### 2.1. Mục tiêu

-   Chuyển nội dung học thuật thành trải nghiệm trực quan, dễ tiếp cận.
-   Giúp người xem hiểu sự khác nhau giữa doanh thu, chi phí, thu nhập
    và giá trị thặng dư.
-   Minh họa tác động có thể có của liên kết hợp tác xã, cơ giới hóa và
    tổ chức lại sản xuất.
-   Tạo sản phẩm có thể trình diễn trực tiếp trong buổi báo cáo.

### 2.2. Nguyên tắc nội dung

-   Phân biệt rõ **doanh thu**, **chi phí**, **lợi nhuận/thu nhập kinh
    tế còn lại** và **giá trị thặng dư**.
-   Không mặc định mọi chênh lệch giữa giá mua và giá bán đều là giá trị
    thặng dư theo C. Mác.
-   Không đồng nhất thu nhập của hộ nông dân tự canh tác với giá trị
    thặng dư trong quan hệ lao động làm thuê.
-   Mọi con số dùng trong mô phỏng phải có nhãn **"số liệu minh họa/giả
    định"**, trừ khi nhóm xác minh được nguồn dữ liệu thực tế.
-   Không trình bày kết quả mô phỏng như dự báo hoặc kết luận thống kê
    về toàn ngành.

## 3. Phạm vi MVP

### 3.1. Bốn khu vực chính

  -----------------------------------------------------------------------
  Khu vực                 Nội dung                Tương tác
  ----------------------- ----------------------- -----------------------
  Trang chủ               Thông điệp, hình ảnh    Nút bắt đầu, điều hướng
                          cánh đồng, giới thiệu   
                          trải nghiệm             

  Hành trình hạt gạo      Các công đoạn và chủ    Chọn từng giai đoạn để
                          thể trong chuỗi giá trị xem thông tin

  Mô phỏng kinh tế        So sánh hai kịch bản tổ Chọn kịch bản, cập nhật
                          chức sản xuất/tiêu thụ  kết quả

  Giải pháp tái cơ cấu    Các nhóm giải pháp và   Bật/tắt nhóm giải pháp,
                          tác động kỳ vọng        xem giải thích
  -----------------------------------------------------------------------

### 3.2. Ngoài phạm vi

Không triển khai trong phiên bản 8 giờ:

-   Đăng ký, đăng nhập, phân quyền.
-   Backend, database hoặc CMS.
-   Chatbot AI hoặc tích hợp mô hình ngôn ngữ.
-   Dữ liệu giá lúa/gạo thời gian thực.
-   Bản đồ GIS, định vị hoặc dashboard quản trị.
-   Game 3D, nhân vật, hệ thống nhiệm vụ và lưu tiến trình.
-   Mô hình kinh tế lượng hoặc dự báo sản lượng/giá cả.

## 4. Cấu trúc và nội dung từng khu vực

### 4.1. Trang chủ -- Hero

**Tiêu đề:** Một hạt gạo. Một hành trình. Nhiều số phận.

**Mô tả:** Khám phá hành trình tạo ra giá trị, phân phối lợi ích và
tương lai của người nông dân Đồng bằng sông Cửu Long.

**CTA:** `Bắt đầu hành trình`

Yêu cầu giao diện: - Ảnh nền cánh đồng lúa ĐBSCL chất lượng cao. - Tiêu
đề lớn, dễ đọc; lớp phủ giúp nội dung tương phản. - Điều hướng đến các
khu vực chính. - Chuyển động nhẹ khi tải trang hoặc cuộn.

### 4.2. Hành trình hạt gạo -- Rice Value Chain

Hiển thị chuỗi theo trình tự:

1.  **Nông dân:** chuẩn bị đất, gieo trồng, chăm sóc và thu hoạch.
2.  **Thương lái / Hợp tác xã:** thu gom, kết nối đầu ra, tổ chức vận
    chuyển hoặc liên kết tiêu thụ.
3.  **Doanh nghiệp chế biến:** sấy, xay xát, phân loại, đóng gói và nâng
    cao chất lượng sản phẩm.
4.  **Phân phối / Xuất khẩu:** đưa sản phẩm đến thị trường và người tiêu
    dùng.

Khi người dùng chọn một giai đoạn, hiển thị: - Vai trò của chủ thể. -
Hoạt động chính. - Nhóm chi phí có thể phát sinh. - Nguồn thu hoặc lợi
ích kinh tế. - Vị trí của chủ thể trong chuỗi.

**Lưu ý:** Không tự gán tỷ lệ phân chia giá trị hoặc tỷ suất lợi nhuận
nếu báo cáo không cung cấp dữ liệu có nguồn.

### 4.3. Mô phỏng kinh tế -- Economic Simulator

Đây là tính năng tương tác quan trọng nhất và cần được ưu tiên hoàn
thiện.

**Bối cảnh:** Người dùng xem một ví dụ mô phỏng trên quy mô 1 ha trong
một vụ mùa.

**Hai kịch bản:** - Kịch bản A: Canh tác và tiêu thụ riêng lẻ. - Kịch
bản B: Liên kết thông qua hợp tác xã.

**Các chỉ số hiển thị:** - Doanh thu. - Chi phí vật tư. - Chi phí lao
động quy đổi. - Chi phí sử dụng đất. - Thu nhập kinh tế còn lại theo
cách tính của ví dụ.

**Công thức minh họa:**

``` text
Thu nhập kinh tế còn lại
= Doanh thu
- Chi phí vật tư
- Chi phí lao động quy đổi
- Chi phí sử dụng đất
```

**Dữ liệu ví dụ ban đầu:**

  Chỉ số (triệu đồng/ha/vụ)     Riêng lẻ   Liên kết HTX
  --------------------------- ---------- --------------
  Doanh thu                           36             39
  Chi phí vật tư                      22             20
  Chi phí lao động quy đổi             8              8
  Chi phí sử dụng đất                  2              2
  Thu nhập kinh tế còn lại             4              9

Kịch bản riêng lẻ lấy theo ví dụ được nhắc đến trong báo cáo nhóm (trang
29 theo bản trao đổi). Kịch bản HTX là **giả định minh họa để demo**,
không phải số liệu khảo sát hay số liệu thực tế đã được kiểm chứng.

**Hành vi giao diện:** - Người dùng chọn một trong hai kịch bản bằng
segmented control hoặc tab. - Các chỉ số và biểu đồ cập nhật ngay. -
Hiển thị phần giải thích ngắn về sự khác nhau giữa hai kịch bản. - Có
thể hiển thị nút "So sánh hai kịch bản" để đặt kết quả cạnh nhau.

**Yêu cầu tính toán:** Dữ liệu phải nằm trong một cấu hình tập trung;
không hard-code số liệu rải rác trong component.

### 4.4. Giải pháp tái cơ cấu

Trình bày ba nhóm giải pháp để người xem khám phá:

1.  **Tăng cường liên kết sản xuất và tiêu thụ:** phát triển hợp tác xã,
    liên kết chuỗi và hợp đồng minh bạch.
2.  **Ứng dụng khoa học -- công nghệ:** cơ giới hóa, cải thiện quy
    trình, nâng cao chất lượng và giảm chi phí.
3.  **Phát triển nguồn nhân lực và tính bền vững:** đào tạo, nâng cao
    năng lực tổ chức sản xuất và thích ứng với yêu cầu môi trường.

Người dùng có thể bật/tắt từng giải pháp. Website hiển thị mô tả về vấn
đề mà giải pháp hướng đến và tác động kỳ vọng.

Không cộng điểm hoặc đưa ra phần trăm tác động nếu không có mô hình và
dữ liệu hỗ trợ. Nếu có thanh tiến độ, chỉ dùng để thể hiện số nhóm giải
pháp người dùng đã chọn, không gọi đó là chỉ số phát triển kinh tế.

## 5. Luồng trải nghiệm người dùng

``` text
Trang chủ
   |
   v
Bắt đầu hành trình
   |
   v
Khám phá chuỗi giá trị
   |
   v
Chọn từng chủ thể để tìm hiểu
   |
   v
Mô phỏng hai kịch bản kinh tế
   |
   v
Khám phá giải pháp tái cơ cấu
   |
   v
Thông điệp kết luận
```

Thông điệp kết luận gợi ý:

> Tái cơ cấu ngành lúa gạo không chỉ là tăng sản lượng. Đó còn là tổ
> chức lại sản xuất, nâng cao chất lượng, tăng cường liên kết và cải
> thiện vị thế của người nông dân trong chuỗi giá trị.

Nhóm cần rà soát câu kết này để bảo đảm thống nhất với kết luận chính
thức trong báo cáo.

## 6. Thiết kế UI/UX

### 6.1. Phong cách

-   Chủ đề: Mekong Delta / Modern editorial / Cinematic documentary.
-   Cảm giác: hiện đại, giàu tính kể chuyện, gần gũi với nông nghiệp
    Việt Nam.
-   Tránh giao diện quản trị khô cứng hoặc phong cách game hoạt hình trẻ
    em.

### 6.2. Màu sắc gợi ý

  Vai trò        Màu
  -------------- -----------
  Xanh lúa đậm   `#173F30`
  Xanh lá phụ    `#64866B`
  Vàng lúa       `#E5BE65`
  Nền kem        `#F6F3EA`
  Chữ chính      `#202820`
  Chữ phụ        `#6D756D`

### 6.3. Thành phần giao diện

-   Sticky navigation.
-   Hero section có ảnh nền.
-   Timeline hoặc stepper cho chuỗi giá trị.
-   Card thông tin chủ thể.
-   Segmented control cho hai kịch bản mô phỏng.
-   Progress bar hoặc biểu đồ cột để so sánh.
-   Card giải pháp.
-   Footer ghi tên đề tài và thông tin nhóm.

### 6.4. Responsive

-   Desktop: bố cục rộng, timeline ngang nếu phù hợp.
-   Tablet: chuyển các cụm nội dung thành hai cột.
-   Mobile: timeline dọc, card một cột, biểu đồ không tràn ngang.
-   Nút tương tác phải đủ lớn để thao tác trên màn hình cảm ứng.

## 7. Công nghệ đề xuất

  Hạng mục      Công nghệ
  ------------- ------------------------------------------
  Framework     React + Vite
  Ngôn ngữ      TypeScript (khuyến nghị) hoặc JavaScript
  Styling       Tailwind CSS
  Animation     Motion
  Biểu đồ       Recharts
  Icon          Lucide React
  Lưu dữ liệu   Static data trong source code
  Deploy        Vercel

Không cần backend hoặc database cho MVP. Tất cả tương tác được xử lý ở
client-side.

## 8. Cấu trúc thư mục gợi ý

``` text
src/
├── assets/
│   └── images/
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   └── Footer.tsx
│   └── ui/
│       ├── SectionHeading.tsx
│       └── MetricCard.tsx
├── features/
│   ├── hero/
│   │   └── HeroSection.tsx
│   ├── rice-journey/
│   │   ├── RiceJourneySection.tsx
│   │   ├── JourneyTimeline.tsx
│   │   └── ActorDetail.tsx
│   ├── simulator/
│   │   ├── SimulatorSection.tsx
│   │   ├── ScenarioSelector.tsx
│   │   ├── EconomicBreakdown.tsx
│   │   └── scenario-data.ts
│   └── restructuring/
│       ├── RestructuringSection.tsx
│       └── SolutionCard.tsx
├── data/
│   ├── rice-chain.ts
│   └── solutions.ts
├── App.tsx
└── main.tsx
```

Có thể điều chỉnh cấu trúc nếu cần giảm thời gian. Không tạo thêm
abstraction hoặc component quá nhỏ khi chưa cần thiết.

## 9. Kế hoạch triển khai trong 8 giờ

  -----------------------------------------------------------------------
  Thời gian               Công việc               Kết quả
  ----------------------- ----------------------- -----------------------
  00:00--01:00            Khởi tạo dự án, cài thư Chạy được ứng dụng
                          viện, dựng layout và    
                          theme                   

  01:00--02:00            Làm Hero, Navbar,       Trang chủ hoàn chỉnh
                          Footer, responsive cơ   
                          bản                     

  02:00--03:30            Làm timeline chuỗi giá  Có tương tác khám phá
                          trị và chi tiết chủ thể 

  03:30--06:00            Làm mô phỏng, công      Tính toán hoạt động
                          thức, selector và biểu  đúng
                          đồ                      

  06:00--07:00            Làm khu vực giải pháp   Hoàn thiện nội dung
                          tái cơ cấu              

  07:00--08:00            Kiểm thử, sửa           Bản demo có thể trình
                          responsive, kiểm tra    chiếu
                          nội dung và deploy      
  -----------------------------------------------------------------------

### Thứ tự ưu tiên khi thiếu thời gian

1.  Mô phỏng kinh tế phải hoạt động chính xác.
2.  Chuỗi giá trị phải có tương tác.
3.  Nội dung học thuật phải đúng và có chú thích nguồn.
4.  Giao diện phải nhất quán và responsive.
5.  Animation chỉ bổ sung sau khi các phần trên hoàn thành.

## 10. Tiêu chí nghiệm thu

-   [ ] Website chạy được bằng lệnh development.
-   [ ] Có đủ bốn khu vực chính.
-   [ ] Điều hướng đến các khu vực hoạt động.
-   [ ] Chọn giai đoạn chuỗi giá trị sẽ hiển thị đúng thông tin.
-   [ ] Chuyển đổi kịch bản mô phỏng cập nhật đúng số liệu.
-   [ ] Công thức tính thu nhập kinh tế còn lại chính xác.
-   [ ] Số liệu giả định được ghi chú rõ ràng.
-   [ ] Nội dung không đánh đồng lợi nhuận với giá trị thặng dư.
-   [ ] Các nhóm giải pháp có thể bật/tắt và hiển thị giải thích.
-   [ ] Không có lỗi tràn ngang nghiêm trọng trên mobile.
-   [ ] Không có nút bấm giả hoặc tương tác không hoạt động.
-   [ ] Có thể deploy và mở website để trình diễn.

## 11. Lưu ý học thuật và kiểm chứng nội dung

Trước khi trình bày, nhóm cần đối chiếu lại toàn bộ nội dung với báo cáo
gốc:

-   Xác minh các số liệu, đơn vị tính và trang trích dẫn.
-   Phân biệt số liệu lấy từ báo cáo với dữ liệu giả định do nhóm tự xây
    dựng.
-   Không khẳng định kịch bản HTX chắc chắn làm thu nhập tăng nếu chưa
    có bằng chứng.
-   Giải thích đúng khái niệm giá trị thặng dư theo C. Mác; không dùng
    thuật ngữ này thay cho mọi khoản lợi nhuận.
-   Dùng phần website như công cụ minh họa và thảo luận, không thay thế
    lập luận học thuật của báo cáo.

------------------------------------------------------------------------

## 12. Tóm tắt quyết định sản phẩm

  Thuộc tính            Quyết định
  --------------------- ------------------------------------------------------
  Tên                   HẠT GẠO ĐỔI ĐỜI
  Tagline               Một hạt gạo. Một hành trình. Nhiều số phận.
  Loại sản phẩm         Interactive storytelling + economic simulator
  Nền tảng              Website
  Phạm vi               Frontend-only MVP
  Thời gian             8 giờ
  Tương tác trọng tâm   Khám phá chuỗi giá trị và mô phỏng kinh tế
  Công nghệ             React, Vite, Tailwind CSS, Motion, Recharts
  Không làm             Backend, database, login, chatbot, 3D, realtime data

**Định hướng cuối cùng:** Làm ít tính năng nhưng mỗi tính năng phải có
giá trị trình diễn và liên hệ trực tiếp với nội dung học thuật của nhóm.
