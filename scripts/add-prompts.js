// Run: node scripts/add-prompts.js
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'prompts.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const MODELS = ['gpt-5.4','claude-sonnet-4-6','claude-opus-4-6','gemini-3.1-pro','grok-4','llama-4-scout','mistral-large-3','o1'];

const newPrompts = [

  // ── Writing ──────────────────────────────────────────────────────
  {
    id: "executive-summary",
    title: "Write an Executive Summary",
    category: "Writing",
    tags: ["writing", "summarization", "business", "documents"],
    featured: false,
    description: "Condense a long document into a crisp executive summary tailored to a decision-maker audience.",
    model_notes: {
      "gpt-5.4": "Excellent at identifying the right level of detail for the audience. Balanced works well for most documents.",
      "claude-sonnet-4-6": "Strong on tone calibration. Lean is surprisingly effective for well-structured source documents.",
      "claude-opus-4-6": "Max quality shines for board-level or investor-facing summaries requiring precise language.",
      "gemini-3.1-pro": "Handles long source documents well via large context. Balanced recommended.",
      "grok-4": "Lean and balanced both perform well. Good at matching formal business tone.",
      "llama-4-scout": "Balanced recommended. Lean can miss important nuance in complex documents.",
      "mistral-large-3": "Reliable structured output. Balanced is the sweet spot.",
      "o1": "Lean is sufficient — o1's reasoning ensures key points are captured."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-sonnet-4-6": { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-opus-4-6":   { lean: 3, balanced: 5, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 4, balanced: 5, max_quality: 4, best: "balanced" },
      "grok-4":            { lean: 4, balanced: 4, max_quality: 5, best: "balanced" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 4, balanced: 4, max_quality: 4, best: "lean" }
    },
    variants: {
      lean: {
        prompt: "Write a 150-word executive summary of the following document. Focus on the core message, key findings, and recommended action.\n\n[DOCUMENT]",
        token_estimate: 33
      },
      balanced: {
        prompt: "Write an executive summary of the following document for a [AUDIENCE] audience.\n\nStructure:\n- **Overview** (1–2 sentences): What is this about and why does it matter?\n- **Key Findings** (3–4 bullet points): The most important facts or results\n- **Recommendation / Next Steps** (1–2 sentences): What should the reader do?\n\nKeep it under 200 words. Avoid jargon unless the audience expects it.\n\n[DOCUMENT]",
        token_estimate: 88
      },
      max_quality: {
        prompt: "You are a senior business analyst writing for a C-suite or board audience. Produce an executive summary of the following document.\n\n## Purpose\nState the document's purpose and the decision or insight it supports.\n\n## Context\nBrief background a reader needs to interpret the findings.\n\n## Key Findings\nThe 3–5 most critical facts, results, or conclusions. Use quantitative data where available.\n\n## Risks or Open Questions\nWhat is uncertain, contested, or requires follow-up?\n\n## Recommended Action\nA clear, specific recommendation with a rationale.\n\nTone: [TONE]\nAudience: [AUDIENCE]\nLength: 250 words maximum.\n\n[DOCUMENT]",
        token_estimate: 140
      }
    }
  },

  // ── Productivity ─────────────────────────────────────────────────
  {
    id: "weekly-planner",
    title: "Weekly Planner & Prioritization",
    category: "Productivity",
    tags: ["productivity", "planning", "prioritization", "time management"],
    featured: false,
    description: "Turn a raw list of tasks into a prioritized weekly plan with time blocks and energy-aware scheduling.",
    model_notes: {
      "gpt-5.4": "Excellent at inferring priorities and suggesting realistic time estimates. Balanced is the sweet spot.",
      "claude-sonnet-4-6": "Strong reasoning about task dependencies and context-switching cost. Lean works well.",
      "claude-opus-4-6": "Max quality produces deeply thoughtful plans with energy management and buffer time.",
      "gemini-3.1-pro": "Balanced recommended. Good at calendar-style output formatting.",
      "grok-4": "Balanced works well. Fast output for iterative replanning.",
      "llama-4-scout": "Balanced recommended. Lean can miss task dependencies.",
      "mistral-large-3": "Reliable structured output. Balanced is the sweet spot.",
      "o1": "Lean is sufficient — o1 reasons through priorities internally."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-sonnet-4-6": { lean: 5, balanced: 5, max_quality: 4, best: "lean" },
      "claude-opus-4-6":   { lean: 4, balanced: 5, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 5, max_quality: 4, best: "balanced" },
      "grok-4":            { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 4, balanced: 4, max_quality: 4, best: "lean" }
    },
    variants: {
      lean: {
        prompt: "Prioritize these tasks for my week using MoSCoW (Must/Should/Could/Won't) and assign each to a day.\n\n[TASKS]",
        token_estimate: 29
      },
      balanced: {
        prompt: "Create a prioritized weekly plan from the following task list.\n\n1. Categorize as **Must do**, **Should do**, or **Nice to have**\n2. Estimate time per task (be realistic — include breaks)\n3. Assign tasks to specific days Mon–Fri, grouping similar work to minimize context switching\n4. Flag any tasks that are blocked or need clarification\n\n[TASKS]",
        token_estimate: 70
      },
      max_quality: {
        prompt: "You are a productivity coach. Turn the following task list into a realistic, energy-aware weekly plan.\n\n**Step 1 — Triage**\nScore each task: Urgency (1–3) × Impact (1–3). Flag any that can be deleted or delegated.\n\n**Step 2 — Time estimates**\nEstimate each task honestly. Add 25% buffer for interruptions.\n\n**Step 3 — Weekly schedule**\nAssign tasks to days following these principles:\n- Deep work (coding, writing, analysis) → mornings\n- Meetings and calls → afternoons\n- Admin and low-energy tasks → end of day\n- Leave Friday afternoon as a buffer and review slot\n\n**Step 4 — Risk flags**\nList any tasks at risk of slipping and why.\n\nContext: [CONTEXT]\n\n[TASKS]",
        token_estimate: 158
      }
    }
  },

  {
    id: "email-reply",
    title: "Draft a Professional Email Reply",
    category: "Productivity",
    tags: ["email", "writing", "communication", "productivity"],
    featured: false,
    description: "Draft a clear, professional reply to any email — from quick acknowledgements to sensitive responses.",
    model_notes: {
      "gpt-5.4": "Excellent tone calibration. Balanced handles the majority of professional emails.",
      "claude-sonnet-4-6": "Strong on diplomatic phrasing. Lean is effective for straightforward replies.",
      "claude-opus-4-6": "Max quality for difficult or high-stakes emails — handles nuance and subtext well.",
      "gemini-3.1-pro": "Balanced recommended. Good at matching the formality of the original email.",
      "grok-4": "Lean works well for standard replies. Fast turnaround.",
      "llama-4-scout": "Balanced recommended. Lean can sound abrupt.",
      "mistral-large-3": "Solid professional tone. Balanced is the sweet spot.",
      "o1": "Lean is sufficient for most replies. Max quality for complex stakeholder emails."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-sonnet-4-6": { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-opus-4-6":   { lean: 3, balanced: 4, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 4, balanced: 5, max_quality: 4, best: "balanced" },
      "grok-4":            { lean: 4, balanced: 4, max_quality: 4, best: "lean" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 4, balanced: 4, max_quality: 4, best: "lean" }
    },
    variants: {
      lean: {
        prompt: "Draft a professional reply to this email. Tone: [TONE]. Key point to address: [MAIN POINT].\n\n[EMAIL]",
        token_estimate: 22
      },
      balanced: {
        prompt: "Draft a professional email reply.\n\n**Tone**: [TONE] (e.g. formal, warm, assertive, diplomatic)\n**My goal**: [GOAL] (e.g. agree, decline politely, ask for clarification, push back)\n\nThe reply should:\n- Open by acknowledging the email\n- Address the main point directly\n- Close with a clear next step or CTA\n- Stay under 150 words\n\n[EMAIL]",
        token_estimate: 76
      },
      max_quality: {
        prompt: "You are a senior professional drafting an important email reply. Analyze the incoming email, then write the response.\n\n**Analysis (internal, don't include in reply)**\n- What does the sender want?\n- What is the subtext or underlying concern?\n- What outcome do I want from this reply?\n- What tone is appropriate?\n\n**Reply**\nWrite the full email reply:\n- Subject line (if changed)\n- Greeting, body, call to action, sign-off\n\nConstraints:\n- Tone: [TONE]\n- My position / context: [MY CONTEXT]\n- Maximum length: 200 words\n\n[EMAIL]",
        token_estimate: 136
      }
    }
  },

  {
    id: "decision-framework",
    title: "Decision Framework",
    category: "Productivity",
    tags: ["decision making", "analysis", "productivity", "problem solving"],
    featured: false,
    description: "Structure any decision with pros/cons, criteria weighting, and a clear recommendation.",
    model_notes: {
      "gpt-5.4": "Excellent at structured analysis and surfacing non-obvious considerations. Balanced is ideal.",
      "claude-sonnet-4-6": "Strong reasoning. Lean produces a solid quick take; max quality adds real depth.",
      "claude-opus-4-6": "Max quality produces sophisticated multi-criteria analysis. Use for high-stakes decisions.",
      "gemini-3.1-pro": "Balanced recommended. Good at quantitative trade-off tables.",
      "grok-4": "Lean and balanced both work well. Good for rapid decision support.",
      "llama-4-scout": "Balanced recommended. Lean can oversimplify complex trade-offs.",
      "mistral-large-3": "Balanced is the sweet spot. Clean structured output.",
      "o1": "Lean is often enough — o1 reasons through trade-offs internally."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-sonnet-4-6": { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-opus-4-6":   { lean: 3, balanced: 5, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 4, balanced: 5, max_quality: 4, best: "balanced" },
      "grok-4":            { lean: 4, balanced: 4, max_quality: 4, best: "balanced" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 5, balanced: 5, max_quality: 4, best: "lean" }
    },
    variants: {
      lean: {
        prompt: "Help me decide: [DECISION]. List pros, cons, and give a recommendation.",
        token_estimate: 17
      },
      balanced: {
        prompt: "Help me make this decision: [DECISION]\n\nOptions to evaluate: [OPTIONS]\n\nFor each option:\n- **Pros**: top 2–3 benefits\n- **Cons**: top 2–3 downsides\n- **Risks**: what could go wrong\n\nEnd with a **Recommendation** and a one-sentence rationale.\n\nContext: [CONTEXT]",
        token_estimate: 62
      },
      max_quality: {
        prompt: "You are a strategic advisor helping me make the following decision: [DECISION]\n\n**Step 1 — Define success criteria**\nList 4–6 criteria that matter for this decision. Weight each from 1–5.\n\n**Step 2 — Evaluate options**\nOptions: [OPTIONS]\nScore each option against each criterion (1–5). Show a weighted score table.\n\n**Step 3 — Risk analysis**\nFor the top 2 options: identify the key risk and how to mitigate it.\n\n**Step 4 — Recommendation**\nState a clear recommendation with:\n- Rationale\n- What would change your recommendation\n- First action to take if you proceed\n\nContext and constraints: [CONTEXT]",
        token_estimate: 148
      }
    }
  },

  // ── Research ─────────────────────────────────────────────────────
  {
    id: "literature-review",
    title: "Literature Review Synthesis",
    category: "Research",
    tags: ["research", "academic", "summarization", "synthesis", "literature"],
    featured: false,
    description: "Synthesize multiple research sources into a coherent literature review with themes, gaps, and critical analysis.",
    model_notes: {
      "gpt-5.4": "Strong at cross-paper synthesis and identifying contradictions. Balanced works for most reviews.",
      "claude-sonnet-4-6": "Excellent at structured academic writing. Max quality for publishable reviews.",
      "claude-opus-4-6": "Best for nuanced academic synthesis. Extended thinking surfaces non-obvious connections.",
      "gemini-3.1-pro": "Large context window handles many papers at once. Balanced recommended.",
      "grok-4": "Balanced works well. Can pull in recent citation context via web access.",
      "llama-4-scout": "10M context handles large paper sets. Balanced recommended.",
      "mistral-large-3": "Balanced produces clean structured output. Good for initial drafts.",
      "o1": "Max quality recommended — complex synthesis benefits from extended reasoning."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 3, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-sonnet-4-6": { lean: 3, balanced: 5, max_quality: 5, best: "max_quality" },
      "claude-opus-4-6":   { lean: 3, balanced: 4, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 5, max_quality: 5, best: "balanced" },
      "grok-4":            { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 3, balanced: 4, max_quality: 5, best: "max_quality" }
    },
    variants: {
      lean: {
        prompt: "Synthesize the following sources into a literature review on [TOPIC]. Identify 2–3 key themes and 1–2 research gaps.\n\n[SOURCES]",
        token_estimate: 33
      },
      balanced: {
        prompt: "Write a literature review on [TOPIC] based on the following sources.\n\nStructure:\n- **Overview**: Frame the topic and why it matters\n- **Themes**: Group findings by theme, not by paper (3–4 themes)\n- **Contradictions**: Where do sources disagree?\n- **Research gaps**: What questions remain unanswered?\n- **Conclusion**: Summarize the state of knowledge\n\nCite sources by author/year where relevant.\n\n[SOURCES]",
        token_estimate: 88
      },
      max_quality: {
        prompt: "You are a research assistant writing an academic literature review on [TOPIC] for [AUDIENCE].\n\n**1. Introduction**\nDefine the scope. Why is this topic important? How was the literature selected?\n\n**2. Thematic Analysis**\nOrganize findings into 3–5 themes. For each:\n- Summarize the consensus view\n- Note key studies and their contributions\n- Highlight methodological strengths and weaknesses\n\n**3. Debates and Contradictions**\nWhere do findings conflict? Analyze possible reasons (methodology, context, definitions).\n\n**4. Research Gaps**\nWhat questions remain open? What study designs or populations are underrepresented?\n\n**5. Conclusion**\nSynthesize the overall state of knowledge and implications for future research.\n\nTone: academic, critical, not merely descriptive.\n\n[SOURCES]",
        token_estimate: 185
      }
    }
  },

  // ── AI / ML ──────────────────────────────────────────────────────
  {
    id: "system-prompt-writer",
    title: "Write a System Prompt",
    category: "AI / ML",
    tags: ["LLM", "prompt engineering", "system prompt", "AI"],
    featured: false,
    description: "Generate a well-structured system prompt for an AI assistant — from simple role definitions to full behavioral specs.",
    model_notes: {
      "gpt-5.4": "Excellent at self-aware prompt construction. Max quality produces robust, edge-case-aware system prompts.",
      "claude-sonnet-4-6": "Strong at identifying constraint gaps. Lean works for basic assistants.",
      "claude-opus-4-6": "Best for complex multi-turn assistants with nuanced behavioral requirements.",
      "gemini-3.1-pro": "Balanced recommended. Good at structured output specs.",
      "grok-4": "Balanced works well for most use cases.",
      "llama-4-scout": "Balanced recommended. Lean can underspecify constraints.",
      "mistral-large-3": "Balanced is the sweet spot. Clean role and constraint structure.",
      "o1": "Max quality recommended — it reasons about edge cases the prompt needs to handle."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 4, balanced: 5, max_quality: 5, best: "max_quality" },
      "claude-sonnet-4-6": { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-opus-4-6":   { lean: 3, balanced: 5, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 5, max_quality: 4, best: "balanced" },
      "grok-4":            { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 3, balanced: 4, max_quality: 5, best: "max_quality" }
    },
    variants: {
      lean: {
        prompt: "Write a system prompt for an AI assistant that [ROLE/TASK]. Include role, tone, and key constraints.",
        token_estimate: 22
      },
      balanced: {
        prompt: "Write a system prompt for an AI assistant with the following spec:\n\n- **Role**: [ROLE]\n- **Audience**: [AUDIENCE]\n- **Tone**: [TONE]\n- **Primary task**: [PRIMARY TASK]\n- **Must always do**: [ALWAYS DO]\n- **Must never do**: [NEVER DO]\n- **Output format**: [FORMAT]\n\nMake the prompt concise but complete. Avoid vague instructions like 'be helpful'.",
        token_estimate: 85
      },
      max_quality: {
        prompt: "You are a prompt engineer. Write a production-quality system prompt for the following AI assistant.\n\n**Assistant spec:**\n- Role: [ROLE]\n- Audience: [AUDIENCE]\n- Primary use case: [USE CASE]\n- Tone and personality: [TONE]\n- Platform / context: [PLATFORM]\n\n**The system prompt must include:**\n1. **Identity** — who the assistant is and its purpose\n2. **Capabilities** — what it can and will do well\n3. **Constraints** — hard limits (safety, scope, confidentiality)\n4. **Behavioral guidelines** — tone, response length, formatting\n5. **Edge case handling** — off-topic requests, ambiguity, sensitive topics\n6. **Output format spec** — structure the user should expect\n\nAfter the system prompt, add a short **critique** noting any ambiguities a developer should resolve before shipping.",
        token_estimate: 172
      }
    }
  },

  // ── Data ─────────────────────────────────────────────────────────
  {
    id: "eda-plan",
    title: "Exploratory Data Analysis Plan",
    category: "Data",
    tags: ["data science", "EDA", "analysis", "pandas", "statistics"],
    featured: false,
    description: "Generate a structured EDA plan for a dataset — quality checks, distributions, correlations, and anomaly detection.",
    model_notes: {
      "gpt-5.4": "Excellent at inferring appropriate analysis steps from dataset description. Balanced is ideal.",
      "claude-sonnet-4-6": "Strong at producing executable code alongside the plan. Lean works for experienced analysts.",
      "claude-opus-4-6": "Max quality produces rigorous plans with statistical justification.",
      "gemini-3.1-pro": "Balanced recommended. Good at code-heavy output with pandas/matplotlib.",
      "grok-4": "Balanced works well. Fast for iterative EDA sessions.",
      "llama-4-scout": "Balanced recommended. Can handle pasted CSV samples in its large context.",
      "mistral-large-3": "Balanced is the sweet spot. Clean structured analysis steps.",
      "o1": "Lean is sufficient for experienced data scientists. Max quality for novel dataset types."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-sonnet-4-6": { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-opus-4-6":   { lean: 3, balanced: 5, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 4, balanced: 5, max_quality: 4, best: "balanced" },
      "grok-4":            { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 4, balanced: 4, max_quality: 4, best: "lean" }
    },
    variants: {
      lean: {
        prompt: "Create an EDA plan for this dataset: [DATASET DESCRIPTION]. List the key checks to run and what to look for.",
        token_estimate: 24
      },
      balanced: {
        prompt: "Create a structured EDA plan for the following dataset.\n\n**Dataset**: [DATASET DESCRIPTION]\n**Goal**: [ANALYSIS GOAL]\n\nPlan should cover:\n1. **Data quality**: nulls, duplicates, type mismatches, outliers\n2. **Univariate analysis**: distributions of key numeric and categorical columns\n3. **Bivariate analysis**: correlations and relationships to investigate\n4. **Target variable** (if applicable): class balance, distribution\n5. **Visualizations**: most important plots to create\n\nInclude Python/pandas code snippets for each step.",
        token_estimate: 100
      },
      max_quality: {
        prompt: "You are a senior data scientist. Produce a comprehensive EDA plan for the following dataset.\n\n**Dataset**: [DATASET DESCRIPTION]\n**Business question**: [BUSINESS QUESTION]\n**Downstream use**: [USE CASE]\n\n**Phase 1 — Data inventory**\n- Schema review: column names, types, expected ranges\n- Record count, time span, grain of the data\n- Data provenance and known quality issues\n\n**Phase 2 — Quality assessment**\n- Missing value analysis: pattern (MCAR/MAR/MNAR?), impact, imputation strategy\n- Outlier detection: IQR method + z-score for numeric columns\n- Duplicate and near-duplicate detection\n\n**Phase 3 — Univariate analysis**\n- For each key column: distribution plot, summary stats, notable patterns\n\n**Phase 4 — Multivariate analysis**\n- Correlation matrix for numeric features\n- Key cross-tabulations for categorical features\n\n**Phase 5 — Hypothesis generation**\nList 3–5 hypotheses to test based on initial findings.\n\nProvide Python code (pandas, seaborn, matplotlib) for each phase.",
        token_estimate: 220
      }
    }
  },

  // ── Engineering ──────────────────────────────────────────────────
  {
    id: "incident-postmortem",
    title: "Incident Postmortem",
    category: "Engineering",
    tags: ["engineering", "reliability", "incident", "SRE", "documentation"],
    featured: false,
    description: "Write a blameless postmortem for a production incident — timeline, root cause, impact, and action items.",
    model_notes: {
      "gpt-5.4": "Excellent at blameless framing and action item specificity. Balanced handles most incidents.",
      "claude-sonnet-4-6": "Strong at timeline reconstruction and causal chain analysis. Balanced is ideal.",
      "claude-opus-4-6": "Max quality produces thorough 5-whys analysis and systemic recommendations.",
      "gemini-3.1-pro": "Balanced recommended. Good at structured technical documentation.",
      "grok-4": "Balanced works well. Fast for time-pressured postmortems.",
      "llama-4-scout": "Balanced recommended. Lean can miss contributing factors.",
      "mistral-large-3": "Balanced is the sweet spot. Clean structured output.",
      "o1": "Lean is sufficient for simple incidents. Max quality for complex multi-system failures."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-sonnet-4-6": { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-opus-4-6":   { lean: 3, balanced: 5, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 4, balanced: 4, max_quality: 5, best: "balanced" },
      "grok-4":            { lean: 4, balanced: 4, max_quality: 4, best: "balanced" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 4, balanced: 4, max_quality: 4, best: "lean" }
    },
    variants: {
      lean: {
        prompt: "Write a blameless postmortem for this incident: [INCIDENT SUMMARY]. Include: timeline, root cause, customer impact, and 3 action items.",
        token_estimate: 30
      },
      balanced: {
        prompt: "Write a blameless postmortem for the following incident.\n\n**Incident**: [INCIDENT SUMMARY]\n**Duration**: [DURATION]\n**Severity**: [SEVERITY]\n\nSections:\n- **Summary**: What happened in 2–3 sentences\n- **Timeline**: Key events with timestamps\n- **Root cause**: The technical reason the incident occurred\n- **Contributing factors**: What made it worse or harder to detect\n- **Customer impact**: Who was affected and how\n- **Action items**: 3–5 specific, assigned tasks to prevent recurrence\n\nTone: blameless, factual, forward-looking.",
        token_estimate: 104
      },
      max_quality: {
        prompt: "You are an SRE lead writing a formal postmortem for the following production incident. Use a blameless, systemic lens.\n\n**Incident**: [INCIDENT SUMMARY]\n**Duration**: [DURATION] | **Severity**: [SEVERITY] | **Affected services**: [SERVICES]\n\n## Executive Summary\n2–3 sentences: what broke, when, impact, resolution.\n\n## Timeline\nChronological log of key events, detections, actions, and resolution.\n\n## Root Cause Analysis\nApply the 5 Whys. Identify proximate cause and systemic/organizational root cause.\n\n## Contributing Factors\nWhat conditions allowed this to happen? (monitoring gaps, process failures, technical debt)\n\n## Impact\n- Customer impact (users affected, error rate, latency degradation)\n- Business impact (SLA breach, revenue, support tickets)\n\n## What Went Well\nAspects of detection, response, or recovery that worked.\n\n## Action Items\nFor each: owner, due date, priority (P1/P2/P3), success metric.\n\n## Lessons Learned\nWhat would you do differently? What should the broader org know?",
        token_estimate: 214
      }
    }
  },

  {
    id: "architecture-decision-record",
    title: "Architecture Decision Record (ADR)",
    category: "Engineering",
    tags: ["architecture", "engineering", "documentation", "decision making"],
    featured: false,
    description: "Document an architectural decision with context, alternatives considered, trade-offs, and consequences.",
    model_notes: {
      "gpt-5.4": "Excellent at surfacing non-obvious trade-offs and consequences. Balanced handles most ADRs.",
      "claude-sonnet-4-6": "Strong at technical nuance. Lean works for experienced architects.",
      "claude-opus-4-6": "Max quality produces thorough quality attribute analysis. Best for critical decisions.",
      "gemini-3.1-pro": "Balanced recommended. Good at structured technical docs.",
      "grok-4": "Balanced works well for standard architectural decisions.",
      "llama-4-scout": "Balanced recommended. Lean can miss important trade-offs.",
      "mistral-large-3": "Balanced is the sweet spot. Clean structured output.",
      "o1": "Lean is sufficient for clear-cut decisions. Max quality for complex trade-offs."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-sonnet-4-6": { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-opus-4-6":   { lean: 3, balanced: 4, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 5, max_quality: 4, best: "balanced" },
      "grok-4":            { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 4, balanced: 4, max_quality: 4, best: "lean" }
    },
    variants: {
      lean: {
        prompt: "Write an ADR for: [DECISION]. Cover: status, context, decision, and consequences.",
        token_estimate: 18
      },
      balanced: {
        prompt: "Write an Architecture Decision Record (ADR) for the following decision.\n\n**Decision**: [DECISION]\n**Status**: [STATUS] (e.g. Proposed, Accepted, Deprecated)\n\nSections:\n- **Context**: What problem are we solving? What forces are at play?\n- **Decision**: What have we decided to do?\n- **Alternatives considered**: What else was evaluated and why was it rejected?\n- **Consequences**: Positive outcomes, negative trade-offs, and technical debt incurred.",
        token_estimate: 86
      },
      max_quality: {
        prompt: "Write a comprehensive ADR for the following architectural decision.\n\n**Decision title**: [DECISION]\n**Status**: [STATUS]\n**Deciders**: [TEAM/INDIVIDUALS]\n**Date**: [DATE]\n\n## Context\nDescribe the problem, constraints, and forces that led to this decision.\n\n## Decision\nState the decision clearly. What are we doing and why?\n\n## Alternatives Considered\nFor each alternative: describe it, explain why it was rejected, note residual risk.\n\n## Consequences\n**Positive**: Benefits and improvements expected.\n**Negative**: Trade-offs, limitations, and technical debt introduced.\n**Risks**: What could go wrong and how will we detect it?\n\n## Quality Attributes Affected\nRate the impact (positive/negative/neutral) on: Performance, Scalability, Security, Maintainability, Cost, Developer Experience.\n\n## Review Criteria\nWhat conditions would cause us to revisit this decision?",
        token_estimate: 188
      }
    }
  },

  // ── Entertainment & Creative ──────────────────────────────────────
  {
    id: "poem-generator",
    title: "Poem Generator",
    category: "Entertainment & Creative",
    tags: ["poetry", "creative writing", "fiction", "storytelling"],
    featured: false,
    description: "Generate poems in any style — haiku, sonnet, free verse, or experimental — with craft-aware guidance.",
    model_notes: {
      "gpt-5.4": "Excellent prosody and imagery. Max quality produces genuinely beautiful verse.",
      "claude-sonnet-4-6": "Strong at emotional resonance. Lean works surprisingly well for short forms like haiku.",
      "claude-opus-4-6": "Best for complex poetic forms and extended metaphor. Max quality recommended.",
      "gemini-3.1-pro": "Balanced recommended. Good at rhyme and meter.",
      "grok-4": "Balanced works well. Fast creative iteration.",
      "llama-4-scout": "Balanced recommended. Lean can produce generic imagery.",
      "mistral-large-3": "Balanced is the sweet spot. Good at structured poetic forms.",
      "o1": "Lean is sufficient for simple forms. Max quality for intricate formal poetry."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 4, balanced: 5, max_quality: 5, best: "max_quality" },
      "claude-sonnet-4-6": { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-opus-4-6":   { lean: 3, balanced: 4, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "grok-4":            { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 3, balanced: 4, max_quality: 5, best: "max_quality" }
    },
    variants: {
      lean: {
        prompt: "Write a [STYLE] poem about [TOPIC]. Make it vivid and specific — avoid clichés.",
        token_estimate: 18
      },
      balanced: {
        prompt: "Write a [STYLE] poem about [TOPIC].\n\n- **Tone**: [TONE] (e.g. melancholic, joyful, ironic)\n- **Length**: [LENGTH] (e.g. 3 stanzas, 14 lines, 5–7–5)\n- **Imagery**: Ground the poem in concrete, sensory details — not abstract statements\n- **Avoid**: clichés, filler lines, forced rhymes that distort meaning\n\nIf the style has formal requirements (meter, rhyme scheme), follow them precisely.",
        token_estimate: 82
      },
      max_quality: {
        prompt: "You are a poet with a deep understanding of craft. Write a [STYLE] poem about [TOPIC].\n\n**Formal requirements**:\n- Style / form: [STYLE]\n- Tone: [TONE]\n- Length: [LENGTH]\n\n**Craft guidelines**:\n- Use concrete, sensory imagery. Show, don't tell.\n- Every word must earn its place. Cut adverbs and adjectives that don't add meaning.\n- Use sound devices (alliteration, assonance, consonance) intentionally.\n- The ending should feel inevitable in retrospect — a turn or revelation, not a summary.\n- Avoid clichés. If you catch yourself writing a familiar phrase, replace it.\n\n**After the poem**, write 2–3 sentences of craft notes explaining your key choices (imagery, structure, sound).",
        token_estimate: 155
      }
    }
  },

  {
    id: "character-creator",
    title: "Character Creator",
    category: "Entertainment & Creative",
    tags: ["creative writing", "fiction", "character", "storytelling", "worldbuilding"],
    featured: false,
    description: "Create a compelling fictional character with backstory, motivations, flaws, and a distinct voice.",
    model_notes: {
      "gpt-5.4": "Excellent at nuanced character psychology. Max quality produces deeply realized characters.",
      "claude-sonnet-4-6": "Strong at voice and internal contradiction. Balanced is ideal for most fiction needs.",
      "claude-opus-4-6": "Best for literary-quality characters with thematic depth and complex arcs.",
      "gemini-3.1-pro": "Balanced recommended. Good at genre-aware character tropes subverted well.",
      "grok-4": "Balanced works well. Fast for generating multiple character options.",
      "llama-4-scout": "Balanced recommended. Lean can produce generic archetypes.",
      "mistral-large-3": "Balanced is the sweet spot. Good at structured character sheets.",
      "o1": "Lean is sufficient for supporting characters. Max quality for protagonists."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 3, balanced: 5, max_quality: 5, best: "max_quality" },
      "claude-sonnet-4-6": { lean: 3, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-opus-4-6":   { lean: 3, balanced: 4, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "grok-4":            { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 3, balanced: 4, max_quality: 5, best: "max_quality" }
    },
    variants: {
      lean: {
        prompt: "Create a compelling [GENRE] character: [BRIEF DESCRIPTION]. Include name, core motivation, and defining flaw.",
        token_estimate: 20
      },
      balanced: {
        prompt: "Create a fictional character for a [GENRE] story.\n\n**Concept**: [BRIEF DESCRIPTION]\n\nInclude:\n- **Name and background**: Who are they and where do they come from?\n- **Core motivation**: What do they want more than anything?\n- **Wound or fear**: What past event or deep fear shapes their behavior?\n- **Defining flaw**: What trait consistently gets in their way?\n- **Voice**: 2–3 lines of dialogue that capture how they speak.\n- **Arc hint**: How might this character change by the story's end?",
        token_estimate: 96
      },
      max_quality: {
        prompt: "You are a fiction editor helping develop a complex, memorable character.\n\n**Genre**: [GENRE] | **Story role**: [ROLE] | **Concept**: [BRIEF DESCRIPTION]\n\n## Identity\nFull name, age, appearance (distinctive, not generic), background in 3–4 sentences.\n\n## Psychology\n- **Desire**: What do they consciously want?\n- **Need**: What do they actually need (often different from desire)?\n- **Ghost**: The defining wound from their past\n- **Misbelief**: The lie they tell themselves because of that wound\n- **Flaw**: How the misbelief manifests as self-destructive behavior\n\n## Relationships\n- How do they relate to authority, intimacy, conflict?\n- One relationship that reveals their best quality; one that reveals their worst.\n\n## Voice\n- How they speak (rhythm, vocabulary, what they avoid saying)\n- Three lines of sample dialogue in three different emotional states\n\n## Arc\n- What would it take for this character to change?\n- What does their story look like if they do vs. if they don't?",
        token_estimate: 218
      }
    }
  },

  // ── Education & Tutoring ─────────────────────────────────────────
  {
    id: "lesson-plan",
    title: "Lesson Plan Generator",
    category: "Education & Tutoring",
    tags: ["education", "teaching", "lesson plan", "learning", "curriculum"],
    featured: false,
    description: "Create a structured lesson plan for any topic and audience — with objectives, activities, and assessment.",
    model_notes: {
      "gpt-5.4": "Excellent at age-appropriate scaffolding. Balanced handles most lesson planning needs.",
      "claude-sonnet-4-6": "Strong at learning objective clarity. Lean works for experienced teachers.",
      "claude-opus-4-6": "Max quality produces differentiated plans with multiple learning modalities.",
      "gemini-3.1-pro": "Balanced recommended. Good at structured curriculum design.",
      "grok-4": "Balanced works well. Fast for generating lesson plan templates.",
      "llama-4-scout": "Balanced recommended. Lean can miss assessment components.",
      "mistral-large-3": "Balanced is the sweet spot. Clean structured output.",
      "o1": "Lean is sufficient for straightforward topics. Max quality for complex interdisciplinary lessons."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-sonnet-4-6": { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-opus-4-6":   { lean: 3, balanced: 4, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 5, max_quality: 4, best: "balanced" },
      "grok-4":            { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 3, balanced: 4, max_quality: 4, best: "balanced" }
    },
    variants: {
      lean: {
        prompt: "Create a lesson plan to teach [TOPIC] to [AUDIENCE] in [DURATION]. Include objective, activities, and a check for understanding.",
        token_estimate: 25
      },
      balanced: {
        prompt: "Create a lesson plan:\n\n- **Topic**: [TOPIC]\n- **Audience**: [AUDIENCE] (age, level, prior knowledge)\n- **Duration**: [DURATION]\n- **Setting**: [SETTING]\n\nInclude:\n1. **Learning objectives** (what students will be able to do)\n2. **Hook / Opening** (engage attention in the first 5 minutes)\n3. **Core instruction** (key concepts and how to teach them)\n4. **Practice activity** (students apply the concept)\n5. **Assessment** (how to check understanding)\n6. **Materials needed**",
        token_estimate: 96
      },
      max_quality: {
        prompt: "You are a curriculum designer. Create a detailed, pedagogically sound lesson plan.\n\n**Topic**: [TOPIC]\n**Audience**: [AUDIENCE] (age, grade level, prior knowledge, special learning needs)\n**Duration**: [DURATION]\n**Setting**: [SETTING]\n**Learning standard or goal**: [STANDARD/GOAL]\n\n## Learning Objectives\n2–4 objectives using Bloom's taxonomy verbs (understand, apply, analyze, evaluate, create).\n\n## Materials & Preparation\nList everything needed, including prep time.\n\n## Lesson Flow\n| Time | Phase | Teacher activity | Student activity |\n|------|-------|-----------------|------------------|\nCover: Hook, Instruction, Guided Practice, Independent Practice, Closure.\n\n## Differentiation\n- **Support**: How to help struggling learners\n- **Extension**: How to challenge advanced learners\n\n## Formative Assessment\nHow will you check for understanding during the lesson?\n\n## Reflection prompts\nTwo questions for the teacher to evaluate the lesson after delivery.",
        token_estimate: 200
      }
    }
  },

  {
    id: "study-guide",
    title: "Study Guide Creator",
    category: "Education & Tutoring",
    tags: ["education", "studying", "learning", "summarization", "exam prep"],
    featured: false,
    description: "Generate a comprehensive study guide for any topic — key concepts, summaries, and practice questions.",
    model_notes: {
      "gpt-5.4": "Excellent at identifying what's most important to study. Balanced is ideal.",
      "claude-sonnet-4-6": "Strong at concise, accurate summaries. Lean works for well-understood topics.",
      "claude-opus-4-6": "Max quality produces deeply organized guides with memory aids and concept connections.",
      "gemini-3.1-pro": "Balanced recommended. Large context handles full textbook chapters.",
      "grok-4": "Balanced works well. Fast for generating study materials.",
      "llama-4-scout": "Balanced recommended. Large context handles long source material.",
      "mistral-large-3": "Balanced is the sweet spot. Clean structured output.",
      "o1": "Lean is sufficient for familiar topics. Max quality for dense or unfamiliar material."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-sonnet-4-6": { lean: 4, balanced: 5, max_quality: 4, best: "balanced" },
      "claude-opus-4-6":   { lean: 3, balanced: 5, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 5, max_quality: 4, best: "balanced" },
      "grok-4":            { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 4, balanced: 4, max_quality: 4, best: "lean" }
    },
    variants: {
      lean: {
        prompt: "Create a study guide for [TOPIC/SUBJECT]. Key concepts, definitions, and 5 practice questions.",
        token_estimate: 19
      },
      balanced: {
        prompt: "Create a study guide for [TOPIC/SUBJECT] aimed at [AUDIENCE].\n\nInclude:\n- **Key concepts**: Define the 8–12 most important terms or ideas\n- **Core principles**: The 3–5 fundamental rules or frameworks\n- **Common misconceptions**: What students frequently get wrong\n- **Memory aids**: Mnemonics, analogies, or visual frameworks\n- **Practice questions**: 5–8 questions ranging from recall to application\n- **Further study**: What to review if struggling with specific concepts",
        token_estimate: 90
      },
      max_quality: {
        prompt: "You are an expert tutor. Create a comprehensive study guide for [TOPIC/SUBJECT].\n\n**Audience**: [AUDIENCE] (level, background, exam or goal)\n**Source material**: [SOURCE]\n\n## Learning Objectives\nWhat should a student know and be able to do after studying this guide?\n\n## Key Concepts\nFor each major concept:\n- Clear definition\n- Why it matters\n- Common misconception\n- One concrete example\n\n## Frameworks & Mental Models\nVisual or structured ways to organize the knowledge (tables, flowcharts, hierarchies).\n\n## Connections\nHow do the key concepts relate to each other? What depends on what?\n\n## Practice Questions\n- 3 recall questions\n- 3 application questions\n- 2 analysis or synthesis questions\n- Answer key with explanations\n\n## Self-Test Checklist\n'I can...' statements for the student to verify understanding before an exam.",
        token_estimate: 193
      }
    }
  },

  // ── Well-being & Mental Health ────────────────────────────────────
  {
    id: "stress-reframe",
    title: "Stress Relief & Reframing",
    category: "Well-being & Mental Health",
    tags: ["mental health", "stress", "reframing", "mindfulness", "self-care"],
    featured: false,
    description: "Reframe a stressful situation with perspective shifts, cognitive techniques, and grounded coping strategies.",
    model_notes: {
      "gpt-5.4": "Warm and effective. Balanced is ideal for most stress reframing needs.",
      "claude-sonnet-4-6": "Strong at empathetic, non-dismissive reframing. Lean works for simple situational stress.",
      "claude-opus-4-6": "Max quality for complex or persistent stress — nuanced, deeply empathetic responses.",
      "gemini-3.1-pro": "Balanced recommended. Warm and structured.",
      "grok-4": "Balanced works well. Practical and grounded.",
      "llama-4-scout": "Balanced recommended. Lean can feel rushed for emotional topics.",
      "mistral-large-3": "Balanced is the sweet spot. Good empathetic tone.",
      "o1": "Balanced recommended. Reasoning adds depth to coping strategies."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-sonnet-4-6": { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-opus-4-6":   { lean: 3, balanced: 5, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 5, max_quality: 4, best: "balanced" },
      "grok-4":            { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 3, balanced: 5, max_quality: 4, best: "balanced" }
    },
    variants: {
      lean: {
        prompt: "Help me reframe this stressful situation: [SITUATION]. Offer 3 perspective shifts and 2 grounded coping steps.",
        token_estimate: 23
      },
      balanced: {
        prompt: "I'm feeling stressed about: [SITUATION]\n\n1. **Validate** the stress without dismissing it\n2. **Reframe** — offer 2–3 honest alternative ways to see the situation (not toxic-positive)\n3. **What I can control** — 3 concrete actions within my influence\n4. **What I can release** — what is outside my control and okay to let go of\n5. **Grounding step** — one small, immediate thing I can do right now\n\nTone: warm, direct, not preachy.",
        token_estimate: 90
      },
      max_quality: {
        prompt: "You are a supportive guide trained in cognitive-behavioral techniques and mindfulness. Help me work through the following stressor.\n\n**Situation**: [SITUATION]\n**How I'm feeling**: [FEELINGS]\n**What I'm most worried about**: [WORRY]\n\n## Acknowledgement\nValidate the difficulty without minimizing or catastrophizing.\n\n## Cognitive Reframe\nIdentify any cognitive distortions (catastrophizing, all-or-nothing thinking, mind reading, etc.). Offer a balanced counter-thought for each.\n\n## What's in my control\nConcrete actions I can take, separated by: this week / this month / long-term.\n\n## What's not in my control\nHelp me accept these with a brief mindfulness or acceptance frame.\n\n## Coping toolkit\n- One breathing or grounding exercise for right now\n- One behavioral strategy for the next 24 hours\n- One longer-term support (journaling prompt, conversation to have, habit to build)\n\n## Closing reflection\nA short, honest reframe that acknowledges difficulty and possibility.",
        token_estimate: 196
      }
    }
  },

  {
    id: "goal-setting",
    title: "Goal Setting & Action Plan",
    category: "Well-being & Mental Health",
    tags: ["goals", "planning", "productivity", "self-improvement", "mindfulness"],
    featured: false,
    description: "Transform a vague goal into a SMART action plan with milestones, obstacles, and accountability built in.",
    model_notes: {
      "gpt-5.4": "Excellent at realistic, specific planning. Balanced handles most goal-setting needs.",
      "claude-sonnet-4-6": "Strong at motivation-aware planning. Lean is surprisingly effective for clear goals.",
      "claude-opus-4-6": "Max quality for life or career goals requiring deep identity-level exploration.",
      "gemini-3.1-pro": "Balanced recommended. Good at structured milestone planning.",
      "grok-4": "Balanced works well. Practical and grounded.",
      "llama-4-scout": "Balanced recommended. Lean can miss obstacle planning.",
      "mistral-large-3": "Balanced is the sweet spot. Clean structured output.",
      "o1": "Lean is sufficient for clear goals. Max quality for complex multi-dimensional goals."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-sonnet-4-6": { lean: 4, balanced: 5, max_quality: 4, best: "balanced" },
      "claude-opus-4-6":   { lean: 3, balanced: 4, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 5, max_quality: 4, best: "balanced" },
      "grok-4":            { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 4, balanced: 4, max_quality: 4, best: "lean" }
    },
    variants: {
      lean: {
        prompt: "Turn this goal into a SMART action plan with 3 milestones and the most likely obstacle to address: [GOAL]",
        token_estimate: 23
      },
      balanced: {
        prompt: "Help me build an action plan for this goal: [GOAL]\n\n1. **SMART rewrite**: Restate my goal as Specific, Measurable, Achievable, Relevant, Time-bound\n2. **Why it matters**: The deeper reason (motivation anchor)\n3. **Milestones**: 3–4 checkpoints with target dates\n4. **First step**: The single smallest action I can take in the next 24 hours\n5. **Likely obstacles**: Top 2 blockers and how to pre-empt them\n6. **Accountability**: How to track progress and know if I'm off track\n\nTimeline: [TIMELINE]",
        token_estimate: 104
      },
      max_quality: {
        prompt: "You are a life and productivity coach. Help me build a robust goal achievement plan.\n\n**My goal**: [GOAL]\n**Timeline**: [TIMELINE]\n**Current situation**: [CURRENT SITUATION]\n**Resources available**: [RESOURCES]\n\n## Goal Clarity\nRestate as SMART. Is this the right goal, or is there a deeper goal underneath?\n\n## Why This Matters\nThe intrinsic motivation. What value does this serve? What does achieving it make possible?\n\n## Milestone Map\n4–6 milestones. For each: what does success look like, by when, key task(s).\n\n## Obstacle Mapping\nTop 3 obstacles (internal and external). Pre-emptive strategy and recovery plan for each.\n\n## Daily / Weekly Habits\nRecurring behaviors that will compound toward this goal.\n\n## Identity Statement\nA 'I am the kind of person who...' statement to anchor motivation.\n\n## Review Cadence\nWhen and how to check in on progress. What triggers a plan revision?",
        token_estimate: 198
      }
    }
  },

  // ── Career & Professional Growth ──────────────────────────────────
  {
    id: "salary-negotiation",
    title: "Salary Negotiation Script",
    category: "Career & Professional Growth",
    tags: ["career", "negotiation", "salary", "job search", "professional growth"],
    featured: false,
    description: "Prepare a confident, data-backed salary negotiation — from the opening ask to handling counteroffers.",
    model_notes: {
      "gpt-5.4": "Excellent at realistic, tactful negotiation scripts. Balanced handles most scenarios.",
      "claude-sonnet-4-6": "Strong at confident but collaborative framing. Balanced is ideal.",
      "claude-opus-4-6": "Max quality for senior or executive-level negotiations with complex comp packages.",
      "gemini-3.1-pro": "Balanced recommended. Good at role-play and objection anticipation.",
      "grok-4": "Balanced works well. Practical and direct scripts.",
      "llama-4-scout": "Balanced recommended. Lean can miss objection handling.",
      "mistral-large-3": "Balanced is the sweet spot. Clear, professional scripts.",
      "o1": "Lean is sufficient for straightforward negotiations. Max quality for complex multi-offer situations."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-sonnet-4-6": { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-opus-4-6":   { lean: 3, balanced: 4, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 5, max_quality: 4, best: "balanced" },
      "grok-4":            { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 4, balanced: 4, max_quality: 4, best: "lean" }
    },
    variants: {
      lean: {
        prompt: "Write a salary negotiation script. Role: [ROLE], Current offer: [OFFER], Target: [TARGET]. Be confident and professional.",
        token_estimate: 25
      },
      balanced: {
        prompt: "Help me prepare a salary negotiation for the following situation:\n\n- **Role**: [ROLE]\n- **Current offer**: [OFFER]\n- **My target**: [TARGET]\n- **My leverage**: [LEVERAGE] (e.g. competing offers, unique skills, market data)\n\nProvide:\n1. **Opening script** — how to start the conversation\n2. **Justification** — 2–3 reasons to support my ask\n3. **Counter to common objections** (\"budget is fixed\", \"top of the band\")\n4. **Walk-away line** — how to close if they won't move\n5. **Non-salary asks** — alternatives if base is firm (equity, PTO, signing bonus)",
        token_estimate: 108
      },
      max_quality: {
        prompt: "You are a career coach specializing in compensation negotiation. Help me prepare for the following negotiation.\n\n**Role**: [ROLE] | **Company**: [COMPANY] | **Level**: [LEVEL]\n**Offer received**: [OFFER]\n**My target**: [TARGET]\n**Market data**: [MARKET DATA]\n**My leverage**: [LEVERAGE]\n\n## Mindset & Framing\nKey principles for this negotiation. How to be collaborative, not combative.\n\n## Opening Script\nExact language to open the negotiation (email and phone versions).\n\n## Justification Framework\nHow to present your ask using market data, your value, and role context.\n\n## Objection Handling\nFor each likely objection, a specific, confident response:\n- \"Already at the top of the band\"\n- \"Can revisit at 6 months\"\n- \"Budget is frozen\"\n- \"We have other candidates\"\n\n## Alternative Asks\nIf base is non-negotiable, what else to negotiate and how to frame each.\n\n## Post-negotiation\nHow to respond if they accept, partially accept, or decline.",
        token_estimate: 210
      }
    }
  },

  {
    id: "performance-review",
    title: "Performance Review Self-Assessment",
    category: "Career & Professional Growth",
    tags: ["career", "performance", "self-assessment", "professional growth", "STAR method"],
    featured: false,
    description: "Write a compelling self-assessment for your performance review — achievements framed with impact, growth areas, and goals.",
    model_notes: {
      "gpt-5.4": "Excellent at quantifying impact and professional framing. Balanced is ideal.",
      "claude-sonnet-4-6": "Strong at STAR-format achievement writing. Lean works for straightforward reviews.",
      "claude-opus-4-6": "Max quality for senior roles where strategic contributions need careful articulation.",
      "gemini-3.1-pro": "Balanced recommended. Good at structured professional writing.",
      "grok-4": "Balanced works well. Clear and direct framing.",
      "llama-4-scout": "Balanced recommended. Lean can miss quantified impact.",
      "mistral-large-3": "Balanced is the sweet spot. Professional, structured output.",
      "o1": "Lean is sufficient for clear wins. Max quality for complex, strategic contributions."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-sonnet-4-6": { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-opus-4-6":   { lean: 3, balanced: 4, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 4, balanced: 5, max_quality: 4, best: "balanced" },
      "grok-4":            { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 4, balanced: 4, max_quality: 4, best: "lean" }
    },
    variants: {
      lean: {
        prompt: "Write a performance review self-assessment. Role: [ROLE]. Key wins: [WINS]. Growth area: [GROWTH AREA]. Keep it professional and impact-focused.",
        token_estimate: 26
      },
      balanced: {
        prompt: "Write a professional self-assessment for my performance review.\n\n- **Role**: [ROLE]\n- **Review period**: [PERIOD]\n- **Key achievements**: [ACHIEVEMENTS] (include metrics where possible)\n- **Challenges faced**: [CHALLENGES]\n- **Growth area**: [GROWTH AREA]\n- **Goals for next period**: [GOALS]\n\nUse STAR format (Situation, Task, Action, Result) for top 2–3 achievements. Tone: confident and growth-oriented, not boastful.",
        token_estimate: 85
      },
      max_quality: {
        prompt: "You are a career coach helping me write a high-impact performance review self-assessment.\n\n**Role**: [ROLE] | **Level**: [LEVEL] | **Review period**: [PERIOD]\n**My achievements**: [ACHIEVEMENTS]\n**Challenges**: [CHALLENGES]\n**Feedback I've received**: [FEEDBACK]\n**Goals for next period**: [GOALS]\n\n## Opening Summary\n3–4 sentences capturing overall impact and growth. Set the frame for what follows.\n\n## Key Achievements (STAR format)\nFor each major achievement: Situation, Task, Action, Result (measurable outcome).\n\n## Impact Beyond My Role\nCross-functional contributions, mentorship, process improvements, cultural contributions.\n\n## Growth & Development\nSkills developed, feedback acted on, growth relative to level expectations.\n\n## Areas for Development\n1–2 honest growth areas framed as forward-looking investments.\n\n## Goals for Next Period\nSMART goals tied to team/company priorities. Show ambition within realistic reach.",
        token_estimate: 196
      }
    }
  },

  // ── General Purpose ───────────────────────────────────────────────
  {
    id: "explain-eli5",
    title: "Explain Like I'm 5 (ELI5)",
    category: "General Purpose",
    tags: ["explanation", "learning", "simplification", "teaching", "general"],
    featured: false,
    description: "Explain any complex concept using simple language, relatable analogies, and progressive depth.",
    model_notes: {
      "gpt-5.4": "Excellent at intuitive analogies. Lean is often enough for clear concepts.",
      "claude-sonnet-4-6": "Strong at layered explanations. Lean works well — Claude's explanations are naturally clear.",
      "claude-opus-4-6": "Max quality for concepts requiring deep analogical reasoning and misconception correction.",
      "gemini-3.1-pro": "Balanced recommended. Good at visual and narrative explanations.",
      "grok-4": "Lean and balanced both work well. Approachable and engaging.",
      "llama-4-scout": "Balanced recommended. Lean can miss helpful analogies.",
      "mistral-large-3": "Balanced is the sweet spot. Clear and well-structured.",
      "o1": "Lean is sufficient — o1's reasoning naturally produces clear explanations."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 5, balanced: 5, max_quality: 5, best: "lean" },
      "claude-sonnet-4-6": { lean: 5, balanced: 5, max_quality: 4, best: "lean" },
      "claude-opus-4-6":   { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "gemini-3.1-pro":    { lean: 4, balanced: 5, max_quality: 4, best: "balanced" },
      "grok-4":            { lean: 4, balanced: 4, max_quality: 4, best: "lean" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 5, balanced: 4, max_quality: 4, best: "lean" }
    },
    variants: {
      lean: {
        prompt: "Explain [CONCEPT] like I'm 5 years old. Use a simple analogy.",
        token_estimate: 14
      },
      balanced: {
        prompt: "Explain [CONCEPT] in simple terms.\n\n1. **Simple version**: Explain it to a curious 10-year-old using one everyday analogy.\n2. **A bit deeper**: Add one level of nuance — what the simple version glosses over.\n3. **Common misconception**: What do most people get wrong about this?\n\nAvoid jargon unless you immediately define it.",
        token_estimate: 64
      },
      max_quality: {
        prompt: "You are an expert at making complex ideas clear. Explain [CONCEPT] at three levels of depth.\n\n**Audience starting point**: [AUDIENCE]\n\n## Level 1 — Five-year-old version\nThe absolute core idea using a concrete, everyday analogy. No jargon.\n\n## Level 2 — Curious adult version\nBuild on the analogy. Add the key mechanism or logic. Introduce 2–3 important terms, each defined immediately.\n\n## Level 3 — Informed non-expert version\nWhere does the simple analogy break down? What's the full picture? What's still debated or uncertain?\n\n## Why it matters\nOne paragraph: why should someone care about this? What does understanding it unlock?\n\n## Common misconceptions\nTop 2 things people get wrong, and why.",
        token_estimate: 160
      }
    }
  },

  {
    id: "give-feedback",
    title: "Give Constructive Feedback",
    category: "General Purpose",
    tags: ["feedback", "communication", "writing", "review", "professional growth"],
    featured: false,
    description: "Deliver honest, specific, actionable feedback on any work or situation — kind but not vague.",
    model_notes: {
      "gpt-5.4": "Excellent at balanced, specific feedback. Balanced is ideal for most cases.",
      "claude-sonnet-4-6": "Strong at empathetic yet direct feedback. Lean works for clear-cut situations.",
      "claude-opus-4-6": "Max quality for sensitive feedback requiring careful framing and nuance.",
      "gemini-3.1-pro": "Balanced recommended. Good at structured SBI-format feedback.",
      "grok-4": "Balanced works well. Direct and practical.",
      "llama-4-scout": "Balanced recommended. Lean can be too brief for meaningful feedback.",
      "mistral-large-3": "Balanced is the sweet spot. Professional and structured.",
      "o1": "Lean is sufficient for clear feedback. Max quality for complex interpersonal situations."
    },
    benchmarks: {
      "gpt-5.4":           { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-sonnet-4-6": { lean: 4, balanced: 5, max_quality: 5, best: "balanced" },
      "claude-opus-4-6":   { lean: 3, balanced: 4, max_quality: 5, best: "max_quality" },
      "gemini-3.1-pro":    { lean: 3, balanced: 5, max_quality: 4, best: "balanced" },
      "grok-4":            { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "llama-4-scout":     { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "mistral-large-3":   { lean: 3, balanced: 4, max_quality: 4, best: "balanced" },
      "o1":                { lean: 4, balanced: 4, max_quality: 4, best: "balanced" }
    },
    variants: {
      lean: {
        prompt: "Give constructive feedback on: [WORK/SITUATION]. Be specific about what works, what doesn't, and how to improve.",
        token_estimate: 22
      },
      balanced: {
        prompt: "Give constructive feedback on the following.\n\n**Context**: [CONTEXT]\n**Work to evaluate**: [WORK/SITUATION]\n\nUse SBI framework:\n- **Situation**: Specific context\n- **Behavior / Observation**: What you observed (factual, not interpretive)\n- **Impact**: The effect it had\n\nThen:\n- **What's working well** (specific, not just 'good job')\n- **What to improve** (with a concrete suggestion for each)\n- **One priority** — if they could only change one thing, what matters most?",
        token_estimate: 98
      },
      max_quality: {
        prompt: "You are a thoughtful mentor delivering feedback that is honest, specific, and kind.\n\n**Context**: [CONTEXT]\n**Work**: [WORK/SITUATION]\n**My relationship to the person**: [RELATIONSHIP]\n**Their experience level**: [LEVEL]\n**Goal of the feedback**: [GOAL]\n\n## Opening\nAcknowledge the effort and set a collaborative tone.\n\n## What's working\nBe specific. Quote or reference the work directly. Explain *why* it works — this reinforces good habits.\n\n## What to improve\nFor each area:\n- What specifically needs to change\n- Why it matters (impact)\n- A concrete suggestion or example of what better looks like\n\n## Priority focus\nIf they can only work on one thing before the next version, what is it and why?\n\n## Closing\nExpress confidence in their ability to improve. Offer availability for questions.",
        token_estimate: 190
      }
    }
  }

];

// Check for duplicate IDs
const existingIds = new Set(data.prompts.map(p => p.id));
const dupes = newPrompts.filter(p => existingIds.has(p.id));
if (dupes.length > 0) {
  console.error('DUPLICATE IDs:', dupes.map(p => p.id));
  process.exit(1);
}

data.prompts = [...data.prompts, ...newPrompts];

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
console.log(`Done. Total prompts: ${data.prompts.length} (+${newPrompts.length})`);
