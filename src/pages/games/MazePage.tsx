import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { GAME_INSTRUCTIONS } from '../../lib/gameInstructions'
import GamePageShell from '../../components/GamePageShell'
import Maze from '../../games/Maze'

export default function MazePage(): JSX.Element {
  const [search] = useSearchParams()
  const lvl = Number(search.get('level') ?? '1')
  const level = Math.min(Math.max(1, lvl), 10)
  const instructions = GAME_INSTRUCTIONS['maze']

  return (
    <GamePageShell gameId="maze" level={level} instructions={instructions}>
      <Maze level={level} />
    </GamePageShell>
  )
}