import React from 'react'

export type ShareProps = {
  gameId: string
  gameName: string
  level: number
  score?: number
}

export default function ShareButtons({ gameId, gameName, level, score }: ShareProps): JSX.Element {
  const url = `${location.origin}/brain-development-games/games/${gameId}?level=${level}`
  const scoreText = score === undefined ? '一个分数' : `${score} 分`
  const text = `我在${gameName}（等级 ${level}）中取得了${scoreText}，来试试：`

  const copyLink = (): void => {
    navigator.clipboard?.writeText(`${text} ${url}`)
      .then(() => alert('链接已复制到剪贴板'))
      .catch(() => alert('无法复制链接'))
  }

  const tweet = (): void => {
    const href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`
    window.open(href, '_blank', 'noopener')
  }

  const nativeShare = async (): Promise<void> => {
    if ((navigator as any).share) {
      try {
        await (navigator as any).share({ title: gameName, text, url })
      } catch (e) {
        // user cancelled
      }
    } else {
      copyLink()
    }
  }

  return (
    <div className="mt-2 flex gap-2">
      <button onClick={nativeShare} className="px-3 py-1 bg-slate-200 rounded text-sm">分享</button>
      <button onClick={tweet} className="px-3 py-1 bg-blue-500 text-white rounded text-sm">发推</button>
      <button onClick={copyLink} className="px-3 py-1 bg-slate-50 rounded text-sm">复制链接</button>
    </div>
  )
}
