import React from 'react'
import LevelSelector from './LevelSelector'
import HowToPlay from './HowToPlay'
import { getGameById } from '../lib/gameRegistry'
import type { GameInstructions } from '../lib/gameInstructions'

type GamePageShellProps = {
  gameId: string
  level: number
  instructions: GameInstructions
  children: React.ReactNode
}

export default function GamePageShell({ gameId, level, instructions, children }: GamePageShellProps): JSX.Element {
  const game = getGameById(gameId)

  if (!game) {
    return <div className="space-y-4">{children}</div>
  }

  return (
    <div className="game-scene-page space-y-4 sm:space-y-5">
      <section
        className="relative overflow-hidden rounded-lg border border-white/80 bg-amber-50 bg-cover bg-center shadow-[0_20px_55px_rgba(15,23,42,0.14)]"
        style={{ backgroundImage: `url(${game.scenePath})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-white/92 via-white/70 to-white/28" />
        <div className="relative grid min-h-[260px] gap-4 p-4 sm:p-6 lg:grid-cols-[1fr_340px] lg:p-8">
          <div className="flex flex-col justify-center">
            <div className="mb-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-white/90 px-3 py-1 text-sm font-black text-amber-700 shadow-sm">
                等级 {level}
              </span>
              <span className={`rounded-full px-3 py-1 text-sm font-black shadow-sm ${game.beginnerFriendly ? 'bg-emerald-100 text-emerald-800' : 'bg-orange-100 text-orange-800'}`}>
                {game.beginnerFriendly ? '轻松开始' : '进阶挑战'}
              </span>
            </div>
            <h1 className="max-w-2xl text-3xl font-black leading-tight text-slate-950 sm:text-4xl">
              {game.name}
            </h1>
            <p className="mt-3 max-w-2xl text-base font-semibold leading-relaxed text-slate-700">
              {game.description}
            </p>
            <div className="mt-4 grid gap-2 text-sm text-slate-700 sm:grid-cols-2">
              <div className="rounded-lg border border-white/80 bg-white/85 px-3 py-2 shadow-sm">
                <strong>玩法：</strong>{game.howToPlay}
              </div>
              <div className="rounded-lg border border-white/80 bg-white/85 px-3 py-2 shadow-sm">
                <strong>训练：</strong>{game.trains}
              </div>
            </div>
          </div>

          <div className="hidden items-end justify-center lg:flex">
            <img
              src={game.characterPath}
              alt={`${game.name} 场景角色`}
              className="max-h-[230px] max-w-full rounded-lg border-4 border-white bg-white/70 object-contain shadow-xl"
            />
          </div>
        </div>
      </section>

      <div className="rounded-lg border border-amber-100 bg-white/85 p-3 shadow-sm backdrop-blur sm:p-4">
        <LevelSelector />
      </div>

      <div className="game-scene-instructions">
        <HowToPlay
          title={instructions.title}
          instructions={instructions.instructions}
          tips={instructions.tips ?? []}
        />
      </div>

      <section
        className="game-scene-stage rounded-lg border border-white/80 p-2 shadow-[0_16px_40px_rgba(15,23,42,0.12)] backdrop-blur-sm sm:p-4"
        style={{
          backgroundImage: `linear-gradient(135deg, rgba(255,255,255,0.78), rgba(255,255,255,0.48)), url(${game.scenePath})`
        }}
      >
        {children}
      </section>
    </div>
  )
}
