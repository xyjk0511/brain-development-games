import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { GAME_INSTRUCTIONS } from '../../lib/gameInstructions'
import GamePageShell from '../../components/GamePageShell'
import WaterJugs from '../../games/WaterJugs'

export default function WaterJugsPage(): JSX.Element {
  const [search] = useSearchParams()
  const lvl = Number(search.get('level') ?? '1')
  const level = Math.min(Math.max(1, lvl), 10)
  const instructions = GAME_INSTRUCTIONS['water-jugs']

  return (
    <GamePageShell gameId="water-jugs" level={level} instructions={instructions}>
      <WaterJugs level={level} />
    </GamePageShell>
  )
}