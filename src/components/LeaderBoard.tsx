import React, { useEffect, useRef, useState } from 'react'
import { getLeaderboard, resetLeaderboard, LeaderboardEntry } from '../lib/leaderboard'
import { getGameName, getTotalGames, getMaxLevel } from '../lib/gameRegistry'

type Statistics = {
  totalGames: number
  completionPercent: number
  averageScore: number
  averageLevel: number
  overallScore: number
}

const calculateStatistics = (entries: LeaderboardEntry[], totalPossibleGames: number): Statistics => {
  if (entries.length === 0) {
    return { totalGames: 0, completionPercent: 0, averageScore: 0, averageLevel: 0, overallScore: 0 }
  }

  const totalGames = entries.length
  const totalScore = entries.reduce((sum, entry) => sum + entry.score, 0)
  const totalLevel = entries.reduce((sum, entry) => sum + entry.level, 0)
  const completionPercent = Math.round((totalGames / totalPossibleGames) * 100)
  const averageScore = Math.round(totalScore / totalGames)
  const averageLevel = Math.round((totalLevel / totalGames) * 10) / 10
  const overallScore = Math.round((completionPercent / 100) * (averageScore / 100) * (averageLevel / 10) * 100)

  return { totalGames, completionPercent, averageScore, averageLevel, overallScore }
}

export default function LeaderBoard(): JSX.Element {
  const [entries, setEntries] = useState<LeaderboardEntry[]>(() => getLeaderboard(10))
  const [showCertificate, setShowCertificate] = useState(false)
  const [userName, setUserName] = useState('')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const totalGames = getTotalGames()
  const maxLevel = getMaxLevel()
  const totalPossibleCompletions = totalGames * maxLevel

  useEffect(() => {
    const handler = () => setEntries(getLeaderboard(10))
    window.addEventListener('leaderboard-updated', handler)
    return () => window.removeEventListener('leaderboard-updated', handler)
  }, [])

  const stats = calculateStatistics(entries, totalPossibleCompletions)

  const generateCertificate = () => {
    if (!userName.trim()) {
      alert('请输入你的姓名')
      return
    }

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    canvas.width = 1200
    canvas.height = 900

    const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height)
    gradient.addColorStop(0, '#667eea')
    gradient.addColorStop(1, '#764ba2')
    ctx.fillStyle = gradient
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    ctx.strokeStyle = '#ffffff'
    ctx.lineWidth = 20
    ctx.strokeRect(40, 40, canvas.width - 80, canvas.height - 80)

    ctx.strokeStyle = '#f0f0f0'
    ctx.lineWidth = 2
    ctx.strokeRect(60, 60, canvas.width - 120, canvas.height - 120)

    ctx.fillStyle = '#ffffff'
    ctx.font = 'bold 60px Arial'
    ctx.textAlign = 'center'
    ctx.fillText('训练成就证书', canvas.width / 2, 140)

    ctx.font = '30px Arial'
    ctx.fillText('认知训练游戏', canvas.width / 2, 190)

    ctx.font = 'italic 16px Arial'
    ctx.fillText('（仅供娱乐和个人记录使用）', canvas.width / 2, 220)

    ctx.font = 'italic 24px Arial'
    ctx.fillText('兹证明', canvas.width / 2, 270)

    ctx.font = 'bold 48px Arial'
    ctx.fillText(userName, canvas.width / 2, 330)

    ctx.font = 'italic 24px Arial'
    ctx.fillText('已完成以下训练成就：', canvas.width / 2, 380)

    ctx.font = 'bold 22px Arial'
    ctx.fillText('综合表现', canvas.width / 2, 430)

    ctx.font = '20px Arial'
    ctx.fillText(`完成度：${stats.completionPercent}%（${stats.totalGames}/${totalPossibleCompletions}）`, canvas.width / 2, 465)
    ctx.fillText(`平均分：${stats.averageScore}/100（基于已游玩游戏）`, canvas.width / 2, 490)
    ctx.fillText(`平均等级：${stats.averageLevel}/${maxLevel}（已挑战难度）`, canvas.width / 2, 515)
    ctx.fillText(`综合得分：${stats.overallScore}/100（综合指标）`, canvas.width / 2, 540)

    ctx.font = 'bold 20px Arial'
    ctx.fillText('最佳成绩：', canvas.width / 2, 575)

    ctx.font = '18px Arial'
    ctx.textAlign = 'left'
    let yPos = 610
    const maxEntries = Math.min(entries.length, 5)

    for (let i = 0; i < maxEntries; i++) {
      const entry = entries[i]
      const gameName = getGameName(entry.gameId)
      const text = `${i + 1}. ${gameName} - 等级 ${entry.level} - 得分：${entry.score}/100`
      ctx.fillText(text, 180, yPos)
      yPos += 32
    }

    ctx.font = 'italic 20px Arial'
    ctx.fillStyle = '#ffffff'
    ctx.textAlign = 'center'
    ctx.fillText('https://xyjk0511.github.io/brain-development-games/', canvas.width / 2, canvas.height - 160)

    ctx.font = 'italic 18px Arial'
    ctx.fillText('作者：xyjk0511', canvas.width / 2, canvas.height - 125)

    ctx.font = '18px Arial'
    ctx.fillText(new Date().toLocaleDateString('zh-CN', { year: 'numeric', month: 'long', day: 'numeric' }), canvas.width / 2, canvas.height - 95)

    ctx.font = '11px Arial'
    ctx.fillStyle = '#d0d0d0'
    ctx.fillText('本证书不具备官方或专业效力，仅用于个人娱乐和记录。', canvas.width / 2, canvas.height - 65)

    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `brain-games-certificate-${userName.replace(/\s+/g, '-').toLowerCase()}.png`
        link.click()
        URL.revokeObjectURL(url)
        setShowCertificate(false)
        setUserName('')
      }
    })
  }

  return (
    <div className="bg-white p-6 rounded shadow">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold">排行榜</h3>
        <div className="flex gap-2">
          {entries.length > 0 && (
            <button
              className="text-sm text-blue-600 underline"
              onClick={() => setShowCertificate(true)}
            >
              下载证书
            </button>
          )}
          <button
            className="text-sm text-red-600 underline"
            onClick={() => {
              if (confirm('这会重置所有进度和排行榜数据，确定继续吗？')) {
                resetLeaderboard()
                setEntries([])
                localStorage.removeItem('mind-arcade-progress')
                window.dispatchEvent(new Event('progress-updated'))
              }
            }}
          >
            全部重置
          </button>
        </div>
      </div>
      <p className="text-sm text-slate-500 mb-4 italic">
        完成全部 {totalGames} 个游戏、每个游戏 {maxLevel} 个等级，即可获得最佳综合成绩。
      </p>

      {entries.length === 0 ? (
        <div className="text-sm text-slate-400 mt-4">还没有记录，先玩几局就会显示在这里。</div>
      ) : (
        <>
          <div className="mb-4 p-4 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg border border-indigo-100">
            <h4 className="font-semibold text-indigo-900 mb-2">你的表现</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div>
                <div className="text-slate-600">完成度</div>
                <div className="text-xl font-bold text-indigo-600">{stats.completionPercent}%</div>
                <div className="text-xs text-slate-500">{stats.totalGames}/{totalPossibleCompletions}</div>
              </div>
              <div>
                <div className="text-slate-600">平均分</div>
                <div className="text-xl font-bold text-indigo-600">{stats.averageScore}/100</div>
                <div className="text-xs text-slate-500">基于已游玩游戏</div>
              </div>
              <div>
                <div className="text-slate-600">平均等级</div>
                <div className="text-xl font-bold text-indigo-600">{stats.averageLevel}/10</div>
                <div className="text-xs text-slate-500">已挑战难度</div>
              </div>
              <div>
                <div className="text-slate-600">综合得分</div>
                <div className="text-xl font-bold text-indigo-600">{stats.overallScore}/100</div>
                <div className="text-xs text-slate-500">综合指标</div>
              </div>
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            <ol className="list-decimal pl-6 space-y-2">
              {entries.map((entry) => (
                <li key={entry.id} className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0">
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold truncate">{getGameName(entry.gameId)} - 等级 {entry.level}</div>
                    <div className="text-sm text-slate-500">{new Date(entry.when).toLocaleString('zh-CN')}</div>
                  </div>
                  <div className="text-right ml-4">
                    <div className="text-lg font-bold text-indigo-600">
                      {entry.score}/100
                    </div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </>
      )}

      {showCertificate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowCertificate(false)}>
          <div className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4" onClick={(event) => event.stopPropagation()}>
            <h3 className="text-xl font-bold mb-4">生成证书</h3>
            <p className="text-sm text-slate-600 mb-4">
              输入姓名，生成包含训练成就和统计数据的证书。
            </p>
            <input
              type="text"
              value={userName}
              onChange={(event) => setUserName(event.target.value)}
              placeholder="输入姓名"
              className="w-full px-4 py-2 border border-slate-300 rounded mb-4"
              onKeyPress={(event) => event.key === 'Enter' && generateCertificate()}
              autoFocus
            />
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowCertificate(false)}
                className="px-4 py-2 bg-slate-200 rounded hover:bg-slate-300"
              >
                取消
              </button>
              <button
                onClick={generateCertificate}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                生成并下载
              </button>
            </div>
          </div>
        </div>
      )}

      <canvas ref={canvasRef} style={{ display: 'none' }} />
    </div>
  )
}

// Made with Bob
