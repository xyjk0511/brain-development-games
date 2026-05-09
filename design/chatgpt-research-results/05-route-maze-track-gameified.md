# 05-route-maze-track-gameified

Source conversation: https://chatgpt.com/c/69fdba4d-bc08-83ea-83f7-3e03c5c337cd
Collected: 2026-05-08T10:43:44.683Z
Extraction method: main.innerText

---

任务编号：05-route-maze-track-gameified

你是认知训练游戏资料研究员。请大量搜集并整理以下 3 个路线/追踪/游戏化机制的设计依据，必须给可追溯来源。

项目背景：我们正在做中文网页认知训练/评估系统，已有游戏不是照抄 Lumosity，而是把成熟认知任务游戏化。需要每个游戏都有“开源代码案例或论文/文章/算法依据”。

本批游戏：
1. maze：萤火虫路线，先看路线再复现，实际更像路径序列记忆/route recall，而不是传统迷宫。
2. visual route switching / train-of-thought 类玩法：可参考轨道切换、路径规划、分散注意力游戏，用于后续新增游戏。
3. gameified cognitive task shell：如何把实验任务包装成儿童/康复友好的游戏，保留数据字段和难度参数。

请输出一个 Markdown 报告，结构如下：

## 总结表
每行一个机制/游戏，列包括：
- 我们的游戏/机制
- 对应成熟任务范式
- 认知域
- 可参考开源项目/库/插件，给 GitHub 或官方链接
- 论文/正式文章/经典任务来源，给标题、年份、链接
- 核心算法/试次生成逻辑
- 应记录的数据字段
- 我们当前设计应该保留/改进点

## 详细依据
每个机制至少列：
1. 2-4 个开源代码/库/插件案例，优先 jsPsych、jspsych-contrib、PsyToolkit、PEBL、track-of-thought-web、route memory/maze/path sequence open source。
2. 2-4 篇论文、综述、正式说明文章或经典任务来源。
3. 任务参数：路径长度、节点数量、展示时长、干扰节点、回忆方式、实时路径速度、分叉数、计分方式、自适应建议。
4. 算法说明：路径生成、序列复现、图节点/边、BFS/路径验证、实时实体路由。
5. 数据字段：trial_id, path_sequence, nodes, distractors, response_sequence, hits, errors, rt_ms, preview_ms, difficulty_params 等。
6. 风险边界：哪些不能声称医疗疗效，哪些只能说训练/评估维度。

要求：
- 不要编造链接。找不到就写“未找到可靠来源”，并说明替代来源。
- 开源项目要说明 license 情况，如果页面能看到。
- 给中文结论，但保留英文任务名和论文题名。
- 尽量多搜，宁可长一点。
展开

我会把三类机制分别对应到可复用代码、经典任务依据、试次算法和数据字段，并核验链接、license 与出处；无法确认的来源会明确标注。

我会避免把相似玩法强行归为同一来源，必要时用可验证的替代范式补足，并在中文报告中保留英文任务名和论文题名。

已核对到 jsPsych/jspsych-contrib、PsyToolkit、PEBL、track-of-thought-web、Lumosity 官方说明、JMIR gamification 综述和 FTC 脑训练宣称执法案例。

Thought for 17m 10s
05-route-maze-track-gameified 路线/追踪/游戏化机制设计依据报告
总体判断

本批 3 类机制可以成立，但需要改名和边界控制。maze：萤火虫路线不应按“传统迷宫求解”解释，而应定位为 Path Sequence Memory / Route Recall / Spatial Span：先编码一串空间节点或路线，再按顺序复现。visual route switching / train-of-thought应定位为 Divided Attention + Dynamic Route Switching + Task Switching + Planning，可借鉴轨道切换、Trail Making Test B、Multiple Object Tracking、Tower of London 的机制，但不要复制 Lumosity 的具体美术和关卡。gameified cognitive task shell不是一个单独认知任务，而是把成熟实验任务包装成可玩界面的工程层；关键是保留原任务的刺激、条件、反应、反应时、错误类型和难度参数，避免游戏元素污染测量。

未找到一个与“萤火虫看路线再复现”的中文网页开源项目完全同构且经过验证的可靠来源；最可靠替代依据是 Corsi Block-Tapping / Spatial Span、Walking Corsi / route-learning、landmark sequence recall，以及 OpenMaze 这类导航实验工具链。jsPsych、jspsych-contrib、PsyToolkit、PEBL、OpenMaze、lab.js、Tatool 等可以提供可追溯代码或实验框架依据。
斯普林格
+5
GitHub
+5
PsyToolkit
+5

总结表
我们的游戏/机制	对应成熟任务范式	认知域	可参考开源项目/库/插件	论文/正式文章/经典任务来源	核心算法/试次生成逻辑	应记录的数据字段	我们当前设计应该保留/改进点
maze：萤火虫路线：先看萤火虫经过节点，再按顺序复现	Corsi Block-Tapping Task / Spatial Span / Route Recall / Landmark sequence recall。更接近空间序列记忆，不是传统迷宫求解	视空间短时记忆、工作记忆、序列顺序记忆、路线回忆	jspsych-contrib corsi-blocks，MIT；PsyToolkit Corsi，研究/教育非商业使用；PEBL Corsi，GPL-2.0；Niv Lab Spatial Recall，CC BY-NC-SA 4.0；OpenMaze，MIT，适合作为路线/导航任务生成参考。
GitHub
+7
GitHub
+7
GitHub
+7
	Corsi 1972 “Human memory and the medial temporal region of the brain”；Kessels et al. 2000 “The Corsi Block-Tapping Task: Standardization and Normative Data”；Hilton, Wiener & Johnson 2021 “Serial memory for landmarks encountered during route navigation”；Wiener et al. 2020 VR route-learning suite；OpenMaze 2022。
斯普林格
+4
eScholarship
+4
PubMed
+4
	生成节点图 G=(V,E)；采样长度为 L 的简单路径；按节点顺序动画展示；用户点击/拖动复现；按 exact match、逐位命中、最长前缀、编辑距离计分；用 BFS/邻接表验证路径连通性和响应合法性	trial_id, graph_id, nodes, edges, path_sequence, path_length, distractors, preview_ms, step_ms, response_sequence, response_events, rt_first_ms, rt_total_ms, hits, errors, edit_distance, difficulty_params, random_seed	保留“预览路线→复现路线”；术语改成“路线序列记忆”或“路径复现”；增加节点/边 ID、完整点击日志、路径长度阶梯、自适应 span、干扰节点和错误类型记录
visual route switching / train-of-thought：轨道/路线切换，引导实体到目标	Divided Attention game / Multiple Object Tracking / Task Switching / Trail Making Test B / Tower of London planning	分散注意、持续注意、认知灵活性、任务切换、实时规划、视觉追踪	track-of-thought-web，ISC；track-of-thought Java 项目，页面未见明确 license；jspsych-contrib trail-making，MIT；jspsych-contrib pursuit-rotor，MIT；GEJ1 jsPsych_online_TMT，未见明确 license；PsyToolkit Task Switching，研究/教育非商业使用。
PsyToolkit
+8
GitHub
+8
GitHub
+8
	Lumosity 官方说明把 Train of Thought 解释为分散注意/规划/协调任务；Lumosity 科学博客称其受 Tower of Hanoi、Multiple Object Tracking 和规划问题启发；PsyToolkit Task Switching 引用 Jersild、Rogers & Monsell、Monsell；Pylyshyn & Storm 1988 是 Multiple Object Tracking 经典来源；Kurtin et al. 2022 提供 online task-switching game 框架。
F1000Research
+5
Lumosity
+5
Lumosity
+5
	网格/图上生成发车点、站点、轨道和 switch；实体按速度沿边移动；用户切换岔道状态；到达目标站计分，错站/碰撞/漏接为错误；生成器需保证目标可达，必要时 BFS/模拟验证；难度由实体数、速度、岔道数、同时活跃实体数、分叉数控制	level_id, layout_seed, train_seed, grid_width, grid_height, switch_count, station_count, entity_count, spawn_schedule, entity_target, speed, switch_events, route_taken, arrival_station, correct_arrival, collision, wrong_station, lead_time_ms, active_entity_count, score, difficulty_params	可以保留“实时切换路线、实体到目标”的核心；不要照搬 Lumosity 视觉、关卡和命名；应把每次切换作为行为事件记录，而不只记录最终分数；建议新增“switch cost / lead time / planning error”指标
gameified cognitive task shell：把实验任务包装成儿童/康复友好游戏	Gamified cognitive assessment/training framework / experimental task shell；不是单一任务范式	取决于被包装任务：抑制控制、工作记忆、认知灵活性、注意、加工速度等	jsPsych，MIT；jspsych-contrib；lab.js core Apache、builder AGPL；Tatool Web，GPL-3.0；PEBL，GPL-2.0；PsychoPy，GPL-3；Online lab.js templates，MIT；Proteo serious-game framework，MIT。
MDPI
+9
GitHub
+9
JSPsych
+9
	de Leeuw 2015/2023 jsPsych；Henninger et al. 2022 lab.js；Khaleghi et al. 2021 gamification framework；Eng et al. 2024 gamified Flanker preschool feasibility；Bernava et al. 2021 Proteo；Nguyen et al. 2025 older-adult gamified EF training design。
ScienceDirect
+5
GitHub
+5
GitHub
+5
	用 TaskSpec 定义刺激、条件、难度、反应、评分；用 GameShell 处理故事、美术、奖励、练习、休息、适配设备；原始行为数据与游戏分数分离；每个 trial 序列化随机种子、刺激 JSON、难度状态和响应日志	participant_id, session_id, task_id, task_version, shell_version, trial_id, condition, stimulus_spec, random_seed, difficulty_params, response, response_events, rt_ms, accuracy, score, adaptive_state, device, viewport, focus_loss, validity_flags	游戏化只能作为交互层；必须保留实验任务的核心条件和数据字段；儿童/康复友好可用大按钮、短区块、低阅读负荷、即时反馈，但不能随意改变刺激时序和规则；上线前需要信度、效度和可用性验证
详细依据
1. maze：萤火虫路线，即 Route Recall / Path Sequence Memory
1.1 可参考开源代码、库、插件案例

案例 A：jspsych-contrib plugin-corsi-blocks。
这是最接近“看一串空间位置，再按顺序点击复现”的网页开源插件。README 明确说明它实现 Corsi block tapping：display mode 展示 block sequence，input mode 要求参与者按相同顺序点击；blocks、sequence、layout 可配置，并支持反馈。包信息显示 license 为 MIT。源码中默认 9 个 block 的布局近似原始 Corsi 布局；默认 sequence_block_duration=1000ms、sequence_gap_duration=250ms、pre_stim_duration=500ms；保存的数据包括 sequence, response, rt, blocks, correct。
GitHub
+3
GitHub
+3
GitHub
+3

**可转化方式：**把 block 改成萤火虫可经过的节点，把 sequence 改成 path_sequence，把 display mode 做成沿边移动的动画，把 input mode 做成点击节点或拖动路线。核心测量仍是空间序列复现。

案例 B：PsyToolkit Corsi 与 Backward Corsi。
PsyToolkit 的 Corsi 说明把该任务定义为类似 digit span 的短时记忆任务：9 个 block，实验者按顺序点，参与者按相同顺序复现；span 是能正确复现的最长序列。PsyToolkit 实现从 2 个 block 开始，正确后长度加 1；错误时再给一次机会；数据输出包含最高 span、当前 item count、正确/错误状态等。Backward Corsi 要求倒序复现，PsyToolkit 将其解释为需要“操纵”短时记忆，因此更偏工作记忆。PsyToolkit 允许非商业研究/教育使用，但商业使用需许可。
PsyToolkit
+2
PsyToolkit
+2

**可转化方式：**当前萤火虫路线可以先做 forward recall；如果后续要增加难度，可加 backward route recall，但应标注为更强工作记忆负荷，不要与基础路线记忆混为一谈。

案例 C：PEBL Corsi Blocks / Spatial Span 类任务。
PEBL 是 free、open-source、cross-platform 的实验系统，官方 GitHub 说明其电池包含 100+ 预制测试，包括 Corsi Blocks、Digit Span、N-Back、Trail Making、Multiple Object Tracking 等；license 为 GPL-2.0。PEBL 官方测试电池说明每个测试会保存完整数据，很多还会生成报告。
GitHub
+2
PEBL
+2

**可转化方式：**PEBL 更适合作为任务参数和数据结构参考，不一定直接嵌入中文网页系统，因为 GPL-2.0 对派生发布有较强约束。

案例 D：Niv Lab spatial-recall jsPsych demo。
Niv Lab 的 jsPsych demo 集合包含 Spatial Recall task，说明为 forward/backward spatial recall，并提供 absolute、partial credit、longest sequence 等 scoring 规则。其 license 为 CC BY-NC-SA 4.0，意味着不能直接用于商业闭源项目。
GitHub
+3
Niv Lab Technical Resources
+3
GitHub
+3

**可转化方式：**适合作为评分规则参考：exact match、partial credit、longest prefix 都可迁移到萤火虫路线。

案例 E：OpenMaze。
OpenMaze 是 Unity 的开源导航实验工具箱，用于创建第一人称空间导航范式；论文和 GitHub 均说明其源代码开放，GitHub license 为 MIT。它不是网页 Corsi 序列任务，但可作为“路线学习、导航、路径配置、实验参数文件”的参考。
斯普林格
+2
斯普林格
+2

**可转化方式：**如果未来把萤火虫路线升级成更真实的路线学习或地图导航，OpenMaze 的“可配置环境、路径、任务参数、导航日志”比传统 Corsi 更接近。

1.2 论文、正式来源、经典任务依据

Corsi, P. M. 1972, “Human memory and the medial temporal region of the brain”。
这是 Corsi Block-Tapping Task 的原始博士论文来源，由 Brenda Milner 指导。McGill 页面显示题名、作者、日期为 1972。
eScholarship

Kessels et al. 2000, “The Corsi Block-Tapping Task: Standardization and Normative Data”。
PubMed 条目将其描述为 Corsi Block-Tapping Task 的标准化和常模数据研究，并说明该任务用于评估 visuospatial memory span。PsyToolkit 页面也引用该文，并给出健康成人平均 span 约 6.2、SD 约 1.3 的说明。
PubMed
+1

Hilton, Wiener & Johnson 2021, “Serial memory for landmarks encountered during route navigation”。
该研究直接关联路线学习与序列记忆：参与者学习包含 12 个 landmark 的路线，然后进行 Immediate Free Recall 和 Free Reconstruction of Order。文章明确指出 landmarks 是路线导航中的关键线索，并把路线学习中的视觉线索记忆看作嵌入导航任务的 serial learning。
Sage Journals

Wiener et al. 2020, “A novel virtual-reality-based route-learning test suite: Assessing the effects of cognitive aging on navigation”。
该路线学习测试套件包含 route-repetition、route-retracing、directional-approach 三类任务，目标是评估 egocentric 和 allocentric 导航能力，并且材料在 OSF 上开放。它更偏虚拟现实导航，但可作为“路线学习任务如何拆分认知成分”的依据。
pub.dzne.de

Alsbury-Nealy et al. 2022, “OpenMaze: An open-source toolbox for creating virtual navigation experiments”。
该文发表在 Behavior Research Methods，介绍了用于虚拟导航实验的开源工具箱 OpenMaze，关键词包括 spatial cognition、navigation、learning、memory、Unity。
斯普林格

1.3 建议任务参数

基础参数。

参数	建议范围	依据与说明
node_count	6–12 起步，高阶可 12–20	Corsi 常用 9 个 block；路线 landmark 研究使用 12 个 landmark。
PsyToolkit
+1

path_length	初始 2 或 3；常规上限 8–9；高级可 10–12	PsyToolkit Corsi 从 2 个 block 开始，正确后加长；Millisecond Corsi 说明序列可从 2 到最大 9。
PsyToolkit
+1

preview_step_ms	800–1200ms；默认可用 1000ms	jspsych-contrib Corsi 默认每个 block 1000ms。
GitHub

gap_ms	200–500ms；默认可用 250ms	jspsych-contrib Corsi 默认 gap 为 250ms。
GitHub

retention_interval_ms	0–1500ms	如果想更接近即时 span，预览结束后立即开始；如果想增加工作记忆负荷，可加入短延迟。
distractor_nodes	node_count - path_length；可逐级增加	干扰节点越多，视觉搜索和抑制负荷越强；需要与纯记忆负荷分开记录。
recall_mode	forward click、forward drag、free reconstruction、backward recall	forward 是基础路线复现；backward 增加工作记忆操纵负荷。
PsyToolkit

feedback	练习阶段即时反馈；正式阶段可延迟反馈	即时反馈利于游戏训练，但正式评估中过强反馈可能改变策略。
adaptive_rule	1-up after correct；error 后重试一次；或 2-correct-up / 1-error-down	PsyToolkit Corsi 采用正确长度加 1、错误再给一次机会的 span 逻辑。
PsyToolkit
1.4 核心算法说明

任务生成。
把场景抽象成图：G=(V,E)，V 是萤火虫可停留的节点，E 是节点之间可见或可走的连接。每个 trial 生成一个节点布局和一条目标路径 path_sequence=[v1,v2,...,vL]。如果只是 Corsi-like 点序列，E 可以为空或只用于视觉连线；如果是路线复现，必须显式保存 edges 并验证相邻节点是否可达。

generate_trial(difficulty):
    node_count = difficulty.node_count
    path_length = difficulty.path_length
    nodes = sample_nodes(node_count, min_distance, canvas_size)
    edges = build_edges(nodes, mode="grid|k_nearest|manual")
    assert graph_connected(edges)

    start = random_node(nodes)
    path_sequence = random_simple_path(
        graph=edges,
        start=start,
        length=path_length,
        no_revisit=True
    )

    distractors = nodes - path_sequence
    return {nodes, edges, path_sequence, distractors, difficulty}

路径验证。
如果用户只是点击节点序列，评分主要是序列匹配；如果用户拖动路线，则每一段响应都要通过邻接表验证：(response[i], response[i+1]) in E。BFS 的作用不是替代正确答案，而是确认生成图连通、目标路径存在、错误响应是否仍形成一条合法路径，或在自由路线模式下计算用户路线与最短路的偏差。

评分。

exact_match = response_sequence == path_sequence
hits = count(response[i] == path_sequence[i])
longest_prefix = first i where response[i] != path_sequence[i]
omissions = target nodes not clicked
intrusions = clicked nodes not in target path
transpositions = target nodes clicked but wrong position
edit_distance = Levenshtein(response_sequence, path_sequence)
score = weighted(hits, longest_prefix, errors, rt_total)

建议不要只用单一“得分”。对认知评估而言，longest_prefix、transposition error、intrusion error、rt_first_ms、rt_total_ms 比游戏分数更可解释。

1.5 建议记录数据字段
JSON
{
  "participant_id": "hashed",
  "session_id": "uuid",
  "task_id": "firefly_route_recall",
  "task_version": "semver",
  "trial_id": 12,
  "block_id": 2,
  "random_seed": 928133,
  "graph_id": "layout_03",
  "nodes": [
    {"id": "n1", "x": 120, "y": 220, "type": "target_or_distractor"}
  ],
  "edges": [
    {"from": "n1", "to": "n2", "length_px": 80}
  ],
  "path_sequence": ["n1", "n4", "n7", "n8"],
  "path_length": 4,
  "distractor_nodes": ["n2", "n3", "n5"],
  "preview_ms": 4000,
  "step_ms": 1000,
  "gap_ms": 250,
  "retention_interval_ms": 500,
  "recall_mode": "forward_click",
  "response_sequence": ["n1", "n4", "n8", "n7"],
  "response_events": [
    {"node_id": "n1", "x": 118, "y": 219, "t_ms": 732, "position_index": 0}
  ],
  "rt_first_ms": 732,
  "rt_total_ms": 4210,
  "exact_match": false,
  "hits": 2,
  "longest_prefix": 2,
  "errors": {
    "omission": 0,
    "intrusion": 0,
    "transposition": 2,
    "invalid_edge": 1
  },
  "edit_distance": 2,
  "difficulty_params": {
    "node_count": 8,
    "path_length": 4,
    "branch_factor": 2,
    "distractor_count": 4
  },
  "validity_flags": {
    "focus_loss": false,
    "resized": false,
    "double_clicks": 0
  }
}
1.6 风险边界

可以说：该任务用于记录“路线序列记忆、视空间短时记忆、路径复现表现、任务内准确率和反应时”。
不应说：该网页游戏可以诊断记忆障碍、治疗认知衰退、改善真实世界导航能力、预防痴呆或替代临床评估。Corsi、route-learning、OpenMaze 等文献和工具能支持“任务范式依据”，不能自动支持产品医疗疗效。

2. visual route switching / train-of-thought 类玩法
2.1 可参考开源代码、库、插件案例

案例 A：track-of-thought-web。
这是最贴近 Train of Thought 类玩法的网页开源案例。README 说明它是训练 divided attention 的游戏，玩法是通过操纵 rail switches 把 trains 带到 stations；license 为 ISC。项目支持高级 URL 参数，例如 level、gridHeight、gridWidth、generateRetryCount、autoPlay、stationSeed、trainSeed 等。源码结构包含 generator、game、grid、score、train 等模块；game.ts 中通过生成 level、绘制 departure/destination/switches、让 switches interactive、用 requestAnimationFrame 更新；train.ts 中 train 按时间表生成、沿路线移动、检查是否到达正确 station；score.ts 中记录 good/total 并判断 perfect 或 level complete。
GitHub
+4
GitHub
+4
GitHub
+4

**可转化方式：**它提供了完整的“实体生成→轨道切换→实时更新→到达目标→计分”的工程模型。若用于商业系统，需要避免复制其具体关卡、美术和命名；ISC license 允许度较高，但仍应保留 license 声明。

案例 B：track-of-thought Java 项目。
该项目说明为“free game for training divided attention”，核心玩法是逐步增加球的数量，让玩家同时引导所有球到 station，并可创建自定义 level；README 也说明灵感来自 Lumosity’s Train of Thought。页面未看到明确 license，因此只能作为公开代码参考，不能直接复用到产品。
GitHub

案例 C：jspsych-contrib plugin-trail-making。
该插件实现 Trail Making Test，包信息显示 license 为 MIT。源码参数包括 test_type A/B、num_targets 默认 25、canvas 尺寸、target 半径、最小间距、错误反馈时长、seed 等；数据包括 target 坐标与 label、每次点击的 target index、时间、坐标、correct、completion time、错误数、路径距离和 inter-click times。插件说明 TMT-A 是数字顺序连接，TMT-B 是数字/字母交替，常用于 visual attention 和 task switching。
GitHub
+1

**可转化方式：**TMT-B 可作为“路线连接 + 规则切换”的简化非实时版本；轨道切换游戏中的“下一目标颜色/站点规则变化”可以借鉴 TMT-B 的 alternating rule，但需要记录 switch/repeat 条件。

案例 D：jspsych-contrib plugin-pursuit-rotor。
该插件是连续追踪任务，license 为 MIT；参数包括 trial_duration、path_radius、target_radius、rotation_speed、sample_interval 等；数据包括 time_on_target、percent_on_target、mean_deviation、samples 等。
GitHub
+1

**可转化方式：**它不是路线切换任务，但提供了高频采样、连续运动、鼠标/触控追踪、time-on-target 等实时行为记录范式。

案例 E：GEJ1 jsPsych_online_TMT。
该 GitHub 项目说明为基于 jsPsych v6.1.0 的 Digital Trail Making Test，并解释 TMT 测量 visual attention、task switching、visual search speed、processing speed、mental flexibility、executive function。页面未见明确 license，因此不建议直接复用代码。
GitHub

案例 F：PsyToolkit Task Switching。
PsyToolkit Task Switching 页面说明 Jersild 早期发现快速交替任务会使反应变慢，Rogers & Monsell 1995 的 alternating-runs 方法使 task-switching 范式流行；数据输出包含 block、位置、task type、letter、number、block type、switch/repeat、status、response time 等。PsyToolkit 使用边界同上：非商业研究/教育可用，商业需许可。
PsyToolkit
+2
PsyToolkit
+2

2.2 论文、正式来源、经典任务依据

Lumosity Train of Thought 官方说明与科学博客。
Lumosity 官方页面把 Train of Thought 描述为引导越来越多 trains 到 stations 的游戏，目标包括 divided attention、planning、coordination；其博客说明 Train of Thought 是 Lumosity 自创游戏，但认知原则来自 planning、Tower of Hanoi、Multiple Object Tracking，并在更高等级中加入 planning score。这里可作为设计说明参考，不应作为我们产品疗效证据。
Lumosity
+1

Task Switching：Jersild、Rogers & Monsell、Monsell。
PsyToolkit 页面概述了 task switching 的经典背景：Jersild 研究快速任务交替导致变慢，Rogers & Monsell 1995 推广 alternating-runs paradigm，switch cost 是 switch trial 相比 repeat trial 的反应时增加。
PsyToolkit
+1

Kurtin et al. 2022, “Introducing the Task Switching Game: A Paradigm for Neuroimaging and Online Studies”。
该文提出 online/neuroimaging 可用的 task-switching game，用 Digit Span、Spatial Span、Spatial Rotation 三种视觉相似任务构成切换范式，并报告任务参数会影响 switch costs。
F1000Research

Pylyshyn & Storm 1988, “Tracking Multiple Independent Targets: Evidence for a Parallel Tracking Mechanism”。
PubMed 摘要显示，该经典 Multiple Object Tracking 研究中，参与者可以在 10 个相同移动物体中追踪最多约 5 个目标。轨道切换游戏的“同时关注多个移动实体”可借鉴 MOT 的负荷思想。
PubMed

Trail Making Test。
TMT 是经典纸笔神经心理测验，Part A 连接 25 个数字，Part B 在数字和字母之间交替连接。TMT-B 常被用作视觉搜索、加工速度、认知灵活性和 set-switching 的指标；数字化版本可以记录更细的点击路径和时间序列。
GitHub
+3
Millisecond
+3
PubMed
+3

2.3 建议任务参数
参数	建议范围	说明
grid_width, grid_height	8×6 起步；高级 15×9 或更大	track-of-thought-web 支持 URL 级别网格参数；大网格提高路线长度和视觉搜索负荷。
GitHub

station_count	2–4 起步；高级 5–8	目标站越多，颜色/目标映射和路线规划负荷越大。
switch_count	2–5 起步；高级 6–12	switch 数量直接控制决策点数量。
branch_factor	2 为基础；高级可 3	3 分叉会明显增加规划和错误路径可能性。
entity_count	3–8 起步；高级 10–30	实体数量控制 divided attention / MOT 负荷。
active_entity_cap	1–2 起步；高级 3–5	同时活跃实体比总实体数更关键。
speed_px_per_s	慢速教学；正式逐级提高	速度越高，switch lead time 越短。
spawn_interval_ms	由 duration / train_count 或独立 schedule 控制	track-of-thought-web 的 train 生成逻辑可按总时长和 train 数生成周期。
GitHub

collision_rule	初期关闭；高级打开	碰撞会引入额外避让规划，可能改变任务域。
wrong_station_penalty	计错误；可扣分或终止该实体	必须单独记录，不要只合并进总分。
score_rule	correct arrivals、wrong station、missed、collision、lead time、route efficiency	分数用于游戏反馈；评估应使用原始事件和派生指标。
adaptive_rule	连续 2 局高准确率加实体数或速度；错误多则降速/减实体	建议一次只调一个维度，避免难度来源不可解释。
2.4 核心算法说明

图模型。
轨道系统可表示为有向图或无向图：G=(V,E)。普通节点只有一个出口或固定出口；switch node 有多个候选出口，当前状态 switch_state 决定实体进入后走哪条边。站点节点有 station_id 和 target_color 或 target_type。

Level:
    nodes = {track nodes, switch nodes, stations, spawn points}
    edges = directed rail segments
    switches = {
        switch_id: {
            incoming_edges,
            outgoing_edges,
            state_index
        }
    }
    stations = {
        station_id: target_color
    }

实时更新。

for each animation frame:
    dt = now - last_frame_time

    spawn entities whose spawn_time <= now

    for entity in active_entities:
        entity.progress += entity.speed * dt / current_edge.length

        if entity reaches next_node:
            if next_node is switch:
                next_edge = switch_state[next_node]
            else:
                next_edge = default_outgoing_edge

            if next_node is station:
                correct = station.target == entity.target
                log arrival
                remove entity
            else:
                entity.current_edge = next_edge

    detect collisions if collision_rule enabled
    update score and UI

关卡生成与验证。

generate_level(difficulty):
    for attempt in 1..generateRetryCount:
        layout = sample_grid_or_track_graph(difficulty)
        place spawn and stations
        place switches
        if not all stations reachable from spawn:
            continue

        routes = BFS_or_Dijkstra(layout, spawn, each_station)
        if routes satisfy min_length and switch_count constraints:
            schedule = generate_spawn_schedule(entity_count, duration)
            if simulate(layout, schedule) has no unavoidable failure:
                return level
    fallback_to_handcrafted_level()

BFS 用来验证每个 station 至少可达；如果引入路线效率，可以用 Dijkstra 或 BFS 计算最短路，与玩家实际路线长度比较。对实时游戏而言，还应做一次轻量模拟，避免生成“无论如何都会错站或碰撞”的关卡。

关键派生指标。

switch_lead_time_ms = time(entity_reaches_switch) - time(last_relevant_switch_toggle)
switch_error = entity chooses edge not leading to target station
planning_error = wrong station or route impossible after switch history
divided_attention_load = max(active_entities in last N ms)
route_efficiency = shortest_path_length / actual_path_length
2.5 建议记录数据字段
JSON
{
  "task_id": "visual_route_switching",
  "level_id": "L05",
  "layout_seed": 10093,
  "train_seed": 30021,
  "grid_width": 12,
  "grid_height": 8,
  "nodes": [{"id": "s1", "type": "switch", "x": 4, "y": 3}],
  "edges": [{"from": "a", "to": "b", "length": 1, "direction": "E"}],
  "stations": [{"id": "red_station", "target": "red"}],
  "switches": [{"id": "sw3", "states": ["E", "S"], "initial_state": "E"}],
  "difficulty_params": {
    "station_count": 4,
    "switch_count": 6,
    "entity_count": 12,
    "speed": 1.2,
    "spawn_interval_ms": 1800,
    "active_entity_cap": 3
  },
  "entities": [
    {
      "entity_id": "t07",
      "target_station": "red_station",
      "target_color": "red",
      "spawn_time_ms": 9200,
      "arrival_time_ms": 18400,
      "arrival_station": "red_station",
      "correct_arrival": true,
      "route_taken": ["a", "b", "sw3", "c", "red_station"]
    }
  ],
  "switch_events": [
    {
      "switch_id": "sw3",
      "from_state": "E",
      "to_state": "S",
      "t_ms": 14320,
      "nearest_entity_id": "t07",
      "lead_time_ms": 620
    }
  ],
  "frame_samples": [
    {
      "t_ms": 15000,
      "active_entity_count": 3,
      "entity_positions": [{"entity_id": "t07", "edge": "b-sw3", "progress": 0.72}]
    }
  ],
  "outcomes": {
    "correct_arrivals": 10,
    "wrong_station": 1,
    "collisions": 0,
    "missed": 1,
    "score_raw": 840,
    "score_norm": 0.84
  },
  "validity_flags": {
    "focus_loss": false,
    "low_fps": false,
    "input_lag_suspected": false
  }
}
2.6 风险边界

可以说：该玩法记录“分散注意、实时视觉追踪、规则切换、路线规划相关的任务表现”。
不应说：它能治疗 ADHD、改善真实世界多任务能力、提升学习/工作效率、康复脑损伤，除非有专门临床试验、常模、信效度和必要监管判断。Lumosity 曾因未经充分证据支持地宣传广泛认知和现实生活收益而与 FTC 达成和解；FTC 也强调“玩游戏表现提升”不能自动证明现实世界记忆、专注或生产力改善。
Federal Trade Commission
+1

3. gameified cognitive task shell：实验任务游戏化外壳
3.1 可参考开源代码、库、插件案例

案例 A：jsPsych。
jsPsych 是浏览器行为实验 JavaScript 框架；实验由 plugins 组成，plugins 负责呈现刺激和收集数据，timeline 可组合不同 trial。GitHub 页面显示 license 为 MIT，并给出 de Leeuw 2015 和 de Leeuw et al. 2023 的正式引用。jsPsych 数据文档说明每个 trial 会自动加入中心化数据集合，可用 addProperties 添加 participant/condition 等全局字段，也可用 trial 的 data 参数或 on_finish 写入自定义字段；插件层通过 jsPsych.finishTrial(data) 保存数据。
JSPsych
+3
GitHub
+3
JSPsych
+3

**适用性：**适合作为中文网页系统的核心实验引擎，尤其适合保留 trial-level 数据、条件参数和反应时。

案例 B：jspsych-contrib。
jspsych-contrib 是社区贡献的 jsPsych 插件集合，包含 corsi-blocks、pursuit-rotor、tower-of-london、trail-making 等；页面也提示这些插件不是由 jsPsych 核心团队维护或测试，不能保证修复。
GitHub

**适用性：**适合作为范式代码参考；正式产品中应做代码审计、版本锁定和内部测试。

案例 C：lab.js。
lab.js 是 free、open、online study builder，支持图形化 builder 和 JavaScript library。GitHub 页面显示核心库是 Apache license，builder 是 AGPL，用户构建的 studies 属于用户自己。Henninger et al. 2022 在 Behavior Research Methods 发表了 lab.js 软件论文。
GitHub
+1

**适用性：**适合作为“可视化搭建实验 + 网页运行 + 模板化”的架构参考；如果直接嵌入 builder，要注意 AGPL。

案例 D：Tatool Web。
Tatool Web 是开源实验软件，官网说明其可在现代浏览器运行实验、使用在线 module editor、一键发布；GitHub license 为 GPL-3.0。
Tatool
+1

**适用性：**适合作为模块化任务设计和在线发布的参考；GPL-3.0 对商业闭源集成不友好。

案例 E：PEBL 与 PsychoPy。
PEBL 是 GPL-2.0，包含大量认知测试；PsychoPy 官方 license 说明为 GPL3，可以免费使用、适配和发布，但再发布需遵守同一 license。
GitHub
+1

**适用性：**适合作为任务库和参数参考；若直接移植代码，需处理 GPL 约束。

案例 F：Online lab.js experiment templates。
该模板库说明为基于 lab.js 的开放心理学实验模板，包含 participant ID、consent、demographics、debriefing 等结构，license 为 MIT。
GitHub

**适用性：**适合作为中文系统的 session shell、知情同意、人口学表单、结束页结构参考。

案例 G：Experiment Factory。
Experiment Factory 页面列出大量有 GitHub 与 demo 的实验任务，包括 digit-span、dimensional-set-shifting、flanker-children、go-nogo、n-back、number-letter、plus-minus、spatial-span、stop-signal 等。该页面适合检索“可网页化的成熟任务”，但每个任务的 license 需要逐项核查。
实验工厂

案例 H：Proteo serious-game framework。
Proteo 论文把它描述为用于 telerehabilitation serious games 的 modular open-source framework；文中说明它支持 client/server 通信、用户管理、数据库/数据收集、人机交互和机器学习模块，并强调 therapists 与 developers 一起定义玩法、可调参数和采集数据。论文还说明框架为 MIT license。
MDPI

**适用性：**适合作为康复友好 serious game shell 的架构依据，但不等于证明某个具体认知训练有效。

3.2 论文、正式文章、框架依据

Khaleghi et al. 2021, “A Gamification Framework for Cognitive Assessment and Cognitive Training: Qualitative Study”。
该文指出，认知评估和训练任务常常重复、枯燥，游戏化可能提高参与度，但结果并不总是一致；游戏元素如果增加无关认知负荷，可能损害数据质量。文章提出 7 阶段框架：准备、了解用户、探索工具/上下文和 game-up/mapping 适配性、构思、使用 OMDE 原型、开发、发布与监测。
JMIR Serious Games

Eng et al. 2024, “Incorporating Evidence-Based Gamification and Machine Learning to Assess Preschool Executive Function: A Feasibility Study”。
该研究把传统 Flanker Task 游戏化，用于 3–5 岁儿童，并结合机器学习自适应难度；结果显示游戏化版本与传统任务和学业指标相关，并提高 enjoyment、保留 psychometric properties、减少数据丢失。文章还特别强调游戏化评估没有改变 essential task properties，并保留了准确率/反应时中的 conflict effect。
MDPI

Bernava et al. 2021, “Proteo: An Open-Source Modular Framework to Build Shared Virtual Environments and Localized Therapeutic Serious Games”。
该文针对 telerehabilitation serious games，强调模块化、开源、跨平台、可自定义游戏模板、数据采集、用户管理和 clinician/developer 协作。
MDPI

Nguyen et al. 2025, “Design and development of a gamified cognitive training program targeting executive functions for older adults”。
该文是老年执行功能游戏化训练项目的设计与开发文章，强调用 gamification 提高动机和享受，用 cognitive plasticity/transfer 框架设计 working memory、inhibitory control、cognitive flexibility 的自适应多域训练；文章也说明后续还需要评价使用者感受和疗效。
ScienceDirect

de Leeuw 2015 / de Leeuw et al. 2023 jsPsych；Henninger et al. 2022 lab.js。
jsPsych 和 lab.js 都有正式软件论文，适合作为网页认知实验系统的工程依据。
GitHub
+1

3.3 Gameified task shell 的推荐任务参数
参数类别	字段	建议
任务结构	practice_trials, formal_trials, blocks, break_interval	儿童/康复友好版本应短区块、多休息；正式评估应固定 trial 数或固定停止规则
难度参数	set_size, path_length, n_back, stimulus_duration, ISI, distractor_count, switch_probability, speed	每个任务只允许有限几个主难度轴；自适应时一次只调一个主要轴
反馈参数	feedback_type, feedback_delay_ms, reward_schedule	练习阶段可即时反馈；正式评估阶段建议延迟或弱反馈
游戏化参数	theme, avatar, story_step, points, badges, level_name	必须与认知数据分开保存；不要让奖励改变核心反应规则
儿童/康复适配	target_size_px, font_size, audio_instruction, touch_enabled, max_session_minutes	大按钮、低阅读负荷、触控兼容、音频说明、短时段
数据质量	focus_loss, fullscreen_exit, fps, input_lag, device, viewport	网页评估必须记录环境变量，否则反应时解释会受限
自适应	adaptive_state_before, adaptive_state_after, rolling_accuracy, rolling_rt	建议目标准确率维持在 70–85%；低于阈值降难度，高于阈值升难度
3.4 推荐架构算法

核心原则是把“科学任务”与“游戏外壳”分层。游戏外壳可以改美术、故事、反馈、奖励和导航，但不能隐式改变刺激条件、反应规则、计时和评分。

TaskSpec:
    task_id
    task_version
    conditions
    difficulty_schema
    generateTrial(seed, difficulty)
    renderStimulus(trial)
    captureResponse(input)
    scoreTrial(trial, response)
    adaptDifficulty(history)
    serializeTrialData(trial, response, score)

GameShell:
    preload assets
    show instructions
    run practice
    run blocks
    show feedback/reward
    handle breaks
    upload/export data

建议的 trial 生命周期。

1. sample difficulty
2. generate trial with random_seed
3. freeze trial JSON
4. render stimulus
5. start high-resolution timer
6. collect raw response events
7. score trial
8. update adaptive state
9. save full trial data
10. show feedback / reward

自适应逻辑示例。

if rolling_accuracy >= 0.85 and median_rt stable:
    increase one difficulty dimension
elif rolling_accuracy <= 0.65:
    decrease one difficulty dimension
else:
    keep difficulty

不要同时增加路径长度、速度、干扰数量和规则切换概率；否则后续无法解释表现下降到底来自工作记忆、视觉搜索、速度压力还是规则切换。

3.5 Gameified shell 必须保留的数据字段
JSON
{
  "participant_id": "hashed",
  "session_id": "uuid",
  "consent_version": "2026-05",
  "task_id": "route_recall",
  "task_version": "1.2.0",
  "shell_version": "0.9.4",
  "build_hash": "git_sha",
  "language": "zh-CN",
  "device": {
    "browser": "Chrome",
    "os": "Windows",
    "input": "mouse",
    "viewport": [1280, 720],
    "pixel_ratio": 1
  },
  "trial_id": 25,
  "block_id": 3,
  "condition": "long_path_with_distractors",
  "random_seed": 732813,
  "stimulus_spec": {},
  "stimulus_hash": "sha256",
  "difficulty_params": {},
  "adaptive_state_before": {},
  "response": {},
  "response_events": [],
  "rt_ms": 842,
  "accuracy": true,
  "error_type": null,
  "score_game": 120,
  "score_cognitive": {
    "hits": 5,
    "errors": 0,
    "longest_prefix": 5
  },
  "adaptive_state_after": {},
  "timing": {
    "trial_start_unix_ms": 1778792333000,
    "stimulus_onset_ms": 150,
    "response_end_ms": 992
  },
  "validity_flags": {
    "focus_loss_count": 0,
    "fullscreen_exit": false,
    "low_fps": false,
    "interrupted": false
  }
}
3.6 风险边界

可以说：

“本系统把成熟认知任务网页化、游戏化，用于记录任务内表现，包括准确率、反应时、错误类型、难度等级和学习曲线。”

“儿童/康复友好”可以指界面友好、操作负荷降低、说明更清晰、区块更短、反馈更明确。

应避免说：

“诊断 ADHD / MCI / dementia / stroke impairment。”
“治疗认知障碍。”
“改善学校成绩、工作效率、真实世界注意力或记忆。”
“预防认知衰退。”
“具有医疗康复疗效。”

FDA 对软件是否属于医疗器械采取基于 intended use 和 indications for use 的判断；若产品声称用于诊断、治疗、干预疾病或指导治疗，就可能进入医疗器械软件监管范围。
U.S. Food and Drug Administration
+1

FTC 针对 Lumosity 的案例也提示，广泛认知改善和现实生活收益需要扎实的人体研究证据，不能仅凭游戏内分数提升来宣传。
Federal Trade Commission
+1

对当前中文网页系统的具体落地建议
A. maze：萤火虫路线建议命名

推荐中文名：
“萤火虫路线记忆”、“路径复现”、“路线序列回忆”。

不推荐命名：
“迷宫训练”，因为当前机制不是在未知迷宫中搜索出口，而是先编码路线再复现，认知依据更接近 Corsi / Spatial Span / Route Recall。

B. 三个难度层级

Level 1：Spatial Span 型。
无边或弱边；只看节点闪烁顺序；用户按顺序点击。对应 Corsi / Spatial Recall。

Level 2：Route Recall 型。
节点之间有可见路线；萤火虫沿边移动；用户复现路径。记录 invalid edge、transposition、omission。

Level 3：Route Planning + Recall 型。
加入分叉、干扰节点、短延迟、倒序复现或二次路线。此时任务域不再是纯短时记忆，应在数据中标注 condition 和 difficulty_params。

C. visual route switching后续新增游戏建议

推荐中文名：
“轨道调度”、“路线切换”、“多目标路线引导”。

核心不要写成“Train of Thought 克隆”。应写成：
“基于实时多目标追踪、路线切换和任务切换范式的游戏化任务。”

最小可行版本：

2 个站点
2 个 switch
6 个移动实体
无碰撞
慢速
只记录 correct/wrong 和 switch_events

正式评估版本再加入：

switch/repeat 条件
active_entity_count
lead_time_ms
wrong_station
route_efficiency
collision
speed manipulation
D. Gameified shell 的开发红线

每个 trial 必须可重放：保存 random_seed + stimulus_spec + difficulty_params。

游戏分数不能替代认知指标：必须同时保存 accuracy、RT、错误类型、原始事件。

自适应算法必须记录前后状态：否则无法解释表现变化。

儿童/康复友好不能随意降低任务纯度：可以改 UI，不应隐式改核心规则。

任何“认知改善、康复、诊断”措辞都必须等验证研究完成后再使用。

来源

进阶专业
ChatGPT 也可能会犯错。请核查重要信息。查看 你的隐私选择。⁠