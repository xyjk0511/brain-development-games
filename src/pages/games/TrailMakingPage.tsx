import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { GAME_INSTRUCTIONS } from '../../lib/gameInstructions'
import GamePageShell from '../../components/GamePageShell'
import TrailMaking from '../../games/TrailMaking'

export default function TrailMakingPage(): JSX.Element {
  const [search] = useSearchParams()
  const lvl = Number(search.get('level') ?? '1')
  const level = Math.min(Math.max(1, lvl), 10)
  const instructions = GAME_INSTRUCTIONS['trail-making']

  return (
    <GamePageShell gameId="trail-making" level={level} instructions={instructions}>
      <TrailMaking level={level} />
    </GamePageShell>
  )
}