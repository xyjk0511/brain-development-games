# 01-attention-search-inhibition

Source conversation: https://chatgpt.com/c/69fdb9ff-e1dc-83ea-8e53-505431864564
Collected: 2026-05-08T10:43:13.648Z
Extraction method: main.innerText

---

任务编号：01-attention-search-inhibition

你是认知训练游戏资料研究员。请大量搜集并整理以下 4 个游戏/任务的设计依据，不要泛泛而谈，必须给可追溯来源。

项目背景：我们正在做中文网页认知训练/评估系统，已有游戏不是照抄 Lumosity，而是把成熟认知任务游戏化。需要每个游戏都有“开源代码案例或论文/文章/算法依据”。

本批游戏：
1. visual-search：视觉搜索/选择性注意，找目标，记录命中、误报、漏报、反应时。
2. reaction-time：小动物红绿灯，Go/No-Go / 反应抑制，绿灯响应、红灯抑制、黄灯等待。
3. stroop：小鱼队长方向，Flanker/Stroop 类干扰抑制，只看中心目标，忽略两侧干扰。
4. schulte-table：舒尔特表/数字顺序搜索，按顺序点击网格数字，测视觉扫描和注意。

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
1. 2-4 个开源代码/库/插件案例，优先 jsPsych、jspsych-contrib、PsyToolkit、PEBL、Human Benchmark 类开源实现。
2. 2-4 篇论文、综述、正式说明文章或经典任务来源。
3. 任务参数：刺激数、目标/干扰比例、反应窗口、难度阶梯、计分方式、自适应建议。
4. 数据字段：trial_id, condition, stimulus, correct_answer, response, correct, rt_ms, error_type 等。
5. 风险边界：哪些不能声称医疗疗效，哪些只能说训练/评估维度。

要求：
- 不要编造链接。找不到就写“未找到可靠来源”，并说明替代来源。
- 开源项目要说明 license 情况，如果页面能看到。
- 给中文结论，但保留英文任务名和论文题名。
- 尽量多搜，宁可长一点。
展开

我会按“范式—代码实现—文献依据—参数/数据—风险边界”组织报告，优先核验官方文档、GitHub 仓库、许可证信息和论文来源；无法确认的链接会明确标注。

我会额外优先查 PsyToolkit、PEBL、jsPsych、PubMed/PMC、DOI 或期刊页等一手入口，并把试次生成逻辑写成可直接进需求文档的形式。

Thought for 16m 4s
01-attention-search-inhibition 设计依据报告

本报告把 4 个游戏映射到成熟认知任务范式。结论先行：visual-search、reaction-time、stroop、schulte-table 都可以作为“注意/抑制/视觉扫描维度的训练与评估任务”，但不应宣传为医疗诊断、治疗或改善 ADHD/自闭症/脑损伤等临床状态的工具。尤其是网页端反应时会受浏览器、显示刷新率、键盘/触屏、后台任务、网络页面加载前状态影响；系统应记录设备与浏览器元数据，并把结果表述为“任务表现指标”。

总结表
我们的游戏	对应成熟任务范式	认知域	可参考开源项目/库/插件	论文/正式文章/经典任务来源	核心算法/试次生成逻辑	应记录的数据字段	当前设计应该保留/改进点
visual-search	Visual Search / Target Present-Absent Search；Feature Search / Conjunction Search	选择性注意、视觉搜索、视觉扫描、目标检测、处理速度	jsPsych visual-search-circle：官方插件，圆形阵列，目标存在/不存在，记录 correct/response/rt/set_size/target_present/locations；jsPsych 为 MIT license。
JSPsych
+1
 jsPsych-contrib visual-search-click-target：随机散点图像、点击目标或“Absent”，适合鼠标点击式视觉搜索；页面未显示 license，需单独核验。
GitHub
+1
 PsyToolkit Visual Search：含 demo、源码、数据列；PsyToolkit 允许非商业教育/研究使用并要求署名，不是通用 MIT/GPL 开源授权。
PsyToolkit
+1
 PEBL：GPL-2.0，测试电池含 Visual Search。
GitHub
	Treisman & Gelade, “A feature-integration theory of attention”, 1980；提出需要特征结合时注意会序列性地指向刺激。
ScienceDirect
 PsyToolkit 也把 Visual Search 溯源到 Treisman 1977/1980，并说明 conjunctive search 的 search slope。
PsyToolkit
 jsPsych 插件说明该实现 modelled after Wang, Cavanagh & Green, 1994。
JSPsych
	每 trial 生成 set_size 个项目；按 target_present 决定是否放入目标；其余为干扰项；随机化位置；响应为“找到/不存在”或直接点击目标；按目标存在与响应组合计算 hit、miss、false alarm、correct rejection。	trial_id, block_id, condition, target_present, set_size, target_id, distractor_ids, target_location, stimulus_locations, response, clicked_x/y, correct, rt_ms, error_type, timeout, search_slope_summary, device/browser	保留命中、误报、漏报、RT。改进：平衡 target-present/absent；记录 set size 和坐标；区分点击错误、未响应、误报；加入练习 trial、固定注视点、难度阶梯；不要只给总分。
reaction-time 小动物红绿灯	Go/No-Go；若黄灯要求“已经准备反应但突然停止”，则更接近 Stop-Signal；若黄灯只是等待，则是 warned Go / delay cue	反应抑制、冲动控制、持续注意、反应速度	PsyToolkit Go/No-Go：Go 需 2 秒内响应，No-Go 需 2 秒内不响应，并说明 Go 试次更多会提高 No-Go 抑制难度；含源码和数据列。
PsyToolkit
 vekteo/GoNoGo_jsPsych：MIT license，jsPsych 实现，基于 Bezdjian et al. 2009；160 主试次/part，80:20 Go:No-Go，500 ms 刺激，1500 ms ISI。
GitHub
 @jspsych-timelines/go-nogo：jsPsych v8 timeline，MIT license；默认 3 blocks × 50 trials，Go probability 0.75。
GitHub
+1
 STOP-IT-JS：GNU license，jsPsych Stop-Signal，Go 75%、Stop 25%，适合作为黄灯“停止信号”参考。
Kyoung Whan Choe
	Falkenstein et al., “ERP components in Go/Nogo tasks and their relation to inhibition”, 1999：Go/Nogo 中对 Go 刺激响应、对 Nogo 刺激抑制。
ScienceDirect
 Bezdjian et al., “Assessing inattention and impulsivity in children during the Go/NoGo task”, 2009。
PubMed
 Criaud & Boulinguez, “Have we been asking the right questions when assessing response inhibition in go/no-go tasks with fMRI?”, 2013。
PubMed
 Verbruggen & Logan, “Automatic and controlled response inhibition…”, 2008。
PMC
	按比例生成 Go/No-Go/Wait；推荐 Go 70–80%，No-Go 20–30%，黄灯/等待可 10–20% 或作为 cue 不计入 Go/No-Go 比例；限制连续 No-Go 过多；Go 正确=窗口内响应，No-Go 正确=窗口内不响应，黄灯正确=等待。	trial_id, signal_color, condition(go/nogo/wait/stop), stimulus, correct_answer, response, correct, rt_ms, error_type(commission/omission/premature/timeout), isi_ms, response_window_ms, go_probability, block_accuracy, browser_events	保留红绿灯隐喻。改进：游戏名不宜只叫 reaction-time，应标注 Go/No-Go；黄灯逻辑要明确是“等待 cue”还是“stop-signal”；记录红灯误按、绿灯漏按、黄灯提前按。
stroop 小鱼队长方向	主要是 Fish Flanker / Eriksen Flanker；只在“干扰抑制”层面类似 Stroop，不是经典 Color-Word Stroop	干扰抑制、选择性注意、执行控制、冲突监控、反应选择	jsPsych-contrib plugin-flanker：支持 arrows/letters/numbers/custom HTML/SVG，键盘或移动按钮，记录 congruency/rt/response/correct；页面未显示 license，需单独核验。
GitHub
+1
 janakl4us/flanker：MIT license，浏览器版 Eriksen flanker，jsPsych 实现，2 个 congruent 与 2 个 incongruent 刺激随机重复。
GitHub
 PsyToolkit Flanker arrows：含源码和数据列，建议研究项目至少 100 trials。
PsyToolkit
 JARS29/Flanker_task：MIT license，PsychoPy flanker，图像版与符号版，含说明、练习和数据存储。
GitHub
	Eriksen & Eriksen, “Effects of noise letters upon identification of a target letter in a non-search task”, 1974；PsyToolkit 列为 Flanker 来源。
PsyToolkit
 Rueda et al., “Development of attentional networks in childhood”, 2004：儿童友好版 flanker with alerting/orienting cues。
PubMed
 Fish Flanker 正式说明：中间鱼为目标，两侧鱼为干扰，Rueda et al. 2004 首次引入该鱼类范式。
Millisecond
 Stroop, “Studies of interference in serial verbal reactions”, 1935；MacLeod, “Half a century of research on the Stroop effect”, 1991；用于说明“干扰抑制”概念。
PsyToolkit
	每 trial 生成 5 个项目：2 个左 flankers + 中央 target + 2 个右 flankers；target_direction 左/右平衡；congruency 为 congruent/incongruent/neutral；响应只按中央鱼方向；忽略两侧鱼；计算 flanker effect = incongruent 正确 RT 均值 − congruent 正确 RT 均值。	trial_id, target_direction, flanker_direction, congruency, stimulus_array, soa_ms, response_mode, correct_answer, response, correct, rt_ms, error_type(wrong_direction/timeout/anticipatory), flanker_effect_ms	保留“只看中心目标、忽略两侧干扰”。改进：产品命名建议写 flanker 或 fish-flanker，不要单独叫 Stroop；增加 neutral 条件；平衡左右方向和一致/不一致比例；移动端用左右按钮并记录触屏延迟。
schulte-table	Schulte Table / Schulte-Gorbov Table；数字顺序搜索；部分变式涉及任务切换和抑制	视觉扫描、注意稳定性、搜索速度、顺序控制、任务切换	BerkYeni/schultetable：React + TypeScript，MIT license，多模式、分数追踪、响应式。
GitHub
 m3yilmazz/Schulte-Table-Game：Flutter，MIT license，结果页显示数字间寻找耗时，60 秒结束逻辑。
GitHub
 r4rdsn/PySchulte：Python/Kivy，GPL-3.0，3–9 边长、计时、每日训练限制。
GitHub
 pushnov-i/js_schulte_tables：ES6 简单生成器；页面未显示 license。
GitHub
	Khramova et al., “Monitoring the Cortical Activity of Children and Adults during Cognitive Task Completion”, 2021：Schulte table 同时涉及 visual search、working memory、mental arithmetic。
MDPI
 Korneev et al. computerized Schulte Tables：20 cells、红黑 1–10、五个子测验，计算平均搜索时间和错误数。
俄罗斯心理学
 Schulte-Gorbov 变式用于 6–9 岁儿童执行功能/激活调节研究。
NicePJ
 原始 Walter Schulte 一手来源未找到可靠网页；HandWiki 只可作二手历史说明。
HandWiki
	标准网页游戏可生成 5×5 数字 1–25 随机排列；用户按 1→25 点击；每次点击校验当前目标；记录每个数字的 inter-click interval、错误点击和总完成时间；高级版可做红黑双序列、倒序、交替序列。	trial_id, grid_size, table_seed, number_positions, current_target, clicked_value, clicked_cell, correct, click_time_ms, inter_click_interval_ms, error_type(wrong_number/repeat/out_of_grid), total_time_ms, wrong_click_count, round_index	保留顺序点击和总时长。改进：记录每个数字耗时而不是只记录总时长；保存随机种子；提供 3×3/4×4/5×5/6×6 难度；不要宣称“治疗注意力”或“提升阅读能力”。
每个游戏详细依据
1. visual-search：视觉搜索 / 选择性注意
1.1 任务定位

visual-search 对应成熟的 Visual Search 范式。典型任务是在多个干扰项中寻找目标，目标可能存在或不存在。任务表现通常用正确率、反应时、目标存在/不存在条件下的命中、漏报、误报和正确拒绝衡量。PsyToolkit 的 Visual Search 说明中明确指出，视觉搜索研究关注“如何用视觉搜索并找到物体”，并把研究传统追溯到 Treisman 的工作；当目标由多个特征组合定义时，搜索时间会随项目数量增加，即 search slope。
PsyToolkit

Treisman & Gelade 的 “A feature-integration theory of attention”（1980）是该任务的重要理论来源之一。论文摘要指出，当需要用特征组合来区分物体时，注意需要序列性地指向刺激；这正好对应我们游戏中“目标与干扰项在若干维度上相似，需要逐项搜索”的设计。
ScienceDirect

1.2 可参考开源代码 / 库 / 插件案例

jsPsych visual-search-circle。这是最直接可复用的网页实验依据。官方文档说明该插件展示一个可定制的视觉搜索任务，参与者判断目标是否存在，刺激围绕注视点等距呈圆形；参数包含 target, foil, set_size, target_present, fixation_image, trial_duration, fixation_duration, randomize_item_locations 等；生成数据包括 correct, response, rt, set_size, target_present, locations。
JSPsych
 jsPsych 本身是浏览器行为实验框架，MIT license，并有 2015 和 2023 两篇正式引用文献。
GitHub
+1

jsPsych-contrib visual-search-click-target。该插件展示随机散点图像阵列和 “Absent” 按钮，参与者点击目标图像或点击 absent，专门适合“鼠标点击式视觉搜索实验”。
GitHub
 但我没有在该插件页面或 jspsych-contrib 根页面找到明确 license 文本；jspsych-contrib 页面还说明社区插件没有官方支持、测试和维护保证，因此商用或产品集成前应逐包核验 license 与维护状态。
GitHub
+1

PsyToolkit Visual Search。该页面给出 demo、源码、zip 下载和 R 分析示例；示例中参与者寻找特定方向和颜色的 T，50 个 search displays，每屏 5、10、15、20 个项目，输出数据列包括 block、刺激显示编号、distractor present、distractor 数量、状态和 RT。
PsyToolkit
 PsyToolkit 的实验库可在浏览器中运行 50+ ready-to-use experiments，并允许复制、修改、嵌入在线数据收集项目。
PsyToolkit
 其版权条款不是宽松 OSS license：非商业教育/研究可免费使用并需署名，商业使用需许可。
PsyToolkit

PEBL。PEBL 是 GPL-2.0 的心理实验构建系统，README 说明其测试电池含 100+ 预建心理测试，包括 Attention & Executive Function 下的 Flanker、Stroop、Go/No-Go，以及 Perception 下的 Visual Search。
GitHub
 PEBL release notes 也列出 “visual search: Classic visual search paradigm; fairly flexible.”
GitHub

visual-search-demo-jspsych。这是一个使用 jsPsych visual-search-circle 插件的 demo 仓库，GitHub 页面显示 MIT license。
GitHub
 它适合作为“如何把官方插件包装成网页任务”的工程参考，不应作为任务理论来源。

1.3 论文 / 正式文章 / 经典任务来源

Treisman & Gelade, “A feature-integration theory of attention”（1980）：经典理论来源，用于解释 feature search 与 conjunction search 的难度差异。
ScienceDirect

Treisman, “Focussed attention in the perception and retrieval of multidimensional stimuli”（1977）与 Treisman & Gelade（1980）：PsyToolkit Visual Search 页面列为 further reading。
PsyToolkit

Wang, Cavanagh & Green（1994）：jsPsych visual-search-circle 明确说明该插件 modeled after Wang, Cavanagh, & Green (1994)。
JSPsych
 该插件页面没有给出论文完整题名，因此在报告或产品文档中可写为“由 jsPsych 官方插件说明列为模型来源”，不要自行补全题名。

“Set size effects in visual search are not just limited to when the target is absent”（Scientific Reports, 2023）：该研究使用经典视觉搜索数组，操纵 set size，并记录按键反应时；结果显示 set size 会调制 target-present 和 target-absent 条件下的 RT，且 set size 影响 false alarm rate。
Nature

Wagner et al., “Individual differences in visual search: A systematic literature review”（Cortex, 2024）：该综述把 visual search 定义为在 distractor stimuli 中有意扫描目标，并讨论视觉搜索指标与认知能力的对应关系。
ScienceDirect

1.4 推荐任务参数

基础版建议每轮 40–80 trials。target_present 推荐 50% 或 60%，不能全部有目标，否则无法估计误报和正确拒绝。set_size 建议从 4/8/12/16 或 5/10/15/20 起步；PsyToolkit 示例使用 5、10、15、20 个项目。
PsyToolkit

刺激可以分两级。简单 feature search：目标与干扰项只在一个维度不同，例如颜色不同。困难 conjunction search：目标由颜色+形状+方向组合定义，例如“橙色正立 T”，干扰项共享部分特征。PsyToolkit 对 conjunctive search 和 search slope 的说明可以作为该设计依据。
PsyToolkit

反应窗口建议儿童版 3000–6000 ms，成人训练版可 2000–4000 ms，也可不强制 timeout、只用 RT 作为表现指标。每个 trial 建议先显示 500–1000 ms fixation；jsPsych 插件默认 fixation duration 为 1000 ms。
JSPsych

难度阶梯可以按以下顺序递进：增加 set_size；降低目标与干扰差异；加入目标不存在试次；加入更相似的干扰项；缩短反应窗口；提高外围分布范围。自适应规则建议用滑动窗口：最近 20 trials 正确率 ≥85% 且中位 RT 低于目标阈值则升一级；正确率 <70% 或连续 3 次 miss/false alarm 则降一级。

计分建议不要只用“速度”。核心分数可以是：

score = accuracy_points - error_penalty + speed_bonus

其中 accuracy_points 只对正确 trial 给分；error_penalty 对 miss 和 false alarm 分别扣分；speed_bonus 只在正确 trial 上按 RT 分段给。分析层面更重要的是分别输出 hit rate、false alarm rate、miss rate、correct rejection rate、正确 trial RT 中位数、不同 set size 的 RT slope。

1.5 数据字段

建议每 trial 至少记录：

trial_id
participant_id
session_id
block_id
task_name = visual-search
condition = feature_search | conjunction_search
target_present
set_size
target_id
target_features
distractor_ids
distractor_features
stimulus_layout_type = circle | scatter | grid
stimulus_locations
target_location
fixation_duration_ms
trial_start_timestamp
response
response_type = click_target | click_absent | key_present | key_absent | timeout
clicked_x
clicked_y
clicked_item_id
correct_answer
correct
rt_ms
error_type = hit | miss | false_alarm | correct_rejection | wrong_item | timeout | anticipatory
difficulty_level
random_seed
browser
device_type
screen_width
screen_height
fullscreen
visibility_change_count
1.6 风险边界

可以说：该任务评估或训练选择性注意、视觉搜索效率、目标检测表现和视觉扫描速度。

不应说：该任务可以诊断 ADHD、治疗注意缺陷、改善视力、替代神经心理测评、证明长期认知迁移。若用于评估，应说明它是网页行为任务指标，不是临床诊断工具。

2. reaction-time：小动物红绿灯 / Go/No-Go / 反应抑制
2.1 任务定位

这个游戏不应只按 “reaction time” 定位。若规则是“绿灯按、红灯不按”，它的成熟范式是 Go/No-Go，主要衡量反应抑制和持续注意。PsyToolkit 的 Go/No-Go 说明指出，在某些条件下参与者必须响应，而在另一些条件下必须不响应；它还明确说 Go/No-Go 常用于测量 impulsiveness。
PsyToolkit

黄灯要单独定义。如果黄灯只是“等待，不能提前按”，它是 wait cue / delay cue，用于测 premature response。如果黄灯是在已经出现 Go 信号后突然要求停止，则更接近 Stop-Signal Task；STOP-IT-JS 的默认 stop-signal 任务是 Go 试次 75%、Stop 试次 25%，Stop 信号在可变延迟后出现，要求取消反应。
Kyoung Whan Choe
 两者不能混用，否则数据解释会不清楚。

2.2 可参考开源代码 / 库 / 插件案例

PsyToolkit Go/No-Go。页面提供 demo、源码和数据输出说明。示例要求 Go 出现时 2 秒内响应，No-Go 出现时 2 秒内不按；并说明 Go trials 比 No-Go trials 更多会增加抑制难度。输出列包括任务名、响应速度和错误状态。
PsyToolkit
 PsyToolkit 的使用许可为非商业教育/研究可用、需署名；商业使用需许可。
PsyToolkit

vekteo/GoNoGo_jsPsych。GitHub 页面显示 MIT license。该仓库用 jsPsych 实现 Go/No-Go，并说明基于 Bezdjian et al. (2009)。任务分两部分，Part 1 对 P 按空格、R 不按；Part 2 规则反转。每部分含 20 个 practice trials 和 160 个 main trials，Go:No-Go 比例为 80:20，刺激呈现 500 ms 或直到响应，ISI 为 1500 ms。
GitHub

@jspsych-timelines/go-nogo。这是 jsPsych timelines 仓库中的完整 Go/No-Go timeline，页面显示 MIT license。默认配置包括 num_blocks=3, num_trials=50, trial_timeout=500, isi_timeout=500, probability=0.75，并包含 instruction、practice、debrief。
GitHub
+1

STOP-IT-JS。适合参考“黄灯/停止信号”的高级版设计。它基于 jsPsych，使用随机化、计时、刺激呈现和响应注册，并提供 staircase tracking procedure；页面说明 GNU license。
Kyoung Whan Choe
 但它是 Stop-Signal，不是标准 Go/No-Go。若我们的黄灯只是等待，不应把 STOP-IT 的 SSRT 指标套用到本游戏。

pearsonlab/pygonogo。这是 Python/PsychoPy 版 Go/No-Go，GitHub 页面显示 MIT license，并说明数据保存为 JSON event objects。
GitHub
 它不是网页 JS 实现，但可参考事件记录结构。

2.3 论文 / 正式文章 / 经典任务来源

Falkenstein et al., “ERP components in Go/Nogo tasks and their relation to inhibition”（1999）：文章说明在 Go/Nogo 中，被试对 Go-stimuli 响应，对 Nogo-stimuli 抑制响应；这为“红灯不按”的核心逻辑提供明确依据。
ScienceDirect

Bezdjian et al., “Assessing inattention and impulsivity in children during the Go/NoGo task”（2009）：可作为儿童/青少年 Go/No-Go 任务和 inattention/impulsivity 行为指标的来源。
PubMed

Criaud & Boulinguez, “Have we been asking the right questions when assessing response inhibition in go/no-go tasks with fMRI? A meta-analysis and critical review”（2013）：可作为 Go/No-Go 反应抑制解释的综述来源。
PubMed

Verbruggen & Logan, “Automatic and controlled response inhibition: associative learning in the go/no-go and stop-signal paradigms”（2008）：用于区分 Go/No-Go 与 Stop-Signal 两类抑制范式。
PMC

2.4 推荐任务参数

基础儿童游戏版建议 60–120 trials，分 2–4 blocks，每 block 后短休息。研究/评估版可用 150–320 trials；vekteo/GoNoGo_jsPsych 每 part 160 trials，Go:No-Go=80:20。
GitHub

Go 比例建议 70–80%，No-Go 20–30%。PsyToolkit 明确说明 Go 更多会让 No-Go 抑制更困难；jsPsych timeline 默认 Go probability 为 0.75。
PsyToolkit
+1

刺激呈现与响应窗口可以分年龄设置。儿童版：刺激 500–800 ms，响应窗口 1500–2000 ms；成人版：刺激 300–500 ms，响应窗口 500–1000 ms。PsyToolkit 示例使用 2 秒窗口，GoNoGo_jsPsych 使用 500 ms 刺激和 1500 ms ISI。
PsyToolkit
+1

黄灯等待逻辑建议：黄灯出现 500–1500 ms，期间任何按键都记为 premature_response；随后转绿灯才允许响应，或转红灯要求继续抑制。若做 Stop-Signal 版，应记录 stop-signal delay，并用 staircase 调整 stop delay；不要在普通红绿灯等待任务中计算 SSRT。

试次生成建议：

1. 设定 block 级参数：go_ratio=0.75, nogo_ratio=0.25, wait_ratio 可选。
2. 生成 trial 列表，平衡绿/红/黄。
3. 限制连续 No-Go 不超过 2，连续 Go 不超过 5–7。
4. 对每个 trial 随机 ISI，例如 500–1500 ms。
5. 对 Go：窗口内按键=hit；未按=omission。
6. 对 No-Go：窗口内未按=correct_rejection；按键=commission。
7. 对 Yellow/Wait：等待期按键=premature；等待结束后按下一阶段规则计。

计分建议：Go hit 加分，No-Go correct rejection 加分；commission error 比 omission error 扣分更重；premature response 单独扣分。分析指标应输出 commission rate、omission rate、correct Go RT 中位数、RT variability、post-error slowing、黄灯提前反应率。

2.5 数据字段
trial_id
participant_id
session_id
block_id
task_name = go-nogo-traffic-light
condition = go | nogo | wait | stop_signal
signal_color = green | red | yellow
stimulus_id
animal_id
correct_answer = press | withhold | wait
response
response_key_or_button
response_timestamp
correct
rt_ms
stimulus_duration_ms
response_window_ms
isi_ms
yellow_wait_ms
stop_signal_delay_ms
go_probability
trial_sequence_index
previous_trial_condition
error_type = hit | omission | correct_rejection | commission | premature_response | timeout
difficulty_level
feedback_shown
browser_events
fullscreen
visibility_change_count
device_type
2.6 风险边界

可以说：该任务评估或训练反应抑制、冲动控制相关任务表现、持续注意和简单反应速度。

不应说：该任务能诊断 ADHD、冲动障碍、执行功能障碍；也不能说能治疗注意缺陷或减少冲动行为。对儿童使用时，尤其要避免把单次网页任务结果解释为临床结论。

3. stroop：小鱼队长方向 / Fish Flanker，而不是严格 Stroop
3.1 任务定位

当前“小鱼队长方向，只看中心目标、忽略两侧干扰”的设计，本质上是 Fish Flanker / Eriksen Flanker，不是经典 Color-Word Stroop。Flanker 的核心是：目标刺激两侧有无关刺激，干扰项可能与目标对应同一反应或相反反应；PsyToolkit 说明 flanker effect 是 incongruent 与 congruent 条件的差异。
PsyToolkit

可以在产品中写“Flanker/Stroop 类干扰抑制”，但详细报告和数据模型应把成熟范式标注为 Fish Flanker。经典 Stroop 是要求报告颜色、抑制文字语义；PsyToolkit Stroop 页面明确说明 Stroop 是颜色词的字义与墨色不一致导致命名颜色困难。
PsyToolkit

3.2 可参考开源代码 / 库 / 插件案例

jsPsych-contrib plugin-flanker。文档说明它展示可配置的 Eriksen Flanker 阵列，要求参与者响应中央目标、忽略 flankers，用于测 selective attention 与 response inhibition；支持箭头、字母、数字或自定义 HTML/SVG，支持键盘和移动端按钮，参数包括 target_direction, congruency, soa, stimulus_duration, response_timeout, num_flankers，生成数据包括 congruency, rt, response, correct。
GitHub
 该页面没有显示 license，需单独核验。
GitHub

janakl4us/flanker。浏览器版 Eriksen flanker，使用 jsPsych；GitHub 页面显示 MIT license。README 说明当前包含两个 congruent 和两个 incongruent 刺激，随机重复 25 次。
GitHub

PsyToolkit Flanker arrows。页面提供 demo、源码和 zip；数据列包括 stimulus text、congruent 标记、status 和 RT。页面还建议如果用于大学项目，至少用 100 trials，而不是 demo 的 50 trials。
PsyToolkit

JARS29/Flanker_task。PsychoPy 实现，MIT license；包含图片箭头版和符号 < > 版，二者都存储数据、包含说明和练习试次。
GitHub

PsyToolkit Stroop 与 jsPsych Stroop 教程可作为“Stroop 类干扰抑制”的概念参考。PsyToolkit Stroop 提供源码、数据列和经典文献；Matt Crump 的 jsPsych 教程展示如何从零编写 Stroop 实验，并讨论 response modality、proportion manipulation、sequence manipulation。
PsyToolkit
+1

3.3 论文 / 正式文章 / 经典任务来源

Eriksen & Eriksen, “Effects of noise letters upon identification of a target letter in a non-search task”（1974）：Flanker 经典来源。PsyToolkit Flanker 页面将其列为 further reading。
PsyToolkit

Stoffels & van der Molen, “Effects of visual and auditory noise on visual choice reaction time in a continuous-flow paradigm”（1988）：PsyToolkit 说明 arrow flanker 变式早在该研究中使用。
PsyToolkit

Rueda et al., “Development of attentional networks in childhood”（2004）：PubMed 摘要说明该研究把 ANT 改编为儿童版 flanker task with alerting and orienting cues，用于研究儿童注意网络发展。
PubMed
 Millisecond 的 Fish Flanker 正式说明也指出 Fish Flanker 是 Arrow Flanker 的儿童友好类比，要求只根据中间鱼方向按键，两侧鱼作为 congruent 或 incongruent 干扰，且 Rueda et al. 2004 首次引入鱼类范式。
Millisecond

Stroop, “Studies of interference in serial verbal reactions”（1935）与 MacLeod, “Half a century of research on the Stroop effect: An integrative review”（1991）：用于说明“自动化信息干扰目标反应”的 Stroop 理论背景。PsyToolkit Stroop 页面列出这两项来源。
PsyToolkit

Scarpina & Tagini, “The Stroop Color and Word Test”（2017）：Frontiers 综述指出 SCWT 常用于评估抑制 cognitive interference 的能力，并强调计分应同时考虑速度与准确性。
Frontiers

3.4 推荐任务参数

基础鱼 Flanker 推荐每 trial 显示 5 条鱼：左侧 2 条干扰鱼、中间 1 条目标鱼、右侧 2 条干扰鱼。目标方向左/右各 50%。congruency 推荐三类：congruent、incongruent、neutral。如果儿童版较简单，可先只用 congruent/incongruent，各 50%；正式评估版建议加入 neutral，三类平衡或 incongruent 稍低。

练习结构可参考 Fish Flanker 正式说明：先 12 个单鱼 practice，再 12 个五鱼 practice，正式测试 60 trials，每 trial 3000 ms 响应窗口。
Millisecond
 如果用于较稳定的测量，PsyToolkit Flanker 建议至少 100 trials。
PsyToolkit

响应窗口：儿童 2500–3000 ms；成人 1000–1500 ms。jsPsych-contrib flanker 默认 response_timeout=1500，并支持 soa 操纵：负 SOA 表示 flankers 先出现，通常会增强干扰；0 SOA 是标准同时呈现。
GitHub

计分和指标：正确按中心鱼方向加分；错误方向、超时、提前反应扣分。核心分析指标为：

flanker_effect_ms = median_rt_incongruent_correct - median_rt_congruent_correct
accuracy_interference = accuracy_congruent - accuracy_incongruent

若加入 neutral，还可以计算 facilitation 和 interference：

interference_ms = median_rt_incongruent - median_rt_neutral
facilitation_ms = median_rt_neutral - median_rt_congruent
3.5 数据字段
trial_id
participant_id
session_id
block_id
task_name = fish-flanker
condition = congruent | incongruent | neutral
target_direction = left | right
flanker_direction = left | right | neutral
stimulus_array
num_flankers
soa_ms
fixation_duration_ms
stimulus_duration_ms
response_timeout_ms
response_mode = keyboard | touch_button
correct_answer
response
response_timestamp
correct
rt_ms
error_type = correct | wrong_direction | timeout | anticipatory
practice_flag
feedback_shown
difficulty_level
flanker_effect_summary
browser
device_type
screen_size
3.6 风险边界

可以说：该任务评估或训练干扰抑制、选择性注意、冲突处理、执行控制相关任务表现。

不应说：该任务就是 Stroop Color-Word Test；也不应说它能诊断 ADHD、ASD、脑损伤或执行功能障碍。Millisecond 页面提到 Fish Flanker 表现可能在 ADHD/ASD 中受损，但这不等于我们的网页游戏具备诊断能力。
Millisecond

4. schulte-table：舒尔特表 / 数字顺序搜索
4.1 任务定位

schulte-table 对应 Schulte Table 或扩展的 Schulte-Gorbov Table。基础版是随机排列数字，按顺序寻找并点击；它主要反映视觉扫描、注意稳定、顺序搜索和处理速度。Khramova et al. 2021 明确把 Schulte table 描述为同时涉及 visual search、working memory 和 mental arithmetic 的复杂认知任务。
MDPI

需要注意：我没有找到 Walter Schulte 原始一手文献的可靠可访问网页来源。HandWiki 称 Schulte Table 最初由 Walter Schulte 作为研究注意属性的心理诊断测试开发，但其引用来源较弱，只建议作为二手历史说明，不宜作为严肃学术依据。
HandWiki
 设计依据应优先引用现代论文和实际计算机化版本。

4.2 可参考开源代码 / 库 / 插件案例

BerkYeni/schultetable。React + TypeScript 的 Schulte Table app，GitHub 页面显示 MIT license；功能包括 multiple game modes、score tracking、responsive design、light/dark themes。
GitHub
 适合作为中文网页系统的前端架构参考。

m3yilmazz/Schulte-Table-Game。Flutter 版，GitHub 页面显示 MIT license；结果页显示 “time spent to finding between numbers”，并有 60 秒结束逻辑。
GitHub
 适合作为“每个数字间隔耗时”展示方式参考。

r4rdsn/PySchulte。Python/Kivy 实现，GPL-3.0；功能包括训练计时、结果保存、3–9 可变边长、窗口大小调整。
GitHub
 若复用代码需遵守 GPL-3.0，不适合直接合入闭源商业产品；但可参考功能设计。

pushnov-i/js_schulte_tables。ES6 简单 Schulte table generator；页面没有显示 license。
GitHub
 可作为生成逻辑参考，但不建议直接复用代码，除非确认授权。

4.3 论文 / 正式文章 / 经典任务来源

Khramova et al., “Monitoring the Cortical Activity of Children and Adults during Cognitive Task Completion”（2021）：使用 EEG 监测儿童和成人完成 Schulte table 时的皮层活动；摘要说明 Schulte table 同时涉及 visual search、working memory 和 mental arithmetic。
MDPI
 结果部分按“找到第 i 个数字的响应时间”进行分析，这支持我们记录每个数字的点击间隔，而不是只记录总完成时间。
MDPI

Korneev et al. computerized neuropsychological tests。该研究使用计算机化 Schulte Tables：5 个子测验，每个 20 cells，红黑两组 1–10，参与者按指定顺序触屏指出数字；结果计算平均搜索时间和错误数。
俄罗斯心理学
 这给我们提供了红黑双序列、倒序和交替序列的成熟变式依据。

“Executive Functions and Regulation of Activation Functions in 6–9 Year-Old Children”（2022 页面）：Schulte-Gorbov 计算机化版本包含 20 cells、红黑 1–10、五个部分；指标为平均搜索时间和错误数。
NicePJ

HandWiki 二手说明：一般 Schulte table 是随机数字/字母网格，常见 5×5，也有不同尺寸、颜色和数值；完成速度和错误数用于衡量效率。
HandWiki
+1
 该来源只适合作为通俗定义，不作为核心证据。

4.4 推荐任务参数

基础版：5×5，数字 1–25 随机排列，按 1→25 点击。入门儿童版可从 3×3 或 4×4 开始；成人版可增加到 6×6。每轮可无时间限制，但训练游戏可设 60 秒或 120 秒上限；Flutter 参考实现使用 60 秒结束逻辑。
GitHub

正式记录应至少包含 3 轮，因为单轮受布局随机性影响较大。每轮保存 random_seed，便于复现实验。布局生成应使用 Fisher-Yates shuffle，避免重复数字；可加入“中心开始注视”提示，但不要强制用户不移动眼睛，因为网页端无眼动记录，无法验证。

难度阶梯：

Level 1: 3×3, 1–9, 顺序点击。
Level 2: 4×4, 1–16, 顺序点击。
Level 3: 5×5, 1–25, 顺序点击。
Level 4: 5×5, 倒序点击。
Level 5: 红黑双序列，黑 1–10 后红 1–10。
Level 6: 红黑交替，1黑→1红→2黑→2红。
Level 7: 加入干扰符号或缩短时间窗口。

Schulte-Gorbov 的红黑双序列、倒序和交替序列有计算机化神经心理测试依据；Korneev 页面说明这些子测验可评估简单程序、反向程序、并行程序、注意切换和抑制不适当反应。
俄罗斯心理学

计分建议：基础分按完成时间和错误数计算。每次正确点击记录 inter-click interval；错误点击不推进当前目标，并记录错误位置。可计算：

total_time_ms
mean_inter_click_interval_ms
median_inter_click_interval_ms
wrong_click_count
max_pause_ms
early_numbers_time vs late_numbers_time
search_efficiency = correct_count / total_time_sec

不要把 Schulte 分数解释为阅读速度或视野能力的直接测量，除非有单独验证。

4.5 数据字段
trial_id
participant_id
session_id
task_name = schulte-table
round_index
grid_size
mode = ascending | descending | color_sequence | alternating_color
table_seed
number_positions
color_positions
target_sequence
current_target
click_index
clicked_value
clicked_cell_row
clicked_cell_col
clicked_x
clicked_y
correct
click_timestamp_ms
inter_click_interval_ms
time_since_round_start_ms
error_type = correct | wrong_number | repeat_click | out_of_grid | premature | timeout
wrong_click_count_so_far
round_total_time_ms
round_completed
difficulty_level
device_type
screen_size
touch_or_mouse
4.6 风险边界

可以说：该任务用于训练或评估视觉扫描、顺序搜索、注意稳定性、处理速度；红黑/倒序/交替版本还涉及任务切换和抑制不适当反应。

不应说：该任务能治疗注意力问题、扩大视野、显著提升阅读速度、诊断认知障碍。若展示“注意稳定性”指标，应说明它是基于 Schulte table 表现推导的游戏化指标，不是临床量表分数。

通用实现建议

第一，所有任务都应有 practice block，并且 practice 数据与正式数据分开。Go/No-Go 和 Fish Flanker 尤其需要练习，因为错误可能来自规则不理解，而非抑制能力不足。

第二，所有 RT 指标建议报告 median，而不是只报告 mean。mean 容易受极慢 trial、误触和网络/设备卡顿影响。正确 trial 的 RT、错误 trial 的 RT、timeout 率要分开。

第三，建议所有任务统一最小字段：

participant_id
session_id
task_name
trial_id
block_id
condition
stimulus
correct_answer
response
correct
rt_ms
error_type
difficulty_level
trial_start_timestamp
trial_end_timestamp
device_type
browser
screen_size
fullscreen
visibility_change_count
random_seed

第四，网页端需记录数据质量标记：是否全屏、是否切出页面、屏幕刷新率估计、输入方式、移动端/桌面端、是否触屏。PsyToolkit FAQ 也提醒，触屏 RT 通常不如键盘精确。
PsyToolkit

第五，产品宣传建议统一使用：“基于成熟认知实验范式的游戏化训练/评估任务”，不要使用“临床诊断”“治疗”“疗效”“医学改善”等表达。对于儿童用户，结果页应给行为任务反馈，例如“本轮红灯误按较多”“不一致小鱼条件反应较慢”，而不是给人格、智力或疾病标签。

来源

进阶专业
ChatGPT 也可能会犯错。请核查重要信息。查看 你的隐私选择。⁠