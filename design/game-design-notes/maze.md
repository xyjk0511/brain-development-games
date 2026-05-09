# maze Design Note

## Identity

- `gameId`: `maze`
- Chinese name: 迷宫/路线记忆
- Domain: 执行功能/空间记忆
- Task family: Maze Learning, Route Memory, Path Planning
- Remake depth: rebuild

## Product Positioning

用户观察或探索一条路线，然后在迷宫中到达目标，训练空间规划、路线记忆和错误修正。

## Mature Task Basis

- Primary paradigm: maze learning / route memory。
- Related paradigms: path planning, graph search, route-switching game mechanics.
- References: route/maze open implementations, track-of-thought-web as route-switching inspiration, local `05-route-maze-track-gameified.md`.
- License boundary: use algorithmic maze/BFS ideas and original art; do not copy route game UI.

## Gameplay Contract

- Start state: generated solvable maze and goal.
- User action: move through maze or choose route nodes.
- Feedback: wrong turns and path progress shown.
- End condition: goal reached, max wrong turns, or timer.
- Result state: completion time, wrong turns, path efficiency.

## Trial Generation

- Stimulus pool: generated mazes/graphs with known shortest path.
- Randomization: seed-based maze generation with solvability check.
- Conditions: preview route vs no preview, path complexity.
- Practice/formal separation: small tutorial maze.
- Difficulty parameters: `gridSize`, `branchCount`, `shortestPathLength`, `previewMs`, `timeLimitMs`.

## Scoring

- Accuracy: goal reached.
- Error types: `wrong_turn`, `backtrack`, `timeout`, `dead_end`.
- Composite score: completion, shortest-path ratio, fewer wrong turns.
- Adaptive rule: increase branch count/path length after efficient completion.

## Required Data

- Session summary: solved, completionMs, wrongTurns, pathEfficiency.
- Trial fields: mazeSeed, shortestPath, userPath, wrongTurns, correct, rtMs.
- Event fields: move events and node positions.
- Adaptive fields: next maze size/branch count.

## Visual / UX Direction

Rebuild with a friendly map/garden/treasure route style, large controls, and clear path feedback.

## Clinical / IP Boundary

Allowed: “路线记忆/空间规划任务”。 Forbidden: clinical navigation impairment claims.
