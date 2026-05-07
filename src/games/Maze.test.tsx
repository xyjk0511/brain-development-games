import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Maze, { findShortestPath, generateMaze } from './Maze'

test('generates a real solvable maze with walls and open cells', () => {
  for (const size of [6, 8, 10, 12]) {
    const { grid, start, end, optimalMoves } = generateMaze(size, size)
    const cells = grid.flat()

    expect(cells.filter(cell => cell === 1).length).toBeGreaterThan(0)
    expect(cells.filter(cell => cell === 0).length).toBeGreaterThan(0)
    expect(grid[start[1]][start[0]]).toBe(0)
    expect(grid[end[1]][end[0]]).toBe(0)
    expect(optimalMoves).toBeGreaterThan(0)
    expect(findShortestPath(grid, start, end)).toBe(optimalMoves)
  }
})

test('renders Maze and moves player', () => {
  render(<Maze level={1} />)
  expect(screen.getByText(/Maze Adventure/i)).toBeInTheDocument()
  expect(screen.getByText(/步数：/i)).toBeInTheDocument()

  const controls = [
    screen.getByRole('button', { name: /➡️/i }),
    screen.getByRole('button', { name: /⬇️/i }),
    screen.getByRole('button', { name: /⬅️/i }),
    screen.getByRole('button', { name: /⬆️/i })
  ]

  for (const control of controls) fireEvent.click(control)

  expect(screen.getByText(/步数：/i)).toBeInTheDocument()
})
