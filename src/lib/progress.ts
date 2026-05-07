import { evaluateAdaptiveDifficulty, type AdaptiveDecision, type AdaptiveDirection, type AdaptiveMetrics } from './adaptive'
import { addLeaderboardEntry } from './leaderboard'

export type GameProgress = {
  bestLevel: number
  completedLevels: number[]
  bestScore?: number
  recentRuns?: GameRunRecord[]
  recommendedLevel?: number
  recommendationDirection?: AdaptiveDirection
  recommendationReason?: string
}

export type ProgressState = Record<string, GameProgress>

export type GameRunInput = AdaptiveMetrics & {
  gameId: string
  score?: number
  maxScore?: number
  completedAt?: string
}

export type GameRunRecord = GameRunInput & AdaptiveDecision & {
  completedAt: string
}

type PersistedProgressState = {
  schemaVersion: 2
  games: ProgressState
}

const STORAGE_KEY = 'mind-arcade-progress'
const SCHEMA_VERSION = 2
const MAX_RECENT_RUNS = 8

const isPersistedState = (value: unknown): value is PersistedProgressState => {
  return Boolean(
    value &&
    typeof value === 'object' &&
    (value as { schemaVersion?: unknown }).schemaVersion === SCHEMA_VERSION &&
    typeof (value as { games?: unknown }).games === 'object'
  )
}

const normalizeGameProgress = (value: unknown): GameProgress => {
  const raw = value && typeof value === 'object' ? value as Partial<GameProgress> : {}
  return {
    bestLevel: Number.isFinite(raw.bestLevel) ? Number(raw.bestLevel) : 0,
    completedLevels: Array.isArray(raw.completedLevels)
      ? Array.from(new Set(raw.completedLevels.map(Number).filter(Number.isFinite))).sort((a, b) => a - b)
      : [],
    bestScore: Number.isFinite(raw.bestScore) ? Number(raw.bestScore) : undefined,
    recentRuns: Array.isArray(raw.recentRuns) ? raw.recentRuns.slice(0, MAX_RECENT_RUNS) : [],
    recommendedLevel: Number.isFinite(raw.recommendedLevel) ? Number(raw.recommendedLevel) : undefined,
    recommendationDirection: raw.recommendationDirection,
    recommendationReason: raw.recommendationReason
  }
}

const migrateState = (parsed: unknown): PersistedProgressState => {
  if (isPersistedState(parsed)) {
    const games = Object.fromEntries(
      Object.entries(parsed.games).map(([gameId, progress]) => [gameId, normalizeGameProgress(progress)])
    )
    return { schemaVersion: SCHEMA_VERSION, games }
  }

  if (parsed && typeof parsed === 'object' && !Array.isArray(parsed)) {
    const games = Object.fromEntries(
      Object.entries(parsed as Record<string, unknown>)
        .filter(([gameId]) => gameId !== 'schemaVersion' && gameId !== 'games')
        .map(([gameId, progress]) => [gameId, normalizeGameProgress(progress)])
    )
    return { schemaVersion: SCHEMA_VERSION, games }
  }

  return { schemaVersion: SCHEMA_VERSION, games: {} }
}

const loadPersistedState = (): PersistedProgressState => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { schemaVersion: SCHEMA_VERSION, games: {} }
    return migrateState(JSON.parse(raw))
  } catch {
    return { schemaVersion: SCHEMA_VERSION, games: {} }
  }
}

const savePersistedState = (state: PersistedProgressState): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    window.dispatchEvent(new Event('progress-updated'))
  } catch (e) {
    console.error('Failed to save progress state', e)
  }
}

export const getAllProgress = (): ProgressState => {
  return loadPersistedState().games
}

export const getGameProgress = (gameId: string): GameProgress | undefined => {
  return getAllProgress()[gameId]
}

export const getLatestRecommendation = (gameId: string): AdaptiveDecision | undefined => {
  const progress = getGameProgress(gameId)
  if (!progress?.recommendedLevel || !progress.recommendationDirection || !progress.recommendationReason) {
    return undefined
  }

  return {
    nextLevel: progress.recommendedLevel,
    direction: progress.recommendationDirection,
    reason: progress.recommendationReason,
    supportAdjustments: progress.recentRuns?.[0]?.supportAdjustments ?? []
  }
}

export const recordGameRun = (input: GameRunInput): AdaptiveDecision => {
  const decision = evaluateAdaptiveDifficulty(input)
  const completedAt = input.completedAt ?? new Date().toISOString()
  const run: GameRunRecord = { ...input, ...decision, completedAt }
  const state = loadPersistedState()
  const prev = state.games[input.gameId] ?? { bestLevel: 0, completedLevels: [], recentRuns: [] }
  const bestLevel = Math.max(prev.bestLevel, input.level)
  const completedLevels = Array.from(new Set([...prev.completedLevels, input.level])).sort((a, b) => a - b)
  const bestScore = input.score !== undefined ? Math.max(prev.bestScore ?? 0, input.score) : prev.bestScore
  const recentRuns = [run, ...(prev.recentRuns ?? [])].slice(0, MAX_RECENT_RUNS)

  state.games[input.gameId] = {
    bestLevel,
    completedLevels,
    bestScore,
    recentRuns,
    recommendedLevel: decision.nextLevel,
    recommendationDirection: decision.direction,
    recommendationReason: decision.reason
  }
  savePersistedState(state)

  if (input.score !== undefined) {
    try {
      addLeaderboardEntry({ gameId: input.gameId, level: input.level, score: input.score, maxScore: input.maxScore })
    } catch (e) {
      console.error('Could not add leaderboard entry', e)
    }
  }

  return decision
}

export const markGameCompletedLevel = (gameId: string, level: number, score?: number, maxScore?: number): AdaptiveDecision => {
  const normalizedScore = score === undefined ? 1 : Math.max(0, Math.min(1, score / (maxScore ?? 100)))
  return recordGameRun({
    gameId,
    level,
    accuracy: normalizedScore,
    errorCount: normalizedScore >= 0.85 ? 0 : 1,
    hintCount: 0,
    retryCount: 0,
    consecutiveSuccesses: normalizedScore >= 0.85 ? 1 : 0,
    consecutiveFailures: normalizedScore < 0.65 ? 1 : 0,
    score,
    maxScore
  })
}

export const resetAllProgress = (): void => {
  localStorage.removeItem(STORAGE_KEY)
  window.dispatchEvent(new Event('progress-updated'))
}

export const __progressStorageKey = STORAGE_KEY
