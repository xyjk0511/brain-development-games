# 02-memory-working-spatial

Source conversation: https://chatgpt.com/c/69fdba11-d5e4-83ea-978f-4028bf20970c
Collected: 2026-05-08T10:43:21.031Z
Extraction method: main.innerText

---

任务编号：02-memory-working-spatial

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
展开

我会先把四个游戏对应到成熟认知任务范式，再核对开源实现、许可证、经典论文/说明、试次逻辑、参数与数据字段；来源优先使用官方文档、论文页面和 GitHub，无法确认的会明确标注。

已定位到四类任务均有可用依据；翻牌配对更适合表述为 Concentration/Pairs 游戏规则结合视觉识别、配对联想与匹配算法依据，而非单一临床范式。

Thought for 15m 57s
02-memory-working-spatial 游戏设计依据报告
总体口径

这 4 个游戏可以归入成熟认知任务的游戏化实现，而不是复刻 Lumosity。建议在产品文案中使用“训练/评估某一类认知任务表现”“记录行为数据”“用于非医疗的认知能力练习或筛查辅助研究”，避免说“治疗 ADHD/痴呆/认知障碍”“提升智商”“诊断疾病”。尤其是 N-back 的远迁移和流体智力提升证据并不稳定，相关训练研究存在正反结果；可以说“任务表现、工作记忆更新能力练习”，不能强称“提高智商”。
专注游戏下载网站
+2
PhilPapers
+2

开源实现方面，建议优先参考 MIT / Apache-2.0 这类许可项目；GPL、AGPL 项目可学习算法，但若闭源商用集成会触发开源义务。未在页面看到 license 的仓库，应按“不可直接复用，只作界面/逻辑参考”处理。jsPsych 核心库为 MIT，并且有正式论文说明它是浏览器行为实验框架；jspsych-contrib 是社区插件库，官方页面明确说明这些插件不是核心团队充分验证和维护的组件，因此用于正式评估前要自行测试。
GitHub
+2
斯普林格
+2

总结表
我们的游戏	对应成熟任务范式	认知域	可参考开源项目/库/插件	论文/正式文章/经典任务来源	核心算法/试次生成逻辑	应记录的数据字段	我们当前设计应该保留/改进点
strong-memory：强力记忆/绿格记忆	Corsi Block-Tapping Task、computerized Corsi、spatial span、visual memory matrix	视觉-空间短时记忆、空间跨度、空间工作记忆、即时空间回忆	jspsych-contrib corsi-blocks 插件；Experiment Factory spatial-span，MIT；PsyToolkit Corsi，非商业免费使用；PEBL，GPL/GPL-2.0；FreeFocusGames 含 Block Memory Challenge，AGPL-3.0。
GitHub
+5
GitHub
+5
GitHub
+5
	Philip M. Corsi, “Human memory and the medial temporal region of the brain”, 1972；Kessels et al., “The Corsi Block-Tapping Task: Standardization and Normative Data”, 2000；Gibeau, “The Corsi Blocks Task: Variations and coding with jsPsych”, 2021。
eScholarship
+2
PubMed
+2
	生成网格或 9 个空间块；抽取 k 个目标格；按“同时亮起后回忆”或“逐个亮起后按顺序复现”两种条件呈现；用户点击后计算 hits、misses、false alarms、顺序错误；成功则提高 k 或增大网格，连续失败则降级或结束。	trial_id, condition, grid_size, target_count, target_set, target_sequence, display_mode, display_ms, isi_ms, delay_ms, response_cells, response_order, per_click_rt_ms, hits, misses, false_alarms, order_errors, correct, score, span_estimate, seed, device。	保留“短暂呈现—隐藏—点击回忆”的核心玩法；改进为区分 unordered matrix recall 与 ordered Corsi sequence；记录点击顺序和逐点击 RT；加入练习轮、随机种子、难度阶梯；避免把 Lumosity Memory Matrix 当作唯一依据。
card-matching：翻牌配对	Concentration / Memory Matching、Paired Associates Learning, PAL、object-location associative learning	视觉记忆、视觉-空间配对记忆、物体-位置联结、关联学习、注意与策略	Tania Rascia memory，MIT；Mahmoud AbouDeghedy Matching-Memory-Game，MIT；Ania Kubów memory-game，README 标注 MIT Licence；jsPsych webbook paired-associate 教学示例；PEBL Paired Associates Learning 可作 GPL 任务库方向。
GitHub
+5
GitHub
+5
GitHub
+5
	CANTAB “Paired Associates Learning (PAL)”正式说明；Sirály et al., “Monitoring the Early Signs of Cognitive Decline in Elderly by Computer Games: An MRI Study”, 2015；Gudde et al., “The (Spatial) Memory Game…”, 2018；Chakrabarti & Chen, “Time-Space Tradeoffs for the Memory Game”, 2017/2018。
arXiv
+3
Cambridge Cognition
+3
PLOS
+3
	生成 p 对卡牌，复制成 2p 张并洗牌；每回合允许翻两张；相同则锁定/移除，不同则延迟翻回；记录完成所需 moves、clicks、time、错误配对。若做 PAL 变体，先显示“物体-位置”，再让用户根据中央提示点击原位置。	trial_id, deck_id, grid_rows, grid_cols, pair_count, card_layout, stimulus_ids, first_card_id, second_card_id, first_flip_rt_ms, second_flip_rt_ms, is_match, move_index, mismatch_count, pair_found, remaining_pairs, completion_time_ms, total_clicks, correct, error_type。	保留“翻两张—判断是否匹配”的低门槛交互；改进为固定评估版与随机训练版分离；增加受控刺激集；记录每次翻牌 RT 与错误配对；如要增强认知依据，可增加 PAL-style study-test 条件。
simon-says：颜色灯光序列复现	Simon electronic memory game、serial order recall、Corsi-like sequence recall	序列记忆、序列顺序保持、视觉/听觉-运动工作记忆、空间序列回忆	Parzibyte simon-says-javascript，MIT；jsPsych Simon Memory Game，页面未显示 license；Reaction Trainer Sequence Memory，Apache-2.0；若参考 Human Benchmark 类逻辑，可看 GPL-3.0 自动化项目中的 Sequence Memory/Visual Memory 描述，但不建议复用为产品代码。
GitHub
+3
GitHub
+3
svanhedger.github.io
+3
	Hasbro Simon 官方规则；美国专利 “Microcomputer controlled game”, 1980；Smithsonian 对 Simon 1978 游戏史说明；Hurlstone, Hitch & Baddeley, “Memory for Serial Order Across Domains”, 2014。
mark-hurlstone.github.io
+4
Hasbro Instructions
+4
Google Patents
+4
	用 4 个颜色/声音按钮构成 alphabet；第 1 关序列长度为 1；每关在末尾追加一个随机元素；系统按固定 SOA 播放序列；用户按顺序复现；任一位置错误则记录 error_position，结束或降级；正确则进入 length+1。	trial_id, level, alphabet_size, sequence, appended_item, stimulus_on_ms, isi_ms, response_sequence, per_step_rt_ms, error_position, first_error_type, correct_steps, correct_level, longest_span, timeout, score, seed。	保留“watch, remember, repeat”和逐级增长；改进为伪随机平衡，避免某颜色过度出现；固定播放速度用于评估版，训练版再做速度自适应；明确它不是 Stroop/Simon effect 任务。
n-back：动物/图片序列 N-back	N-back continuous performance task、single/dual/spatial n-back	工作记忆更新、持续注意、监控、干扰控制、目标检测	jspsych-contrib spatial-nback 插件；jspsych-timelines spatial-nback；PsyToolkit N-back；iRB-Lab N-Back，MIT；Brain Workshop，GPL-2.0；FreeFocusGames Dual N-Back，AGPL-3.0。
GitHub
+6
GitHub
+6
GitHub
+6
	Kirchner, “Age differences in short-term retention of rapidly changing information”, 1958；Jaeggi et al., “Improving fluid intelligence with training on working memory”, 2008；Redick et al., “No Evidence of Intelligence Improvement After Working Memory Training”, 2013；Meule, “Reporting and Interpreting Working Memory Performance in n-back Tasks”, 2017。
PMC
+3
PsyToolkit
+3
美国国家科学院院刊
+3
	给定 N 与刺激池；第 i 试次若为 target，则 stimulus[i] = stimulus[i-N]；若为 non-target，则避免等于 stimulus[i-N]；控制 target 比例约 25–33%，可加入 lure；前 N 个 trial 不计 target；计算 hit、miss、false alarm、correct rejection、accuracy、d′、RT。	trial_id, block_id, n_level, stimulus_id, stimulus_category, is_target, lure_type, nback_reference_id, response, response_time_ms, hit, miss, false_alarm, correct_rejection, correct, rt_ms, block_accuracy, d_prime, criterion, adaptive_action, seed。	保留动物/图片序列判断；改进为 0/1/2-back 分层、固定 target 比例、加入 lure 记录、前 N 试次不计分；评估版固定 N，训练版再自适应；严禁宣称“提高智商/治疗 ADHD”。
每个游戏详细依据
1. strong-memory：强力记忆 / 绿格记忆
1.1 成熟任务映射

这个游戏最稳妥的成熟范式是 Corsi Block-Tapping Task 和 computerized Corsi。Corsi 原始任务来自 Philip M. Corsi 1972 年 McGill 博士论文 “Human memory and the medial temporal region of the brain”；PsyToolkit 的 Corsi 说明将其定义为短时记忆任务，传统流程是实验者在 9 个空间块上按序敲击，参与者按相同顺序复现，Corsi span 是能正确复现的最长序列。
eScholarship
+1

Gibeau 2021 的 “The Corsi Blocks Task: Variations and coding with jsPsych” 说明，Corsi 任务长期用于临床与实验研究，原始版本是 9 个木块，现代计算机版本通常以 2D 方块依次高亮的方式实现；文章也给出 jsPsych 实现，并提醒计算机化版本虽然常用，但不同版本的验证和标准化并不完全一致。
TQMP

对于“绿格记忆”这种同时亮起若干格、隐藏后点击的玩法，它不是严格的顺序 Corsi，而更接近 visual memory matrix / spatial recall。建议在系统里把 strong-memory 拆成两个 condition：unordered_matrix 记录目标集合回忆，ordered_corsi 记录序列顺序回忆。这样既能保留当前玩法，也能对齐成熟任务范式。Corsi 系统综述也指出数字化 Corsi 研究在方法上存在不一致，建立共同数字框架很重要。
ScienceDirect

1.2 开源代码 / 库 / 插件案例

jspsych-contrib plugin-corsi-blocks。该插件说明写明它实现 Corsi block tapping task，支持展示模式与输入模式：展示模式按序显示 block，输入模式要求参与者按相同顺序点击；插件可自定义 blocks 与排列。jspsych-contrib 本身是社区贡献库，页面说明这些插件没有核心团队的充分测试和官方维护保证。license 在可抓取页面未显示；jsPsych 核心库是 MIT，但该插件复用前仍应检查 package 或仓库 license。
GitHub
+2
GitHub
+2

Experiment Factory spatial-span。这是 “A test of spatial memory span”，GitHub 页面显示 MIT license，适合参考 JS 实验组织与空间跨度任务结构。
GitHub

PsyToolkit Corsi。PsyToolkit 是非商业免费使用的在线心理实验平台，支持浏览器、键盘、鼠标、触屏和在线数据收集；其 Corsi 页面提供 demo、source code 和 download 链接，并给出从 2 个 block 开始、正确升高长度、错误再给一次机会的实现逻辑。它更适合作为任务流程与教学代码参考，不应默认按开源库许可直接集成。
PsyToolkit
+1

PEBL。PEBL 是免费开源心理实验软件，GitHub 页面显示 GPL-2.0 license，README 写明其含 100+ 预置心理测试、CSV 数据收集、毫秒计时等能力。若项目闭源商用，只建议学习算法，不建议直接复制 GPL 代码。
GitHub

FreeFocusGames。该仓库说明包含 Dual N-Back、Schulte Table、Stroop、Reaction Time，以及 “Block Memory Challenge: Spatial working memory exercise”，license 为 AGPL-3.0；AGPL 不适合闭源直接集成，但可作为透明实现参考。
GitHub

Human Benchmark 类参考。HumanVsComputerBenchmark 是自动化 Human Benchmark 的 GPL-3.0 项目，README 描述了 Sequence Memory 是 3x3 网格中序列每轮增长 1，Visual Memory 是 2D 网格中若干白格短暂显示后点击正确位置。它是自动化/机器人项目，不是可直接复用的评估任务代码，但能帮助界定类似网页任务的交互规则。
GitHub

未找到可靠的 Lumosity “Memory Matrix” 官方开源代码。找到的若干 Memory Matrix 克隆仓库多为个人游戏项目，license 往往未在抓取页面显示；建议只作界面参考，核心依据仍用 Corsi / spatial span 任务。

1.3 论文、综述、正式说明

Philip M. Corsi, “Human memory and the medial temporal region of the brain”, 1972。McGill eScholarship 页面显示这是 Corsi 的博士论文，日期为 1972，并可下载 PDF。
eScholarship

Kessels et al., “The Corsi Block-Tapping Task: Standardization and Normative Data”, 2000。PubMed 记录显示该文发表于 Applied Neuropsychology, 7(4):252–258，DOI 为 10.1207/S15324826AN0704_8。PsyToolkit 也引用该文，并给出健康成人平均 block span 约 6.2、SD 1.3 的说明。
PubMed
+1

Gibeau, “The Corsi Blocks Task: Variations and coding with jsPsych”, 2021。该文总结 Corsi 任务变体、计算机化实现、依赖指标，并提供 jsPsych 编码依据。
TQMP

Arce & McMullen, “The Corsi Block-Tapping Test: Evaluating methodological practices with an eye towards modern digital frameworks”, 2021。该综述指出 Corsi 是常用空间跨度测量任务，但方法实践不一致，需要更统一的数字框架。
ScienceDirect

1.4 任务参数建议

评估版建议使用两套 condition。ordered_corsi 使用 9 个不规则位置 block 或 3x3 网格，起始序列长度 2；每个刺激高亮 500–1000 ms，ISI 250–500 ms；用户按顺序点击，正确则 length+1，错误可重复同长度一次，两次错误结束并记录 span。PsyToolkit Corsi 的实现就是从 2 个 blocks 开始，正确后升高长度，错误后再给一次机会，两次错误输出 Corsi span。
PsyToolkit

unordered_matrix 用于当前“绿格记忆”：3x3 起步，目标数 3 起步；根据表现逐步增加目标数或扩展到 4x4、5x5。呈现可用 simultaneous display，即所有目标格同时亮起 700–1500 ms；隐藏后让用户点击目标集合。该模式不应叫严格 Corsi span，建议指标命名为 matrix_recall_score、target_set_accuracy 或 spatial_recall_accuracy。

难度阶梯建议：训练版可用 1-up/1-down 或“正确升一级，错误留级一次，再错降级”；评估版建议固定 block 或固定长度范围，避免训练式自适应影响可比性。Corsi 的核心评分可记录最长正确序列、总正确序列数、forward/backward 条件表现；Gibeau 文中也讨论了最长序列、forward/backward 和总正确数等依赖指标。
TQMP

1.5 数据字段

建议最小字段如下：

trial_id, participant_id, session_id, game_version, condition, grid_rows, grid_cols, layout_type, target_count, sequence_length, target_set, target_sequence, display_mode, stimulus_on_ms, isi_ms, retention_delay_ms, response_cells, response_order, per_click_rt_ms, first_click_rt_ms, last_click_rt_ms, hits, misses, false_alarms, order_errors, correct, error_type, score, span_estimate, adaptive_level_before, adaptive_level_after, seed, timestamp_start, timestamp_end, device_type, viewport_width, viewport_height.

1.6 风险边界

可以说：该任务测量或训练“视觉-空间短时记忆 / 空间跨度 / 空间工作记忆任务表现”。不应说：可以诊断脑损伤、海马问题、ADHD、痴呆，或替代临床 neuropsychological assessment。Gibeau 明确提醒计算机化 Corsi 版本的正式验证仍有限，不能因为范式成熟就自动把网页游戏当作临床测验。
TQMP

2. card-matching：翻牌配对
2.1 成熟任务映射

翻牌配对本身是 Concentration / Memory Matching game：桌面上有成对卡牌，背面朝上，每次翻两张，相同则保留或移除，不同则翻回。更正式的心理测量对应物是 Paired Associates Learning, PAL，尤其是视觉图案与空间位置的联结学习。CANTAB 的 PAL 官方说明把它定义为评估 visual memory 与 new learning 的任务；典型 PAL 是展示盒子/位置中的图案，然后让参与者回忆图案最初出现的位置。
Cambridge Cognition

Sirály et al. 2015 的 PLoS ONE 研究使用 “Find the Pairs” 电脑记忆游戏，并与 PAL 和脑区 MRI 指标做相关分析。文中方法说明：游戏开始时卡牌背面朝上，每回合翻两张，匹配则消失，目标是清空所有卡；教程为 3x4，练习为 3x6，测量为 4x6，并记录完成所需时间和点击数。该研究同时强调，这类游戏不能替代临床诊断，最多用于提示进一步专业评估。
PLOS

因此，当前 card-matching 可以有两个版本：一个是轻量的 Concentration 翻牌训练版，一个是更接近 PAL 的“学习阶段—回忆阶段”评估版。

2.2 开源代码 / 库 / 插件案例

Tania Rascia memory。GitHub 搜索结果显示该项目为 MIT license；README/教程说明了核心算法：显示卡片、复制成两套、随机化、允许选择两张、判断 match、匹配后隐藏、非匹配延迟翻回。
GitHub
+1

Mahmoud AbouDeghedy Matching-Memory-Game。README 说明该游戏为 16 张卡、8 对图标，随机洗牌后背面朝上；功能包括 shuffle、匹配逻辑、计时、moves、best score；页面显示 MIT license。
GitHub

Ania Kubów memory-game。README 将其定义为 Memory Game / Concentration / Matching game，规则是一次翻两张找对子；页面写有 “MIT Licence”。
GitHub

jsPsych webbook paired-associate 示例。该教学页说明 paired-associate learning 是学习两个不相关项目之间的联结，常见流程是随机/重复呈现词对，再给出其中一个项目让参与者回忆另一个；它适合参考 jsPsych timeline variables、randomize_order、repetitions 的试次组织方式，但不是专门的翻牌游戏代码库。
jsPsych

PEBL Paired Associates Learning。PEBL release 信息中提到新增 Paired Associates Learning task；PEBL 主仓库为 GPL-2.0，因此可作为开放心理任务库参考，但闭源产品不能直接嵌入 GPL 代码。
GitHub
+1

2.3 论文、正式说明与算法依据

CANTAB “Paired Associates Learning (PAL)”。官方页面说明 PAL assesses visual memory and new learning，适合作为 card-matching 的正式认知范式锚点。
Cambridge Cognition

Sirály et al., “Monitoring the Early Signs of Cognitive Decline in Elderly by Computer Games: An MRI Study”, 2015。该文使用 Find the Pairs 电脑游戏，记录完成时间和点击数，并与 PAL 结果和脑区体积进行相关；结论中也明确指出电脑游戏不能替代临床诊断。
PLOS

ConductCognition PAL 说明。该页面描述了 3x3 网格、盒子依次打开、中央图案提示、2/4/6/8 个 pattern、最多 3 次尝试等 PAL 结构，并列出 total errors、first attempt memory score、stages completed 等输出指标；它是正式任务说明，不是开源代码。
ConductCognition

Chakrabarti & Chen, “Time-Space Tradeoffs for the Memory Game”, 2017/2018。该文从算法角度研究 Memory game：n 对卡牌、每回合揭示两张、匹配则移除、目标是最小化翻牌次数；可作为翻牌配对的形式化算法依据。
arXiv

2.4 任务参数建议

基础训练版：从 4 对、6 对、8 对、12 对逐级上升；网格可用 4x4 作为常规中级难度，即 8 对卡。每轮允许翻两张，第二张翻开后判断是否同 pair；匹配则锁定或消失，不匹配则在 800–1200 ms 后翻回。计分以 moves、mismatch_count、completion_time_ms、pair_accuracy 为主。开源记忆游戏项目普遍采用“复制成对子—随机洗牌—一次翻两张—匹配隐藏/非匹配翻回”的逻辑。
GitHub
+2
GitHub
+2

评估版建议固定刺激布局，至少将同一 session 内的测量版与训练版分开。Sirály 研究中测量阶段使用 4x6 卡面，且所有参与者位置相同，这有利于测量可比性；但网页产品若面向重复训练，应增加多套平衡布局以减少记忆固定答案。
PLOS

PAL-style 版本：先显示物体-位置绑定，如 3x3 网格内依次打开 2、4、6、8 个图案；随后在中央呈现图案，让用户点击原位置；最多 3 次尝试后进入下一难度或结束。该版本比普通翻牌更适合作为“视觉-空间关联学习”评估任务。
ConductCognition

2.5 数据字段

建议最小字段如下：

trial_id, participant_id, session_id, game_version, condition, deck_id, grid_rows, grid_cols, pair_count, card_layout, stimulus_ids, card_id_first, card_id_second, pair_id_first, pair_id_second, first_flip_time_ms, second_flip_time_ms, inter_flip_interval_ms, is_match, move_index, mismatch_count, match_count, pair_found, remaining_pairs, total_clicks, completion_time_ms, correct, error_type, preview_ms, delay_before_hide_ms, seed, timestamp_start, timestamp_end, device_type.

PAL-style 还应记录：

study_sequence, study_item_id, study_location, test_item_id, chosen_location, location_error_distance, attempt_index, first_attempt_correct, stage_completed, total_errors, adjusted_total_errors.

2.6 风险边界

可以说：该任务涉及视觉记忆、物体-位置联结、配对记忆与策略性搜索。不能说：网页翻牌游戏能诊断 MCI、阿尔茨海默病或海马萎缩。Sirály et al. 明确指出电脑游戏不能用于诊断，也不能替代详细神经心理评估；最多可给出“建议进一步专业评估”的提示。
PLOS

3. simon-says：颜色灯光序列复现
3.1 成熟任务映射

Simon-says 对应的是 Simon electronic memory game 和 serial order recall。Hasbro 官方规则将 Simon 描述为“watch, remember, repeat”：玩家重复随机灯光序列，序列越来越长。美国专利 “Microcomputer controlled game” 也说明该游戏生成随机音调/灯光序列，玩家正确复现后在原序列后增加一个新元素，直到出错或达到预定长度。
Hasbro Instructions
+1

它与心理学里的 Simon effect 不是同一个任务。Simon effect 是刺激-反应兼容性任务；本游戏是颜色/声音序列的短时保持与顺序复现，认知域应写 serial order memory、sequence memory、visuomotor sequence recall。Hurlstone, Hitch & Baddeley 的综述指出，按正确顺序储存和提取新序列是多种言语与非言语高级认知活动的基础，并比较了 verbal、visual、spatial short-term memory 中的 serial order 机制。
mark-hurlstone.github.io
+1

3.2 开源代码 / 库 / 插件案例

Parzibyte simon-says-javascript。README 说明这是 JavaScript + d3 实现的 Simon Says 游戏，页面显示 MIT license。
GitHub

jsPsych Simon Memory Game。该页面说明这是 Simon memory game 的 jsPsych 版本：一开始一个按钮亮起并播放声音，用户正确重复后在序列中追加一个按钮/音调，出错后 game over；页面未显示可确认的 license，因此仅建议参考流程。
svanhedger.github.io

Reaction Trainer Sequence Memory。该项目是 React + TypeScript + Vite 的多游戏认知训练网页应用，页面显示 Apache-2.0 license；README 中 Sequence Memory 的规则是记住并复现不断增长的序列。
GitHub

Human Benchmark 类参考。HumanVsComputerBenchmark 对 Sequence Memory 的描述是 3x3 网格中每步显示一个白格，序列每轮增长 1；它是 GPL-3.0 自动化项目，可帮助理解网页交互，但不建议作为产品代码来源。
GitHub

3.3 论文、正式说明与经典来源

Hasbro Simon Game 官方规则。官方说明包括“watch, remember, repeat”“repeat random sequences of lights”“sequences get longer”等规则。
Hasbro Instructions

“Microcomputer controlled game”, US Patent, 1980。专利摘要说明游戏生成随机音调序列，玩家需要精确重复；正确后重复当前序列并追加一个音调，直到错误或达到预定长度。
Google Patents

Smithsonian “Simon Electronic Game, 1978”。Smithsonian 页面说明 Simon 由 Ralph Baer 与 Howard Morrison 设计，1978 年发布，核心是四个不同颜色按钮、每个按钮有独特音符，玩家重复越来越长的音调序列。
美国历史国家博物馆

Hurlstone, Hitch & Baddeley, “Memory for Serial Order Across Domains: An Overview of the Literature and Directions for Future Research”, 2014。该综述是 serial order memory 的理论依据，适合支撑“序列顺序记忆”认知域。
mark-hurlstone.github.io
+1

3.4 任务参数建议

基础参数：4 个按钮，颜色与声音一一对应；第 1 关长度 1；每关在旧序列末尾追加一个随机元素；每个元素呈现 500–800 ms，ISI 250–500 ms；用户必须按完全相同顺序点击。正式评估版应固定速度，不要随关卡变快；训练版可逐步缩短呈现时间或增加按钮数。

随机生成建议：完全随机会导致某颜色过度出现或长串重复，训练游戏可接受，但评估任务建议使用伪随机平衡。可限制连续重复不超过 2 次，或在每 8–12 个新增元素内平衡四种颜色出现频次。若研究目的需要纯随机，应记录 seed 和完整 sequence。

自适应建议：训练版使用“正确进入下一关，错误结束或降一级”；评估版可设最大长度，例如 12、16、20，记录 longest_exact_sequence。Hasbro 与专利来源都支持“成功后序列增长，错误后结束”的基本逻辑。
Hasbro Instructions
+1

计分方式：首要指标是最长完全正确长度；辅助指标包括总正确步数、首错位置、每步反应时、颜色混淆类型、是否因超时失败。不要只记录总分，否则无法分析是短序列粗心、长序列容量不足，还是某颜色/位置映射困难。

3.5 数据字段

建议最小字段如下：

trial_id, participant_id, session_id, game_version, condition, level, alphabet_size, button_layout, sequence, appended_item, stimulus_on_ms, isi_ms, response_window_ms, response_sequence, per_step_rt_ms, correct_steps, first_error_position, first_error_expected, first_error_actual, error_type, timeout, level_correct, longest_span, score, adaptive_level_before, adaptive_level_after, seed, timestamp_start, timestamp_end, device_type.

3.6 风险边界

可以说：该任务训练或评估序列顺序记忆、视觉/听觉线索保持和动作序列复现表现。不能说：它测量 Simon effect，也不能说能治疗注意力问题或提升一般智力。若加入声音，应提供静音模式并记录是否启用声音，因为视觉-only 与 audio-visual 双通道条件的负荷不同。

4. n-back：动物 / 图片序列 N-back
4.1 成熟任务映射

N-back 是 continuous performance task：参与者看到一串逐个出现的刺激，每个刺激都要判断是否与前 N 个刺激相同；N 越大，工作记忆更新和监控负荷越高。PsyToolkit 的 N-back 页面说明该任务可追溯到 Kirchner 1950s，典型实验中刺激呈现 500 ms，随后 2500 ms 空屏，总响应窗口 3000 ms；页面还列出 match、false alarm、miss 等响应类型。
PsyToolkit
+1

如果使用动物/图片而不是字母，本质仍是 stimulus identity n-back。建议把动物图片作为 stimulus_id，避免只记录中文名称；这样可区分“同一图片匹配”和“同一类别匹配”。如果要做动物类别 N-back，例如“当前是否与前 2 项同属猫科/鸟类”，那是 category n-back，认知和难度与 identity n-back 不同，应作为单独 condition。

4.2 开源代码 / 库 / 插件案例

jspsych-contrib spatial-nback。jspsych-contrib 插件列表说明该插件用于 spatial grid stimulus，可自定义网格、高亮 cell、收集反应并提供反馈/说明；contrib 插件属于社区贡献，需自行验证。
GitHub

jspsych-timelines spatial-nback。该时间线包说明支持自定义 grid size、n-back level、feedback 等，适合快速搭建空间 N-back。
GitHub

PsyToolkit N-back。PsyToolkit 提供 2-back demo、source code 和 download，示例使用 15 个字母、500 ms 呈现、3000 ms 响应窗口、3 个 block、每 block 25 trial，并给出数据输出字段。
PsyToolkit
+1

iRB-Lab N-Back。这是 JavaScript 实现，GitHub 页面显示 MIT license；README 描述了 0-back、1-back、2-back 条件，500 ms 呈现 + 2000 ms ISI，33% targets，每 block 48 个字母、16 个 targets，伪随机 block 顺序。
GitHub

Brain Workshop。SourceForge 页面称其为 free open-source dual n-back；GitHub 镜像显示 GPL-2.0 license。官方 details 页面说明每 session 20 trials、每 trial 3 秒，自适应规则为 80% 及以上升 N，50–79% 保持，三次低于 50% 降 N。
brainworkshop.sourceforge.net
+2
GitHub
+2

FreeFocusGames Dual N-Back。仓库为 AGPL-3.0，README 说明包含 Dual N-Back；网页说明新手从 1-back 开始，约 80–85% 准确率后提高难度，并承认 broader transfer to fluid intelligence remains mixed。
GitHub
+1

4.3 论文、综述、正式说明

Kirchner, “Age differences in short-term retention of rapidly changing information”, 1958。PsyToolkit 的 N-back further reading 将 Kirchner 1958 列为经典来源；PubMed 搜索结果也显示该文发表于 Journal of Experimental Psychology。
PsyToolkit
+1

Jaeggi et al., “Improving fluid intelligence with training on working memory”, 2008。该 PNAS 论文是 dual n-back 训练被广泛讨论的来源之一，但产品文案不应只引用它来宣称流体智力提升。
美国国家科学院院刊

Redick et al., “No Evidence of Intelligence Improvement After Working Memory Training: A Randomized, Placebo-Controlled Study”, 2013。该文标题和摘要方向明确反驳强远迁移结论，是风险边界的重要来源。
PhilPapers

Jaeggi et al., “The concurrent validity of the N-back task as a working memory measure”, 2010；Kane & Conway, “Working memory, attention control, and the N-back task: A question of construct validity”, 2007。PsyToolkit further reading 同时列出这两篇，用于说明 N-back 与工作记忆构念效度的讨论。
PsyToolkit

Meule, “Reporting and Interpreting Working Memory Performance in n-back Tasks”, 2017。搜索结果显示该文讨论如何报告与解释 n-back 表现，适合指导数据指标设计。
PMC

4.4 任务参数建议

基础评估版：设 0-back baseline、1-back 入门、2-back 主任务、3-back 高级。动物/图片刺激池建议 8–20 个项目；每 trial 呈现 500 ms，ISI 2000–2500 ms，总响应窗口 2500–3000 ms。PsyToolkit 示例和 iRB-Lab 实现都使用约 500 ms 呈现、总 3000 ms 左右节奏；iRB-Lab 使用 33% targets。
PsyToolkit
+1

target 比例建议 25–33%。2-back 中前 2 个 trial 不应计为 target/non-target 的正式表现。若做 40 trial block，可设置 10–13 个 targets；其余为 non-target，并加入 10–20% lure。lure 可定义为 n_minus_1_lure、n_plus_1_lure、same_category_lure，用于区分真正工作记忆错误和相似性干扰错误。

试次生成逻辑建议：

Input: n_level, trial_count, stimulus_pool, target_ratio, lure_ratio, seed
1. 初始化 sequence 长度 trial_count。
2. 先抽取 target_indices，要求 i >= n_level。
3. 对每个 target index i：sequence[i] = sequence[i - n_level]。
4. 对 non-target index i：从 stimulus_pool 中抽取，但排除 sequence[i - n_level]。
5. 若需要 lure：在 non-target 中指定部分 trial，让 stimulus 接近 i-(n±1) 或同类别，但仍不等于 i-n。
6. 检查约束：无意外 target、无过长重复、项目频次基本平衡。
7. 保存 seed、target_indices、lure_indices、sequence。

自适应建议：训练版可参考 Brain Workshop 的阈值，block 准确率 ≥80% 升 N，50–79% 保持，连续或累计多次 <50% 降 N；正式评估版不建议即时自适应，而是固定 block 顺序以保证可比性。
brainworkshop.sourceforge.net

计分方式：不要只给总 accuracy。N-back 必须拆分 hit_rate, miss_rate, false_alarm_rate, correct_rejection_rate, mean_rt_hit, mean_rt_false_alarm，并计算 d′ 或类似信号检测指标。PsyToolkit 的数据列已经把 match、miss、false alarm、RT、当前刺激、nback1、nback2 分开记录。
PsyToolkit

4.5 数据字段

建议最小字段如下：

trial_id, participant_id, session_id, game_version, block_id, condition, n_level, modality, stimulus_id, stimulus_category, stimulus_asset_hash, trial_index_in_block, is_scored_trial, is_target, lure_type, nback_reference_trial_id, nback_reference_stimulus_id, response, response_key, response_time_ms, hit, miss, false_alarm, correct_rejection, correct, error_type, stimulus_on_ms, isi_ms, response_window_ms, block_accuracy, hit_rate, false_alarm_rate, d_prime, criterion, adaptive_level_before, adaptive_action, adaptive_level_after, seed, timestamp_start, timestamp_end, device_type.

4.6 风险边界

可以说：N-back 练习工作记忆更新、持续注意和目标监控，记录任务表现。不能说：训练一定提升 IQ、学习成绩、ADHD 症状或临床认知功能。FreeFocusGames 自身的说明也承认，对流体智力的 broader transfer 证据是 mixed；Redick et al. 2013 和 Lawlor-Savage et al. 2016 都提供了更保守的证据边界。
专注游戏下载网站
+2
PhilPapers
+2

统一实现建议

四个游戏都应记录 random_seed、game_version、condition、device_type、viewport、input_type 和完整刺激序列。没有这些字段，后续很难解释用户分数差异究竟来自能力、刺激生成、移动端误触、屏幕尺寸还是版本变化。

评估版和训练版要分离。评估版应固定参数、固定或平衡刺激、限制反馈；训练版可以自适应、给反馈、加动画和奖励。jsPsych、PsyToolkit、PEBL 等工具的共同价值在于透明试次生成、数据字段明确和可复现实验流程，而不是游戏外观。
斯普林格
+2
PsyToolkit
+2

最终产品文案建议使用：“本任务基于 Corsi / PAL / Simon sequence / N-back 等经典认知任务范式改编，用于记录视觉-空间记忆、序列记忆和工作记忆更新等任务表现。”不要使用：“临床诊断”“治疗”“显著提升智商”“改善 ADHD/痴呆”等医疗或强疗效表述。

来源

进阶专业
ChatGPT 也可能会犯错。请核查重要信息。查看 你的隐私选择。⁠