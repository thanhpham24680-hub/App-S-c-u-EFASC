// ================================================================
// FLASHCARD.JS - Full flashcard module with SRS, bookmark, filters
// ================================================================

let fcData = [];
let fcFiltered = [];
let fcIndex = 0;
let fcFlipped = false;
let fcMode = 'all'; // all, due, bookmarked, learned, unlearned
let fcCategoryFilter = 'all';
let fcSearchText = '';
let fcLessonFilter = 'all';

// SRS state
function getFcState() { return getData('fcState', {}); }
function setFcState(id, state) { const s = getFcState(); s[id] = state; setData('fcState', s); }
function getFcCardState(id) { return getFcState()[id] || { learned: false, bookmarked: false, interval: 0, ease: 2.5, repetitions: 0, dueDate: null, lastReview: null }; }

// SM-2 inspired simple SRS
function reviewCard(id, quality) {
  const state = getFcCardState(id);
  state.lastReview = Date.now();
  if (quality < 3) { state.repetitions = 0; state.interval = 1; }
  else {
    state.repetitions++;
    if (state.repetitions === 1) state.interval = 1;
    else if (state.repetitions === 2) state.interval = 3;
    else state.interval = Math.round(state.interval * state.ease);
    state.ease = Math.max(1.3, state.ease + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)));
  }
  state.dueDate = Date.now() + state.interval * 86400000;
  if (quality >= 3) state.learned = true;
  setFcState(id, state);
}

function isCardDue(id) {
  const state = getFcCardState(id);
  if (!state.dueDate) return true;
  return Date.now() >= state.dueDate;
}

async function loadFlashcards() {
  try {
    const res = await fetch('../data/flashcards.json');
    fcData = await res.json();
    applyFilters();
  } catch (e) {
    console.error('Failed to load flashcards:', e);
    showToast('Không thể tải flashcard.', 'error');
  }
}

function applyFilters() {
  fcFiltered = fcData.filter(card => {
    // Mode filter
    const state = getFcCardState(card.id);
    if (fcMode === 'due' && !isCardDue(card.id)) return false;
    if (fcMode === 'bookmarked' && !state.bookmarked) return false;
    if (fcMode === 'learned' && !state.learned) return false;
    if (fcMode === 'unlearned' && state.learned) return false;
    // Category filter
    if (fcCategoryFilter !== 'all' && !card.category.includes(fcCategoryFilter)) return false;
    // Lesson filter
    if (fcLessonFilter !== 'all' && card.lessonId !== fcLessonFilter) return false;
    // Search filter
    if (fcSearchText) {
      const q = fcSearchText.toLowerCase();
      if (!card.front.toLowerCase().includes(q) && !card.back.toLowerCase().includes(q) && !card.lessonTitle.toLowerCase().includes(q)) return false;
    }
    return true;
  });
  fcIndex = 0; fcFlipped = false;
  renderFlashcard();
  renderFcList();
  renderFcStats();
}

function renderFlashcard() {
  const container = document.getElementById('fcCardContainer');
  const nav = document.getElementById('fcNav');
  if (fcFiltered.length === 0) {
    container.innerHTML = '<div style="text-align:center;padding:60px 20px;color:var(--text-muted);"><i class="fas fa-layer-group" style="font-size:2.4rem;display:block;margin-bottom:12px;opacity:0.5;"></i>Không có flashcard phù hợp.</div>';
    nav.style.display = 'none';
    return;
  }
  nav.style.display = 'flex';
  const card = fcFiltered[fcIndex];
  const state = getFcCardState(card.id);
  const pct = ((fcIndex + 1) / fcFiltered.length) * 100;
  const typeLabels = { definition:'Định nghĩa', procedure:'Quy trình', sign:'Dấu hiệu', classification:'Phân loại', caution:'Lưu ý', case:'Tình huống' };

  container.innerHTML = `
    <div class="fc-card-container" onclick="flipFlashcard()">
      <div class="fc-card-inner" id="fcInner">
        <div class="fc-card-face fc-card-front">
          <span class="fc-card-tag">${typeLabels[card.type] || card.type}</span>
          <span class="fc-card-icon">❓</span>
          <div class="fc-card-text">${card.front}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);margin-top:12px;">${card.lessonTitle}</div>
          <div style="font-size:0.7rem;color:var(--text-muted);margin-top:8px;">Nhấn để lật thẻ</div>
        </div>
        <div class="fc-card-face fc-card-back">
          <span class="fc-card-tag">${typeLabels[card.type] || card.type}</span>
          <span class="fc-card-icon">💡</span>
          <div class="fc-card-text">${card.back}</div>
          <div style="font-size:0.75rem;color:var(--text-muted);margin-top:12px;">${card.lessonTitle}</div>
        </div>
      </div>
    </div>
  `;

  // Nav
  document.getElementById('fcCounter').textContent = `${fcIndex+1}/${fcFiltered.length}`;
  document.getElementById('fcProgressFill').style.width = pct + '%';

  // Bookmark button
  const bmBtn = document.getElementById('fcBookmarkBtn');
  if (bmBtn) {
    bmBtn.innerHTML = state.bookmarked ? '<i class="fas fa-star"></i>' : '<i class="far fa-star"></i>';
    bmBtn.style.color = state.bookmarked ? 'var(--color-amber)' : 'var(--text-muted)';
  }

  // SRS buttons
  const srsDiv = document.getElementById('fcSrsButtons');
  if (srsDiv) srsDiv.style.display = fcFlipped ? 'flex' : 'none';
}

function flipFlashcard() {
  fcFlipped = !fcFlipped;
  const inner = document.getElementById('fcInner');
  if (inner) inner.classList.toggle('flipped', fcFlipped);
  const srsDiv = document.getElementById('fcSrsButtons');
  if (srsDiv) srsDiv.style.display = fcFlipped ? 'flex' : 'none';
}

function nextFlashcard() {
  if (fcIndex < fcFiltered.length - 1) { fcIndex++; fcFlipped = false; renderFlashcard(); }
  else showToast('Đã đến thẻ cuối cùng.', 'info');
}
function prevFlashcard() {
  if (fcIndex > 0) { fcIndex--; fcFlipped = false; renderFlashcard(); }
  else showToast('Đã đến thẻ đầu tiên.', 'info');
}
function shuffleFlashcards() {
  fcFiltered = fcFiltered.slice().sort(() => Math.random() - 0.5);
  fcIndex = 0; fcFlipped = false; renderFlashcard(); renderFcList();
  showToast('Đã xáo trộn thẻ.', 'info');
}

function toggleFcBookmark() {
  if (fcFiltered.length === 0) return;
  const card = fcFiltered[fcIndex];
  const state = getFcCardState(card.id);
  state.bookmarked = !state.bookmarked;
  setFcState(card.id, state);
  renderFlashcard(); renderFcList(); renderFcStats();
  showToast(state.bookmarked ? 'Đã đánh dấu thẻ' : 'Đã bỏ đánh dấu', 'info');
}

function markFcLearned() {
  if (fcFiltered.length === 0) return;
  const card = fcFiltered[fcIndex];
  reviewCard(card.id, 4); // Good
  showToast('Đã đánh dấu đã học. Sẽ ôn lại sau ' + getFcCardState(card.id).interval + ' ngày.', 'success');
  nextFlashcard();
}

function markFcHard() {
  if (fcFiltered.length === 0) return;
  const card = fcFiltered[fcIndex];
  reviewCard(card.id, 2); // Hard
  showToast('Sẽ ôn lại thẻ này sớm.', 'info');
  nextFlashcard();
}

function markFcEasy() {
  if (fcFiltered.length === 0) return;
  const card = fcFiltered[fcIndex];
  reviewCard(card.id, 5); // Easy
  showToast('Đã ghi nhớ! Sẽ ôn lại sau ' + getFcCardState(card.id).interval + ' ngày.', 'success');
  nextFlashcard();
}

function renderFcStats() {
  const total = fcData.length;
  const learned = fcData.filter(c => getFcCardState(c.id).learned).length;
  const bookmarked = fcData.filter(c => getFcCardState(c.id).bookmarked).length;
  const due = fcData.filter(c => isCardDue(c.id) && !getFcCardState(c.id).learned).length;
  const progress = total > 0 ? Math.round((learned / total) * 100) : 0;
  const statsEl = document.getElementById('fcStats');
  if (statsEl) {
    statsEl.innerHTML = `
      <div class="fc-stat"><div class="num">${total}</div><div class="lbl">Tổng thẻ</div></div>
      <div class="fc-stat"><div class="num" style="color:var(--color-green);">${learned}</div><div class="lbl">Đã học</div></div>
      <div class="fc-stat"><div class="num" style="color:var(--color-amber);">${bookmarked}</div><div class="lbl">Đánh dấu</div></div>
      <div class="fc-stat"><div class="num" style="color:var(--color-red);">${due}</div><div class="lbl">Cần ôn</div></div>
      <div class="fc-stat"><div class="num" style="color:var(--accent);">${progress}%</div><div class="lbl">Tiến độ</div></div>
    `;
  }
}

function renderFcList() {
  const listEl = document.getElementById('fcList');
  if (!listEl) return;
  if (fcFiltered.length === 0) { listEl.innerHTML = '<p style="color:var(--text-muted);text-align:center;padding:20px;">Không có thẻ nào.</p>'; return; }
  const typeIcons = { definition:'📖', procedure:'📋', sign:'🔍', classification:'🏷️', caution:'⚠️', case:'🏥' };
  listEl.innerHTML = fcFiltered.map((card, i) => {
    const state = getFcCardState(card.id);
    let badge = '<span class="fc-list-badge new">Mới</span>';
    if (state.learned) badge = '<span class="fc-list-badge learned">Đã học</span>';
    else if (isCardDue(card.id) && state.dueDate) badge = '<span class="fc-list-badge due">Cần ôn</span>';
    if (state.bookmarked) badge += ' <span class="fc-list-badge bookmarked">★</span>';
    return `<div class="fc-list-item" onclick="jumpToFc(${i})"><span class="fc-list-icon">${typeIcons[card.type]||'📇'}</span><div class="fc-list-content"><div class="fc-list-q">${card.front}</div><div class="fc-list-meta">${card.lessonTitle}</div></div>${badge}</div>`;
  }).join('');
}

function jumpToFc(i) { fcIndex = i; fcFlipped = false; renderFlashcard(); document.getElementById('fcCardContainer').scrollIntoView({ behavior:'smooth', block:'center' }); }

function toggleFcList() {
  const listEl = document.getElementById('fcList');
  const btn = document.getElementById('fcListToggle');
  if (listEl.style.display === 'none' || !listEl.style.display) { listEl.style.display = 'block'; btn.innerHTML = '<i class="fas fa-list"></i> Ẩn danh sách'; }
  else { listEl.style.display = 'none'; btn.innerHTML = '<i class="fas fa-list"></i> Danh sách thẻ'; }
}

function initFlashcardPage() {
  // Check for lesson param
  const urlParams = new URLSearchParams(window.location.search);
  const lessonParam = urlParams.get('lesson');
  if (lessonParam) fcLessonFilter = lessonParam;

  loadFlashcards().then(() => {
    // Populate lesson filter
    const lessonSelect = document.getElementById('fcLessonFilter');
    if (lessonSelect) {
      const lessonIds = [...new Set(fcData.map(c => c.lessonId))];
      lessonSelect.innerHTML = '<option value="all">Tất cả bài học</option>' + lessonIds.map(id => {
        const l = lessons.find(ls => ls.id === id);
        return `<option value="${id}" ${id===fcLessonFilter?'selected':''}>${l?l.title:id}</option>`;
      }).join('');
    }
    if (lessonParam) applyFilters();
  });

  // Toolbar events
  document.getElementById('fcSearch')?.addEventListener('input', function() { fcSearchText = this.value; applyFilters(); });
  document.getElementById('fcCategoryFilter')?.addEventListener('change', function() { fcCategoryFilter = this.value; applyFilters(); });
  document.getElementById('fcLessonFilter')?.addEventListener('change', function() { fcLessonFilter = this.value; applyFilters(); });

  // Mode buttons
  document.querySelectorAll('.fc-mode-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      fcMode = this.dataset.mode;
      document.querySelectorAll('.fc-mode-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      applyFilters();
    });
  });

  // Nav buttons
  document.getElementById('fcPrev')?.addEventListener('click', prevFlashcard);
  document.getElementById('fcNext')?.addEventListener('click', nextFlashcard);
  document.getElementById('fcFlip')?.addEventListener('click', flipFlashcard);
  document.getElementById('fcShuffle')?.addEventListener('click', shuffleFlashcards);
  document.getElementById('fcBookmarkBtn')?.addEventListener('click', toggleFcBookmark);
  document.getElementById('fcListToggle')?.addEventListener('click', toggleFcList);

  // SRS buttons
  document.getElementById('fcHard')?.addEventListener('click', markFcHard);
  document.getElementById('fcGood')?.addEventListener('click', markFcLearned);
  document.getElementById('fcEasy')?.addEventListener('click', markFcEasy);

  // Keyboard
  document.addEventListener('keydown', function(e) {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'SELECT') return;
    if (e.key === 'ArrowRight') nextFlashcard();
    if (e.key === 'ArrowLeft') prevFlashcard();
    if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); flipFlashcard(); }
  });
}

// Expose for inline onclick
window.flipFlashcard = flipFlashcard;
window.nextFlashcard = nextFlashcard;
window.prevFlashcard = prevFlashcard;
window.jumpToFc = jumpToFc;
