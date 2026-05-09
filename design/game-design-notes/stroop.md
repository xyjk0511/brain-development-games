# stroop Design Note

## Identity

- `gameId`: `stroop`
- Chinese name: 幻色文字
- Domain: 执行功能/注意力
- Task family: Stroop Task
- Remake depth: keep-and-polish

## Product Positioning

用户根据文字颜色作答，而不是读取字义，用游戏化颜色卡片训练反应抑制和冲突控制。

## Mature Task Basis

- Primary paradigm: Stroop color-word interference。
- Related paradigms: congruent/incongruent/neutral trials.
- Open-source/task-library references: PsyToolkit Stroop, jsPsych keyboard/button response examples, cognitive-arcade/reaction-trainer Stroop variants.
- Paper/article/algorithm references: Stroop interference literature; local report `01-attention-search-inhibition.md`.
- License boundary: task paradigm is classic; do not copy proprietary materials or non-permissive code.

## Gameplay Contract

- Start state: show a colored word card and response buttons/swatches.
- User action: select the ink color.
- Feedback: correct color flash; wrong response shows “看颜色，不看字” style cue.
- End condition: fixed balanced trial count.
- Result state: congruent vs incongruent accuracy and median RT.

## Trial Generation

- Stimulus pool: color words and ink colors.
- Randomization: balanced congruent/incongruent conditions.
- Conditions: `congruent`, `incongruent`, optional `neutral`.
- Practice/formal separation: 4 practice trials with explanation.
- Difficulty parameters: color count, response window, incongruent ratio.

## Scoring

- Accuracy: correct selected ink color.
- Reaction time / completion time: button/swipe RT.
- Error types: `semantic_interference`, `timeout`, `wrong_color`.
- Composite score: accuracy plus inverse median RT, with incongruent trials weighted.
- Adaptive rule: add colors or reduce response time only after stable incongruent performance.

## Required Data

- Session summary: total accuracy, incongruent accuracy, median RT, interference cost.
- Trial fields: word, inkColor, condition, response, correct, rtMs.
- Event fields: selected color button and timestamp.
- Adaptive fields: color count and time window recommendation.

## Visual / UX Direction

Keep colorful cards and large swatch buttons. Improve spacing, avoid text overflow, and make result comparison readable.

## Clinical / IP Boundary

Allowed: “反应抑制/冲突控制表现”。 Forbidden: diagnostic interpretation.
