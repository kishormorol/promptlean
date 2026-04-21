/* PromptLean — browse page */
document.addEventListener('DOMContentLoaded', async () => {
  let data;
  try {
    data = await PL.loadPrompts();
  } catch (err) {
    PL.showError('prompt-grid', err.message);
    return;
  }
  const all = data.prompts;

  let activeCategory = PL.param('cat') || 'All';
  let activeTag = PL.param('tag') || '';
  let query = '';
  let activeSaved = false;
  let activeBudget = 'all';

  /* ── Build category filters ─── */
  const catWrap = document.getElementById('cat-filters');
  const cats = ['All', ...data.categories];
  catWrap.innerHTML = cats.map(c =>
    `<button class="sidebar-item ${c === activeCategory ? 'active' : ''}" data-cat="${c}">${c}</button>`
  ).join('');

  catWrap.addEventListener('click', e => {
    const btn = e.target.closest('[data-cat]');
    if (!btn) return;
    activeCategory = btn.dataset.cat;
    activeTag = '';
    catWrap.querySelectorAll('.sidebar-item').forEach(b => b.classList.toggle('active', b.dataset.cat === activeCategory));
    render();
  });

  /* ── Build tag cloud ─── */
  const tagMap = {};
  all.forEach(p => p.tags.forEach(t => { tagMap[t] = (tagMap[t] || 0) + 1; }));
  const topTags = Object.entries(tagMap).sort((a,b) => b[1]-a[1]).slice(0, 18).map(e => e[0]);
  const tagWrap = document.getElementById('tag-cloud');
  tagWrap.innerHTML = topTags.map(t =>
    `<button class="tag ${t === activeTag ? 'active' : ''}" data-tag="${t}">${t}</button>`
  ).join('');

  tagWrap.addEventListener('click', e => {
    const btn = e.target.closest('[data-tag]');
    if (!btn) return;
    activeTag = activeTag === btn.dataset.tag ? '' : btn.dataset.tag;
    tagWrap.querySelectorAll('.tag').forEach(b => b.classList.toggle('active', b.dataset.tag === activeTag));
    render();
  });

  /* ── Saved filter ─── */
  const savedWrap = document.getElementById('saved-filter');
  if (savedWrap) {
    savedWrap.innerHTML = `<button class="sidebar-item" id="saved-btn">★ Saved</button>`;
    document.getElementById('saved-btn').addEventListener('click', () => {
      activeSaved = !activeSaved;
      document.getElementById('saved-btn').classList.toggle('active', activeSaved);
      render();
    });
  }

  window.__onFavChange = () => { if (activeSaved) render(); };

  /* ── Token budget filters ─── */
  const budgetWrap = document.getElementById('budget-filters');
  if (budgetWrap) {
    const budgets = [
      { key: 'all',   label: 'Any tokens' },
      { key: 'ultra', label: '⚡ < 30t' },
      { key: 'mid',   label: '⚖ 30–100t' },
      { key: 'full',  label: '★ 100+t' },
    ];
    budgetWrap.innerHTML = budgets.map(b =>
      `<button class="filter-btn${b.key === activeBudget ? ' active' : ''}" data-budget="${b.key}">${b.label}</button>`
    ).join('');
    budgetWrap.addEventListener('click', e => {
      const btn = e.target.closest('[data-budget]');
      if (!btn) return;
      activeBudget = btn.dataset.budget;
      budgetWrap.querySelectorAll('.filter-btn').forEach(b => b.classList.toggle('active', b.dataset.budget === activeBudget));
      render();
    });
  }

  /* ── Search ─── */
  const searchInput = document.getElementById('search');
  searchInput.addEventListener('input', e => {
    query = e.target.value.toLowerCase().trim();
    render();
  });

  /* ── Render ─── */
  const grid = document.getElementById('prompt-grid');
  const meta = document.getElementById('results-meta');

  const render = () => {
    let results = all;

    if (activeSaved) {
      const favs = PL.getFavorites();
      results = results.filter(p => favs.has(p.id));
    }
    if (activeCategory !== 'All') {
      results = results.filter(p => p.category === activeCategory);
    }
    if (activeTag) {
      results = results.filter(p => p.tags.includes(activeTag));
    }
    if (activeBudget !== 'all') {
      results = results.filter(p => {
        const t = p.variants.lean?.token_estimate || 0;
        if (activeBudget === 'ultra') return t < 30;
        if (activeBudget === 'mid')   return t >= 30 && t <= 100;
        if (activeBudget === 'full')  return t > 100;
        return true;
      });
    }
    if (query) {
      results = results.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query)) ||
        p.category.toLowerCase().includes(query)
      );
    }

    const budgetLabel = { ultra: ' · lean < 30t', mid: ' · lean 30–100t', full: ' · lean 100+t' }[activeBudget] || '';
    meta.textContent = `${results.length} prompt${results.length !== 1 ? 's' : ''}${activeSaved ? ' saved' : ''}${budgetLabel}`;

    if (results.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">${activeSaved ? '★' : '🔍'}</div>
          <h3>${activeSaved ? 'No saved prompts yet' : 'No prompts found'}</h3>
          <p>${activeSaved ? 'Star a prompt to save it here.' : 'Try a different filter or <a href="contribute.html">contribute one</a>.'}</p>
        </div>`;
      return;
    }

    grid.innerHTML = results.map(PL.renderCard).join('');
  };

  render();
});
