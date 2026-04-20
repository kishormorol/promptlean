# PromptLean

<div align="center">

**Token-efficient prompts for developers. Three variants, every task.**

[![Live Site](https://img.shields.io/badge/Live_Site-promptlean-7c3aed?style=for-the-badge&logo=github)](https://kishormorol.github.io/promptlean/)
[![License](https://img.shields.io/badge/License-MIT-22c55e?style=for-the-badge)](LICENSE)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-3b82f6?style=for-the-badge)](contribute.html)

</div>

---

## What is PromptLean?

PromptLean is a curated library of prompts for common developer tasks — code review, research summarization, data cleaning, SQL optimization, and more.

Every prompt ships with **three variants**:

| Variant | Token range | When to use |
|---------|-------------|-------------|
| ⚡ **Lean** | ~20–40 tokens | Fast iteration, tight context, high-volume API calls |
| ⚖ **Balanced** | ~60–90 tokens | Structured output, consistent format across runs |
| ★ **Max Quality** | ~150–220 tokens | External deliverables, expert-grade tasks |

The Lean variant typically saves **80–87% of tokens** vs Max Quality, with surprisingly little quality loss for well-understood tasks.

---

## Browse prompts

→ **[kishormorol.github.io/promptlean](https://kishormorol.github.io/promptlean/)**

Categories: Code · Research · Data · Writing · AI/ML · Productivity · Engineering

---

## Contribute

All prompts live in [`data/prompts.json`](data/prompts.json). To add one:

1. Fork the repo
2. Add your prompt entry (see schema below)
3. Open a PR with example outputs

**Schema:**
```json
{
  "id": "your-prompt-id",
  "title": "Your Prompt Title",
  "category": "Code",
  "tags": ["tag1", "tag2"],
  "featured": false,
  "description": "One sentence describing the prompt.",
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

See [`contribute.html`](contribute.html) for full guidelines.

---

## Stack

Pure HTML + CSS + Vanilla JS. No build step. Deploys to GitHub Pages directly.

---

## License

MIT — use freely, contribute back.
