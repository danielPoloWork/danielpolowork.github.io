"Clean architecture" is one of those ideas everyone cites and few apply honestly. I want to strip the famous concentric-circles diagram down to its load-bearing claims, defend the two or three that survive contact with a real codebase, and name the parts that are pure ceremony.

## Deep dive

Underneath the rings there is exactly one rule worth memorising: **dependencies point inward, toward stable policy.** Everything else is a consequence.

- **Boundaries** separate what changes for different reasons. The database changes for infrastructure reasons; your pricing rules change for business reasons. Put a seam between them.
- **Dependency direction** is the whole game: the core defines interfaces, the outer layers implement them. Your domain never imports your web framework; the web framework imports your domain.
- **A framework-free core** is the payoff. When business logic has no compile-time knowledge of HTTP, the ORM, or the message bus, it stays testable, portable, and legible for years.

That's it. Three ideas, one of which — direction — implies the other two.

## Debate

The live tension is **purist vs pragmatist**.

- *Purists* put a port and an adapter at every boundary, a mapper between every layer, and a DTO for every crossing. The promise: total decoupling.
- *Pragmatists* counter that each layer of indirection is code to write, read, and debug — and that most apps never swap their database, so the abstraction is insurance against an event that never happens.

My stance: keep the *direction* religiously, ration the *ceremony*. A port is worth it at the edges you actually expect to change or need to fake in tests — the database, third-party APIs, the clock. It is dead weight between two layers that always change together. Architecture is about which seams you pay for, not about maximising seams.

## Critique

The canonical presentation oversells itself, and that's worth saying. The diagram implies you need four concentric rings and a translation step at every boundary; in practice that produces codebases where a one-field change touches six files. The material would be improved by leading with the dependency rule and treating the rings as *one possible illustration*, not a mandate — and by stating, loudly, that indirection has a cost which must be earned. The strongest version of clean architecture is the most ruthless about deleting the abstractions that don't pull their weight.

## Summary

Clean architecture reduces to a single, durable test: **can you replace the database, the framework, or the delivery mechanism without touching the core logic?** If yes, the architecture is clean enough — regardless of how many rings you drew. Keep boundaries where reasons-to-change diverge, point every dependency inward, and treat every mapper and port as a cost you must justify. The discipline is in the direction, not the diagram.
