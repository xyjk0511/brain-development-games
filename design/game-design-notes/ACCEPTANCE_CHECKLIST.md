# Per-game Acceptance Checklist

Use this checklist before marking any redesigned game complete.

## Design Evidence

- [ ] Design note exists under `design/game-design-notes/<gameId>.md`.
- [ ] Design note names the mature task family and cognitive domain.
- [ ] Design note lists at least one reliable source: open-source implementation, official task library, paper/article, or algorithm reference.
- [ ] License boundary is stated, especially for GPL/AGPL/no-license sources.
- [ ] Clinical/IP boundary avoids diagnosis, treatment, protected commercial test equivalence, and copied Lumosity branding.

## Gameplay

- [ ] Game URL remains stable at `public/playable-games/<gameId>/index.html`.
- [ ] First screen is a usable game/training surface, not a marketing page.
- [ ] Instructions are concise and task-specific.
- [ ] Practice/tutorial state exists where task complexity needs it.
- [ ] Result state explains score, accuracy/error pattern, and next difficulty.
- [ ] UI uses original cute/theme assets where available and does not look like a bare lab experiment.

## Data

- [ ] `window.CognitiveGameRecorder.record(gameId, session)` is called on completion.
- [ ] Session includes `gameId`, `domain`, `taskFamily`, `mode`, `level`, `startedAt`, `completedAt`, `summary`, `trials`, `events`, and `adaptive`.
- [ ] Trial records include enough fields to explain score and difficulty.
- [ ] Errors are typed, not only counted.
- [ ] Adaptive recommendation includes previous/recommended level and reason.

## Verification

- [ ] `npm run build` passes.
- [ ] `npm test -- --run` passes or the failure is unrelated and documented.
- [ ] `npm run smoke:playables -- --games=<gameId>` passes.
- [ ] A sample completed session passes `npm run audit:records -- <records.json>`.
- [ ] Browser check confirms nonblank UI, stable layout, no obvious text overlap, and usable controls on desktop/mobile widths.
