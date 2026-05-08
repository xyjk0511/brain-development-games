# Evidence-based adaptive implementation notes

This app uses a transparent rule-based adaptive staircase for the first implementation of adaptive difficulty.

## Why this rule set

The default target band is centered around ~85% successful performance because `design/adaptive-parameters-literature.md` records the 85% optimal-learning heuristic together with classic adaptive staircase and dynamic difficulty adjustment references. This value is a starting heuristic for practice tasks, not a clinical threshold and not a guarantee of broad transfer.

## What the engine does

- Inputs: level, accuracy, reaction/completion timing, errors, hints, retries, success/failure streaks, and timeout.
- Outputs: next level, direction (`升高` / `保持` / `降低`), low-pressure Chinese reason, and support adjustments.
- Safety: changes by at most one level per completed run.
- Beginner protection: levels 1-3 keep the visible level stable and reduce pressure before lowering level.

## Task-family mapping

The canonical 17 games are mapped in `src/lib/gameParameters.ts` with cognitive task families such as visual search, sequence memory, Strong Memory position memory, matching memory, Go/No-Go, Schulte table, N-back, mental rotation, Flanker-style inhibition, Trail Making, water-jug planning, and quick math. Strong Memory is the only canonical entry with a 60-level standalone playable contract; most other registry games use the standard 10-level React flow.

## Claim boundary

User-facing copy must describe practice, training, challenge, attention, memory, planning, or problem solving. It must not claim diagnosis, treatment, cure, disease improvement, or guaranteed IQ improvement.
