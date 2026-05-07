import React from 'react'
import { useSearchParams } from 'react-router-dom'
import { GAME_INSTRUCTIONS } from '../../lib/gameInstructions'
import GamePageShell from '../../components/GamePageShell'
import WordScramble from '../../games/WordScramble'

export default function WordScramblePage(): JSX.Element {
  const [search] = useSearchParams()
  const lvl = Number(search.get('level') ?? '1')
  const level = Math.min(Math.max(1, lvl), 10)
  const instructions = GAME_INSTRUCTIONS['word-scramble']

  return (
    <GamePageShell gameId="word-scramble" level={level} instructions={instructions}>
      <WordScramble level={level} />
    </GamePageShell>
  )
}