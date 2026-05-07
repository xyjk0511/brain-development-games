import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import MentalRotation from './MentalRotation'

test('renders mental rotation and answers', () => {
  render(<MentalRotation level={1} />)
  expect(screen.getByText(/图形匹配/i)).toBeInTheDocument()
  const sameBtn = screen.getByRole('button', { name: /相同/i })
  fireEvent.click(sameBtn)
  const attemptsLabel = screen.getByText(/尝试：/i)
  expect(attemptsLabel.parentElement?.textContent).toContain('1')
})
