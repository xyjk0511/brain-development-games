import React, { useEffect, useMemo, useRef, useState } from 'react'
import { recordGameRun } from '../lib/progress'
import type { AdaptiveDecision } from '../lib/adaptive'
import { quickMathConfigForLevel, type QuickMathConfig } from '../lib/gameParameters'
import NextLevelButton from '../components/NextLevelButton'
import CelebrationAnimation from '../components/CelebrationAnimation'

export type QuickMathProps = {
  level: number
}

type Problem = { text: string; answer: number }

const randomInt = (max: number): number => Math.floor(Math.random() * max) + 1

export const generateQuickMathProblem = (config: QuickMathConfig): Problem => {
  const operation = config.operationTypes[Math.floor(Math.random() * config.operationTypes.length)]
  const a = randomInt(config.numberRange)
  const b = randomInt(config.numberRange)

  if (operation === 'subtract') {
    const larger = Math.max(a, b)
    const smaller = Math.min(a, b)
    return { text: `${larger} - ${smaller}`, answer: larger - smaller }
  }

  if (operation === 'multiply') {
    const left = randomInt(Math.min(12, config.numberRange))
    const right = randomInt(Math.min(12, config.numberRange))
    return { text: `${left} × ${right}`, answer: left * right }
  }

  if (operation === 'two-step') {
    const c = randomInt(5)
    return { text: `(${a} + ${b}) × ${c}`, answer: (a + b) * c }
  }

  return { text: `${a} + ${b}`, answer: a + b }
}

const QuickMath = ({ level }: QuickMathProps): JSX.Element => {
  const config = useMemo(() => quickMathConfigForLevel(level), [level])
  const [problem, setProblem] = useState<Problem>(() => generateQuickMathProblem(config))
  const [input, setInput] = useState('')
  const [score, setScore] = useState(0)
  const [timeLeft, setTimeLeft] = useState<number | null>(config.timeLimitMs)
  const [completed, setCompleted] = useState(false)
  const [recommendation, setRecommendation] = useState<AdaptiveDecision | undefined>()
  const saved = useRef(false)
  const attempts = useRef(0)
  const errors = useRef(0)
  const startMs = useRef<number>(Date.now())
  const reactionSamples = useRef<number[]>([])
  const problemStartMs = useRef<number>(Date.now())

  useEffect(() => {
    setProblem(generateQuickMathProblem(config))
    setInput('')
    setScore(0)
    setTimeLeft(config.timeLimitMs)
    setCompleted(false)
    setRecommendation(undefined)
    attempts.current = 0
    errors.current = 0
    reactionSamples.current = []
    startMs.current = Date.now()
    problemStartMs.current = Date.now()
    saved.current = false
  }, [config, level])

  useEffect(() => {
    if (timeLeft === null || completed) return
    if (timeLeft <= 0) return
    const id = setInterval(() => setTimeLeft((t) => (t === null ? null : Math.max(0, t - 100))), 100)
    return () => clearInterval(id)
  }, [timeLeft, completed])

  const completeRun = (newScore: number, timedOut = false): void => {
    if (saved.current) return
    const accuracy = attempts.current === 0 ? 0 : newScore / attempts.current
    const avgReactionMs = reactionSamples.current.length === 0
      ? undefined
      : Math.round(reactionSamples.current.reduce((sum, value) => sum + value, 0) / reactionSamples.current.length)
    const percentageScore = Math.max(0, Math.min(100, Math.round(accuracy * 100)))
    const decision = recordGameRun({
      gameId: 'quick-math',
      level,
      accuracy,
      avgReactionMs,
      completionMs: Date.now() - startMs.current,
      errorCount: errors.current,
      hintCount: config.visualSupport ? 1 : 0,
      retryCount: 0,
      consecutiveSuccesses: accuracy >= 0.85 ? 1 : 0,
      consecutiveFailures: accuracy < 0.65 || timedOut ? 1 : 0,
      timedOut,
      score: percentageScore,
      maxScore: 100
    })
    saved.current = true
    setRecommendation(decision)
    setCompleted(true)
  }

  useEffect(() => {
    if (timeLeft === 0 && !completed) {
      completeRun(score, true)
    }
  }, [timeLeft, completed, score])

  const submit = (): void => {
    if (completed) return
    const trimmed = input.trim()
    if (trimmed === '') {
      return
    }
    const timedOut = timeLeft !== null && timeLeft <= 0
    attempts.current += 1
    reactionSamples.current.push(Date.now() - problemStartMs.current)

    const val = Number(trimmed)
    const isCorrect = !timedOut && val === problem.answer
    const newScore = isCorrect ? score + 1 : Math.max(0, score - 1)

    if (isCorrect) {
      setScore((s) => s + 1)
    } else {
      errors.current += 1
      setScore((s) => Math.max(0, s - 1))
    }

    if (newScore >= config.targetCorrect || timedOut) {
      completeRun(newScore, timedOut)
      return
    }

    setProblem(generateQuickMathProblem(config))
    setInput('')
    setTimeLeft(config.timeLimitMs)
    problemStartMs.current = Date.now()
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      submit()
    }
  }

  return (
    <>
      <CelebrationAnimation show={completed} />
      <div className="bg-gradient-to-br from-yellow-50 via-orange-50 to-red-50 p-8 rounded-2xl shadow-xl">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-orange-700 flex items-center justify-center gap-3">
            🧮 果果心算铺
            <span className="text-2xl bg-orange-100 px-4 py-1 rounded-full">等级 {level}</span>
          </h2>
          <p className="text-lg text-slate-600 mt-2">慢慢算也可以，先准确帮小动物数清楚。</p>
          <p className="text-sm text-orange-700 mt-2">{config.visualSupport ? '这一关提供图形辅助和宽松节奏。' : '这一关会更重视稳定和节奏。'}</p>
        </div>

        <div className="mb-8 p-12 bg-white rounded-2xl shadow-lg border-4 border-orange-200">
          <div className="text-7xl font-black text-center text-orange-600 mb-4">
            {problem.text} = ?
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-center mb-6">
          <input
            className="text-2xl sm:text-4xl font-bold text-center border-4 border-blue-400 p-3 sm:p-4 rounded-xl w-full sm:w-48 focus:ring-4 focus:ring-blue-300 focus:outline-none shadow-lg disabled:bg-gray-100 disabled:cursor-not-allowed"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="?"
            autoFocus
            disabled={completed}
          />
          <button
            onClick={submit}
            disabled={completed}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-400 to-green-500 text-white text-xl sm:text-2xl font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all whitespace-nowrap disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
          >
            ✓ 提交
          </button>
        </div>

        {timeLeft !== null && (
          <div className="mb-6 text-center">
            <div className="inline-block bg-red-100 px-8 py-4 rounded-xl shadow-md border-2 border-red-300">
              <span className="text-2xl font-bold text-red-700">⏱️ 时间： </span>
              <span className="text-4xl font-black text-red-600">{(timeLeft / 1000).toFixed(1)}s</span>
            </div>
          </div>
        )}

        <div className="text-center mb-6">
          <div className="inline-block bg-white px-8 py-4 rounded-xl shadow-md">
            <span className="text-2xl font-bold text-blue-700">正确： </span>
            <span className="text-4xl font-black text-green-600">{score}</span>
            <span className="text-2xl font-bold text-slate-500"> / {config.targetCorrect}</span>
          </div>
        </div>

        {completed && (
          <div className="mt-6 p-6 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 rounded-xl shadow-lg border-4 border-emerald-300">
            <div className="text-3xl font-bold text-center mb-4">🎉 很棒，这轮心算练习完成了！</div>
            <div className="flex justify-center">
              <NextLevelButton currentLevel={level} recommendation={recommendation} />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default QuickMath
