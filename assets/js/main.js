/* PromptLean — shared utilities */
const PL = window.PL = {};

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
  // All HTML pages are in the repo root, so data/ is always a sibling directory.
  const res = await fetch('data/prompts.json');
  PL._cache = await res.json();
  return PL._cache;
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

  return `
<a class="card-link" href="prompt.html?id=${p.id}">
  <div class="card">
    <div class="card-header">
      <div class="card-title">${p.title}</div>
      <div class="card-tokens">${tokenPills}</div>
    </div>
    <div class="card-desc">${p.description}</div>
    <div class="card-meta">
      <span class="badge badge-cat">${p.category}</span>
      ${featuredBadge}
      ${savings > 0 ? `<span class="text-xs text-3 ml-auto">⚡ ${savings}% leaner</span>` : ''}
    </div>
  </div>
</a>`.trim();
};

/* ── URL params ──────────────────────────────── */
PL.param = (key) => new URLSearchParams(location.search).get(key);

/* ── Init ────────────────────────────────────── */
PL.init = () => {
  PL.initTheme();
  PL.setActiveNav();
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.addEventListener('click', PL.toggleTheme);
};

document.addEventListener('DOMContentLoaded', PL.init);
