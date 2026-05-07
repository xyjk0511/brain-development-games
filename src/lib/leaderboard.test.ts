import { beforeEach, describe, expect, test } from 'vitest'
import { addLeaderboardEntry, getLeaderboard, resetLeaderboard } from './leaderboard'

beforeEach(() => {
  resetLeaderboard()
})

describe('leaderboard score contract', () => {
  test('clamps direct saves into the 0-100 range', () => {
    addLeaderboardEntry({ gameId: 'reaction-time', level: 1, score: 450, maxScore: 100 })
    addLeaderboardEntry({ gameId: 'schulte-table', level: 1, score: -20, maxScore: 100 })

    const scores = getLeaderboard(10).map(entry => entry.score)

    expect(scores).toContain(100)
    expect(scores).toContain(0)
  })
})
