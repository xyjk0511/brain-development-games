# tower-of-hanoi Design Note

## Identity

- `gameId`: `tower-of-hanoi`
- Chinese name: 甜甜圈收纳架
- Domain: 执行功能
- Task family: Tower of Hanoi / Tower of London
- Remake depth: keep-and-polish

## Product Positioning

用户移动甜甜圈/圆盘到目标柱，遵守大小或容量限制，训练计划、目标分解和问题解决。

## Mature Task Basis

- Primary paradigm: Tower of Hanoi/London。
- References: jspsych-contrib tower-of-london, PsyToolkit Tower of Hanoi, PEBL Tower tasks, local `03-executive-planning-reasoning.md`.
- License boundary: use state-space rules and fields; do not copy non-permissive UI.

## Gameplay Contract

- Start state: initial peg state and goal state.
- User action: move one disk/object at a time.
- Feedback: invalid move denied with explanation; valid move animates.
- End condition: goal reached, max moves, or time limit.
- Result state: moves vs optimal, invalid moves, completion time.

## Trial Generation

- Stimulus pool: disks/balls and peg capacities.
- Randomization: choose predefined solvable states with known optimal moves.
- Conditions: disk count, peg capacity, max moves.
- Practice/formal separation: 2-3 disk tutorial.
- Difficulty parameters: `diskCount`, `pegCount`, `optimalMoves`, `maxMoves`, `timeLimitMs`.

## Scoring

- Accuracy: solved within constraints.
- Error types: `invalid_size`, `invalid_capacity`, `over_max_moves`, `timeout`.
- Composite score: solved, closeness to optimal moves, fewer invalid attempts.
- Adaptive rule: increase optimal-move depth after efficient solves.

## Required Data

- Session summary: solved, moves, optimalMoves, invalidMoves, completionMs.
- Trial fields: initialState, goalState, moves, finalState, correct, rtMs.
- Event fields: selected peg/disk, move validity.
- Adaptive fields: next puzzle depth.

## Visual / UX Direction

Keep playful sweet/snack theme with clear peg targets, ghost goal display, and move counter.

## Clinical / IP Boundary

Allowed: “规划/问题解决任务”。 Forbidden: clinical executive-function diagnosis.
