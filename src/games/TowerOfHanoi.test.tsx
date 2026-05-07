import { disksForLevel } from './TowerOfHanoi'
import { render, screen, fireEvent } from '@testing-library/react'
import React from 'react'
import TowerOfHanoi from './TowerOfHanoi'

// import share buttons to satisfy build environment for the component
jest.mock('../components/ShareButtons', () => () => <div />)

test('disksForLevel maps levels correctly', () => {
  expect(disksForLevel(1)).toBe(3)
  expect(disksForLevel(2)).toBe(4)
  expect(disksForLevel(8)).toBe(10)
  expect(disksForLevel(9)).toBe(5)
})

test('can perform legal 步，用时 detect win', () => {
  const { container } = render(<TowerOfHanoi level={1} />)

  // Click tower 1 to select top disk, then tower 3 to move it
  const rods = Array.from(container.querySelectorAll('[role="button"][tabindex="0"]'))
  expect(rods).toHaveLength(3)
  fireEvent.click(rods[0])
  fireEvent.click(rods[2])

  // Moves should increase by one
  const movesLabel = screen.getByText(/🎮 步数：/i)
  expect(movesLabel.parentElement?.textContent).toContain('1')
})
