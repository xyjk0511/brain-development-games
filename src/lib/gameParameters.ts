import type { AdaptiveMetrics } from './adaptive'

export type CognitiveDomain = 'memory' | 'logic' | 'attention' | 'speed' | 'spatial'
export type TaskFamily =
  | 'visual-search'
  | 'sequence-memory'
  | 'strong-memory'
  | 'matching-memory'
  | 'go-nogo'
  | 'schulte-table'
  | 'language-meaning'
  | 'route-memory'
  | 'logic-puzzles'
  | 'planning-hanoi'
  | 'nback-working-memory'
  | 'mental-rotation'
  | 'flanker-inhibition'
  | 'trail-making'
  | 'number-sequence'
  | 'water-jugs'
  | 'quick-math'

export interface GameParameterLevel<TConfig extends Record<string, unknown>> {
  level: number
  label: string
  advanced?: boolean
  config: TConfig
}

export type LevelParameterTable<TConfig extends Record<string, unknown>> = Array<GameParameterLevel<TConfig>>

export interface CanonicalGameDesign {
  id: string
  redesignedTitle: string
  taskFamily: TaskFamily
  domain: CognitiveDomain
  beginnerFriendly: boolean
  howToPlay: string
  goal: string
  trains: string
}

export interface QuickMathConfig extends Record<string, unknown> {
  operationTypes: Array<'add' | 'subtract' | 'multiply' | 'two-step'>
  numberRange: number
  timeLimitMs: number | null
  targetCorrect: number
  optionMode: boolean
  visualSupport: boolean
}

export interface VisualSearchConfig extends Record<string, unknown> {
  itemCount: number
  targetCount: number
  distractorSimilarity: '低' | '中' | '高'
  timeLimitMs: number | null
  hintDelayMs: number
  roundsToComplete: number
}

export interface GenericGameConfig extends Record<string, unknown> {
  taskFamily: TaskFamily
  cognitiveDomain: CognitiveDomain
  primaryLoad: 'sequence-length' | 'item-count' | 'inhibition' | 'rule-steps' | 'planning-depth' | 'spatial-transform' | 'speed'
  displayItems: number
  sequenceLength: number
  workingMemoryBack: number
  distractorCount: number
  ruleSteps: number
  planningDepth: number
  timeLimitMs: number | null
  hintDelayMs: number
}

export const QUICK_MATH_LEVELS: LevelParameterTable<QuickMathConfig> = [
  { level: 1, label: '轻松加法', config: { operationTypes: ['add'], numberRange: 10, timeLimitMs: null, targetCorrect: 3, optionMode: true, visualSupport: true } },
  { level: 2, label: '小店加法', config: { operationTypes: ['add'], numberRange: 20, timeLimitMs: null, targetCorrect: 4, optionMode: true, visualSupport: true } },
  { level: 3, label: '加减练习', config: { operationTypes: ['add', 'subtract'], numberRange: 20, timeLimitMs: null, targetCorrect: 4, optionMode: true, visualSupport: true } },
  { level: 4, label: '简单乘法', config: { operationTypes: ['add', 'subtract', 'multiply'], numberRange: 10, timeLimitMs: null, targetCorrect: 5, optionMode: false, visualSupport: true } },
  { level: 5, label: '稳定心算', config: { operationTypes: ['add', 'subtract', 'multiply'], numberRange: 30, timeLimitMs: null, targetCorrect: 5, optionMode: false, visualSupport: false } },
  { level: 6, label: '速度练习', config: { operationTypes: ['add', 'subtract', 'multiply'], numberRange: 40, timeLimitMs: 6000, targetCorrect: 6, optionMode: false, visualSupport: false } },
  { level: 7, label: '进阶节奏', advanced: true, config: { operationTypes: ['add', 'subtract', 'multiply'], numberRange: 60, timeLimitMs: 5000, targetCorrect: 6, optionMode: false, visualSupport: false } },
  { level: 8, label: '两步计算', advanced: true, config: { operationTypes: ['two-step'], numberRange: 30, timeLimitMs: 5000, targetCorrect: 6, optionMode: false, visualSupport: false } },
  { level: 9, label: '限时挑战', advanced: true, config: { operationTypes: ['add', 'subtract', 'multiply', 'two-step'], numberRange: 60, timeLimitMs: 3500, targetCorrect: 7, optionMode: false, visualSupport: false } },
  { level: 10, label: '心算大师', advanced: true, config: { operationTypes: ['add', 'subtract', 'multiply', 'two-step'], numberRange: 90, timeLimitMs: 2500, targetCorrect: 8, optionMode: false, visualSupport: false } }
]

export const VISUAL_SEARCH_LEVELS: LevelParameterTable<VisualSearchConfig> = [
  { level: 1, label: '找一个朋友', config: { itemCount: 16, targetCount: 1, distractorSimilarity: '低', timeLimitMs: null, hintDelayMs: 12000, roundsToComplete: 3 } },
  { level: 2, label: '轻松扫描', config: { itemCount: 24, targetCount: 1, distractorSimilarity: '低', timeLimitMs: null, hintDelayMs: 11000, roundsToComplete: 3 } },
  { level: 3, label: '两个目标', config: { itemCount: 30, targetCount: 2, distractorSimilarity: '低', timeLimitMs: null, hintDelayMs: 10000, roundsToComplete: 4 } },
  { level: 4, label: '更多泡泡', config: { itemCount: 40, targetCount: 2, distractorSimilarity: '中', timeLimitMs: null, hintDelayMs: 9000, roundsToComplete: 4 } },
  { level: 5, label: '稳定寻找', config: { itemCount: 50, targetCount: 3, distractorSimilarity: '中', timeLimitMs: null, hintDelayMs: 8500, roundsToComplete: 5 } },
  { level: 6, label: '快速发现', config: { itemCount: 60, targetCount: 3, distractorSimilarity: '中', timeLimitMs: 30000, hintDelayMs: 8000, roundsToComplete: 5 } },
  { level: 7, label: '进阶挑战', advanced: true, config: { itemCount: 70, targetCount: 4, distractorSimilarity: '高', timeLimitMs: 30000, hintDelayMs: 7500, roundsToComplete: 5 } },
  { level: 8, label: '干扰升级', advanced: true, config: { itemCount: 80, targetCount: 4, distractorSimilarity: '高', timeLimitMs: 28000, hintDelayMs: 7000, roundsToComplete: 6 } },
  { level: 9, label: '密集海湾', advanced: true, config: { itemCount: 90, targetCount: 5, distractorSimilarity: '高', timeLimitMs: 26000, hintDelayMs: 6500, roundsToComplete: 6 } },
  { level: 10, label: '侦探大师', advanced: true, config: { itemCount: 100, targetCount: 5, distractorSimilarity: '高', timeLimitMs: 24000, hintDelayMs: 6000, roundsToComplete: 7 } }
]

export const CANONICAL_GAME_DESIGNS: CanonicalGameDesign[] = [
  { id: 'visual-search', redesignedTitle: '小鱼侦探队', taskFamily: 'visual-search', domain: 'attention', beginnerFriendly: true, howToPlay: '看清目标图案，在一群可爱图案里把它找出来。', goal: '尽量准确地找齐目标，速度可以慢慢提升。', trains: '训练视觉搜索、选择性注意和目标识别。' },
  { id: 'simon-says', redesignedTitle: '彩虹水母灯灯岛', taskFamily: 'sequence-memory', domain: 'memory', beginnerFriendly: true, howToPlay: '观察灯光顺序，再按同样顺序点回来。', goal: '稳定记住越来越长的颜色序列。', trains: '训练顺序记忆和工作记忆。' },
  { id: 'strong-memory', redesignedTitle: '强力记忆', taskFamily: 'strong-memory', domain: 'memory', beginnerFriendly: true, howToPlay: '记住翻出的绿色方块，方块翻回灰色后点回原来的位置。', goal: '连续完成每个难度的三关记忆挑战。', trains: '训练视觉记忆、位置记忆和注意保持。' },
  { id: 'card-matching', redesignedTitle: '小动物找朋友', taskFamily: 'matching-memory', domain: 'memory', beginnerFriendly: true, howToPlay: '翻开卡片，找到一样的小动物朋友。', goal: '用更少尝试找出全部配对。', trains: '训练视觉记忆和位置记忆。' },
  { id: 'reaction-time', redesignedTitle: '小动物过马路', taskFamily: 'go-nogo', domain: 'attention', beginnerFriendly: true, howToPlay: '看到可以通行的信号再点击，先别抢跑。', goal: '在安全信号出现后快速准确反应。', trains: '训练反应速度和抑制控制。' },
  { id: 'schulte-table', redesignedTitle: '星星数字广场', taskFamily: 'schulte-table', domain: 'attention', beginnerFriendly: true, howToPlay: '按顺序找到数字星星。', goal: '完整点完数字序列。', trains: '训练视觉扫描、专注和周边视觉。' },
  { id: 'word-scramble', redesignedTitle: '字字小乐园', taskFamily: 'language-meaning', domain: 'logic', beginnerFriendly: true, howToPlay: '把打乱的字重新组成熟悉词语。', goal: '慢慢拼出正确词语。', trains: '训练语义判断、语言灵活性和问题解决。' },
  { id: 'maze', redesignedTitle: '萤火虫路线', taskFamily: 'route-memory', domain: 'spatial', beginnerFriendly: true, howToPlay: '帮萤火虫沿着路线回到终点。', goal: '找到通路并减少走回头路。', trains: '训练空间规划和路线记忆。' },
  { id: 'logic-puzzles', redesignedTitle: '森林小侦探', taskFamily: 'logic-puzzles', domain: 'logic', beginnerFriendly: false, howToPlay: '读懂线索，一步一步推理答案。', goal: '完成可解释的逻辑小谜题。', trains: '训练分析推理和问题解决。' },
  { id: 'tower-of-hanoi', redesignedTitle: '甜甜圈收纳架', taskFamily: 'planning-hanoi', domain: 'logic', beginnerFriendly: false, howToPlay: '按规则移动甜甜圈，不能把大的放在小的上面。', goal: '把甜甜圈安全移到目标架。', trains: '训练计划、步骤控制和递归思维。' },
  { id: 'n-back', redesignedTitle: '记忆小侦探', taskFamily: 'nback-working-memory', domain: 'memory', beginnerFriendly: false, howToPlay: '判断当前图案是否和前面某一步一样。', goal: '在持续变化中保持最近信息。', trains: '训练工作记忆更新。' },
  { id: 'mental-rotation', redesignedTitle: '转转积木伙伴', taskFamily: 'mental-rotation', domain: 'spatial', beginnerFriendly: false, howToPlay: '看看积木转一转后是不是同一个。', goal: '准确判断旋转或镜像差异。', trains: '训练空间想象和心理旋转。' },
  { id: 'stroop', redesignedTitle: '小鱼队长看方向', taskFamily: 'flanker-inhibition', domain: 'attention', beginnerFriendly: false, howToPlay: '只看中间队长，不被旁边伙伴带跑。', goal: '在干扰中选对目标方向或颜色。', trains: '训练干扰抑制和认知控制。' },
  { id: 'trail-making', redesignedTitle: '宝藏小路', taskFamily: 'trail-making', domain: 'attention', beginnerFriendly: false, howToPlay: '按顺序连接宝藏点。', goal: '顺利连完整条路线。', trains: '训练任务切换、视觉搜索和认知灵活性。' },
  { id: 'number-sequence', redesignedTitle: '规律小火车', taskFamily: 'number-sequence', domain: 'logic', beginnerFriendly: false, howToPlay: '观察车厢编号，找出下一个规律。', goal: '选出符合规律的下一项。', trains: '训练模式识别和逻辑推理。' },
  { id: 'water-jugs', redesignedTitle: '小熊果汁铺', taskFamily: 'water-jugs', domain: 'logic', beginnerFriendly: false, howToPlay: '把果汁倒来倒去，调出刚好的杯数。', goal: '让某个杯子刚好达到目标容量。', trains: '训练分步计划和执行控制。' },
  { id: 'quick-math', redesignedTitle: '果果心算铺', taskFamily: 'quick-math', domain: 'speed', beginnerFriendly: true, howToPlay: '帮小动物算一算水果或星星数量。', goal: '准确完成几道轻松心算题。', trains: '训练数字流畅性和计算注意。' }
]

const primaryLoadByFamily: Record<TaskFamily, GenericGameConfig['primaryLoad']> = {
  'visual-search': 'item-count',
  'sequence-memory': 'sequence-length',
  'strong-memory': 'item-count',
  'matching-memory': 'item-count',
  'go-nogo': 'inhibition',
  'schulte-table': 'item-count',
  'language-meaning': 'rule-steps',
  'route-memory': 'spatial-transform',
  'logic-puzzles': 'rule-steps',
  'planning-hanoi': 'planning-depth',
  'nback-working-memory': 'sequence-length',
  'mental-rotation': 'spatial-transform',
  'flanker-inhibition': 'inhibition',
  'trail-making': 'item-count',
  'number-sequence': 'rule-steps',
  'water-jugs': 'planning-depth',
  'quick-math': 'speed'
}

const genericConfigFor = (game: CanonicalGameDesign, level: number): GenericGameConfig => {
  const advanced = level >= 7
  const base = Math.max(1, level)
  const primaryLoad = primaryLoadByFamily[game.taskFamily]
  const timed = advanced || primaryLoad === 'speed' || primaryLoad === 'inhibition'

  return {
    taskFamily: game.taskFamily,
    cognitiveDomain: game.domain,
    primaryLoad,
    displayItems: primaryLoad === 'item-count' ? 8 + base * 4 : 4 + base * 2,
    sequenceLength: primaryLoad === 'sequence-length' ? 2 + base : Math.ceil(base / 2) + 1,
    workingMemoryBack: game.taskFamily === 'nback-working-memory' ? Math.min(3, Math.max(1, Math.ceil(base / 4))) : 0,
    distractorCount: primaryLoad === 'inhibition' ? 2 + base * 2 : Math.max(1, base - 1),
    ruleSteps: primaryLoad === 'rule-steps' ? 1 + Math.ceil(base / 2) : Math.max(1, Math.ceil(base / 3)),
    planningDepth: primaryLoad === 'planning-depth' ? 2 + base : Math.max(1, Math.ceil(base / 2)),
    timeLimitMs: timed ? Math.max(12000, 52000 - base * 3500) : null,
    hintDelayMs: advanced ? 9000 : 6000
  }
}

export const GAME_LEVEL_PARAMETERS: Record<string, LevelParameterTable<GenericGameConfig>> = Object.fromEntries(
  CANONICAL_GAME_DESIGNS.map(game => [
    game.id,
    Array.from({ length: 10 }, (_, index) => {
      const level = index + 1
      return {
        level,
        label: `${game.redesignedTitle} 第 ${level} 级`,
        advanced: level >= 7,
        config: genericConfigFor(game, level)
      }
    })
  ])
)

export const getLevelEntry = <TConfig extends Record<string, unknown>>(
  table: LevelParameterTable<TConfig>,
  level: number
): GameParameterLevel<TConfig> => {
  const clamped = Math.min(10, Math.max(1, Math.round(Number.isFinite(level) ? level : 1)))
  return table.find(entry => entry.level === clamped) ?? table[0]
}

export const quickMathConfigForLevel = (level: number): QuickMathConfig => getLevelEntry(QUICK_MATH_LEVELS, level).config
export const visualSearchConfigForLevel = (level: number): VisualSearchConfig => getLevelEntry(VISUAL_SEARCH_LEVELS, level).config

export const buildDefaultMetrics = (
  gameId: string,
  level: number,
  accuracy: number,
  overrides: Partial<AdaptiveMetrics> = {}
): AdaptiveMetrics & { gameId: string } => ({
  gameId,
  level,
  accuracy,
  errorCount: accuracy >= 0.85 ? 0 : 1,
  hintCount: 0,
  retryCount: 0,
  consecutiveSuccesses: accuracy >= 0.85 ? 1 : 0,
  consecutiveFailures: accuracy < 0.65 ? 1 : 0,
  ...overrides
})
