# water-jugs Design Note

## Identity

- `gameId`: `water-jugs`
- Chinese name: 小熊果汁铺/量杯问题
- Domain: 执行功能
- Task family: Water Jug Problem, State-Space Search, Planning
- Remake depth: evidence-refactor

## Product Positioning

用户通过装满、倒空、互倒杯子达到目标容量，训练计划、状态搜索和问题解决。

## Mature Task Basis

- Primary paradigm: Water Jug problem。
- Related paradigms: Einstellung effect and AI state-space search.
- References: BFS water-jug implementations, AI articles, Luchins Einstellung reference, local `03-executive-planning-reasoning.md`.
- License boundary: use BFS/state graph algorithm; do not copy no-license code.

## Gameplay Contract

- Start state: empty jugs with capacities and target volume.
- User action: fill, empty, pour between jugs.
- Feedback: valid state change animates; repeated/dead-end states optionally hinted.
- End condition: target reached, max moves, or time limit.
- Result state: moves vs optimal, visited states, hints used.

## Trial Generation

- Stimulus pool: capacity/target presets solvable by gcd rule.
- Randomization: choose presets with known BFS optimal solution.
- Conditions: two-jug and optional three-jug puzzles.
- Practice/formal separation: one tutorial puzzle.
- Difficulty parameters: `capacities`, `target`, `optimalMoves`, `maxMoves`, `jugCount`.

## Scoring

- Accuracy: target state reached.
- Error types: `invalid_action`, `repeat_state`, `over_max_moves`, `timeout`.
- Composite score: solved, optimality, fewer repeats/hints.
- Adaptive rule: increase optimal path length or jug count after efficient solves.

## Required Data

- Session summary: solved, moves, optimalMoves, repeatStates, completionMs.
- Trial fields: capacities, goalState, statePath, actionPath, optimalPath, correct.
- Event fields: action type and resulting state.
- Adaptive fields: next capacity preset and optimal-depth target.

## Visual / UX Direction

Use juice shop/bear server theme, clear fill levels, and explicit action buttons.

## Clinical / IP Boundary

Allowed: “问题解决/规划任务”。 Forbidden: clinical planning impairment claims.
