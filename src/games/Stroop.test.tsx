import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Stroop from './Stroop'

test('renders Stroop and can press buttons', () => {
  render(<Stroop level={1} />)
  expect(screen.getByText(/颜色干扰挑战/i)).toBeInTheDocument()
  const btn = screen.getByRole('button', { name: /红色/i })
  fireEvent.click(btn)
  expect(screen.getByText(/得分：/i)).toBeInTheDocument()
})
