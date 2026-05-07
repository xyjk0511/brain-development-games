import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'

export default function LevelSelector(): JSX.Element {
  const navigate = useNavigate()
  const [search] = useSearchParams()
  const current = Number(search.get('level') ?? '1')

  const setLevel = (level: number): void => {
    const params = new URLSearchParams(search)
    params.set('level', String(level))
    navigate(`?${params.toString()}`, { replace: true })
  }

  return (
    <div className="flex items-center gap-2 mb-4">
      <label className="text-sm">等级</label>
      <select
        value={current}
        onChange={(e) => setLevel(Number(e.target.value))}
        className="border p-1 rounded"
      >
        {Array.from({ length: 10 }, (_, i) => i + 1).map((level) => (
          <option key={level} value={level}>{level}</option>
        ))}
      </select>
    </div>
  )
}
