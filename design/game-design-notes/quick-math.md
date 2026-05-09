# quick-math Design Note

## Identity

- `gameId`: `quick-math`
- Chinese name: 快速计算
- Domain: 言语/执行功能/算术
- Task family: Mental Arithmetic / Arithmetic Verification
- Remake depth: keep-and-polish

## Product Positioning

用户快速判断或解答简单算式，训练心算速度、注意稳定性和错误控制。

## Mature Task Basis

- Primary paradigm: mental arithmetic verification/production。
- References: PsyToolkit numerical tasks, jsPsych keyboard/button response patterns, local `04-perception-language-arithmetic.md`.
- License boundary: generate original arithmetic items algorithmically.

## Gameplay Contract

- Start state: expression or expression-plus-proposed-answer.
- User action: enter answer or choose correct/incorrect.
- Feedback: immediate correct/error with correct answer.
- End condition: fixed question count or timer.
- Result state: accuracy, operation breakdown, median RT.

## Trial Generation

- Stimulus pool: generated arithmetic expressions.
- Randomization: operations and operands by level.
- Conditions: addition, subtraction, multiplication, mixed, verification false-answer distance.
- Practice/formal separation: easy warmup.
- Difficulty parameters: `operation`, `operandRange`, `carryBorrow`, `timeLimitMs`.

## Scoring

- Accuracy: exact answer or verification correctness.
- Error types: `wrong_answer`, `timeout`, `input_invalid`.
- Composite score: correct count, speed, streak.
- Adaptive rule: expand operand range/operation mix after high accuracy.

## Required Data

- Session summary: accuracy, meanRtMs, operationStats, streak.
- Trial fields: expression, answer, response, correct, rtMs, operation.
- Event fields: answer input/submission.
- Adaptive fields: next operation/range/window.

## Visual / UX Direction

Keep a calm classroom/arcade style with large keypad/buttons and readable equations.

## Clinical / IP Boundary

Allowed: “心算表现”。 Forbidden: learning-disability diagnosis.
