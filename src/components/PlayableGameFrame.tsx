import React from 'react'
import { getGameById } from '../lib/gameRegistry'

type PlayableGameFrameProps = {
  gameId: string
}

export default function PlayableGameFrame({ gameId }: PlayableGameFrameProps): JSX.Element {
  const game = getGameById(gameId)
  const title = game?.name ?? gameId
  const src = `${import.meta.env.BASE_URL}playable-games/${gameId}/index.html`

  return (
    <div className="h-screen w-screen overflow-hidden bg-[#fff8df]">
      <iframe
        title={`${title} 可玩游戏`}
        src={src}
        className="h-full w-full border-0"
        allow="autoplay; fullscreen"
      />
    </div>
  )
}
