# global-local Design Note

## Identity

- `gameId`: `global-local`
- Chinese title: 云朵大小字
- Domain: 感知觉
- Task family: Navon Global-Local / hierarchical stimulus processing

## Evidence basis

- Primary paradigm: Navon global-local task.
- Paper/article references: Navon, 1977, "Forest before trees"; global precedence / local interference literature.
- Open-source/task-library references: PsyToolkit Navon task, jsPsych visual stimulus + button/keyboard response patterns.

## MVP mechanics

- Show a large character made from repeated small characters.
- Cue either global level or local level.
- User selects the target character while ignoring the irrelevant level.
- Trial data records `levelCue`, congruency, response, correctness, RT, and error type.

## Boundary

- Use as a gameified overall-local perception and interference task.
- Do not claim diagnosis of perceptual disorder or clinical attention impairment.
