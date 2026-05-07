import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes, useLocation } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import NextLevelButton from './NextLevelButton'

const LocationProbe = (): JSX.Element => {
  const location = useLocation()
  return <div data-testid="location">{location.search}</div>
}

describe('NextLevelButton', () => {
  test('shows adaptive recommendation and navigates to recommended level', () => {
    render(
      <MemoryRouter initialEntries={['/games/quick-math?level=4']}>
        <Routes>
          <Route path="/games/quick-math" element={(
            <>
              <NextLevelButton
                currentLevel={4}
                recommendation={{
                  nextLevel: 4,
                  direction: '保持',
                  reason: '这个等级正适合练习。',
                  supportAdjustments: ['保持节奏']
                }}
              />
              <LocationProbe />
            </>
          )} />
        </Routes>
      </MemoryRouter>
    )

    expect(screen.getByText(/推荐下一局：第 4 级/)).toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: /按推荐继续/i }))
    expect(screen.getByTestId('location').textContent).toContain('level=4')
    expect(screen.getByTestId('location').textContent).toContain('adaptive=1')
  })

  test('keeps fallback next-level behavior without recommendation', () => {
    render(
      <MemoryRouter initialEntries={['/games/quick-math?level=2']}>
        <Routes>
          <Route path="/games/quick-math" element={(
            <>
              <NextLevelButton currentLevel={2} />
              <LocationProbe />
            </>
          )} />
        </Routes>
      </MemoryRouter>
    )

    fireEvent.click(screen.getByRole('button', { name: /下一等级/i }))
    expect(screen.getByTestId('location').textContent).toContain('level=3')
  })

  test('handles max-level boundary', () => {
    render(
      <MemoryRouter>
        <NextLevelButton currentLevel={10} />
      </MemoryRouter>
    )

    expect(screen.getByText(/所有等级已完成/)).toBeInTheDocument()
  })
})
