# n-back Design Note

## Identity

- `gameId`: `n-back`
- Chinese name: N-back 工作记忆
- Domain: 记忆力
- Task family: N-back / Spatial N-back
- Remake depth: evidence-refactor

## Product Positioning

用户判断当前刺激是否与前 N 个刺激匹配，训练工作记忆更新和持续注意。

## Mature Task Basis

- Primary paradigm: N-back。
- Related paradigms: spatial N-back, dual N-back.
- References: jspsych-contrib spatial-nback, PsyToolkit N-back, TaskBeacon N-back, local `02-memory-working-spatial.md`.
- License boundary: use paradigms and fields; avoid copying AGPL UI/code if closed-source.

## Gameplay Contract

- Start state: sequence stream with current N and target rule.
- User action: mark match/non-match or tap only on matches.
- Feedback: optional during training; summary after block.
- End condition: fixed block length.
- Result state: hits, false alarms, misses, d-prime-ready counts.

## Trial Generation

- Stimulus pool: positions, icons, letters, or sounds.
- Randomization: controlled target rate with no impossible early targets.
- Conditions: n level, target/non-target.
- Practice/formal separation: 1-back demo before higher N.
- Difficulty parameters: `n`, `targetRate`, `stimulusDurationMs`, `isiMs`, `stimulusSetSize`.

## Scoring

- Accuracy: hit/correct rejection.
- Error types: `false_alarm`, `miss`, `wrong_response`, `timeout`.
- Composite score: sensitivity counts plus RT for hits.
- Adaptive rule: increase N only when hit rate high and false alarms low.

## Required Data

- Session summary: n, hits, falseAlarms, misses, accuracy, medianRtMs.
- Trial fields: index, stimulus, nBackStimulus, isTarget, response, correct, rtMs.
- Event fields: response events.
- Adaptive fields: next N and target-rate rule.

## Visual / UX Direction

Use clean stimulus stage with minimal distraction, friendly progress, and result explanation.

## Clinical / IP Boundary

Allowed: “工作记忆刷新任务”。 Forbidden: IQ/ADHD/dementia improvement claims.
