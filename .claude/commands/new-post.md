---
description: Scaffold a trilingual blog post (4 sections) by hand and update posts/index.json
---

Manually scaffold a new post (no raw sources — for source-driven drafting use
`/draft-from-raw`). Posts are rendered client-side; `posts/index.json` is the source of
truth for the list. Every post is one article with four sections; there is no per-post
"type".

## Inputs (ask for any not provided)
- **slug** — kebab-case → `posts/<YYYY>/<slug>/` (`YYYY` = year of the post's **date**). The slug
  stays the public id (`?slug=` URL + Giscus key); the year folder is internal, so the slug must be
  unique across **all** years.
- **date** — `YYYY-MM-DD` (ask the user; never invent — the runtime forbids `new Date()`).
- **themes** — free tags (AI, Software Development, …), shown as-is, not translated.
- **title** / **excerpt** — `{en,ja,zh}`. If the user gives one language, draft the other
  two faithfully and show them for approval.

## Steps
0. **Slug collision check (before writing anything).** If `posts/<YYYY>/<slug>/` already exists —
   or the slug is used under any year (`posts/*/<slug>/`) — STOP and ask for a different slug;
   never silently overwrite an existing post (slugs are unique across years).
1. Create `posts/<YYYY>/<slug>/en.md`, `ja.md`, `zh.md`. Scaffold the four-section template, with
   the headings taken from `posts/sections.json` → `sections[]` (ordered by `order`),
   localised per file (`label.en` / `.ja` / `.zh`). Do NOT put a `# <Title>` at the top —
   the title lives in `meta.json` and is rendered by the page header (a leading H1 is
   stripped at render time). The body opens directly with the theme framing lead:
   ```
   <theme framing lead>

   ## Deep dive
   ## Debate
   ## Critique
   ## Summary
   ```
   (Leave placeholder prose under each heading for the author to fill, or write it if the
   user provides content.)
2. Write `posts/<YYYY>/<slug>/meta.json` (the per-post source of truth — do NOT hand-edit the
   generated `posts/index.json`): `{ date, themes, title:{en,ja,zh}, excerpt:{en,ja,zh} }`.
   The `slug` (folder name) and `path` (`<YYYY>/<slug>`) are not fields — `reindex.mjs` derives
   both into the index.
3. Regenerate the aggregate: `node tools/reindex.mjs` (rebuilds `posts/index.json`).
4. Verify `posts/index.json` is valid JSON (new slug present) and the `meta.json` + three
   `.md` files exist. Report the created files. Comments are handled site-wide by Giscus.

Do **not** commit or push unless the user asks.
