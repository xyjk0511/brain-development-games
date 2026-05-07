import { describe, expect, test } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'

const ROOT = process.cwd()
const SEARCH_DIRS = ['src', 'public']
const BANNED_PATTERNS = [
  /治疗/g,
  /诊断/g,
  /治愈/g,
  /改善疾病/g,
  /提升\s*IQ/gi,
  /提高\s*IQ/gi,
  /显著提升智力/g
]

const collectFiles = (dir: string): string[] => {
  const fullDir = path.join(ROOT, dir)
  if (!fs.existsSync(fullDir)) return []
  return fs.readdirSync(fullDir, { withFileTypes: true }).flatMap(entry => {
    const fullPath = path.join(fullDir, entry.name)
    if (entry.isDirectory()) return collectFiles(path.relative(ROOT, fullPath))
    if (entry.name === 'copyBoundaries.test.ts') return []
    if (/\.(tsx?|jsx?|json|html|md|txt)$/.test(entry.name)) return [fullPath]
    return []
  })
}

describe('copy claim boundaries', () => {
  test('does not use clinical or unsupported IQ claims in user-facing source and public files', () => {
    const offenders: string[] = []
    for (const file of SEARCH_DIRS.flatMap(collectFiles)) {
      const text = fs.readFileSync(file, 'utf8')
      for (const pattern of BANNED_PATTERNS) {
        if (pattern.test(text)) offenders.push(`${path.relative(ROOT, file)}:${pattern}`)
        pattern.lastIndex = 0
      }
    }
    expect(offenders).toEqual([])
  })
})


