import { describe, expect, test, beforeEach } from 'vitest'
import {
  __progressStorageKey,
  getAllProgress,
  getGameProgress,
  getLatestRecommendation,
  markGameCompletedLevel,
  recordGameRun,
  resetAllProgress
} from './progress'

beforeEach(() => {
  resetAllProgress()
})

test('marking and reading progress', () => {
  expect(getAllProgress()).toEqual({})
  markGameCompletedLevel('water-jugs', 2)
  const p = getGameProgress('water-jugs')
  expect(p).toBeDefined()
  expect(p?.bestLevel).toBe(2)

  markGameCompletedLevel('water-jugs', 4)
  expect(getGameProgress('water-jugs')?.bestLevel).toBe(4)
})

test('resetAllProgress clears data', () => {
  markGameCompletedLevel('water-jugs', 3)
  expect(getAllProgress()['water-jugs']).toBeDefined()
  resetAllProgress()
  expect(getAllProgress()['water-jugs']).toBeUndefined()
})

describe('versioned adaptive progress', () => {
  test('migrates old progress shape', () => {
    localStorage.setItem(__progressStorageKey, JSON.stringify({
      'quick-math': { bestLevel: 3, completedLevels: [1, 3], bestScore: 80 }
    }))

    const progress = getGameProgress('quick-math')
    expect(progress?.bestLevel).toBe(3)
    expect(progress?.completedLevels).toEqual([1, 3])
    expect(progress?.bestScore).toBe(80)
    expect(progress?.recentRuns).toEqual([])
  })

  test('handles malformed storage as empty progress', () => {
    localStorage.setItem(__progressStorageKey, '{bad json')
    expect(getAllProgress()).toEqual({})
  })

  test('records run metrics and latest recommendation', () => {
    const decision = recordGameRun({
      gameId: 'quick-math',
      level: 4,
      accuracy: 0.9,
      avgReactionMs: 1200,
      completionMs: 8000,
      errorCount: 0,
      hintCount: 0,
      retryCount: 0,
      consecutiveSuccesses: 2,
      consecutiveFailures: 0,
      score: 90,
      maxScore: 100,
      completedAt: '2026-05-07T00:00:00.000Z'
    })

    const progress = getGameProgress('quick-math')
    expect(decision.nextLevel).toBe(5)
    expect(progress?.recentRuns?.[0].accuracy).toBe(0.9)
    expect(progress?.recommendedLevel).toBe(5)
    expect(getLatestRecommendation('quick-math')?.direction).toBe('升高')
  })
})
