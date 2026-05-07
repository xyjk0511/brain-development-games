import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import App from './App'
import { getAllGameIds } from './lib/gameRegistry'

const NON_CANONICAL_ROUTES = [
  'ball-sort',
  'pattern-matrix',
  'dual-task',
  'anagram-solver',
  'working-memory-grid'
]

describe('canonical game routes', () => {
  test('the registry exposes exactly the canonical 16 ids', () => {
    expect(getAllGameIds()).toHaveLength(16)
    for (const id of NON_CANONICAL_ROUTES) {
      expect(getAllGameIds()).not.toContain(id)
    }
  })

  test('non-canonical game urls return to the home product surface', () => {
    render(
      <MemoryRouter initialEntries={['/games/ball-sort']}>
        <App />
      </MemoryRouter>
    )

    expect(screen.getAllByRole('heading', { name: /认知训练游戏/i }).length).toBeGreaterThan(0)
    expect(screen.getByText(/16 个可爱认知训练游戏/i)).toBeInTheDocument()
    expect(screen.queryByText(/彩球分类/i)).not.toBeInTheDocument()
  })
})
