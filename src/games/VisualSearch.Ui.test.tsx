import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import VisualSearch from './VisualSearch'
import { getGameProgress, resetAllProgress } from '../lib/progress'

beforeEach(() => {
  resetAllProgress()
  vi.useFakeTimers()
  vi.setSystemTime(0)
})

afterEach(() => {
  vi.useRealTimers()
})

test('single-target round time starts when the round is shown', () => {
  render(
    <MemoryRouter>
      <VisualSearch level={1} />
    </MemoryRouter>
  )

  act(() => {
    vi.advanceTimersByTime(500)
  })
  fireEvent.click(screen.getAllByLabelText('目标图形')[0])

  expect(screen.getByText(/时间： 0\.50s/)).toBeInTheDocument()
})

test('clicks during the next-round delay do not pollute error metrics', () => {
  render(
    <MemoryRouter>
      <VisualSearch level={1} />
    </MemoryRouter>
  )

  for (let i = 0; i < 3; i++) {
    act(() => {
      vi.advanceTimersByTime(100)
    })
    fireEvent.click(screen.getAllByLabelText('目标图形')[0])
    const distractor = screen.queryAllByLabelText('干扰图形')[0]
    if (distractor) fireEvent.click(distractor)
    act(() => {
      vi.advanceTimersByTime(1000)
    })
  }

  expect(screen.getByText(/观察练习完成/)).toBeInTheDocument()
  expect(getGameProgress('visual-search')?.recentRuns?.[0].errorCount).toBe(0)
})
