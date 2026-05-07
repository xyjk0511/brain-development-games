import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { GAME_INSTRUCTIONS } from '../../lib/gameInstructions'
import GamePageShell from '../../components/GamePageShell'
import QuickMath from '../../games/QuickMath'

export default function QuickMathPage(): JSX.Element {
  const [search] = useSearchParams()
  const lvl = Number(search.get('level') ?? '1')
  const level = Math.min(Math.max(1, lvl), 10)
  const instructions = GAME_INSTRUCTIONS['quick-math']

  return (
    <GamePageShell gameId="quick-math" level={level} instructions={instructions}>
      <QuickMath level={level} />
    </GamePageShell>
  )
}