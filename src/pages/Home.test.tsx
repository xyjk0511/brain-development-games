import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Home from './Home'

test('renders home and canonical twenty-three-game list', () => {
  render(
    <MemoryRouter>
      <Home />
    </MemoryRouter>
  )

  expect(screen.getByRole('heading', { name: /认知训练游戏/i })).toBeInTheDocument()
  expect(screen.getByText(/23 个可爱认知训练游戏/i)).toBeInTheDocument()
  expect(screen.getAllByText(/强力记忆/i).length).toBeGreaterThan(0)
  expect(screen.getAllByText(/小熊果汁铺/i).length).toBeGreaterThan(0)
  expect(screen.getAllByText(/表情小剧场/i).length).toBeGreaterThan(0)
  expect(screen.getByRole('button', { name: /开始训练/i })).toBeInTheDocument()
  expect(screen.getByText(/重置进度/i)).toBeInTheDocument()
  expect(screen.getAllByText(/训练什么能力/i).length).toBeGreaterThan(0)
})
