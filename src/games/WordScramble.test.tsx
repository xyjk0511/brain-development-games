import React from 'react'
import { render, screen } from '@testing-library/react'
import WordScramble from './WordScramble'

test('renders 文字重组', () => {
  render(<WordScramble level={1} />)
  expect(screen.getByText(/文字重组/i)).toBeInTheDocument()
  expect(screen.getByText(/得分：/i)).toBeInTheDocument()
})
