# trail-making Design Note

## Identity

- `gameId`: `trail-making`
- Chinese name: 顺序寻宝/连线
- Domain: 执行功能/注意力
- Task family: Trail Making Test A/B
- Remake depth: keep-and-polish

## Product Positioning

用户按顺序连接目标点，进阶时在数字/字母或两类符号之间交替，训练视觉搜索和注意转换。

## Mature Task Basis

- Primary paradigm: Trail Making A/B。
- References: jspsych-contrib trail-making, PEBL Trail Making, TMT generators, local `03-executive-planning-reasoning.md`.
- License boundary: do not claim formal TMT equivalence or use protected assessment material.

## Gameplay Contract

- Start state: targets placed on canvas/scene.
- User action: click/tap next target in sequence.
- Feedback: path draws on correct selection; wrong target marks error.
- End condition: final target reached or timeout.
- Result state: completion time, errors, path distance, inter-click intervals.

## Trial Generation

- Stimulus pool: numbers, letters, icons, themed markers.
- Randomization: target positions generated with minimum separation.
- Conditions: Part A sequential, Part B alternating.
- Practice/formal separation: short 1-5 tutorial.
- Difficulty parameters: `targetCount`, `testType`, `minSeparation`, `timeLimitMs`.

## Scoring

- Accuracy: wrong clicks and completion.
- Error types: `wrong_order`, `wrong_set`, `timeout`.
- Composite score: completion, fewer errors, shorter time/path.
- Adaptive rule: add targets or switch to alternating sequence after strong completion.

## Required Data

- Session summary: completionMs, errors, testType, pathDistance.
- Trial fields: targets, clicks, expectedTarget, correct, interClickMs.
- Event fields: click coordinates and target ids.
- Adaptive fields: next target count/test type.

## Visual / UX Direction

Use treasure-map or star-route visuals with large tappable targets and responsive canvas sizing.

## Clinical / IP Boundary

Allowed: “顺序搜索/注意转换任务”。 Forbidden: formal neuropsychological interpretation.
