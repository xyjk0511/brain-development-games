import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { afterEach, expect, test, vi } from 'vitest'
import MentalRotation, { generatePair } from './MentalRotation'

afterEach(() => {
  vi.restoreAllMocks()
})

test('beginner different pair is visibly different', () => {
  vi.spyOn(Math, 'random')
    .mockReturnValueOnce(0)
    .mockReturnValueOnce(0)

  const pair = generatePair(1)

  expect(pair.same).toBe(false)
  expect(pair.left).not.toBe(pair.right)
})

test('beginner same pair is visibly the same', () => {
  vi.spyOn(Math, 'random')
    .mockReturnValueOnce(0)
    .mockReturnValueOnce(0.9)

  const pair = generatePair(1)

  expect(pair.same).toBe(true)
  expect(pair.left).toBe(pair.right)
})

test('renders mental rotation and answers', () => {
  render(<MentalRotation level={1} />)
  expect(screen.getByText(/图形匹配/i)).toBeInTheDocument()
  const sameBtn = screen.getByRole('button', { name: /相同/i })
  fireEvent.click(sameBtn)
  const attemptsLabel = screen.getByText(/尝试：/i)
  expect(attemptsLabel.parentElement?.textContent).toContain('1')
})
