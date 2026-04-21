// Run: node scripts/add-source-fields.js
// Patches sourced prompts with proper attribution metadata
const fs = require('fs');
const path = require('path');

const dataPath = path.join(__dirname, '..', 'data', 'prompts.json');
const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));

const SOURCES = {
  // CC0 1.0 Universal — prompt content is public domain
  'awesome-chatgpt-prompts': {
    name: 'awesome-chatgpt-prompts',
    author: 'Fatih Kadir Akın and contributors',
    url: 'https://github.com/f/awesome-chatgpt-prompts',
    license: 'CC0 1.0 Universal',
    license_url: 'https://github.com/f/awesome-chatgpt-prompts/blob/main/LICENSE',
    note: 'Prompt content is CC0 (public domain). Adapted and expanded with PromptLean variants.'
  },
  // MIT License — © Alexander Bilzerian 2025
  'LLM-Prompt-Library': {
    name: 'LLM-Prompt-Library',
    author: 'Alexander Bilzerian',
    url: 'https://github.com/abilzerian/LLM-Prompt-Library',
    license: 'MIT',
    license_url: 'https://github.com/abilzerian/LLM-Prompt-Library/blob/main/LICENSE',
    note: 'MIT License © 2025 Alexander Bilzerian. Adapted and expanded with PromptLean variants.'
  }
};

// Map prompt IDs to their source
const promptSources = {
  'fallacy-finder':         SOURCES['awesome-chatgpt-prompts'],
  'debate-both-sides':      SOURCES['awesome-chatgpt-prompts'],
  'etymologist':            SOURCES['awesome-chatgpt-prompts'],
  'statistician':           SOURCES['awesome-chatgpt-prompts'],
  'startup-idea-generator': SOURCES['awesome-chatgpt-prompts'],
  'financial-planner':      SOURCES['awesome-chatgpt-prompts'],
  'devrel-consultant':      SOURCES['awesome-chatgpt-prompts'],
  'cybersecurity-advisor':  SOURCES['awesome-chatgpt-prompts'],
  'it-solution-architect':  SOURCES['awesome-chatgpt-prompts'],
  'data-viz-advisor':       SOURCES['awesome-chatgpt-prompts'],
  'ux-ui-reviewer':         SOURCES['awesome-chatgpt-prompts'],
  'contract-reviewer':      SOURCES['LLM-Prompt-Library'],
  'annual-report-analyst':  SOURCES['LLM-Prompt-Library'],
  'ad-copy-generator':      SOURCES['LLM-Prompt-Library'],
  'social-media-optimizer': SOURCES['LLM-Prompt-Library'],
  'excel-formula-specialist': SOURCES['LLM-Prompt-Library'],
  'text-to-json':           SOURCES['LLM-Prompt-Library'],
  'venture-capital-analyst':SOURCES['LLM-Prompt-Library'],
  'software-project-planner': {
    name: 'Open Source Prompt Library (community)',
    author: 'BigDog1400 and contributors',
    url: 'https://gist.github.com/BigDog1400/bd81f31fe680cc83deb6dab4ad9e6c67',
    license: 'MIT',
    license_url: null,
    note: 'Inspired by and adapted from a community GitHub Gist. Expanded with PromptLean variants.'
  }
};

let patched = 0;
for (const prompt of data.prompts) {
  if (promptSources[prompt.id]) {
    prompt.source = promptSources[prompt.id];
    patched++;
  }
}

fs.writeFileSync(dataPath, JSON.stringify(data, null, 2), 'utf8');
console.log(`Patched ${patched} prompts with source attribution.`);
