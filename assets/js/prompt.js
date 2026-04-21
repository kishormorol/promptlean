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

  document.title = `${prompt.title} — PromptLean`;

  document.getElementById('breadcrumb').innerHTML = `
    <a href="index.html">Home</a>
    <span class="breadcrumb-sep">/</span>
    <a href="browse.html">Browse</a>
    <span class="breadcrumb-sep">/</span>
    <span>${prompt.title}</span>`;

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

  // ── State ────────────────────────────────────────────────────────
  const stdVariants = Object.keys(prompt.variants);
  let activeVariant = 'lean';
  let communityVariants = [];

  // ── Create dynamic sections ──────────────────────────────────────
  const playgroundSection = document.createElement('div');
  document.getElementById('variant-display').after(playgroundSection);
  const diffSection = document.createElement('div');
  playgroundSection.after(diffSection);
  let playgroundOpen = false;
  let diffOpen = false;

  // ── Variant data helper ──────────────────────────────────────────
  const getVariantData = () => {
    if (prompt.variants[activeVariant]) return prompt.variants[activeVariant];
    return communityVariants.find(v => v.id === activeVariant) || prompt.variants.lean;
  };
  const isCommunityActive = () => !prompt.variants[activeVariant];

  // ── Playground ───────────────────────────────────────────────────
  const renderPlayground = () => {
    if (!playgroundOpen) { playgroundSection.innerHTML = ''; return; }
    const v = getVariantData();
    const matches = [...v.prompt.matchAll(/\[([A-Z][A-Z_/ 0-9]*)\]/g)];
    const placeholders = [...new Set(matches.map(m => m[1]))];

    if (placeholders.length === 0) {
      playgroundSection.innerHTML = `
        <div style="margin-top:12px;padding:12px 16px;background:var(--bg-3);border:1px dashed var(--border);border-radius:var(--radius);color:var(--text-3);font-size:0.8125rem;text-align:center;">
          No placeholders in this variant
        </div>`;
      return;
    }

    const inputId = (ph) => `pg-${ph.replace(/[^a-zA-Z0-9]/g, '_')}`;

    playgroundSection.innerHTML = `
      <div class="playground">
        <div class="playground-header">
          <span style="font-size:0.8125rem;font-weight:600;color:var(--text);">⌨ Playground — fill in placeholders</span>
          <button class="copy-btn" id="copy-filled">⧉ Copy filled</button>
        </div>
        <div class="playground-body">
          <div class="playground-inputs">
            ${placeholders.map(ph => `
              <div class="playground-field">
                <label>[${ph}]</label>
                <input class="playground-input" id="${inputId(ph)}" placeholder="${ph.toLowerCase().replace(/_/g, ' ')}" autocomplete="off" />
              </div>`).join('')}
          </div>
          <div class="playground-preview" id="playground-preview">${highlightPrompt(v.prompt)}</div>
        </div>
      </div>`;

    const updatePreview = () => {
      const preview = document.getElementById('playground-preview');
      if (!preview) return;
      let result = escapeHtml(v.prompt);
      placeholders.forEach(ph => {
        const val = document.getElementById(inputId(ph))?.value?.trim() || '';
        const esc = escapeHtml(`[${ph}]`);
        const replacement = val
          ? `<span style="color:var(--lean);font-weight:600;">${escapeHtml(val)}</span>`
          : `<span class="ph">[${ph}]</span>`;
        result = result.split(esc).join(replacement);
      });
      preview.innerHTML = result;
    };

    placeholders.forEach(ph => {
      document.getElementById(inputId(ph))?.addEventListener('input', updatePreview);
    });

    document.getElementById('copy-filled').addEventListener('click', () => {
      let filled = v.prompt;
      placeholders.forEach(ph => {
        const val = document.getElementById(inputId(ph))?.value?.trim() || '';
        if (val) filled = filled.split(`[${ph}]`).join(val);
      });
      PL.copy(filled, document.getElementById('copy-filled'));
    });
  };

  // ── Diff view ────────────────────────────────────────────────────
  const renderDiff = () => {
    diffSection.innerHTML = '';
    if (!diffOpen) return;

    const lean = prompt.variants.lean;
    const quality = prompt.variants.max_quality;

    if (!lean || !quality) {
      diffSection.innerHTML = `<p style="margin-top:12px;font-size:0.8125rem;color:var(--text-3);">Diff requires both Lean and Max Quality variants.</p>`;
      return;
    }

    const diff = computeDiff(quality.prompt, lean.prompt);

    const leftHtml = diff.map(d => {
      if (d.type === 'same')   return escapeHtml(d.val);
      if (d.type === 'remove') return `<span class="diff-remove">${escapeHtml(d.val)}</span>`;
      return '';
    }).join('');

    const rightHtml = diff.map(d => {
      if (d.type === 'same') return escapeHtml(d.val);
      if (d.type === 'add')  return `<span class="diff-add">${escapeHtml(d.val)}</span>`;
      return '';
    }).join('');

    diffSection.innerHTML = `
      <div style="margin-top:12px;">
        <div style="font-size:0.78rem;color:var(--text-3);margin-bottom:8px;display:flex;gap:12px;flex-wrap:wrap;">
          <span><span class="diff-remove" style="padding:1px 6px;border-radius:3px;">removed</span> from Max Quality</span>
          <span><span class="diff-add" style="padding:1px 6px;border-radius:3px;">kept/added</span> in Lean</span>
        </div>
        <div class="diff-grid">
          <div class="diff-panel">
            <div class="diff-header">
              <span class="badge badge-quality">★ Max Quality</span>
              <span class="token-pill quality">${quality.token_estimate}t</span>
            </div>
            <div class="diff-body">${leftHtml}</div>
          </div>
          <div class="diff-panel">
            <div class="diff-header">
              <span class="badge badge-lean">⚡ Lean</span>
              <span class="token-pill lean">${lean.token_estimate}t</span>
            </div>
            <div class="diff-body">${rightHtml}</div>
          </div>
        </div>
      </div>`;
  };

  // ── Tab rendering ─────────────────────────────────────────────────
  const STD_LABEL = { lean: '⚡ Lean', balanced: '⚖ Balanced', max_quality: '★ Max Quality' };
  const STD_CLS   = { lean: 'lean',   balanced: 'balanced',    max_quality: 'quality' };

  const tabBar = document.getElementById('variant-tabs');

  const renderTabs = () => {
    const stdTabs = stdVariants.map(v => {
      const isActive = v === activeVariant;
      return `<button class="variant-tab${isActive ? ' active-' + STD_CLS[v] : ''}" data-v="${v}">${STD_LABEL[v]}</button>`;
    }).join('');

    const commTabs = communityVariants.map(cv => {
      const isActive = cv.id === activeVariant;
      return `<button class="variant-tab community-tab${isActive ? ' active-community' : ''}" data-v="${cv.id}" title="${cv.description}">${cv.label}</button>`;
    }).join('');

    const sep = communityVariants.length > 0
      ? `<span style="width:1px;background:var(--border);align-self:stretch;margin:2px 4px;"></span>`
      : '';

    tabBar.innerHTML = stdTabs + sep + commTabs;
  };

  // ── Variant render ────────────────────────────────────────────────
  const renderVariant = () => {
    const v = getVariantData();
    const isCom = isCommunityActive();

    let badgeHtml, tokenHtml, colorClass;
    if (isCom) {
      const cv = communityVariants.find(c => c.id === activeVariant);
      badgeHtml = `<span class="badge badge-community">${cv.label}</span><span class="badge badge-cat" style="font-size:0.7rem;margin-left:4px;">by ${cv.author}</span>`;
      tokenHtml = `<span class="token-pill community">${v.token_estimate} tokens</span>`;
      colorClass = 'community';
    } else {
      const label = STD_LABEL[activeVariant];
      colorClass = STD_CLS[activeVariant];
      badgeHtml = `<span class="badge badge-${colorClass}">${label}</span>`;
      tokenHtml = `<span class="token-pill ${colorClass}">${v.token_estimate} tokens</span>`;
    }

    document.getElementById('variant-display').innerHTML = `
      <div class="prompt-block">
        <div class="prompt-block-header">
          <div class="prompt-block-meta">
            ${badgeHtml}
            ${tokenHtml}
          </div>
          <div class="prompt-block-actions">
            <button class="copy-btn" id="copy-main" onclick="copyPrompt()">⧉ Copy</button>
            <a href="compare.html?id=${prompt.id}" class="copy-btn">⇄ Compare</a>
          </div>
        </div>
        <pre class="prompt-text" id="prompt-text">${highlightPrompt(v.prompt)}</pre>
      </div>`;
    renderPlayground();
  };

  // ── Tab click listener (event delegation — survives innerHTML re-renders) ──
  tabBar.addEventListener('click', e => {
    const btn = e.target.closest('[data-v]');
    if (!btn) return;
    activeVariant = btn.dataset.v;
    renderTabs();
    renderVariant();
    updateSavingsBar();
  });

  // ── Toggle buttons ────────────────────────────────────────────────
  const tabRow = document.querySelector('.flex-center.gap-3.mb-4');
  if (tabRow) {
    const btnWrap = document.createElement('div');
    btnWrap.style.cssText = 'display:flex;gap:6px;align-items:center;flex-wrap:wrap;';
    btnWrap.innerHTML = `
      <button class="copy-btn" id="playground-toggle" title="Fill in [PLACEHOLDER] values">⌨ Playground</button>
      <button class="copy-btn" id="diff-toggle" title="Compare Max Quality vs Lean">⊞ Diff</button>`;
    tabRow.appendChild(btnWrap);
  }

  renderTabs();
  renderVariant();

  document.getElementById('playground-toggle')?.addEventListener('click', () => {
    playgroundOpen = !playgroundOpen;
    document.getElementById('playground-toggle').classList.toggle('copied', playgroundOpen);
    renderPlayground();
  });

  document.getElementById('diff-toggle')?.addEventListener('click', () => {
    diffOpen = !diffOpen;
    document.getElementById('diff-toggle').classList.toggle('copied', diffOpen);
    renderDiff();
  });

  // ── Token comparison table ────────────────────────────────────────
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
        ${stdVariants.map(v => {
          const t = prompt.variants[v].token_estimate;
          const pct = qualT ? Math.round((1 - t / qualT) * 100) : 0;
          const cls = STD_CLS[v];
          return `<tr style="border-top: 1px solid var(--border);">
            <td style="padding: 8px 0;"><span class="token-pill ${cls}">${STD_LABEL[v]}</span></td>
            <td style="text-align:right; padding: 8px 0; font-family: var(--font-mono); font-weight:600;">${t}</td>
            <td style="text-align:right; padding: 8px 0; color: var(--text-3);">${v === 'max_quality' ? '—' : `-${pct}%`}</td>
          </tr>`;
        }).join('')}
      </tbody>
    </table>`;

  // ── Savings bars ──────────────────────────────────────────────────
  const updateSavingsBar = () => {
    stdVariants.forEach(v => {
      const t = prompt.variants[v].token_estimate;
      const pct = qualT ? (t / qualT) * 100 : 100;
      const bar = document.getElementById(`bar-${v}`);
      if (bar) bar.style.width = pct + '%';
    });
  };

  document.getElementById('savings-bars').innerHTML = stdVariants.map(v => {
    const t = prompt.variants[v].token_estimate;
    const pct = qualT ? (t / qualT) * 100 : 100;
    const cls = STD_CLS[v];
    return `
      <div class="mb-3">
        <div class="flex-center gap-2 mb-2" style="justify-content: space-between;">
          <span class="text-sm">${STD_LABEL[v]}</span>
          <span class="font-mono text-xs text-2">${t}t</span>
        </div>
        <div class="savings-bar">
          <div class="savings-fill" id="bar-${v}" style="width: ${pct}%; background: var(--${cls === 'quality' ? 'quality' : cls});"></div>
        </div>
      </div>`;
  }).join('');

  // ── Model notes ───────────────────────────────────────────────────
  if (prompt.model_notes) {
    document.getElementById('model-notes').innerHTML = Object.entries(prompt.model_notes).map(([model, note]) =>
      `<div class="mb-3" style="padding: 10px 14px; background: var(--bg-3); border-radius: var(--radius-sm); border: 1px solid var(--border);">
        <div class="text-sm font-mono" style="color: var(--accent-light); margin-bottom: 4px;">${model}</div>
        <div class="text-sm text-2">${note}</div>
      </div>`
    ).join('');
  }

  // ── Cost estimator ────────────────────────────────────────────────
  const costEl = document.getElementById('cost-estimator');
  if (costEl) {
    const PRICES = {
      'gpt-5.4': 15, 'claude-sonnet-4-6': 3, 'claude-opus-4-6': 15,
      'gemini-3.1-pro': 3.5, 'grok-4': 5, 'llama-4-scout': 0.2,
      'mistral-large-3': 2, 'o1': 15
    };
    const priceModels = Object.keys(PRICES);
    let selectedModel = priceModels[0];

    const renderCostTable = () =>
      stdVariants.map(v => {
        const t = prompt.variants[v].token_estimate;
        const cost = (t / 1_000_000) * PRICES[selectedModel] * 1000;
        const cls = STD_CLS[v];
        return `<div class="cost-row">
          <span class="token-pill ${cls}">${{ lean: '⚡ Lean', balanced: '⚖ Balanced', max_quality: '★ Max' }[v]}</span>
          <span class="font-mono text-sm">$${cost < 0.01 ? cost.toFixed(4) : cost.toFixed(3)}</span>
        </div>`;
      }).join('') +
      `<p style="font-size:0.72rem;color:var(--text-3);margin-top:6px;">Per 1,000 API calls · input tokens only</p>`;

    costEl.innerHTML = `
      <select class="cost-select" id="cost-model">
        ${priceModels.map(m => `<option value="${m}">${m}</option>`).join('')}
      </select>
      <div id="cost-table">${renderCostTable()}</div>`;

    document.getElementById('cost-model').addEventListener('change', e => {
      selectedModel = e.target.value;
      document.getElementById('cost-table').innerHTML = renderCostTable();
    });
  }

  // ── Model × Variant Comparison ────────────────────────────────────
  const comparisonEl = document.getElementById('model-comparison-table');
  if (comparisonEl && prompt.benchmarks) {
    const scoreColor = s => s >= 5 ? '#22c55e' : s >= 4 ? '#3b82f6' : s >= 3 ? '#f59e0b' : '#ef4444';
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
              const bestCls = STD_CLS[b.best];
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
        ★ marks the recommended variant per model. Scores reflect output quality (1–5) for this prompt type.
      </p>`;
  } else if (comparisonEl) {
    document.getElementById('model-comparison-section').style.display = 'none';
  }

  // ── Related prompts ───────────────────────────────────────────────
  const related = data.prompts
    .filter(p => p.id !== id && (p.category === prompt.category || p.tags.some(t => prompt.tags.includes(t))))
    .slice(0, 3);

  if (related.length) {
    document.getElementById('related-grid').innerHTML = related.map(PL.renderCard).join('');
  } else {
    document.getElementById('related-section').classList.add('hidden');
  }

  // ── Workflow chaining ─────────────────────────────────────────────
  const WORKFLOWS = [
    { name: 'Code Quality Pipeline', icon: '🔧', steps: ['code-review', 'fix-bug', 'refactor-code', 'write-documentation', 'write-unit-tests'] },
    { name: 'Writing Pipeline',       icon: '✍',  steps: ['brainstorm-ideas', 'write-blog-post', 'write-api-docs', 'cold-email'] },
    { name: 'Research Pipeline',      icon: '🔬', steps: ['summarize-research-paper', 'llm-eval-rubric', 'brainstorm-ideas', 'write-blog-post'] },
    { name: 'Career Toolkit',         icon: '💼', steps: ['resume-review', 'cover-letter', 'interview-prep', 'linkedin-post'] },
    { name: 'Data Pipeline',          icon: '📊', steps: ['data-cleaning-plan', 'sql-query-optimize'] },
    { name: 'Learning Flow',          icon: '📚', steps: ['explain-concept', 'socratic-tutoring', 'generate-practice-questions'] },
    { name: 'Engineering Flow',       icon: '⚙',  steps: ['product-requirements', 'system-design-review', 'code-review', 'write-documentation'] },
  ];

  const chainEl = document.getElementById('workflow-chain');
  if (chainEl) {
    const wf = WORKFLOWS.find(w => w.steps.includes(id));
    if (wf) {
      const currentIdx = wf.steps.indexOf(id);
      const stepData = wf.steps.map(sid => {
        const p = data.prompts.find(x => x.id === sid);
        return { id: sid, title: p ? p.title : sid };
      });
      const nextStep = currentIdx < wf.steps.length - 1 ? stepData[currentIdx + 1] : null;

      chainEl.innerHTML = `
        <div class="divider" style="margin: 40px 0;"></div>
        <div class="section-header mb-4">
          <div>
            <h2 class="section-title">${wf.icon} ${wf.name}</h2>
            <span style="font-size:0.8rem;color:var(--text-3);">Step ${currentIdx + 1} of ${wf.steps.length}</span>
          </div>
          ${nextStep
            ? `<a href="${PL.BASE}prompt.html?id=${nextStep.id}" class="btn btn-primary btn-sm">Next: ${nextStep.title} →</a>`
            : '<span class="badge badge-lean">✓ Workflow complete</span>'}
        </div>
        <div class="workflow-steps">
          ${stepData.map((step, i) => `
            <a href="${PL.BASE}prompt.html?id=${step.id}" class="workflow-step${i === currentIdx ? ' current' : i < currentIdx ? ' done' : ''}">
              <div class="workflow-step-num">${i < currentIdx ? '✓' : i + 1}</div>
              <div class="workflow-step-title">${step.title}</div>
            </a>
            ${i < stepData.length - 1 ? '<div class="workflow-arrow">›</div>' : ''}
          `).join('')}
        </div>`;
    }
  }

  // ── Community variants (async load) ──────────────────────────────
  (async () => {
    try {
      const res = await fetch(`${PL.BASE}community/${id}.json`);
      if (!res.ok) return;
      communityVariants = await res.json();
      if (!Array.isArray(communityVariants) || communityVariants.length === 0) return;

      // Re-render tabs to include community tabs
      renderTabs();

      // Add community note below the token table
      const sidebar = document.querySelector('.prompt-detail-grid aside.sidebar');
      if (sidebar) {
        const note = document.createElement('div');
        note.className = 'card mb-4';
        note.innerHTML = `
          <div class="sidebar-label" style="margin-bottom:8px;">Community Variants</div>
          <p style="font-size:0.8125rem;color:var(--text-2);margin-bottom:10px;">${communityVariants.length} extra variant${communityVariants.length > 1 ? 's' : ''} contributed by the community.</p>
          ${communityVariants.map(cv => `
            <div style="padding:8px 10px;background:var(--bg-3);border:1px solid var(--community-border);border-radius:var(--radius-sm);margin-bottom:6px;">
              <div style="font-size:0.8125rem;font-weight:600;color:var(--community);">${cv.label}</div>
              <div style="font-size:0.75rem;color:var(--text-3);margin-top:2px;">${cv.description}</div>
            </div>`).join('')}
          <a href="contribute.html#community" style="font-size:0.75rem;color:var(--text-3);display:block;margin-top:8px;">+ Add a community variant →</a>`;
        // Insert before the first card in the sidebar
        sidebar.insertBefore(note, sidebar.firstChild);
      }
    } catch {
      // Community variants are optional — silent fail
    }
  })();

  // ── Global copy ───────────────────────────────────────────────────
  window.copyPrompt = () => {
    const text = getVariantData().prompt;
    const btn = document.getElementById('copy-main');
    PL.trackCopy(prompt.id);
    PL.copy(text, btn);
  };
});

/* ── Diff algorithm ──────────────────────────── */
function tokenize(str) { return str.match(/\S+|\s+/g) || []; }

function computeDiff(a, b) {
  const tokA = tokenize(a), tokB = tokenize(b);
  const m = tokA.length, n = tokB.length;
  if (m * n > 250000) return [{ type: 'remove', val: a }, { type: 'add', val: b }];

  const dp = Array.from({ length: m + 1 }, () => new Int32Array(n + 1));
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = tokA[i-1] === tokB[j-1] ? dp[i-1][j-1] + 1 : Math.max(dp[i-1][j], dp[i][j-1]);

  const result = [];
  let i = m, j = n;
  while (i > 0 || j > 0) {
    if (i > 0 && j > 0 && tokA[i-1] === tokB[j-1]) { result.unshift({ type: 'same',   val: tokA[i-1] }); i--; j--; }
    else if (j > 0 && (i === 0 || dp[i][j-1] >= dp[i-1][j])) { result.unshift({ type: 'add',    val: tokB[j-1] }); j--; }
    else                                                        { result.unshift({ type: 'remove', val: tokA[i-1] }); i--; }
  }
  return result;
}

/* ── Text helpers ────────────────────────────── */
function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function highlightPrompt(str) {
  return escapeHtml(str).replace(/\[([A-Z_/ ]+)\]/g, '<span class="ph">[$1]</span>');
}
