import { describe, expect, test } from 'vitest'
import { CARD_MATCHING_SYMBOLS, getCardMatchingPairCount, gridSize } from './CardMatching'

describe('CardMatching high levels', () => {
  test('has enough unique symbols for every 8x8 high-level pair', () => {
    for (const level of [6, 7, 8, 9, 10]) {
      expect(gridSize(level)).toBe(8)
      expect(getCardMatchingPairCount(level)).toBe(32)
      expect(new Set(CARD_MATCHING_SYMBOLS).size).toBeGreaterThanOrEqual(getCardMatchingPairCount(level))
    }
  })
})
