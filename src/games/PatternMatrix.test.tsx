import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import PatternMatrix from './PatternMatrix'

test('renders 图形矩阵 and can replay and submit', () => {
  render(<PatternMatrix level={1} />)
  expect(screen.getByText(/图形矩阵/i)).toBeInTheDocument()
  const replay = screen.getByText(/重播/i)
  fireEvent.click(replay)
  const submit = screen.getByText(/提交/i)
  expect(submit).toBeInTheDocument()
})
