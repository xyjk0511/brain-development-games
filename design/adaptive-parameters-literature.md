# 自适应参数与论文依据初稿

## 当前实现结论

- 主 React app 目前不是统一自适应系统；核心是 URL `?level=` 手动选择等级。
- `src/components/LevelSelector.tsx` 固定显示 1-10 级。
- `src/components/NextLevelButton.tsx` 完成后只跳 `currentLevel + 1`，不根据表现计算推荐等级。
- `src/lib/progress.ts` 只保存 `bestLevel`、`completedLevels`、`bestScore`，没有保存反应时、正确率、错误数、提示数、连续成功/失败等自适应输入。
- 每个游戏内部有硬编码的 level 参数，例如：
  - WaterJugs: capacities、target、timerSeconds、optimalMoves
  - VisualSearch: totalItems、targetCount、target、time-derived score
  - NBack: n、stimulus interval、target score
  - SchulteTable: grid size、completion time score
  - ReactionTime: attempt target、avgThreshold
  - QuickMath: operation type、timer、target
- `design/chatgpt-generated-artifacts` 的 16 个试玩稿里有更接近自适应的逻辑，如 accuracy、completion、avgFind、hintsShown、timedOut 决定 nextLevel；但这是 standalone HTML prototype，不是主 app 的统一参数层。

## 建议落地框架

### 输入指标

- accuracy / correctRate：正确率
- avgReactionMs：平均反应时
- completionMs：完成时间
- errorCount：错误数
- hintCount：提示数
- retryCount：重试/重置次数
- consecutiveSuccesses：连续成功
- consecutiveFailures：连续失败
- timeout：是否超时
- frustrationProxy：卡住、频繁重置、长停顿等低压保护指标

### 输出指标

- nextLevel：下一等级，限制每次最多升/降 1 级
- direction：升高 / 保持 / 降低
- reason：给用户看的中文解释
- config：当前游戏的参数对象

### 推荐默认规则

- 目标训练正确率：约 80%-90%，中心值 85%。
- 升级：accuracy >= 0.85，hintCount <= 1，errorCount 低，且完成时间不慢。
- 保持：accuracy 0.65-0.85 或表现波动。
- 降低：accuracy < 0.65，连续失败 >= 2，提示/重试过多，或超时。
- 低压保护：1-3 级不降级，只减少压力：加提示、延长时间、减少干扰。
- 高级保护：8-10 级失败时先降低干扰/时间压力，不直接评价“能力差”。

## 20 篇论文/研究依据

1. Wilson et al. (2019), The Eighty Five Percent Rule for optimal learning. Nature Communications. https://doi.org/10.1038/s41467-019-12552-4
2. Levitt (1971), Transformed Up-Down Methods in Psychoacoustics. JASA. https://doi.org/10.1121/1.1912375
3. Watson & Pelli (1983), QUEST: A Bayesian adaptive psychometric method. Perception & Psychophysics. https://doi.org/10.3758/BF03202828
4. Kaernbach (1991), Simple adaptive testing with the weighted up-down method. Perception & Psychophysics. https://doi.org/10.3758/BF03214307
5. Kontsevich & Tyler (1999), Bayesian adaptive estimation of psychometric slope and threshold. Vision Research. https://doi.org/10.1016/S0042-6989(98)00285-5
6. Hunicke (2005), The Case for Dynamic Difficulty Adjustment in Games. https://www.researchgate.net/publication/220982524_The_case_for_dynamic_difficulty_adjustment_in_games
7. Yannakakis & Hallam (2009), Real-time game adaptation for optimizing player satisfaction. IEEE TCIAIG. https://doi.org/10.1109/TCIAIG.2009.2035923
8. Wilson et al. / empirical adaptive difficulty schedules, Adapting training in real time. https://pubmed.ncbi.nlm.nih.gov/38536336/
9. Daniel & Ranganath (2019), Adaptive task difficulty influences neural plasticity and transfer of training. NeuroImage. https://doi.org/10.1016/j.neuroimage.2018.12.003
10. Anguera et al. (2013), Video game training enhances cognitive control in older adults. Nature. https://doi.org/10.1038/nature12486
11. Klingberg et al. (2005), Computerized training of working memory in children with ADHD. JAACAP. https://pubmed.ncbi.nlm.nih.gov/15689731/
12. Klingberg et al. (2002), Training of working memory in children with ADHD. J Clin Exp Neuropsychol. https://pubmed.ncbi.nlm.nih.gov/12424652/
13. Jaeggi et al. (2008), Improving fluid intelligence with training on working memory. PNAS. https://doi.org/10.1073/pnas.0801268105
14. Brehmer et al. (2012), Working-memory training in younger and older adults. Frontiers in Human Neuroscience. https://doi.org/10.3389/fnhum.2012.00063
15. Melby-Lervåg et al. (2016), Working memory training does not improve far transfer: meta-analysis. Perspectives on Psychological Science. https://doi.org/10.1177/1745691616635612
16. Green & Bavelier (2003), Action video game modifies visual selective attention. Nature. https://doi.org/10.1038/nature01647
17. Stroop (1935), Studies of interference in serial verbal reactions. Journal of Experimental Psychology. https://doi.org/10.1037/h0054651
18. Eriksen & Eriksen (1974), Effects of noise letters upon identification of a target letter. Perception & Psychophysics. https://doi.org/10.3758/BF03203267
19. Gershon et al. / pCAT-COG line, Adaptive measurement of cognitive function based on MIRT. https://pmc.ncbi.nlm.nih.gov/articles/PMC11694520/
20. Zelazo et al. / NIH Toolbox executive function validation. https://pmc.ncbi.nlm.nih.gov/articles/PMC4601803/

## 设计边界

这些论文可以支持“个性化调难、保持挑战-能力匹配、用反应时和正确率估计任务难度”的方向；但不能支持夸大成“玩这些游戏一定提升智力/治疗疾病”。产品文案应写“训练/练习/挑战相关能力”，不要写“治疗/显著提升 IQ”。
