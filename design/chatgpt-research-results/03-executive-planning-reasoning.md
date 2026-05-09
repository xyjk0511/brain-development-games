# 03-executive-planning-reasoning

Source conversation: https://chatgpt.com/c/69fdba25-82fc-83ea-9847-f80f7e6150d3
Collected: 2026-05-08T10:43:29.259Z
Extraction method: main.innerText

---

任务编号：03-executive-planning-reasoning

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
展开

我会按成熟任务、开源实现、文献依据、算法生成、数据记录和风险边界整合四个游戏，并优先核对官方文档、GitHub、任务库与论文来源。

目前已确认 jsPsych-contrib 的 Tower of London/Hanoi 与 Trail Making 插件可直接参考，且标注 MIT；同时会把 PsyToolkit WCST 仅为 inspired task 的限制写入边界。

Thought for 14m 30s
03-executive-planning-reasoning：执行功能 / 规划 / 推理游戏设计依据报告

说明：以下“开源 / license”只按检索页面中可见信息记录；页面未显示 license 的项目不按开源许可假定处理。中文网页系统可以借鉴任务范式、状态空间、计分与数据字段，但不应复制受版权保护的标准测验材料或宣称医疗诊断、治疗、康复疗效。

总结表
我们的游戏	对应成熟任务范式	认知域	可参考开源项目 / 库 / 插件	论文 / 正式文章 / 经典任务来源	核心算法 / 试次生成逻辑	应记录的数据字段	我们当前设计应该保留 / 改进点
logic-puzzles 简单逻辑谜题 / 规则分类	Rule induction、Wisconsin Card Sorting Test-like、Dimensional Change Card Sort、Raven-like matrix reasoning	规则归纳、抽象推理、认知灵活性、集合转换、工作记忆	Card_sorting_jsPsych，MIT，隐藏规则按 Color / Shape / Number 分类；PsyToolkit 的 WCST-inspired 和 DCCS 页面提供源码 / zip，但 WCST 页面明确说不是正式 copyrighted WCST；PEBL battery 含 Wisconsin Card Sort，PEBL 是 GPL；Corvus 是 JavaScript Raven-like test generator，GPL-3.0。
GitHub
+3
GitHub
+3
PsyToolkit
+3
	Berg, “A simple objective technique for measuring flexibility in thinking,” 1948；Grant & Berg, “A behavioral analysis of degree of reinforcement and ease of shifting to new responses in a Weigl-type card-sorting problem,” 1948；Zelazo, “The Dimensional Change Card Sort,” 2006；Raven’s Progressive Matrices 原始材料可追溯到 Raven 1938。
美国历史国家博物馆
+3
Labvanced
+3
PubMed
+3
	生成属性向量：颜色、形状、数量、位置等；每个 block 指定一条隐藏规则，按固定标准或连续正确数切换规则；矩阵题生成 2×2 / 3×3 关系规则并保证唯一正确答案。	trial_id, block_id, rule, previous_rule, switch_flag, stimulus_set, options, correct_option, response, correct, rt_ms, feedback, perseverative_error, nonperseverative_error, timeout, difficulty_level	保留“按线索选择 / 排序物品”的游戏化外观；改进为可解释的规则库、唯一解校验、规则切换、错误类型区分，避免声称等同正式 WCST / Raven。
tower-of-hanoi 甜甜圈收纳架	Tower of Hanoi、Tower of London	规划、目标分解、抑制冲动、问题解决、空间工作记忆	jspsych-contrib 的 tower-of-london 插件，MIT，可设置 start_state, goal_state, peg_capacities, optimal_moves, max_moves, time_limit；PsyToolkit Tower of Hanoi 页面提供源码 / zip；PEBL battery 含 Tower of London / Hanoi，PEBL 为 GPL；Experiment Factory tower-of-london 为 MIT。
GitHub
+4
GitHub
+4
GitHub
+4
	Shallice, “Specific impairments of planning,” 1982；Krikorian et al., “Tower of London procedure: a standard method and developmental data,” 1994；Berg & Byrd, “The Tower of London spatial problem-solving task,” 2002；Bishop et al., “Individual differences in cognitive planning on the Tower of Hanoi task,” 2001。
PubMed
+3
PubMed
+3
PubMed
+3
	状态表示为每根柱子的栈；合法移动为一次移动一个盘 / 球，且遵守容量与大小约束；Hanoi 经典最优步数为 2^n - 1，Tower of London 可用 BFS 预计算最短路径。	trial_id, initial_state, goal_state, peg_capacities, disk_count, moves, legal, invalid_move_count, first_move_latency_ms, planning_latency_ms, num_moves, optimal_moves, excess_moves, solved, rt_ms, final_state	保留“甜甜圈收纳架”视觉隐喻；改进为明确目标图、步数计数、非法操作反馈、按最优步数分级的题库、BFS 校验。
trail-making 顺序寻宝	Trail Making Test A / B	视觉搜索、加工速度、注意转换、认知灵活性、序列追踪	jspsych-contrib 的 trail-making 插件，MIT，支持 Part A 数字顺序和 Part B 数字 / 字母交替；PEBL battery 含 Trail Making，PEBL 为 GPL；TMTGen 是 GPL-3.0 的自动 TMT generator；Trail-it 是 GPL-3.0 的 TMT 数字化 / 认知训练项目；react-neuropsych-trails 有 React 组件但页面未显示 license。
GitHub
+6
GitHub
+6
GitHub
+6
	Reitan, “The relation of the Trail Making Test to organic brain damage,” 1955；Reitan, “Validity of the Trail Making Test as an Indicator of Organic Brain Damage,” 1958；Tombaugh, “Trail Making Test A and B: normative data stratified by age and education,” 2004；Arbuthnott & Frank, “Trail Making Test, Part B as a Measure of Executive Control,” 2000。
PubMed
+3
PubMed
+3
Sage Journals
+3
	生成节点序列：Part A 为 1..N，Part B 为 1-A-2-B...；在画布上按最小间距随机放置节点；点击时校验是否为下一目标节点，记录错误与路径。	trial_id, test_type, node_count, targets, seed, clicks, expected_label, clicked_label, correct, error_type, completion_time_ms, inter_click_times, total_path_distance, num_errors, timeout	保留“顺序寻宝”的节点连接玩法；改进为 seeded 随机布局、最小间距、防重叠、Part A/B 分 block、完整点击轨迹与错误记录；不要复制正式纸笔测验版式。
water-jugs 小熊果汁铺	Water Jug problem、Einstellung effect、state-space search / BFS planning	问题解决、规划、策略更新、心理定势、图搜索	Water-Jug-Problem-Solver，MIT，支持 DFS / BFS；Water_Jug_Problem_Solver_AI，MIT；Zyepher/water-jug-problem，MIT，含 BFS / DFS / A* / Bidirectional Search；generic-planner-for-minigames，MIT，含 Water Jug 小游戏规划器。
GitHub
+3
GitHub
+3
GitHub
+3
	Luchins, “Mechanization in problem solving: The effect of Einstellung,” 1942；Water Jug problem 常作为 AI state-space search 示例；大学课件把状态定义为 (x,y)，从 (0,0) 到目标状态并列出 fill / empty / pour operators。
语义学者
+2
GeeksforGeeks
+2
	状态为各杯当前容量 tuple；操作为 fill、empty、pour；BFS 从初始状态搜索到目标谓词，得到最优步数；Einstellung 条件可先给一组诱发固定策略的题，再给有更短解的关键题。	trial_id, jug_capacities, initial_state, goal_amount, goal_predicate, actions, legal, state_sequence, optimal_moves, num_moves, excess_moves, invalid_action_count, repeated_state_count, used_set_solution, simpler_solution_available, rt_ms, solved	保留“果汁铺倒杯子”的情境；改进为 BFS 自动出题、可解性校验、最优步数标注、心理定势条件标记、提示系统与策略路径分析。
每个游戏详细依据
1. logic-puzzles：简单逻辑谜题 / 规则分类
1.1 对应成熟任务范式

这个游戏可以同时吸收三类成熟范式。

第一类是 Card Sorting / Rule Induction。经典结构是给定若干参考卡片和一张目标卡片，参与者需要根据隐藏规则把目标卡片归类。规则可能是颜色、形状、数量等维度；规则切换后，参与者需要从反馈中重新归纳当前规则。PsyToolkit 的 WCST-inspired 任务说明中明确描述了按 color、shape、number 分类，并且规则会变化，用来测量适应规则变化的能力。
PsyToolkit

第二类是 Dimensional Change Card Sort。Zelazo 的 “The Dimensional Change Card Sort” 说明该任务让被试先按一个维度分类，再按另一个维度分类，是常用的执行功能测量范式。
Experts@Minnesota

第三类是 Raven-like matrix reasoning。Raven’s Progressive Matrices 的基本形式是矩阵图案中缺失一格，被试从备选项中选择能补全规律的图案；原始 Raven 材料可追溯到 1938 年，包含 5 组、每组 12 页图形。
美国历史国家博物馆

1.2 开源代码 / 库 / 插件案例

Card_sorting_jsPsych
这是一个 jsPsych 版 Card Sorting Task，页面说明它基于 Berg’s Card Sorting Test，设计目标是测量 cognitive flexibility 和 abstract reasoning。其 README 描述隐藏规则为 Color、Shape、Number，用户根据隐藏规则分类目标卡；页面显示 license 为 MIT。
GitHub
+1

可借鉴点：隐藏规则、反馈驱动学习、perseverative responses / errors、categories achieved、trials to complete first category 等汇总指标。该项目列出的 summary stats 包括总试次数、正确率、总错误、完成类别数、perseverative responses/errors、failure to maintain set 等。
GitHub

PsyToolkit WCST-inspired task
PsyToolkit 的 WCST 页面提供可运行实验、源码与下载入口；任务说明引用 Grant and Berg 1948，并描述按颜色、形状、数量分类，规则每 10 张卡变化。它同时明确说明，这个实现不是正式 copyrighted Wisconsin Card Sorting Test，而是受 Berg 原作启发、在实现细节上有差异。
PsyToolkit
+1

license 情况：页面未在同处显示 OSI license；可作为任务逻辑与数据字段参考，但不应复制为“正式 WCST”。

PsyToolkit Dimensional Change Card Sorting task
PsyToolkit DCCS 页面描述了顶端卡片与底部两张卡片，参与者根据规则匹配卡片；页面说明儿童通常在规则切换时更困难，成人版本可类比 task switching。
PsyToolkit

可借鉴点：pre-switch / post-switch 结构、condition 字段、训练试次与正式试次分离。PsyToolkit 该实现的数据列包括 trial number、block name、condition、reaction time、status 等。
PsyToolkit

PEBL Test Battery 的 Wisconsin Card Sort
PEBL 官方说明其为免费、开源心理实验编程语言 / 环境，license 为 GPL，并包含 100 多个 ready-made psychological tests。PEBL battery 列表中包含 Trail Making、Wisconsin Card Sort、Tower of London / Hanoi 等执行功能任务。
PEBL
+1

可借鉴点：作为经典任务的开源 battery 参考；适合查看 EF 任务如何组织输出数据。

Thimbleby/Corvus Raven-like generator
Corvus 页面显示 license 为 GPL-3.0，README 说明它是用 JavaScript 写的 automatic Raven’s-like test generator，并说明 Raven’s Progressive Matrices 是一类非言语智力测验。
GitHub
+1

可借鉴点：矩阵题自动生成、规则组合、图案变化、唯一答案控制。注意：Raven 名称和原始题目不应复制，适合做“Raven-like / matrix reasoning-inspired”自研题库。

1.3 论文 / 正式文章 / 经典任务来源

Berg, “A simple objective technique for measuring flexibility in thinking,” 1948
这是 card sorting / flexibility in thinking 的经典来源之一。Labvanced 的 WCST 参考文献列表也列出 Berg 1948 这篇文章。
Labvanced

Grant & Berg, “A behavioral analysis of degree of reinforcement and ease of shifting to new responses in a Weigl-type card-sorting problem,” 1948
这篇 Journal of Experimental Psychology 文章是 WCST 传统的核心来源之一，题名强调 reinforcement 与 shifting to new responses。
PubMed

Zelazo, “The Dimensional Change Card Sort,” 2006
Nature Protocols 文章，说明标准 DCCS 是把 bivalent cards 先按一个维度分类，再按另一个维度分类。
Experts@Minnesota

Raven’s Progressive Matrices，1938 起源
Raven 原始图形材料说明包含五组 12 页题目，任务是在矩阵中选择缺失图案。
美国历史国家博物馆

Miles et al., “Considerations for using the Wisconsin Card Sorting Test to assess cognitive flexibility,” 2021
可作为现代使用 WCST 评价 cognitive flexibility 时的注意事项来源。Labvanced 的 WCST 参考文献列表列出该文。
Labvanced

1.4 任务参数建议

基础规则分类版本可以设置为：

参数	建议
维度	color, shape, number, 可扩展 size, texture, position
每题备选数	2、3、4 个，初期 2 选 1，正式版 4 选 1
规则切换	固定 8–10 题切换，或连续正确 5–8 次后切换
反馈	训练阶段显示“正确 / 错误”；正式评估阶段可弱化反馈或只记录
难度阶梯	单维规则 → 规则切换 → 双规则 conjunctive rule → 矩阵推理
错误类型	普通错误、perseverative error、非坚持性错误、超时、未响应
时间限制	简单分类 5–10 秒 / 题；矩阵题 20–60 秒 / 题，取决于复杂度
计分方式	正确率、平均 RT、规则发现速度、切换后恢复速度、perseverative error 比例
自适应	连续正确且 RT 稳定则增加维度或减少提示；连续错误则回退到单维规则或增加反馈

矩阵推理版本可以设置为：

参数	建议
矩阵大小	入门 2×2；进阶 3×3
规则类型	颜色递变、形状递变、数量递增、旋转、位置平移、叠加 / XOR
备选项	4、6、8 个；至少包含“只满足部分规则”的诱饵项
唯一解	试次生成后必须自动验证只有一个选项满足所有规则
难度控制	规则数、维度数、干扰项相似度、是否组合规则
1.5 算法说明

规则分类可用属性向量生成：

item = {
  color: red / blue / yellow / green,
  shape: circle / square / triangle / star,
  number: 1 / 2 / 3 / 4,
  size: small / large
}

每个 trial 包含一个目标物品和若干候选物品。当前规则 rule_dimension = color 时，正确选项是与目标物品颜色相同的候选物；rule_dimension = shape 时，正确选项是形状相同的候选物。生成时需要保证：

当前规则下只有一个正确项。

其他维度上可以有诱饵，但不能造成多解。

规则切换后，上一规则对应的候选物可作为 perseverative lure，用于识别坚持性错误。

记录被试是否继续按旧规则作答。

矩阵推理可用规则函数生成：

cell[row][col] = transform(base, row_rule(row), col_rule(col))

例如：

shape: row 递变
color: column 递变
count: row + column
rotation: column * 90°

生成完整矩阵后隐藏一格，再生成候选项。候选项应包括：

完全正确项。

只满足行规则但不满足列规则的项。

只满足列规则但不满足行规则的项。

视觉相似但逻辑错误的项。

最终用规则校验器确认唯一正确答案。

1.6 数据字段

建议至少记录：

JSON
{
  "trial_id": "logic_001",
  "block_id": "rule_switch_01",
  "task_variant": "card_sorting | matrix_reasoning | ordering",
  "condition": "single_rule | rule_switch | conjunctive | matrix_2x2 | matrix_3x3",
  "rule": "color",
  "previous_rule": "shape",
  "switch_flag": true,
  "stimulus_set": [],
  "target_item": {},
  "options": [],
  "correct_option": "option_2",
  "response": "option_4",
  "correct": false,
  "rt_ms": 1840,
  "feedback_shown": true,
  "error_type": "perseverative_error",
  "consecutive_correct": 0,
  "difficulty_level": 3,
  "timeout": false
}

汇总指标：

accuracy
mean_rt_ms
median_rt_ms
rule_discovery_trials
post_switch_accuracy
post_switch_rt_cost
perseverative_error_count
nonperseverative_error_count
timeout_count
categories_completed
failure_to_maintain_set
1.7 风险边界

这个游戏可以说“参考 rule induction / card sorting / matrix reasoning 范式，用于训练或记录规则归纳、认知灵活性、抽象推理相关表现”。不应说：

可诊断执行功能障碍
等同 Wisconsin Card Sorting Test
等同 Raven’s Progressive Matrices
可测量智商
可治疗 ADHD / 痴呆 / 脑损伤
训练后一定迁移到学习成绩或临床改善

尤其 WCST 方向应注意：PsyToolkit 自己就说明其实现不是正式 copyrighted WCST，而是受 Berg 原作启发。
PsyToolkit

2. tower-of-hanoi：甜甜圈收纳架
2.1 对应成熟任务范式

这个游戏最直接对应 Tower of Hanoi 和 Tower of London。两者都要求参与者从初始状态移动物体到目标状态，同时遵守约束。Tower of Hanoi 通常是不同大小的盘子，规则是一次移动一个盘，且大盘不能放在小盘上；PsyToolkit 的 Tower of Hanoi 页面明确说明这些规则，并指出该任务常用于研究儿童和成人 planning。
PsyToolkit

Tower of London 与 Tower of Hanoi 类似，但通常是不同颜色球、不同容量柱，目标是匹配目标图。jspsych-contrib 的 tower-of-london 插件说明它支持 Tower of London / Hanoi style puzzle tasks，参与者需要在 peg 之间移动 colored balls 来匹配目标。
GitHub

2.2 开源代码 / 库 / 插件案例

jspsych-contrib / @jspsych-contrib/plugin-tower-of-london
这是最直接适合中文网页系统借鉴的实现。README 说明其参数包括 start_state, goal_state, peg_capacities, optimal_moves, max_moves, time_limit, show_goal, show_move_counter 等。数据字段包括 solved, num_moves, optimal, rt, moves, final_state, start_state, goal_state。页面显示 license 为 MIT。
GitHub
+2
GitHub
+2

适合直接参考：状态结构、目标展示、步数记录、每步 move 记录。

PsyToolkit Tower of Hanoi
PsyToolkit 页面说明了三柱三盘示例，并指出三盘最少 7 步；数据保存中包含已经用时、步骤数、尝试把大盘放到小盘上的次数、无效移动次数等。
PsyToolkit
+1

license 情况：页面可见源码 / 下载入口，但未在任务页面同处显示 OSI license。可作为设计和数据字段参考。

PEBL Test Battery：Tower of London / Hanoi
PEBL 官方说明其为 GPL 的免费开源实验环境，battery 列表包含 Tower of London / Hanoi。
PEBL
+1

适合参考：执行功能任务 battery 的组织方式和跨任务数据结构。

Experiment Factory tower-of-london
GitHub 页面显示该实验项目有 README 和 LICENSE，license 为 MIT；Experiment Factory 页面显示该任务 ID 为 tower-of-london，标签包含 spatial, jspsych, experiment，并说明是 ported 到 reproducible container 的 legacy experiment。
GitHub
+1

适合参考：容器化实验、jsPsych 风格任务组织、可复现实验部署。

其他 Tower of Hanoi 算法 / UI 项目
检索到若干 JavaScript / HTML5 Tower of Hanoi 项目具有 MIT 或 GPL-3.0 license，可作为 UI 或递归算法参考，但它们不是神经心理任务实现。应在工程中标为“算法 / 游戏参考”，而不是“认知任务验证来源”。

2.3 论文 / 正式文章 / 经典任务来源

Shallice, “Specific impairments of planning,” 1982
Tower of London 作为规划缺陷研究任务的核心经典来源之一。
PubMed

Krikorian, Bartok & Gay, “Tower of London procedure: a standard method and developmental data,” 1994
该文题名明确说明标准方法和 developmental data，可作为 Tower of London 标准程序参考。
PubMed

Berg & Byrd, “The Tower of London spatial problem-solving task: enhancing clinical and research implementation,” 2002
该文关注 Tower of London 在 clinical 和 research implementation 中的使用。
PubMed

Bishop et al., “Individual differences in cognitive planning on the Tower of Hanoi task,” 2001
该文研究儿童与成人在 Tower of Hanoi 上的个体差异，说明 Tower of Hanoi 可作为规划任务，但测量可靠性和个体差异解释需要谨慎。
PubMed

Piper et al., “Executive function on the Psychology Experiment Building Language tests,” 2012
该研究使用 PEBL 的 pTMT、pWCST、pToL 等任务，样本跨 5–89 岁，并认为这些 PEBL 测验是测量执行功能的有效、通用研究工具。
斯普林格

2.4 任务参数建议
参数	Tower of Hanoi 版本	Tower of London 版本
物体	甜甜圈 / 盘子，按大小排序	彩色甜甜圈 / 球
柱子数	通常 3 根	通常 3 根
容量	每柱可放任意盘，但受大小约束	每柱容量可为 [3,2,1] 或 [3,3,3]
初始状态	所有盘在左柱，或预设状态	任意合法 start_state
目标状态	所有盘移到目标柱，或预设目标图	匹配 goal_state
合法移动	一次移动一个；大盘不能放小盘上	一次移动一个；不能超过 peg capacity
最优步数	经典 n 盘 Hanoi 为 2^n - 1	BFS 计算最短路径
基础难度	3 盘，7 步	3–4 步
中等难度	4 盘，15 步，或复杂起终状态	5–7 步
高难度	4–5 盘或更多限制	8+ 步，诱发绕路
时间限制	60–180 秒，按难度调整	60–180 秒，按难度调整
计分	是否完成、步数、超出最优步数、非法移动、反应时	是否完成、步数、超出最优步数、first move latency、planning latency

PsyToolkit 的 Tower of Hanoi 三盘示例最少 7 步，可以作为入门级标定。
PsyToolkit

2.5 算法说明
Tower of Hanoi 最优解

经典 Tower of Hanoi 的递归解法：

solve(n, source, auxiliary, target):
  solve(n-1, source, target, auxiliary)
  move disk n from source to target
  solve(n-1, auxiliary, source, target)

最优步数：

optimal_moves = 2^n - 1

对于 3 盘：

2^3 - 1 = 7
Tower of London / 通用状态空间 BFS

Tower of London 更适合用图搜索。状态表示为：

state = [
  ["red", "blue"],   // peg 0 bottom -> top
  ["green"],         // peg 1
  []                 // peg 2
]

合法移动生成：

for each source peg i:
  if peg i not empty:
    ball = top(i)
    for each target peg j != i:
      if len(peg j) < capacity[j]:
        next_state = move ball from i to j

BFS 计算最短路径：

queue = [initial_state]
visited = {initial_state}
parent = {}

while queue not empty:
  state = queue.pop_left()
  if state == goal_state:
    reconstruct path from parent
  for next_state in legal_successors(state):
    if next_state not in visited:
      visited.add(next_state)
      parent[next_state] = state
      queue.push(next_state)

BFS 的好处是：

可自动计算 optimal_moves。

可筛选题库，只保留最优步数在指定范围内的题。

可识别参与者是否绕路、重复状态或陷入循环。

可用于自动生成“3 步、4 步、5 步、6 步”难度阶梯。

2.6 错误类型

建议区分：

illegal_size_error       // 大甜甜圈试图放到小甜甜圈上
capacity_error           // 柱子容量已满
empty_source_error       // 从空柱移动
same_peg_error           // 起点终点相同
repeated_state_error     // 回到先前状态
timeout                  // 超时
abandon                  // 未完成退出
suboptimal_solution      // 完成但步数超过最优
2.7 数据字段

单试次记录：

JSON
{
  "trial_id": "tower_004",
  "variant": "hanoi | london",
  "disk_count": 3,
  "peg_count": 3,
  "peg_capacities": [3, 2, 1],
  "initial_state": [["red", "blue"], ["green"], []],
  "goal_state": [[], ["blue"], ["red", "green"]],
  "optimal_moves": 5,
  "max_moves": 12,
  "time_limit_ms": 90000,
  "moves": [
    {
      "move_index": 1,
      "from": 0,
      "to": 2,
      "item": "blue",
      "legal": true,
      "before_state": [["red", "blue"], ["green"], []],
      "after_state": [["red"], ["green"], ["blue"]],
      "time_ms_from_trial_start": 3200
    }
  ],
  "first_move_latency_ms": 3200,
  "planning_latency_ms": 3200,
  "num_moves": 8,
  "excess_moves": 3,
  "invalid_move_count": 1,
  "repeated_state_count": 2,
  "solved": true,
  "rt_ms": 42000,
  "final_state": [[], ["blue"], ["red", "green"]],
  "difficulty_level": 3
}

汇总指标：

completion_rate
mean_excess_moves
mean_invalid_moves
mean_first_move_latency_ms
mean_total_time_ms
proportion_optimal_solution
repeated_state_rate
difficulty_passed
2.8 当前设计保留 / 改进

应保留：

甜甜圈 / 收纳架主题
拖拽或点击移动
目标图可视化
逐步移动的可理解规则

建议改进：

每题内置 initial_state, goal_state, optimal_moves
BFS 自动验证最优步数
按 optimal_moves 而不是只按盘子数量定难度
显示剩余步数或“最优步数挑战”作为游戏模式，而不是正式测验分数
记录 first move latency，用来近似规划前思考时间
把非法移动分类型记录，而不是只记录总错误
2.9 风险边界

可以说：

该任务参考 Tower of Hanoi / Tower of London planning paradigms
用于记录规划、问题解决、约束遵守、步数效率等表现

不应说：

可诊断额叶功能损伤
可筛查脑损伤 / ADHD / 痴呆
完成该游戏可改善执行功能障碍
游戏分数等同临床 Tower of London 标准分

如果未来要做评估用途，需要单独建立中文网页版本的信度、效度、常模、重测稳定性和设备差异校正。

3. trail-making：顺序寻宝
3.1 对应成熟任务范式

该游戏对应 Trail Making Test A / B。Part A 通常是按数字顺序连接节点，强调视觉搜索、加工速度、注意持续；Part B 通常在数字和字母之间交替连接，强调 set-shifting / cognitive flexibility。jspsych-contrib 的 trail-making 插件 README 明确写到，TMT 是 visual attention 与 task switching 任务，Part A 连接数字，Part B 交替数字和字母。
GitHub

3.2 开源代码 / 库 / 插件案例

jspsych-contrib / @jspsych-contrib/plugin-trail-making
这是最直接适合网页实现的参考。插件参数包括 test_type、num_targets、canvas_width、canvas_height、target_radius、min_separation、targets、prompt、seed 等；数据字段包括 test_type, targets, clicks, completion_time, num_errors, total_path_distance, inter_click_times。页面显示 license 为 MIT。
GitHub
+2
GitHub
+2

可借鉴点：节点随机布局、最小间距、seed 复现、click-level 数据记录。

PEBL Test Battery：Trail Making
PEBL battery 包含 Trail Making；PEBL 官方说明其为 GPL 的免费开源心理实验环境。
PEBL
+1

可借鉴点：将 Trail Making 与 WCST、Tower of London / Hanoi 同属执行功能 battery 的组织方式。

GEJ1/jsPsych_online_TMT
该项目 README 说明它是用 jsPsych v6.1.0 实现的 digital TMT，有 Part A 和 Part B，两部分都是要求快速且准确地连接 25 个点，并说明 TMT 可提供 visual search、scanning、processing speed、mental flexibility / executive functioning 信息。
GitHub

license 情况：检索页面未显示 license；因此只建议作为 jsPsych 实现结构参考，不建议直接复用代码。

davidnsousa/TMTGen
这是 GPL-3.0 的 automatic TMT generator，README 说明它用于 experimental research in neuropsychology，包含 trail generator 和 testing platform，可测量 response speed / accuracy。配置参数包括容器大小、node size、phase、tag 等；输出 CSV 包含 Id、Gender、Age、Date、Trail、Condition、Level、Tag、Time、Correct。
GitHub

可借鉴点：自动生成节点、实验条件管理、CSV 输出结构。

med-material/Trail-it
页面显示 GPL-3.0 license；README 说明这是 Trail Making Test 的数字化认知训练项目，节点随机分布，包含 1-2-3-4 和 1-A-2-B 两类连接。
GitHub

可借鉴点：游戏化训练界面、数字 / 数字字母交替版本。

orcatechteam/react-neuropsych-trails
README 说明它是 React Trail Making Test A / B 组件，Part A 为升序数字圆圈，Part B 为数字与字母交替；支持 A、A12、B、B12。
GitHub

license 情况：检索页面未显示 license；可作为 React 组件设计参考，不建议未经确认直接复用。

NeuroLIAA/tmt-analysis
这是 MIT license 的 digital TMT 鼠标轨迹分析 pipeline，偏分析端而非任务端。
GitHub

可借鉴点：鼠标轨迹、路径特征、feature extraction。

3.3 论文 / 正式文章 / 经典任务来源

Reitan, “The relation of the Trail Making Test to organic brain damage,” 1955
早期 Trail Making Test 与脑损伤关系研究。
PubMed

Reitan, “Validity of the Trail Making Test as an Indicator of Organic Brain Damage,” 1958
Sage 页面显示该文 1958 年发表，题名说明关注 Trail Making Test 作为 organic brain damage indicator 的效度。
Sage Journals

Tombaugh, “Trail Making Test A and B: normative data stratified by age and education,” 2004
该研究提供按年龄和教育分层的 TMT A/B 常模，样本为 18–89 岁社区个体。
PubMed
+1

Arbuthnott & Frank, “Trail Making Test, Part B as a Measure of Executive Control: Validation Using a Set-Switching Paradigm,” 2000
用 set-switching paradigm 验证 TMT-B 作为 executive control 指标的研究。
PubMed

Labvanced Trail Making Test 说明文章 / 模板
Labvanced 的 TMT 说明文章描述 Part A 数字顺序、Part B 数字 / 字母交替，并列出 online version 的变量，如 Correct Sequence、Choice Clicked、ChoiceClickedArray、Number of Errors、Completion Time A/B。它不是开源实现，但可作为正式任务说明与变量结构参考。
Labvanced
+1

3.4 任务参数建议
参数	建议
版本	Part A：数字顺序；Part B：数字 / 字母交替
节点数	练习 6–8；儿童 / 入门 10–12；正式网页任务 18–25
标准感参考	传统 TMT 常见 25 个目标；网页游戏可根据年龄和设备缩放
标签	A：1,2,3...N；B：1,A,2,B,3,C...
布局	画布随机布局；节点之间设 min_separation；避免线段严重重叠
输入	鼠标点击、触屏点击；如果记录轨迹，可加鼠标移动采样
错误	点错节点、跳号、重复点击、点击背景、Part B 交替错误、超时
计时	trial onset 到完成；first click latency；节点间 inter-click times
计分	完成时间、错误数、平均节点间时间、路径长度、路径效率
自适应	高正确 + 快速则增加节点数或降低节点间距；错误多则减少节点或提供下一目标提示
3.5 算法说明
3.5.1 序列生成

Part A：

sequence = ["1", "2", "3", ..., "N"]

Part B：

sequence = ["1", "A", "2", "B", "3", "C", ...]

如果为了平衡数字和字母，建议使用偶数节点数，例如 12、18、24；若使用 25 个节点，需明确最后一个标签如何处理，例如 1-A-2-B...13 或其他约定。

3.5.2 节点布局

随机布局伪代码：

targets = []
while len(targets) < N:
  candidate = random_point_inside_canvas()
  if distance(candidate, all_existing_targets) >= min_separation:
    targets.append(candidate)

额外建议：

避免节点贴边
避免标签遮挡
记录 seed，保证题目可复现
不同设备按画布比例缩放坐标

如果要提高布局质量，可加入：

最大尝试次数
Poisson-disk sampling
线段交叉数量上限
路径长度范围限制
3.5.3 点击校验
expected_index = 0

on_click(node):
  expected_label = sequence[expected_index]

  if node.label == expected_label:
    mark correct
    draw line from previous correct node to current node
    expected_index += 1
  else:
    mark error
    do not advance expected_index

Part B 的错误类型可以进一步区分：

numeric_order_error       // 数字顺序错
letter_order_error        // 字母顺序错
alternation_error         // 数字/字母切换错
premature_click_error     // 点了未来正确节点
repeated_click_error      // 重复点已完成节点
background_click_error    // 点空白区域
3.6 数据字段

单试次：

JSON
{
  "trial_id": "trail_B_006",
  "test_type": "B",
  "node_count": 24,
  "sequence": ["1", "A", "2", "B"],
  "targets": [
    {"index": 0, "label": "1", "x": 120, "y": 220},
    {"index": 1, "label": "A", "x": 310, "y": 160}
  ],
  "seed": "trail_2026_006",
  "canvas_width": 900,
  "canvas_height": 600,
  "target_radius": 24,
  "min_separation": 60,
  "clicks": [
    {
      "click_index": 1,
      "time_ms": 1420,
      "x": 121,
      "y": 218,
      "clicked_label": "1",
      "expected_label": "1",
      "correct": true,
      "error_type": null
    }
  ],
  "completion_time_ms": 38400,
  "first_click_latency_ms": 1420,
  "num_errors": 2,
  "inter_click_times": [900, 1100, 1300],
  "total_path_distance": 1820.5,
  "path_efficiency": 0.74,
  "timeout": false,
  "difficulty_level": 3
}

汇总：

PartA_completion_time_ms
PartB_completion_time_ms
PartB_minus_PartA
PartB_divided_by_PartA
PartA_errors
PartB_errors
mean_inter_click_time
path_distance
path_efficiency

注意：B-A 或 B/A 可作为研究指标，但网页游戏中不宜直接解释为临床诊断指标。

3.7 当前设计保留 / 改进

应保留：

“顺序寻宝”的目标搜索动机
数字 / 字母节点
点击后连线反馈
快速且准确完成的玩法

建议改进：

加入 Part A / Part B 两种条件
所有布局记录 seed
使用 min_separation 防止节点过近
记录每次点击，而不仅是最终耗时
区分错误类型
支持触屏和鼠标，但分别记录 input_device
3.8 风险边界

可以说：

该任务参考 Trail Making Test A/B，用于记录视觉搜索、加工速度、顺序追踪、认知切换相关表现

不应说：

可筛查脑损伤
可诊断痴呆 / ADHD / 神经系统疾病
网页成绩等同正式 TMT 常模分
训练可改善临床认知障碍

此外，正式纸笔 TMT 的版式、常模、施测说明可能涉及版权和标准化问题。中文网页游戏应使用自研布局和自建常模，不应直接复制出版测验表格。

4. water-jugs：小熊果汁铺
4.1 对应成熟任务范式

该游戏对应 Water Jug problem。其核心是给定若干容量不同、没有刻度的容器，通过装满、倒空、互倒来得到目标容量。AI 教程通常把它作为 state-space search 示例：状态是各容器当前容量，初始状态通常是 (0,0)，目标是某个容器达到目标量，操作包括 fill、empty、pour。
GeeksforGeeks

如果加入一组诱发固定解法的题，再在关键题中提供更短解法，则对应 Einstellung effect。Luchins 1942 的 “Mechanization in problem solving: The effect of Einstellung” 是心理定势研究的经典来源。
语义学者

4.2 开源代码 / 库 / 插件案例

khasmamad99/Water-Jug-Problem-Solver
页面显示 MIT license。README 说明该程序解决 Water Jug problem，用户输入 jug volumes 和 desired amount，并可选择 DFS 或 BFS；算法参考 Winston 的人工智能教材。
GitHub

可借鉴点：BFS / DFS 切换、命令行式状态输出、用户可配置容量和目标。

jasDestiny/Water_Jug_Problem_Solver_AI
页面显示 MIT license，README 说明 Python 代码用 BFS 和 DFS 解决 Water Jug problem。
GitHub

可借鉴点：最小教学实现，适合抽取 BFS 状态转移逻辑。

Zyepher/water-jug-problem
页面说明该项目实现 BFS、DFS、A*、Bidirectional Search，并列出 fill、drain、pour 操作；说明 BFS 用 FIFO queue 逐层搜索、保证 shortest path，使用 explored dictionary 避免重复。页面显示 MIT license。
GitHub

可借鉴点：多算法比较、BFS 最优路径、A* / bidirectional search 扩展。

pprattis/generic-planner-for-minigames
页面显示 MIT license。README 说明这是用 search tree / A* 解决小游戏的 generic planner，planner 从 initial state 到 final state 生成 action sequence；包含 Blocks World、Water Jug、n-Puzzle 等 minigames。
GitHub

可借鉴点：把 Water Jug 作为可规划小游戏的一种，适合我们的“游戏化成熟任务”背景。

其他来源
GeeksforGeeks 的 Water Jug AI 文章不是开源任务项目，但对状态空间、BFS / DFS、允许操作描述清晰，可作为算法说明来源。
GeeksforGeeks

4.3 论文 / 正式文章 / 经典任务来源

Luchins, “Mechanization in problem solving: The effect of Einstellung,” 1942
这是心理定势 / Einstellung effect 的经典来源。
语义学者

Water Jug problem 作为 state-space search 示例
GeeksforGeeks AI 文章把 Water Jug problem 描述为 AI 中说明 state-space、search algorithms、heuristics 的经典问题，并给出状态 (a,b)、初始状态 (0,0)、目标状态、BFS / DFS 的比较。
GeeksforGeeks

大学课件：Water Jug as state-space search
课件把 4L / 3L 水壶问题定义为“在 4L 壶中得到 2L”，状态为 (x,y)，其中 x=0..4, y=0..3，初始状态 (0,0)，目标状态 (2,n)；并列出 fill、empty、pour 等操作。
الجامعة المستنصرية

Reconstructing / modern Einstellung work
检索到现代文献如 “Reconstructing the Einstellung effect” 和 “Einstellung defused: Interactivity and mental set” 讨论 Luchins 水罐任务及心理定势。可作为后续深入文献，但当前最稳妥的核心来源仍是 Luchins 1942 与 state-space search 资料。
OSF
+1

4.4 任务参数建议
参数	建议
杯子数量	入门 2 个；进阶 3 个；Einstellung 条件常用 3 个
容量	例如 (3,5) 目标 4；(4,3) 目标 2；三杯可用 A/B/C 结构
初始状态	通常全空 (0,0) 或 (0,0,0)
目标	任一杯达到目标量；或指定杯达到目标量；或总量达到目标量
操作	fill(i), empty(i), pour(i,j)
难度	最优步数、杯子数量、容量数值、是否有更短解、是否诱发心理定势
时间限制	60–120 秒 / 题，按难度调整
步数限制	可设为 optimal_moves + k，k 为 2–6
错误类型	非法倒入、重复状态、无效操作、超时、未达目标、使用低效定势路径
计分	是否完成、步数、超出最优步数、耗时、重复状态、提示次数

典型入门题：

容量: [3, 5]
目标: 任一杯中有 4
初始: [0, 0]
可行最优路径:
fill 5 -> pour 5 to 3 -> empty 3 -> pour 5 to 3 -> fill 5 -> pour 5 to 3

经典课件题：

容量: [4, 3]
目标: 4L 壶中有 2L
初始: [0, 0]
状态: (x, y), x ∈ 0..4, y ∈ 0..3

该状态定义和目标定义可追溯到大学课件。
الجامعة المستنصرية

4.5 算法说明
4.5.1 状态表示
capacities = [cap_0, cap_1, ..., cap_n]
state = [vol_0, vol_1, ..., vol_n]

约束：

0 <= vol_i <= cap_i

目标谓词可以有多种：

any(vol_i == target)
state[designated_jug] == target
sum(state) == target
custom_goal(state) == true
4.5.2 合法操作

装满某杯：

fill(i):
  state[i] = capacities[i]

倒空某杯：

empty(i):
  state[i] = 0

从 i 倒到 j：

pour(i, j):
  amount = min(state[i], capacities[j] - state[j])
  state[i] -= amount
  state[j] += amount

如果 amount = 0，该操作应视为无效操作，不进入后继状态。

4.5.3 BFS 求最优解
function bfs(initial_state, capacities, goal_predicate):
  queue = [initial_state]
  visited = set(initial_state)
  parent = {}
  parent_action = {}

  while queue not empty:
    state = queue.pop_left()

    if goal_predicate(state):
      return reconstruct_path(parent, parent_action, state)

    for action in legal_actions(state, capacities):
      next_state = apply(action, state)
      if next_state not in visited:
        visited.add(next_state)
        parent[next_state] = state
        parent_action[next_state] = action
        queue.push(next_state)

  return no_solution

BFS 逐层展开状态，因此在每个动作成本相同的情况下，第一次到达目标状态就是最少步数解。GeeksforGeeks 文章也说明 BFS level-by-level 搜索并保证 shortest path，而 DFS 不保证最优。
GeeksforGeeks

4.5.4 可解性校验

对于两个水壶、初始为空、允许无限水源和水槽、目标是某个壶中得到 target 的常见版本：

target <= max(capacities)
target % gcd(capacity_a, capacity_b) == 0

对于多壶、指定目标状态、带初始水量或自定义目标谓词，建议直接用 BFS 校验可达性。题库生成时：

随机生成 capacities
随机生成 target 或 goal_state
运行 BFS
若无解，丢弃
若 optimal_moves 不在目标难度区间，丢弃
保存最短路径与最优步数
4.6 Einstellung effect 试次设计

如果要测“心理定势”，不应只给普通 Water Jug。需要设计一组前置题，让参与者学会某个固定策略，再给关键题观察是否继续使用低效策略。

常见结构：

练习 / 定势诱发题: 多题都可用同一复杂公式解决
关键题: 同样可用旧公式解决，但存在更短直接解
灭绝题: 旧公式不可用，只能用新策略

记录指标：

used_set_solution           // 是否使用旧策略路径
used_shorter_solution       // 是否使用更短路径
first_action_matches_set    // 第一动作是否沿用旧策略
excess_moves                // 相对 BFS 最优解多出的步数
strategy_switch_latency     // 从错误定势转向有效路径的时间

风险：Einstellung 条件需要多题序列设计，单题 Water Jug 只能说是规划 / 图搜索问题解决，不宜声称测量心理定势。

4.7 数据字段

单试次：

JSON
{
  "trial_id": "jug_007",
  "condition": "standard | einstellung_induction | critical | extinction",
  "jug_capacities": [8, 5, 3],
  "initial_state": [0, 0, 0],
  "goal_amount": 4,
  "goal_predicate": "any_jug_equals_target",
  "optimal_moves": 6,
  "optimal_path": [
    {"action": "fill", "jug": 1},
    {"action": "pour", "from": 1, "to": 2}
  ],
  "actions": [
    {
      "action_index": 1,
      "type": "fill",
      "from": null,
      "to": 1,
      "before_state": [0, 0, 0],
      "after_state": [0, 5, 0],
      "legal": true,
      "time_ms_from_trial_start": 2100
    }
  ],
  "state_sequence": [[0, 0, 0], [0, 5, 0]],
  "num_moves": 9,
  "excess_moves": 3,
  "invalid_action_count": 0,
  "repeated_state_count": 2,
  "first_action_latency_ms": 2100,
  "rt_ms": 56000,
  "solved": true,
  "hint_count": 1,
  "simpler_solution_available": true,
  "set_solution_pattern": "B-A-2C",
  "used_set_solution": true,
  "difficulty_level": 4
}

汇总指标：

completion_rate
mean_optimality_gap
mean_invalid_actions
mean_repeated_states
mean_first_action_latency
hint_rate
set_solution_rate
short_solution_rate
critical_trial_switch_rate
4.8 当前设计保留 / 改进

应保留：

“小熊果汁铺”的低压力情境
杯子容量清晰显示
装满 / 倒空 / 互倒的直接操作
目标容量可视化

建议改进：

每题先跑 BFS，保证可解
记录 optimal_moves 和 optimal_path
按最优步数分级，而不是只看容量数字大小
加入“提示”但记录 hint_count
对重复状态给轻提示，避免用户陷入循环
Einstellung 条件要成组设计，并标记 induction / critical / extinction
4.9 风险边界

可以说：

该任务参考 Water Jug problem 和 state-space search，用于训练 / 记录规划、问题解决、策略效率
Einstellung 条件可探索心理定势或策略固着倾向

不应说：

可诊断强迫、冲动控制障碍或执行功能障碍
可治疗问题解决能力缺陷
完成训练可迁移到现实规划能力
单题表现可证明存在心理定势
跨游戏统一实现建议
A. 统一试次表结构

建议所有游戏共享以下字段：

JSON
{
  "participant_id": "anonymous_or_hash",
  "session_id": "session_2026_05_08_xxx",
  "game_id": "tower-of-hanoi",
  "trial_id": "tower_001",
  "condition": "easy",
  "difficulty_level": 2,
  "trial_start_time": 0,
  "trial_end_time": 42300,
  "rt_ms": 42300,
  "correct": true,
  "solved": true,
  "score": 85,
  "error_count": 1,
  "timeout": false,
  "input_device": "mouse | touch | keyboard",
  "viewport": {"width": 1366, "height": 768},
  "stimulus_version": "v1.0.0"
}

每个任务再增加 task-specific 字段：

logic-puzzles: rule, switch_flag, perseverative_error
tower-of-hanoi: initial_state, goal_state, moves, optimal_moves
trail-making: targets, clicks, total_path_distance, inter_click_times
water-jugs: jug_capacities, state_sequence, actions, optimal_path
B. 统一难度标定

不要只用“看起来难”。建议统一使用可计算指标：

logic-puzzles: 维度数、规则数、干扰项相似度、切换频率
tower-of-hanoi: optimal_moves、状态空间大小、非法约束数量
trail-making: node_count、min_separation、交替条件、路径交叉复杂度
water-jugs: optimal_moves、状态空间大小、是否存在诱导定势、替代路径数量
C. 统一计分原则

建议把“游戏分”和“研究指标”分开。

游戏分：

完成 + 正确 + 快速 + 少错误

研究 / 评估指标：

accuracy
rt_ms
optimality_gap
switch_cost
perseverative_error_rate
invalid_move_rate
completion_time
path_efficiency
strategy_pattern

这样可以避免把复杂认知指标过度简化为单一“脑力分”。

D. 统一风险声明

网页底部或任务说明中建议使用类似措辞：

本系统任务参考认知心理学和神经心理学中的成熟实验范式，用于认知训练、学习反馈和研究性数据记录。当前游戏化版本不构成医疗器械、临床诊断工具或治疗方案；结果不能用于诊断、治疗或排除任何疾病。如需医学或心理健康评估，请咨询合格专业人员。
结论

这 4 个游戏都可以合理映射到成熟任务范式：

logic-puzzles  →  rule induction / card sorting / matrix reasoning
tower-of-hanoi →  Tower of Hanoi / Tower of London planning
trail-making   →  Trail Making Test A/B
water-jugs     →  Water Jug problem / Einstellung effect / state-space search

最稳妥的设计路线不是复刻正式测验，而是保留其“认知任务结构”：规则归纳、状态空间规划、顺序连接、图搜索问题解决。工程上应优先实现可追溯的试次生成器、BFS / 校验器、完整行为日志和版本化题库；产品表述上只说“训练 / 记录 / 研究性评估维度”，不要声称临床诊断或治疗效果。

来源

进阶专业
ChatGPT 也可能会犯错。请核查重要信息。查看 你的隐私选择。⁠