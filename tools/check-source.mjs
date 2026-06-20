#!/usr/bin/env node
/* ============================================================
   check-source.mjs — guard against re-ingesting a raw source
   into a DUPLICATE post.

   Usage:  node tools/check-source.mjs <raw-file> [<raw-file> ...]

   For each file it prints the content hash (sha256). It then scans
   every posts/<slug>/meta.json for a recorded source hash that
   matches. If any file's hash already belongs to an existing post,
   it prints the collision and exits 1 (so the authoring command must
   stop). Exit 0 means all sources are new — safe to ingest.

   The hash printed here is exactly what goes into the new post's
   meta.json under `sources: [{ file, hash }]`, so the next run can
   detect a re-ingestion even if the raw file is renamed.
   ============================================================ */
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { createHash } from "node:crypto";
import { basename, join } from "node:path";

const files = process.argv.slice(2);
if (files.length === 0) {
  console.error("usage: node tools/check-source.mjs <raw-file> [more...]");
  process.exit(2);
}

const POSTS = "posts";

// Index every known source hash from existing posts: hash -> [paths].
// Posts live at posts/<group>/<slug>/meta.json (group is the year folder), so walk two levels.
const known = new Map();
for (const group of readdirSync(POSTS, { withFileTypes: true })) {
  if (!group.isDirectory()) continue;            // skip index.json, sections.json
  const groupDir = join(POSTS, group.name);
  for (const d of readdirSync(groupDir, { withFileTypes: true })) {
    if (!d.isDirectory()) continue;
    const metaPath = join(groupDir, d.name, "meta.json");
    if (!existsSync(metaPath)) continue;
    let meta;
    try { meta = JSON.parse(readFileSync(metaPath, "utf8")); } catch { continue; }
    const srcs = Array.isArray(meta.sources) ? meta.sources : [];
    for (const s of srcs) {
      if (!s || !s.hash) continue;
      if (!known.has(s.hash)) known.set(s.hash, []);
      known.get(s.hash).push(`${group.name}/${d.name}`);
    }
  }
}

let collision = false;
for (const f of files) {
  let buf;
  try { buf = readFileSync(f); }
  catch { console.log(`ERROR  ${f}\n  cannot read file`); collision = true; continue; }
  const hash = "sha256:" + createHash("sha256").update(buf).digest("hex");
  const hit = known.get(hash);
  if (hit && hit.length) {
    collision = true;
    console.log(`DUPLICATE  ${basename(f)}\n  ${hash}\n  already ingested as post(s): ${hit.join(", ")}`);
  } else {
    console.log(`OK  ${basename(f)}\n  ${hash}`);
  }
}

if (collision) {
  console.log("\n=> Duplicate (or unreadable) source detected. Do NOT create the post.");
  process.exit(1);
}
console.log("\n=> All sources are new. Record these hashes in meta.json `sources`.");
process.exit(0);
