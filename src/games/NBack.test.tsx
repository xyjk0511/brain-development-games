import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import NBack from './NBack'

test('renders NBack and starts sequence', () => {
  render(<NBack level={1} />)
  expect(screen.getByText(/记忆挑战/i)).toBeInTheDocument()
  const start = screen.getByText(/开始/i)
  fireEvent.click(start)
  expect(screen.getByText(/得分：/i)).toBeInTheDocument()
})
