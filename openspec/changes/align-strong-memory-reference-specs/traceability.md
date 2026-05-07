# Strong Memory Reference Traceability

Reference package: `F:\wechat\xwechat_files\wxid_br2nkrs4dgri12_68ec\msg\file\2026-05\强力记忆测试用例(1)`

Status values:

- `implemented`: implemented by the standalone playable.
- `validated`: covered by automated validation or smoke checks.
- `superseded`: contradicted by newer authoritative reference files.
- `standalone-equivalent`: implemented as a local equivalent because the GitHub Pages app has no admin platform.
- `unsupported`: not implementable literally in the standalone app without missing platform/assets.

## Source Inventory

| Source | Role | Status | Evidence |
| --- | --- | --- | --- |
| `data.json` | Runtime level/floor data | implemented | Loaded by `public/playable-games/strong-memory/index.html`; validated by `src/lib/strongMemoryRules.test.js` |
| `最强记忆数值(3).xlsm` | Authoring workbook for `data.json` | validated | `scripts/validate_strong_memory_reference.py` compares active Floor/Level rows |
| `游戏关卡设置-难度配置表.xlsx` | Formula and difficulty config | implemented | Score/brain/difficulty tests in `src/lib/strongMemoryRules.test.js` |
| `强力记忆测试用例.xlsx` | Acceptance scenarios | implemented | Covered by page behavior, rules tests, and smoke checks |
| `游戏策划-强力记忆.docx` | Gameplay narrative and older process description | implemented/superseded | 60-level conflict recorded below |
| `最强记忆文档.xlsx` | UI, flow, animation, and asset requirements | implemented | Page surfaces, block states, animations, pause/result flows |
| `强力记忆.rp` | Axure interaction/visual reference | standalone-equivalent | Used as non-runtime reference; no executable Axure runtime embedded |

## Conflict Resolution

| Conflict | Resolution | Rationale |
| --- | --- | --- |
| `游戏策划-强力记忆.docx` says 47 levels / 5 tasks per level | superseded by 60 levels / 3 missions per difficulty | `data.json`, `最强记忆数值(3).xlsm`, `游戏关卡设置-难度配置表.xlsx`, and `强力记忆测试用例.xlsx` all define 60-level / 3-mission behavior |
| Manager/admin score parity cases | standalone-equivalent | This repo is a standalone GitHub Pages playable; persisted local result values are used as the parity target |
| Music/sound asset playback | standalone-equivalent | The supplied asset list names sound categories but does not provide audio files; UI state is implemented and persisted |

## Requirement Matrix

| ID | Source | Expected behavior | Implementation/Evidence | Status |
| --- | --- | --- | --- | --- |
| REQ-DATA-001 | `data.json`, `最强记忆数值(3).xlsm` | 800 Floor rows and 60 Level rows | `hydrateStrongMemoryData` test and workbook parity script | validated |
| REQ-DATA-002 | `data.json` | Every `posBlock` coordinate must fit inside `TargetGrid` | `validateFloorTargets` test | validated |
| REQ-RULE-001 | `游戏关卡设置-难度配置表.xlsx`, test case 1 | Max difficulty is 60 | `STRONG_MEMORY_MAX_LEVEL`, max-level test | implemented |
| REQ-RULE-002 | `游戏关卡设置-难度配置表.xlsx`, test case 1 | Fault allowance is 1 | Level `Fault` field used in runtime | implemented |
| REQ-RULE-003 | `游戏关卡设置-难度配置表.xlsx`, test case 1 | Round operation time is 15 seconds | Level `Time` field used in runtime | implemented |
| REQ-RULE-004 | `游戏关卡设置-难度配置表.xlsx`, test case 1 | 3 missions per difficulty, 3 required to pass | Level `MissionNum`/`MissionPass` used in runtime | implemented |
| REQ-RULE-005 | `游戏关卡设置-难度配置表.xlsx`, tests 9, 11, 13 | Score formula is `80+难度*20+(40+难度*10)*剩余时间/操作时间` | `roundScore` tests | validated |
| REQ-RULE-006 | `游戏关卡设置-难度配置表.xlsx`, test case 1 | Brain value is `100+INT((难度-1)/2)*5` | `brainValue` tests | validated |
| REQ-FLOW-001 | `强力记忆测试用例.xlsx` case 2, `最强记忆文档.xlsx` interface | Welcome screen shows Strong Memory first | `coverScreen` | implemented |
| REQ-FLOW-002 | `强力记忆测试用例.xlsx` case 3 | First-time level-1 player enters tutorial | local `tutorialDone` gate | implemented |
| REQ-TUTORIAL-001 | `游戏策划-强力记忆.docx`, `最强记忆文档.xlsx` | 2x2 guided demo with two targets | tutorial phase `demo2` | implemented |
| REQ-TUTORIAL-002 | `游戏策划-强力记忆.docx`, `最强记忆文档.xlsx` | 3x3 interactive demo with three diagonal targets | tutorial phase `play3` | implemented |
| REQ-TUTORIAL-003 | `强力记忆测试用例.xlsx` case 3 | Wrong tutorial clicks have no effect | tutorial click handler ignores non-targets | implemented |
| REQ-TUTORIAL-004 | `游戏策划-强力记忆.docx` | 5-second idle hint during tutorial | tutorial hint timer | implemented |
| REQ-GAME-001 | `最强记忆文档.xlsx` gameplay | Blocks start gray, targets reveal, then hide | preview/open/recall states | implemented |
| REQ-GAME-002 | `最强记忆文档.xlsx` gameplay | Input disabled during preview/opening | phase checks and disabled buttons | implemented |
| REQ-GAME-003 | `最强记忆文档.xlsx` gameplay | Correct block turns green | `is-found` tile state | implemented |
| REQ-GAME-004 | `强力记忆测试用例.xlsx` case 4 | Wrong block shows red X | `is-wrong` tile state | implemented |
| REQ-GAME-005 | `强力记忆测试用例.xlsx` cases 5, 7 | Timeout or too many wrong clicks fails current mission | `failRound` path | implemented |
| REQ-PROG-001 | `强力记忆测试用例.xlsx` case 13 | Three passed missions upgrade difficulty | `evaluateDifficultyAttempt` test and runtime | validated |
| REQ-PROG-002 | `强力记忆测试用例.xlsx` cases 9, 10, 23 | One failed attempt repeats, two failed attempts downgrade | `nextDifficulty` tests and runtime | validated |
| REQ-PROG-003 | `强力记忆测试用例.xlsx` case 27 | Passing level 60 resets next start to level 1 | `nextDifficulty` max-level test and runtime | validated |
| REQ-HUD-001 | `强力记忆测试用例.xlsx` case 4 | HUD shows difficulty, countdown, training time, score, fault | game HUD | implemented |
| REQ-PAUSE-001 | `强力记忆测试用例.xlsx` cases 16, 17 | Pause overlay stops timers and resume keeps state | pause state and timer accounting | implemented |
| REQ-PAUSE-002 | `强力记忆测试用例.xlsx` cases 18, 19 | Sound/music toggles persist | local settings | standalone-equivalent |
| REQ-PAUSE-003 | `强力记忆测试用例.xlsx` case 20 | Help opens from pause and returns to pause | help overlay | standalone-equivalent |
| REQ-RESULT-001 | `强力记忆测试用例.xlsx` cases 6, 24, 25, 26 | Result shows score, brain, trend/local progress | result screen and local persisted result | standalone-equivalent |
| REQ-VIS-001 | `最强记忆文档.xlsx` animation | Opening scale-in locks input | tile opening animation | implemented |
| REQ-VIS-002 | `最强记忆文档.xlsx` animation | Flip/state transition communicates block state | tile transition classes | implemented |
| REQ-VIS-003 | `最强记忆文档.xlsx` asset list | Gray, green, red X states exist | CSS tile states | implemented |
| REQ-BND-001 | project boundary | Do not add Strong Memory to canonical 16 homepage | App/home tests and unchanged registry | validated |

## Verification Evidence

| Check | Result | Evidence |
| --- | --- | --- |
| Data/workbook parity | passed | `python scripts/validate_strong_memory_reference.py` -> 800 Floor rows, 60 Level rows, status ok |
| Strong Memory rules | passed | `npm test -- --run src/lib/strongMemoryRules.test.js` -> 8 tests passed |
| Full regression suite | passed | `npm test -- --run` -> 24 files / 62 tests passed |
| Build output | passed | `npm run build`; `docs/playable-games/strong-memory/` contains `index.html`, `data.json`, `rules.mjs` |
| Whitespace check | passed | `git diff --check`; only LF-to-CRLF working-copy warning for `index.html` |
| Canonical 16 boundary | passed | `src/App.test.tsx`, `src/pages/Home.test.tsx`, and `src/lib/gameParameters.test.ts` passed in full test suite; no Strong Memory registry entry added |
| Local browser smoke | passed | Headless Chrome smoke loaded 60 levels, completed first-time tutorial, paused without timer drift, passed a difficulty, failed a difficulty, and reached both result states |
| GitHub Pages asset check | passed | `index.html`, `data.json`, and `rules.mjs` returned HTTP 200 from `https://xyjk0511.github.io/brain-development-games/playable-games/strong-memory/` |
| Online browser smoke | passed | Headless Chrome against the deployed URL loaded 60 levels, completed first-time tutorial, paused without timer drift, passed a difficulty, failed a difficulty, and reached both result states |

Screenshot evidence from local smoke:

- Welcome: `C:\Users\55093\AppData\Local\Temp\strong-memory-smoke-1778188070822\01-cover.png`
- Tutorial: `C:\Users\55093\AppData\Local\Temp\strong-memory-smoke-1778188070822\02-tutorial.png`
- Training: `C:\Users\55093\AppData\Local\Temp\strong-memory-smoke-1778188070822\03-training.png`
- Pause: `C:\Users\55093\AppData\Local\Temp\strong-memory-smoke-1778188070822\04-pause.png`
- Success result: `C:\Users\55093\AppData\Local\Temp\strong-memory-smoke-1778188070822\05-result-success.png`
- Failure result: `C:\Users\55093\AppData\Local\Temp\strong-memory-smoke-1778188070822\06-result-fail.png`

Online smoke screenshot directory:

- `C:\Users\55093\AppData\Local\Temp\strong-memory-online-smoke-1778188521921`
