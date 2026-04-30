# PromptLean

<div align="center">

**A curated library of token-efficient prompts — for developers, creators, educators, and everyone.**<br>
Every prompt ships with Lean, Balanced, and Max Quality variants.

[![Live Site](https://img.shields.io/badge/Live%20Site-kishormorol.github.io%2Fpromptlean-7c3aed?style=for-the-badge&logo=github-pages&logoColor=white)](https://kishormorol.github.io/promptlean/)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-Welcome-3b82f6?style=for-the-badge&logo=github)](https://github.com/kishormorol/promptlean/blob/main/contribute.html)
[![Prompts](https://img.shields.io/badge/Prompts-100-f59e0b?style=for-the-badge)](https://kishormorol.github.io/promptlean/browse.html)
[![Categories](https://img.shields.io/badge/Categories-14-ec4899?style=for-the-badge)](https://kishormorol.github.io/promptlean/browse.html)

</div>

---

## What is PromptLean?

PromptLean is a curated, open-source library of 100 prompts across 14 categories — from code review and SQL optimization to creative writing, journaling, interview prep, and emotional support.

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

## What's New

**30 new prompts** added in the latest expansion (70 → 100):

| Category | New Prompts |
|----------|------------|
| Code | Git Commit Message Generator · Code Documentation Generator · Dependency Audit · Deep Code Explainer |
| Writing | Email Newsletter Writer · SEO Content Optimizer · Press Release Writer · FAQ Generator · Speech Writer |
| Engineering | REST API Endpoint Designer · Changelog Writer · Security Threat Model · Terraform / IaC Reviewer |
| Research | User Persona Creator · Competitive Analysis · A/B Test Designer · Research Hypothesis Generator |
| Productivity | OKR Writer · Sprint Retrospective Facilitator · Product Launch Plan · Meeting Agenda Builder |
| Education & Tutoring | Learning Roadmap Creator · Book Club Discussion Guide · Mental Model Explainer |
| AI / ML | Prompt Optimizer · System Prompt Debugger |
| Data | Data Storytelling · CSV Data Analyzer |
| Career & Professional Growth | Negotiation Coach |
| General Purpose | Travel Itinerary Planner |

→ **[Browse all new prompts](https://kishormorol.github.io/promptlean/browse.html)**

---

## Prompts

100 prompts across 14 categories:

| Category | Count | Prompts |
|----------|-------|---------|
| Code | 14 | Code Review · Explain Code to a Junior Dev · Write Unit Tests · Debug & Fix a Bug · Refactor Code · Write Code Documentation · Generate a Regular Expression · Translate Code to Another Language · Developer Relations Consultant · Cybersecurity Strategy Advisor · Git Commit Message Generator · Code Documentation Generator · Dependency Audit · Deep Code Explainer |
| Data | 10 | Optimize a SQL Query · Data Cleaning Plan · Exploratory Data Analysis Plan · Statistical Analysis Advisor · Annual Report Analyst (10-K) · Excel Formula Specialist · Unstructured Text to JSON · Data Visualization Advisor · Data Storytelling · CSV Data Analyzer |
| Writing | 11 | Write a Technical Blog Post · Write API Documentation · Write a Cold Email · Write an Executive Summary · Ad Copy Generator · Social Media Post Optimizer · Email Newsletter Writer · SEO Content Optimizer · Press Release Writer · FAQ Generator · Speech Writer |
| Productivity | 11 | Meeting Notes → Action Items · Weekly Planner & Prioritization · Draft a Professional Email Reply · Decision Framework · Startup Idea Generator · Personal Finance Advisor · Legal Contract Reviewer · OKR Writer · Sprint Retrospective Facilitator · Product Launch Plan · Meeting Agenda Builder |
| Engineering | 11 | System Design Review · Write a Product Requirements Document · Incident Postmortem · Architecture Decision Record (ADR) · IT Solution Architect · UX/UI Design Reviewer · Software Project Planner · REST API Endpoint Designer · Changelog Writer · Security Threat Model · Terraform / IaC Reviewer |
| Research | 8 | Summarize a Research Paper · Literature Review Synthesis · Debate Both Sides · Venture Capital Analyst · User Persona Creator · Competitive Analysis · A/B Test Designer · Research Hypothesis Generator |
| Education & Tutoring | 9 | Explain Any Concept · Socratic Tutoring Session · Generate Practice Questions · Lesson Plan Generator · Study Guide Creator · Word Etymology Explorer · Learning Roadmap Creator · Book Club Discussion Guide · Mental Model Explainer |
| Career & Professional Growth | 7 | Resume Review · Interview Preparation Coach · Write a Cover Letter · Write a LinkedIn Post · Salary Negotiation Script · Performance Review Self-Assessment · Negotiation Coach |
| General Purpose | 7 | Summarize Any Text · Brainstorm Ideas · Explain Like I'm 5 (ELI5) · Give Constructive Feedback · Fallacy Finder · Product Critique & Feedback · Travel Itinerary Planner |
| AI / ML | 4 | LLM Evaluation Rubric · Write a System Prompt · Prompt Optimizer · System Prompt Debugger |
| Well-being & Mental Health | 3 | Daily Reflection & Journaling Guide · Stress Relief & Reframing · Goal Setting & Action Plan |
| Entertainment & Creative | 3 | Short Story Generator · Poem Generator · Character Creator |
| Safety & Crisis Support | 1 | Compassionate Crisis Response |
| Supportive Conversation | 1 | Active Listening & Emotional Support |

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

## Attribution

Some prompts are adapted from open-source collections. All adaptations are significantly rewritten into PromptLean's three-tier format with model notes and benchmarks added. Source metadata is stored in `data/prompts.json` for full traceability.

| Source | License | Prompts adapted |
|--------|---------|----------------|
| [awesome-chatgpt-prompts](https://github.com/f/awesome-chatgpt-prompts) by Fatih Kadir Akın | CC0 1.0 (public domain) | 11 |
| [LLM-Prompt-Library](https://github.com/abilzerian/LLM-Prompt-Library) by Alexander Bilzerian | MIT © 2025 Alexander Bilzerian | 7 |
| [Community Gist](https://gist.github.com/BigDog1400/bd81f31fe680cc83deb6dab4ad9e6c67) by BigDog1400 | MIT | 1 |

Full attribution details: [`ATTRIBUTION.md`](ATTRIBUTION.md)

---

## License

MIT — use freely, contribute back.
