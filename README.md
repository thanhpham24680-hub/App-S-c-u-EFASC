# Cẩm nang Sơ cấp cứu cộng đồng — ĐHYD TP.HCM

Ứng dụng web học sơ cấp cứu tương tác, bao gồm bài học, flashcard, quiz, và tìm kiếm toàn văn.

## Cấu trúc dự án

```
Project/
├── index.html              # Trang chủ (landing + grid + detail)
├── README.md               # Tài liệu này
├── AGENTS.md               # Hướng dẫn cho AI agent
├── favicon.ico             # Biểu tượng trang
├── assets/
│   ├── css/
│   │   └── styles.css       # Toàn bộ styling (design system, dark mode, responsive)
│   ├── js/
│   │   ├── data.js          # Dữ liệu 24 bài học (lessons)
│   │   ├── app.js           # Logic chính: navigation, sidebar, search, dark mode
│   │   ├── flashcard.js     # Module flashcard (flip, shuffle, SRS, bookmark, progress)
│   │   ├── quiz.js          # Module quiz (7 loại câu hỏi, giải thích, analytics)
│   │   └── search.js        # Module tìm kiếm (full-text, highlight, filter)
│   ├── images/              # Ảnh minh họa (remote via postimg)
│   ├── icons/               # Icon SVG
│   └── fonts/               # Font tự host (hiện dùng Google Fonts CDN)
├── pages/
│   ├── lesson.html          # Trang chi tiết bài học
│   ├── quiz.html            # Trang quiz đầy đủ
│   ├── flashcard.html       # Trang flashcard đầy đủ
│   ├── search.html          # Trang tìm kiếm đầy đủ
│   └── about.html           # Trang giới thiệu trung tâm EFASC
├── components/
│   ├── navbar.html          # Thanh điều hướng trên
│   ├── sidebar.html         # Danh mục bài học (drawer)
│   └── footer.html          # Chân trang
└── data/
    ├── content.md           # Toàn bộ nội dung kiến thức (Markdown)
    ├── quiz.json            # Ngân hàng câu hỏi quiz (150+ câu)
    └── flashcards.json      # Ngân hàng flashcard (200+ thẻ)
```

## Tính năng

- **Bài học**: 24 chủ đề sơ cấp cứu với dấu hiệu, phân loại, quy trình, lưu ý
- **Flashcard**: Lật thẻ, xáo trộn, đánh dấu đã học, bookmark, spaced repetition, lọc theo chủ đề, tìm kiếm, danh sách toàn bộ, chế độ ôn tập
- **Quiz**: Trắc nghiệm, đúng/sai, ghép đôi, điền khuyết, case lâm sàng, nhận diện, phân loại — mỗi câu có giải thích đáp án đúng + sai + trích kiến thức
- **Tìm kiếm**: Full-text, highlight từ khóa, lọc theo chương/chủ đề/loại nội dung, gợi ý từ khóa
- **Khác**: Dark mode, điều chỉnh cỡ chữ, lưu tiến độ, bookmark, lịch sử xem

## Chạy dự án

```bash
npm install
npm start
```

Máy chủ phát triển chạy tại `http://localhost:8080`.

## Nguồn tài liệu

AHA 2020–2025, Bộ Y tế Việt Nam, WHO. Biên soạn bởi Phạm Duy Thanh — Trung tâm Phổ cập Kỹ năng Sơ cấp cứu, ĐHYD TP.HCM.
