## 1. Reference Audit And Traceability

- [x] 1.1 Extract actionable requirements from `游戏策划-强力记忆.docx`, `最强记忆文档.xlsx`, `强力记忆测试用例.xlsx`, `游戏关卡设置-难度配置表.xlsx`, `最强记忆数值(3).xlsm`, `data.json`, and `强力记忆.rp`.
- [x] 1.2 Create a Strong Memory traceability matrix listing source file, requirement/test id, expected behavior, implementation status, evidence, and exception rationale.
- [x] 1.3 Record source conflicts, including the superseded 47-level narrative versus the authoritative 60-level data/test/config contract.
- [x] 1.4 Add a data parity validation that compares checked-in `data.json` against active records from `最强记忆数值(3).xlsm`.
- [x] 1.5 Add validation that all floor target coordinates are inside their configured `TargetGrid`.

## 2. Formula And Progression Tests

- [x] 2.1 Add tests for score formula `80 + difficulty * 20 + (40 + difficulty * 10) * remaining_time / operation_time`.
- [x] 2.2 Add tests for brain value formula `100 + INT((difficulty - 1) / 2) * 5`.
- [x] 2.3 Add tests for three successful missions upgrading difficulty.
- [x] 2.4 Add tests for one failed difficulty attempt repeating the same difficulty.
- [x] 2.5 Add tests for two consecutive failed difficulty attempts downgrading difficulty without going below level 1.
- [x] 2.6 Add tests for passing difficulty 60 showing pass state and resetting the next new start to difficulty 1.

## 3. Welcome And Tutorial Alignment

- [x] 3.1 Update the welcome surface so first entry shows Strong Memory and click/primary action semantics matching the reference.
- [x] 3.2 Persist tutorial completion locally and route first-time level-1 players through tutorial before formal training.
- [x] 3.3 Implement the guided 2x2 tutorial demo with two targets and automatic pointer/click demonstration.
- [x] 3.4 Implement the interactive 3x3 tutorial with three diagonal targets.
- [x] 3.5 Ignore non-target clicks during tutorial recall.
- [x] 3.6 Add the 5-second idle hint during tutorial recall.
- [x] 3.7 Add the tutorial completion prompt with replay and enter-training actions.

## 4. Main Training Mechanics

- [x] 4.1 Refactor Strong Memory into an explicit state machine for welcome, tutorial, preview, recall, pause, round result, difficulty result, and completion.
- [x] 4.2 Ensure each round starts with all configured blocks gray, then reveals targets, then hides targets before accepting input.
- [x] 4.3 Disable all board input during opening animation, preview, and ending transitions.
- [x] 4.4 Implement correct-click feedback as green target reveal with final success marker.
- [x] 4.5 Implement wrong-click feedback as red X and apply the configured `Fault` allowance.
- [x] 4.6 Fail a round on timeout or wrong clicks beyond allowance and prevent later clicks from affecting the round.
- [x] 4.7 Use the `MissionNum`, `MissionPass`, `Fault`, `Time`, `BlockTypeNum`, `Score`, `Scores`, and `Brains` fields from the level table where applicable.

## 5. HUD, Pause, And Result Surfaces

- [x] 5.1 Add HUD fields for difficulty, mission progress, round countdown, session/training time, score, and remaining fault allowance.
- [x] 5.2 Add a pause control with overlay that obscures the board.
- [x] 5.3 Pause and resume both round countdown and session timer without losing current round state.
- [x] 5.4 Add persistent sound and music toggle UI states in the pause overlay.
- [x] 5.5 Add help surface from pause and return to the pause overlay when help closes.
- [x] 5.6 Align completion/result surfaces with reference wording and fields: score, brain value, trend/local difficulty movement, continue/retry controls.
- [x] 5.7 Add a distinct pass/completion state for difficulty 60.

## 6. Visual And Animation Alignment

- [x] 6.1 Add gray block, green block, and red X states matching the supplied design workbook while preserving the current cute unified style.
- [x] 6.2 Add opening block scale-in animation with randomized small delays and locked input.
- [x] 6.3 Add flip/state-change animation for gray-to-target, target-to-gray, gray-to-red-X, and correct reveal.
- [x] 6.4 Add ending transition that locks input while the round closes.
- [x] 6.5 Capture browser screenshots for welcome, tutorial, training, pause, and result surfaces and compare them against the reference-alignment criteria.

## 7. Verification And Deployment

- [x] 7.1 Run `git diff --check`.
- [x] 7.2 Run the Strong Memory data/formula/progression tests.
- [x] 7.3 Run the full existing test suite with `npm test -- --run`.
- [x] 7.4 Run `npm run build` and verify the Strong Memory files are present in `docs/playable-games/strong-memory/`.
- [x] 7.5 Run local browser smoke tests for first-time tutorial, successful difficulty, failed difficulty, pause/resume, and result flows.
- [x] 7.6 Confirm the homepage still exposes only the existing canonical sixteen-game list.
- [x] 7.7 Deploy to `xyjk` GitHub Pages and verify the online Strong Memory URL plus `data.json` return 200.
- [x] 7.8 Run online browser smoke tests against the deployed URL.
- [x] 7.9 Update the traceability matrix with final evidence and ensure no actionable reference item remains unreviewed.
