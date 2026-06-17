---
description: Scaffold a trilingual blog post (4 sections) by hand and update posts/index.json
---

Manually scaffold a new post (no raw sources — for source-driven drafting use
`/draft-from-raw`). Posts are rendered client-side; `posts/index.json` is the source of
truth for the list. Every post is one article with four sections; there is no per-post
"type".

## Inputs (ask for any not provided)
- **slug** — kebab-case, unique → `posts/<slug>/`.
- **date** — `YYYY-MM-DD` (ask the user; never invent — the runtime forbids `new Date()`).
- **themes** — free tags (AI, Software Development, …), shown as-is, not translated.
- **title** / **excerpt** — `{en,ja,zh}`. If the user gives one language, draft the other
  two faithfully and show them for approval.

## Steps
1. Create `posts/<slug>/en.md`, `ja.md`, `zh.md`. Scaffold the four-section template, with
   the headings taken from `posts/index.json` → `sections[]` (ordered by `order`), localised
   per file (`label.en` / `.ja` / `.zh`):
   ```
   # <Title>

   <theme framing lead>

   ## Deep dive
   ## Debate
   ## Critique
   ## Summary
   ```
   (Leave placeholder prose under each heading for the author to fill, or write it if the
   user provides content.)
2. Read `posts/index.json`; append (or update if the slug exists) an entry in `posts[]`:
   `{ slug, date, themes, title:{en,ja,zh}, excerpt:{en,ja,zh} }`. Keep `posts[]` sorted by
   `date` descending. Leave `sections[]` untouched.
3. Verify `posts/index.json` is valid JSON and the three `.md` files exist.
4. Report the created files + manifest entry. Comments remain the inactive Giscus scaffold.

Do **not** commit or push unless the user asks.
