# Contributing to PromptLean

New prompts, better variants, and token-count corrections are all welcome.

## Adding a prompt

Prompts live in `data/prompts.json`. Each entry needs:

- `id` (kebab-case), `title`, `category`, and `tags`
- `description` explaining what the prompt is for
- all three variants: **Lean**, **Balanced**, and **Max Quality**

The three variants are the point of the project. A prompt with only one variant is not yet a PromptLean prompt: Lean should cut the preamble to the minimum that still works, and Max Quality should earn its extra tokens.

## Checks before a PR

- `data/prompts.json` is valid JSON and the site still loads locally (open `index.html`).
- Your prompt was actually run against at least one model, and the description reflects what it did.
- No prompt copied from a paid product or course without attribution. See `ATTRIBUTION.md`.

## License

By contributing you agree that your contribution is licensed under the MIT License.
