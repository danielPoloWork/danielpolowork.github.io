Multi-agent systems look elegant in a diagram and messy in production. After wiring a few of them, the same handful of patterns keep earning their place — and a few keep failing in the same ways.

## Fan-out, then converge

The simplest useful shape is **fan-out / converge**: split a task into independent units, run them concurrently, and merge the results.

- Each unit is blind to the others — good for coverage, bad for consistency.
- The merge step is where the real design lives: dedup, rank, resolve conflicts.

> A barrier is only justified when the next stage genuinely needs *all* prior results at once. Otherwise, pipeline.

## Verify adversarially

A plausible-but-wrong answer is the expensive failure mode. The cheapest insurance is to spawn independent skeptics whose job is to **refute**, and keep a finding only if it survives a majority.

```js
const votes = await Promise.all(
  reviewers.map((r) => r.refute(claim))
);
const survives = votes.filter((v) => !v.refuted).length >= 2;
```

## What actually breaks

1. **Silent truncation** — capping work without saying so reads as "covered everything".
2. **Convergence loops** — dedup against *everything seen*, not just confirmed results.
3. **Context bloat** — agents returning prose instead of structured data.

The pattern that survives is boring on purpose: small units, explicit contracts, and a merge step you can reason about.
