import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { GAME_INSTRUCTIONS } from '../../lib/gameInstructions'
import GamePageShell from '../../components/GamePageShell'
import Stroop from '../../games/Stroop'

export default function StroopPage(): JSX.Element {
  const [search] = useSearchParams()
  const lvl = Number(search.get('level') ?? '1')
  const level = Math.min(Math.max(1, lvl), 10)
  const instructions = GAME_INSTRUCTIONS['stroop']

  return (
    <GamePageShell gameId="stroop" level={level} instructions={instructions}>
      <Stroop level={level} />
    </GamePageShell>
  )
}