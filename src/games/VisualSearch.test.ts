import { describe, expect, test } from 'vitest'
import { generateVisualSearchItems } from './VisualSearch'
import { visualSearchConfigForLevel } from '../lib/gameParameters'

describe('VisualSearch', () => {
  test('generates configured item and target counts', () => {
    const config = visualSearchConfigForLevel(3)
    const data = generateVisualSearchItems(config)
    expect(data.items).toHaveLength(config.itemCount)
    expect(data.items.filter(item => item.isTarget)).toHaveLength(config.targetCount)
  })

  test('high level has more items than beginner level', () => {
    expect(visualSearchConfigForLevel(1).itemCount).toBeLessThan(visualSearchConfigForLevel(10).itemCount)
  })
})
