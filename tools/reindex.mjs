/*
 * reindex.mjs — regenerate posts/index.json from per-post meta.json files.
 *
 * Source of truth: posts/<slug>/meta.json  (authored, co-located with the post body).
 * Output (generated, do NOT hand-edit): posts/index.json  →  { "posts": [ ...sorted ] }
 * The client (blog.js) reads the single aggregated index.json in one fetch.
 *
 * Zero dependencies (Node built-ins only). Run:  node tools/reindex.mjs
 */
import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";

const POSTS_DIR = "posts";

const posts = readdirSync(POSTS_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => ({ slug: d.name, file: join(POSTS_DIR, d.name, "meta.json") }))
  .filter((p) => existsSync(p.file))
  .map((p) => {
    const meta = JSON.parse(readFileSync(p.file, "utf8"));
    delete meta.slug;    // slug is authoritative from the folder name
    delete meta.sources; // provenance is for the dedup guard only — keep it out of the public index
    return { slug: p.slug, ...meta };
  })
  .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0)); // date desc

writeFileSync(join(POSTS_DIR, "index.json"), JSON.stringify({ posts }, null, 2) + "\n");
console.log(`reindex: ${posts.length} posts -> ${join(POSTS_DIR, "index.json")}`);
posts.forEach((p) => console.log(`  ${p.date}  ${p.slug}`));
