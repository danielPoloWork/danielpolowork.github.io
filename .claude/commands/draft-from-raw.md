---
description: Turn raw sources into a trilingual blog post (4-section analysis) + update the manifest
argument-hint: "[extra guidance — angle, emphasis, tone, length…]"
---

Read raw source material from `raw/`, synthesise it into a blog article, write it as
trilingual markdown, and register it in `posts/index.json`. Posts are rendered
client-side; the manifest is the source of truth for the list.

**Usage:** `/draft-from-raw <optional extra guidance>` — anything typed after the command
is extra authoring direction (see below).

## 1. Inputs (ask for any not provided)
- **sources** — which files in `raw/` to use for THIS post (the folder is flat; the user
  names the files, e.g. `raw/transformer-scaling.pdf`, `raw/notes.md`). Read each one
  (text, markdown, and PDFs are supported). Do not invent material that is not in them.
- **slug** — kebab-case, unique → becomes `posts/<slug>/`.
- **date** — `YYYY-MM-DD` (ask the user; the runtime forbids `new Date()`, so never guess).
- **themes** — free tags from the blog's domain (AI, software development, and the broader
  world of building and advancing the field). Infer 1–3 from the sources and confirm.
- **extra guidance** — `$ARGUMENTS`: free-form instructions the user typed after the
  command (e.g. angle to take, points to stress or avoid, tone, target length, a source to
  foreground, a thesis to argue). Treat it as authoring direction layered **on top of** the
  defaults in §2–3, and apply it consistently across all three languages. It may steer
  focus and framing, but must **not** override the quality/safety bar — no fabrication, stay
  grounded in the sources. If `$ARGUMENTS` is empty, proceed with the defaults. For longer
  briefs, the user can instead keep notes in a `raw/` file and name it as a source.

## 2. Voice & quality bar (this is the point — do not phone it in)
Write the **body in English**, in the voice of a **senior project architect delivering a
conference talk** who is examining the raw sources live. Specifically:
- First-person, declarative, opinionated — a talk, not a summary. Take a defensible stance.
- **Avoid banality.** No filler, no "in today's fast-paced world", no restating the obvious.
- **Seek originality**: surface the non-obvious connection, the tension between sources, the
  second-order implication. Connect the sources to each other and to the wider field.
- **Audience: university-level, researchers, enterprise.** Assume expertise; be precise,
  technically grounded, and willing to be provocative where the evidence supports it.
- Ground every claim in the sources; attribute ideas to the source they came from. Do not
  fabricate data, quotes, or citations.

## 3. Structure of the article
Use this exact shape (the four section headings come from `posts/sections.json` → `sections[]`,
ordered by `order`; use each section's localised `label` as the `##` heading in that
language):

1. `# <Title>` — sharp, specific, original (not "An overview of X").
2. **Theme framing** — a short lead (2–4 sentences) placing the piece in the field
   (AI / software development / the progress of the discipline) and naming the sources examined.
3. `## Deep dive` — analyse and connect the ideas across the sources.
4. `## Debate` — a considered debate that lays out different perspectives on the sources.
5. `## Critique` — an expert review of the sources with constructive feedback to improve the material.
6. `## Summary` — a concise overview capturing the main ideas at a glance.

## 4. Write the files
- `posts/<slug>/en.md` — the article in English (the structure above; headings in English).
- `posts/<slug>/ja.md` and `posts/<slug>/zh.md` — **faithful translations** of the English
  article (same structure; section headings from `sections[].label.ja` / `.zh`). Keep the
  architect voice; translate meaning, not word-for-word.
- Plain markdown only — no YAML frontmatter (metadata lives in `meta.json`).

## 5. Write metadata + regenerate the index
Write `posts/<slug>/meta.json` — the per-post **source of truth**. Do NOT hand-edit
`posts/index.json`; it is generated.
```json
{ "date": "<date>", "themes": [...],
  "title":   { "en": "...", "ja": "...", "zh": "..." },
  "excerpt": { "en": "...", "ja": "...", "zh": "..." } }
```
- `title` — a strong title per language (the H1, localised).
- `excerpt` — one or two sentences per language capturing the hook (shown in the list + preview).
- The `slug` is the folder name — do not put it inside `meta.json`.

Then regenerate the aggregate the client reads: **`node tools/reindex.mjs`** (rebuilds
`posts/index.json` = `{ posts: [...] }`, sorted by date desc, from every `meta.json`).

## 6. Verify
- `node tools/reindex.mjs` ran without error.
- `node -e "JSON.parse(require('fs').readFileSync('posts/index.json','utf8'))"` → valid JSON,
  and the new slug appears in `posts[]`.
- Confirm `posts/<slug>/meta.json` and the three `.md` files exist and contain all four sections.

## 7. Clean up the consumed sources
**Only after §4–6 have fully succeeded** (all three `.md` written + manifest valid),
**delete the raw source file(s) that were used for this post**, so `raw/` keeps only
not-yet-ingested material. Safeguards: never delete `raw/README.md`; never delete files
that were not used for this post; if any earlier step failed, delete nothing.

## 8. Report
Report: the slug, the files written, the manifest entry, the themes chosen, which raw
sources were **used and then deleted**, and any **extra guidance** (`$ARGUMENTS`) applied.
Note that comments remain the inactive Giscus scaffold.

Do **not** commit or push unless the user asks.
