## ADDED Requirements

### Requirement: Reference traceability
The Strong Memory implementation SHALL maintain a traceability matrix covering every actionable requirement and test case extracted from the supplied reference files.

#### Scenario: All supplied files are accounted for
- **WHEN** the alignment audit is run
- **THEN** the traceability matrix lists `data.json`, `最强记忆数值(3).xlsm`, `游戏关卡设置-难度配置表.xlsx`, `强力记忆测试用例.xlsx`, `游戏策划-强力记忆.docx`, `最强记忆文档.xlsx`, and `强力记忆.rp`

#### Scenario: Requirement status is explicit
- **WHEN** a reference item is not implemented literally
- **THEN** the traceability matrix records whether it is superseded, unsupported by the standalone app, deferred, or implemented by an equivalent local behavior

### Requirement: Runtime data parity
The Strong Memory playable SHALL load its playable level and floor data from `public/playable-games/strong-memory/data.json`, and the checked-in JSON SHALL match the exported data in `最强记忆数值(3).xlsm` for active records.

#### Scenario: Data table counts match
- **WHEN** the data parity validation runs
- **THEN** it reports 800 floor records and 60 level records

#### Scenario: Target positions are valid
- **WHEN** each floor record is validated
- **THEN** every `posBlock` coordinate is inside that floor's `TargetGrid`

#### Scenario: JSON and workbook stay equivalent
- **WHEN** `data.json` is compared with `最强记忆数值(3).xlsm`
- **THEN** every active floor and level row matches by field value

### Requirement: Welcome and first-time tutorial flow
The Strong Memory playable SHALL begin with a dedicated welcome surface and SHALL route a first-time player through the guided tutorial before formal training.

#### Scenario: Welcome surface is shown first
- **WHEN** the player opens Strong Memory with no prior local progress
- **THEN** the first visible surface displays the Strong Memory name and an entry action to continue

#### Scenario: First-time player enters tutorial
- **WHEN** the player continues from the welcome surface with recommended difficulty 1 and no completed tutorial state
- **THEN** the game opens the tutorial before formal training

#### Scenario: Returning player can enter training directly
- **WHEN** the player has completed the tutorial previously
- **THEN** the welcome surface allows direct entry into formal training

### Requirement: Guided tutorial behavior
The Strong Memory tutorial SHALL demonstrate the memory task with a guided 2x2 example and a player-participation 3x3 example.

#### Scenario: Guided 2x2 demo
- **WHEN** the tutorial starts
- **THEN** a 2x2 board shows two green targets, hides them, and demonstrates clicking their original positions

#### Scenario: Interactive 3x3 demo
- **WHEN** the guided 2x2 demo completes
- **THEN** a 3x3 board shows three diagonal green targets and requires the player to click only those original target positions

#### Scenario: Non-target clicks are ignored in tutorial
- **WHEN** the player clicks a non-target square during the interactive tutorial
- **THEN** the click has no scoring or failure effect

#### Scenario: Idle hint appears
- **WHEN** the player does not act for 5 seconds during the interactive tutorial recall phase
- **THEN** the hidden target positions provide a non-answer-revealing shake or wave hint

#### Scenario: Tutorial completion prompt
- **WHEN** the tutorial is completed
- **THEN** the game shows a prompt with actions to replay the tutorial or enter formal training

### Requirement: Round presentation and input locking
Each Strong Memory round SHALL present all blocks as gray, reveal configured target blocks, hide them, and only then accept player input.

#### Scenario: Blocks start gray
- **WHEN** a round starts
- **THEN** all configured blocks are visible in the board as gray blocks before the target reveal

#### Scenario: Targets are revealed then hidden
- **WHEN** the preview phase runs
- **THEN** the configured target positions turn green or configured alternate target color and then return to gray before recall begins

#### Scenario: Input is disabled during preview
- **WHEN** the player clicks blocks during the opening animation or target preview
- **THEN** the game does not count those clicks as correct, wrong, or attempts

### Requirement: Main training HUD
The Strong Memory training surface SHALL show the current difficulty, round status, round countdown, session/training time, score, and remaining fault allowance.

#### Scenario: Training HUD initializes
- **WHEN** formal training begins
- **THEN** the HUD shows difficulty level, current mission progress, remaining round time, score, and fault allowance

#### Scenario: Timer displays countdown
- **WHEN** a recall phase is active
- **THEN** the round countdown decreases from the configured time and reaches zero if the player does not finish

#### Scenario: Fault allowance updates
- **WHEN** the player clicks a wrong block
- **THEN** the HUD updates the remaining fault count for the current round

### Requirement: Correct and wrong block feedback
The Strong Memory playable SHALL provide visible feedback for correct and wrong selections matching the reference states.

#### Scenario: Correct block turns green
- **WHEN** the player clicks a correct hidden target
- **THEN** that block flips or changes to the target green state and remains marked

#### Scenario: Final correct block marks success
- **WHEN** the player clicks the final remaining correct target in a round
- **THEN** the round is marked successful with a check or equivalent success marker

#### Scenario: Wrong block shows red X
- **WHEN** the player clicks a non-target block during recall
- **THEN** that block visibly shows a red X wrong state

### Requirement: Round failure conditions
The Strong Memory playable SHALL fail a round when the player exceeds the configured fault allowance or the round timer expires before all targets are found.

#### Scenario: Timeout fails round
- **WHEN** the round countdown reaches zero and not all targets are found
- **THEN** the current round is marked failed and the game advances according to the difficulty rules

#### Scenario: Wrong clicks above allowance fail round
- **WHEN** the player makes more wrong selections than the configured `Fault` value
- **THEN** the current round is marked failed and no further clicks in that round affect scoring

### Requirement: Difficulty attempt progression
The Strong Memory playable SHALL use the configured level rules to decide whether to repeat, upgrade, or downgrade difficulty.

#### Scenario: Three successful missions upgrade difficulty
- **WHEN** the player passes all three configured missions for a difficulty below 60
- **THEN** the next difficulty is the current difficulty plus one

#### Scenario: One failed mission repeats difficulty
- **WHEN** one difficulty attempt fails but it is not the second consecutive failed attempt at that difficulty
- **THEN** the next attempt uses the same difficulty

#### Scenario: Two consecutive failed attempts downgrade difficulty
- **WHEN** two consecutive difficulty attempts fail
- **THEN** the next difficulty is the current difficulty minus one, unless the current difficulty is 1

#### Scenario: Difficulty cannot go below one
- **WHEN** the player fails twice at difficulty 1
- **THEN** the next difficulty remains 1

#### Scenario: Level sixty completion resets next start
- **WHEN** the player passes difficulty 60
- **THEN** the completion surface shows a clear pass state and the next new Strong Memory training start begins at difficulty 1

### Requirement: Scoring and brain value formulas
The Strong Memory playable SHALL calculate score and brain values according to the supplied configuration formulas.

#### Scenario: Successful round score formula
- **WHEN** a round is passed
- **THEN** the added score is `80 + difficulty * 20 + (40 + difficulty * 10) * remaining_time / operation_time`, rounded to a whole point

#### Scenario: Failed round score
- **WHEN** a round fails
- **THEN** the failed round adds no score

#### Scenario: Brain value formula
- **WHEN** a difficulty result is recorded
- **THEN** the brain value uses `100 + INT((difficulty - 1) / 2) * 5`

#### Scenario: Score starts at zero
- **WHEN** a formal training session starts
- **THEN** the displayed score starts at 0

### Requirement: Pause and resume
The Strong Memory playable SHALL support pausing formal training without losing current round state.

#### Scenario: Pause opens overlay
- **WHEN** the player clicks the pause control during training
- **THEN** the game shows a pause overlay and obscures the active board

#### Scenario: Pause stops timers
- **WHEN** the pause overlay is open
- **THEN** the round countdown and session timer stop decreasing

#### Scenario: Resume restores exact state
- **WHEN** the player resumes from pause
- **THEN** the game returns to the same round, difficulty, remaining time, fault count, and selected target state

#### Scenario: Sound and music toggles persist
- **WHEN** the player toggles sound or music in the pause overlay
- **THEN** the selected setting persists locally and is reflected in the pause UI

#### Scenario: Help returns to pause
- **WHEN** the player opens help from the pause overlay and closes it
- **THEN** the game returns to the pause overlay, not directly to active play

### Requirement: Completion and pass result surfaces
The Strong Memory playable SHALL show reference-aligned completion and pass result states after training ends or difficulty 60 is completed.

#### Scenario: Standard completion
- **WHEN** a training session ends before max-level pass
- **THEN** the completion surface displays title, score, brain value, trend or local difficulty movement, and continue/retry controls

#### Scenario: Max-level pass
- **WHEN** difficulty 60 is passed
- **THEN** the result surface displays a pass/completion state distinct from an ordinary round result

#### Scenario: Local result parity
- **WHEN** the standalone result surface displays score and brain value
- **THEN** the persisted local result values match the displayed values

### Requirement: Reference animations and visual states
The Strong Memory playable SHALL implement the reference visual states and animations in a way that remains compatible with the existing cute playable visual system.

#### Scenario: Opening animation locks input
- **WHEN** a round board appears
- **THEN** blocks scale in or otherwise animate in while input remains disabled

#### Scenario: Flip animation communicates state change
- **WHEN** a block changes between gray, target, found, or red X states
- **THEN** the state change is animated or visibly staged so the player can perceive the transition

#### Scenario: End animation locks input
- **WHEN** a round ends
- **THEN** the board end transition completes without accepting additional player input

### Requirement: Canonical homepage boundary
The Strong Memory playable SHALL remain direct-linked and SHALL NOT be added to the canonical 16-game homepage list as part of this alignment change.

#### Scenario: Homepage still lists sixteen canonical games
- **WHEN** the homepage is rendered after the alignment change
- **THEN** it still exposes the existing canonical sixteen-game list only
