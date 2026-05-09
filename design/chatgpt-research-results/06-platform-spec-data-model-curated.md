# 06-platform-spec-data-model-curated

Collected: 2026-05-08
Scope: 17 个中文认知训练游戏的统一设计规范、数据规范、算法依据来源。

说明：网页版 ChatGPT 的第 6 个平台规范任务原会话为空壳，重发会话也卡在搜索中。因此本文件使用已打开核验的官方文档、GitHub、PsyToolkit、PEBL、Tatool Web 资料补齐平台规范部分。

## 平台对比表

| 平台/项目 | 官方链接/GitHub | license | 支持的任务类型 | 数据模型/导出机制 | 难度/自适应机制 | 对本项目的借鉴点 | 风险/限制 |
| --- | --- | --- | --- | --- | --- | --- | --- |
| jsPsych | https://www.jspsych.org/v7/overview/data/ | MIT, 以仓库为准 | 反应时、选择、视觉刺激、键盘/按钮响应、timeline 实验 | 每个 trial 自动进入集中 data collection；可用 `data` 参数和 `on_finish` 添加字段；`jsPsych.data.get()` 统一过滤/导出 | 本身不提供游戏化自适应，但 timeline/conditional 可实现 | 统一 `trial` 字段、`condition`、`rt`、`correct`、`response` 的最佳参考 | 默认是实验框架，不是游戏 UI；永久存储要自己实现 |
| jspsych-contrib | https://github.com/jspsych/jspsych-contrib | MIT, 以各 package 为准 | Corsi blocks、spatial n-back、Tower of London/Hanoi、Trail Making、Stop Signal 等 | 每个插件文档描述参数和 data 字段 | 插件参数可配置难度，复杂自适应需自行封装 | 直接参考插件参数命名和 trial 输出字段 | 社区贡献仓库，README 明确不保证核心团队维护 |
| PsyToolkit experiment library | https://www.psytoolkit.org/experiment-library/ | 以各实验页面和 PsyToolkit 条款为准 | 50+ 浏览器实验：Go/No-Go、Corsi、Digit Span、N-back、Stroop、SART、Stop Signal、Tower of Hanoi、Visual Search、WCST 等 | 页面通常有说明、代码下载、参考文献和输出列；可复制/修改实验代码 | 多数任务有固定参数；可以改脚本 | 每个游戏“玩法说明 + 试次逻辑 + 数据输出 + 文献”的文档模板 | 不是商品级游戏 UI；有些任务是 inspired version，不能等同正式版权测验 |
| PEBL / PEBL Test Battery | https://pebl.sourceforge.net/ 和 https://pebl.sourceforge.net/battery.html | GPL | 100+ 心理实验/测验，含 CPT、PVT、Mental Rotation、Trail Making、Tower、WCST 等 | 每个实验保存完整数据，有些还生成 report | 任务脚本可改，适合看标准任务参数 | 参考任务库覆盖面、报告/CSV 输出和经典测验组织方式 | GPL 对闭源复用不友好；更多适合参考范式和字段，不建议直接移植代码 |
| Tatool Web | https://github.com/tatool/tatool-web | GPL-3.0 | 浏览器实验/训练模块平台 | 仓库定位为 researcher experiment software，适合看 module/export/项目组织 | 原 Tatool 思路强调训练模块和 level handler；具体实现需读代码 | 参考“模块配置 + session/export + 自适应规则”平台层设计 | 项目较老，GPL-3.0；不要直接并入闭源产品 |
| brain-development-games | https://github.com/sojinantony01/brain-development-games | MIT, 以仓库为准 | 21 个网页认知小游戏 | 适合作为游戏化 UI 与路由结构参考 | 10 级难度/游戏进度 | 我们当前 17 个游戏的直接底座之一 | 科学依据和数据记录需要补强 |
| reaction-trainer | https://github.com/aezizhu/reaction-trainer | Apache-2.0, 以仓库为准 | Reaction Time、Aim Trainer、Sequence Memory、Go/No-Go、Stroop、Stop Signal 等 | React/TS 结构适合参考历史表现和训练 app 形态 | 任务参数可扩展 | 注意力/抑制控制/反应时类游戏的现代 React 参考 | UI 不一定适合儿童/康复风格，需要重新视觉包装 |
| freefocusgames | https://github.com/loethen/freefocusgames | AGPL-3.0, 以仓库为准 | Dual N-Back、Schulte Table、Stroop、Reaction Time、Block Memory | Next.js/Tailwind 项目结构 | 可参考任务难度 | 开源网页训练站点形态 | AGPL 强 copyleft，不适合闭源直接复用 |
| cognitive-arcade | https://github.com/Anyma-exe/cognitive-arcade | MIT, 以仓库为准 | Stroop、N-Back、Go/No-Go 原型 | 简单 HTML/CSS/JS | 简单参数 | 快速看懂底层任务逻辑 | 规模小，不能当产品底座 |

## 推荐统一数据模型

```json
{
  "session": {
    "sessionId": "uuid",
    "gameId": "tower-of-hanoi",
    "domain": "executive",
    "taskFamily": "Tower of London/Hanoi",
    "mode": "train",
    "level": 4,
    "startedAt": "2026-05-08T10:00:00.000Z",
    "completedAt": "2026-05-08T10:03:20.000Z",
    "summary": {
      "score": 820,
      "accuracy": 0.86,
      "meanRtMs": 734,
      "medianRtMs": 690,
      "totalTrials": 20,
      "correctTrials": 17,
      "errorCount": 3
    },
    "trials": [],
    "events": [],
    "adaptive": {
      "previousLevel": 4,
      "recommendedLevel": 5,
      "reason": "accuracy>=0.85 and medianRtMs<=target",
      "rules": [
        {"if": "accuracy >= 0.85 && errorCount <= 2", "then": "level+1"},
        {"if": "accuracy < 0.6 || abort", "then": "level-1"}
      ]
    }
  }
}
```

```json
{
  "trial": {
    "trialId": "trial-001",
    "blockId": "formal-1",
    "condition": "incongruent",
    "stimulus": {"type": "text", "value": "RED", "color": "blue"},
    "correctAnswer": "blue",
    "response": "blue",
    "correct": true,
    "rtMs": 642,
    "errorType": null,
    "difficultyParams": {
      "gridSize": 4,
      "setSize": 16,
      "sequenceLength": 5,
      "n": 2,
      "timeLimitMs": 3000
    },
    "metrics": {
      "moves": 7,
      "optimalMoves": 7,
      "falseAlarms": 0,
      "misses": 1,
      "pathLength": 432
    }
  }
}
```

```json
{
  "event": {
    "eventId": "event-001",
    "type": "click",
    "timestamp": "2026-05-08T10:01:02.123Z",
    "rtMs": 512,
    "payload": {
      "targetId": "cell-7",
      "x": 382,
      "y": 241,
      "valid": true
    }
  }
}
```

## 推荐设计规范模板

每个游戏都要有一个独立文档，字段固定：

1. 游戏定位：训练/评估、目标用户、训练时长、单局结构。
2. 成熟任务范式：英文任务名、变体、是否是正式测验或 inspired version。
3. 认知域：注意力、记忆力、感知觉、执行能力、社会认知、言语。
4. 玩法：用户看到什么、做什么、反馈什么、何时结束。
5. 试次生成：刺激池、随机化、条件平衡、目标/干扰项比例、练习/正式分离。
6. 难度参数：level 映射到哪些参数，最小/最大值，升级/降级规则。
7. 计分：准确率、反应时、错误类型、组合分、封顶/惩罚。
8. 数据字段：session summary、trial、event、adaptive 必填字段。
9. 开源/论文依据：至少 1 个开源实现或任务库 + 1 篇论文/正式说明文章。
10. 医疗声明边界：只能说训练/评估维度，不能宣称治疗、诊断或改善疾病。

## 17 个游戏映射建议

| gameId | 中文定位 | 成熟范式 | 主要参考 | 数据字段重点 |
| --- | --- | --- | --- | --- |
| visual-search | 视觉搜索/找目标 | Visual Search, Feature/Conjunction Search | PsyToolkit Visual Search, jsPsych visual search examples | setSize, targetPresent, distractorCount, response, rtMs, correct |
| reaction-time | 反应速度/抑制 | Simple RT, Go/No-Go, PVT | PsyToolkit Go/No-Go, PVT, reaction-trainer | goNoGo, stimulusOnset, commissionError, omissionError, rtMs |
| stroop | 反应抑制 | Stroop Task | PsyToolkit Stroop, jsPsych examples | congruent/incongruent, word, inkColor, response, correct, rtMs |
| schulte-table | 注意广度/顺序搜索 | Schulte Table / visual scanning | freefocusgames, reaction-trainer 类项目 | gridSize, nextTarget, clickOrder, wrongClicks, completionMs |
| strong-memory | 位置记忆 | Corsi Block / Spatial Recall | jspsych-contrib Corsi, PsyToolkit Corsi | sequence, clickedSequence, span, misses, falseOrder |
| card-matching | 图像配对记忆 | Paired Associate / Concentration | HTML/React memory game examples | pairCount, flips, matchedPairs, mismatchCount, completionMs |
| simon-says | 序列工作记忆 | Serial Recall / Simon game | Simon game OSS, Corsi analog | sequenceLength, playbackMs, responseSequence, longestSpan |
| n-back | 工作记忆刷新 | N-back / Spatial N-back | jspsych-contrib spatial-nback, PsyToolkit N-back | n, targetRate, hit, falseAlarm, miss, dPrime |
| logic-puzzles | 规则归纳 | Card Sorting, DCCS, matrix reasoning | PsyToolkit WCST/DCCS, Card_sorting_jsPsych | rule, ruleSwitch, perseverativeError, correct |
| tower-of-hanoi | 规划 | Tower of Hanoi / Tower of London | jspsych-contrib tower-of-london, PsyToolkit Tower of Hanoi, PEBL | initialState, goalState, moves, optimalMoves, invalidMoves |
| trail-making | 注意转换 | Trail Making Test A/B | jspsych-contrib trail-making, PEBL TMT | testType, targets, clicks, errors, pathDistance, completionMs |
| water-jugs | 问题解决 | Water Jug problem, state-space search | BFS/AI water jug examples, Luchins Einstellung | capacities, goal, moves, optimalMoves, visitedStates |
| mental-rotation | 空间感知 | Mental Rotation | PsyToolkit Mental Rotation, PEBL Mental Rotation | angle, sameDifferent, response, correct, rtMs |
| global-local | 整体/局部知觉 | Navon Global-Local | PsyToolkit Navon, jsPsych visual response examples | levelCue, congruent, globalStimulus, localStimulus, response, correct, rtMs |
| visual-discrimination | 视觉辨别 | Visual Discrimination / Odd-One-Out | jsPsych image/button response examples, PsyToolkit visual tasks | featureDimension, setSize, oddTarget, response, correct, rtMs |
| word-scramble | 词汇/语言 | Anagram / word recognition | jsPsych text response examples | word, scrambled, responseText, editDistance, solved |
| quick-math | 算术速度 | Mental arithmetic / arithmetic verification | PsyToolkit numerical Stroop/NSCE, math RT tasks | expression, answer, response, correct, rtMs, operation |
| category-fluency | 语义分类 | Semantic Categorization / Verbal Category Knowledge | jsPsych text/button response examples | category, targetWord, distractors, response, correct, rtMs |
| emotion-match | 表情识别 | Facial Emotion Recognition | jsPsych image/button response examples, emotion-recognition task literature | emotion, expressionCue, response, correct, rtMs |
| gaze-follow | 眼神线索 | Gaze Cueing / Joint Attention | jsPsych spatial cueing patterns | cueDirection, targetSide, response, correct, rtMs |
| social-scenario | 社会情境推断 | Social Inference / Theory of Mind | jsPsych survey/button response examples | scenarioCue, inferenceType, response, correct, rtMs |
| number-sequence | 数字规律 | Number series / sequence reasoning | matrix reasoning/induction examples | ruleType, sequence, missingIndex, response, correct |
| maze | 路径规划/空间导航 | Maze learning, route memory, path planning | open maze/BFS games, track-of-thought route switching | mazeSeed, path, wrongTurns, completionMs, replans |

## 设计原则

- 代码可以参考开源项目，但实现要做成自己的主题、美术、命名和素材，不复制 Lumosity 或商业测验 UI。
- 对 GPL/AGPL 项目只参考思路和字段；闭源商业化产品不要直接合并代码。
- 每个游戏必须至少留下：`gameId`、`taskFamily`、`domain`、`level`、`summary`、`trials`、`events`、`adaptive`。
- 计分不要只存总分。必须保留 trial 级别的反应时、正确性、错误类型、难度参数，否则后续测评报告无法解释。
- 医疗边界：不写“治疗 ADHD/阿尔茨海默/认知障碍”，只写“训练任务”“表现指标”“辅助评估维度”，正式临床用途需要验证和合规审批。

## 已核验来源

- jsPsych data: https://www.jspsych.org/v7/overview/data/
- jsPsych plugin overview: https://www.jspsych.org/v7/overview/plugins/
- jspsych-contrib: https://github.com/jspsych/jspsych-contrib
- PsyToolkit experiment library: https://www.psytoolkit.org/experiment-library/
- PEBL: https://pebl.sourceforge.net/
- PEBL Test Battery: https://pebl.sourceforge.net/battery.html
- PEBL paper: https://pmc.ncbi.nlm.nih.gov/articles/PMC3897935/
- Tatool Web: https://github.com/tatool/tatool-web
- GitHub licensing note: https://docs.github.com/github/creating-cloning-and-archiving-repositories/licensing-a-repository
