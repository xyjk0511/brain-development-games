# Remake Depth Table

Collected from `evidence-based-cognitive-game-redesign` design decisions and per-game design notes.

| gameId | Domain | Remake depth | Reason |
| --- | --- | --- | --- |
| `visual-search` | 注意力 | evidence-refactor | Current concept is suitable, but needs formal target-present/set-size conditions, distractor control, and trial-level RT/error data. |
| `reaction-time` | 注意力 | evidence-refactor | Needs stronger Go/No-Go/PVT-style timing, commission/omission errors, and anticipation handling. |
| `stroop` | 注意力/执行功能 | keep-and-polish | Mature classic task already maps cleanly; primary work is balance, data, feedback, and UI polish. |
| `schulte-table` | 注意力 | keep-and-polish | Core grid search mechanic is mature; needs stable layout, wrong-click handling, and standardized data. |
| `strong-memory` | 记忆力 | evidence-refactor | Mature enough as a product concept, but task logic should align with Corsi/spatial recall and span progression. |
| `card-matching` | 记忆力 | evidence-refactor | Core matching mechanic is useful, but needs paired-associate framing, controlled difficulty, and richer metrics. |
| `simon-says` | 记忆力 | evidence-refactor | Needs serial-recall/span rules, playback/response phase control, and sequence data. |
| `n-back` | 记忆力 | evidence-refactor | Requires target-rate balancing, hit/false alarm/miss data, and conservative N-level adaptation. |
| `logic-puzzles` | 执行功能 | rebuild | Current generic puzzle direction is underspecified; should become rule induction/card sorting/DCCS-style gameplay. |
| `tower-of-hanoi` | 执行功能 | keep-and-polish | Mature planning game; improve constraints, known optimal moves, invalid move metrics, and polish. |
| `trail-making` | 执行功能/注意力 | keep-and-polish | Mature sequential connection game; add Part A/B variants, path/error metrics, and responsive canvas. |
| `water-jugs` | 执行功能 | evidence-refactor | Needs BFS-solvable puzzle generation, optimal-path comparison, repeat-state tracking, and clearer actions. |
| `mental-rotation` | 感知觉 | evidence-refactor | Needs controlled same/different, angle, mirrored distractor, and RT-by-angle metrics. |
| `word-scramble` | 言语 | evidence-refactor | Needs controlled word pools, hint/attempt handling, and language-task data. |
| `quick-math` | 言语/算术 | keep-and-polish | Algorithmic item generation is straightforward; focus on operation difficulty, timing, and answer records. |
| `number-sequence` | 言语/执行功能 | evidence-refactor | Needs explicit rule templates, missing-index control, distractors, and rule explanation. |
| `maze` | 空间记忆/执行功能 | rebuild | Current maze should become a solvable route memory/path-planning task with generated shortest-path data. |

## Implementation Rule

- `keep-and-polish`: preserve existing core mechanic; improve UX, feedback, data, adaptive rules.
- `evidence-refactor`: preserve theme where useful; rebuild trial generation, scoring, difficulty, and data model.
- `rebuild`: replace the core mechanic with the listed mature task/algorithm; retain only original assets/theme that still fit.
