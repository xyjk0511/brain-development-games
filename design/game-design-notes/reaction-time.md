# reaction-time Design Note

## Identity

- `gameId`: `reaction-time`
- Chinese name: 反应速度/抑制控制
- Domain: 注意力
- Task family: Simple Reaction Time, Go/No-Go, Psychomotor Vigilance Task
- Remake depth: evidence-refactor

## Product Positioning

用户等待目标出现后尽快反应，同时在禁止信号出现时抑制点击。界面用原创可爱信号灯/小动物出洞主题表达，不使用临床测验名作为产品名。

## Mature Task Basis

- Primary paradigm: Simple RT plus Go/No-Go。
- Related paradigms: PVT, Stop Signal as future extension.
- Open-source/task-library references: PsyToolkit Go/No-Go/PVT tasks, reaction-trainer tasks, jsPsych response plugins.
- Paper/article/algorithm references: reaction-time and inhibitory-control task literature; local report `01-attention-search-inhibition.md`.
- License boundary: task rules and fields are reusable as concepts; do not copy non-permissive implementations.

## Gameplay Contract

- Start state: randomized waiting interval, next stimulus hidden.
- User action: click/tap only on Go targets; withhold response on No-Go targets.
- Feedback: fast/correct feedback, commission error feedback for No-Go clicks, timeout feedback for missed Go trials.
- End condition: fixed trials or fixed session duration.
- Result state: median Go RT, omission errors, commission errors, stability.

## Trial Generation

- Stimulus pool: Go and No-Go sprites with clear visual distinction.
- Randomization: jittered foreperiod to prevent anticipation.
- Conditions: `go`, `nogo`, optional catch trials.
- Practice/formal separation: guided practice with slower timing.
- Difficulty parameters: `goRate`, `foreperiodRangeMs`, `responseWindowMs`, `nogoSimilarity`.

## Scoring

- Accuracy: Go hits and No-Go correct inhibitions.
- Reaction time / completion time: Go `rtMs`; anticipations below threshold are errors.
- Error types: `commission`, `omission`, `anticipation`, `timeout`.
- Composite score: correct inhibition and stable RT outrank raw speed.
- Adaptive rule: shorten response window or increase No-Go similarity only after high accuracy.

## Required Data

- Session summary: go accuracy, No-Go accuracy, commission/omission counts, median RT.
- Trial fields: condition, stimulusOnset, response, correct, rtMs, errorType, foreperiod.
- Event fields: down/up click events when useful for anticipations.
- Adaptive fields: recommended timing and No-Go ratio.

## Visual / UX Direction

Use a clean signal-light or “mouse hole” scene with a large central target, no shifting layout, and a clear quiet-mode option.

## Clinical / IP Boundary

Allowed: “反应速度和抑制控制任务”。 Forbidden: clinical ADHD/neurological treatment claims.
