import { describe, expect, test } from 'vitest'
import { clampLevel, evaluateAdaptiveDifficulty } from './adaptive'

describe('adaptive difficulty', () => {
  test('raises one level for comfortable performance', () => {
    const decision = evaluateAdaptiveDifficulty({
      level: 4,
      accuracy: 0.92,
      errorCount: 0,
      hintCount: 0,
      retryCount: 0,
      consecutiveSuccesses: 2,
      consecutiveFailures: 0
    })

    expect(decision.direction).toBe('升高')
    expect(decision.nextLevel).toBe(5)
    expect(decision.reason).toContain('稳定')
  })

  test('holds level in the learning band', () => {
    const decision = evaluateAdaptiveDifficulty({
      level: 5,
      accuracy: 0.76,
      errorCount: 2,
      hintCount: 1,
      retryCount: 0,
      consecutiveSuccesses: 0,
      consecutiveFailures: 0
    })

    expect(decision.direction).toBe('保持')
    expect(decision.nextLevel).toBe(5)
  })

  test('lowers one level for struggling performance outside beginner range', () => {
    const decision = evaluateAdaptiveDifficulty({
      level: 6,
      accuracy: 0.4,
      errorCount: 5,
      hintCount: 3,
      retryCount: 1,
      consecutiveSuccesses: 0,
      consecutiveFailures: 2
    })

    expect(decision.direction).toBe('降低')
    expect(decision.nextLevel).toBe(5)
    expect(decision.reason).toContain('放轻松')
  })

  test('uses support adjustments instead of visible lowering for beginner levels', () => {
    const decision = evaluateAdaptiveDifficulty({
      level: 2,
      accuracy: 0.3,
      errorCount: 6,
      hintCount: 3,
      retryCount: 1,
      consecutiveSuccesses: 0,
      consecutiveFailures: 3,
      timedOut: true
    })

    expect(decision.direction).toBe('保持')
    expect(decision.nextLevel).toBe(2)
    expect(decision.supportAdjustments).toContain('增加提示')
  })

  test('clamps invalid levels', () => {
    expect(clampLevel(99)).toBe(10)
    expect(clampLevel(-2)).toBe(1)
    expect(clampLevel(Number.NaN)).toBe(1)
  })

  test('respects custom thresholds', () => {
    const decision = evaluateAdaptiveDifficulty({
      level: 3,
      accuracy: 0.78,
      errorCount: 0,
      hintCount: 0,
      retryCount: 0,
      consecutiveSuccesses: 1,
      consecutiveFailures: 0
    }, { raiseAccuracy: 0.75 })

    expect(decision.direction).toBe('升高')
    expect(decision.nextLevel).toBe(4)
  })
})
