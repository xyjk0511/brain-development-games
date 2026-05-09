# 06-platform-spec-data-model

Source conversation: https://chatgpt.com/c/69fdbf28-140c-83ea-91f6-cccd621e83b6
Collected: 2026-05-08T10:48:27.116Z
Extraction method: main.innerText
Redispatched because original conversation returned an empty shell.

---

任务编号：06-platform-spec-data-model-REDISPATCH

你是认知训练平台架构和实验数据规范研究员。请大量搜集资料，帮助我们给 17 个中文认知训练游戏建立统一设计规范、数据规范和算法依据。

项目背景：我们正在做中文网页认知训练/评估系统，已有 17 个游戏：
visual-search, simon-says, strong-memory, card-matching, reaction-time, schulte-table, word-scramble, maze, logic-puzzles, tower-of-hanoi, n-back, mental-rotation, stroop, trail-making, number-sequence, water-jugs, quick-math。

我们需要把每个游戏都映射到成熟认知任务，并统一记录：
summary / trials / events / adaptive。

请重点搜集这些平台/规范：
1. jsPsych / jspsych-contrib：插件结构、timeline、trial data、response time 字段、相关插件列表。
2. PsyToolkit experiment library：任务说明、数据输出列、可下载/可修改代码。
3. PEBL / PEBL Test Battery：开源心理实验库、任务 battery、数据输出和测试可靠性文献。
4. Tatool Web：module JSON、level handler、自适应难度、session/export 结构。
5. 其他可参考的认知训练开源项目：freefocusgames, reaction-trainer, cognitive-arcade, brain-development-games 类项目。

请输出一个 Markdown 报告：

## 平台对比表
列包括：
- 平台/项目
- 官方链接/GitHub
- license
- 支持的任务类型
- 数据模型/导出机制
- 难度/自适应机制
- 对我们项目的可借鉴点
- 风险/限制

## 推荐统一数据模型
给出 JSON schema 草案，至少包括：
- session: gameId, domain, taskFamily, mode, level, startedAt, completedAt, summary, trials, events, adaptive
- trial: trialId, condition, stimulus, correctAnswer, response, correct, rtMs, errorType, difficultyParams
- event: eventId, type, timestamp/rtMs, payload
- adaptive: recommendedLevel, reason, previousLevel, rules

## 推荐设计规范模板
给每个游戏的文档模板，包括：
- 游戏定位
- 成熟任务范式
- 认知域
- 玩法
- 试次生成
- 难度参数
- 计分
- 数据字段
- 开源/论文依据
- 医疗声明边界

## 17 个游戏映射建议
每个游戏一行，给：
- 成熟范式
- 主要参考平台/开源实现
- 论文/文章方向
- 数据字段重点
- 下一步需要补充的资料

要求：
- 不要编造链接。找不到就写“未找到可靠来源”，并说明替代来源。
- 开源项目要说明 license 情况，如果页面能看到。
- 给中文结论，但保留英文任务名和论文题名。
- 尽量多搜，宁可长一点。
展开

我会先核验官方文档、GitHub/license 与论文或手册来源，把成熟任务范式和工程数据结构分开整理，再合并成可落地的统一规范。对来源不足、名称不明确或找不到可靠出处的项目，会明确标注并给出替代依据。

I’m trying t

进阶专业
ChatGPT 也可能会犯错。请核查重要信息。查看 你的隐私选择。⁠