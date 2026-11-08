# Hạt Gạo Đổi Đời

Website tương tác (interactive storytelling + economic simulator) về tái cơ cấu ngành lúa gạo Đồng bằng sông Cửu Long dưới góc nhìn học thuyết giá trị thặng dư của C. Mác. Đặc tả đầy đủ ở [docs/overview.md](docs/overview.md).

Có hai chế độ, dùng chung dữ liệu:

| Chế độ | Đường dẫn | Mô tả |
| --- | --- | --- |
| **Game kể chuyện** (mặc định) | `/` | Game pixel art: theo chân Hạt Gạo qua 6 chương, phỏng vấn từng chủ thể, tính sổ vụ lúa, dựng lại làng lúa |
| **Bản bài viết** | `/?che-do=bai-viet` | Website editorial cuộn dọc như bản đầu tiên |

## Game kể chuyện

| Chương | Nội dung | Tương tác |
| --- | --- | --- |
| Mở đầu | Hạt lúa thức giấc | Đọc thoại |
| 1. Cánh đồng | Chú Tư (nông dân) | Chọn câu hỏi: việc làm, chi phí, nguồn thu, góc nhìn C. Mác |
| 2. Bến sông | Cô Năm (thương lái), Chị Hai (HTX) | Như trên |
| 3. Nhà máy xay xát | Anh Bảy (công nhân) | Như trên |
| 4. Bến cảng | Chị Mai (xuất khẩu) | Như trên |
| 5. Ngã rẽ | Mô phỏng 2 kịch bản | Tính sổ từng bước, so sánh A/B |
| 6. Làng lúa đổi mới | 3 nhóm giải pháp | Bật/tắt, làng trên sân khấu thay đổi theo |
| Kết | Thông điệp kết luận | Chơi lại, chọn chương |

Điều khiển: chạm, bấm chuột hoặc Space/Enter để đọc tiếp; phím 1–5 để chọn câu hỏi. Nút **Chương** cho phép nhảy thẳng tới chương bất kỳ khi thuyết trình.

Nhân vật đều là hư cấu. Toàn bộ hình ảnh là pixel art vẽ bằng code (`src/game/art/`), không dùng file ảnh ngoài.

## Chạy dự án

Yêu cầu Node.js 20 trở lên.

```bash
npm install
npm run dev      # chạy bản development tại http://localhost:5173
npm run build    # kiểm tra TypeScript và build bản production vào dist/
npm run preview  # xem thử bản build
```

## Chỉnh nội dung

Toàn bộ nội dung và số liệu nằm trong các file dữ liệu. Không cần sửa component.

| Nội dung | File |
| --- | --- |
| Tên đề tài, môn học, nhóm, thành viên, giảng viên (hiện ở footer) | `src/data/site.ts` |
| 4 chủ thể của chuỗi giá trị | `src/data/rice-chain.ts` |
| Số liệu 2 kịch bản mô phỏng, nguồn, giải thích khác biệt | `src/features/simulator/scenario-data.ts` |
| 4 khái niệm cần phân biệt | `src/features/simulator/ConceptNote.tsx` |
| 3 nhóm giải pháp | `src/data/solutions.ts` |
| Thông điệp kết luận (bản bài viết) | `src/features/conclusion/ConclusionSection.tsx` |
| Lời thoại, thứ tự chương, vị trí nhân vật trong game | `src/game/story/script.ts` |
| Tên, vai trò nhân vật game | `src/game/story/characters.ts` |
| Sprite nhân vật / bối cảnh pixel | `src/game/art/sprites.ts`, `src/game/art/backgrounds.ts` |

Số liệu mô phỏng và nội dung giải pháp dùng chung cho cả hai chế độ, nên chỉ cần sửa một chỗ. Lời thoại trong game được viết lại ở ngôi thứ nhất từ nội dung của `rice-chain.ts`; nếu sửa nội dung chuỗi giá trị thì nhớ sửa cả `script.ts`.

Trong `site.ts`, trường nào để trống sẽ không hiển thị ở footer.

"Thu nhập kinh tế còn lại" không được lưu sẵn mà được tính từ công thức trong `computeResidual()`:
Doanh thu − Chi phí vật tư − Chi phí lao động quy đổi − Chi phí sử dụng đất.

## Ảnh

Bản bài viết dùng ảnh từ Wikimedia Commons, được ghi nguồn ở footer:

- `hero-hon-dat.jpg`: Cánh đồng lúa tại Hòn Đất, Kiên Giang. Tác giả Thuydaonguyen, public domain.
- `field-can-tho.jpg`: Ruộng lúa ở Bình Thủy, Cần Thơ. Tác giả Dragfyre, CC BY-SA 3.0.

Nếu đổi ảnh, cập nhật lại `imageCredits` trong `src/data/site.ts`.

## Deploy lên Vercel

Vercel tự nhận ra dự án Vite nên không cần cấu hình thêm:

1. Đẩy code lên GitHub, rồi trên vercel.com chọn **Add New → Project** và import repo.
2. Hoặc dùng CLI: `npx vercel` (lần đầu cần đăng nhập), sau đó `npx vercel --prod`.

## Công nghệ

React 19, Vite, TypeScript, Tailwind CSS v4, Motion, Recharts, Lucide React. Chỉ có frontend: không backend, không database.
