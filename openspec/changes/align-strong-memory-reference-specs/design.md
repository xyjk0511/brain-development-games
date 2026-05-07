## Context

Strong Memory currently exists as a direct-linked playable under `public/playable-games/strong-memory/`. It loads `data.json` and supports a basic visual-memory loop, but it was intentionally built as a first playable version rather than a full contract implementation.

The supplied reference package contains multiple sources of truth:

- `data.json`: exported runtime data with `Floor`, `Level`, and `Misc`.
- `最强记忆数值(3).xlsm`: authoring workbook that exports `data.json`; current extraction shows 800 floor records and 60 level records matching the JSON.
- `游戏关卡设置-难度配置表.xlsx`: global difficulty formulas and limits for Strong Memory.
- `强力记忆测试用例.xlsx`: functional acceptance cases for welcome, tutorial, main training, pause, scoring, difficulty changes, completion, and max-level behavior.
- `游戏策划-强力记忆.docx`: gameplay purpose and training process narrative. This document contains an older 47-level statement that conflicts with the later test cases/data.
- `最强记忆文档.xlsx`: design workbook for gameplay flow, UI surfaces, animations, scoring, and assets.
- `强力记忆.rp`: Axure prototype package. It should be used as an interaction/visual reference where extractable or exportable, but not as executable runtime code.

## Goals / Non-Goals

**Goals:**

- Make Strong Memory fully traceable to the supplied reference files.
- Resolve source conflicts with an explicit priority order instead of implicit guesses.
- Implement missing flows from the test workbook and design workbook.
- Add tests/validation that prove the data, formulas, and core user flows stay aligned.
- Keep the existing canonical 16-game homepage boundary unchanged.

**Non-Goals:**

- Rebuild the app in Axure or embed the `.rp` runtime.
- Add Strong Memory to the canonical 16-game homepage list.
- Implement management-platform integration that is not present in this standalone GitHub Pages app. Where the reference mentions manager/admin state, the standalone app will expose equivalent local state only when possible and mark true admin parity as unsupported.
- Add new runtime dependencies.

## Decisions

1. **Use `data.json` as runtime data and validate it against the workbook**

   The playable will continue to fetch `data.json` at runtime because it is the exported data artifact intended for the program. A validation step will compare the JSON against `最强记忆数值(3).xlsm` during development so the implementation can prove that it is not using stale or hand-copied data.

   Alternative considered: parsing the `.xlsm` directly in the browser. Rejected because it would add runtime complexity and dependencies while the reference already provides exported JSON.

2. **Use 60 levels as the authoritative difficulty ceiling**

   The `.docx` mentions 47 levels, but the test workbook, global difficulty workbook, level workbook, and `data.json` all define/expect 60 levels. The 60-level contract is therefore authoritative. The 47-level statement will be recorded in the traceability matrix as superseded source text.

   Alternative considered: limiting implementation to 47 levels. Rejected because it contradicts the current exported data and the test case for max level 60.

3. **Model a difficulty attempt as three configured missions**

   The current data table uses `MissionNum = 3` and `MissionPass = 3` for each level. The test workbook expects three rounds per difficulty and difficulty +1 after three successful rounds. The implementation will represent each difficulty attempt as three missions from the current level's `Blocks` pool.

   Alternative considered: following the older `.docx` statement of five tasks per level. Rejected because it conflicts with the active `data.json` and test workbook.

4. **Implement standalone equivalents for platform concepts**

   The reference mentions global training time, manager-assigned duration, next-game routing, patient/admin score parity, music, and sound effects. In this standalone GitHub Pages game:

   - The game will expose local training session duration and result state.
   - Next-game/admin parity will be marked as integration-dependent in the traceability matrix unless a local equivalent exists.
   - Music/sound toggles can be implemented as UI state without requiring audio assets if assets are not supplied.

   Alternative considered: ignoring those references. Rejected because "fully aligned" requires every reference item to be accounted for, even when it is unsupported by the standalone environment.

5. **Use traceability as a release gate**

   A generated or maintained traceability matrix will list each requirement/test case, its source file, implementation status, evidence, and any explicit exception. The change is not complete until the matrix has no unreviewed reference items.

   Alternative considered: relying on manual visual comparison only. Rejected because the reference package is multi-file and includes formulas/test cases that are easy to miss visually.

## Risks / Trade-offs

- **Reference conflicts** → Mitigation: document conflict resolution in the traceability matrix and prioritize current data/test/difficulty sources over older narrative text.
- **Axure `.rp` is not directly readable enough for automation** → Mitigation: treat it as a visual/interaction reference and record whether evidence came from export, screenshots, or manual inspection.
- **Standalone app cannot implement admin-side assertions literally** → Mitigation: implement local result parity where possible and mark true admin-platform cases as unsupported/out-of-scope with rationale.
- **Adding all missing flows may make the single HTML file harder to maintain** → Mitigation: keep helpers small and grouped by state machine concern; add tests for formulas and core scenarios before broad UI edits.
- **Visual alignment can regress while mechanics improve** → Mitigation: include browser screenshots/smoke checks for welcome, tutorial, training, pause, and result surfaces.
