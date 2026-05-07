import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { GAME_INSTRUCTIONS } from '../../lib/gameInstructions'
import GamePageShell from '../../components/GamePageShell'
import SimonSays from '../../games/SimonSays'

export default function SimonSaysPage(): JSX.Element {
  const [search] = useSearchParams()
  const lvl = Number(search.get('level') ?? '1')
  const level = Math.min(Math.max(1, lvl), 10)
  const instructions = GAME_INSTRUCTIONS['simon-says']

  return (
    <GamePageShell gameId="simon-says" level={level} instructions={instructions}>
      <SimonSays level={level} />
    </GamePageShell>
  )
}