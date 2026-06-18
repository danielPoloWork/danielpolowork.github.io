# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page personal portfolio site for Daniel Polo, served by GitHub Pages at
`danielpolowork.github.io`. It is **plain static HTML/CSS/JS** — there is no build
step, package manager, bundler, test suite, or linter. There is nothing to install
or compile.

- Preview locally by opening `index.html` directly, or serve the folder with any
  static server (e.g. `python -m http.server`). A server is preferable because the
  `@font-face` and `@import` paths and the `localStorage` features behave more like
  production.
- Deploy = commit to `master` and push; GitHub Pages publishes the repo root.

## Layout

- `index.html` — the entire page (nav, hero, stats, about, tech, work, approach,
  exploring, two portfolios, contact, footer). All structure lives here.
- `src/dist-<version>/` — the built assets, **version-stamped per release**:
  - `scripts/i18n.js` — translation dictionaries (`window.I18N`).
  - `scripts/main.js` — all runtime behavior (theme, language, scroll reveal, nav).
  - `styles/app.css` — the design system + all component styles.
  - `styles/foundations/fonts.css` — `@font-face` for the Anthropic brand typefaces.
- `src/assets/` — fonts, logo, photo. `src/screenshots/` — reference images only.

## Two things that bite if you don't know them

### 1. The dist folder is version-stamped, and `index.html` hardcodes the path

The asset folder is named like `src/dist-20265315/` (see recent commits:
`dist-2026.5.31-4`, `-5`, …). On each release the folder is renamed to a new version.
**This rename IS the cache-busting mechanism** — it forces browsers to refetch every
asset, including the ones resolved at runtime (the Giscus theme CSS, loaded by `post.js`
relative to the `app.css` link, and the `@font-face` files `@import`ed by `app.css`).
The path is hardcoded in **`index.html`, `blog.html`, and `post.html`** — each references
`app.css`, `blog.css`, `i18n.js`, `main.js` and (post.html) the vendored libs + `post.js`
from this folder. All of these must move together when the version changes.

If a style or script change "doesn't show up," it's almost always stale cache because the
version wasn't bumped — check that these paths point at the folder you actually edited.

**Don't bump by hand — use the tooling:**

- `node tools/bump-dist.mjs` renames `src/dist-<old>` → `src/dist-<new>` (date-stamped,
  e.g. `dist-20260618-1`) and rewrites every reference in the three HTML files atomically.
  `--dry-run` prints what it would do. It does not stage/commit — you do.
- A **`pre-push` hook** (`tools/hooks/pre-push`) enforces this automatically: if the
  commits you push change `src/dist/**` but the version wasn't bumped vs `origin/master`,
  it runs the bump, commits it, and aborts the push — re-run the push to include it.
  Because PRs are merged on GitHub (no local `git push origin master`), the bump must ride
  **in the feature branch's PR**, which is exactly when this hook fires.
  Activate once per clone: `git config core.hooksPath tools/hooks`.

### 2. i18n.js is the source of truth for user-visible text, not index.html

`main.js` runs `applyLang()` on load: for every element with a `data-i18n` /
`data-i18n-html` attribute it overwrites the element's text/HTML from the active
language dictionary in `i18n.js`. The English copy hardcoded in `index.html` is just
a fallback shown before/if JS runs — at runtime the `en` dict in `i18n.js` wins.

Consequences when editing copy:

- To change displayed text on an i18n-keyed element, edit **`i18n.js`** (the `en`
  entry), not the inline HTML. They can and do drift (e.g. the P-03 project text).
- `i18n.js` has three parallel dictionaries: `en`, `ja`, `zh`. Adding a new
  `data-i18n` key to `index.html` means adding it to **all three** dictionaries, or
  that element will show its hardcoded fallback in the non-English languages.
- `data-i18n` sets `textContent` (plain text); `data-i18n-html` sets `innerHTML`
  (markup like `<strong>`, `<br>` allowed). Match the attribute to the content.

## Portfolio cards are synced from GitHub repos (don't hand-edit between markers)

Three portfolio sections render cards generated from the owner's GitHub repos by naming
convention, pre-rendered as **static HTML at author-time** (no client-side fetch, no CI):

| repo prefix | section (`data-repo-prefix`) | marker id |
|-------------|------------------------------|-----------|
| `pbr-` | `#portfolio` (Samples)        | `pbr` |
| `egl-` | `#portfolio-lib` (Libraries)  | `egl` |
| `pgs-` | `#portfolio-pro` (Professional) | `pgs` |

The `/sync-portfolio` command (`.claude/commands/sync-portfolio.md`) is the only thing
that should write these regions. It lists repos via `gh`, then rewrites:

- in `index.html`, the HTML between `<!-- repos:<id>:start -->` and `<!-- repos:<id>:end -->`;
- in `i18n.js`, the `"repo.<name>.desc"` keys between `// repos:start` and `// repos:end`
  inside **each** language object.

Anything inside those markers is regenerated and will be overwritten — edit the source
repo (or its optional `.portfolio.json`) instead, then re-run the command. Card titles and
tags are inline-only; only the description is translated (one `repo.<name>.desc` key per
language). Empty buckets fall back to a `.repo--soon` placeholder card. The Mycelium (08)
and Challenge (09) sections are **not** managed by the sync — they're hand-authored.

## Blog (client-side rendered, trilingual)

Posts are Markdown in `posts/`, rendered **in the browser** with vendored `marked` +
`DOMPurify` (no build step, no CI). Pages:

- `blog.html` — list with search / type+theme filters / date sort (`blog.js` → `#postList`).
- `post.html?slug=<slug>` — single post; `post.js` fetches the body and renders it.
- The homepage shows the latest 3 in a preview band (`blog.js` → `#blogPreview`).

Data model — metadata is **co-located per post**, and `posts/index.json` is a **generated
aggregate** (a browser can't list a dir, so the client reads one file):
- `posts/<slug>/meta.json` — the per-post **source of truth**: `{ date (YYYY-MM-DD),
  themes (free tags, shown as-is, not translated), title:{en,ja,zh}, excerpt:{en,ja,zh} }`.
  The `slug` is the folder name (not a field). `post.js` fetches this file directly.
- `posts/<slug>/en.md`, `ja.md`, `zh.md` — the body per language (plain markdown, no
  frontmatter). Every post is ONE article with four sections (Deep dive / Debate / Critique /
  Summary). The language switcher re-renders the body; missing languages fall back to `en`.
- `posts/sections.json` — the four section definitions `{ id, order, label:{en,ja,zh} }`,
  used by the authoring commands as the localised section headings. There is **no per-post
  "type" and no type filter** — the list filters by **theme** + search + date.
- `posts/index.json` — **generated, do not hand-edit**: `{ posts: [...] }` sorted by date
  desc, built from every `meta.json` by **`node tools/reindex.mjs`**. `blog.js` (list +
  homepage preview) reads this single aggregate. Re-run reindex after editing any `meta.json`
  by hand (the `/draft-from-raw` and `/new-post` commands run it for you).

To create a post (no build either way):
- `/draft-from-raw [extra guidance]` — read source files from `raw/`, synthesise a
  four-section article (English architect voice + faithful JA/ZH translations), update the
  manifest, then delete the consumed `raw/` source(s). Bare run follows the command's rules;
  any text after the command (`$ARGUMENTS`) is extra authoring direction layered on top.
  This is the main authoring path.
- `/new-post` — scaffold a post by hand (same four-section structure) + update the manifest.

**Duplicate guard.** Both commands STOP before writing if `posts/<slug>/` already exists (no
silent overwrite). `/draft-from-raw` additionally runs `node tools/check-source.mjs <raw file…>`,
which sha256-hashes each source and compares it against the `sources[].hash` recorded in every
existing `meta.json`; a match means that source was already turned into a post, so it refuses to
create a near-duplicate. Each post records its provenance in `meta.json` as
`"sources": [{ "file", "hash" }]` — this is the fingerprint that survives a raw file being
renamed and re-added. `reindex.mjs` strips `sources` from the public `index.json`, so it stays
internal. (Posts created before this rule have no `sources`; they simply aren't dedup-protected
retroactively.)

Blog UI strings live in `i18n.js` under `blog.*` / `nav.blog` / `footer.home` (all three
languages, like the rest of the chrome). Article + list styling is in
`styles/blog.css` (loaded on `index.html`, `blog.html`, `post.html`). The vendored libs
live in `scripts/vendor/` and, like all dist assets, move with the version-stamped folder.

Comments use **Giscus** (GitHub Discussions, GitHub login). `post.js` (`mountGiscus()`)
injects the widget into `#giscus` in `post.html` with `data-mapping="specific"` and
`data-term` = the post slug — one thread per post, language-independent — and keeps Giscus'
language and theme synced to the site via `postMessage` (a `MutationObserver` on `<html>`).
Reactions are **disabled** (`data-reactions-enabled="0"`). The theme is **not** a Giscus
preset: `giscusThemeUrl()` passes the absolute URL of `styles/giscus-light.css` /
`giscus-dark.css` (custom themes mapped to the site's `app.css` tokens; resolved next to
`app.css` so they track the version-stamped dist folder). Over non-https/localhost it falls
back to the `light`/`dark` presets (the https Giscus iframe can't load a localhost stylesheet).
Repo/category IDs live in `mountGiscus()`. Requires Discussions enabled + the giscus app
installed on the repo (already done).

## Conventions

- **Theming:** `main.js` toggles `data-theme="light|dark"` on `<html>`; `app.css`
  defines all colors as CSS custom properties under `:root`/`[data-theme="dark"]`.
  Style with those variables (`var(--accent)`, `var(--bg)`, …) — never hardcode
  colors. Theme and language choices persist in `localStorage` (`dp-theme`,
  `dp-lang`).
- **Scroll animations:** add the `reveal` class (optionally `d1`/`d2`/`d3` for
  stagger) to animate an element in via the `IntersectionObserver` in `main.js`.
- **Architecture diagrams** in the Work section are hand-authored inline `<svg>`
  with `.node`/`.node-accent`/`.edge`/`.group-box` classes styled in `app.css`.
  Edit coordinates and paths by hand; there is no diagram generator.
- `main.js` is a vanilla IIFE in ES5 style (`var`, no modules/frameworks). Keep new
  behavior consistent with that.
