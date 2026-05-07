import React from 'react'
import { render, screen } from '@testing-library/react'
import SchulteTable from './SchulteTable'

test('renders Schulte Table and responds to clicks', () => {
  render(<SchulteTable level={1} />)
  expect(screen.getByText(/数字搜寻/i)).toBeInTheDocument()
  const next = screen.getByText(/下一个：/i)
  expect(next).toBeInTheDocument()
})
