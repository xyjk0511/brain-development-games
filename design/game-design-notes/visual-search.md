# visual-search Design Note

## Identity

- `gameId`: `visual-search`
- Chinese name: 视觉搜索/找目标
- Domain: 注意力
- Task family: Visual Search, Feature Search, Conjunction Search
- Remake depth: evidence-refactor

## Product Positioning

用户在一组可爱物品中快速找到目标物，训练视觉搜索、选择性注意和抗干扰扫描。产品名和素材保持原创，不使用商业训练游戏名称。

## Mature Task Basis

- Primary paradigm: Visual Search task。
- Related paradigms: target-present/target-absent search, set-size effect。
- Open-source/task-library references: PsyToolkit experiment library, jsPsych visual stimulus/keyboard-response examples, reaction-trainer/freefocusgames as product-shape references.
- Paper/article/algorithm references: visual search set-size/target-present paradigms; use local report `01-attention-search-inhibition.md` and `research-source-index.md`.
- License boundary: jsPsych-style APIs and PsyToolkit task descriptions can inform parameters; do not copy GPL/AGPL or no-license code.

## Gameplay Contract

- Start state: level selects target object, distractor pool, set size, and time limit.
- User action: click/tap the target if present, or choose “没有目标” if using target-absent trials.
- Feedback: correct target highlights green; wrong distractor shows brief explanation.
- End condition: fixed number of trials or timer ends.
- Result state: accuracy, median reaction time, target-present hit rate, false alarm count.

## Trial Generation

- Stimulus pool: original icons/objects with controlled feature overlap.
- Randomization: random grid positions with no overlap.
- Conditions: targetPresent, targetAbsent, feature search, conjunction search.
- Practice/formal separation: 2-3 guided practice trials before formal trials.
- Difficulty parameters: `setSize`, `distractorSimilarity`, `targetPresentRate`, `timeLimitMs`.

## Scoring

- Accuracy: hit/correct rejection.
- Reaction time / completion time: per-trial `rtMs` from stimulus onset.
- Error types: `miss`, `false_alarm`, `wrong_distractor`, `timeout`.
- Composite score: accuracy weighted first, speed bonus only for correct trials.
- Adaptive rule: increase set size/similarity when accuracy >= 85% and median RT is below target; reduce time pressure or set size on high error rate.

## Required Data

- Session summary: `score`, `accuracy`, `meanRtMs`, `medianRtMs`, `totalTrials`, `correctTrials`, `errorCount`.
- Trial fields: `trialId`, `condition`, `stimulus`, `correctAnswer`, `response`, `correct`, `rtMs`, `errorType`, `difficultyParams`.
- Event fields: clicks with target id and coordinates.
- Adaptive fields: previous/recommended level and threshold reason.

## Visual / UX Direction

Use a polished tabletop/treasure-search theme with large touch targets, stable grid dimensions, animated correct feedback, and quiet result cards.

## Clinical / IP Boundary

Allowed: “视觉搜索表现”“注意力训练任务”。 Forbidden: disease diagnosis/treatment claims or copying commercial task branding.
