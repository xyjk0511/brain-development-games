你是认知训练游戏资料研究员。请大量搜集并整理以下 4 个记忆/工作记忆/空间记忆游戏的设计依据，必须给可追溯来源。

项目背景：我们正在做中文网页认知训练/评估系统，已有游戏不是照抄 Lumosity，而是把成熟认知任务游戏化。需要每个游戏都有“开源代码案例或论文/文章/算法依据”。

本批游戏：
1. strong-memory：强力记忆/绿格记忆，类似 Memory Matrix / Corsi block / spatial recall，记住亮起格子再点击。
2. card-matching：翻牌配对，视觉-空间记忆/匹配记忆。
3. simon-says：颜色灯光序列复现，序列记忆，类似 Simon game / Corsi sequence。
4. n-back：工作记忆 N-back，动物/图片序列，判断当前是否匹配前 n 项。

请输出一个 Markdown 报告，结构如下：

## 总结表
每行一个游戏，列包括：
- 我们的游戏
- 对应成熟任务范式
- 认知域
- 可参考开源项目/库/插件，给 GitHub 或官方链接
- 论文/正式文章/经典任务来源，给标题、年份、链接
- 核心算法/试次生成逻辑
- 应记录的数据字段
- 我们当前设计应该保留/改进点

## 每个游戏详细依据
每个游戏至少列：
1. 2-4 个开源代码/库/插件案例，优先 jsPsych、jspsych-contrib、PsyToolkit、PEBL、freefocusgames、reaction-trainer、Human Benchmark 类开源实现。
2. 2-4 篇论文、综述、正式说明文章或经典任务来源。
3. 任务参数：网格大小、目标数量、展示时长、序列长度、N 值、匹配比例、干扰比例、难度阶梯、计分方式、自适应建议。
4. 数据字段：trial_id, condition, stimulus, target_set/sequence, response, hits, misses, false_alarms, correct, rt_ms, error_type 等。
5. 风险边界：哪些不能声称医疗疗效，哪些只能说训练/评估维度。

要求：
- 不要编造链接。找不到就写“未找到可靠来源”，并说明替代来源。
- 开源项目要说明 license 情况，如果页面能看到。
- 给中文结论，但保留英文任务名和论文题名。
- 尽量多搜，宁可长一点。
