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
- **slug** — kebab-case → becomes the post folder `posts/<YYYY>/<slug>/`, where `YYYY` is the
  year of the post's **date**. The slug stays the **public identifier** (the `?slug=` URL and the
  Giscus thread key); the year folder is internal organisation only, so the slug must be unique
  across **all** years.
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

## 1.5 Duplicate guard (do this BEFORE drafting anything)
Two checks, both must pass or you STOP and ask the user how to proceed — do not write any file:

1. **Slug collision.** If `posts/<YYYY>/<slug>/` already exists — or the slug is already used
   under **any** year (`posts/*/<slug>/`) — STOP. Ask for a different slug (or explicit
   confirmation to overwrite). Never silently overwrite an existing post; slugs are unique across years.
2. **Source already ingested.** Run `node tools/check-source.mjs <each raw source file>`.
   It hashes each source and compares against the `sources[].hash` recorded in every existing
   `posts/*/*/meta.json`. If it prints `DUPLICATE` (exit 1), the same source already became a
   post (it names which slug) — STOP and tell the user; do not create a near-duplicate.
   If it prints `OK` (exit 0), copy the printed `sha256:…` hashes — they go into the new
   post's `meta.json` `sources` in §5.

This is what makes re-ingestion safe even if a raw file is re-added under a different name.

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

1. **No title heading.** Do NOT start the body with a `# <Title>` — the title lives in
   `meta.json` and is rendered by the page header. The body opens with the theme framing
   below. (A leading H1 is stripped at render time anyway, so it would just be dead text.)
2. **Theme framing** — a short lead (2–4 sentences) placing the piece in the field
   (AI / software development / the progress of the discipline) and naming the sources examined.
3. `## Deep dive` — analyse and connect the ideas across the sources.
4. `## Debate` — a considered debate that lays out different perspectives on the sources.
5. `## Critique` — an expert review of the sources with constructive feedback to improve the material.
6. `## Summary` — a concise overview capturing the main ideas at a glance.

## 4. Write the files
- `posts/<YYYY>/<slug>/en.md` — the article in English (the structure above; headings in English).
- `posts/<YYYY>/<slug>/ja.md` and `posts/<YYYY>/<slug>/zh.md` — **faithful translations** of the English
  article (same structure; section headings from `sections[].label.ja` / `.zh`). Keep the
  architect voice; translate meaning, not word-for-word.
- Plain markdown only — no YAML frontmatter (metadata lives in `meta.json`).

## 5. Write metadata + regenerate the index
Write `posts/<YYYY>/<slug>/meta.json` — the per-post **source of truth**. Do NOT hand-edit
`posts/index.json`; it is generated.
```json
{ "date": "<date>", "themes": [...],
  "title":   { "en": "...", "ja": "...", "zh": "..." },
  "excerpt": { "en": "...", "ja": "...", "zh": "..." },
  "sources": [ { "file": "<raw filename>", "hash": "sha256:<from check-source.mjs>" } ] }
```
- `title` — a strong title per language, localised. This is the single source of the
  displayed title (rendered by the page header); it must NOT also appear as an H1 in the body.
- `excerpt` — one or two sentences per language capturing the hook (shown in the list + preview).
- `sources` — one entry per raw file consumed, with the exact `sha256:…` printed by
  `check-source.mjs` in §1.5. This is the dedup fingerprint; `reindex.mjs` strips it from the
  public `index.json`, so it stays internal. **Required** — without it the guard can't catch
  a future re-ingestion of the same source.
- The `slug` is the post folder name and `path` (`<YYYY>/<slug>`) is its on-disk location —
  do **not** put either inside `meta.json`; `reindex.mjs` derives both and writes `slug` + `path`
  into the public index (the client resolves the year folder from `path`, so it never hits the URL).

Then regenerate the aggregate the client reads: **`node tools/reindex.mjs`** (rebuilds
`posts/index.json` = `{ posts: [...] }`, sorted by date desc, from every `meta.json`; it walks
`posts/<YYYY>/<slug>/` two levels deep and fails on a duplicate slug across years).

## 6. Verify
- `node tools/reindex.mjs` ran without error.
- `node -e "JSON.parse(require('fs').readFileSync('posts/index.json','utf8'))"` → valid JSON,
  and the new slug appears in `posts[]` with `path` = `<YYYY>/<slug>`.
- Confirm `posts/<YYYY>/<slug>/meta.json` and the three `.md` files exist and contain all four sections.
- Confirm `meta.json` `sources[]` has one `sha256:…` entry per consumed raw file (the dedup guard).

## 7. Clean up the consumed sources
**Only after §4–6 have fully succeeded** (all three `.md` written + manifest valid),
**delete the raw source file(s) that were used for this post**, so `raw/` keeps only
not-yet-ingested material. Safeguards: never delete `raw/README.md`; never delete files
that were not used for this post; if any earlier step failed, delete nothing.

## 8. Report
Report: the slug, the files written, the manifest entry, the themes chosen, which raw
sources were **used and then deleted**, and any **extra guidance** (`$ARGUMENTS`) applied.
Comments are handled site-wide by Giscus (keyed by slug) — no per-post setup needed.

Do **not** commit or push unless the user asks.
