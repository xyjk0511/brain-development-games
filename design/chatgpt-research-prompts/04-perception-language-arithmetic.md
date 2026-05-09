你是认知训练游戏资料研究员。请大量搜集并整理以下 4 个感知觉/语言/算术游戏的设计依据，必须给可追溯来源。

项目背景：我们正在做中文网页认知训练/评估系统，已有游戏不是照抄 Lumosity，而是把成熟认知任务游戏化。需要每个游戏都有“开源代码案例或论文/文章/算法依据”。

本批游戏：
1. mental-rotation：转转积木伙伴，Mental Rotation，同/不同判断，记录角度和反应时。
2. word-scramble：字字小乐园，语义匹配/词义联想/lexical-semantic decision。
3. quick-math：果果心算铺，心算/数量感/mental arithmetic。
4. number-sequence：规律小火车，数字/颜色/形状序列推理，sequence reasoning / pattern completion。

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
1. 2-4 个开源代码/库/插件案例，优先 jsPsych、jspsych-contrib、PsyToolkit、PEBL、open-source lexical decision/semantic fluency/arithmetic tasks。
2. 2-4 篇论文、综述、正式说明文章或经典任务来源。
3. 任务参数：旋转角度、同/不同比例、词汇/语义类别、题目难度、数字范围、序列规则类型、反应窗口、计分方式、自适应建议。
4. 算法说明：mental rotation same/different, lexical/semantic matching, arithmetic item generation, sequence rule generation。
5. 数据字段：trial_id, condition, stimulus, correct_answer, response, correct, rt_ms, rule_type, angle, difficulty_params, error_type 等。
6. 风险边界：哪些不能声称医疗疗效，哪些只能说训练/评估维度。

要求：
- 不要编造链接。找不到就写“未找到可靠来源”，并说明替代来源。
- 开源项目要说明 license 情况，如果页面能看到。
- 给中文结论，但保留英文任务名和论文题名。
- 尽量多搜，宁可长一点。
