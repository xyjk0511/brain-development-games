# Cognitive Game Research Source Index

Collected: 2026-05-08

这个目录用于后续真正改 17 个游戏时查依据。优先级：官方任务库/论文 > 明确 license 的开源实现 > 普通文章/教程 > 无 license 的个人 demo。

## 本地报告

- `design/chatgpt-research-prompts/01-attention-search-inhibition.md`: 注意力、视觉搜索、反应抑制 prompt。
- `design/chatgpt-research-results/01-attention-search-inhibition.md`: visual-search、reaction-time、stroop、schulte-table 资料报告。
- `design/chatgpt-research-results/02-memory-working-spatial.md`: strong-memory、card-matching、simon-says、n-back 资料报告。
- `design/chatgpt-research-results/03-executive-planning-reasoning.md`: logic-puzzles、tower-of-hanoi、trail-making、water-jugs 资料报告。
- `design/chatgpt-research-results/04-perception-language-arithmetic.md`: mental-rotation、word-scramble、quick-math、number-sequence 资料报告。
- `design/chatgpt-research-results/05-route-maze-track-gameified.md`: maze、route switching、gameified shell 资料报告。
- `design/chatgpt-research-results/06-platform-spec-data-model-curated.md`: 平台规范、统一数据模型、17 游戏映射。

## 平台级来源

- jsPsych data documentation: https://www.jspsych.org/v7/overview/data/
- jsPsych data reference: https://www.jspsych.org/v8/reference/jspsych-data/
- jsPsych plugins overview: https://www.jspsych.org/v7/overview/plugins/
- jsPsych plugin development: https://www.jspsych.org/v8/developers/plugin-development/
- jspsych-contrib GitHub: https://github.com/jspsych/jspsych-contrib
- PsyToolkit experiment library: https://www.psytoolkit.org/experiment-library/
- PEBL official: https://pebl.sourceforge.net/
- PEBL Test Battery: https://pebl.sourceforge.net/battery.html
- PEBL paper: https://pmc.ncbi.nlm.nih.gov/articles/PMC3897935/
- Tatool Web GitHub: https://github.com/tatool/tatool-web
- GitHub license guidance: https://docs.github.com/github/creating-cloning-and-archiving-repositories/licensing-a-repository

## 任务/游戏来源池

### 注意力 / 抑制控制

- PsyToolkit Stroop: https://www.psytoolkit.org/experiment-library/stroop.html
- PsyToolkit Go/No-Go: https://www.psytoolkit.org/experiment-library/
- PsyToolkit Visual Search: https://www.psytoolkit.org/experiment-library/
- jsPsych plugin overview: https://www.jspsych.org/v7/overview/plugins/
- reaction-trainer: https://github.com/aezizhu/reaction-trainer
- freefocusgames: https://github.com/loethen/freefocusgames

### 记忆 / 工作记忆 / 空间记忆

- jspsych-contrib Corsi blocks: https://github.com/jspsych/jspsych-contrib/tree/main/packages/plugin-corsi-blocks
- jspsych-contrib spatial n-back: https://github.com/jspsych/jspsych-contrib/tree/main/packages/plugin-spatial-nback
- PsyToolkit Corsi/N-back/Digit span: https://www.psytoolkit.org/experiment-library/
- Corsi Blocks Task with jsPsych article: https://www.tqmp.org/RegularArticles/vol17-3/p299/p299.pdf
- TaskBeacon N-back: https://taskbeacon.github.io/task-registry/Tasks/nback/main.html
- baljo/n-back: https://github.com/baljo/n-back

### 执行功能 / 规划 / 推理

- jspsych-contrib Tower of London/Hanoi docs: https://github.com/jspsych/jspsych-contrib/blob/main/packages/plugin-tower-of-london/docs/plugin-tower-of-london.md
- jspsych-contrib Trail Making docs: https://github.com/jspsych/jspsych-contrib/blob/main/packages/plugin-trail-making/docs/plugin-trail-making.md
- PsyToolkit Tower of Hanoi: https://www.psytoolkit.org/experiment-library/tower_hanoi.html
- PsyToolkit WCST-inspired: https://www.psytoolkit.org/experiment-library/wcst.html
- PsyToolkit DCCS: https://www.psytoolkit.org/experiment-library/dccs.html
- Card_sorting_jsPsych: https://github.com/vekteo/Card_sorting_jsPsych
- Experiment Factory Tower of London: https://github.com/expfactory-experiments/tower-of-london
- GEJ1/jsPsych_online_TMT: https://github.com/GEJ1/jsPsych_online_TMT
- TMTGen: https://github.com/davidnsousa/TMTGen
- Trail-it: https://github.com/med-material/Trail-it
- Water Jug solver example: https://github.com/khasmamad99/Water-Jug-Problem-Solver
- Water Jug AI article: https://www.geeksforgeeks.org/artificial-intelligence/water-jug-problem-in-ai/

### 感知觉 / 语言 / 算术

- PsyToolkit Mental Rotation: https://www.psytoolkit.org/experiment-library/
- PsyToolkit Navon/global-local tasks: https://www.psytoolkit.org/experiment-library/
- PEBL Mental Rotation: https://pebl.sourceforge.net/battery.html
- PsyToolkit Numerical Stroop / NSCE: https://www.psytoolkit.org/experiment-library/
- jsPsych text/keyboard response plugin docs: https://www.jspsych.org/v7/overview/plugins/
- Navon global-local task background: https://en.wikipedia.org/wiki/Global_precedence
- Semantic categorization/verbal fluency tasks: https://www.psytoolkit.org/experiment-library/

### 社会认知

- Facial emotion recognition / Ekman basic emotions background: https://www.paulekman.com/universal-emotions/
- Gaze cueing / joint attention task background: https://en.wikipedia.org/wiki/Eye_gaze
- jsPsych image/button response plugin docs: https://www.jspsych.org/v7/overview/plugins/
- Theory of Mind task background: https://en.wikipedia.org/wiki/Theory_of_mind

### 路线 / 迷宫 / 游戏化

- track-of-thought-web: https://github.com/mathieucaroff/track-of-thought-web
- Train of Thoughts JS remake: https://github.com/MNaguib2611/Train-of-thoughts-
- cognitive-arcade: https://github.com/Anyma-exe/cognitive-arcade
- brain-development-games: https://github.com/sojinantony01/brain-development-games

## 使用规则

- MIT/Apache/BSD：可以作为代码参考，仍要保留原 license/copyright。
- GPL/AGPL：优先参考任务范式、参数和字段；闭源产品不要直接合并代码。
- 无 license：只看思路，不复制代码。
- 商业测验名称和材料：不要复制正式量表材料，不要声称正式诊断等价。
