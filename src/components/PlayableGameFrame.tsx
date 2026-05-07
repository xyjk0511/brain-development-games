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
      <a
        href={import.meta.env.BASE_URL}
        className="fixed left-3 top-3 z-50 rounded-full border border-white/80 bg-white/90 px-3 py-2 text-sm font-black text-slate-800 shadow-lg backdrop-blur transition hover:bg-amber-100"
      >
        返回首页
      </a>
      <iframe
        title={`${title} 可玩游戏`}
        src={src}
        className="h-full w-full border-0"
        allow="autoplay; fullscreen"
      />
    </div>
  )
}
