import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, expect, test, vi } from 'vitest'
import NumberSequence from './NumberSequence'
import { resetAllProgress } from '../lib/progress'

beforeEach(() => {
  resetAllProgress()
  vi.useFakeTimers()
  vi.spyOn(Math, 'random').mockReturnValue(0)
})

afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
})

const submitAnswer = (answer: string): void => {
  fireEvent.change(screen.getByRole('spinbutton'), { target: { value: answer } })
  fireEvent.click(screen.getByRole('button', { name: /提交/i }))
}

test('does not award the same sequence more than once during feedback', () => {
  render(<NumberSequence level={1} />)

  submitAnswer('5')
  fireEvent.click(screen.getByRole('button', { name: /提交/i }))

  expect(screen.getByText(/得分：/).parentElement?.textContent).toContain('1/3')
  expect(screen.getByRole('spinbutton')).toBeDisabled()

  act(() => {
    vi.advanceTimersByTime(1500)
  })

  expect(screen.getByText(/得分：/).parentElement?.textContent).toContain('1/3')
})

test('completion is not replaced by a delayed next question', () => {
  render(
    <MemoryRouter>
      <NumberSequence level={1} />
    </MemoryRouter>
  )

  for (let i = 0; i < 3; i++) {
    submitAnswer('5')
    act(() => {
      vi.advanceTimersByTime(1500)
    })
  }

  expect(screen.getByText(/等级 1 已完成/)).toBeInTheDocument()

  act(() => {
    vi.runOnlyPendingTimers()
  })

  expect(screen.getByText(/等级 1 已完成/)).toBeInTheDocument()
})
