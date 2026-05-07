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

  test('canonical game urls load the playable prototype frame', () => {
    render(
      <MemoryRouter initialEntries={['/games/card-matching']}>
        <App />
      </MemoryRouter>
    )

    const frame = screen.getByTitle(/小动物找朋友 可玩游戏/i)
    expect(frame).toHaveAttribute('src', '/playable-games/card-matching/index.html')
    expect(screen.queryByRole('link', { name: /返回首页/i })).not.toBeInTheDocument()
  })
})
