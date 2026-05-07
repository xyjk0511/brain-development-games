import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { GAME_INSTRUCTIONS } from '../../lib/gameInstructions'
import GamePageShell from '../../components/GamePageShell'
import LogicPuzzles from '../../games/LogicPuzzles'

export default function LogicPuzzlesPage(): JSX.Element {
  const [search] = useSearchParams()
  const lvl = Number(search.get('level') ?? '1')
  const level = Math.min(Math.max(1, lvl), 10)
  const instructions = GAME_INSTRUCTIONS['logic-puzzles']

  return (
    <GamePageShell gameId="logic-puzzles" level={level} instructions={instructions}>
      <LogicPuzzles level={level} />
    </GamePageShell>
  )
}