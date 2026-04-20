/* PromptLean — compare page */
document.addEventListener('DOMContentLoaded', async () => {
  const data = await PL.loadPrompts();
  const all = data.prompts;

  let selectedId = PL.param('id') || null;

  /* ── Build selector ─── */
  const selector = document.getElementById('prompt-selector');
  selector.innerHTML = `<option value="">— choose a prompt —</option>` +
    all.map(p => `<option value="${p.id}" ${p.id === selectedId ? 'selected' : ''}>${p.title}</option>`).join('');

  selector.addEventListener('change', () => {
    selectedId = selector.value || null;
    render();
    // update URL param without reload
    const url = new URL(location.href);
    if (selectedId) url.searchParams.set('id', selectedId);
    else url.searchParams.delete('id');
    history.replaceState(null, '', url);
  });

  /* ── Render compare grid ─── */
  const area = document.getElementById('compare-area');
  const placeholder = document.getElementById('compare-placeholder');

  const render = () => {
    if (!selectedId) {
      area.classList.add('hidden');
      placeholder.classList.remove('hidden');
      return;
    }
    const prompt = all.find(p => p.id === selectedId);
    if (!prompt) return;

    area.classList.remove('hidden');
    placeholder.classList.add('hidden');

    // Title bar
    document.getElementById('compare-title').innerHTML = `
      <h2 style="font-size: 1.25rem; margin-bottom: 4px;">${prompt.title}</h2>
      <div class="flex-center gap-2">
        <span class="badge badge-cat">${prompt.category}</span>
        ${prompt.tags.slice(0, 3).map(t => `<span class="tag">${t}</span>`).join('')}
        <a href="prompt.html?id=${prompt.id}" class="btn btn-ghost btn-sm" style="margin-left: auto;">Full detail →</a>
      </div>`;

    const variants = ['lean', 'balanced', 'max_quality'];
    const labels = { lean: '⚡ Lean', balanced: '⚖ Balanced', max_quality: '★ Max Quality' };
    const qualT = prompt.variants.max_quality?.token_estimate;

    document.getElementById('compare-cols').innerHTML = variants.map(v => {
      const vdata = prompt.variants[v];
      const t = vdata.token_estimate;
      const savings = v !== 'max_quality' && qualT ? Math.round((1 - t/qualT) * 100) : null;
      const cls = v === 'max_quality' ? 'quality' : v;

      return `
      <div class="compare-col">
        <div class="compare-col-header">
          <div class="flex-center gap-2">
            <span class="badge badge-${cls}">${labels[v]}</span>
            <span class="token-pill ${cls}">${t}t</span>
          </div>
          <div class="flex-center gap-2">
            ${savings ? `<span class="text-xs text-3">-${savings}%</span>` : ''}
            <button class="copy-btn" onclick="copyVariant('${v}')">⧉</button>
          </div>
        </div>
        <div class="compare-col-body">
          <pre class="prompt-text" id="text-${v}" style="font-size: 0.75rem; max-height: 480px; overflow-y: auto;">${highlightPrompt(vdata.prompt)}</pre>
        </div>
      </div>`;
    }).join('');

    // Savings summary row
    const leanT = prompt.variants.lean?.token_estimate;
    document.getElementById('savings-summary').innerHTML = `
      <div style="display: flex; gap: 16px; align-items: center; padding: 12px 16px; background: var(--lean-bg); border: 1px solid var(--lean-border); border-radius: var(--radius);">
        <span class="badge badge-lean">⚡</span>
        <span class="text-sm">Using Lean saves <strong style="color: var(--lean);">${qualT - leanT} tokens</strong> vs Max Quality — that's <strong style="color: var(--lean);">${Math.round((1-leanT/qualT)*100)}% fewer tokens</strong> per call.</span>
      </div>`;

    // Store for copy
    window._comparePrompt = prompt;
  };

  window.copyVariant = (v) => {
    if (!window._comparePrompt) return;
    const text = window._comparePrompt.variants[v].prompt;
    PL.copy(text);
  };

  render();
});

function escapeHtml(str) {
  return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}

function highlightPrompt(str) {
  return escapeHtml(str).replace(/\[([A-Z_/ ]+)\]/g, '<span class="ph">[$1]</span>');
}
