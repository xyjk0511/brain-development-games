import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { GAME_INSTRUCTIONS } from '../../lib/gameInstructions'
import GamePageShell from '../../components/GamePageShell'
import MentalRotation from '../../games/MentalRotation'

export default function MentalRotationPage(): JSX.Element {
  const [search] = useSearchParams()
  const lvl = Number(search.get('level') ?? '1')
  const level = Math.min(Math.max(1, lvl), 10)
  const instructions = GAME_INSTRUCTIONS['mental-rotation']

  return (
    <GamePageShell gameId="mental-rotation" level={level} instructions={instructions}>
      <MentalRotation level={level} />
    </GamePageShell>
  )
}