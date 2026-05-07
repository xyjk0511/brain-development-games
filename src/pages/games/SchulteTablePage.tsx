import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { GAME_INSTRUCTIONS } from '../../lib/gameInstructions'
import GamePageShell from '../../components/GamePageShell'
import SchulteTable from '../../games/SchulteTable'

export default function SchulteTablePage(): JSX.Element {
  const [search] = useSearchParams()
  const lvl = Number(search.get('level') ?? '1')
  const level = Math.min(Math.max(1, lvl), 10)
  const instructions = GAME_INSTRUCTIONS['schulte-table']

  return (
    <GamePageShell gameId="schulte-table" level={level} instructions={instructions}>
      <SchulteTable level={level} />
    </GamePageShell>
  )
}