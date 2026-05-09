你是认知训练游戏资料研究员。请大量搜集并整理以下 4 个执行功能/规划/推理游戏的设计依据，必须给可追溯来源。

项目背景：我们正在做中文网页认知训练/评估系统，已有游戏不是照抄 Lumosity，而是把成熟认知任务游戏化。需要每个游戏都有“开源代码案例或论文/文章/算法依据”。

本批游戏：
1. logic-puzzles：简单逻辑谜题/规则分类，按线索选择或排序物品，类似 rule induction / card sorting / matrix reasoning。
2. tower-of-hanoi：甜甜圈收纳架，Tower of Hanoi / Tower of London 风格规划任务。
3. trail-making：顺序寻宝，Trail Making Test A/B，按顺序连接节点。
4. water-jugs：小熊果汁铺，Water Jug problem / Einstellung effect / BFS 求解，可作为规划和问题解决任务。

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
1. 2-4 个开源代码/库/插件案例，优先 jsPsych、jspsych-contrib、PsyToolkit、PEBL、Tatool、其他开源任务实现。
2. 2-4 篇论文、综述、正式说明文章或经典任务来源。
3. 任务参数：节点/盘子/杯子数量、目标状态、最优步数、错误类型、时间限制、难度阶梯、计分方式、自适应建议。
4. 算法说明：Tower 最优解/状态空间，Trail 顺序连接，Water Jug BFS/图搜索，Logic puzzle 规则生成。
5. 数据字段：trial_id, initial_state, goal_state, moves, optimal_moves, rule, condition, response, correct, rt_ms, error_type 等。
6. 风险边界：哪些不能声称医疗疗效，哪些只能说训练/评估维度。

要求：
- 不要编造链接。找不到就写“未找到可靠来源”，并说明替代来源。
- 开源项目要说明 license 情况，如果页面能看到。
- 给中文结论，但保留英文任务名和论文题名。
- 尽量多搜，宁可长一点。
