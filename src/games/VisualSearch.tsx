import React, { useEffect, useMemo, useRef, useState } from 'react'
import { recordGameRun } from '../lib/progress'
import type { AdaptiveDecision } from '../lib/adaptive'
import { visualSearchConfigForLevel, type VisualSearchConfig } from '../lib/gameParameters'
import NextLevelButton from '../components/NextLevelButton'
import CelebrationAnimation from '../components/CelebrationAnimation'

export type VisualSearchProps = {
  level: number
}

const SHAPES = ['●', '■', '▲', '◆', '★', '♥', '♣', '♠']
const COLORS = ['text-red-500', 'text-blue-500', 'text-green-500', 'text-yellow-500', 'text-purple-500', 'text-pink-500']

type Item = {
  id: number
  shape: string
  color: string
  isTarget: boolean
}

const pickDistractor = (targetShape: string, targetColor: string, similarity: VisualSearchConfig['distractorSimilarity']): Pick<Item, 'shape' | 'color'> => {
  let shape = SHAPES[Math.floor(Math.random() * SHAPES.length)]
  let color = COLORS[Math.floor(Math.random() * COLORS.length)]

  if (similarity === '高' && Math.random() > 0.45) {
    shape = targetShape
  } else if (similarity === '中' && Math.random() > 0.65) {
    color = targetColor
  }

  while (shape === targetShape && color === targetColor) {
    shape = SHAPES[Math.floor(Math.random() * SHAPES.length)]
    color = COLORS[Math.floor(Math.random() * COLORS.length)]
  }

  return { shape, color }
}

export const generateVisualSearchItems = (config: VisualSearchConfig): { items: Item[]; targetCount: number } => {
  const targetShape = SHAPES[Math.floor(Math.random() * SHAPES.length)]
  const targetColor = COLORS[Math.floor(Math.random() * COLORS.length)]
  const items: Item[] = []

  for (let i = 0; i < config.itemCount; i++) {
    if (i < config.targetCount) {
      items.push({ id: i, shape: targetShape, color: targetColor, isTarget: true })
    } else {
      const distractor = pickDistractor(targetShape, targetColor, config.distractorSimilarity)
      items.push({ id: i, ...distractor, isTarget: false })
    }
  }

  return { items: items.sort(() => Math.random() - 0.5), targetCount: config.targetCount }
}

const VisualSearch = ({ level }: VisualSearchProps): JSX.Element => {
  const config = useMemo(() => visualSearchConfigForLevel(level), [level])
  const [gameData, setGameData] = useState(() => generateVisualSearchItems(config))
  const [found, setFound] = useState<Set<number>>(new Set())
  const [startTime, setStartTime] = useState<number | null>(null)
  const [endTime, setEndTime] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [recommendation, setRecommendation] = useState<AdaptiveDecision | undefined>()
  const saved = useRef(false)
  const totalClicks = useRef(0)
  const errorClicks = useRef(0)
  const roundTimes = useRef<number[]>([])
  const sessionStart = useRef(Date.now())
  const roundStart = useRef(Date.now())
  const nextRoundTimeout = useRef<number | null>(null)
  const isAdvancingRound = useRef(false)

  const clearNextRoundTimeout = (): void => {
    if (nextRoundTimeout.current !== null) {
      window.clearTimeout(nextRoundTimeout.current)
      nextRoundTimeout.current = null
    }
  }

  useEffect(() => {
    clearNextRoundTimeout()
    setGameData(generateVisualSearchItems(config))
    setFound(new Set())
    const now = Date.now()
    roundStart.current = now
    isAdvancingRound.current = false
    setStartTime(now)
    setEndTime(null)
    setScore(0)
    setCompleted(false)
    setRecommendation(undefined)
    totalClicks.current = 0
    errorClicks.current = 0
    roundTimes.current = []
    sessionStart.current = now
    saved.current = false
    return clearNextRoundTimeout
  }, [config, level])

  const nextRound = (): void => {
    setGameData(generateVisualSearchItems(config))
    setFound(new Set())
    const now = Date.now()
    roundStart.current = now
    isAdvancingRound.current = false
    setStartTime(now)
    setEndTime(null)
    nextRoundTimeout.current = null
  }

  const completeRun = (newScore: number): void => {
    if (saved.current) return
    const targetClicks = newScore * config.targetCount
    const accuracy = totalClicks.current === 0 ? 0 : targetClicks / totalClicks.current
    const avgReactionMs = roundTimes.current.length === 0
      ? undefined
      : Math.round(roundTimes.current.reduce((sum, value) => sum + value, 0) / roundTimes.current.length)
    const decision = recordGameRun({
      gameId: 'visual-search',
      level,
      accuracy,
      avgReactionMs,
      completionMs: Date.now() - sessionStart.current,
      errorCount: errorClicks.current,
      hintCount: 0,
      retryCount: 0,
      consecutiveSuccesses: accuracy >= 0.85 ? 1 : 0,
      consecutiveFailures: accuracy < 0.65 ? 1 : 0,
      score: Math.max(0, Math.min(100, Math.round(accuracy * 100))),
      maxScore: 100
    })
    saved.current = true
    clearNextRoundTimeout()
    setRecommendation(decision)
    setCompleted(true)
  }

  const handleItemClick = (item: Item): void => {
    if (completed || isAdvancingRound.current) return
    const clickTime = Date.now()
    const roundStartTime = roundStart.current
    if (startTime === null) setStartTime(roundStartTime)
    if (found.has(item.id)) return

    totalClicks.current += 1

    if (!item.isTarget) {
      errorClicks.current += 1
      return
    }

    const newFound = new Set(found).add(item.id)
    setFound(newFound)

    if (newFound.size === gameData.targetCount) {
      const time = Date.now() - roundStartTime
      roundTimes.current.push(time)
      setEndTime(time)
      const newScore = score + 1
      setScore(newScore)

      if (newScore >= config.roundsToComplete) {
        completeRun(newScore)
        return
      }

      isAdvancingRound.current = true
      clearNextRoundTimeout()
      nextRoundTimeout.current = window.setTimeout(nextRound, 1000)
    }
  }

  const targetItem = gameData.items.find(i => i.isTarget)

  return (
    <>
      <CelebrationAnimation show={completed} />
      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 p-8 rounded-2xl shadow-2xl">
        <h2 className="text-4xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          🔍 小鱼侦探队 (等级 {level})
        </h2>
        <p className="text-xl text-slate-700 mb-2 font-semibold">看清目标，再慢慢找齐它们。</p>
        <p className="text-sm text-purple-700 mb-6">本关元素 {config.itemCount} 个，目标 {config.targetCount} 个，干扰相似度：{config.distractorSimilarity}。</p>

        <div className="mb-6 flex gap-6 items-center justify-center flex-wrap bg-white/70 p-4 rounded-xl backdrop-blur">
          <div className="text-2xl font-bold text-indigo-600">
            完成： {score} / {config.roundsToComplete}
          </div>
          {targetItem && (
            <div className="flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-yellow-200 to-orange-200 rounded-xl border-4 border-yellow-400 shadow-lg">
              <span className="text-xl font-bold">🎯 寻找：</span>
              <span className={`text-6xl ${targetItem.color} animate-bounce`}>{targetItem.shape}</span>
              <span className="text-xl font-bold">({found.size}/{gameData.targetCount})</span>
            </div>
          )}
          {endTime !== null && (
            <div className="text-xl font-bold text-green-600">
              ⚡ 时间： {(endTime / 1000).toFixed(2)}s
            </div>
          )}
        </div>

        <div className="grid grid-cols-8 sm:grid-cols-10 gap-2 mb-6 p-6 bg-white/50 rounded-xl backdrop-blur border-4 border-purple-200">
          {gameData.items.map((item) => (
            <button
              key={item.id}
              onClick={() => handleItemClick(item)}
              disabled={completed}
              aria-label={item.isTarget ? '目标图形' : '干扰图形'}
              className={`text-3xl sm:text-4xl p-2 rounded-lg transition-all transform ${item.color} ${
                found.has(item.id) ? 'opacity-20 scale-50 bg-green-100' : 'hover:scale-150 hover:rotate-12 hover:shadow-lg'
              } ${completed ? 'cursor-not-allowed opacity-50' : ''}`}
            >
              {item.shape}
            </button>
          ))}
        </div>

        {completed && (
          <div className="mt-6 p-6 bg-gradient-to-r from-green-100 to-emerald-100 text-emerald-800 rounded-xl border-4 border-green-400 shadow-lg">
            <div className="text-3xl font-bold mb-4 text-center">✅ 这轮观察练习完成了！</div>
            <div className="mt-4 flex justify-center">
              <NextLevelButton currentLevel={level} recommendation={recommendation} />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default VisualSearch
