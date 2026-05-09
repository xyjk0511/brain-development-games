import { describe, expect, test } from 'vitest'
import {
  CANONICAL_GAME_DESIGNS,
  GAME_LEVEL_PARAMETERS,
  QUICK_MATH_LEVELS,
  VISUAL_SEARCH_LEVELS,
  quickMathConfigForLevel,
  visualSearchConfigForLevel
} from './gameParameters'

describe('game parameter tables', () => {
  test('defines the canonical twenty-three-game set', () => {
    expect(CANONICAL_GAME_DESIGNS).toHaveLength(23)
    expect(CANONICAL_GAME_DESIGNS.map(game => game.id)).toEqual([
      'visual-search',
      'simon-says',
      'strong-memory',
      'card-matching',
      'reaction-time',
      'schulte-table',
      'word-scramble',
      'maze',
      'logic-puzzles',
      'tower-of-hanoi',
      'n-back',
      'mental-rotation',
      'stroop',
      'trail-making',
      'number-sequence',
      'water-jugs',
      'quick-math',
      'global-local',
      'visual-discrimination',
      'category-fluency',
      'emotion-match',
      'gaze-follow',
      'social-scenario'
    ])
    expect(CANONICAL_GAME_DESIGNS.every(game => game.howToPlay && game.goal && game.trains)).toBe(true)
  })

  test('covers each requested product domain with at least three games', () => {
    const counts = CANONICAL_GAME_DESIGNS.reduce<Record<string, number>>((acc, game) => {
      acc[game.domain] = (acc[game.domain] ?? 0) + 1
      return acc
    }, {})

    expect(counts.perception).toBeGreaterThanOrEqual(3)
    expect(counts.language).toBeGreaterThanOrEqual(3)
    expect(counts['social-cognition']).toBeGreaterThanOrEqual(3)
  })

  test('defines ten adaptive parameter levels for every canonical game', () => {
    for (const game of CANONICAL_GAME_DESIGNS) {
      const table = GAME_LEVEL_PARAMETERS[game.id]
      expect(table).toHaveLength(10)
      expect(table[0].config.cognitiveDomain).toBe(game.domain)
      expect(table[9].advanced).toBe(true)
      expect(table[9].config.displayItems).toBeGreaterThanOrEqual(table[0].config.displayItems)
      expect(table[9].config.planningDepth).toBeGreaterThanOrEqual(table[0].config.planningDepth)
    }
  })

  test('quick math parameters increase demand', () => {
    expect(QUICK_MATH_LEVELS).toHaveLength(10)
    expect(quickMathConfigForLevel(1).numberRange).toBeLessThan(quickMathConfigForLevel(10).numberRange)
    expect(quickMathConfigForLevel(1).timeLimitMs).toBeNull()
    expect(quickMathConfigForLevel(10).timeLimitMs).toBe(2500)
  })

  test('visual search parameters increase demand', () => {
    expect(VISUAL_SEARCH_LEVELS).toHaveLength(10)
    expect(visualSearchConfigForLevel(1).itemCount).toBeLessThan(visualSearchConfigForLevel(10).itemCount)
    expect(visualSearchConfigForLevel(10).distractorSimilarity).toBe('高')
  })
})
