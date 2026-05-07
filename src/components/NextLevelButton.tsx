import React from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import type { AdaptiveDecision } from '../lib/adaptive'

export type NextLevelButtonProps = {
  currentLevel: number
  maxLevel?: number
  recommendation?: AdaptiveDecision
}

const labelForDirection = (direction: AdaptiveDecision['direction']): string => {
  if (direction === '升高') return '轻轻升级'
  if (direction === '降低') return '放轻松一点'
  return '保持节奏'
}

export default function NextLevelButton({ currentLevel, maxLevel = 10, recommendation }: NextLevelButtonProps): JSX.Element {
  const navigate = useNavigate()
  const [search] = useSearchParams()

  const fallbackNextLevel = currentLevel + 1
  const recommendedLevel = recommendation?.nextLevel ?? fallbackNextLevel
  const hasNextLevel = recommendedLevel <= maxLevel
  const hasFallbackNextLevel = fallbackNextLevel <= maxLevel

  const goToRecommendedLevel = (): void => {
    if (!hasNextLevel) return
    const params = new URLSearchParams(search)
    params.set('level', String(recommendedLevel))
    params.set('adaptive', recommendation ? '1' : '0')
    navigate(`?${params.toString()}`, { replace: true })
  }

  const goToManualNextLevel = (): void => {
    if (!hasFallbackNextLevel) return
    const params = new URLSearchParams(search)
    params.set('level', String(fallbackNextLevel))
    params.set('adaptive', '0')
    navigate(`?${params.toString()}`, { replace: true })
  }

  const goHome = (): void => {
    navigate('/')
  }

  if (!hasNextLevel && !hasFallbackNextLevel) {
    return (
      <div className="flex flex-col gap-2 items-center">
        <div className="px-4 py-2 bg-emerald-100 text-emerald-800 rounded font-semibold">
          所有等级已完成
        </div>
        <button
          onClick={goHome}
          className="px-4 py-2 bg-indigo-600 text-white rounded font-semibold hover:bg-indigo-700"
        >
          返回首页
        </button>
      </div>
    )
  }

  if (recommendation) {
    return (
      <div className="flex flex-col gap-3 items-center text-center">
        <div className="max-w-xl rounded-xl bg-white/80 border border-emerald-200 px-4 py-3 text-emerald-900 shadow-sm">
          <div className="font-bold">推荐下一局：第 {recommendedLevel} 级 · {labelForDirection(recommendation.direction)}</div>
          <div className="text-sm mt-1">{recommendation.reason}</div>
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          <button
            onClick={goToRecommendedLevel}
            className="px-4 py-2 bg-indigo-600 text-white rounded font-semibold hover:bg-indigo-700"
          >
            按推荐继续 →
          </button>
          {hasFallbackNextLevel && fallbackNextLevel !== recommendedLevel && (
            <button
              onClick={goToManualNextLevel}
              className="px-4 py-2 bg-white text-indigo-700 border border-indigo-200 rounded font-semibold hover:bg-indigo-50"
            >
              我想手动试第 {fallbackNextLevel} 级
            </button>
          )}
          <button
            onClick={goHome}
            className="px-4 py-2 bg-slate-100 text-slate-700 rounded font-semibold hover:bg-slate-200"
          >
            返回大厅
          </button>
        </div>
      </div>
    )
  }

  return (
    <button
      onClick={goToRecommendedLevel}
      className="px-4 py-2 bg-indigo-600 text-white rounded font-semibold hover:bg-indigo-700"
    >
      下一等级 →
    </button>
  )
}
