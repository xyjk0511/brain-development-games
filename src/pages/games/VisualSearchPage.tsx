import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { GAME_INSTRUCTIONS } from '../../lib/gameInstructions'
import GamePageShell from '../../components/GamePageShell'
import VisualSearch from '../../games/VisualSearch'

export default function VisualSearchPage(): JSX.Element {
  const [search] = useSearchParams()
  const lvl = Number(search.get('level') ?? '1')
  const level = Math.min(Math.max(1, lvl), 10)
  const instructions = GAME_INSTRUCTIONS['visual-search']

  return (
    <GamePageShell gameId="visual-search" level={level} instructions={instructions}>
      <VisualSearch level={level} />
    </GamePageShell>
  )
}