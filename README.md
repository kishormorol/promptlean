# PromptLean

<div align="center">

**A curated library of token-efficient prompts — for developers, creators, educators, and everyone.**<br>
Every prompt ships with Lean, Balanced, and Max Quality variants.

[![Live Site](https://img.shields.io/badge/Live%20Site-kishormorol.github.io%2Fpromptlean-7c3aed?style=for-the-badge&logo=github-pages&logoColor=white)](https://kishormorol.github.io/promptlean/)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-3b82f6?style=for-the-badge&logo=github)](https://github.com/kishormorol/promptlean/blob/main/contribute.html)
[![Prompts](https://img.shields.io/badge/Prompts-18-f59e0b?style=for-the-badge)](https://kishormorol.github.io/promptlean/browse.html)
[![Categories](https://img.shields.io/badge/Categories-14-ec4899?style=for-the-badge)](https://kishormorol.github.io/promptlean/browse.html)

</div>

---

## What is PromptLean?

PromptLean is a curated, open-source library of prompts across 14 categories — from code review and SQL optimization to creative writing, journaling, interview prep, and emotional support.

The key idea: **most prompts are overengineered**. You don't need 200 tokens of preamble for a code review. But sometimes you do need the full rubric. PromptLean gives you the right prompt for the right moment.

Every prompt ships with **three variants**:

| Variant | Typical tokens | When to use |
|---------|---------------|-------------|
| ⚡ **Lean** | 18–40 | Fast iteration, tight context windows, high-volume API calls |
| ⚖ **Balanced** | 50–110 | Structured output with consistent format across runs |
| ★ **Max Quality** | 85–230 | External deliverables, research-grade tasks, expert review |

The Lean variant saves **80–87% of tokens** vs Max Quality with surprisingly little quality loss for well-understood tasks.

Every prompt detail page also includes a **Model × Variant comparison table** — quality scores (1–5) across 8 frontier models with recommended variant per model.

---

## Prompts

18 prompts across 14 categories:

| Category | Prompts |
|----------|---------|
| Code | Code Review · Explain Code · Write Unit Tests |
| Data | Optimize SQL Query · Data Cleaning Plan |
| Research | Summarize Research Paper |
| Writing | Write a Technical Blog Post |
| AI / ML | LLM Evaluation Rubric |
| Productivity | Meeting Notes → Action Items |
| Engineering | System Design Review |
| General Purpose | Summarize Any Text |
| Well-being & Mental Health | Daily Reflection & Journaling Guide |
| Safety & Crisis Support | Compassionate Crisis Response |
| Supportive Conversation | Active Listening & Emotional Support |
| Entertainment & Creative | Short Story Generator |
| Education & Tutoring | Explain Any Concept |
| Career & Professional Growth | Resume Review · Interview Preparation Coach |

→ **[Browse all prompts](https://kishormorol.github.io/promptlean/browse.html)**

---

## Model Coverage

All prompts include notes and quality benchmarks for 8 frontier models:

| Model | Provider |
|-------|----------|
| `gpt-5.4` | OpenAI |
| `claude-sonnet-4-6` | Anthropic |
| `claude-opus-4-6` | Anthropic |
| `gemini-3.1-pro` | Google |
| `grok-4` | xAI |
| `llama-4-scout` | Meta (open weight) |
| `mistral-large-3` | Mistral (open weight) |
| `o1` | OpenAI |

Each prompt detail page shows a **Model × Variant matrix** with color-coded quality scores and a recommended variant badge per model.

---

## Pages

| Page | URL |
|------|-----|
| Home | [`/`](https://kishormorol.github.io/promptlean/) |
| Browse | [`/browse.html`](https://kishormorol.github.io/promptlean/browse.html) — search, filter by category/tag |
| Prompt detail | [`/prompt.html?id=...`](https://kishormorol.github.io/promptlean/prompt.html?id=code-review) — variant tabs, token breakdown, model notes, comparison table |
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
    "gpt-5.4": "...",
    "claude-sonnet-4-6": "...",
    "claude-opus-4-6": "...",
    "gemini-3.1-pro": "...",
    "grok-4": "...",
    "llama-4-scout": "...",
    "mistral-large-3": "...",
    "o1": "..."
  },
  "benchmarks": {
    "gpt-5.4":           { "lean": 4, "balanced": 5, "max_quality": 5, "best": "balanced" },
    "claude-sonnet-4-6": { "lean": 5, "balanced": 5, "max_quality": 4, "best": "lean" }
  },
  "variants": {
    "lean":        { "prompt": "...", "token_estimate": 24 },
    "balanced":    { "prompt": "...", "token_estimate": 72 },
    "max_quality": { "prompt": "...", "token_estimate": 160 }
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

## License

MIT — use freely, contribute back.
