import React from 'react'

interface ResetButtonProps {
  onReset: () => void
  resetCount?: number
}

export default function ResetButton({ onReset, resetCount = 0 }: ResetButtonProps): JSX.Element {
  return (
    <div className="flex items-center gap-3">
      <button
        onClick={onReset}
        className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded font-semibold transition-colors"
      >
        重置游戏
      </button>
      {resetCount > 0 && (
        <span className="text-sm text-gray-600">
          重置次数：{resetCount}
        </span>
      )}
    </div>
  )
}

// Made with Bob
