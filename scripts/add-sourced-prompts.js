// Run: node scripts/add-sourced-prompts.js
// Adds 20 prompts sourced from open-source collections (awesome-chatgpt-prompts, LLM-Prompt-Library)
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'prompts.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const MODELS = ['gpt-5.4','claude-sonnet-4-6','claude-opus-4-6','gemini-3.1-pro','grok-4','llama-4-scout','mistral-large-3','o1'];

const newPrompts = [

  // ── General Purpose ──────────────────────────────────────────────
  {
    id: "fallacy-finder",
    title: "Fallacy Finder",
    category: "General Purpose",
    tags: ["logic", "argumentation", "reasoning", "critical-thinking", "debate"],
    featured: false,
    description: "Identify logical fallacies, faulty reasoning, and invalid arguments in any statement or discourse.",
    model_notes: {
      "gpt-5.4": "Excellent at naming specific fallacies with citations. Lean works well for clear-cut arguments.",
      "claude-sonnet-4-6": "Strong at nuanced reasoning chains. Max quality adds valuable context for complex debates.",
      "claude-opus-4-6": "Best for philosophical or highly technical argumentation analysis.",
      "gemini-3.1-pro": "Balanced recommended for structured fallacy breakdowns.",
      "grok-4": "Good at spotting emotional manipulation and rhetoric. Lean is often enough.",
      "llama-4-scout": "Balanced recommended. May miss subtle fallacies with lean prompt.",
      "mistral-large-3": "Solid performance. Balanced gives consistent structured output.",
      "o1": "Lean is sufficient — reasoning model excels at logical analysis by default."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-sonnet-4-6": { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-opus-4-6":   { lean: 4, balanced: 5, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 4, max_quality: 5, best: "balanced" },
      "grok-4":            { lean: 4, balanced: 4, max_quality: 5, best: "lean" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 5, balanced: 5, max_quality: 5, best: "lean" }
    },
    variants: {
      lean: {
        prompt: "Identify any logical fallacies or faulty reasoning in the following argument. Be specific.\n\nArgument: [ARGUMENT]",
        token_estimate: 22
      },
      balanced: {
        prompt: "Analyze the following argument for logical fallacies and reasoning errors.\n\nFor each issue found:\n- Name the fallacy\n- Quote the specific phrase\n- Explain why it's flawed\n\nArgument: [ARGUMENT]",
        token_estimate: 48
      },
      max_quality: {
        prompt: "You are a critical thinking expert and formal logic instructor.\n\nAnalyze the argument below for logical fallacies, faulty reasoning, false assumptions, and invalid conclusions. For each issue:\n1. Name the fallacy (with its formal name if applicable)\n2. Quote the exact passage containing the error\n3. Explain clearly why the reasoning is flawed\n4. Suggest how the argument could be made more logically sound\n\nAlso note any valid points the argument makes. Be precise and evidence-based.\n\nArgument: [ARGUMENT]",
        token_estimate: 110
      }
    }
  },

  // ── Research ──────────────────────────────────────────────────────
  {
    id: "debate-both-sides",
    title: "Debate Both Sides",
    category: "Research",
    tags: ["debate", "argumentation", "critical-thinking", "persuasion", "research"],
    featured: false,
    description: "Research and present compelling arguments for both sides of any topic or debate question.",
    model_notes: {
      "gpt-5.4": "Excellent at balanced, well-sourced arguments. Balanced variant is the sweet spot.",
      "claude-sonnet-4-6": "Strong at nuance and avoiding false equivalence. Max quality adds steelman quality.",
      "claude-opus-4-6": "Best for highly complex political or ethical debates requiring deep research.",
      "gemini-3.1-pro": "Good with current events due to knowledge recency. Balanced recommended.",
      "grok-4": "Can be provocative but thorough. Lean works well for familiar topics.",
      "llama-4-scout": "Balanced recommended. May lean one-sided with minimal prompting.",
      "mistral-large-3": "Solid structured output. Balanced is reliable.",
      "o1": "Lean is sufficient — produces excellent steelman arguments naturally."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-sonnet-4-6": { lean: 4, balanced: 5, max_quality: 5, best: "max_quality" },
      "claude-opus-4-6":   { lean: 4, balanced: 5, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 4, max_quality: 5, best: "balanced" },
      "grok-4":            { lean: 4, balanced: 4, max_quality: 5, best: "lean" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 5, balanced: 5, max_quality: 5, best: "lean" }
    },
    variants: {
      lean: {
        prompt: "Present the strongest arguments for both sides of this debate topic: [TOPIC]",
        token_estimate: 16
      },
      balanced: {
        prompt: "Debate topic: [TOPIC]\n\nProvide:\n**For:** 3 strongest arguments with supporting evidence\n**Against:** 3 strongest counter-arguments with supporting evidence\n**Conclusion:** Which side has stronger logical support and why",
        token_estimate: 52
      },
      max_quality: {
        prompt: "You are an expert debate coach and research analyst.\n\nTopic: [TOPIC]\n\nResearch and present a balanced analysis:\n\n**Arguments FOR:**\n- Present the 3–4 strongest arguments with evidence, statistics, or expert consensus\n- Include the best-case scenario if this position prevails\n\n**Arguments AGAINST:**\n- Present the 3–4 strongest counter-arguments with equal rigor\n- Include risks and unintended consequences\n\n**Refutations:** For each side, address the other's strongest point\n\n**Synthesis:** Identify where both sides agree, and what evidence would change minds\n\nBe intellectually honest. Steelman both positions.",
        token_estimate: 140
      }
    }
  },

  // ── Education & Tutoring ───────────────────────────────────────────
  {
    id: "etymologist",
    title: "Word Etymology Explorer",
    category: "Education & Tutoring",
    tags: ["language", "etymology", "linguistics", "history", "vocabulary"],
    featured: false,
    description: "Trace the origin and historical evolution of any word, from ancient roots to modern usage.",
    model_notes: {
      "gpt-5.4": "Accurate and detailed. Balanced is ideal for most vocabulary explorations.",
      "claude-sonnet-4-6": "Excellent at drawing linguistic connections. Lean works for common words.",
      "claude-opus-4-6": "Max quality adds scholarly depth for academic or writing purposes.",
      "gemini-3.1-pro": "Good breadth across languages. Balanced recommended.",
      "grok-4": "Solid performance. Lean works for well-known words.",
      "llama-4-scout": "Balanced recommended to ensure completeness.",
      "mistral-large-3": "Good with European language roots. Balanced is reliable.",
      "o1": "Lean is sufficient for most etymology lookups."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-sonnet-4-6": { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-opus-4-6":   { lean: 4, balanced: 5, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 4, max_quality: 5, best: "balanced" },
      "grok-4":            { lean: 4, balanced: 4, max_quality: 4, best: "lean" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 4, balanced: 5, max_quality: 5, best: "lean" }
    },
    variants: {
      lean: {
        prompt: "Trace the etymology of the word \"[WORD]\" from its ancient roots to modern usage.",
        token_estimate: 18
      },
      balanced: {
        prompt: "Explore the etymology of the word \"[WORD]\":\n- Language of origin and root meaning\n- Historical evolution through major periods\n- How the meaning shifted over time\n- Related words from the same root",
        token_estimate: 50
      },
      max_quality: {
        prompt: "You are a professional etymologist and historical linguist.\n\nResearch the complete etymology of the word \"[WORD]\":\n\n1. **Origin** — Language of origin, root form, and literal meaning\n2. **Ancient usage** — Earliest known attestation and context\n3. **Evolution** — How the word entered and changed in each language it passed through (include dates where known)\n4. **Semantic shift** — How and why the meaning changed over time\n5. **Related words** — Cognates, derivatives, and words from the same root in other languages\n6. **Modern usage** — Current meaning(s), including any specialized senses\n\nInclude specific dates, source languages, and linguistic periods where possible.",
        token_estimate: 130
      }
    }
  },

  // ── Data ───────────────────────────────────────────────────────────
  {
    id: "statistician",
    title: "Statistical Analysis Advisor",
    category: "Data",
    tags: ["statistics", "data", "hypothesis-testing", "probability", "analysis"],
    featured: false,
    description: "Get expert guidance on statistical methods, hypothesis testing, distributions, and data analysis approaches.",
    model_notes: {
      "gpt-5.4": "Strong at recommending appropriate tests. Balanced is the sweet spot.",
      "claude-sonnet-4-6": "Excellent at explaining complex concepts clearly. Max quality for research-grade analysis.",
      "claude-opus-4-6": "Best for advanced statistical theory and non-standard methods.",
      "gemini-3.1-pro": "Good for standard statistical workflows. Balanced recommended.",
      "grok-4": "Solid statistical reasoning. Lean works for common tests.",
      "llama-4-scout": "Balanced recommended for complete guidance.",
      "mistral-large-3": "Good at structured statistical workflows. Balanced is reliable.",
      "o1": "Excellent reasoning for complex statistical problems. Lean is sufficient."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-sonnet-4-6": { lean: 4, balanced: 5, max_quality: 5, best: "max_quality" },
      "claude-opus-4-6":   { lean: 4, balanced: 5, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 4, max_quality: 5, best: "balanced" },
      "grok-4":            { lean: 4, balanced: 5, max_quality: 5, best: "lean" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 5, balanced: 5, max_quality: 5, best: "lean" }
    },
    variants: {
      lean: {
        prompt: "As a statistician, advise on the best approach for this analysis: [DESCRIBE YOUR DATA OR QUESTION]",
        token_estimate: 20
      },
      balanced: {
        prompt: "Statistical question: [DESCRIBE YOUR DATA OR QUESTION]\n\nProvide:\n- Recommended statistical test/method and why\n- Key assumptions to verify\n- How to interpret the results\n- Common pitfalls to avoid",
        token_estimate: 55
      },
      max_quality: {
        prompt: "You are an expert statistician with deep knowledge of inferential statistics, experimental design, and data analysis.\n\nQuestion/Dataset: [DESCRIBE YOUR DATA OR QUESTION]\n\nProvide a comprehensive statistical guidance report:\n1. **Problem framing** — Clarify the statistical question and objective\n2. **Recommended method** — Specify the test/model and justify the choice\n3. **Assumptions check** — List assumptions and how to verify them\n4. **Effect size & power** — What sample size is needed? What effect size matters?\n5. **Interpretation guide** — How to read and report results (p-values, CIs, effect sizes)\n6. **Alternative approaches** — If the primary method's assumptions fail, what to use instead\n7. **Visualization** — Recommended chart types for this analysis\n\nUse plain language alongside technical terms.",
        token_estimate: 145
      }
    }
  },

  // ── Productivity ───────────────────────────────────────────────────
  {
    id: "startup-idea-generator",
    title: "Startup Idea Generator",
    category: "Productivity",
    tags: ["startup", "business", "ideation", "entrepreneurship", "strategy"],
    featured: false,
    description: "Generate detailed digital startup ideas from a problem or wish, with business model, market, and validation steps.",
    model_notes: {
      "gpt-5.4": "Excellent at creative yet realistic ideas. Max quality adds meaningful business depth.",
      "claude-sonnet-4-6": "Strong at identifying genuine user pain points. Balanced is the sweet spot.",
      "claude-opus-4-6": "Best for deep market analysis and nuanced business models.",
      "gemini-3.1-pro": "Good breadth of ideas. Balanced recommended.",
      "grok-4": "Creative and contrarian ideas. Lean surprisingly useful for initial brainstorming.",
      "llama-4-scout": "Balanced recommended for complete output.",
      "mistral-large-3": "Solid structured output. Balanced reliable.",
      "o1": "Lean is sufficient — produces well-reasoned startup concepts."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 4, balanced: 5, max_quality: 5, best: "max_quality" },
      "claude-sonnet-4-6": { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-opus-4-6":   { lean: 3, balanced: 4, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 4, max_quality: 5, best: "balanced" },
      "grok-4":            { lean: 4, balanced: 5, max_quality: 5, best: "lean" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 4, balanced: 5, max_quality: 5, best: "lean" }
    },
    variants: {
      lean: {
        prompt: "Generate 3 startup ideas for this problem: [PROBLEM OR WISH]. Include target users and revenue model.",
        token_estimate: 22
      },
      balanced: {
        prompt: "Generate 3 digital startup ideas for: [PROBLEM OR WISH]\n\nFor each idea:\n- Name and one-liner\n- Target user and pain point solved\n- Revenue model\n- Biggest risk\n- First validation step",
        token_estimate: 55
      },
      max_quality: {
        prompt: "You are a startup strategist and venture capital analyst.\n\nGenerate 3 digital startup ideas based on this problem or wish: [PROBLEM OR WISH]\n\nFor each idea, provide a full business canvas:\n- **Idea name & tagline**\n- **Target user persona** — who exactly, and their specific pain\n- **Value proposition** — what uniquely solves the problem\n- **Revenue streams** — primary and secondary monetization\n- **Cost structure** — key cost drivers\n- **Go-to-market channels** — first 3 acquisition channels\n- **Key risks** — top 2 business and technical risks\n- **Validation steps** — 3 concrete experiments to test demand before building\n- **First-year cost estimate** — rough ballpark\n\nFormat as a structured table or canvas for each idea.",
        token_estimate: 155
      }
    }
  },

  // ── Productivity ───────────────────────────────────────────────────
  {
    id: "financial-planner",
    title: "Personal Finance Advisor",
    category: "Productivity",
    tags: ["finance", "budgeting", "investment", "tax", "financial-planning"],
    featured: false,
    description: "Get creative, actionable strategies for budgeting, investing, and managing personal or business finances.",
    model_notes: {
      "gpt-5.4": "Excellent at personalized, scenario-specific advice. Max quality for complex situations.",
      "claude-sonnet-4-6": "Strong at explaining trade-offs clearly. Balanced is the sweet spot.",
      "claude-opus-4-6": "Best for multi-scenario modeling and nuanced tax strategy.",
      "gemini-3.1-pro": "Good breadth of financial knowledge. Balanced recommended.",
      "grok-4": "Practical and direct advice. Lean often sufficient for simple questions.",
      "llama-4-scout": "Balanced recommended. Add disclaimer prompts for regulatory accuracy.",
      "mistral-large-3": "Solid structured advice. Balanced is reliable.",
      "o1": "Excellent for complex financial reasoning. Lean sufficient for most queries."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 4, balanced: 5, max_quality: 5, best: "max_quality" },
      "claude-sonnet-4-6": { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-opus-4-6":   { lean: 3, balanced: 5, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 4, max_quality: 5, best: "balanced" },
      "grok-4":            { lean: 4, balanced: 4, max_quality: 5, best: "lean" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 4, balanced: 5, max_quality: 5, best: "lean" }
    },
    variants: {
      lean: {
        prompt: "Give me actionable personal finance advice for my situation: [DESCRIBE YOUR FINANCIAL SITUATION AND GOALS]",
        token_estimate: 20
      },
      balanced: {
        prompt: "Financial situation: [DESCRIBE YOUR FINANCIAL SITUATION AND GOALS]\n\nProvide:\n- Top 3 prioritized actions\n- Budgeting approach recommendation\n- Investment strategy given risk tolerance\n- Any key tax considerations\n- One thing to avoid",
        token_estimate: 58
      },
      max_quality: {
        prompt: "You are a certified financial planner (CFP) and tax advisor.\n\nSituation: [DESCRIBE YOUR FINANCIAL SITUATION AND GOALS]\n\nProvide a comprehensive financial strategy:\n1. **Cash flow analysis** — income vs. expenses, savings rate assessment\n2. **Emergency fund** — target amount and build-up plan\n3. **Debt strategy** — prioritization framework (avalanche vs. snowball)\n4. **Investment plan** — asset allocation, account types (401k, IRA, taxable), risk-appropriate vehicles\n5. **Tax optimization** — strategies to reduce taxable income or maximize deductions\n6. **Insurance gaps** — coverage areas to review\n7. **90-day action plan** — concrete next steps in priority order\n\nNote: This is educational information, not personalized financial advice. Consult a licensed professional for your specific situation.",
        token_estimate: 155
      }
    }
  },

  // ── Productivity (Legal) ───────────────────────────────────────────
  {
    id: "contract-reviewer",
    title: "Legal Contract Reviewer",
    category: "Productivity",
    tags: ["legal", "contracts", "compliance", "risk", "business"],
    featured: false,
    description: "Review and summarize contracts, extracting key obligations, risks, and red flags in plain language.",
    model_notes: {
      "gpt-5.4": "Excellent at identifying risk clauses. Max quality for high-stakes contracts.",
      "claude-sonnet-4-6": "Strong at plain-language summaries. Balanced is the sweet spot.",
      "claude-opus-4-6": "Best for complex multi-party agreements and specialized legal language.",
      "gemini-3.1-pro": "Good with long contracts via large context. Balanced recommended.",
      "grok-4": "Pragmatic red-flag spotting. Lean works for shorter agreements.",
      "llama-4-scout": "Balanced recommended. Legal accuracy varies — always verify.",
      "mistral-large-3": "Solid structured output. Balanced is reliable for European contracts.",
      "o1": "Excellent reasoning for ambiguous clauses. Lean often sufficient."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 4, balanced: 5, max_quality: 5, best: "max_quality" },
      "claude-sonnet-4-6": { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-opus-4-6":   { lean: 3, balanced: 5, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 4, max_quality: 5, best: "balanced" },
      "grok-4":            { lean: 4, balanced: 4, max_quality: 5, best: "lean" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 4, balanced: 5, max_quality: 5, best: "lean" }
    },
    variants: {
      lean: {
        prompt: "Summarize this contract in plain language. Flag any unusual or risky clauses.\n\nContract: [CONTRACT TEXT]",
        token_estimate: 22
      },
      balanced: {
        prompt: "Review this contract and provide:\n- Parties and key terms (plain language)\n- Key obligations for each party\n- Termination conditions and deadlines\n- Red flags or unusual clauses\n- Disclaimer: this is not legal advice\n\nContract: [CONTRACT TEXT]",
        token_estimate: 62
      },
      max_quality: {
        prompt: "You are a contract summarization assistant with knowledge of common commercial terms.\n\nReview the contract below and provide a structured analysis:\n1. **Overview** — parties involved, contract purpose, and term/duration\n2. **Key obligations** — what each party must do, with deadlines\n3. **Rights and protections** — what each party is entitled to\n4. **Termination triggers** — conditions that end the contract early\n5. **Critical deadlines** — all dates and notice periods\n6. **Risk flags** — ambiguous language, unusual indemnities, one-sided penalty clauses, liability caps, or missing standard protections\n7. **Missing provisions** — standard clauses that are absent\n\nClose with: *This summary is for informational purposes only and does not constitute legal advice. Consult a licensed attorney before signing.*\n\nContract: [CONTRACT TEXT]",
        token_estimate: 155
      }
    }
  },

  // ── Data ───────────────────────────────────────────────────────────
  {
    id: "annual-report-analyst",
    title: "Annual Report Analyst (10-K)",
    category: "Data",
    tags: ["finance", "SEC", "annual-report", "investing", "business-analysis"],
    featured: false,
    description: "Analyze SEC 10-K annual reports and produce a concise business memo with financial highlights, risks, and outlook.",
    model_notes: {
      "gpt-5.4": "Excellent at financial analysis and business prose. Max quality for investor memos.",
      "claude-sonnet-4-6": "Strong at structured financial summaries. Balanced is the sweet spot.",
      "claude-opus-4-6": "Best for comprehensive investment thesis development.",
      "gemini-3.1-pro": "Large context handles full 10-K filings well. Balanced recommended.",
      "grok-4": "Good at financial metrics extraction. Balanced recommended.",
      "llama-4-scout": "Balanced recommended. Verify all numbers independently.",
      "mistral-large-3": "Solid structured output. Balanced is reliable.",
      "o1": "Excellent at synthesizing complex financial narratives. Lean sufficient for summaries."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 4, balanced: 5, max_quality: 5, best: "max_quality" },
      "claude-sonnet-4-6": { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-opus-4-6":   { lean: 3, balanced: 5, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 4, max_quality: 5, best: "balanced" },
      "grok-4":            { lean: 3, balanced: 4, max_quality: 5, best: "balanced" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 4, balanced: 5, max_quality: 5, best: "lean" }
    },
    variants: {
      lean: {
        prompt: "Summarize this 10-K report. Highlight financial performance, key risks, and outlook.\n\nReport: [10-K TEXT OR SECTION]",
        token_estimate: 24
      },
      balanced: {
        prompt: "Analyze this 10-K filing and produce a team memo covering:\n- Financial performance (revenue, margins, YoY growth)\n- Business highlights\n- Key operational metrics\n- Top 3 risks\n- Outlook for next quarter\n\nFiling: [10-K TEXT OR SECTION]",
        token_estimate: 65
      },
      max_quality: {
        prompt: "You are a senior financial analyst. Analyze the following SEC 10-K annual report and produce a concise executive memo suitable for sharing with a leadership team.\n\nStructure your memo as:\n1. **Financial Performance** — revenue, gross margin, net income, YoY comparisons, EPS\n2. **Business Highlights** — major strategic wins, product launches, M&A activity\n3. **Operational Metrics** — segment performance, unit economics, headcount trends\n4. **Risk Factors** — top 3 operating and revenue risks expected in the coming quarter\n5. **Outlook** — management guidance, analyst consensus, qualitative assessment\n6. **Summary** — one paragraph with your analytical take\n\nBe precise with numbers. Note any red flags in management commentary.\n\n10-K filing: [10-K TEXT OR SECTION]",
        token_estimate: 155
      }
    }
  },

  // ── Writing ────────────────────────────────────────────────────────
  {
    id: "ad-copy-generator",
    title: "Ad Copy Generator",
    category: "Writing",
    tags: ["marketing", "advertising", "copywriting", "conversion", "brand"],
    featured: false,
    description: "Write persuasive advertising copy with a compelling headline, body, and call to action for any product or service.",
    model_notes: {
      "gpt-5.4": "Excellent at high-converting copy. Max quality for paid campaigns.",
      "claude-sonnet-4-6": "Strong at brand voice matching. Balanced is the sweet spot.",
      "claude-opus-4-6": "Best for brand narratives and premium positioning copy.",
      "gemini-3.1-pro": "Good creative variety. Balanced recommended.",
      "grok-4": "Punchy and direct copy. Lean works well for short-form ads.",
      "llama-4-scout": "Balanced recommended for complete ad structure.",
      "mistral-large-3": "Solid output. Balanced is reliable.",
      "o1": "Lean is sufficient for well-defined products."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 4, balanced: 5, max_quality: 5, best: "max_quality" },
      "claude-sonnet-4-6": { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-opus-4-6":   { lean: 3, balanced: 5, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 4, max_quality: 5, best: "balanced" },
      "grok-4":            { lean: 4, balanced: 5, max_quality: 5, best: "lean" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 4, balanced: 5, max_quality: 5, best: "lean" }
    },
    variants: {
      lean: {
        prompt: "Write ad copy (headline + body + CTA) for: [PRODUCT OR SERVICE DESCRIPTION]",
        token_estimate: 18
      },
      balanced: {
        prompt: "Write advertising copy for: [PRODUCT OR SERVICE DESCRIPTION]\nTarget audience: [AUDIENCE]\nTone: [TONE]\n\nInclude:\n- Headline (one impactful line on the primary benefit)\n- Body (2–3 sentences building value and trust)\n- CTA (clear, conversion-focused)",
        token_estimate: 62
      },
      max_quality: {
        prompt: "You are a direct-response copywriter with 15 years of experience writing high-converting ad copy.\n\nProduct/service: [PRODUCT OR SERVICE DESCRIPTION]\nTarget audience: [AUDIENCE]\nKey USPs: [KEY BENEFITS]\nTone: [TONE — e.g., professional, urgent, playful]\nPlatform: [PLATFORM — e.g., Google, Facebook, email]\n\nWrite 3 variations of ad copy, each containing:\n1. **Headline** — one line, benefit-first, under 10 words\n2. **Body** — 2–3 sentences addressing the audience's pain point, building desire, and establishing credibility\n3. **CTA** — action-oriented, specific; include urgency or discount if applicable\n\nAfter each variation, note the psychological trigger used (scarcity, social proof, curiosity, etc.).",
        token_estimate: 155
      }
    }
  },

  // ── Writing ────────────────────────────────────────────────────────
  {
    id: "social-media-optimizer",
    title: "Social Media Post Optimizer",
    category: "Writing",
    tags: ["social-media", "engagement", "copywriting", "marketing", "content"],
    featured: false,
    description: "Rewrite and optimize social media posts for maximum engagement on any platform.",
    model_notes: {
      "gpt-5.4": "Excellent at platform-specific voice optimization. Balanced is the sweet spot.",
      "claude-sonnet-4-6": "Strong at tone matching and hashtag strategy. Lean works for quick rewrites.",
      "claude-opus-4-6": "Best for brand voice consistency across a content calendar.",
      "gemini-3.1-pro": "Good at engagement pattern analysis. Balanced recommended.",
      "grok-4": "Great for Twitter/X style posts. Lean often works well.",
      "llama-4-scout": "Balanced recommended for complete optimization.",
      "mistral-large-3": "Solid output. Balanced is reliable.",
      "o1": "Lean sufficient for straightforward rewrites."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-sonnet-4-6": { lean: 4, balanced: 5, max_quality: 5, best: "lean" },
      "claude-opus-4-6":   { lean: 3, balanced: 5, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 4, max_quality: 5, best: "balanced" },
      "grok-4":            { lean: 4, balanced: 5, max_quality: 5, best: "lean" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 4, balanced: 5, max_quality: 5, best: "lean" }
    },
    variants: {
      lean: {
        prompt: "Rewrite this [PLATFORM] post for maximum engagement:\n\n[ORIGINAL POST]",
        token_estimate: 16
      },
      balanced: {
        prompt: "Platform: [PLATFORM]\nAudience: [TARGET AUDIENCE]\nOriginal post: [ORIGINAL POST]\n\nRewrite the post to be more engaging. Then suggest:\n- 3–5 relevant hashtags\n- One emoji to add\n- Why these changes improve reach",
        token_estimate: 58
      },
      max_quality: {
        prompt: "You are a social media strategist specializing in organic engagement growth.\n\nPlatform: [PLATFORM]\nTarget audience: [TARGET AUDIENCE]\nBrand voice: [TONE — e.g., professional, witty, inspirational]\nOriginal post:\n\"\"\"[ORIGINAL POST]\"\"\"\n\nProvide:\n1. **Rewritten post** — optimized for the platform's algorithm and audience expectations\n2. **Hook analysis** — what makes the opening line compelling\n3. **Hashtag strategy** — 5–8 hashtags with rationale (mix of broad and niche)\n4. **Engagement triggers** — emojis, questions, or formatting choices and why they work\n5. **Alt version** — a shorter version under the platform character limit\n6. **Best time to post** — based on the platform and audience",
        token_estimate: 145
      }
    }
  },

  // ── Data ───────────────────────────────────────────────────────────
  {
    id: "excel-formula-specialist",
    title: "Excel Formula Specialist",
    category: "Data",
    tags: ["excel", "spreadsheet", "formulas", "data", "productivity"],
    featured: false,
    description: "Get precise Excel (or Google Sheets) formulas for any calculation or data manipulation, with step-by-step explanations.",
    model_notes: {
      "gpt-5.4": "Highly accurate formula generation. Lean works for common functions.",
      "claude-sonnet-4-6": "Excellent at complex nested formulas and clear explanations. Balanced is the sweet spot.",
      "claude-opus-4-6": "Best for advanced array formulas and Power Query transformations.",
      "gemini-3.1-pro": "Good at Google Sheets equivalents. Balanced recommended.",
      "grok-4": "Solid formula generation. Lean works for straightforward requests.",
      "llama-4-scout": "Balanced recommended for step-by-step clarity.",
      "mistral-large-3": "Solid structured formulas. Balanced is reliable.",
      "o1": "Excellent reasoning for complex formula logic. Lean often sufficient."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 5, balanced: 5, max_quality: 5, best: "lean" },
      "claude-sonnet-4-6": { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-opus-4-6":   { lean: 4, balanced: 5, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 4, max_quality: 5, best: "balanced" },
      "grok-4":            { lean: 4, balanced: 5, max_quality: 5, best: "lean" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 5, balanced: 5, max_quality: 5, best: "lean" }
    },
    variants: {
      lean: {
        prompt: "Write an Excel formula for: [DESCRIBE WHAT YOU WANT THE FORMULA TO DO, INCLUDING CELL REFERENCES]",
        token_estimate: 18
      },
      balanced: {
        prompt: "Excel task: [DESCRIBE WHAT YOU WANT THE FORMULA TO DO, INCLUDING CELL REFERENCES]\n\nProvide:\n- The formula (ready to paste)\n- A plain-English breakdown of each component\n- Any caveats or edge cases to watch for",
        token_estimate: 55
      },
      max_quality: {
        prompt: "You are an Excel and Google Sheets formula specialist.\n\nTask: [DESCRIBE WHAT YOU WANT THE FORMULA TO DO, INCLUDING CELL REFERENCES]\nSpreadsheet context: [DESCRIBE YOUR DATA LAYOUT, COLUMN NAMES, SHEET NAMES IF RELEVANT]\n\nProvide:\n1. **Formula** — the complete, ready-to-paste formula\n2. **Component breakdown** — explain each function and argument\n3. **How it works** — step-by-step walkthrough of the logic\n4. **Edge cases** — what happens with blanks, errors, or unexpected input\n5. **Alternative approaches** — simpler formula if a shorter version exists; Power Query or PivotTable alternative if applicable\n6. **Google Sheets equivalent** — if different\n\nFormat the formula in a code block.",
        token_estimate: 140
      }
    }
  },

  // ── Data ───────────────────────────────────────────────────────────
  {
    id: "text-to-json",
    title: "Unstructured Text to JSON",
    category: "Data",
    tags: ["json", "data-extraction", "parsing", "structured-data", "automation"],
    featured: false,
    description: "Convert unstructured text into clean, valid JSON by identifying and extracting entities and attributes.",
    model_notes: {
      "gpt-5.4": "Excellent at inferring schema. Lean works for simple text.",
      "claude-sonnet-4-6": "Strong at consistent field naming and null handling. Lean is often sufficient.",
      "claude-opus-4-6": "Best for complex nested structures and ambiguous text.",
      "gemini-3.1-pro": "Good at large document extraction. Balanced recommended.",
      "grok-4": "Reliable JSON output. Lean works well.",
      "llama-4-scout": "Balanced recommended to ensure valid JSON output.",
      "mistral-large-3": "Solid structured output. Balanced is reliable.",
      "o1": "Lean is sufficient — reasoning ensures accurate schema inference."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 5, balanced: 5, max_quality: 5, best: "lean" },
      "claude-sonnet-4-6": { lean: 5, balanced: 5, max_quality: 5, best: "lean" },
      "claude-opus-4-6":   { lean: 4, balanced: 5, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 4, max_quality: 5, best: "balanced" },
      "grok-4":            { lean: 4, balanced: 5, max_quality: 5, best: "lean" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 5, balanced: 5, max_quality: 5, best: "lean" }
    },
    variants: {
      lean: {
        prompt: "Convert this text to valid JSON. Infer field names from context. Use null for missing values.\n\nText: [TEXT]",
        token_estimate: 22
      },
      balanced: {
        prompt: "Extract structured data from the text below and output as valid JSON.\n\nExpected fields: [FIELDS OR \"infer from context\"]\n\nRules:\n- Use camelCase field names\n- Use null for missing values\n- Output only the JSON, no explanation\n\nText: [TEXT]",
        token_estimate: 58
      },
      max_quality: {
        prompt: "You are a data extraction specialist. Convert the unstructured text below into a well-formed JSON object.\n\nExpected fields: [FIELDS, OR \"infer from context\"]\n\nInstructions:\n1. Identify all entities and attributes mentioned in the text\n2. Map them to the expected fields where possible; add additional fields for data not covered\n3. Use consistent camelCase naming conventions\n4. Use `null` for any fields where information is absent — do not omit fields\n5. For arrays (lists of items), use JSON arrays\n6. For dates, use ISO 8601 format (YYYY-MM-DD) where possible\n7. Output only valid, minified JSON (no markdown fences, no explanation)\n\nText:\n\"\"\"[TEXT]\"\"\"\n\nAfter the JSON, add a brief **Extraction notes** section explaining any ambiguities or assumptions made.",
        token_estimate: 150
      }
    }
  },

  // ── Code ───────────────────────────────────────────────────────────
  {
    id: "devrel-consultant",
    title: "Developer Relations Consultant",
    category: "Code",
    tags: ["devrel", "developer-experience", "open-source", "documentation", "community"],
    featured: false,
    description: "Analyze a software library or SDK's developer experience, community health, and documentation quality with actionable recommendations.",
    model_notes: {
      "gpt-5.4": "Excellent at DX benchmarking and competitive analysis. Max quality recommended.",
      "claude-sonnet-4-6": "Strong at documentation gap analysis. Balanced is the sweet spot.",
      "claude-opus-4-6": "Best for comprehensive DevRel strategy development.",
      "gemini-3.1-pro": "Good at community metrics analysis. Balanced recommended.",
      "grok-4": "Practical DX feedback. Balanced recommended.",
      "llama-4-scout": "Balanced recommended for complete analysis.",
      "mistral-large-3": "Solid structured output. Balanced is reliable.",
      "o1": "Lean sufficient for well-known libraries."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 3, balanced: 5, max_quality: 5, best: "max_quality" },
      "claude-sonnet-4-6": { lean: 3, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-opus-4-6":   { lean: 3, balanced: 4, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 4, max_quality: 5, best: "balanced" },
      "grok-4":            { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "llama-4-scout":     { lean: 2, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 4, balanced: 5, max_quality: 5, best: "lean" }
    },
    variants: {
      lean: {
        prompt: "Evaluate the developer experience of [PACKAGE NAME]. Identify documentation gaps and key improvements needed.",
        token_estimate: 20
      },
      balanced: {
        prompt: "Evaluate the developer experience of [PACKAGE NAME] ([DOCS URL]):\n\n- Documentation quality and completeness\n- Community health (GitHub stars, issues, StackOverflow activity)\n- Competitor comparison\n- Top 3 improvements with highest impact\n- Download trend assessment",
        token_estimate: 65
      },
      max_quality: {
        prompt: "You are a Developer Relations (DevRel) consultant specializing in open-source ecosystem growth.\n\nPackage/library: [PACKAGE NAME]\nDocumentation: [DOCS URL]\n\nProvide a comprehensive DevRel audit:\n1. **Community health metrics** — GitHub stars/forks, issue resolution rate, PR velocity, StackOverflow activity, download trends\n2. **Documentation audit** — completeness, clarity, quickstart quality, example coverage, missing scenarios\n3. **Developer journey** — evaluate time-to-first-working-example (TTFWE) and identify friction points\n4. **Competitor benchmarking** — compare to 2–3 alternatives on DX, docs, and community\n5. **Content gaps** — specific tutorials, guides, or reference docs that should be added\n6. **Prioritized recommendations** — top 5 improvements ranked by impact vs. effort\n7. **Community growth levers** — conferences, integrations, ambassador programs, or content strategies\n\nBe specific. Reference actual documentation sections or GitHub data where possible.",
        token_estimate: 165
      }
    }
  },

  // ── Code ───────────────────────────────────────────────────────────
  {
    id: "cybersecurity-advisor",
    title: "Cybersecurity Strategy Advisor",
    category: "Code",
    tags: ["security", "cybersecurity", "risk", "compliance", "infrastructure"],
    featured: false,
    description: "Get expert cybersecurity strategies to protect data, harden infrastructure, and achieve compliance for your specific environment.",
    model_notes: {
      "gpt-5.4": "Excellent at threat modeling and control recommendations. Max quality for compliance work.",
      "claude-sonnet-4-6": "Strong at practical, risk-prioritized advice. Balanced is the sweet spot.",
      "claude-opus-4-6": "Best for comprehensive security architecture review.",
      "gemini-3.1-pro": "Good at industry-standard framework mapping. Balanced recommended.",
      "grok-4": "Practical security guidance. Balanced recommended.",
      "llama-4-scout": "Balanced recommended. Verify compliance claims with official standards.",
      "mistral-large-3": "Solid structured output. Balanced is reliable.",
      "o1": "Excellent reasoning for complex threat scenarios. Lean often sufficient."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 4, balanced: 5, max_quality: 5, best: "max_quality" },
      "claude-sonnet-4-6": { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-opus-4-6":   { lean: 3, balanced: 5, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 4, max_quality: 5, best: "balanced" },
      "grok-4":            { lean: 3, balanced: 4, max_quality: 5, best: "balanced" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 4, balanced: 5, max_quality: 5, best: "lean" }
    },
    variants: {
      lean: {
        prompt: "Advise on cybersecurity strategies for this environment: [DESCRIBE YOUR STACK AND SECURITY CONCERNS]",
        token_estimate: 18
      },
      balanced: {
        prompt: "Environment: [DESCRIBE YOUR STACK, DATA SENSITIVITY, AND CONCERNS]\n\nProvide cybersecurity recommendations covering:\n- Data protection and encryption\n- Access control and authentication\n- Network and perimeter security\n- Monitoring and incident detection\n- Relevant compliance requirements",
        token_estimate: 65
      },
      max_quality: {
        prompt: "You are a senior cybersecurity architect and compliance specialist.\n\nEnvironment: [DESCRIBE YOUR STACK, DATA TYPES, TEAM SIZE, AND SPECIFIC CONCERNS]\n\nProvide a prioritized cybersecurity strategy:\n1. **Threat model** — identify the most likely attack vectors for this environment\n2. **Data protection** — encryption at rest and in transit, key management\n3. **Identity & access** — authentication methods, RBAC, least-privilege principles, MFA\n4. **Network security** — firewall rules, VPN, network segmentation, WAF recommendations\n5. **Application security** — OWASP top 10 controls, dependency scanning, secrets management\n6. **Monitoring & detection** — logging strategy, SIEM, anomaly detection, alerting\n7. **Compliance mapping** — relevant standards (SOC 2, GDPR, HIPAA, PCI-DSS) and gaps\n8. **Incident response** — key steps for your most likely breach scenario\n9. **Quick wins** — top 5 high-impact, low-effort improvements to implement this week\n\nPrioritize practical, implementable advice over theory.",
        token_estimate: 185
      }
    }
  },

  // ── Engineering ────────────────────────────────────────────────────
  {
    id: "it-solution-architect",
    title: "IT Solution Architect",
    category: "Engineering",
    tags: ["architecture", "IT", "integration", "infrastructure", "enterprise"],
    featured: false,
    description: "Design integration solutions for new systems into an existing IT landscape, with gap analysis, interfaces, and deployment blueprints.",
    model_notes: {
      "gpt-5.4": "Excellent at enterprise architecture patterns. Max quality for complex integrations.",
      "claude-sonnet-4-6": "Strong at practical integration design. Balanced is the sweet spot.",
      "claude-opus-4-6": "Best for large-scale enterprise architecture with multiple systems.",
      "gemini-3.1-pro": "Good at cloud-native integration patterns. Balanced recommended.",
      "grok-4": "Practical architecture guidance. Balanced recommended.",
      "llama-4-scout": "Balanced recommended for complete architecture output.",
      "mistral-large-3": "Solid structured output. Balanced is reliable.",
      "o1": "Excellent for complex system interdependencies. Lean sufficient for familiar patterns."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 3, balanced: 5, max_quality: 5, best: "max_quality" },
      "claude-sonnet-4-6": { lean: 3, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-opus-4-6":   { lean: 3, balanced: 4, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 4, max_quality: 5, best: "balanced" },
      "grok-4":            { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "llama-4-scout":     { lean: 2, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 4, balanced: 5, max_quality: 5, best: "lean" }
    },
    variants: {
      lean: {
        prompt: "Design an integration approach for adding [NEW SYSTEM] to our IT landscape: [CURRENT ENVIRONMENT DESCRIPTION]",
        token_estimate: 20
      },
      balanced: {
        prompt: "New system: [NEW SYSTEM DESCRIPTION]\nCurrent IT landscape: [EXISTING SYSTEMS AND STACK]\n\nProvide:\n- Gap analysis between new and existing capabilities\n- Integration points and interface requirements\n- Recommended architecture pattern\n- Key deployment considerations\n- Top 3 risks",
        token_estimate: 68
      },
      max_quality: {
        prompt: "You are a senior IT Solution Architect specializing in enterprise system integration.\n\nNew system/application: [NEW SYSTEM DESCRIPTION]\nCurrent IT landscape: [EXISTING SYSTEMS, DATABASES, APIS, INFRASTRUCTURE]\nBusiness requirements: [KEY BUSINESS GOALS THIS INTEGRATION MUST ACHIEVE]\n\nDeliver a solution architecture covering:\n1. **Gap analysis** — what the new system adds vs. what already exists; overlaps and conflicts\n2. **System mapping** — how the new system maps to the existing IT landscape\n3. **Interface design** — APIs, data formats, protocols, and integration patterns (REST, event-driven, ETL, etc.)\n4. **Data flow** — data ownership, master data management, sync vs. async flows\n5. **Solution blueprint** — logical architecture diagram description, component responsibilities\n6. **Deployment blueprint** — infrastructure requirements, environments, CI/CD pipeline needs\n7. **Security considerations** — authentication between systems, data classification, access controls\n8. **Migration plan** — phased rollout approach and rollback strategy\n9. **Risks & mitigations** — top 4 technical and organizational risks\n\nBe prescriptive. Recommend specific patterns and explain trade-offs.",
        token_estimate: 195
      }
    }
  },

  // ── Data ───────────────────────────────────────────────────────────
  {
    id: "data-viz-advisor",
    title: "Data Visualization Advisor",
    category: "Data",
    tags: ["data-visualization", "charts", "dashboards", "science", "analytics"],
    featured: false,
    description: "Get expert advice on chart types, visualization tools, and dashboard design to tell compelling stories with your data.",
    model_notes: {
      "gpt-5.4": "Excellent at matching chart types to data structures. Balanced is the sweet spot.",
      "claude-sonnet-4-6": "Strong at explaining visual perception principles. Max quality for dashboard design.",
      "claude-opus-4-6": "Best for complex scientific or multi-dimensional visualization challenges.",
      "gemini-3.1-pro": "Good at tool-specific recommendations. Balanced recommended.",
      "grok-4": "Practical visualization guidance. Lean often works for common chart questions.",
      "llama-4-scout": "Balanced recommended for complete advice.",
      "mistral-large-3": "Solid structured output. Balanced is reliable.",
      "o1": "Lean sufficient for straightforward chart selection questions."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-sonnet-4-6": { lean: 4, balanced: 5, max_quality: 5, best: "max_quality" },
      "claude-opus-4-6":   { lean: 3, balanced: 5, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 4, max_quality: 5, best: "balanced" },
      "grok-4":            { lean: 4, balanced: 4, max_quality: 5, best: "lean" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 4, balanced: 5, max_quality: 5, best: "lean" }
    },
    variants: {
      lean: {
        prompt: "Recommend the best chart types and visualization approach for: [DESCRIBE YOUR DATA AND WHAT STORY YOU WANT TO TELL]",
        token_estimate: 22
      },
      balanced: {
        prompt: "Data: [DESCRIBE YOUR DATASET AND AUDIENCE]\nGoal: [WHAT INSIGHT OR STORY TO CONVEY]\n\nRecommend:\n- Best chart types and why\n- Visualization tool (Tableau, Python, D3.js, etc.)\n- Key design choices (colors, layout, interactivity)\n- What trends or patterns to highlight",
        token_estimate: 65
      },
      max_quality: {
        prompt: "You are an expert data visualization specialist with deep knowledge of visual perception, dashboard design, and scientific communication.\n\nDataset description: [DESCRIBE YOUR DATA — TYPE, SIZE, DIMENSIONS]\nAudience: [WHO WILL VIEW THIS — EXECUTIVES, ANALYSTS, GENERAL PUBLIC]\nStory/insight to convey: [WHAT DO YOU WANT VIEWERS TO UNDERSTAND OR DECIDE]\nContext: [WHERE WILL THIS APPEAR — REPORT, DASHBOARD, PRESENTATION, WEB APP]\n\nProvide a comprehensive visualization strategy:\n1. **Chart selection** — recommend 2–3 chart types with rationale; explain why alternatives were rejected\n2. **Visual hierarchy** — how to structure the layout for scanning and comprehension\n3. **Color strategy** — palette recommendations, accessibility (colorblind-friendly), use of color for emphasis\n4. **Tool recommendation** — specific tool with implementation approach (e.g., Plotly in Python, Vega-Lite, Tableau)\n5. **Interactivity** — which interactions add value (filters, tooltips, drill-down) vs. add complexity\n6. **Key callouts** — which data points or trends to annotate directly\n7. **Anti-patterns to avoid** — common mistakes for this data type\n8. **Dashboard layout** — if building a full dashboard, sketch the section structure",
        token_estimate: 185
      }
    }
  },

  // ── Engineering ────────────────────────────────────────────────────
  {
    id: "ux-ui-reviewer",
    title: "UX/UI Design Reviewer",
    category: "Engineering",
    tags: ["UX", "UI", "design", "usability", "product"],
    featured: false,
    description: "Get expert UX/UI feedback on any product screen or flow, with actionable improvements to navigation, visual hierarchy, and accessibility.",
    model_notes: {
      "gpt-5.4": "Excellent at identifying usability heuristic violations. Max quality for product reviews.",
      "claude-sonnet-4-6": "Strong at accessibility and information architecture. Balanced is the sweet spot.",
      "claude-opus-4-6": "Best for comprehensive design system reviews.",
      "gemini-3.1-pro": "Good at mobile UX patterns. Balanced recommended.",
      "grok-4": "Direct, actionable UX feedback. Balanced recommended.",
      "llama-4-scout": "Balanced recommended for complete review.",
      "mistral-large-3": "Solid structured output. Balanced is reliable.",
      "o1": "Lean sufficient for quick heuristic evaluation."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 4, balanced: 5, max_quality: 5, best: "max_quality" },
      "claude-sonnet-4-6": { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-opus-4-6":   { lean: 3, balanced: 5, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 4, max_quality: 5, best: "balanced" },
      "grok-4":            { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "llama-4-scout":     { lean: 2, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 4, balanced: 5, max_quality: 5, best: "lean" }
    },
    variants: {
      lean: {
        prompt: "Review the UX/UI of this product and identify the top usability issues and improvements:\n\n[PRODUCT DESCRIPTION OR SCREEN DESCRIPTION]",
        token_estimate: 24
      },
      balanced: {
        prompt: "Product: [PRODUCT NAME AND TYPE]\nTarget users: [USER TYPE]\nContext: [SCREEN OR FLOW BEING REVIEWED]\n\nProvide UX/UI feedback on:\n- Navigation and information architecture\n- Visual hierarchy and clarity\n- Accessibility issues\n- Friction points in the user journey\n- Top 3 prioritized improvements",
        token_estimate: 68
      },
      max_quality: {
        prompt: "You are a senior UX/UI designer and usability consultant with expertise in heuristic evaluation and accessibility.\n\nProduct: [PRODUCT NAME AND TYPE — web app, mobile app, etc.]\nTarget users: [USER PERSONA — demographics, goals, technical level]\nPlatform: [iOS / Android / Web / Desktop]\nScreen or flow: [DESCRIBE THE SCREEN OR USER JOURNEY BEING REVIEWED]\nKnown pain points: [ANY SPECIFIC ISSUES REPORTED OR SUSPECTED]\n\nConduct a comprehensive UX/UI review:\n1. **Heuristic evaluation** — assess against Nielsen's 10 usability heuristics; flag violations\n2. **Information architecture** — navigation clarity, menu labeling, content organization\n3. **Visual hierarchy** — use of typography, spacing, color, and contrast to guide attention\n4. **Accessibility** — WCAG 2.1 AA compliance gaps, color contrast, keyboard navigation, screen reader support\n5. **User journey friction** — steps where users are likely to drop off or get confused\n6. **What works well** — specific elements or patterns that are effective\n7. **Prioritized improvements** — top 5 changes ranked by impact × effort, with specific implementation suggestions\n8. **Prototyping recommendations** — what to test with users next\n\nBe specific. Reference exact UI elements rather than general advice.",
        token_estimate: 195
      }
    }
  },

  // ── Engineering ────────────────────────────────────────────────────
  {
    id: "software-project-planner",
    title: "Software Project Planner",
    category: "Engineering",
    tags: ["project-planning", "PRD", "milestones", "software", "agile"],
    featured: false,
    description: "Take a software idea from concept to detailed milestones: PRD, user journeys, task breakdowns, and AI-ready development specs.",
    model_notes: {
      "gpt-5.4": "Excellent at comprehensive project planning. Max quality for full project specs.",
      "claude-sonnet-4-6": "Strong at user story writing and milestone structuring. Balanced is the sweet spot.",
      "claude-opus-4-6": "Best for complex, multi-team projects requiring deep specification.",
      "gemini-3.1-pro": "Good at agile framework application. Balanced recommended.",
      "grok-4": "Practical planning output. Balanced recommended.",
      "llama-4-scout": "Balanced recommended for complete planning artifact.",
      "mistral-large-3": "Solid structured output. Balanced is reliable.",
      "o1": "Lean sufficient for simple projects; max quality for complex ones."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 3, balanced: 5, max_quality: 5, best: "max_quality" },
      "claude-sonnet-4-6": { lean: 3, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-opus-4-6":   { lean: 3, balanced: 4, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 4, max_quality: 5, best: "balanced" },
      "grok-4":            { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "llama-4-scout":     { lean: 2, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 4, balanced: 5, max_quality: 5, best: "max_quality" }
    },
    variants: {
      lean: {
        prompt: "Create a project plan for: [PROJECT IDEA]. Include MVP scope, key milestones, and main technical challenges.",
        token_estimate: 22
      },
      balanced: {
        prompt: "Project idea: [PROJECT IDEA]\n\nCreate a structured plan with:\n- Problem statement and value proposition\n- MVP feature list (must-have vs. nice-to-have)\n- 3–5 development milestones with objectives\n- Key technical decisions to make\n- Success metrics",
        token_estimate: 68
      },
      max_quality: {
        prompt: "You are an expert software project architect specializing in taking ideas from concept to executable development plans.\n\nProject idea: [PROJECT IDEA]\nTarget users: [WHO WILL USE THIS]\nTech stack preference: [PREFERRED STACK, OR \"recommend one\"]\n\nDeliver a complete project planning package:\n\n**Phase 1 — PRD:**\n- Problem statement and opportunity\n- Target audience and user personas\n- Feature list (must-have, should-have, won't-have for MVP)\n- Success metrics and KPIs\n- Technical constraints and assumptions\n\n**Phase 2 — User Journeys:**\n- 2–3 primary user flows with step-by-step walkthrough\n- Edge cases and error states\n\n**Phase 3 — Milestones:**\n- 4–6 sequenced milestones, each with: title, objective, key deliverables, and specific acceptance criteria\n\n**Phase 4 — AI-assisted development specs:**\n- For each milestone, provide granular task breakdowns formatted for AI code generation (context, requirements, expected output)\n\nAsk clarifying questions before proceeding if the idea is ambiguous.",
        token_estimate: 210
      }
    }
  },

  // ── Research ────────────────────────────────────────────────────────
  {
    id: "venture-capital-analyst",
    title: "Venture Capital Analyst",
    category: "Research",
    tags: ["venture-capital", "investment", "startup", "due-diligence", "finance"],
    featured: false,
    description: "Conduct a comprehensive VC-style investment analysis of any company, covering traction, market, team, and financials.",
    model_notes: {
      "gpt-5.4": "Excellent at synthesizing public company data. Max quality for investment memos.",
      "claude-sonnet-4-6": "Strong at structured analysis frameworks. Balanced is the sweet spot.",
      "claude-opus-4-6": "Best for deep due diligence on complex business models.",
      "gemini-3.1-pro": "Good with recent company data. Balanced recommended.",
      "grok-4": "Practical investment perspective. Balanced recommended.",
      "llama-4-scout": "Balanced recommended. Verify all financial data independently.",
      "mistral-large-3": "Solid structured output. Balanced is reliable.",
      "o1": "Excellent reasoning for investment thesis development. Lean sufficient for known companies."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 3, balanced: 5, max_quality: 5, best: "max_quality" },
      "claude-sonnet-4-6": { lean: 3, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-opus-4-6":   { lean: 3, balanced: 4, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 4, max_quality: 5, best: "balanced" },
      "grok-4":            { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "llama-4-scout":     { lean: 2, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 4, balanced: 5, max_quality: 5, best: "lean" }
    },
    variants: {
      lean: {
        prompt: "Conduct a VC investment analysis of [COMPANY NAME]. Cover traction, market size, team, and key risks.",
        token_estimate: 20
      },
      balanced: {
        prompt: "Company: [COMPANY NAME]\n\nVC analysis covering:\n- Business model and revenue\n- Market size and competitive position\n- Traction metrics (ARR, growth rate, key customers)\n- Team assessment\n- Current funding and burn rate\n- Investment thesis and top 3 risks",
        token_estimate: 68
      },
      max_quality: {
        prompt: "You are a venture capital analyst conducting due diligence. Produce a comprehensive investment analysis of [COMPANY NAME].\n\nStructure your report as:\n1. **Company overview** — founding story, mission, problem solved, why now\n2. **Product** — value proposition, key features, differentiation, IP or moat\n3. **Traction & customers** — ARR, MoM growth rate, NRR/NDR, churn, LTV/CAC, notable logos, ICP\n4. **Business model** — revenue streams, ACV, pricing strategy, sales motion (PLG, enterprise, etc.)\n5. **Market** — TAM/SAM/SOM, market timing, tailwinds, regulatory environment\n6. **Competition** — landscape map, differentiation vs. top 3 competitors, defensibility\n7. **Team** — founders' backgrounds, domain expertise, key hires, board composition\n8. **Financials** — funding history, current raise, burn rate, runway, path to break-even\n9. **Risks** — top 5 business, market, and execution risks with mitigation assessment\n10. **Investment thesis** — bull case, bear case, and recommended position\n\nCite sources where available. Flag data gaps explicitly.",
        token_estimate: 200
      }
    }
  },

  // ── General Purpose ────────────────────────────────────────────────
  {
    id: "product-critique",
    title: "Product Critique & Feedback",
    category: "General Purpose",
    tags: ["product", "feedback", "critique", "review", "improvement"],
    featured: false,
    description: "Get structured, honest critique and actionable improvement suggestions for any product, feature, or idea.",
    model_notes: {
      "gpt-5.4": "Excellent at balanced critique. Balanced is the sweet spot.",
      "claude-sonnet-4-6": "Strong at nuanced, constructive feedback. Lean works for quick takes.",
      "claude-opus-4-6": "Best for deep strategic product critique.",
      "gemini-3.1-pro": "Good practical feedback. Balanced recommended.",
      "grok-4": "Direct and contrarian critique. Lean works well.",
      "llama-4-scout": "Balanced recommended for complete feedback.",
      "mistral-large-3": "Solid structured output. Balanced is reliable.",
      "o1": "Lean sufficient — produces thorough critique naturally."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-sonnet-4-6": { lean: 4, balanced: 5, max_quality: 5, best: "lean" },
      "claude-opus-4-6":   { lean: 4, balanced: 5, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 4, max_quality: 5, best: "balanced" },
      "grok-4":            { lean: 4, balanced: 5, max_quality: 5, best: "lean" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 5, balanced: 5, max_quality: 5, best: "lean" }
    },
    variants: {
      lean: {
        prompt: "Critique this product/idea honestly. What works, what doesn't, and what's the most important improvement?\n\n[PRODUCT OR IDEA DESCRIPTION]",
        token_estimate: 24
      },
      balanced: {
        prompt: "Product/idea: [PRODUCT OR IDEA DESCRIPTION]\n\nProvide structured critique:\n- What's working well (and why)\n- What's not working (specific, not vague)\n- Top 3 improvements ranked by impact\n- One thing that could kill this if not addressed",
        token_estimate: 58
      },
      max_quality: {
        prompt: "You are a senior product strategist and experienced product critic. Provide honest, constructive, and specific feedback.\n\nProduct/feature/idea: [PRODUCT OR IDEA DESCRIPTION]\nStage: [CONCEPT / PROTOTYPE / LAUNCHED]\nTarget users: [WHO THIS IS FOR]\nBusiness goal: [WHAT SUCCESS LOOKS LIKE]\n\nStructured critique:\n1. **Strengths** — what genuinely works and why (be specific, not generic praise)\n2. **Core weaknesses** — fundamental problems with the approach, value prop, or execution\n3. **User experience gaps** — where real users will likely struggle or drop off\n4. **Competitive risks** — how competitors could outflank this\n5. **Prioritized improvements** — top 5 changes ranked by: impact on users × impact on business × feasibility\n6. **One critical question** — the most important unanswered question that could make or break this\n7. **Overall verdict** — honest one-paragraph assessment\n\nBe direct. Generic feedback is not useful. Reference specific elements.",
        token_estimate: 175
      }
    }
  }

];

// Check for duplicate IDs
const existingIds = new Set(data.prompts.map(p => p.id));
const dupes = newPrompts.filter(p => existingIds.has(p.id));
if (dupes.length > 0) {
  console.error('Duplicate IDs found:', dupes.map(p => p.id).join(', '));
  process.exit(1);
}

data.prompts.push(...newPrompts);
fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
console.log(`Done. Total prompts: ${data.prompts.length} (+${newPrompts.length})`);
