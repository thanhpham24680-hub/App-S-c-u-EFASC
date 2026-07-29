// ================================================================
// APP.JS - Main application logic: navigation, sidebar, dark mode, search
// ================================================================

// Image optimization config
const IMAGE_OPTIMIZATION = { enabled: false, proxy: 'https://images.weserv.nl/?url=', width: 1200, format: 'webp', quality: 80, fallbackToOriginal: true };

function getOptimizedImageUrl(url) {
  if (!IMAGE_OPTIMIZATION.enabled || !url || !url.includes('i.postimg.cc')) return url;
  try { return `${IMAGE_OPTIMIZATION.proxy}${encodeURIComponent(url)}&w=${IMAGE_OPTIMIZATION.width}&format=${IMAGE_OPTIMIZATION.format}&quality=${IMAGE_OPTIMIZATION.quality}`; }
  catch { return url; }
}

function processImageUrls(html) {
  return html.replace(/src="(https:\/\/i\.postimg\.cc\/[^"]+)"/g, (match, url) =>
    `src="${url}" data-original-src="${url}" fetchpriority="low" loading="lazy" decoding="async"`
  );
}

// Local storage helpers
function getData(key, defaultVal) { try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : defaultVal; } catch { return defaultVal; } }
function setData(key, val) { localStorage.setItem(key, JSON.stringify(val)); }

function getProgress() { return getData('progress', {}); }
function setProgress(lessonId, status) { const p = getProgress(); p[lessonId] = status; setData('progress', p); updateProgressUI(lessonId); renderContinueGrid(); }
function getProgressPercent(lessonId) { const s = getProgress()[lessonId] || 'not-started'; if (s === 'completed') return 100; if (s === 'reading') return 50; return 0; }

function getLessonCount(lesson) {
  let count = 0; const c = lesson.content;
  if (c.dauHieuChacChan) count += c.dauHieuChacChan.length;
  if (c.dauHieuNghiVan) count += c.dauHieuNghiVan.length;
  if (c.phanLoai) count += c.phanLoai.length;
  if (c.quyTrinh) count += c.quyTrinh.length;
  if (c.luuY) count += 1;
  return count;
}

function getReadingTime(lesson) {
  let text = lesson.title + ' ';
  const c = lesson.content;
  if (c.dauHieuChacChan) text += c.dauHieuChacChan.join(' ');
  if (c.dauHieuNghiVan) text += c.dauHieuNghiVan.join(' ');
  if (c.phanLoai) text += c.phanLoai.map(p => p.ten + ' ' + p.moTa).join(' ');
  if (c.quyTrinh) text += c.quyTrinh.join(' ');
  if (c.luuY) text += c.luuY;
  return Math.max(1, Math.round(text.split(/\s+/).length / 200));
}

function getRecent() { return getData('recent', []); }
function addRecent(lessonId) { let rec = getRecent().filter(id => id !== lessonId); rec.unshift(lessonId); if (rec.length > 5) rec.pop(); setData('recent', rec); renderRecentGrid(); }
function getBookmarks() { return getData('bookmarks', []); }
function toggleBookmark(lessonId) { let b = getBookmarks(); const idx = b.indexOf(lessonId); if (idx > -1) b.splice(idx, 1); else b.push(lessonId); setData('bookmarks', b); renderBookmarkGrid(); renderDetailBookmark(lessonId); showToast((idx > -1) ? 'Đã bỏ lưu' : 'Đã lưu vào yêu thích', 'info'); }
function isBookmarked(lessonId) { return getBookmarks().includes(lessonId); }
function getViewCount() { return getData('views', {}); }
function incrementView(lessonId) { const v = getViewCount(); v[lessonId] = (v[lessonId] || 0) + 1; setData('views', v); renderPopularGrid(); }

// Color helpers
function getBgColor(color) {
  const map = { red:'var(--color-red-bg)', orange:'var(--color-orange-bg)', green:'var(--color-green-bg)', blue:'var(--color-blue-bg)', purple:'var(--color-purple-bg)', pink:'var(--color-pink-bg)', teal:'var(--color-teal-bg)', indigo:'var(--color-indigo-bg)', gray:'var(--color-gray-bg)', brown:'var(--color-brown-bg)', yellow:'var(--color-orange-bg)', dark:'var(--bg-secondary)' };
  return map[color] || 'var(--bg-primary)';
}
function getColorCode(color) {
  const map = { red:'var(--color-red)', orange:'var(--color-orange)', green:'var(--color-green)', blue:'var(--color-blue)', purple:'var(--color-purple)', pink:'var(--color-pink)', teal:'var(--color-teal)', indigo:'var(--color-indigo)', gray:'var(--color-gray)', brown:'var(--color-brown)', yellow:'var(--color-orange)', dark:'var(--text-primary)' };
  return map[color] || 'var(--accent)';
}

// Render functions
function renderContinueGrid() {
  const container = document.getElementById('continueGrid'); if (!container) return;
  const rec = getRecent(); let cont = null;
  for (let id of rec) { if (getProgress()[id] !== 'completed') { cont = lessons.find(l => l.id === id); break; } }
  if (!cont) { for (let l of lessons) { if (getProgress()[l.id] !== 'completed') { cont = l; break; } } if (!cont) cont = lessons[0]; }
  container.innerHTML = `<div class="continue-item" onclick="showLessonDetail('${cont.id}')"><span class="icon ${getIconAnimClass(cont.icon)}">${cont.icon}</span><div class="info"><div class="title">${cont.title}</div><div class="sub">${getProgressPercent(cont.id)}% hoàn thành · ${getReadingTime(cont)} phút đọc</div></div></div>`;
}

function renderRecentGrid() {
  const container = document.getElementById('recentGrid'); if (!container) return;
  const rec = getRecent().slice(0, 5);
  if (rec.length === 0) { container.innerHTML = '<div class="text-sm text-muted" style="color:var(--text-muted);padding:8px 0;">Chưa có bài học nào.</div>'; return; }
  container.innerHTML = rec.map(id => { const l = lessons.find(ls => ls.id === id); if (!l) return ''; return `<div class="continue-item" onclick="showLessonDetail('${l.id}')"><span class="icon ${getIconAnimClass(l.icon)}">${l.icon}</span><div class="info"><div class="title">${l.title}</div><div class="sub">${getProgressPercent(l.id)}% hoàn thành</div></div></div>`; }).join('');
}

function renderBookmarkGrid() {
  const container = document.getElementById('bookmarkGrid'); if (!container) return;
  const bm = getBookmarks();
  if (bm.length === 0) { container.innerHTML = '<div class="text-sm text-muted" style="color:var(--text-muted);padding:8px 0;">Chưa có bài yêu thích.</div>'; return; }
  container.innerHTML = bm.map(id => { const l = lessons.find(ls => ls.id === id); if (!l) return ''; return `<div class="continue-item" onclick="showLessonDetail('${l.id}')"><span class="icon ${getIconAnimClass(l.icon)}">${l.icon}</span><div class="info"><div class="title">${l.title}</div><div class="sub"><i class="fas fa-star" style="color:var(--color-amber);"></i> Yêu thích</div></div></div>`; }).join('');
}

function renderPopularGrid() {
  const container = document.getElementById('popularGrid'); if (!container) return;
  const views = getViewCount();
  const top = lessons.slice().sort((a,b) => (views[b.id]||0) - (views[a.id]||0)).slice(0,5);
  container.innerHTML = top.map(l => `<div class="continue-item" onclick="showLessonDetail('${l.id}')"><span class="icon ${getIconAnimClass(l.icon)}">${l.icon}</span><div class="info"><div class="title">${l.title}</div><div class="sub"><i class="fas fa-eye"></i> ${views[l.id]||0} lượt xem</div></div></div>`).join('');
}

function updateProgressUI(lessonId) {
  const pct = getProgressPercent(lessonId);
  document.querySelectorAll(`.progress-ring[data-id="${lessonId}"]`).forEach(ring => {
    const fg = ring.querySelector('.fg'); if (fg) { const c = 2*Math.PI*14; fg.style.strokeDasharray = c; }
    const label = ring.closest('.lesson-card')?.querySelector('.progress-label'); if (label) label.textContent = pct + '%';
  });
  updateProgressRing(lessonId);
}

// Grid rendering
let currentCategory = 'all';
let currentSearch = '';

function renderLessonGrid(filter = '', category = 'all') {
  const grid = document.getElementById('lessons-grid'); const container = document.getElementById('lessonsGridContainer'); if (!grid || !container) return;
  currentSearch = filter; currentCategory = category;
  const query = filter.toLowerCase().trim();
  let filtered = lessons;
  if (query) {
    filtered = filtered.filter(l =>
      l.title.toLowerCase().includes(query) || (l.moTa && l.moTa.toLowerCase().includes(query)) ||
      (l.doiTuongNguyCo && l.doiTuongNguyCo.toLowerCase().includes(query)) ||
      (l.content.dauHieuChacChan && l.content.dauHieuChacChan.some(d => d.toLowerCase().includes(query))) ||
      (l.content.dauHieuNghiVan && l.content.dauHieuNghiVan.some(d => d.toLowerCase().includes(query))) ||
      (l.content.quyTrinh && l.content.quyTrinh.some(d => d.toLowerCase().includes(query))) ||
      (l.content.luuY && l.content.luuY.toLowerCase().includes(query))
    );
  }
  if (category !== 'all') filtered = filtered.filter(l => l.category && l.category.includes(category));
  grid.classList.remove('hidden-layout');
  const filterBar = document.getElementById('categoryFilterBar');
  if (filterBar) filterBar.querySelectorAll('.filter-btn').forEach(btn => btn.classList.toggle('active', btn.dataset.category === category));
  if (filtered.length === 0) { container.innerHTML = `<div class="no-results"><i class="fas fa-search"></i>Không tìm thấy bài học phù hợp.</div>`; return; }
container.innerHTML = filtered.map((l, idx) => {
     const color = l.color || 'gray'; const bg = getBgColor(color); const pct = getProgressPercent(l.id);
     const c = 2*Math.PI*14; const offset = c - (pct/100)*c; const count = getLessonCount(l); const time = getReadingTime(l);
     const tags = (l.category||[]).map(cat => `<span class="tag">${cat}</span>`).join('');
     return `<div class="lesson-card anim-fade-in-up gradient-border stagger-${(idx%6)+1}" onclick="showLessonDetail('${l.id}')"><div class="card-header" style="background:${bg};"><span class="icon ${getIconAnimClass(l.icon)}">${l.icon}</span><span class="title">${l.title}</span></div><div class="card-body"><span class="hint"><i class="far fa-file-alt"></i> ${count} mục</span><span class="arrow"><i class="fas fa-arrow-right"></i></span></div><div class="card-tags">${tags}</div><div class="card-progress"><div class="progress-ring" data-id="${l.id}" style="--ring-circumference:${c};"><svg viewBox="0 0 32 32"><circle class="bg" cx="16" cy="16" r="14" /><circle class="fg" cx="16" cy="16" r="14" style="stroke-dasharray:${c};stroke-dashoffset:${c};" /></svg></div><span class="progress-label">${pct}%</span><span style="font-size:0.65rem;color:var(--text-muted);margin-left:auto;">${time} phút đọc</span></div><div class="card-footer"><span class="meta"><i class="far fa-clock"></i> ${time} phút</span><span class="badge">${pct===100?'✅ Hoàn thành':pct>0?'📖 Đang học':'📝 Chưa học'}</span></div></div>`;
   }).join('');
   requestAnimationFrame(() => {
     requestAnimationFrame(() => {
       filtered.forEach(l => updateProgressRing(l.id));
     });
   });
 }

// Sidebar
function renderSidebar(activeId) {
  const container = document.getElementById('lessons-sidebar-container'); if (!container) return;
  container.innerHTML = lessons.map(l => `<div onclick="switchToLesson('${l.id}')" class="sidebar-item ${activeId===l.id?'active':''}"><span class="icon ${getIconAnimClass(l.icon)}">${l.icon}</span><span class="label">${l.title}</span></div>`).join('');
}

// Detail content
function renderDetailContent(lessonId) {
  const lesson = lessons.find(l => l.id === lessonId); if (!lesson) return;
  const c = lesson.content; const color = lesson.color || 'gray'; const colorCode = getColorCode(color);
  incrementView(lessonId); addRecent(lessonId);
  const customLabels = lesson.customLabels || {};
  const labelPhanLoai = customLabels.phanLoai || 'Phân loại';
  const labelQuyTrinh = customLabels.quyTrinh || 'Quy trình';

  function accordionItem(title, content, icon, open = true, animClass = 'anim-slide-in-left') {
    if (!content) return '';
    return `<div class="accordion-item ${animClass} stagger-1"><div class="accordion-header ${open?'open':''}" onclick="toggleAccordion(this)"><span><i class="fas ${icon}"></i> ${title}</span><i class="fas fa-chevron-down"></i></div><div class="accordion-body ${open?'open':''}">${content}</div></div>`;
  }

  const introContent = `<div style="display:flex;flex-direction:column;gap:12px;">${lesson.moTa?`<div><strong>📖 Giới thiệu:</strong> ${lesson.moTa}</div>`:''}${lesson.doiTuongNguyCo?`<div><strong>⚠️ Đối tượng nguy cơ:</strong> ${lesson.doiTuongNguyCo}</div>`:''}</div>`;
  let dauHieuContent = '';
  if (c.dauHieuChacChan?.length) dauHieuContent += `<div class="infobox important anim-scale-in stagger-1"><div class="icon">⚠️</div><div class="content"><strong>Dấu hiệu chắc chắn</strong><ul>${c.dauHieuChacChan.map(i=>`<li>${i}</li>`).join('')}</ul></div></div>`;
  if (c.dauHieuNghiVan?.length) dauHieuContent += `<div class="infobox warning anim-scale-in stagger-2"><div class="icon">🔍</div><div class="content"><strong>Dấu hiệu nghi vấn</strong><ul>${c.dauHieuNghiVan.map(i=>`<li>${i}</li>`).join('')}</ul></div></div>`;
  if (!dauHieuContent) dauHieuContent = '<p style="color:var(--text-muted);">Không có dấu hiệu cụ thể.</p>';

  let phanLoaiContent = '';
  if (c.phanLoai?.length) {
    phanLoaiContent = `<div class="class-grid">${c.phanLoai.map((p,idx) => { const pc = p.color||'gray'; const pcode = getColorCode(pc); return `<div class="class-card anim-scale-in stagger-${idx+1}" style="border-left:4px solid ${pcode};"><div class="class-header"><span class="dot" style="background:${pcode};"></span><h4>${p.ten}</h4></div><div class="class-desc">${p.moTa}</div></div>`; }).join('')}</div>`;
  } else phanLoaiContent = '<p style="color:var(--text-muted);">Không có phân loại.</p>';

  let quyTrinhContent = '';
  if (c.quyTrinh?.length) {
    quyTrinhContent = `<div class="flow-timeline">${c.quyTrinh.map((step,idx) => { let cls='success'; if (step.toLowerCase().includes('115')||step.toLowerCase().includes('cấp cứu')||step.toLowerCase().includes('ngay')) cls='danger'; else if (step.toLowerCase().includes('theo dõi')||step.toLowerCase().includes('kiểm tra')) cls='warning'; let clean=step.replace(/^\d+\.\s*/,''); return `<div class="flow-step ${cls} anim-fade-in-left stagger-${idx+1}"><div class="line"><div class="dot">${idx+1}</div><div class="bar"></div></div><div class="content">${clean}</div></div>`; }).join('')}</div>`;
  } else quyTrinhContent = '<p style="color:var(--text-muted);">Chưa có quy trình.</p>';

  let luuYContent = c.luuY ? `<div class="infobox remember anim-scale-in stagger-1"><div class="icon">📌</div><div class="content"><strong>Lưu ý</strong><br>${c.luuY}</div></div>` : '<p style="color:var(--text-muted);">Không có lưu ý đặc biệt.</p>';
  const bm = isBookmarked(lessonId); const bmIcon = bm ? 'fas fa-star' : 'far fa-star';
  const hasSymptoms = (c.dauHieuChacChan?.length > 0) || (c.dauHieuNghiVan?.length > 0);
  const hasSteps = c.quyTrinh?.length > 0; const hasTypes = c.phanLoai?.length > 0;
  const overview = `<div class="detail-overview anim-fade-in-up stagger-1"><div class="stat-item"><span class="label">Mức độ</span><span class="value" style="color:${colorCode};">${color==='red'?'⚠️ Nghiêm trọng':color==='orange'?'🔶 Khẩn cấp':color==='yellow'?'🟡 Cần chú ý':'📌 Tư vấn'}</span></div><div class="stat-item"><span class="label">Phân loại</span><span class="value">${hasTypes?c.phanLoai.length:'0'} nhóm</span></div><div class="stat-item"><span class="label">Quy trình</span><span class="value">${hasSteps?c.quyTrinh.length:'0'} bước</span></div><div class="stat-item"><span class="label">Dấu hiệu</span><span class="value">${hasSymptoms?'Có':'Tham khảo'}</span></div><div class="stat-item"><span class="label">Thời gian</span><span class="value"><i class="far fa-clock"></i> ${getReadingTime(lesson)} phút</span></div></div>`;
  const breadcrumb = `<div class="breadcrumb anim-fade-in-up"><a onclick="showGrid()">Trang chủ</a><span class="sep">/</span><a onclick="showGrid()">Bài học</a><span class="sep">/</span><span style="font-weight:600;color:var(--text-primary);">${lesson.title}</span></div>`;
  const toc = `<div class="toc-sticky no-print" style="display:none;"><h4>Mục lục</h4><ul><li><a onclick="scrollToSection('overview')">📋 Tổng quan</a></li><li><a onclick="scrollToSection('intro')">📖 Giới thiệu</a></li>${c.dauHieuChacChan?.length||c.dauHieuNghiVan?.length?`<li><a onclick="scrollToSection('dau-hieu')">🔍 Dấu hiệu</a></li>`:''}${c.phanLoai?.length?`<li><a onclick="scrollToSection('phan-loai')">🏷️ ${labelPhanLoai}</a></li>`:''}${c.quyTrinh?.length?`<li><a onclick="scrollToSection('quy-trinh')">📋 ${labelQuyTrinh}</a></li>`:''}${c.luuY?`<li><a onclick="scrollToSection('luu-y')">📌 Lưu ý</a></li>`:''}</ul></div>`;

  document.getElementById('detail-content-area').innerHTML = `<div style="display:flex;gap:24px;flex-wrap:wrap;"><div style="flex:1;min-width:0;">${breadcrumb}<div style="display:flex;align-items:center;gap:16px;margin-bottom:16px;flex-wrap:wrap;" class="anim-fade-in-up stagger-1"><span class="${getIconAnimClass(lesson.icon)}" style="font-size:2.8rem;display:inline-block;">${lesson.icon}</span><h1 style="font-family:var(--font-display);font-weight:700;font-size:1.6rem;color:var(--text-primary);flex:1;">${lesson.title}</h1><button onclick="toggleBookmark('${lesson.id}')" style="background:none;border:none;font-size:1.6rem;cursor:pointer;color:var(--color-amber);transition:var(--transition);"><i class="${bmIcon}" id="bookmarkIcon-${lesson.id}"></i></button><button onclick="markComplete('${lesson.id}')" class="btn-primary" style="padding:10px 24px;font-size:0.9rem;"><i class="fas fa-check"></i> Đánh dấu hoàn thành</button></div><div id="overview">${overview}</div><div class="section-divider anim-fade-in-up stagger-2"></div><div id="intro">${accordionItem('Giới thiệu & Đối tượng nguy cơ', introContent, 'fa-info-circle', true, 'anim-slide-in-left stagger-3')}</div><div id="dau-hieu">${accordionItem('Dấu hiệu', dauHieuContent, 'fa-search', true, 'anim-slide-in-left stagger-4')}</div><div id="phan-loai">${accordionItem(labelPhanLoai, phanLoaiContent, 'fa-tags', true, 'anim-slide-in-right stagger-5')}</div><div id="quy-trinh">${accordionItem(labelQuyTrinh, quyTrinhContent, 'fa-list-ol', true, 'anim-slide-in-left stagger-6')}</div><div id="luu-y">${accordionItem('Lưu ý', luuYContent, 'fa-lightbulb', true, 'anim-slide-in-right stagger-7')}</div>${c.illustration?`<div style="margin:20px 0;" class="anim-fade-in-up stagger-8">${processImageUrls(c.illustration)}</div>`:''}${getLessonVideo(lesson.id)?`<div style="margin:24px 0;" class="anim-fade-in-up stagger-8"><h3 style="font-family:var(--font-display);font-weight:700;font-size:1.1rem;color:var(--text-primary);margin-bottom:12px;display:flex;align-items:center;gap:8px;"><i class="fas fa-play-circle" style="color:var(--color-red);"></i> Video hướng dẫn</h3><div class="video-wrapper" style="position:relative;padding-bottom:56.25%;height:0;overflow:hidden;border-radius:var(--radius-lg);border:1px solid var(--border-color);box-shadow:var(--shadow-md);"><iframe src="https://www.youtube.com/embed/${getLessonVideo(lesson.id)}?rel=0" title="Video hướng dẫn: ${lesson.title}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen loading="lazy" style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div></div>`:''}<div style="display:flex;justify-content:space-between;flex-wrap:wrap;gap:12px;margin-top:24px;padding-top:20px;border-top:1px solid var(--border-color);" class="anim-fade-in-up stagger-8"><button onclick="showGrid()" class="btn-secondary" style="padding:10px 24px;"><i class="fas fa-th-large"></i> Danh sách</button><button onclick="window.print()" class="btn-secondary" style="padding:10px 24px;"><i class="fas fa-print"></i> Xuất PDF</button><a href="pages/flashcard.html?lesson=${lesson.id}" class="btn-secondary" style="padding:10px 24px;text-decoration:none;"><i class="fas fa-layer-group"></i> Flashcard</a><a href="pages/quiz.html?lesson=${lesson.id}" class="btn-secondary" style="padding:10px 24px;text-decoration:none;"><i class="fas fa-question-circle"></i> Quiz</a></div></div>${toc}</div>`;
  renderSidebar(lessonId); updateProgressUI(lessonId);
  if (getProgress()[lessonId] !== 'completed') setProgress(lessonId, 'reading');
  updateDetailBookmark(lessonId); attachTOCScroll(); initScrollTextEffects(document.getElementById('detail-content-area'));
  document.querySelectorAll('.img-viewer').forEach(img => img.addEventListener('click', function(e) { e.stopPropagation(); openImageModal(this.src); }));
  document.querySelectorAll('#detail-content-area .infobox, #detail-content-area .class-card, #detail-content-area .flow-step, #detail-content-area .accordion-item, #detail-content-area .detail-overview, #detail-content-area .section-divider').forEach(el => { el.classList.add('detail-reveal'); });
  document.querySelectorAll('#detail-content-area p, #detail-content-area li, #detail-content-area .flow-step .content').forEach(el => { el.classList.add('content-line'); });
  initDetailScrollReveal();
  initContentLineAnimations();
}

function updateDetailBookmark(lessonId) { const icon = document.getElementById('bookmarkIcon-' + lessonId); if (icon) icon.className = isBookmarked(lessonId) ? 'fas fa-star' : 'far fa-star'; }
function toggleAccordion(el) { const body = el.nextElementSibling; if (body.classList.contains('open')) { body.classList.remove('open'); el.classList.remove('open'); } else { body.classList.add('open'); el.classList.add('open'); } }
function scrollToSection(id) { const el = document.getElementById(id); if (el) { el.scrollIntoView({ behavior:'smooth', block:'start' }); el.style.transition='background 0.3s'; el.style.background='var(--accent-light)'; setTimeout(()=>{el.style.background='';},800); } }
function attachTOCScroll() { const toc = document.querySelector('.toc-sticky'); if (!toc) return; if (window.matchMedia('(max-width: 768px)').matches) { toc.style.display = 'none'; return; } const detail = document.getElementById('detail-layout'); toc.style.display = (detail && detail.scrollHeight > window.innerHeight * 1.5) ? 'block' : 'none'; }
function markComplete(lessonId) { setProgress(lessonId, 'completed'); showToast('🎉 Chúc mừng! Bạn đã hoàn thành bài học!', 'success'); launchConfetti(); updateProgressUI(lessonId); renderContinueGrid(); renderDetailContent(lessonId); }

// Image viewer
let currentZoom = 1, isDragging = false, startX, startY, translateX = 0, translateY = 0;
function openImageModal(src) { const modal = document.getElementById('imageModal'); document.getElementById('modalImage').src = src; modal.classList.add('open'); currentZoom = 1; translateX = 0; translateY = 0; applyTransform(); document.body.style.overflow = 'hidden'; }
function closeImageModal(e) { if (e && e.target !== e.currentTarget) return; document.getElementById('imageModal').classList.remove('open'); document.body.style.overflow = ''; }
function zoomImage(delta) { currentZoom = Math.min(3, Math.max(0.5, currentZoom + delta)); applyTransform(); }
function resetZoom() { currentZoom = 1; translateX = 0; translateY = 0; applyTransform(); }
function applyTransform() { document.getElementById('modalImage').style.transform = `scale(${currentZoom}) translate(${translateX}px, ${translateY}px)`; }

// Navigation
function pushGridState() { history.pushState({ view:'grid' }, '', window.location.pathname); }
function pushDetailState(id) { history.pushState({ view:'detail', id }, '', `?id=${id}`); }
function transitionToPage(showFn) {
  const currentPage = document.querySelector('#landing-page:not([style*="display:none"]), #about-page.visible, #lessons-grid:not(.hidden-layout), #detail-layout:not(.hidden-layout)');
  if (currentPage) { currentPage.classList.add('page-transition-out'); setTimeout(() => { currentPage.classList.remove('page-transition-out'); showFn(); }, 300); }
  else showFn();
}
function showGrid() { transitionToPage(() => { document.getElementById('landing-page').style.display='none'; document.getElementById('about-page').classList.remove('visible'); document.getElementById('about-page').style.display='none'; document.getElementById('detail-layout').classList.add('hidden-layout'); document.getElementById('lessons-grid').classList.remove('hidden-layout'); renderLessonGrid(currentSearch, currentCategory); pushGridState(); window.scrollTo({top:0,behavior:'smooth'}); closeSidebar(); }); }
function showLanding() { transitionToPage(() => { document.getElementById('detail-layout').classList.add('hidden-layout'); document.getElementById('lessons-grid').classList.add('hidden-layout'); document.getElementById('about-page').classList.remove('visible'); document.getElementById('about-page').style.display='none'; document.getElementById('landing-page').style.display='block'; renderContinueGrid(); renderRecentGrid(); renderBookmarkGrid(); renderPopularGrid(); history.replaceState({view:'landing'},'',window.location.pathname); window.scrollTo({top:0,behavior:'smooth'}); closeSidebar(); }); }
function showAbout() { transitionToPage(() => { document.getElementById('landing-page').style.display='none'; document.getElementById('lessons-grid').classList.add('hidden-layout'); document.getElementById('detail-layout').classList.add('hidden-layout'); const about = document.getElementById('about-page'); about.style.display='block'; about.classList.add('visible'); window.scrollTo({top:0,behavior:'smooth'}); closeSidebar(); history.pushState({view:'about'},'','?about'); }); }
function openFacebook() { window.open('https://www.facebook.com/EFASCUMP', '_blank'); }
window.goHome = showLanding;
window.switchToLesson = function(id) { transitionToPage(() => { renderDetailContent(id); closeSidebar(); pushDetailState(id); window.scrollTo({top:0,behavior:'smooth'}); document.getElementById('searchInput').value=''; document.getElementById('clearSearchBtn').classList.remove('visible'); document.getElementById('landing-page').style.display='none'; document.getElementById('about-page').classList.remove('visible'); document.getElementById('about-page').style.display='none'; document.getElementById('lessons-grid').classList.add('hidden-layout'); document.getElementById('detail-layout').classList.remove('hidden-layout'); }); };
window.showLessonDetail = function(id) { transitionToPage(() => { document.getElementById('landing-page').style.display='none'; document.getElementById('about-page').classList.remove('visible'); document.getElementById('about-page').style.display='none'; document.getElementById('lessons-grid').classList.add('hidden-layout'); document.getElementById('detail-layout').classList.remove('hidden-layout'); renderDetailContent(id); pushDetailState(id); window.scrollTo({top:0,behavior:'smooth'}); closeSidebar(); document.getElementById('searchInput').value=''; document.getElementById('clearSearchBtn').classList.remove('visible'); }); };
window.showRandomLesson = function() { showLessonDetail(lessons[Math.floor(Math.random()*lessons.length)].id); };
window.filterByCategory = function(category) { currentCategory=category; currentSearch=''; document.getElementById('searchInput').value=''; document.getElementById('clearSearchBtn').classList.remove('visible'); showGrid(); };

// Sidebar events
function openSidebar() { document.getElementById('sidebar').classList.add('open'); document.getElementById('sidebarOverlay').classList.add('active'); document.body.style.overflow='hidden'; }
function closeSidebar() { document.getElementById('sidebar').classList.remove('open'); document.getElementById('sidebarOverlay').classList.remove('active'); document.body.style.overflow=''; }

// Toast & Confetti
function showToast(msg, type='info') { const container = document.getElementById('toastContainer'); const toast = document.createElement('div'); toast.className = `toast ${type}`; toast.innerHTML = msg; container.appendChild(toast); setTimeout(() => { toast.style.opacity='0'; toast.style.transform='translateX(40px)'; setTimeout(()=>toast.remove(),300); }, 3000); }
function launchConfetti() { const container = document.getElementById('confettiContainer'); const colors = ['#dc2626','#f59e0b','#16a34a','#2563eb','#7c3aed','#ec4899']; for (let i=0; i<80; i++) { const p = document.createElement('div'); p.className='confetti-piece'; p.style.left=Math.random()*100+'%'; p.style.background=colors[Math.floor(Math.random()*colors.length)]; p.style.width=(Math.random()*8+4)+'px'; p.style.height=(Math.random()*8+4)+'px'; p.style.animationDuration=(Math.random()*2+2)+'s'; p.style.animationDelay=(Math.random()*1.5)+'s'; container.appendChild(p); setTimeout(()=>p.remove(),4000); } }

// Animated background: Canvas particles and subtle desktop-only mouse parallax.
function initAnimatedBackground() {
  const background = document.querySelector('.animated-background');
  const canvas = background?.querySelector('.particle-layer');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!background || !canvas || reducedMotion) return;

  const context = canvas.getContext('2d');
  const mobileQuery = window.matchMedia('(max-width: 768px)');
  const tabletQuery = window.matchMedia('(max-width: 1024px)');
  let particles = [];
  let animationFrame;
  let width = 0;
  let height = 0;
  let pixelRatio = 1;

  function createParticles() {
    const count = mobileQuery.matches ? 28 : tabletQuery.matches ? 44 : 64;
    particles = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: 0.7 + Math.random() * 1.8,
      speedX: (Math.random() - 0.5) * 0.045,
      speedY: -0.018 - Math.random() * 0.045,
      alpha: 0.08 + Math.random() * 0.15,
    }));
  }

  function resizeCanvas() {
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    createParticles();
  }

  function drawParticles() {
    context.clearRect(0, 0, width, height);
    particles.forEach((particle) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;
      if (particle.x < -4) particle.x = width + 4;
      if (particle.x > width + 4) particle.x = -4;
      if (particle.y < -4) particle.y = height + 4;
      context.beginPath();
      context.fillStyle = `rgba(82, 168, 214, ${particle.alpha})`;
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
    });
    animationFrame = window.requestAnimationFrame(drawParticles);
  }

  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;
  function updateParallax() {
    currentX += (targetX - currentX) * 0.055;
    currentY += (targetY - currentY) * 0.055;
    background.style.setProperty('--parallax-x', `${currentX.toFixed(2)}px`);
    background.style.setProperty('--parallax-y', `${currentY.toFixed(2)}px`);
    window.requestAnimationFrame(updateParallax);
  }

  resizeCanvas();
  drawParticles();
  window.addEventListener('resize', resizeCanvas, { passive: true });
  if (!tabletQuery.matches) {
    window.addEventListener('pointermove', (event) => {
      targetX = ((event.clientX / width) - 0.5) * 20;
      targetY = ((event.clientY / height) - 0.5) * 16;
    }, { passive: true });
    updateParallax();
  }

  window.addEventListener('pagehide', () => window.cancelAnimationFrame(animationFrame), { once: true });
}

// Reveal text and content icons only when they enter the viewport.
function initScrollTextEffects(scope = document) {
  const textTargets = scope.querySelectorAll('.about-container h1, .about-container h2, .about-container h3, .about-container p, .about-container li, .detail-content h1, .detail-content h2, .detail-content h3, .detail-content p, .detail-content li, .continue-section h3');
  const iconTargets = scope.querySelectorAll('.detail-content .infobox .icon, .detail-content .flow-step .dot, .detail-content .class-card .dot, .detail-content .accordion-header > span > i');
  const iconSet = new Set(iconTargets);
  const targets = [...textTargets, ...iconTargets].filter((element) => !element.classList.contains('scroll-text-reveal') && !element.classList.contains('scroll-icon-reveal'));
  if (!targets.length) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const show = (element) => element.classList.add('is-visible');
  targets.forEach((element) => element.classList.add(iconSet.has(element) ? 'scroll-icon-reveal' : 'scroll-text-reveal'));
  if (reduceMotion || !('IntersectionObserver' in window)) { targets.forEach(show); return; }
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      show(entry.target);
      currentObserver.unobserve(entry.target);
    });
  }, { threshold: .12, rootMargin: '0px 0px -24px' });
  targets.forEach((element) => observer.observe(element));
}

// Progress ring draw animation: sets initial offset to full circumference, then animates to target
function updateProgressRing(lessonId) {
  const pct = getProgressPercent(lessonId);
  document.querySelectorAll(`.progress-ring[data-id="${lessonId}"]`).forEach(ring => {
    const fg = ring.querySelector('.fg'); if (!fg) return;
    const c = 2 * Math.PI * 14;
    const targetOffset = c - (pct / 100) * c;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fg.style.strokeDashoffset = targetOffset;
      });
    });
    const label = ring.closest('.lesson-card')?.querySelector('.progress-label'); if (label) label.textContent = pct + '%';
  });
}

// Scroll reveal for detail sections
function initDetailScrollReveal() {
  const targets = document.querySelectorAll('.detail-reveal');
  if (!targets.length) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) { targets.forEach(t => t.classList.add('is-visible')); return; }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -20px' });
  targets.forEach(t => observer.observe(t));
}

// Staggered content lines animation for detail page
function initContentLineAnimations() {
  const lines = document.querySelectorAll('.detail-content .content-line');
  if (!lines.length) return;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) { lines.forEach(l => l.classList.add('is-revealed')); return; }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-revealed');
      obs.unobserve(entry.target);
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -10px' });
  lines.forEach(l => observer.observe(l));
}

// Button ripple effect via event delegation
function initButtonRipple() {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) return;
  document.addEventListener('click', function(e) {
    const btn = e.target.closest('.btn-primary, .btn-secondary, .btn-outline');
    if (!btn) return;
    const ripple = document.createElement('span');
    const rect = btn.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.cssText = 'position:absolute;border-radius:50%;background:rgba(255,255,255,0.25);transform:scale(0);animation:rippleOut 0.5s ease-out forwards;pointer-events:none;width:' + size + 'px;height:' + size + 'px;left:' + (e.clientX - rect.left - size / 2) + 'px;top:' + (e.clientY - rect.top - size / 2) + 'px;';
    btn.style.position = btn.style.position || 'relative';
    btn.style.overflow = btn.style.overflow || 'hidden';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  });
}

// Add ripple keyframe dynamically
(function addRippleKeyframe() {
  if (document.getElementById('ripple-style')) return;
  const style = document.createElement('style');
  style.id = 'ripple-style';
  style.textContent = '@keyframes rippleOut { to { transform: scale(2.5); opacity: 0; } }';
  document.head.appendChild(style);
})();

// Init
function init() {
   initAnimatedBackground();
   initScrollTextEffects();
   initButtonRipple();

   // Chỉ kích hoạt chuyển động khi khối landing sắp đi vào vùng nhìn thấy.
   const revealLandingSections = () => {
     const targets = document.querySelectorAll('.landing-reveal');
     if (!('IntersectionObserver' in window)) {
       targets.forEach((target) => target.classList.add('is-visible'));
       return;
     }
     const observer = new IntersectionObserver((entries, currentObserver) => {
       entries.forEach((entry) => {
         if (!entry.isIntersecting) return;
         entry.target.classList.add('is-visible');
         currentObserver.unobserve(entry.target);
       });
     }, { threshold: 0.12, rootMargin: '0px 0px -32px' });
     targets.forEach((target) => observer.observe(target));
   };
   revealLandingSections();

   initDetailScrollReveal();
   initContentLineAnimations();

  // Sidebar
  document.getElementById('openSidebarBtn')?.addEventListener('click', openSidebar);
  document.getElementById('openSidebarBtnDesktop')?.addEventListener('click', openSidebar);
  document.getElementById('closeSidebarBtn')?.addEventListener('click', closeSidebar);
  document.getElementById('sidebarOverlay')?.addEventListener('click', closeSidebar);

  // Search
  const searchInput = document.getElementById('searchInput');
  const clearBtn = document.getElementById('clearSearchBtn');
  searchInput?.addEventListener('input', function() { const val = this.value; if (val.length>0) clearBtn.classList.add('visible'); else clearBtn.classList.remove('visible'); currentSearch=val; if (document.getElementById('lessons-grid').classList.contains('hidden-layout')) showGrid(); else renderLessonGrid(val, currentCategory); });
  clearBtn?.addEventListener('click', function() { searchInput.value=''; this.classList.remove('visible'); currentSearch=''; if (!document.getElementById('lessons-grid').classList.contains('hidden-layout')) renderLessonGrid('', currentCategory); else showLanding(); searchInput.focus(); });

  // Dark mode
  const darkToggle = document.getElementById('darkModeToggle');
  if (localStorage.getItem('darkMode') === 'true') { document.documentElement.classList.add('dark'); darkToggle.innerHTML = '<i class="fas fa-sun"></i>'; }
  darkToggle?.addEventListener('click', function() { const dark = document.documentElement.classList.toggle('dark'); localStorage.setItem('darkMode', dark); this.innerHTML = dark ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>'; });

  // Font size
  let currentFontScale = parseFloat(localStorage.getItem('fontScale')) || 1;
  const minScale = 0.7, maxScale = 1.6, step = 0.1;
  function applyFontScale(scale) { currentFontScale = Math.min(maxScale, Math.max(minScale, scale)); document.body.style.setProperty('--font-scale', currentFontScale); document.getElementById('fontSizeLabel').textContent = Math.round(currentFontScale*100)+'%'; localStorage.setItem('fontScale', currentFontScale); }
  document.getElementById('fontIncrease')?.addEventListener('click', () => applyFontScale(currentFontScale + step));
  document.getElementById('fontDecrease')?.addEventListener('click', () => applyFontScale(currentFontScale - step));
  applyFontScale(currentFontScale);

  // Start learning
  document.getElementById('startLearningBtn')?.addEventListener('click', function() { currentCategory='all'; currentSearch=''; document.getElementById('searchInput').value=''; document.getElementById('clearSearchBtn').classList.remove('visible'); showGrid(); });

  // Image modal
  document.getElementById('modalImage')?.addEventListener('mousedown', function(e) { isDragging=true; startX=e.clientX-translateX; startY=e.clientY-translateY; this.style.cursor='grabbing'; });
  document.addEventListener('mousemove', function(e) { if (!isDragging) return; translateX=e.clientX-startX; translateY=e.clientY-startY; applyTransform(); });
  document.addEventListener('mouseup', function() { isDragging=false; document.getElementById('modalImage').style.cursor='grab'; });
  document.addEventListener('keydown', function(e) { if (e.key === 'Escape') closeImageModal(); });

  // Popstate
  window.addEventListener('popstate', function(event) {
    const state = event.state;
    if (!state) { showLanding(); return; }
    if (state.view === 'detail' && state.id) showLessonDetail(state.id);
    else if (state.view === 'grid') showGrid();
    else if (state.view === 'about') showAbout();
    else showLanding();
    closeSidebar();
  });

  // Init page
  const urlParams = new URLSearchParams(window.location.search);
  const idParam = urlParams.get('id'); const aboutParam = urlParams.get('about');
  if (aboutParam !== null) showAbout();
  else if (idParam && lessons.find(l => l.id === idParam)) showLessonDetail(idParam);
  else showLanding();
}

document.addEventListener('DOMContentLoaded', init);
