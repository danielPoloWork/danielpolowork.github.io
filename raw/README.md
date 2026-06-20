# raw/ — blog source material

Drop the source files for a blog post here (PDFs, `.txt`, `.md`, notes, exported articles).
The folder is **flat**: when drafting, you tell the agent which files belong to the post.

Then run **`/draft-from-raw`**: the agent reads the chosen sources and synthesises a
trilingual blog post — an English article in a senior-architect-at-a-conference voice with
four sections (Deep dive · Debate · Critique · Summary), plus faithful JA/ZH translations —
and registers it in `posts/index.json`.

Raw inputs are never published. Once `/draft-from-raw` has successfully generated the post
and updated the manifest, it **deletes the consumed source file(s)** from `raw/`, so this
folder only ever holds material that hasn't been ingested yet. (`raw/README.md` is kept.)

❯ **`/draft-from-raw e valuta anche il confronto dei seguenti argomenti se necessario:`**