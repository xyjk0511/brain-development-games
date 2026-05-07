/**
 * Central registry for the 16 redesigned games in the application.
 * This is the single source of truth for homepage ordering and copy.
 */

import { CANONICAL_GAME_DESIGNS, type CognitiveDomain, type TaskFamily } from './gameParameters'

export interface GameMetadata {
  id: string
  name: string
  description: string
  artPath: string
  scenePath: string
  characterPath: string
  category: CognitiveDomain
  maxLevel: number
  taskFamily: TaskFamily
  beginnerFriendly: boolean
  howToPlay: string
  goal: string
  trains: string
}

const DESCRIPTIONS: Record<string, string> = {
  'visual-search': '在一群可爱图案中找出指定目标，练习视觉搜索和选择性注意。',
  'simon-says': '记住彩虹水母亮灯顺序，再按同样顺序点回来，练习顺序记忆。',
  'card-matching': '翻开卡片寻找小动物朋友，练习视觉记忆和位置记忆。',
  'reaction-time': '等待安全信号再帮助小动物过马路，练习反应和抑制控制。',
  'schulte-table': '按顺序找到数字星星，练习专注、扫描和周边视觉。',
  'word-scramble': '把打乱的字重新组成词语，练习语义判断和语言灵活性。',
  maze: '帮萤火虫找到回家路线，练习空间规划和路线记忆。',
  'logic-puzzles': '跟着线索一步步推理，完成森林小侦探谜题。',
  'tower-of-hanoi': '移动甜甜圈到目标架，练习计划、步骤控制和递归思维。',
  'n-back': '判断当前图案是否和前面某一步一样，练习工作记忆更新。',
  'mental-rotation': '观察积木旋转后是否相同，练习空间想象和心理旋转。',
  stroop: '在干扰中看准目标队长，练习干扰抑制和认知控制。',
  'trail-making': '按顺序连接宝藏点，练习任务切换和视觉搜索。',
  'number-sequence': '观察规律小火车编号，练习模式识别和逻辑推理。',
  'water-jugs': '帮小熊调出刚好的果汁容量，练习分步计划和执行控制。',
  'quick-math': '帮小动物完成轻松心算，练习数字流畅性和计算注意。'
}

const ART_BASE = import.meta.env.BASE_URL

export const GAME_REGISTRY: GameMetadata[] = CANONICAL_GAME_DESIGNS.map(game => ({
  id: game.id,
  name: game.redesignedTitle,
  description: DESCRIPTIONS[game.id],
  artPath: `${ART_BASE}game-art/${game.id}.png`,
  scenePath: `${ART_BASE}game-scenes/${game.id}-scene.png`,
  characterPath: `${ART_BASE}game-scenes/${game.id}-character.png`,
  category: game.domain,
  maxLevel: 10,
  taskFamily: game.taskFamily,
  beginnerFriendly: game.beginnerFriendly,
  howToPlay: game.howToPlay,
  goal: game.goal,
  trains: game.trains
}))

export const getGameById = (id: string): GameMetadata | undefined => {
  return GAME_REGISTRY.find(game => game.id === id)
}

export const getGameName = (id: string): string => {
  return getGameById(id)?.name ?? id
}

export const getAllGameIds = (): string[] => {
  return GAME_REGISTRY.map(game => game.id)
}

export const getGamesByCategory = (category: GameMetadata['category']): GameMetadata[] => {
  return GAME_REGISTRY.filter(game => game.category === category)
}

export const getTotalGames = (): number => {
  return GAME_REGISTRY.length
}

export const getMaxLevel = (): number => {
  return GAME_REGISTRY[0]?.maxLevel ?? 10
}

export const GAME_MAP = new Map(GAME_REGISTRY.map(game => [game.id, game]))
