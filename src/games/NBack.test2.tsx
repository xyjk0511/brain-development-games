import { render, screen, fireEvent, act } from '@testing-library/react'
import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import NBack from './NBack'
import { resetAllProgress, getGameProgress } from '../lib/progress'
import { afterEach, vi } from 'vitest'

beforeEach(() => resetAllProgress())
afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
})

test('reaching target score saves progress', () => {
  vi.useFakeTimers()
  vi.spyOn(Math, 'random').mockReturnValue(0)
  render(
    <MemoryRouter>
      <NBack level={1} />
    </MemoryRouter>
  )
  const start = screen.getByText(/开始/i)
  fireEvent.click(start)
  const match = screen.getByRole('button', { name: /匹配/i })
  for (let i = 0; i < 3; i++) {
    act(() => {
      vi.advanceTimersByTime(1300)
    })
    fireEvent.click(match)
  }
  const p = getGameProgress('n-back')
  expect(p).toBeDefined()
})
