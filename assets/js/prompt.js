/* PromptLean — single prompt detail page */
document.addEventListener('DOMContentLoaded', async () => {
  const id = PL.param('id');
  if (!id) { location.href = PL.BASE + 'browse.html'; return; }

  let data;
  try {
    data = await PL.loadPrompts();
  } catch (err) {
    PL.showError('main-content', err.message);
    return;
  }
  const prompt = data.prompts.find(p => p.id === id);
  if (!prompt) {
    document.getElementById('main-content').innerHTML = `
      <div class="empty-state">
        <div class="empty-state-icon">🔍</div>
        <h3>Prompt not found</h3>
        <p><a href="browse.html">Back to browse</a></p>
      </div>`;
    return;
  }

  // Page title
  document.title = `${prompt.title} — PromptLean`;

  // Breadcrumb
  document.getElementById('breadcrumb').innerHTML = `
    <a href="index.html">Home</a>
    <span class="breadcrumb-sep">/</span>
    <a href="browse.html">Browse</a>
    <span class="breadcrumb-sep">/</span>
    <span>${prompt.title}</span>`;

  // Header
  const leanT = prompt.variants.lean?.token_estimate;
  const qualT = prompt.variants.max_quality?.token_estimate;
  const savings = leanT && qualT ? Math.round((1 - leanT / qualT) * 100) : 0;

  document.getElementById('prompt-header').innerHTML = `
    <div class="flex-center gap-2 mb-3 flex-wrap">
      <span class="badge badge-cat">${prompt.category}</span>
      ${prompt.featured ? '<span class="badge badge-featured">Featured</span>' : ''}
      ${savings > 0 ? `<span class="badge badge-lean">⚡ ${savings}% leaner</span>` : ''}
    </div>
    <h1 style="font-size: 2rem; margin-bottom: 10px;">${prompt.title}</h1>
    <p style="font-size: 1.0625rem; max-width: 680px;">${prompt.description}</p>
    <div class="flex-center gap-2 mt-3 flex-wrap">
      ${prompt.tags.map(t => `<a href="browse.html?tag=${t}" class="tag">${t}</a>`).join('')}
    </div>`;

  // Variants
  let activeVariant = 'lean';
  const variants = Object.keys(prompt.variants);

  const renderVariant = () => {
    const v = prompt.variants[activeVariant];
    const label = { lean: '⚡ Lean', balanced: '⚖ Balanced', max_quality: '★ Max Quality' }[activeVariant];
    const colorClass = activeVariant === 'max_quality' ? 'quality' : activeVariant;

    document.getElementById('variant-display').innerHTML = `
      <div class="prompt-block">
        <div class="prompt-block-header">
          <div class="prompt-block-meta">
            <span class="badge badge-${colorClass === 'quality' ? 'quality' : activeVariant}">${label}</span>
            <span class="token-pill ${colorClass}">${v.token_estimate} tokens</span>
          </div>
          <div class="prompt-block-actions">
            <button class="copy-btn" id="copy-main" onclick="copyPrompt()">
              ⧉ Copy
            </button>
            <a href="compare.html?id=${prompt.id}" class="copy-btn">⇄ Compare</a>
          </div>
        </div>
        <pre class="prompt-text" id="prompt-text">${highlightPrompt(v.prompt)}</pre>
      </div>`;
  };

  // Tabs
  const tabBar = document.getElementById('variant-tabs');
  tabBar.innerHTML = variants.map(v => {
    const label = { lean: '⚡ Lean', balanced: '⚖ Balanced', max_quality: '★ Max Quality' }[v];
    return `<button class="variant-tab ${v === activeVariant ? 'active-' + (v === 'max_quality' ? 'quality' : v) : ''}" data-v="${v}">${label}</button>`;
  }).join('');

  tabBar.addEventListener('click', e => {
    const btn = e.target.closest('[data-v]');
    if (!btn) return;
    activeVariant = btn.dataset.v;
    tabBar.querySelectorAll('.variant-tab').forEach(b => {
      const v = b.dataset.v;
      b.className = 'variant-tab' + (v === activeVariant ? ` active-${v === 'max_quality' ? 'quality' : v}` : '');
    });
    renderVariant();
    // update savings bar
    updateSavingsBar();
  });

  renderVariant();

  // Token comparison table
  document.getElementById('token-table').innerHTML = `
    <table style="width:100%; border-collapse: collapse; font-size: 0.875rem;">
      <thead>
        <tr style="color: var(--text-3);">
          <th style="text-align:left; padding: 6px 0; font-weight:500;">Variant</th>
          <th style="text-align:right; padding: 6px 0; font-weight:500;">Tokens</th>
          <th style="text-align:right; padding: 6px 0; font-weight:500;">vs Max Quality</th>
        </tr>
      </thead>
      <tbody>
        ${variants.map(v => {
          const t = prompt.variants[v].token_estimate;
          const pct = qualT ? Math.round((1 - t/qualT) * 100) : 0;
          const label = { lean: '⚡ Lean', balanced: '⚖ Balanced', max_quality: '★ Max Quality' }[v];
          const cls = v === 'max_quality' ? 'quality' : v;
          return `<tr style="border-top: 1px solid var(--border);">
            <td style="padding: 8px 0;"><span class="token-pill ${cls}">${label}</span></td>
            <td style="text-align:right; padding: 8px 0; font-family: var(--font-mono); font-weight:600;">${t}</td>
            <td style="text-align:right; padding: 8px 0; color: var(--text-3);">${v === 'max_quality' ? '—' : `-${pct}%`}</td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>`;

  // Savings bars
  const updateSavingsBar = () => {
    variants.forEach(v => {
      const t = prompt.variants[v].token_estimate;
      const pct = qualT ? (t / qualT) * 100 : 100;
      const bar = document.getElementById(`bar-${v}`);
      if (bar) bar.style.width = pct + '%';
    });
  };

  document.getElementById('savings-bars').innerHTML = variants.map(v => {
    const t = prompt.variants[v].token_estimate;
    const pct = qualT ? (t / qualT) * 100 : 100;
    const label = { lean: '⚡ Lean', balanced: '⚖ Balanced', max_quality: '★ Max Quality' }[v];
    const cls = v === 'max_quality' ? 'quality' : v;
    return `
      <div class="mb-3">
        <div class="flex-center gap-2 mb-2" style="justify-content: space-between;">
          <span class="text-sm">${label}</span>
          <span class="font-mono text-xs text-2">${t}t</span>
        </div>
        <div class="savings-bar">
          <div class="savings-fill" id="bar-${v}" style="width: ${pct}%; background: var(--${cls === 'quality' ? 'quality' : cls});"></div>
        </div>
      </div>`;
  }).join('');

  // Model notes
  if (prompt.model_notes) {
    document.getElementById('model-notes').innerHTML = Object.entries(prompt.model_notes).map(([model, note]) =>
      `<div class="mb-3" style="padding: 10px 14px; background: var(--bg-3); border-radius: var(--radius-sm); border: 1px solid var(--border);">
        <div class="text-sm font-mono" style="color: var(--accent-light); margin-bottom: 4px;">${model}</div>
        <div class="text-sm text-2">${note}</div>
      </div>`
    ).join('');
  }

  // Model × Variant Comparison
  const comparisonEl = document.getElementById('model-comparison-table');
  if (comparisonEl && prompt.benchmarks) {
    const scoreColor = (s) => {
      if (s >= 5) return '#22c55e';
      if (s >= 4) return '#3b82f6';
      if (s >= 3) return '#f59e0b';
      return '#ef4444';
    };
    const scoreDot = (s, isBest) => {
      const color = scoreColor(s);
      const ring = isBest ? `box-shadow: 0 0 0 2px ${color};` : '';
      return `<span style="display:inline-flex;align-items:center;gap:5px;">
        <span style="width:10px;height:10px;border-radius:50%;background:${color};flex-shrink:0;${ring}"></span>
        <span style="font-family:var(--font-mono);font-size:0.8rem;">${s}</span>
        ${isBest ? '<span style="font-size:0.7rem;color:var(--text-3);">★</span>' : ''}
      </span>`;
    };
    const variantLabel = { lean: '⚡ Lean', balanced: '⚖ Balanced', max_quality: '★ Max' };
    const models = Object.keys(prompt.benchmarks);
    const variantKeys = ['lean', 'balanced', 'max_quality'];

    comparisonEl.innerHTML = `
      <div style="overflow-x:auto;">
        <table style="width:100%;border-collapse:collapse;font-size:0.875rem;min-width:480px;">
          <thead>
            <tr style="border-bottom:1px solid var(--border);">
              <th style="text-align:left;padding:10px 12px;font-weight:600;color:var(--text-2);width:160px;">Model</th>
              ${variantKeys.map(v => `<th style="text-align:center;padding:10px 12px;font-weight:600;color:var(--text-2);">${variantLabel[v]}</th>`).join('')}
              <th style="text-align:center;padding:10px 12px;font-weight:600;color:var(--text-2);">Best Pick</th>
            </tr>
          </thead>
          <tbody>
            ${models.map((model, i) => {
              const b = prompt.benchmarks[model];
              const rowBg = i % 2 === 0 ? 'background:var(--bg-2)' : '';
              const bestLabel = { lean: '⚡ Lean', balanced: '⚖ Balanced', max_quality: '★ Max Quality' }[b.best];
              const bestCls = b.best === 'max_quality' ? 'quality' : b.best;
              return `<tr style="border-bottom:1px solid var(--border);${rowBg}">
                <td style="padding:10px 12px;font-family:var(--font-mono);font-size:0.8rem;color:var(--accent-light);">${model}</td>
                ${variantKeys.map(v => `<td style="text-align:center;padding:10px 12px;">${scoreDot(b[v], b.best === v)}</td>`).join('')}
                <td style="text-align:center;padding:10px 12px;"><span class="badge badge-${bestCls}" style="font-size:0.75rem;">${bestLabel}</span></td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>
      <p style="margin-top:10px;font-size:0.78rem;color:var(--text-3);">
        ★ marks the recommended variant per model. Scores reflect output quality (1–5) for this prompt type — not model capability in general.
      </p>`;
  } else if (comparisonEl) {
    document.getElementById('model-comparison-section').style.display = 'none';
  }

  // Related prompts
  const related = data.prompts
    .filter(p => p.id !== id && (p.category === prompt.category || p.tags.some(t => prompt.tags.includes(t))))
    .slice(0, 3);

  if (related.length) {
    document.getElementById('related-grid').innerHTML = related.map(PL.renderCard).join('');
  } else {
    document.getElementById('related-section').classList.add('hidden');
  }

  // Global copy function
  window.copyPrompt = () => {
    const text = prompt.variants[activeVariant].prompt;
    const btn = document.getElementById('copy-main');
    PL.copy(text, btn);
  };
});

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function highlightPrompt(str) {
  // Escape HTML first, then wrap [PLACEHOLDER] tokens in styled spans
  return escapeHtml(str).replace(/\[([A-Z_/ ]+)\]/g, '<span class="ph">[$1]</span>');
}
