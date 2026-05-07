import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Maze from './Maze'

test('renders Maze and moves player', () => {
  render(<Maze level={1} />)
  expect(screen.getByText(/Maze Adventure/i)).toBeInTheDocument()
  expect(screen.getByText(/步数：/i)).toBeInTheDocument()

  const right = screen.getByRole('button', { name: /➡️/i })
  fireEvent.click(right)

  const movesLabel = screen.getByText(/步数：/i)
  expect(movesLabel.parentElement?.textContent).toContain('1')
})
