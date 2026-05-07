import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { GAME_INSTRUCTIONS } from '../../lib/gameInstructions'
import GamePageShell from '../../components/GamePageShell'
import CardMatching from '../../games/CardMatching'

export default function CardMatchingPage(): JSX.Element {
  const [search] = useSearchParams()
  const lvl = Number(search.get('level') ?? '1')
  const level = Math.min(Math.max(1, lvl), 10)
  const instructions = GAME_INSTRUCTIONS['card-matching']

  return (
    <GamePageShell gameId="card-matching" level={level} instructions={instructions}>
      <CardMatching level={level} />
    </GamePageShell>
  )
}