# logic-puzzles Design Note

## Identity

- `gameId`: `logic-puzzles`
- Chinese name: 规则分类/逻辑推理
- Domain: 执行功能
- Task family: Rule Induction, Card Sorting, DCCS, Matrix Reasoning
- Remake depth: rebuild

## Product Positioning

用户根据反馈归纳隐藏分类规则，或在规则切换后快速调整策略。主题应保持原创，例如“魔法货架分类”或“机器人分拣”，不使用正式 WCST 名称作为产品名。

## Mature Task Basis

- Primary paradigm: card sorting / rule induction。
- Related paradigms: DCCS, Raven-like matrix reasoning.
- References: PsyToolkit WCST-inspired/DCCS, Card_sorting_jsPsych, PEBL WCST, local `03-executive-planning-reasoning.md`.
- License boundary: WCST 正式材料有版权边界；PsyToolkit 也标注 inspired 版本，产品内只写“规则归纳任务”。

## Gameplay Contract

- Start state: hidden active rule and reference cards/objects.
- User action: classify target item.
- Feedback: correct/incorrect, no direct rule reveal until block end.
- End condition: rule mastered, rule switch count reached, or fixed trials.
- Result state: rule switches, perseverative errors, trials to criterion.

## Trial Generation

- Stimulus pool: objects varying in color/shape/number/category.
- Randomization: target cards generated with separable dimensions.
- Conditions: current rule, switch/no-switch, ambiguous/non-ambiguous cards.
- Practice/formal separation: explicit-rule practice, then hidden-rule block.
- Difficulty parameters: `ruleCount`, `switchInterval`, `dimensionCount`, `feedbackDelayMs`.

## Scoring

- Accuracy: correct classification.
- Error types: `wrong_rule`, `perseverative_error`, `random_error`, `timeout`.
- Composite score: accuracy, fewer perseverative errors, faster rule acquisition.
- Adaptive rule: add dimensions or shorter switch interval after stable performance.

## Required Data

- Session summary: accuracy, ruleSwitches, perseverativeErrors, trialsToCriterion.
- Trial fields: rule, targetFeatures, responseCategory, correct, rtMs, errorType.
- Event fields: card/category clicks.
- Adaptive fields: next dimension count and switch interval.

## Visual / UX Direction

Rebuild current toy puzzle into a polished classification scene with clear reference bins and subtle feedback.

## Clinical / IP Boundary

Allowed: “规则归纳/认知灵活性任务”。 Forbidden: claiming formal WCST equivalence.
