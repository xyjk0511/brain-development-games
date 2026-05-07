import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { describe, expect, test } from 'vitest'
import QuickMath, { generateQuickMathProblem } from './QuickMath'
import { quickMathConfigForLevel } from '../lib/gameParameters'

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
})
