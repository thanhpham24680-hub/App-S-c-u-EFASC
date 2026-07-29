// Generator script: creates flashcards.json and quiz.json from lessons data
const fs = require('fs');
const path = require('path');

// Load lessons data
const dataPath = path.join(__dirname, '..', 'assets', 'js', 'data.js');
let src = fs.readFileSync(dataPath, 'utf-8');
// Remove the export block for eval
src = src.replace(/if \(typeof module[\s\S]*$/m, '');
// Replace const with var so they leak into global scope when eval'd
src = src.replace(/^const lessons/m, 'var lessons');
src = src.replace(/^const ICON_ANIM_MAP/m, 'var ICON_ANIM_MAP');
eval(src);

// ================================================================
// FLASHCARD GENERATION
// ================================================================
const flashcards = [];
let fcId = 1;

lessons.forEach(lesson => {
  const c = lesson.content;
  const cat = lesson.category[0];

  // Definition cards
  flashcards.push({
    id: `fc-${String(fcId++).padStart(3,'0')}`,
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    category: cat,
    front: `${lesson.title} là gì?`,
    back: lesson.moTa,
    type: "definition"
  });

  // Object at risk
  if (lesson.doiTuongNguyCo) {
    flashcards.push({
      id: `fc-${String(fcId++).padStart(3,'0')}`,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      category: cat,
      front: `Đối tượng nguy cơ cao của "${lesson.title}" là ai?`,
      back: lesson.doiTuongNguyCo,
      type: "definition"
    });
  }

  // Certain signs
  if (c.dauHieuChacChan) {
    c.dauHieuChacChan.forEach((s, i) => {
      flashcards.push({
        id: `fc-${String(fcId++).padStart(3,'0')}`,
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        category: cat,
        front: `Dấu hiệu chắc chắn #${i+1} của "${lesson.title}" là gì?`,
        back: s,
        type: "sign"
      });
    });
  }

  // Suspected signs
  if (c.dauHieuNghiVan) {
    c.dauHieuNghiVan.forEach((s, i) => {
      flashcards.push({
        id: `fc-${String(fcId++).padStart(3,'0')}`,
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        category: cat,
        front: `Dấu hiệu nghi vấn #${i+1} của "${lesson.title}" là gì?`,
        back: s,
        type: "sign"
      });
    });
  }

  // Classifications
  if (c.phanLoai) {
    c.phanLoai.forEach((p) => {
      flashcards.push({
        id: `fc-${String(fcId++).padStart(3,'0')}`,
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        category: cat,
        front: `Phân loại "${p.ten}" trong "${lesson.title}" nghĩa là gì?`,
        back: p.moTa,
        type: "classification"
      });
    });
  }

  // Procedure steps
  if (c.quyTrinh) {
    c.quyTrinh.forEach((step, i) => {
      let clean = step.replace(/^\d+\.\s*/, '');
      flashcards.push({
        id: `fc-${String(fcId++).padStart(3,'0')}`,
        lessonId: lesson.id,
        lessonTitle: lesson.title,
        category: cat,
        front: `Bước ${i+1} trong quy trình sơ cứu "${lesson.title}": Hành động cần làm là gì?`,
        back: clean,
        type: "procedure"
      });
    });
  }

  // Caution
  if (c.luuY) {
    flashcards.push({
      id: `fc-${String(fcId++).padStart(3,'0')}`,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      category: cat,
      front: `Lưu ý quan trọng khi sơ cứu "${lesson.title}" là gì?`,
      back: c.luuY,
      type: "caution"
    });
  }

  // Case scenario
  flashcards.push({
    id: `fc-${String(fcId++).padStart(3,'0')}`,
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    category: cat,
    front: `Tình huống: Bạn gặp một nạn nhân có dấu hiệu thuộc "${lesson.title}". Nguyên tắc đầu tiên bạn cần nhớ là gì?`,
    back: `Nguyên tắc: ${lesson.moTa} Hãy đảm bảo an toàn bản thân trước, gọi 115 ngay, và làm theo quy trình sơ cứu chuẩn.`,
    type: "case"
  });
});

fs.writeFileSync(path.join(__dirname, '..', 'data', 'flashcards.json'), JSON.stringify(flashcards, null, 2));
console.log(`Generated ${flashcards.length} flashcards`);

// ================================================================
// QUIZ GENERATION
// ================================================================
const quiz = [];
let qId = 1;

// Helper: shuffle array
function shuffle(arr) { return arr.slice().sort(() => Math.random() - 0.5); }

lessons.forEach(lesson => {
  const c = lesson.content;
  const cat = lesson.category[0];
  const allText = [];
  if (c.dauHieuChacChan) allText.push(...c.dauHieuChacChan);
  if (c.dauHieuNghiVan) allText.push(...c.dauHieuNghiVan);
  if (c.phanLoai) allText.push(...c.phanLoai.map(p=>p.moTa));
  if (c.quyTrinh) allText.push(...c.quyTrinh.map(q=>q.replace(/^\d+\.\s*/,'')));
  if (c.luuY) allText.push(c.luuY);

  // Q1: Multiple choice - what is this condition?
  quiz.push({
    id: `q-${String(qId++).padStart(3,'0')}`,
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    category: cat,
    type: "multiple_choice",
    question: `"${lesson.title}" được hiểu đúng nhất là:`,
    options: [
      lesson.moTa,
      "Một bệnh lý mạn tính cần điều trị dài ngày",
      "Một tình trạng không cần sơ cứu khẩn cấp",
      "Một phương pháp phòng ngừa bệnh tật"
    ],
    correctAnswer: 0,
    explanation: lesson.moTa,
    wrongExplanations: [
      "Đáp án A là định nghĩa chính xác.",
      `${lesson.title} là tình huống khẩn cấp, không phải bệnh mạn tính.`,
      `${lesson.title} đòi hỏi sơ cứu kịp thời, không phải bỏ qua.`,
      `${lesson.title} là tình huống xử trí, không phải phương pháp phòng ngừa.`
    ],
    knowledgeRef: lesson.moTa,
    difficulty: "easy"
  });

  // Q2: Multiple choice - first step
  if (c.quyTrinh && c.quyTrinh.length > 0) {
    const firstStep = c.quyTrinh[0].replace(/^\d+\.\s*/, '');
    const wrongSteps = c.quyTrinh.slice(1, 4).map(s => s.replace(/^\d+\.\s*/, ''));
    quiz.push({
      id: `q-${String(qId++).padStart(3,'0')}`,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      category: cat,
      type: "multiple_choice",
      question: `Khi sơ cứu "${lesson.title}", bước đầu tiên cần làm là:`,
      options: [firstStep, ...wrongSteps],
      correctAnswer: 0,
      explanation: `Bước đầu tiên là: ${firstStep}`,
      wrongExplanations: wrongSteps.map((w, i) => `Đây là bước ${i+2}, không phải bước đầu tiên. Phải làm theo đúng thứ tự quy trình.`),
      knowledgeRef: c.quyTrinh[0],
      difficulty: "medium"
    });
  }

  // Q3: True/False - key fact
  if (c.luuY) {
    const cautionText = c.luuY;
    const isNegative = cautionText.toLowerCase().includes('không') || cautionText.toLowerCase().includes('tuyệt đối');
    quiz.push({
      id: `q-${String(qId++).padStart(3,'0')}`,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      category: cat,
      type: "true_false",
      question: `Đúng hay Sai: ${isNegative ? "Trong sơ cứu" + lesson.title + ", có những điều cấm kỵ cần tuyệt đối tránh." : "Có lưu ý quan trọng khi sơ cứu " + lesson.title + "."}`,
      options: ["Đúng", "Sai"],
      correctAnswer: 0,
      explanation: cautionText,
      wrongExplanations: ["Đúng - có lưu ý quan trọng cần ghi nhớ để tránh gây hại thêm cho nạn nhân."],
      knowledgeRef: c.luuY,
      difficulty: "easy"
    });
  }

  // Q4: Fill blank - key sign
  if (c.dauHieuChacChan && c.dauHieuChacChan.length > 0) {
    const sign = c.dauHieuChacChan[0];
    const keyWord = sign.split(/\s+/).find(w => w.length > 4) || sign.split(' ')[0];
    const blanked = sign.replace(keyWord, '_____');
    const distractors = ["không liên quan", "không chính xác", "thiếu cơ sở y khoa"];
    quiz.push({
      id: `q-${String(qId++).padStart(3,'0')}`,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      category: cat,
      type: "fill_blank",
      question: `Điền từ còn thiếu vào dấu hiệu chắc chắn của "${lesson.title}": "${blanked}"`,
      options: [keyWord, ...distractors],
      correctAnswer: 0,
      explanation: `Từ đúng là "${keyWord}". Dấu hiệu đầy đủ: "${sign}"`,
      wrongExplanations: distractors.map(d => `"${d}" không phù hợp về mặt y khoa với dấu hiệu này.`),
      knowledgeRef: c.dauHieuChacChan[0],
      difficulty: "medium"
    });
  }

  // Q5: Case study
  quiz.push({
    id: `q-${String(qId++).padStart(3,'0')}`,
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    category: cat,
    type: "case_study",
    question: `Tình huống lâm sàng: Bạn gặp nạn nhân có biểu hiện phù hợp với "${lesson.title}". Hành động ưu tiên đầu tiên là gì?`,
    options: [
      "Đảm bảo an toàn hiện trường, gọi 115 ngay lập tức",
      "Di chuyển nạn nhân ngay đến bệnh viện gần nhất",
      "Cho nạn nhân uống nước và nghỉ ngơi",
      "Chờ đợi người có chuyên môn đến xử lý"
    ],
    correctAnswer: 0,
    explanation: `Trong mọi tình huống sơ cứu, ưu tiên hàng đầu là đảm bảo an toàn hiện trường và gọi cấp cứu 115. Sau đó mới làm các bước sơ cứu theo quy trình "${lesson.title}".`,
    wrongExplanations: [
      "Đáp án A đúng - an toàn và gọi 115 là ưu tiên số 1.",
      "Tự di chuyển nạn nhân có thể gây thêm tổn thương, đặc biệt nếu nghi ngờ chấn thương cột sống.",
      "Cho ăn uống có thể gây sặc, đặc biệt khi nạn nhân bất tỉnh hoặc khó thở.",
      "Chờ đợi mất thời gian vàng - sơ cứu cần được bắt đầu ngay lập tức."
    ],
    knowledgeRef: lesson.moTa,
    difficulty: "hard"
  });

  // Q6: Identification
  if (c.dauHieuChacChan && c.dauHieuChacChan.length >= 2) {
    const signs = c.dauHieuChacChan.slice(0, 3).join('; ');
    quiz.push({
      id: `q-${String(qId++).padStart(3,'0')}`,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      category: cat,
      type: "identification",
      question: `Nhận diện: Nạn nhân có các dấu hiệu sau: "${signs}". Đây khả năng nhất là tình trạng nào?`,
      options: [
        lesson.title,
        "Ngừng tim - cần CPR ngay",
        "Sốc giảm thể tích",
        "Đột quỵ"
      ],
      correctAnswer: 0,
      explanation: `Các dấu hiệu trên đặc trưng cho "${lesson.title}".`,
      wrongExplanations: [
        "Đáp án A đúng - các dấu hiệu khớp với " + lesson.title + ".",
        "Ngừng tim có dấu hiệu không bắt được mạch, không thở, mất ý thức - khác với dấu hiệu mô tả.",
        "Sốc giảm thể tích có dấu hiệu da xanh, mạch nhanh nhỏ, tụt HA - khác với mô tả.",
        "Đột quỵ có dấu hiệu mặt méo, yếu nửa người, nói khó (FAST) - khác với mô tả."
      ],
      knowledgeRef: c.dauHieuChacChan.join('; '),
      difficulty: "medium"
    });
  }

  // Q7: Classification
  if (c.phanLoai && c.phanLoai.length >= 2) {
    const p = c.phanLoai[0];
    quiz.push({
      id: `q-${String(qId++).padStart(3,'0')}`,
      lessonId: lesson.id,
      lessonTitle: lesson.title,
      category: cat,
      type: "classification",
      question: `Phân loại: "${p.moTa}" Thuộc loại nào của "${lesson.title}"?`,
      options: [p.ten, ...c.phanLoai.slice(1).map(x=>x.ten)],
      correctAnswer: 0,
      explanation: `"${p.moTa}" là đặc điểm của "${p.ten}".`,
      wrongExplanations: c.phanLoai.slice(1).map(x => `"${x.ten}" có đặc điểm: "${x.moTa}" - khác với mô tả trong câu hỏi.`),
      knowledgeRef: c.phanLoai.map(x=>`${x.ten}: ${x.moTa}`).join('; '),
      difficulty: "medium"
    });
  }

  // Q8: True/False - common misconception
  quiz.push({
    id: `q-${String(qId++).padStart(3,'0')}`,
    lessonId: lesson.id,
    lessonTitle: lesson.title,
    category: cat,
    type: "true_false",
    question: `Đúng hay Sai: Khi sơ cứu "${lesson.title}", nên tự ý di chuyển nạn nhân đến bệnh viện thay vì gọi 115 chờ xe cấp cứu.`,
    options: ["Đúng", "Sai"],
    correctAnswer: 1,
    explanation: `Sai - Không nên tự ý di chuyển nạn nhân khi chưa cố định và sơ cứu ban đầu. Gọi 115 là ưu tiên. ${c.luuY || ''}`,
    wrongExplanations: ["Sai - Tự di chuyển có thể gây thêm tổn thương. Nên gọi 115 và làm sơ cứu tại chỗ theo quy trình."],
    knowledgeRef: c.luuY || lesson.moTa,
    difficulty: "easy"
  });
});

fs.writeFileSync(path.join(__dirname, '..', 'data', 'quiz.json'), JSON.stringify(quiz, null, 2));
console.log(`Generated ${quiz.length} quiz questions`);
