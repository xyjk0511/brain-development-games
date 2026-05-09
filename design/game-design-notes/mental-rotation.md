# mental-rotation Design Note

## Identity

- `gameId`: `mental-rotation`
- Chinese name: 旋转图形
- Domain: 感知觉/空间认知
- Task family: Mental Rotation
- Remake depth: evidence-refactor

## Product Positioning

用户判断旋转后的图形是否与目标相同，训练空间想象和视觉变换判断。

## Mature Task Basis

- Primary paradigm: Mental Rotation task。
- References: PsyToolkit/PEBL mental rotation tasks, local `04-perception-language-arithmetic.md`.
- License boundary: use original shapes/assets; do not copy standardized test items.

## Gameplay Contract

- Start state: target shape and comparison shape shown.
- User action: choose same/different or matching option.
- Feedback: correct answer highlights with rotation cue.
- End condition: fixed trials.
- Result state: accuracy by angle and median RT.

## Trial Generation

- Stimulus pool: original geometric/3D-like shapes.
- Randomization: rotation angle and mirrored distractors.
- Conditions: same, mirrored/different, angle bands.
- Practice/formal separation: low-angle practice.
- Difficulty parameters: `angle`, `shapeComplexity`, `choices`, `timeLimitMs`.

## Scoring

- Accuracy: same/different correctness.
- Error types: `mirror_confusion`, `wrong_angle`, `timeout`.
- Composite score: accuracy and RT by angle.
- Adaptive rule: increase angle/complexity after high accuracy.

## Required Data

- Session summary: accuracy, medianRtMs, hardestAngle.
- Trial fields: shapeId, angle, sameDifferent, response, correct, rtMs.
- Event fields: option selection.
- Adaptive fields: next angle/complexity.

## Visual / UX Direction

Use crisp large shapes, stable comparison layout, and optional animated reveal after answer.

## Clinical / IP Boundary

Allowed: “空间旋转表现”。 Forbidden: clinical spatial ability diagnosis.
