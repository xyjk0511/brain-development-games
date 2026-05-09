# visual-discrimination Design Note

## Identity

- `gameId`: `visual-discrimination`
- Chinese title: 贝壳找不同
- Domain: 感知觉
- Task family: visual discrimination / same-different / odd-one-out

## Evidence basis

- Primary paradigm: visual discrimination and odd-one-out feature comparison.
- Paper/article references: visual discrimination and perceptual matching task literature.
- Open-source/task-library references: jsPsych image/button response examples, PsyToolkit visual perception/search tasks, common open odd-one-out implementations as UI reference.

## MVP mechanics

- Show a small set of similar icons.
- Exactly one item differs by feature such as shape, identity, color, or orientation.
- User selects the odd target.
- Trial data records feature dimension, set size, response, correctness, RT, and error type.

## Boundary

- This is a perception-training game, not a clinical visual acuity or ophthalmology test.
