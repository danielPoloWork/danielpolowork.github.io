/*
 * reindex.mjs — regenerate posts/index.json from per-post meta.json files.
 *
 * Layout: posts/<group>/<slug>/meta.json  — `group` is the year folder (e.g. 2026),
 * `slug` is the post folder. The slug stays the PUBLIC identifier (the ?slug= URL and
 * the Giscus thread key); the year folder is internal organisation only. Each index
 * entry therefore carries both `slug` (public, must be unique across all years) and
 * `path` (on-disk location relative to posts/, e.g. "2026/<slug>") so the client can
 * resolve the folder without the year leaking into the URL.
 *
 * Output (generated, do NOT hand-edit): posts/index.json  →  { "posts": [ ...sorted ] }
 * The client (blog.js + post.js) reads the single aggregated index.json.
 *
 * Zero dependencies (Node built-ins only). Run:  node tools/reindex.mjs
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const POSTS_DIR = "posts";

const posts = [];
for (const group of readdirSync(POSTS_DIR, { withFileTypes: true })) {
  if (!group.isDirectory()) continue;            // skip index.json, sections.json
  const groupDir = join(POSTS_DIR, group.name);
  for (const d of readdirSync(groupDir, { withFileTypes: true })) {
    if (!d.isDirectory()) continue;
    const file = join(groupDir, d.name, "meta.json");
    if (!existsSync(file)) continue;
    const meta = JSON.parse(readFileSync(file, "utf8"));
    delete meta.slug;    // slug is authoritative from the folder name
    delete meta.sources; // provenance is for the dedup guard only — keep it out of the public index
    posts.push({ slug: d.name, path: `${group.name}/${d.name}`, ...meta });
  }
}

// The slug is the public id (URL + Giscus thread): it must be unique across every year.
const seen = new Map();
for (const p of posts) {
  if (seen.has(p.slug)) {
    console.error(`reindex: DUPLICATE slug "${p.slug}" — at ${p.path} and ${seen.get(p.slug)}. Slugs must be unique across years.`);
    process.exit(1);
  }
  seen.set(p.slug, p.path);
}

posts.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)); // date desc

writeFileSync(join(POSTS_DIR, "index.json"), JSON.stringify({ posts }, null, 2) + "\n");
console.log(`reindex: ${posts.length} posts -> ${join(POSTS_DIR, "index.json")}`);
posts.forEach((p) => console.log(`  ${p.date}  ${p.path}`));
