import React from 'react'
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import 首页 from './pages/Home'
import PlayableGameFrame from './components/PlayableGameFrame'

export default function App(): JSX.Element {
  const location = useLocation()
  const isGameRoute = location.pathname.startsWith('/games/')

  return (
    <div className="min-h-screen flex flex-col">
      {!isGameRoute && <header className="border-b border-amber-200 bg-[#fff8df]/95 p-3 text-slate-950 shadow-sm backdrop-blur sm:p-4">
        <nav className="container mx-auto flex justify-between items-center">
          <h1 className="text-base font-black sm:text-lg lg:text-xl">认知训练游戏</h1>
          <div className="space-x-2 sm:space-x-4">
            <Link to="/" className="rounded-full bg-white px-3 py-1 text-sm font-bold text-slate-800 shadow-sm hover:bg-amber-100 sm:text-base">
              首页
            </Link>
          </div>
        </nav>
      </header>}

      <main className={isGameRoute ? 'flex-1' : 'flex-1 container mx-auto p-3 sm:p-4 lg:p-6'}>
        <Routes>
          <Route path="/" element={<首页 />} />
          <Route path="/games/water-jugs" element={<PlayableGameFrame gameId="water-jugs" />} />
          <Route path="/games/tower-of-hanoi" element={<PlayableGameFrame gameId="tower-of-hanoi" />} />
          <Route path="/games/n-back" element={<PlayableGameFrame gameId="n-back" />} />
          <Route path="/games/stroop" element={<PlayableGameFrame gameId="stroop" />} />
          <Route path="/games/mental-rotation" element={<PlayableGameFrame gameId="mental-rotation" />} />
          <Route path="/games/schulte-table" element={<PlayableGameFrame gameId="schulte-table" />} />
          <Route path="/games/maze" element={<PlayableGameFrame gameId="maze" />} />
          <Route path="/games/quick-math" element={<PlayableGameFrame gameId="quick-math" />} />
          <Route path="/games/word-scramble" element={<PlayableGameFrame gameId="word-scramble" />} />
          <Route path="/games/simon-says" element={<PlayableGameFrame gameId="simon-says" />} />
          <Route path="/games/card-matching" element={<PlayableGameFrame gameId="card-matching" />} />
          <Route path="/games/reaction-time" element={<PlayableGameFrame gameId="reaction-time" />} />
          <Route path="/games/number-sequence" element={<PlayableGameFrame gameId="number-sequence" />} />
          <Route path="/games/visual-search" element={<PlayableGameFrame gameId="visual-search" />} />
          <Route path="/games/trail-making" element={<PlayableGameFrame gameId="trail-making" />} />
          <Route path="/games/logic-puzzles" element={<PlayableGameFrame gameId="logic-puzzles" />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {!isGameRoute && <footer className="border-t border-amber-200 bg-[#fff8df] p-3 text-center text-slate-700 sm:p-4">
        <div className="text-xs sm:text-sm">
          © 认知训练游戏 — <a href="https://xyjk0511.github.io/brain-development-games" className="underline hover:text-indigo-600">在线演示</a>
        </div>
        <div className="text-xs sm:text-sm mt-1">作者：xyjk0511</div>
      </footer>}
    </div>
  )
}

