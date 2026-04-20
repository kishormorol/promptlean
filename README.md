# PromptLean

<div align="center">

**A curated library of token-efficient prompts — for developers, creators, educators, and everyone.**<br>
Every prompt ships with Lean, Balanced, and Max Quality variants.

[![Live Site](https://img.shields.io/badge/Live%20Site-kishormorol.github.io%2Fpromptlean-7c3aed?style=for-the-badge&logo=github-pages&logoColor=white)](https://kishormorol.github.io/promptlean/)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-3b82f6?style=for-the-badge&logo=github)](https://github.com/kishormorol/promptlean/blob/main/contribute.html)
[![Prompts](https://img.shields.io/badge/Prompts-31-f59e0b?style=for-the-badge)](https://kishormorol.github.io/promptlean/browse.html)
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

31 prompts across 14 categories:

| Category | Prompts |
|----------|---------|
| Code | Code Review · Explain Code · Write Unit Tests · Debug & Fix a Bug · Refactor Code · Write Code Documentation · Generate Regex · Translate Code |
| Data | Optimize SQL Query · Data Cleaning Plan |
| Research | Summarize Research Paper |
| Writing | Write a Technical Blog Post · Write API Docs · Cold Email |
| AI / ML | LLM Evaluation Rubric |
| Productivity | Meeting Notes → Action Items |
| Engineering | System Design Review · Product Requirements Document |
| General Purpose | Summarize Any Text · Brainstorm Ideas |
| Well-being & Mental Health | Daily Reflection & Journaling Guide |
| Safety & Crisis Support | Compassionate Crisis Response |
| Supportive Conversation | Active Listening & Emotional Support |
| Entertainment & Creative | Short Story Generator |
| Education & Tutoring | Explain Any Concept · Socratic Tutoring · Generate Practice Questions |
| Career & Professional Growth | Resume Review · Interview Preparation Coach · Cover Letter · LinkedIn Post |

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

## Alternatives comparison

If you're evaluating PromptLean against other prompt libraries:

| Tool | Free | Open source | Token variants | Model benchmarks | 14+ categories |
|---|---|---|---|---|---|
| **PromptLean** | ✅ | ✅ | ✅ | ✅ | ✅ |
| [AwesomePrompts](https://github.com/f/awesome-chatgpt-prompts) | ✅ | ✅ | ❌ | ❌ | ❌ |
| [FlowGPT](https://flowgpt.com) | Partial | ❌ | ❌ | ❌ | ✅ |
| [PromptHero](https://prompthero.com) | Partial | ❌ | ❌ | ❌ | ✅ |
| [LangChain Hub](https://smith.langchain.com/hub) | ✅ | ✅ | ❌ | ❌ | ✅ |

PromptLean is the only prompt library that gives you **three token-optimized variants per prompt with quality benchmarks across 8 frontier models** — free, no sign-up, open source.

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

## TODO

### Easy (pure HTML/JS/data)
- [ ] **Prompt Playground** — inline textarea with auto-highlighted `[PLACEHOLDER]` slots and one-click copy of the filled version
- [ ] **Favorites / Bookmarks** — `localStorage`-backed star on each prompt card with a "Saved" filter on browse
- [ ] **Usage counter badge** — track copy-clicks in `localStorage`, show "Popular" badge on cards with 10+ copies
- [ ] **Prompt diff view** — side-by-side token diff between Max Quality → Lean, color-highlighted like a GitHub diff
- [ ] **Token cost estimator** — pick a model + pricing tier, show estimated cost per 1000 API calls for each variant

### Medium
- [ ] **Submit a prompt UI** — form on `contribute.html` that generates the correct JSON schema for copy-paste into a PR
- [ ] **Prompt chaining view** — "Next prompt" suggestions based on workflow tags (e.g. Summarize → Evaluate → Design)
- [ ] **Search with token budget filters** — filter chips for < 30 / 30–100 / 100+ tokens and best-model picks

### Bigger
- [ ] **User-contributed variants** — `community/` folder for extra variants beyond lean/balanced/max_quality, rendered as extra tabs
- [ ] **API endpoint** — document the `prompts.json` GitHub raw URL so developers can `fetch()` it directly in their apps

---

## License

MIT — use freely, contribute back.
