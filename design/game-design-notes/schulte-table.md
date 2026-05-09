# schulte-table Design Note

## Identity

- `gameId`: `schulte-table`
- Chinese name: 舒尔特方格/顺序搜索
- Domain: 注意力
- Task family: Schulte Table, Visual Scanning
- Remake depth: keep-and-polish

## Product Positioning

用户按顺序点击散布在网格中的数字，训练视觉扫描、注意广度和顺序搜索速度。

## Mature Task Basis

- Primary paradigm: Schulte Table visual scanning。
- Related paradigms: Trail Making A as nearby sequence-search task.
- Open-source/task-library references: freefocusgames Schulte Table, reaction-trainer style metrics, jsPsych button/grid response patterns.
- Paper/article/algorithm references: visual scanning/attention breadth literature; local report `01-attention-search-inhibition.md`.
- License boundary: use conceptual parameters; do not copy AGPL code unless accepting obligations.

## Gameplay Contract

- Start state: generated numbered grid.
- User action: click numbers in ascending order.
- Feedback: correct cell locks/highlights; wrong click shakes softly and increments error.
- End condition: final number clicked or time limit.
- Result state: completion time, errors, grid size, recommended next level.

## Trial Generation

- Stimulus pool: numeric labels.
- Randomization: shuffled cell positions.
- Conditions: grid size and optional distractor symbols.
- Practice/formal separation: small 3x3 tutorial.
- Difficulty parameters: `gridSize`, `targetCount`, `cellSize`, `timeLimitMs`.

## Scoring

- Accuracy: wrong clicks and completion.
- Reaction time / completion time: inter-click and total completion time.
- Error types: `wrong_order`, `repeat_click`, `timeout`.
- Composite score: completion success, fewer errors, faster time.
- Adaptive rule: increase grid size or target count after low-error fast completion.

## Required Data

- Session summary: completionMs, wrongClicks, maxNumber, gridSize, score.
- Trial fields: grid layout, click order, nextTarget, correct, rtMs.
- Event fields: click target, expected target, coordinates.
- Adaptive fields: next grid size and reason.

## Visual / UX Direction

Use stable square grid dimensions, large numeric labels, hover/touch states, and a compact progress indicator.

## Clinical / IP Boundary

Allowed: “视觉扫描速度/注意广度训练”。 Forbidden: clinical assessment claims.
