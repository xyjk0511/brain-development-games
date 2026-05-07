import React from 'react'

export type GameStubProps = {
  name: string
  description: string
  level: number
}

export default function GameStub({ name, description, level }: GameStubProps): JSX.Element {
  return (
    <div className="bg-white p-6 rounded shadow">
      <h2 className="text-xl font-bold">{name} (等级 {level})</h2>
      <p className="text-slate-600 mb-4">{description}</p>
      <div className="p-4 border rounded">这是 <strong>{name}</strong> 的占位关卡。玩法会随等级提升。</div>
    </div>
  )
}
