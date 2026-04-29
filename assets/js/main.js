/* PromptLean — shared utilities */
const PL = window.PL = {};

// Derive the site root from this script's own URL so the data path is always
// correct regardless of subdirectory depth (GitHub Pages, local file, etc.)
// e.g. "https://kishormorol.github.io/promptlean/assets/js/main.js"
//  → "https://kishormorol.github.io/promptlean/"
const _scriptEl = document.currentScript;
PL.BASE = _scriptEl
  ? new URL('../..', _scriptEl.src).href          // up from assets/js/ → root
  : location.href.replace(/\/[^/]*$/, '/');       // fallback: strip filename

/* ── Theme ──────────────────────────────────── */
PL.initTheme = () => {
  const saved = localStorage.getItem('pl-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = saved === 'dark' ? '☀' : '☾';
};

PL.toggleTheme = () => {
  const current = document.documentElement.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('pl-theme', next);
  const btn = document.getElementById('theme-toggle');
  if (btn) btn.textContent = next === 'dark' ? '☀' : '☾';
};

/* ── Nav active state ───────────────────────── */
PL.setActiveNav = () => {
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(a => {
    const href = a.getAttribute('href') || '';
    const match = href.split('/').pop();
    if (path === match || (path === '' && match === 'index.html')) {
      a.classList.add('active');
    }
  });
};

/* ── Data loading ────────────────────────────── */
PL._cache = null;
PL.loadPrompts = async () => {
  if (PL._cache) return PL._cache;
  const url = PL.BASE + 'data/prompts.json';
  let res;
  try {
    res = await fetch(url);
  } catch (err) {
    throw new Error(`Network error fetching ${url}: ${err.message}`);
  }
  if (!res.ok) throw new Error(`Failed to load prompts (${res.status}) at ${url}`);
  PL._cache = await res.json();
  return PL._cache;
};

/* ── Error display ───────────────────────────── */
PL.showError = (container, msg) => {
  const el = typeof container === 'string'
    ? document.getElementById(container)
    : container;
  if (!el) return;
  el.innerHTML = `
    <div class="empty-state" style="color: var(--text-2);">
      <div class="empty-state-icon">⚠</div>
      <h3>Could not load prompts</h3>
      <p style="font-size: 0.8rem; max-width: 360px; margin: 0 auto;">${msg}</p>
    </div>`;
};

/* ── Toast ───────────────────────────────────── */
PL.toast = (msg, duration = 2200) => {
  let el = document.getElementById('toast');
  if (!el) {
    el = document.createElement('div');
    el.id = 'toast';
    document.body.appendChild(el);
  }
  el.textContent = msg;
  el.classList.add('show');
  clearTimeout(el._t);
  el._t = setTimeout(() => el.classList.remove('show'), duration);
};

/* ── Copy ────────────────────────────────────── */
PL.copy = async (text, btn) => {
  try {
    await navigator.clipboard.writeText(text);
    if (btn) {
      const orig = btn.innerHTML;
      btn.innerHTML = '✓ Copied';
      btn.classList.add('copied');
      setTimeout(() => { btn.innerHTML = orig; btn.classList.remove('copied'); }, 2000);
    }
    PL.toast('Copied to clipboard');
  } catch {
    PL.toast('Copy failed — select text manually');
  }
};

/* ── Badges ──────────────────────────────────── */
PL.variantBadge = (v) => {
  const map = {
    lean: '<span class="badge badge-lean">⚡ Lean</span>',
    balanced: '<span class="badge badge-balanced">⚖ Balanced</span>',
    max_quality: '<span class="badge badge-quality">★ Max Quality</span>'
  };
  return map[v] || v;
};

PL.tokenPill = (v, tokens) => `<span class="token-pill ${v === 'max_quality' ? 'quality' : v}">${tokens}t</span>`;

/* ── Favorites ───────────────────────────────── */
PL.getFavorites = () => {
  try { return new Set(JSON.parse(localStorage.getItem('pl-favorites') || '[]')); }
  catch { return new Set(); }
};
PL.isFavorite = (id) => PL.getFavorites().has(id);
PL.toggleFavorite = (id) => {
  const favs = PL.getFavorites();
  favs.has(id) ? favs.delete(id) : favs.add(id);
  localStorage.setItem('pl-favorites', JSON.stringify([...favs]));
};
PL.clickFav = (e, id) => {
  e.preventDefault();
  e.stopPropagation();
  PL.toggleFavorite(id);
  const isFav = PL.isFavorite(id);
  document.querySelectorAll(`[data-fav="${id}"]`).forEach(el => {
    el.classList.toggle('active', isFav);
    el.title = isFav ? 'Remove from saved' : 'Save prompt';
    el.textContent = isFav ? '★' : '☆';
  });
  if (typeof window.__onFavChange === 'function') window.__onFavChange();
};

/* ── Usage tracking ──────────────────────────── */
PL.getCopyCount = (id) => {
  try { return parseInt(localStorage.getItem(`pl-copies-${id}`) || '0', 10); }
  catch { return 0; }
};
PL.trackCopy = (id) => {
  localStorage.setItem(`pl-copies-${id}`, PL.getCopyCount(id) + 1);
};

/* ── Card rendering ──────────────────────────── */
PL.renderCard = (p) => {
  const variants = Object.keys(p.variants);
  const leanT = p.variants.lean?.token_estimate;
  const qualT = p.variants.max_quality?.token_estimate;
  const savings = leanT && qualT ? Math.round((1 - leanT / qualT) * 100) : 0;

  const tokenPills = variants.map(v =>
    `<span class="token-pill ${v === 'max_quality' ? 'quality' : v}">${p.variants[v].token_estimate}t</span>`
  ).join('');

  const featuredBadge = p.featured ? '<span class="badge badge-featured">Featured</span>' : '';
  const popularBadge = PL.getCopyCount(p.id) >= 10 ? '<span class="badge badge-popular">🔥 Popular</span>' : '';
  const isFav = PL.isFavorite(p.id);

  return `
<a class="card-link" href="${PL.BASE}prompt.html?id=${p.id}">
  <div class="card">
    <div class="card-header">
      <div class="card-title">${p.title}</div>
      <div class="card-tokens">${tokenPills}</div>
    </div>
    <div class="card-desc">${p.description}</div>
    <div class="card-meta">
      <span class="badge badge-cat">${p.category}</span>
      ${featuredBadge}
      ${popularBadge}
      ${savings > 0 ? `<span class="text-xs text-3 ml-auto">⚡ ${savings}% leaner</span>` : ''}
      <span class="fav-btn${isFav ? ' active' : ''}" data-fav="${p.id}" title="${isFav ? 'Remove from saved' : 'Save prompt'}" onclick="PL.clickFav(event,'${p.id}')">${isFav ? '★' : '☆'}</span>
    </div>
  </div>
</a>`.trim();
};

/* ── URL params ──────────────────────────────── */
PL.param = (key) => new URLSearchParams(location.search).get(key);

/* ── Text helpers (shared by prompt.js & compare.js) ─────────────── */
PL.escapeHtml = (str) =>
  str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

PL.highlightPrompt = (str) =>
  PL.escapeHtml(str).replace(/\[([A-Z_/ ]+)\]/g, '<span class="ph">[$1]</span>');

/* ── GitHub stars ────────────────────────────── */
PL.fetchGithubStars = async () => {
  const el = document.getElementById('gh-stars');
  if (!el) return;
  try {
    const cached = sessionStorage.getItem('pl-gh-stars');
    if (cached) { el.textContent = cached; return; }
    const res = await fetch('https://api.github.com/repos/kishormorol/promptlean', {
      headers: { Accept: 'application/vnd.github+json' }
    });
    if (!res.ok) return;
    const { stargazers_count } = await res.json();
    const label = stargazers_count >= 1000
      ? (stargazers_count / 1000).toFixed(1).replace(/\.0$/, '') + 'k'
      : String(stargazers_count);
    el.textContent = label;
    sessionStorage.setItem('pl-gh-stars', label);
  } catch { /* silently ignore — button still works as a link */ }
};

/* ── Init ────────────────────────────────────── */
PL.init = () => {
  PL.initTheme();
  PL.setActiveNav();
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.addEventListener('click', PL.toggleTheme);
  PL.fetchGithubStars();
};

document.addEventListener('DOMContentLoaded', PL.init);
