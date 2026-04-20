# PromptLean

<div align="center">

**A curated library of token-efficient prompts for developers.**<br>
Every prompt ships with Lean, Balanced, and Max Quality variants.

[![Live Site](https://img.shields.io/badge/Live%20Site-kishormorol.github.io%2Fpromptlean-7c3aed?style=for-the-badge&logo=github-pages&logoColor=white)](https://kishormorol.github.io/promptlean/)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-3b82f6?style=for-the-badge&logo=github)](https://github.com/kishormorol/promptlean/blob/main/contribute.html)
[![Prompts](https://img.shields.io/badge/Prompts-10-f59e0b?style=for-the-badge)](https://kishormorol.github.io/promptlean/browse.html)

</div>

---

## What is PromptLean?

PromptLean is a curated, open-source library of prompts for common developer tasks — code review, research summarization, data analysis, SQL optimization, LLM evaluation, and more.

The key idea: **most prompts are overengineered**. You don't need 200 tokens of preamble for a code review. But sometimes you do need the full rubric. PromptLean gives you the right prompt for the right moment.

Every prompt ships with **three variants**:

| Variant | Typical tokens | When to use |
|---------|---------------|-------------|
| ⚡ **Lean** | 20–40 | Fast iteration, tight context windows, high-volume API calls |
| ⚖ **Balanced** | 60–90 | Structured output with consistent format across runs |
| ★ **Max Quality** | 150–220 | External deliverables, research-grade tasks, expert review |

The Lean variant saves **80–87% of tokens** vs Max Quality with surprisingly little quality loss for well-understood tasks.

---

## Prompts

10 prompts across 7 categories:

| Category | Prompts |
|----------|---------|
| Code | Code Review · Explain Code · Write Unit Tests |
| Data | Optimize SQL Query · Data Cleaning Plan |
| Research | Summarize Research Paper |
| Writing | Write a Technical Blog Post |
| AI / ML | LLM Evaluation Rubric |
| Productivity | Meeting Notes → Action Items |
| Engineering | System Design Review |

→ **[Browse all prompts](https://kishormorol.github.io/promptlean/browse.html)**

---

## Pages

| Page | URL |
|------|-----|
| Home | [`/`](https://kishormorol.github.io/promptlean/) |
| Browse | [`/browse.html`](https://kishormorol.github.io/promptlean/browse.html) — search, filter by category/tag |
| Prompt detail | [`/prompt.html?id=...`](https://kishormorol.github.io/promptlean/prompt.html?id=code-review) — variant tabs, token breakdown, model notes, copy |
| Compare | [`/compare.html`](https://kishormorol.github.io/promptlean/compare.html) — 3-column side-by-side view |
| About | [`/about.html`](https://kishormorol.github.io/promptlean/about.html) |
| Contribute | [`/contribute.html`](https://kishormorol.github.io/promptlean/contribute.html) |

---

## Contributing

All prompts live in [`data/prompts.json`](data/prompts.json). To add one:

1. Fork the repo
2. Add your entry following the schema below
3. Open a PR — include example outputs from at least one model

**Schema:**
```json
{
  "id": "your-prompt-id",
  "title": "Your Prompt Title",
  "category": "Code",
  "tags": ["tag1", "tag2"],
  "featured": false,
  "description": "One sentence describing what this prompt does and when to use it.",
  "model_notes": {
    "gpt-4o": "...",
    "claude-3-5-sonnet": "...",
    "gemini-1.5-pro": "..."
  },
  "variants": {
    "lean":        { "prompt": "...", "token_estimate": 28 },
    "balanced":    { "prompt": "...", "token_estimate": 72 },
    "max_quality": { "prompt": "...", "token_estimate": 165 }
  }
}
```

Full contribution guidelines: [`contribute.html`](https://kishormorol.github.io/promptlean/contribute.html)

---

## Stack

- **Pure HTML + CSS + Vanilla JS** — no framework, no build step
- **Data-driven** — all prompts in `data/prompts.json`, rendered client-side
- **GitHub Pages** — deployed via GitHub Actions on every push to `main`
- **Dark mode default**, light mode toggle, persisted in `localStorage`

---

## Local development

```bash
git clone https://github.com/kishormorol/promptlean.git
cd promptlean
# open index.html in a browser, or serve with any static server:
python -m http.server 8000
# then visit http://localhost:8000
```

---

## TODO

- [ ] Check token consumption system for all frontier LLMs (GPT-4o, Claude 3.5/3.7, Gemini 1.5/2.0, Llama 3, Mistral, etc.) and update Lean variant token estimates accordingly
- [ ] Add cross-model comparison feature: which prompt variants are most efficient for which frontier models — benchmark Lean/Balanced/Max Quality output quality per model and surface recommendations on each prompt page
- [ ] Research and expand category coverage beyond developer tasks — candidate categories include: General Purpose, Well-being & Mental Health, Safety & Crisis Support, Supportive Conversation, Entertainment & Creative, Education & Tutoring, Career & Professional Growth — needs research on prompt patterns and best practices for each

## License

MIT — use freely, contribute back.
