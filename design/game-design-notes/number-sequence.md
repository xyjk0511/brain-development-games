# number-sequence Design Note

## Identity

- `gameId`: `number-sequence`
- Chinese name: 数字规律
- Domain: 言语/执行功能
- Task family: Number Series / Rule Induction
- Remake depth: evidence-refactor

## Product Positioning

用户观察数字序列并推断缺失项或下一项，训练规则归纳和工作记忆。

## Mature Task Basis

- Primary paradigm: number series reasoning。
- Related paradigms: matrix/rule induction.
- References: rule-induction literature and local `04-perception-language-arithmetic.md`.
- License boundary: generate original sequences algorithmically.

## Gameplay Contract

- Start state: sequence with missing item or next-item prompt.
- User action: choose or type answer.
- Feedback: show rule explanation after answer.
- End condition: fixed trials.
- Result state: accuracy by rule type and latency.

## Trial Generation

- Stimulus pool: arithmetic/geometric/alternating/Fibonacci-like templates.
- Randomization: random starts/increments within bounds.
- Conditions: ruleType, missingIndex, distractor closeness.
- Practice/formal separation: simple arithmetic examples.
- Difficulty parameters: `ruleType`, `sequenceLength`, `numberRange`, `distractorDistance`.

## Scoring

- Accuracy: correct missing/next number.
- Error types: `wrong_rule`, `calculation_error`, `timeout`.
- Composite score: correct count with higher rule complexity weight.
- Adaptive rule: add mixed/alternating rules after high accuracy.

## Required Data

- Session summary: accuracy, ruleTypeStats, medianRtMs.
- Trial fields: ruleType, sequence, missingIndex, correctAnswer, response, correct, rtMs.
- Event fields: option/input events.
- Adaptive fields: next rule complexity.

## Visual / UX Direction

Use number steps/doors visuals, explanation chips, and stable option buttons.

## Clinical / IP Boundary

Allowed: “规则推理训练”。 Forbidden: IQ or diagnostic claims.
