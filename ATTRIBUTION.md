# Attribution

PromptLean is an original open-source project (MIT license). Some prompts in the library were adapted from other open-source prompt collections. Full attribution is provided below.

---

## awesome-chatgpt-prompts

**Repository:** https://github.com/f/awesome-chatgpt-prompts  
**Author:** Fatih Kadir Akın and contributors  
**License:** [CC0 1.0 Universal](https://github.com/f/awesome-chatgpt-prompts/blob/main/LICENSE) (prompt content is public domain)

The following PromptLean prompts were inspired by or adapted from `awesome-chatgpt-prompts`. Per the CC0 license, the original prompt content is dedicated to the public domain. Each prompt has been significantly rewritten and expanded into PromptLean's three-tier format (Lean / Balanced / Max Quality) with model notes and benchmarks added by the PromptLean team.

| PromptLean ID | Original Act |
|---|---|
| `fallacy-finder` | Act as a Fallacy Finder |
| `debate-both-sides` | Act as a Debater |
| `etymologist` | Act as an Etymologist |
| `statistician` | Act as a Statistician |
| `startup-idea-generator` | Act as a Startup Idea Generator |
| `financial-planner` | Act as an Accountant |
| `devrel-consultant` | Act as a Developer Relations consultant |
| `cybersecurity-advisor` | Act as a Cyber Security Specialist |
| `it-solution-architect` | Act as an IT Architect |
| `data-viz-advisor` | Act as a Scientific Data Visualizer |
| `ux-ui-reviewer` | Act as a UX/UI Developer |

---

## LLM-Prompt-Library

**Repository:** https://github.com/abilzerian/LLM-Prompt-Library  
**Author:** Alexander Bilzerian  
**License:** [MIT](https://github.com/abilzerian/LLM-Prompt-Library/blob/main/LICENSE) — © 2025 Alexander Bilzerian

The following PromptLean prompts were inspired by or adapted from `LLM-Prompt-Library`. Per the MIT license, the copyright notice above is included here as required. Each prompt has been significantly rewritten and expanded into PromptLean's three-tier format with model notes and benchmarks added by the PromptLean team.

| PromptLean ID | Original Prompt |
|---|---|
| `contract-reviewer` | Legal Contract Reviewer |
| `annual-report-analyst` | 10-K Annual Report Analyst |
| `ad-copy-generator` | Ad Copy Generator |
| `social-media-optimizer` | Social Media Post Optimizer |
| `excel-formula-specialist` | Excel Formula Specialist |
| `text-to-json` | Unstructured Text to JSON Converter |
| `venture-capital-analyst` | Venture Capital Investment Analyst |

---

## Community (GitHub Gist)

**Source:** https://gist.github.com/BigDog1400/bd81f31fe680cc83deb6dab4ad9e6c67  
**Author:** BigDog1400  
**License:** MIT (inferred from GitHub defaults)

| PromptLean ID | Original |
|---|---|
| `software-project-planner` | System Prompt for LLM Project Planning |

---

## Original PromptLean prompts

All other prompts in the library are original works by the PromptLean contributors, released under the [MIT License](LICENSE).

---

## How we adapt prompts

When adapting from other sources we:
1. Rewrite prompt text to fit PromptLean's tiered format (Lean / Balanced / Max Quality)
2. Add `[PLACEHOLDER]` variables for user-supplied content
3. Add model-specific notes and quality benchmarks for 8 frontier models
4. Add relevant tags and category classification
5. Store the original `source` metadata in `data/prompts.json` for full traceability

Each prompt in `data/prompts.json` that was sourced externally includes a `source` field with the repository name, author, URL, and license.

---

*If you are the author of a prompt included here and have concerns about attribution or use, please [open an issue](https://github.com/kishormorol/promptlean/issues).*
