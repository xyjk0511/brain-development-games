import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAllProgress, resetAllProgress, type ProgressState } from '../lib/progress'
import { GAME_REGISTRY, getTotalGames, getMaxLevel } from '../lib/gameRegistry'

export default function Home(): JSX.Element {
  const [selected, setSelected] = useState<string>(GAME_REGISTRY[0].id)
  const navigate = useNavigate()
  const [progress, setProgress] = useState<ProgressState>(() => getAllProgress())

  const LeaderboardComponent = React.lazy(() => import('../components/LeaderBoard'))

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
    <div className="space-y-4 sm:space-y-6 lg:space-y-8">
      <section className="bg-white p-4 sm:p-6 lg:p-8 rounded shadow" aria-label="游戏选择">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-4">
          <div className="flex-1 w-full">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 text-slate-900">认知训练游戏</h1>
            <p className="mb-4 text-base sm:text-lg text-slate-700">
              体验 <strong>{getTotalGames()} 个可爱认知训练游戏</strong>，练习<strong>记忆力</strong>、<strong>计划能力</strong>、<strong>注意力</strong>和<strong>问题解决能力</strong>。
              每个游戏提供 {getMaxLevel()} 个递进难度等级，系统会根据表现推荐下一局节奏。
            </p>
            <p className="mb-4 text-sm text-slate-500">
              说明：这些小游戏用于日常练习和个人记录，不提供专业评估或健康干预建议。
            </p>

            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <select
                className="border p-2 sm:p-3 rounded flex-1 text-base"
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
                className="bg-indigo-600 text-white px-6 py-3 rounded text-base sm:text-lg font-semibold hover:bg-indigo-700 transition-colors w-full sm:w-auto"
              >
                开始训练
              </button>
            </div>
          </div>

          <div className="text-left lg:text-right w-full lg:w-auto mt-4 lg:mt-0">
            <div className="text-xs sm:text-sm text-slate-500 mb-2">进度保存在本机浏览器中。</div>
            <button className="text-xs sm:text-sm text-red-600 underline hover:text-red-800" onClick={handleReset}>重置进度</button>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-r from-indigo-50 to-purple-50 p-4 sm:p-6 rounded-lg shadow">
        <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-slate-900">为什么进行认知练习？</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          <div className="bg-white p-3 sm:p-4 rounded shadow-sm">
            <h3 className="font-semibold text-base sm:text-lg mb-2 text-indigo-700">练习记忆</h3>
            <p className="text-sm sm:text-base text-slate-600">通过结构化小游戏练习工作记忆、视觉记忆和顺序回忆。</p>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded shadow-sm">
            <h3 className="font-semibold text-base sm:text-lg mb-2 text-purple-700">练习注意</h3>
            <p className="text-sm sm:text-base text-slate-600">通过有趣挑战练习选择性注意、专注和认知控制。</p>
          </div>
          <div className="bg-white p-3 sm:p-4 rounded shadow-sm">
            <h3 className="font-semibold text-base sm:text-lg mb-2 text-pink-700">练习解题</h3>
            <p className="text-sm sm:text-base text-slate-600">用低压力任务练习逻辑推理、策略规划和分析思维。</p>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="space-y-3 sm:space-y-4" role="list" aria-label="可用认知训练游戏">
          {GAME_REGISTRY.map((game) => (
            <article key={game.id} className="bg-white p-4 sm:p-6 rounded shadow hover:shadow-lg transition-shadow" role="listitem">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3">
                <div className="flex-1 w-full">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <h3 className="font-bold text-lg sm:text-xl text-slate-900">{game.name}</h3>
                    <span className={`text-xs px-2 py-1 rounded-full ${game.beginnerFriendly ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                      {game.beginnerFriendly ? '轻松开始' : '进阶挑战'}
                    </span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-3">{game.description}</p>
                  <div className="grid gap-2 text-xs sm:text-sm text-slate-600">
                    <div><strong>怎么玩：</strong>{game.howToPlay}</div>
                    <div><strong>目标是什么：</strong>{game.goal}</div>
                    <div><strong>训练什么能力：</strong>{game.trains}</div>
                  </div>
                </div>

                <div className="w-full sm:w-auto">
                  {progress[game.id]?.bestLevel ? (
                    <div className="text-xs sm:text-sm bg-emerald-100 text-emerald-800 px-2 py-1 rounded whitespace-nowrap">最佳等级：{progress[game.id].bestLevel}</div>
                  ) : (
                    <div className="text-xs sm:text-sm text-slate-400">暂无进度</div>
                  )}
                </div>
              </div>

              <div className="mt-3 sm:mt-4 flex gap-2">
                <button
                  onClick={() => navigate(`/games/${game.id}`)}
                  className="text-sm sm:text-base text-indigo-600 underline hover:text-indigo-800"
                >
                  打开
                </button>
              </div>
            </article>
          ))}
        </div>

        <aside aria-label="排行榜和进度追踪" className="lg:sticky lg:top-6">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-slate-900">排行榜</h2>
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

