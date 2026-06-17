# raw/ — blog source material

Drop the source files for a blog post here (PDFs, `.txt`, `.md`, notes, exported articles).
The folder is **flat**: when drafting, you tell the agent which files belong to the post.

Then run **`/draft-from-raw`**: the agent reads the chosen sources and synthesises a
trilingual blog post — an English article in a senior-architect-at-a-conference voice with
four sections (Deep dive · Debate · Critique · Summary), plus faithful JA/ZH translations —
and registers it in `posts/index.json`.

These raw inputs stay here (they are not published); only the generated `posts/<slug>/*.md`
and the manifest entry become the live post.
