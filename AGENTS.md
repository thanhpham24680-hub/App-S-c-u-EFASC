# AGENTS.md

Hướng dẫn cho AI agent khi làm việc với dự án này.

## Ngôn ngữ

- Toàn bộ nội dung người dùng là tiếng Việt. Luôn phản hồi bằng tiếng Việt.
- Code, comment, tên file, tên biến dùng tiếng Anh hoặc tiếng Việt không dấu tùy ngữ cảnh — giữ nhất quán với file lân cận.

## Kiến trúc

- Đây là web tĩnh (HTML + CSS + JS thuần), không build step, không framework.
- Dữ liệu bài học nằm trong `assets/js/data.js` (biến `lessons`).
- Ngân hàng quiz/flashcard nằm trong `data/quiz.json` và `data/flashcards.json`.
- Logic chia module: `app.js` (chung), `flashcard.js`, `quiz.js`, `search.js`.
- CSS nằm trong `assets/css/styles.css` — dùng CSS variables cho dark mode và theme.

## Quy ước

- Không thêm dependency mới trừ khi thực sự cần.
- Không thay đổi thiết kế/giao diện hiện có trừ khi user yêu cầu.
- Khi thêm bài học mới: cập nhật `data.js` + bổ sung flashcard/quiz tương ứng trong 2 file JSON.
- Giữ RLS/Supabase không áp dụng ở đây vì dự án không dùng database (chỉ localStorage).

## Kiểm tra

- Sau khi sửa code, mở trang trên dev server để xác nhận không lỗi console.
- Không có build script — `npm start` chỉ chạy servor.
