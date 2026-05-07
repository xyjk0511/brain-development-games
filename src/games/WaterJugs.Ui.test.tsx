import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import WaterJugs from './WaterJugs'

test('fill and pour between jugs', async () => {
  render(<WaterJugs level={1} />)

  // 装满 水壶 2 (capacity 5)
  const fillButtons = screen.getAllByText(/装满/i)
  fireEvent.click(fillButtons[1])

  // Wait for fill animation to complete
  await waitFor(() => {
    expect(screen.getAllByText(/^5L$/).length).toBeGreaterThan(0)
  })

  // 倒水 水壶 2 -> 水壶 1 (3L capacity): Jug1=3 Jug2=2
  const pourButton = screen.getByText(/水壶 2 ➜ 1/i)
  fireEvent.click(pourButton)

  // Wait for pour animation to complete (Jug1=3L, Jug2=2L)
  await waitFor(() => {
    expect(screen.getByText(/^3L$/)).toBeInTheDocument()
    expect(screen.getByText(/^2L$/)).toBeInTheDocument()
  })
})
