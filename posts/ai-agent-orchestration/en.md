Multi-agent systems are the most over-diagrammed, under-interrogated idea in applied AI today. I want to take the prevailing playbook — fan-out, pipelines, "agents as microservices" — and examine it the way we'd examine any distributed system: by where it breaks under load, not by how clean it looks on a slide.

## Deep dive

The useful primitives are smaller and more boring than the marketing suggests. Three earn their place repeatedly:

- **Fan-out / converge.** Split a task into independent units, run them concurrently, then merge. The units are the easy part; the *merge* is where the real engineering lives — dedup, ranking, conflict resolution. Most failures I see are merge failures dressed up as "the model was wrong."
- **Pipelines over barriers.** A barrier — wait for *all* of stage N before stage N+1 — is only justified when the next stage genuinely needs the full set: a global dedup, an early exit on zero results. Otherwise pipeline each item independently; wall-clock is the slowest single chain, not the sum of the slowest per stage.
- **Adversarial verification.** The expensive failure mode isn't a wrong answer, it's a *plausible* wrong answer. Cheap insurance: spawn independent skeptics whose job is to refute, and keep a finding only if it survives a majority. Diversity of lens beats redundancy of identical reviewers.

Connect this back to distributed systems and the novelty evaporates: agents are unreliable workers with high latency and non-deterministic output. We already know how to build with those — idempotency, explicit contracts, bounded retries, and never trusting a single response.

## Debate

The honest debate isn't "how many agents" — it's **whether you need multiple agents at all**.

- *The orchestration camp* argues decomposition buys coverage and parallelism: many narrow agents, each blind to the others, surface more than one context can hold.
- *The single-model-with-tools camp* argues most "multi-agent" wins are really just *tool use* plus a loop, and that every added agent multiplies coordination cost, latency, and failure surface for diminishing returns.

My position: both are right, at different scales. Below a threshold of task breadth, a single capable model with good tools and a tight loop wins on every axis — cost, latency, debuggability. Above it — when the work genuinely exceeds one context window, or demands independent perspectives that must not contaminate each other — fan-out earns its complexity. The mistake is reaching for a fleet because it's fashionable, not because the task's shape demands it.

## Critique

The typical multi-agent tutorial deserves blunt feedback. Three recurring sins:

1. **Silent truncation as success.** Capping work — top-N, no retry, sampling — then reporting as if everything was covered. If a harness bounds coverage, it must *say so*. Silent caps read as "done" when they aren't.
2. **Convergence loops that never converge.** Dedup against *confirmed* results instead of *everything seen*, so rejected findings reappear every round. The fix is a one-line discipline — dedup against the full seen-set — that almost no tutorial states.
3. **Prose where structured data belongs.** Agents that return paragraphs instead of typed objects turn every downstream step into a parsing problem. Force structured output at the tool boundary and most "agents are flaky" complaints disappear.

The constructive version: treat each agent as a function with a schema, make the orchestrator the only place control flow lives, and verify before you trust.

## Summary

Multi-agent orchestration is distributed systems with a new coat of paint. The patterns that survive production are unglamorous: small units with explicit contracts, pipelines instead of barriers, a merge step you can reason about, and adversarial verification before anything is trusted. Reach for a fleet only when the task's breadth genuinely exceeds one context — and when you do, the hard part was never the agents. It was the merge.
