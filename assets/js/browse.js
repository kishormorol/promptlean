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
  let activeTag = '';
  let query = '';

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
    `<button class="tag" data-tag="${t}">${t}</button>`
  ).join('');

  tagWrap.addEventListener('click', e => {
    const btn = e.target.closest('[data-tag]');
    if (!btn) return;
    activeTag = activeTag === btn.dataset.tag ? '' : btn.dataset.tag;
    tagWrap.querySelectorAll('.tag').forEach(b => b.classList.toggle('active', b.dataset.tag === activeTag));
    render();
  });

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

    if (activeCategory !== 'All') {
      results = results.filter(p => p.category === activeCategory);
    }
    if (activeTag) {
      results = results.filter(p => p.tags.includes(activeTag));
    }
    if (query) {
      results = results.filter(p =>
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.tags.some(t => t.toLowerCase().includes(query)) ||
        p.category.toLowerCase().includes(query)
      );
    }

    meta.textContent = `${results.length} prompt${results.length !== 1 ? 's' : ''}`;

    if (results.length === 0) {
      grid.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🔍</div>
          <h3>No prompts found</h3>
          <p>Try a different filter or <a href="contribute.html">contribute one</a>.</p>
        </div>`;
      return;
    }

    grid.innerHTML = results.map(PL.renderCard).join('');
  };

  render();
});
