import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { GAME_INSTRUCTIONS } from '../../lib/gameInstructions'
import GamePageShell from '../../components/GamePageShell'
import ReactionTime from '../../games/ReactionTime'

export default function ReactionTimePage(): JSX.Element {
  const [search] = useSearchParams()
  const lvl = Number(search.get('level') ?? '1')
  const level = Math.min(Math.max(1, lvl), 10)
  const instructions = GAME_INSTRUCTIONS['reaction-time']

  return (
    <GamePageShell gameId="reaction-time" level={level} instructions={instructions}>
      <ReactionTime level={level} />
    </GamePageShell>
  )
}