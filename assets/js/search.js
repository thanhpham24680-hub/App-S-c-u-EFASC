// ================================================================
// SEARCH.JS - Full-text search with highlight, filters, suggestions
// ================================================================

let searchData = [];
let searchResults = [];
let searchCategoryFilter = 'all';
let searchTypeFilter = 'all'; // lesson, flashcard, quiz
let searchChapterFilter = 'all';

async function loadSearchData() {
  try {
    const [fcRes, quizRes] = await Promise.all([
      fetch('../data/flashcards.json').then(r => r.json()),
      fetch('../data/quiz.json').then(r => r.json())
    ]);

    // Build searchable index from lessons
    lessons.forEach(l => {
      const c = l.content;
      const allText = [l.title, l.moTa, l.doiTuongNguyCo || ''];
      if (c.dauHieuChacChan) allText.push(...c.dauHieuChacChan);
      if (c.dauHieuNghiVan) allText.push(...c.dauHieuNghiVan);
      if (c.phanLoai) c.phanLoai.forEach(p => allText.push(p.ten, p.moTa));
      if (c.quyTrinh) allText.push(...c.quyTrinh);
      if (c.luuY) allText.push(c.luuY);
      searchData.push({
        type: 'lesson', id: l.id, title: l.title, category: l.category[0],
        categories: l.category, content: allText.join(' '), icon: l.icon,
        snippet: l.moTa, url: `../index.html?id=${l.id}`
      });
    });

    // Flashcards
    fcRes.forEach(fc => {
      searchData.push({
        type: 'flashcard', id: fc.id, title: fc.front, category: fc.category,
        categories: [fc.category], content: fc.front + ' ' + fc.back,
        icon: '📇', snippet: fc.back, url: `flashcard.html?lesson=${fc.lessonId}`
      });
    });

    // Quiz questions
    quizRes.forEach(q => {
      searchData.push({
        type: 'quiz', id: q.id, title: q.question, category: q.category,
        categories: [q.category], content: q.question + ' ' + q.options.join(' ') + ' ' + q.explanation,
        icon: '❓', snippet: q.explanation, url: `quiz.html?lesson=${q.lessonId}`
      });
    });

    generateSuggestions();
  } catch (e) {
    console.error('Failed to load search data:', e);
  }
}

function generateSuggestions() {
  // Extract common keywords from lesson titles and content
  const wordFreq = {};
  lessons.forEach(l => {
    const words = (l.title + ' ' + l.moTa).toLowerCase().split(/\s+/);
    words.forEach(w => { if (w.length > 3) wordFreq[w] = (wordFreq[w] || 0) + 1; });
  });
  const suggestions = Object.entries(wordFreq).sort((a,b) => b[1] - a[1]).slice(0, 12).map(([w]) => w);
  const suggEl = document.getElementById('searchSuggestions');
  if (suggEl) {
    suggEl.innerHTML = suggestions.map(s => `<span class="search-suggestion-tag" onclick="performSearch('${s}')">${s}</span>`).join('');
  }
}

function highlightKeyword(text, keyword) {
  if (!keyword) return text;
  const regex = new RegExp(`(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return text.replace(regex, '<span class="search-highlight">$1</span>');
}

function performSearch(query) {
  const input = document.getElementById('searchMainInput');
  if (query !== undefined) { input.value = query; }
  const text = (query !== undefined ? query : input.value).toLowerCase().trim();

  if (!text) { searchResults = []; renderSearchResults(); return; }

  searchResults = searchData.filter(item => {
    if (searchTypeFilter !== 'all' && item.type !== searchTypeFilter) return false;
    if (searchCategoryFilter !== 'all' && !item.categories.includes(searchCategoryFilter)) return false;
    return item.content.toLowerCase().includes(text) || item.title.toLowerCase().includes(text);
  }).map(item => {
    // Score by relevance
    let score = 0;
    if (item.title.toLowerCase().includes(text)) score += 10;
    if (item.content.toLowerCase().includes(text)) score += 1;
    return { ...item, score };
  }).sort((a, b) => b.score - a.score);

  renderSearchResults();
}

function renderSearchResults() {
  const container = document.getElementById('searchResults');
  const typeLabels = { lesson: 'Bài học', flashcard: 'Flashcard', quiz: 'Quiz' };
  const typeIcons = { lesson: '📖', flashcard: '📇', quiz: '❓' };

  if (searchResults.length === 0) {
    container.innerHTML = '<div class="no-results"><i class="fas fa-search"></i>Nhập từ khóa để tìm kiếm.</div>';
    return;
  }

  const input = document.getElementById('searchMainInput');
  const keyword = input.value.trim();

  container.innerHTML = searchResults.map(item => {
    const snippet = item.snippet.length > 150 ? item.snippet.substring(0, 150) + '...' : item.snippet;
    return `
      <div class="search-result-item anim-fade-in-up" onclick="window.location.href='${item.url}'">
        <div class="title">${typeIcons[item.type]} ${highlightKeyword(item.title, keyword)}</div>
        <div class="snippet">${highlightKeyword(snippet, keyword)}</div>
        <div class="meta">
          <span class="tag">${typeLabels[item.type]}</span>
          ${item.categories.map(c => `<span class="tag">${c}</span>`).join('')}
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('searchResultCount').textContent = `${searchResults.length} kết quả`;
}

function initSearchPage() {
  loadSearchData();

  document.getElementById('searchMainInput')?.addEventListener('input', function() {
    performSearch(this.value);
  });

  document.getElementById('searchTypeFilter')?.addEventListener('change', function() {
    searchTypeFilter = this.value;
    performSearch();
  });

  document.getElementById('searchCategoryFilter')?.addEventListener('change', function() {
    searchCategoryFilter = this.value;
    performSearch();
  });

  // Auto-search from URL param
  const urlParams = new URLSearchParams(window.location.search);
  const q = urlParams.get('q');
  if (q) { document.getElementById('searchMainInput').value = q; performSearch(q); }
}

window.performSearch = performSearch;
