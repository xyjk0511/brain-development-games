## Why

The current Strong Memory playable is based on `data.json` and is playable, but it is not yet a full reference-aligned implementation across the supplied planning document, test cases, difficulty configuration, design workbook, Axure prototype, and exported data. This change makes "fully aligned" measurable before more UI or gameplay changes are made.

## What Changes

- Add a complete Strong Memory reference-alignment pass covering:
  - `data.json`
  - `最强记忆数值(3).xlsm`
  - `游戏关卡设置-难度配置表.xlsx`
  - `强力记忆测试用例.xlsx`
  - `游戏策划-强力记忆.docx`
  - `最强记忆文档.xlsx`
  - `强力记忆.rp`
- Introduce a traceability matrix mapping each extracted requirement and test case to implementation evidence or an explicit unsupported/out-of-scope decision.
- Align gameplay with the reference rules: first-time welcome and tutorial, level/round progression, 15-second per-round timer, 1 wrong-click fault budget, fail/pass transitions, scoring formula, brain-value formula, max difficulty 60, retry/downgrade behavior, pause/resume, and completion/pass result surfaces.
- Align visual and interaction behavior with the reference: gray idle blocks, green target blocks, red X wrong blocks, disabled input during preview/opening animations, guided demo flow, progress markers, and low-distraction styling consistent with the existing cute playable system.
- Add automated checks for data parity, formula behavior, and core flow scenarios from the supplied test workbook.
- Keep the Strong Memory playable direct-linked unless the user explicitly decides to add it to the canonical homepage set.

## Capabilities

### New Capabilities

- `strong-memory-reference-alignment`: Defines the complete expected behavior for the Strong Memory playable when aligned to the supplied reference files and test cases.

### Modified Capabilities

- None. There are no existing OpenSpec capabilities in this repository to modify.

## Impact

- Affected code:
  - `public/playable-games/strong-memory/index.html`
  - `public/playable-games/strong-memory/data.json`
  - possible Strong Memory test/validation scripts under the project test surface
- Affected behavior:
  - Strong Memory welcome/tutorial/training/result/pause flows
  - Strong Memory scoring, difficulty, retry, downgrade, and max-level progression
  - Strong Memory visual states and timing behavior
- External dependencies:
  - No new runtime dependency expected.
  - Development-time validation may use existing Node/Python tooling already available in the workspace.
