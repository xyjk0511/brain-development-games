# strong-memory Design Note

## Identity

- `gameId`: `strong-memory`
- Chinese name: 强力记忆
- Domain: 记忆力
- Task family: Corsi Block / Spatial Span / Spatial Recall
- Remake depth: evidence-refactor

## Product Positioning

用户观察一组位置短暂亮起，然后按记忆点击对应位置。保留“强力记忆”的成熟主题和可爱素材，把底层规则对齐空间记忆任务。

## Mature Task Basis

- Primary paradigm: Corsi Block-tapping / spatial recall。
- Related paradigms: Memory Matrix, spatial span.
- References: jspsych-contrib Corsi blocks, PsyToolkit Corsi, Corsi Blocks Task with jsPsych article, local `02-memory-working-spatial.md`.
- License boundary: permissive/plugin references可参考字段；不复制商业 Memory Matrix 名称/UI。

## Gameplay Contract

- Start state: show grid/scene with hidden target positions.
- User action: after preview, click remembered positions or sequence.
- Feedback: hit/miss/extra click summary.
- End condition: fixed trials or adaptive span failure rule.
- Result state: span/accuracy/miss and false alarm counts.

## Trial Generation

- Stimulus pool: grid cells or scene anchors.
- Randomization: random targets with minimum separation if needed.
- Conditions: simultaneous recall or sequential recall.
- Practice/formal separation: guided low-span examples.
- Difficulty parameters: `gridSize`, `targetCount`, `previewMs`, `sequenceLength`.

## Scoring

- Accuracy: target set or sequence match.
- Error types: `miss`, `false_alarm`, `order_error`, `timeout`.
- Composite score: accuracy first, span and speed second.
- Adaptive rule: increase target count/span after perfect trials; reduce after multiple misses/false alarms.

## Required Data

- Session summary: span, accuracy, hits, misses, falseAlarms, medianRtMs.
- Trial fields: targets, clicked, sequence, correct, rtMs, difficultyParams.
- Event fields: preview start/end, cell clicks.
- Adaptive fields: next target count/grid size/preview duration.

## Visual / UX Direction

Use existing “强力记忆” product-grade materials as the model for other games: polished assets, clear preview phase, answer phase, and result state.

## Clinical / IP Boundary

Allowed: “空间记忆/工作记忆表现”。 Forbidden: disease or IQ improvement claims.
