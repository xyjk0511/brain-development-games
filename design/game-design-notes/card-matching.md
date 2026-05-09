# card-matching Design Note

## Identity

- `gameId`: `card-matching`
- Chinese name: 翻牌配对
- Domain: 记忆力
- Task family: Paired Associate / Concentration Memory
- Remake depth: evidence-refactor

## Product Positioning

用户翻开卡片寻找成对图案，训练视觉配对记忆和策略性搜索。

## Mature Task Basis

- Primary paradigm: concentration/card matching memory task。
- Related paradigms: paired-associate learning.
- References: common open memory-game implementations as UI references, jsPsych response/data patterns, local `02-memory-working-spatial.md`.
- License boundary: only reuse permissive code; no-license demos are idea references only.

## Gameplay Contract

- Start state: shuffled paired cards face down.
- User action: flip two cards per attempt.
- Feedback: matched pairs remain; mismatches flip back after delay.
- End condition: all pairs matched or move/time limit.
- Result state: flips, mismatches, completion time, pair count.

## Trial Generation

- Stimulus pool: original icon pairs.
- Randomization: Fisher-Yates shuffle of card positions.
- Conditions: pair count, distractor similarity.
- Practice/formal separation: small pair-count practice.
- Difficulty parameters: `pairCount`, `previewMs`, `mismatchDelayMs`, `similarity`.

## Scoring

- Accuracy: matches per attempt.
- Reaction/completion time: total completionMs and flip intervals.
- Error types: `mismatch`, `repeat_flip`, `timeout`.
- Adaptive rule: increase pair count after low mismatch and fast completion.

## Required Data

- Session summary: pairCount, flips, mismatches, completionMs, score.
- Trial fields: card layout, firstCard, secondCard, matched, rtMs.
- Event fields: card flips.
- Adaptive fields: next pair count and preview settings.

## Visual / UX Direction

Use cute icon cards with stable card dimensions, flip animation, and no layout shift.

## Clinical / IP Boundary

Allowed: “配对记忆训练”。 Forbidden: diagnostic or treatment language.
