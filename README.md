# PromptLean

<div align="center">

**A curated library of token-efficient prompts — for developers, creators, educators, and everyone.**<br>
Every prompt ships with Lean, Balanced, and Max Quality variants.

[![Live Site](https://img.shields.io/badge/Live%20Site-kishormorol.github.io%2Fpromptlean-7c3aed?style=for-the-badge&logo=github-pages&logoColor=white)](https://kishormorol.github.io/promptlean/)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-3b82f6?style=for-the-badge&logo=github)](https://github.com/kishormorol/promptlean/blob/main/contribute.html)
[![Prompts](https://img.shields.io/badge/Prompts-50-f59e0b?style=for-the-badge)](https://kishormorol.github.io/promptlean/browse.html)
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

## Features

### On every prompt page
- **⌨ Playground** — fill `[PLACEHOLDER]` slots with live preview and one-click copy of the completed prompt
- **⊞ Diff view** — word-level diff between Max Quality and Lean, side by side with additions/removals highlighted
- **Cost estimator** — sidebar dropdown: pick a model, see estimated cost per 1,000 API calls for each variant
- **★ Favorites** — star any prompt to save it; browse page has a "Saved" filter
- **🔥 Popular badge** — appears on cards after 10+ copy-clicks (tracked in `localStorage`)

### On the browse page
- **Token budget filters** — ⚡ < 30t · ⚖ 30–100t · ★ 100+t filter chips on the lean variant
- **Saved filter** — show only starred prompts
- **Tag + category filters** — sidebar with all 14 categories and top 18 tags

### On prompt detail pages
- **Workflow stepper** — 7 predefined workflows (Code Quality, Writing, Research, Career, Data, Learning, Engineering); shows where the current prompt sits and links to the next step
- **Community variant tabs** — extra tabs loaded from `community/{id}.json`; fuchsia-styled to distinguish from standard variants

### Use as an API
All prompts are available as a raw JSON endpoint — no key, no auth:

```
https://raw.githubusercontent.com/kishormorol/promptlean/main/data/prompts.json
```

```js
const { prompts } = await fetch(
  'https://raw.githubusercontent.com/kishormorol/promptlean/main/data/prompts.json'
).then(r => r.json());
```

CORS is open (`access-control-allow-origin: *`). Full docs on the [About page](https://kishormorol.github.io/promptlean/about.html#api).

---

## Prompts

50 prompts across 14 categories:

| Category | Prompts |
|----------|---------|
| Code | Code Review · Explain Code · Write Unit Tests · Debug & Fix a Bug · Refactor Code · Write Code Documentation · Generate Regex · Translate Code |
| Data | Optimize SQL Query · Data Cleaning Plan · EDA Plan |
| Research | Summarize Research Paper · Literature Review |
| Writing | Write a Technical Blog Post · Write API Docs · Cold Email · Executive Summary |
| AI / ML | LLM Evaluation Rubric · System Prompt Writer |
| Productivity | Meeting Notes → Action Items · Weekly Planner · Email Reply · Decision Framework |
| Engineering | System Design Review · Product Requirements Document · Incident Postmortem · Architecture Decision Record |
| General Purpose | Summarize Any Text · Brainstorm Ideas · Explain Like I'm 5 · Give Feedback |
| Well-being & Mental Health | Daily Reflection & Journaling Guide · Stress Reframe · Goal Setting |
| Safety & Crisis Support | Compassionate Crisis Response |
| Supportive Conversation | Active Listening & Emotional Support |
| Entertainment & Creative | Short Story Generator · Poem Generator · Character Creator |
| Education & Tutoring | Explain Any Concept · Socratic Tutoring · Generate Practice Questions · Lesson Plan · Study Guide |
| Career & Professional Growth | Resume Review · Interview Preparation Coach · Cover Letter · LinkedIn Post · Salary Negotiation · Performance Review |

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
| Browse | [`/browse.html`](https://kishormorol.github.io/promptlean/browse.html) — search, filter by category/tag/budget/saved |
| Prompt detail | [`/prompt.html?id=...`](https://kishormorol.github.io/promptlean/prompt.html?id=code-review) — variants, playground, diff, cost estimator, workflow, community tabs |
| Compare | [`/compare.html`](https://kishormorol.github.io/promptlean/compare.html) — 3-column side-by-side view |
| About | [`/about.html`](https://kishormorol.github.io/promptlean/about.html) — includes API docs |
| Contribute | [`/contribute.html`](https://kishormorol.github.io/promptlean/contribute.html) — prompt builder + community variant guide |

---

## Alternatives comparison

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

### Add a new prompt

All prompts live in [`data/prompts.json`](data/prompts.json). Use the **[Prompt Builder](https://kishormorol.github.io/promptlean/contribute.html)** on the contribute page to generate the correct JSON, then open a PR.

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

### Add a community variant

Have a specialized take on an existing prompt? Create `community/{prompt-id}.json`:

```json
[
  {
    "id": "your-variant-id",
    "label": "🔒 Your Variant Name",
    "author": "your-github-username",
    "description": "One sentence: what does this variant optimize for?",
    "prompt": "Your prompt text. Use [PLACEHOLDER] for user content.",
    "token_estimate": 95
  }
]
```

Community variants appear as extra tabs on the prompt detail page. See [`community/code-review.json`](community/code-review.json) for a working example.

Full contribution guidelines: [`contribute.html`](https://kishormorol.github.io/promptlean/contribute.html)

---

## Stack

- **Pure HTML + CSS + Vanilla JS** — no framework, no build step
- **Data-driven** — all prompts in `data/prompts.json`, community variants in `community/`
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
