import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { GAME_INSTRUCTIONS } from '../../lib/gameInstructions'
import GamePageShell from '../../components/GamePageShell'
import NBack from '../../games/NBack'

export default function NBackPage(): JSX.Element {
  const [search] = useSearchParams()
  const lvl = Number(search.get('level') ?? '1')
  const level = Math.min(Math.max(1, lvl), 10)
  const instructions = GAME_INSTRUCTIONS['n-back']

  return (
    <GamePageShell gameId="n-back" level={level} instructions={instructions}>
      <NBack level={level} />
    </GamePageShell>
  )
}