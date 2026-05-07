import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import QuickMath, { generateQuickMathProblem } from './QuickMath'
import { quickMathConfigForLevel } from '../lib/gameParameters'
import { getGameProgress, resetAllProgress } from '../lib/progress'
import { GAME_INSTRUCTIONS } from '../lib/gameInstructions'

beforeEach(() => {
  resetAllProgress()
})

afterEach(() => {
  vi.useRealTimers()
  vi.restoreAllMocks()
})

describe('QuickMath', () => {
  test('renders quick math with low-pressure copy', () => {
    render(
      <MemoryRouter>
        <QuickMath level={1} />
      </MemoryRouter>
    )
    expect(screen.getByText(/果果心算铺/i)).toBeInTheDocument()
    expect(screen.getByText(/慢慢算也可以/i)).toBeInTheDocument()
    const input = screen.getByRole('textbox')
    expect(input).toBeInTheDocument()
  })

  test('uses parameterized problem generation', () => {
    const easy = quickMathConfigForLevel(1)
    const hard = quickMathConfigForLevel(10)
    expect(easy.numberRange).toBeLessThan(hard.numberRange)
    expect(generateQuickMathProblem(easy).text).toMatch(/[+]/)
  })

  test('instructions match the implemented operation set', () => {
    const text = [
      GAME_INSTRUCTIONS['quick-math'].title,
      ...GAME_INSTRUCTIONS['quick-math'].instructions
    ].join(' ')

    expect(text).toContain('果果心算铺')
    expect(text).toContain('两步计算')
    expect(text).not.toContain('除法')
    expect(text).not.toContain('尽快')
  })

  test('automatically completes as timed out when the timer reaches zero', () => {
    vi.useFakeTimers()
    render(
      <MemoryRouter>
        <QuickMath level={10} />
      </MemoryRouter>
    )

    act(() => {
      vi.advanceTimersByTime(2600)
    })

    expect(screen.getByText(/这轮心算练习完成/)).toBeInTheDocument()
    expect(getGameProgress('quick-math')?.recentRuns?.[0].timedOut).toBe(true)
  })

  test('does not treat blank input as zero but accepts an explicit zero', () => {
    const randomValues = [0.6, 0, 0]
    let randomIndex = 0
    vi.spyOn(Math, 'random').mockImplementation(() => {
      const value = randomValues[randomIndex % randomValues.length]
      randomIndex += 1
      return value
    })

    render(
      <MemoryRouter>
        <QuickMath level={3} />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByRole('button', { name: /提交/i }))
    expect(screen.getByText(/正确：/).parentElement?.textContent).toContain('0 / 4')

    fireEvent.change(screen.getByRole('textbox'), { target: { value: '0' } })
    fireEvent.click(screen.getByRole('button', { name: /提交/i }))
    expect(screen.getByText(/正确：/).parentElement?.textContent).toContain('1 / 4')
  })
})
