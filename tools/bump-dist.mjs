#!/usr/bin/env node
/* ============================================================
   bump-dist.mjs — cache-bust the version-stamped asset folder.

   Renames src/dist-<old> -> src/dist-<new> and rewrites every
   hardcoded reference in the top-level HTML files, so browsers are
   forced to fetch fresh CSS/JS (and the JS-resolved Giscus theme +
   @font-face files, which all live inside the folder) on each deploy.

   Run from the repo root:  node tools/bump-dist.mjs
   It stages nothing and commits nothing — the caller (the pre-push
   hook, or you) does `git add -A && git commit`.
   ============================================================ */
import { readdirSync, renameSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROOT = process.cwd();
const SRC = join(ROOT, "src");
// Every top-level page that hardcodes the dist path (see CLAUDE.md).
const HTML_FILES = ["index.html", "blog.html", "post.html"];

function findDistFolder() {
  const dirs = readdirSync(SRC, { withFileTypes: true })
    .filter((d) => d.isDirectory() && /^dist-/.test(d.name))
    .map((d) => d.name);
  if (dirs.length === 0) throw new Error("No src/dist-* folder found.");
  if (dirs.length > 1) throw new Error("Multiple src/dist-* folders found: " + dirs.join(", ") + " — resolve manually.");
  return dirs[0];
}

function nextVersion(oldName) {
  const now = new Date();
  const ymd =
    now.getFullYear().toString() +
    String(now.getMonth() + 1).padStart(2, "0") +
    String(now.getDate()).padStart(2, "0");
  const base = "dist-" + ymd;
  // Same-day re-bump → increment the -N suffix so the name always changes.
  let n = 1;
  const m = oldName.match(new RegExp("^" + base + "-(\\d+)$"));
  if (m) n = parseInt(m[1], 10) + 1;
  let candidate = base + "-" + n;
  while (candidate === oldName) candidate = base + "-" + ++n;
  return candidate;
}

const DRY = process.argv.includes("--dry-run");
const oldName = findDistFolder();
const newName = nextVersion(oldName);

if (DRY) {
  console.log(`[dry-run] would rename ${oldName} -> ${newName} and rewrite references in ${HTML_FILES.join(", ")}`);
  process.exit(0);
}

// 1) rename the folder
renameSync(join(SRC, oldName), join(SRC, newName));

// 2) rewrite every reference (only the unique basename token changes)
let touched = 0;
for (const file of HTML_FILES) {
  const path = join(ROOT, file);
  let html;
  try {
    html = readFileSync(path, "utf8");
  } catch {
    continue; // page may not exist
  }
  if (!html.includes(oldName)) continue;
  const out = html.split(oldName).join(newName);
  writeFileSync(path, out);
  const count = html.split(oldName).length - 1;
  touched += count;
  console.log(`  ${file}: ${count} reference(s) updated`);
}

console.log(`dist bumped: ${oldName} -> ${newName} (${touched} reference(s) total)`);
