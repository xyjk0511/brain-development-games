import { act, render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import { afterEach, expect, test, vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import NBack from './NBack'

afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
})

test('renders NBack and starts sequence', () => {
  render(<NBack level={1} />)
  expect(screen.getByText(/记忆挑战/i)).toBeInTheDocument()
  const start = screen.getByText(/开始/i)
  fireEvent.click(start)
  expect(screen.getByText(/得分：/i)).toBeInTheDocument()
})

test('scores a displayed stimulus only once and stops after completion', () => {
  vi.useFakeTimers()
  vi.spyOn(Math, 'random').mockReturnValue(0)

  render(
    <MemoryRouter>
      <NBack level={1} />
    </MemoryRouter>
  )

  fireEvent.click(screen.getByText(/开始/i))
  const match = screen.getByRole('button', { name: /匹配/i })

  act(() => {
    vi.advanceTimersByTime(1300)
  })
  fireEvent.click(match)
  fireEvent.click(match)

  expect(screen.getByText(/得分：/).parentElement?.textContent).toContain('1 / 3')

  act(() => {
    vi.advanceTimersByTime(1300)
  })
  fireEvent.click(match)
  act(() => {
    vi.advanceTimersByTime(1300)
  })
  fireEvent.click(match)

  expect(screen.getByText(/等级 1 已完成/)).toBeInTheDocument()
  expect(match).toBeDisabled()
})
