// ================================================================
// QUIZ.JS - Full quiz module with all types, explanations, analytics
// ================================================================

let quizData = [];
let quizFiltered = [];
let quizIndex = 0;
let quizScore = 0;
let quizAnswered = false;
let quizAnswers = []; // { questionId, selected, correct, flagged }
let quizMode = 'all'; // all, by-chapter, random, wrong, unattempted, flagged
let quizCategoryFilter = 'all';
let quizLessonFilter = 'all';
let quizReviewMode = false;

async function loadQuiz() {
  try {
    const res = await fetch('../data/quiz.json');
    quizData = await res.json();
    applyQuizFilters();
  } catch (e) {
    console.error('Failed to load quiz:', e);
    showToast('Không thể tải quiz.', 'error');
  }
}

function applyQuizFilters() {
  quizFiltered = quizData.filter(q => {
    if (quizCategoryFilter !== 'all' && !q.category.includes(quizCategoryFilter)) return false;
    if (quizLessonFilter !== 'all' && q.lessonId !== quizLessonFilter) return false;

    // Mode filters
    const quizState = getQuizState();
    const qState = quizState[q.id] || {};
    if (quizMode === 'wrong' && qState.lastCorrect !== false) return false;
    if (quizMode === 'unattempted' && qState.lastCorrect !== undefined) return false;
    if (quizMode === 'flagged' && !qState.flagged) return false;

    return true;
  });

  if (quizMode === 'random') quizFiltered = quizFiltered.slice().sort(() => Math.random() - 0.5);

  quizIndex = 0; quizScore = 0; quizAnswers = []; quizAnswered = false;
  renderQuizQuestion();
  renderQuizStats();
}

function getQuizState() { return getData('quizState', {}); }
function setQuizState(id, state) { const s = getQuizState(); s[id] = { ...s[id], ...state }; setData('quizState', s); }

function renderQuizQuestion() {
  const container = document.getElementById('quizContainer');
  const nav = document.getElementById('quizNav');
  if (quizFiltered.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:60px 20px;color:var(--text-muted);"><i class="fas fa-question-circle" style="font-size:2.4rem;display:block;margin-bottom:12px;opacity:0.5;"></i>Không có câu hỏi phù hợp.</div>';
    nav.style.display = 'none';
    return;
  }
  nav.style.display = 'flex';
  const q = quizFiltered[quizIndex];
  const typeLabels = { multiple_choice:'Trắc nghiệm', true_false:'Đúng/Sai', matching:'Ghép đôi', fill_blank:'Điền khuyết', case_study:'Tình huống lâm sàng', identification:'Nhận diện', classification:'Phân loại' };
  const qState = getQuizState()[q.id] || {};
  const isFlagged = qState.flagged;

  container.innerHTML = `
    <div class="quiz-card anim-bounce-in">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:12px;">
        <div class="quiz-q-num">Câu ${quizIndex+1}/${quizFiltered.length}</div>
        <button class="quiz-flag" onclick="toggleQuizFlag()" title="Đánh dấu câu hỏi" style="background:none;border:none;cursor:pointer;color:${isFlagged?'var(--color-amber)':'var(--text-muted)'};font-size:1.3rem;"><i class="${isFlagged?'fas':'far'} fa-flag"></i></button>
      </div>
      <span class="quiz-q-type">${typeLabels[q.type] || q.type}</span>
      <div class="quiz-question">${q.question}</div>
      <div id="quizOptions" style="display:flex;flex-direction:column;gap:10px;">
        ${q.options.map((opt, i) => `<button class="quiz-option" data-index="${i}" onclick="selectQuizAnswer(${i})"><span class="quiz-option-letter">${String.fromCharCode(65+i)}</span>${opt}</button>`).join('')}
      </div>
      <div id="quizExplanation" style="display:none;"></div>
    </div>
  `;

  document.getElementById('quizCounter').textContent = `${quizIndex+1}/${quizFiltered.length}`;
  const pct = ((quizIndex+1) / quizFiltered.length) * 100;
  document.getElementById('quizProgressFill').style.width = pct + '%';
  document.getElementById('quizScore').textContent = `${quizScore} điểm`;
  quizAnswered = false;
}

function selectQuizAnswer(idx) {
  if (quizAnswered) return;
  const q = quizFiltered[quizIndex];
  const correct = q.correctAnswer;
  const isCorrect = idx === correct;
  quizAnswered = true;

  const options = document.querySelectorAll('.quiz-option');
  options.forEach((btn, i) => {
    btn.disabled = true;
    if (i === correct) btn.classList.add('correct');
    if (i === idx && !isCorrect) btn.classList.add('wrong');
  });

  if (isCorrect) { quizScore++; showToast('✅ Chính xác!', 'success'); }
  else showToast('❌ Sai rồi. Đáp án đúng đã được tô xanh.', 'error');

  document.getElementById('quizScore').textContent = `${quizScore} điểm`;

  // Save state
  setQuizState(q.id, { lastCorrect: isCorrect, lastAnswer: idx });

  // Record answer
  quizAnswers.push({ questionId: q.id, selected: idx, correct: isCorrect, flagged: (getQuizState()[q.id]||{}).flagged || false });

  // Show explanation
  const expEl = document.getElementById('quizExplanation');
  expEl.style.display = 'block';
  expEl.className = 'quiz-explanation anim-fade-in-up';
  expEl.innerHTML = `
    <h4>${isCorrect ? '✅ Chính xác!' : '❌ Sai rồi'}</h4>
    <p><strong>Đáp án đúng: ${String.fromCharCode(65+correct)}. ${q.options[correct]}</strong></p>
    <p><strong>Giải thích:</strong> ${q.explanation}</p>
    ${q.wrongExplanations && q.wrongExplanations.length ? q.wrongExplanations.map((w, i) => i !== correct ? `<div class="wrong-exp"><strong>${String.fromCharCode(65+i)}:</strong> ${w}</div>` : '').join('') : ''}
    <div class="knowledge-ref"><strong>📖 Kiến thức liên quan:</strong> ${q.knowledgeRef}</div>
  `;

  // Auto-advance after delay
  if (quizIndex < quizFiltered.length - 1) {
    setTimeout(() => nextQuizQuestion(), 2000);
  } else {
    setTimeout(() => showQuizResults(), 2000);
  }
}

function nextQuizQuestion() {
  if (quizIndex < quizFiltered.length - 1) { quizIndex++; renderQuizQuestion(); }
  else showQuizResults();
}
function prevQuizQuestion() {
  if (quizIndex > 0) { quizIndex--; renderQuizQuestion(); }
  else showToast('Đã đến câu đầu tiên.', 'info');
}
function jumpToQuestion(idx) {
  if (idx >= 0 && idx < quizFiltered.length) { quizIndex = idx; renderQuizQuestion(); }
}

function toggleQuizFlag() {
  const q = quizFiltered[quizIndex];
  const state = getQuizState()[q.id] || {};
  state.flagged = !state.flagged;
  setQuizState(q.id, state);
  renderQuizQuestion();
  showToast(state.flagged ? 'Đã đánh dấu câu hỏi' : 'Đã bỏ đánh dấu', 'info');
}

function showQuizResults() {
  const total = quizFiltered.length;
  const pct = total > 0 ? Math.round((quizScore / total) * 100) : 0;
  let msg = pct === 100 ? '🎉 Xuất sắc!' : pct >= 70 ? '👍 Tốt!' : pct >= 50 ? '📖 Cần cố gắng' : '📚 Học lại nhé!';

  // Category analysis
  const byCategory = {};
  quizAnswers.forEach(a => { const q = quizData.find(qd => qd.id === a.questionId); if (q) { if (!byCategory[q.category]) byCategory[q.category] = { correct: 0, total: 0 }; byCategory[q.category].total++; if (a.correct) byCategory[q.category].correct++; } });
  const strengths = Object.entries(byCategory).filter(([,v]) => v.total > 0 && (v.correct / v.total) >= 0.7).map(([k]) => k);
  const weaknesses = Object.entries(byCategory).filter(([,v]) => v.total > 0 && (v.correct / v.total) < 0.5).map(([k]) => k);
  const wrongAnswers = quizAnswers.filter(a => !a.correct);

  // Simple bar chart
  const chartBars = Object.entries(byCategory).map(([cat, v]) => {
    const catPct = v.total > 0 ? Math.round((v.correct / v.total) * 100) : 0;
    const color = catPct >= 70 ? 'var(--color-green)' : catPct >= 50 ? 'var(--color-amber)' : 'var(--color-red)';
    return `<div style="margin-bottom:12px;"><div style="display:flex;justify-content:space-between;font-size:0.8rem;margin-bottom:4px;"><span>${cat}</span><span>${v.correct}/${v.total} (${catPct}%)</span></div><div style="height:10px;background:var(--border-color);border-radius:5px;overflow:hidden;"><div style="height:100%;width:${catPct}%;background:${color};border-radius:5px;transition:width 0.5s ease;"></div></div></div>`;
  }).join('');

  const container = document.getElementById('quizContainer');
  container.innerHTML = `
    <div class="quiz-card quiz-results anim-bounce-in">
      <h2>${msg}</h2>
      <div class="quiz-results-score" style="color:${pct>=70?'var(--color-green)':pct>=50?'var(--color-amber)':'var(--color-red)'};">${quizScore}/${total} (${pct}%)</div>

      <div class="quiz-chart">
        <h3 style="font-family:var(--font-display);font-size:1.1rem;margin-bottom:16px;text-align:center;">Biểu đồ kết quả theo chủ đề</h3>
        ${chartBars || '<p style="color:var(--text-muted);text-align:center;">Chưa có dữ liệu.</p>'}
      </div>

      <div class="quiz-analysis">
        <h3 style="color:var(--color-green);">✅ Điểm mạnh</h3>
        ${strengths.length ? `<ul>${strengths.map(s => `<li>${s}: ${Math.round((byCategory[s].correct/byCategory[s].total)*100)}% đúng</li>`).join('')}</ul>` : '<p style="color:var(--text-muted);">Chưa có chủ đề nào đạt trên 70%.</p>'}

        <h3 style="color:var(--color-red);margin-top:16px;">❌ Điểm yếu</h3>
        ${weaknesses.length ? `<ul>${weaknesses.map(w => `<li>${w}: ${Math.round((byCategory[w].correct/byCategory[w].total)*100)}% đúng</li>`).join('')}</ul>` : '<p style="color:var(--text-muted);">Không có điểm yếu rõ ràng.</p>'}
      </div>

      ${wrongAnswers.length ? `
        <div class="quiz-wrong-list">
          <h3 style="font-family:var(--font-display);font-size:1.1rem;margin-bottom:12px;">Danh sách câu sai (${wrongAnswers.length})</h3>
          ${wrongAnswers.map(a => { const q = quizData.find(qd => qd.id === a.questionId); return `<div class="quiz-wrong-item"><div class="q">${q.question}</div><div class="a">Đáp án đúng: ${q.options[q.correctAnswer]}</div></div>`; }).join('')}
          <button class="btn-primary" style="margin-top:16px;width:100%;justify-content:center;" onclick="reviewWrongQuestions()"><i class="fas fa-redo"></i> Ôn lại các câu sai</button>
        </div>
      ` : '<p style="color:var(--color-green);text-align:center;font-weight:600;">🎉 Bạn đã trả lời đúng tất cả câu hỏi!</p>'}

      <div style="display:flex;gap:10px;justify-content:center;margin-top:20px;flex-wrap:wrap;">
        <button class="btn-secondary" onclick="restartQuiz()"><i class="fas fa-redo"></i> Làm lại</button>
        <a href="index.html" class="btn-secondary" style="text-decoration:none;"><i class="fas fa-home"></i> Trang chủ</a>
      </div>
    </div>
  `;

  if (pct === 100) { launchConfetti(); launchConfetti(); launchConfetti(); }
  else if (pct >= 70) launchConfetti();

  // Save results
  const results = getData('quizResults', {});
  results[Date.now()] = { score: quizScore, total, pct, date: new Date().toISOString() };
  setData('quizResults', results);
}

function reviewWrongQuestions() {
  quizFiltered = quizAnswers.filter(a => !a.correct).map(a => quizData.find(q => q.id === a.questionId)).filter(Boolean);
  quizIndex = 0; quizScore = 0; quizAnswers = []; quizAnswered = false;
  renderQuizQuestion();
  showToast(`Đang ôn lại ${quizFiltered.length} câu sai.`, 'info');
}

function restartQuiz() { quizIndex = 0; quizScore = 0; quizAnswers = []; quizAnswered = false; applyQuizFilters(); }

function renderQuizStats() {
  const total = quizData.length;
  const quizState = getQuizState();
  const attempted = Object.keys(quizState).filter(id => quizData.some(q => q.id === id && quizState[id].lastCorrect !== undefined)).length;
  const correct = Object.values(quizState).filter(s => s.lastCorrect === true).length;
  const flagged = Object.values(quizState).filter(s => s.flagged).length;
  const statsEl = document.getElementById('quizStats');
  if (statsEl) {
    statsEl.innerHTML = `
      <div class="fc-stat"><div class="num">${total}</div><div class="lbl">Tổng câu</div></div>
      <div class="fc-stat"><div class="num" style="color:var(--color-blue);">${attempted}</div><div class="lbl">Đã làm</div></div>
      <div class="fc-stat"><div class="num" style="color:var(--color-green);">${correct}</div><div class="lbl">Đúng</div></div>
      <div class="fc-stat"><div class="num" style="color:var(--color-amber);">${flagged}</div><div class="lbl">Đánh dấu</div></div>
    `;
  }
}

function initQuizPage() {
  const urlParams = new URLSearchParams(window.location.search);
  const lessonParam = urlParams.get('lesson');
  if (lessonParam) quizLessonFilter = lessonParam;

  loadQuiz().then(() => {
    const lessonSelect = document.getElementById('quizLessonFilter');
    if (lessonSelect) {
      const lessonIds = [...new Set(quizData.map(q => q.lessonId))];
      lessonSelect.innerHTML = '<option value="all">Tất cả bài học</option>' + lessonIds.map(id => {
        const l = lessons.find(ls => ls.id === id);
        return `<option value="${id}" ${id===quizLessonFilter?'selected':''}>${l?l.title:id}</option>`;
      }).join('');
    }
    if (lessonParam) applyQuizFilters();
  });

  document.getElementById('quizCategoryFilter')?.addEventListener('change', function() { quizCategoryFilter = this.value; applyQuizFilters(); });
  document.getElementById('quizLessonFilter')?.addEventListener('change', function() { quizLessonFilter = this.value; applyQuizFilters(); });

  document.querySelectorAll('.quiz-mode-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      quizMode = this.dataset.mode;
      document.querySelectorAll('.quiz-mode-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      applyQuizFilters();
    });
  });

  document.getElementById('quizPrev')?.addEventListener('click', prevQuizQuestion);
  document.getElementById('quizNext')?.addEventListener('click', nextQuizQuestion);
  document.getElementById('quizJump')?.addEventListener('click', function() {
    const idx = parseInt(document.getElementById('quizJumpInput').value) - 1;
    if (!isNaN(idx)) jumpToQuestion(idx);
  });

  document.addEventListener('keydown', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
    if (e.key === 'ArrowRight') nextQuizQuestion();
    if (e.key === 'ArrowLeft') prevQuizQuestion();
  });
}

window.toggleQuizFlag = toggleQuizFlag;
window.reviewWrongQuestions = reviewWrongQuestions;
window.restartQuiz = restartQuiz;
