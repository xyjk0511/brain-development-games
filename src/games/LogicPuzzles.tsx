import React, { useEffect, useRef, useState } from 'react'
import { markGameCompletedLevel } from '../lib/progress'
import NextLevelButton from '../components/NextLevelButton'
import CelebrationAnimation from '../components/CelebrationAnimation'

export type LogicPuzzlesProps = {
  level: number
}

type Puzzle = {
  question: string
  answer: number
  hint?: string
  explanation: string
}

const puzzleVariations: Record<number, Puzzle[]> = {
  1: [{
    question: '神秘盒子里有一个数字 7。\n\n按红键会乘以 2，按蓝键会加 5，按绿键会减 3。\n\n你依次按下：红键、蓝键、红键、绿键。\n\n最后盒子里的数字是多少？',
    answer: 35,
    hint: '按步骤算：7 × 2 = 14，14 + 5 = 19，19 × 2 = 38，38 - 3 = 35。',
    explanation: '起始数字是 7。\n\n红键：7 × 2 = 14\n蓝键：14 + 5 = 19\n红键：19 × 2 = 38\n绿键：38 - 3 = 35\n\n正确答案：35'
  }],
  2: [{
    question: '钟楼按特殊规律敲钟：\n\n1 点敲 1 下，2 点敲 3 下，3 点敲 6 下，4 点敲 10 下。\n\n这个规律继续下去，8 点会敲多少下？',
    answer: 36,
    hint: '这是三角数规律：1、3、6、10、15、21、28、36。',
    explanation: '每一项都是从 1 加到当前数字。\n\n8 点：1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 = 36\n\n正确答案：36'
  }],
  3: [{
    question: '烘焙师按规律做饼干：\n\n第 1 批用 2 杯面粉做 12 块饼干。\n第 2 批用 3 杯面粉做 18 块饼干。\n第 3 批用 5 杯面粉做 30 块饼干。\n\n面粉杯数按 2、3、5、8 递增。第 4 批用 8 杯面粉，会做多少块饼干？',
    answer: 48,
    hint: '每杯面粉做 6 块饼干。',
    explanation: '12 ÷ 2 = 6，18 ÷ 3 = 6，30 ÷ 5 = 6。\n\n每杯面粉都做 6 块饼干，所以第 4 批：8 × 6 = 48。\n\n正确答案：48'
  }],
  4: [{
    question: '一列火车穿过 5 个隧道。\n\n初始速度是 20 km/h。\n隧道 1：速度 +10\n隧道 2：速度 ×2\n隧道 3：速度 +15\n隧道 4：速度 ×1.5\n隧道 5：速度 +20\n\n离开第 5 个隧道后速度是多少？四舍五入到整数。',
    answer: 133,
    hint: '20 → 30 → 60 → 75 → 112.5 → 132.5。',
    explanation: '逐步计算：\n\n20 + 10 = 30\n30 × 2 = 60\n60 + 15 = 75\n75 × 1.5 = 112.5\n112.5 + 20 = 132.5\n\n四舍五入后是 133。'
  }],
  5: [{
    question: '一只神奇母鸡每天产蛋数量翻倍：\n\n第 1 天 1 个，第 2 天 2 个，第 3 天 4 个。\n\n农夫每 3 天把所有鸡蛋卖掉一次。第 7 天收完蛋后，农夫手里有多少个鸡蛋？',
    answer: 64,
    hint: '第 3 天和第 6 天都会清空。第 7 天只剩当天产的蛋。',
    explanation: '第 1 到 3 天收集后在第 3 天全部卖掉。\n第 4 到 6 天收集后在第 6 天全部卖掉。\n第 7 天母鸡产 64 个蛋，此时还没有卖。\n\n正确答案：64'
  }],
  6: [{
    question: '花园开花数量遵循规律：\n\n第 1 周 3 朵。\n第 2 周 7 朵。\n第 3 周 15 朵。\n第 4 周 31 朵。\n\n每周增加量依次是 4、8、16。第 5 周有多少朵？',
    answer: 63,
    hint: '下一次增加 32。',
    explanation: '规律是每次增加 2 的幂：\n\n3 + 4 = 7\n7 + 8 = 15\n15 + 16 = 31\n31 + 32 = 63\n\n正确答案：63'
  }],
  7: [{
    question: '宝箱有 4 把锁，每把锁是 3 位数。\n\n第 4 把锁要求三个数字构成等差数列，公差为 2。\n\n已知第 3 把锁是 135，不再重复使用。下一个符合公差为 2 的自然选择是多少？',
    answer: 246,
    hint: '公差为 2 的三位数可以是 135、246、357、468。',
    explanation: '135 已经被第 3 把锁使用。\n继续按同样公差向后看，下一组是 246。\n\n正确答案：246'
  }],
  8: [{
    question: '实验台上有三只烧杯：\n\nA 杯 100ml，B 杯 50ml，C 杯 25ml。\n\n操作 1：把 A 的一半倒入 B。\n操作 2：把 B 的三分之一倒入 C。\n操作 3：从 C 倒 20ml 回 A。\n\n最后 B 杯大约有多少 ml？四舍五入到整数。',
    answer: 67,
    hint: 'A 倒一半给 B 后，B 是 100ml；再倒出三分之一，B 剩 66.67ml。',
    explanation: '初始：A=100，B=50，C=25。\n\nA 的一半 50ml 倒入 B，B 变成 100ml。\nB 的三分之一约 33.33ml 倒入 C，B 剩 66.67ml。\n之后从 C 倒回 A，不影响 B。\n\n四舍五入后 B 是 67ml。'
  }],
  9: [{
    question: '探险者在岛上收集宝石：\n\n岛 1：7 颗。\n岛 2：15 颗。\n岛 3：31 颗。\n岛 4：63 颗。\n\n每次增加量翻倍：8、16、32……岛 6 有多少颗？',
    answer: 255,
    hint: '岛 5 是 63 + 64 = 127，岛 6 是 127 + 128。',
    explanation: '继续规律：\n\n岛 5：63 + 64 = 127\n岛 6：127 + 128 = 255\n\n正确答案：255'
  }],
  10: [{
    question: '木匠带着一些木料进入 4 个房间。\n\n规则：每进一个房间，他都会找到和手里一样多的新木料，相当于木料翻倍。然后他用掉 100 块修墙。\n\n离开第 4 个房间后，他手里正好剩 0 块。\n\n他一开始带了多少块木料？可以输入小数。',
    answer: 93.75,
    hint: '从最后倒推：第 4 个房间用掉 100 后剩 0，所以用掉前是 100，翻倍前是 50。继续倒推。',
    explanation: '从后往前算：\n\n第 4 房间：0 + 100 = 100，翻倍前是 50。\n第 3 房间：50 + 100 = 150，翻倍前是 75。\n第 2 房间：75 + 100 = 175，翻倍前是 87.5。\n第 1 房间：87.5 + 100 = 187.5，翻倍前是 93.75。\n\n正确答案：93.75'
  }]
}

const getPuzzleForLevel = (level: number): Puzzle => {
  const variations = puzzleVariations[level] || puzzleVariations[1]
  const randomIndex = Math.floor(Math.random() * variations.length)
  return variations[randomIndex]
}

const LogicPuzzles = ({ level }: LogicPuzzlesProps): JSX.Element => {
  const [puzzle, setPuzzle] = useState<Puzzle>(() => getPuzzleForLevel(level))
  const [input, setInput] = useState('')
  const [showHint, setShowHint] = useState(false)
  const [showExplanation, setShowExplanation] = useState(false)
  const [attempts, setAttempts] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [feedback, setFeedback] = useState<string>('')
  const saved = useRef(false)

  useEffect(() => {
    setPuzzle(getPuzzleForLevel(level))
    setInput('')
    setShowHint(false)
    setShowExplanation(false)
    setAttempts(0)
    setCompleted(false)
    setFeedback('')
    saved.current = false
  }, [level])

  const submit = (): void => {
    const value = Number(input)
    setAttempts((previous) => previous + 1)

    if (Number.isNaN(value)) {
      setFeedback('请输入有效数字。')
      return
    }

    const isCorrect = Math.abs(value - puzzle.answer) < 0.01

    if (isCorrect) {
      setFeedback('正确，推理完成。')
      setCompleted(true)
      setShowExplanation(true)

      if (!saved.current) {
        const score = Math.max(50, 100 - attempts * 10)
        markGameCompletedLevel('logic-puzzles', level, score, 100)
        saved.current = true
      }
    } else {
      const diff = Math.abs(value - puzzle.answer)
      if (diff <= 5) {
        setFeedback('很接近了，再试一次。')
      } else if (diff <= 20) {
        setFeedback('方向接近了，再仔细想想。')
      } else {
        setFeedback('还不对，可以看看提示。')
      }
    }
  }

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      submit()
    }
  }

  return (
    <>
      <CelebrationAnimation show={completed} />
      <div className="bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50 p-8 rounded-2xl shadow-xl max-w-4xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-4xl font-bold text-purple-700 flex items-center justify-center gap-3">
            逻辑谜题挑战
            <span className="text-2xl bg-purple-100 px-4 py-1 rounded-full">等级 {level}</span>
          </h2>
          <p className="text-lg text-slate-600 mt-2">认真阅读题目，分步推理出答案。</p>
        </div>

        <div className="mb-8 p-8 bg-white rounded-2xl shadow-lg border-4 border-purple-200">
          <div className="text-lg leading-relaxed text-slate-800 whitespace-pre-line">
            {puzzle.question}
          </div>
        </div>

        {!completed && puzzle.hint && (
          <div className="mb-6">
            <button
              onClick={() => setShowHint(!showHint)}
              className="px-6 py-3 bg-gradient-to-r from-yellow-400 to-orange-400 text-white text-lg font-bold rounded-xl shadow-md hover:shadow-lg transform hover:scale-105 transition-all"
            >
              {showHint ? '隐藏提示' : '显示提示'}
            </button>
            {showHint && (
              <div className="mt-4 p-6 bg-yellow-50 border-4 border-yellow-300 rounded-xl">
                <div className="text-lg text-yellow-900">
                  <strong>提示：</strong> {puzzle.hint}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center justify-center mb-6">
          <input
            className="text-2xl sm:text-4xl font-bold text-center border-4 border-purple-400 p-3 sm:p-4 rounded-xl w-full sm:w-64 focus:ring-4 focus:ring-purple-300 focus:outline-none shadow-lg disabled:bg-gray-100"
            value={input}
            onChange={(event) => setInput(event.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="输入答案"
            autoFocus
            disabled={completed}
            type="number"
          />
          <button
            onClick={submit}
            disabled={completed}
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-green-400 to-green-500 text-white text-xl sm:text-2xl font-bold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none whitespace-nowrap"
          >
            提交
          </button>
        </div>

        {feedback && (
          <div className={`mb-6 p-6 rounded-xl shadow-lg text-center text-xl font-bold ${
            completed
              ? 'bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 border-4 border-emerald-300'
              : 'bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-4 border-blue-300'
          }`}>
            {feedback}
          </div>
        )}

        <div className="text-center mb-6">
          <div className="inline-block bg-white px-8 py-4 rounded-xl shadow-md">
            <span className="text-2xl font-bold text-purple-700">尝试次数：</span>
            <span className="text-4xl font-black text-orange-600">{attempts}</span>
          </div>
        </div>

        {showExplanation && (
          <div className="mb-6 p-6 bg-blue-50 border-4 border-blue-300 rounded-xl">
            <div className="text-lg text-blue-900 whitespace-pre-line">
              <strong>解析：</strong><br /><br />
              {puzzle.explanation}
            </div>
          </div>
        )}

        {completed && (
          <div className="mt-6 p-6 bg-gradient-to-r from-emerald-100 to-green-100 text-emerald-800 rounded-xl shadow-lg border-4 border-emerald-300">
            <div className="text-3xl font-bold text-center mb-4">
              本等级已完成
            </div>
            <div className="text-center text-lg mb-2">
              你用了 {attempts} 次尝试解出答案。
            </div>
            <div className="text-center text-2xl font-bold mb-4">
              正确答案：<span className="text-green-700">{puzzle.answer}</span>
            </div>
            <div className="flex justify-center">
              <NextLevelButton currentLevel={level} />
            </div>
          </div>
        )}
      </div>
    </>
  )
}

export default LogicPuzzles

// Made with Bob
