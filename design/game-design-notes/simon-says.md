# simon-says Design Note

## Identity

- `gameId`: `simon-says`
- Chinese name: 顺序记忆
- Domain: 记忆力
- Task family: Serial Recall / Simon Sequence
- Remake depth: evidence-refactor

## Product Positioning

用户观看一串灯光/声音顺序，然后按相同顺序复现，训练序列工作记忆。

## Mature Task Basis

- Primary paradigm: serial recall / sequence reproduction。
- Related paradigms: Corsi forward span, Simon game.
- References: Corsi/jsPsych/PsyToolkit spatial span references and local `02-memory-working-spatial.md`.
- License boundary: Simon mechanics are generic; keep original assets/audio.

## Gameplay Contract

- Start state: sequence playback with disabled input.
- User action: repeat sequence after playback.
- Feedback: per-step feedback and round result.
- End condition: fixed rounds or span failure.
- Result state: longest sequence, error count, median response interval.

## Trial Generation

- Stimulus pool: colored pads/objects.
- Randomization: append or generate balanced sequences.
- Conditions: sequence length, playback speed.
- Practice/formal separation: short 2-step practice.
- Difficulty parameters: `sequenceLength`, `padCount`, `playbackMs`, `interStimulusMs`.

## Scoring

- Accuracy: exact sequence order.
- Error types: `wrong_item`, `order_error`, `early_click`, `timeout`.
- Composite score: longest span and correct rounds.
- Adaptive rule: increment sequence length after success; slow playback or reduce length after failure.

## Required Data

- Session summary: longestSpan, correctRounds, errors, score.
- Trial fields: sequence, responseSequence, correct, rtMs, errorIndex.
- Event fields: playback events and user taps.
- Adaptive fields: next sequence length/playback speed.

## Visual / UX Direction

Use large pads, friendly animation, optional sound toggle, and clear playback/response phase labels.

## Clinical / IP Boundary

Allowed: “序列记忆表现”。 Forbidden: clinical efficacy claims.
