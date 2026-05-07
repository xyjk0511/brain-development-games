export type AdaptiveDirection = '升高' | '保持' | '降低'

export type SupportAdjustment =
  | '增加提示'
  | '延长时间'
  | '减少干扰'
  | '缩短回合'
  | '保持节奏'

export interface AdaptiveMetrics {
  level: number
  accuracy: number
  avgReactionMs?: number
  completionMs?: number
  errorCount: number
  hintCount: number
  retryCount: number
  consecutiveSuccesses: number
  consecutiveFailures: number
  timedOut?: boolean
}

export interface AdaptiveThresholds {
  minLevel: number
  maxLevel: number
  raiseAccuracy: number
  lowerAccuracy: number
  maxHintsForRaise: number
  maxErrorsForRaise: number
  maxRetriesForRaise: number
  failureStreakForLower: number
  beginnerMaxLevel: number
}

export interface AdaptiveDecision {
  nextLevel: number
  direction: AdaptiveDirection
  reason: string
  supportAdjustments: SupportAdjustment[]
}

export const DEFAULT_ADAPTIVE_THRESHOLDS: AdaptiveThresholds = {
  minLevel: 1,
  maxLevel: 10,
  raiseAccuracy: 0.85,
  lowerAccuracy: 0.65,
  maxHintsForRaise: 1,
  maxErrorsForRaise: 1,
  maxRetriesForRaise: 0,
  failureStreakForLower: 2,
  beginnerMaxLevel: 3
}

export const clampLevel = (
  level: number,
  thresholds: Pick<AdaptiveThresholds, 'minLevel' | 'maxLevel'> = DEFAULT_ADAPTIVE_THRESHOLDS
): number => {
  if (!Number.isFinite(level)) return thresholds.minLevel
  return Math.min(thresholds.maxLevel, Math.max(thresholds.minLevel, Math.round(level)))
}

export const normalizeAccuracy = (accuracy: number): number => {
  if (!Number.isFinite(accuracy)) return 0
  return Math.min(1, Math.max(0, accuracy))
}

export const mergeThresholds = (overrides: Partial<AdaptiveThresholds> = {}): AdaptiveThresholds => ({
  ...DEFAULT_ADAPTIVE_THRESHOLDS,
  ...overrides
})

const isComfortable = (metrics: AdaptiveMetrics, thresholds: AdaptiveThresholds): boolean => {
  return (
    normalizeAccuracy(metrics.accuracy) >= thresholds.raiseAccuracy &&
    metrics.errorCount <= thresholds.maxErrorsForRaise &&
    metrics.hintCount <= thresholds.maxHintsForRaise &&
    metrics.retryCount <= thresholds.maxRetriesForRaise &&
    !metrics.timedOut
  )
}

const isStruggling = (metrics: AdaptiveMetrics, thresholds: AdaptiveThresholds): boolean => {
  return (
    normalizeAccuracy(metrics.accuracy) < thresholds.lowerAccuracy ||
    metrics.consecutiveFailures >= thresholds.failureStreakForLower ||
    metrics.timedOut === true ||
    metrics.hintCount >= 3 ||
    metrics.retryCount >= 2
  )
}

const beginnerSupport = (metrics: AdaptiveMetrics): SupportAdjustment[] => {
  const support: SupportAdjustment[] = []
  if (metrics.timedOut || metrics.completionMs !== undefined) support.push('延长时间')
  if (metrics.errorCount > 0 || metrics.accuracy < 0.65) support.push('增加提示')
  if (metrics.hintCount >= 2 || metrics.retryCount >= 1) support.push('缩短回合')
  if (support.length === 0) support.push('保持节奏')
  return Array.from(new Set(support))
}

const supportiveReason = (direction: AdaptiveDirection, nextLevel: number, support: SupportAdjustment[]): string => {
  if (direction === '升高') {
    return `这轮很稳定，下一局可以轻轻试试第 ${nextLevel} 级。`
  }
  if (direction === '降低') {
    return `下一局放轻松一点，系统会帮你调到第 ${nextLevel} 级，先把节奏找回来。`
  }
  if (support.length > 0 && support.some(item => item !== '保持节奏')) {
    return `下一局先保持当前等级，并加入${support.join('、')}，慢慢来就好。`
  }
  return `这个等级正适合练习，下一局继续保持当前节奏。`
}

export const evaluateAdaptiveDifficulty = (
  rawMetrics: AdaptiveMetrics,
  thresholdOverrides: Partial<AdaptiveThresholds> = {}
): AdaptiveDecision => {
  const thresholds = mergeThresholds(thresholdOverrides)
  const level = clampLevel(rawMetrics.level, thresholds)
  const metrics: AdaptiveMetrics = {
    ...rawMetrics,
    level,
    accuracy: normalizeAccuracy(rawMetrics.accuracy)
  }

  if (isComfortable(metrics, thresholds)) {
    const nextLevel = clampLevel(level + 1, thresholds)
    const direction: AdaptiveDirection = nextLevel > level ? '升高' : '保持'
    return {
      nextLevel,
      direction,
      reason: supportiveReason(direction, nextLevel, []),
      supportAdjustments: direction === '保持' ? ['保持节奏'] : []
    }
  }

  if (isStruggling(metrics, thresholds)) {
    if (level <= thresholds.beginnerMaxLevel) {
      const support = beginnerSupport(metrics)
      return {
        nextLevel: level,
        direction: '保持',
        reason: supportiveReason('保持', level, support),
        supportAdjustments: support
      }
    }

    const nextLevel = clampLevel(level - 1, thresholds)
    return {
      nextLevel,
      direction: nextLevel < level ? '降低' : '保持',
      reason: supportiveReason(nextLevel < level ? '降低' : '保持', nextLevel, ['增加提示', '延长时间']),
      supportAdjustments: ['增加提示', '延长时间']
    }
  }

  return {
    nextLevel: level,
    direction: '保持',
    reason: supportiveReason('保持', level, ['保持节奏']),
    supportAdjustments: ['保持节奏']
  }
}
