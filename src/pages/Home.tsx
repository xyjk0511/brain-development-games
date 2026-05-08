import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllProgress, resetAllProgress, type ProgressState } from '../lib/progress'
import { GAME_REGISTRY, getTotalGames, getMaxLevel } from '../lib/gameRegistry'

export default function Home(): JSX.Element {
  const [selected, setSelected] = useState<string>(GAME_REGISTRY[0].id)
  const navigate = useNavigate()
  const [progress, setProgress] = useState<ProgressState>(() => getAllProgress())

  const LeaderboardComponent = React.lazy(() => import('../components/LeaderBoard'))
  const selectedGame = GAME_REGISTRY.find(game => game.id === selected) ?? GAME_REGISTRY[0]

  useEffect(() => {
    const handler = () => setProgress(getAllProgress())
    window.addEventListener('progress-updated', handler)
    return () => window.removeEventListener('progress-updated', handler)
  }, [])

  const startGame = (): void => {
    navigate(`/games/${selected}`)
  }

  const handleReset = (): void => {
    resetAllProgress()
    setProgress({})
  }

  return (
    <div className="space-y-6 lg:space-y-8">
      <section className="overflow-hidden rounded-lg border border-amber-200 bg-[#fffdf5] shadow-[0_18px_50px_rgba(180,83,9,0.12)]" aria-label="游戏选择">
        <div className="grid lg:grid-cols-[1.05fr_0.95fr]">
          <div className="p-5 sm:p-7 lg:p-10">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-200 bg-white px-3 py-1 text-sm font-semibold text-amber-700">
              {getTotalGames()} 个可爱认知训练小游戏
            </div>
            <h1 className="mb-3 max-w-2xl text-3xl font-black leading-tight text-slate-950 sm:text-4xl lg:text-5xl">认知训练游戏</h1>
            <p className="mb-4 max-w-2xl text-base leading-relaxed text-slate-700 sm:text-lg">
              体验 <strong>{getTotalGames()} 个可爱认知训练游戏</strong>，练习<strong>记忆力</strong>、<strong>计划能力</strong>、<strong>注意力</strong>和<strong>问题解决能力</strong>。
              多数游戏提供 {getMaxLevel()} 个递进难度等级，强力记忆提供 60 级专项挑战，系统会根据表现推荐下一局节奏。
            </p>
            <p className="mb-5 max-w-2xl text-sm text-slate-500">
              说明：这些小游戏用于日常练习和个人记录，不提供专业评估或健康干预建议。
            </p>

            <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
              <select
                className="min-h-12 flex-1 rounded-lg border-2 border-amber-200 bg-white p-3 text-base font-semibold text-slate-800 shadow-sm outline-none focus:border-amber-400"
                value={selected}
                onChange={(e) => setSelected(e.target.value)}
              >
                {GAME_REGISTRY.map((game) => (
                  <option key={game.id} value={game.id}>
                    {game.name}{game.beginnerFriendly ? ' · 轻松开始' : ' · 进阶挑战'}
                  </option>
                ))}
              </select>

              <button
                onClick={startGame}
                className="min-h-12 rounded-lg bg-slate-950 px-6 py-3 text-base font-black text-white shadow-[0_10px_0_#f59e0b] transition-transform hover:-translate-y-0.5 active:translate-y-0.5 sm:text-lg"
              >
                开始训练
              </button>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-xs sm:text-sm">
              <span className="rounded-full bg-emerald-100 px-3 py-1 font-semibold text-emerald-800">本机保存进度</span>
              <span className="rounded-full bg-sky-100 px-3 py-1 font-semibold text-sky-800">递进等级训练</span>
              <button className="text-red-600 underline hover:text-red-800" onClick={handleReset}>重置进度</button>
            </div>
          </div>

          <div className="relative min-h-[280px] border-t border-amber-100 bg-[#fef3c7] p-5 sm:p-7 lg:border-l lg:border-t-0">
            <div className="h-full overflow-hidden rounded-lg border-4 border-white bg-white shadow-[0_16px_30px_rgba(15,23,42,0.14)]">
              <img
                src={selectedGame.artPath}
                alt={`${selectedGame.name} 插画`}
                className="h-full min-h-[260px] w-full object-cover"
              />
            </div>
            <div className="absolute bottom-8 left-8 right-8 rounded-lg border border-white/80 bg-white/90 p-4 shadow-lg backdrop-blur">
              <div className="text-sm font-bold text-amber-700">{selectedGame.beginnerFriendly ? '轻松开始' : '进阶挑战'}</div>
              <div className="text-xl font-black text-slate-950">{selectedGame.name}</div>
              <div className="mt-1 text-sm leading-relaxed text-slate-600">{selectedGame.description}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-lg border border-sky-100 bg-sky-50/80 p-4 sm:p-6">
        <h2 className="mb-3 text-xl font-black text-slate-900 sm:mb-4 sm:text-2xl">为什么进行认知练习？</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="rounded-lg border border-white bg-white p-3 shadow-sm sm:p-4">
            <h3 className="mb-2 text-base font-black text-sky-700 sm:text-lg">练习记忆</h3>
            <p className="text-sm sm:text-base text-slate-600">通过结构化小游戏练习工作记忆、视觉记忆和顺序回忆。</p>
          </div>
          <div className="rounded-lg border border-white bg-white p-3 shadow-sm sm:p-4">
            <h3 className="mb-2 text-base font-black text-emerald-700 sm:text-lg">练习注意</h3>
            <p className="text-sm sm:text-base text-slate-600">通过有趣挑战练习选择性注意、专注和认知控制。</p>
          </div>
          <div className="rounded-lg border border-white bg-white p-3 shadow-sm sm:p-4">
            <h3 className="mb-2 text-base font-black text-rose-700 sm:text-lg">练习解题</h3>
            <p className="text-sm sm:text-base text-slate-600">用低压力任务练习逻辑推理、策略规划和分析思维。</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2" role="list" aria-label="可用认知训练游戏">
          {GAME_REGISTRY.map((game) => (
            <article key={game.id} className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm transition-transform hover:-translate-y-1 hover:shadow-xl" role="listitem">
              <button
                type="button"
                onClick={() => navigate(`/games/${game.id}`)}
                className="block w-full text-left"
              >
                <div className="aspect-[4/3] overflow-hidden bg-amber-50">
                  <img src={game.artPath} alt={`${game.name} 封面`} className="h-full w-full object-cover transition-transform duration-300 hover:scale-105" loading="lazy" />
                </div>
                <div className="p-4">
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-black text-slate-950">{game.name}</h3>
                    <span className={`rounded-full px-2 py-1 text-xs font-bold ${game.beginnerFriendly ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {game.beginnerFriendly ? '轻松开始' : '进阶挑战'}
                    </span>
                  </div>
                  <p className="mb-3 text-sm leading-relaxed text-slate-600">{game.description}</p>
                  <div className="rounded-lg bg-slate-50 px-3 py-2 text-xs font-semibold text-slate-600">
                    <strong>训练什么能力：</strong>{game.trains}
                  </div>
                  <div className="mt-3 flex items-center justify-between">
                    {progress[game.id]?.bestLevel ? (
                      <span className="rounded-full bg-emerald-100 px-2 py-1 text-xs font-bold text-emerald-800">最佳等级：{progress[game.id].bestLevel}</span>
                    ) : (
                      <span className="text-xs text-slate-400">暂无进度</span>
                    )}
                    <span className="text-sm font-black text-slate-950">打开</span>
                  </div>
                </div>
              </button>
            </article>
          ))}
        </div>

        <aside aria-label="排行榜和进度追踪" className="lg:sticky lg:top-6">
          <div>
            <h2 className="mb-3 text-xl font-black text-slate-900 sm:mb-4 sm:text-2xl">排行榜</h2>
            <div className="mb-4">
              <React.Suspense fallback={<div className="text-slate-500">正在加载排行榜…</div>}>
                <LeaderboardComponent />
              </React.Suspense>
            </div>
          </div>
        </aside>
      </section>
    </div>
  )
}

