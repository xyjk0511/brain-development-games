# 04-perception-language-arithmetic

Source conversation: https://chatgpt.com/c/69fdba37-b7ac-83ea-b251-221c09576442
Collected: 2026-05-08T10:43:37.202Z
Extraction method: main.innerText

---

任务编号：04-perception-language-arithmetic

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
展开

我会按任务范式、代码实现、论文依据、参数/算法、数据字段和风险边界整理，并优先核验官方文档、GitHub、PsyToolkit/PEBL 与论文页面；许可证不明确会单独标注。

我会额外突出游戏化设计与成熟实验范式的映射关系，并把结论限定为认知训练/评估依据，不延伸到医疗疗效声明。

Thought for 13m 40s
04-perception-language-arithmetic：感知觉 / 语言 / 算术游戏设计依据报告

说明：本报告把 4 个游戏定位为“基于成熟认知任务范式的网页训练/评估原型”。不建议宣称其具有诊断、治疗、改善疾病、提升学业/工作表现等确定疗效。FTC 曾针对 Lumosity 的“brain training”广告声称提出执法，核心问题是缺乏足够科学证据却声称可改善现实表现、延缓认知衰退或减少疾病相关认知损害；FDA 2026 年一般健康软件指导也把“维持/鼓励健康生活方式、且与疾病诊断/治疗/缓解无关”的软件功能，与医疗器械类用途区分开来。
Federal Trade Commission
+1

总结表
我们的游戏	对应成熟任务范式	认知域	可参考开源项目/库/插件	论文/正式文章/经典任务来源	核心算法/试次生成逻辑	应记录的数据字段	当前设计应该保留/改进点
mental-rotation：转转积木伙伴	Mental Rotation；same/different 判断；旋转匹配	视觉空间加工、心理旋转、空间表征、速度-准确性权衡	jsPsych：MIT，适合网页实验框架；magpie-mental-rotation：MIT，使用 Ganis & Kievit 刺激，2×2 设计；PEBL：GPL，含 Shepard mental rotation / matrix rotation；PsyToolkit mentalrotation：有源码和 zip，但任务页未显示明确再分发 license。
PsyToolkit
+4
GitHub
+4
GitHub
+4
	Shepard & Metzler, “Mental Rotation of Three-Dimensional Objects”, 1971；Vandenberg & Kuse, “Mental Rotations, a Group Test of Three-Dimensional Spatial Visualization”, 1978；Ganis & Kievit, “A New Set of Three-Dimensional Shapes…”, 2015。
Figshare
+3
facultypsy.hope.edu
+3
Sage Journals
+3
	每 trial 选 base object、angle、same/different；same 为同一对象旋转，different 为镜像或结构不同对象旋转；记录 angle 与 RT，分析 RT 是否随角度增大。	trial_id, object_id, condition, angle, same_different, stimulus_left/right, correct_answer, response, correct, rt_ms, timeout, difficulty_params, error_type	保留“角度 + 反应时 + 同/不同判断”。改进：平衡 same/different、角度、左右位置、对象重复次数；加入 0/50/100/150 或 0–180°角度阶梯；明确不同项是 mirror 还是 structurally different。
word-scramble：字字小乐园	Lexical Decision Task；Semantic Priming；lexical-semantic decision；语义匹配/词义联想	词汇通达、语义记忆、语义联想、抑制无关词	PsyToolkit LDT：源码/zip，任务页未显示明确 license；jsPsych webbook lexical decision with semantic priming；UiL-OTS jspsych-lexical-decision：GPL-2.0；BarbaraMath Lexical_Decision_Task：页面未显示明确 license；PEBL Lexical Decision：PEBL GPL。
The Hub
+5
PsyToolkit
+5
jsPsych
+5
	Meyer & Schvaneveldt, “Facilitation in Recognizing Pairs of Words…”, 1971；Neely, “Semantic priming and retrieval from lexical memory…”, 1976；Hutchison et al., “The Semantic Priming Project”, 2013；Chinese Lexicon Project / Simplified Chinese Lexicon Project。
斯普林格
+6
PsyToolkit
+6
德克萨斯大学心理实验室
+6
	生成 prime-target 或双词对；条件包括 related、unrelated、nonword/pseudocharacter、category/synonym/function/association；平衡词频、字数、笔画、语义相关度。	trial_id, prime, target, lexicality, relation_type, semantic_category, word_frequency, word_length, stroke_count, correct_answer, response, correct, rt_ms, soa_ms, error_type	保留“语义匹配/词义联想”核心。改进：不要只做字母/汉字乱序；中文版本应使用词频、字数、笔画、伪字/伪词可控材料；把“关联”“不关联”“非词”分开记录。
quick-math：果果心算铺	Mental arithmetic；arithmetic verification / production；number sense / approximate arithmetic	算术事实提取、数量感、工作记忆、加工速度、问题大小效应	PEBL Math Processing / Math Test / Two column addition：GPL；PsyToolkit Automated O-Span：源码/zip，含简单数学问题与自动评分，任务页未显示明确 license；CAST_jsPsych：MIT，含 1,999 个数学题与 jsPsych 实现；NBCLab arithmetic-task：PsychoPy 算术任务，页面未显示明确 license；Zetamac Arithmetic Game 可作速度钻习 UX 参考但不是开源项目。
arithmetic.zetamac.com
+5
The Hub
+5
PEBL
+5
	Ashcraft & Stazyk, “Mental addition: A test of three verification models”, 1981；Park & Brannon, “Training the Approximate Number System Improves Math Proficiency”, 2013；Szkudlarek et al., “Failure to replicate…”, 2021；CAST 对应 Choe et al. 2019。
GitHub
+3
斯普林格
+3
SAS UPenn
+3
	按 operation、operand range、carry/borrow、problem size、multi-step、verification split 生成题；production 模式直接输入答案，verification 模式判断等式或比较值；ANS 模式用点阵数量近似加减。	trial_id, operation, operand_a/b/c, problem_string, correct_answer, presented_answer, distractor_split, carry_borrow, problem_size, response, correct, rt_ms, difficulty_level, error_type	保留“快速心算 + RT/正确率”。改进：题目不能只随机；应按进位、借位、乘法表、二位数、false split 等可解释难度生成；速度分要受正确率约束。
number-sequence：规律小火车	Number Series；sequence reasoning；pattern completion；figure/shape/color series	归纳推理、规则发现、工作记忆、序列抽象、模式补全	numGen Number Series Generator：GPL-3，13 类 item model；jsPsych：MIT，可自定义网页 trial；jspsych-contrib Trail Making：sequence UI 参考，任务页未显示 license；PEBL Match-to-sample / Pattern Comparison / Card sorting：GPL，作为图形/规则任务参考。未找到可靠的“专门 jsPsych number-series/pattern-completion 插件”。
PEBL
+4
GitHub
+4
GitHub
+4
	MITRE/ETS Number Series 说明；Sun et al., “Automatic Generation of Number Series Reasoning Items of High Difficulty”, 2019；Rittle-Johnson et al. patterning assessment；Liang et al. number/letter series ACT-R 研究。
ai.rug.nl
+5
MITRE
+5
Frontiers
+5
	生成规则：等差、等比、交替子序列、二阶差分、Fibonacci、checksum、颜色/形状 AB/ABB/ABC/AABB、复合规则；隐藏 next 或 missing item；生成干扰选项。	trial_id, sequence, missing_index, rule_type, rule_params, modality, period_length, num_rules, rule_span, correct_answer, options, response, correct, rt_ms, difficulty_params, error_type	保留“找规律补全”。改进：规则必须可追踪，不要纯随机；每题保存 rule_type/rule_params；数字、颜色、形状规则要分层，再做复合。
每个游戏详细依据
1. mental-rotation：转转积木伙伴
1.1 开源代码 / 库 / 插件案例

magpie-ea/magpie-mental-rotation：这是较接近本游戏的开源案例，README 显示为 MIT license，使用 Ganis & Kievit 2015 的 3D mental rotation 材料；实验为 2×2 被试内设计：rotation 为 50°/150°，match 为 same/different，48 对图像，二选一判断是否同一形状。
GitHub

jsPsych：官方 GitHub 显示 MIT license；它不是单独的 mental rotation 插件，但适合在中文网页系统中实现刺激呈现、按键/按钮反应、反应时采集、timeline、随机化和自定义 plugin。
GitHub

PEBL：官方页面说明 PEBL 是 free/open-source，并以 GPL 授权；PEBL 任务列表中包含 Mental Rotation、Matrix Rotation、Manikin Task 等空间旋转任务。
PEBL
+1

PsyToolkit mentalrotation：任务页提供可运行 demo、源码和 zip 下载；页面说明示例中有 2D 刺激，要求被试通过心理旋转找出匹配对象，并记录反应时、正确/错误/太慢等字段。该任务页未显示明确的源码再分发 license，因此若要直接复用源码，需要另行确认 PsyToolkit 许可。
PsyToolkit

1.2 论文 / 经典任务来源

Shepard & Metzler, “Mental Rotation of Three-Dimensional Objects”, 1971。经典发现是：判断两幅 3D 物体图是否为同一物体所需时间，会随角度差线性增加；原文还描述了 same/different 杠杆反应。
facultypsy.hope.edu
+1

Vandenberg & Kuse, “Mental Rotations, a Group Test of Three-Dimensional Spatial Visualization”, 1978。该文将 Shepard & Metzler 的立体图形发展成纸笔空间可视化测验，报告了内部一致性和重测信度。
Sage Journals

Ganis & Kievit, “A New Set of Three-Dimensional Shapes for Investigating Mental Rotation Processes: Validation Data and Stimulus Set”, 2015。该数据论文提供 384 个 3D mental rotation 刺激，并报告行为数据中 RT 和错误率随角度差线性增加；文章和 figshare 数据均为 CC BY 4.0。
Journal of Open Psychology Data
+1

1.3 任务参数建议

核心参数建议如下：

旋转角度：研究型版本可用 Ganis & Kievit 的 0/50/100/150°；儿童/游戏化版本可从 0/45/90/135/180° 或 0/30/60/90/120/150/180° 开始。Ganis & Kievit 数据集使用的角度和 same/different 组合有现成验证依据。
Journal of Open Psychology Data
+1

same/different 比例：建议 50/50。不同项要明确是 mirror、结构不同、部件方向不同，不能混用后不记录。

试次长度：初级 24–40 trials；标准版 48–96 trials；研究版可更多，但网页训练应避免疲劳。

反应窗口：初级 6–8 秒，中级 4–6 秒，高级 2.5–4 秒。超时计为 timeout，但不等同于错误。

计分方式：正确率优先，RT 只在正确 trial 上计入速度分；可报告 median_rt_correct、accuracy_by_angle、rt_angle_slope。

自适应建议：若最近 12–20 个 trial 正确率 ≥ 85% 且中位 RT 低于目标阈值，则增加角度数量、减少反应窗口或加入更相似干扰；若正确率 < 65%，降低角度或减少镜像干扰。

1.4 算法说明

Mental rotation 的生成逻辑应是“可解释生成”，而不是随机旋转图片。

伪代码：

for each trial:
    object_id = sample_balanced(objects)
    angle = sample_balanced(angle_set)
    condition = sample_balanced(["same", "different"])

    if condition == "same":
        target = rotate(base_object[object_id], angle)
        correct_answer = "same"
    else:
        distractor_type = sample(["mirror", "structural_different"])
        target = rotate(make_distractor(object_id, distractor_type), angle)
        correct_answer = "different"

    side_order = randomize(["base_left", "target_left"])
    present_pair(base, target)
    record response and rt_ms

关键分析是：正确 trial 的 RT 是否随 angle 增加，错误率是否在大角度上增加。这个设计继承了 Shepard & Metzler 1971 和 Ganis & Kievit 2015 的核心逻辑。
facultypsy.hope.edu
+1

1.5 数据字段

建议最少保存：

trial_id
game_id
participant_id_hash
session_id
object_id
stimulus_set
base_image_id
target_image_id
angle
condition                  # same / different
distractor_type             # mirror / structural_different / none
left_stimulus
right_stimulus
correct_answer
response
correct
rt_ms
response_window_ms
timeout
difficulty_level
difficulty_params
error_type                  # wrong_same, wrong_different, timeout, premature
timestamp
1.6 风险边界

可以说：“该任务评估/训练视觉空间加工、心理旋转速度、角度相关反应时特征。”
不应说：“可诊断空间能力障碍、治疗 ADHD/读写障碍/老年认知衰退、提升学业或工作表现。”FTC 的 Lumosity 案例明确提示，脑训练产品不能在没有充分临床或现实迁移证据时声称改善现实表现、延缓痴呆或减少疾病相关认知损害。
Federal Trade Commission

2. word-scramble：字字小乐园

这里建议把英文名 word-scramble 在产品内部解释为“词义线索与语义匹配”，而不是传统 anagram unscramble。你给出的设计描述“语义匹配/词义联想/lexical-semantic decision”更接近 Lexical Decision Task、Semantic Priming 和 Semantic Association，不是简单乱序拼词。

2.1 开源代码 / 库 / 插件案例

PsyToolkit LDT：任务页说明该 demo 类似 Meyer & Schvaneveldt 原始实验，要求判断两个刺激是否都是真词，条件包含 related、nonword、unrelated，并提供源码和 zip 下载。任务页未显示明确源码 license，复用前需确认。
PsyToolkit

jsPsych webbook lexical decision with semantic priming：官方教学示例描述了 prime 短暂呈现、target 判断是否真词，核心操纵是 prime-target 的语义关系；还包括练习 trial、正确率门槛、loop node 和 conditional node。
jsPsych

UiL-OTS-labs/jspsych-lexical-decision：GitHub 页面显示 GPL-2.0 license；它是 jsPsych lexical decision boilerplate，支持视觉/听觉 target、可选 masked prime，任务要求尽快判断 target 是否为真词。
GitHub

BarbaraMath/Lexical_Decision_Task：这是 MATLAB/Psychtoolbox 风格的 LDT 案例，README 说明有 related word、unrelated word、related non-word、unrelated non-word 四类，每类 45 对，共 180 trials；页面列出 2000 ms fixation、150 ms prime、650 ms blank、target 直到反应等流程。页面未显示明确 license。
GitHub
+1

PEBL Lexical Decision：PEBL 任务列表中有 Meyer & Schvaneveldt LDT，PEBL 本身为 GPL。
The Hub
+1

2.2 论文 / 数据来源

Meyer & Schvaneveldt, “Facilitation in Recognizing Pairs of Words: Evidence of a Dependence Between Retrieval Operations”, 1971。PsyToolkit LDT 页将该研究列为进一步阅读，并说明原任务涉及关联词对和词/非词判断；这是 semantic priming / lexical decision 的经典来源。
PsyToolkit
+1

Neely, “Semantic priming and retrieval from lexical memory: Evidence for facilitatory and inhibitory processes”, 1976。该研究使用 semantic priming 与 lexical decision，讨论语义启动中的促进与抑制过程。
斯普林格
+1

Hutchison et al., “The Semantic Priming Project”, 2013。该项目强调语义启动材料要控制 prime/target 长度、频率、bigram frequency、邻域、imageability、concreteness、meaningfulness 等混淆变量；这对中文网页任务的材料平衡很重要。
Dr. Erin Buchanan

Chinese Lexicon Project, 2014；Simplified Chinese Lexicon Project, 2025。前者提供 2,500 个简体中文单字 lexical decision 潜伏期数据；后者覆盖 8,105 个通用规范汉字和 4,864 个 pseudocharacters，并提供 trial-level data 和材料，对中文词汇/伪字材料选择很有价值。
斯普林格
+1

Tong et al., “The Graded Priming Effect of Semantic Radical on Chinese Character Recognition”, 2021。该研究用 lexical decision 与 priming 检验中文形声字语义部首相关度，并使用 57/140/243 ms SOA；这说明中文材料中部首、形旁、语义透明度等变量也会影响识别。
Frontiers

2.3 任务参数建议

建议把 word-scramble 分成 3 种可切换模式：

词汇判断模式：显示一个词或伪词，判断“是真词/不是词”。

语义匹配模式：显示 prime-target 或两词，判断“有关/无关”。

语义联想选择模式：给一个词，从 3–4 个选项中选最相关词。

材料参数：

词长：中文建议先用 2 字词，进阶再用单字、多字词、成语。

词频：按高/中/低频分层，不要把高频词都放 related、低频词都放 unrelated。

语义关系：同类关系、功能关系、上下位关系、近义、反义、常见搭配、弱关联、无关。

伪词/伪字：若做 lexical decision，可使用合法但不存在的二字组合；若做字符级，可参考 SCLP 的 pseudocharacters 逻辑。
斯普林格

SOA：网页游戏可从同时呈现开始；研究版可用 150 ms prime + 500–800 ms blank/target，BarbaraMath 案例使用 150 ms prime 与 650 ms blank。
GitHub

反应窗口：2–4 秒；儿童/低年级词汇可 5 秒。

计分方式：正确率优先，正确 trial 的 RT 给速度奖励；related/unrelated/nonword 分开算。

2.4 算法说明

语义匹配 trial 的生成逻辑：

for each trial:
    condition = balanced_sample(["related", "unrelated", "nonword"])
    prime = sample_word(stratified_by_frequency_category)

    if condition == "related":
        target = sample_related_target(prime, relation_type)
        correct_answer = "related" or "word"
    elif condition == "unrelated":
        target = sample_unrelated_target(
            matched_on_length_frequency_strokes(prime)
        )
        correct_answer = "unrelated" or "word"
    else:
        target = sample_pseudoword_or_pseudocharacter(
            matched_on_length_visual_complexity
        )
        correct_answer = "nonword"

    present(prime, target, soa_ms)
    record response, correct, rt_ms

材料平衡原则比界面更重要。Hutchison et al. 指出语义启动研究中常见问题是条件间材料变量混淆，例如词频、长度、邻域、具体性等没有平衡。中文任务还应额外控制笔画数、部件、部首位置、词频、字频、是否常用搭配。
Dr. Erin Buchanan
+1

2.5 数据字段
trial_id
game_id
participant_id_hash
session_id
mode                         # lexical_decision / semantic_match / association_choice
prime
target
options
condition                    # related / unrelated / nonword / pseudocharacter
relation_type                # category / function / synonym / antonym / collocation / weak_assoc
semantic_category
lexicality                   # word / nonword / pseudocharacter
word_frequency_prime
word_frequency_target
word_length_prime
word_length_target
stroke_count_prime
stroke_count_target
soa_ms
presentation_duration_ms
correct_answer
response
correct
rt_ms
difficulty_level
difficulty_params
error_type                   # false_positive, false_negative, unrelated_as_related, related_as_unrelated
timestamp
2.6 风险边界

可以说：“该任务用于观察词汇通达速度、语义匹配准确率、语义干扰或语义启动相关表现。”
不应说：“可诊断失语症、阅读障碍、语义记忆障碍、阿尔茨海默病，或治疗语言障碍。”如果要做临床筛查或康复，需要独立验证、伦理审批、常模和监管路径。FTC 与 FDA 的边界要求同样适用。
Federal Trade Commission
+1

3. quick-math：果果心算铺
3.1 开源代码 / 库 / 插件案例

PEBL Math Processing / Math Test / Two column addition：PEBL 任务列表包含 Math Processing task、Math test、Two column addition、Operation Span 等数学或算术相关任务；PEBL 为 GPL。
The Hub
+1

PsyToolkit Automated O-Span：虽然它是工作记忆任务，但其 trial 包含简单数学题，自动评分并记录数学 RT、数学正确性、最大允许 RT 等字段；任务页提供源码和 zip，但未显示明确再分发 license。
PsyToolkit

kywch/CAST_jsPsych：页面显示 MIT license；它是 Choose-And-Solve Task 的 jsPsych 实现，包含 1,999 个数学题和 1,858 个词题，用于研究数学焦虑与避免。它不等同于纯心算速度游戏，但可参考其题库、难度分层、奖励/努力设计。
GitHub

NBCLab/arithmetic-task：PsychoPy 实现的基础算术任务，页面说明公式由 1–30 的两个数字和 + - * / 运算符构成，比较值在真实答案 ±10 以内，并记录比较值与真实答案距离对难度的影响。页面未显示明确 license。
GitHub

Zetamac Arithmetic Game：不是开源项目，但可作为网页速度钻习 UX 参考；页面说明它是两分钟内尽可能解更多算术题的 speed drill，支持加减乘除范围和 30–600 秒时长。
arithmetic.zetamac.com

3.2 论文 / 正式来源

Ashcraft & Stazyk, “Mental addition: A test of three verification models”, 1981。该文讨论成人心算加法中的 retrieval / counting 模型，报告 RT 会随 problem size 增大，并且 false stimulus 的 split 越大越容易拒绝。
斯普林格
+1

Park & Brannon, “Training the Approximate Number System Improves Math Proficiency”, 2013。该研究用点阵近似加减训练 Approximate Number System；每 trial 涉及 9–36 个点阵，难度通过正确答案和备选项的 log difference 调节，并把准确率维持在 70%–85%。
SAS UPenn

Szkudlarek, Park & Brannon, “Failure to replicate the benefit of approximate arithmetic training for symbolic arithmetic fluency in adults”, 2021。该开放获取论文报告 4 个实验未能发现近似算术训练优于控制任务改善成人符号算术流畅性的证据，因此 ANS 训练不能被宣传为稳健提升符号数学能力。
ScienceDirect

Choe et al., “Calculated Avoidance: Math Anxiety Predicts Math Avoidance in Effort-Based Decision-Making”, 2019。CAST_jsPsych 仓库说明该任务让被试在低奖励简单题和高奖励困难题之间选择，用于数学焦虑与努力决策研究。
GitHub

3.3 任务参数建议

建议把 quick-math 拆成 production、verification、comparison 三种核心玩法：

Production：直接算 8 + 7 = ?，输入或选择答案。

Verification：显示 8 + 7 = 16，判断对/错。

Comparison：显示公式和比较值，判断真实答案 <, =, > 比较值；NBCLab arithmetic-task 使用类似逻辑。
GitHub

难度参数：

运算类型：+, -, ×, ÷, mixed operation。

数字范围：一位数、两位数、1–30、1–100。

加减法：无进位/有进位；无借位/有借位。

乘除法：乘法表内、两位数乘一位数、整除除法。

problem size：小数对、大数对；Ashcraft & Stazyk 显示 problem size 会影响 RT。
斯普林格

verification split：错误答案与正确答案的差值，如 ±1、±2、±5、±10；split 小更难。

反应窗口：初级 6–8 秒，中级 3–5 秒，高级 1.5–3 秒。

计分方式：正确率优先；连续正确给 combo；错误后重置 combo；RT 奖励只给正确 trial。

自适应：最近 20 trial 正确率 75%–90% 为目标区间。若 >90% 且 RT 快，则提高 operand range 或加入进位/借位；若 <70%，降低范围或延长窗口。Park & Brannon 的 ANS 训练把准确率调控在 70%–85%，可作为自适应目标的参考，但不要把它宣传为确定提升数学能力。
SAS UPenn
+1

3.4 算法说明

算术题生成逻辑：

for each trial:
    operation = sample_by_level(["+", "-", "×", "÷"])
    difficulty = current_adaptive_level

    if operation == "+":
        a, b = sample_operands(range, carry_required)
        correct_answer = a + b
        problem_size = a + b
        carry_borrow = has_carry(a, b)

    if operation == "-":
        a, b = sample_operands(range, borrow_required, ensure_nonnegative=True)
        correct_answer = a - b
        carry_borrow = has_borrow(a, b)

    if operation == "×":
        a, b = sample_operands(mult_table_or_2digit)
        correct_answer = a * b

    if operation == "÷":
        b, correct_answer = sample_divisor_and_quotient()
        a = b * correct_answer

    mode = sample(["production", "verification", "comparison"])

    if mode == "verification":
        if sample_true_false() == "true":
            presented_answer = correct_answer
        else:
            split = sample([1,2,5,10], weighted_by_difficulty)
            presented_answer = correct_answer + signed(split)
        correct_answer_label = (presented_answer == correct_answer)

    present problem
    record response and rt_ms

错误类型应尽量可解释，而不是只存 wrong。例如：进位错误、借位错误、运算符看错、乘法事实错误、差 1/差 10、超时、误按。

3.5 数据字段
trial_id
game_id
participant_id_hash
session_id
mode                         # production / verification / comparison
operation                    # + / - / × / ÷ / mixed
operand_a
operand_b
operand_c
problem_string
correct_answer
presented_answer
comparison_value
correct_answer_label
distractor_split
problem_size
carry_borrow                 # none / carry / borrow
operand_range
response
correct
rt_ms
response_window_ms
timeout
difficulty_level
difficulty_params
streak
score_awarded
error_type                   # carry_error, borrow_error, operation_error, off_by_one, timeout
timestamp
3.6 风险边界

可以说：“该任务用于训练/评估心算速度、算术事实提取、数量比较、问题大小效应相关表现。”
不应说：“可治疗数学障碍、改善考试成绩、提高 IQ、治疗焦虑或 ADHD。”尤其是 ANS / 数量感训练的迁移效果存在复制争议，2021 年大样本复制研究未发现近似算术训练优于控制任务改善成人符号算术流畅性的证据。
ScienceDirect

4. number-sequence：规律小火车
4.1 开源代码 / 库 / 插件案例

Aidenloe/numGen：Number Series Generator，GitHub 页面说明它有 13 类 item models，可生成 number series completion items，并基于 cognitive operators 预测难度；license 为 GNU GPL v3。它是本游戏最直接的算法参考。
GitHub

jsPsych：MIT license，适合把 number/shape/color sequence 作为网页 trial 实现，记录按钮、键盘、RT、timeline 和随机化。它不是专门的 number-series 插件，但足够实现自定义逻辑。
GitHub

jspsych-contrib plugin-trail-making：不是 pattern completion，但可参考其“按序连接”的交互组件；README 说明 Part A 连接数字顺序，Part B 在数字与字母之间交替，适合启发“规律小火车”的顺序交互设计。该页面未显示 license 信息。
GitHub

PEBL Match-to-sample / Pattern Comparison / Card sorting：PEBL 任务列表包含 pattern comparison、match-to-sample 和 card sorting 等规则/图形判断任务；PEBL 为 GPL。它们不是 number series 的直接实现，但可参考图形/颜色模式呈现与规则反馈。
The Hub
+1

结论：我没有找到可靠、专门、成熟的 jsPsych number-series/pattern-completion 插件。最稳妥的实现路线是：numGen 提供数字序列生成思想，jsPsych 自定义网页试次，PEBL/jspsych-contrib 提供交互与图形任务参考。

4.2 论文 / 正式来源

MITRE/ETS Inductive Reasoning Battery：Number Series test 用 8 个自然数、第 9 个缺失的形式测量 quantitative inductive reasoning；被试需要识别数列中的算术规则并外推缺失项。文档还列出 constant、checksum、Fibonacci 等变量派生规则。
MITRE
+1

Sun et al., “Automatic Generation of Number Series Reasoning Items of High Difficulty”, 2019。该文把 number series completion 视为检测数列模式的推理任务，框架包括 relation detection、periodicity discovery、pattern description、extrapolation，并指出难度特征包括 working memory demands、period length、pattern description length、relational complexity、operation category、string length、rule span、number of rules、rule complexity。
Frontiers

Rittle-Johnson / Zippert / Boice patterning assessment。该文中的 teacher-based patterning assessment 使用 AB、ABB、ABC、AABB pattern units，任务类型包括 what comes next、missing item、extending patterns、matching patterns；这可作为颜色/形状序列的正式依据。
cdn.vanderbilt.edu
+1

Liang et al. 关于 number/letter series 的 ACT-R 研究。该研究把 series completion 与规则识别、外推、策略选择联系起来，可作为序列推理的认知模型依据。
PubMed
+2
ai.rug.nl
+2

4.3 任务参数建议

数字规则：

等差：+k, -k

等比：×k, ÷k

交替子序列：奇数位 +2，偶数位 ×2

二阶差分：差值为 +1, +2, +3...

Fibonacci / 前两项和：a_n = a_{n-1} + a_{n-2}

checksum：下一项与当前项的数字和有关，MITRE/ETS 文档给出 checksum 例子。
MITRE

混合规则：先加后乘、双轨交替、数字与颜色同步变化。

颜色/形状规则：

AB：红蓝红蓝……

ABB：红蓝蓝红蓝蓝……

ABC：圆三角方……

AABB：红红蓝蓝……

双属性规则：颜色按 AB，形状按 ABC。

干扰规则：颜色规则正确但形状错误，或数字正确但颜色错。

试次形式：

next item：补下一个。

missing item：补中间缺失项。

choose rule：选择“+2”“×2”“交替”等规则。

extend pattern：拖动多个 token 补完整列。

难度控制：

序列长度：初级 4–5 项，中级 6–8 项，高级 8–10 项。

缺失位置：末尾最简单，中间缺失更难。

规则数量：单规则 < 双规则 < 三规则。

period length：AB < ABB/ABC < AABC/ABCD。

rule span：一步关系 < 跨两项关系 < checksum/Fibonacci。

working memory load：同时处理数字、颜色、形状越多越难。Sun et al. 明确把这些特征作为 number series 难度来源。
Frontiers

4.4 算法说明

数字序列生成：

rule_type = sample_by_level([
    "arithmetic",
    "geometric",
    "alternating",
    "second_order_difference",
    "fibonacci",
    "checksum",
    "compound"
])

rule_params = sample_params(rule_type, difficulty_level)
sequence = generate_sequence(rule_type, rule_params, length)

missing_index = sample(["last", "middle"], weighted_by_level)
correct_answer = sequence[missing_index]
visible_sequence = mask(sequence, missing_index)

options = generate_distractors(
    correct_answer,
    rule_type,
    common_errors=["off_by_one", "wrong_subseries", "wrong_operator"]
)

present visible_sequence and options
record response, correct, rt_ms

颜色/形状序列生成：

pattern_unit = sample(["AB", "ABB", "ABC", "AABB", "ABCD"])
attributes = sample(["color", "shape", "color+shape"])

sequence = repeat_pattern(pattern_unit, length, attributes)
missing_index = choose_missing_position(level)
correct_token = sequence[missing_index]

distractors = [
    correct_color_wrong_shape,
    wrong_color_correct_shape,
    previous_or_next_pattern_token,
    random_token
]

复合规则示例：

数字: 2, 4, 6, 8, ?
颜色: 红, 蓝, 红, 蓝, ?
形状: 圆, 圆, 方, 方, ?

correct = 数字10 + 红 + 圆

这里要特别注意：每个 trial 的 rule_params 必须落库，否则后续无法解释用户为什么错，也无法分析难度。

4.5 数据字段
trial_id
game_id
participant_id_hash
session_id
modality                       # number / color / shape / mixed
sequence
visible_sequence
missing_index
rule_type                      # arithmetic / geometric / alternating / fibonacci / checksum / AB / ABB / compound
rule_params
period_length
num_rules
rule_span
operation_category
sequence_length
correct_answer
options
response
correct
rt_ms
response_window_ms
difficulty_level
difficulty_params
error_type                     # off_by_one, wrong_operator, wrong_subseries, ignored_color, ignored_shape, timeout
score_awarded
timestamp
4.6 风险边界

可以说：“该任务用于训练/评估序列规则发现、模式补全、归纳推理和工作记忆负荷下的外推表现。”
不应说：“可测 IQ、诊断学习障碍、诊断执行功能障碍、预测学业能力。”Number Series 与 Pattern Completion 是认知测验范式，但网页游戏化版本在没有常模、信效度和测验等值化之前，只能报告任务内表现和训练过程指标。MITRE/ETS 文档中的 Number Series 是经过测试开发与校准的测验，而游戏版本不能直接等同于该测验。
MITRE

统一实现建议
A. 试次生成必须“可解释”

四个游戏都不应只做随机题。每一题都要有 condition、rule_type、difficulty_params。否则后续无法回答这些问题：

用户是速度慢，还是规则没学会？

哪类角度最难？

是 related/unrelated 混淆，还是非词误判？

是进位错误，还是乘法事实错误？

是不会等差，还是被交替子序列干扰？

B. 数据记录优先级

最低可用数据字段：

trial_id
game_id
participant_id_hash
session_id
condition
stimulus
correct_answer
response
correct
rt_ms
difficulty_level
difficulty_params
timestamp

推荐增强字段：

rule_type
angle
operation
relation_type
semantic_category
error_type
response_window_ms
timeout
stimulus_version
item_source
adaptive_state_before
adaptive_state_after
score_awarded
C. 自适应难度建议

不要用单个总分驱动所有难度。建议按能力维度分别自适应：

mental-rotation：按角度、same/different、mirror 干扰分别估计。

word-scramble：按词频、关系类型、非词/伪词、SOA 分别估计。

quick-math：按运算类型、进位/借位、problem size、verification split 分别估计。

number-sequence：按 rule_type、num_rules、period_length、missing_index 分别估计。

简单实现可以用滑动窗口：

last_n = 最近 20 个同类 trial
if accuracy >= 0.85 and median_rt <= target_rt:
    difficulty += 1
elif accuracy < 0.65:
    difficulty -= 1
else:
    difficulty unchanged
D. 产品文案边界

建议使用：

“基于 Mental Rotation / Lexical Decision / Mental Arithmetic / Number Series 等认知任务范式设计。”

“记录正确率、反应时和题目难度参数。”

“用于认知训练体验、任务表现追踪和研究型评估参考。”

避免使用：

“治疗认知障碍”

“诊断 ADHD / 读写障碍 / 数学障碍 / 阿尔茨海默病”

“提升 IQ”

“保证改善成绩/工作表现”

“预防认知衰退”

FTC 的 Lumosity 案例说明，脑训练产品若声称现实世界表现、疾病或认知衰退方面的效果，需要有充分且可靠的科学证据；FDA 的一般健康软件边界也强调，健康生活方式相关软件不能跨入疾病诊断、治疗、缓解或预防用途。
Federal Trade Commission
+1

来源

进阶专业
ChatGPT 也可能会犯错。请核查重要信息。查看 你的隐私选择。⁠